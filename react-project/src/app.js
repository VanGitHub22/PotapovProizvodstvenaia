import Header from './components/Header';
import Intro from './components/Intro';
import OurProducts from './components/OurProducts';
import OurServices from './components/OurServices';
import Builds from './components/Builds';
import Transfer from './components/Transfer';
import AboutUs from './components/AboutUs';
import WhyUs from './components/WhyUs';
import Footer from './components/Footer';
import './App.css'; 

const App = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Intro />
        <OurProducts />
        <OurServices />
        <Builds />
        <Transfer />
        <AboutUs />
        <WhyUs />
      </main>
      <Footer />
    </div>
  );
};

export default App;