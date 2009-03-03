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
 * Taskforce Upcoming controller
 *
 * @name Taskforce. UpcomingController
 * @type Object
 * @cat controller
 */ 
Taskforce.UpcomingController = {

	_style : 'upcoming plain',
		

	load:function() {

		
		var items;
		
		
		
		/**
		* Todos tomorrow
		*/
		items = Taskforce.Item.findByStartTomorrow();
		Taskforce.ItemController.list(items,'tomorrow','Act on tomorrow'); 
		
	
		/**
		* Todos in the next 7 days
		*/
		items = Taskforce.Item.findByStartNextWeek();
		Taskforce.ItemController.list(items,'7days','Act on in the next 7 days'); 			
	
		/**
		* Todos in the next 30 days
		*/
		items = Taskforce.Item.findByStartNextMonth()
		Taskforce.ItemController.list(items,'30days','Act on in the next 30 days'); 			
	
		/**
		* the rest 
		*/
		items = Taskforce.Item.findByStartSomeday();
		Taskforce.ItemController.list(items,'someday','Act on in the next months'); 	
		
		
		

							
	},
	/**
	* Add a new Todo in the inbox List
	*
	*/
	add: function() {
		$.get(Taskforce.templates + 'error/addToUpcoming.html', function(data) {
			$(data).panel({
				buttons: {
					Ok: function() {
						$(this).panel('close');
					}
				}
			});	
		})
	},
	
	/**
	* Get the current unfinished todos
	*
	* @return	Integer		eg. 5 or 10
	*/
	getCount: function() {
		var items = Taskforce.Item.find({
			where:'start > date("now") AND status="0"'
		});
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
		
		if(item.isStartTomorrow()) {
			Taskforce.ItemView.move(id,'tomorrow')
		} else if(item.isStartNextWeek()) {
			Taskforce.ItemView.move(id,'7days')
		} else if (item.isStartNextMonth()) {
			Taskforce.ItemView.move(id,'30days')
		} else if (item.isStartSomeday()) {
			Taskforce.ItemView.move(id,'someday')
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
