import { Fragment, useState, React } from "react";
import { Field, reduxForm, FieldArray } from "redux-form";
import "../../../Cabai.css";
import "../../../CabaiMedia.css";
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
import DatePicker from "react-datepicker";
import "../../../react-datepicker.css";
import UserService from '../../../../services/user.service';
import moment from 'moment';
import NumberFormat from 'react-number-format';

const AddProdukSiapJualForm = (props) => {
    var { handleSubmit } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [jenis, setJenis] = useState(null);
    const [item, setItem] = useState(1);
    const [tanggalPanen, setTanggalPanen] = useState(null);
    const [tgl, setTgl] = useState(null);
    const [hpp, setHpp] = useState(null);
    const [petani, setPetani] = useState(null);
    const [kualitas, setKualitas] = useState(null);
    const [volume, setVolume] = useState(null);
    const [valueVolume, setValVol] = useState(null);
    const [biayaKemasan, setBiayaKemas] = useState(null);
    const [hargaJual, sethargaJual] = useState(null);
    // const [hargaP, setHargaP] = useState(null);

    props.onSelectDate(moment(startDate).format('YYYY-MM-DD'));

    const data = props.data;
    const biayaPengemasan = props.biayaKemasan;

    // const handleVolumeChange = (tags) => async (event) => {
    //     const vols = dataVolMitra;
    //     vols[event.target.id] = event.target.value;
    //     setDataVolMitra(vols);
    //     console.log("Total ", vols.reduce((curr, next) => parseInt(curr) + parseInt(next)));
    // };

    const MAX_VOL = volume;
    const formatVolume = ({ formattedValue }) => formattedValue <= MAX_VOL;

    props.Volume(valueVolume);
    props.hargaJual(hargaJual);

    console.log('cek data', data);

    const petaniChange = async (e) => {

        const dataPetani = e.target.value;

        await setPetani(e.target.value);
        
        await UserService.onChangePetani(dataPetani).then( async (res) => {
            setTanggalPanen(res.data.tanggalPanen);
        })

    }

    const tanggalPanenChange = async (e) => {

        const tanggal = e.target.value;

        await setTgl(e.target.value);
        
        UserService.onChangeTanggal(petani, tanggal).then( async (res) => {
            await setKualitas(res.data.kualitas);
        })

    }

    const handleVolumeChange = (e) => {
        setValVol(e);
        let vol = e.target.value;
        let hp = (parseInt(vol) * biayaPengemasan);

        setBiayaKemas(hp);

        console.log('testing akmal', e);
        // setHargaP(hp);
        
        let hj = (parseInt(hp) + (parseInt(hpp) * vol))
        console.log('testing akmal 2', hj);

        sethargaJual(hj);
        
    }

    // const getHargaJual = async (bk, volume, hpp) => {
    //     console.log('cek volume', valueVolume.target.value);
    //     let step1 = (parseInt(hpp) * parseInt(valueVolume.target.value));
    //     let step2 = (parseInt(step1) + parseInt(bk));
    //     console.log('cek step 1', step1)
    //     console.log('cek step 1.1', parseInt(hpp))
    //     console.log('cek step 1.2', parseInt(valueVolume.target.value))
    //     console.log('cek step 2', step2)

    //     return step2;
    // }

    // const handleHarga = async (e) => {
    //     let bk = e.target.value;

    //     let hargaJ = await getHargaJual(bk, volume, hpp);
        
    //     await setBiayaKemas(bk);

    //     await console.log('harga jual', hargaJ);

    //     sethargaJual(hargaJ);
    // }

    const kualitasChange = async (e) => {

        const kualitas = e.target.value;
        
        UserService.onChangeKualitas(petani, tgl, kualitas.replaceAll(" ", "_")).then( async (res) => {
            console.log('cek res', res);
            setVolume(res.data.gudang.volume);
            setHpp(res.data.gudang.get_produk.harga);
        })

    }

    const onFileChange = async (e) => {
        const file = e.target.files;
        props.onSelectImage(file);
    };

    const AddItem = async (e) => {
        setItem(parseInt(e) + 1);
    };


    const renderItem = ({ fields, meta: { error, submitFailed } }) => (
        <ul style={{ listStyle: "none", marginLeft: "0px", padding: "0px" }}>
            {fields.map((item, index) => (
                <li key={index} style={{ marginTop: "40px" }}>
                    <CButton
                        type="button"
                        size="sm"
                        color="warning"
                        className="btn-pill"
                        style={{
                            float: "right",
                        }}
                        onClick={() => fields.remove(index)}
                    >
                        <span style={{ color: "white" }}>X</span>
                    </CButton>
                    <h4 style={{ marginTop: "30px" }}>Item #{index + 1}</h4>
                    <Fragment>
                        <CFormGroup>
                            <CRow>
                                <CCol xs={6} md={6} lg={6}>
                                    <CFormGroup>
                                        <CLabel htmlFor="nf-namaJenis">Petani</CLabel>
                                        <Field
                                            className="textInput cabai"
                                            name={`${item}.petani`}
                                            component="select"
                                            onChange={petaniChange(index)}
                                            required={true}
                                        >
                                            <option value="" disabled hidden >-= Pilih Petani =-</option>
                                            {
                                                data.petaniGudang && data.petaniGudang.map(function(p, i) {
                                                    return(
                                                        <option value={p.id} key={i}> {p.username} </option>
                                                    )
                                                })
                                            }
                                        </Field>
                                    </CFormGroup>
                                </CCol>
                                <CCol xs={6} md={6} lg={6}>
                                    <CFormGroup>
                                        <CLabel htmlFor="nf-namaJenis">Tanggal Panen</CLabel>
                                        <Field
                                            className="textInput cabai"
                                            name={`${item}.tanggal_panen`}
                                            component="select"
                                            onChange={tanggalPanenChange(index)}
                                            required={true}
                                        >
                                            {
                                            tanggalPanen ? 
                                                <option value="" disabled hidden >-= Pilih Tanggal Panen =-</option> :
                                                <option value="" disabled hidden >-= Pilih Petani Terlebih Dulu =-</option>
                                            }

                                            {
                                                tanggalPanen && tanggalPanen.map(function(tp, i) {
                                                    return(
                                                        <option value={tp} key={i} > {tp} </option>
                                                    )
                                                })
                                            }

                                        </Field>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs={6} md={6} lg={6}>
                                    <CFormGroup>
                                    <CLabel htmlFor="nf-namaJenis">Kualitas Produk Panen</CLabel>
                                        <Field
                                            className="textInput cabai"
                                            name={`${item}.kualitas_produk_panen`}
                                            component="select"
                                            onChange={kualitasChange(index)}
                                            required={true}
                                        >
                                            {
                                            kualitas ? 
                                                <option value="" disabled hidden >-= Pilih Kualitas Produk Panen =-</option> :
                                                <option value="" disabled hidden >-= Pilih Tanggal Panen Terlebih Dulu =-</option>
                                            }

                                            {
                                                kualitas && kualitas.map(function(k, i) {
                                                    return(
                                                        <option value={k} key={i} > {k} </option>
                                                    )
                                                })
                                            }
                                        </Field>
                                    </CFormGroup>
                                </CCol>
                                <CCol xs={6} md={6} lg={6}>
                                    <CFormGroup>
                                    <CLabel htmlFor="nf-namaJenis">Volume (kg)</CLabel>
                                        <Field
                                            className="textInput cabai"
                                            name={`${item}.volume`}
                                            component="input"
                                            type="number"
                                            min={0}
                                            placeholder="Tentukan volume kilogram"
                                        />
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                        </CFormGroup>
                    </Fragment>
                </li>
            ))}
            <li>
                <CButton
                    type="button"
                    size="sm"
                    color="info"
                    className="btn-pill"
                    onClick={() => fields.push({})}
                >
                    Tambah Item
                </CButton> &nbsp;
                {submitFailed && error && <span>{error}</span>}
            </li>
        </ul>
    );


    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <main className="c-main">
                    <div className="container-fluid">
                        <CCard>
                            <CCardHeader>
                                <CRow>
                                    <CCol xs={9} md={10} lg={11} style={{ margin: "auto" }}>
                                        <h4 style={{ margin: "auto" }}>Input Produk Siap Jual</h4>
                                    </CCol>
                                    <CCol>
                                        <CButton block color="warning" to="/ProdukPackaging">
                                            <span style={{ color: "white" }}>X</span>
                                        </CButton>
                                    </CCol>
                                </CRow>
                            </CCardHeader>
                            <CCardBody>

                                <CRow>
                                    <CCol xs={6} md={6} lg={6}>
                                        <CFormGroup>
                                            <CLabel htmlFor="nf-namaJenis">Nama Produk</CLabel>
                                            <Field
                                                className="textInput cabai"
                                                name="nama_produk"
                                                component="input"
                                                required={true}
                                                placeholder="Masukan nama produk..."
                                            />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs={6} md={6} lg={6}>
                                        <CFormGroup>
                                            <CLabel htmlFor="nf-namaJenis">Tanggal Pengemasan</CLabel>
                                            <DatePicker
                                                selected={startDate}
                                                className="textInput cabai"
                                                onChange={(date) => setStartDate(date)}
                                                maxDate={new Date()}
                                                dateFormat="dd/MMM/yyyy"
                                                name="tanggal_pengemasan"
                                                required={true}
                                                placeholderText="tentukan tanggal pengemasan..."
                                            />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs={12} md={12} lg={12}>
                                        <CFormGroup>
                                            <CLabel htmlFor="nf-namaJenis">Deskripsi Produk</CLabel>
                                            <Field
                                                className="textAreaInput cabai"
                                                name="deskripsi"
                                                component="textarea"
                                                type="text"
                                                required={true}
                                                placeholder="Masukan deskripsi produk..."
                                            />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs={6} md={6} lg={6}>
                                        <CFormGroup>
                                            <CLabel htmlFor="nf-namaJenis">Jenis Produk</CLabel>
                                            <Field
                                                className="textInput cabai"
                                                name="jenis_produk"
                                                component="select"
                                                onChange={(value) => setJenis(value.currentTarget.value)}
                                                required={true}
                                            >
                                                <option value="" disabled hidden >-= Pilih Jenis Produk =-</option>
                                                {/* <option value="Mix">Mix</option> */}
                                                <option value="Single">Single</option>
                                            </Field>
                                        </CFormGroup>
                                    </CCol>
                                    {/* <CCol xs={6} md={6} lg={6}>
                                        <CFormGroup>
                                            <CLabel htmlFor="nf-namaJenis">Kualitas Produk Kemasan</CLabel>
                                            <Field
                                                className="textInput cabai"
                                                name="kualitas"
                                                component="select"
                                                required={true}
                                            >
                                                <option value="" disabled hidden >-= Pilih Kualitas =-</option>
                                                <option value="Kelas Super">Kelas Super</option>
                                                <option value="Kelas 1">Kelas 1</option>
                                                <option value="Kelas 2">Kelas 2</option>
                                            </Field>
                                        </CFormGroup>
                                    </CCol> */}
                                </CRow>

                                {(() => {
                                    if(jenis && jenis === 'Mix') {
                                        return(
                                            <>
                                                <hr></hr>
                                                <CFormGroup>
                                                    <FieldArray name="mitra" component={renderItem} />
                                                </CFormGroup>
                                                <hr></hr>
                                            </>
                                        )
                                    } else if(jenis && jenis === 'Single') {
                                        return (
                                            <>
                                                <hr></hr>
                                                <div>
                                                    <CRow>
                                                        <CCol xs={6} md={6} lg={6}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis">Petani</CLabel>
                                                                <Field
                                                                    className="textInput cabai"
                                                                    name="petani"
                                                                    component="select"
                                                                    onChange={petaniChange}
                                                                    required={true}
                                                                >
                                                                    <option value="" disabled hidden >-= Pilih Petani =-</option>
                                                                    {
                                                                        data.petaniGudang && data.petaniGudang.map(function(p, i) {
                                                                            return(
                                                                                <option value={p.id} key={i}> {p.username} </option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Field>
                                                            </CFormGroup>
                                                        </CCol>
                                                        <CCol xs={6} md={6} lg={6}>
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-namaJenis">Tanggal Panen</CLabel>
                                                                <Field
                                                                    className="textInput cabai"
                                                                    name="tanggal_panen"
                                                                    component="select"
                                                                    onChange={tanggalPanenChange}
                                                                    required={true}
                                                                >
                                                                    {
                                                                    tanggalPanen ? 
                                                                        <option value="" disabled hidden >-= Pilih Tanggal Panen =-</option> :
                                                                        <option value="" disabled hidden >-= Pilih Petani Terlebih Dulu =-</option>
                                                                    }

                                                                    {
                                                                        tanggalPanen && tanggalPanen.map(function(tp, i) {
                                                                            return(
                                                                                <option value={tp} key={i} > {tp} </option>
                                                                            )
                                                                        })
                                                                    }

                                                                </Field>
                                                            </CFormGroup>
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol xs={6} md={6} lg={6}>
                                                            <CFormGroup>
                                                            <CLabel htmlFor="nf-namaJenis">Kualitas Produk Panen</CLabel>
                                                                <Field
                                                                    className="textInput cabai"
                                                                    name="kualitas_produk_panen"
                                                                    component="select"
                                                                    onChange={kualitasChange}
                                                                    required={true}
                                                                >
                                                                    {
                                                                    kualitas ? 
                                                                        <option value="" disabled hidden >-= Pilih Kualitas Produk Panen =-</option> :
                                                                        <option value="" disabled hidden >-= Pilih Tanggal Panen Terlebih Dulu =-</option>
                                                                    }

                                                                    {
                                                                        kualitas && kualitas.map(function(k, i) {
                                                                            return(
                                                                                <option value={k} key={i} > {k} </option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Field>
                                                            </CFormGroup>
                                                        </CCol>
                                                        <CCol xs={6} md={6} lg={6}>
                                                            <CFormGroup>
                                                            <CLabel htmlFor="nf-namaJenis">Volume (kg)</CLabel>
                                                                {
                                                                    volume ? 
                                                                    <NumberFormat 
                                                                        className="textInput cabai" 
                                                                        isAllowed={formatVolume}
                                                                        onChange={(val) => handleVolumeChange(val)}
                                                                        // onChange={}
                                                                        placeholder={`Tentukan volume kilogram maksimal ${volume}`}
                                                                        name="volume"
                                                                        required={true}
                                                                    /> :
                                                                    <Field
                                                                        className="textInput cabai"
                                                                        name="volume"
                                                                        component="input"
                                                                        type="number"
                                                                        min={0}
                                                                        placeholder="Tentukan volume kilogram"
                                                                        required={true}
                                                                    />
                                                                }
                                                            </CFormGroup>
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                                <hr></hr>
                                            </>
                                        )
                                    }
                                })()}

                                <CRow>
                                    <CCol xs={6} md={6} lg={6}>
                                        <CFormGroup>
                                            <CLabel htmlFor="nf-namaJenis">Harga Packaging per Kilo</CLabel>
                                            <input
                                                className="textInput cabai"
                                                name="harga_packaging"
                                                component="input"
                                                value={biayaPengemasan ? `Rp. ${parseInt(biayaPengemasan).toLocaleString('en')}` : ''}
                                                readOnly
                                            />

                                            {/* <Field
                                                className="textInput cabai"
                                                name={`${item}.kualitas_produk_panen`}
                                                component="select"
                                                onChange={handleHarga}
                                                required={true}
                                            >
                                                <option value="" disabled hidden >-= Pilih harga pengemasan =-</option>
                                                {
                                                    data && data.hargaPengemasan.map(function(k, i) {
                                                        return(
                                                            <option value={parseInt(k.harga)} key={i} > Rp. {parseInt(k.harga).toLocaleString('en')} </option>
                                                        )
                                                    })
                                                }
                                            </Field> */}
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs={6} md={6} lg={6}>
                                        <CFormGroup>
                                            <CLabel htmlFor="nf-namaJenis">Upload Foto Produk</CLabel>
                                            <CInputFile
                                                id="file-input"
                                                name="files[]"
                                                type="file"
                                                onChange={onFileChange}
                                                required={true}
                                                accept=".jpg, .jpeg, .png"
                                                multiple
                                            />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>
                                <hr></hr>
                                <CRow>
                                    <CCol xs={6} md={6} lg={6}>
                                        <CFormGroup>
                                            <CLabel htmlFor="nf-namaJenis">Harga Pokok Petani per kilo</CLabel>
                                            <input 
                                                className="textInput cabai"
                                                value={hpp ? "Rp. " + parseInt(hpp).toLocaleString('en') : ""}
                                                name="hpp"
                                                readOnly
                                            />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs={6} md={6} lg={6}>
                                        <CFormGroup>
                                            <CLabel htmlFor="nf-namaJenis">Harga Jual</CLabel>
                                            <input 
                                                className="textInput cabai"
                                                value={hargaJual ? "Rp. " + parseInt(hargaJual).toLocaleString('en') : ""}
                                                name="harga_jual"
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
  form: "AddProdukSiapJual", // a unique identifier for this form
})(AddProdukSiapJualForm);