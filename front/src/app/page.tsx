import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import "./globals.css";
import OpeningShutter from './components/home/OpeningShutter';
import Popularproducts from './components/home/Popular-products';
import Featuredproducts from './components/home/Featured-products';
// import Categories from './components/Categories';
const HomePage = () => {

    return (
        <div className={`bg-gray-100`}>
            <OpeningShutter />
            <Header />
            <Popularproducts/>
            {/* <Categories/> */}
            <Featuredproducts/>
            <Footer />
        </div>
    );
};

export default HomePage;
