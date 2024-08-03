import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductRoutes } from './routes/ProductRoutes';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      {ProductRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
            index={route.index}
          />
        ))}
      </Routes>
     </Router>
  );
};

export default App;
