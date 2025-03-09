import { AUTH_STORAGE_KEY } from "@/lib/constants";
import type { UserAuth } from "@/lib/types";

/**
 * Retrieves and parses the user's authentication data from localStorage.
 *
 * This function checks if the code is executed in a browser environment before accessing localStorage.
 * It attempts to retrieve the authentication data stored under a predefined key, parses it from JSON,
 * and verifies its integrity by ensuring it is an object containing a valid "token" property.
 *
 * @returns A UserAuth object if the data is valid, otherwise null.
 */
export function getUserAuth(): UserAuth | null {
  if (typeof window !== "undefined") {
    const authData = localStorage.getItem(AUTH_STORAGE_KEY);
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        if (
          parsed &&
          typeof parsed === "object" &&
          "token" in parsed &&
          parsed.token
        ) {
          return parsed;
        }
      } catch (_error) {
        return null;
      }
    }
  }
  return null;
}

/**
 * Stores the provided user authentication data in the local storage.
 *
 * This function serializes the `userAuth` object to a JSON string and saves it using a predefined token key.
 *
 * @param userAuth - An object containing the authentication details of the user.
 */
export function setUserAuth(userAuth: UserAuth): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userAuth));
}

/**
 * Removes the stored authentication token from local storage.
 *
 * This function clears the user's authentication data by removing the item associated with
 * the predefined token key (TOKEN_KEY) from the browser's localStorage.
 */
export function clearUserAuth(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
