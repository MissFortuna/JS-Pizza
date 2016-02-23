/**
 * Created by Elizabeth on 2/17/2016.
 */
function initialize() {

    var mapProp = {
        center: new google.maps.LatLng(50.464379,30.519131),
        zoom: 11
    };
    var html_element = document.getElementById("googleMap");
    var map = new google.maps.Map(html_element, mapProp);

}
google.maps.event.addDomListener(window, 'load', initialize);