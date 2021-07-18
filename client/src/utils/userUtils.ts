import { capitalizeFirstLetter } from "./stringUtils";

export function getUserName(user: {
  firstName: string;
  lastName: string;
}): string {
  const { firstName, lastName } = user;
  return [firstName, lastName]
    .filter((x) => !!x)
    .map((x) => capitalizeFirstLetter(x.trim()))
    .join(" ");
}
