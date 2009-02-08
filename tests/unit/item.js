$(document).ready(function() {


module("Item/Task");  

	test('create a simple task', function() {
		var task = Todo.m.Item.create({
			title: 'test'
		});
		task.save()
		ok( task, "a simple task is created" );
	})
	
});