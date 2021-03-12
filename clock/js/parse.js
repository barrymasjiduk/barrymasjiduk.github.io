
  Papa.parse("files/data.csv", {
    download: true,
    dynamicTyping: true,
    header: true, 
    complete: function(results) {

      start = new Date(new Date().getFullYear(), 0, 1);
      today = new Date();
      var one_day = 1000 * 60 * 60 * 24;

      var number_of_days_elapsed = Math.floor((today.getTime() - start.getTime()) / one_day);

      salatKey = ['suhoor_end', 'fajr_begin', 'fajr_jamaat', 'sunrise_begin', 'zawaal_begin', 'zuhr_begin', 'zuhr_jamaat', 'asr_begin', 'asr_jamaat', 'sunset_begin', 'maghrib_begin', 'maghrib_jamaat', 'isha_begin', 'isha_jamaat', 'jumu-ah_jamaat', 'eid_jamaat'];

      salatId = ['suhoor_end', 'fajr_begin', 'fajr_jamaat', 'sunrise_begin', 'zawaal_begin', 'zuhr_begin', 'zuhr_jamaat', 'asr_begin', 'asr_jamaat', 'sunset_begin', 'maghrib_begin', 'maghrib_jamaat', 'isha_begin', 'isha_jamaat', 'jumu-ah_jamaat', 'eid_jamaat'];

      for (i = 0; i < 16; i++) {
        var dataString = "January 1, 1999";
        dataString = dataString + " " + results.data[number_of_days_elapsed][salatKey[i]];

        var newDate = new Date(dataString);
        var hour = newDate.getHours();
        var minutes = ('0' + newDate.getMinutes()).slice(-2);
	var ampm = hour >= 12 ? 'PM' : 'AM';
  	hour = hour % 12;
  	hour = hour ? hour : 12; // the hour '0' should be '12'
	//var element = document.getElementById('salatId[i]');
	//element.innerHTML = hour + ":" + minutes + " " + ampm;
	//document.getElementById(salatId[i]).innerHTML = hour + ":" + minutes + " " + ampm;
	var salatId = hour + ":" + minutes + " " + ampm;
	return salatId[i];
	}
      }
    });
