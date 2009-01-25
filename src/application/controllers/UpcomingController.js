jQuery.extend(Todo.c,{
	
	Upcoming: {
		/**
		* Constructor
		*/
		init: function() {
			
			$('body').removeClass().addClass('upcoming plain')
			$('#activ-tab').html('Upcoming');

			
			this.load();
					
		},
		/**
		* load all Todos in the inbox
		*
		* Inbox = all Todos without a project
		*/
		load:function() {
			
			var items;
			
			$('#viewport').empty();
			
			// unsubscribe all!
			Todo.c.Item.unsubscribe();

			
			////////////////////////////
			/**
			* Todos tomorrow
			*/
			items = Todo.m.Item.find({where: " start = date('now','+1 day') AND status = '0'"});
			Todo.v.Item.createSection(items,'tomorrow','Act on tomorrow'); 
			
			////////////////////////////
			/**
			* Todos in the next 7 days
			*/
			items = Todo.m.Item.find({where: " start > date('now','+1 day') AND start < date('now','+8 day') AND status = '0'"});
			Todo.v.Item.createSection(items,'7days','Act on in the next 7 days'); 			
			////////////////////////////
			/**
			* Todos in the next 30 days
			*/
			items = Todo.m.Item.find({where: " start > date('now','+7 day') AND start < date('now','+1 month')  AND status = '0'"});
			Todo.v.Item.createSection(items,'30days','Act on in the next 30 days'); 			
			////////////////////////////
			/**
			* the rest 
			*/
			items = Todo.m.Item.find({where: " start > date('now','+1 month')  AND status = '0'"});
			Todo.v.Item.createSection(items,'someday','Act on in the next months'); 	
			
			
			
			Todo.c.Item.observe('afterDateChanged',function(item){
    			Todo.c.Upcoming.editObserver(item.id)
			});
			Todo.c.Item.observe('afterStatusChanged',function(item){
    			Todo.c.Upcoming.editObserver(item.id)
			});
								
		},
		/**
		* Add a new Todo in the inbox List
		*
		*/
		add: function() {
			Todo.c.Error.addToUpcoming();
		},
		/**
		* Get the current unfinished todos
		*
		* @return	Integer		eg. 5 or 10
		*/
		getCount: function() {
			var items = Todo.m.Item.find({
				where:'start > date("now") AND status="0"'
			});
			return items.length;
		},
		editObserver: function(id) {
			var item = Todo.m.Item.find(id);
			
			if(item.isStartTomorrow()) {
				Todo.v.Item.move(id,'tomorrow')
			} else if(item.isStartNextWeek()) {
				Todo.v.Item.move(id,'7days')
			} else if (item.isStartNextMonth()) {
				Todo.v.Item.move(id,'30days')
			} else if (item.isStartSomeday()) {
				Todo.v.Item.move(id,'someday')
			} else {
				Todo.v.Item.hide(id);
			}
				
			
		}
	}
});