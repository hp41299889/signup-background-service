import { backgroundApi } from "../util/request";
import { PatchSession, PostLogin, PostSession } from "./interface";

export const postLogin = async (values: PostLogin) => {
  return await backgroundApi.post("/auth", values);
};

export const getLogout = async () => {
  return await backgroundApi.get("/auth");
};

export const getUser = async () => {
  return await backgroundApi.get("/auth/user");
};

export const postSession = async (values: PostSession) => {
  return await backgroundApi.post("/session", values);
};

export const getSessions = async () => {
  return await backgroundApi.get("/session");
};

export const patchSession = async (id: number, values: PatchSession) => {
  return await backgroundApi.patch(`/session/${id}`, values);
};

export const deleteSessionById = async (id: number) => {
  return await backgroundApi.delete(`/session/${id}`);
};

export const getSignups = async () => {
  return await backgroundApi.get("/signup");
};
