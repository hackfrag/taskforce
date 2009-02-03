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
 * Taskforce Sidebar controller
 *
 * @name Todo.c.Sidebar
 * @type Object
 * @cat controller
 */ 
$t.c({
	
	/**
	* SidebarController
	*
	* 
	*/
	Sidebar: {
		
		/**
		* Construct
		*/
		init: function() {
			
			
			$('#Inbox').click(function() {
				Todo.c.Sidebar.open('Inbox');			
			});
			
			
			$('#Today').click(function() {
				Todo.c.Sidebar.open('Today');
			});
			
	
			$('#Upcoming').click(function() {
				Todo.c.Sidebar.open('Upcoming');		
			});
			
			// Update Badges
			this.updateBadges();
			
			
			// open Inbox as first View
			Todo.c.Sidebar.open('Inbox');	
			
			// DropAbles
			this.initDropAbles();
			
			// Projects
			Todo.c.Project.init();
			
			// Context Menu init
			this.initContextMenu();
			
			this.initSplitter();
			
			this.updateProjectBadges();
			
		},
		initSplitter: function() {
			
			var splitter = $('#splitter');
			splitter.css({
				position: 'absolute',
				left: 200-17,
				bottom:-23,
				height:22,
				width:17,
				top:'auto',
				'z-index':999999,
				'border-right': '1px solid #A5A5A5'
			});
			
			$("#groups").resizable({
				maxWidth: 450,
				minWidth: 200,
		
				resize: function(e, ui) {
					$('#todo').css('left',$(ui.element).width()+1);
					$('#header').css('left',$(ui.element).width()+1);
					$('#splitter').css('left',$(ui.element).width()-17)
				},
				
				handles: {
					e: $('#splitter')
				}
				
				
				
			});
			$(document).resize(function() {
				$('#groups').height($(document).height()-22);
			})

		},
		initDropAbles: function() {
			$("#Today").droppable({
				hoverClass: 'drophover',
				tolerance:'pointer',
				drop: function(e, ui) {
					var id = $(ui.draggable).attr('id').replace(/item-/i,"");
					Todo.c.Item.setToday(id)
				}
			});
		},
		/**
		 * Global Context Menu 
		 */
		initContextMenu: function() {
			$('#todo').contextMenu('todo-context', {
				
				bindings: {
					'addTask' : function(t) {
						Todo.c.Hotkey.addTodo();
					}
				}
			});
			$('#groups').contextMenu('sidebar-context', {
				
				bindings: {
				
					'addProject' : function(t) {
						Todo.c.Project.addDialog();
					}
				}
			});
		},
		/**
		* Updates all Badges with the current Count of all Folders
		*
		*
		*/
		updateBadges: function() {
			Todo.c.Sidebar.setBadge(Todo.c.Inbox.getCount(), "Inbox");
			Todo.c.Sidebar.setBadge(Todo.c.Today.getCount(), "Today");
			Todo.c.Sidebar.setBadge(Todo.c.Upcoming.getCount(), "Upcoming");
			Todo.c.Sidebar.updateProjectBadges();
		},
		updateProjectBadges: function() {
			var projects;
			
			projects = Todo.m.Project.find();
			
			$(projects).each(function(i, item) {
			
				Todo.c.Sidebar.setBadge(Todo.c.Project.getCount(item.id), "project-"+item.id);			
			})
			
		},
		/**
		* The Current Active Folder
		* eg. Today, Inbox or Upcoming
		*
		* @var	String	
		*/
		
		activeFolder: '',
		
		/**
		* Set the active folder
		* 
		* @param	String		eg. Today, Inbox or Upcoming
		* @return void
		*/
		setActiveFolder: function(folder) {
			activeFolder = folder;
		},
		/**
		* Get the current active folder
		*
		* @return	String		eg. Today, Inbox or Upcoming
		*/
		getActiveFolder: function() {
			return activeFolder;
		},
		/**
		* Change the Badge Count for a folder
		*
		* When no id is given, the current active folder will be taken
		* 
		* @param	Integer		Badge Coutn eg. 5 or 36
		* @param	String		Folder Name eg. "Today", "Inbox"
		* @return 	void
		*/
		setBadge: function(count, id) {
			if(!id) {
				id = this.getActiveFolder();
			}
			
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
		* When no id is given, the current active folder will be taken
		*
		* @param	String		Folder Name eg. "Today", "Inbox"	
		* @return 	void
		*/	
		riseBadgeCount: function(id) {
			if(!id) {
				id = Todo.Folder.getActiveFolder();
			}
			var badge = $('#'+id).find('span.list-badge');
			var count = parseInt(badge.html()) +1;
	
			badge.show();
			badge.html(count);
			
		},
		open: function(folder) {
			
			this.setActiveFolder(folder);
			$('#folders > li').removeClass('selected');
			$('#groups ul li').removeClass('selected');
			$('#'+folder).addClass('selected');
			
			Todo.c[folder].init();
		},
	
	}
	

});