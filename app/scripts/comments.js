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

$("#imgInp").change(function () {
  readURL(this);
});

comments = {

  loadPhotos: function () {
    $.get('https://spin-bike-api.herokuapp.com/get_all_images', function (data) {
      console.log(data);
    });
  },

  submitPhoto: function () {
    var url = $("#image").attr('src');
    var raw_base64 = url.split("base64,")[1]
    var formDataForPut = new FormData();

    var image = "{\"base\":\""+ raw_base64+"\"}";
    formDataForPut.append("data",image);
    console.log(settings)


    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://spin-bike-api.herokuapp.com/upload_image",
      "method": "POST",
      "headers": {
        "Cache-Control": "no-cache"
      },
      "processData": false,
      "contentType": false,
      "mimeType": "multipart/form-data",
      "data": formDataForPut
    };
    console.log(settings)
    $.ajax(settings).done(function (response) {
      console.log(response);
    });

  }

};

comments.loadPhotos();
