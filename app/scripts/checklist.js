;(function(){

  $(document).ready(function(){
    $('.checklist-item').click(function(){
      if($(this).hasClass('btn-default')){
        $(this).addClass('btn-success').removeClass('btn-default');
      }else if ($(this).hasClass('btn-success')){
        $(this).addClass('btn-default').removeClass('btn-success');
      }
    });

    $('#submit').click(function() {
      notification.showNotification("top", "right", "success", "Checklist submited");
    })
  });
})();
