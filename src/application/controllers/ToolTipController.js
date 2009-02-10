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
 * Taskforce Tooltip controller
 *
 * @name Taskforce.c.ToolTip
 * @type Object
 * @cat controller
 */ 
$t.c({
	
	ToolTip: {
		
		path: 'application/views/templates/item/',
		active: false,
		
		create: function(name, left, top,  fn) {
			if(!this.active) {
				this.clear();
				this.active = true;
				$('#tooltip').load(Taskforce.c.ToolTip.path + name +'.html', function(data) {
					
					$('#'+name).css('top',top+'px').css('left',left+'px').slideDown('fast',fn);	
					
				
				});
				$('#todo').bind('click', function() {
					Taskforce.c.ToolTip.hide();
				})
			}
			
		},
		//////////////////////////////////////////////////////
		hide: function() {
			$('#tooltip').children().hide();
			this.active = false;
			$('#todo').unbind('click');
		},
		//////////////////////////////////////////////////////
		/**
		* Clears the Help Div Container
		*/
		clear: function() {
			$('#tooltip').empty()
		},
	}
});