import urequests
import time
import si7021
from machine import I2C, Pin

while True:
    try:
        #Définition des pins des mesures
        i2c = I2C(Pin(2), Pin(0)) #0 ou 2  un ou lautre 
        s = si7021.SI7021(i2c)
            
        #Définitions des variables de température de d'humidité
        xtemp = round(s.temperature(),1)
        xhumidite = round(s.humidity(),1)
            
        #Post des donnéees
        xURL=("http://192.168.137.24:5000/API/ESP/ADD_DATA/{}/{}".format(xtemp,xhumidite))
        r = urequests.post(xURL)
        print(r)
            
        time.sleep(300) #300 = 5 minutes
    
    except:
        xErr = "ErreurLectureSonde"
        xURL=("http://192.168.137.24:5000/API/ESP/ERROR/{}".format(xErr))
        r = urequests.post(xURL)
