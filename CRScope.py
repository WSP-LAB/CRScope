#!/usr/bin/python
import os
import sys
import time
import pandas as pd
import numpy as np
from multiprocessing import Process, Manager
from multiprocessing.managers import BaseManager
from sklearn.model_selection import TimeSeriesSplit, train_test_split
from imblearn.over_sampling import *
from imblearn.under_sampling import *

sys.path.append('./src')

import arg
import util
from model import *
from case import Case
from log import Logger
from data import Dataset
from docs import Docx, Xlsx

from joblib import dump, load

def load_dataset(file_name):
    dataset = Dataset(logger, file_name)
    columns = ['date', 'security', 'feature']
    dataset.drop_na(columns)
    dataset.factorize_label()
    dataset.sort_date()
    return dataset

def preprocess_data(df, flag_preprocess):
    df['crash_function_full'] = df.crash_function.str.split('(').str[0].str.split('<').str[0]
    def preprocess_crash_function(df):
        df['crash_function_namespace'], df['crash_function_class'], df['crash_function_func'] = \
        zip(*df.crash_function.apply(lambda x: util.parse_function(x)))
        return df

    split_backtrace = df.backtrace.str.split(' - ')
    full_bt = []
    for backtrace in split_backtrace:
        full_bt.append(' - '.join([bt.split('(')[0].split('<')[0] for bt in backtrace]))
    df['backtrace_full'] = full_bt
    def preprocess_backtrace(df):
        name_bt = []
        for backtrace in split_backtrace:
            name_bt.append(' - '.join([util.parse_function(bt)[2] for bt in backtrace]))
        df['backtrace_func'] = name_bt
        return df

    if flag_preprocess:
        df = preprocess_crash_function(df)
        df = preprocess_backtrace(df)
    return df

