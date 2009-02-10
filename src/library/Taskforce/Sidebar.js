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
 * @subpackage		Taskforce.core
 * @since			Taskforce v 0.1
 * @license			http://www.opensource.org/licenses/mit-license.php The MIT License
 */
 
/**
 * Taskforce Sidebar Core
 *
 * @name Taskforce.Sidebar
 * @type Object
 * @cat core
 */ 
$t.Sidebar = {
	/**
	* adding a new section to the sidebar
	*
	* Example:
	* 		var inboxSection = $t.Sidebar.addSection('Inbox');
	*
	* @param	String		Section name eg. "Inbox" or "Projects"
	* @return	DOM			Section	Element
	*/
	addSection: function(name) {
		var title	= $('<h3>').html(name),
			section = $('<ul>');
							

		title.appendTo('#groups');
		section.appendTo('#groups');
		
		return section;				
	},
	/**
	* Add a new item to a section
	*
	* Example:
	* 		var inboxSection = $t.Sidebar.addSection('Inbox');
	*		
	*		$t.Sidebar.addItem(inboxSection, 'Inbox', {
	*			icon: 'inbox.png',
	*			label: 'Inbox',
	*			click: function() {
	*				Taskforce.c.Sidebar.open('Inbox');	
	*			}
	*		});
	*
	* @param	DOM			Section Element
	* @param	String		id eg. "inbox", "today"
	* @param	Object		{icon: '', badge: '', label: '', click : fn(){}}
	* @return 	DOM			item Element
	*/
	addItem: function(section, id, item) {
		return $('<li>')
			.attr('id', id)
			.append(
				$('<img>').attr('src', 'public/icons/'+ item.icon)
			)
			.append(
				$('<span>')
					.addClass('list-title')
					.html(item.label)
			)
			.append(
				$('<span>')
					.addClass('list-badge')
					.html(item.badge || "0")
			)
			.click(function() {
				$('#activ-tab').html(item.label);
				$('#groups').find('ul li').removeClass('selected');
				$(this).addClass('selected');
				
				if(item.click) {
					item.click.apply(this); 
				}
				
			})
			.appendTo(section);
		
	},
	/**
	* Change the Badge Count for a folder
	*
	* When no id is given, the current active folder will be taken
	* 
	* @param	Integer		Badge Coutn eg. 5 or 36
	* @param	String		id eg. "Today", "Inbox"
	* @return 	void
	*/
	setBadge: function(id, count) {
		
		var badge = $('#'+id).find('span.list-badge');
		
		if(count == 0) {
			badge.hide();
		} else {
			badge.show().html(count);
		}
		
	},
	/**
	* Add +1 to the Badge count
	*
	*
	* @param	String		id eg. "Today", "Inbox"	
	* @return 	void
	*/	
	riseBadgeCount: function(id) {

		var badge = $('#'+id).find('span.list-badge');
		var count = parseInt(badge.html()) +1;
		badge.show();
		badge.html(count);
		
	},
}