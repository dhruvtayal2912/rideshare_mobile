var app = function () {

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
        $("#custom-search-input").hide();
        self.viewType = "list";
        if (appObj && appObj.data) {
            var listObj = new List(appObj.data);
            listObj.render();
        }
        else
            self.getData();
    });
    $("#btnMap").on("click", function () {
        self.viewType = "map";
        $("#custom-search-input").show()
        if (appObj && appObj.data) {
            var mapObj = new Map(appObj.data);
            mapObj.render();
        }
        else
            self.getData();


    });
    $("#search").on("click", $.proxy(self.getDataByAddress, self))
}


app.prototype.getData = function () {
    $('body').pleaseWait();
    var self = this;
    $.ajax({
        type: "GET",
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + $.base64.encode(JSON.stringify(RideShare.Session.getInstance().get())));
        },
        url: this.APIURL + "/employeedetail/firsttimeempdata/" + encodeURIComponent(localStorage["Email"]),
        contentType: 'application/json',
        crossDomain: true,
        success: function (data, status, xhr) {
            self.data = data;
            console.log(data);

            console.log(data.CurrentUserData);

            window.localStorage.setItem("CurrentUserData", JSON.stringify(data.CurrentUserData));

            if (self.viewType == "map") {
                var mapObj = new Map(data);
                mapObj.render();
            }
            else if (self.viewType == "list") {
                var listObj = new List(data);
                listObj.render();
            }
            if (data.Result.length > 0)
                $("#resCount").html("Matching " + data.Result.length + " Results")
            else
                $("#resCount").html("No Result found");

        },
        error: function (err) {
            console.log(err);
        },
        complete: function () {
            $('body').pleaseWait('stop');
        }
    });
}


app.prototype.getDataByAddress = function (address) {
    $('body').pleaseWait();
    var self = this;
    $.ajax({
        type: "GET",
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + $.base64.encode(JSON.stringify(RideShare.Session.getInstance().get())));
        },
        url: this.APIURL + "/employeedetail/getbyaddress/" + $(".search-query").val() + "/" + localStorage["Email"],
        contentType: 'application/json',
        crossDomain: true,
        success: function (data, status, xhr) {
            debugger;
            self.data = data;
            if (data.Result.length > 0)
                $("#resCount").html("Matching " + data.Result.length + " Results");
            else
                $("#resCount").html(" No Result found");

            if (self.viewType == "map") {
                var mapObj = new Map(data);
                mapObj.render();
            }
            else if (self.viewType == "list") {
                var listObj = new List(data);
                listObj.render();
            }

        },
        error: function (err) {

            bootbox.confirm("No result found, Please try with more accurate location ", function (result) { });
        },
        complete: function () {
            $('body').pleaseWait('stop');
        }
    });

}


app.prototype.getFilteredData = function (filterOptions) {
    var self = this;
    $('body').pleaseWait();
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
            self.data = response;
            $(".navbar-toggle").click();
            if (response.Result.length > 0)
                $("#resCount").html("Matching " + response.Result.length + " Results");
            else
                $("#resCount").html("No Result found");

            if (self.viewType == "map") {
                var mapObj = new Map(response);
                mapObj.render();
            }
            else if (self.viewType == "list") {
                var listObj = new List(response);
                listObj.render();
            }
        },
        error: function (xhr, status) {
            $(".navbar-toggle").click();
            if (xhr.status == 401)
                window.location.href = "login.html";
            else
                alert("There is some problem at the moment. Please try again.")
        },
        complete: function () {
            $('body').pleaseWait('stop');
        }
    });

}

