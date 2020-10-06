import React, { Component } from 'react'
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
export const menuConfig=[
    {
        key:'menu-1-1',
        title:'首页管理',
        icon:<MailOutlined/>,
        children:[
            {
                key:'menu-1-1-1',
                title:'轮播图管理',
                path:'/app/carousel',
                icon:<ContainerOutlined/>,
            },
            {
                key:'menu-1-1-2',
                title:'商品管理',
                path:'/app/shop',
                icon:<PieChartOutlined/>,
            },
            {
                key:'menu-1-1-3',
                title:'评论管理',
                path:'/app/address',
                icon:<PieChartOutlined/>,
            }
        ]
    },
    {
        key:'menu-1-2',
        title:'设置中心',
        icon:<AppstoreOutlined/>,
        children:[
            {
                key:'menu-1-2-1',
                title:'头像设置',
                path:'/app/upload',
                icon:<ContainerOutlined/>,
            },
            // {
            //     key:'menu-1-2-2',
            //     title:'商品管理',
            //     path:'/app/carousel',
            //     icon:<MailOutlined/>,
            // }
        ]
    },
]