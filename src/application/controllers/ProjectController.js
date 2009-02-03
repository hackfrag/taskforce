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
		addProject: function(newTitle, startDate, dueDate) {
			
			var project = Todo.m.Project.create({
				title: newTitle,
			
			});
			project.setStartDate(startDate);
			project.setDueDate(dueDate);
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

		editDialog: function(id) {
			
			$.get('application/views/templates/project/editProject.html', function(data) {
				$(data).panel({
					width:550,
					open: function() {
						
						var project = Todo.m.Project.find(id),
							start 	= project.getStartDate() || "",
							due		= project.getDueDate() || ""
						
						$("#project-progress").progressbar({value: project.getCompletedPercent()});
						$('#project-completed-percent').html(project.getCompletedPercent());
						$('#project-open-tasks').html(project.getOpenTasks());
						$('#project-name').val(project.get('title'));
						
						if(start) {
							$('#project-start').val(start.toString('MM/dd/yyyy'));
						}
						if(due) {
							$('#project-due').val(due.toString('MM/dd/yyyy'));
							$('#project-due-date').html(due.toString('MM/dd'));
							$('#project-due-month').html(due.toString('MMMM yyyy'));
							
							
						} else {
							$('#project-due-date').html('--');
							$('#project-due-month').html('--');
						}
						
						$('#project-start').datepicker();
						$('#project-due').datepicker();
					},
					buttons: {
						"Save": function() {
					
							
							var project = Todo.m.Project.find(id);
							project.set('title', $('#project-name').val());
							
							project.setStartDate(
								Date.parse($('#project-start').val())
							);
							project.setDueDate(
								Date.parse($('#project-due').val())
							);
							
							project.save();
							
							// change Title in sidebar list
							$('#project-'+id).find('span.list-title').html($('#project-name').val());
							
							$(this).panel('close');
							

						},
						"Cancel": function() {
							$(this).panel('close');
						}
	
					}
				})
			})
		
		},
		addDialog: function() {
			

			
			$.get('application/views/templates/project/newProject.html', function(data) {
				$(data).panel({
					width:450,
					open: function() {
						
						$('#project-start').datepicker();
						$('#project-due').datepicker();
						
					},
					buttons: {
						"Add this project": function() {

							var title	= $('#project-name').val(),
								start	= Date.parse($('#project-start').val()),
								due		= Date.parse($('#project-due').val()),
								id;
								
							id = Todo.c.Project.addProject(title, start, due)	
					
							$('#project-'+id).trigger('click');
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