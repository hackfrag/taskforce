/**
 *  Thanks to:
 *		* Timo Derstappen 	- http://teemow.com/
 *		* John Resig      	- http://jquery.com/
 *
 *
 * Taskforce :  Getting shit done 
 *				Javascript Webapplication for google Gears or Adobe AIR
 *
 * 
 * Copyright (c)    2009, Hackfrag <hackfrag@gmail.com>
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright		Copyright (c) 2009, Hackfrag
 * @link			
 * @package			Taskforce
 * @subpackage		Taskforce.controller
 * @since			Taskforce v 0.1
 * @license			http://www.opensource.org/licenses/mit-license.php The MIT License
 */
  
/**
 * Taskforce Item View
 *
 * @name Taskforce.ItemView
 * @type Object
 * @cat view
 */ 


Taskforce.ItemView = {
	create: function(item) {
	
		var project, prio, title, description,  due, start, status, container, container, divContainer;
		

	
		project = $('<span>')
					.addClass('todo-parent')
					.html(item.project);
		
		prio	= $('<span>')
					.addClass('todo-prio prio'+item.prio)
					.html(item.prio);
						
		title	= $('<span>')
					.addClass('todo-title')
					.append(
						$('<a href="#">').html(item.title)
					);
		
		description =  $('<p>');
		
		if(item.description != "") {
			description.html(item.description.slice(0,10)+ '...');
		}
		
		title.append(description)
						 	
		
	
		
		due	=  $('<span>')
			.addClass('todo-due')
			.append(
				$('<input type="text" value="'+item.due+'" class="datepicker"/>')
			);
					
		start =  $('<span>')
			.addClass('todo-start')
			.append(
				$('<input type="text" value="'+item.start+'" class="datepicker"/>')
			);
		
	
		container = $('<li>');
	
		divContainer = $('<div>');
	
		
		
		/**
		* Status
		*/
		status = $('<span>').addClass('checkbox');
		
		if (item.status == 1) {
			status.addClass('done');
			divContainer.addClass('done');
			
		} else if (item.status == -1) {
			status.addClass('canceled');
			
		} else {
			
			/**
			 * Checks if the task is pastDue
		 	 */
			if(item.due != '' && Date.parse(item.due).isBefore(Date.today())) {
				status.addClass('pastdue');
			}
		
		}
		
		if(item.start) {
			if( Date.equals(Date.parse(item.start), new Date(Date.today())) ) {
				divContainer.addClass('today');
			}
		}
		
		
		title.prepend(status);				

		divContainer.attr('id', 'item-'+item.id);	
		divContainer.addClass('item');		  
		divContainer.append(project);
		divContainer.append(prio);	 
		divContainer.append(title);
		divContainer.append(start);
		divContainer.append(due);
		
		
		container.append(divContainer);
		
		return container;		
	},
	/**
	* Sets the item on active 
	*
	*/
	setActive: function(id) {
		var item = $('#item-'+id);
		
		this.endEdit();
		this.endActive(false);
		item.addClass('active');
			
	},
	endEdit: function() {
		$('div.item').find('form').remove();
		$('div.item').find('span.todo-title').show();
		$('div.item').removeClass('edit');
		
		
	},
	endActive: function() {
		$('div.item').removeClass('active');		
	},
	hide: function(id) {
		var item = $('#item-'+item.id);
		item.hide();
	},
	setArrayActive: function(array) {
		this.endEdit();
		this.endActive();
		
		$(array).each(function(i, item) {
			$('#item-'+ item).addClass('active');
		})
		
		Taskforce.ItemController.setActiveItem(array);
	},
	
	/*
	* Sets the item on edit mode
	*
	* - A Form + Input will injected
	*/
	setEdit: function(id) {
		Taskforce.ItemController.setActiveItem(id);
		
		var item 	= $('#item-'+id),
			form 	= $('<form method="POST" url="#" id="todo-edit-form">'),
			title 	= item.children('span.todo-title'),
			input	= $('<input type="text" class="todo-title"/>');
		

		
		$('div.item').removeClass('active');
		
		item.addClass('edit');

		/*
		input.bind('keydown', function(event) {
			
			if(event.keyCode == 13) {
			
				if(event.shiftKey) {
					
					$(this).height($(this).height()+16);
					$(this).html($(this).html()+'\n\n')
					$(item).height($(item).height()+16);
					
				} else {
					
					form.trigger('submit');
					
				}
				
			}
		});		
		*/
		input.width(title.width());
		input.val(title.find('a').html());
		
		/*
		var newTitle = title.find('a').html();
		
	
		var description = Taskforce.Item.find(id).description;				
	
		var rowCount = description.match(new RegExp( "\\n", "g" ));
		if(rowCount) {
			rowCount = rowCount.length +2;

		} else {
			rowCount = 1;
		}
		
		
		input.height(16*rowCount);
		if(description != "") {
			input.val(newTitle + '\n' + description);
		} else {
			input.val(newTitle);
		}
		
		*/


		form.append(input);
		
		
		item.prepend(form);
		input.focus();
		title.hide();
		
	},
	setPastDue: function(id, flag) {
		var item, checkbox;
		
		item 		= $('#item-'+id);
		checkbox	= item.find('span.checkbox');
		
		if(flag) {
			checkbox.addClass('pastdue');
		} else {
			checkbox.removeClass('pastdue');
		}
	},
	move: function(id, section) {
	
		var item, section, oldSection;
		
		item = $('#item-'+id);
		
		if(section == "past") {
			Taskforce.ItemView.setPastDue(id, true)
		} else {
			Taskforce.ItemView.setPastDue(id, false)
		}
		
		oldSection = item.parent().parent();
		
		if(section == "") {
			$(item).remove(id);
		}
		
		if($('#section-'+section).length) {
			$('#section-'+section).show();
			item.appendTo($('#section-'+ section +' > ul'));
		}
		
		if(oldSection.find('div.item').length == 0) {
			oldSection.hide();
		}
	
	},
	hide: function(id) {
		var item;
		item = $('#item-'+id);
		
		item.hide();
	},
	createSection: function(items, id, title) {
		

		var container 	= $('<div>')
							.attr('id','section-'+id)
							.addClass('section')
							.hide(),
			list 		=  $('<ul>');
			

			
		container.append(
			$('<h2>').append($('<span>').html(title))
		);
		
		$(items).each(function(i, item) {
			list.append(item)
		});
		
		container
			.append(list)
			.append($('<hr>'));
		
	
		
		if(items.length) {
			container.show();
		}
		
		$('#viewport').append(container);
		
		
		
		
	
		
		
	},
	/*
	showPrioToolTip: function(id) {
	
		var item, prio, top, left;
		
		item = $('#item-'+id);
		prio = item.find('span.todo-prio');
		top  = prio.offset().top+27;
		left = prio.offset().left-23;
		
		Taskforce.ToolTipController.create('prio-tooltip', left,top, function() {
			$('#prio-slider option:contains('+prio.html()+')').attr('selected');
			
			$('#prio-slider').selectToUISlider({
				sliderOptions: {
					change: function(event, ui) {							
						Taskforce.ItemController.setPrio(id, $('#prio-slider').val())
					},
					stop : function() {
						$('div.tooltip').find('div.ui-slider').remove();
						$('div.tooltip').slideUp('fast');
					},
					value :prio.html()
					
				}
			});
		});
	},
	*/
	setToday:function(id, flag) {
		var item;
		item = $('#item-'+id);
		
		if(flag) {
			item.addClass('today');
			
			item.find('span.todo-start').children('input').val('Today');
		} else {
			item.removeClass('today');
		}
		
	},
	setProject: function(id, title) {
	
		item = $('#item-'+id);
		item.find('span.todo-parent').html(title);
		
	},
	
	/*
	showProjectToolTip: function(id) {
		
		var item, title, top, left;
		
		item = $('#item-'+id);
		title = item.find('span.todo-title');
		top  = title.offset().top+29;
		left = title.offset().left+10+title.css('padding-left');
		
		Taskforce.ToolTipController.create('project-tooltip', left,top, function() {
			$('#project-tooltip > input').focus();
			$('#project-tooltip > a').click(function() {
				Taskforce.ToolTipController.hide();
			})
		});
		
		return false;
	},	
	*/
	
}
