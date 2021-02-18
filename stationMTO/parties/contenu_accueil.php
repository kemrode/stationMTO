<div class="primaryScreen padding border margin background_contenu">
            <div class="weatherScreen">
                <div class="weatherPicture">
                    <img class="taille "src="parties/style/image/sunExample.png">
                </div>
                <div class="lengendaryPicture">
                    <p class="legendary">Ensoleillé</p>
                </div>
                <div id="tempHumElementsContainer">
                    <div class="weatherTemperature border padding margin background_chaleur">
                        <p class="temperature">T = <span class="temperatureNumber">-5</span>°C </p>
                    </div>
                    <div class="weatherHumidty border padding  margin background_humidite">
                        <p class ="humidity">H = <span class="hygromethrieNumber">100</span>%</p>
                    </div>
                </div>

                <div id="gdhContainer">
                    <div class="date">
                        <p class="groupDate">12/02/2021</p>
                    </div>
                    <div class="hour">
                        <p class="groupHour">15h00</p>
                    </div>
                </div>
            </div>
            <div id="map"></div>
        </div>

    </div>

    <script src="parties/js/scriptJavaS.js"></script>
    <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA7cT9cVrGkQnxPPEi4llarfOx8-WtiQ-U&callback=initMap&libraries=&v=weekly"
    defer></script>
    <script src="parties/js/map.js"></script>