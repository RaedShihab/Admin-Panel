import React from 'react';
import * as Yup from 'yup';
import { withStyles } from '@material-ui/styles';
import { withTranslation } from "react-i18next";
import {Formik, Field} from 'formik'
import PropTypes from 'prop-types';
import { CircularProgress, Avatar, Typography} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Snackbar
} from '@material-ui/core';
import LayOut from '../../layOut';

const useStyles = (() => ({
  root: {
    flexGrow: 1,
  },
  details: {
    display: 'flex'
  },
  avatar: {
    // marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: 10
  },
  uploadButton: {
    marginRight: 10
  },
  input: {
    display: 'none',
  },
  form: {
    backgroundColor: 'white', borderRadius: 5, marginTop: 10
    },
    btn: {
      marginTop: 20, width: '25%'
    },
    margin: {
      marginTop: 15
    },
    TypographyMargin : {
      // margin: 40
    },
    deleteBtn: {
      margin: '0px 15px'
    }
}));

class AccountDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          openSnackSucc: false,
          showLoading: false,
          openSnackErr: false,
          selectedFile: null,
          icon: '',
          iconFile:{},
          cover: '',
          coverFile: {},
          banner: '',
          bannerFile: {},
          img: '',
          imgFile: {},
          checked: ''
        };
      }
      onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (e) => {
            console.log(document.getElementById('icon').files[0])
            this.setState({icon: e.target.result,
            iconFile: document.getElementById('icon').files[0]
            });
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      }
      onCoverChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.setState({cover: e.target.result,
            coverFile: document.getElementById('cover').files[0]
            });
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      }
      onCImgChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.setState({img: e.target.result,
            imgFile: document.getElementById('img').files[0]
            });
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      }
      onCBannerChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.setState({banner: e.target.result,
            bannerFile: document.getElementById('banner').files[0]
            });
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      }
      handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({
          openSnackSucc: false,
          openSnackErr:false,
          open500status:false,
          open422status: false 
        })
      };
     handleChange = event => {
        this.setState({checked:event.target.checked});
      };
    render() {

      // const FILE_SIZE = 160 * 1024;
      // const SUPPORTED_FORMATS = [
      //   "image/svg+xml"
      // ];        
        const { t ,classes, data} = this.props;
        console.log(data)
        return (
            <div
              // {...rest}
              // className={classes.root}
            >
            <Formik
                initialValues={{
                    name:data===undefined? '': data.name.en,
                    arname: data===undefined? '': data.name.ar,
                    description: data===undefined? '': data.description.en,
                    icon: data===undefined? this.state.iconFile : data.icon,
                    cover: data===undefined? this.state.coverFile : data.cover,
                    banner: data===undefined? this.state.bannerFile : data.banner,
                    img: data===undefined? this.state.imgFile : data.img,
                  }}
                  onSubmit={data => {
                    console.log(data)
                      let values = new FormData();
                      let myInt = this.state.checked ? 1 : 0;
                        values.append('name[en]', data.name);
                        values.append('name[ar]', data.arname);
                        // values.append('description', data.description);
                        values.append('parent', null);
                        values.append('icon', this.state.iconFile==={}? data.icon : this.state.iconFile);
                        values.append('media[cover]', this.state.coverFile==={}? data.cover : this.state.coverFile);
                        values.append('media[banner]', this.state.bannerFile==={}? data.banner : this.state.bannerFile);
                        values.append('media[image]', this.state.imgFile==={}? data.image : this.state.imgFile);
                        values.append('is_real_estate', myInt);
                        this.props.patch && values.append('_method', 'patch');
                    this.setState({
                      showLoading:true
                    })
                    console.log(values)
                this.props.requist(values)
                           .then(res =>{
                             console.log(res)
                             if(res.status === 201) {
                              console.log(res)
                              this.setState({
                                showLoading: false,
                                openSnackSucc: true,
                              })
                             }
                             if(res.status === 200) {
                              console.log(res)
                              this.setState({
                                showLoading: false,
                                openSnackSucc: true,
                              })
                             }
                           })
                           .catch(err => {
                             console.log(err.response)
                             if(err.response.status === 422) {
                              this.setState({
                                showLoading: false,
                                openSnackErr:true,
                              })
                             }
                             if(err.response.status === 500) {
                              console.log(err.response)
                              this.setState({
                                showLoading: false,
                                open500status:true,
                              })
                             }
                           })
                  }
                  }
                render={(props=> {
                    return <form
                    autoComplete="off"
                     noValidate
                      onSubmit={props.handleSubmit}
                           >
                             <LayOut>
                             <div className={classes.root}>
                                <Grid container spacing={3}>
                                  <Grid item xs={12}>
                                  <Card>
                                    <CardContent>
                                      <div className={classes.details}>
                                      <Avatar
                                          className={classes.avatar}
                                          src={this.state.cover}
                                        />
                                        <Typography
                                        className={classes.TypographyMargin}
                                        gutterBottom
                                        variant="h6"
                                      >
                                        {("cover")}
                                      </Typography>
                                      </div>
                                    </CardContent>
                                    <Divider />
                                    <CardActions>
                                    <input
                                      // helperText={(props.errors.file && props.touched.file) && props.errors.file}
                                      onChange={this.onCoverChange}
                                      accept="image/*"
                                      id="cover"
                                      multiple
                                      type="file"
                                      className={classes.input}
                                    />
                                    <label htmlFor="cover">
                                      <Button variant="contained" color="primary" component="span">
                                        Upload
                                      </Button>
                                    </label>
                                    {data !==undefined&&<Button className={classes.deleteBtn} variant="contained" color="secondary" component="span">
                                        delete
                                      </Button>}
                                    </CardActions>
                                  </Card>
                                </Grid> 
                                <div className={classes.root}>
                                <Grid item  xs={12}>
                                  <Card className={classes.margin}>
                                    <CardContent>
                                      <div className={classes.details}>
                                         {data !== undefined&&<Avatar
                                          className={classes.avatar}
                                          src={this.state.icon===''? data.icon: this.state.icon}
                                        />}
                                       {data === undefined && <Avatar
                                          className={classes.avatar}
                                          src={this.state.icon}
                                        />}
                                        <Typography
                                        className={classes.TypographyMargin}
                                        gutterBottom
                                        variant="h6"
                                      >
                                        {("icon")}
                                      </Typography>
                                      </div>
                                    </CardContent>
                                    <Divider />
                                    <CardActions>
                                    <input
                                      onChange={this.onImageChange}
                                      accept="image/*"
                                      id="icon"
                                      multiple
                                      type="file"
                                      className={classes.input}
                                    />
                                    <label htmlFor="icon">
                                      <Button variant="contained" color="primary" component="span">
                                        Upload
                                      </Button>
                                    </label>
                                    {data !==undefined&&<Button className={classes.deleteBtn} variant="contained" color="secondary" component="span">
                                        delete
                                      </Button>}
                                    </CardActions>
                                  </Card>
                                </Grid>
                                <Grid item  xs={12}>
                                  <Card className={classes.margin}>
                                    <CardContent>
                                      <div className={classes.details}>
                                      <Avatar
                                          className={classes.avatar}
                                          src={this.state.banner}
                                        />
                                        <Typography
                                        className={classes.TypographyMargin}
                                        gutterBottom
                                        variant="h6"
                                      >
                                        {("banner")}
                                      </Typography>
                                      </div>
                                    </CardContent>
                                    <Divider />
                                    <CardActions>
                                    <input
                                    name="file"
                                      onChange={this.onCBannerChange}
                                      accept="image/*"
                                      id="banner"
                                      multiple
                                      type="file"
                                      className={classes.input}
                                    />
                                    <label htmlFor="banner">
                                      <Button variant="contained" color="primary" component="span">
                                        Upload
                                      </Button>
                                    </label>
                                    {data !==undefined&&<Button className={classes.deleteBtn} variant="contained" color="secondary" component="span">
                                        delete
                                      </Button>}
                                    </CardActions>
                                  </Card>
                              </Grid>
                              <Grid item  xs={12}>
                                <Card className={classes.margin}>
                                    <CardContent>
                                      <div className={classes.details}>
                                      <Avatar
                                          className={classes.avatar}
                                          src={this.state.img}
                                        />
                                        <Typography
                                        className={classes.TypographyMargin}
                                        gutterBottom
                                        variant="h6"
                                      >
                                        {("image")}
                                      </Typography>
                                      </div>
                                    </CardContent>
                                    <Divider />
                                    <CardActions>
                                    <input
                                      onChange={this.onCImgChange}
                                      accept="image/*"
                                      id="img"
                                      multiple
                                      type="file"
                                      className={classes.input}
                                    />
                                    <label htmlFor="img">
                                      <Button variant="contained" color="primary" component="span">
                                        Upload
                                      </Button>
                                    </label>
                                    {data !==undefined&&<Button className={classes.deleteBtn} variant="contained" color="secondary" component="span">
                                        delete
                                      </Button>}
                                    </CardActions>
                                  </Card>
                                  </Grid>
                                    </div>
                                    <Grid item xs={9}>
                                    <Card className={classes.form}>
                              <CardHeader
                                      title={t("category_form")}
                                      />
                                      <Divider />
                                      <CardContent >
                                          <Grid
                                            container
                                            spacing={3}
                                          >
                                            <Grid
                                              item
                                              sm={6}
                                              xs={12}
                                            >
                                                <TextField
                                                defaultValue={data !== undefined? data.name.en : '' }
                                                fullWidth
                                                margin="dense"
                                                variant="outlined"
                                                label={("category_name")}
                                                name="name"
                                                onChange={props.handleChange}
                                                helperText={(props.errors.name && props.touched.name) && props.errors.name}
                                                />
                                            </Grid>
                                          <Grid
                                              item
                                              sm={6}
                                              xs={12}
                                            >
                                                <TextField
                                                 defaultValue={data!== undefined? data.name.ar : ''}
                                                label={("arabic_name")}
                                                name="arname"
                                                onChange={props.handleChange}
                                                fullWidth
                                                margin="dense"
                                                variant="outlined"
                                                helperText={(props.errors.arname && props.touched.arname) && props.errors.arname}
                                                />
                                            </Grid>
                                            <Grid
                                              item
                                              sm={12}
                                              xs={12}
                                            >
                                                <TextField
                                                defaultValue={data!== undefined? data.description.en : ''}
                                                label={("category_discription")}
                                                name="description"
                                                onChange={props.handleChange}
                                                fullWidth
                                                margin="dense"
                                                variant="outlined"
                                                helperText={(props.errors.description && props.touched.description) && props.errors.description}
                                                />
                                            </Grid>
                                          </Grid>
                                      </CardContent>
                                   </Card>
                                      <Button
                                      className={classes.btn}
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                        >
                                        {!this.state.showLoading&&t('done')}
                                        {this.state.showLoading&&<CircularProgress
                                          size={23}
                                        />}
                                        </Button>
                                        <FormControlLabel
                                        style={{marginLeft: 20}}
                                            control={
                                              <Checkbox checked={this.state.checked} onChange={this.handleChange} 
                                              value="primary"
                                              inputProps={{ 'aria-label': 'primary checkbox' }} />
                                            }
                                            label={t("is_it_a_real_estate")}
                                          />
                                    </Grid>
                                  </Grid>
                                  <div>
                                            <Snackbar
                                              autoHideDuration={3000}
                                              onClose={this.handleClose}
                                              open={this.state.openSnackSucc}
                                            >
                                              <Alert
                                                onClose={this.handleClose}
                                                severity="success"
                                                style={{backgroundColor: 'green', color: 'white'}}
                                              >
                                                {t(this.props.response)}
                                              </Alert>
                                            </Snackbar>
                                            <Snackbar
                                              autoHideDuration={3000}
                                              onClose={this.handleClose}
                                              open={this.state.openSnackErr}
                                            >
                                              <Alert
                                                onClose={this.handleClose}
                                                severity="error"
                                                style={{backgroundColor: 'red', color: 'white'}}
                                              >
                                                {t("please_add_svg_icon")}
                                              </Alert>
                                            </Snackbar>
                                            <Snackbar
                                                // autoHideDuration={10000}
                                                onClose={this.handleClose}
                                                open={this.state.open422status}
                                            >
                                                <Alert
                                                onClose={this.handleClose}
                                                severity="error"
                                                style={{backgroundColor: 'red', color: 'white'}}
                                                >
                                                {t("Country Name, Phone Code, ISO Code, Should be uniqe! ")}
                                                </Alert>
                                            </Snackbar>
                                            <Snackbar
                                                // autoHideDuration={10000}
                                                onClose={this.handleClose}
                                                open={this.state.open500status}
                                            >
                                                <Alert
                                                onClose={this.handleClose}
                                                severity="error"
                                                style={{backgroundColor: 'red', color: 'white'}}
                                                >
                                                {t("Server Error Please try again!")}
                                                </Alert>
                                            </Snackbar>
                                          </div>
                      </div>
                      </LayOut>
                    </form>
                  })}
                  validationSchema={Yup.object().shape({
                    name: Yup.string('Enter a name').required(t('countries/validations:name_is_required'))
                    .min(2, 'Seems a bit short...'),
                    arname: Yup.string('Enter a name').required(t('countries/validations:arabic_name_is_required'))
                    .min(2, 'Seems a bit short...'),
                    // description: Yup.string('Enter a description').required(t('countries/validations:description_is_required'))
                    // .min(2, 'Seems a bit short...'),
                    // file: Yup
                    //   .mixed()
                    //   .required("A file is required")
                    //   .test(
                    //     "fileSize",
                    //     "File too large",
                    //     value => value && value.size <= FILE_SIZE
                    //   )
                    //   .test(
                    //     "fileFormat",
                    //     "Unsupported Format",
                    //     value => value && SUPPORTED_FORMATS.includes(value.type)
                    //   )
                  })}
            />
            </div>
          );
    }  
};

AccountDetails.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(useStyles)(withTranslation(["categories/addUpdate", "countries/validations"])(AccountDetails));