def extract_features(df_train, df_test, flag_preprocess, flag_tfidvector, flag_countvector):
    if True:
        from sklearn.preprocessing import LabelEncoder
        from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
        
        df_train = preprocess_data(df_train, flag_preprocess)
        df_test = preprocess_data(df_test, flag_preprocess)

        train_features = pd.DataFrame()
        test_features = pd.DataFrame()

        label = LabelEncoder()
        tfidf = TfidfVectorizer(sublinear_tf=True, norm='l2', ngram_range=(1, 5), stop_words='english')
        count = CountVectorizer(ngram_range=(1, 5), stop_words='english')

        def update(new, label_encoder):
            label_encoder.classes_ = np.append(label_encoder.classes_, new)
            return len(label_encoder.classes_) - 1

        def process_engine(train_features, test_features):
            train_features['engine'] = label.fit_transform(df_train['engine'])
            test_features['engine'] = df_test['engine'].map(lambda s: update(s, label) if not s in label.classes_ else np.where(label.classes_ == s)[0][0])
            return train_features, test_features

        def process_arch(train_features, test_features):
            train_features['arch'] = label.fit_transform(df_train['arch'])
            test_features['arch'] = df_test['arch'].map(lambda s: update(s, label) if not s in label.classes_ else np.where(label.classes_ == s)[0][0])
            return train_features, test_features

        def process_mode(train_features, test_features):
            train_features['mode'] = label.fit_transform(df_train['mode'])
            test_features['mode'] = df_test['mode'].map(lambda s: update(s, label) if not s in label.classes_ else np.where(label.classes_ == s)[0][0])
            return train_features, test_features

        def process_signal(train_features, test_features):
            train_features['signal'] = label.fit_transform(df_train['signal'])
            test_features['signal'] = df_test['signal'].map(lambda s: update(s, label) if not s in label.classes_ else np.where(label.classes_ == s)[0][0])
            return train_features, test_features

        def process_crash_type(train_features, test_features):
            train_features['crash_type'] = label.fit_transform(df_train['crash_type'])
            test_features['crash_type'] = df_test['crash_type'].map(lambda s: update(s, label) if not s in label.classes_ else np.where(label.classes_ == s)[0][0])
            return train_features, test_features

        def process_crash_instruction(train_features, test_features):
            if flag_tfidvector:
                train_crash_instruction_tfidf = tfidf.fit_transform(df_train['crash_instruction']).toarray()
                test_crash_instruction_tfidf = tfidf.transform(df_test['crash_instruction']).toarray()
                names = tfidf.get_feature_names()
                for i in range(len(names)):
                    train_features['inst_tfid-%s' %names[i]] = [row[i] for row in train_crash_instruction_tfidf]
                    test_features['inst_tfid-%s' %names[i]] = [row[i] for row in test_crash_instruction_tfidf]

            if flag_countvector:
                train_crash_instruction_count = count.fit_transform(df_train['crash_instruction']).toarray()
                test_crash_instruction_count = count.transform(df_test['crash_instruction']).toarray()
                names = count.get_feature_names()
                for i in range(len(names)):
                    train_features['inst_count-%s' %names[i]] = [row[i] for row in train_crash_instruction_count]
                    test_features['inst_count-%s' %names[i]] = [row[i] for row in test_crash_instruction_count]
            return train_features, test_features

        def process_crash_function(train_features, test_features):
            if flag_tfidvector:
                train_crash_function_tfidf = tfidf.fit_transform(df_train['crash_function_full']).toarray()
                test_crash_function_tfidf = tfidf.transform(df_test['crash_function_full']).toarray()
                names = tfidf.get_feature_names()
                for i in range(len(names)):
                    train_features['func_full_tfid-%s' %names[i]] = [row[i] for row in train_crash_function_tfidf]
                    test_features['func_full_tfid-%s' %names[i]] = [row[i] for row in test_crash_function_tfidf]

            if flag_countvector:
                train_crash_function_count = count.fit_transform(df_train['crash_function_full']).toarray()
                test_crash_function_count = count.transform(df_test['crash_function_full']).toarray()
                names = count.get_feature_names()
                for i in range(len(names)):
                    train_features['func_full_count-%s' %names[i]] = [row[i] for row in train_crash_function_count]
                    test_features['func_full_count-%s' %names[i]] = [row[i] for row in test_crash_function_count]

            if flag_preprocess:
                if flag_tfidvector:
                    train_crash_function_tfidf = tfidf.fit_transform(df_train['crash_function_func']).toarray()
                    test_crash_function_tfidf = tfidf.transform(df_test['crash_function_func']).toarray()
                    names = tfidf.get_feature_names()
                    for i in range(len(names)):
                        train_features['func_tfid-%s' %names[i]] = [row[i] for row in train_crash_function_tfidf]
                        test_features['func_tfid-%s' %names[i]] = [row[i] for row in test_crash_function_tfidf]

                if flag_countvector:
                    train_crash_function_count = count.fit_transform(df_train['crash_function_func']).toarray()
                    test_crash_function_count = count.transform(df_test['crash_function_func']).toarray()
                    names = count.get_feature_names()
                    for i in range(len(names)):
                        train_features['func_count-%s' %names[i]] = [row[i] for row in train_crash_function_count]
                        test_features['func_count-%s' %names[i]] = [row[i] for row in test_crash_function_count]
            return train_features, test_features

        def process_backtrace(train_features, test_features):
            if flag_tfidvector:
                train_backtrace_tfidf = tfidf.fit_transform(df_train['backtrace_full']).toarray()
                test_backtrace_tfidf = tfidf.transform(df_test['backtrace_full']).toarray()
                names = tfidf.get_feature_names()
                for i in range(len(names)):
                    train_features['bt_full_tfid-%s' %names[i]] = [row[i] for row in train_backtrace_tfidf]
                    test_features['bt_full_tfid-%s' %names[i]] = [row[i] for row in test_backtrace_tfidf]

            if flag_countvector:
                train_backtrace_count = count.fit_transform(df_train['backtrace_full']).toarray()
                test_backtrace_count = count.transform(df_test['backtrace_full']).toarray()
                names = count.get_feature_names()
                for i in range(len(names)):
                    train_features['bt_full_count-%s' %names[i]] = [row[i] for row in train_backtrace_count]
                    test_features['bt_full_count-%s' %names[i]] = [row[i] for row in test_backtrace_count]

            if flag_preprocess:
                if flag_tfidvector:
                    train_backtrace_tfidf = tfidf.fit_transform(df_train['backtrace_func']).toarray()
                    test_backtrace_tfidf = tfidf.transform(df_test['backtrace_func']).toarray()
                    names = tfidf.get_feature_names()
                    for i in range(len(names)):
                        train_features['bt_tfid-%s' %names[i]] = [row[i] for row in train_backtrace_tfidf]
                        test_features['bt_tfid-%s' %names[i]] = [row[i] for row in test_backtrace_tfidf]

                if flag_countvector:
                    train_backtrace_count = count.fit_transform(df_train['backtrace_func']).toarray()
                    test_backtrace_count = count.transform(df_test['backtrace_func']).toarray()
                    names = count.get_feature_names()
                    for i in range(len(names)):
                        train_features['bt_count-%s' %names[i]] = [row[i] for row in train_backtrace_count]
                        test_features['bt_count-%s' %names[i]] = [row[i] for row in test_backtrace_count]
            return train_features, test_features

        def process_exniffer(train_features, test_features):
            import ast
            for i in range(1, 45):
                train_features['feature%d' %i] = df_train['feature'].apply(lambda x: i in ast.literal_eval(x))
                train_features['feature%d' %i] = train_features['feature%d' %i].factorize(sort=True)[0]
                test_features['feature%d' %i] = df_test['feature'].apply(lambda x: i in ast.literal_eval(x))
                test_features['feature%d' %i] = test_features['feature%d' %i].factorize(sort=True)[0]
            return train_features, test_features

        train_features, test_features = process_engine(train_features, test_features)

        train_features.index = df_train.index
        test_features.index = df_test.index

        train_features, test_features = process_arch(train_features, test_features)
        train_features, test_features = process_mode(train_features, test_features)
        train_features, test_features = process_signal(train_features, test_features)
        train_features, test_features = process_crash_type(train_features, test_features)
        train_features, test_features = process_crash_instruction(train_features, test_features)
        train_features, test_features = process_crash_function(train_features, test_features)
        train_features, test_features = process_backtrace(train_features, test_features)
        train_features, test_features = process_exniffer(train_features, test_features)
        train_labels = df_train.security_id
        test_labels = df_test.security_id
        names = train_features.columns.values

    return train_features, test_features, train_labels, test_labels, names

