import { capitalizeFirstLetter } from "./stringUtils";

interface User {
  firstName: string;
  lastName: string;
}

export function getUserName(user: User): string {
  const { firstName, lastName } = user;
  return [firstName, lastName]
    .filter((x) => !!x)
    .map((x) => capitalizeFirstLetter(x.trim()))
    .join(" ");
}
