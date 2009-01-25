var Todo = {
	
	version:'0.1',
	debug: true,
	backend:'gears',
	m: {},
	c: {
		
	},
	v: {},
	init: function() {

		
		Todo.c.Base.init();
		this.initDB();
		
	},
	initDB: function() {
		ActiveRecord.connect(ActiveRecord.Adapters.Local,'todos');
		//ActiveRecord.connect();
		ActiveRecord.logging = false; 
	}
		
};
Todo.initDB();