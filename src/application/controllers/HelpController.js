/**
 *  Thanks to:
 *		* Timo Derstappen 	- http://teemow.com/
 *		* John Resig      	- http://jquery.com/
 *
 *
 * Done! :  Getting shit done 
 *				Javascript Webapplication for google Gears or Adobe AIR
 *
 * 
 * Copyright (c)    2009, Hackfrag <hackfrag@gmail.com>
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright		Copyright (c) 2009, Hackfrag
 * @link			
 * @package			Todo
 * @subpackage		Todo.controller
 * @since			Todo v 0.1
 * @license			http://www.opensource.org/licenses/mit-license.php The MIT License
 */
 
/**
 * Done! Help controller
 *
 * @name Todo.c.Help
 * @type Object
 * @cat controller
 */ 
$t.c({
	
	Help: {
		
		/**
		* Path to the Templates
		* @var	String		Path to the Tempates eg. "application/views/help/"
		*/
		path: 'application/views/templates/help/',
		
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
		//////////////////////////////////////////////////////
		/**
		* Load the Instruction dialog
		*/
		instructionAIR: function() {
			this.clear();
			
			$('#help').load(Todo.c.Help.path + 'instructionAIR.html', function(data) {
				
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