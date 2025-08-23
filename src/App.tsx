import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

function App() {
  /* novo contêiner flex-col p/ empurrar o footer p/ o fim da tela */
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Header />

        {/* flex-1 ocupa todo o espaço restante entre header e footer */}
        <main className="flex-1 px-4 pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;