def select_features(features, labels, names):
    corr = features.corr()
    columns = np.full((corr.shape[0],), True, dtype=bool)
    for i in range(corr.shape[0]):
        for j in range(i+1, corr.shape[0]):
            if corr.iloc[i,j] >= 0.9:
                if columns[j]:
                    columns[j] = False
    names = features.columns[columns]
    features = features[names]
    from sklearn.feature_selection import SelectKBest, chi2
    if features.shape[1] > 100:
        k = 100
    else:
        k = 'all'
    selected_features = SelectKBest(chi2, k=k).fit(features, labels).get_support()
    names = [names[i] for i in range(len(selected_features)) if selected_features[i]]
    features = features[names]
    features = features.values

    return features, names

def sampling(X, y, over, option):
    if over == 'over':
        if option == 1:
            X_sampled, y_sampled = RandomOverSampler().fit_sample(X, y)
        elif option == 2:
            X_sampled, y_sampled = ADASYN().fit_sample(X, y)
        elif option == 3:
            X_sampled, y_sampled = SMOTE().fit_sample(X, y)
    elif over == 'under':
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

def drop_features(names, choice):
    s_names = []
    for name in names:
        if 'feature' in name:
            if choice == 'exniffer' or choice == 'combi':
                s_names.append(name)
        else:
            if choice == 'crscope' or choice == 'combi':
                s_names.append(name)

    return s_names

def run(case, model, set_list, names, xlsx):
    model.learn(logger, set_list, names, 4, args.engine)
    model.log_data()
    case.add_accuracy(model.name, model.accuracy_score)
    case.add_aucs(model.name, model.roc_auc_score)
    case.add_tprs(model.name, model.tprs)
    xlsx.write(case.get_name(), model)
    print model.name
    print model.accuracy_score
    print model.roc_auc_score

