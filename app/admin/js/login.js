


function validate(){
	var username = document.forms["loginForm"]["username"].value;
	var password = document.forms["loginForm"]["password"].value;

	var xhr = new XMLHttpRequest();
	//console.log('http://127.0.0.1:5000/auth?username='+username+"&pwd="+password);
 	xhr.open('GET', 'http://127.0.0.1:5000/auth?username='+username+"&pwd="+password, true);
 	xhr.send();
 	xhr.addEventListener("readystatechange", processRequest, false);
 	function processRequest(e) {
 	    if (xhr.readyState == 4 && xhr.status == 200) {
	        var response = JSON.parse(xhr.responseText);
	        if(response){
	        	alert("log in successfully");
	        	// Change path to correct page 
	        	window.location.href = "http://google.com";
 	        }
	        else{
	        	alert("Log in unsuccessful");
			}
 		}
	}
	return false;
}

