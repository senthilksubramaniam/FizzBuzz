import { API_BASE_URL } from "../config";
import { Game, Quiz, Result } from "../type";

const gameService = {
  // Fetch all games
  getGames: async (): Promise<Game[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/games`);
      if (!response.ok) {
        throw new Error("Failed to fetch games");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching games:", error);
      return [];
    }
  },

  getGameById: async (id: number): Promise<Game | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/games/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch game details");
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching game ${id}:`, error);
      return null;
    }
  },

  takeQuiz: async (quizData: Quiz): Promise<Result | null> => {
    try {
      const jsonData =JSON.stringify(quizData);
      const response = await fetch(`${API_BASE_URL}/api/games/play`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonData,
      });
      if (!response.ok) {
        throw new Error("Failed to validate Quiz details");
      }
      const quizResponse = await response.json();
      return quizResponse;
    } catch (error) {
      console.error(`Error validating quiz:`, error);
      return null;
    }
  },

  createGame: async (gameData: Game): Promise<Game | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/games`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gameData),
      });

      if (!response.ok) {
        throw new Error("Failed to create game");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating game:", error);
      return null;
    }
  }
};

export default gameService;
