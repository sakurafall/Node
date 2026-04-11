import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

// create a readline interface for standard input and output
const readLine = createInterface({ input: stdin, output: stdout });

// ask the user for their name
const name = await readLine.question("What's your name? \n");

// ask the user for their age
const age = await readLine.question("How old are you? \n");

// calculate the birth year
const birthYear = new Date().getFullYear() - age;

console.log(new Date().getFullYear());

// ask the user if the birth year is correct
const answer = await readLine.question(`Welcome ${name}, you birth year is ${birthYear} right?(y/n) \n`)

// if the answer is not yes, print the correct birth year
if (answer[0].toUpperCase() !== 'Y') {
  console.log(`I know, you were born at ${birthYear -1}!`)
}

// close the readline interface
readLine.close();