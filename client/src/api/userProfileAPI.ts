import userProfileService from "mock/services/userProfileService";
import type UserProfileEditDto from "model/dto/userProfile/UserProfileEditDto";
import type UserProfileInfoDto from "model/dto/userProfile/UserProfileInfoDto";

import config from "./config";

function getById(id: string): Promise<UserProfileInfoDto> {
  return new Promise<UserProfileInfoDto>((resolve) =>
    setTimeout(() => resolve(userProfileService.getById(id)), config.delayMs),
  );
}

function updateProfile(id: string, profile: UserProfileEditDto): Promise<void> {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      userProfileService.updateProfile(id, profile);
      resolve();
    }, config.delayMs),
  );
}

function updateStatus(id: string, text: string): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      userProfileService.updateStatus(id, text);
      resolve();
    }, config.delayMs),
  );
}

function deleteProfile(id: string): Promise<void> {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      userProfileService.deleteProfile(id);
      resolve();
    }, config.delayMs),
  );
}

export default { getById, updateProfile, updateStatus, deleteProfile };
