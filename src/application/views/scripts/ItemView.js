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
 * @package			Todo
 * @subpackage		Todo.controller
 * @since			Todo v 0.1
 * @license			http://www.opensource.org/licenses/mit-license.php The MIT License
 */
 
/**
 * Taskforce Item View
 *
 * @name Todo.v.Item
 * @type Object
 * @cat view
 */ 


$t.v({

	Item: {
		create: function(item) {
			var project, prio, title, due, dueDate, start, startDate, status, projectName;
			
		
			if(item.project) {
				projectName = Todo.m.Project.find(item.project).title;
			} else {
				projectName = "no project";
			}
		
			project	= $('<span>').addClass('todo-parent').html(projectName);
			prio	= $('<span>').addClass('todo-prio prio'+item.prio).html(item.prio);
			title	= $('<span>').addClass('todo-title')
								 	.append(
								 		$('<a href="#">').html(item.title)
								 	);
			
			dueDate = (item.due) ? prettyDate(item.due) : '';
			due	=  $('<span>').addClass('todo-due')
									.append(
										$('<input type="text" value="'+dueDate+'" class="datepicker"/>')
										.datepicker({
											
											clearText: 'Erase',
											showButtonPanel: false,
											beforeShow: function(input) {
												Todo.v.Item.setActive(item.id);
												if($(input).val() != "") {
													$(input).val(Date.parse($(input).val()).toString('MM/dd/yyyy'))
													
												}
												
											},
											
											onClose: function(date) {
												if(date) {
													$('#item-'+item.id).find('span.todo-due > input').val(prettyDate(date));
												}
												
												Todo.c.Item.setDueDate(date);
												Todo.c.Sidebar.updateBadges();
											},


										})
									);
			startDate = (item.start) ? prettyDate(item.start) : '';						
			start	=  $('<span>').addClass('todo-start')
									.append(
										$('<input type="text" value="'+startDate+'" class="datepicker"/>')
										.datepicker({
											
											clearText: 'Erase',
											showButtonPanel: false,
											beforeShow: function(input) {
												Todo.v.Item.setActive(item.id);
												if($(input).val() != "") {
													$(input).val(Date.parse($(input).val()).toString('MM/dd/yyyy') )
												}
												
											},
											onClose: function(date) {
												if(date) {
													$('#item-'+item.id).find('span.todo-start > input').val(prettyDate(date));
												}
												
												Todo.c.Item.setStartDate(date);
												Todo.c.Sidebar.updateBadges();
											}
										})

									);
			
		
			var container = $('<li>');
			container.attr('id', 'item-'+item.id);	
			
			
			/**
			* Status
			*/
			status = $('<span>').addClass('checkbox');
			status.click(function() {
				Todo.c.Item.setStatus(item.id);
			})
			if (item.status == 1) {
				status.addClass('done');
				container.addClass('done');
			} else if (item.status == -1) {
				status.addClass('canceled');
			}
			if(startDate) {
				if( Date.equals(Date.parse(startDate), new Date(Date.today())) ) {
					container.addClass('today');
				}
			}
			
			
			title.prepend(status);				
								
			
			
			/**
			* Events
			*/
			prio.dblclick(function() {
				Todo.v.Item.showPrioToolTip(item.id);
			})
			project.dblclick(function() {
				Todo.v.Item.showProjectToolTip(item.id);
			})
			container.click(function() {
				Todo.v.Item.setActive(item.id);
			});
			
			title.dblclick(function() {
				Todo.v.Item.setEdit(item.id)
			});
			
			/**
			* Context Menu
			*/
			container.contextMenu('task-context', {
				bindings: {
					'setToday' : function(t) {
						Todo.c.Item.setToday(item.id);
					},
					'setStatus' : function(t) {
						Todo.c.Item.setStatus(item.id);
					},
					'remove' : function(t) {
						Todo.c.Item.remove(item.id);
					},
					'setEdit' : function(t) {
						Todo.v.Item.setEdit(item.id);
					}
				}
			});
			
			
			
			container.addClass('item');		  
			container.append(project);
			container.append(prio);	 
			container.append(title);
			
			container.append(start);
			container.append(due);
			
			
			return container;		
		},
		/**
		* Sets the item on active
		*
		*/
		setActive: function(id) {
			
			Todo.c.Item.setActiveItem(id);
			
			var item = $('#item-'+id);
			
			this.endEdit();
			this.endActive();
						
			item.addClass('active');
		},
		endEdit: function() {
			$('li.item').find('form').remove();
			$('li.item').find('span.todo-title').show();
			$('li.item').removeClass('edit');
			
		},
		endActive: function() {
			$('li.item').removeClass('active');
		},
		
		setArrayActive: function(array) {
		
			Todo.c.Item.setActiveItem(array);
			this.endEdit();
			this.endActive();
			
			$(array).each(function(i, item) {
				
				$('#item-'+item).addClass('active');
			})
		},
		/**
		* Sets the item on edit mode
		*
		* - A Form + Input will injected
		*/
		setEdit: function(id) {
			Todo.c.Item.setActiveItem(id);
			
			var item, form, title, input;
			
			item = $('#item-'+id);
			
			$('li.item').removeClass('active');
			item.addClass('edit');
			
			form 	= $('<form method="POST" url="#" id="muh">');
			title 	= item.children('span.todo-title');
			
			input 	= $('<input type="text" class="todo-title"/>');
			input.width(title.width());
			input.val(title.find('a').html());
			
			/**
			* Events
			*/
			input.blur(function() {
				Todo.c.Item.setTitle(id, $(this).val());
				//Todo.v.Item.endEdit();
				//Todo.v.Item.setActive(id);
			})

			form.submit(function() {
				
				Todo.c.Item.setTitle(id, $(this).children('input').val());
				Todo.v.Item.endEdit();
				Todo.v.Item.setActive(id);
				
				return false;
			});
			
			
			
			form.append(input);
			
			
			item.prepend(form);
			input.focus();
			title.hide();
			
		},
		move: function(id, section) {
		
			var item, section, oldSection;
			
			item = $('#item-'+id);
			oldSection = item.parent().parent();
			
			if(section == "") {
				$(item).remove(id);
			}
			
			if($('#section-'+section).length) {
				$('#section-'+section).show();
				item.appendTo($('#section-'+ section +' > ul'));
			}
			
			if(oldSection.find('ul > li').length == 0) {
				oldSection.hide();
			}
		
		},
		hide: function(id) {
			var item;
			item = $('#item-'+id);
			
			item.hide();
		},
		createSection: function(items, id, title) {
			
			var container = $('<div>').attr('id','section-'+id).addClass('section').hide();
				
			var list = $('<ul>');
				
			container.append(
				$('<h2>').append($('<span>').html(title))
			);
			
			$(items).each(function(i, item) {
				list.append(
					Todo.v.Item.create(item)
				)
			});
			
			container.append(list);
			
			container.append(
				$('<hr>')
			);
			
			if(items.length) {
				container.show();
			}
			
			$('#viewport').append(container);
			this.initDragAbles('#section-'+id+' > ul li');
			
		},
		showPrioToolTip: function(id) {
		
			var item, prio, top, left;
			
			item = $('#item-'+id);
			prio = item.find('span.todo-prio');
			top  = prio.offset().top+27;
			left = prio.offset().left-23;
			
			Todo.c.ToolTip.create('prio-tooltip', left,top, function() {
				$('#prio-slider option:contains('+prio.html()+')').attr('selected');
				
				$('#prio-slider').selectToUISlider({
					sliderOptions: {
						change: function(event, ui) {							
							Todo.c.Item.setPrio(id, $('#prio-slider').val())
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
		setToday:function(id, flag) {
			var item;
			item = $('#item-'+id);
			
			if(flag) {
				item.addClass('today');
				item.find('span.todo-start > input').val('Today');
			} else {
				item.removeClass('today');
			}
			
		},
		setProject: function(id, title) {
			
	
			item = $('#item-'+id);
			
			item.find('span.todo-parent').html(title);
		},
		initDragAbles: function(section) {
			
			$(section).draggable({
				revert: false,
				helper: function() {
				
					var clone = $(this).clone().appendTo('body');
					clone.find('span.todo-start').remove();
					clone.find('span.todo-due').remove();
					clone.find('span.todo-parent').remove();
					clone.find('span.todo-prio').remove();
					clone.find('span.checkbox').remove();
					clone.removeClass('active');
					clone.addClass('clone');
					
					return clone;
				},
				handle: 'span.todo-title',
				zIndex: 999999,
				opacity: 0.8,
				cursorAt: {
					top:0,
					left:20
				}
				
				
			});
		},	
		showProjectToolTip: function(id) {
			
			var item, title, top, left;
			
			item = $('#item-'+id);
			title = item.find('span.todo-title');
			top  = title.offset().top+29;
			left = title.offset().left+10+title.css('padding-left');
			
			Todo.c.ToolTip.create('project-tooltip', left,top, function() {
				$('#project-tooltip > input').focus();
				$('#project-tooltip > a').click(function() {
					Todo.c.ToolTip.hide();
				})
			});
			
			return false;
		},	
	
	}

});