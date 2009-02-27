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
 * Taskforce Inbox controller
 *
 * @name Taskforce.c.Inbox
 * @type Object
 * @cat controller
 */ 
$t.c({
	
	Inbox: {
		/**
		* Constructor
		*/
		init: function() {
			
			Taskforce.c.View.init();
			
			$('body').removeClass().addClass('inbox note')

			
			
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
			Taskforce.c.Item.unsubscribe();
			
			
			$('#viewport').empty();
			
			
			////////////////////////////
			/**
			* Inbox
			*/
				items = Taskforce.m.Item.find({where:'project = "" ',order:'prio DESC'})
			
			if(items.length == 0) {
				this.isEmpty();
			}
			
			Taskforce.v.Item.createSection(items,'inbox','Inbox'); 
			
			
			/**
			* Inbox Observer
			*/
			Taskforce.c.Item.observe('afterProjectChanged', function(item) {
				
				var item = $('#item-'+item.id);
				item.hide();
				Taskforce.c.Sidebar.updateBadges();
			});
			Taskforce.c.Item.observe('afterDateChanged', function(item) {

				if(item.isPastDue()) {
					Taskforce.v.Item.setPastDue(item.id, true);
				} else {
					Taskforce.v.Item.setPastDue(item.id, false);
				}				
				
			});
			
			$('#total-items').html(items.length+ ' tasks');
	
								
		},
		/**
		* Add a new Todo in the inbox List
		*
		*/
		add: function() {
			item = Taskforce.m.Item.create();
			$('#section-inbox').show();
			$('#section-inbox > ul').append(Taskforce.v.Item.create(item));
			Taskforce.v.Item.setEdit(item.id);
			Taskforce.c.Sidebar.updateBadges();
		},
		/**
		* Get the current unfinished todos
		*
		* @return	Integer		eg. 5 or 10
		*/
		getCount: function() {
			var items = Taskforce.m.Item.find({
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
			//Taskforce.v.Inbox.createHelpBox();
		}
		
	}
});