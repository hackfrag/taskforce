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
 * @name Taskforce.c.Today
 * @type Object
 * @cat controller
 */ 
$t.c({
	
	Today: {
		init: function() {
					
			$('body').removeClass().addClass('today plain')
			

			
			this.load();
					
		},
		load:function() {
			
			var items;
			
			/**
			 * remove all contents of viewport - we need space for new Tasks!
			 */
			$('#viewport').empty();
			
			/**
			 * unsubscribe all Item Observers
			 */
			Taskforce.c.Item.unsubscribe();
					
			
			////////////////////////////
			/**
			* Past due block
			*/
			items = Taskforce.m.Item.findByPastDue();
			
			Taskforce.v.Item.createSection(items,'past','Past due'); 
			
			////////////////////////////
			/**
			* Still working on'
			*/
			items = Taskforce.m.Item.findByWorkingOn();
			Taskforce.v.Item.createSection(items,'working','Still working on'); 	
			
			////////////////////////////
			/**
			* Start today
			*/
			items = Taskforce.m.Item.findByStartToday();
			Taskforce.v.Item.createSection(items,'today','Start today'); 	
				
			////////////////////////////
			/**
			* completed today
			*/
			items = Taskforce.m.Item.findByCompletedToday();
			Taskforce.v.Item.createSection(items,'completed-today','Completed today'); 	
			
			////////////////////////////
			/**
			* completed yesterday
			*/
			items = Taskforce.m.Item.findByCompletedYesterday();
			Taskforce.v.Item.createSection(items,'completed-yesterday','Completed yesterday'); 
			
			
			/**
			 * is called after Start or Due date is changed
			 * @see editObserver	rearrange the task in the right section
			 */
			Taskforce.c.Item.observe('afterDateChanged',function(item){
    			Taskforce.c.Today.editObserver(item.id)
			});
			
			/**
			 * is called after the status done/undone is set
			 * @see editObserver 	rearrange the task in the right section
			 */
			Taskforce.c.Item.observe('afterStatusChanged',function(item){
    			Taskforce.c.Today.editObserver(item.id)
			});
			
														
		},
		/**
		* Add a new Todo in the inbox List
		*
		*/
		add: function() {
			item = Taskforce.m.Item.create({
				start: Date.today().toString("yyyy-MM-dd")
			});
			$('#section-today').show();
			
			
			$('#section-today > ul').append(Taskforce.v.Item.create(item));
			Taskforce.v.Item.setEdit(item.id);
			Taskforce.c.Sidebar.updateBadges();
		},
		/**
		 * get the current numbers of undone tasks
		 * this methode is called by the sidebar 
		 * 
		 * @see updateBadges
		 */
		getCount: function() {
			var items = Taskforce.m.Item.find({
    						where: "date(start) <= date('now') AND start != '' AND status = '0' "
						})
			return items.length;
		},
		
		/**
		 * Rearrange the task in the right section
		 */  
		editObserver: function(id) {
			var item = Taskforce.m.Item.find(id);
	
			if(item.isPastDue()) {
				Taskforce.v.Item.move(id,'past')
			} else if(item.isWorking()) {
				Taskforce.v.Item.move(id,'working')
			} else if (item.isStartToday()) {
				Taskforce.v.Item.move(id,'today')
			} else if (item.isCompletedToday()) {
				Taskforce.v.Item.move(id,'completed-today')
			} else if (item.isCompletedYesterday()) {
				Taskforce.v.Item.move(id,'completed-yesterday')
			} else {
				Taskforce.v.Item.hide(id);
			}
				
			
		}
	}
});