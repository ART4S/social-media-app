import UserDto from "model/dto/UserDto";
import users from "mock/data/users";
import UserProfileDto from "model/dto/userProfiles/UserProfileDto";
import userProfiles from "mock/data/userProfiles";
import { currentUser } from "./authService";
import followings from "mock/data/followings";
import faker from "faker";
import FollowingDto from "model/dto/users/FollowingDto";
import FollowerDto from "model/dto/users/FollowerDto";
import FollowingCreateDto from "model/dto/users/FollowingCreateDto";
import { composeKey } from "mock/utils/entityUtils";

// users/:id
function getById(id: string): UserDto {
  return users[id];
}

// users/:id/followings
function getFollowings(id: string): FollowingDto[] {
  return Object.values(followings)
    .filter((x) => x.followerId === id)
    .map((x) => ({
      userId: x.userId,
      firstName: users[x.userId].firstName,
      lastName: users[x.userId].lastName,
      avatarUrl: users[x.userId].avatarUrl,
      status: userProfiles[x.userId].status,
    }));
}

// users/:id/followers
function getFollowers(id: string): FollowerDto[] {
  return Object.values(followings)
    .filter((x) => x.followerId === id)
    .map((x) => ({
      userId: x.userId,
      followerId: x.followerId,
      firstName: users[x.userId].firstName,
      lastName: users[x.userId].lastName,
      avatarUrl: users[x.userId].avatarUrl,
      status: userProfiles[x.userId].status,
    }));
}

// users/:userId/profile
function getProfile(userId: string): UserProfileDto {
  const { email, firstName, lastName, avatarUrl } = users[userId];
  const { id, dateOfBirth, status, about } = userProfiles[userId];
  return {
    id,
    userId,
    email,
    firstName,
    lastName,
    avatarUrl,
    dateOfBirth,
    status,
    about,
  };
}

// users/search
function search(pattern: string): UserDto[] {
  const regex = new RegExp(pattern.toLocaleLowerCase());
  return Object.values(users).filter(
    (x) =>
      regex.test(x.firstName.toLocaleLowerCase()) ||
      regex.test(x.lastName.toLocaleLowerCase()),
  );
}

// users/followings
function createFollowing(following: FollowingCreateDto) {
  const userId = following.userId;
  const followerId = currentUser!.id;
  followings[composeKey(userId, followerId)] = {
    userId,
    followerId,
  };
}

// users/followings/:userId
function deleteFollowing(userId: string) {
  delete followings[composeKey(userId, currentUser!.id)];
}

// users/followers/:followerId
function deleteFollower(followerId: string) {
  delete followings[composeKey(currentUser!.id, followerId)];
}

export default {
  getById,
  getFollowings,
  getFollowers,
  getProfile,
  search,
  createFollowing,
  deleteFollowing,
  deleteFollower,
};
