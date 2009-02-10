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
Taskforce.v = function(view) {
    if(typeof view === 'object') {
        
		var inherited;
        for(var i in view) {
            inherited = new Taskforce.v(i);
            jQuery.extend(inherited, view[i]);
                        
            view[i] = inherited;
        }
		jQuery.extend(Taskforce.v, view);
	}
}
jQuery.extend(Taskforce.v.prototype, {

});



