function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      reader.onload = function (e) {
          $('#image').attr('src', e.target.result);
          console.log(e.target.result);
      }
      
      reader.readAsDataURL(input.files[0]);
  }
}

$("#imgInp").change(function(){
  readURL(this);
});

comments = {

  loadPhotos: function() {
    $.get('https://spin-bike-api.herokuapp.com/get_all_images', function(data) {
      console.log(data);
    });
  },

  submitPhoto: function() {
    var url = $("#image").attr('src');
    console.log(url);


    var formDataForPut = new FormData();
    formDataForPut.append('image', url);



    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://spin-bike-api.herokuapp.com/upload_image",
      "method": "PUT",
      "headers": {
        "Cache-Control": "no-cache"
      },
      "processData": false,
      "contentType": false,
      "mimeType": "multipart/form-data",
      "data": formDataForPut
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });

  }

};

comments.loadPhotos();