/**
 *  Thanks to:
 *		* Timo Derstappen 	- http://teemow.com/
 *		* John Resig      	- http://jquery.com/
 *
 *
 * Done! :  Getting shit done 
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
 * Done! Today controller
 *
 * @name Todo.c.Today
 * @type Object
 * @cat controller
 */ 
$t.c({
	
	Today: {
		init: function() {
			
			
			
			$('body').removeClass().addClass('today plain')
			$('#activ-tab').html('Today');
			$('#todo > h2 > span').html('Today');
			
			this.load();
					
		},
		load:function() {
			
			var items;
			
			$('#viewport').empty();
			
			// unsubscribe all!
			Todo.c.Item.unsubscribe();
					
			
			////////////////////////////
			/**
			* Past due block
			*/
			items = Todo.m.Item.find({where: " due < date('now') AND due != '' AND status = '0'"});
			
			Todo.v.Item.createSection(items,'past','Past due'); 
			
			////////////////////////////
			/**
			* Still working on'
			*/
			items = Todo.m.Item.find({where: "start < date('now') AND status = '0' AND start != '' AND ( due = '' OR due >= date('now') ) "});
			Todo.v.Item.createSection(items,'working','Still working on'); 	
			
			////////////////////////////
			/**
			* Start today
			*/
			items = Todo.m.Item.find({where: "start = date('now') AND status = '0' AND (due >= date('now') OR due = '') "});
			Todo.v.Item.createSection(items,'today','Start today'); 	
				
			////////////////////////////
			/**
			* completed today
			*/
			items = Todo.m.Item.find({where: "completed = date('now') AND status = '1' "});
			Todo.v.Item.createSection(items,'completed-today','Completed today'); 	
			
			////////////////////////////
			/**
			* completed yesterday
			*/
			items = Todo.m.Item.find({where: "completed = date('now','-1 day') AND status = '1' "});
			Todo.v.Item.createSection(items,'completed-yesterday','Completed yesterday'); 
			
			
			Todo.c.Item.observe('afterDateChanged',function(item){
    			Todo.c.Today.editObserver(item.id)
			});
			Todo.c.Item.observe('afterStatusChanged',function(item){
    			Todo.c.Today.editObserver(item.id)
			});
			
														
		},
		/**
		* Add a new Todo in the inbox List
		*
		*/
		add: function() {
			item = Todo.m.Item.create({
				start: Date.today().toString("yyyy-MM-dd")
			});
			$('#section-today').show();
			
			
			$('#section-today > ul').append(Todo.v.Item.create(item));
			Todo.v.Item.setEdit(item.id);
			Todo.c.Sidebar.updateBadges();
		},
		getCount: function() {
			var items = Todo.m.Item.find({
    						where: "start <= date('now') AND start != '' AND status = '0' "
						})
			return items.length;
		},
		editObserver: function(id) {
			var item = Todo.m.Item.find(id);
	
			if(item.isPastDue()) {
				Todo.v.Item.move(id,'past')
			} else if(item.isWorking()) {
				Todo.v.Item.move(id,'working')
			} else if (item.isStartToday()) {
				Todo.v.Item.move(id,'today')
			} else if (item.isCompletedToday()) {
				Todo.v.Item.move(id,'completed-today')
			} else if (item.isCompletedYesterday()) {
				Todo.v.Item.move(id,'completed-yesterday')
			} else {
				Todo.v.Item.hide(id);
			}
				
			
		}
	}
});