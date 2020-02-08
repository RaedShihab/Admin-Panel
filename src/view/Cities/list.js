import React from 'react';
import { withTranslation } from "react-i18next";
import LayOut from '../../layOut';
import CountriesTable from '../table'
 import 
 {
  withStyles, 
  TableContainer, 
  Paper,
} from '@material-ui/core';
import ApiService from '../../services/apis'

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
     <CountriesTable 
     add={'CITY'} 
     path={{update:'/cities-list/update-city/', add: '/cities-list/add-city'}} 
     fetch={ApiService.fetchCountries()} 
     columns={this.columns} 
     url={'https://jsonplaceholder.typicode.com/users/'}
     searchUrl={'https://jsonplaceholder.typicode.com/cuntries/'}
     filterUrl={'https://jsonplaceholder.typicode.com/ocuntries/'}
     />
    </TableContainer>
      </LayOut>
    );
  }
}
export default withStyles(useStyles)(withTranslation("usersTable")(CustomizedTables));