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
 * @name Taskforce.Item
 * @type Object
 * @cat model
 */ 




if(Taskforce.test) {
	ActiveRecord.execute('DROP TABLE IF EXISTS items');
}


Taskforce.Item = ActiveRecord.define('items',{  
  	title: '',
  	description : '',
  	status: {
  		type: 'INTEGER'
  	},
  	prio: {
  		type: 'INTEGER'
  	},
 	project: '',
  	start: '',
	due: '',
	completed: '',
  	updated : ''	 
},{  
	
/**
* Instance Methodes
* 
*/	
	setTitle: function(title) {
		this.set('title',title);
		return true;
	},
	setDescription: function(description) {
		this.set('description',description);
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
		return Taskforce.Item.findByPastDue(this.get('id')).length;
	},
	isWorking: function() {
		return Taskforce.Item.findByWorkingOn(this.get('id')).length;

	},
	isStartToday: function() {
		return Taskforce.Item.findByStartToday(this.get('id')).length;
	},
	isCompletedToday: function() {
		return Taskforce.Item.findByCompletedToday(this.get('id')).length;
	},
	isCompletedYesterday:function() {
		return Taskforce.Item.findByCompletedYesterday(this.get('id')).length;
	},
	isStartTomorrow: function() {
		return Taskforce.Item.findByStartTomorrow(this.get('id')).length;
	},
	isStartNextWeek: function() {
		return Taskforce.Item.findByStartNextWeek(this.get('id')).length;
	},
	isStartNextMonth: function() {
		return Taskforce.Item.findByStartNextMonth(this.get('id')).length;
	},
	isStartSomeday: function() {
		return Taskforce.Item.findByStartSomeday(this.get('id')).length; 
	},
	
});

/**
 * Static methodes
 */
   	
Taskforce.Item.findByPastDue = function(id) {
	var idSearch = '';
	if(id) {
		idSearch= " AND id = '"+ id +"'" ;
	}
	return Taskforce.Item.find({
		where: "date(due) < date('now') AND due != ''  AND status = '0'" + idSearch
	});
}
Taskforce.Item.findByWorkingOn = function(id) {
	var idSearch = '';
	if(id) {
		idSearch= " AND id = '"+ id +"'" ;
	}
	
	return Taskforce.Item.find({
		where: "date(start) < date('now') AND status = '0' AND start != '' AND ( due = '' OR date(due) >= date('now') ) " + idSearch
	});
}
Taskforce.Item.findByStartToday = function(id) {
	var idSearch = '';
	if(id) {
		idSearch= " AND id = '"+ id +"'" ;
	}
	
	return Taskforce.Item.find({
		where: "date(start) = date('now') AND status = '0' AND (date(due) >= date('now') OR due = '')" + idSearch
	});	
}
Taskforce.Item.findByCompletedToday = function(id) {
	var idSearch = '';
	if(id) {
		idSearch= " AND id = '"+ id +"'" ;
	}
	
	return Taskforce.Item.find({
		where: "date(completed) = date('now') AND status = '1' AND completed != '' " + idSearch
	});
}
Taskforce.Item.findByCompletedYesterday = function(id) {
	var idSearch = '';
	if(id) {
		idSearch= " AND id = '"+ id +"'" ;
	}
	
	return Taskforce.Item.find({
		where: "date(completed) = date('now','-1 day') AND status = '1'" + idSearch
	});
}
Taskforce.Item.findByStartTomorrow = function(id) {
	var idSearch = '';
	if(id) {
		idSearch= " AND id = '"+ id +"'" ;
	}
	
	return Taskforce.Item.find({
		where: "date(start) = date('now','+1 day') AND status = '0' " + idSearch
	});
}
Taskforce.Item.findByStartNextWeek = function(id) {
	var idSearch = '';
	if(id) {
		idSearch= " AND id = '"+ id +"'" ;
	}
	
	return Taskforce.Item.find({
		where: "date(start) > date('now','+1 day') AND date(start) < date('now','+8 day')  AND status = '0'" + idSearch
	});
}
Taskforce.Item.findByStartNextMonth = function(id) {
	var idSearch = '';
	if(id) {
		idSearch= " AND id = '"+ id +"'" ;
	}
	
	return Taskforce.Item.find({
		where: "date(start) > date('now','+7 day') AND date(start) < date('now','+1 month') AND status = '0'" + idSearch
	});
}
Taskforce.Item.findByStartSomeday = function(id) {
	var idSearch = '';
	if(id) {
		idSearch= " AND id = '"+ id +"'" ;
	}
	
	return Taskforce.Item.find({
		where: "date(start) > date('now','+1 month')  AND status = '0'" + idSearch
	});
}

Taskforce.Item.getAllSinceLastSync = function() {

	var lastSyncDate =  $t.getOption('lastSyncDate');
	if(!lastSyncDate) {
		return Taskforce.Item.find();
	}
	lastSyncDate = Date.parse(lastSyncDate).toString('yyyy-MM-dd HH:mm:ss');
	
	return Taskforce.Item.find({
		where: "datetime(updated) > datetime('"+lastSyncDate+"') "
	});
}
Taskforce.Item.sync = function(data) {
	
}


/**
 * Events
 */
Taskforce.Item.observe('beforeSave',function(item){  
	ActiveRecord.execute('UPDATE items SET updated = datetime("now") WHERE id = "'+ item.id +'" ');

}); 
