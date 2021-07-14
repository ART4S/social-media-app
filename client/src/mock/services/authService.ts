import LoginVm from "model/vm/loginVm";
import users, { User, users as initialUsers } from "mock/data/users";

export let currentUser: User | null = initialUsers[0];

function login(vm: LoginVm) {
  const user = Object.values(users).find(
    (x) => x.email === vm.email && x.password === vm.password,
  );

  if (!user) {
    throw new Error("User not found");
  }

  currentUser = user;

  return { id: user.id };
}

export default { login };
