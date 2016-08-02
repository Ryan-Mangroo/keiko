var fs = require('fs');

fs.readFile('data/langModel.data', 'utf8', function(err, contents) {
 	var lines = contents.split('\n');   
 	console.log('Read '  + lines.length + ' lines of data');

 	var cats = {};
 	var voc = {};
 	var vocCnt = 0;
 	var docCnt = lines.length;

 	for (i in lines) {
 		var line = lines[i].split(',');

 		var cat = line[0];
 		if (cats[cat]) {
 			cats[cat].docCnt += 1;
 		} else {
 			cats[cat] = {docCnt: 1, totalWordCnt: 0, words: {}};
 		}

 		var text = line[1].split(' ');
 		cats[cat].totalWordCnt += text.length;

 		for (j in text) {
 			if (!voc[text[j]]) {
 				voc[text[j]] = 1;
 				vocCnt++;
 			}

 			if (!cats[cat].words[text[j]]) {
 				cats[cat].words[text[j]] = {cnt: 0, prob: 0};
 			}

 			cats[cat].words[text[j]].cnt += 1;
 		}
 	}

 	for (cat in cats) {
 		for (word in voc) {
 			if (!cats[cat].words[word]) {
 				cats[cat].words[word] = {cnt: 0, prob: 0};
 			}

 			cats[cat].words[word].prob = (cats[cat].words[word].cnt + 1) / (cats[cat].totalWordCnt + vocCnt);
 		}
 	}

 	console.log("Documents Learned: " + docCnt);
 	console.log("Vocabulary: " + JSON.stringify(voc));
 	console.log("Vocabulary Size: " + vocCnt);

 	console.log("Categories: " + JSON.stringify(cats));

 	var test = "Chinese Chinese Chinese Tokyo Japan";
 	test = test.split(' ');
 	var probs = {};

	for (cat in cats) {
		probs[cat] = 1;
 		for (i in test) {
 			if (cats[cat].words[test[i]]) {
 				probs[cat] *= cats[cat].words[test[i]].prob;
 			}
 		}

 		probs[cat] *= (cats[cat].docCnt / docCnt);
 	}

 	console.log("Probability: " + JSON.stringify(probs));


 });