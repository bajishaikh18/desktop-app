import { create } from 'zustand';


interface UserStore {
    isDesktop: boolean;
    setIsDesktop: (isDesktop:boolean) => Promise<void>;
}

export const useReponsiveStore = create<UserStore>((set) => ({
    isDesktop: true,
    setIsDesktop: async (isDesktop) => {
        set({
            isDesktop: isDesktop,
        });
    }
}));