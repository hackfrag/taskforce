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
 * Taskforce Sidebar controller
 *
 * @name Taskforce.SidebarController
 * @type Object
 * @cat controller
 */ 
Taskforce.SidebarController = {
		
	/**
	* Construct
	*/
	init: function() {

	
		var inboxSection = $t.Sidebar.addSection('Inbox');
		
		$t.Sidebar.addItem(inboxSection, 'Inbox', {
			icon: 'inbox.png',
			label: 'Inbox',
			click: function() {
				Taskforce.SidebarController.open('Inbox');	
			}
		});
		
		var focusSection = $t.Sidebar.addSection('Focus');
		
		$t.Sidebar.addItem(focusSection, 'Today', {
			icon: 'today.png',
			label: 'Today',
			click: function() {
				Taskforce.SidebarController.open('Today');
			}
		});
		
		$t.Sidebar.addItem(focusSection, 'Upcoming', {
			icon: 'upcoming.png',
			label: 'Upcoming',
			click: function() {
				Taskforce.SidebarController.open('Upcoming');
			}
		});	
		
		/*
		$t.Sidebar.addItem(focusSection, 'Someday', {
			icon: 'someday.png',
			label: 'Someday',
		});	
		$t.Sidebar.addItem(focusSection, 'Projects', {
			icon: 'projects.png',
			label: 'Projects',
		});	
		*/				
			

		var projectSection = $t.Sidebar.addSection('Projects');
		projectSection.attr('id','folders');
		// init the project folder in the sidebar
		Taskforce.ProjectController.init();
		
		
		
		// Update Badges
		this.updateBadges();
		
		
		// open Inbox as first View
		Taskforce.SidebarController.open('Inbox');	
		
		/**
		 * init DropAbles: projects & today
		 */
		this.initDropAbles();
		
		
		
		// Context Menu init
		this.initContextMenu();
		
		// sidebar view splitter / resizeable sidebar
		this.initSplitter();
		
		// updates the project badges
		this.updateProjectBadges();
		
	},
	/**
	* init the Sidebar splitter / resizeable
	*/
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
		
		$("#sidebar").resizable({
			maxWidth: 450,
			minWidth: 200,
	
			resize: function(e, ui) {
				$('#todo').css('left',$(ui.element).width()+1);
				$('#header').css('left',$(ui.element).width()+1);
				$('#splitter').css('left',$(ui.element).width()-17)
				$('#main-footer').css('margin-left',$(ui.element).width())
			},
			
			handles: {
				e: $('#splitter')
			}
			
			
			
		});
		$(document).resize(function() {
	
			$('#sidebar').height($(document).height()-22);
		})

	},
	initDropAbles: function() {
		$("#Today").droppable({
			hoverClass: 'drophover',
			tolerance:'pointer',
			drop: function(e, ui) {
				var id = $(ui.draggable).attr('id').replace(/item-/i,"");
				Taskforce.ItemController.setToday(id)
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
					Taskforce.Hotkey.addTodo();
				}
			}
		});
		$('#sidebar').contextMenu('sidebar-context', {
			
			bindings: {
				'addProject' : function(t) {
					Taskforce.ProjectController.addDialog();
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
		$t.Sidebar.setBadge("Inbox", Taskforce.InboxController.getCount());
		$t.Sidebar.setBadge("Today", Taskforce.TodayController.getCount());
		$t.Sidebar.setBadge("Upcoming", Taskforce. UpcomingController.getCount());
		
		Taskforce.SidebarController.updateProjectBadges();
	},
	 
	/**
	 * Updates only all Project Badges
	 */
	updateProjectBadges: function() {
		var projects;
		
		projects = Taskforce.Project.find();
		
		$(projects).each(function(i, item) {
		
			$t.Sidebar.setBadge("project-"+item.id, Taskforce.ProjectController.getCount(item.id));			
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
	 * Opens the today/upcoming/inbox/project/view
	 */
	open: function(folder) {
		
		var viewController = Taskforce[folder+'Controller'];
		
		this.setActiveFolder(folder);
		
		$('body').removeClass().addClass(viewController._style);
		$('#viewport').empty();

		viewController.load();
		
	
	},

}
