


var app = function () {
    this.APIURL = "http://ndadevpc204:8082/api";    
    this.data = {};
    this.viewType = "tab1";
    this.init();
    this.initEvents();
	
}
                
app.prototype.init = function () {
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
    $.ajax({
        type: "GET",
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + $.base64.encode(JSON.stringify(RideShare.Session.getInstance().get())));
        },
        url: this.APIURL + "/employeedetail/firsttimeempdata/" + encodeURIComponent("gurpreet.kaur1@markit.com"),
        contentType: 'application/json',
        crossDomain: true,
        success: function (data, status, xhr) {
            self.data = data;

            if (self.viewType == "tab1") {
                var mapObj = new Map(data);
                mapObj.render();
            }
            else if (self.viewType == "tab2") {
                var listObj = new List(data);
                listObj.render();
            }

        },
        error: function (err) {
            console.log(err);
        }
    });
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

