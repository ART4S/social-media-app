interface User {
  firstName: string;
  lastName: string;
}

function capitalizeFirstLetter(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export function getUserName(user: User): string {
  const { firstName, lastName } = user;
  return [firstName, lastName]
    .filter((x) => !!x)
    .map((x) => capitalizeFirstLetter(x.trim()))
    .join(" ");
}
