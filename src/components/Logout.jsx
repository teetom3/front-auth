/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
const Logout = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleLogout = async () => {
      // (1) Appel API pour notifier la déconnexion

      try {
        if (token) {
          const response = await fetch(
            "https://offers-api.digistos.com/api/auth/logout",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
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
        dispatch(logout());
        navigate("/connexion");
      }
    };

    handleLogout();
  }, []);

  return null; // Pas besoin d'afficher quoi que ce soit
};

export default Logout;
