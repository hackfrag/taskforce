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
 * Taskforce Today controller
 *
 * @name Taskforce.TodayController
 * @type Object
 * @cat controller
 */  
Taskforce.TodayController = {
	
	_style : 'today plain',
		

	load: function() {
			
		var items;
	
		/**
		* Past due block
		*/
		items = Taskforce.Item.findByPastDue();
		
		Taskforce.ItemController.list(items,'past','Past due'); 
		
	
		/**
		* Still working on'
		*/
		items = Taskforce.Item.findByWorkingOn();
		Taskforce.ItemController.list(items,'working','Still working on'); 	
		
		
		/**
		* Start today
		*/
		items = Taskforce.Item.findByStartToday();
		Taskforce.ItemController.list(items,'today','Start today'); 	
			
	
		/**
		* completed today
		*/
		items = Taskforce.Item.findByCompletedToday();
		Taskforce.ItemController.list(items,'completed-today','Completed today'); 	
		
	
		/**
		* completed yesterday
		*/
		items = Taskforce.Item.findByCompletedYesterday();
		Taskforce.ItemController.list(items,'completed-yesterday','Completed yesterday'); 

													
	},
	/**
	* Add a new Todo in the inbox List
	*
	*/
	add: function() {
		var item = Taskforce.ItemController.create('today');
		
		Taskforce.ItemController.setToday(item.id);
	
	},
	/**
	 * get the current numbers of undone tasks
	 * this methode is called by the sidebar 
	 * 
	 * @see updateBadges
	 */
	getCount: function() {
		var items = Taskforce.Item.find({
			where: "date(start) <= date('now') AND start != '' AND status = '0' "
		})
		return items.length;
	},

	
	/**
	 * is called by the item Delegates
	 *
	 *Ê@see Taskforce.UpcomingController.itemAfterDateChanged
	 * @see Taskforce.UpcomingController.itemAfterStatusChanged
	 *
	 */ 
	_onChange: function(id) {
		var item = Taskforce.Item.find(id);

		if(item.isPastDue()) {
			Taskforce.ItemView.move(id,'past')
		} else if(item.isWorking()) {
			Taskforce.ItemView.move(id,'working')
		} else if (item.isStartToday()) {
			Taskforce.ItemView.move(id,'today')
		} else if (item.isCompletedToday()) {
			Taskforce.ItemView.move(id,'completed-today')
		} else if (item.isCompletedYesterday()) {
			Taskforce.ItemView.move(id,'completed-yesterday')
		} else {
			Taskforce.ItemView.hide(id);
		}
		
	},
	////////////////////////////////////////////////////////
	/**
	 * tasks Delegates
	 */
	////////////////////////////////////////////////////////
	
	/** 
	 * is called when the date (start or due) changed
	 *
	 * @delegate
	 */
	itemAfterDateChanged: function(item) {
		this._onChange(item.id);
	},
	/**
	 * is called when the status of the task changed
	 *
	 * @delegate
	 */
	itemAfterStatusChanged: function(item) {
		this._onChange(item.id);
	},
}
