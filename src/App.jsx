import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './layouts/Navbar';

import Home from './pages/Home';
import TaskApp from './apps/task-traker/TaskApp';
import WeatherApp from './apps/weather/WeatherApp';
import NotesApp from './apps/notes/NotesApp';
import ExpenseSplitter from './apps/splitter/Splitter';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskApp />} />
        <Route path="/weather" element={<WeatherApp />} />
        <Route path="/notes" element={<NotesApp />} />
        <Route path="/splitter" element={<ExpenseSplitter />} />
        
        {/* We'll add more later */}
        
        <Route path="/products" element={<div>Products Coming...</div>} />
      </Routes>
    </>
  )
}

export default App;
