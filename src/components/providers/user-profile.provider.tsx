// "use client";

// import {
//   PropsWithChildren,
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// import { Entity } from "telegram/define";
// import { TelegramClient } from "telegram";
// import { useTelegram } from "./telegram.provider";

// type ProfileMap = Record<string | number, string>;
// const PROFILE_MAP = "PROFILE_MAP";

// class UserProfileManager {
//   private profileMap: ProfileMap;
//   private client: TelegramClient;

//   private storage: WindowLocalStorage;

//   constructor(storage: WindowLocalStorage, client: TelegramClient) {
//     this.storage = storage;
//     this.profileMap = this.loadProfileMap();
//     this.client = client;
//   }

//   public async getUserAvatar(telegramId: number, entity: Entity) {
//     const cachedAvatar = this.getUserAvatarFromStorage(telegramId);

//     if (!!cachedAvatar) {
//       return cachedAvatar;
//     }

//     const avatarBuffer = await this.getImageFromTdLib(entity);
//     const imageData = this.getBase64Image(avatarBuffer as Buffer);
//     this.saveUserAvatar(telegramId, imageData);
//     return imageData;
//   }

//   private async getImageFromTdLib(entity: Entity) {
//     const profilePhotoBuffer = await this.client.downloadProfilePhoto(entity);

//     return profilePhotoBuffer;
//   }

//   private getBase64Image(bytes: Buffer) {
//     return `data:image/jpeg;base64,${bytes.toString("base64")}`;
//   }

//   private getUserAvatarFromStorage(telegramId: number) {
//     return this.profileMap?.[telegramId];
//   }

//   private saveUserAvatar(telegramId: number, imageData: string) {
//     this.profileMap[telegramId] = imageData;
//     this.saveProfileToStorage();
//   }

//   private loadProfileMap() {
//     const profileMapStr = this.storage.localStorage.getItem(PROFILE_MAP);
//     if (profileMapStr === null) return {} as ProfileMap;
//     return JSON.parse(profileMapStr) as ProfileMap;
//   }

//   private saveProfileToStorage() {
//     this.storage.localStorage.setItem(
//       PROFILE_MAP,
//       JSON.stringify(this.profileMap)
//     );
//   }
// }

// interface UserProfileContext {
//   manager: UserProfileManager;
// }

// const UserProfileContext = createContext<UserProfileContext>({
//   manager: {} as UserProfileManager,
// });

// export function UserProfile({ children }: PropsWithChildren) {
//   const [userProfileManager, setUserProfileManager] =
//     useState<UserProfileManager>({} as UserProfileManager);

//   const { client } = useTelegram();

//   useEffect(() => {
//     const userProfileManagerObject = new UserProfileManager(window, client);
//     setUserProfileManager(userProfileManagerObject);
//   }, []);

//   return (
//     <UserProfileContext.Provider value={{ manager: userProfileManager }}>
//       {children}
//     </UserProfileContext.Provider>
//   );
// }

// // hooks //
// export function useUserProfile() {
//   return useContext(UserProfileContext);
// }
