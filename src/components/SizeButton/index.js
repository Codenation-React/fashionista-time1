import React from 'react';

const SizeButton = ({ disabled, size, onClickHandler }) => {
  return (
    <button
      onClick={() => onClickHandler(size)}
    >
      {size}
    </button>
  );
};

export default SizeButton;
