function prettyDate(time){
	
	var date = Date.parse(time);
	if(date) {
		if(Date.equals(date,new Date(Date.today() ))  ) {
			return "Today";
		} else if(Date.equals(date, new Date(Date.today()).add(-1).day()) ) {
			return "Yesterday";
		} else if(Date.equals(date, new Date(Date.today()).add(1).day()) ) {
			return "Tomorrow";

		} else {
			return date.toString('MM/dd/yyyy');
		}
	}
	
}


