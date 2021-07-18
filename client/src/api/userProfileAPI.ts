import userProfileService from "mock/services/userProfileService";
import UserProfileEditDto from "model/dto/userProfiles/UserProfileEditDto";
import UserProfileInfoDto from "model/dto/userProfiles/UserProfileInfoDto";
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

function deleteProfile(id: string): Promise<void> {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      userProfileService.deleteProfile(id);
      resolve();
    }, config.delayMs),
  );
}

export default { getById, updateProfile, deleteProfile };
