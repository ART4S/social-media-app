import { capitalizeFirstLetter } from "./stringUtils";

interface User {
  firstName: string;
  lastName: string;
}

export function getUserName({ firstName, lastName }: User): string {
  return [firstName, lastName]
    .filter((x) => !!x)
    .map((x) => capitalizeFirstLetter(x.trim()))
    .join(" ");
}
