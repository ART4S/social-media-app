import userService from "mock/services/userService";
import type UserDto from "model/dto/user/UserDto";
import type UserProfileDto from "model/dto/userProfile/UserProfileDto";
import type FollowerDto from "model/dto/follower/FollowerDto";
import type FollowingCreateDto from "model/dto/following/FollowingCreateDto";
import type FollowingDto from "model/dto/following/FollowingDto";

import config from "./config";

function getById(id: string): Promise<UserDto> {
  return new Promise<UserDto>((resolve) =>
    setTimeout(() => resolve(userService.getById(id)), config.delayMs),
  );
}

function getFollowings(id: string): Promise<FollowingDto[]> {
  return new Promise<FollowingDto[]>((resolve) =>
    setTimeout(() => resolve(userService.getFollowings(id)), config.delayMs),
  );
}

function getFollowers(id: string): Promise<FollowerDto[]> {
  return new Promise<FollowerDto[]>((resolve) =>
    setTimeout(() => resolve(userService.getFollowers(id)), config.delayMs),
  );
}

function getProfile(id: string): Promise<UserProfileDto> {
  return new Promise<UserProfileDto>((resolve) =>
    setTimeout(() => resolve(userService.getProfile(id)), config.delayMs),
  );
}

function search(pattern: string): Promise<UserDto[]> {
  return new Promise<UserDto[]>((resolve) =>
    setTimeout(() => resolve(userService.search(pattern)), config.delayMs),
  );
}

function searchFollowings(id: string, pattern: string): Promise<FollowingDto[]> {
  return new Promise<FollowingDto[]>((resolve) =>
    setTimeout(() => resolve(userService.searchFollowings(id, pattern)), config.delayMs),
  );
}

function searchFollowers(id: string, pattern: string): Promise<FollowerDto[]> {
  return new Promise<FollowerDto[]>((resolve) =>
    setTimeout(() => resolve(userService.searchFollowers(id, pattern)), config.delayMs),
  );
}

function createFollowing(following: FollowingCreateDto): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      userService.createFollowing(following);
      resolve();
    }, config.delayMs),
  );
}

function deleteFollowing(userId: string): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      userService.deleteFollowing(userId);
      resolve();
    }, config.delayMs),
  );
}

function deleteFollower(followerId: string): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      userService.deleteFollower(followerId);
      resolve();
    }, config.delayMs),
  );
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
