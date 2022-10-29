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

const MinimalPembelianForm = (props) => {
    var { handleSubmit } = props;
    var data = props.DATA;
    const [minimal, setMinimal] = useState('');

    const MIN_VOL = 0;
    const formatVolume = ({ formattedValue }) => formattedValue >= MIN_VOL;

    props.MINIMAL(minimal);

    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <main className="c-main">
                    <div className="container-fluid">
                        <CCard>
                            <CCardHeader>
                                <CRow>
                                    <CCol xs={9} md={10} lg={11} style={{ margin: "auto" }}>
                                        <h4 style={{ margin: "auto" }}>Input Minimal Pembelian</h4>
                                    </CCol>
                                    {/* <CCol>
                                        <CButton block color="warning" to="/ListHargaPengemasan">
                                            <span style={{ color: "white" }}>X</span>
                                        </CButton>
                                    </CCol> */}
                                </CRow>
                            </CCardHeader>
                            <CCardBody>
                                <CRow>
                                    <CCol xs={6} md={6} lg={6}>
                                        <CFormGroup>
                                            <CLabel htmlFor="nf-namaJenis">Minimal Pembelian (Kilo)</CLabel>
                                            <NumberFormat 
                                                className="textInput cabai" 
                                                isAllowed={formatVolume}
                                                onChange={(val) => setMinimal(val)}
                                                placeholder={data}
                                                name="minimal_pembelian"
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
  form: "MinimalPembelian", // a unique identifier for this form
})(MinimalPembelianForm);