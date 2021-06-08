import { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../AuthProvider';
import { useHistory, Link } from 'react-router-dom';

function Login() {
  const { signin } = useAuth();
  const usernameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  let history = useHistory();

  const register = async (newUser) => {
    const stringifiedUser = JSON.stringify(newUser);
    const response = await fetch('../../users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: stringifiedUser,
    });

    if (response.status === 200) {
      const registered = await response.json();
      const loggedIn = await signin({
        username: registered.username,
        password: registered.password,
      });

      if (loggedIn) {
        history.push('/web/');
      }
    } else {
      const error = await response.json();
      alert(`algo deu errado com o seu registro, ${error?.message}`);
    }
  };

  const handleFormSubmit = () => {
    const newUser = {
      username: usernameInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };

    register(newUser);
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleFormSubmit();
      }}
    >
      <h3 className="text-center">Faça seu cadastro</h3>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nome de Usuário</Form.Label>
        <Form.Control
          ref={usernameInputRef}
          type="text"
          id="input-register-username"
          required
          placeholder="username"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Seu email</Form.Label>
        <Form.Control
          ref={emailInputRef}
          type="email"
          id="input-register-email"
          required
          placeholder="seu email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Senha</Form.Label>
        <Form.Control
          ref={passwordInputRef}
          type="password"
          id="input-register-password"
          required
          placeholder="senha"
        />
      </Form.Group>

      <Link to="/web/login" className="d-block">
        Já possui conta e deseja fazer login?
      </Link>
      <Button variant="primary" type="submit">
        Cadastrar
      </Button>
    </Form>
  );
}

export default Login;
