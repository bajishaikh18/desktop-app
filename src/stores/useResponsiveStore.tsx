import { create } from 'zustand';


interface UserStore {
    isDesktop: boolean;
    isTab:boolean;
    isMobile:boolean;
    setIsDesktop: (isDesktop:boolean,isTab:boolean,isMobile:boolean) => Promise<void>;
}

export const useReponsiveStore = create<UserStore>((set) => ({
    isDesktop: true,
    isTab:false,
    isMobile:false,
    setIsDesktop: async (isDesktop,isTab,isMobile) => {
        set({
            isDesktop: isDesktop,
            isTab:isTab,
            isMobile: isMobile
        });
    }
}));