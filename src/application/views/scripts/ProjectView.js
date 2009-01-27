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
 * Taskforce Project View
 *
 * @name Todo.v.Project
 * @type Object
 * @cat view
 */ 

$t.v({

	Project: {
		create: function(project) {
			var container, image, label, badge;
			
			container = $('<li>').attr('id','project-'+project.id);
			
			image = $('<img>')	.attr('src','public/icons/folder.png')
								.attr('alt',project.title);
								
			label = $('<span>').addClass('list-title').html(project.title);
			badge = $('<span>').addClass('list-badge').html(0);
			
			container.append(image);
			container.append(label);
			container.append(badge);
			
			container.click(function() {
			
				Todo.v.Project.setActive(project.id);
				
				
			});
			
			/**
			* Context Menu
			*/
			container.contextMenu('project-context', {
				bindings: {
					'remove' : function(t) {
						Todo.v.Project.setActive(project.id);						
						Todo.c.Project.deleteDialog();
					},
					'rename' : function(t) {
						// @todo need to implement
					},
					'addTask' : function(t) {
						Todo.v.Project.setActive(project.id);
						Todo.c.Hotkey.addTodo();
					}
					
				}
			});
			
			
			
			return container;
		},
		setActive: function(id) {
			var project = $('#project-'+id);
			
			$('#groups > ul > li').removeClass('selected');
			$('#folders > li').removeClass('selected');
			project.addClass('selected');
			
			Todo.c.Sidebar.setActiveFolder('Project');
			Todo.c.Project.setActiveProject(id);
			
			$('#viewport').empty();
			$('body').removeClass().addClass('today note');
			$('#activ-tab').html(Todo.c.Project.getTitle(id));
					
			Todo.c.Project.load(id);
			
		},
		remove: function(id) {
			var project;
			project = $('#project-'+id);
			
			project.remove();
		}
	}
});