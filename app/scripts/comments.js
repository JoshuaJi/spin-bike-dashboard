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
      data = data.substring(2, data.length - 1);
      console.log(data);
      $('#cardContent').prepend('<img src="data:image/jpeg;base64,' + data + '"/>');
    });
  },

  submitPhoto: function () {
    var url = $("#image").attr('src');
    var rawBase64 = url.split("base64,")[1];
    console.log(rawBase64);
    var formDataForPut = new FormData();

    var image = {
      'base': rawBase64
    };
    formDataForPut.append("data", JSON.stringify(image));


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

    $.ajax(settings).done(function (response) {
      console.log(response);
      location.reload();
    });

  }

};

comments.loadPhotos();
