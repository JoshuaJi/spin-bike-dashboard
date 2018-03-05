var scheduleForm = {
  weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  allSchedules: null,
  initCareTakers: function () {
    $.get('http://spin-bike-api.herokuapp.com/schedule_all', function(data) {
      $('#caretaker_schedule').hide();
      scheduleForm.allSchedules = data;
      $('#caretaker_choice').append('<option value="none">Please select one caretaker</option>');
      Object.keys(data).forEach(function(key) {
        $('#caretaker_choice').append('<option value=' + key + '>' + key + '</option>');
      });
    });
  },
  initWeekdays: function() {
    scheduleForm.weekDays.forEach(function(weekday) {
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
  changeCaretaker: function() {
    var currentCaretaker = $('#caretaker_choice').val();
    if (currentCaretaker == 'none') {
      $('#caretaker_schedule').hide();
    } else {
      $('#caretaker_schedule').empty();
      $('#caretaker_schedule').show();
      var currentCaretakerSchedule = scheduleForm.allSchedules[currentCaretaker];
      currentCaretakerSchedule.forEach(function(element) {
        var i = 0;
        $.get("http://spin-bike-api.herokuapp.com/location/" + element.l_id, function(data) {
          $('#caretaker_schedule').append('<div id="location' + element.l_id + '"><span><b>' + data.address + '</b></span><br/>');
          element.schedule.forEach(function(scheduleItem) {
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
  addShift: function() {
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
    }
  },
  removeShift: function() {
    var currentCaretaker = $('#caretaker_choice').val();
    if (currentCaretaker == 'none') {
      $('#caretaker_schedule').empty();
      $('#caretaker_schedule').show();
      alert('Please choose an existing caretaker!');
    } else {
      $.get('http://spin-bike-api.herokuapp.com', function(data) {
        data.forEach(function(locationObject) {
          var shiftNum = 0;
          var locationID = locationObject.l_id;
          while (($('#location' + locationID + ' #shift_check_' + shiftNum)).val()) {
            var oneShiftCheck = $('#location' + locationID + ' #shift_check_' + shiftNum);
            var oneShift = $('#location' + locationID + ' #shift_' + shiftNum);
            if (oneShiftCheck.prop('checked')) {
              oneShiftCheck.remove();
              oneShift.remove();
              $('#caretaker_schedule').empty();
              scheduleForm.changeCaretaker();
            }
            shiftNum++;
          }
        });
      });
    }
  },
  initLocationSelect: function() {
    $.get("http://spin-bike-api.herokuapp.com", function(data) {
      data.forEach(function(locationObject) {
        $.get('http://spin-bike-api.herokuapp.com/location/' + locationObject.l_id, function(location) {
          var shortenedAddress = location.address.substring(0, location.address.indexOf(','));
          $('#location_select').append('<option value=' + locationObject.l_id + '>' + shortenedAddress + '</option>');
        });
      });
    });
  }
};

scheduleForm.initCareTakers();
scheduleForm.initWeekdays();
scheduleForm.initLocationSelect();
