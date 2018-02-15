;(function(){
  $(document).ready(function () {

    // Javascript method's body can be found in scripts/demos.js
    demo.initDashboardPageCharts();

    // see if the user has loggedin
    match = document.cookie.match(new RegExp('loggedin' + '=([^;]+)'));
    if (match && match[1] === 'true'){
      console.log('logged in');
      $('.admin').show();
    } else {
      $('.admin').hide();
    }


  });
})();
