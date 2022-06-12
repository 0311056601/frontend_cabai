import { React, useState } from "react";
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
  CInputFile,
  CImg
} from "@coreui/react";
import moment from 'moment';
import DatePicker from "react-datepicker";
import "../../../react-datepicker.css";

const TimbangProdukPetaniForm = (props) => {

  const { handleSubmit } = props;

  const data = props.dataProduk;
  const petani = props.dataProduk.get_creator;

  console.log(data);

  return (
    <form onSubmit={handleSubmit}>
      <main className="c-main">
        <div className="container-fluid">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs={9} md={10} lg={11} style={{ margin: "auto" }}>
                  <h4 style={{ margin: "auto" }}>Input Hasil Timbangan</h4>
                </CCol>
                <CCol>
                    <CButton block size="sm" color="warning" to="/ProdukPetani">
                        <span style={{ color: "white" }}>X</span>
                    </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={6} md={6} lg={6} style={{ margin: "auto" }}>
                    <CFormGroup>
                        <CLabel> Petani </CLabel>
                        <input
                            className="textInput cabai"
                            component="input"
                            defaultValue={petani.username}
                            disabled
                        />
                    </CFormGroup>
                </CCol>
                <CCol xs={6} md={6} lg={6} style={{ margin: "auto" }}>
                    <CFormGroup>
                        <CLabel> Email Petani </CLabel>
                        <input
                            className="textInput cabai"
                            component="input"
                            defaultValue={petani.email}
                            disabled
                        />
                    </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                  <CCol xs={6} md={6} lg={6} style={{ margin: "auto" }}>
                      <CFormGroup>
                          <CLabel> Tanggal Panen </CLabel>
                          <input
                              className="textInput cabai"
                              component="input"
                              defaultValue={moment(data.tanggal_panen).format('DD/MMM/YYYY')}
                              disabled
                          />
                      </CFormGroup>
                  </CCol>
                  <CCol xs={6} md={6} lg={6} style={{ margin: "auto" }}>
                      <CFormGroup>
                          <CLabel> Kualitas </CLabel>
                          <input
                              className="textInput cabai"
                              component="input"
                              defaultValue={data.kualitas}
                              disabled
                          />
                      </CFormGroup>
                  </CCol>
              </CRow>
              <CRow>
                  <CCol xs={6} md={6} lg={6} >
                      <CFormGroup>
                              <CLabel> Harga per kg </CLabel>
                              <input
                                  className="textInput cabai"
                                  component="input"
                                  defaultValue={parseInt(data.harga).toLocaleString('en')}
                                  disabled
                              />
                      </CFormGroup>
                  </CCol>
              </CRow>
              <CRow>
                  <CCol xs={12} md={12} lg={12} >
                      <CFormGroup>
                          <CLabel> Foto Cabai </CLabel>
                          <br></br>
                          {data.get_image && data.get_image.map(function(img, i) {
                              return(
                                  <>
                                      <div key={i}>
                                          <CImg src={process.env.REACT_APP_BACKEND_URL + img.image} style={{width: "250px", height: "250px" }} /> {' '}
                                      </div>
                                  </>
                              )
                          })}
                      </CFormGroup>
                  </CCol>
              </CRow>
              <hr></hr>

              <CRow>
                  <CCol xs={6} md={6} lg={6} >
                      <CFormGroup>
                          <CLabel> Volume Cabai (Kg)</CLabel>
                          <Field
                              className="textInput cabai"
                              name="volume"
                              type="number"
                              min={0}
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
  form: "timbangProdukPetani", // a unique identifier for this form
})(TimbangProdukPetaniForm);
