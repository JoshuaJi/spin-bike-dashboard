edit_account =
  {
    validate: function() {
      var inputUserName = document.getElementById('inputUserName');
      var inputUserEmail = document.getElementById('inputUserEmail');
      var inputUserPasswordA = document.getElementById('inputUserPasswordA');
      var inputUserPasswordB = document.getElementById('inputUserPasswordB');

      var userName = inputUserName.value;
      var userEmail = inputUserEmail.value;
      var userPasswordA = inputUserPasswordA.value;
      var userPasswordB = inputUserPasswordB.value;

      inputUserName.style.backgroundColor = "white";
      inputUserEmail.style.backgroundColor = "white";
      inputUserPasswordA.style.backgroundColor = "white";
      inputUserPasswordB.style.backgroundColor = "white";

      var errorMessage = "";
      var hasError = false;

      if (userName == "") {
        errorMessage = errorMessage.concat("Name Required!\n");
        inputUserName.style.backgroundColor = "red";
        hasError = true;
      }

      if (userEmail == "") {
        errorMessage = errorMessage.concat("Email Required!\n");
        inputUserEmail.style.backgroundColor = "red";
        hasError = true;
      }

      if (userPasswordA == "") {
        errorMessage = errorMessage.concat("Password Required!\n");
        inputUserPasswordA.style.backgroundColor = "red";
        hasError = true;

      } else if (userPasswordA != userPasswordB) {
        errorMessage = errorMessage.concat("Passwords must match!\n");
        inputUserPasswordA.style.backgroundColor = "red";
        inputUserPasswordB.style.backgroundColor = "red";
        hasError = true;
      }
      /* This requires editing. We want to accept the same email as before
      var jsonData = { email: userEmail };
      var jsonDataString = JSON.stringify(jsonData);
      var form = new FormData();
      form.append("data", jsonDataString);
      var settings = {
        //https://spin-bike-api.herokuapp.com/create
        "url": "https://spin-bike-api.herokuapp.com/create",
        "method": "POST",
        "async": false,
        "headers": { "X-HTTP-Method-Override": "POST" },
        "data": {
          data: jsonDataString
        }
      }

      $.ajax(settings).done(function (response) {
        console.log(response);
        if (response == true) {
          hasError = true;
          errorMessage = errorMessage.concat("Email already tied to existing user!\n");
          inputUserEmail.style.backgroundColor = "red";
        }
      });

    */
      if (hasError) {
        throw errorMessage;
      }

    },

    updateFields: function () {
      var inputUserName = document.getElementById('inputUserName');
      var inputUserEmail = document.getElementById('inputUserEmail');
      var inputUserPasswordA = document.getElementById('inputUserPasswordA');
      var inputUserPasswordB = document.getElementById('inputUserPasswordB');

      var selectAccount = document.getElementById("selectAccount");
      var bm_id = selectAccount.value;

      var userName = "";
      var userEmail = "";
      var userPassword = "";
      //Make request to api for selected user's account info
      var settings = {
        //https://spin-bike-api.herokuapp.com/edit_account
        "url": "http://127.0.0.1:5000/edit/" + bm_id,
        "method": "GET",
        "async": false,
        "headers": { "X-HTTP-Method-Override": "GET" },
        "datatype": "json" 
      }

      $.ajax(settings).done(function (response) {
        user = JSON.parse(response);
        userName = user.bm_name;
        userEmail = user.email;
        userPassword = user.pwd;
      });


      

      inputUserName.value = userName;
      inputUserEmail.value = userEmail;
      inputUserPasswordA.value = userPassword;
      inputUserPasswordB.value = userPassword;
    },

    // Need to still fix this up
    fillList: function () {
      var selectAccount = document.getElementById("selectAccount");
      var options = []
      var settings = {
        //https://spin-bike-api.herokuapp.com/edit
        "url": "http://127.0.0.1:5000/edit",
        "method": "GET",
        "async": false,
        "headers": { "X-HTTP-Method-Override": "GET" },
        "datatype": "json"
      }

      $.ajax(settings).done(function (response) {
        for (var i = 0; i < response.length; i++) {
          var jsonUser = JSON.parse(response[i]);
          var bm_name = jsonUser.bm_name;
          var bm_id = jsonUser.bm_id;
          var el = document.createElement("option");
          el.value = bm_id;
          el.textContent = bm_name;
          selectAccount.appendChild(el);
        }
      });
      }


}


