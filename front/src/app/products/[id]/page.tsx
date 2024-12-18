'use client';
import Header from '@/app/components/header/Header';
import Footer from '@/app/components/footer/Footer';
import Reviews from '@/app/components/product/Reviews';
import Relat from '../../components/product/Relat';
import Buy from '@/app/components/product/Buy';
import "../../globals.css";


const ProductDetailPage = () => {

    return (
        <div>
            <Header/>
            <Buy/>
            <Reviews/>
            <Relat/>
            <Footer/>
        </div>
    );
};

export default ProductDetailPage;
