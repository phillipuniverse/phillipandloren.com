$(document).foundation();

$('img.thumbnail').hover(function() {
  var src = this.src;
  var sillyext = $(this).data('sillyext');
  var normalext = $(this).data('normalext');

  if (src.indexOf('_silly') == -1) {
    // Attach the silly in-between the image URL and the file extension
    // e.g. /img/tay.jpg -> /img/tay_silly.jpg

    this.src = src.substr(0, src.lastIndexOf('.')) + '_silly';
    if (sillyext) {
      this.src += '.' + sillyext;
      return;
    } else {
      this.src += src.substr(src.lastIndexOf('.'));
    }
  } else {
    // remove the _silly
    this.src = src.replace('_silly', '');
    if (normalext) {
      this.src = this.src.substr(0, this.src.lastIndexOf('.')) + '.' + normalext
    }
  }
});

var map;
var center;
var bounds;
function initMap() {
  center = {lat: 30.29572797626866, lng: -97.8402841479492};
  map = new google.maps.Map(document.getElementById('map_container'), {
          center: center,
          zoom: 12
        });

  google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
    bounds = map.getBounds();
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
    map.fitBounds(bounds);
  })
}
