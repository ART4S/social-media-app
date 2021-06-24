type User = {
  firstName: string;
  lastName: string;
};

function capitalizeFirstLetter(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export function getUserName(user: User): string {
  return `${capitalizeFirstLetter(user.firstName)} ${capitalizeFirstLetter(
    user.lastName
  )}`;
}
