import re
from jisho_api.sentence import Sentence
r = Sentence.request('水')

for a in r.data:
    pattern = r'\((.*?)\)'

    matches = re.findall(pattern, a.japanese)
    for match in matches:
        a.japanese = a.japanese.replace("({})".format(match), '')

    print(matches)
    print(a.japanese)
    print(a.en_translation)
    print()
