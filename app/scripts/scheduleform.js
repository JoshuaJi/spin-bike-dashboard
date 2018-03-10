var scheduleForm = {
  weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  allSchedules: null,
  initCareTakers: function () {
    $.get('http://spin-bike-api.herokuapp.com/schedule_all', function (data) {
      $('#caretaker_schedule').hide();
      scheduleForm.allSchedules = data;
      $('#caretaker_choice').append('<option value="none">Please select one caretaker</option>');
      Object.keys(data).forEach(function (key) {
        $('#caretaker_choice').append('<option value=' + key + '>' + key + '</option>');
      });
    });
  },
  initWeekdays: function () {
    scheduleForm.weekDays.forEach(function (weekday) {
      $('#weekdays').append('<option value=' + weekday + '>' + weekday + '</option>')
    });
    for (var i = 0; i < 24; i++) {
      if (i < 10) {
        $('#shift_hour').append('<option value=' + i + '>' + '0' + i + '</option>');
      } else {
        $('#shift_hour').append('<option value=' + i + '>' + i + '</option>');
      }
    }
    for (var j = 0; j < 60; j += 5) {
      if (j < 10) {
        $('#shift_minute').append('<option value=' + j + '>' + '0' + j + '</option>');
      } else {
        $('#shift_minute').append('<option value=' + j + '>' + j + '</option>');
      }
    }
  },
  changeCaretaker: function () {
    var currentCaretaker = $('#caretaker_choice').val();
    if (currentCaretaker == 'none') {
      $('#caretaker_schedule').hide();
    } else {
      $('#caretaker_schedule').empty();
      $('#caretaker_schedule').show();
      var currentCaretakerSchedule = scheduleForm.allSchedules[currentCaretaker];
      currentCaretakerSchedule.forEach(function (element) {
        var i = 0;
        $.get("http://spin-bike-api.herokuapp.com/location/" + element.l_id, function (data) {
          $('#caretaker_schedule').append('<div id="location' + element.l_id + '"><span><b>' + data.address + '</b></span><br/>');
          element.schedule.forEach(function (scheduleItem) {
            var check = '<input id="shift_check_' + i + '" type="checkbox">';
            var currentDate = new Date(scheduleItem);
            var weekDay = scheduleForm.weekDays[currentDate.getDay()];
            var hours = currentDate.getHours();
            var minutes = currentDate.getMinutes();
            if (minutes < 10) {
              minutes += '0';
            }
            $('#location' + element.l_id).append(check + '<span id="shift_' + i + '">' + weekDay + ' at ' + hours + ':' + minutes + '</span><br/>');
            i++;
          });
        });
        $('#caretaker_schedule').append('</div>');
      });
    }
  },
  addShift: function () {
    var currentCaretaker = $('#caretaker_choice').val();
    if (currentCaretaker == 'none') {
      $('#caretaker_schedule').empty();
      $('#caretaker_schedule').show();
      alert('Please choose an existing caretaker!');
    } else {
      var locationID = $('#location_select').val();
      var day = $('#weekdays').val();
      var shiftMinute = $('#shift_minute').val();
      if (shiftMinute < 10) {
        shiftMinute += '0';
      }
      var time = $('#shift_hour').val() + ':' + shiftMinute;
      var checkNum = 0;
      while (($('#location' + locationID + ' #shift_check_' + checkNum)).val()) {
        checkNum++;
      }
      var check = '<input id="shift_check_' + checkNum + '" type="checkbox">';
      $('#location' + locationID).append(check + '<span id="shift_' + checkNum + '">' + day + ' at ' + time + '</span><br/>');
      var shiftDate = new Date(this.getNextWeekDay(day));
      shiftDate.setHours($('#shift_hour').val());
      shiftDate.setMinutes(shiftMinute);
      console.log(shiftDate);
      var formattedShiftDate = shiftDate.getFullYear() + "-" + this.formatZeros(shiftDate.getMonth() + 1) + "-" + this.formatZeros(shiftDate.getDate()) + " " + this.formatZeros(shiftDate.getHours()) + ":" + this.formatZeros(shiftDate.getMinutes()) + ":" + this.formatZeros(shiftDate.getSeconds());
      var dataForPut = {
        "l_id": locationID,
        "days": formattedShiftDate,
        "bm_id": $('#caretaker_choice').val()
      };

      var formDataForPut = new FormData();
      formDataForPut.append('data', JSON.stringify(dataForPut));

      console.log(dataForPut);
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://spin-bike-api.herokuapp.com/update_schedule",
        "method": "PUT",
        "headers": { "X-HTTP-Method-Override": "PUT" },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": {
          'data': formDataForPut
        }
      };

      $.ajax(settings).done(function (response) {
        console.log(response);
      });
    }
  },
  removeShift: function () {
    var currentCaretaker = $('#caretaker_choice').val();
    if (currentCaretaker == 'none') {
      $('#caretaker_schedule').empty();
      $('#caretaker_schedule').show();
      alert('Please choose an existing caretaker!');
    } else {
      $.get({
        url: 'http://spin-bike-api.herokuapp.com',
        success: this.successData,
        async: false
      });
    }
  },
  initLocationSelect: function () {
    $.get("http://spin-bike-api.herokuapp.com", function (data) {
      data.forEach(function (locationObject) {
        $.get('http://spin-bike-api.herokuapp.com/location/' + locationObject.l_id, function (location) {
          var shortenedAddress = location.address.substring(0, location.address.indexOf(','));
          $('#location_select').append('<option value=' + locationObject.l_id + '>' + shortenedAddress + '</option>');
        });
      });
    });
  },
  getNextWeekDay: function (weekDayString) {
    var d = new Date();
    switch (weekDayString) {
      case "Monday":
        return d.setDate(d.getDate() + (1 + 7 - d.getDay()) % 7);
      case "Tuesday":
        return d.setDate(d.getDate() + (2 + 7 - d.getDay()) % 7);
      case "Wednesday":
        return d.setDate(d.getDate() + (3 + 7 - d.getDay()) % 7);
      case "Thursday":
        return d.setDate(d.getDate() + (4 + 7 - d.getDay()) % 7);
      case "Friday":
        return d.setDate(d.getDate() + (5 + 7 - d.getDay()) % 7);
      case "Saturday":
        return d.setDate(d.getDate() + (6 + 7 - d.getDay()) % 7);
      case "Sunday":
        return d.setDate(d.getDate() + (7 + 7 - d.getDay()) % 7);
      default:
        return 0;
    }
  },
  formatZeros: function (numWithZero) {
    if (numWithZero < 10) {
      return "0" + numWithZero;
    } else {
      return numWithZero;
    }
  },
  successData: function (data) {
    data.forEach(function (locationObject) {
      var shiftNum = 0;
      var locationID = locationObject.l_id;
      var dataForPut = {
        "l_id": locationID,
        "b_id": $('#caretaker_choice').val(),
        "days": []
      }
      while (($('#location' + locationID + ' #shift_check_' + shiftNum)).val()) {
        var oneShiftCheck = $('#location' + locationID + ' #shift_check_' + shiftNum);
        var oneShift = $('#location' + locationID + ' #shift_' + shiftNum);
        if (oneShiftCheck.prop('checked')) {
          dataForPut.days.push(oneShift.html());
          oneShiftCheck.remove();
          oneShift.remove();
        }
        shiftNum++;
      }
      console.log(dataForPut);
    });
    $('#caretaker_schedule').empty();
    scheduleForm.changeCaretaker();
  }
};

scheduleForm.initCareTakers();
scheduleForm.initWeekdays();
scheduleForm.initLocationSelect();
