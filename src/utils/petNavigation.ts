// Utility functions for managing last used pet ID

const LAST_PET_ID_KEY = "lastPetId";

/**
 * Store the last used pet ID in localStorage
 * @param petId - The pet ID to store
 */
export const storeLastPetId = (petId: string): void => {
  if (petId && petId !== "default") {
    localStorage.setItem(LAST_PET_ID_KEY, petId);
  }
};

/**
 * Get the last used pet ID from localStorage
 * @returns The last used pet ID or null if not found
 */
export const getLastPetId = (): string | null => {
  return localStorage.getItem(LAST_PET_ID_KEY);
};

/**
 * Clear the last used pet ID from localStorage
 */
export const clearLastPetId = (): void => {
  localStorage.removeItem(LAST_PET_ID_KEY);
};

/**
 * Logout function that clears token but keeps last pet ID for next login
 */
export const logout = (): void => {
  localStorage.removeItem("token");
  // Note: We don't clear lastPetId here so users return to their last used pet on next login
};

/**
 * Get the last used pet ID or fetch the first available pet
 * @returns Promise<string> - The pet ID to use
 */
export const getLastOrFirstPetId = async (): Promise<string> => {
  const lastPetId = getLastPetId();

  if (lastPetId) {
    // Try to validate the stored pet ID using getPetById
    try {
      const { default: petServices } = await import("../Services/petServices");
      const petRes = await petServices.getPetById(lastPetId);

      // If we get a valid response, the pet ID is still valid
      if (petRes && petRes.data) {
        return lastPetId;
      }
    } catch (error) {
      console.error(
        "Stored pet ID is invalid, fetching first available pet:",
        error
      );
      // Clear the invalid pet ID
      clearLastPetId();
    }
  }

  // If no last pet ID or stored pet ID is invalid, try to get the first pet from the API
  try {
    const { default: petServices } = await import("../Services/petServices");
    const petsRes = await petServices.getPetsByOwner();
    let petsArr = Array.isArray(petsRes) ? petsRes : petsRes.data;

    if (!petsArr) petsArr = [];
    if (!Array.isArray(petsArr)) petsArr = [petsArr];

    if (petsArr.length > 0) {
      const firstPetId = petsArr[0].id;
      // Store this as the last used pet ID
      storeLastPetId(firstPetId);
      return firstPetId;
    }
  } catch (error) {
    console.error("Failed to fetch pets for last pet ID:", error);
  }

  // Fallback to default
  return "default";
};
