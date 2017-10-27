/*function getContextPath() {
   return window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));
}*/

var contextRoot = /*[[@{/}]]*/ '';



$(document).ready(function () {
		            
		    	   var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@' +'(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';

		    	   var $select =   $('#addStudentToAssignment').selectize({
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
		                	console.log(contextRoot)
		                	if (!query.length) return callback();
		                	$.ajax({
		                        url: contextRoot+'teacher/assignmentEmail.json/'+encodeURIComponent(query),
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


$(document).ready(function () {
	
	ajaxSetUp();
	
	$('#addAssignmentStudentEmailForm').submit(function(event) {
		saveAssignment(event);
	});
	
});

 function saveAssignment(event){
	
    event.preventDefault();
       
    var formData = $('#addAssignmentStudentEmailForm').serialize();
    var assignmentId = $('#assignmentId').val();
    
    /*console.log("AssignmentId :"+assignmentId);*/
    
    
    $.post(contextRoot+"teacher/addStudentToAssignment",formData,function(data){
    	$('#addAssignmentStudentModal').modal('hide');
		$('.modal-backdrop').remove();
		window.location.href = contextRoot+"teacher/viewAssignment/"+"?assignmentId="+assignmentId;
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
				   $("#assignmentStudent-add-button").button('loading');
				},complete: function() {
					$("#assignmentStudent-add-button").button('reset');
		        }
		});
		
}
 