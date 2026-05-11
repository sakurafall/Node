import bcrypt from 'bcrypt';
import { User } from '../models/index.js';
import config from '../config/index.js';

export async function createUser(email, password) {
  const encryptedPassword = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const created = await User.create({ email, password: encryptedPassword });
  return { id: Number(created.id), email: created.email };
}

export async function verifyUser(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) return null;

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) return null;

  return { id: Number(user.id), email: user.email };
}
