import { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const handleLogout = async () => {
      const authData = JSON.parse(localStorage.getItem("auth"));
      try {
        if (authData) {
          const response = await fetch(
            "https://offers-api.digistos.com/api/auth/logout",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                credentials: "include",
              },
            }
          );
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || "Erreur lors de la déconnexion");
          }
        } else {
          throw new Error("Missing token");
        }

        // (2) Suppression du token côté frontend

        // (3) Redirection vers la page de login
      } catch (error) {
        console.error(`${error.message}`);
      } finally {
        localStorage.removeItem("auth");
        navigate("/connexion");
      }
    };

    handleLogout();
  }, []);

  return null; // Pas besoin d'afficher quoi que ce soit
};

export default Logout;
