// boolean
let isCool: boolean = true;

// number
let age: number = 56;

// string
let eyeColor: string = "brown";
let favoriteQuote: string = `I'm not old, I'm only ${age}`;

// Array
let pets: string[] = ["cat", "dog", "pig"];
let pets2: Array<string> = ["lion", "dragon", "lizard"];

// Object
let wizard: object = {
  a: "John",
};

// null and undefined
let meh: undefined = undefined;
let noo: null = null;

// Tuple
let basket: [string, number] = ["basketball", 5];

// Enum
enum Size {
  Small = 1,
  Medium = 2,
  Large = 3,
}
let sizeName: string = Size[2]; // Medium

// Any - !!!!!!!!!!!! BE CAREFUL
let whatever: any = "aaaaghhhhhh noooooo!";
whatever = basket; // valid with any data type

// void
let sing = (): void => {
  console.log("lalalala");
};

// never means the function will never return
let error = (): never => {
  throw Error("blah!");
};

// interface - creating a new name that is a type
// we can use type also for the same purpose but interface is more common.
interface RobotArmy { // interface is a contract
  count: number;
  type: string;
  magic: string;
}
let fightRobotArmy = (robots: RobotArmy) => {
  console.log("FIGHT!");
};
let fightRobotArmy2 = (robots: {
  count: number;
  type: string;
  magic?: string; // optional(?)
}) => {
  console.log("FIGHT!");
}


// Type Assertion - Override the type of a variable
interface CatArmy {
  count: number;
  type: string;
  magic: string;
}
let dog = {} as CatArmy;

// Function
let fightRobotArmy3 = (robots: RobotArmy): void => {
  console.log("FIGHT!");
};

// Classes
class Animal {
  private sing: string; // only accessible inside the class
  constructor(sound: string) {
    this.sing = sound;
  }
  greet() {
    return `Hello, ${this.sing}`;
  }
}
let lion = new Animal("Lion");
lion.greet()          // lion.sing // not accessible

// Union
let confused: string | number = "hello";

// Type Alias
type Style = "bold" | "italic";
