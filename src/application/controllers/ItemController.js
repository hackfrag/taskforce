/**
 *  Thanks to:
 *	* Timo Derstappen 	- http://teemow.com/
 *	* John Resig      	- http://jquery.com/
 *
 *
 * Taskforce :  Getting shit done 
 *		Javascript Webapplication for google Gears or Adobe AIR
 *
 * 
 * Copyright (c)    2009, Hackfrag <hackfrag@gmail.com>
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright	Copyright (c) 2009, Hackfrag
 * @link		
 * @package		Taskforce
 * @subpackage	Taskforce.controller
 * @since		Taskforce v 0.1
 * @license		http://www.opensource.org/licenses/mit-license.php The MIT License
 */
 
/**
 * Taskforce Item controller
 *
 * @name Taskforce.ItemController
 * @type Object
 * @cat controller
 */
 
 
  /*
 
 
 
 
 Taskforce.ViewController.setActive(1)
 Taskforce.ViewController.getActive();
 
 Taskforce.ViewController.moveCursor('up');
 Taskforce.ViewController.toggleHints();
 Taskforce.ViewController.toggleFilter();
 Taskforce.ViewController.search('word');
 

 // events

 
 */
  

Taskforce.ItemController = {
	//////////////////////////////////////////////////////////////////
	activeItem 	: 0 ,	
	
	getActiveItem : function() {
		return this.activeItem;
	},
	setActiveItem : function(id) {
	
		this.activeItem = id;	
		if(id == 0) {
			Taskforce.ItemView.endActive();
			return;
		} else {
			Taskforce.ItemView.setActive(id);
		}
		
		
	},
	//////////////////////////////////////////////////////////////////
	/**
	* set the id in edit mode
	* 
	* Example:
	*	Taskforce.ItemController.edit(7);
	*
	* @param	Integer		Task ID
	* @return 	boolean
	* @access	public
	*/
	edit: function(id) {
		Taskforce.ItemController.setActiveItem(id);
		
		Taskforce.ItemView.setEdit(id);
		
		/**
		* Events
		*/
		$('#todo-edit-form').find('input').blur(function() {
		
			Taskforce.ItemController.save(id);
		})
	
		$('#todo-edit-form').submit(function() {
			
			Taskforce.ItemController.save(id);	
			
			return false;
		});
			
		return true;
		
	},
	
	//////////////////////////////////////////////////////////////////
	/**
	 * saves the task
	 *
	 * The task should be in edit mode - otherwise save do nothin'
	 *
	 * Example:
	 *	Taskforce.ItemController.save(7);
	 *
	 * @param	Integer		Task ID
	 * @return	boolean		
	 * @access	public
	 */
	save: function(id) {
		
		var title = $('#todo-edit-form')
						.find('input')
						.val();
		
		Taskforce.ItemController.setTitle(id, title);
	
		Taskforce.ItemView.endEdit();
		Taskforce.ItemController.setActiveItem(id);
		
		Taskforce.ItemController.draggable($('div.section').find('div.item'));
		
		return true;
	},
	/**
	 * creates a new task and set mode to edit
	 *
	 * Example:
	 * 	Taskforce.ItemController.create('inbox')
	 * or
	 *	Taskforce.ItemController.create('today')
	 *
	 * @param	String	ListID / Section ID
	 * @return	Object	ActiveRecord Result Set
	 * @access public
	 */
	create: function(sectionID) {
				
		var item = Taskforce.Item.create();	

		Taskforce.SidebarController.updateBadges();
		
		$('#section-'+ sectionID).show();
		
		$('#section-'+ sectionID +' > ul').append(
			Taskforce.ItemController.show(item)
		);	
		
		Taskforce.ItemController.edit(item.id);
		
		return item;
	},
	/**
	 * lists all tasks in a section
	 *
	 * Example:
	 *
	 *  items = Taskforce.Item.findByStartToday();
	 *  Taskforce.ItemController.list(items,'today','Start today'); 
	 *
	 * @param	Array	ActiveRecord Result Set
	 * @param	String	Section id eg. 'today' or 'pastDue'
	 * @param	String	Section name eg. 'Today' or 'Upcoming'
	 * @return void
	 */	 
	list : function(items, sectionID, sectionName) {
		
		var itemDomArray = [];
		
		$(items).each(function(i, item) {
			itemDomArray.push(Taskforce.ItemController.show(item));
		});
		
		Taskforce.ItemView.createSection(itemDomArray, sectionID, sectionName); 
		
		Taskforce.ItemController.draggable($('div.section').find('div.item'));
		
	},
	//////////////////////////////////////////////////////////////////
	
	show: function(item) {
		var domItem;
		
		if(item.project) {
			item.project = Taskforce.Project.find(item.project).title;
		} else {
			item.project = "";
		}
		
		
		item.due 	= (item.due) ? prettyDate(item.due) : '';
		item.start 	= (item.start) ? prettyDate(item.start) : '';	
			
		dom = Taskforce.ItemView.create(item);
		
		
		/**
		 * Datepicker
		 */
		dom.find('span.todo-start > input')
			.datepicker({
				beforeShow: function(input) {
					Taskforce.ItemController.setActiveItem(item.id);
					if($(input).val() != "") {
						$(input).val(Date.parse($(input).val()).toString('MM/dd/yyyy'))
					}
				},
				onClose: function(date) {
					if(date) {
						$('#item-'+item.id).find('span.todo-start > input').val(prettyDate(date));
					}
												
					Taskforce.ItemController.setStartDate(date);
					Taskforce.SidebarController.updateBadges();
				},
		});
		dom.find('span.todo-due > input')
			.datepicker({
				beforeShow: function(input) {
					Taskforce.ItemController.setActiveItem(item.id);
					if($(input).val() != "") {
						$(input).val(Date.parse($(input).val()).toString('MM/dd/yyyy'))
					}
				},
				onClose: function(date) {
					if(date) {
						$('#item-'+item.id).find('span.todo-due > input').val(prettyDate(date));
					}
												
					Taskforce.ItemController.setDueDate(date);
					Taskforce.SidebarController.updateBadges();
				},
		});
		
		/**
		* Events
		*/
		dom.find('span.checkbox').click(function() {
			Taskforce.ItemController.setStatus(item.id);
		})
		
		/*
		dom.find('span.todo-prio').dblclick(function() {
			Taskforce.ItemView.showPrioToolTip(item.id);
		})
		dom.find('span.todo-parent').dblclick(function() {
			Taskforce.ItemView.showProjectToolTip(item.id);
		})
		*/
		dom.find('div.item').click(function() {
			Taskforce.ItemController.setActiveItem(item.id);
		});
		
		dom.find('span.todo-title').dblclick(function() {
			Taskforce.ItemController.edit(item.id)
		});
		
		/**
		* Context Menu
		*/
		dom.find('div.item').contextMenu('task-context', {
			bindings: {
				'setToday' : function(t) {
					Taskforce.ItemController.setToday(item.id);
				},
				'setStatus' : function(t) {
						Taskforce.ItemController.setStatus(item.id);
				},
				'remove' : function(t) {
					Taskforce.ItemController.remove(item.id);
				},
				'setEdit' : function(t) {
					Taskforce.ItemController.edit(item.id);
				}
			}
		});
		
		/**
		 Hotkeys
		 */
		 
		Taskforce.Hotkey.register({
			key: '77',
			ctrlKey: true,
			preventDefault:true,
			stopPropagation:true,
			shortcut: 'spc',
			name: 'Complete',
			fn: function() {
				alert('muh');
			},
		
		}) 
	
	
		return dom;
		
	},
	
	//////////////////////////////////////////////////////////////////
	/**
	 * set the Prio [0-6] 
	 * 
	 * 
	 *
	 * @param	Integer	Todo ID
	 * @param	Integer	Prio: eg. 0-6
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
		item = Taskforce.Item.find(id);
		item.setPrio(prio);	
		item.save();	
			
	},
	//////////////////////////////////////////////////////////////////
	/**
	 * set the due Date
	 *
	 * Notification  'afterDateChanged' is send
	 *
	 * @param	String	Date String. eg "today" "tomorrow" or "12/01/2009"
	 * @return void
	 */
	setDueDate: function(date) {
		
		var item = Taskforce.Item.find(this.getActiveItem());
		if(date == "") {
			item.setDueDate("");
		} else {
			date = Date.parse(date);		
			item.setDueDate(date);
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
	 * @param	String	Date String. eg "today" "tomorrow" or "12/01/2009"
	 * @return void
	 */
	setStartDate:function(date) {
	
		var item = Taskforce.Item.find(this.getActiveItem());
		
		if(date == "") {
			item.setStartDate("");
			item.save();
			return;
		} else {
			date = Date.parse(date);		
			item.setStartDate(date);
			item.save();
		}
		
		
		
		if ( Date.equals(date, Date.today()) ) {
			Taskforce.ItemView.setToday(item.id, true);
		} else {
			Taskforce.ItemView.setToday(item.id, false);	
		}
		this.notify('afterDateChanged',item);
		
	},
	//////////////////////////////////////////////////////////////////
	/**
	 * Set the start date to 'today'
	 *
	 * if no id is given, the current active item will used
	 *
	 * @param	Integer	Todo ID
	 * @return void
	 */
	setToday: function(id) {
		if(!id) {
			id = this.getActiveItem()
		}
		
		var item = Taskforce.Item.find(id);
		item.setStartDate(Date.today());
		item.save();
		Taskforce.ItemView.setToday(item.id, true);
		Taskforce.SidebarController.updateBadges();
	},
	//////////////////////////////////////////////////////////////////
	/**
	 	 * Sets a Project
	 *
	 */
	setProject: function(id, project) {
		var item;
		
		item = Taskforce.Item.find(id);
		item.set('project',project);
		item.save();
		
		project = Taskforce.Project.find(project);
		
		Taskforce.ItemView.setProject(id, project.title);
		
		this.notify('afterProjectChanged',item);
		Taskforce.SidebarController.updateProjectBadges();
	},
	//////////////////////////////////////////////////////////////////
	/**
	 * Set a Title to the todo item
	 *
	 * If the new title is empty the item will deleted
	 * 
	 * @param	Integer	Todo ID
	 * @param	String	Todo Title eg. "Buy some flowers"
	 * @return void
	 */ 
	setTitle: function(id,newTitle) {
		
		var item, title;
		
		if(newTitle == "") {
			this.remove(id);
		}
		
		/*
		var firstNewLinePos = newTitle.indexOf('\n');
		
		 * if no new line is found - firstNewLinePos is -1 ;o
		 
		if(firstNewLinePos == -1) {
			firstNewLinePos = newTitle.length;
		}
		
		* +1 because we dont want the first \n
		
		var description = newTitle.slice(firstNewLinePos+1, newTitle.length);
	
		newTitle = newTitle.slice(0,firstNewLinePos);
		*/
		
		/**
		 * DOM Manipulation
		 */
		item = $('#item-'+id);
		
		title = item.find('span.todo-title > a');
		
		title.html(newTitle);
		
		
		/*
		title = item.find('span.todo-title > p');
		title.html(description);
		*/
		
		/**
		* Save Persistent
		*/
		item = Taskforce.Item.find(id);
		item.setTitle(newTitle);	
		
		item.save();
		
		
		
	},
	//////////////////////////////////////////////////////////////////
	/**
	 	 * Removes a todo item
	 *
	 * The Cursor moves one item up
	 *
	 * @param	Integer	Todo id
	 * @return void;
	 */
	remove: function(id) {
		Taskforce.ItemController.moveCursor('up');
		var item = Taskforce.Item.find(id);
		item.destroy();
		
		$('#item-'+id).remove();
		Taskforce.SidebarController.updateBadges();
	},
	//////////////////////////////////////////////////////////////////
	/**
	 * Moves the Cursor up/down
	 *
	 * Checks if th nextSibling or previousSibling a valid div.item
	 *
	 * @param	String	eg. "up" or "down"
	 * @return void
	 */
	moveCursor : function(direction) {
		
		var item,
			nextID,
			prevID,
			active = this.getActiveItem();
		
		/**
		* dont continue when more than 1 items selected
		*/
		if((active instanceof Array)) {
			return false;
		}
		
		item = $('#item-'+active);
	
		if(direction == 'up') {
			if(item.parent().prev().children('div').length) {
				prevID = item.parent().prev().children('div').attr('id').replace(/item-/i,"");
			
				Taskforce.ItemController.setActiveItem(prevID);
			}
		} else if(direction == 'down') {
			if(item.parent().next().children('div').length) {
				nextID = item.parent().next().children('div').attr('id').replace(/item-/i,"");
				Taskforce.ItemController.setActiveItem(nextID);
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
	 * 1  done 	=> undone
	 * -1 canceled 	=> undone
	 * 0  undone 	=> done
	 *
	 * @param integer	Item ID
	 * @param integer	Status eg. -1,0,1
	 * @return void
	 */
	setStatus : function(id, status) {
	
		var domItem = $('#item-'+id),
			item	= Taskforce.Item.find(id),
			checkbox= domItem.find('span.checkbox')

		
		if(!status) {
		
			if(checkbox.hasClass('done')) {
				// make un-done;
				checkbox.removeClass('done');
				domItem.removeClass('done');
			
				item.setStatus(0);
				item.save();
				if(item.isPastDue()) {
					Taskforce.ItemView.setPastDue(id, true);
				}
			
	
			} else if (checkbox.hasClass('canceled')) {
				// make un-done
				checkbox.removeClass('canceled');
			
				item.setStatus(0);
				item.save();
			
				if(item.isPastDue()) {
					Taskforce.ItemView.setPastDue(id, true);
				}
			
			
		
			} else {
				checkbox.removeClass('pastdue');
				checkbox.addClass('done');
			
				domItem.addClass('done');
				item.setStatus(1);
			}	
		} else {
			switch(status) {
				case 0:
					checkbox.removeClass().addClass('checkbox');
					item.setStatus(0);
					item.save();
			
					if(item.isPastDue()) {
						Taskforce.ItemView.setPastDue(id, true);
					}
			
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
				item.save();
			
				if(item.isPastDue()) {
					Taskforce.ItemView.setPastDue(id, true);
				}
			}
		}
		
		item.save();
		this.notify('afterStatusChanged',item);
		Taskforce.SidebarController.updateBadges();
	},
	/**
	* convert all items of a section into draggables
	*
	* @param	String		Section name eg. 'today'
	* @access 	private
	*/
	draggable: function(section) {
		
		$(section).draggable({
			revert: false,
			helper: function() {
			
				var clone = $(this).clone().appendTo('body');
			
				clone.removeClass('active');
				clone.css('border','0px');
				clone.addClass('clone');
				
				return clone;
			},
			distance: 20,
			handle: 'span.todo-title',
			zIndex: 999999,
			opacity: 0.8,
			cursorAt: {
				top:20,
				left:40
			}
			
			
		});
	},	
}


ActiveEvent.extend(Taskforce.ItemController);	

/**
 * General Observers
 */
Taskforce.ItemController.observe('afterDateChanged', function(item) {
	if(item.isPastDue()) {
		Taskforce.ItemView.setPastDue(item.id, true);
	} else {
		Taskforce.ItemView.setPastDue(item.id, false);
	}						
});


/**
 * is called after Start or Due date is changed
 * @see editObserver	rearrange the task in the right section
 */
Taskforce.ItemController.observe('afterDateChanged',function(item) {

	var viewController = Taskforce.SidebarController.getActiveFolder() +'Controller';
	
	if(Taskforce[viewController].itemAfterDateChanged) {
		Taskforce[viewController].itemAfterDateChanged(item);
	}

});

/**
 * is called after the status done/undone is set
 * @see editObserver 	rearrange the task in the right section
 */
Taskforce.ItemController.observe('afterStatusChanged',function(item) {

	var viewController = Taskforce.SidebarController.getActiveFolder() +'Controller';
	
	if(Taskforce[viewController].itemAfterStatusChanged) {
		Taskforce[viewController].itemAfterDateChanged(item);
	}

});


Taskforce.ItemController.observe('afterProjectChanged', function(item) {
		
	var viewController = Taskforce.SidebarController.getActiveFolder() +'Controller';
	
	if(Taskforce[viewController].itemAfterProjectChanged) {

		Taskforce[viewController].itemAfterProjectChanged(item);
	}
	
	
});	


