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
 * Taskforce View controller
 *
 * @name Taskforce.c.View
 * @type Object
 * @cat controller
 */ 
Taskforce.ViewController = {
	init: function() {
		
		this.initHints();
		this.initFilter();
	
	},
	initHints : function() {
		
		
		$('#button-hint').unbind().click(function() {
			if($(this).hasClass('active')) {
			
				$(this).removeClass('active');
				$('#todo').css('bottom',23);
				$('#context-slider').slideUp('fast');
			} else {
				$('#main-footer div.toolbar-button').removeClass('active')
				$(this).addClass('active');
				
				$('#context-slider').empty().html($('#hints').html());
				if($('#context-slider').css('display') == 'none') {
					$('#context-slider').slideDown('fast', function() {
						$('#todo').css('bottom',62);
					});
				}
				
			}
		})
	
	},
	initFilter : function() {
		
		
		$('#button-filter').unbind().click(function() {
			if($(this).hasClass('active')) {
				$(this).removeClass('active');
				$('#todo').css('bottom',23);
				$('#context-slider').slideUp('fast');
			} else {
				$('#main-footer div.toolbar-button').removeClass('active')
				$(this).addClass('active');
				
				$('#context-slider').empty().html($('#filter').html());
				if($('#context-slider').css('display') == 'none') {
					$('#context-slider').slideDown('fast', function() {
						$('#todo').css('bottom',62);
					});
				}
				
				
			}
		})
	
	}
}
