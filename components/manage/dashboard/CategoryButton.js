import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const CustomButton = withStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
    alignItems: 'center',
    height: '26px',
    width: '26px',
    minWidth: 0,
    borderRadius: '100%',
    cursor: 'pointer',
    padding: 'none',
  },
})(Button);

export default function CategoryButton(props) {
  const {
    index,
    idCategory,
    name,
    baseColor,
    colorChange,
    handleClick,
  } = props;

  return (
    <div>
      <CustomButton
        style={{ backgroundColor: colorChange }}
        onClick={() => handleClick(index, idCategory, name, baseColor)}
      >
        <InfoOutlinedIcon />
      </CustomButton>
      {name}
    </div>
  );
}
