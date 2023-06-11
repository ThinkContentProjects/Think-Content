# The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
from firebase_functions import https_fn
from firebase_admin import initialize_app
from pexels_api import API
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field
import requests
import os
import json

app = initialize_app()

class Post(BaseModel):
    caption: str = Field(description="caption")
    creative: str = Field(description="creative")
    seo: str = Field(description="keyword sentence")

class Caption(BaseModel):
    caption: str = Field(description="caption")

@https_fn.on_call(secrets=["OPENAI_API_KEY"])
def captionGenerator(req: https_fn.CallableRequest):

    model = OpenAI(temperature=.8, model_name='text-davinci-003',
                       openai_api_key=os.environ.get('OPENAI_API_KEY'))

    parser = PydanticOutputParser(pydantic_object=Post)

    template = '''
    Create an idea for an Instagram post based on the information below. The output must be composed of three sections: the creative, the creative's seo short sentence, and the caption with hashtags.

    Company name: {name}
    Company mission: {mission}
    Industry: {industry}
    Target Audience: "Middle aged women"
    Brand Message: {message}

    Type of post and it's objective: {post_type}
    Post format: {post_format}
    Note (Ignore if empty): {post_notes}

    Creative: (Detailed description of the creative relevant to the type of post and its objective, post format, and company details)

    Creative SEO short sentence: (Based on the creative, extract the main themes and keywords that are relevant for optimizing search results for images associated with the post. Consider the context, objects, emotions, and industry-specific keywords. Provide a single short sentence that captures the essence of the social media creative, incorporating relevant keywords without mentioning the company name.)
    
    Caption: (Well-written and engaging caption that is relevant to the type of post and its objective, post format, and company details. Make this at least 3-5 sentences with 5 to 8 hashtags. Use 0-2 emojis.)

    {format_instructions}
    '''

    prompt = PromptTemplate(
        template=template,
        input_variables=["post_type", "post_format",
                         "post_notes", "name", "mission", "industry", "message"],
        partial_variables={
            "format_instructions": parser.get_format_instructions()}
    )

    _input = prompt.format(post_type=req.data['brand']['name'], post_format=req.data['inputs']['format'], post_notes=req.data['inputs']['details'],
                           name=req.data['brand']['name'], mission=req.data['brand']['mission'], industry=req.data['brand']['industry'], message=req.data['brand']['message'])
    output = model(_input)

    return {"caption": parser.parse(output).caption, "creative": parser.parse(output).creative, "search": parser.parse(output).seo}


'''
Generate 4 images using from pexels 
'''
@https_fn.on_call(secrets=["PEXELS_API_KEY"])
def imageGenerator(req: https_fn.CallableRequest):
    api = API(os.environ.get('PEXELS_API_KEY'))
    return api.search(req.data['search'], page=1, results_per_page=4)


@https_fn.on_call(secrets=["OPENAI_API_KEY"])
def regenerateCaption(req: https_fn.CallableRequest):

    model = OpenAI(temperature=.8, model_name='text-davinci-003',
                       openai_api_key=os.environ.get('OPENAI_API_KEY'))

    parser = PydanticOutputParser(pydantic_object=Caption)

    template = '''Please reword the following caption to have it better reflect the creative. Make this at least 3-5 sentences with 5 to 8 hashtags. Use 0-2 emojis: 
    
    Creative: {creative}
    
    Caption: {caption}
    {format_instructions}
    '''

    prompt = PromptTemplate(
        template=template,
        input_variables=["creative", "caption"],
        partial_variables={
            "format_instructions": parser.get_format_instructions()}
    )

    _input = prompt.format(creative=req.data['creative'], caption=req.data['caption'])
    output = model(_input)

    return {"caption": parser.parse(output).caption}


'''
Get the next page of pexel results
'''
@https_fn.on_call(secrets=["PEXELS_API_KEY"])
def regenerateImages(req: https_fn.CallableRequest):

    headers = {
        "Authorization": os.environ.get('PEXELS_API_KEY')
    }
    response = requests.get(req.data['next_page_url'], headers=headers)

    return json.loads(response.text)