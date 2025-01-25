import { desc, run, task } from "https://deno.land/x/drake@v1.6.0/mod.ts";

// Your tasks here
desc("My first Drake task");
task("default", [], async function() {
  console.log("Hello from Drake!");
});

run();