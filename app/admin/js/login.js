


function validate(){
	var username = document.forms["loginForm"]["username"].value;
	var password = document.forms["loginForm"]["password"].value;

	var xhr = new XMLHttpRequest();
	//alert ('http://127.0.0.1:5000/auth?username='+username+"&pwd="+password);
	xhr.open('GET', 'http://127.0.0.1:5000/auth?username='+username+"&pwd="+password, true);
	xhr.send();
	xhr.addEventListener("readystatechange", processRequest, false);
	function processRequest(e) {
	    if (xhr.readyState == 4 && xhr.status == 200) {
	        var response = xhr.responseText;
	        if(response == "yes"){
	        	alert("log in successfully"); 
	        	return true;
	        }
	        alert("Log in unsuccessful");
	    }
	    else if (xhr.readyState == 0){
	    	alert("Something went wrong. Try agian");
	    }
	}
	return false;
}

