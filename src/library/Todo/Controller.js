Todo.c = function(controller) {
    if(typeof controller === 'object') {
        
		var inherited;
        for(var i in controller) {
            inherited = new Todo.c(i);
            jQuery.extend(inherited, controller[i]);
                        
            controller[i] = inherited;
        }
		jQuery.extend(Todo.c, controller);
	}
}
jQuery.extend(Todo.c.prototype, {
	
	observers: {},
	observe: function(event, fn) {
		this.observers[event] = fn;
	},
	unsubscribe: function(event) {
	
		if(!event) {
			this.observers = {};
		} else {
			delete this.observers[event];
		}
		
	},
	notify: function(event, item) {
		if(this.observers[event]) {
			this.observers[event](item);
		}
	},	
});



