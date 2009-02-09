$(document).ready(function() {


module("Option");  

	test('create/set optios', function() {
		var option = Todo.m.Option.create({
			name : 'version',
			value: '0.2'
		});
		
		ok(option, "a option is created");
		
		equals(Todo.m.Option.getValue('version'), '0.2');
		
		ok(Todo.m.Option.setValue('version', '0.3'), "set the version option to 0.3");
		
		equals(Todo.m.Option.getValue('version'), '0.3');
		
		// test shortcut versions
		
		equals($t.getOption('version'), '0.3');
		
		ok($.setOption('version', '0.4'));
		
		equals($t.getOption('version'), '0.3');
		
	})
	
});