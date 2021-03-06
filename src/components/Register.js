import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardGroup,
  CRow,
  CCol,
  CContainer,
} from "@coreui/react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";
import { register } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordK = this.onChangePasswordK.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      passwordK: "",
      loading: false,
    };
  }

  onChangeUsername(e) {
    this.setState({
        username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
        email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
        password: e.target.value,
    });
  }

  onChangePasswordK(e) {
    this.setState({
        passwordK: e.target.value,
    });
  }

  handleLogin(e) {

    if(this.state.password == this.state.passwordK) {
    
        e.preventDefault();

        this.setState({
        loading: true,
        });

        this.form.validateAll();

        const { dispatch, history } = this.props;

        if (this.checkBtn.context._errors.length === 0) {
        dispatch(register(this.state.username, this.state.email, this.state.password, this.state.passwordK))
            .then( async () => {
                await alert("Pendaftaran berhasil, silahkan login")
                await history.push("/login");
                // await window.location.reload();
            })
            .catch(() => {
            this.setState({
                loading: false,
            });
            });
        } else {
        this.setState({
            loading: false,
        });
        }
    } else {
        alert("Sandi berbeda dengan sandi konfirmasi");
    }
  }

  render() {
    const { isLoggedIn, message } = this.props;

    if (isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <h1>Daftar</h1>
                    <p className="text-muted">Daftar jika belum memiliki akun untuk bisa melakukan transaksi</p>

                    <Form
                      onSubmit={this.handleLogin}
                      ref={(c) => {
                        this.form = c;
                      }}
                    >
                      <div className="form-group">
                        <label htmlFor="email">Username</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="username"
                          value={this.state.username}
                          onChange={this.onChangeUsername}
                          validations={[required]}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChangeEmail}
                          validations={[required]}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="password">Sandi</label>
                        <Input
                          type="password"
                          className="form-control"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChangePassword}
                          validations={[required]}
                          />
                      </div>

                      <div className="form-group">
                        <label htmlFor="password">Konfirmasi Sandi</label>
                        <Input
                          type="password"
                          className="form-control"
                          name="passwordK"
                          onChange={this.onChangePasswordK}
                          validations={[required]}
                        />
                      </div>

                      <CRow>
                        <CCol xs="6">
                          <div className="form-group">
                            <button
                              className="btn btn-danger btn-block"
                              disabled={this.state.loading}                              
                            >
                              {this.state.loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                              )}
                              <span>Daftar</span>
                            </button>
                          </div>
                        </CCol>
                        {/* <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol> */}
                      </CRow>

                      {message && (
                        <div className="form-group">
                          <div className="alert alert-danger" role="alert">
                            {message}
                          </div>
                        </div>
                      )}

                      <CheckButton
                        style={{ display: "none" }}
                        ref={(c) => {
                          this.checkBtn = c;
                        }}
                      />
                    </Form>
                  </CCardBody>
                </CCard>
                <CCard
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                  color="danger"
                >
                  <CCardBody className="text-center">
                    <div>
                      <h2>Selamat Datang</h2>
                      {/* <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p> */}
                      {/* <Link to="#">
                        <CButton
                          color="dark"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Register Now!
                        </CButton>
                      </Link> */}
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message,
  };
}

export default connect(mapStateToProps)(Login);
