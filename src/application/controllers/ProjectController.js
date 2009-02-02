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
 * Taskforce Project controller
 *
 * @name Todo.c.Project
 * @type Object
 * @cat controller
 */ 
$t.c({
	Project: {
		activeProject 	: 0 ,	
		
		getActiveProject : function() {
			return this.activeProject;
		},
		setActiveProject : function(id) {
			this.activeProject = id;		
		},
		
		init: function() {
			var container, projects;
			
			container = $('#folders').empty();
			
			projects = Todo.m.Project.find();
			
			$(projects).each(function(i, item) {
				container.append(
					Todo.v.Project.create(item)
				)
			});
			
			this.initDropAbles();
			
			// Events
			$('#button-add').click(function() {
				Todo.c.Project.addDialog();
			})
			$('#button-remove').click(function() {
				Todo.c.Project.deleteDialog();
			})
			
			
		},
		load: function(id) {
			var items, project;
			
			Todo.c.Item.unsubscribe('afterDateChanged');
			Todo.c.Item.unsubscribe('afterStatusChanged');
			
			
			project = Todo.m.Project.find(id);
			

			
			////////////////////////////
			/**
			* Inbox
			*/
			items = Todo.m.Item.find({where:'project = "'+ id +'"',order:'prio DESC'})
			
			Todo.v.Item.createSection(items,'project',project.title); 			
		},
		/**
		* Add a new Todo to this project
		*/
		add : function() {
			item = Todo.m.Item.create({
				project: Todo.c.Project.getActiveProject()
			});
			$('#section-project').show();
			$('#section-project > ul').append(Todo.v.Item.create(item));
			Todo.v.Item.setEdit(item.id);
			Todo.c.Sidebar.updateBadges();
		},
		getTitle: function(id) {
			var project = Todo.m.Project.find(id);
			
			return project.title;
		},
		addProject: function(newTitle) {
			
			var project = Todo.m.Project.create({
				title: newTitle
			});
			project.save();
			
			$('#folders').append(
				Todo.v.Project.create(project)
			);
			this.initDropAbles();
			return project.id;
			
		},
		removeProject: function(id) {
			var project, items;
			
			project = Todo.m.Project.find(id);
			items 	= Todo.m.Item.find({
				where: 'project = "'+id+'"'
			});
			project.destroy();
			$(items).each(function(i, item) {
				item.destroy();
			});
			
			
			Todo.v.Project.remove(id);
		},
		getCount: function(id) {
			
			var items = Todo.m.Item.find({
				where:'project = "'+id+'" AND status="0"'
			});
			
			return items.length;
			
		},
		addDialog: function() {
			
			var addProject = function() {
				var title = $('#project-name').val(),
					id = Todo.c.Project.addProject(title);
					
				$('#project-'+id).trigger('click');
			}
			
			$.get('application/views/templates/project/newProject.html', function(data) {
				$(data).panel({
					width:450,
					open: function() {
						
						var self = this;
						
						$('#project-name').focus();
						$('#project-add-form').submit(function(event) {
							addProject();
							$(self).panel('close');
					
							return false;
						})
					},
					buttons: {
						"Add this project": function() {

							addProject();
							$(this).panel('close');

						},
						"Cancel": function() {
							$(this).panel('close');
						}
					}				
				});
			})
			
	
		},
		deleteDialog: function() {
			if(Todo.c.Sidebar.getActiveFolder() != "Project") {
				return;
			}
			
			$.get('application/views/templates/project/deleteProject.html', function(data) {
				
				$(data).panel({
					width:450,
					buttons: {
						"Yes, delete project": function() {
							var id = Todo.c.Project.getActiveProject();
							Todo.c.Project.removeProject(id);
							$('#Inbox').trigger('click');
							$(this).panel('close');
							
							
						},
						"No!": function() {
						
							$(this).panel('close');
						}
					}
				});

				
			})
			
		},
		initDropAbles: function() {
			$("#folders > li").droppable({
				hoverClass: 'drophover',
				tolerance:'pointer',
				drop: function(e, ui) {
					
					
					var id = $(ui.draggable).attr('id').replace(/item-/i,"");
					var project = $(this).attr('id').replace(/project-/,"");
					
					Todo.c.Item.setProject(id,project)
				}
			});
		},
	}
});