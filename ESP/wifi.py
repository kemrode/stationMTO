import network
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect('AndroidAP', 'dhbf9600')
print('network config:', wlan.ifconfig())