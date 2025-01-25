const food = Deno.args[0];

if (food === "love") {
  console.log("I love food");
} else {
  console.log("No food for me");
}
console.table(Deno.memoryUsage());