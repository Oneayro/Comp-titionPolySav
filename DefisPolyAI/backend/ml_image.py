import os,base64
from openai import OpenAI
from ml_text import parse
client=OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def classify_image(b,name):
    b64=base64.b64encode(b).decode()
    prompt='Determine la categorie du dechet.'
    r=client.responses.create(model='gpt-4o-mini',input=[{'role':'user','content':[ {'type':'input_text','text':prompt}, {'type':'input_image','image_url':f'data:image/jpeg;base64,{b64}'}]}])
    return parse(r.output_text)
