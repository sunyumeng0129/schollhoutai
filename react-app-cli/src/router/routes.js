import App from '../App'
import Login from '../containers/user/login'
import Home from '../containers/user/Home'
import Carousel from '../containers/carousel/index.jsx'
import Upload from '../containers/user/Upload'
import Shop from '../containers/shop/Shop'
import Detail from '../containers/shop/Detail'
import Address from '../containers/comment/index'
import Search from '../containers/shop/Search'


export default [{
    path: '/app',
    name: 'App',
    component: App,
    children: [{
        path: '/app/carousel',
        name: 'Carousel',
        component: Carousel
    },
    {
        path: '/app/upload',
        name: 'Upload',
        component: Upload
    },
    {
        path:'/app/shop',
        name:'Shop',
        component:Shop
    },
    {
        path:'/app/address',
        name:'Address',
        component:Address
    },
    {
        path:'/app/search',
        name:"Search",
        component:Search
    },
    {
        path:'/app/detail:id',
        name:"Detail",
        component:Detail
    },
    ]
}, {
    path: '/user/login',
    name: 'Login',
    component: Login
},
{
    path: "/home",
    name: 'Home',
    component: Home,
},
]