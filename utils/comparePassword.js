const { parentPort, workerData } = require('worker_threads');
const bcrypt = require('bcrypt');

const { plainText, password } = workerData;

bcrypt.compare(plainText, password, (err, confirmed) => {
  if (err) parentPort.postMessage({ error: err.message });
  else parentPort.postMessage(confirmed);
});