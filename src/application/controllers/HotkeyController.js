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
 * Taskforce Hotkey controller
 *
 * @name Todo.c.Hotkey
 * @type Object
 * @cat controller
 */ 
$t.c({

	Hotkey: {
	
		init: function() {
			
			
			
			$(document).bind('keydown',this.globalHotkeys);
			
			$('li.item.active').live('keydown', this.todoHotkeys);
			
	
					
		},
		globalHotkeys: function(event){
		
			switch (event.keyCode) {
				case 78:
					if (event.ctrlKey) {
						event.stopPropagation();
						event.preventDefault();
						Todo.c.Hotkey.addTodo();
					}
					break;
				case 46: 
					Todo.c.Hotkey.deleteTodo();
					break;
				case 32: 
					Todo.c.Hotkey.setTodoStatus();
					break;
				case 69: 
					if (event.ctrlKey) {
						Todo.c.Hotkey.editTodo();
					}
					break;
				case 27: 
					Todo.c.Hotkey.cancel();
					break;
				case 38: 
					Todo.c.Hotkey.moveCursorUp();
					break;
				case 40: 
					Todo.c.Hotkey.moveCursorDown();
					break;
				default:
					
			}
		},
		todoHotkeys: function(event) {
			console.log('event');
			switch (event.keyCode) {
				case 84:
					
					Todo.c.Hotkey.setTodoToday();
					break;
	
				default:
					
			}			
		},

		//////////////////////////////////////////////////////////////////////
		/**
		* Shortcut Functions
		*/
		addTodo: function() {
			if($('li.item.edit').length) {
				return;
			}
			var active = Todo.c.Sidebar.getActiveFolder();
			if($('li.item.edit').length) {
				return;
			}
			Todo.c[active].add();
		},
		deleteTodo:function() {
			
			if($('li.item.edit').length) {
				return;
			}
			
			var active = Todo.c.Item.getActiveItem();
			if(active instanceof Array) {
				$(active).each(function(i, item) {
					Todo.c.Item.remove(item);
				})
				
			} else {
				Todo.c.Item.remove(active);
			}
		},
		setTodoStatus: function() {
			if($('li.item.edit').length) {
				return;
			}
			var active = Todo.c.Item.getActiveItem();
			if(active instanceof Array) {
				$(active).each(function(i, item) {
					Todo.c.Item.setStatus(item);
				})
				
			} else {
				Todo.c.Item.setStatus(active);
			}
		},
		editTodo: function() {
			var active = Todo.c.Item.getActiveItem();
				
			if(active.length == 1 || !(active instanceof Array)) {
				Todo.v.Item.setEdit(active);
			}
		},
		setTodoToday: function() {
			var active = Todo.c.Item.getActiveItem();
			
			if($('li.item.edit').length) {
				if(active.length == 1 || !(active instanceof Array)) {
					Todo.c.Item.setToday(active);
				}
			}
			
		},
		cancel: function() {
			if($('li.item.edit').length) {
				var id = $('li.item.edit').attr('id').replace(/item-/i,"");
				Todo.v.Item.endEdit();	
				Todo.v.Item.setActive(id);
			} else {
				Todo.v.Item.endActive();
			}
		},
		moveCursorUp: function() {
			Todo.c.Item.moveCursor('up');	
		},
		moveCursorDown: function() {
			Todo.c.Item.moveCursor('down');	
		}	
	
	}

});