import { Header } from "./components/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Collection } from "./pages/Collection";
import { CollectionProvider } from "./components/CollectionProvider";

const App: React.FC = () => {
  return (
    <CollectionProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Navigate to="/" />} />

        <Route path="/collection" element={<Collection />} />
        <Route path="collection" element={<Navigate to="/collection" />} />

        <Route path="*" element={<h1 className="title">Page not found</h1>} />
      </Routes>
    </CollectionProvider>
  );
};

export default App;
