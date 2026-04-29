import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Estado global de autenticación
 *
 * Aquí guardamos si el usuario está autenticado
 * y además persistimos ese estado en AsyncStorage
 * para que no se pierda al cerrar la app.
 */
type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loadSession: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: true,

  /**
   * Login:
   * - marca usuario como autenticado
   * - guarda en AsyncStorage
   */
  login: async () => {
    await AsyncStorage.setItem("auth", "true");
    set({ isAuthenticated: true });
  },

  /**
   * Logout:
   * - elimina sesión guardada
   */
  logout: async () => {
    await AsyncStorage.removeItem("auth");
    set({ isAuthenticated: false });
  },

  /**
   * Cargar sesión al iniciar app
   * - revisa si existe "auth" en storage
   */
  loadSession: async () => {
    const value = await AsyncStorage.getItem("auth");

    set({
      isAuthenticated: value === "true",
      isLoading: false,
    });
  },
}));
