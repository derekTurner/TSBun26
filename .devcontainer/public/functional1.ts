// first class function assigned to a variable

const greet = (): string => {
  return "Hello";
};

const myFunction = greet;

console.log(myFunction()); // Hello
const output1 = document.getElementById("output1") as HTMLParagraphElement;
output1.innerText = myFunction(); //Hello to web page

// first class function passed as an argument to a second first class function

const cube = (z: number): number => {
  return z * z * z;
};

const statement = (volume: number): string => {
  return `The volume of a cube is ${volume}`; //templated string
};

let answer: string = statement(cube(4));

console.log(answer); // The volume of a cube is 64
const output2 = document.getElementById("output2") as HTMLParagraphElement;
output2.innerText = answer; //The volume of a cube is 64

// high order function receives function as a parameter

const calculate = (
  x: number,
  y: number,
  operation: (a: number, b: number) => number,
): number => {
  return operation(x, y);
};

const add = (a: number, b: number): number => a + b;
const multiply = (a: number, b: number): number => a * b;

console.log(calculate(2, 3, add)); // 5
console.log(calculate(2, 3, multiply)); // 6
const output3 = document.getElementById("output3") as HTMLParagraphElement;
const output4 = document.getElementById("output4") as HTMLParagraphElement;
output3.innerText = `${calculate(2, 3, add)}`; // 5
output4.innerText = `${calculate(2, 3, multiply)}`; // 6

// high order function returning a function

const multiplier = (factor: number): ((n: number) => number) => {
  return (n: number): number => {
    return n * factor;
  };
};

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
const output5 = document.getElementById("output5") as HTMLParagraphElement;
const output6 = document.getElementById("output6") as HTMLParagraphElement;
output5.innerText = `${double(5)}`; // 10
output6.innerText = `${triple(5)}`; // 15

// Imperative
// Find volumes from numbers in a list

function power3(z: number) {
  return Math.pow(z, 3);
}

const numbers: number[] = [2, 3, 4, 5];
for (let i: number = 0; i < numbers.length; i++) {
  numbers[i] = power3(numbers[i]);
}

console.log(numbers); // [8, 27, 64, 125]
const output7 = document.getElementById("output7") as HTMLParagraphElement;
output7.innerText = `${numbers}`; // 10

// Declarative
// Find volumes from numbers in a list

const power = (z: number): ((x: number) => number) => {
  return (x: number): number => {
    return Math.pow(x, z);
  };
};

const volume = power(3);
const area = power(2);

const nums: number[] = [2, 3, 4, 5];

const numVolume: number[] = nums.map(volume);

let a: number[] = numVolume;

console.log(a); // [8, 27, 64, 125]
const output8 = document.getElementById("output8") as HTMLParagraphElement;
output8.innerText = `${a}`; // 10

// imperetive total up form

function totup(myForm: HTMLFormElement) {
  let total: number = 0;

  const entries = myForm.querySelectorAll<HTMLInputElement>(
    'input[name="entry"]',
  );
  entries.forEach((entry) => {
    total += Number.parseFloat(entry.value) || 0;
  });

  const discountInput = myForm.elements.namedItem(
    "d1",
  ) as HTMLInputElement | null;
  const discount = Number.parseFloat(discountInput?.value ?? "0") || 0;

  total = total * (1 - discount / 100);

  const totalDisplay = myForm.querySelector<HTMLInputElement>("#totalled1");
  if (totalDisplay) {
    totalDisplay.value = total.toFixed(2);
  }
}

totup(document.getElementById("myForm") as HTMLFormElement);

// declarative total up form

function getSum(accumulator: number, item: HTMLInputElement): number {
  return accumulator + (Number.parseFloat(item.value) || 0);
}

function totup2(myForm: HTMLFormElement) {
  const entries = myForm.querySelectorAll<HTMLInputElement>(
    'input[name="entry"]',
  );
  let total2: number = Array.from(entries).reduce(getSum, 0);

  const discountInput = myForm.elements.namedItem(
    "d1",
  ) as HTMLInputElement | null;
  const discount2 = Number.parseFloat(discountInput?.value ?? "0") || 0;

  total2 = total2 * (1 - discount2 / 100);

  const totalDisplay = myForm.querySelector<HTMLInputElement>("#totalled2");
  if (totalDisplay) {
    totalDisplay.value = total2.toFixed(2);
  }
}

totup2(document.getElementById("myForm") as HTMLFormElement);

// composition

const compose = (f: (n: number) => number, g: (n: number) => number) => {
  return (x: number): number => {
    return f(g(x));
  };
};

const add1 = (x: number): number => x + 1;
const times2 = (x: number): number => x * 2;

const doubleAfterAdd1 = compose(add1, times2);

console.log(doubleAfterAdd1(3));
