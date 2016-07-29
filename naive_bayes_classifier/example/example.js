var fs = require('fs');
 
fs.readFile('data/pima-indians-diabetes.data', 'utf8', function(err, contents) {
 	var lines = contents.split('\n');   
 	console.log('Read '  + lines.length + ' lines of data');

 	var data = [];
 	for (i in lines) {
 		data.push(lines[i].split(','));
 		data[data.length - 1].forEach(function(item, index) { data[data.length - 1][index] = parseFloat(item); });
 	}

 	for (i in data) {
 		console.log(data[i]);
 	}

});
 