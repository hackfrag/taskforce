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
 * @subpackage		Taskforce.core
 * @since			Taskforce v 0.1
 * @license			http://www.opensource.org/licenses/mit-license.php The MIT License
 */
 
Taskforce.c = function(controller) {
    if(typeof controller === 'object') {
        
		var inherited;
        for(var i in controller) {
            inherited = new Taskforce.c(i);
            jQuery.extend(inherited, controller[i]);
                        
            controller[i] = inherited;
        }
		jQuery.extend(Taskforce.c, controller);
	}
}
jQuery.extend(Taskforce.c.prototype, {
	
	observers: {},
	observe: function(event, fn) {
		this.observers[event] = fn;
	},
	unsubscribe: function(event) {
	
		if(!event) {
			this.observers = {};
		} else {
			delete this.observers[event];
		}
		
	},
	notify: function(event, item) {
		if(this.observers[event]) {
			this.observers[event](item);
		}
	},	
});



