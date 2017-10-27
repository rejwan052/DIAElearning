/*function getContextPath() {
   return window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));
}*/

var contextRoot = /*[[@{/}]]*/'';

$(document)
		.ready(
				function() {

					var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@'
							+ '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';

					$('#select-to')
							.selectize(
									{
										persist : false,
										delimiter : ',',
										plugins : [ 'remove_button' ],
										maxItems : null,
										valueField : 'email',
										labelField : 'name',
										searchField : [ 'name', 'email' ],
										options : [],
										render : {
											item : function(item, escape) {
												return '<div>'
														+ (item.name ? '<span class="name">'
																+ escape(item.name)
																+ '</span>'
																: '')
														+ (item.email ? '<span class="email">'
																+ escape(item.email)
																+ '</span>'
																: '')
														+ '</div>';
											},
											option : function(item, escape) {
												var label = item.name
														|| item.email;
												var caption = item.name ? item.email
														: null;
												return '<div>'
														+ '<span class="label">'
														+ escape(label)
														+ '</span>'
														+ (caption ? '<span class="caption">'
																+ escape(caption)
																+ '</span>'
																: '')
														+ '</div>';
											}
										},
										createFilter : function(input) {
											var match, regex;

											// email@address.com
											regex = new RegExp('^'
													+ REGEX_EMAIL + '$', 'i');
											match = input.match(regex);
											if (match)
												return !this.options
														.hasOwnProperty(match[0]);

											// name <email@address.com>
											regex = new RegExp('^([^<]*)\<'
													+ REGEX_EMAIL + '\>$', 'i');
											match = input.match(regex);
											if (match)
												return !this.options
														.hasOwnProperty(match[2]);

											return false;
										},
										create : function(input) {
											if ((new RegExp('^' + REGEX_EMAIL
													+ '$', 'i')).test(input)) {
												return {
													email : input
												};
											}
											var match = input.match(new RegExp(
													'^([^<]*)\<' + REGEX_EMAIL
															+ '\>$', 'i'));
											if (match) {
												return {
													email : match[2],
													name : $.trim(match[1])
												};
											}
											alert('Invalid email address.');
											return false;
										}
									});
					$('#select-role').selectize({

					});

				});

$(document).on('submit', '#createUsersForm', function(e) {

	e.preventDefault();

	var formData = $('#createUsersForm').serialize();

	$.ajax({
		type : "POST",
		beforeSend : function() {

		},
		url : contextRoot + "admin/createUser",
		data : formData,
		dataType : 'json',
		success : function(data) {
			var tblHtml = "";
			$.each(data, function(index, users) {
				var status = users.userCreateOrNot ? "Create" : "Exist";
				tblHtml += "<tr><td>" + users.email + "</td>";
				tblHtml += "<td>" + users.roleName + "</td>";
				tblHtml += "<td>" + status + "</td>M/tr>";
			});

			$("#userCreateResponseModalTable  tbody").html(tblHtml);
			$("#userCreateResponseModalTable").modal('show');
		},
		error : function(data) {
			var errors = $.parseJSON(data.responseJSON.message);
			$.each(errors, function(index, item) {
				errorMsg(item.defaultMessage);
			});
		},
		done : function(e) {
			console.log("DONE");
		}
	});
});