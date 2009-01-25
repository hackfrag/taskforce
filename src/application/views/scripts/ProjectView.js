/**
 *  Thanks to:
 *		* Timo Derstappen 	- http://teemow.com/
 *		* John Resig      	- http://jquery.com/
 *
 *
 * Done! :  Getting shit done 
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
 * Done! Project View
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
			
				$('#groups > ul > li').removeClass('selected');
				$('#folders > li').removeClass('selected');
				$('#project-'+project.id).addClass('selected');
				
				$('#viewport').empty();
				$('body').removeClass().addClass('today note')
				$('#activ-tab').html(project.title);
				
				
				Todo.c.Sidebar.setActiveFolder('Project');
				Todo.c.Project.setActiveProject(project.id);
				Todo.c.Project.load(project.id);
			});
			
			return container;
		},
		remove: function(id) {
			var project;
			project = $('#project-'+id);
			
			project.remove();
		}
	}
});