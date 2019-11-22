function calcPressureGroup() {

	formdepth = document.getElementById('depth').value;
	formtime = document.getElementById('time').value;

	depth = -1
	time = -1
	if (formdepth != '' && formtime != '') {
		 depth = parseFloat(formdepth);
		 time = parseFloat(formtime);
	}

	let pgroups = ['A','B','C','D','E','F','G','H','I','J','K','L',
	'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']


  	 d10 = [10, 20, 26, 30, 34, 37, 41, 45, 50, 54, 59, 64, 70, 75, 82, 88, 95, 104, 112, 122, 133, 145, 160, 178, 199, 219];
	 d12 = [9, 17, 23, 26, 29, 32, 35, 38, 42, 45, 49, 53, 57, 62, 66, 71, 76, 82, 88, 94, 101, 108, 116, 125, 134, 147];
	 d14 = [8, 15, 19, 22, 24, 27, 29, 32, 35, 37, 40, 43, 47, 50, 53, 57, 61, 64, 68, 73, 77, 82, 87, 92, 98];
	 d16 = [7, 13, 17, 19, 21, 23, 25, 27, 29, 32, 34, 37, 39, 42, 45, 48, 50, 53, 56, 60, 63, 67, 70, 72];
	 d18 = [6, 11, 15, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 39, 41, 43, 46, 48, 51, 53, 55, 56];
	 d20 = [6, 10, 13, 15, 16, 18, 20, 21, 23, 25, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 45];
  	 d22 = [5, 9, 12, 13, 15, 16, 18, 19, 21, 22, 24, 25, 27, 29, 30, 32, 34, 36, 37];
	 d25 = [4, 8, 10, 11, 13, 14, 15, 17, 18, 19, 21, 22, 23, 25, 26, 28, 29];
	
	 d30 = [3, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20];
	 d35 = [3, 5, 7, 8, 0, 9, 10, 11, 12, 13, 14];
	 d40 = [0, 5, 6, 0, 7, 8, 9];
	 d42 = [0, 4, 0, 6, 7, 8];

	// loop through timeintervals for selected depth, check if user time
	// is less than time interval. assign pressure group from time interval.
	// if user time exceeds last value of time intervals, create alert.
	
	depths = [10, 12, 14, 16, 18, 20, 22, 25, 30, 35, 40, 42];
	timeints = [d10, d12, d14, d16, d18, d20, d22, d25, d30, d35, d40, d42];
	timeintervals = [];
	safetystop = false;
	withinRules = true;


		
	if (depth > 42) {
		alert("Depth must be less than 42 meters");
		withinRules = false;
	}

	if ( time < 0 || depth < 0) {
		alert("Please enter the fields");
		withinRules = false;
	}

	if (withinRules) {	
		for (let i = 0; i < depths.length; i++) {
			timeintervals = [...timeints[i]];
			if (depth <= depths[i]) {
				break;
			}
			if (i >= depths.length - 5) {
				safetystop = true;
			}
		}
	}

	let userpgroup = '';
	if (time > timeintervals[timeintervals.length - 1]) {
		alert("Your time exceeds the maximum");
		withinRules = false;
	}

	if (withinRules) {
		for (let i = 0; i < timeintervals.length; i++) {
			userpgroup = pgroups[i];
			if (timeintervals[i] == 0) {
				continue;
			}
			if (time <= timeintervals[i]) {
				break;
			}
			if (i >= timeintervals.length - 4) {
				safetystop = true;
			}
		}
	}

	safe = ''
	if (safetystop && withinRules) {
		safe = 'Stop required at 5 meters for 3 minuntes'
	} else if (withinRules) {
		safe = 'Not required'
	}

	document.getElementById("pgroup").value = userpgroup;
	document.getElementById("safety").value = safe;

}




