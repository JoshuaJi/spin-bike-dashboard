notification = {
  showNotification: function(from, align, type, msg) {
    $.notify(
      {
        icon: "notifications",
        message: msg
      },
      {
        type: type,
        timer: 4000,
        placement: {
          from: from,
          align: align
        }
      }
    );
  }
};
