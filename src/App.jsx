import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import OrderPizza from './components/OrderPizza';
import Success from './components/Success';
import './App.css';

function App() {
  // State lifting - Sipariş verisini saklama
  const [orderData, setOrderData] = useState(null);

  const handleOrderSubmit = (data) => {
    setOrderData(data);
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/order">
            <OrderPizza onOrderSubmit={handleOrderSubmit} />
          </Route>
          <Route path="/success">
            <Success orderData={orderData} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
