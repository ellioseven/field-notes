# Workers

### Notes

* Typical application has a single process and thread
  * 1 process
  * 1 Node.js engine with 1 event loop
* Worker threads allow
  * 1 process
  * Multiple Node.js engines with their own event loop
* **Prevents you from blocking the event loop**
* **Allows you run parallel processing**
* Stable in Node 12
* Use `worker.on("message", fn)` to handle a message from a worker
* Use `worker.postMessage("message")` to sent a message to a worker
* Use `parentPort.onMessage` to handle a message from the main thread
* Use `parentPort.postMessage` to sent a message to the main thread
* Use `worker_threads.isMainThread` to check if you're in the main thread
* Use `worker_threads.threadId` to get the current thread's ID
* Workers expose `message`, `error`, `connect` and `exit` events
* Use the `workerData` to send data to a worker

### Code

#### Worker in Same File

```javascript
const { Worker, isMainThread } = require("worker_threads")

if (isMainThread) {
  const worker = new Worker(__filename)
  console.log("Main thread created worker")
} else {
  console.log("Processing from worker thread")
}
```

#### Wait for Calculation

```javascript
// main.js

const { Worker } = require("worker_threads")

const n = 5000000000

const runService = (workerData) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", {
      workerData
    })

    worker.on("message", resolve)
    worker.on("error", reject)
    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`))
      }
    })
  })
}

const run = async () => {
  let timer = 0
  
  const interval = setInterval(() => {
    timer++
    console.log(`[${timer}s] Workers are working...`)
  }, 1000)

  const result = await Promise.all([
    runService({ n: +n }),
    runService({ n: +n })
  ])

  clearInterval(interval)
  console.log(result)
}

run().catch(error => console.error(error))

```

```javascript
// worker.js

const { workerData, parentPort, threadId } = require('worker_threads')
const { n } = workerData

const sum = async (n) => {
  console.log("Executing on thread:", threadId)
  return new Promise((resolve, reject) => {
    let sum = 0
    for (let i = 0; i < n; i++) sum += 1
    resolve(sum)
  })
}

(async () => {
  const result = await sum(n)
  parentPort.postMessage({ result, status: 'Done' })
})()

```

### Examples

* [https://github.com/PKief/nodejs-worker-threads](https://github.com/PKief/nodejs-worker-threads)
* [https://gist.github.com/ellioseven/94d6b0c4f408adc8970f0aab115b6f24](https://gist.github.com/ellioseven/94d6b0c4f408adc8970f0aab115b6f24)

### Reading

* [https://medium.com/swlh/understanding-nodejs-worker-thread-6212b95a0928](https://medium.com/swlh/understanding-nodejs-worker-thread-6212b95a0928)
* [https://www.youtube.com/watch?v=P1sWw1bLyVg&t=4s](https://www.youtube.com/watch?v=P1sWw1bLyVg&t=4s)

