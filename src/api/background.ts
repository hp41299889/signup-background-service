import { backgroundApi } from "../util/request";

export const getSessions = async () => {
  return await backgroundApi.get("/session");
};

export const getSignups = async () => {
  return await backgroundApi.get("/signup");
};
