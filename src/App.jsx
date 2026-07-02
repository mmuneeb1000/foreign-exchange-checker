import Header from "./components/Header";
import Footer from "./components/Footer";
import Live from "./components/Live";
import TabsBar from "./components/TabsBar";
import Converter from "./components/Converter";

function App() {
  return (
    <>
      <Header />
      <Live />
      <main className="px-4 py-8">
        <Converter />
        <TabsBar />
      </main>
      <Footer />
    </>
  );
}

export default App;
