jQuery.extend(Todo.c,{
	
	Help: {
		
		/**
		* Path to the Templates
		* @var	String		Path to the Tempates eg. "application/views/help/"
		*/
		path: 'application/views/help/',
		
		//////////////////////////////////////////////////////
		/**
		* Load the Instruction dialog
		*/
		instruction: function() {
			this.clear();
			
			$('#help').load(Todo.c.Help.path + 'instruction.html', function(data) {
				
				//////////////////////////
				/**
				* Dialog
				*/
				$('#instruction').dialog({
					modal: true,
					width:650,
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
				//////////////////////////
				
			})
		},
		googleGears: function() {
			this.clear();
			$('#help').load(Todo.c.Help.path + 'googleGears.html', function(data) {
					
				//////////////////////////
				/**
				* Dialog
				*/
				$('#googleGears').dialog({
					modal: true,
					width:450,
					
					overlay: {
						backgroundColor: '#000',
						opacity: 0.5
					},
					buttons: {
						
						"Cancel" : function() {
							location.href = "http://www.google.com"
						},
						"Ok, let's install Google Gears": function() {
							 location.href = "http://gears.google.com/?action=install&message=Please install Google Gears" +
                   			 "&return=http://dev.floriansweb.com/upload/sandbox/done/";

						},
					}
				});
				//////////////////////////
				
			})
		},
		//////////////////////////////////////////////////////
		/**
		* Clears the Help Div Container
		*/
		clear: function() {
			$('#error').empty()
		},
		//////////////////////////////////////////////////////
	}
});