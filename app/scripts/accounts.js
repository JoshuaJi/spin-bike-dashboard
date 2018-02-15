function accounts_validate(){
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

  if(userName == ""){
    errorMessage = errorMessage.concat("Name Required!\n");
    inputUserName.style.backgroundColor = "red";
    hasError = true;
  }

  if(userEmail == ""){
    errorMessage = errorMessage.concat("Email Required!\n");
    inputUserEmail.style.backgroundColor = "red";
    hasError = true;
  }

  if(userPasswordA == ""){
    errorMessage = errorMessage.concat("Password Required!\n");
    inputUserPasswordA.style.backgroundColor = "red";
    hasError = true;

  } else if(userPasswordA != userPasswordB){
    errorMessage = errorMessage.concat("Passwords must match!\n");
    inputUserPasswordA.style.backgroundColor = "red";
    inputUserPasswordB.style.backgroundColor = "red";
    hasError = true;
  }

  if(hasError){
      throw errorMessage;
  }

}

function create(){
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

  var jsonData =  { 'data' :{ 'email': userEmail, 'pwd': userPasswordA, 'bm_name': userName, 'role': userRole }};

  $.ajax({
      type: "PUT",
      dataType: "json",
      headers: {"X-HTTP-Method-Override": "PUT"},
      url: "https://spin-bike-api.herokuapp.com/create",
      contentType: "application/json; charset=utf-8",
      data: jsonData
  }).done(function(status){
      if(status == 404){
        throw "Problem Connecting to Server"
      } else if (status = 200){
        alert("connection");
      }
  });
}
function process(){
  try {
    console.log("process get called")
    accounts_validate();
    create();
  } catch(err) {
    alert(err);
  }
}
