/* eslint-disable import/no-named-as-default */
import faker from "faker";

import type LoginVm from "model/login/loginVm";
import users, { User } from "mock/data/users";
import type RegistrationVm from "model/registration/registrationVm";
import { userProfilesById, userProfilesByUserId } from "mock/data/userProfiles";
import type RegistrationSuccessResponse from "model/registration/RegistrationSuccessResponse";
import type RegistrationErrorResponse from "model/registration/RegistrationErrorResponse";
import type LoginSuccessReponse from "model/login/LoginSuccessResponse";
import type LoginErrorResponse from "model/login/LoginErrorResponse";

let currentUser: User | null = null;

export function getCurrentUser(): User {
  return currentUser!;
}

function registerUser(vm: RegistrationVm): RegistrationSuccessResponse | RegistrationErrorResponse {
  if (Object.values(users).some((x) => x.email === vm.email)) {
    return { errors: ["Email already exists"] };
  }

  const user = {
    id: faker.datatype.uuid(),
    email: vm.email,
    firstName: vm.firstName,
    lastName: vm.lastName,
    password: vm.password,
  };

  const profile = {
    id: faker.datatype.uuid(),
    userId: user.id,
    dateOfBirth: vm.dateOfBirth,
  };

  users[user.id] = user;
  userProfilesById[profile.id] = profile;
  userProfilesByUserId[user.id] = profile;

  currentUser = user;

  return { userId: user.id };
}

function login(vm: LoginVm): LoginSuccessReponse | LoginErrorResponse {
  const user = Object.values(users).find((x) => x.email === vm.email && x.password === vm.password);

  if (!user) {
    return { errors: ["Wrong email or password"] };
  }

  currentUser = user;

  return { userId: user.id };
}

function logout(): void {
  currentUser = null;
}

export default { registerUser, login, logout };
