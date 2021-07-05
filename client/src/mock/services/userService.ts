import UserDto from "model/dto/UserDto";
import users from "mock/data/users";

function get(userId: string): UserDto {
  return users[userId];
}

export default { get };
