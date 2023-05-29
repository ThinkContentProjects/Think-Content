# The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
from firebase_functions import https_fn
from firebase_admin import initialize_app
from pexels_api import API
import openai
import re
import requests
import json
 
app = initialize_app()

openai.api_key = _
PEXELS_API_KEY = _

@https_fn.on_call()
def captionGenerator(req: https_fn.CallableRequest):

    prompt = f'''
    Create an idea for an Instagram post based on the information below. The output should be composed of three sections: the creative, the creative's seo short sentence, and the caption with hashtags. Describe the creative, the creative seo short-sentence, and write the caption without any additional explanations.

    Company name: {req.data['brand']['name']}
    Company mission: {req.data['brand']['mission']}
    Industry: {req.data['brand']['industry']}
    Target Audience: "Middle aged women"
    Brand Message: {req.data['brand']['message']}

    Type of post and it's objective: {req.data['inputs']['type']}
    Post format: {req.data['inputs']['format']}
    Note (Ignore if empty): {req.data['inputs']['details']}

    Creative: (Detailed description of the creative relevant to the type of post and its objective, post format, and company details)

    Creative SEO short sentence: (Visualize the image the social media creative is trying to convey. Based on this mental image, extract the main themes and keywords that are relevant for optimizing search results for images associated with the post. Consider the context, objects, emotions, and industry-specific keywords. Provide a single short sentence that captures the essence of the social media creative, incorporating relevant keywords without mentioning the company name.

    1. Visualize the social media creative the sentence is describing.
    2. Identify the main themes, objects, emotions, and industry-specific keywords in the creative.
    3. Create a single short sentence that captures the essence of the image or concept, incorporating relevant keywords.

    Please provide your response in the form of a short sentence that captures the essence of the social media creative based on the input sentence, without mentioning the company name, and accounting for the industry if necessary.)

    Caption: (Well-written and engaging caption that is relevant to the type of post and its objective, post format, and company details)

    (Please do not provide any explanations for the caption, or creative.)
    '''
    # create a chat completion
    completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role": "system", "content": "You are an expert social media manager"},
                                                                                    {"role": "user", "content": prompt}])

    result = re.split(r'\n+', completion.choices[0].message.content)
    return {"creative": result[0].split("Creative: ")[1],
            "search": result[1].split("Creative SEO short sentence: ")[1],
            "caption": result[2].split("Caption: ")[1]
            }

'''
Generate 4 images using from pexels 
'''
@https_fn.on_call()
def imageGenerator(req: https_fn.CallableRequest):
    api = API(PEXELS_API_KEY)
    return api.search(req.data['search'], page=1, results_per_page=4)

@https_fn.on_call()
def regenerateCaption(req: https_fn.CallableRequest):
    prompt = f'''Please reword the following caption to have it better reflect the creative: 
    
    Creative: {req.data['creative']}
    
    Caption: {req.data['caption']}
    '''

    completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role": "system", "content": "You are an expert social media manager"},
                                                                                    {"role": "user", "content": prompt}])
    
    return {"caption": completion.choices[0].message.content}

'''
Get the next page of pexel results
'''
@https_fn.on_call()
def regenerateImages(req: https_fn.CallableRequest):

    headers = {
        "Authorization": PEXELS_API_KEY
    }
    response = requests.get(req.data['next_page_url'], headers=headers)
    
    return json.loads(response.text)