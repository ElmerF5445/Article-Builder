function Clock_Update_Time(){
    const today = new Date();
	let h = today.getHours();
	let m = today.getMinutes();
	let s = today.getSeconds();
	m = checkTime(m);
	s = checkTime(s);
	//var = displayTime;
	
	var displayHour;
	
	switch(h){
		case 0:
		var displayHour = 12;
		break;
		case 13:
		var displayHour = 1;
		break;
		case 14:
		var displayHour = 2;
		break;
		case 15:
		var displayHour = 3;
		break;
		case 16:
		var displayHour = 4;
		break;
		case 17:
		var displayHour = 5;
		break;
		case 18:
		var displayHour = 6;
		break;
		case 19:
		var displayHour = 7;
		break;
		case 20:
		var displayHour = 8;
		break;
		case 21:
		var displayHour = 9;
		break;
		case 22:
		var displayHour = 10;
		break;
		case 23:
		var displayHour = 11;
		break;
		default:
		var displayHour = h;
	}
	// if (pageProperty_enableGreetings == 1){
	// 		if (h >= 0 && h<=6){
	// 			document.getElementById('pageElement_Greeting').innerHTML = "Good Evening";
	// 		}
	// 		if (h >= 6 && h<=11){
	// 			document.getElementById('pageElement_Greeting').innerHTML = "Good Morning";
	// 		}
	// 		if (h >= 12 && h<=18){
	// 			document.getElementById('pageElement_Greeting').innerHTML = "Good Afternoon";
	// 		}
	// 		if (h >= 19 && h<=24){
	// 			document.getElementById('pageElement_Greeting').innerHTML = "Good Evening";
	// 		}
	// 		/*if(Behavior_DisplayGreetings_DisplayName == true){
	// 			if (h >= 0 && h<=6){
	// 				document.getElementById('pageElement_Greeting').innerHTML = "Good Evening, "+Behavior_DisplayGreetings_DisplayName_Text;
	// 			}
	// 			if (h >= 6 && h<=11){
	// 				document.getElementById('pageElement_Greeting').innerHTML = "Good Morning, "+Behavior_DisplayGreetings_DisplayName_Text;
	// 			}
	// 			if (h >= 12 && h<=18){
	// 				document.getElementById('pageElement_Greeting').innerHTML = "Good Afternoon, "+Behavior_DisplayGreetings_DisplayName_Text;
	// 			}
	// 			if (h >= 19 && h<=24){
	// 				document.getElementById('pageElement_Greeting').innerHTML = "Good Evening, "+Behavior_DisplayGreetings_DisplayName_Text;
	// 			}
	// 		}*/
	// 		} else {
	// 		document.getElementById('pageElement_Greeting').style.display = "none";
	// 	}
	
	
	var AMPM;
	if (h <= 12 && h >= 0){
		var AMPM = "AM";
		} else {
		var AMPM = "PM";
	}

    if (Element_Attribute_Get("Header_StatusTray_Clock", "UI_Status") != "Disabled"){
        document.getElementById('Header_StatusTray_Clock_Time').innerHTML =  displayHour + ":" + m + " " + AMPM;
    }

    if (document.getElementById("Header_StatusTray_Menu").style.display != "none"){
        document.getElementById('Header_StatusTray_Menu_Clock_Clock').innerHTML =  displayHour + ":" + m + " " + AMPM;
    }

    if (Element_Attribute_Get("ClockScreen", "State") != "Inactive"){
        document.getElementById('ClockScreen_Main_Time').innerHTML =  displayHour + ":" + m;
    }

    setTimeout(Clock_Update_Time, 1000);
}
function checkTime(i) {
	if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
	return i;
}

