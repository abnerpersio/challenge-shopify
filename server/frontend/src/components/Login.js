import { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../AuthProvider';
import { useHistory, Link } from 'react-router-dom';

function Login() {
  const { signin } = useAuth();
  let history = useHistory();

  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleFormSubmit = async () => {
    const loggedIn = await signin({
      username: usernameInputRef.current.value,
      password: passwordInputRef.current.value,
    });

    if (loggedIn) {
      history.push('/web/');
    }
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleFormSubmit();
      }}
    >
      <h3 className="text-center">Faça seu login</h3>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nome de Usuário</Form.Label>
        <Form.Control
          ref={usernameInputRef}
          type="text"
          id="input-login-username"
          required
          placeholder="username"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Senha</Form.Label>
        <Form.Control
          ref={passwordInputRef}
          type="password"
          id="input-login-password"
          required
          placeholder="senha"
        />
      </Form.Group>

      <Link to="/web/register" className="d-block">
        Ainda não possui uma conta?
      </Link>
      <Button variant="primary" type="submit">
        Fazer Login
      </Button>
    </Form>
  );
}

export default Login;
