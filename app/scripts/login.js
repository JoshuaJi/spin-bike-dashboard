


function validate(){
	var username = document.forms["loginForm"]["username"].value;
	var password = document.forms["loginForm"]["password"].value;

	var xhr = new XMLHttpRequest();
	//console.log('http://127.0.0.1:5000/auth?username='+username+"&pwd="+password);
 	xhr.open('GET', 'https://spin-bike-api.herokuapp.com/auth?username='+username+"&pwd="+password, true);
 	xhr.send();
 	xhr.addEventListener("readystatechange", processRequest, false);
 	function processRequest(e) {
 	    if (xhr.readyState == 4 && xhr.status == 200) {
          var response = JSON.parse(xhr.responseText);
          console.log(response);
	        if(response === false){
            alert("Log in unsuccessful");
 	        }
	        else{
            document.cookie = "loggedin=true";
            document.cookie = "bmid="+response;
	        	// Change path to correct page
	        	window.location.href = "/";
			}
 		}
	}
	return false;
}

