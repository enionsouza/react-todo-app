import { BrowserRouter as Router } from 'react-router-dom';
import TodoContainer from './components/TodoContainer';
import './App.css';

function App() {
  return (
    <Router>
      <TodoContainer />
    </Router>
  );
}

export default App;
