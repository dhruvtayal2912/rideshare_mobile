// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );

        $('form').validator().on('submit', function (e) {
            if (e.isDefaultPrevented()) {
                $(".warning").css("display", "none");
                //Nothing to do if form is invalid
            } else {
                e.preventDefault();               

                var username = $("#inputName").val();
                var password = $("#inputPassword").val();
                //start spinner here
                $('body').pleaseWait();

                $.ajax({
                    type: 'GET',
                    url: "http://ndadevpc204:8082/api/account/login",
                    contentType: 'application/json',
                    dataType: 'json',
                    data: { username: username, password: password },
                    success: function (response) {
                        //stop spinner here   
                        $('body').pleaseWait('stop');

                        if (response.Token != null) {
                            // Create session. 
                            RideShare.Session.getInstance().set(response.Token);

                            if (response.ExistingProfileData != null) {
                                localStorage["Name"] = response.ExistingProfileData.Name;
                                localStorage["Email"] = response.ExistingProfileData.Email;
                            }
                            else
                            {
                                alert("There is some problem at the moment. Please try again.")
                                window.location.href = "login.html";
                            }

                            if (response.HasProfile) {
                                window.location.href = "home.html";
                            }
                            else {
                                window.location.href = "profile.html";                                                             
                            }
                            return false;
                        } else {
                            //TODO:Add custom code
                            alert("There is some error in generating token. Please try again.")
                            window.location.href = "login.html";
                        }
                    },
                    error: function (xhr, status, error) {
                        $('body').pleaseWait('stop');
                        $(".warning").css("display", "block");
                    }
                });
            }
            return false;
        })

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        //$("#btnLogin").on("click", function () {
            
        //});

        $(".backArrow .glyphicon").on("click", function () {
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