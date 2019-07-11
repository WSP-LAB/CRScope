import log
import numpy as np
import pandas as pd
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import TimeSeriesSplit, train_test_split, StratifiedKFold
from imblearn.over_sampling import *
from imblearn.under_sampling import *

class Model(object):
    def __init__(self, logger):
        self.logger = logger
        self.name = type(self).__name__[2:]
        self.coef = []
        self.accuracy_score = []
        self.confusion_matrix = []
        self.report = []
        self.roc_auc_score = []
        self.tprs = []

    def _sampling(self, X, y, over, option):
        if over:
            if option == 1:
                X_sampled, y_sampled = RandomOverSampler().fit_sample(X, y)
            elif option == 2:
                X_sampled, y_sampled = ADASYN().fit_sample(X, y)
            elif option == 3:
                X_sampled, y_sampled = SMOTE().fit_sample(X, y)
        else:
            if option == 1:
                X_sampled, y_sampled = RandomUnderSampler().fit_sample(X, y)
            elif option == 2:
                X_sampled, y_sampled = TomekLinks().fit_sample(X, y)
            elif option == 3:
                X_sampled, y_sampled = CondensedNearestNeighbour().fit_sample(X, y)
            elif option == 4:
                X_sampled, y_sampled = OneSidedSelection().fit_sample(X, y)
            elif option == 5:
                X_sampled, y_sampled = EditedNearestNeighbours().fit_sample(X, y)
            elif option == 6:
                X_sampled, y_sampled = NeighbourhoodCleaningRule().fit_sample(X, y)
        return X_sampled, y_sampled

    def split_train_test(self, n, over, option):
        set_list = []
        tscv = TimeSeriesSplit(n_splits=n)
        for train_index, test_index in tscv.split(self.X):
            X_sample1, y_sample1 = self._sampling(self.X.iloc[train_index], self.y.iloc[train_index], over, option);
            X_sample2, y_sample2 = self._sampling(self.X.iloc[test_index], self.y.iloc[test_index], over, option);
            new_X = np.vstack([X_sample1, X_sample2])
            new_y = np.append(y_sample1, y_sample2)
            X_train, X_test, y_train, y_test = train_test_split(new_X, new_y, test_size=len(test_index), stratify=new_y)
            set_list.append([X_train, X_test, y_train, y_test])

        return set_list

    def run_grid_search(self, parameters, X, y, n):
        clf = GridSearchCV(self.model, parameters, cv=n, n_jobs=-1)
        best = clf.fit(X, y)
        self.logger.log("debug", self.name)
        self.logger.log("debug", best.best_score_)
        self.logger.log("debug", best.best_params_)

        means = clf.cv_results_['mean_test_score']
        stds = clf.cv_results_['std_test_score']

        for mean, std, params in zip(means, stds, clf.cv_results_['params']):
            self.logger.log("debug", "%0.3f (+/-%0.03f) for %r" % (mean, std * 2, params))

        self.model = best.best_estimator_

    def get_coef_rank(self, importances, names):
        high_indices = np.argsort(importances)[::-1]
        low_indices = np.argsort(importances)

        high_coef_str = ""
        for j, ind in enumerate(high_indices):
            high_coef_str += ("%d. %s (%f)\n" % (j + 1, names[ind], importances[ind]))

        low_coef_str = ""
        for j, ind in enumerate(low_indices):
            low_coef_str += ("%d. %s (%f)\n" % (j + 1, names[ind], importances[ind]))
        return [high_coef_str, low_coef_str]

    def add_tprs(self, fpr, tpr):
        base_fpr = np.linspace(0, 1, 101)
        mean_tpr = np.interp(base_fpr, fpr, tpr)
        mean_tpr[0] = 0.0
        self.tprs.append(mean_tpr)

    def print_data(self):
        print self.coef
        print self.accuracy_score
        print self.confusion_matrix
        print self.report
        print self.roc_auc_score

    def log_data(self):
        self.logger.log("debug", self.coef)
        self.logger.log("debug", self.accuracy_score)
        self.logger.log("debug", self.confusion_matrix)
        self.logger.log("debug", self.report)
        self.logger.log("debug", self.roc_auc_score)
