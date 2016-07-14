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
	if (result) {

		for (var index = 0; index < result.length; index++) {
			var markerOpt = {};
			markerOpt.lat = result[index].Latitude;
			markerOpt.lng = result[index].Longitude;
			markerOpt.description = result[index].Name + " " + result[index].Contact;
			markerOpt.Name = result[index].Name;
			markerOpt.Email = result[index].Email;
			markerOpt.Contact = result[index].Contact;
			markers.push(markerOpt);
		}
	}

	var mapOptions = {
		center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
		zoom: 10,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);


	var lat_lng = new Array();
	var latlngbounds = new google.maps.LatLngBounds();
	for (i = 0; i < markers.length; i++) {
		var data = markers[i]
		var myLatlng = new google.maps.LatLng(data.lat, data.lng);
		lat_lng.push(myLatlng);
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			title: data.title,
			labelAnchor: new google.maps.Point(22, 0),
			labelClass: "labels", // the CSS class for the label
			labelStyle: { opacity: 0.75 }
		});
		latlngbounds.extend(marker.position);
		(function (marker, data) {

			var content = '<div id="iw-container">' +
			'<div class="iw-content">' +
			'<div class="img"><img src="/images/user.png"></img></div>' +
			'<div class="iw-subTitle">' + data.Name + '</div>' +
			'<br>Phone.' + data.Contact + ' <br>e-mail: ' + data.Email + ' </p>' +
		  '</div>' +
		  '<div class="iw-bottom-gradient"></div>' +
			'</div>';

			var infoWindow = new google.maps.InfoWindow({ content: content, maxWidth: 300 });

			google.maps.event.addListener(marker, "click", function (e) {

				infoWindow.setContent(content);
				infoWindow.open(map, marker);
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

