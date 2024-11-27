import { create } from "zustand";
export interface AuthUser {
  email: string;
  phone: string;
  _id: string;
  firstName: string;
  lastName: string;
  country: string;
  dob: string;       
  
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
  industry:string;
  totalExperience:string;
  state:string;
  gulfExperience:string;
  currentJobTitle:{
    title:string;
    _id:string
  }
}

interface UserStore {
  authUser: AuthUser | null;
  openLogin: boolean;
  authUserLoading: boolean;
  setAuthUser: (user: AuthUser | null) => Promise<void>;
  setOpenLogin: (val: boolean) => void;
  setAuthUserLoading: (loading:boolean) =>void;
}

export const useAuthUserStore = create<UserStore>((set) => ({
  authUser: null,
  authUserLoading:false,
  openLogin: false,
  setAuthUser: async (user) => {
    set({
      authUser: user,
    });
  },
  setAuthUserLoading: async (loading:boolean) => {
    set({
      authUserLoading: loading,
    });
  },
  setOpenLogin: (val) => {
    set({
      openLogin: val,
    });
  },
}));
