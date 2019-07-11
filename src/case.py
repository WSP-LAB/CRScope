import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from sklearn.metrics import auc

class Case:
    def __init__(self, *args):
        if len(args) == 1:
            self.name = args[0]
            self.figname = args[0]
            self.flag_preprocess = None
            self.flag_tfidvector = None
            self.flag_countvector = None
        else:
            preprocess = args[0]
            tfid = args[1]
            count = args[2]
            
            self.name = ""
            if preprocess == True:
                self.flag_preprocess = True
                self.name += "preprocess O\n"
            else:
                self.flag_preprocess = False
                self.name += "preprocess X\n"

            self.name += "string feature: "
            if tfid == True:
                self.flag_tfidvector = True
                self.name += "\nTfidfVectorizer"
            else:
                self.flag_tfidvector = False

            if count == True:
                self.flag_countvector = True
                self.name += "\nCountVectorizer"
            else:
                self.flag_countvector = False

            self.figname = "%s-%s-%s" %(preprocess, tfid, count)

        self.accuracy_list = {}
        self.aucs_list = {}
        self.tprs_list = {}

    def get_name(self):
        return self.name

    def get_figname(self):
        return self.figname

    def get_flag_preprocess(self):
        return self.flag_preprocess

    def get_flag_tfidvector(self):
        return self.flag_tfidvector

    def get_flag_countvector(self):
        return self.flag_countvector

    def init_array(self, model_list):
        for model in model_list:
            self.accuracy_list[model] = 0
            self.aucs_list[model] = 0
            self.tprs_list[model] = 0

    def add_accuracy(self, model, accuracy):
        self.accuracy_list[model] = accuracy

    def add_aucs(self, model, aucs):
        self.aucs_list[model] = aucs

    def add_tprs(self, model, tprs):
        self.tprs_list[model] = tprs
    
    def draw(self, path):
        self._draw_accuracy_graph(path)
        self._draw_auc_graph(path)

    def _draw_accuracy_graph(self, path):
        fig = plt.gcf()
        for i, accuracy in enumerate(self.accuracy_list.values()):
            plt.plot([i+1]*len(accuracy), accuracy, ".")
        plt.boxplot(self.accuracy_list.values(), labels=self.accuracy_list.keys())
        fig.savefig(path+'accuracy-%s.png' %self.figname)
        plt.close()

    def _draw_auc_graph(self, path):
        color_list = ['b', 'g', 'r', 'c', 'm', 'y', 'k', 'w']
        mean_fpr = np.linspace(0, 1, 101)

        for i, (label, tprs, aucs) in enumerate(zip(self.tprs_list.keys(), self.tprs_list.values(), self.aucs_list.values())):
            mean_tpr = np.mean(tprs, axis=0)
            mean_tpr[-1] = 1.0
            mean_auc = auc(mean_fpr, mean_tpr)
            std_auc = np.std(aucs)
            plt.plot(mean_fpr, mean_tpr, color=color_list[i], label=r'%s Mean ROC (AUC = %0.2f $\pm$ %0.2f)' % (label, mean_auc, std_auc), lw=2, alpha=.8)

        plt.xlim([-0.05, 1.05])
        plt.ylim([-0.05, 1.05])
        plt.xlabel('False Positive Rate')
        plt.ylabel('True Positive Rate')
        plt.legend(loc="lower right", fontsize=10)

        fig = plt.gcf()
        fig.savefig(path+'auc-%s.png' %self.figname)
        plt.close()

    def print_debug(self):
        print self.name
        print self.figname
        print self.flag_preprocess
        print self.flag_tfidvector
        print self.flag_countvector
        print self.accuracy_list
        print self.aucs_list
        print self.tprs_list
