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
 * Taskforce Item Model
 *
 * @name Taskforce.m.Item
 * @type Object
 * @cat model
 */ 




if(Taskforce.test) {
	ActiveRecord.execute('DROP TABLE IF EXISTS items');
}


Taskforce.m.Item = ActiveRecord.define('items',{  
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
		return Taskforce.m.Item.findByPastDue(this.get('id')).length;
	},
	isWorking: function() {
		return Taskforce.m.Item.findByWorkingOn(this.get('id')).length;

	},
	isStartToday: function() {
		return Taskforce.m.Item.findByStartToday(this.get('id')).length;
	},
	isCompletedToday: function() {
		return Taskforce.m.Item.findByCompletedToday(this.get('id')).length;
	},
	isCompletedYesterday:function() {
		return Taskforce.m.Item.findByCompletedYesterday(this.get('id')).length;
	},
	isStartTomorrow: function() {
		return Taskforce.m.Item.findByStartTomorrow(this.get('id')).length;
	},
	isStartNextWeek: function() {
		return Taskforce.m.Item.findByStartNextWeek(this.get('id')).length;
	},
	isStartNextMonth: function() {
		return Taskforce.m.Item.findByStartNextMonth(this.get('id')).length;
	},
	isStartSomeday: function() {
		return Taskforce.m.Item.findByStartSomeday(this.get('id')).length; 
	},
	
});

/**
 * Static methodes
 */
   	
Taskforce.m.Item.findByPastDue = function(id) {
	var idSearch = '';
	if(id) {
		idSearch= " AND id = '"+ id +"'" ;
	}
	return Taskforce.m.Item.find({
		where: "date(due) < date('now') AND due != ''  AND status = '0'" + idSearch
	});
}
Taskforce.m.Item.findByWorkingOn = function(id) {
	var idSearch = '';
	if(id) {
		idSearch= " AND id = '"+ id +"'" ;
	}
	
	return Taskforce.m.Item.find({
		where: "date(start) < date('now') AND status = '0' AND start != '' AND ( due = '' OR date(due) >= date('now') ) " + idSearch
	});
}
Taskforce.m.Item.findByStartToday = function(id) {
	var idSearch = '';
	if(id) {
		idSearch= " AND id = '"+ id +"'" ;
	}
	
	return Taskforce.m.Item.find({
		where: "date(start) = date('now') AND status = '0' AND (date(due) >= date('now') OR due = '')" + idSearch
	});	
}
Taskforce.m.Item.findByCompletedToday = function(id) {
	var idSearch = '';
	if(id) {
		idSearch= " AND id = '"+ id +"'" ;
	}
	
	return Taskforce.m.Item.find({
		where: "date(completed) = date('now') AND status = '1' AND completed != '' " + idSearch
	});
}
Taskforce.m.Item.findByCompletedYesterday = function(id) {
	var idSearch = '';
	if(id) {
		idSearch= " AND id = '"+ id +"'" ;
	}
	
	return Taskforce.m.Item.find({
		where: "date(completed) = date('now','-1 day') AND status = '1'" + idSearch
	});
}
Taskforce.m.Item.findByStartTomorrow = function(id) {
	var idSearch = '';
	if(id) {
		idSearch= " AND id = '"+ id +"'" ;
	}
	
	return Taskforce.m.Item.find({
		where: "date(start) = date('now','+1 day') AND status = '0' " + idSearch
	});
}
Taskforce.m.Item.findByStartNextWeek = function(id) {
	var idSearch = '';
	if(id) {
		idSearch= " AND id = '"+ id +"'" ;
	}
	
	return Taskforce.m.Item.find({
		where: "date(start) > date('now','+1 day') AND date(start) < date('now','+8 day')  AND status = '0'" + idSearch
	});
}
Taskforce.m.Item.findByStartNextMonth = function(id) {
	var idSearch = '';
	if(id) {
		idSearch= " AND id = '"+ id +"'" ;
	}
	
	return Taskforce.m.Item.find({
		where: "date(start) > date('now','+7 day') AND date(start) < date('now','+1 month') AND status = '0'" + idSearch
	});
}
Taskforce.m.Item.findByStartSomeday = function(id) {
	var idSearch = '';
	if(id) {
		idSearch= " AND id = '"+ id +"'" ;
	}
	
	return Taskforce.m.Item.find({
		where: "date(start) > date('now','+1 month')  AND status = '0'" + idSearch
	});
}


