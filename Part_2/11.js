// window isnot defined instead global
// global.console.log("Hello World")
// global.process.argv

// const mission ="learns"

const mission = process.argv[2] //node .\zip2\11.js heyy

if(mission === "learn"){
    console.log("I am learning")
}
else{
    console.log(`IS ${mission} a mission?`)
}


// NODE REPL: Read, Eval, Print, Loop