import { React } from "react";
import { Field, reduxForm } from "redux-form";
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
} from "@coreui/react";

const DaftarAkunPetaniForm = (props) => {

  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <main className="c-main">
        <div className="container-fluid">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs={9} md={10} lg={11} style={{ margin: "auto" }}>
                  <h4 style={{ margin: "auto" }}>Tambah Akun Petani</h4>
                </CCol>
                <CCol>
                    <CButton block size="sm" color="warning" to="/ListPetani">
                        <span style={{ color: "white" }}>X</span>
                    </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol xs={6} md={6} lg={6} style={{ margin: "auto" }}>
                        <CFormGroup>
                            <CLabel> Nama / Username </CLabel>
                            <Field
                                className="textInput cabai"
                                name="username"
                                component="input"
                                required={true}
                            />
                        </CFormGroup>
                    </CCol>
                    <CCol xs={6} md={6} lg={6} style={{ margin: "auto" }}>
                        <CFormGroup>
                            <CLabel> Email </CLabel>
                            <Field
                                className="textInput cabai"
                                name="email"
                                component="input"
                                required={true}
                            />
                        </CFormGroup>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol xs={6} md={6} lg={6} >
                        <CFormGroup>
                            <CLabel> Password </CLabel>
                            <Field
                                className="textInput cabai"
                                name="password"
                                type="password"
                                component="input"
                                required={true}
                            />
                        </CFormGroup>
                    </CCol>
                </CRow>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="danger">
                Submit
              </CButton>{" "}
            </CCardFooter>
          </CCard>
        </div>
      </main>
    </form>
  );
};

export default reduxForm({
  form: "DaftarAkunPetani", // a unique identifier for this form
})(DaftarAkunPetaniForm);
