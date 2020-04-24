from flask import Flask,redirect,url_for,render_template,request,jsonify
import os
from time import time 
import requests 
app=Flask(__name__)
app.config['API_KEY']='fae4bb6721af370142c6c5ecccb725a6'
app.config['API_URL']=('http://api.openweathermap.org/data/2.5/weather?q={}&mode=json&units=metric&appid={}')
def query_api(city):
    try:
        data=requests.get(app.config['API_URL'].format(city,app.config['API_KEY'])).json()
    except Exception as e: 
        data=None 
    return data
         
 
@app.route("/")   
def home():       
    return render_template('home.htm')
              
          
@app.route("/weather",methods=['POST'])                
def get_weather(): 
    data=[]
    city=request.form.get('city')
    if city:
        resp=query_api(city) 
        if resp:
            data.append(resp)
        if len(data)!=1:
            return '1'
        weather={**data[0].get('weather')[0],**data[0].get('main')}
        print(weather)
        if not weather:
            return '1'
        weather['city']=city
    return jsonify(weather)
    

