const { parentPort, workerData } = require('worker_threads');
const bcrypt = require('bcrypt');

const { password, saltRounds } = workerData;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) parentPort.postMessage({ error: err.message });
  else parentPort.postMessage(hash);
});