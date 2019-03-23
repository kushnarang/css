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

	// console.log(rules);
	var errors = rules.stylesheet.parsingErrors;
	if(errors.length) return false;

	rules = rules.stylesheet.rules;
	
	rules.forEach(function(rule)
	{
		var type = rule.type;
		var selector = rule.selectors ? rule.selectors.join(", ") : "@" + rule.type + " " + (rule[type] ? rule[type] : "");

		var declarations = (rule.declarations || rule.rules);
		// console.log(declarations);

		var properties = [];

		declarations.forEach(function(declaration)
		{
			if(declaration.type == "rule")
			{
				var subSelector = declaration.selectors ? declaration.selectors.join(", ") : "@" + declaration.type + " " + (declaration[declaration.type] ? declaration[declaration.type] : "");
				// console.log(subSelector);

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

		console.log(properties)
		var finalString = selector + "{" + properties.join(" ") + "}";
		console.log(finalString);

		LastDOMSheet.insertRule(finalString, (LastDOMSheet.cssRules || LastDOMSheet.rules).length);
	});
}

module.exports = css;

// IE9+
// and
// https://www.quirksmode.org/dom/w3c_css.html