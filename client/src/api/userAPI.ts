import userService from "mock/services/userService";
import UserDto from "model/dto/UserDto";

import config from "./config";

// users/:id
function get(userId: string): Promise<UserDto> {
  return new Promise<UserDto>((resolve) =>
    setTimeout(() => resolve(userService.get(userId)), config.delayMs),
  );
}

export default { get };
