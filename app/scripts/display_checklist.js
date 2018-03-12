(function() {
  $(document).ready(function() {
    $.get("https://spin-bike-api.herokuapp.com/managers", function(data) {
      data.admin.forEach(function(element) {
        $("#all_managers").append(
          "<option value=" + element.bm_id + ">" + element.bm_name + "</option>"
        );
      });
    });


  $('#showChecklist').click(function() {
    const bm_id = $("#all_managers option:selected").val();
    console.log("bm_id: "+ bm_id);
    $.get("https://spin-bike-api.herokuapp.com/maintenance/"+bm_id, function(data){
      $("#checklist_table_body").empty()
        data.forEach(function(element){
          // $("#all_bikes_at_address").empty()
          // element.bikes.forEach(function(element){
          //     $("#all_bikes_at_address").append("<option value=" + element.sb_id + ">" + element.sb_id + "</option>")
          // })
          console.log(element.m_id);
          $("#checklist_table_body").append("<tr> <td>"+element.m_id+"</td> <td>"+element.bm_id+"</td> <td>"+element.l_id+"</td> <td>"+element.plants_wanted+"</td> <td>"+element.clean+"</td> <td>"+element.comments+"</td> <td>"+element.done+"</td> </tr>")
        })
        // console.log(data);
    })
  });
  });
})();
