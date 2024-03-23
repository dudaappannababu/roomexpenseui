import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

 function CustomDropDown(props) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    // setAge(event.target.value);
    props.setSelected(event.target.value);
  };

  function addoptions(options) {
    return options.map((option) => {
      return <MenuItem value={option}>{option}</MenuItem>;
    });
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.selected}
          label={props.label}
          onChange={handleChange}
        >
            {addoptions(props.data)}
        </Select>
      </FormControl>
    </Box>
  );
}

export default CustomDropDown;
