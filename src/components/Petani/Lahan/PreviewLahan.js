import { Fragment, useState, useEffect } from "react";
import "../../Cabai.css";
import "../../CabaiMedia.css";
import UserService from '../../../services/user.service';
import showResults from '../../showResults/showResults';
import { css } from "@emotion/react";
import Loader from "react-spinners/DotLoader";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CButton,
    CFormGroup,
    CNavLink,
    CCarousel,
    CCarouselInner,
    CCarouselItem,
    CCarouselControl,
    CImg,
} from "@coreui/react";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from 'react-google-maps';

const PreviewLahan = () => {
  // Can be a string as well. Need to ensure each key-value pair ends with ;

  const { lahanId } = useParams();

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `
  ;

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#3c4b64");
  const [redirect, setRedirect] = useState(false);
  const [dataLahan, setDataLahan] = useState(false);

    const getLahan = () => {
        UserService.DetailLahan(lahanId).then((response) => {
            setDataLahan(response.data.lahan);
            console.log('cek response', response.data.lahan);
        })
    }

    useEffect(() => {
        getLahan();
    }, []);

    return (
        <Fragment>
            {(() => {
                if (loading === true) {
                    return (
                        <>
                            <div style={{textAlign : 'center', verticalAlign : 'middle', paddingTop : "150px"}}>
                                <div className="sweet-loading">
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <h5>Mohon Tunggu...</h5>
                                </div>
                            </div>
                        </>
                    )
                } else {
                    return(
                        <Fragment>
                            <main className="c-main">
                                <div className="container-fluid">
                                    <CCard>
                                        <CCardBody>
                                            <CRow>
                                                <CCol xs="12">
                                                    <CCardHeader>
                                                        <CRow>
                                                            <CCol
                                                                xs={6}
                                                                md={7}
                                                                lg={10}
                                                                style={{ margin: "auto" }}
                                                            >
                                                                <h4 style={{ margin: "auto" }}>Preview Lahan</h4>
                                                            </CCol>
                                                        </CRow>
                                                    </CCardHeader>
                                                    <CCardBody>
                                                        <CRow>
                                                            <CCol xs={6} md={6} lg={6}>
                                                                <CFormGroup>
                                                                    <p>
                                                                        <strong>Nama Lahan:</strong> {dataLahan.nama_lahan}
                                                                    </p>
                                                                </CFormGroup>
                                                            </CCol>
                                                            <CCol xs={6} md={6} lg={6}>
                                                                <CFormGroup>
                                                                    <p>
                                                                        <strong>Alamat Lahan:</strong> {dataLahan.alamat_lahan}
                                                                    </p>
                                                                </CFormGroup>
                                                            </CCol>
                                                        </CRow> 
                                                        <CRow> 
                                                            <CCol xs={6} md={6} lg={6}>
                                                                <CFormGroup>
                                                                    <p>
                                                                        <strong>Luas Lahan:</strong> {dataLahan.luas_lahan} Hektar
                                                                    </p>
                                                                </CFormGroup>
                                                            </CCol>
                                                            <CCol xs={6} md={6} lg={6}>
                                                                <CFormGroup>
                                                                    <p>
                                                                        <strong>Status:</strong> {dataLahan.status_kepemilikan}
                                                                    </p>
                                                                </CFormGroup>
                                                            </CCol>
                                                        </CRow>
                                                        {(() => {
                                                            if (dataLahan.get_img && dataLahan.get_img.length > 0) {
                                                                return (
                                                                    <>
                                                                        <CCard color="secondary">
                                                                            <CCardBody>
                                                                                <p>
                                                                                    <strong>Gambar:</strong>
                                                                                </p>
                                                                                <CRow align="center">
                                                                                    {
                                                                                        dataLahan.get_img && dataLahan.get_img.map(function(v, i) {
                                                                                            return(
                                                                                                <div style={{width: "100%", height: "400px" }} key={i}>
                                                                                                    <CCarousel>
                                                                                                        <CCarouselInner>
                                                                                                            <CCarouselItem>
                                                                                                                <CImg className="d-block w-50" src={process.env.REACT_APP_BACKEND_URL + v.image} alt={`slide ${i}`} style={{width: "100%", height: "400px" }} />
                                                                                                            </CCarouselItem>
                                                                                                        </CCarouselInner>
                                                                                                        <CCarouselControl direction="prev" />
                                                                                                        <CCarouselControl direction="next" />
                                                                                                    </CCarousel>
                                                                                                </div>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </CRow>
                                                                            </CCardBody>
                                                                        </CCard>
                                                                    </>
                                                                )
                                                            }
                                                        })()}
                                                        <hr></hr>
                                                        {(() => {
                                                            if (dataLahan.latitude && dataLahan.longitude) {
                                                                const apiKey = 'AIzaSyCwO-uMs8PcFmBON8gqQAVK8EdX1NRUnOU' // api google punya akmal

                                                                const defaultZoom = 11
                                                                // const defaultCenter = { lat: -7.4491301, lng: 110.3810213 }
                                                                const defaultCenter = { lat: parseFloat(dataLahan.latitude), lng: parseFloat(dataLahan.longitude) }
                                                                const locations = [{
                                                                    lat: parseFloat(dataLahan.latitude),
                                                                    lng: parseFloat(dataLahan.longitude),
                                                                    label: dataLahan.luas_lahan,
                                                                    draggable: false,
                                                                    title: dataLahan.nama_lahan,
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
                                                                            position={location} 
                                                                            title={location.title} 
                                                                            label={location.label}
                                                                        >
                                                                            <InfoWindow>
                                                                                <CNavLink >{location.title}</CNavLink>
                                                                            </InfoWindow>
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

                                                                return(
                                                                    <>
                                                                        <div>
                                                                            <ReactGoogleMaps />
                                                                        </div>
                                                                    </>
                                                                )
                                                            }
                                                        })()}
                                                    </CCardBody>
                                                </CCol>
                                            </CRow>
                                        </CCardBody>
                                    </CCard>
                                </div>
                            </main>
                        </Fragment>
                    )
                }
            }
            )()}
        </Fragment>
    );

};
export default PreviewLahan;