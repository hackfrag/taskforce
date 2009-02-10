$(document).ready(function() {


module("Item/Task");  

	test('create a simple task', function() {
		var task = Taskforce.m.Item.create({
			title: 'test'
		});
		task.save()
		ok( task, "a simple task is created" );
		
		task.destroy();
	})
	
	test('is past due', function() {
		var task1 = Taskforce.m.Item.create({ title: 'task1'});
		var task2 = Taskforce.m.Item.create({ title: 'task1'});
		
		task1.setDueDate(Date.parse('-2'));
		
		task1.save();
		
		
		ok(task1.isPastDue(), 'task is past due');
		
		ok(!task2.isPastDue(), 'task is not past due');
		
		
		equals(Taskforce.m.Item.findByPastDue().length, 1);
		
		task2.setDueDate(Date.parse('-2'));
		task2.save();
		
		equals(Taskforce.m.Item.findByPastDue().length, 2);

		
		task1.destroy();
		task2.destroy();
		
		equals(Taskforce.m.Item.findByPastDue().length, 0);
	});
	
	test('is working on', function() {
		var task1 = Taskforce.m.Item.create({ title: 'task1'});
		var task2 = Taskforce.m.Item.create({ title: 'task1'});
		
		task1.setStartDate(Date.parse('-2'));		
		task1.save();
		
		
		ok(task1.isWorking(), 'task is in the status "working on"');
		
		ok(!task2.isWorking(), 'task is not in the status "working on" ');
		
		
		equals(Taskforce.m.Item.findByWorkingOn().length, 1);
		
		task2.setStartDate(Date.parse('-2'));
		task2.save();
		
		equals(Taskforce.m.Item.findByWorkingOn().length, 2);
		
		task1.destroy();
		task2.destroy();
		
		equals(Taskforce.m.Item.findByWorkingOn().length, 0);
	});
	test('starts today', function() {
		var task1 = Taskforce.m.Item.create({ title: 'task1'});
		var task2 = Taskforce.m.Item.create({ title: 'task1'});
		
		task1.setStartDate(Date.today());		
		task1.save();
		
		
		ok(task1.isStartToday(), 'task is today');
		
		ok(!task2.isStartToday(), 'task is not today ');
		
		
		equals(Taskforce.m.Item.findByStartToday().length, 1);
		
		task2.setStartDate(Date.today());
		task2.save();
		
		equals(Taskforce.m.Item.findByStartToday().length, 2);
		
		task1.destroy();
		task2.destroy();
		
		equals(Taskforce.m.Item.findByStartToday().length, 0);
	});
	test('completed today', function() {
		var task1 = Taskforce.m.Item.create({ title: 'task1'});
		var task2 = Taskforce.m.Item.create({ title: 'task1'});
		
		task1.setStatus(1);		
		task1.save();
		console.log(task1);
		
		ok(task1.isCompletedToday(), 'task is completed today');
		
		ok(!task2.isCompletedToday(), 'task is not completed today ');
		
		
		equals(Taskforce.m.Item.findByCompletedToday().length, 1);
		
		task2.setStatus(1);	
		task2.save();
		
		equals(Taskforce.m.Item.findByCompletedToday().length, 2);
		
		task1.destroy();
		task2.destroy();
		
		equals(Taskforce.m.Item.findByCompletedToday().length, 0);
	});
	test('completed yesterday', function() {
		var task1 = Taskforce.m.Item.create({ title: 'task1'});
		var task2 = Taskforce.m.Item.create({ title: 'task1'});
		
		task1.setStatus(1);	
		task1.setCompletedDate(Date.parse('-1'));
		task1.save();
		
		
		ok(task1.isCompletedYesterday(), 'task was completed yesterday');
		
		ok(!task2.isCompletedYesterday(), 'task was not completed yesterday ');
		
		
		equals(Taskforce.m.Item.findByCompletedYesterday().length, 1);
		
		task2.setStatus(1);
		task2.setCompletedDate(Date.parse('-1'));	
		task2.save();
		
		equals(Taskforce.m.Item.findByCompletedYesterday().length, 2);
		
		task1.destroy();
		task2.destroy();
		
		equals(Taskforce.m.Item.findByCompletedYesterday().length, 0);
	});
	test('starts tomorrow', function() {
		var task1 = Taskforce.m.Item.create({ title: 'task1'});
		var task2 = Taskforce.m.Item.create({ title: 'task1'});
		
		task1.setStartDate(Date.parse('+1'));
		task1.save();
		
		
		ok(task1.isStartTomorrow(), 'task starts today');
		
		ok(!task2.isStartTomorrow(), 'task dont start today ');
		
		
		equals(Taskforce.m.Item.findByStartTomorrow().length, 1);
		
		task2.setStartDate(Date.parse('+1'));	
		task2.save();
		
		equals(Taskforce.m.Item.findByStartTomorrow().length, 2);
		
		task1.destroy();
		task2.destroy();
		
		equals(Taskforce.m.Item.findByStartTomorrow().length, 0);
	});
	test('starts next week', function() {
		var task1 = Taskforce.m.Item.create({ title: 'task1'});
		var task2 = Taskforce.m.Item.create({ title: 'task1'});
		
		task1.setStartDate(Date.parse('+7'));
		task1.save();
		
		
		ok(task1.isStartNextWeek(), 'task starts next week');
		
		ok(!task2.isStartNextWeek(), 'task dont start next week ');
		
		
		equals(Taskforce.m.Item.findByStartNextWeek().length, 1);
		
		task2.setStartDate(Date.parse('+7'));	
		task2.save();
		
		equals(Taskforce.m.Item.findByStartNextWeek().length, 2);
		
		task1.destroy();
		task2.destroy();
		
		equals(Taskforce.m.Item.findByStartNextWeek().length, 0);
	});
	test('starts next month', function() {
		var task1 = Taskforce.m.Item.create({ title: 'task1'});
		var task2 = Taskforce.m.Item.create({ title: 'task1'});
		
		task1.setStartDate(Date.parse('+20'));
		task1.save();
		
		console.log(task1);
		
		ok(task1.isStartNextMonth(), 'task starts next month');
		
		ok(!task2.isStartNextMonth(), 'task dont start next month ');
		
		
		equals(Taskforce.m.Item.findByStartNextMonth().length, 1);
		
		task2.setStartDate(Date.parse('+20'));	
		task2.save();
		
		equals(Taskforce.m.Item.findByStartNextMonth().length, 2);
		
		task1.destroy();
		task2.destroy();
		
		equals(Taskforce.m.Item.findByStartNextMonth().length, 0);
	});
	test('starts someday', function() {
		var task1 = Taskforce.m.Item.create({ title: 'task1'});
		var task2 = Taskforce.m.Item.create({ title: 'task1'});
		
		task1.setStartDate(Date.parse('+99'));
		task1.save();
		
		
		ok(task1.isStartSomeday(), 'task starts someday');
		
		ok(!task2.isStartSomeday(), 'task dont starts someday ');
		
		
		equals(Taskforce.m.Item.findByStartSomeday().length, 1);
		
		task2.setStartDate(Date.parse('+99'));	
		task2.save();
		
		equals(Taskforce.m.Item.findByStartSomeday().length, 2);
		
		task1.destroy();
		task2.destroy();
		
		equals(Taskforce.m.Item.findByStartSomeday().length, 0);
	});
});