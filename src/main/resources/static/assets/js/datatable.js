jQuery.fn.dataTableExt.oApi.fnStandingRedraw = function(oSettings) {
    if(oSettings.oFeatures.bServerSide === false){
        var before = oSettings._iDisplayStart;
 
        oSettings.oApi._fnReDraw(oSettings);
 
        // iDisplayStart has been reset to zero - so lets change it back
        oSettings._iDisplayStart = before;
        oSettings.oApi._fnCalculateEnd(oSettings);
    }
 
    // draw the 'current' page
    oSettings.oApi._fnDraw(oSettings);
};


var oTable;

    //Plug-in to fetch page data 
	jQuery.fn.dataTableExt.oApi.fnPagingInfo = function ( oSettings )
	{
		return {
			"iStart":         oSettings._iDisplayStart,
			"iEnd":           oSettings.fnDisplayEnd(),
			"iLength":        oSettings._iDisplayLength,
			"iTotal":         oSettings.fnRecordsTotal(),
			"iFilteredTotal": oSettings.fnRecordsDisplay(),
			"iPage":          oSettings._iDisplayLength === -1 ?
				0 : Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength ),
			"iTotalPages":    oSettings._iDisplayLength === -1 ?
				0 : Math.ceil( oSettings.fnRecordsDisplay() / oSettings._iDisplayLength )
		};
	};
 

    $(document).ready(function() {
   
	    oTable = $('#example').dataTable( {
	        "bProcessing": true,
	        "bServerSide": true,
	        "sort": "position",
	        "bInfo": true,
	        //bStateSave variable you can use to save state on client cookies: set value "true" 
	       /* "bStateSave": false,*/
	        //Default: Page display length
	        "iDisplayLength": 10,
	        "bPaginate": true,
	        //We will use below variable to track page number on server side(For more information visit: http://legacy.datatables.net/usage/options#iDisplayStart)
	        "iDisplayStart": 0,
	        "fnDrawCallback": function () {
	            //Get page numer on client. Please note: number start from 0 So
	            //for the first page you will see 0 second page 1 third page 2...
	            //Un-comment below alert to see page number
	        	/*alert("Current page number: "+this.fnPagingInfo().iPage); */   
	        },
	        "sAjaxSource": "users",
	        "dom": 'C<"clear">lfrtip',
			colVis: {
				"align": "right",
	            restore: "Restore",
	            showAll: "Show all",
	            showNone: "Show none",
				order: 'alpha',
				buttonText: "columns <img src='/assets/images/caaret.png'/>"
	        },
		    "language": {
	            "infoFiltered": ""
	        },
	        "dom": 'Cf<"toolbar"">rtip',
	        "aoColumns": [
	                      { "sClass": "center","mData": function () {
	                          return '<img src="/assets/img/details_open.png">';
	                      }, "bSortable": false },
	      	              { "mData": "teamName"},
	                      { "mData": "instituateName"},
	                      { "mData": "teamLeaderName"},
	                      { "mData": "teamLeaderEmail"},
	                      { "mData": "isDocumentAuthentication","sClass": "center"},
	                      { "mData": "isAnswerScriptSubmitted","sClass": "center"},
	                      { "mData": "submittedDate"},
	                      { "mData": "downLoadUrl" ,"sClass": "center"}
	      	        ],
	                "order": [[1, 'asc']],
	                "columnDefs": [
			            {	
			                    "render": function (data, type, row) {
		                        return (data === true) ? '<span class="glyphicon glyphicon-ok"></span>' : '<span class="glyphicon glyphicon-remove"></span>';
			                    },
			                    "targets": 5
			            },
		                {
			                    "render": function (data, type, row) {
		                    	return (data === true) ? '<span class="glyphicon glyphicon-ok"></span>' : '<span class="glyphicon glyphicon-remove"></span>';
			                    },
		                    "targets": 6
		                },
		                {
			                    "render": function (data, type, row) {
			                        return (data != null) ? '<a data-toggle="tooltip" title="Download" href="'+data+'"><i class="fa fa-download fa-lg" aria-hidden="true"></i></a>' : '<span class="glyphicon glyphicon-remove"></span>';
			                    },
			                    "targets": 8
			            }
		                
			            ]
	        
	    } ).columnFilter({
			  aoColumns: [ 
				             null,
					         { type: "text" },
					         { type: "text" },
					         { type: "text" },
	                         { type: "text" },
	                         { type: "select",values: [
							  { value: 'true', label: 'Doc Authenticated'},
							  { value: 'false', label: 'Doc Not Authenticated'},
							 ]},
	                         null,
	                         null,
	                         null
						],
					bUseColVis: true
		   }).fnSetFilteringDelay();
	    
	    $("#example_length").hide();
		$("div.toolbar").append('<div class="btn-group" style="padding:5px"><button class="btn btn-default" id="refreshbtn" style="background:none;border:1px solid #ccc;height:30px" type="button"><span class="glyphicon glyphicon-refresh" style="padding:3px"></span></button></div>');
		   $("div.toolbar").css("float","right");
		   $('#refreshbtn').click(function(){
			   oTable.fnStandingRedraw();
	   });
	    
		   
		   
	    
	    /* Formating function for row details */
	    function fnFormatDetails(nTr) {
	    	
	        var aData = oTable.fnGetData(nTr);
	        
	       /* console.log(oTable.fnGetData());   //[Array[0],Array[0],...,Object]
	        console.log(JSON.stringify(oTable.fnGetData())); */
	        var sOut = '<div>';
	        var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
	        sOut += '<tr><th align="left">Team Information</th></tr>';
	        sOut += '<tr><td><strong>First Team Mate: </strong></td><td class="5"><div class="edittable">' + aData.firstTeamMateName + '</div></td></tr>';
	        sOut += '<tr><td><strong>First Team Mate Email: </strong></td><td class="6"><div class="edittable">' + aData.firstTeamMateEmail + '</div></td></tr>';
	        sOut += '<tr><td><strong>Second Team Mate: </strong></td><td class="7"><div class="edittable">' + aData.secondTeamMateName + '</div></td></tr>';
	        sOut += '<tr><td><strong>Second Team Mate Email: </strong></td><td class="8"><div class="edittable">' + aData.secondTeamMateEmail + '</div></td></tr>';
	        sOut += '</table>';
	        return sOut;
	    }
	    
	    oTable.on('click', 'tbody tr td img', function () {
	    	 var nTr = this.parentNode.parentNode;
		        if (this.src.match('details_close')) {
		            /* This row is already open - close it */
		            this.src = "/assets/img/details_open.png";
		            oTable.fnClose(nTr);
		        } else {
		            /* Open this row */
		            this.src = "/assets/img/details_close.png";
		            oTable.fnOpen(nTr,fnFormatDetails(nTr), 'details');
		            //make_jeditable(nTr);
		        }
        });
	} );


