import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";

@withRouter
class LeftBar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      collapsed: false,
      theme: "dark",
      openKeys: [],
      selectedKeys: []
    };
  }
  componentDidMount() {
    // 防止页面刷新侧边栏又初始化了
    const pathname = this.props.location.pathname;
    //获取当前所在的目录层级
    const splitPathname = pathname.split("/");
    switch (splitPathname.length) {
      case 2: //一级目录
        this.setState({
          selectedKeys: [pathname]
        });
        break;
      case 5: //三级目录，要展开两个subMenu
        this.setState({
          selectedKeys: [pathname],
          openKeys: [
            splitPathname.slice(0, 3).join("/"),
            splitPathname.slice(0, 4).join("/")
          ]
        });
        break;
      default:
        this.setState({
          selectedKeys: [pathname],
          openKeys: [pathname.substr(0, pathname.lastIndexOf("/"))]
        });
    }
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  onOpenChange = openKeys => {
    //此函数的作用只展开当前父级菜单（父级菜单下可能还有子菜单）
    if (openKeys.length === 0 || openKeys.length === 1) {
      this.setState({
        openKeys
      });
      return;
    }

    //最新展开的菜单
    const latestOpenKey = openKeys[openKeys.length - 1];
    //判断最新展开的菜单是不是父级菜单，若是父级菜单就只展开一个，不是父级菜单就展开父级菜单和当前子菜单
    //因为我的子菜单的key包含了父级菜单，所以不用像官网的例子单独定义父级菜单数组，然后比较当前菜单在不在父级菜单数组里面。
    //只适用于3级菜单
    if (latestOpenKey.includes(openKeys[0])) {
      this.setState({
        openKeys
      });
    } else {
      this.setState({
        openKeys: [latestOpenKey]
      });
    }
  };

  clickMenu = (key) => {
    this.setState({ selectedKeys: [key] })
    localStorage.setItem('prevPage', key)
  }

  rendMenuItem = menu => {
    return (
      <Menu.Item key={menu.key}>
        <Link to={menu.key}>
          {menu.icon && <Icon type={menu.icon} />}
          <span>{menu.title}</span>
        </Link>
      </Menu.Item>
    );
  };

  rendSubMenuItem = menu => {
    return (
      <Menu.SubMenu
        key={menu.key}
        title={
          <span>
            {menu.icon && <Icon type={menu.icon} />}
            <span>{menu.title}</span>
          </span>
        }
      >
        {menu.childList &&
          menu.childList.map(item => {
            return item.childList && item.childList.length > 0
              ? this.rendSubMenuItem(item)
              : this.rendMenuItem(item);
          })}
      </Menu.SubMenu>
    );
  };

  render() {
    const { theme, openKeys, selectedKeys } = this.state;
    const menus = JSON.parse(localStorage.getItem('menus'))
    return (
      <Menu
        theme={theme}
        onOpenChange={this.onOpenChange}
        onClick={({ key }) => this.clickMenu(key)}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        mode="inline"
      >
        {menus.map(menu => {
          return menu.childList && menu.childList.length > 0
            ? this.rendSubMenuItem(menu)
            : this.rendMenuItem(menu);
        })}
      </Menu>
    );
  }
}

export default LeftBar;
