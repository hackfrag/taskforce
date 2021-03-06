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
 * Taskforce Project Model
 *
 * @name Taskforce.Project
 * @type Object
 * @cat model
 */ 


if(Taskforce.test) {
	ActiveRecord.execute('DROP TABLE IF EXISTS projects');
}

Taskforce.Project = ActiveRecord.define('projects',{  
  	title: '',
  	start: '',
	due: '',
  		 
},{  
	getOpenTasks: function() {
		var items = Taskforce.Item.find({
   			where: 'project = "'+ this.get('id') +'" AND status = "0"'
		});
		return items.length;
	},
	getCompletedTasks: function() {
		var items = Taskforce.Item.find({
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
			return true;
		}
	},

	getDueDate: function() {
		return Date.parse(this.get('due'));
	},	
	setDueDate: function(date) {
		if(date) {
			this.set('due',date.toString("yyyy-MM-dd"));
			return true;
		}
		
	},
	
	
});
Taskforce.Project.getAllSinceLastSync = function() {

	var lastSyncDate =  $t.getOption('lastSyncDate');
	if(!lastSyncDate) {
		return Taskforce.Project.find();
	}
	
	return Taskforce.Project.find({
		where: "datetime(updated) > datetime('"+lastSyncDate+"') "
	});
}

