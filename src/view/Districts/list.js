import React from 'react';
import { withTranslation } from "react-i18next";
import LayOut from '../../layOut';
import Table from '../table';
import ApiService from '../../services/apis'
 import 
 { 
  withStyles, 
  TableContainer, 
  Paper,
} from '@material-ui/core';

const useStyles = ({
  table: {
    minWidth: 700,
  },
  title: {
      padding: '10px 10px 10px 10px',
      margin: '0 10px',
      textAlign: 'center'
  }
});

class CustomizedTables extends React.Component {
  state= {
    users: [],
    open: false
  }
  columns = [
    { name: "id", label: "ID" },
    { name: "phone", label: "Phone" },
    { name: "label", label: "Name" },
    { name: "code", label: "Code" },
  ];
  render() {
    return(
      <LayOut>
        <TableContainer component={Paper}>
     <Table add={'District'} path={{update:'/districts-list/update-district/', add: '/districts-list/add-district/'}} fetch={ApiService.fetchCountries()} columns={this.columns} url={'https://jsonplaceholder.typicode.com/users/'}/>
    </TableContainer>
      </LayOut>
    );
  }
}
export default withStyles(useStyles)(withTranslation("usersTable")(CustomizedTables));