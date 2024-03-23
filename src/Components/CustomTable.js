import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function CustomTable(props) {

    function addExpensesInRows(expenses){
        return expenses.map((expense, index) => {
            return (
                <TableRow key={index}>
                    <TableCell component="th" scope="row">
                        {expense.date}
                    </TableCell>
                    <TableCell align="right">{expense.time}</TableCell>
                    <TableCell align="right">{expense.amount}</TableCell>
                    <TableCell align="right">{expense.category}</TableCell>
                    <TableCell align="right">{expense.description}</TableCell>
                </TableRow>
            );
        });
    }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" sx={{ maxWidth: "fit-content", margin: "auto" }}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">amount</TableCell>
            <TableCell align="right">category</TableCell>
            <TableCell align="right">description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {addExpensesInRows(props.expenses)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomTable;
