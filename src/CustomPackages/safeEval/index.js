let vm = require('vm');
module.exports = function(n, t, e) {
	let o = {},
		r = 'SAFE_EVAL_' + Math.floor(1e6 * Math.random());
	o[r] = {};
	return n = '\n    (function() {\n      Function = undefined;\n      const keys = Object.getOwnPropertyNames(this).concat([\'constructor\']);\n      keys.forEach((key) => {\n        const item = this[key];\n        if (!item || typeof item.constructor !== \'function\') return;\n        this[key].constructor = undefined;\n      });\n    })();\n  ' + r + '=' + n, t && Object.keys(t).forEach(function(n) {
		o[n] = t[n];
	}), vm.runInNewContext(n, o, e), o[r];
};