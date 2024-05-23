import { TELEGRAM_SESSION } from "@/domain/constants";
import { getFromStorage } from "../storage";
import { StringSession } from "telegram/sessions";

export function getEmptySession(): StringSession {
  return new StringSession("");
}

export function getMySession(): StringSession {
  const session = getFromStorage(TELEGRAM_SESSION);
  if (!session) {
    return getEmptySession();
  }
  return new StringSession(session);
}
