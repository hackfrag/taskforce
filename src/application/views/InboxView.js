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
 * @package			Taskforce
 * @subpackage		Taskforce.controller
 * @since			Taskforce v 0.1
 * @license			http://www.opensource.org/licenses/mit-license.php The MIT License
 */
 
/**
 * Taskforce Item View
 *
 * @name Taskforce.v.Inbox
 * @type Object
 * @cat view
 */ 


$t.v({

	Inbox: {
		createHelpBox: function() {
			$.get(Taskforce.templates + 'help/inboxHelp.html', function(data) {
				$('#todo').append(data);
			})
		}		
	}
	
});	