import React , {Suspense} from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './auth/Helpers/history';
import { alertActions } from './auth/Actions/alertAction';
import { PrivateRoute } from './auth/Components/privateRoutes';
import { HomePage } from './auth/HomePage/homePage';

import UserTable from './view/userList/list';
import Adduser from './view/userList/add';
import UserUpdate from './view/userList/update';

import PosteTable from './view/posts/list';
import AddPost from './view/posts/add';
import updatePost from './view/posts/update';

import AddCountry from './view/countries/add';
import UpdateCountry from './view/countries/update';
import CountriesTable from './view/countries/list';

import AddCity from './view/Cities/add'
import UpdateCity from './view/Cities/update'
import CitiesList from './view/Cities/list';

import AddDistric from './view/Districts/add';
import UpdateDistrict from './view/Districts/update'
import DistrictsList from './view/Districts/list';

import AddCategory from './view/categories/add';
import updateCategory from './view/categories/update';
import CategoriesList from './view/categories/list';

import AddBrand from './view/brand/add';
import updateBrand from './view/brand/update';
import brandList from './view/brand/list';

import AddModel from './view/models/add';
import updateModel from './view/models/update';
import ModeslList from './view/models/list';

import AddPackage from './view/ads/pakcages/add';
import updatePackage from './view/ads/pakcages/update';
import PakcagesList from './view/ads/pakcages/list';

import LoginPage from './auth/LoginPage/loginPage';

import theme from './theme';
import { ThemeProvider } from '@material-ui/styles';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <ThemeProvider theme={theme}>
                <Suspense fallback={(<div>Loading</div>)}>
                 <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <Route exact path="/" component={HomePage} />
                                <Route exact path="/dashboard" component={HomePage} />

                                <Route exact path="/users" component={UserTable} />
                                <Route exact path="/users/add-user" component={Adduser} />
                                <Route exact path="/users/update/:id" component={UserUpdate} />
                                
                                <Route exact path="/posts/add-post" component={AddPost} />
                                <Route exact path="/posts/update/:id" component={updatePost} />
                                <Route exact path="/posts" component={PosteTable} />

                                <Route exact path="/countries/create" component={AddCountry} />
                                <Route exact path="/countries/edit/:id" component={UpdateCountry} />
                                <Route exact path="/countries" component={CountriesTable} />

                                <Route exact path="/cities/create" component={AddCity} />
                                <Route exact path="/cities/edit/:id" component={UpdateCity} />
                                <Route exact path="/cities" component={CitiesList} />

                                <Route exact path="/districts/create" component={AddDistric} />
                                <Route exact path="/districts/district/:id" component={UpdateDistrict} />
                                <Route exact path="/districts" component={DistrictsList} />

                                <Route exact path="/categories/create" component={AddCategory} />
                                <Route exact path="/categories/category/:id" component={updateCategory} />    
                                <Route exact path="/categories" component={CategoriesList} />

                                <Route exact path="/brands/create" component={AddBrand} />
                                <Route exact path="/brands/brand/:id" component={updateBrand} />    
                                <Route exact path="/brands" component={brandList} />

                                <Route exact path="/models/create" component={AddModel} />
                                <Route exact path="/models/model/:id" component={updateModel} />    
                                <Route exact path="/models" component={ModeslList} />

                                <Route exact path="/packages/create" component={AddPackage} />
                                <Route exact path="/packages/package/:id" component={updatePackage} />    
                                <Route exact path="/packages" component={PakcagesList} />

                                <Route path="/login" component={LoginPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
            </Suspense>
            </ThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 