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




//ActiveRecord.execute('DROP TABLE IF EXISTS items');

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
	

	setTitle: function(title) {
		this.set('title',title);
	},
	setPrio: function(prio) {
		this.set('prio',prio)
	},
	setStatus: function(status) {
		if(status == 1) {
			this.set('completed',Date.today().toString("yyyy-MM-dd"));
		}
		this.set('status',status);
	},
	setDue: function(date) {
		
		this.set('due',date);
	},
	setStart: function(date) {
		
		this.set('start',date);
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
 

