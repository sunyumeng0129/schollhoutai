import React from 'react'
import RouterMap from './map'
import Routes from './routes'


const RouterView = function (props) {
  const routes = props.routes ? props.routes : Routes
  return <RouterMap routes={routes} {...props}></RouterMap>
}

export default RouterView;