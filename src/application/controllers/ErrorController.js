jQuery.extend(Todo.c,{
	
	Error: {
		
		/**
		* Path to the Templates
		* @var	String		Path to the Tempates eg. "application/views/help/"
		*/
		path: 'application/views/error/',
		
		//////////////////////////////////////////////////////
		/**
		* Load the Instruction dialog
		*/
		addToUpcoming: function() {
			this.clear();
			
			$('#error').load(Todo.c.Error.path + 'addToUpcoming.html', function(data) {
				
				$("#addToUpcoming").dialog({
					bgiframe: true,
					autoOpen: true,
					modal: true,
					title: 'Warning',
				
					overlay: {
						backgroundColor: '#000',
						opacity: 0.5
					},
					buttons: {
						Ok: function() {
							$(this).dialog('close');
						}
					}
				});	
				
			})
		},
		
		//////////////////////////////////////////////////////
		/**
		* Clears the Help Div Container
		*/
		clear: function() {
			$('#help').empty()
		},
		//////////////////////////////////////////////////////
	}
});




