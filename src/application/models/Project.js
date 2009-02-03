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
 * Taskforce Project Model
 *
 * @name Todo.m.Project
 * @type Object
 * @cat model
 */ 


//ActiveRecord.execute('DROP TABLE IF EXISTS projects');

Todo.m.Project = ActiveRecord.define('projects',{  
  	title: '',
  	start: '',
	due: '',
  		 
},{  
	getOpenTasks: function() {
		var items = Todo.m.Item.find({
   			where: 'project = "'+ this.get('id') +'" AND status = "0"'
		});
		return items.length;
	},
	getCompletedTasks: function() {
		var items = Todo.m.Item.find({
   			where: 'project = "'+ this.get('id') +'" AND status = "1"'
		});
		return items.length;
		
	},
	getCompletedPercent: function() {
		return (Math.round(this.getCompletedTasks()/this.getItemCount()*100)) || 0;
	},
	getStartDate: function() {
		return Date.parse(this.get('start'));
	},
	setStartDate: function(date) {
		if(date) {
			this.set('start',date.toString("yyyy-MM-dd"));
		}
	},

	getDueDate: function() {
		return Date.parse(this.get('due'));
	},	
	setDueDate: function(date) {
		if(date) {
			this.set('due',date.toString("yyyy-MM-dd"));
		}
		
	},
	
	
});

