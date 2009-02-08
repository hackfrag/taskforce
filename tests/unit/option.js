$(document).ready(function() {


module("Option");  

	test('create optios', function() {
		var option = Todo.m.Option.create({
			name : 'version',
			value: '0.2'
		});
		
		ok(option, "a option is created");
		
		equals(Todo.m.Option.getValue('version'), '0.2');
		
		ok(Todo.m.Option.setValue('version', '0.3'), "set the version option to 0.3");
		
		equals(Todo.m.Option.getValue('version'), '0.3');
		
	})
	
});