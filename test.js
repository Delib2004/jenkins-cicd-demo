// Minimal smoke test - no extra test framework needed for the lab.
// Starts the app briefly and checks the root route responds correctly.

const http = require('http');
const { spawn } = require('child_process');

const PORT = 3999;
const child = spawn('node', ['app.js'], {
  env: { ...process.env, PORT },
  stdio: 'ignore'
});

function fail(msg) {
  console.error('TEST FAILED:', msg);
  child.kill();
  process.exit(1);
}

setTimeout(() => {
  http.get(`http://localhost:${PORT}/health`, (res) => {
    if (res.statusCode !== 200) {
      fail(`Expected status 200, got ${res.statusCode}`);
    } else {
      console.log('TEST PASSED: /health returned 200');
      child.kill();
      process.exit(0);
    }
  }).on('error', (err) => fail(err.message));
}, 1000);
