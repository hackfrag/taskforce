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
			
			shortcut.add("Alt+w",function() {
				
				if($('li.item.edit').length) {
					return;
				}
				var active = Todo.c.Sidebar.getActiveFolder();
				if($('li.item.edit').length) {
					return;
				}
				Todo.c[active].add();
				
			},{'keycode': 87,'propagate':false});
			
			shortcut.add("delete",function() {
				
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
				
			},{'keycode': 46});
						
			shortcut.add("space",function() {
				
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
				
			},{'keycode': 32,'propagate':true});
			
			shortcut.add("Alt+e",function() {
				
				var active = Todo.c.Item.getActiveItem();
				
				if(active.length == 1 || !(active instanceof Array)) {
					Todo.v.Item.setEdit(active);
				}
				
			},{'keycode': 69,'propagate':false});
			
			shortcut.add("esc",function() {
				
				if($('li.item.edit').length) {
					var id = $('li.item.edit').attr('id').replace(/item-/i,"");
					Todo.v.Item.endEdit();
					
					Todo.v.Item.setActive(id);
				} else {
					Todo.v.Item.endActive();
				}
				
			},{'keycode': 27,'propagate':false});
			
			
			/**
			* Arrow Up:
			*	Moves the current selection up
			*/
			shortcut.add("up",function() {
				
				Todo.c.Item.moveCursor('up');		
			},{'keycode': 38,'propagate':true});
			
			/**
			* Arrow Down:
			*	Moves the current selection down
			*/			
			shortcut.add("down",function() {
				Todo.c.Item.moveCursor('down');	
			},{'keycode': 40,'propagate':true});				
						
		},		
	
	}

});