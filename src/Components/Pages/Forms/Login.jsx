import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link, withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './Form.css'

class SignIn extends Component {
    notify = () => {
        toast.success("Success Notification !", {
            position: toast.POSITION.TOP_CENTER
        });
    }


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
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

    handleLogin = () => {
        if (this.state.email === "" || this.state.password === "") {
            this.setState({
                error: true
            })
            console.log(this.state.error);
        }
        else {
            var loginDetails = {
                'email': this.state.email,
                'password': this.state.password

            }
            this.loginUser(loginDetails)
        }
    }

    loginUser(loginDetails) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginDetails)
        };

        fetch(process.env.REACT_APP_HOST + '/login', requestOptions)
            .then(response => {
                response.json()
                    .then(data => {
                        if (data.success) {
                            toast(data.message, { position: toast.POSITION.TOP_CENTER });
                            localStorage.setItem('token', data.data.token);
                            this.props.history.push("/allnotes");

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
                    <div>
                        <Avatar className='avatar' style={{ backgroundColor: 'deeppink' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                    </div>
                    <div>
                        <Typography component="h1" variant="h5">
                            Sign in
                    </Typography>
                    </div>
                    <form className='form' noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={this.state.email}
                            onChange={(e) => this.onChangeEmail(e)}
                            helperText={this.state.error ? "Field should not be empty" : "Perfect!"}
                            error={this.state.error}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={(e) => this.onChangePassword(e)}
                            helperText={this.state.error ? "Field should not be empty" : "Perfect!"}
                            error={this.state.error}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Link to="" >
                            <div onClick={this.handleLogin}>
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

                        <Grid container>
                            <Grid item xs>
                                <Link to="resetpassword" variant="body2">
                                    Forgot password?
                        </Link>
                            </Grid>
                            <Grid item>
                                <Link to="registration" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>

            </Container>
        );
    }
}
export default withRouter(SignIn);