// What is the Node.js Event Loop? (0.5 Grade)
// ____________________________________________________________________________________________________________
/*The Node.js Event Loop is the internal traffic controller that allows Node.js to handle thousands of
requests (like reading files or fetching database data) at the same time using just one main thread,
without freezing or crashing.*/
// ____________________________________________________________________________________________________________

// What is Libuv and What Role Does It Play in Node.js?

/*Libuv is a multi-platform, open-source C library designed to handle asynchronous, event-driven I/O (Input/Output) operations.
Originally built specifically for Node.js, it acts as the underlying engine that grants Node.js its non-blocking capabilities across
different operating systems like Linux, macOS, and Windows.*/
/*
---> Key Roles of Libuv in Node.js ?
1. Manages the Event Loop: Libuv implements and drives the 6-phase Event Loop in Node.js,
managing how asynchronous events, timers, and callbacks are prioritized and executed.

2. Thread Pool Management: Although JavaScript executes on a single thread, Libuv maintains a worker thread pool (4 threads by default).
   It delegates heavy, blocking operations—such as file system read/write tasks, DNS lookups, and cryptographic functions—to these background threads
   so the main execution thread remains responsive.
   
3. Cross-Platform Abstraction: Operating systems handle asynchronous I/O differently (e.g., epoll on Linux, kqueue on macOS, and IOCP on Windows).
Libuv abstracts these OS-specific mechanisms into a single, unified API, allowing Node.js code to run identically across platforms.

4. Handles Non-Blocking Network & System I/O: Libuv manages asynchronous network sockets, TCP/UDP communication, child processes,
and signal handling efficiently at the system level.*/

// ____________________________________________________________________________________________________________

// How Does Node.js Handle Asynchronous Operations Under the Hood?
/*
let us understand -> how does is work step-by-step  ?

1- You make a request: You ask Node.js to do something slow (like read a huge file or query a database).

2-  Node hands it off: The single main thread hands that job to the system background (Libuv) and immediately moves on to the next line of code.

3- The background finishes: Once the file is read or the network request comes back, the background puts the result in a waiting line (the Queue).

4- The Event Loop delivers it: When the main thread is completely free, the Event Loop grabs the result from the line and gives it back to your code.
*/

// ____________________________________________________________________________________________________________

// What is the Difference Between the Call Stack, Event Queue, and Event Loop in Node.js
/*
{-- The Call Stack --}

The Call Stack is responsible for executing synchronous code line by line.

-> How it works: It operates on a (LIFO) (Last-In, First-Out) structure.

   -> Role: When a function is called, it is pushed onto the top of the stack. Once it finishes executing, it is popped off.
   
   -> main point : JavaScript is single-threaded, meaning the Call Stack can only execute one operation at a time.
   If a function takes a long time, it blocks the entire stack.
   
{-- The Event Queue --}
   
  The Event Queue is a holding area where completed asynchronous callbacks wait to be executed.

   -> How it works: It operates on a (FIFO) (First-In, First-Out) structure.

   -> Role: When a background task finishes (like reading a file via fs.readFile or a setTimeout timer expiring), its corresponding callback function is sent to this queue.
   
   -> Sub-queues: It consists of different priorities, primarily the Microtask Queue (Promises, process.nextTick) and the Macrotask Queue (setTimeout, setImmediate).
   
   
{-- The Event Loop --}
   
  The Event Loop is the coordinator that bridges the Call Stack and the Event Queue.
   
   ->  How it works: It runs continuously in an infinite loop, monitoring the state of both the stack and the queues.
   
   -> Role:
   1- Checks if the Call Stack is completely empty.
   
   2- If empty, it pulls the first callback waiting in the Event Queue.
   
   3- Pushes that callback onto the Call Stack so the V8 engine can execute it.
   // ____________________________________________________________________________________________________________
   
   What is the Node.js Thread Pool and How to Set the Thread Pool Size?
   
{--Thread Pool (Libuv Workers)--}:
   A team of 4 members in background work enviroment that handle slow or heavy tasks (like reading files or password hashing).
   
   -> If you trigger 5 heavy tasks at once:
     Workers 1, 2, 3, and 4 instantly take the first 4 tasks.
     The fifth will wait in line until one worker finishes and becomes free.
{-- to Set the Thread Pool Size --}
     run this code --> { UV_THREADPOOL_SIZE=(number)} in terminl 
     after that run node app.js
   
   // ____________________________________________________________________________________________________________
     
     How Does Node.js Handle Blocking and Non-Blocking Code Execution?
{-- Blocking Code --}
  Blocking code prevents any other JavaScript from running until the current operation finishes.
   -> How Node.js Handles It:

      The Main Thread (Call Stack) executes this code directly. While it runs, the Event Loop is completely paused,
      meaning Node.js cannot process new requests, handle background events, or respond to users.

   -> Examples:
     - Synchronous file methods like fs.readFileSync().

     - Heavy CPU calculations or huge loops like -> (JSON.parse(big data)).

{-- Non-Blocking Code --}
  Non-Blocking code allows Node.js to start a long operation and move on to the next line of code immediately without waiting for it to complete.
  
   -> How Node.js Handles It:
   
   - The Main Thread initiates the asynchronous function (fs.readFile()).
   - Node.js offloads the heavy work to Libuv (to either native OS mechanisms or the Thread Pool)
   - The Main Thread frees up instantly to run the rest of your application.
   - Once the background task completes, its callback function is pushed to the Event Queue.
   - The Event Loop moves the callback to the Call Stack to execute as soon as the stack is empty

   -> Examples:
     Asynchronous operations like fs.readFile(), http.get(), Promises, and async/await.

     
   */
