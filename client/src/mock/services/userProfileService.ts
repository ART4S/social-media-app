import {
  UserProfile,
  userProfilesById,
  userProfilesByUserId,
} from "mock/data/userProfiles";
import users from "mock/data/users";
import UserProfileEditDto from "model/dto/userProfiles/UserProfileEditDto";
import UserProfileInfoDto from "model/dto/userProfiles/UserProfileInfoDto";
import { currentUser } from "./authService";

// userProfiles/:id
function getById(id: string): UserProfileInfoDto {
  return mapProfile(userProfilesById[id]);
}

// userProfiles/:id
function updateProfile(id: string, dto: UserProfileEditDto) {
  const profile = userProfilesById[id];

  if (profile.userId === currentUser!.id) {
    profile.dateOfBirth = dto.dateOfBirth;
    profile.about = dto.about;

    const user = users[profile.userId];

    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.avatarUrl = dto.avatarUrl;
  }
}

// userProfiles/:id
function deleteProfile(id: string) {
  const { userId } = userProfilesById[id];
  if (userId === currentUser!.id) {
    delete userProfilesById[id];
    delete userProfilesByUserId[currentUser!.id];
  }
}

export default { getById, updateProfile, deleteProfile };

function mapProfile(profile: UserProfile): UserProfileInfoDto {
  const { id, userId, dateOfBirth, about } = profile;
  const { firstName, lastName, avatarUrl } = users[userId];
  return {
    id,
    firstName,
    lastName,
    avatarUrl,
    dateOfBirth,
    about,
  };
}
