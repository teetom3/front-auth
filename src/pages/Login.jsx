import { useState } from "react";
import {
  Form,
  Button,
  Container,
  Card,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router";
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://offers-api.digistos.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status == 401) {
          setError("Email ou mot de passe incorrect");
          return;
        }
        throw new Error("une Erreur est survenue lors de l'inscription");
      }
      console.log("Connexion réussie:", data);

      navigate("/offres/professionnelles");
    } catch (error) {
      setError("Une erreur est survenue");
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
    // Handle login logic here
    // Don't forget to handle errors, both for yourself (dev) and for the client (via a Bootstrap Alert):
    //   - Show an error if credentials are invalid
    //   - Show a generic error for all other cases
    // On success, redirect to the Pro Offers page
    console.log("Login submitted:", formData);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="p-4 shadow-lg">
            {error && (
              <Alert variant="danger" className="mb-3">
                {error}
              </Alert>
            )}
            <h1 className="text-center mb-4">Se connecter</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="loginPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={isLoading}
              >
                {isLoading ? "Connexion en cours" : "Se Connecter"}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
