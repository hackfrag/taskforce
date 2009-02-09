$(document).ready(function() {


module("Item/Task");  

	test('create a simple task', function() {
		var task = Todo.m.Item.create({
			title: 'test'
		});
		task.save()
		ok( task, "a simple task is created" );
	})
	
	test('is past due', function() {
		var task1 = Todo.m.Item.create({ title: 'task1'});
		var task2 = Todo.m.Item.create({ title: 'task1'});
		
		task1.setDueDate(Date.parse('-2'));
		
		task1.save();
		
		
		ok(task1.isPastDue(), 'task is past due');
		
		ok(!task2.isPastDue(), 'task is not past due');
		
		
		equals(Todo.m.Item.findByPastDue(), 1);
		
		task2.setDueDate(Date.parse('-2'));
		task2.save();
		
		equals(Todo.m.Item.findByPastDue(), 2);
		
		task1.destory();
		task2.destory();
		
		equals(Todo.m.Item.findByPastDue(), 0);
	});
	
	test('is working on', function() {
		var task1 = Todo.m.Item.create({ title: 'task1'});
		var task2 = Todo.m.Item.create({ title: 'task1'});
		
		task1.setStartDate(Date.parse('-2'));		
		task1.save();
		
		
		ok(task1.isWorking(), 'task is in the status "working on"');
		
		ok(!task2.isWorking(), 'task is not in the status "working on" ');
		
		
		equals(Todo.m.Item.findByWorkingOn(), 1);
		
		task2.setStartDate(Date.parse('-2'));
		task2.save();
		
		equals(Todo.m.Item.findByWorkingOn(), 2);
		
		task1.destory();
		task2.destory();
		
		equals(Todo.m.Item.findByWorkingOn(), 0);
	});
	test('starts today', function() {
		var task1 = Todo.m.Item.create({ title: 'task1'});
		var task2 = Todo.m.Item.create({ title: 'task1'});
		
		task1.setStartDate(Date.today());		
		task1.save();
		
		
		ok(task1.isStartToday(), 'task is today');
		
		ok(!task2.isStartToday(), 'task is not today ');
		
		
		equals(Todo.m.Item.findByStartToday(), 1);
		
		task2.setStartDate(Date.today());
		task2.save();
		
		equals(Todo.m.Item.findByStartToday(), 2);
		
		task1.destory();
		task2.destory();
		
		equals(Todo.m.Item.findByStartToday(), 0);
	});
	test('completed today', function() {
		var task1 = Todo.m.Item.create({ title: 'task1'});
		var task2 = Todo.m.Item.create({ title: 'task1'});
		
		task1.setStatus(1);		
		task1.save();
		
		
		ok(task1.isCompletedToday(), 'task is completed today');
		
		ok(!task2.isCompletedToday(), 'task is not completed today ');
		
		
		equals(Todo.m.Item.findByCompletedToday(), 1);
		
		task2.setStatus(1);	
		task2.save();
		
		equals(Todo.m.Item.findByCompletedToday(), 2);
		
		task1.destory();
		task2.destory();
		
		equals(Todo.m.Item.findByCompletedToday(), 0);
	});
	test('completed yesterday', function() {
		var task1 = Todo.m.Item.create({ title: 'task1'});
		var task2 = Todo.m.Item.create({ title: 'task1'});
		
		task1.setStatus(1);	
		task1.setCompletedDate(Date.parse('-1'));
		task1.save();
		
		
		ok(task1.isCompletedYesterday(), 'task was completed yesterday');
		
		ok(!task2.isCompletedYesterday(), 'task was not completed yesterday ');
		
		
		equals(Todo.m.Item.findByCompletedYesterday(), 1);
		
		task2.setStatus(1);
		tasl2.setCompletedDate(Date.parse('-1'));	
		task2.save();
		
		equals(Todo.m.Item.findByCompletedYesterday(), 2);
		
		task1.destory();
		task2.destory();
		
		equals(Todo.m.Item.findByCompletedYesterday(), 0);
	});
	test('starts tomorrow', function() {
		var task1 = Todo.m.Item.create({ title: 'task1'});
		var task2 = Todo.m.Item.create({ title: 'task1'});
		
		task1.setStartDate(Date.parse('+1'));
		task1.save();
		
		
		ok(task1.isStartTomorrow(), 'task starts today');
		
		ok(!task2.isStartTomorrow(), 'task dont start today ');
		
		
		equals(Todo.m.Item.findByStartTomorrow(), 1);
		
		tasl2.setStartDate(Date.parse('+1'));	
		task2.save();
		
		equals(Todo.m.Item.findByStartTomorrow(), 2);
		
		task1.destory();
		task2.destory();
		
		equals(Todo.m.Item.findByStartTomorrow(), 0);
	});
	test('starts tomorrow', function() {
		var task1 = Todo.m.Item.create({ title: 'task1'});
		var task2 = Todo.m.Item.create({ title: 'task1'});
		
		task1.setStartDate(Date.parse('+7'));
		task1.save();
		
		
		ok(task1.isStartNextWeek(), 'task starts next week');
		
		ok(!task2.isStartNextWeek(), 'task dont start next week ');
		
		
		equals(Todo.m.Item.findByStartNextWeek(), 1);
		
		tasl2.setStartDate(Date.parse('+7'));	
		task2.save();
		
		equals(Todo.m.Item.findByStartNextWeek(), 2);
		
		task1.destory();
		task2.destory();
		
		equals(Todo.m.Item.findByStartNextWeek(), 0);
	});
	test('starts tomorrow', function() {
		var task1 = Todo.m.Item.create({ title: 'task1'});
		var task2 = Todo.m.Item.create({ title: 'task1'});
		
		task1.setStartDate(Date.parse('+31'));
		task1.save();
		
		
		ok(task1.isStartNextMonth(), 'task starts next month');
		
		ok(!task2.isStartNextMonth(), 'task dont start next month ');
		
		
		equals(Todo.m.Item.findByStartNextMonth(), 1);
		
		tasl2.setStartDate(Date.parse('+31'));	
		task2.save();
		
		equals(Todo.m.Item.findByStartNextMonth(), 2);
		
		task1.destory();
		task2.destory();
		
		equals(Todo.m.Item.findByStartNextMonth(), 0);
	});
	test('starts tomorrow', function() {
		var task1 = Todo.m.Item.create({ title: 'task1'});
		var task2 = Todo.m.Item.create({ title: 'task1'});
		
		task1.setStartDate(Date.parse('+99'));
		task1.save();
		
		
		ok(task1.isStartSomeday(), 'task starts next month');
		
		ok(!task2.isStartSomeday(), 'task dont start next month ');
		
		
		equals(Todo.m.Item.findByStartSomeday(), 1);
		
		tasl2.setStartDate(Date.parse('+99'));	
		task2.save();
		
		equals(Todo.m.Item.findByStartSomeday(), 2);
		
		task1.destory();
		task2.destory();
		
		equals(Todo.m.Item.findByStartSomeday(), 0);
	});
});