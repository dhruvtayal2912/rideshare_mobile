// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        document.addEventListener("backbutton", onBackKeyDown, false);

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.

        $("#inputName").val(localStorage["Name"]);
        $("#inputEmail").val(localStorage["Email"]);

        $('form').validator().on('submit', function (e) {
            debugger;
            if (e.isDefaultPrevented()) {
                // handle the invalid form...
            } else {


                $('body').pleaseWait();

                var profileData = {
                    Contact: $("#inputContact").val(),
                    Address: $("#inputAddress").val(),
                    VehicleNo: $("#inputCarNumber").val(),
                    ShiftStartTime: $("#inputShiftStart").val(),
                    ShiftEndTime: $("#inputShiftEnd").val(),
                    Active: $('div.toggle').hasClass("off") ? 0 : 1,
                    Email: localStorage["Email"]
                };

                $.ajax({
                    url: "http://ndadevpc204:8082/api/employeedetail/EditProfile",
                    type: "POST",
                    contentType: 'application/json',
                    dataType: 'json',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + $.base64.encode(JSON.stringify(RideShare.Session.getInstance().get())));
                    },
                    data: JSON.stringify(profileData),
                    crossDomain: true,
                    success: function (response) {
                        $('body').pleaseWait('stop');
                        $(".warning").show();
                        $(".warning").html("Record has been updated successfully");
                    },
                    error: function (xhr, status) {
                        $('body').pleaseWait('stop');
                        $(".warning").html("There is some problem in saving data");
                        $(".warning").show();

                    }
                });

                return false;
            }

        })

        $(".backArrow .glyphicon").on("click", function () {
            window.location.href = "home.html";
        });
    };

    function onBackKeyDown() {
        window.location.href = "home.html";
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();