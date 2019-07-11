import sys

def triage_nullderef(value):
    import ast
    value = ast.literal_eval(value)
    if len(value) == 0:
        return -1
    for v in value:
        if v == 'True':
            return 1
    return 0

def count_char(string, char):
    cnt = 0
    for s in string:
        if s == char:
           cnt += 1
    return cnt

def parse_function(name):
    const = False
    return_type = []
    namespace = []
    class_name = ""
    function_name = ""
    template = ""

    name = name.replace('->','')

    if len(name.split()) > 0 and name.split()[-1] == 'const':
        const = True
    
    # drop arguments
    full_name = ""
    inTemplate = False
    cntTemplate = 0
    for i, n in enumerate(name):
        if n == "<":
            inTemplate = True
            cntTemplate += 1
        elif n == ">":
            cntTemplate -= 1
        if inTemplate and cntTemplate == 0:
            inTemplate = False
        if inTemplate == False and n == "(":
            full_name = name[:i]
            break
    if full_name == "":
        full_name = name
    
    name_list = full_name.split('::')
    new_name_list = []
    tmp = ""
    cnt = 0
    new_cnt = 0
    for name in name_list:
        new_cnt += count_char(name, '<')
        new_cnt -= count_char(name, '>')
        if cnt == 0 and new_cnt > 0:
            tmp += name
        elif cnt > 0 and new_cnt > 0:
            tmp += "::"
            tmp += name
        elif cnt > 0 and new_cnt == 0:
            tmp += "::"
            tmp += name
            new_name_list.append(tmp)
            tmp = ""
        elif cnt == 0 and new_cnt == 0:
            new_name_list.append(name)
        cnt = new_cnt
    
    name_list = new_name_list
    
    if len(name_list) >= 3:
        namespace = name_list[:-2]
        class_name = name_list[-2]
        function_name = name_list[-1].split('<')[0]
    elif len(name_list) == 3:
        namespace = [name_list[0]]
        class_name = name_list[1]
        function_name = name_list[2].split('<')[0]
    elif len(name_list) == 2:
        class_name = name_list[0]
        function_name = name_list[1].split('<')[0]
    elif len(name_list) == 1:
        function_name = name_list[0].split('<')[0]

    for i, name in enumerate(namespace):
        if len(name.split()) >= 2 and '<' not in name.split()[0]:
            return_type.append(' '.join(name.split()[:-1]))
            namespace[i] = name.split()[-1]

    if len(class_name.split()) >= 2 and '<' not in class_name.split()[0]:
        return_type = class_name.split()[:-1]
        class_name = class_name.split()[-1]

    if '<' in function_name and '>' in function_name:
        template = function_name[function_name.find('<'):function_name.find('>')+1]

    return namespace, class_name, function_name
