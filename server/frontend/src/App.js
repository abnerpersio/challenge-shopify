import { Container } from 'react-bootstrap';
import { Switch, Route, useHistory } from 'react-router-dom';

import { useAuth } from './AuthProvider';
import Header from './components/Header';
import Login from './components/Login';
import LikedList from './components/LikedList';
import ProductList from './components/ProductList';
import Register from './components/Register';

function App() {
  const { user } = useAuth();
  let history = useHistory();

  if (!user) {
    history.push('/web/login');
  }

  return (
    <div className="app">
      <Switch>
        <Route exact path="/web/">
          <Header />
          <ProductList />
        </Route>

        <Route exact path="/web/lista">
          <Header />
          <LikedList />
        </Route>

        <Route exact path="/web/login">
          <Container className="p-5 mt-5 w-50" style={{ minWidth: '600px' }}>
            <Login />
          </Container>
        </Route>

        <Route exact path="/web/register">
          <Container className="p-5 mt-5 w-50" style={{ minWidth: '600px' }}>
            <Register />
          </Container>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
