import urequests
import time
import si7021
from machine import I2C, Pin
from i2c_lcd8050 import I2cLcd
import si7021
        
while True:
    try:
        #Définition des pins des mesures
        DEFAULT_I2C_ADDR = 0x27
        i2C_c = machine.I2C(machine.Pin(2), machine.Pin(0))
        i2C_l = I2C(scl=Pin(2), sda=Pin(0))
        s = si7021.SI7021(i2C_c)
        lcd = I2cLcd(i2C_l, DEFAULT_I2C_ADDR, 2, 16)

        #Définitions des variables de température de d'humidité
        xtemp = round(s.temperature(),1)
        xhumidite = round(s.humidity(),1)
            
        #Mise a jour de l'écran
        lcd.clear()
        lcd.putstr("Temp : " + str(xtemp) + " C \nHumidite : "  + str(xhumidite) + "%")
        #Post des donnéees
        xURL=("http://192.168.137.24:5000/API/ESP/ADD_DATA/{}/{}".format(xtemp,xhumidite))
        r = urequests.post(xURL)
        print(r)
                
        time.sleep(300) #300 = 5 minutes
        
    except:
        xErr = "ErreurLectureSonde"
        xURL=("http://192.168.137.24:5000/API/ESP/ERROR/{}".format(xErr))
        r = urequests.post(xURL)
        print(xErr)

