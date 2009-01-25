jQuery.extend(Todo.v,{

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