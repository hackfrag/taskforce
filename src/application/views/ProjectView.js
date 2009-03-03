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
 * Taskforce Project View 
 *
 * @name Taskforce.ProjectView
 * @type Object
 * @cat view
 */ 

Taskforce.ProjectView = {
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
			Taskforce.ProjectView.setActive(project.id);
		});
		container.dblclick(function() {
			Taskforce.ProjectController.editDialog(project.id);
		});
		
		/**
		* Context Menu
		*/
		container.contextMenu('project-context', {
			bindings: {
				'remove' : function(t) {
					Taskforce.ProjectView.setActive(project.id);						
					Taskforce.ProjectController.deleteDialog();
				},
				'edit' : function(t) {
					Taskforce.ProjectController.editDialog(project.id);
				},
				'addTask' : function(t) {
					Taskforce.ProjectView.setActive(project.id);
					Taskforce.HotkeyController.addTodo();
				}
				
			}
		});
		
		
		
		return container;
	},
	setActive: function(id) {
		var project = $('#project-'+id);
		
		$('#sidebar > ul > li').removeClass('selected');
		$('#folders > li').removeClass('selected');
		project.addClass('selected');
		
		Taskforce.SidebarController.setActiveFolder('Project');
		Taskforce.ProjectController.setActiveProject(id);
		
		$('#viewport').empty();
		$('body').removeClass().addClass('today note');
		$('#activ-tab').html(Taskforce.ProjectController.getTitle(id));
				
		Taskforce.ProjectController.load(id);
		
	},
	remove: function(id) {
		var project;
		project = $('#project-'+id);
		
		project.remove();
	}

}
