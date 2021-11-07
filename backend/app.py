from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from cnsenti import Sentiment

senti = Sentiment()
app = Flask(__name__)
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

if __name__ == "__main__":
    app.run(debug=True)