if __name__ == "__main__":
    start_time = time.time()
    BaseManager.register('Logger', Logger)
    BaseManager.register('Case', Case)
    BaseManager.register('Xlsx', Xlsx)
    manager = BaseManager()
    manager.start()

    # parse arguments
    args = arg.parse(sys.argv[1:])

    # create logger
    logger = manager.Logger('%s.v%s' %(args.engine, args.version))
    
    # load dataset
    dataset = load_dataset(args.datafile.name)

    # create docx, xlsx for report
    docx = Docx(dataset, args.engine, args.version)
    xlsx = manager.Xlsx(args.engine, args.version)

    # create models
    cases = [
    #    manager.Case(False, True, False),
    #    manager.Case(False, False, True),
    #    manager.Case(False, True, True),
    #    manager.Case(True, True, False),
    #    manager.Case(True, False, True),
        manager.Case(True, True, True)
    ]

    models = [
#        MyLogisticRegression(),
#        MyRandomForestClassifier(),
        MyMultinomialNB(),
#        MyDecisionTreeClassifier(),
#        MyLinearSVC(),
#        MyMLPClassifier(),
    ]
    label_list = [model.name for model in models]

    if not os.path.exists('./dump/%s' %(args.engine)):
        os.makedirs('./dump/%s' %(args.engine))

    n = 4
    tscv = TimeSeriesSplit(n_splits=n)

    procs = []
    for case in cases:
        case.init_array(label_list)
        set_list = []
        names_list = []
        dump_file = './dump/%s/%s_%s_%s.dataset' %(args.engine, case.get_flag_preprocess(), case.get_flag_tfidvector(), case.get_flag_countvector())
        if os.path.isfile(dump_file):
            set_list, names_list = load(dump_file)
        else:
            for i, [train_index, test_index] in enumerate(tscv.split(dataset.df)):
                train_features, test_features, train_labels, test_labels, names \
                = extract_features(dataset.df.iloc[train_index], dataset.df.iloc[test_index], case.get_flag_preprocess(), case.get_flag_tfidvector(), case.get_flag_countvector())

                X_sample1, y_sample1 = sampling(train_features, train_labels, args.sampling, args.option)
                X_sample2, y_sample2 = sampling(test_features, test_labels, args.sampling, args.option)
                new_X = np.vstack([X_sample1, X_sample2])
                new_y = np.append(y_sample1, y_sample2)
                X_train, X_test, y_train, y_test = train_test_split(new_X, new_y, test_size=len(test_index), stratify=new_y)
                set_list.append([X_train, X_test, y_train, y_test])
                names_list.append(names)
            dump([set_list, names_list], dump_file)

        dump_file = './dump/%s/%s_%s_%s.%s_dataset' %(args.engine, case.get_flag_preprocess(), case.get_flag_tfidvector(), case.get_flag_countvector(), args.choice)
        if os.path.isfile(dump_file):
            new_set_list, new_names_list, info = load(dump_file)
        else:
            new_set_list = []
            new_names_list = []
            info = ['', '']
            for [X_train, X_test, y_train, y_test], names in zip(set_list, names_list):
                s_names = drop_features(names, args.choice)
                train_df = pd.DataFrame(X_train, columns=names)
                test_df = pd.DataFrame(X_test, columns=names)
                if args.choice == 'exniffer':
                    ss_names = s_names
                    new_X_train = train_df[s_names].values
                    new_X_test = test_df[s_names].values
                else:
                    new_X_train, ss_names = select_features(train_df[s_names], y_train, s_names)
                    new_X_test = test_df[ss_names].values
                new_set_list.append([new_X_train, new_X_test, y_train, y_test])
                new_names_list.append(ss_names)
                info[0] += '%s / %s\n' %(str(X_train.shape), str(X_test.shape))
                info[1] += '%s / %s\n' %(str(new_X_train.shape), str(new_X_test.shape))

            dump([new_set_list, new_names_list, info], dump_file)
        
        for model in models:
            proc = Process(target=run, name=model.name, args=(case, model, new_set_list, new_names_list, xlsx, ))
            procs.append(proc)
            proc.start()

        for proc in procs:
            proc.join()

        case.draw(docx.image_dir)
        docx.write(case.get_name(), case.get_figname(), info)
        xlsx.reset_col()

    docx.close()
    xlsx.close()
    print "Time: %s" %(time.time() - start_time)
