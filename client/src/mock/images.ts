import ImageDto from "model/dto/PostImageDto";
import UserDto from "model/dto/UserDto";
import faker from "faker";
import users from "mock/users";

function createImage(user: UserDto, count: number): ImageDto[] {
  return Array.from(Array(count)).map(() => ({
    id: faker.datatype.uuid(),
    postId: faker.datatype.uuid(),
    url: faker.image.image(),
    authorId: user.id,
    authorFirstName: user.firstName,
    authorLastName: user.lastName,
    authorAvatarUrl: user.avatarUrl,
    createDate: faker.date.recent().toString(),
    liked: false,
    likeCount: 0,
  }));
}

const images: ImageDto[] = [];

export default images;
