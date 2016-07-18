var Map = function (options) {
    this.APIURL = "http://ndadevpc204:8082/api";
    $("#listViewDv").hide();
    $("#dvMap").show();

    this.mapOptions = {};
    if (options) {
        //this.currentLat = options.latitude;
        //this.currentLong = options.longitude;
        //this.$mapDiv = options.$divId;
        this.mapData = options.Result;
        this.currentUser = options.CurrentUserData;
    }
    //initialize map
    //this.init();
}

Map.prototype.RenderMap = function () {

    var map = new google.maps.Map(this.$mapDiv, this.mapOptions);
    var infoWindow = new google.maps.InfoWindow();
    var lat_lng = new Array();
    var latlngbounds = new google.maps.LatLngBounds();
    for (i = 0; i < this.mapData.length; i++) {
        var data = this.mapData[i]
        var myLatlng = new google.maps.LatLng(data.lat, data.lng);

        lat_lng.push(myLatlng);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: data.title
        });
        latlngbounds.extend(marker.position);
        (function (marker, data) {
            google.maps.event.addListener(marker, "click", function (e) {
                infoWindow.setContent(data.description);
                infoWindow.open(map, marker);
            });
        })(marker, data);
    }
    map.setCenter(latlngbounds.getCenter());
    map.fitBounds(latlngbounds);
}

Map.prototype.getMapData = function () {

}

Map.prototype.init = function () {
    //this.getData();
}

Map.prototype.render = function (result) {

    var markers = [];
    debugger;
    var result = this.mapData;
    if (result) {

        for (var index = 0; index < result.length; index++) {
            var markerOpt = {};
            markerOpt.lat = result[index].Latitude;
            markerOpt.lng = result[index].Longitude;
            markerOpt.description = result[index].Name + " " + result[index].Contact;
            markerOpt.Name = result[index].Name;
            markerOpt.Email = result[index].Email;
            markerOpt.Contact = result[index].Contact;
            markerOpt.HasParking = result[index].HasParking;
            markers.push(markerOpt);
        }
    }

    var mapOptions = {
        center: new google.maps.LatLng(this.currentUser.Latitude, this.currentUser.Longitude),
        zoom: 2,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
    var self = this;

    var lat_lng = new Array();
    var latlngbounds = new google.maps.LatLngBounds();
    for (i = 0; i < markers.length; i++) {
        var data = markers[i]
        var myLatlng = new google.maps.LatLng(data.lat, data.lng);
        lat_lng.push(myLatlng);
        var icon = "";

        if (data.lat == this.currentUser.Latitude && data.lng == this.currentUser.Longitude)
            icon = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
        else if (data.HasParking)
            icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
        else
            icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';


        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: data.title,
            labelAnchor: new google.maps.Point(22, 0),
            animation: google.maps.Animation.DROP,
            icon: icon,
            labelClass: "labels", // the CSS class for the label
            labelStyle: { opacity: 0.75 }
        });
        latlngbounds.extend(marker.position);
        (function (marker, data) {

            var hasParking;
            if (data.HasParking)
                hasParking = data.Name + " Has parking";
            else
                hasParking = "";

            var content = '<div id="iw-container">' +
			'<div class="iw-content">' +
			'<div class="iw-subTitle">' + data.Name + '</div>' +
			'<br><span class="glyphicon glyphicon-phone"></span><a href="tel:' + data.Contact + '">' + data.Contact + '</a> <br><span class="glyphicon glyphicon-envelope"></span>' + data.Email + ' </p>' +
		    '</div>' +
             '<div class="iw-bottom-gradient">' + hasParking + '</div>' +
			'</div>';

            var infoWindow = new google.maps.InfoWindow({ content: content, maxWidth: 300 });

            google.maps.event.addListener(marker, "click", function (e) {
                if (!(data.lat == self.currentUser.Latitude && data.lng == self.currentUser.Longitude)) {
                    infoWindow.setContent(content);
                    infoWindow.open(map, marker);
                }
            });
        })(marker, data);
    }
    map.setCenter(latlngbounds.getCenter());
    map.fitBounds(latlngbounds);


    this.mapOptions = {
        center: new google.maps.LatLng(this.currentLat, this.currentLong),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

}

Map.prototype.getData = function () {
    var self = this;
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: this.APIURL + "/employeedetail/" + encodeURIComponent("dhruv.tayal@markit.com"),
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            self.markers = data;
            self.render();
        },
        error: function (err) {
            console.log(err);
        }
    });
}

