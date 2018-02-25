var scheduleForm = {
  weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  allSchedules: null,
  initCareTakers: function() {
    $.get("http://spin-bike-api.herokuapp.com/schedule_all", function(data) {
      $('#caretaker_schedule').hide();
      scheduleForm.allSchedules = data;
      $('#caretaker_choice').append('<option value="none">Please select one caretaker</option>');
      Object.keys(data).forEach(function(key) {
        $('#caretaker_choice').append('<option value=' + key + '>' + key + '</option>');
      });
    });
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
        element.schedule.forEach(function(scheduleItem) {
          var currentDate = new Date(scheduleItem);
          var weekDay = scheduleForm.weekDays[currentDate.getDay()];
          var hours = currentDate.getHours();
          var minutes = currentDate.getMinutes();
          if (minutes < 10) {
            minutes += '0';
          }
          $('#caretaker_schedule').append('<span>' + weekDay + ' at ' + hours + ':' + minutes + '</span><br/>');
        });
      });
    }
  }
};

scheduleForm.initCareTakers();
