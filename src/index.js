var cssParser = require('css');

function css(userRule)
{
	// List all stylesheets
	var DOMsheets = document.styleSheets;

	// If there are none, append a new one to the head
	if(DOMsheets.length == 0)
	{
		var head = document.head || document.getElementsByTagName("head")[0],
		style = document.createElement("style");

		style.type = "text/css";
		head.appendChild(style);
	}

	// Get a refrence to the latest stylesheet
	var LastDOMSheet = DOMsheets[DOMsheets.length - 1];

	// Parse the user's CSS with npm.im/css
	var rules = cssParser.parse(userRule);

	// Get errors from the parsed CSS
	var errors = rules.stylesheet.parsingErrors;

	// If there are errors, exit
	if(errors.length) return false;

	// Simplify the parsed CSS to just the parsed code after error handling
	rules = rules.stylesheet.rules;
	
	// Iterate over all the rules
	rules.forEach(function(rule)
	{
		// Type could be: *rule* (standard div, span, etc.), *media*, *font-face*, *insert custom @ tags here*
		var type = rule.type;
		// Find the root selector for this rule iteration, can be either: a standard selector (div, span, etc) or special @ selector constructed with @ + rule.type (media, font-face, etc) + "arguments" (media query parameters, or empty string for font-face, etc.)
		var selector = rule.selectors ? rule.selectors.join(", ") : "@" + rule.type + " " + (rule[type] ? rule[type] : "");

		// Array of either: rule declarations (background: red, font: 100% Arial, etc) or nested rules (like in media queries) such as (body {background: red}, #div {color: white}, etc)
		var declarations = (rule.declarations || rule.rules);

		// create an empty array to store either: CSS properties ("background: red", "color: red", etc) or nested rules (like in media queries) such as (body {background: red}, #div {color: white}, etc 
		var properties = [];

		// Begin iteration over declarations array
		declarations.forEach(function(declaration)
		{
			// If at the (var) declarations definition, rule.rules was chosen, declaration.type == "rule"
			if(declaration.type == "rule")
			{
				// 
				var subSelector = declaration.selectors ? declaration.selectors.join(", ") : "@" + declaration.type + " " + (declaration[declaration.type] ? declaration[declaration.type] : "");
				console.log(subSelector);

				var subProperties = [];

				declaration.declarations.forEach(function(subDeclaration)
				{
					// console.log(subDeclaration);

					var property = subDeclaration.property;
					var value = subDeclaration.value;
					// console.log(property + ":", value);
					subProperties.push(property + ": " + value + ";");
				});

				properties.push(subSelector + "{" + subProperties.join(" ") + "}");
			}
			else
			{
				var property = declaration.property;
				var value = declaration.value;
				// console.log(property + ":", value);
				properties.push(property + ": " + value + ";");
			}
		});

		// console.log(properties)
		var finalString = selector + "{" + properties.join(" ") + "}";
		// console.log(finalString);

		LastDOMSheet.insertRule(finalString, (LastDOMSheet.cssRules || LastDOMSheet.rules).length);
	});
}

module.exports = css;

// IE9+
// and
// https://www.quirksmode.org/dom/w3c_css.html