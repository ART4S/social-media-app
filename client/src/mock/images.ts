import ImageDto from "model/ImageDto";
import UserDto from "model/UserDto";
import faker from "faker";
import users from "mock/users";

function createImage(user: UserDto, count: number): ImageDto[] {
  return Array.from(Array(count)).map(() => ({
    id: faker.datatype.uuid(),
    url: faker.image.image(),
    authorId: user.id,
    authorFirstName: user.firstName,
    authorLastName: user.lastName,
    authorAvatarUrl: user.avatarUrl,
    createDate: faker.date.recent(),
    liked: false,
    likeCount: 0,
  }));
}

const images: ImageDto[] = [
  ...createImage(users[0], 10),
  ...createImage(users[1], 10),
];

export default images;
