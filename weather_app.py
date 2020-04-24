from flask import Flask,redirect,url_for,render_template,request,jsonify
import os
from time import time 
import requests
import re  
from pprint import pprint as pp
app=Flask(__name__)
app.config['SECRET_KEY']=os.environ.get('SECRET_KEY')
app.debug=True
app.config['API_KEY']='fae4bb6721af370142c6c5ecccb725a6'
app.config['API_URL']=('http://api.openweathermap.org/data/2.5/weather?q={}&mode=json&units=metric&appid={}')
def query_api(city):
    try:
        data=requests.get(app.config['API_URL'].format(city,app.config['API_KEY'])).json()
    except Exception as e: 
        print(e)
        data=None 
    return data
         
def choose_bg(): 
    images=[]
    imgs_folder='/'.join(os.path.abspath(__name__).split('/')[:-1])
    imgs_folder=os.path.join(imgs_folder,'static','images')
    
    
    imgs=os.walk(imgs_folder)  
    for _,_,img in imgs:  
        images.append(img)
   
    return images 
images=list(map(lambda x:str(x),choose_bg()[0]))

def match_background(weather,images):
    match='none'
    conditions={'sunny':images[-1],'clouds':images[0],'rain':images[-2],'thunderstorm':images[2],'clear-sky':images[-1]}
    pattern=weather
    for con in conditions.keys():
        if re.search(pattern,con):
            match=conditions[con]
            print(f'match found{con}\n{conditions[con]}')
    return match
 
 
@app.route("/")   
def home():       
    return render_template('home.htm')
              
          
@app.route("/weather",methods=['POST'])                
def get_weather(): 
    data=[]
    city=request.form.get('city')
    print(city)
    if city:
        resp=query_api(city) 
        pp(resp) 
        if resp:
            data.append(resp)
        if len(data)!=1:
            print('Bad response from the Weather API')
            return '1'
        weather={**data[0].get('weather')[0],**data[0].get('main')}
        print(weather)
        if not weather:
            return '1'
        weather['city']=city
    return jsonify(weather)
    
    
    
if __name__=="__main__":
    app.run()

