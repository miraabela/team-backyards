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
  let d10 = [10, 20, 26, 30, 34, 37, 41, 45, 50, 54, 59, 64, 70, 75, 82, 88, 95, 104, 112, 122, 133, 145, 160, 178, 199, 219];
	let d12 = [9, 17, 23, 26, 29, 32, 35, 38, 42, 45, 49, 53, 57, 62, 66, 71, 76, 82, 88, 94, 101, 108, 116, 125, 134, 147];
	let d14 = [8, 15, 19, 22, 24, 27, 29, 32, 35, 37, 40, 43, 47, 50, 53, 57, 61, 64, 68, 73, 77, 82, 87, 92, 98];
	let d16 = [7, 13, 17, 19, 21, 23, 25, 27, 29, 32, 34, 37, 39, 42, 45, 48, 50, 53, 56, 60, 63, 67, 70, 72];
	let d18 = [6, 11, 15, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 39, 41, 43, 46, 48, 51, 53, 55, 56];
	let d20 = [6, 10, 13, 15, 16, 18, 20, 21, 23, 25, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44];
  let d22 = [5, 9, 12, 13, 15, 16, 18, 19, 21, 22, 24, 25, 27, 29, 30, 32, 34, 36, 37];
	let d25 = [4, 8, 10, 11, 13, 14, 15, 17, 18, 19, 21, 22, 23, 25, 26, 28, 29];
	let d30 = [3, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20];
	let d35 = [3, 5, 7, 8, 0,9, 10, 11, 12, 13, 14];
	let d40 = [0, 5, 6, 0, 7, 8, 9];
	let d42 = [0, 4, 0, 6, 7, 8];

	// loop through timeintervals for selected depth, check if user time
	// is less than time interval. assign pressure group from time interval.
	// if user time exceeds last value of time intervals, create alert.
	let timeintervals = d60;
	let userpgroup = '';
	let exceeds = false;
	if (time > timeintervals[timeintervals.length - 1]) {
		alert("Your time exceeds the maximum");
		exceeds = true;
	}

	let i = 0;
	while ((timeintervals[i] <= time) && (!exceeds)) {
		userpgroup = pgroups[i];
		i = i+1;
	}
	console.log(userpgroup)
	document.getElementById("pgroup").value = userpgroup;
	//document.getElementById("pgroup2").innerHTML = userpgroup;
}




