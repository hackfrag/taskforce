/**
 *  Thanks to:
 *		* Timo Derstappen 	- http://teemow.com/
 *		* John Resig      	- http://jquery.com/
 *
 *
 * Done! :  Getting shit done 
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
 * @subpackage		Todo.core
 * @since			Todo v 0.1
 * @license			http://www.opensource.org/licenses/mit-license.php The MIT License
 */
 
 
 

/**
 * This is the Done! core. Heavily inspired by jQuery's and jamal-mvc architecture. 
 *
 * jQuery is required
 *
 * @name Todo
 * @type Object
 * @cat core
 */
var Todo = {
  	
  	/**
  	 * Done! Version Number
  	 *
  	 * @private
  	 * @property
  	 * @name version
  	 * @type String
  	 */
	version:'0.1',
  	/**
  	 * Debug flag
  	 *
  	 * @private
  	 * @property
  	 * @name debug
  	 * @type Bool
  	 */
	debug: false,
	
  	/**
  	 * Runtime 
  	 *
  	 * eg. gears, air or anyting else
  	 *
  	 * @private
  	 * @property
  	 * @name runtime
  	 * @type String
  	 */
	runtime:'gears',
	
    /**
     * Map of all available models.
     *
     * @public
     * @property
     * @name m
     * @type Map
     */
	m: {},
	
    /**
     * Map of all available controllers.
     *
     * @public
     * @property
     * @name c
     * @type Map
     */
	c: {},
	
    /**
     * Map of all available views.
     *
     * @public
     * @property
     * @name v
     * @type Map
     */
	v: {},
	checkRuntime: function() {
	
		if (window.google) {
			this.runtime = "gears";
		} else if(window.runtime) {
			this.runtime = "air";
		}
	},
	isBrowser: function() {
		return (this.runtime == "gears") ? true : false;
	},
	isAir: function() {
		return (this.runtime == "air") ? true : false;
	},
	///////////////////////////////////////////////////////////////
	init: function() {
    	
    		
    	if ((!window.google || !google.gears) && this.runtime == 'gears') {
			Todo.c.Help.googleGears();
			return;
		}
		
	
		Todo.c.Sidebar.init();
		Todo.c.Hotkey.init();
		
		
		
		if(this.isBrowser()) {
			Todo.c.Help.instruction();
		} else {
			Todo.c.Help.instructionAIR();
		}
		
		
    	    
	},
	///////////////////////////////////////////////////////////////
	/**
	 * initialize the Database Active Record
	 *
	 * @private
	 * @name initDB
	 * @type DB
	 * @cat core
	 */
	initDB: function() {
		
		if(this.runtime == "air") {
			ActiveRecord.connect(ActiveRecord.Adapters.AIR);
		} else if(this.runtime == "gears") {
			ActiveRecord.connect(ActiveRecord.Adapters.Local,'todos');
		} else {
			ActiveRecord.connect(ActiveRecord.Adapters.InMemory);
		}
		
		ActiveRecord.logging = this.debug;
	},
	///////////////////////////////////////////////////////////////
    /**
     * Log messages on the browser console. Firebug is recommended.
     *
     * @example Todo.log('Message');
     *
     * @public
     * @name log
     * @type debug
     * @param	String		message The message to be displayed on the console
     * @param	String		message (optional) More messages to be displayed on the console
     * @cat log
     */
    log: function(message) {
        if (this.debug === true) {
            var log = '';
            for (var i=0; i<arguments.length; i++) {
                log += arguments[i];
                if (i !== (arguments.length-1)) {
                    log += ', ';
                }
            }
            window.console.log(log);
        }
    },
    ///////////////////////////////////////////////////////////////
	/**
     * Log jamal errors to the console
     *
     * @example jamal.error('Item not found!');
     *
     * @public
     * @name error
     * @type debug
     * @param	String		 message Error message to be displayed on the console
     * @param	Object		 e (optional) Error object to display the original error
     * @cat log
     */
    error: function(message) {
        if (this.debug === true) {
            if (arguments.length>1) {
                e = arguments[1];
                window.console.error('Jamal Error: '+message, e);
                if(typeof e === "object") {
                    if(typeof e.message === "object") {
                        this.log(e.name+': ');
                        this.dir(e.message);
                    } else {
                        this.log(e.name+': '+e.message);
                    }
                    this.dir(e);
                    this.log('Stack: ' + e.stack);
                } else {
                    this.log(e);
                    this.log('Stack:');
                    this.dir(this.callstack());
                }
            } else {
                window.console.error('Jamal Error: '+message);
            }
        }
    },
    ///////////////////////////////////////////////////////////////
    /**
     * This function returns an array of objects that contain the 
     * information about call stack.
     *
     * @example callstack = jamal.callstack();
     *
     * @public
     * @name callstack
     * @type debug
     * @cat log
     */
    callstack: function() {
        var re_without_parenthesis = /[(][^)]*[)]/;
        var re_file_line = /(.*):(\d+)$/;
        
        var stack = new Error().stack.split('\n');
        stack.splice(0,2); // remove first two stack frames
        
        var frames = [];
        for(var i in stack) {
            // a stack frame string split into parts
            var frame = stack[i].split('@');
            if(frame && frame.length == 2) {
                frame = {
                    // Stackframe object
                    'name': frame[0],
                    'source': frame[0].replace(re_without_parenthesis, ''),
                    'file': frame[1].match(re_file_line)[1], // first group
                    'line': frame[1].match(re_file_line)[2]  // second group
                };
                this.log('at ' + frame.file + ' (' + frame.name + ': ' + frame.line + ')');
            }
        }
    },
     ///////////////////////////////////////////////////////////////
    /**
     * Log objects to the console
     *
     * @example Todo.dir(obj);
     * @result [ { prop1: val1, prop2: val2 } ]
     *
     * @public
     * @name dir
     * @type debug
     * @param	Object		 obj The object which should be logged on the console.
     * @cat log
     */
    dir: function(obj) {
        if (this.debug === true) {
            window.console.dir(obj);
        }
    },   
    ///////////////////////////////////////////////////////////////
};

var $t = Todo;
$t.checkRuntime();

$t.initDB();