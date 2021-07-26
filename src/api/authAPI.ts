import authService from "mock/services/authService";
import LoginErrorResponse from "model/login/LoginErrorResponse";
import LoginSuccessReponse from "model/login/LoginSuccessResponse";
import RegistrationErrorResponse from "model/registration/RegistrationErrorResponse";
import RegistrationSuccessResponse from "model/registration/RegistrationSuccessResponse";
import LoginVm from "model/login/loginVm";
import RegistrationVm from "model/registration/registrationVm";

import config from "./config";

function registerUser(
  vm: RegistrationVm,
): Promise<RegistrationSuccessResponse | RegistrationErrorResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(authService.registerUser(vm));
    }, config.delayMs);
  });
}

function login(vm: LoginVm): Promise<LoginSuccessReponse | LoginErrorResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(authService.login(vm));
    }, config.delayMs);
  });
}

function logout(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      authService.logout();
      resolve();
    }, config.delayMs);
  });
}

export default { registerUser, login, logout };
