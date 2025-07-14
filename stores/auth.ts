import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(null);
  const user = ref<any>(null);

  const setAuthData = (authData: { token: string; user: any }) => {
    token.value = authData.token;
    user.value = authData.user;

    localStorage.setItem("auth_token", authData.token);
    localStorage.setItem("auth_user", JSON.stringify(authData.user));
  };

  // Appelée quand la page est rechargée
  const restoreSession = () => {
    const savedToken = localStorage.getItem("auth_token");
    const savedUser = localStorage.getItem("auth_user");

    if (savedToken && savedUser) {
      token.value = savedToken;
      user.value = JSON.parse(savedUser);
    }
  };

  const clearAuthData = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  };

    async function logout() {
    const res = await $fetch(
      "https://demo-allobeaute.tikaplace.com/api/user/logout",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    clearAuthData();
    console.log("User logged out successfully:", res);
  }

  return {
    token,
    user,
    setAuthData,
    clearAuthData,
    restoreSession,
    logout,
  };
});
