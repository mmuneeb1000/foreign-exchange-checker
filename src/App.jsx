import Header from "./components/Header";
import Footer from "./components/Footer";
import Live from "./components/Live";
import ToggleBar from "./components/ToggleBar";
import Converter from "./components/Converter";

function App() {
  return (
    <>
      <Header />
      <Live />
      <main className="px-4 py-8">
        <Converter />
        <ToggleBar />
      </main>
      <Footer />
    </>
  );
}

export default App;
