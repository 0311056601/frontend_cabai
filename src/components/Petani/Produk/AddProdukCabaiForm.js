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
  CInputFile
} from "@coreui/react";
import moment from 'moment';
import DatePicker from "react-datepicker";
import "../../react-datepicker.css";

const AddProdukCabaiForm = (props) => {

  const { handleSubmit } = props;
  const [startDate, setStartDate] = useState('')
  const [select, setSelect] = useState('')
  const [harga, setHarga] = useState(null)

  props.onSelectDate(moment(startDate).format('YYYY-MM-DD'));

  const onFileChange = (e) => {
    const file = e.target.files;
    props.onSelectImage(file);
  };

  const handleKualitas = async (e) => {
    console.log('cek change kualitas', e);

    // get attribute harga pada field select kualitas
    let index = e.target.selectedIndex;
    let optionElement = e.target.childNodes[index]
    let option =  optionElement.getAttribute('harga');
    console.log('cek option', option);

    await setHarga(option);

    props.HargaJual(option);
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <main className="c-main">
        <div className="container-fluid">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs={9} md={10} lg={11} style={{ margin: "auto" }}>
                  <h4 style={{ margin: "auto" }}>Input Cabai</h4>
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
                          <CLabel> Tanggal Panen </CLabel>
                          <DatePicker
                            selected={startDate}
                            className="textInput cabai"
                            onChange={(date) => setStartDate(date)}
                            maxDate={new Date()}
                            dateFormat="dd/MMM/yyyy"
                            name="tanggal_panen"
                            required={true}
                            placeholderText="tentukan tanggal panen..."
                          />
                        </CFormGroup>
                    </CCol>
                    <CCol xs={6} md={6} lg={6} style={{ margin: "auto" }}>
                        <CFormGroup>
                            <CLabel> Kualitas </CLabel>
                            {/* <Field
                              className="textInput cabai"
                              name="kualitas"
                              onChange={handleKualitas}
                              component="select"
                              required={true}
                            >
                                <option value="" disabled hidden >-= Pilih =-</option>
                                <option value="Kelas Super">Kelas Super</option>
                                <option value="Kelas 1">Kelas 1</option>
                                <option value="Kelas 2">Kelas 2</option>
                            </Field> */}
                            <Field
                              className="textInput cabai"
                              name="kualitas"
                              onChange={handleKualitas}
                              component="select"
                              required={true}
                            >
                              <option value="" disabled hidden >-= Pilih Kualitas =-</option>
                              {
                                  props.DATA && props.DATA.map(function(p, i) {
                                      return(
                                          <option value={p.kualitas} key={i} harga={p.harga_jual} > {p.kualitas} </option>
                                      )
                                  })
                              }
                            </Field>
                        </CFormGroup>
                    </CCol>
                </CRow>
                <CRow>
                  <CCol xs={6} md={6} lg={6} >
                      <CFormGroup>
                          <CLabel> Harga per kilo </CLabel>
                          <input
                              className="textInput cabai"
                              name="harga"
                              component="input"
                              value={harga ? `Rp. ${parseInt(harga).toLocaleString('en')}` : " "}
                              // required={true}
                          />
                      </CFormGroup>
                  </CCol>
                  {/* <CCol xs={6} md={6} lg={6} >
                      <CFormGroup>
                          <CLabel> Volume Cabai (Kg)</CLabel>
                          <Field
                            className="textInput cabai"
                            name="volume"
                            component="input"
                            required={true}
                          />
                      </CFormGroup>
                  </CCol> */}
                  <CCol xs={6} md={6} lg={6} >
                      <CFormGroup>
                          <CLabel> Foto Cabai </CLabel>
                          <CInputFile
                            id="file-input"
                            name="foto_cabai[]"
                            type="file"
                            onChange={onFileChange}
                            required={true}
                            accept=".jpg, .jpeg, .png"
                            multiple
                          />
                      </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  {/* <CCol xs={6} md={6} lg={6} >
                      <CFormGroup>
                          <CLabel> Foto Cabai </CLabel>
                          <CInputFile
                            id="file-input"
                            name="foto_cabai[]"
                            type="file"
                            onChange={onFileChange}
                            required={true}
                            accept=".jpg, .jpeg, .png"
                            multiple
                          />
                      </CFormGroup>
                  </CCol> */}
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
})(AddProdukCabaiForm);
