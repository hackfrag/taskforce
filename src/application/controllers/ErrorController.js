/**
 *  Thanks to:
 *		* Timo Derstappen 	- http://teemow.com/
 *		* John Resig      	- http://jquery.com/
 *
 *
 * Taskforce :  Getting shit done 
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
 * Taskforce Error controller
 *
 * @name Todo.c.Error
 * @type Object
 * @cat controller
 */ 
$t.c({
	Error: {
		
		/**
		* Path to the Templates
		* @var	String		Path to the Tempates eg. "application/views/help/"
		*/
		path: 'application/views/templates/error/',
		
		//////////////////////////////////////////////////////
		/**
		* Load the Instruction dialog
		*/
		addToUpcoming: function() {
			this.clear();
			
			$.get(Todo.c.Error.path + 'addToUpcoming.html', function(data) {
				
				$(data).panel({
					buttons: {
						Ok: function() {
							$(this).panel('close');
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




