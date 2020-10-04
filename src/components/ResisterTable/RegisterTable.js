import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import axios from "../../axios";
import moment from "moment";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function ResisterTable() {
  const classes = useStyles();

  const [works, setWorks] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/volunteers/all`)
      .then((res) => setWorks(res.data))
      .catch((err) => alert(err.message));
  }, []);

  const removeVolunteer = (id) => {
    axios
      .delete(`/api/volunteers/${id}`)
      .then((res) => {
        alert(res.data);
        window.location.reload(false);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="left">Registering Date</StyledTableCell>
            <StyledTableCell align="left">Volunteer List</StyledTableCell>
            <StyledTableCell align="left">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {works.map((work) => (
            <StyledTableRow key={work._id}>
              <StyledTableCell component="th" scope="row">
                {work.username}
              </StyledTableCell>
              <StyledTableCell align="left">{work.email}</StyledTableCell>
              <StyledTableCell align="left">
                {moment(work.date).format("L")}
              </StyledTableCell>
              <StyledTableCell align="left">
                {work.category.name}
              </StyledTableCell>
              <StyledTableCell align="left">
                <i
                  className="fas fa-trash-alt text-danger"
                  onClick={() => removeVolunteer(work._id)}
                ></i>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ResisterTable;
