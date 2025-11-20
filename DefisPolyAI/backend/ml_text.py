import os,re
from openai import OpenAI
client=OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
cats=['plastique','verre','papier','métal','organique','autre']

def parse(t):
    c='autre'; conf=0.5
    m1=re.search(r'categorie\s*:\s*(\w+)',t,re.I)
    m2=re.search(r'confiance\s*:\s*([0-9.]+)',t)
    if m1:
        v=m1.group(1).lower()
        for x in cats:
            if x in v: c=x
    if m2:
        try: conf=float(m2.group(1))
        except: pass
    return c,conf

def classify_text(desc):
    p=f'Determine la categorie parmi {cats} pour: {desc}\nReponds:\ncategorie: <cat>\nconfiance: <0-1>'
    r = client.responses.create(model="gpt-4o-mini", input=p)
    return parse(r.output_text)
