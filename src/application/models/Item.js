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
 * Taskforce Item Model
 *
 * @name Todo.m.Item
 * @type Object
 * @cat model
 */ 




if(Todo.test) {
	ActiveRecord.execute('DROP TABLE IF EXISTS items');
}


Todo.m.Item = ActiveRecord.define('items',{  
  	title: '',
  	status: {
  		type: 'INTEGER'
  	},
  	prio: {
  		type: 'INTEGER'
  	},
 	project: '',
  	start: '',
	due: '',
	completed: ''
  		 
},{  
	
/**
* Instance Methodes
* 
*/	
	setTitle: function(title) {
		this.set('title',title);
		return true;
	},
	setPrio: function(prio) {
		this.set('prio',prio);
		return true;
	},
	setStatus: function(status) {
		if(status == 1) {
			this.setCompletedDate(Date.today());
		}
		this.set('status',status);
		return true;
	},
	setDueDate: function(date) {
		
		if(date) {
			this.set('due',date.toString("yyyy-MM-dd"));
			return true;
		} else {
			this.set('due','');
		}
	
	},
	setStartDate: function(date) {
		
		if(date) {
			this.set('start',date.toString("yyyy-MM-dd"));
			return true;
		} else {
			this.set('start','');
		}
	
	},
	setCompletedDate: function(date) {
	
		if(date) {
			this.set('completed',date.toString("yyyy-MM-dd"));
			return true;
		} else {
			this.set('completed','');
		}	
	
	},
	isPastDue: function() {
		return Todo.m.Item.find({where: " date(due) < date('now') AND due != '' AND status = '0' AND id = '"+ this.get('id') +"'"}).length;
	},
	isWorking: function() {
		return Todo.m.Item.find({
			where: "date(start) < date('now') AND status = '0' AND start != '' AND ( due = '' OR date(due) >= date('now') )  AND id = '"+ this.get('id') +"'"
		}).length;
	},
	isStartToday: function() {
		
		return Todo.m.Item.find({where: "date(start) = date('now') AND status = '0' AND (date(due) >= date('now') OR due = '')  AND id = '"+ this.get('id') +"'"}).length;
	},
	isCompletedToday: function() {
		return Todo.m.Item.find({where: "date(completed) = date('now') AND status = '1' AND id = '"+ this.get('id') +"'"}).length;
	},
	isCompletedYesterday:function() {
		return Todo.m.Item.find({where: "date(completed) = date('now','-1 day') AND status = '1' AND id = '"+ this.get('id') +"'"}).length;
	},
	isStartTomorrow: function() {
		return Todo.m.Item.find({where: " date(start) = date('now','+1 day') AND status = '0' AND id = '"+ this.get('id') +"'"}).length;
	},
	isStartNextWeek: function() {
		return Todo.m.Item.find({where: " date(start) > date('now','+1 day') AND date(start) < date('now','+8 day')  AND status = '0' AND id = '"+ this.get('id') +"'"}).length;
	},
	isStartNextMonth: function() {
		return Todo.m.Item.find({where: " date(start) > date('now','+7 day') AND date(start) < date('now','+1 month') AND status = '0' AND id = '"+ this.get('id') +"'"}).length;
	},
	isStartSomeday: function() {
		return Todo.m.Item.find({where: " date(start) > date('now','+1 month')  AND status = '0' AND id = '"+ this.get('id') +"'"}).length;
	},
	
});

/**
 * Static methodes
 */
   	
Todo.m.Item.findByPastDue = function(id) {
	
}
Todo.m.Item.findByWorkingOn = function() {

}
Todo.m.Item.findByStartToday = 	function() {
	
}
Todo.m.Item.findByCompletedToday = function() {

}
Todo.m.Item.findByCompletedYesterday = function() {

}
Todo.m.Item.findByStartTomorrow = function() {

}
Todo.m.Item.findByStartNextWeek = function() {

}
Todo.m.Item.findByStartNextMonth = function() {

}
Todo.m.Item.findByStartSomeday = function() {

}


