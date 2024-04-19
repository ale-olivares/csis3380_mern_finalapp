import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import BookList from "./components/FrontPage_BookList";
import AddBook from './components/add_Book';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<BookList />} />
          <Route path='/create-book' element={<AddBook/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
