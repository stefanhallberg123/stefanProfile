import "./App.css";
import { Routes, Route } from "react-router-dom"
import Gallery from "./components/gallery/gallery";
import SingleProfile from "./components/gallery/singleProfile/singleProfile";
import CreateProfile from "./components/createProfile/createProfile";

function App() {
  return (
    <div className="App">
    <Routes>
        <Route path="/createProfile" element={ <CreateProfile/> } />
        <Route exact={true} path="/profile/:id" element={ <SingleProfile/> } />
        <Route path="/" element={ <Gallery/> } />
      </Routes>
      </div>
  );
}

export default App;
