import os
import log
import numpy as np
from model import Model
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report, roc_curve, auc

from joblib import dump, load

class MyRandomForestClassifier(Model):
    def __init__(self):
        self.name = type(self).__name__[2:]
        self.model = RandomForestClassifier(n_jobs=-1, random_state=0)

    def grid_search(self, X, y, n):
        n_estimators = [10, 50, 100]
        criterion = ['gini', 'entropy']
        max_features = ['auto', 'sqrt', 'log2', None]
        max_depth = [2, 5, 10, 20, 50, 100]
        warm_start = [False, True]

        parameters = [
            dict(n_estimators=n_estimators, criterion=criterion, max_features=max_features, max_depth=max_depth, warm_start=warm_start)
        ]

        self.run_grid_search(parameters, X, y, n)

    def learn(self, logger, set_list, names_list, n, engine):
        super(MyRandomForestClassifier, self).__init__(logger)

        for i, [[X_train, X_test, y_train, y_test], names] in enumerate(zip(set_list, names_list)):
            dump_file = './dump/%s/%s_%s' %(engine, self.name, i)
            if os.path.isfile(dump_file):
                self.model = load(dump_file)
            else:
                self.logger.log("debug", "cv(%d)" %i)
                self.grid_search(X_train, y_train, n)
                dump(self.model, dump_file)
            y_pred = self.model.predict(X_test)

            importances = self.model.feature_importances_
            self.coef.append(self.get_coef_rank(importances, names))

            self.accuracy_score.append(accuracy_score(y_test, y_pred))
            self.confusion_matrix.append(confusion_matrix(y_test, y_pred))
            self.report.append(classification_report(y_test, y_pred).replace('\n\n', '\n'))

            fpr, tpr, thresholds = roc_curve(y_test, y_pred)
            roc_auc = auc(fpr, tpr)
            self.roc_auc_score.append(roc_auc)
            self.add_tprs(fpr, tpr)
