;(function(){

  $(document).ready(function(){
    $('.checklist-item').click(function(){
      if($(this).hasClass('btn-default')){
        $(this).addClass('btn-success').removeClass('btn-default');
      }else if ($(this).hasClass('btn-success')){
        $(this).addClass('btn-default').removeClass('btn-success');
      }
    });

    var resetChecklist = function() {
      $('.checklist-item').removeClass("btn-success").addClass("btn-default")
      $('.checklist-comment').val("")
    };

    $('#submit').click(function() {

      const l_id = $('#trottier').hasClass('active') ? 1 : 2;
      match = document.cookie.match(new RegExp('bmid' + '=([^;]+)'));
      var bm_id = 1;
      if (match) {
        bm_id = match[1];
        console.log("match: "+match[1]);
      }
      const building_prefix = l_id===1 ? "tro" : "red";
      const water = $("#checklist-"+building_prefix+"-plants").hasClass("btn-success")?1:0;
      const clean = $("#checklist-"+building_prefix+"-clean").hasClass("btn-success")?1:0;
      const done = $("#checklist-"+building_prefix+"-done").hasClass("btn-success")?1:0;
      const comments = encodeURI($("#checklist-"+building_prefix+"-comment").val());

      var sb_ids;
      if (building_prefix === "tro"){
        const bike_1 = $("#checklist-"+building_prefix+"-bike-1").hasClass("btn-success")?"True":"False";
        sb_ids = {"1":bike_1};
      }else{
        const bike_2 = $("#checklist-"+building_prefix+"-bike-2").hasClass("btn-success")?"True":"False";
        const bike_3 = $("#checklist-"+building_prefix+"-bike-3").hasClass("btn-success")?"True":"False";
        sb_ids = {"2":bike_2, "3":bike_3};
      }

      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://spin-bike-api.herokuapp.com/checklist?bm_id=" + bm_id +
                                               "&l_id=" + l_id +
                                              "&water=" + water +
                                              "&clean=" + clean +
                                           "&comments=" + comments +
                                               "&done=" + done +
                                               "&sb_ids=" + encodeURI(JSON.stringify(sb_ids)),
        "method": "POST",
      };

      $.ajax(settings)
      .done(function (response) {
        console.log(response);
        notification.showNotification("top", "right", "success", "Checklist submited");
        resetChecklist();
      }).fail(function(xhr, status, error) {
        // error handling
        notification.showNotification("top", "right", "danger", "Submission failure. Please try again later");
      });
    });
  });
})();
