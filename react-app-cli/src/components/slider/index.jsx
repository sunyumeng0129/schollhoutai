import React, { Component } from 'react'

import { NavLink } from 'dva/router'

import { Menu } from 'antd';

import { menuConfig } from '../../config/index.jsx'
const { SubMenu } = Menu;



class Slider extends Component {

    state = {
        collapsed: false,
    };
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <div className='slider-wraper'>
                <div className="slider-left">

                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="light"
                        inlineCollapsed={this.state.collapsed}
                    >
                        {
                            menuConfig.map(menu => {
                                return <SubMenu key={menu.key} title={menu.title} icon={menu.icon}>
                                    {
                                        menu.children && menu.children.map((subMenu) => {
                                            return <Menu.Item key={SubMenu.key}>
                                                <NavLink to={subMenu.path}>{subMenu.title}</NavLink>
                                            </Menu.Item>
                                        })
                                    }
                                  
                                </SubMenu>
                            })
                        }
                    </Menu>
                </div>
                <div className="slider-right">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Slider
