import os
import logging

LOGGING_LEVELS = {'critical': logging.CRITICAL,
                  'error': logging.ERROR,
                  'warning': logging.WARNING,
                  'info': logging.INFO,
                  'debug': logging.DEBUG}

class Logger:
    def __init__(self, name):
        self.logger = logging.getLogger()
        self.formatter = logging.Formatter('[%(levelname)s] %(message)s')

        # create handler
        fileHandler = logging.FileHandler('%s/%s.log' %(self._set_dir(), name))
#        streamHandler = logging.StreamHandler()
        # set format
        fileHandler.setFormatter(self.formatter)
#        streamHandler.setFormatter(self.formatter)

        # add handler
        self.logger.addHandler(fileHandler)
#        self.logger.addHandler(streamHandler)

        self.logger.setLevel(logging.DEBUG)

    def _set_dir(self):
        root = os.path.dirname(os.path.realpath(__file__))
        log_dir = '%s/../log' %root
        if os.path.isdir(log_dir) == False:
            os.system('mkdir -p %s' %log_dir)
        return log_dir

    def set_logging_level(self, level):
        self.logger.setLevel(LOGGING_LEVELS.get(level, logging.NOTSET))

    def log_critical(self, msg):
        self.logger.critical(msg)

    def log_error(self, msg):
        self.logger.error(msg)

    def log_warning(self, msg):
        self.logger.error(msg)

    def log_info(self, msg):
        self.logger.info(msg)

    def log_debug(self, msg):
        self.logger.debug(msg)

    def log(self, level, msg):
        self.logger.log(LOGGING_LEVELS.get(level, logging.NOTSET), msg)
