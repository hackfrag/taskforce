/*
example

$('li.item').context({
	edit : {
		label: 'Edit item',
		key: 'Ctrl+c',
		fn: function() {
			
		}
	},
	delete : {
		label: 'Delete item',
		key: 'Ctrl+d',
		fn: function() {
		
		},
		enabled:false
	},
	"-",
	
})

$t.Context.add(Taskforce.Context.Task, {})


$t.Context.disable(Taskforce.Context.Task, 'edit');
$t.Context.enable(Taskforce.Context.Task, 'edit');

$t.Context.add(Taskforce.Context.Project, {});


$t.addOption('twitter_name', 'hackfrag');
$t.addOption('twitter_pwd', 'xxxx');

$t.addContext(Taskforce.Context.Task, {
	twitter: {
		label : 'Send to twitter',
		key : 'Ctrl+t',
		fn : function(item) {
			$.ajax('http://twitter.com?addtweet='+item.title);
		} 
	}
});

$t.Settings.AddSection('Twitter', {
	icon: 'twitter.png',
	template: 'twitter.html',
	start: fuction() {
	
	},
	save : function() {
	
	}
})

var section = $t.Sidebar.addSection('Tweets', {});

$t.Sidebar.addItems(section, {
	today : {
		
	}
})



Taskforce.Plugin.Twitter = {
	init: function() {
	
	}
}



*/

(function($) {

$.widget("ui.context", {

	_init : function() {
		var self = this,
			options = this.options;
			
		var container = $('<ul>');
			
		container.addClass('contextmenu');
		
		container.append(
			this._createList(options)
		)
		
			
			
	},
	_createList : function(items) {
		var container = $('<ul>'),
			hasItems = false,
			self = this;
		
		$.each(items, function() { return !(hasItems = true); });
		
		if(hasItems) {
		
			$.each(items, function(id, item) {
				container.append(self._createItem(id, item));
			});
		
		};
		return container;
	},
	_createItem: function(id, item) {
		if(id == "-") {
			return $('<li></li>')
						.addClass('split');
		}
		
		return 	$('<li></li>')
					.attr('id', id)
					.html(item.label)
					.hover(
						function() {
							$(this).addClass('hover');
						},
						function() {
							$(this).removeClass('hover');
						}
					)
					.click(function() { item.fn.apply(self.element[0], arguments); })
	}
	


});

})(jQuery);