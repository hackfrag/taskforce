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
 * Done! Hotkey controller
 *
 * @name Todo.c.Hotkey
 * @type Object
 * @cat controller
 */ 
$t.c({

	Hotkey: {
	
		init: function() {
			
			if(Todo.runtime == "gears") {
				this.BrowserHotkeys();
			} else if(Todo.runtime == "air") {
				this.AirHotkeys();
			}				
						
		},
		BrowserHotkeys: function() {
			shortcut.add("Alt+w"	,this.addTodo,		{'keycode': 87,'propagate':false});
			shortcut.add("delete"	,this.deleteTodo,	{'keycode': 46});			
			shortcut.add("space"	,this.setTodoStatus,{'keycode': 32,'propagate':true});
			shortcut.add("Alt+e"	,this.editTodo,		{'keycode': 69,'propagate':false});
			
			shortcut.add("esc"		,this.cancel,		{'keycode': 27,'propagate':false});		
			shortcut.add("up"		,this.moveCursorUp,	{'keycode': 38,'propagate':true});
			shortcut.add("down"		,this.moveCursorDown,{'keycode': 40,'propagate':true});
		},
		AirHotkeys: function() {
			shortcut.add("Ctrl+n"	,this.addTodo,		{'keycode': 78,'propagate':false});
			shortcut.add("Ctrl+e"	,this.editTodo,		{'keycode': 69,'propagate':false});
			shortcut.add("space"	,this.setTodoStatus,{'keycode': 32,'propagate':true});
			shortcut.add("up"		,this.moveCursorUp,	{'keycode': 38,'propagate':true});
			shortcut.add("down"		,this.moveCursorDown,{'keycode': 40,'propagate':true});
			shortcut.add("delete"	,this.deleteTodo,	{'keycode': 46});
			shortcut.add("t"		,this.setTodoToday,	{'keycode': 84});
			shortcut.add("esc"		,this.cancel,		{'keycode': 27,'propagate':false});	
			
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