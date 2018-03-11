notification = {
  showNotification: function(from, align, type, msg) {
    $.notify(
      {
        icon: "notifications",
        message: msg
      },
      {
        type: type,
        timer: 2000,
        placement: {
          from: from,
          align: align
        }
      }
    );
  }
};
