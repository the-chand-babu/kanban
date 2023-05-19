import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { useRecoilState } from 'recoil';
import { darkMode } from '../../recoil/atoms/Atoms';
import { Button } from '@mui/material';
// import Button from '@mui/material/Button';

export default function BasicPopover({openPop, changeTheme,setAnchorEl, anchorEl}) {
    const [darkModeOn, setDarkModeOn] = useRecoilState(darkMode)
    const [checked, setChecked] = React.useState(false);
    const id = open ? 'simple-popover' : undefined;

  const handleChange = (event) => {
    setChecked(event.target.checked);
    setDarkModeOn(!darkModeOn)
    // handleClosePop()
  };
  const handleClosePop = () => {
    setAnchorEl(null);
  };

 
  return (
    <div>
      <Popover
        id={id}
        open={openPop}
        anchorEl={anchorEl}
        onClose={handleClosePop}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
       
      >
        <Typography  sx={darkModeOn? {backgroundColor:"black", color:"white", p:2}: {p:2}}>
        <Button  variant ="contained" onClick={changeTheme}
                  sx={darkModeOn? {backgroundColor:"#707070", color:"white", marginBottom:"1rem"}: {backgroundColor:"white", color:"black",marginBottom:"1rem"}}>Change Theme</Button>
      
            <br/>
            <strong>Dark Mode</strong>
            <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />
        </Typography>
      </Popover>
    </div>
  );
}