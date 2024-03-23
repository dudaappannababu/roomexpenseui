import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import dayjs from 'dayjs';

import CustomDatePicker from './CustomDatePicker';
import CustomTimePicker from './CustomTimePicker';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
//   width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function CustomModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState(dayjs());
  const [amount, setAmount] = useState(null);
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState(null);

  const handleAdd = () => {
    const newExpense = {
      date: date.format("YYYY-MM-DD"),
      time: time.format("HH:mm"),
      amount: amount,
      category: category,
      description: description,
    };
    props.setCurrentExpense(newExpense);
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add Expense</Button>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <h4>Enter expenses</h4>
                <Button onClick={handleClose}>X</Button>
            </div>
            <div>  
                <CustomDatePicker setDate={setDate} date={date} />
                <CustomTimePicker setTime={setTime} time={time} />
                <TextField id="outlined-basic" label="Amount" variant="outlined" onChange={(e) => setAmount(e.target.value)}/>
                <TextField id="outlined-basic" label="Category" variant="outlined" onChange={(e) => setCategory(e.target.value)}/>
                <TextField id="outlined-basic" label="Description" variant="outlined" onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <Button variant="contained" onClick={handleAdd}>Add</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default CustomModal;
