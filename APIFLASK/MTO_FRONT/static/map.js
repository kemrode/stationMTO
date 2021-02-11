let positSonde = { lat:49.382452 , lng: 1.075189};

function initMap(){
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: positSonde,
    });

    //the marker, positioned at positSonde
    const marker = new google.maps.Marker({
        position: positSonde,
        map: map,
    });
}