/*var table;

jQuery(document).ready(function() {
	table = $('#example').DataTable({
		  	"bPaginate": true,
		  	"order": [ 0, 'asc' ],
		  	"bInfo": true,
		  	"iDisplayStart":0,
		  	"bProcessing" : true,
		 	"bServerSide" : true,
		 	"sAjaxSource" : "users",
		 	"dom": 'C<"clear">lfrtip',
			colVis: {
				"align": "right",
	            restore: "Restore",
	            showAll: "Show all",
	            showNone: "Show none",
				order: 'alpha',
				"buttonText": "columns <img src=\"/datatableServersideExample/images/caaret.png\"/>"
	        },
		    "language": {
	            "infoFiltered": ""
	        },
	        "dom": 'Cf<"toolbar"">rtip',
	        "aoColumns": [
	      	              { "mData": "teamName"},
	                      { "mData": "instituateName"},
	                      { "mData": "teamLeaderName"},
	                      { "mData": "teamLeaderEmail"},
	                      { "mData": "isDocumentAuthentication" , "sClass": "center"},
	                      { "mData": "isAnswerScriptSubmitted" , "sClass": "center"},
	                      { "mData": "submittedDate"},
	                      { "mData": "downLoadUrl" ,"sClass": "center"},
	      	        ],
			"columnDefs": [
			                {	
			                    "render": function (data, type, row) {
		                        return (data === true) ? '<span class="glyphicon glyphicon-ok"></span>' : '<span class="glyphicon glyphicon-remove"></span>';
			                    },
			                    "targets": 4
			                },
		                {
			                    "render": function (data, type, row) {
		                    	return (data === true) ? '<span class="glyphicon glyphicon-ok"></span>' : '<span class="glyphicon glyphicon-remove"></span>';
			                    },
		                    "targets": 5
		                },
		                {
			                    "render": function (data, type, row) {
			                        return (data != null) ? '<a data-toggle="tooltip" title="Download" href="'+data+'"><i class="fa fa-download fa-lg" aria-hidden="true"></i></a>' : '<span class="glyphicon glyphicon-remove"></span>';
			                    },
			                    "targets": 7
			                }
		                
			            ]
	
	      })
			  .columnFilter({
				  aoColumns: [ 
					             { type: "number"},
						         { type: "text" },
						         { type: "text" },
						         { type: "text" },
		                         { type: "text" },
		                         { type: "text" },
							],
						bUseColVis: true
			   }).fnSetFilteringDelay();
			$("#example_length").hide();
			$("div.toolbar").append('<div class="btn-group" style="padding:5px "><button class="btn btn-default" id="refreshbtn" style="background:none;border:1px solid #ccc;height:30px" type="button"><span class="glyphicon glyphicon-refresh" style="padding:3px"></span></button></div>');
			   $("div.toolbar").css("float","right");
			   $('#refreshbtn').click(function(){
				   table.fnStandingRedraw();
		   });
			
	});*/

	
	
	

