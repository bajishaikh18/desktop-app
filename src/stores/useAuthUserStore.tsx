import { create } from "zustand";
export interface AuthUser {
  email: string;
  phone: string;
  _id: string;
  firstName: string;
  lastName: string;
  country: string;
  resume: {
    keyName: string;
    uploadDate: string;
  };
  profilePic:string;
  notifyFor:string[];
  workVideo: {
    keyName: string;
    uploadDate: string;
  };
}

interface UserStore {
  authUser: AuthUser | null;
  openLogin: boolean;
  setAuthUser: (user: AuthUser | null) => Promise<void>;
  setOpenLogin: (val: boolean) => void;
}

export const useAuthUserStore = create<UserStore>((set) => ({
  authUser: null,
  openLogin: false,
  setAuthUser: async (user) => {
    set({
      authUser: user,
    });
  },
  setOpenLogin: (val) => {
    set({
      openLogin: val,
    });
  },
}));
