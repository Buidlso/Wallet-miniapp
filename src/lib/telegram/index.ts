// import { StringSession } from "telegram/sessions";
// import { getEmptySession, getMySession } from "./sessions";
// import { TelegramClient } from "telegram";
// import { getTelegramConfig } from "./config";

// // -------------------------------PUBLIC--------------------------------- //

// export function getEmptyTelegramClient(): TelegramClient {
//   const session = getEmptySession();
//   return getTelegramClient(session);
// }

// export function getMyTelegramClient(): TelegramClient {
//   const session = getMySession();
//   return getTelegramClient(session);
// }

// // -------------------------------PRIVATE--------------------------------- //

// function getTelegramClient(session: StringSession): TelegramClient {
//   return new TelegramClient(
//     session,
//     25195361,
//     "b14701ec05bec4a87a27936b89887ca6",
//     {}
//   );
// }
