$(document).ready(function() {


module("Project");  

test("create a simple project", function() {
	
	var project = Todo.m.Project.create({
		title: 'test'
	});
	project.save();
	ok( project, "a simple project is created" );
	equals(project.get('title'), 'test', 'project title ist test');

});



});