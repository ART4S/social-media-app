import faker from "faker";
import type IUserProfile from "model/dto/UserProfileDto";

const about = [faker.lorem.text(), faker.lorem.words(), ""];

const profiles: IUserProfile[] = [];

export default profiles;
