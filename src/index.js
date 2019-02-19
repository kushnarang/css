function css(rule)
{
	var sheets = document.styleSheets;
	if(sheets.length == 0)
	{
		var head = document.head || document.getElementsByTagName("head")[0],
		style = document.createElement("style");

		style.type = "text/css";
		head.appendChild(style);
	}
	
	var sheet = sheets[sheets.length - 1];
	sheet.insertRule(rule, (sheet.cssRules || sheet.rules).length);
}

module.exports = css;

// IE9+
// and
// https://www.quirksmode.org/dom/w3c_css.html