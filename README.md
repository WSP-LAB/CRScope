# CRScope

CRash Scope (CRScope) is a ML-guided crash classifier of a given JavaScript engine crash-dump file.


## Installation
1. Install dependencies
	```
	sudo apt update
	sudo apt install python-pip python-dev

	sudo pip install pandas==0.23.0
	sudo pip install scipy==1.0.0
	sudo pip install scikit-learn==0.20.3
	sudo pip install imbalanced-learn==0.3.3
	sudo pip install matplotlib==2.1.0
	sudo pip install python-docx==0.8.6
	sudo pip install XlsxWriter==1.0.2
	sudo pip install joblib==0.11
	```

2. Clone `CRScope`
	```
	git clone https://github.com/WSP-LAB/CRScope.git
	cd CRScope
	```

## Usage
1. Prepare the csv file that contains feature information of each crash instance.
   - We provide sample csv files in `./data` directory.

2. Run CRScope
	```
	usage: CRScope.py [-h]
	                  [-e {chakra,v8,spider,chakra_v8,chakra_spider,v8_spider,all}]
	                  [-s {under,over}] [-o OPTION] [-c {crscope,exniffer,combi}]
	                  [-v VERSION]
	                  datafile
	```
	- `-s`, `-o`: Sampling method for balancing security and non-security data
		- `-s over`: Oversampling
			- `-o 1`: RandomOverSampler
			- `-o 2`: ADASYN
			- `-o 3`: SMOTE
		- `-s under`: Undersampling
			- `-o 1`: RandomUnderSampler
			- `-o 2`: TomekLinks
			- `-o 3`: CondensedNearestNeighbour
			- `-o 4`: OneSidedSelection
			- `-o 5`: EditedNearestNeighbours
			- `-o 6`: NeighbourhoodCleaningRule
		- reference: https://imbalanced-learn.readthedocs.io/en/stable/user_guide.html
	- `-c`: The choice for using which type of feature
		- `crscope`: CRScope
		- `exniffer`: Exniffer
		- `combi`: CRScope + Exniffer
	- `-e`, `-v`: For naming result directory and files
		- `-e`: A directory with the selected engine name will be created
		- `-v`: Result files with the version name will be created

	- For example,
		```
		$ ./CRScope.py -e chakra -s over -o 1 -c crscope -v chakra_crscope_v1 ./data/chakra.csv
		```

3. The final reports will be saved in `result` directory.

More details can be found in the [paper](./paper.pdf).
