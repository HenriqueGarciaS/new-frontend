import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import Container from '../components/container';
import Footer from '../components/footer';
import Header from '../components/HeaderHome/HeaderHome';
import Description from '../components/description';
import HowWork from '../components/work';


const App = ({children}) => (
    
    <BrowserRouter>        
        <Header/>
        <Container>
            {children}
        </Container>
        <Description/>
        <HowWork/>
        <Footer/>
    </BrowserRouter>
)

export default App;
