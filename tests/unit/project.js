$(document).ready(function() {


module("Project");  

test("create a simple project", function() {
	
	var project = Taskforce.m.Project.create({
		title: 'test',
	});
	project.save();
	ok( project, "a simple project is created" );
	equals(project.get('title'), 'test', 'project title ist test');
	
	ok(project.setStartDate(Date.today()), 'set the start date to today');

	equals(project.getStartDate(), Date.today().toString());
	
		
	ok(project.setDueDate(Date.today()), 'set the due date to today');
	project.save();
	equals(project.getDueDate().toString(), Date.today().toString());
	
	
	project.destroy();
});


test('open/closed items', function() {


	var project = Taskforce.m.Project.create({
		title: 'test',
	});
	project.save();
	ok( project, "a project is created" );
	
	equals(project.getOpenTasks(), 0, "project should have 0 open tasks ");
	
	project.createItem({'title' : test});
	
	equals(project.getOpenTasks(), 1, "project should have 1 open task");
	
	var task2 = project.createItem({'title' : test})
		task3 = project.createItem({'title' : test}),
		task4 = project.createItem({'title' : test}),
		task5 = project.createItem({'title' : test});
	
	equals(project.getOpenTasks(), 5, "project should have 5 open task");
	
	task2.setStatus(1);
	task2.save();

	equals(project.getOpenTasks(), 4, "project should have 4 open task");
	equals(project.getCompletedTasks(), 1, "project should have 1 closed task");
	
	
	task3.setStatus(1);
	task3.save();
	
	equals(project.getCompletedTasks(),2, "project should have 2 closed task");
	equals(project.getOpenTasks(),3, "project should have 3 open task");
	
	equals(project.getCompletedPercent(), 40,"project is 40% completed");
	
	
	task2.destroy();
	task3.destroy();
	task4.destroy();
	task5.destroy();

	
	project.destroy();
	
})



});