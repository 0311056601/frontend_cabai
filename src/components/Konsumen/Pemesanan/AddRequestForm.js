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
  CNavLink,
  CInputFile
} from "@coreui/react";
import moment from 'moment';
import DatePicker from "react-datepicker";
import "../../react-datepicker.css";
import NumberFormat from 'react-number-format';
import UserService from '../../../services/user.service';

const AddRequestForm = (props) => {
    var { handleSubmit } = props;
    const [startDate, setStartDate] = useState('')
    const [volume, setVolume] = useState('')
    const [perkiraanHarga, setPerkiraanHarga] = useState(null)
    const [gapoktan, setGapoktan] = useState([])
    const [kualitas, setKualitas] = useState(null)
    const [packaging, setPackaging] = useState(null)
    const [hd, setHd] = useState(null)
    const [k, setK] = useState(null)
    const [p, setP] = useState(null)
    const [hj, setHj] = useState(null)

    props.onSelectDate(moment(startDate).format('YYYY-MM-DD'));
    props.Volume(volume);

    const ListGapoktan = props.Gapoktan;

    const handleGapoktanChange = async (e) => {

        let gapoktan = e.target.value;

        await UserService.getGapoktanHarga(gapoktan).then( async (response) => {
            console.log('cek ini', response.data);
            setGapoktan(response.data.gapoktan);
            setKualitas(response.data.kualitas);
            setPackaging(response.data.pengemasan);
        })
    }

    const getHargaPerkiraan = async (e) => {

        // get attribute harga pada field select kualitas
        let index = e.target.selectedIndex;
        let optionElement = e.target.childNodes[index]
        
        setHd(optionElement.getAttribute('data-hd'));
        setP(optionElement.getAttribute('data-p'));
        setK(e.target.value);
        setHj(optionElement.getAttribute('data-hj'));
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
                                        <h4 style={{ margin: "auto" }}>Pesan Cabai</h4>
                                    </CCol>
                                    <CCol>
                                        <CButton block color="warning" to="/Request/List">
                                            <span style={{ color: "white" }}>X</span>
                                        </CButton>
                                    </CCol>
                                </CRow>
                            </CCardHeader>
                            <CCardBody>

                                <CRow>
                                    <CCol xs={6} md={6} lg={6}>
                                        <CFormGroup>
                                            <CLabel htmlFor="nf-namaJenis">Tanggal Pembelian</CLabel>
                                            <DatePicker
                                                selected={startDate}
                                                className="textInput cabai"
                                                onChange={(date) => setStartDate(date)}
                                                dateFormat="dd/MMM/yyyy"
                                                name="tanggal_panen"
                                                required={true}
                                                placeholderText="tentukan tanggal..."
                                            />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs={6} md={6} lg={6}>
                                        <CFormGroup>
                                            <CLabel htmlFor="nf-namaJenis">Volume (Kg)</CLabel>
                                            <NumberFormat 
                                                className="textInput cabai" 
                                                // isAllowed={formatVolume}
                                                onChange={(val) => setVolume(val)}
                                                // onChange={}
                                                placeholder={`Tentukan volume kilogram`}
                                                name="volume"
                                                required={true}
                                            />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xs={12} md={12} lg={12}>
                                        <CFormGroup>
                                            <CLabel htmlFor="nf-namaJenis">Catatan</CLabel>
                                            <Field
                                                className="textAreaInput cabai"
                                                name="catatan"
                                                component="textarea"
                                                placeholder="Isikan catatan jika ada"
                                            />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xs={6} md={6} lg={6}>
                                        <CFormGroup>
                                            <CLabel htmlFor="nf-namaJenis">Gapoktan</CLabel>
                                            <Field
                                                className="textInput cabai"
                                                name="gapoktan"
                                                component="select"
                                                onChange={handleGapoktanChange}
                                                required={true}
                                            >
                                                <option value="" disabled hidden >-= Pilih Gapoktan =-</option>
                                                {
                                                    ListGapoktan.map(function(v, i) {
                                                        return(
                                                            <option value={v.id} key={i} > {`${v.username} - ${v.email}`} </option>
                                                        )
                                                    })
                                                }
                                            </Field>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs={6} md={6} lg={6}>
                                        <CFormGroup>
                                            <CLabel htmlFor="nf-namaJenis">Kualitas</CLabel>
                                            <Field
                                                className="textInput cabai"
                                                name="kualitas"
                                                onChange={getHargaPerkiraan}
                                                component="select"
                                                required={true}
                                            >
                                                {
                                                    kualitas ?
                                                    (
                                                        <>
                                                            <option value="" hidden> -= Pilih Kualitas =-</option>
                                                            {
                                                                kualitas && kualitas.map(function(v, i) {
                                                                    return(
                                                                        <option value={v.kualitas} key={i} data-hd={v.harga_dasar} data-p={v.profit} data-hj={v.harga_jual} > {v.kualitas} </option>
                                                                    )
                                                                })
                                                            }
                                                        </>
                                                    ):
                                                    (
                                                        <option value="" disabled hidden > -= Pilih Gapoktan Terlebih Dahulu =- </option>
                                                    )
                                                }

                                            </Field>
                                        </CFormGroup>
                                    </CCol>
                                </CRow>
                                <p></p><br></br>
                                {
                                    hd && hj && p && k ? 
                                    (
                                        <>
                                            <CRow>
                                                <CCol xs={6} md={6} lg={6}>
                                                    <h4>Perhitungan Harga Produk</h4>
                                                    <hr></hr>
                                                    <CRow>
                                                        <CCol xs={4} md={4} lg={4}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis"><strong>Kualitas</strong></CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                        <CCol xs={1} md={1} lg={1}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis"><strong> : </strong></CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                        <CCol xs={4} md={4} lg={4}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis">{k}</CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol xs={4} md={4} lg={4}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis"><strong>Harga Dasar</strong></CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                        <CCol xs={1} md={1} lg={1}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis"><strong> : </strong></CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                        <CCol xs={4} md={4} lg={4}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis">Rp. {parseInt(hd).toLocaleString('en')}</CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol xs={4} md={4} lg={4}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis"><strong>Profit ({p}%)</strong></CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                        <CCol xs={1} md={1} lg={1}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis"><strong> : </strong></CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                        <CCol xs={4} md={4} lg={4}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis">Rp. {parseInt(hd * p / 100 ).toLocaleString('en')}</CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol xs={4} md={4} lg={4}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis"><strong>Harga Jual</strong></CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                        <CCol xs={1} md={1} lg={1}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis"><strong> : </strong></CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                        <CCol xs={4} md={4} lg={4}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis">Rp. {parseInt(hj).toLocaleString('en')}</CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                    </CRow>
                                                </CCol>

                                                <CCol xs={6} md={6} lg={6}>
                                                    <h4>Perkiraan Harga</h4>
                                                    <hr></hr>
                                                    <CRow>
                                                        <CCol xs={4} md={4} lg={4}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis"><strong>Harga Jual</strong></CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                        <CCol xs={1} md={1} lg={1}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis"><strong> : </strong></CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                        <CCol xs={4} md={4} lg={4}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis">Rp. {parseInt(hj).toLocaleString('en')}</CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol xs={4} md={4} lg={4}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis"><strong>Pengemasan</strong></CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                        <CCol xs={1} md={1} lg={1}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis"><strong> : </strong></CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                        <CCol xs={4} md={4} lg={4}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis">{ volume ? `Rp. ${parseInt(volume.target.value * packaging.harga).toLocaleString('en')}` : `Rp. ${parseInt(1 * packaging.harga).toLocaleString('en')}`}</CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol xs={4} md={4} lg={4}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis"><strong>Supply Demand (20%)</strong></CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                        <CCol xs={1} md={1} lg={1}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis"><strong> : </strong></CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                        <CCol xs={4} md={4} lg={4}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis"><strong style={{color:"red"}}>Belum Terhitung</strong></CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol xs={4} md={4} lg={4}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis"><strong>Volume</strong></CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                        <CCol xs={1} md={1} lg={1}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis"><strong> : </strong></CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                        <CCol xs={4} md={4} lg={4}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis">{ volume ? `${volume.target.value} Kg` : `0 Kg`}</CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                    </CRow>
                                                    <hr></hr>
                                                    <CRow>
                                                        <CCol xs={4} md={4} lg={4}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis"><strong>Perkiraan Harga</strong></CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                        <CCol xs={1} md={1} lg={1}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis"><strong> : </strong></CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                        <CCol xs={4} md={4} lg={4}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis">{ volume ? `Rp. ${parseInt((volume.target.value * hj) + (volume.target.value * packaging.harga)).toLocaleString('en')}` : `Rp. ${parseInt((1 * hj) + (1 * packaging.harga)).toLocaleString('en')}`}</CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                    </CRow>
                                                </CCol>
                                                
                                            </CRow>
                                        </>
                                    ):
                                    (
                                        <>
                                            <CRow>
                                                <CCol xs={2} md={2} lg={2}>
                                                    <CFormGroup>
                                                        <CLabel htmlFor="nf-namaJenis"><strong>Perkiraan Harga</strong></CLabel>
                                                    </CFormGroup>
                                                </CCol>
                                                <CCol xs={2} md={2} lg={2}>
                                                    <CFormGroup>
                                                        <CLabel htmlFor="nf-namaJenis"><strong> : </strong></CLabel>
                                                    </CFormGroup>
                                                </CCol>
                                                <CCol xs={3} md={3} lg={3}>
                                                    <CFormGroup>
                                                        <CLabel htmlFor="nf-namaJenis">Rp. -0</CLabel>
                                                    </CFormGroup>
                                                </CCol>
                                            </CRow>
                                        </>
                                    )
                                }

                                <hr></hr>
                                <p style={{color:"red"}}>
                                    <strong>*Catatan:</strong> Perkiraan harga bisa barubah-ubah dari kondisi supply demand yang ada
                                </p>

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
  form: "AddLahan", // a unique identifier for this form
})(AddRequestForm);