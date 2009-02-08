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
 * Taskforce Option Model
 *
 * @name Todo.m.Option
 * @type Object
 * @cat model
 */ 


if(Todo.test) {
	ActiveRecord.execute('DROP TABLE IF EXISTS options');
}

Todo.m.Option = ActiveRecord.define('options',{  
  	name: '',
  	value: '',
  		 
},{  
	
});

Todo.m.Option.getValue = function(option) {

}
Todo.m.Option.setValue = function(option, value) {

}