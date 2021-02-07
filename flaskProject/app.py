from flask import Flask, json, jsonify, render_template
import pymysql
import datetime
import requests

app = Flask(__name__)
app.config["DEBUG"] = True

# Check DB connexion
db_host = "localhost"
try:
    db = pymysql.connect(
        host="localhost",
        user="root",
        password="",
        database="station_meteo")
    print("Connexion réussit !")
except (pymysql.err.InternalError, pymysql.err.OperationalError) as e:
    print("La DB n'éxiste pas elle va etre cree")
    print(repr(e))
    db = pymysql.connect(
        host="localhost",
        user="root",
        password="",
        database="station_meteo")
    sql = ["CREATE DATABASE station_meteo;"]
    with db.cursor() as cursor:
        for query in sql:
            cursor.execute(query)


@app.route('/')
def index():
    All_Data_Front = get_main_data_front()
    return render_template('index.html', content_list=All_Data_Front)


def get_main_data_front():
    r = requests.get("http://127.0.0.1:5000/API/RASPBERRY/GET_MAIN_DATA")
    All_Data = []
    for item in r.json():
        One_Data = {'date': item['DateAdd'], 'temperature': item['Temperature'], 'humidite': item['Humidite']}
        All_Data.append(One_Data)
        print(All_Data)
    return All_Data


# def hello_world():
#    return 'Bienvenue sur l\'API Station météo !'


# Ajouter la clé API
@app.route("/API/ESP/ADD_DATA/<float:xtemperature>,<int:xhumidite>", methods=['POST', 'GET'])
def post_data(xtemperature, xhumidite):
    xdateadd = datetime.datetime.now()
    sql = "INSERT INTO temp (Temperature, Humidite, DateAdd) VALUES (%s,%s,%s);"
    print(sql)
    with db.cursor() as cursor:
        cursor.execute(sql, (xtemperature, xhumidite, xdateadd))
        db.commit()
    return 'Ajout réussit !'


@app.route("/API/RASPBERRY/GET_MAIN_DATA", methods=['POST', 'GET'])
def get_main_data():
    sql = "SELECT CAST(DateAdd as CHAR) as DateAdd, CAST(Temperature AS CHAR) AS Temperature, CAST(Humidite AS CHAR) AS Humidite from temp ORDER BY DateAdd DESC LIMIT 7;"
    with db.cursor(pymysql.cursors.DictCursor) as cursor:
        try:
            cursor.execute(sql)
            result = cursor.fetchall()
        except Exception as e:
            result = "Pas OU trop de résultat \nError:" + str(e)
    return jsonify(result)


if __name__ == '__main__':
    app.run()