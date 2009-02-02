(function($) {

$.widget("ui.panel", {
	
	_isOpen: false,
	
	_init: function() {
	
		if(!$('#panels').length) {
			$('body').prepend($('<div id="panels">'))
		}
		
		var self = this,
			options = this.options,
			titleID = this._getTitleId(this.element);
		
		
		var panel, contentWrapper, buttonWrapper, panelContent, panelTitle;
		
		panel 			= $('<div>');
		contentWrapper 	= $('<div>');
		buttonWrapper	= (this.buttonWrapper = $('<div>'));
		panelContent	= $('<div>');
		panelTitle		= $('<h1>');
		
		
		// width
		panel.width(options.width);
	
		panel.addClass('panel ui-widget ui-dialog');
		panel.attr('id',titleID);
		contentWrapper.addClass('content');
		buttonWrapper.addClass('buttons ui-dialog-buttonpane');
		panelContent.attr('id','panel-content');
		
		
		panelTitle.html(this.element.attr('title'));
		panelContent.html(this.element.html());
		
		
		contentWrapper.append(panelTitle);
		contentWrapper.append(panelContent);
		
		
		
		
		this._createButtons(options.buttons);
		
		panel.append(contentWrapper);
		panel.append(buttonWrapper);
		
		
	
		// shadow
		panel.append('<div class="bottom"></div>');
		panel.append('<div class="left"></div>');
		panel.append('<div class="bottom_left"></div>');
		panel.append('<div class="right"></div>');
		panel.append('<div class="bottom_right"></div>');
		
		$('#panels').empty();
		$('#panels').append(panel);
		
		var height = $('#'+titleID).height();
		
		
	
		$('#'+titleID).css('top',0-height-40);
		$('#'+titleID).show();
		(options.autoOpen && this.open());
	},
	
	_getTitleId: function($el) {
		return 'ui-panel-' + ($el.attr('id'));
	},
	

	_createButtons: function(buttons) {
		var self = this,
			hasButtons = false,
			buttonWrapper = this.buttonWrapper;
		
		// remove any existing buttons
		buttonWrapper.empty();

		$.each(buttons, function() { return !(hasButtons = true); });
		
		if (hasButtons) {
			buttonWrapper.append('<hr>');
			$.each(buttons, function(name, fn) {
			
				$('<button type="button"></button>')
					.addClass(
						'ui-state-default ' +
						'ui-corner-all'
					)
					.text(name)
					.click(function() { fn.apply(self.element[0], arguments); })
					.hover(
						function() {
							$(this).addClass('ui-state-hover');
						},
						function() {
							$(this).removeClass('ui-state-hover');
						}
					)
					.focus(function() {
						$(this).addClass('ui-state-focus');
					})
					.blur(function() {
						$(this).removeClass('ui-state-focus');
					})
					.appendTo(buttonWrapper)
			});
			
		};
		return '';
	},
	
	// Public methods
	open: function() {

		if (this._isOpen) { return; }
		
		var panelID = this._getTitleId(this.element);
		
		// overlay
		this.overlay = new $.ui.panel.overlay(this)
		
		$('#'+panelID).animate({
			top:0
		},500);
		
		this._trigger('open');
		this._isOpen = true;
	},
	
	close: function() {
		
		var panelID = this._getTitleId(this.element);
		
	
		
		$('#'+panelID).animate({
			top:0-$('#'+panelID).height()-40
		},500);
		
	
		$.ui.panel.overlay.destroy();
		
		this._trigger('close');
		this._isOpen = false;
	},
	

});


$.extend($.ui.panel, {

	defaults: {
		autoOpen: true,
		overlay: {
			background:'#000',
			opacity:0.5
		},
		width: 450,
		buttons: {
			Ok: function() {
				$(this).panel('close');
			}
			
		},
	},

	overlay: function(panel) {
		this.$el = $.ui.panel.overlay.create(panel);
	}
});



$.extend($.ui.panel.overlay,{
	create: function(panel) {
		var overlay = $('<div id="overlay" style="display:none;"></div>');
		
		overlay.addClass('panel-overlay');
		overlay.show();
		overlay.prependTo($('body'));
		
		$(document).bind('keydown.panel-overlay', function(event) {
			(event.keyCode && event.keyCode == $.ui.keyCode.ESCAPE && panel.close());
		});
		
	},
	destroy: function() {
		$('#overlay').remove();
	}	
})



})(jQuery);