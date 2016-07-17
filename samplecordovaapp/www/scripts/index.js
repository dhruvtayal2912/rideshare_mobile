/// <reference path="../login.html" />
// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function redirect() {
        var sessionEmail = localStorage["Email"];
        var username = sessionEmail.split("@")[0];
        $.ajax({
            url: "http://ndadevpc204:8082/api/employeedetail/hasprofile",
            type: "GET",
            contentType: 'application/json',
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + $.base64.encode(JSON.stringify(RideShare.Session.getInstance().get())));
            },
            data: { username: username },
            crossDomain: true,
            success: function (response) {
                //stop spinner here
                $('body').pleaseWait('stop');
                if(response.Result)
                    window.location.href = "main.html";
                else
                    window.location.href = "profile.html";
            },
            error: function (xhr, status) {
                //stop spinner here
                $('body').pleaseWait('stop');
                if (xhr.status == 401)
                    window.location.href = "login.html";
                else
                    alert("There is some problem at the moment. Please try again.")
            }
        });
    };

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.

        $("#getStarted").on("click", function () {

            //start spinner here
            $('body').pleaseWait();

            var session = RideShare.Session.getInstance().get();

            var date = new Date();
            var nowDateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
            //var sessionExpiresOn = new Date(session.ExpiresOn);

            if (session != null && !(nowDateTime > new Date(session.ExpiresOn))) // TODO: Add !
            {
                redirect();
            }
            else
            {
                //stop spinner here
                $('body').pleaseWait('stop');
                window.location.href = "login.html";
            }
        });
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();