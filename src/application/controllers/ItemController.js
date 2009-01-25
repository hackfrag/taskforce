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
 * Done! Item controller
 *
 * @name Todo.c.Item
 * @type Object
 * @cat controller
 */ 
$t.c({
	Item: {
		activeItem 	: 0 ,	
		
		getActiveItem : function() {
			return this.activeItem;
		},
		setActiveItem : function(id) {
			this.activeItem = id;		
		},

		//////////////////////////////////////////////////////////////////
		/**
		 * set the Prio [0-6] 
		 * 
		 * 
		 *
		 * @param	Integer		Todo ID
		 * @param	Integer		Prio: eg. 0-6
		 * @return void
		 */
		setPrio: function(id, prio) {
			var prioItem, item;
			
			/**
			 * DOM Manipulation
			 */
			item = $('#item-'+id);
			prioItem = item.find('span.todo-prio');
			prioItem.removeClass().addClass('todo-prio prio'+prio);
			prioItem.html(prio);
			
			/**
			* Save Persistent
			*/
			item = Todo.m.Item.find(id);
			item.setPrio(prio);		
			item.save();	
						
		},
		//////////////////////////////////////////////////////////////////
		/**
		 * set the due Date
		 *
		 * Notification  'afterDateChanged' is send
		 *
		 * @param	String		Date String. eg "today" "tomorrow" or "12/01/2009"
		 * @return void
		 */
		setDueDate: function(date) {
			
			var item = Todo.m.Item.find(this.getActiveItem());
			if(date == "") {
				item.setDue("");
			} else {
				date = Date.parse(date);			
				item.setDue(date.toString("yyyy-MM-dd"));
			}
			
			item.save();
			this.notify('afterDateChanged',item);
		},
		//////////////////////////////////////////////////////////////////
		/**
		 * set the start Date
		 *
		 * Notification  'afterDateChanged' is send
		 *
		 * @param	String		Date String. eg "today" "tomorrow" or "12/01/2009"
		 * @return void
		 */
		setStartDate:function(date) {
		
			var item = Todo.m.Item.find(this.getActiveItem());
			if(date == "") {
				item.setStart("");
			} else {
				date = Date.parse(date);			
				item.setStart(date.toString("yyyy-MM-dd"));
			}
			
			item.save();
			if ( Date.equals(date, Date.today()) ) {
				Todo.v.Item.setToday(item.id, true);
			} else {
				Todo.v.Item.setToday(item.id, false);	
			}
			this.notify('afterDateChanged',item);
			
		},
		//////////////////////////////////////////////////////////////////
		/**
		 * Set the start date to 'today'
		 *
		 * if no id is given, the current active item will used
		 *
		 * @param	Integer		Todo ID
		 * @return void
		 */
		setToday: function(id) {
			if(!id) {
				id = this.getActiveItem()
			}
			
			var item = Todo.m.Item.find(id);
			item.setStart(Date.today().toString("yyyy-MM-dd"));
			item.save();
			Todo.v.Item.setToday(item.id, true);
			Todo.c.Sidebar.updateBadges();
		},
		//////////////////////////////////////////////////////////////////
		/**
	 	 * Sets a Project
		 *
		 */
		setProject: function(id, project) {
			var item;
			
			item = Todo.m.Item.find(id);
			item.set('project',project);
			item.save();
			
			project = Todo.m.Project.find(project);
			
			Todo.v.Item.setProject(id, project.title);
			
			this.notify('afterProjectChanged',item);
			Todo.c.Sidebar.updateProjectBadges();
		},
		//////////////////////////////////////////////////////////////////
		/**
		 * Set a Title to the todo item
		 *
		 * If the new title is empty the item will deleted
		 * 
		 * @param	Integer		Todo ID
		 * @param	String		Todo Title eg. "Buy some flowers"
		 * @return void
		 */ 
		setTitle: function(id,newTitle) {
			
			var item, title;
			
			if(newTitle == "") {
				this.remove(id);
				
			}
			
			/**
			 * DOM Manipulation
			 */
			item = $('#item-'+id);
			title = item.find('span.todo-title > a');
			title.html(newTitle);
			
			/**
			* Save Persistent
			*/
			item = Todo.m.Item.find(id);
			item.setTitle(newTitle);	
			item.save();
			
			Todo.v.Item.initDragAbles('div.section > ul > li');
			
		},
		//////////////////////////////////////////////////////////////////
		/**
	 	 * Removes a todo item
		 *
		 * The Cursor moves one item up
		 *
		 * @param	Integer		Todo id
		 * @return void;
		 */
		remove: function(id){
			Todo.c.Item.moveCursor('up');
			var item = Todo.m.Item.find(id);
			item.destroy();
			
			$('#item-'+id).remove();
			Todo.c.Sidebar.updateBadges();
		},
		//////////////////////////////////////////////////////////////////
		/**
		 * Moves the Cursor up/down
		 *
		 * Checks if th nextSibling or previousSibling a valid li.item
		 *
		 * @param	String		eg. "up" or "down"
		 * @return void
		 */
		moveCursor : function(direction) {
			
			var item,nextID, prevID,active;
			
			/**
			* dont continue when more than 1 items selected
			*/
			active = this.getActiveItem();
			if((active instanceof Array)) {
				return false;
			}
			
			item = $('#item-'+active);
			if(direction == 'up') {
				if(item.prev().length) {
					prevID = item.prev().attr('id').replace(/item-/i,"");
					Todo.v.Item.setActive(prevID);
				}
			} else if(direction == 'down') {
				if(item.next().length) {
					nextID = item.next().attr('id').replace(/item-/i,"");
					Todo.v.Item.setActive(nextID);
				}
			}
		},
		//////////////////////////////////////////////////////////////////
		/**
		 * Set the status of the item to done/undone/canceled
		 *
		 * status is optional, without explicit status the methode tries to 
		 * look for the current status and set the item done/undone
		 *
		 * 1  done 		=> undone
		 * -1 canceled 	=> undone
		 * 0  undone 	=> done
		 *
		 * @param integer	Item ID
		 * @param integer	Status eg. -1,0,1
		 * @return void
		 */
		setStatus : function(id, status) {
			var domItem, item, checkbox;
			
			item		= Todo.m.Item.find(id);
			domItem 	= $('#item-'+id);
			checkbox 	= domItem.find('span.checkbox');
			
			if(!status) {
			
				if(checkbox.hasClass('done')) {
					// make un-done;
					checkbox.removeClass('done');
					domItem.removeClass('done');
					item.setStatus(0);
		
				} else if (checkbox.hasClass('canceled')) {
					// make un-done
					checkbox.removeClass('canceled');
					item.setStatus(0);
			
				} else {
					checkbox.addClass('done');
					domItem.addClass('done');
					item.setStatus(1);
				}	
			} else {
				switch(status) {
					case 0:
						checkbox.removeClass().addClass('checkbox');
						item.setStatus(0);
						break;
					case 1:
						checkbox.removeClass().addClass('checkbox done');
						item.setStatus(1);
						break;
					case -1:
						checkbox.removeClass().addClass('checkbox canceled');
						item.setStatus(-1);
						break;
					default:
						checkbox.removeClass().addClass('checkbox');
						item.setStatus(0);
				}
			}
			
			item.save();
			this.notify('afterStatusChanged',item);
			Todo.c.Sidebar.updateBadges();
		},


	}		

});
