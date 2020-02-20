import React from 'react';
import { withTranslation } from "react-i18next";
import LayOut from '../../layOut';
import Table from '../table';
import {Axios} from '../axiosConfig';
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
    countries: [],
    open: false
  }
  Axios = Axios.get('/countries')
  render() {
    return(
      <LayOut>
        <TableContainer component={Paper}>
     <Table
     deleteURL={'/countries'}
     Axios = {this.Axios}
     add={'COUNTRY'} 
     path={{update:'/countries/edit/', add: '/countries/create'}} 
     column={"countries"}
     />
    </TableContainer>
      </LayOut>
    );
  }
}
export default withStyles(useStyles)(withTranslation(["countries/list", "translation"])(CustomizedTables));