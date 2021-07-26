import type UserDto from "model/dto/user/UserDto";
import users, { User } from "mock/data/users";
import type UserProfileDto from "model/dto/userProfile/UserProfileDto";
import { userProfilesByUserId } from "mock/data/userProfiles";
import followings, { Following } from "mock/data/followings";
import type FollowingDto from "model/dto/following/FollowingDto";
import type FollowerDto from "model/dto/follower/FollowerDto";
import type FollowingCreateDto from "model/dto/following/FollowingCreateDto";
import { composeKey } from "mock/utils/entityUtils";

import { getCurrentUser } from "./authService";

// users/:id
function getById(id: string): UserDto {
  return mapUser(users[id]);
}

// users/:id/followings
function getFollowings(id: string): FollowingDto[] {
  return Object.values(followings)
    .filter((x) => x.followerId === id)
    .map(mapFollowing);
}

// users/:id/followers
function getFollowers(id: string): FollowerDto[] {
  return Object.values(followings)
    .filter((x) => x.userId === id)
    .map(mapFollower);
}

// users/:userId/profile
function getProfile(userId: string): UserProfileDto {
  const { email, firstName, lastName, avatarUrl } = users[userId];
  const { id, dateOfBirth, status, about } = userProfilesByUserId[userId];
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
    isCurrentUserFollow: !!followings[composeKey(userId, getCurrentUser().id)],
  };
}

// users/search
function search(pattern: string): UserDto[] {
  const regex = new RegExp(pattern.toLocaleLowerCase());
  return Object.values(users)
    .filter(
      (x) =>
        regex.test(x.firstName.toLocaleLowerCase()) || regex.test(x.lastName.toLocaleLowerCase()),
    )
    .map(mapUser);
}

// users/:id/followings/search
function searchFollowings(id: string, pattern: string): FollowingDto[] {
  const regex = new RegExp(pattern.toLocaleLowerCase());
  return Object.values(followings)
    .filter(
      (x) =>
        x.followerId === id
        && (regex.test(users[x.userId].firstName.toLocaleLowerCase())
          || regex.test(users[x.userId].lastName.toLocaleLowerCase())),
    )
    .map(mapFollowing);
}

// users/:id/followers/search
function searchFollowers(id: string, pattern: string): FollowerDto[] {
  const regex = new RegExp(pattern.toLocaleLowerCase());
  return Object.values(followings)
    .filter(
      (x) =>
        x.userId === id
        && (regex.test(users[x.followerId].firstName.toLocaleLowerCase())
          || regex.test(users[x.followerId].lastName.toLocaleLowerCase())),
    )
    .map(mapFollower);
}

// users/followings
function createFollowing(following: FollowingCreateDto) {
  const { userId } = following;
  const followerId = getCurrentUser().id;
  followings[composeKey(userId, followerId)] = {
    userId,
    followerId,
  };
}

// users/followings/:userId
function deleteFollowing(userId: string) {
  delete followings[composeKey(userId, getCurrentUser().id)];
}

// users/followers/:followerId
function deleteFollower(followerId: string) {
  delete followings[composeKey(getCurrentUser().id, followerId)];
}

export default {
  getById,
  getFollowings,
  getFollowers,
  getProfile,
  search,
  searchFollowings,
  searchFollowers,
  createFollowing,
  deleteFollowing,
  deleteFollower,
};

function mapFollowing(following: Following): FollowingDto {
  return {
    userId: following.userId,
    firstName: users[following.userId].firstName,
    lastName: users[following.userId].lastName,
    avatarUrl: users[following.userId].avatarUrl,
    status: userProfilesByUserId[following.userId].status,
  };
}

function mapFollower(following: Following): FollowerDto {
  return {
    followerId: following.followerId,
    firstName: users[following.followerId].firstName,
    lastName: users[following.followerId].lastName,
    avatarUrl: users[following.followerId].avatarUrl,
    status: userProfilesByUserId[following.followerId].status,
  };
}

function mapUser(user: User): UserDto {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    avatarUrl: user.avatarUrl,
  };
}
