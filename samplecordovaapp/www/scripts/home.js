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

        if (localStorage["Name"])
            $("#username").text(localStorage["Name"]);

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        $("#settings").on("click", function () {
            window.location.href = "editProfile.html";

        });
        $("#logOut").on("click", function () {
            bootbox.confirm("Are you sure you want to logout ?", function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        dataType: 'json',
                        url: "http://ndadevpc204:8082/api/account/logout",
                        data: JSON.stringify(RideShare.Session.getInstance().get()),
                        contentType: 'application/json',
                        crossDomain: true,
                        success: function (data, status, xhr) {
                            if (data.IsDeleted) {
                                localStorage.clear();
                            }
                            window.location.href = "login.html";
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                }
            });
        })

    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();