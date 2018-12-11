import React from 'react';
import radium from 'radium';

function getMenuItems() {

}

function getMobileMenuItems() {

}

const AppBarComponent = ({
  title,
  logo,
  ...props
}) => {
  const sx = {
    container: {},
  };

  const menuItems = getMenuItems(sx.menuItem);
  const mobileMenuItems = getMobileMenuItems(sx.mobileMenuItem);
  return (
    <div {...props} style={sx.container}>
      <div>
        <h1 style={sx.title}>{title}</h1>
        <span style={sx.logo}>{logo}</span>
      </div>
      <nav style={sx.menu}>
        {menuItems}
      </nav>
      <nav style={sx.mobile}>
        {mobileMenuItems}
      </nav>
    </div>
  );
};

AppBarComponent.propTypes = {
  title: React.PropTypes.string,
  logo: React.PropTypes.string,
};

export const AppBar = radium(AppBarComponent);

export default {
  AppBar,
};
