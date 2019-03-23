var cssParser = require('css');

function css(userRule)
{
	var DOMsheets = document.styleSheets;
	if(DOMsheets.length == 0)
	{
		var head = document.head || document.getElementsByTagName("head")[0],
		style = document.createElement("style");

		style.type = "text/css";
		head.appendChild(style);
	}
	var LastDOMSheet = DOMsheets[DOMsheets.length - 1];
	
	// LastDOMSheet.insertRule(rule, (LastDOMSheet.cssRules || LastDOMSheet.rules).length);

	console.time("parser");
	var rules = cssParser.parse(userRule);
	console.timeEnd("parser");

	console.log(rules);
	var errors = rules.stylesheet.parsingErrors;
	if(errors.length) return false;

	rules = rules.stylesheet.rules;
	
	rules.forEach(function(rule)
	{
		// console.log(LastDOMSheet);
		// console.log(rule);
		var selector = rule.selectors.join(", ");
		console.log(rule.selectors);

		var declarations = rule.declarations;

		var properties = [];

		declarations.forEach(function(declaration)
		{
			var property = declaration.property;
			var value = declaration.value;
			// console.log(property + ":", value);
			properties.push(property + ": " + value + ";")
		});

		// console.log(properties);

		var finalString = selector + "{" + properties + "}";
		console.log(finalString);

		LastDOMSheet.insertRule(finalString, (LastDOMSheet.cssRules || LastDOMSheet.rules).length);
	});
}

module.exports = css;

// IE9+
// and
// https://www.quirksmode.org/dom/w3c_css.html