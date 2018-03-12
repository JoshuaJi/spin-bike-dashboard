;(function(){
  $(document).ready(function () {

    // Javascript method's body can be found in scripts/demos.js
    demo.initDashboardPageCharts();

    // see if the user has loggedin
    match = document.cookie.match(new RegExp('loggedin' + '=([^;]+)'));
    if (match && match[1] === 'true'){
      console.log('logged in');
      $('.admin').show();
      $('#login-button').hide();
    } else {
      $('.admin').hide();
      $('#login-button').show();
    }

    $('#logout').click(function(){

      const unfinishedChecklist = $('.checklist-item').hasClass('btn-success') || ($('.checklist-comment').val() !== "" && $('.checklist-comment').val() !== undefined);
      if (unfinishedChecklist){
        notification.showNotification("top", "right", "danger", "Please submit the checklist before logout");
        return;
      }
      document.cookie = "loggedin=false";
      window.location.href = "/";
    })

  });
})();
