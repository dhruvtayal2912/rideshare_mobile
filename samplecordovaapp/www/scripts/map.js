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
    var result = this.mapData;
    debugger;
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
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
    var self = this;

    var lat_lng = new Array();
    var latlngbounds = new google.maps.LatLngBounds();
    var hasCurrentUserExists = false;
    if (markers.length > 0) {

        for (i = 0; i < markers.length; i++) {
            var data = markers[i]
            var myLatlng = new google.maps.LatLng(data.lat, data.lng);
            lat_lng.push(myLatlng);
            var icon = "";

            if (data.lat == this.currentUser.Latitude && data.lng == this.currentUser.Longitude) {
                icon = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
                hasCurrentUserExists = true;
            }
            else if (data.HasParking == "1")
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
                debugger;
                var hasParking;
                if (data.HasParking == "1")
                    hasParking = data.Name + " Has parking";
                else
                    hasParking = "";

                console.log(data);

                var content = '<div id="iw-container">' +
                    '<div style="border:1px solid grey;height:42px;width:42px"><img src="images/man_default.png" height="40px" width="40px" /></div>' +
                '<div class="iw-content" style="float:right;padding-left:10px;">' +
                '<div class="iw-subTitle" style="text-align: center;font-weight: bold;" >' + data.Name + '</div>' +
                '<br><span class="glyphicon glyphicon-phone"></span><a href="tel:' + data.Contact + '" style="margin-left:5px">'
                + data.Contact + '</a> <br><span class="glyphicon glyphicon-envelope"></span><span style="margin-left:5px">' + data.Email + '</span> </p>' +
                '</div>' +
                 '<div class="iw-bottom-gradient" style="color: green;font-weight: bold;text-align: center;">' + hasParking + '</div>' +
                '</div>';

                var infoWindow = new google.maps.InfoWindow({ content: content, maxWidth: 300 });

                google.maps.event.addListener(marker, "click", function (e) {
                    if (!(data.lat == self.currentUser.Latitude && data.lng == self.currentUser.Longitude)) {
                        infoWindow.setContent(content);
                        infoWindow.open(map, marker);
                    }
                    else {
                        infoWindow.setContent("Hey, that's You!");
                        infoWindow.open(map, marker);
                    }
                });
            })(marker, data);
        }
    }

        debugger;
        if (!hasCurrentUserExists) {

            var myLatlng = new google.maps.LatLng(self.currentUser.Latitude, self.currentUser.Longitude);
            var infowindow = new google.maps.InfoWindow({
                content: "Hey, that's you!"
            });

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,               
                labelAnchor: new google.maps.Point(22, 0),
                animation: google.maps.Animation.DROP,
                icon: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
                labelClass: "labels", // the CSS class for the label
                labelStyle: { opacity: 0.75 }
            });
            latlngbounds.extend(marker.position);
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
        }

        map.setCenter(latlngbounds.getCenter());
        map.fitBounds(latlngbounds);
    



    //this.mapOptions = {
    //    center: new google.maps.LatLng(this.currentUser.Latitude, this.currentUser.Longitude),
    //    zoom: 10,
    //    mapTypeId: google.maps.MapTypeId.ROADMAP
    //};

}

Map.prototype.getData = function () {
    var self = this;
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: this.APIURL + "/employeedetail/" + encodeURIComponent("dhruv.tayal@markit.com"),
        contentType: 'application/json',
        success: function (data) {

            self.markers = data;
            self.render();
        },
        error: function (err) {
            console.log(err);
        }
    });
}

