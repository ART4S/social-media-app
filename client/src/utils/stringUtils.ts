export function capitalizeFirstLetter(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export function wrap(value: string, symbolCount: number = 20) {
  if (value.length < symbolCount) {
    return value;
  } else {
    return value.slice(0, symbolCount) + "...";
  }
}
