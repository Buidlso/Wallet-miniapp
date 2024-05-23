import { TelegramClient } from "telegram";
import { getTelegramConfig } from "./config";

export async function sendLoginCode(
  client: TelegramClient,
  phoneNumber: string
) {
  await client.connect();
  await client.sendCode(
    {
      apiHash: "b14701ec05bec4a87a27936b89887ca6",
      apiId: 25195361,
    },
    phoneNumber
  );
}
