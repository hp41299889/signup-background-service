export interface Session {
  id: number;
  name: string;
  place: string;
  isParking: boolean;
  isShuttle: boolean;
  joinLimit: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Signup {
  id: number;
  name: string;
  phoneNumber: string;
  joinNumber: number;
  email: number;
  isParking: boolean;
  isShuttle: boolean;
  isVerified: boolean;
  isCheckin: boolean;
}

export interface PostSession {
  name: string;
  place: string;
  joinLimit: number;
  isParking: boolean;
  isShuttle: boolean;
}

export interface PatchSession {
  name: string;
  place: string;
  joinLimit: number;
  isParking: boolean;
  isShuttle: boolean;
}
