function startTime() {

	var today = new Date();

	var hours = today.getHours();
	var minutes = today.getMinutes();
	var seconds = today.getSeconds();
	var ampm = hours >= 12 ? 'PM' : 'AM';
  	hours = hours % 12;
  	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = checkTime(minutes);
	seconds = checkTime(seconds);
	document.getElementById('time').innerHTML =
	//hours + ":" + minutes + ":" + seconds + " " + ampm;//
	hours + ":" + minutes + "" + "<small class=\"text-muted\";'>:" + " " + seconds + " " + ampm + "</small>"; 
	var timeout = setTimeout(startTime, 500);

	var year=today.getYear()
	if (year < 1000)
	year+=1900
	var day=today.getDay()
	var month=today.getMonth()
	var daym=today.getDate()
	if (daym<10)
	daym=""+daym
        var th = getDaySuffix(daym)
	var dayarray=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday")
	var montharray=new Array("January","February","March","April","May","June","July","August","September","October","November","December")
	document.getElementById("date").innerHTML =
	dayarray[day] + " " + daym + th + " " +montharray[month] + " " +year

}

function getDaySuffix(num) {

    var array = ("" + num).split("").reverse(); // E.g. 123 = array("3","2","1")

    if (array[1] != "1") { // Number is in the teens
        switch (array[0]) {
            case "1": return "st";
            case "2": return "nd";
            case "3": return "rd";
        }
    }

    return "th";
}


function checkTime(i) {
	if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
	return i;

}


	