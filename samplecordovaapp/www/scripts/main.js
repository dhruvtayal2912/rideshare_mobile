var app = function () {
    debugger;
    this.APIURL = "http://ndadevpc204:8082/api";
    this.data = {};
    this.viewType = "map";
    this.init();
    this.initEvents();

}

app.prototype.init = function () {
    this.getData();

}

app.prototype.initEvents = function () {
    var self = this;
    $("#btnList").on("click", function () {
        self.viewType = "list";
        self.getData();
    });

    $("#btnMap").on("click", function () {
        self.viewType = "map";
        self.getData();
    })
}


app.prototype.getData = function () {
    debugger;
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

            console.log(data.CurrentUserData);

            if (self.viewType == "map") {
                var mapObj = new Map(data);
                mapObj.render();
            }
            else if (self.viewType == "list") {
                var listObj = new List(data);
                listObj.render();
            }

            if (data.Result.length)
                $("#resCount").html("Matching " + data.Result.length + " Results")

        },
        error: function (err) {
            console.log(err);
        }
    });
}


app.prototype.getFilteredData = function (filterOptions) {
    var self = this;

    //$('body').pleaseWait();
    console.log(JSON.stringify(filterOptions));
    debugger;
    $.ajax({
        url: "http://ndadevpc204:8082/api/employeedetail/getfiltereddata",
        type: "POST",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(filterOptions),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + $.base64.encode(JSON.stringify(RideShare.Session.getInstance().get())));
        },

        crossDomain: true,
        success: function (response) {
            debugger;
            //  $('body').pleaseWait('stop');
            self.data = data;
            $(".navbar-toggle").click();
            if (self.viewType == "map") {
                var mapObj = new Map(data);
                mapObj.render();
            }
            else if (self.viewType == "list") {
                var listObj = new List(data);
                listObj.render();
            }

        },
        error: function (xhr, status) {
            //  $('body').pleaseWait('stop');
            $(".navbar-toggle").click();
            if (xhr.status == 401)
                window.location.href = "login.html";
            else
                alert("There is some problem at the moment. Please try again.")
        }
    });

}

var obj = new app();