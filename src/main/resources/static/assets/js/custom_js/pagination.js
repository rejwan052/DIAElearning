$(document).ready(function() {
	changePageAndSize();
});

function changePageAndSize() {
	$('#pageSizeSelect').change(function(evt) {
		/*var url = "/teacher/getAssignmentList/?pageSize="+this.value +"&page=1";
		$("#resultsBlock").load(url);*/
		window.location.replace("/teacher/assignments/?pageSize=" + this.value + "&page=1");
		/*window.location.href("/teacher/allAssignment/?pageSize="+ this.value + "&page=1");*/
	});
}

/*$(document).ready(function(){
	$('input[type=radio][name=assignmentStatus]').change(function(){
		if (this.value == 'true') {
            console.log("published");
        }
        else if (this.value == 'false') {
        	console.log("saved");
        }else{
        	console.log("All");
        }
	});
});*/


    

/*$("input:radio").on("click",function (e) {
	alert("clicked");
    var inp=$(this); //cache the selector
    console.log(inp);
    if (inp.is(".active")) { //see if it has the selected class
        inp.prop("checked",false).removeClass("active");
        return;
    }
    $("input:radio[name='"+inp.prop("name")+"'].active").removeClass("active");
    inp.addClass("active");
});*/

/*$(document).ready(function() {
	   
	  $('#searchForm').submit(function(event) {
	       
		 var formData = $('#searchForm').serialize();
	       
	    $.ajax({
	        url: $("#searchForm").attr( "action"),
	        data: formData,
	        type : "GET",
	        success: function(data) {
	        	$('#content').html(data);
	        }
	    });
	      
	    event.preventDefault();
	  });
	    
});*/


/*$('#searchAssignment').on("keypress", function(e) {
    if (e.keyCode == 13) {
        
        alert("Enter search:"+search);
        var formData= $('searchForm').serialize();
        var url = "/teacher/assignments/search";
    	$.get(url+formData,function(data) {
    		$("#resultsBlock").load(url);
        });
    	
        return false; // prevent the button click from happening
    }
});
*/



/*function getAssignmentList(pageSize,page,el){
		
	var url = "/teacher/getAssignmentList/?pageSize="+pageSize +"&page="+page;
	jQuery(el).closest('li').addClass("active pointer-disabled").siblings().removeClass("active pointer-disabled");
	$("#resultsBlock").load(url);
	
}*/

