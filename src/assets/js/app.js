$(document).foundation();

$('img.thumbnail').hover(function() {
  var src = this.src;
  if (src.indexOf('_silly') == -1) {
    // Attach the silly in-between the image URL and the file extension
    // e.g. /img/tay.jpg -> /img/tay_silly.jpg
    this.src = src.substr(0, src.lastIndexOf('.')) + '_silly' + src.substr(src.lastIndexOf('.'));
  } else {
    // remove the _silly
    this.src = src.replace('_silly', '');
  }
});

var map;
var center;
function initMap() {
  center = {lat: 30.29572797626866, lng: -97.8402841479492};
  map = new google.maps.Map(document.getElementById('map_container'), {
          center: center,
          zoom: 10
        });

  var starhillMarker = new google.maps.Marker({
    position: {lat: 30.306641, lng: -97.981168},
    map: map,
    title: "Starhill Ranch"
  });
  google.maps.event.addListener(starhillMarker, 'click', function() {
    new google.maps.InfoWindow({
      content: `
        <b>Star Hill Ranch</b>
        <br />
        15000 Hamilton Pool Rd.
        <br />
        Bee Cave, TX, 78738
        <br />
        <a target="_new" href="http://www.starhillranch.com">http://www.starhillranch.com</a>
        <br />
        <a target="_new" href="https://maps.google.com?daddr=30.308125,-97.979794">Get Directions</a>
        `
    }).open(map, starhillMarker);
  });

  google.maps.event.addDomListener(window, 'resize', function() {
    var center = map.getCenter();
    google.maps.event.trigger(map, 'resize')
    map.setCenter(center);
  })
}
