import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductRoutes } from './routes/ProductRoutes';
import LanguageSwitch from './components/LanguageSwitch/LanguageSwitch';

const App: React.FC = () => {
  return (
    <Router>
      <div>
      <LanguageSwitch />
      
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
      </div>
     </Router>
  );
};

export default App;
