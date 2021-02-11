from flask import Flask, jsonify, render_template
import pymysql
import datetime
import socket
from secrets import token_urlsafe
import requests

app = Flask(__name__)

# Check DB connexion
db_host = "localhost"
try:
    db = pymysql.connect(
        host="localhost",
        user="root",
        password="toor",
        database="station_meteo")
    print("Connexion reussit !")
except (pymysql.err.InternalError, pymysql.err.OperationalError) as e:
    print("La DB n'existe pas elle va etre cree")
    print(repr(e))
    db = pymysql.connect(
        host="localhost",
        user="root",
        password="toor",
        database="station_meteo")
    sql = ["CREATE DATABASE station_meteo;"]
    with db.cursor() as cursor:
        for query in sql:
            cursor.execute(query)


# Ajouter des données dans la BDD
@app.route("/API/ESP/ADD_DATA/<float(signed=True):xtemperature>/<float(signed=True):xhumidite>", methods=['POST', 'GET'])
def post_data(xtemperature, xhumidite):
    xtimepickup = datetime.datetime.now()
    xdateadd = xtimepickup.date()
    xtimeadd = xtimepickup.strftime("%H:%M:%S")
    xsql = "INSERT INTO T_TEMPERATURE (DEGRES, HUMIDITE, DATEADD, HOURADD, ID_USER) VALUES (%s,%s,%s,%s,%s);"
    with db.cursor() as xcursor:
        xcursor.execute(xsql, (xtemperature, xhumidite, xdateadd, xtimeadd, 1))
        db.commit()
    return 'Ajout reussit !'


# Ajouter la recuperation de l'IP de l'utilisateur et l'afficher
@app.route("/API/RASPBERRY/GET_MAIN_DATA", methods=['POST', 'GET'])
def get_main_data():
    xtimepickup = datetime.datetime.now()
    xdateadd = xtimepickup.date()
    xSQL = "SELECT CAST(DATEADD as CHAR) as DateAdd, CAST(HOURADD as CHAR) as HourAdd, CAST(DEGRES AS CHAR) AS Temperature, CAST(Humidite AS CHAR) AS Humidite from T_TEMPERATURE WHERE DATEADD = %s ORDER BY HOURADD DESC LIMIT 1"
    with db.cursor(pymysql.cursors.DictCursor) as xcursor:
        try:
            xcursor.execute(xSQL, xdateadd)
            result = xcursor.fetchall()
        except Exception as xerr:
            result = "Une erreur est survenue ! :" + str(xerr)
    return jsonify(result)


# Inscription a l'interface local
@app.route("/API/RASPBERRY/SIGNUP/<string:xLastName>/<string:xFirstName>/<string:xCity>/<string:xEmail>/<string:xPassword>", methods=['POST', 'GET'])
def post_signup(xLastName, xFirstName, xCity, xEmail, xPassword):
    xDateAdd = datetime.date.today()
    xAPIKEY = token_urlsafe(32)
    print(xDateAdd)
    print(xAPIKEY)
    # Permet de recuperer l'IP local
    hostname = socket.gethostname()
    xIPUSER = socket.gethostbyname(hostname)

    xSQL = "INSERT INTO T_UTILISATEUR (NOM, PRENOM, VILLE, API_KEY, IPUSER, DATEADD, EMAIL, PASSWORD) VALUES (%s,%s,%s,%s,%s,%s,%s,%s);"
    print(xSQL)
    with db.cursor() as xcursor:
        xcursor.execute(xSQL, (xLastName, xFirstName, xCity, xAPIKEY, xIPUSER, xDateAdd, xEmail, xPassword))
        db.commit()
    return 'Inscription reussit !'


# Connexion a l'interface local
@app.route("/API/RASPBERRY/SIGNIN/<string:xEmail>/<string:xPassword>", methods=['POST', 'GET'])
def post_signin(xEmail, xPassword):
    xSQL = "SELECT PRENOM,EMAIL,PASSWORD FROM T_UTILISATEUR WHERE EMAIL=%s AND PASSWORD=%s;"
    with db.cursor() as xcursor:
        try:
            xcursor.execute(xSQL, (xEmail, xPassword))
            result = xcursor.fetchone()[0]
            if result == 0:
                print('Mot de passe ou utilisateur incorrect !')
            else:
                print('Identification reussit !')

        except Exception as xerr:
            result = "Une erreur est survenue ! :" + str(xerr)
    return result
    

@app.route("/API/RASPBERRY/GRAPH", methods=['POST', 'GET'])
def test():
    xDateToday = datetime.date.today()
    xDateTen = xDateToday - datetime.timedelta(days=10)
    xDateToday = xDateToday.strftime("%Y-%m-%d")
    xDateTen = xDateTen.strftime("%Y-%m-%d")

    xSQL = 'SELECT CAST(DATEADD as CHAR) AS DATEADD, CAST(ROUND(AVG(DEGRES), 1) AS CHAR) AS MOYTEMP, CAST(ROUND(AVG(HUMIDITE), 1) AS CHAR) AS MOYHUMI FROM T_TEMPERATURE WHERE DATEADD BETWEEN %s AND %s GROUP BY DATEADD'
    with db.cursor(pymysql.cursors.DictCursor) as xcursor:
        try:
            xcursor.execute(xSQL, (xDateTen, xDateToday))
            result = xcursor.fetchall()
            print(result)
        except Exception as xerr:
            result = "Une erreur est survenue ! :" + str(xerr)
    return jsonify(result)
    
    
# Affiche une erreur ESP dans la console de l'API
@app.route("/API/ESP/ERROR/<string:xError>", methods=['POST', 'GET'])
def post_error(xError):
    print(xError)
    return xError

    if __name__ == '__main__':
        app.run(debug=True, threaded=True, host='0.0.0.0', port="5000")
