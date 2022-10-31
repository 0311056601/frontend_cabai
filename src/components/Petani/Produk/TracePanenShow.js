import { Fragment, React, Component } from "react";
import {
  CImg,
  CCard,
  CCardBody,
  CCol,
  CCarousel,
  CCarouselInner,
  CCarouselItem,
  CCarouselControl,
  CRow,
  CNavLink,
} from "@coreui/react";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
  } from 'react-google-maps'
import moment from 'moment';

require("dotenv").config();

const MARKETPLACE_URL = process.env.REACT_APP_CATALOG_URL;

export default class TracePanenShow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.Data,
        };
    }

    renderDetailBatch = () => {
        if (this.state.data) {
            return (
                <Fragment>

                    {/* data produk */}
                    <CRow>
                        <CCol xs="2" lg="5">
                            <h1
                                style={{
                                transform: "rotate(180deg)",
                                transformOrigin: "20% 100%",
                                writingMode: "vertical-lr",
                                color: "#f5ff49",
                                textAlign: "center",
                                }}
                            >
                                <strong>Petani</strong>
                            </h1>
                        </CCol>

                        <CCol xs="10" lg="7">
                            <Fragment>
                                <p>
                                    <strong>Petani:</strong> {this.state.data.user.username}
                                </p>
                                <p>
                                    <strong>Kontak:</strong> {this.state.data.profile.kontak}
                                </p>
                                <p>
                                    <strong>Alamat:</strong> {this.state.data.profile.alamat}
                                </p>
                                <p>
                                    <strong>Photo:</strong> 
                                </p>
                                <p>
                                    <div style={{width: "100%" }}>
                                        <CImg className="d-block w-100" src={process.env.REACT_APP_BACKEND_URL + this.state.data.profile.profile_photo} style={{width: "100%" }} />
                                    </div>
                                </p>
                                <p></p>
                            </Fragment>

                            <hr
                                style={{
                                marginTop: "60px",
                                //   color: "#178d88",
                                backgroundColor: "red",
                                height: 2,
                                }}
                            />
                        </CCol>
                    </CRow>
                    {/* end data produk */}

                    {/* data Lahan */}
                    <CRow>
                        <CCol xs="2" lg="5">
                            <h1
                                style={{
                                transform: "rotate(180deg)",
                                transformOrigin: "20% 75%",
                                writingMode: "vertical-lr",
                                color: "#f5ff49",
                                textAlign: "center",
                                }}
                            >
                                <strong>Lahan</strong>
                            </h1>
                        </CCol>

                        <CCol xs="10" lg="7">
                            <Fragment>

                                <p>
                                    <strong>Lahan:</strong> {this.state.data.lahan.nama_lahan}
                                </p>
                                <p>
                                    <strong>Luas Lahan:</strong> {this.state.data.lahan.luas_lahan} Hektar
                                </p>
                                <p>
                                    <strong>Kepemilikan:</strong> {this.state.data.lahan.status_kepemilikan}
                                </p>
                                <p>
                                    <strong>Alamat:</strong> {this.state.data.lahan.alamat_lahan}
                                </p>
                                <p>
                                    <strong>Foto Lahan:</strong>
                                </p>
                                <p>
                                    <div style={{width: "100%" }}>
                                        <CImg className="d-block w-100" src={process.env.REACT_APP_BACKEND_URL + this.state.data.lahan.get_img[0].image} style={{width: "100%" }} />
                                    </div>
                                </p>

                                {(() => {
                                    if(this.state.data.lahan.latitude && this.state.data.lahan.longitude) {
                                        const apiKey = 'AIzaSyCwO-uMs8PcFmBON8gqQAVK8EdX1NRUnOU' // api google punya akmal

                                        const defaultZoom = 11
                                        // const defaultCenter = { lat: -7.4491301, lng: 110.3810213 }
                                        const defaultCenter = { lat: parseFloat(this.state.data.lahan.latitude), lng: parseFloat(this.state.data.lahan.longitude) }
                                        const locations = [{
                                            lat: parseFloat(this.state.data.lahan.latitude),
                                            lng: parseFloat(this.state.data.lahan.longitude),
                                            label: this.state.data.lahan.luas_lahan,
                                            draggable: false,
                                            title: this.state.data.lahan.nama_lahan,
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
                                                    // onClick={() => setIsOpen(!isOpen)} 
                                                    position={location} 
                                                    title={location.title} 
                                                    label={location.label}
                                                >
                                                {/* { isOpen &&
                                                    <InfoWindow onCloseClick={() => setIsOpen(false)}>
                                                    <CNavLink >{location.title}</CNavLink>
                                                    </InfoWindow>
                                                } */}
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
                                                <p>
                                                    <strong>Maps Lahan:</strong>
                                                </p>
                                                <p>
                                                    <ReactGoogleMaps />
                                                </p>
                                            </>
                                        )

                                    }

                                })()}

                                <hr></hr>

                            </Fragment>

                            <hr
                                style={{
                                marginTop: "60px",
                                //   color: "#178d88",
                                backgroundColor: "red",
                                height: 2,
                                }}
                            />
                        </CCol>

                    </CRow>
                    {/* end data Lahan */}

                    {/* data panen */}
                    <CRow>
                        <CCol xs="2" lg="5">
                            <h1
                                style={{
                                transform: "rotate(180deg)",
                                transformOrigin: "20% 100%",
                                writingMode: "vertical-lr",
                                color: "#f5ff49",
                                textAlign: "center",
                                }}
                            >
                                <strong>Panen</strong>
                            </h1>
                        </CCol>

                        <CCol xs="10" lg="7">
                            <Fragment>
                                <p>
                                    <strong>Tanggal Panen:</strong> {this.state.data.produkPetani.tanggal_panen}
                                </p>
                                <p>
                                    <strong>Kualitas Cabai:</strong> {this.state.data.produkPetani.kualitas}
                                </p>
                                <p>
                                    <strong>Volume:</strong> {this.state.data.produkPetani.volume} Kg
                                </p>
                                <p>
                                    <strong>Status:</strong> {this.state.data.produkPetani.status}
                                </p>
                                <p>
                                    <strong>Foto Panen:</strong> 
                                </p>
                                <p>
                                    <div style={{width: "100%" }}>
                                        <CImg className="d-block w-100" src={process.env.REACT_APP_BACKEND_URL + this.state.data.produkPetani.get_image[0].image} style={{width: "100%" }} />
                                    </div>
                                </p>
                            </Fragment>

                            <hr
                                style={{
                                marginTop: "60px",
                                //   color: "#178d88",
                                backgroundColor: "red",
                                height: 2,
                                }}
                            />
                        </CCol>
                    </CRow>
                    {/* end data panen */}

                    {(() => {
                        if(this.state.data.produk.length > 0) {
                            return(
                                <>
                                    {/* data produk */}
                                    <CRow>
                                        <CCol xs="2" lg="5">
                                            <h1
                                                style={{
                                                transform: "rotate(180deg)",
                                                transformOrigin: "20% 100%",
                                                writingMode: "vertical-lr",
                                                color: "#f5ff49",
                                                textAlign: "center",
                                                }}
                                            >
                                                <strong>Produk</strong>
                                            </h1>
                                        </CCol>

                                        <CCol xs="10" lg="7">
                                            <Fragment>

                                                {
                                                    this.state.data.produk.map((value, index) => {
                                                        return (
                                                            <>
                                                                <div key={index}>
                                                                    <hr></hr>
                                                                    <div align="center">
                                                                        <h4><strong>Data Produk Ke-</strong> {index + 1}</h4>
                                                                    </div>
                                                                    <p>
                                                                        <strong>Nama Produk:</strong> {value.produk_siap_jual.nama_produk}
                                                                    </p>
                                                                    <p>
                                                                        <strong>Deskripsi Produk:</strong> {value.produk_siap_jual.deskripsi_produk}
                                                                    </p>
                                                                    <p>
                                                                        <strong>Tanggal Pengemasan:</strong> {value.produk_siap_jual.tanggal_pengemasan}
                                                                    </p>
                                                                    <p>
                                                                        {/* <strong>Harga Jual:</strong> Rp. {value.produk_siap_jual.harga_jual} */}
                                                                        <strong>Harga Jual:</strong> Rp. {parseInt(value.produk_siap_jual.harga_jual).toLocaleString('en')} - Rp. {(parseInt(value.produk_siap_jual.harga_jual) * 20 / 100 + parseInt(value.produk_siap_jual.harga_jual)).toLocaleString('en')}
                                                                    </p>
                                                                    <p>
                                                                        <strong>Volume:</strong> {value.produk_siap_jual.volume} Kg
                                                                    </p>
                                                                    <p>
                                                                        {/* <strong>Blockchain Hash:</strong> <a style={{ color:"white" }} href={"https://mumbai.polygonscan.com/tx/" + this.state.data.produkHash.hash} target="_blank">{this.state.data.produkHash.hash}</a> */}
                                                                    </p>
                                                                    <p>
                                                                        <strong>Gambar Produk:</strong> 
                                                                    </p>
                                                                    {(() => {
                                                                        if(value.produk_siap_jual_image) {
                                                                            return(
                                                                                <p>
                                                                                    <div style={{width: "100%", height: "400px" }}>
                                                                                        <CCarousel>
                                                                                            <CCarouselInner>
                                                                                                { value.produk_siap_jual_image.map(( value, key ) => {
                                                                                                        return (
                                                                                                            <CCarouselItem key={key}>
                                                                                                                <CImg className="d-block w-100" src={process.env.REACT_APP_BACKEND_URL + value.file} alt={`slide ${key}`} style={{width: "100%", height: "400px" }} />
                                                                                                            </CCarouselItem>
                                                                                                        );
                                                                                                    })
                                                                                                }
                                                                                            </CCarouselInner>
                                                                                            <CCarouselControl direction="prev" />
                                                                                            <CCarouselControl direction="next" />
                                                                                        </CCarousel>
                                                                                    </div>
                                                                                </p>
                                                                            )
                                                                        }
                                                                    })()}
                                                                </div>
                                                            </>
                                                        )
                                                    })

                                                }
                                                <p></p>
                                            </Fragment>

                                        <hr
                                            style={{
                                            marginTop: "60px",
                                            //   color: "#178d88",
                                            backgroundColor: "red",
                                            height: 2,
                                            }}
                                        />
                                        </CCol>
                                    </CRow>
                                    {/* end data produk */}
                                </>
                            )
                        }
                    })()}


                    {(() => {
                        if(this.state.data.transaksi.length > 0) {
                            return(
                                <>
                                    {/* data transaksi */}
                                    <CRow>
                                        <CCol xs="2" lg="5">
                                            <h1
                                                style={{
                                                transform: "rotate(180deg)",
                                                transformOrigin: "20% 100%",
                                                writingMode: "vertical-lr",
                                                color: "#f5ff49",
                                                textAlign: "center",
                                                }}
                                            >
                                                <strong>Transaksi</strong>
                                            </h1>
                                        </CCol>

                                        <CCol xs="10" lg="7">
                                            <Fragment>
                                            {
                                                this.state.data.transaksi.map((value, index) => {
                                                    return (
                                                        <>
                                                            <div key={index}>
                                                            <hr></hr>
                                                                <div align="center">
                                                                    <h4><strong>Transaksi Ke-</strong> {index + 1}</h4>
                                                                </div>
                                                                <p>
                                                                    <strong>Nomor Transaksi:</strong> {value.get_keranjang.no_transaksi}
                                                                </p>
                                                                <p>
                                                                    <strong>Status Transaksi:</strong> {value.status_transaksi}
                                                                </p>
                                                                <p>
                                                                    <strong>Gapoktan:</strong> {value.get_profile_gapoktan.nama} - {value.get_gapoktan.email} - {value.get_profile_gapoktan.kontak}
                                                                </p>
                                                                <p>
                                                                    <strong>Alamat Gapoktan:</strong> {value.get_profile_gapoktan.alamat}
                                                                </p>
                                                                <p>
                                                                    <strong>Pembeli:</strong> {value.get_profile_pembeli.nama} - {value.get_pembeli.email} - {value.get_profile_pembeli.kontak}
                                                                </p>
                                                                <p>
                                                                    <strong>Alamat Pembeli:</strong> {value.get_profile_pembeli.alamat}
                                                                </p>
                                                                <p>
                                                                    <strong>Total Transaksi:</strong> Rp. {parseInt(value.jumlah_pembayaran).toLocaleString('en')}
                                                                </p>
                                                                <p>
                                                                    <strong>Tanggal Transaksi:</strong> {moment(value.created_at).format('DD - MMMM - YYYY H:s')}
                                                                </p>
                                                                <p>
                                                                    <strong>Estimasi Sampai:</strong> {value.est_sampai ? moment(value.est_sampai).format('DD / MMM / YYYY') : 'Belum Diset'}
                                                                </p>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }
                                            </Fragment>

                                            <hr
                                                style={{
                                                marginTop: "60px",
                                                //   color: "#178d88",
                                                backgroundColor: "red",
                                                height: 2,
                                                }}
                                            />
                                        </CCol>
                                    </CRow>
                                    {/* end data transaksi */}
                                </>
                            )
                        }
                    })()}

                </Fragment>
            );
        } else {
            return (
                <div style={{ textAlign: "center" }}>
                    <h4>Product Not Found...</h4>
                </div>
            );
        }
    };

    render() {
        return (
            <Fragment>
                <main className="c-main">
                    <div className="container-fluid">
                        <CCard style={{ backgroundColor: "#67ba64", color: "white" }}>
                            <CCardBody style={{ padding: "5%" }}>
                                {this.renderDetailBatch()}
                            </CCardBody>
                        </CCard>
                    </div>
                </main>
            </Fragment>
        );
    }
}
