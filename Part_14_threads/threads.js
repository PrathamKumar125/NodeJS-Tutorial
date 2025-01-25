const {Worker,
    isMainThread,
    workerData
} = require('worker_threads');

if(isMainThread){
   console.log(`This is the main thread with PID: ${process.pid}`);
    const worker1= new Worker(__filename, {
        workerData:[2,34,51,13,22,1]
    });

    const worker2= new Worker(__filename, {
        workerData:[2,34,31,21,22,1]
    });
}else{
    console.log(`This is the worker thread with PID: ${process.pid}`);
    console.log(`The ${workerData} is: ${workerData.sort()}`);
}