// number of grams shown in infobar
var gramNumber = 5;

// limit of length of words, words must be longer than this limit
var lengthLimit = 2;

var text = document.body.innerText;

// case-sensitive
var ignoreCase = true;

// this pattern to select valid characters. Invalid characters are replaced by
// whitespace
var invalidChars = /{\W|\d}+/g;

// prepare key map
var keys = [];
var results = [];

// remove all irrelevant characters
text = text.replace(invalidChars, " ").replace(/^\s+/, "").replace(/\s+$/, "");

// create a mapping
if (ignoreCase)
	text = text.toLowerCase();
text = text.split(/\s+/);
for ( var i = 0, textlen = text.length, s; i < textlen; ++i) {
	s = text[i];
	if(s.length>lengthLimit)
		keys[s] = (keys[s] || 0) + 1;
	if (i + 1 <= textlen) {
		s += " " + text[i + 1];
		if(s.length>lengthLimit)
			keys[s] = (keys[s] || 0) + 1;
	}
}

// prepares results for sorting
for ( var i in keys) {
	if (keys[i])
		results.push({
			"word" : i,
			"count" : keys[i]
		});
}

// function used to compare elements in results
var f_sortAscending = function(x, y) {
	return y.count - x.count
};
results.sort(f_sortAscending);

// result parsing
var outputHTML = "  ";
for ( var i = 0, len = results.length; i < len && i < gramNumber; ++i) {
	if (i > 0)
		outputHTML += "  |  "
	outputHTML += results[i].word;
}

// send request to background page
var parameters = {
	gramtext : outputHTML,
	url : document.location.href
};
chrome.extension.sendRequest(parameters, function(response) {
});
