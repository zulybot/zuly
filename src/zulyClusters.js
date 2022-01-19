const cluster = require('cluster');
const { cpus } = require('os');
const numCPUs = cpus().length;
if (cluster.isMaster) {
	require('./zuly');
	for (let i = 0; i < numCPUs; i++) {
		const worker = cluster.fork();
		worker.on('message', (message) => {
			console.log(`[${worker.process.pid} to MASTER]`, message);
		});
	}
	cluster.on('exit', (worker) => {
		console.warn(`[${worker.process.pid}]`, {
			message: 'Process terminated. Restarting.'
		});
		cluster.fork();
	});
}
else {
	console.log(`[CLUSTER] ${process.pid} started!`);
}