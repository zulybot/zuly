/* eslint-disable */
let _os = require('os');

function getCPUUsage (e, t) {
	let o = getCPUInfo(),
		r = o.idle,
		s = o.total;
	setTimeout(function() {
		let o = getCPUInfo(),
			n = o.idle,
			i = o.total,
			m = (n - r) / (i - s);
		e(!0 === t ? m : 1 - m);
	}, 1e3);
}

function getCPUInfo (e) {
	let t = _os.cpus(),
		o = 0,
		r = 0,
		s = 0,
		n = 0,
		i = 0;
	for (let e in t) t.hasOwnProperty(e) && (o += t[e].times.user, r += t[e].times.nice, s += t[e].times.sys, i += t[e].times.irq, n += t[e].times.idle);
	return {
		idle: n,
		total: o + r + s + n + i
	};
}
exports.platform = function() {
	return process.platform;
}, exports.cpuCount = function() {
	return _os.cpus().length;
}, exports.sysUptime = function() {
	return _os.uptime();
}, exports.processUptime = function() {
	return process.uptime();
}, exports.freemem = function() {
	return _os.freemem() / 1048576;
}, exports.totalmem = function() {
	return _os.totalmem() / 1048576;
}, exports.freememPercentage = function() {
	return _os.freemem() / _os.totalmem();
}, exports.freeCommand = function(e) {
	require('child_process').exec('free -m', function(t, o, r) {
		let s = o.split('\n')[1].replace(/[\s\n\r]+/g, ' ').split(' ');
		total_mem = parseFloat(s[1]), free_mem = parseFloat(s[3]), buffers_mem = parseFloat(s[5]), cached_mem = parseFloat(s[6]), used_mem = total_mem - (free_mem + buffers_mem + cached_mem), e(used_mem - 2);
	});
}, exports.harddrive = function(e) {
	require('child_process').exec('df -k', function(t, o, r) {
		let s = 0,
			n = 0,
			i = 0,
			m = o.split('\n')[1].replace(/[\s\n\r]+/g, ' ').split(' ');
		s = Math.ceil(1024 * m[1] / Math.pow(1024, 2)), n = Math.ceil(1024 * m[2] / Math.pow(1024, 2)), i = Math.ceil(1024 * m[3] / Math.pow(1024, 2)), e(s, i, n);
	});
}, exports.getProcesses = function(e, t) {
	typeof e == 'function' && (t = e, e = 0), command = 'ps -eo pcpu,pmem,time,args | sort -k 1 -r | head -n10', e > 0 && (command = 'ps -eo pcpu,pmem,time,args | sort -k 1 -r | head -n' + (e + 1)), require('child_process').exec(command, function(e, o, r) {
		let s = o.split('\n');
		s.shift(), s.pop();
		let n = '';
		s.forEach(function(e, t) {
			let o = e.replace(/[\s\n\r]+/g, ' ');
			o = o.split(' '), n += o[1] + ' ' + o[2] + ' ' + o[3] + ' ' + o[4].substring(o[4].length - 25) + '\n';
		}), t(n);
	});
}, exports.allLoadavg = function() {
	let e = _os.loadavg();
	return e[0].toFixed(4) + ',' + e[1].toFixed(4) + ',' + e[2].toFixed(4);
}, exports.loadavg = function(e) {
	(void 0 === e || e !== 5 && e !== 15) && (e = 1);
	let t = _os.loadavg(),
		o = 0;
	return e == 1 && (o = t[0]), e == 5 && (o = t[1]), e == 15 && (o = t[2]), o;
}, exports.cpuFree = function(e) {
	getCPUUsage(e, !0);
}, exports.cpuUsage = function(e) {
	getCPUUsage(e, !1);
};