import { Fragment, useState, React } from "react";
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

const AddExpiredForm = (props) => {
    var { handleSubmit } = props;

    return (
        <Fragment>
        <form onSubmit={handleSubmit}>
            <main className="c-main">
                <div className="container-fluid">
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <CCol xs={9} md={10} lg={11} style={{ margin: "auto" }}>
                                    <h4 style={{ margin: "auto" }}>Input Lamanya Cabai Disimpan</h4>
                                </CCol>
                                <CCol>
                                    <CButton block color="warning" to="/ListLamaPenyimpanan">
                                        <span style={{ color: "white" }}>X</span>
                                    </CButton>
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CCol xs={6} md={6} lg={6}>
                                    <CFormGroup>
                                        <CLabel htmlFor="nf-namaJenis">Expired (hari)</CLabel>
                                        <Field
                                            className="textInput cabai"
                                            name="expired"
                                            type="number"
                                            component="input"
                                            min={0}
                                            required={true}
                                        />
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                        </CCardBody>
                        <CCardFooter>
                            <CButton type="submit" size="sm" color="danger">Submit</CButton>
                        </CCardFooter>
                    </CCard>
                </div>
            </main>
        </form>
        </Fragment>
    );
};

export default reduxForm({
  form: "AddExpired", // a unique identifier for this form
})(AddExpiredForm);