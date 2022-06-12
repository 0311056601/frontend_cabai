import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardGroup,
  CInputFile,
  CRow,
  CCol,
  CContainer,
} from "@coreui/react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import UserService from '../services/user.service';
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
    this.onChangeKontak = this.onChangeKontak.bind(this);
    this.onChangeAlamat = this.onChangeAlamat.bind(this);
    // this.onChangePhoto = this.onChangePhoto.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      passwordK: "",
      loading: false,
      kontak: "",
      alamat: "",
      pindah: false,
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

  onChangeKontak(e) {
    this.setState({
        kontak: e.target.value,
    });
  }

  onChangeAlamat(e) {
    this.setState({
        alamat: e.target.value,
    });
  }
  
  // onChangePhoto(e) {
  //   this.setState({
  //     photo: e.target.files,
  //   });
  // }

  handleLogin(e) {

    if(this.state.password == this.state.passwordK) {
    
        e.preventDefault();

        this.setState({
          loading: true,
        });

        if (this.checkBtn.context._errors.length === 0) {
          console.log('cek ini mal', this.state);
          const formData = new FormData();
          formData.append('nama', this.state.username);
          formData.append('email', this.state.email);
          formData.append('password', this.state.password);
          formData.append('kontak', this.state.kontak);
          formData.append('alamat', this.state.alamat);
          
          UserService.DaftarGapoktan(formData).then((response) => { 
            if(response.message) {

              alert(response.message);

            } else {

              this.setState({
                pindah: true,
              });

              alert('Pendaftaran berhasil, silahkan cek email untuk konfirmasi');

            }

            this.setState({
              loading: false,
            });
          })
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
    } else if(this.state.pindah)  {
      return <Redirect to="/login" />;
    }

    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <Form
                    onSubmit={this.handleLogin}
                    ref={(c) => {
                    this.form = c;
                    }}
                >
                    <CRow className="justify-content-center">
                        <CCard className="p-4">
                            <CCardBody>
                                <h1>Daftar Gapoktan</h1>
                                <p className="text-muted">Daftar akun gapoktan</p>

                                <div className="form-group">
                                    <label htmlFor="email">Nama</label>
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

                            </CCardBody>
                        </CCard>
                        <CCard className="p-4">
                            <CCardBody>
                                <h1>Profile Gapoktan</h1>
                                <p className="text-muted">Profile gapoktan</p>
                                
                                <div className="form-group">
                                    <label htmlFor="email">Kontak HP</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="kontak"
                                        value={this.state.kontak}
                                        onChange={this.onChangeKontak}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Alamat</label>
                                    <Input
                                        type="text"
                                        className="form-control textAreaInput"
                                        name="alamat"
                                        value={this.state.alamat}
                                        onChange={this.onChangeAlamat}
                                        validations={[required]}
                                    />
                                </div>

                                {/* <div className="form-group">
                                    <label htmlFor="email">Photo Profile</label>
                                    <CInputFile
                                        type="text"
                                        className="form-control"
                                        name="photo"
                                        value={this.state.photo}
                                        onChange={this.onChangePhoto}
                                        validations={[required]}
                                    />
                                </div> */}

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

                            </CCardBody>
                        </CCard>
                    </CRow>
                </Form>
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
