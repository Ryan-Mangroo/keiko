var fs = require('fs');
var train = [];
var test = [];

fs.readFile('data/pima-indians-diabetes.data', 'utf8', function(err, contents) {
 	var lines = contents.split('\n');   
 	console.log('Read '  + lines.length + ' lines of data');

 	/***** Parse through each line from the file and convert the string to floating points. Then push each line to data array. *****/
	var data = []; 	
 	for (i in lines) {
 		data.push(lines[i].split(','));
 		data[data.length - 1].forEach(function(item, index) { data[data.length - 1][index] = parseFloat(item); });
 	}

 	/***** Split data array into training and test sets *****/
 	var train = [];
	var splitRatio = 0.67; // 67% train 33% test
	var trainSize = Math.floor(data.length * splitRatio);

	while (train.length < trainSize) {
		train.push(data.splice(Math.floor(Math.random() * data.length), 1)[0]);	
	}

	console.log("Train size: " + train.length);
	console.log("Test size: " + data.length);
	
	/***** Separate train set into classes *****/
	var classes = {};

	for (i in train) {
		var c = train[i][train[i].length-1];
		
		if (!classes[c]) {
			classes[c] = [];
		}

		classes[c].push(train[i]);
	}

	var summarizedData = {};

	for (c in classes) {
		console.log("Class " + c + ' = ' + classes[c].length);

		summarizedData[c] = {};
		for (i in classes[c]) {
			for (j in classes[c][i]) {
				if (!summarizedData[c][j]) {
					summarizedData[c][j] = {mean: 0, stdev: 0};
				}
				summarizedData[c][j].mean += classes[c][i][j];
			}
		}

		for (i in summarizedData[c]) {
			
		}

	}




});


function mean(numbers) {
	var sum = 0;
	for (i in numbers) {
		sum += numbers[i];
	}

	return sum / numbers.length;
};

function stdev(avg, numbers) {
	var sum = 0;
	for (i in numbers) {
		sum += (Math.pow(numbers[i] - avg, 2));
	}

	return sum / (numbers.length - 2);
};


 