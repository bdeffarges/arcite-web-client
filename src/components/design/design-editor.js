import React from 'react';
import radium from 'radium';

import Design from '../../model/design';

import FileUploadForm from './file-upload-form';
import { HorizontalGrid, GridColumn } from '../uikit/grid';

import styles from '../../styles';

const gridWidth = '16rem';

function renderMainMenu(props) {
  const { setDesignEditorMode, invert } = props;
  const baseColor = styles.getBaseColor(invert);
  const sx = {
    container: {
      position: 'relative',
      textAlign: 'center',
    },
    item: {
      position: 'relative',
      top: '50%',
      left: '50%',
      transform: 'translateX(-50%) translateY(-50%)',
      background: styles.alpha(baseColor)(1 / 8),
      border: `1px solid ${styles.alpha(baseColor)(1 / 4)}`,
      borderRadius: styles.variables.space.borderRadius,
      ...styles.getPadding(8),
      height: '100%',
      width: '100%',
      verticalAlign: 'middle',

    },
    button: {
      border: 'none',
      background: 'none',
    },
  };
  return (
    <div style={sx.container}>
      <HorizontalGrid horizontalAlign="space-around">
        <GridColumn minWidth={gridWidth} maxWidth={gridWidth} minHeight={gridWidth}>
          <div style={sx.item}>
            Drop File
          </div>
        </GridColumn>
        <GridColumn minWidth={gridWidth} maxWidth={gridWidth} minHeight={gridWidth}>
          <div style={sx.item}>
            <button style={sx.button} onClick={() => setDesignEditorMode('designer')}>
                Enter Designer
            </button>
          </div>

        </GridColumn>

      </HorizontalGrid>
    </div>
  );
}

renderMainMenu.propTypes = {
  setDesignEditorMode: React.PropTypes.func.isRequired,
  invert: React.PropTypes.func.bool,
};

// function renderFileUpload(props) {
//   return <div>FileUpload</div>
// }
//
// function renderDesigner() {
//   return (
//     <div>
//       Designer....
//     </div>
//   );
// }

const DesignEditorComponent = (props) => {
  const sx = {};
  return (
    <div style={sx.container}>
      <FileUploadForm {...props} />
    </div>
  );
};

DesignEditorComponent.propTypes = {
  design: React.PropTypes.instanceOf(Design),
  uploadDesign: React.PropTypes.func.isRequired,
  // mode: React.PropTypes.string.isRequired,
  // setDesignEditorMode: React.PropTypes.func,
};

const DesignEditor = radium(DesignEditorComponent);

export default DesignEditor;
