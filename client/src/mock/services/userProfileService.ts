import followings from "mock/data/followings";
import imageComments from "mock/data/imageComments";
import postComments from "mock/data/postComments";
import postImageLikes from "mock/data/postImageLikes";
import postImages from "mock/data/postImages";
import postLikes from "mock/data/postLikes";
import posts from "mock/data/posts";
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

// userProfiles/:id/status
function updateStatus(id: string, text: string) {
  userProfilesById[id].status = text;
}

// userProfiles/:id
function deleteProfile(id: string) {
  const { userId } = userProfilesById[id];
  if (userId === currentUser!.id) {
    delete users[userId];
    delete userProfilesById[id];
    delete userProfilesByUserId[userId];

    Object.entries(followings).forEach(([key, value]) => {
      if ([value.followerId, value.userId].includes(userId)) {
        delete followings[key];
      }
    });

    Object.entries(posts).forEach(([postId, post]) => {
      if (post.authorId === userId) {
        delete posts[postId];
      }

      Object.entries(postImages).forEach(([imageId, image]) => {
        if (post.id === image.postId) {
          delete postImages[imageId];
        }

        Object.entries(postImageLikes).forEach(([likeId, like]) => {
          if (like.imageId === imageId || like.userId === userId) {
            delete postImageLikes[likeId];
          }
        });

        Object.entries(imageComments).forEach(([commentId, comment]) => {
          if (comment.imageId === imageId || comment.authorId === userId) {
            delete imageComments[commentId];
          }
        });
      });

      Object.entries(postLikes).forEach(([likeId, like]) => {
        if (like.postId === postId || like.userId === userId) {
          delete postLikes[likeId];
        }
      });

      Object.entries(postComments).forEach(([commentId, comment]) => {
        if (comment.postId === postId || comment.authorId === userId) {
          delete postComments[commentId];
        }
      });
    });
  }
}

export default { getById, updateProfile, updateStatus, deleteProfile };

function mapProfile(profile: UserProfile): UserProfileInfoDto {
  const { id, userId, dateOfBirth, about } = profile;
  const { firstName, lastName, avatarUrl } = users[userId];
  return {
    id,
    userId,
    firstName,
    lastName,
    avatarUrl,
    dateOfBirth,
    about,
  };
}
