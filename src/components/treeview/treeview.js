import React, { Component } from 'react';

import radium from 'radium';
import dimensions from 'react-dimensions';
import * as d3 from 'd3';

import styles from '../../styles';
import { getPalette } from '../../utils/color_utils';

const circleRadius = 20;
const padding = 5;
const arrowDim = 5;

const TreeNode = ({ data, colors, onSelect }) => {
  const id = data.data.id;
  const label = data.data.name;
  const labelUpper = label.toUpperCase();
  const letter = labelUpper.substr(0, 1);
  const color = colors[data.data.nodeType || 0].hex();
  const style = {
    container: {
      cursor: 'pointer',
    },
    circle: {
      fill: data.data.selected ?
        styles.brighten(color, 1) :
        color,
      stroke: styles.darken(color, 1),
      strokeWidth: data.data.selected ? 2 : 1,
    },
    label: {
      fill: 'white',
    },
  };

  const handleMouseOver = (e) => {
    const currentLabel = d3.select(e.currentTarget).attr('data-label');
    let labelWidth = 150;
    const labelPadding = 5;
    const g = d3.select(e.currentTarget)
      .append('g')
      .attr('class', 'infoLabel')
      .attr('transform', 'translate(0, 50)');

    // Add dummy label to figure out width (and remove just after displaying)
    g.selectAll('.dummyText')
      .data([currentLabel])
      .enter()
      .append('text')
      .text(d => d)
      .each(function grab() {
        labelWidth = (2 * labelPadding) + this.getComputedTextLength();
        this.remove();
      });

    g.append('rect')
      .attr('width', labelWidth)
      .attr('height', 30)
      .attr('fill', 'rgba(255,255,255,0.8)')
      .attr('stroke', 'rgba(0,0,0,0.8)')
      .attr('rx', '2')
      .attr('ry', '2')
      .attr('strokeWidth', '1')
      .attr('transform', `translate(${-labelWidth / 2}, -21)`);

    g.append('text')
      .text(currentLabel)
      .attr('text-anchor', 'middle');
  };

  const handleMouseOut = (e) => {
    d3.select(e.currentTarget).selectAll('.infoLabel').remove();
  };

  const handleClick = (e) => {
    onSelect(d3.select(e.currentTarget).attr('data-key'));
  };

  const radius = data.data.dimmed ? circleRadius - 5 : circleRadius;
  return (
    <g
      transform={`translate(${data.x}, ${data.y})`}
      style={style.container}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      data-label={label}
      data-key={id}
    >
      <circle r={radius} style={style.circle} />
      <text textAnchor="middle" transform="translate(0, 6)" style={style.label}>{letter}</text>
    </g>
  );
};

TreeNode.propTypes = {
  data: React.PropTypes.object,
  colors: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onSelect: React.PropTypes.func,
};

const TreeEdge = ({ data }) => {
  const baseColor = styles.variables.type.baseColor;
  const sx = {
    stroke: baseColor,
    strokeWidth: '2px',
  };

  const length = Math.sqrt(
    ((data.x - data.parent.x) * (data.x - data.parent.x)) +
    ((data.y - data.parent.y) * (data.y - data.parent.y))
  );
  const dX = data.x - data.parent.x;
  const arrowHeight = 1.6 * arrowDim;
  const angle = (180 * Math.asin(dX / (length))) / Math.PI;
  return (
    <g
      transform={`translate(${data.parent.x}, ${data.parent.y}) rotate(${angle})`}
    >
      <path
        d={`M 0,0 L0,${length}`}
        style={sx}
      />
      <path
        d={`M ${-arrowDim},${length - arrowHeight - circleRadius} L${arrowDim},${length - arrowHeight - circleRadius} L0,${length - circleRadius} Z`}
        style={sx}
      />
    </g>
  );
};


TreeEdge.propTypes = {
  data: React.PropTypes.object,
};

const Tree = ({ data, colors, onNodeSelect }) => (
  <g>
    <g>
      {data.descendants().slice(1).map(d => <TreeEdge key={`${d.data.id}`} data={d} />)}
      {data.descendants().map(d => <TreeNode key={`${d.data.id}`} data={d} onSelect={onNodeSelect} colors={colors} />)}
    </g>
  </g>
);

Tree.propTypes = {
  data: React.PropTypes.object,
  colors: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onNodeSelect: React.PropTypes.func,
};

class TreeViewComponent extends Component {

  componentWillMount() {
    this.colorPalette = getPalette(12);
  }

  render() {
    const { data, resolveId, resolveParentId, containerWidth, onNodeSelect } = this.props;
    const margin = {
      top: 0,
      right: 0,
      bottom: 50,
      left: 0,
    };

    const root = d3.stratify().id(resolveId).parentId(resolveParentId)(data);
    d3.tree().nodeSize([80, 80])(root);
    let minX = 0;
    let minY = 0;
    let maxX = 0;
    let maxY = 0;

    root.descendants().forEach((d) => {
      if (d.x < minX) {
        minX = d.x;
      }
      if (d.x > maxX) {
        maxX = d.x;
      }
      if (d.y < minY) {
        minY = d.y;
      }
      if (d.y > maxY) {
        maxY = d.y;
      }
    });

    let neededWidth = (maxX - minX) + (2 * circleRadius) + (2 * padding);
    let neededHeight = (maxY - minY) + (2 * circleRadius) + (2 * padding);
    const viewBoxOffsetX = (minX - circleRadius - padding) + margin.left;
    const viewBoxOffsetY = (minY - circleRadius - padding) + margin.top;
    const svgWidth = containerWidth - margin.left - margin.right;
    const svgHeight = (svgWidth * (neededHeight / neededWidth)) - (margin.top + margin.bottom);

    if (neededWidth < svgWidth) {
      neededWidth = svgWidth;
    }

    if (neededHeight < svgHeight) {
      neededHeight = svgHeight;
    }
    const sx = {
      svg: {
        overflow: 'visible',
      },
    };

    return (
      <svg
        style={sx.svg}
        width={svgWidth}
        height={svgHeight}
        viewBox={`${viewBoxOffsetX} ${viewBoxOffsetY} ${neededWidth} ${neededHeight}`}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <Tree
            data={root}
            colors={this.colorPalette}
            onNodeSelect={onNodeSelect}
          />
        </g>
      </svg>
    );
  }
}

TreeViewComponent.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  containerWidth: React.PropTypes.number,
  resolveId: React.PropTypes.func.isRequired,
  resolveParentId: React.PropTypes.func.isRequired,
  onNodeSelect: React.PropTypes.func,
};

const TreeViewResponsive = dimensions({
  elementResize: true,
})(TreeViewComponent);

export const TreeView = radium(TreeViewResponsive);

export default {
  TreeView,
};
