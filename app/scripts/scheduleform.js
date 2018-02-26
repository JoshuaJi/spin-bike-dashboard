var scheduleForm = {
  weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  allSchedules: null,
  initCareTakers: function () {
    $.get("http://spin-bike-api.herokuapp.com/schedule_all", function (data) {
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
    for (i = 0; i < 24; i++) {
      if (i < 10) {
        $('#shift_hour').append('<option value=' + i + '>' + '0' + i + '</option>');
      } else {
        $('#shift_hour').append('<option value=' + i + '>' + i + '</option>');
      }
    }
    for (j = 0; j < 60; j += 5) {
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
        element.schedule.forEach(function (scheduleItem) {
          var check = '<input id="shift_check_' + i + '" type="checkbox">'
          var currentDate = new Date(scheduleItem);
          var weekDay = scheduleForm.weekDays[currentDate.getDay()];
          var hours = currentDate.getHours();
          var minutes = currentDate.getMinutes();
          if (minutes < 10) {
            minutes += '0';
          }
          $('#caretaker_schedule').append(check +'<span>' + weekDay + ' at ' + hours + ':' + minutes + '</span><br/>');
          i++;
        });
      });
    }
  },
  addShift: function () {
    var currentCaretaker = $('#caretaker_choice').val();
    var currentCaretakerSchedule = scheduleForm.allSchedules[currentCaretaker];
    if (currentCaretaker == 'none') {
      $('#caretaker_schedule').empty();
      $('#caretaker_schedule').show();
      $('#caretaker_schedule').append('<span>'+'Please choose an existing caretaker!'+'</span>');
    }
  },
  removeShift: function () {
    var currentCaretaker = $('#caretaker_choice').val();
    if (currentCaretaker == 'none') {
      $('#caretaker_schedule').empty();
      $('#caretaker_schedule').show();
      $('#caretaker_schedule').append('<span>'+'Please choose an existing caretaker!'+'</span>');
    }
  }
};

scheduleForm.initCareTakers();
scheduleForm.initWeekdays();
