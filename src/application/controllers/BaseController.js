
jQuery.extend(Todo.c,{
	Base: {

		/**
		* init all the stuff
		*/
		init: function() {	
			
			if ((!window.google || !google.gears) && Todo.backend == 'gears') {
				Todo.c.Help.googleGears();
				return;
			}
			
			Todo.c.Sidebar.init();
			Todo.c.Hotkey.init();
			
			Todo.c.Help.instruction();
		}
	}


});




