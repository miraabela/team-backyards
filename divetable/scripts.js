function calcPressureGroup() {
	let depth = parseInt(document.getElementById('depth').value);
	let time = parseInt(document.getElementById('time').value);

	if (depth < 35) {
		alert("Depth must be greater than 35");
	}
	if (depth > 140) {
		alert("Depth must be less than 140");
	}

	//last 3 times from depth 35-90 require safety stop
	//all times from depth 100-140 require safety stop
	let pgroups = ['A','B','C','D','E','F','G','H','I','J','K','L',
	'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

	// for now just practice with depth 60.

	let d70 = [5, 9, 12, 13, 15, 16, 18, 19, 21, 22, 24, 26, 27, 29, 31, 33, 35, 36, 38, 40]
	let d60 = [6, 11, 14, 16, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 43, 44, 47, 49];
	
	// loop through timeintervals for selected depth, check if user time
	// is less than time interval. assign pressure group from time interval.
	// if user time exceeds last value of time intervals, create alert.
	let timeintervals = d60;
	let userpgroup = '';
	
	if (time > timeintervals[timeintervals.length]) {
		alert("Your time exceeds the maximum");
	}
	let i = 0;
	while (timeintervals[i] <= time) {
		userpgroup = pgroups[i];
		i = i+1;
	}
	console.log(userpgroup)
	document.getElementById("pgroup").value = userpgroup;
	//document.getElementById("pgroup2").innerHTML = userpgroup;
}