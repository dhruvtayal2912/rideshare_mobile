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
        document.addEventListener('resume', onResume.bind(this), false);
        document.addEventListener("backbutton", onBackKeyDown, false);
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.

        $("#inputName").val(localStorage["Name"]);
        $("#inputEmail").val(localStorage["Email"]);        

        $('form').validator().on('submit', function (e) {
            if (e.isDefaultPrevented()) {
                // handle the invalid form...
            } else {
                if ($("#secondPage").css("display") == "none") {
                    $("#firstPage").css("display", "none");

                    $(".backArrow .glyphicon-chevron-left").css("display", "inline-block");
                    $("#secondPage").css("display", "block");
                    $("#secondPage").css("position", "absolute");
                    $("#secondPage").css("top", "85px");
                    $("#secondPage").css("padding-right", "30px");
                    $("#secondPage input[type=time]").prop('required', true);

                    return false;
                }
                else {
                    $('body').pleaseWait();

                    var profileData = {
                        Name: $("#inputName").val(),
                        Gender: $('input[name=sex]:checked').val(),
                        Email: $("#inputEmail").val(),
                        Contact: $("#inputContact").val(),
                        Address: $("#inputAddress").val(),
                        VehicleNo: $("#inputCarNumber").val(),
                        ShiftStartTime: $("#inputShiftStart").val(),
                        ShiftEndTime: $("#inputShiftEnd").val(),
                        Active: $('input[name=active]:checked').val()
                        //UserType: $('input[name=poolseek]:checked').val()
                    };

                    $.ajax({
                        url: "http://ndadevpc204:8082/api/employeedetail/createprofile",
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
                            window.location.href = "home.html";
                        },
                        error: function (xhr, status) {
                            $('body').pleaseWait('stop');
                            if (xhr.status == 401)
                                window.location.href = "login.html";
                            else
                                window.location.href = "login.html";
                                //alert("There is some problem at the moment. Please try again.")
                        }
                    });

                    return false;
                }
            }
        })

        $(".backArrow .glyphicon").on("click", function () {
            window.location.href = "profile.html";
        });
    };

    function onBackKeyDown() {
        window.location.href = "profile.html";
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();