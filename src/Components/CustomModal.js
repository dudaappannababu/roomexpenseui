import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import dayjs from 'dayjs';
import Checkbox from '@mui/material/Checkbox';
import Popper from '@mui/material/Popper';

import CustomDatePicker from './CustomDatePicker';
import CustomTimePicker from './CustomTimePicker';
import CustomDropDown from './CustomDropDown';
import "./CustomModal.css";


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
  // const handleClose = () => setOpen(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [splitForAB, setSplitForAB] = useState(false)
  const [splitForGS, setSplitForGS] = useState(false)
  const [splitForAJ, setSplitForAJ] = useState(false)
  const [splitForSJ, setSplitForSJ] = useState(false)

  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState(dayjs());
  const [amount, setAmount] = useState(null);
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState(null);
  const [paid_by, setPaidBy] = useState(null);
  const [AB, setAB] = useState(null);
  const [GS, setGS] = useState(null);
  const [AJ, setAJ] = useState(null);
  const [SJ, setSJ] = useState(null);
  const [for_room, setForRoom] = useState(true);
  

  const handleAdd = () => {
    const newExpense = {
      date: date.format("YYYY-MM-DD").toString(),
      time: time.format("HH:mm").toString(),
      amount: amount ? parseFloat(amount) : 0,
      category: category ? category : "",
      description: description ? description : "",
      paid_by: paid_by ? paid_by : "",
      AB: AB ? parseFloat(AB) : 0,
      GS: GS ? parseFloat(GS) : 0,
      AJ: AJ ? parseFloat(AJ) : 0,
      SJ: SJ ? parseFloat(SJ) : 0,
      for_room: for_room ? true : false
    };
    props.setCurrentExpense(newExpense);
    handleClose();
  };

  function handleClose() {
    setDate(dayjs());
    setTime(dayjs());
    setAmount(null);
    setCategory(null);
    setDescription(null);
    setPaidBy(null);
    setAB(null);
    setGS(null);
    setAJ(null);
    setSJ(null);
    setForRoom(true);
    setOpen(false);
    setOpenPopup(false);
  }

  function handleEqualSplit () {
    var splitMembers = [splitForAB, splitForGS, splitForAJ, splitForSJ];
    var splitCount = splitMembers.filter((member) => member).length;
    var splitAmount = amount/splitCount;
    setAB(splitForAB ? splitAmount : 0);
    setGS(splitForGS ? splitAmount : 0);
    setAJ(splitForAJ ? splitAmount : 0);
    setSJ(splitForSJ ? splitAmount : 0);
    setSplitForAB(false);
    setSplitForGS(false);
    setSplitForAJ(false);
    setSplitForSJ(false);
    setOpenPopup(false);
  }

  const handlePopUpClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenPopup(true);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add Expense</Button>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{zIndex: 900}}
      >
        <Box sx={style}>
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <h4>Enter expenses</h4>
                <Button onClick={handleClose}>X</Button>
            </div>
            <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
              <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
                <CustomDatePicker setDate={setDate} date={date} />
                <CustomTimePicker setTime={setTime} time={time} />
              </div>
                <TextField id="outlined-basic" label="Amount" variant="outlined" onChange={(e) => setAmount(e.target.value)}/>
              <div style={{display:"flex", gap:"10px"}}>
                <CustomDropDown setSelected={setCategory} data={["Rent", "Electricity", "Water", "Gas", "Internet", "Grocery", "Others"]} label="Category" selected={category} />
                <TextField id="outlined-basic" label="Description" variant="outlined" onChange={(e) => setDescription(e.target.value)}/>
              </div>
              <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
                <div style={{width:"100%"}}> 
                  <CustomDropDown setSelected={setPaidBy} data={["AB", "GS", "AJ", "SJ"]} label="Paid By" selected={paid_by} />
                </div>
                <Button variant="text" size='small' style={{height:"4vh", color: "gray", fontSize:"0.6rem"}} onClick={handlePopUpClick}>Split Equally For</Button>
                <Popper
                  sx={{ zIndex: 1000, top: "10px", left: "10px" }}
                  open={openPopup}
                  anchorEl={anchorEl}
                  placement={'right-start'}
                  transition
                >
                  <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                  <div style={{display:"flex"}}>
                    <Checkbox checked={splitForAB} onChange={(e) => setSplitForAB(e.target.checked)}  />
                    <p>AB</p>
                  </div>
                  <div style={{display:"flex"}}>
                    <Checkbox checked={splitForGS} onChange={(e) => setSplitForGS(e.target.checked)} />
                    <p>GS</p>
                  </div>
                  <div style={{display:"flex"}}>
                    <Checkbox checked={splitForAJ} onChange={(e) => setSplitForAJ(e.target.checked)} />
                    <p>AJ</p>
                  </div>
                  <div style={{display:"flex"}}>
                    <Checkbox checked={splitForSJ} onChange={(e) => setSplitForSJ(e.target.checked)} />
                    <p>SJ</p>
                  </div>
                  <Button onClick={handleEqualSplit}>Split</Button>
                  </Box>
                </Popper>

              </div>
              <div style={{display:"flex", gap:"10px"}}>
                <TextField id="outlined-number" label="AB" type="number" variant="outlined" value={AB} InputLabelProps={{ shrink: (AB !== null) }} onChange={(e) => setAB(e.target.value)}/>
                <TextField id="outlined-number" label="GS" type="number" variant="outlined" value={GS} InputLabelProps={{ shrink: (GS !== null) }} onChange={(e) => setGS(e.target.value)}/>
                <TextField id="outlined-number" label="AJ" type="number" variant="outlined" value={AJ} InputLabelProps={{ shrink: (AJ !== null) }} onChange={(e) => setAJ(e.target.value)}/>
                <TextField id="outlined-number" label="SJ" type="number" variant="outlined" value={SJ} InputLabelProps={{ shrink: (SJ !== null) }} onChange={(e) => setSJ(e.target.value)}/>
              </div>
              <div style={{display:"flex", alignItems:"center"}}>
                <Checkbox
                    checked={for_room}
                    onChange={(e) => setForRoom(e.target.checked)}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <label>For Room</label>
              </div>
            </div>
            <Button variant="contained" onClick={handleAdd}>Add</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default CustomModal;
