from flask import Flask, jsonify, render_template
import datetime
import requests

app = Flask(__name__)

@app.route("/", methods=['POST', 'GET'])
def index():
    All_Data_Front = get_main_data_front()
    return render_template('index.html', content_list=All_Data_Front)


@app.route("/SIGNUP", methods=['POST', 'GET'])
def SignUPPage():
    return render_template('logInRequest.html')


@app.route("/HISTORY", methods=['POST', 'GET'])
def History():
    return render_template('history.html')
    

def get_main_data_front():
    r = requests.get("http://127.0.0.1:5000/API/RASPBERRY/GET_MAIN_DATA")
    All_Data = []
    for item in r.json():
        One_Data = {'date': item['DateAdd'], 'time': item['HourAdd'], 'temperature': item['Temperature'], 'humidite': item['Humidite']}
        All_Data.append(One_Data)
    return All_Data
    

def test_get_main_data_front():
    r = requests.get("http://127.0.0.1:5000/API/RASPBERRY/GRAPH")
    All_Data = []
    i = 0
    for item in r.json():
        One_Data = {'i': i, 'xDATEADD': item['DATEADD'], 'xMOYTEMP': item['MOYTEMP'], 'xMOYHUMI': item['MOYHUMI']}
        All_Data.append(One_Data)
        i = i + 1
    return All_Data


# Affiche les données graph dans un HTML
@app.route("/API/RASPBERRY/GRAPH/FRONT", methods=['POST', 'GET'])
def test_front():
    All_Data_Front = test_get_main_data_front()
    return render_template('graph.html', content_list=All_Data_Front)

if __name__ == '__main__':
    app.run(debug=True, threaded=True, host='0.0.0.0', port="5001")
