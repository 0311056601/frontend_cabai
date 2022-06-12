import { React } from "react";
import { Field, reduxForm } from "redux-form";
import "../../Cabai.css";
import "../../CabaiMedia.css";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CFormGroup,
  CLabel,
  CCardFooter,
  CRow,
  CCol,
  CInputFile,
  CImg,
} from "@coreui/react";

const ProfilePetaniForm = (props) => {
  const { handleSubmit } = props;
  const data = props.profileData;

  const onFileChange = (e) => {
    const file = e.target.files;
    props.onSelectImage(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <main className="c-main">
        <div className="container-fluid">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs={9} md={10} lg={11} style={{ margin: "auto" }}>
                  <h4 style={{ margin: "auto" }}>Profile Petani</h4>
                </CCol>
                <CCol>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={6} md={6} lg={6} >
                  <CFormGroup>
                    <CLabel htmlFor="nf-date">Nama</CLabel>
                    <Field
                      className="textInput cabai"
                      name="nama"
                      component="input"
                      type="text"
                      required={true}
                      placeholder={data.profile && data.profile.nama ? data.profile.nama : ''}
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs={6} md={6} lg={6} >
                  <CFormGroup>
                    <CLabel htmlFor="nf-date">Kontak HP</CLabel>
                    <Field
                      className="textInput cabai"
                      name="kontak"
                      component="input"
                      type="text"
                      placeholder={data.profile && data.profile.kontak ? data.profile.kontak : ''}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CFormGroup>
                    <CLabel htmlFor="nf-namaJenis">Alamat</CLabel>
                    <Field
                      className="textAreaInput cabai"
                      name="alamat"
                      component="textarea"
                      placeholder={data.profile && data.profile.alamat ? data.profile.alamat : ''}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
              {(() => {
                if(data.profile && data.profile.profile_photo) {
                  return(
                    <CRow>
                      <CCol>
                        <CFormGroup >
                        <CImg src={process.env.REACT_APP_BACKEND_URL + data.profile.profile_photo} style={{width: "250px", height: "250px" }} />
                          {/* <CImg 
                            src={process.env.REACT_APP_BACKEND_URL + data.profile.profile_photo.replaceAll(" ", "%20")}
                            style={{width:'150px', height:'150px'}}
                          /> */}
                        </CFormGroup>
                      </CCol>
                    </CRow>
                  )
                }
              })()}
              <CRow>
                <CCol>
                  <CFormGroup>
                    <CLabel htmlFor="nf-namaJenis">Upload Foto Profil</CLabel>
                    <CInputFile
                      id="file-input"
                      name="file"
                      type="file"
                      onChange={onFileChange}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
              <hr></hr>
              <h3>Pengaturan Akun</h3> <br></br>
              <CRow>
                <CCol xs={6} md={6} lg={6} >
                  <CFormGroup>
                    <CLabel htmlFor="nf-namaJenis">Email</CLabel>
                    <Field 
                      className="textInput cabai"
                      name="email"
                      component="input"
                      type="email"
                      placeholder={data.user.email}
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs={6} md={6} lg={6} >
                  <CFormGroup>
                    <CLabel htmlFor="nf-date">Password</CLabel>
                    <Field
                      className="textInput cabai"
                      name="password"
                      component="input"
                      type="password"
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="danger">
                Submit
              </CButton>
            </CCardFooter>
          </CCard>
        </div>
      </main>
    </form>
  );
};

export default reduxForm({
  form: "profileGapoktan", // a unique identifier for this form
})(ProfilePetaniForm);
