function accounts_validate() {
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
  
  var emailRequest = {
    //https://spin-bike-api.herokuapp.com/users/check_email/ +userEmail
    "url": "https://spin-bike-api.herokuapp.com/users/check_email/" +userEmail,
    "method": "GET",
    "async" : false,
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

  var usernameRequest= {
    //https://spin-bike-api.herokuapp.com/users/check_name/ +userName
    "url": "https://spin-bike-api.herokuapp.com/users/check_name/ " + userName,
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

}

function create() {
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

  var jsonData = { email: userEmail, pwd: userPasswordA, bm_name: userName, role: userRole };
  var jsonDataString = JSON.stringify(jsonData);

  var settings = {
    //https://spin-bike-api.herokuapp.com/users/create_users
    "url": "https://spin-bike-api.herokuapp.com/users/create_users",
    "method": "PUT",
    "async" : false,
    "headers": { "X-HTTP-Method-Override": "PUT" },
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
}
function process() {
  try {
    accounts_validate();
    create();
    alert("New Account Created");
  } catch (err) {
    alert(err);
  }
}
