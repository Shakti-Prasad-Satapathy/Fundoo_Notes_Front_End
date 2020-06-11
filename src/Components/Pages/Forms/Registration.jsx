import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import './Form.css'
import { ToastContainer, toast } from 'react-toastify';


export default class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: "",
      error: false
    }
  }

  onChangename = (e) => {
    var name = e.target.value;
    this.setState({
      name: name,
      error: false
    })
  }
  onChangeEmail = (e) => {
    var email = e.target.value;
    this.setState({
      email: email,
      error: false
    })
  }
  onChangePassword = (e) => {
    var password = e.target.value;
    this.setState({
      password: password,
      error: false
    })
  }
  onChangeConfirmPassword = (e) => {
    var confirmPassword = e.target.value;
    this.setState({
      confirmPassword: confirmPassword,
      error: false
    })
  }

  handleSubmit = () => {
    if (this.state.name === "" || this.state.email === "" || this.state.password === "" || this.state.confirmPassword === "") {
      this.setState({
        error: true
      })
      console.log("ssssssss",this.state.error);
    }
    else {
      var regDetails = {
        'name': this.state.name,
        'email': this.state.email,
        'password': this.state.password,

      }
      this.registerUser(regDetails)
    }
  }
  registerUser(regDetails) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(regDetails)
    };
    fetch(process.env.REACT_APP_HOST + '/register', requestOptions)
      .then(response => {
        response.json()
          .then(data => {
            if (data.success) {
              toast(data.message, { position: toast.POSITION.TOP_CENTER });
              this.props.history.push("/");

            } else {

              toast(data.message, { position: toast.POSITION.TOP_CENTER });
            }
          });
      })
  }

  render() {
    return (
      <Container component="main" maxWidth="xs" style={{ borderStyle: "ridge", marginTop: "10%" }} >
        <CssBaseline />
        <div className='paper' style={{ marginTop: "20%", marginBottom: "20%" }}  >
          <Avatar className='avatarr' >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
        </Typography>
          <form className='form' noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  required
                  variant="outlined"
                  id="name"
                  label="Full name"
                  type="text"
                  name="name"
                  margin="normal"
                  autoFocus
                  fullWidth
                  value={this.state.name}
                  onChange={this.onChangename}
                  helperText={this.state.error ? "Field should not be empty" : ""}
                  error={this.state.error}
                />

              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  variant="outlined"
                  id="email-input"
                  label="Enter Email"
                  type="email"
                  name="email"
                  margin="normal"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  helperText={this.state.error ? "Field should not be empty" : ""}
                  error={this.state.error}
                />

              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  variant="outlined"
                  id="pass-input"
                  label="Password"
                  type="password"
                  name="password"
                  margin="normal"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  helperText={this.state.error ? "Field should not be empty" : ""}
                  error={this.state.error}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  variant="outlined"
                  id="conpass-input"
                  label="confirmPassword"
                  type="password"
                  name="confirmpassword"
                  margin="normal"
                  value={this.state.confirmPassword}
                  onChange={this.onChangeConfirmPassword}
                  helperText={this.state.error ? "Field should not be empty" : ""}
                  error={this.state.error}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Link to >
              <div onClick={this.handleSubmit}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className='submit'
                >
                  Sign In
                </Button>
                <ToastContainer />
              </div>
            </Link>
            
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/" variant="body2">
                  Already have an account? Sign in
              </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <ToastContainer />
      </Container>
    );
  }
}
