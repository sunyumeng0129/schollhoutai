import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import Slider from '../slider/index'

import '../../css/layout.scss';


class Layout extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <section className='context'>
                    <Slider>{this.props.children}</Slider>
                </section>
                {/* <Footer></Footer> */}
            </div>
        )
    }
}
export default Layout;