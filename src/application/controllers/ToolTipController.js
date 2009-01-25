jQuery.extend(Todo.c,{
	
	ToolTip: {
		
		path: 'application/views/item/',
		active: false,
		
		create: function(name, left, top,  fn) {
			if(!this.active) {
				this.clear();
				this.active = true;
				$('#tooltip').load(Todo.c.ToolTip.path + name +'.html', function(data) {
					
					$('#'+name).css('top',top+'px').css('left',left+'px').slideDown('fast',fn);	
					
				
				});
				$('#todo').bind('click', function() {
					Todo.c.ToolTip.hide();
				})
			}
			
		},
		//////////////////////////////////////////////////////
		hide: function() {
			$('#tooltip').children().hide();
			this.active = false;
			$('#todo').unbind('click');
		},
		//////////////////////////////////////////////////////
		/**
		* Clears the Help Div Container
		*/
		clear: function() {
			$('#tooltip').empty()
		},
	}
});