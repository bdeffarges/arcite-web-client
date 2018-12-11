import React, { Component } from 'react';
import radium from 'radium';

import styles from '../../styles';
import { Paper } from './paper';
import { FAIcon } from './icon';

const getCloseMenuItem = (handler, style) => (<li key="close" style={style}><FAIcon icon="act-times" onClick={handler} /></li>);
const getCollapseMenuItem = (collapsed, handler, style) => (<li key="collapse" style={style}><FAIcon icon={collapsed ? 'act-caret-up' : 'act-caret-down'} onClick={handler} /></li>);
const getIconComponent = (icon, style) => {
  if (icon) {
    return (
      <i className={`fa ${icon}`} style={style} />
    );
  }
  return '';
};
const PanelBaseComponent = ({
  children,
  title,
  icon,
  subtitle,
  collapsable,
  closable,
  closed,
  collapsed,
  height = 'inherit',
  m = [0],
  toggleClose,
  toggleCollapse,
  ...props
}) => {
  const mainColor = styles.darken(styles.variables.color.secondaryColor, 3 / 2);
  const titleFont = styles.getFontSize(5);
  const sx = {
    container: {
      display: closed ? 'none' : null,
    },
    header: {
      position: 'relative',
      ...titleFont,
      borderBottom: `1px solid ${styles.alpha(mainColor)(1 / 4)}`,
      color: mainColor,
    },
    title: {
      display: 'inline-block',
      fontWeight: styles.variables.type.bold,
      textTransform: 'uppercase',
    },
    subtitle: {
      display: 'inline-block',
      color: styles.alpha(styles.variables.type.baseColor)(1 / 2),
      ...styles.getFontSize(6),
      ...styles.getLineHeight(6),
      ...styles.getMarginLeft(4),
    },
    icon: {
      ...titleFont,
      ...styles.getPaddingRight(1),
    },
    menu: {
      display: 'inline-block',
      listStyle: 'none',
      position: 'absolute',
      top: 0,
      right: 0,
    },
    menuItem: {
      display: 'inline-block',
      cursor: 'pointer',
      color: styles.alpha(styles.variables.type.baseColor)(1 / 2),
      ':hover': {
        color: mainColor,
      },
    },
    content: {
      height: collapsed ? '0' : null,
      overflow: 'hidden',
      ...styles.getPaddingTop(collapsed ? 1 : 4),
      ...styles.getFontSize(6),
    },
  };
  // Properties
  const panelHeight = collapsed ? null : height;

  // Components
  const iconComponent = getIconComponent(icon, sx.icon);
  const menuItems = [];
  if (collapsable) {
    menuItems.push(getCollapseMenuItem(collapsed, toggleCollapse, sx.menuItem));
  }
  if (closable) {
    menuItems.push(getCloseMenuItem(toggleClose, sx.menuItem));
  }

  // Render
  return (
    <Paper {...props} m={m} p={[2, 4]} height={panelHeight} style={sx.container}>
      <div style={sx.header}>
        {iconComponent}
        <div style={sx.title}>
          {title}
        </div>
        <div style={sx.subtitle}>
          {subtitle}
        </div>
        <ul style={sx.menu}>
          {menuItems}
        </ul>
      </div>
      <div style={sx.content}>
        {children}
      </div>
    </Paper>
  );
};

PanelBaseComponent.propTypes = {
  children: React.PropTypes.node,
  title: React.PropTypes.string.isRequired,
  icon: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.string]),
  subtitle: React.PropTypes.string,
  collapsable: React.PropTypes.bool,
  closable: React.PropTypes.bool,
  closed: React.PropTypes.bool,
  collapsed: React.PropTypes.bool,
  height: React.PropTypes.string,
  m: React.PropTypes.arrayOf(React.PropTypes.number),
  toggleClose: React.PropTypes.func,
  toggleCollapse: React.PropTypes.func,
};

const PanelBase = radium(PanelBaseComponent);

const Panel = props => (<PanelBase {...props} />);

// -----------------------------------------------------------------------------
// Panel HOC
// -----------------------------------------------------------------------------
class PanelComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closed: false,
      collapsed: false,
    };
    this.toggleClose = this.toggleClose.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  toggleClose() {
    const newState = { ...this.state };
    newState.closed = !newState.closed;
    this.setState(newState);
  }

  toggleCollapse() {
    const newState = { ...this.state };
    newState.collapsed = !newState.collapsed;
    this.setState(newState);
  }

  render() {
    return (
      <Panel
        {...this.props}
        closed={this.state.closed}
        collapsed={this.state.collapsed}
        toggleClose={this.toggleClose}
        toggleCollapse={this.toggleCollapse}
      />
    );
  }
}

export {
  Panel,
  PanelComponent,
};
