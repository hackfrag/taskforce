jQuery.extend(Todo.c,{
	
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
			
			
			// Show Inbox
			Todo.c.Sidebar.open('Inbox');	
			
			// DropAbles
			this.initDropAbles();
			
			// Projects
			Todo.c.Project.init();
			
			this.updateProjectBadges();
			
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

		initFolders: function() {

			$("#folders").sortable();
			
			$("#folders > li").droppable({
				hoverClass: 'drophover',
				tolerance:'pointer'
			});
			
			$('#groups ul li').click(function() {
				$('#groups ul li').removeClass('selected');
				$(this).addClass('selected');
			});
			
		}	
	}
	

});