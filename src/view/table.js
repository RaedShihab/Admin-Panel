import React from "react";
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import {Button, CircularProgress, IconButton, Avatar} from '@material-ui/core'
import CustomSearchRender from './OrderEdit';
import CustomToolbarSelect from './CustomSelectToolBar';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';

class App extends React.Component {
  state = {
    submitFilter: false,
    open: false,
    openAlert: false,
    page: 0,
    count: 100,
    data: [],
    searchText: ''
  };

  componentDidMount() {
    this.getData();
  }

  // get data
  getData = () => {
      this.props.fetch.then(res=>{ 
      this.setState({data: res})
      this.setState({isFetching: false})
    }
  )
    // this.xhrRequest().then(data => {
    //   this.setState({ data });
    // });
  };
  getDataBySearch = (data)=> {
    this.setState({open: true})
    axios.get(this.props.searchUrl, data).then(res=>{
      console.log('res1', res)
      this.setState({data:res.data})
      this.setState({open: false,
      })
    })
    .catch(err=> {
      this.setState({open: false,
        openAlert: true
        })
    })
  }
  // getFilterdData = ()=> {
  //   axios.get('https://jsonplaceholder.typicode.com/users').then(res=>{
  //     console.log('res2', res)
  //     this.setState({data:res.data})
  //   })
  // }
  // mock async function
  xhrRequest = () => {
    return new Promise((resolve, reject) => {
      const srcData = [
        ["Gabby George", "Business Analyst", "Minneapolis"],
        ["Aiden Lloyd", "Business Consultant", "Dallas"],
        ["Jaden Collins", "Attorney", "Santa Ana"],
        ["Franky Rees", "Business Analyst", "St. Petersburg"],
        ["Aaren Rose", "Business Analyst", "Toledo"]
      ];

      const maxRound = Math.floor(Math.random() * 2) + 1;
      const data = [...Array(maxRound)].reduce(
        acc => acc.push(...srcData) && acc,
        []
      );
      data.sort((a, b) => 0.5 - Math.random());

      setTimeout(() => {
        resolve(data);
      }, 250);
    });
  };

  changePage = page => {
    this.xhrRequest(`/myApiServer?page=${page}`).then(data => {
      this.setState({
        page: page,
        data
      });
    });
  };
  handleFilterSubmit = filterList => () => {
    this.setState({submitFilter: true})
    console.log('Submitting filters: ', filterList);
    axios.get(this.props.filterUrl, filterList).then(res=>{
      console.log(res)
      this.setState({
        submitFilter: false,
        data: res.data });
    })
    .catch(err=> {
      this.setState({open: false,
        openAlert: true,
        submitFilter: false,
        })
    })
  };
  render() {
    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({openAlert: false});
        };
    const { data, page, count } = this.state;
    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "stacked",
      searchText: this.state.searchText,
      serverSide: true,
      count: count,
      page: page,
      onFilterChange: (column, filterList, type) => {
        if (type === 'chip') {
          console.log('updating filters via chip');
          this.handleFilterSubmit(filterList)();
        }
      },
      customFilterDialogFooter: filterList => {
        return (
          <div style={{ marginTop: '40px' }}>
            {this.state.submitFilter&&<CircularProgress/>}
            {!this.state.submitFilter&&<Button variant="contained" onClick={this.handleFilterSubmit(filterList)}>Apply Filters</Button>}
          </div>
        );
      },
      onTableChange: (action, tableState) => {
        switch (action) {
          case "changePage":
            this.changePage(tableState.page);
            break;
        }
        switch (action) {
          case "delete":
            console.log(action)
            break;
        }
      },
      customSearchRender: (searchText, handleSearch, hideSearch, options) => {
        return (
          <CustomSearchRender
            searchText={searchText}
            onSearch={handleSearch}
            onHide={hideSearch}
            options={options}
            getDataBySearch={this.getDataBySearch}
          />
        );
      },
      customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
        <CustomToolbarSelect 
        data={this.state.data} 
        selectedRows={selectedRows} 
        displayData={displayData} 
        setSelectedRows={setSelectedRows} 
        path={this.props.path.update}
        />
      ),
    };
    return (
      <React.Fragment>
        {this.state.open&&<CircularProgress size='120px' style={{display: 'block', margin:'350px 440px'}}/>}
        {!this.state.open&&<MUIDataTable
        title={
          <Avatar>
            <IconButton
        href={this.props.path.add}
        >
          <AddIcon
           color="primary" variant="contained"
           >ADD USER</AddIcon>
        </IconButton>
          </Avatar>}
        data={data}
        columns={this.props.columns}
        options={options}
      />}
      <Snackbar open={this.state.openAlert} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                This is a error message!
            </Alert>
        </Snackbar>
      </React.Fragment>
    );
  }
}
export default App;
