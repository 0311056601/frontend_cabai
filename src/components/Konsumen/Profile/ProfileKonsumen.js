import { Fragment, useState, useEffect } from "react";
import "../../Cabai.css";
import "../../CabaiMedia.css";
import ProfileKonsumenForm from "./ProfileKonsumenForm";
import UserService from '../../../services/user.service';
import showResults from '../../showResults/showResults';
import { Redirect } from "react-router-dom";
import {
    CCard,
    CCardBody,
    CButton,
    CFormGroup,
    CRow,
    CCol,
    CImg,
    CCardFooter,
  } from "@coreui/react";

const ProfileKonsumen = () => {
  // Can be a string as well. Need to ensure each key-value pair ends with ;
  const [profile, setProfile] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [gambar, imageFile] = useState([]);
  const [ubah, setUbah] = useState(false);
  
  const onFileChange = (file) => {
    imageFile(file);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    UserService.getDetailUser().then((response) => {
        setProfile(response.data)
    })
  }

  const Ubah = () => {
    setUbah(false);
  }

  const handleSubmit = async (values) => {
    const formData = new FormData();
    if(gambar) {
        for (let i = 0; i < gambar.length; i++) {
            formData.append("files[]", gambar[i]);
        }
    }

    formData.append('nama', values.nama);
    if(values.kontak) {
        formData.append('kontak', values.kontak);
    }
    if(values.alamat) {
        formData.append('alamat', values.alamat);
    }

    if (values.email) {
        formData.append('email', values.email);
    }
    if(values.password) {
        formData.append('password', values.password);
    }
    // end get data form submit

    // tulis data form submit ke database menggunakan api yang terdaftar di file user.service
    await UserService.insertProfile(formData).then( async (response) => {
        // cek response api
        if(response.success === false) {
            await showResults(`Gagal, ${response.message}`);
        } else {
            await showResults("Data Berhasil Dimasukkan");

            await setRedirect(true);

        }
    })

    console.log('cek values', values);
  };

  if(redirect) {
    return <Redirect to="/" />;
  } else {
      console.log('cek profile', profile);
    if(profile) {

        if(profile.profile) {
            return (
                <Fragment>
                    <main className="c-main">
                        <div className="container-fluid">
                            <CCard>
                                <CCardBody>
                                    <CCard>
                                        <CCardBody>
                                            <CCol xs={12} md={12} lg={12} >
                                                <p>
                                                    <CImg className="d-block w-50 h-50" src={process.env.REACT_APP_BACKEND_URL + profile.profile.profile_photo} />
                                                </p>
                                            </CCol>
                                        </CCardBody>
                                    </CCard>
                                    <hr></hr>
                                    <CRow>
                                        <CCol xs={6} md={6} lg={6} >
                                            <p>
                                                <strong>Nama :</strong> {profile.profile.nama}
                                            </p>
                                            <p>
                                                <strong>Kontak HP :</strong> {profile.profile.kontak}
                                            </p>
                                        </CCol>
                                        <CCol xs={6} md={6} lg={6} >
                                            <p>
                                                <strong>Alamat :</strong> {profile.profile.alamat}
                                            </p>
                                            <p>
                                                <strong>Email :</strong> {profile.user.email}
                                            </p>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                                <CCardFooter>
                                    <CButton size="sm" color="info" to="ProfilKonsumen/Edit" >
                                        <span style={{ color: "white" }}>Ubah</span>
                                    </CButton>
                                </CCardFooter>
                            </CCard>
                        </div>
                    </main>
                </Fragment>
            )
        } else {
            return <Redirect to="/ProfilKonsumen/Edit" />;
        }

    } else {
      return(
        <>
          <div align="center">
              <br></br>
              <br></br>
              <br></br>
              <h3>Mohon Tunggu...</h3>
          </div>
        </>
      );
    }
  }
};
export default ProfileKonsumen;