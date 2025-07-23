/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router";
const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const handleLogout = async () => {
      // (1) Appel API pour notifier la déconnexion
      try {
        const response = await fetch(
          "https://offers-api.digistos.com/api/auth/logout",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("auth"))?.token
              }`,
            },
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Erreur lors de la déconnexion");
        }
        // (2) Suppression du token côté frontend
        localStorage.removeItem("auth");
        // (3) Redirection vers la page de login
      } catch (error) {
        console.error(`${error.message}`);
      } finally {
        navigate("/connexion");
      }
    };

    handleLogout();
  }, []);

  return null; // Pas besoin d'afficher quoi que ce soit
};

export default Logout;
