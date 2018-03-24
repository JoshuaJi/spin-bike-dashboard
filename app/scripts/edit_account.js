edit_account =
  {
    submit: function () {
      try {
        this.validate();
        this.edit();
        alert("Account Details Updated.")
      } catch (err) {
        alert(err);
      }
    
    },
    validate: function() {
      var inputUserName = document.getElementById('inputUserName');
      var inputUserEmail = document.getElementById('inputUserEmail');
      var inputUserPasswordA = document.getElementById('inputUserPasswordA');
      var inputUserPasswordB = document.getElementById('inputUserPasswordB');

      var userName = inputUserName.value;
      var userEmail = inputUserEmail.value;
      var userPasswordA = inputUserPasswordA.value;
      var userPasswordB = inputUserPasswordB.value;

      var selectAccount = document.getElementById("selectAccount");
      var bm_id = selectAccount.value;

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
      var emailRequest = {
        //"https://spin-bike-api.herokuapp.com/users/check_email/" +userEmail + "&"+ bm_id
        "url": "https://spin-bike-api.herokuapp.com/users/check_email/" + userEmail +"&" + bm_id,
        "method": "GET",
        "async": false,
        "headers": { "X-HTTP-Method-Override": "GET" },
        "data": "boolean"
      }

      $.ajax(emailRequest).done(function (response) {
        console.log(response);
        if (response == true) {
          hasError = true;
          errorMessage = errorMessage.concat("Email already tied to existing user!\n");
          inputUserEmail.style.backgroundColor = "red";
        }
      });

      var usernameRequest = {
        //https://spin-bike-api.herokuapp.com/users/check_name/ +userName +"&" + bm_id,
        "url": "https://spin-bike-api.herokuapp.com/users/check_name/" + userName + "&" + bm_id,
        "method": "GET",
        "async": false,
        "headers": { "X-HTTP-Method-Override": "GET" },
        "data": "boolean"
      }

      $.ajax(usernameRequest).done(function (response) {
        console.log(response);
        if (response == true) {
          hasError = true;
          errorMessage = errorMessage.concat("UserName already tied to existing user!\n");
          inputUserName.style.backgroundColor = "red";
        }
      });
      if (hasError) {
        throw errorMessage;
      }

    },
    edit: function () {
      var inputUserName = document.getElementById('inputUserName');
      var inputUserEmail = document.getElementById('inputUserEmail');
      var inputUserPasswordA = document.getElementById('inputUserPasswordA');
      var inputUserPasswordB = document.getElementById('inputUserPasswordB');
      var selectUserRole = document.getElementById('selectUserRole');

      var userName = inputUserName.value;
      var userEmail = inputUserEmail.value;
      var userPasswordA = inputUserPasswordA.value;
      var userPasswordB = inputUserPasswordB.value;
      var userRole = selectUserRole.options[selectUserRole.selectedIndex].value;

      var selectAccount = document.getElementById("selectAccount");
      var bm_id = selectAccount.value;

      var jsonData = { bm_id: bm_id, email: userEmail, pwd: userPasswordA, bm_name: userName, role: userRole };
      var jsonDataString = JSON.stringify(jsonData);

      var settings = {
        //https://spin-bike-api.herokuapp.com/users/edit_user
        "url": "https://spin-bike-api.herokuapp.com/users/edit_user",
        "method": "PUT",
        "async": false,
        "headers": {
          "X-HTTP-Method-Override": "PUT",
        },
        "data": {
          data: jsonDataString
        }
      }

      $.ajax(settings).done(function (response) {
        console.log(response);
        if (response == false) {
          throw "Error Communicating with server"
        }
      });
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
        //https://spin-bike-api.herokuapp.com/users/get_user/ + bm_id
        "url": "https://spin-bike-api.herokuapp.com/users/get_user/" + bm_id,
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
    
    fillList: function () {
      var selectAccount = document.getElementById("selectAccount");
      var options = []
      var settings = {
        //https://spin-bike-api.herokuapp.com/users/get_usernames_and_ids
        "url": "https://spin-bike-api.herokuapp.com/users/get_usernames_and_ids",
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


