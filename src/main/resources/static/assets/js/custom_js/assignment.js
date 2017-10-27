/*$().ready(function(){   

	  var buttons = $('#assignmentForm input:submit'); 
	  
	  buttons.click(function() {   
	    
		  	var post = $(this).attr("name") + "=" + $(this).val();
		  	
		  	var $btn = $(this);
		  	$btn.button('loading');
		  	
	    	var form_data = $('#assignmentForm').serialize() + "&" + post; 
	    
			$.post($(this).attr("action"), form_data, function(data) {
				console.log(form_data);
				successMsg(data.message);
				$btn.button('reset');
				
			}).fail(function(data) {
				  $btn.button('reset');
		        if(data.responseJSON.error.indexOf("InternalError") > -1){
		        	errorMsg(data.responseJSON.message);
		        }else{
		        	var errors = $.parseJSON(data.responseJSON.message);
		            $.each( errors, function( index,item ){
		                errorMsg(item.defaultMessage);
		            });
		        }
		    });
		return false; 
	  });
	  
}); */

/*$(document).ready(function () {
	if ($('#publishedAssignment').is(':checked')) {
		
		$("#publishedAssignment").attr("disabled", true);
		$("assignmentStatus").fadeOut('slow');
	}else {
		$("#publishedAssignment").removeAttr("disabled");
		$("assignmentStatus").fadeIn('slow');
	}
});*/

/*function onclickFunction(assignmentId){ 
    $.get("/teacher/assignment/"+assignmentId,function(responseText) { 
    	window.location.href = "teacher/assignment";         
    });
}*/
/*function getContextPath() {
   return window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));
}*/
/*alert(getContextPath());*/

$(document).ready(function () {
	
	ajaxSetUp();
	
	$('#assignmentForm').submit(function(event) {
		saveAssignment(event);
	});
	
});

 function saveAssignment(event){
	
    event.preventDefault();
       
    var formData = $('#assignmentForm').serialize();
    
    $.post("/teacher/assignment",formData,function(data){
    	
    	successMsg(data.message);
    	
    }).fail(function(data) {
        if(data.responseJSON.error.indexOf("InternalError") > -1){
        	errorMsg(data.responseJSON.message);
        }else if(data.responseJSON.error == "AssignmentTitleAlreadyExistByUser"){
        	errorMsg(data.responseJSON.message);
        }else{
        	var errors = $.parseJSON(data.responseJSON.message);
            $.each( errors,function( index,item ){
                errorMsg(item.defaultMessage);
            });
        }
    });
}

 $('button[data-loading-text]').on('click', function () {
 	ajaxSetUp();
 });
 
 
 function ajaxSetUp(){
		
		$.ajaxSetup({
			   beforeSend: function() {
				   $("#assignment-create-button").button('loading');
				},complete: function() {
					$("#assignment-create-button").button('reset');
		        }
		});
		
}
 

 $(document).ready(function () {
	 
	 
	            
	    	   var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@' +'(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';

	    	   var $select =   $('#assignmentEmail').selectize({
	            	persist: false,
	            	delimiter:',',
					maxItems: null,
					plugins: ['remove_button'],
	            	valueField: 'email',
					labelField: 'name',
					searchField: ['name', 'email'],
					preload: true,
					maxOptions :10,
					dropdownDirection :'top-right',
					options: [],
					sortField: [
						{field: 'name', direction: 'asc'},
						{field: 'email', direction: 'asc'}
					],
				    render: {
				        item: function(item, escape) {
				            /*return '<div>' +
				                (item.name ? '<span class="name">' + escape(item.name) + '</span>' : '') +
				                (item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') +
				            '</div>';*/
				        	return '<div>'+(item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') +
			            '</div>';
				        },
				        option: function(item, escape) {
				            var label = item.name || item.email;
				            var caption = item.name ? item.email : null;
				            			            
				            return '<div>' +'<span class="control-label">' + escape(label) + '</span>' +  (caption ? '<span class="caption">' + escape(caption) + '</span>' : '') +'</div>';
				            
				        }
				    },
				    createFilter: function(input) {
				        var match, regex;

				        // email@address.com
				        regex = new RegExp('^' + REGEX_EMAIL + '$', 'i');
				        match = input.match(regex);
				        if (match) return !this.options.hasOwnProperty(match[0]);

				        // name <email@address.com>
				        regex = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
				        match = input.match(regex);
				        if (match) return !this.options.hasOwnProperty(match[2]);

				        return false;
				    },
				    create: function(input) {
				        if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
				            return {email: input};
				        }
				        var match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
				        if (match) {
				            return {
				                email : match[2],
				                name  : $.trim(match[1])
				            };
				        }
				        alert('Invalid email address.');
				        return false;
				    },
	                load: function(query, callback) {
	                	if (!query.length) return callback();
	                	$.ajax({
	                        url: '/teacher/assignmentEmail.json/'+encodeURIComponent(query),
	                        type: 'GET',
	                        dataType: 'json',
	                        error: function() {
	                            callback();
	                        },
	                        success: function(res) {
	                        	 callback(res);
	                        }
	                    });
	                }
        });	   
	            
 });

 /*$(function() {
	    $('select.selectized,input.selectized').each(function() {
			var $container = $('<div>').addClass('value').html('Current Value: ');
			var $value = $('<span>').appendTo($container);
			var $input = $(this);
			var update = function(e) { $value.text(JSON.stringify($input.val())); }

			$(this).on('change', update);
			update();

			$container.insertAfter($input.next());
		});
	});*/
 

