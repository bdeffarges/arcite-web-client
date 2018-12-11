import React from 'react';
import radium from 'radium';
import SpinKitSpinner from 'react-spinkit';

const SpinnerComponent = () => {
  const sx = {
    container: {
      position: 'fixed',
      top: '50%',
      left: '50%',
    },
  };
  return (
    <div className="loader" style={sx.container}>
      <div>
        <SpinKitSpinner spinnerName="chasing-dots" style={sx.item} />
      </div>
    </div>
  );
};

const Spinner = radium(SpinnerComponent);

export default Spinner;
