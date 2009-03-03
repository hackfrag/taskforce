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
 * Taskforce Hotkey 
 *
 * @name Taskforce.Hotkey
 * @type Object
 * @cat core
 */ 
Taskforce.Hotkey = {
		
		_registeredKeys : [],
		_registeredEvents : [],
		
		register: function(hotkey) {

			if(jQuery.inArray(parseInt(hotkey.key),this._registeredKeys) == '-1' ) {
				this._registeredKeys.push(parseInt(hotkey.key));
				this._registeredEvents.push(hotkey);
				
			}
		},
	
		///////////
		init: function() {		
			$(document).bind('keydown',this.globalHotkeys);								
		},

		globalHotkeys: function(event){
			
	
			var index = jQuery.inArray(event.keyCode, Taskforce.Hotkey._registeredKeys);
			
			if(index != '-1') {
				var hotkey = Taskforce.Hotkey._registeredEvents[index];
				
				if(hotkey.ctrlKey) {
					if(event.ctrlKey) {
						Taskforce.Hotkey._registeredEvents[index].fn();
					}
				} else {
					Taskforce.Hotkey._registeredEvents[index].fn();
				}
				
				if(hotkey.stopPropagation) {
					event.stopPropagation();
				}
				if(hotkey.preventDefault) {
					event.event.preventDefault();
				}
				
			}
			
			switch (event.keyCode) {
				case 78:
					if (event.ctrlKey) {
						event.stopPropagation();
						event.preventDefault();
						Taskforce.Hotkey.addTodo();
					}
					break;
				case 46: 
					Taskforce.Hotkey.deleteTodo();
					break;
				case 32: 
					Taskforce.Hotkey.setTodoStatus();
					break;
				case 9: 
					if($('div.item.edit').length == 1) {
						
					
					} else {
						Taskforce.Hotkey.editTodo();
						event.preventDefault();
					}
					
					
					
					break;
				case 27: 
					Taskforce.Hotkey.cancel();
					break;
				case 38: 
					Taskforce.Hotkey.moveCursorUp();
					break;
				case 40: 
					Taskforce.Hotkey.moveCursorDown();
					break;
				case 84: 
					Taskforce.Hotkey.setTodoToday();
					break;
				case 80: 
					Taskforce.Hotkey.moveToProject();
					break;
				default:
					
			}
		},
		//////////////////////////////////////////////////////////////////////
		/**
		* Shortcut Functions
		*/
		addTodo: function() {
			if($('div.item.edit').length) {
				return;
			}
			var active = Taskforce.SidebarController.getActiveFolder();
			if($('div.item.edit').length) {
				return;
			}
			Taskforce[active+'Controller'].add();
		},
		deleteTodo:function() {
			
			if($('div.item.edit').length) {
				return;
			}
			
			var active = Taskforce.ItemController.getActiveItem();
			if(active instanceof Array) {
				$(active).each(function(i, item) {
					Taskforce.ItemController.remove(item);
				})
				
			} else {
				Taskforce.ItemController.remove(active);
			}
		},
		setTodoStatus: function() {
			if($('div.item.edit').length) {
				return;
			}
			var active = Taskforce.ItemController.getActiveItem();
			if(active instanceof Array) {
				$(active).each(function(i, item) {
					Taskforce.ItemController.setStatus(item);
				})
				
			} else {
				Taskforce.ItemController.setStatus(active);
			}
		},
		editTodo: function() {
			var active = Taskforce.ItemController.getActiveItem();
			
			if($('div.item.edit').length != 1) {
				if(active.length == 1 || !(active instanceof Array)) {
			
					Taskforce.ItemController.edit(active);
				}
			}
		},
		setTodoToday: function() {
			var active = Taskforce.ItemController.getActiveItem();
			
			if($('div.item.edit').length != 1) {
				if(active.length == 1 || !(active instanceof Array)) {
					Taskforce.ItemController.setToday(active);
				}
			}
			
		},
		cancel: function() {
			if($('div.item.edit').length) {
				var id = $('div.item.edit').attr('id').replace(/item-/i,"");
				Taskforce.ItemController.save(id);
			} else {
				Taskforce.ItemController.setActiveItem(0);
			}
		},
		moveCursorUp: function() {
			Taskforce.ItemController.moveCursor('up');	
		},
		moveCursorDown: function() {
			Taskforce.ItemController.moveCursor('down');	
		},
		moveToProject : function() {
			var active = Taskforce.ItemController.getActiveItem();
			
			if($('div.item.edit').length == 0) {
				if(active.length == 1 || !(active instanceof Array)) {
					console.log('move to project');
				}
			}
		},
	
}
