import React, { Component } from 'react'
import { connect } from "dva"
import Layout from './components/layout'
import RouterViews from './router/index'

@connect((store) => store)
class App extends Component {

    render() {
        const { history, routes } = this.props
        return (
            <Layout>
                <RouterViews history={history} routes={routes}></RouterViews>
            </Layout>
        )
    }
}
export default App