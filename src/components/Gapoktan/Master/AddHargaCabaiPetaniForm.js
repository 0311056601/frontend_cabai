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
import NumberFormat from 'react-number-format';

const AddHargaCabaiPetaniForm = (props) => {
    var { handleSubmit } = props;

    let [hd, setHd] = useState(null);
    let [hj, setHj] = useState(null);

    const MAX_VOL = 100;
    const formatProfit = ({ formattedValue }) => formattedValue <= MAX_VOL;

    const handleProfit = (e) => {
        console.log('cek profit', e.target.value);
        let profit = e.target.value;
        
        if(hd) {
            let hitung = parseInt(hd) * parseInt(profit) / 100;
            console.log('hd', hd);

            console.log('hitung', hitung);
            console.log('cek perhitungan', parseInt(hitung) + parseInt(hd));
            setHj(parseInt(hitung) + parseInt(hd));

            props.PROFIT(profit);
            props.HargaJual(parseInt(hitung) + parseInt(hd));
        }
    }

    return (
        <Fragment>
        <form onSubmit={handleSubmit}>
            <main className="c-main">
                <div className="container-fluid">
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <CCol xs={9} md={10} lg={11} style={{ margin: "auto" }}>
                                    <h4 style={{ margin: "auto" }}>Input Harga Cabai Petani</h4>
                                </CCol>
                                <CCol>
                                    <CButton block color="warning" to="/ListHargaCabaiPetani">
                                        <span style={{ color: "white" }}>X</span>
                                    </CButton>
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CCol xs={6} md={6} lg={6}>
                                    <CFormGroup>
                                        <CLabel htmlFor="nf-namaJenis">Harga Dasar</CLabel>
                                        <Field
                                            className="textInput cabai"
                                            name="harga_dasar"
                                            type="number"
                                            onChange={(v) => setHd(v.target.value)}
                                            component="input"
                                            required={true}
                                        />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs={6} md={6} lg={6}>
                                    <CFormGroup>
                                        <CLabel htmlFor="nf-namaJenis">Kualitas</CLabel>
                                        <Field
                                            className="textInput cabai"
                                            name="kualitas"
                                            component="select"
                                            required={true}
                                        >
                                            <option value="" disabled hidden >-= Pilih =-</option>
                                            <option value="Kelas Super">Kelas Super</option>
                                            <option value="Kelas 1">Kelas 1</option>
                                            <option value="Kelas 2">Kelas 2</option>
                                        </Field>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs={6} md={6} lg={6}>
                                    <CFormGroup>
                                        <CLabel htmlFor="nf-namaJenis">Profit</CLabel>
                                        <NumberFormat 
                                            className="textInput cabai" 
                                            isAllowed={formatProfit}
                                            // onChange={(val) => handleVolumeChange(val)}
                                            onChange={handleProfit}
                                            name="profit"
                                            required={true}
                                        />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs={6} md={6} lg={6}>
                                    <CFormGroup>
                                        <CLabel htmlFor="nf-namaJenis">Harga Jual</CLabel>
                                        <input
                                            className="textInput cabai"
                                            name="harga_jual"
                                            component="input"
                                            value={hj ? `Rp. ${parseInt(hj).toLocaleString('en')}` : " "}
                                            readOnly
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
  form: "AddHargaCabaiPetani", // a unique identifier for this form
})(AddHargaCabaiPetaniForm);