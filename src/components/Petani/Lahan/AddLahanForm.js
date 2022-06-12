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
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';

const AddLahanForm = (props) => {
    var { handleSubmit } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [lokasi_lat, setLat] = useState('');
    const [lokasi_lng, setLng] = useState('');

    const apiKey = 'AIzaSyCwO-uMs8PcFmBON8gqQAVK8EdX1NRUnOU' // api google punya akmal

    const defaultZoom = 11
    // const defaultCenter = { lat: -7.4491301, lng: 110.3810213 }
    const defaultCenter = { lat: parseFloat(lokasi_lat), lng: parseFloat(lokasi_lng) }
    const locations = [{
        lat: parseFloat(lokasi_lat),
        lng: parseFloat(lokasi_lng),
        label: '',
        draggable: false,
        title: '',
    }]

    const MarkerList = () => {
        return locations.map((location, index) => {
            return (
                <MarkerWithInfoWindow key={index.toString()} location={location}/>
            )
        })
    }

    const MarkerWithInfoWindow = ({location}) => {
        return (
            <Marker 
                onClick={() => setIsOpen(!isOpen)} 
                position={location} 
                title={location.title} 
                label={location.label}
            >
            { isOpen &&
                <InfoWindow onCloseClick={() => setIsOpen(false)}>
                <CNavLink >{location.title}</CNavLink>
                </InfoWindow>
            }
            </Marker>
        )
    }

    const GoogleMapsComponent = withScriptjs(withGoogleMap(() => {
        return (
        <GoogleMap defaultZoom={defaultZoom} defaultCenter={defaultCenter}>
        {/* <GoogleMap defaultZoom={defaultZoom} defaultCenter={locations}> */}
            {<MarkerList />}
        </GoogleMap>
        )
    }))

    const ReactGoogleMaps = () => {
        return (
            <CCard>
                <GoogleMapsComponent
                    key="map"
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`}
                    loadingElement={<div style={{height: `100%`}}/>}
                    containerElement={<div style={{height: `400px`}}/>}
                    mapElement={<div style={{height: `100%`}}/>}
                />
            </CCard>
        )
    }

    const onFileChange = (e) => {
        const file = e.target.files;
        props.onSelectImage(file);
    };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <main className="c-main">
            <div className="container-fluid">
                <CCard>
                    <CCardHeader>
                        <CRow>
                            <CCol xs={9} md={10} lg={11} style={{ margin: "auto" }}>
                                <h4 style={{ margin: "auto" }}>Input Lahan</h4>
                            </CCol>
                            <CCol>
                                <CButton block color="warning" to="/ListLahan">
                                    <span style={{ color: "white" }}>X</span>
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCardHeader>
                    <CCardBody>
                        <h5>Wajib Diisi</h5>
                        <br></br>
                        <CRow>
                            <CCol xs={6} md={6} lg={6}>
                                <CFormGroup>
                                    <CLabel htmlFor="nf-namaJenis">Nama Lahan</CLabel>
                                    <Field
                                        className="textInput cabai"
                                        name="nama_lahan"
                                        component="input"
                                        required={true}
                                    />
                                </CFormGroup>
                            </CCol>
                            <CCol xs={6} md={6} lg={6}>
                                <CFormGroup>
                                    <CLabel htmlFor="nf-namaJenis">Luas Lahan</CLabel>
                                    <Field
                                        className="textInput cabai"
                                        name="luas_lahan"
                                        component="input"
                                        type="number"
                                        placeholder="hektar"
                                        required={true}
                                    />
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs={6} md={6} lg={6}>
                                <CFormGroup>
                                    <CLabel htmlFor="nf-namaJenis">Status Kepemilikan</CLabel>
                                    <Field
                                        className="textInput cabai"
                                        name="status_kepemilikan"
                                        component="select"
                                        required={true}
                                    >
                                        <option value="" disabled hidden >-= Pilih =-</option>
                                        <option value="Sewa">Sewa</option>
                                        <option value="Milik Sendiri">Milik Sendiri</option>
                                    </Field>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs={12} md={12} lg={12}>
                                <CFormGroup>
                                    <CLabel htmlFor="nf-namaJenis">Alamat Lahan</CLabel>
                                    <Field
                                        className="textAreaInput cabai"
                                        name="alamat_lahan"
                                        component="textarea"
                                        type="text"
                                        required={true}
                                    />
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs={12} md={12} lg={12}>
                                <CFormGroup>
                                    <CLabel htmlFor="nf-namaJenis">Upload Foto Lahan</CLabel>
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
                        <h5>Tidak Wajib Diisi</h5>
                        <br></br>
                        <CRow>
                            <CCol xs={6} md={6} lg={6}>
                                <CFormGroup>
                                    <CLabel htmlFor="nf-namaJenis">Latitude</CLabel>
                                    <Field
                                        className="textInput cabai"
                                        name="latitude"
                                        component="input"
                                        type="text"
                                        onChange={(lat) => setLat(lat.currentTarget.value)}
                                    />
                                </CFormGroup>
                            </CCol>
                            <CCol xs={6} md={6} lg={6}>
                                <CFormGroup>
                                    <CLabel htmlFor="nf-namaJenis">Longitude</CLabel>
                                    <Field
                                        className="textInput cabai"
                                        name="longitude"
                                        component="input"
                                        type="text"
                                        onChange={(lng) => setLng(lng.currentTarget.value)}
                                    />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CCardBody>
                            <ReactGoogleMaps />
                        </CCardBody>

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
})(AddLahanForm);