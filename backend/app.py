from flask import Flask, request, send_file
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from cnsenti import Sentiment

senti = Sentiment()
app = Flask(__name__)
# 下面这句话的含义尚不明确，这个地址是指什么？#
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

@app.route('/')
def index():
    return "Hello World!"

@app.route('/anotherPage')
def anotherPage():
    return "another Page."

@app.route('/Luo<route_variable>')
def handler(route_variable):
    print(route_variable)
    return route_variable

@app.route('/score', methods=['POST', 'GET'])
def score_handler():
    text = request.json['text']
    result = senti.sentiment_calculate(text)
    print(text)
    print(result)
    return {
        'pos': float(result['pos']),
        'neg': float(result['neg'])
    }

@app.route('/music', methods=['POST', 'GET'])
def music_handler():
    return send_file('./audio_resource/Lovestory.mp3')
def music_name():
    return {"name":"something"}

if __name__ == "__main__":
    app.run(debug=True)