/*$(document).ready( function () {
	 var table = $('#example').DataTable({
		 	"sAjaxSource": "/users",
			"sAjaxDataProp": "",
			"columns": [
			            { "data": "teamName"},
			            { "data": "instituateName" },
			            { "data": "teamLeaderName" },
			            { "data": "teamLeaderEmail" },
			            { "data": "documentAuthentication"},
			            { "data": "answerScriptSubmitted"},
			            { "data": "submittedDate"},
			            { "data": "downLoadUrl"}
			           
			        ],
			"order": [[ 0, "asc" ]],
			"columnDefs": [
			                {
			                    "render": function (data, type, row) {
			                        return (data === true) ? '<span class="glyphicon glyphicon-ok"></span>' : '<span class="glyphicon glyphicon-remove"></span>';
			                    },
			                    "targets": 4
			                },
			                {
			                    "render": function (data, type, row) {
			                    	return (data === true) ? '<span class="glyphicon glyphicon-ok"></span>' : '<span class="glyphicon glyphicon-remove"></span>';
			                    },
			                    "targets": 5
			                },
			                {
			                    "render": function (data, type, row) {
			                        return (data != null) ? '<a data-toggle="tooltip" title="Download" href="'+data+'"><i class="fa fa-download fa-lg" aria-hidden="true"></i></a>' : '<span class="glyphicon glyphicon-remove"></span>';
			                    },
			                    "targets": 7
			                }
			                
			            ]
	 });	 
	 
	 
});*/


//<![CDATA[
 
       /* $(document).ready(function() {
            $('#example').DataTable( {
                "ajax": {
                    "url":"datatable.jquery",
                    "data":function(d) {
                        var table = $('#example').DataTable()
                        d.page = (table != undefined)?table.page.info().page:0
                        d.size = (table != undefined)?table.page.info().length:5
                        d.sort = d.columns[d.order[0].column].data + ',' + d.order[0].dir
                    }
                },
                "searching":true,
                "processing": true,
                "serverSide": true,
                "lengthMenu": [[5, 10, 15,30,50,75,100], [5, 10, 15,30,50,75,100]],
                "columns": [
                    { "data": "teamName" },
                    { "data": "instituateName" },
                    { "data": "teamLeaderName" },
                    { "data": "teamLeaderEmail" },
                    { "data": "documentAuthentication" },
                    { "data": "answerScriptSubmitted" },
                    { "data": "submittedDate" },
                    { "data": "downLoadUrl" }
                ],
                "columnDefs": [
   			                {
   			                    "render": function (data, type, row) {
   			                        return (data === true) ? '<span class="glyphicon glyphicon-ok"></span>' : '<span class="glyphicon glyphicon-remove"></span>';
   			                    },
   			                    "targets": 4
   			                },
   			                {
   			                    "render": function (data, type, row) {
   			                    	return (data === true) ? '<span class="glyphicon glyphicon-ok"></span>' : '<span class="glyphicon glyphicon-remove"></span>';
   			                    },
   			                    "targets": 5
   			                },
   			                {
   			                    "render": function (data, type, row) {
   			                        return (data != null) ? '<a data-toggle="tooltip" title="Download" href="'+data+'"><i class="fa fa-download fa-lg" aria-hidden="true"></i></a>' : '<span class="glyphicon glyphicon-remove"></span>';
   			                    },
   			                    "targets": 7
   			                }
   			                
   			            ],
                "columnDefs": [
                    { "data": null, "targets": -1, "defaultContent":"<h4><a class='dt-view'></a><a class='dt-edit'></a><a class='dt-delete'></a></h4>" }
                ],
                "pagingType": "full_numbers"
 
            } );
 
        } );*/
 
        //]]>
        
        



        
        