import { User } from '../model/User';

import { UserRepository } from './UserRepository';

const USER_COUNT = 5;
const userRepository = new UserRepository();

beforeEach(async () => {
  for (let i = 0; i < USER_COUNT; ++i) {
    await userRepository.save(new User(i, "Stephen"+i));
  }
});

afterEach(async () => {
  for (let i = 0; i < USER_COUNT; ++i) {
    await userRepository.deleteById(i);
  }
});

test('Repository Save Test', async () => {
  expect.assertions(1);
  return userRepository.count().then((value) => expect(value).toEqual(5));
});

test('Repository Find Test', async () => {
  expect.assertions(1);
  return userRepository.findById(1).then((user) => expect(user.getId()).toEqual(1));
});

test('Repository Delete Test', async () => {
  expect.assertions(3);
  await expect(userRepository.existsById(1)).resolves.toEqual(true);
  await expect(userRepository.deleteById(1)).resolves.toEqual(true);
  await expect(userRepository.existsById(1)).rejects.toEqual(false);
});

test('Repository Exists By Name Test', async () => {
  expect.assertions(2);
  await expect(userRepository.existsByName('Stephen1')).resolves.toEqual(true);
  await expect(userRepository.existsByName('Stephen44')).rejects.toEqual(false);
});

test('User ToDb Test', async () => {
  expect.assertions(0);
  const user = await userRepository.findById(1);
  const userToDb = user.toDb();
  for (const component of userToDb) {
    console.log(component);
  }
});
