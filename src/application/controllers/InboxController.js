jQuery.extend(Todo.c,{
	
	Inbox: {
		/**
		* Constructor
		*/
		init: function() {
			
			$('body').removeClass().addClass('inbox note')
			$('#activ-tab').html('Inbox');
			
			
			this.load();
					
		},
		/**
		* load all Todos in the inbox
		*
		* Inbox = all Todos without a project
		*/
		load:function() {
			
			var items;
			
			// unsubscribe all!
			Todo.c.Item.unsubscribe();
			
			
			$('#viewport').empty();
			
			
			////////////////////////////
			/**
			* Inbox
			*/
			items = Todo.m.Item.find({where:'project = "" ',order:'prio DESC'})
			
			Todo.v.Item.createSection(items,'inbox','Inbox'); 
			
			
			Todo.c.Item.observe('afterProjectChanged', function(item) {
				
				var item = $('#item-'+item.id);
				item.hide();
				Todo.c.Sidebar.updateBadges();
			})
	
								
		},
		/**
		* Add a new Todo in the inbox List
		*
		*/
		add: function() {
			item = Todo.m.Item.create();
			$('#section-inbox').show();
			$('#section-inbox > ul').append(Todo.v.Item.create(item));
			Todo.v.Item.setEdit(item.id);
			Todo.c.Sidebar.updateBadges();
		},
		/**
		* Get the current unfinished todos
		*
		* @return	Integer		eg. 5 or 10
		*/
		getCount: function() {
			var items = Todo.m.Item.find({
				where:'project = "" AND status="0"'
			});
			return items.length;
		}
	}
});