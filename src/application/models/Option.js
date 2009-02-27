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
 * Taskforce Option Model
 *
 * @name Taskforce.m.Option
 * @type Object
 * @cat model
 */ 


if(Taskforce.test) {
	ActiveRecord.execute('DROP TABLE IF EXISTS options');
}

Taskforce.m.Option = ActiveRecord.define('options',{  
  	name: '',
  	value: '',
  		 
},{  

});

Taskforce.m.Option.getValue = function(name) {
	var option = Taskforce.m.Option.findByName(name);
	
	if(option) {
		return option.value;
	}
}
Taskforce.m.Option.setValue = function(name, value) {
	var option = Taskforce.m.Option.findByName(name);
	
	if(option) {
		
		option.set('value', value);
		option.save();
		return true;
	} else {
		alert(value);
		option = Taskforce.m.Option.create({
			'name'	: name,
			'value'	: value
		});
	}
}


$t.getOption = function(name) {
	return Taskforce.m.Option.getValue(name);
}
$t.setOption = function(name, value) {
	return Taskforce.m.Option.setValue(name, value);
}