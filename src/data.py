import log
import pandas as pd

class Dataset:
    def __init__(self, logger, data):
        # for debug
        pd.set_option('display.max_columns', None)
        pd.set_option('display.max_rows', None)

        self.logger = logger

        # load data
        if type(data) == str:
            self.filename = data
            self.df = self._read_file()
        else:
            self.df = data

    def _read_file(self):
        self.logger.log("debug", "Read data from %s" %self.filename)
        return pd.read_csv(self.filename)

    def _get_null_data_list(self):
        return self.df.isnull().sum().to_string().splitlines()

    def _get_null_data(self, col):
        return self.df[self.df[col].isnull()].to_string().splitlines()[1:]

    def get_size(self):
        return list(self.df.shape)

    def drop_na(self, fields):
        old_size = self.get_size()
        if type(fields) is list:
            self.df = self.df.dropna(subset=fields)
        elif type(fields) is str:
            self.df = self.df.dropna(subset=[fields])
        new_size = self.get_size()
        self.logger.log("debug", "Data size: %s -> %s" %(old_size, new_size))
        self.df = self.df.fillna('')

    def analyze_null(self, columns):
        msg = "Analyze null data\n"
        msg += "[*] Null data:\n"
        null_data = self._get_null_data_list()
        for line in null_data:
            msg += ("  %s\n" %line)
            line = line.split()
            if line[0] in columns and int(line[1]) != 0:
                data_list = self._get_null_data(line[0])
                for data in data_list:
                    msg += ("  => %s\n" %data)
        self.logger.log("info", msg)

    def count(self):
        security_id = dict(self.df[['security', 'security_id']].drop_duplicates().values)
        count = self.df.security.value_counts()
        msg = "Data ratio:\n"
        msg += "\t=> security(%s)   : %s\n" %(security_id['security'], count['security'])
        msg += "\t=> No-security(%s): %s\n" %(security_id['No-security'], count['No-security'])
        msg += "\t----------------- : %d" %(len(self.df))
        self.logger.log("info", msg)
        return {'security(%d)'%(security_id['security']):count['security'], 
        'No-security(%d)'%(security_id['No-security']):count['No-security'],
        'total':len(self.df)}

    def factorize_label(self):
        self.df['security_id'] = self.df['security'].factorize()[0]

    def sort_date(self):
        self.df['date'] = pd.to_datetime(self.df.date)
        self.df = self.df.sort_values(by='date')
