import { backgroundApi } from "../util/request";
import { PatchSession, PostSession } from "./interface";

export const postSession = async (values: PostSession) => {
  return await backgroundApi.post("/session", values);
};

export const getSessions = async () => {
  return await backgroundApi.get("/session");
};

export const getSignups = async () => {
  return await backgroundApi.get("/signup");
};

export const patchSession = async (id: number, values: PatchSession) => {
  return await backgroundApi.patch(`/session/${id}`, values);
};

export const deleteSessionById = async (id: number) => {
  return await backgroundApi.delete(`/session/${id}`);
};
