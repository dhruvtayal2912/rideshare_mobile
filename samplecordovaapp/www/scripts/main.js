


var app = function () {
    debugger;
    this.APIURL = "http://ndadevpc204:8082/api";    
    this.data = {};
    this.viewType = "tab1";
    this.init();
    this.initEvents();
	
}
                
app.prototype.init = function () {
    debugger;
    this.getData();

}

app.prototype.initEvents = function () {
    var self = this;
    $(".views button").on("click", function () {
        var id = $(this).attr("id");
        self.viewType = id;
        self.getData();
    });
    
}


app.prototype.getData = function () {
    var self = this;	
	

    var data = {
        "Result": [
          {
              "Id": "2",
              "Name": "Gurpreet Kaur1",
              "Email": "gurpreet.kaur1@markit.com",
              "Contact": "1234567890",
              "Address": "71A, Double Storey, Patel Nagar - II, Ghaziabad",
              "Latitude": "28.6725917",
              "Longitude": "77.41947",
              "VehicleNo": "UP 14 AU 3546",
              "ShiftStartTime": "9.3",
              "ShiftEndTime": "6.3",
              "UserType": "1",
              "TravelFreq": "1",
              "Active": "1",
              "Radius": 0,
              "Gender": "1"
          },
          {
              "Id": "12",
              "Name": "Ashish Mishra",
              "Email": "ashish.mishra@markit.com",
              "Contact": "1234567890",
              "Address": "BH-386, 1st Floor, Sector - 12, Pratap Vihar, Ghaziabad",
              "Latitude": "28.6435841",
              "Longitude": "77.4120185",
              "VehicleNo": "UP 14 AU 3555",
              "ShiftStartTime": "9.3",
              "ShiftEndTime": "6.3",
              "UserType": "1",
              "TravelFreq": "1",
              "Active": "1",
              "Radius": 0,
              "Gender": "0"
          },
          {
              "Id": "13",
              "Name": "Virat Kohli",
              "Email": "virat.kohli@markit.com",
              "Contact": "9911786314",
              "Address": "Marium Nagar, Sewa Nagar, Ghaziabad, Uttar Pradesh ",
              "Latitude": "28.6825903",
              "Longitude": "77.4104942",
              "VehicleNo": "UP14 AC 9471",
              "ShiftStartTime": "10.2",
              "ShiftEndTime": "7.3",
              "UserType": "1",
              "TravelFreq": "1",
              "Active": "1",
              "Radius": 0,
              "Gender": "0"
          },
          {
              "Id": "14",
              "Name": "Rajeev Aggarwal",
              "Email": "Rajeev.aggarwal@markit.com",
              "Contact": "9911786314",
              "Address": "217 Richpalpuri,Opp Hapur Mod, GT Road, National Highway 91, Ghaziabad, Uttar Pradesh",
              "Latitude": "28.6691565",
              "Longitude": "77.4537578",
              "VehicleNo": "UP14 AC 9472",
              "ShiftStartTime": "10.2",
              "ShiftEndTime": "7.3",
              "UserType": "1",
              "TravelFreq": "1",
              "Active": "1",
              "Radius": 0,
              "Gender": "0"
          },
          {
              "Id": "19",
              "Name": "Ashok Dash",
              "Email": "Ashok.dash@markit.com",
              "Contact": "9911786314",
              "Address": "1/42, Sector-1,, Vaishali, Gaziabad(U.P), Ghaziabad",
              "Latitude": "28.6664553",
              "Longitude": "77.3871868",
              "VehicleNo": "UP14 AC 9477",
              "ShiftStartTime": "10.2",
              "ShiftEndTime": "7.3",
              "UserType": "1",
              "TravelFreq": "1",
              "Active": "1",
              "Radius": 0,
              "Gender": "0"
          },
          {
              "Id": "22",
              "Name": "Sumit Aggarwal",
              "Email": "Sumit.aggarwal@markit.com",
              "Contact": "9911786314",
              "Address": "Block G, Patel Nagar 3, Patel Nagar, Ghaziabad",
              "Latitude": "28.6754149",
              "Longitude": "77.4264492",
              "VehicleNo": "UP14 AC 9480",
              "ShiftStartTime": "10.2",
              "ShiftEndTime": "7.3",
              "UserType": "1",
              "TravelFreq": "1",
              "Active": "1",
              "Radius": 0,
              "Gender": "0"
          },
          {
              "Id": "24",
              "Name": "Parteek Garg",
              "Email": "parteek.garg@markit.com",
              "Contact": "9911786314",
              "Address": "Block G, Patel Nagar 3, Patel Nagar, Ghaziabad",
              "Latitude": "28.6754149",
              "Longitude": "77.4264492",
              "VehicleNo": "UP14 AC 9482",
              "ShiftStartTime": "10.2",
              "ShiftEndTime": "7.3",
              "UserType": "1",
              "TravelFreq": "1",
              "Active": "1",
              "Radius": 0,
              "Gender": "0"
          },
          {
              "Id": "15",
              "Name": "Nitin Sukhija",
              "Email": "nitin.sukhija@markit.com",
              "Contact": "9911786314",
              "Address": "99 Patel Nagar Marg Balmiki Colony Pocket N Patel Nagar 3 Ghaziabad",
              "Latitude": "28.671104",
              "Longitude": "77.425259",
              "VehicleNo": "UP14 AC 9473",
              "ShiftStartTime": "10.2",
              "ShiftEndTime": "7.3",
              "UserType": "1",
              "TravelFreq": "1",
              "Active": "1",
              "Radius": 0,
              "Gender": "0"
          },
          {
              "Id": "23",
              "Name": "Kumar Anand",
              "Email": "kumar.anand@markit.com",
              "Contact": "9911786314",
              "Address": "3rd, Patel Nagar 3, Patel Nagar, Ghaziabad",
              "Latitude": "28.671942",
              "Longitude": "77.425575",
              "VehicleNo": "UP14 AC 9481",
              "ShiftStartTime": "10.2",
              "ShiftEndTime": "7.3",
              "UserType": "1",
              "TravelFreq": "1",
              "Active": "1",
              "Radius": 0,
              "Gender": "0"
          }
        ]
    };

    debugger;
    if (self.viewType == "tab1") {
        var mapObj = new Map(data);
        mapObj.render();
    }
    else {
        var listObj = new List(data);
              listObj.render();
    }

    //$.ajax({
    //    type: "GET",
    //    dataType: 'json',
    //    url: this.APIURL + "/employeedetail/" + encodeURIComponent("gurpreet.kaur1@markit.com"),		
    //    contentType: 'application/json',
    //    crossDomain: true,
    //    success: function (data) {
    //        self.data = data;

    //        if (self.viewType == "tab1") {
    //            var mapObj = new Map(data);
    //            mapObj.render();
    //        }
    //        else if (self.viewType == "tab2") {
    //            var listObj = new List(data);
    //            listObj.render();
    //        }

    //    },
    //    error: function (err) {
    //        console.log(err);
    //    }
    //});
}


app.prototype.getFilteredData = function (filterOptions) {
    var self = this;
    console.log(JSON.stringify(filterOptions));

    $.ajax({
        url: "http://ndadevpc204:8082/api/search",
        type: "GET",
        data: {empData:JSON.stringify(filterOptions)},
        crossDomain: true,
        success: function (response) {
            console.log(response.status);
            alert(response.status);
        },
        error: function (xhr, status) { alert("error"); }
    });


    //$.ajax({
    //	type: "GET",
    //	dataType: 'json',
    //	url: "http://ndadevpc204:8082/api/search/" + JSON.stringify(filterOptions),
    //	contentType: 'application/json',
    //	crossDomain : true,
    //	success: function (data) {
    //		self.data = data;

    //		if (self.viewType == "tab1") {
    //			var mapObj = new Map(data);
    //			mapObj.render();
    //		}
    //		else if (self.viewType == "tab2") {
    //			var listObj = new List(data);
    //			listObj.render();
    //		}

    //	},
    //	error: function (err) {
    //		console.log(err);
    //	}
    //});
}

