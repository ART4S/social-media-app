import faker from "faker";

const users = [
  {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatarUrl: faker.internet.avatar(),
  },
  {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatarUrl: faker.internet.avatar(),
  },
  {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatarUrl: faker.internet.avatar(),
  },
  {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatarUrl: faker.internet.avatar(),
  },
  {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatarUrl: faker.internet.avatar(),
  },
  {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatarUrl: faker.internet.avatar(),
  },
];

const posts = [
  {
    id: faker.datatype.uuid(),
    authorId: users[0].id,
    body: faker.lorem.paragraphs(),
    createDate: faker.date.recent(),
  },
  {
    id: faker.datatype.uuid(),
    authorId: users[0].id,
    body: faker.lorem.paragraphs(),
    createDate: faker.date.recent(),
  },
  {
    id: faker.datatype.uuid(),
    authorId: users[1].id,
    body: faker.lorem.paragraphs(),
    createDate: faker.date.recent(),
  },
];

const postComments = [
  {
    id: faker.datatype.uuid(),
    postId: posts[0].id,
    authorId: users[1].id,
    text: faker.lorem.words(),
    createDate: faker.date.recent(),
  },
  {
    id: faker.datatype.uuid(),
    postId: posts[0].id,
    authorId: users[2].id,
    text: faker.lorem.words(),
    createDate: faker.date.recent(),
  },
  {
    id: faker.datatype.uuid(),
    postId: posts[0].id,
    authorId: users[1].id,
    text: faker.lorem.words(),
    createDate: faker.date.recent(),
  },
  {
    id: faker.datatype.uuid(),
    postId: posts[0].id,
    authorId: users[3].id,
    text: faker.lorem.words(),
    createDate: faker.date.recent(),
  },
  {
    id: faker.datatype.uuid(),
    postId: posts[0].id,
    authorId: users[4].id,
    text: faker.lorem.words(),
    createDate: faker.date.recent(),
  },
  {
    id: faker.datatype.uuid(),
    postId: posts[0].id,
    authorId: users[0].id,
    text: faker.lorem.words(),
    createDate: faker.date.recent(),
  },
];

const images = [
  {
    id: faker.datatype.uuid(),
    authorId: users[0].id,
    url: faker.image.image(),
    createDate: faker.date.recent(),
  },
  {
    id: faker.datatype.uuid(),
    authorId: users[0].id,
    url: faker.image.image(),
    createDate: faker.date.recent(),
  },
  {
    id: faker.datatype.uuid(),
    authorId: users[0].id,
    url: faker.image.image(),
    createDate: faker.date.recent(),
  },
  {
    id: faker.datatype.uuid(),
    authorId: users[0].id,
    url: faker.image.image(),
    createDate: faker.date.recent(),
  },
  {
    id: faker.datatype.uuid(),
    authorId: users[0].id,
    url: faker.image.image(),
    createDate: faker.date.recent(),
  },
  {
    id: faker.datatype.uuid(),
    authorId: users[0].id,
    url: faker.image.image(),
    createDate: faker.date.recent(),
  },
  {
    id: faker.datatype.uuid(),
    authorId: users[0].id,
    url: faker.image.image(),
    createDate: faker.date.recent(),
  },
  {
    id: faker.datatype.uuid(),
    authorId: users[0].id,
    url: faker.image.image(),
    createDate: faker.date.recent(),
  },
  {
    id: faker.datatype.uuid(),
    authorId: users[0].id,
    url: faker.image.image(),
    createDate: faker.date.recent(),
  },
  {
    id: faker.datatype.uuid(),
    authorId: users[0].id,
    url: faker.image.image(),
    createDate: faker.date.recent(),
  },
  {
    id: faker.datatype.uuid(),
    authorId: users[1].id,
    url: faker.image.image(),
    createDate: faker.date.recent(),
  },
  {
    id: faker.datatype.uuid(),
    authorId: users[2].id,
    url: faker.image.image(),
    createDate: faker.date.recent(),
  },
];

const imageComments = [
  {
    id: faker.datatype.uuid(),
    imageId: images[0].id,
    authorId: users[1].id,
    text: faker.lorem.words(),
    createDate: faker.date.recent(),
  },
  {
    id: faker.datatype.uuid(),
    imageId: images[0].id,
    authorId: users[1].id,
    text: faker.lorem.words(),
    createDate: faker.date.recent(),
  },
  {
    id: faker.datatype.uuid(),
    imageId: images[0].id,
    authorId: users[1].id,
    text: faker.lorem.words(),
    createDate: faker.date.recent(),
  },
  {
    id: faker.datatype.uuid(),
    imageId: images[0].id,
    authorId: users[1].id,
    text: faker.lorem.words(),
    createDate: faker.date.recent(),
  },
];
