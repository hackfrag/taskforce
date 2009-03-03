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
 * @name Taskforce.InboxController
 * @type Object
 * @cat controller
 */
 

Taskforce.InboxController = {
	
	_style : 'inbox note',
	
	/**
	* this methode is called by the sidebarController 
	*
	*/
	load:function() {
		
		var items;
		
		items = Taskforce.Item.find({where:'project = "" ',order:'prio DESC'});		
		
		Taskforce.ItemController.list(items, 'inbox', 'Inbox');
			
					
	},

	/**
	* Add a new Todo in the inbox List
	*
	*/
	add: function() {

		Taskforce.ItemController.create('inbox');

	},
	/**
	* Get the current unfinished todos
	*
	* @return	Integer		eg. 5 or 10
	*/
	getCount: function() {
		var items = Taskforce.Item.find({
			where:'project = "" AND status="0"'
		});
		return items.length;
	},

	
	////////////////////////////////////////////////////////
	/**
	* Delegates
	*/
	itemAfterProjectChanged : function(item) {
		Taskforce.ItemView.hide(item.id);
		Taskforce.SidebarController.updateBadges();
	},
	
}
