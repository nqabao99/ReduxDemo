import React from 'react';
import '../assets/style.scss';

import Header from '../layout/Header';
import Main from '../layout/Main';
import Footer from '../layout/Footer';



class HomePage extends React.Component {
    

    render() {
        return (
            <div className="home-page" >
                <Header/>
                <Main />
                <Footer />
            </div>
        )
    }
}

export default HomePage;