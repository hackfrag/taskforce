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
 * Taskforce Inbox controller
 *
 * @name Todo.c.Inbox
 * @type Object
 * @cat controller
 */ 
$t.c({
	
	Inbox: {
		/**
		* Constructor
		*/
		init: function() {
			
			$('body').removeClass().addClass('inbox note')
			$('#activ-tab').html('Inbox');
			
			
			this.load();
					
		},
		/**
		* load all Todos in the inbox
		*
		* Inbox = all Todos without a project
		*/
		load:function() {
			
			var items;
			
			// unsubscribe all!
			Todo.c.Item.unsubscribe();
			
			
			$('#viewport').empty();
			
			
			////////////////////////////
			/**
			* Inbox
			*/
			items = Todo.m.Item.find({where:'project = "" ',order:'prio DESC'})
			
			if(items.length == 0) {
				this.isEmpty();
			}
			
			Todo.v.Item.createSection(items,'inbox','Inbox'); 
			
			
			/**
			* Inbox Observer
			*/
			Todo.c.Item.observe('afterProjectChanged', function(item) {
				
				var item = $('#item-'+item.id);
				item.hide();
				Todo.c.Sidebar.updateBadges();
			})
	
								
		},
		/**
		* Add a new Todo in the inbox List
		*
		*/
		add: function() {
			item = Todo.m.Item.create();
			$('#section-inbox').show();
			$('#section-inbox > ul').append(Todo.v.Item.create(item));
			Todo.v.Item.setEdit(item.id);
			Todo.c.Sidebar.updateBadges();
		},
		/**
		* Get the current unfinished todos
		*
		* @return	Integer		eg. 5 or 10
		*/
		getCount: function() {
			var items = Todo.m.Item.find({
				where:'project = "" AND status="0"'
			});
			return items.length;
		},
		
		/**
		* isEmpty
		* 
		* this methode is called when the inbox is empty
		*/
		isEmpty: function() {
			//Todo.v.Inbox.createHelpBox();
		}
		
	}
});