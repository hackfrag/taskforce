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
 * @name Taskforce.c.Upcoming
 * @type Object
 * @cat controller
 */ 
$t.c({
	
	Upcoming: {
		/**
		* Constructor
		*/
		init: function() {
			
			$('body').removeClass().addClass('upcoming plain');
				
			this.load();
					
		},
		/**
		* load all Todos in the inbox
		*
		* Inbox = all Todos without a project
		*/
		load:function() {
			
			var items;
			
			$('#viewport').empty();
			
			// unsubscribe all!
			Taskforce.c.Item.unsubscribe();

			
			////////////////////////////
			/**
			* Todos tomorrow
			*/
			items = Taskforce.m.Item.find({where: " date(start) = date('now','+1 day') AND status = '0'"});
			Taskforce.v.Item.createSection(items,'tomorrow','Act on tomorrow'); 
			
			////////////////////////////
			/**
			* Todos in the next 7 days
			*/
			items = Taskforce.m.Item.find({where: " date(start) > date('now','+1 day') AND date(start) < date('now','+8 day') AND status = '0'"});
			Taskforce.v.Item.createSection(items,'7days','Act on in the next 7 days'); 			
			////////////////////////////
			/**
			* Todos in the next 30 days
			*/
			items = Taskforce.m.Item.find({where: " date(start) > date('now','+7 day') AND date(start) < date('now','+1 month')  AND status = '0'"});
			Taskforce.v.Item.createSection(items,'30days','Act on in the next 30 days'); 			
			////////////////////////////
			/**
			* the rest 
			*/
			items = Taskforce.m.Item.find({where: " date(start) > date('now','+1 month')  AND status = '0'"});
			Taskforce.v.Item.createSection(items,'someday','Act on in the next months'); 	
			
			
			
			Taskforce.c.Item.observe('afterDateChanged',function(item){
    			Taskforce.c.Upcoming.editObserver(item.id)
			});
			Taskforce.c.Item.observe('afterStatusChanged',function(item){
    			Taskforce.c.Upcoming.editObserver(item.id)
			});
								
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
			var items = Taskforce.m.Item.find({
				where:'start > date("now") AND status="0"'
			});
			return items.length;
		},
		editObserver: function(id) {
			var item = Taskforce.m.Item.find(id);
			
			if(item.isStartTomorrow()) {
				Taskforce.v.Item.move(id,'tomorrow')
			} else if(item.isStartNextWeek()) {
				Taskforce.v.Item.move(id,'7days')
			} else if (item.isStartNextMonth()) {
				Taskforce.v.Item.move(id,'30days')
			} else if (item.isStartSomeday()) {
				Taskforce.v.Item.move(id,'someday')
			} else {
				Taskforce.v.Item.hide(id);
			}
				
			
		}
	}
});