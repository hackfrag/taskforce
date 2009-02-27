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
 * Taskforce Project controller
 *
 * @name Taskforce.c.Project
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
			
			projects = Taskforce.m.Project.find();
			
			$(projects).each(function(i, item) {
				container.append(
					Taskforce.v.Project.create(item)
				)
			});
			
			this.initDropAbles();
			
			
			// Events
			$('#button-add').click(function() {
				Taskforce.c.Project.addDialog();
			})
			$('#button-remove').click(function() {
				Taskforce.c.Project.deleteDialog();
			})
			
			
		},
		load: function(id) {
			var items, project;
			
			Taskforce.c.Item.unsubscribe('afterDateChanged');
			Taskforce.c.Item.unsubscribe('afterStatusChanged');
			
			
			project = Taskforce.m.Project.find(id);
			

			
			////////////////////////////
			/**
			* all task for this project
			*/
			items = Taskforce.m.Item.find({where:'project = "'+ id +'"',order:'prio DESC'})
			
			Taskforce.v.Item.createSection(items,'project',project.title);
			
			
			/**
			 * Observer
			 */
			Taskforce.c.Item.observe('afterDateChanged', function(item) {

				if(item.isPastDue()) {
					Taskforce.v.Item.setPastDue(item.id, true);
				} else {
					Taskforce.v.Item.setPastDue(item.id, false);
				}				
				
			});

			 			
		},
		/**
		* Add a new Todo to this project
		*/
		add : function() {
			item = Taskforce.m.Item.create({
				project: Taskforce.c.Project.getActiveProject()
			});
			$('#section-project').show();
			$('#section-project > ul').append(Taskforce.v.Item.create(item));
			Taskforce.v.Item.setEdit(item.id);
			Taskforce.c.Sidebar.updateBadges();
		},
		getTitle: function(id) {
			var project = Taskforce.m.Project.find(id);
			
			return project.title;
		},
		addProject: function(newTitle, startDate, dueDate) {
			
			var project = Taskforce.m.Project.create({
				title: newTitle,
			
			});
			project.setStartDate(startDate);
			project.setDueDate(dueDate);
			project.save();
			
			$('#folders').append(
				Taskforce.v.Project.create(project)
			);
			this.initDropAbles();
			return project.id;
			
		},
		removeProject: function(id) {
			var project, items;
			
			project = Taskforce.m.Project.find(id);
			items 	= Taskforce.m.Item.find({
				where: 'project = "'+id+'"'
			});
			project.destroy();
			$(items).each(function(i, item) {
				item.destroy();
			});
			
			
			Taskforce.v.Project.remove(id);
		},
		getCount: function(id) {
			
			var items = Taskforce.m.Item.find({
				where:'project = "'+id+'" AND status="0"'
			});
			
			return items.length;
			
		},

		editDialog: function(id) {
			
			$.get('application/views/templates/project/editProject.html', function(data) {
				$(data).panel({
					width:550,
					open: function() {
						
						var project = Taskforce.m.Project.find(id),
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
					
							
							var project = Taskforce.m.Project.find(id);
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
								
							id = Taskforce.c.Project.addProject(title, start, due)	
					
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
			if(Taskforce.c.Sidebar.getActiveFolder() != "Project") {
				return;
			}
			
			$.get('application/views/templates/project/deleteProject.html', function(data) {
				
				$(data).panel({
					width:450,
					buttons: {
						"Yes, delete project": function() {
							var id = Taskforce.c.Project.getActiveProject();
							Taskforce.c.Project.removeProject(id);
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
					
					Taskforce.c.Item.setProject(id,project)
				}
			});
		},
	}
});