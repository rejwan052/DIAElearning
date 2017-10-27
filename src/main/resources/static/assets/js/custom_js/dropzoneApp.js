/*function getContextPath() {
   return window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));
}*/


$(document).ready(function() {

	$(".file-dropzone").on('dragover', handleDragEnter);
	$(".file-dropzone").on('dragleave', handleDragLeave);
	$(".file-dropzone").on('drop', handleDragLeave);

	/*Dropzone.autoDiscover = false;*/
	
	function handleDragEnter(e) {

		this.classList.add('drag-over');
	}

	function handleDragLeave(e) {

		this.classList.remove('drag-over');
	}
	
	// "AuthorizationdropzoneForm" is the camel-case version of the form id "dropzone-form"
	Dropzone.options.myAwesomeDropzone  = {

		url : "upload",
		acceptedFiles: ".jpeg,.jpg",
		autoProcessQueue : false,
		/*uploadMultiple : true,*/
		maxFilesize : 0.1, // MB
		/*parallelUploads : 100,*/
		maxFiles : 1,
		maxfilesexceeded: function(file) {
	        this.removeAllFiles();
	        this.addFile(file);
	    },
		addRemoveLinks : true,
		previewsContainer : ".dropzone-previews",

		// The setting up of the dropzone
		init : function() {

			var myDropzone = this;

			// first set autoProcessQueue = false
			$('#upload-button').on("click", function(e) {

				myDropzone.processQueue();
				
			});

			// customizing the default progress bar
			this.on("uploadprogress", function(file, progress) {

				progress = parseFloat(progress).toFixed(0);

				var progressBar = file.previewElement.getElementsByClassName("dz-upload")[0];
				progressBar.innerHTML = progress + "%";
				
			});
			
			this.on("error", function(file, response) {
                // do stuff here.
                /*alert(response);*/
                errorMsg(response);
            });
			
			// displaying the uploaded files information in a Bootstrap dialog
			this.on("success", function(files, serverResponse) {
				successMsg("User Photo Upload Successfully");
				/*showInformationDialog(files, serverResponse);*/
			});
			
			this.on("complete", function(file) {
				this.removeFile(file);
			});
			
		}
	}
	
	var assignmentId = $("#assignmentId").val();
	/*console.log("AssignmentId :"+assignmentId);*/
	
	// "Assignment Document Dropzone" is the camel-case version of the form id "dropzone-form"
	Dropzone.options.assignmentDocumentDropzone  = {
		
		/*url : "/teacher/uploadAssignmentDocument?assignmentId="+assignmentId,*/
		acceptedFiles: ".doc,.docx,.pdf,.zip,.rar",
		autoProcessQueue : false,
		uploadMultiple : true,
		maxFilesize : 25, // MB
		parallelUploads : 100,
		maxFiles : 100,
		maxfilesexceeded: function(file) {
	        this.removeAllFiles();
	        this.addFile(file);
	    },
		addRemoveLinks : true,
		previewsContainer : ".dropzone-previews",

		
	    
		// The setting up of the dropzone
		init : function() {

			var myDropzone = this;
			

			// first set autoProcessQueue = false
			$('#document-upload-button').on("click", function(e) {

				myDropzone.processQueue();
				
			});

			// customizing the default progress bar
			this.on("uploadprogress", function(file, progress) {

				progress = parseFloat(progress).toFixed(0);

				var progressBar = file.previewElement.getElementsByClassName("dz-upload")[0];
				progressBar.innerHTML = progress + "%";
				
			});
			
			this.on("error", function(file, response) {
                // do stuff here.
                errorMsg(response);
            });
			
			// displaying the uploaded files information in a Bootstrap dialog
			this.on("successmultiple", function(files, serverResponse) {
				successMsg("Assignment Document Upload Successfully");
				/*showInformationDialog(files, serverResponse);*/
			});
			
			this.on("complete", function(file) {
				this.removeFile(file);
				retrieveAssignmentDocuments();
			});
			
		}
	}
	
	
	
	Dropzone.options.studentAssignmentDocumentDropzone  = {
			
			/*url : "/teacher/uploadAssignmentDocument?assignmentId="+assignmentId,*/
			acceptedFiles: ".zip,.rar",
			autoProcessQueue : false,
			/*uploadMultiple : true,*/
			maxFilesize : 25, // MB
			/*parallelUploads : 100,*/
			maxFiles : 1,
			maxfilesexceeded: function(file) {
		        this.removeAllFiles();
		        this.addFile(file);
		    },
			addRemoveLinks : true,
			previewsContainer : ".dropzone-previews",

			// The setting up of the dropzone
			init : function() {

				var myDropzone = this;
				var $btn = $('#student-document-upload-button');
				// first set autoProcessQueue = false
				$('#student-document-upload-button').on("click", function(e) {
					myDropzone.processQueue();
				});

				// customizing the default progress bar
				this.on("uploadprogress", function(file, progress) {
					$btn.button('loading');
					progress = parseFloat(progress).toFixed(0);

					var progressBar = file.previewElement.getElementsByClassName("dz-upload")[0];
					progressBar.innerHTML = progress + "%";
					
				});
				
				this.on("error", function(file, response) {
	                // do stuff here.
					$btn.button('reset');
	                errorMsg(response);
	            });
				
				// displaying the uploaded files information in a Bootstrap dialog
				this.on("success", function(files, serverResponse) {
					successMsg("Assignment Document Upload Successfully");
					$btn.button('reset');
					/*showInformationDialog(files, serverResponse);*/
				});
				
				this.on("complete", function(file) {
					this.removeFile(file);
					$btn.button('reset');
					retrieveStudentExistsAssignmentDocument();
				});
				
			}
		    
		}

	function showInformationDialog(files, objectArray) {

		var responseContent = "";

		for (var i = 0; i < objectArray.length; i++) {

			var infoObject = objectArray[i];

			for ( var infoKey in infoObject) {
				if (infoObject.hasOwnProperty(infoKey)) {
					responseContent = responseContent + " " + infoKey + " -> " + infoObject[infoKey] + "<br>";
				}
			}
			responseContent = responseContent + "<hr>";
		}

		// from the library bootstrap-dialog.min.js
		BootstrapDialog.show({title : '<b>Server Response</b>',message : responseContent});
	}
	
	

	function retrieveAssignmentDocuments() {
		var url = '/teacher/assignmentDocuments';
		if ($('#assignmentId').val() != '') {
			url = url + '/' + $('#assignmentId').val();
		}
		$("#assignmentDocuments").load(url);
	}
	
	function retrieveStudentExistsAssignmentDocument() {
		
		var url = '/student/assignmentDocument';
		if ($('#assignmentId').val() != '') {
			url = url + '/' + $('#assignmentId').val();
		}
		$("#studentAssignmentDocument").load(url);
		/*location.reload(true);*/
	}
	
	function successMsg(msg){
		
		$.notify(msg, {
			icon: 'glyphicon glyphicon-ok-circle',
			type: "success",
			placement: {
				from: "top",
				align: "right"
			},
			offset: 20,
			spacing: 10,
			z_index: 1031,
			delay: 5000,
			timer: 1000,
			delay: 5000,
			animate: {
				enter: 'animated fadeInDown',
				exit: 'animated fadeOutUp'
			},
			newest_on_top: true
		});
	}

	function errorMsg(msg){
		
		$.notify(msg, {
			type: "danger",
			icon: 'glyphicon glyphicon-warning-sign',
			delay: 5000,
			placement: {
				from: "top",
				align: "right"
			},
			offset: 20,
			spacing: 10,
			z_index: 1031,
			delay: 5000,
			timer: 1000,
			delay: 5000,
			animate: {
				enter: 'animated fadeInDown',
				exit: 'animated fadeOutUp'
			},
			newest_on_top: true
		});
		
	}

});