function Battery_Update_Level(){
    var battery_level;
    navigator.getBattery()
    .then(function(battery) {
        var battery_level = Math.round((battery.level)*100);
        if (Element_Attribute_Get("Header_StatusTray_Battery", "UI_Status") != "Disabled"){
            document.getElementById('Header_StatusTray_Battery_Percentage').innerHTML =  battery_level+"%";
        }
        if (document.getElementById("Header_StatusTray_Menu").style.display != "none"){
            document.getElementById('Header_StatusTray_Menu_Battery_Percentage').innerHTML =  battery_level+"%";
            if (isFinite(battery.dischargingTime / 60) == true){
                document.getElementById("Header_StatusTray_Menu_Battery_Status").innerHTML = "Estimated " + Math.round(battery.dischargingTime / 60) + " minutes remaining";
                } else {
                if (battery_level == 100){
                    document.getElementById("Header_StatusTray_Menu_Battery_Status").innerHTML = "Fully charged";
                    } else {
                    document.getElementById("Header_StatusTray_Menu_Battery_Status").innerHTML = "Plugged in, charging";
                }
            }
        }
        if (Element_Attribute_Get("ClockScreen", "State") != "Inactive"){
            document.getElementById('ClockScreen_Extra_Battery').innerHTML =  battery_level+"%";
        }
    });
    setTimeout(Battery_Update_Level, 1000);
}

function Date_Update_Date(){
    var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today = mm + '/' + dd + '/' + yyyy;
	date = today;
    var d = new Date();
	var n = d.getDay();
	if (n == 0){
		var day = "Sunday";
	}
	if (n == 1){
		var day = "Monday";
	}
	if (n == 2){
		var day = "Tuesday";
	}
	if (n == 3){
		var day = "Wednesday";
	}
	if (n == 4){
		var day = "Thursday";
	}
	if (n == 5){
		var day = "Friday";
	}
	if (n == 6){
		var day = "Saturday";
	}
	
    if (document.getElementById("Header_StatusTray_Menu").style.display != "none"){
        document.getElementById('Header_StatusTray_Menu_Clock_Date').innerHTML =  day + ", "+ date;
    }

    if (Element_Attribute_Get("ClockScreen", "State") != "Inactive"){
        document.getElementById('ClockScreen_Main_Date').innerHTML =  day + ", "+ date;
    }

	setTimeout(Date_Update_Date, 5000);
}

function Connection_Update_Status(){
    if (navigator.onLine){
        if (Element_Attribute_Get("Header_StatusTray_Extras_InternetStatus", "UI_Status") != "Disabled"){
            document.getElementById("Header_StatusTray_Extras_InternetStatus").src = "Assets/Icons/icon_wifi_online.png";
        }
        if (document.getElementById("Header_StatusTray_Menu").style.display != "none"){
            document.getElementById("Header_StatusTray_Menu_InternetStatus_Status").innerHTML = "Connected";
            document.getElementById("Header_StatusTray_Menu_InternetStatus_Description").innerHTML = "You are connected to the internet. Features that require an internet connection will function properly.";
        }
        if (Element_Attribute_Get("ClockScreen", "State") != "Inactive"){
            document.getElementById("ClockScreen_Extra_InternetStatus").src = "Assets/Icons/icon_wifi_online.png";
        }
    } else {
        if (Element_Attribute_Get("Header_StatusTray_Extras_InternetStatus", "UI_Status") != "Disabled"){
            document.getElementById("Header_StatusTray_Extras_InternetStatus").src = "Assets/Icons/icon_wifi_offline.png";
        }
        if (document.getElementById("Header_StatusTray_Menu").style.display != "none"){
            document.getElementById("Header_StatusTray_Menu_InternetStatus_Status").innerHTML = "Not connected";
            document.getElementById("Header_StatusTray_Menu_InternetStatus_Description").innerHTML = "You are not connected to the internet. Some features may not work as intended.";
        }
        if (Element_Attribute_Get("ClockScreen", "State") != "Inactive"){
            document.getElementById("ClockScreen_Extra_InternetStatus").src = "Assets/Icons/icon_wifi_offline.png";
        }
    }
    setTimeout(Connection_Update_Status, 1000);
}