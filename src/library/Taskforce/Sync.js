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
 * @subpackage		Taskforce.core
 * @since			Taskforce v 0.1
 * @license			http://www.opensource.org/licenses/mit-license.php The MIT License
 */
 
/**
 * Taskforce Sync
 *
 * @name Taskforce.Sync
 * @type Object
 * @cat core
 */ 
$t.Sync = {

	_tables: ['Item'],
	_syncing: false,
	
	start: function() {
		this._syncing = true;
		
		$.each(this._tables, function(i, name) {
			
			var rowsJSON = Taskforce[name].getAllSinceLastSync().toJSON;
			
	
			
			$.ajax({
				type: 'POST',
				url: "../service/sync.php",
				data: {rows: rowsJSON, table: name},
				dataType: 'jsonp',
				success: function(data){
					
					Taskforce[name].sync(data);
					
					
					/**
					 * last Table
					 */
					if(i == (Taskforce.Sync._tables.length -1)) {
						
						$t.setOption('lastSyncDate', Date.parse('now').toString('yyyy-MM-dd HH:mm:ss'));
						Taskforce.Sync._syncing = false;
					}
					
					
				}
			});
			
			
		});
	},
	isSyncing: function() {
		return this._syncing;
	}
}