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
 * Taskforce Hotkey controller
 *
 * @name Taskforce.c.Hotkey
 * @type Object
 * @cat controller
 */ 
$t.c({

	Hotkey: {
	
		init: function() {		
			$(document).bind('keydown',this.globalHotkeys);								
		},

		globalHotkeys: function(event){
			console.log(event.keyCode);
			switch (event.keyCode) {
				case 78:
					if (event.ctrlKey) {
						event.stopPropagation();
						event.preventDefault();
						Taskforce.c.Hotkey.addTodo();
					}
					break;
				case 46: 
					Taskforce.c.Hotkey.deleteTodo();
					break;
				case 32: 
					Taskforce.c.Hotkey.setTodoStatus();
					break;
				case 9: 
			
					Taskforce.c.Hotkey.editTodo();
					
					event.preventDefault();
					break;
				case 27: 
					Taskforce.c.Hotkey.cancel();
					break;
				case 38: 
					Taskforce.c.Hotkey.moveCursorUp();
					break;
				case 40: 
					Taskforce.c.Hotkey.moveCursorDown();
					break;
				case 84: 
					Taskforce.c.Hotkey.setTodoToday();
					break;
				case 80: 
					Taskforce.c.Hotkey.moveToProject();
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
			var active = Taskforce.c.Sidebar.getActiveFolder();
			if($('li.item.edit').length) {
				return;
			}
			Taskforce.c[active].add();
		},
		deleteTodo:function() {
			
			if($('li.item.edit').length) {
				return;
			}
			
			var active = Taskforce.c.Item.getActiveItem();
			if(active instanceof Array) {
				$(active).each(function(i, item) {
					Taskforce.c.Item.remove(item);
				})
				
			} else {
				Taskforce.c.Item.remove(active);
			}
		},
		setTodoStatus: function() {
			if($('li.item.edit').length) {
				return;
			}
			var active = Taskforce.c.Item.getActiveItem();
			if(active instanceof Array) {
				$(active).each(function(i, item) {
					Taskforce.c.Item.setStatus(item);
				})
				
			} else {
				Taskforce.c.Item.setStatus(active);
			}
		},
		editTodo: function() {
			var active = Taskforce.c.Item.getActiveItem();
			
			if($('li.item.edit').length != 1) {
				if(active.length == 1 || !(active instanceof Array)) {
			
					Taskforce.v.Item.setEdit(active);
				}
			}
		},
		setTodoToday: function() {
			var active = Taskforce.c.Item.getActiveItem();
			
			if($('li.item.edit').length != 1) {
				if(active.length == 1 || !(active instanceof Array)) {
					Taskforce.c.Item.setToday(active);
				}
			}
			
		},
		cancel: function() {
			if($('li.item.edit').length) {
				var id = $('li.item.edit').attr('id').replace(/item-/i,"");
				Taskforce.v.Item.endEdit();	
				Taskforce.v.Item.setActive(id);
			} else {
				Taskforce.v.Item.endActive();
			}
		},
		moveCursorUp: function() {
			Taskforce.c.Item.moveCursor('up');	
		},
		moveCursorDown: function() {
			Taskforce.c.Item.moveCursor('down');	
		},
		moveToProject : function() {
			var active = Taskforce.c.Item.getActiveItem();
			
			if($('li.item.edit').length == 0) {
				if(active.length == 1 || !(active instanceof Array)) {
					console.log('move to project');
				}
			}
		},
	
	}

});