import { readFile } from 'node:fs/promises';

type Gender1 = 'male' | 'female' | 'other';

const gender: Gender1 = 'male';

const keychain = await readFile('./keychain.txt', 'utf-8');
const data = await readFile('./data.txt', 'utf-8');

enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

const game: {
  name: string;
  genre: string;
  rating: number;
} = {
  name: 'The Witcher 3: Wild Hunt',
  genre: 'Action RPG',
  rating: 9.5,
}

console.log(game)

console.log(data);
console.log(gender);
console.log(Gender.Male)