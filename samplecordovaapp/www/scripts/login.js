// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        
        $("#btnLogin").on("click", function () {

            //TODO: start spinner here
            $.ajax({
                type: 'POST',
                url: "http://localhost:8082/api/account/login",
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({ email: "", password: "" }),
                success: function (resp) {
                //TODO: stop spinner here
                    if (resp.success === true) {
                        // Create session. 
                        var today = new Date();
                        var expirationDate = new Date();
                        expirationDate.setTime(today.getTime() + BookIt.Settings.sessionTimeoutInMSec);
                        BookIt.Session.getInstance().set({
                            userProfileModel: resp.extras.userProfileModel,
                            sessionId: resp.extras.sessionId,
                            expirationDate: expirationDate,
                            keepSignedIn: me.$chkKeepSignedIn.is(":checked")
                        });
                        window.location.href = "index.html";
                        return false;
                    } else {
                        //TODO:Add custom code
                    }
                },
                error: function (e) {
                    //TODO: stop spinner here
                    console.log(e.message);
                    //TODO: Use a friendlier error message below.
                }
            });
        });

        $(".header .glyphicon").on("click", function () {
            window.location.href = "index.html";
        });
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();