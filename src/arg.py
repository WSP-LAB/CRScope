import argparse

def create_parser():
    parser = argparse.ArgumentParser()
    parser.add_argument('datafile', type=argparse.FileType('r'), help='input data file')
    parser.add_argument('-e', '--engine', choices=['chakra', 'v8', 'spider', 'chakra_v8', 'chakra_spider', 'v8_spider', 'all'])
    parser.add_argument('-s', '--sampling', choices=['under', 'over'], default='over')
    parser.add_argument('-o', '--option', type=int, default=1)
    parser.add_argument('-c', '--choice', choices=['crscope', 'exniffer', 'combi'])
    parser.add_argument('-v', '--version')
    return parser

def parse(args):
    parser = create_parser()
    return parser.parse_args(args)

