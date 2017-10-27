// Start User Change Password(Page) Ajax Controller
function updatePassword() {
	
	var ajaxURL = "/changePassword";
	
	$.ajax({
		beforeSend : function() {
			$("#loader_cont").show();
		},
		type: "GET",
		url : ajaxURL,
		success : function(result) {
			$("#container").html(result);
		},complete: function() {
			$("#loader_cont").hide();
        }

	});
}



function updatePassword() {
	
	var ajaxURL = "/changePassword";
	
	$.ajax({
		beforeSend : function() {
			$("#loader_cont").show();
		},
		type: "GET",
		url : ajaxURL,
		success : function(result) {
			$("#container").html(result);
		},complete: function() {
			$("#loader_cont").hide();
        }

	});
}



function editGroup() {
	
	var ajaxURL = "/teacher/editGroups";
	console.log("Value: "+$('#search').val());
	if ($('#search').val() != '' && $('#search').val()!=null) {
		ajaxURL = ajaxURL + '/' + $('#search').val();
    }
	
	$.ajax({
		type: "GET",
		url : ajaxURL,
		success : function(result) {
			/*$("#container").html(result);*/
			window.location.href = ajaxURL;
			/*successMsg( "success" );*/
		},
	    error: function(XMLHttpRequest, textStatus, errorThrown) { 
	    	errorMsg("Please select group");
	    } 

	});
}



// Start User Profile(Page) Ajax Controller
function userProfile() {
	
	var ajaxURL = "/userProfile";
	
	$.ajax({
		beforeSend : function() {
			$("#loader_cont").show();
		},
		type: "GET",
		url : ajaxURL,
		success : function(result) {
			$("#container").html(result);
		},complete: function() {
			$("#loader_cont").hide();
        }

	});
}

//End User Profile Ajax Controller





