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

export default class GetQRTransaksiShow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.DataQR,
            lahan: props.DataQR.lahan,
            produk: props.DataQR.produk,
            petani: props.DataQR.petani,
            pembeli: props.DataQR.pembeli,
            gapoktan: props.DataQR.gapoktan,
            transaksi: props.DataQR.transaksi,
        };
    }

    renderDetail = () => {
        console.log('cek data',this.state.data);
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
                                <strong>Produk</strong>
                            </h1>
                        </CCol>

                        <CCol xs="10" lg="7">
                            <Fragment>
                                <p>
                                    <strong>Nama Produk:</strong> {this.state.produk.nama_produk}
                                </p>
                                <p>
                                    <strong>Deskripsi Produk:</strong> {this.state.produk.deskripsi_produk}
                                </p>
                                <p>
                                    <strong>Tanggal Pengemasan:</strong> {moment(this.state.produk.tanggal_pengemasan).format('DD - MMMM - YYYY')}
                                </p>
                                <p>
                                    <strong>Harga Jual:</strong> Rp. {parseInt(this.state.produk.harga_jual).toLocaleString('en')}
                                </p>
                                <p>
                                    <strong>Volume:</strong> {this.state.produk.volume} Kg
                                </p>
                                <p>
                                    <strong>Blockchain Hash:</strong> <a style={{ color:"white" }} href={"https://mumbai.polygonscan.com/tx/" + this.state.data.produkHash.hash} target="_blank">{this.state.data.produkHash.hash}</a>
                                </p>
                                <p>
                                    <strong>Gambar Produk:</strong> 
                                </p>
                                {(() => {
                                    if(this.state.produk.get_img) {
                                        return(
                                            <p>
                                                <div style={{width: "100%", height: "400px" }}>
                                                    <CCarousel>
                                                        <CCarouselInner>
                                                            { this.state.produk.get_img && 
                                                                this.state.produk.get_img.map((value, index) => {
                                                                    return (
                                                                        <CCarouselItem key={index}>
                                                                            <CImg className="d-block w-100" src={process.env.REACT_APP_BACKEND_URL + value.file} alt={`slide ${index}`} style={{width: "100%", height: "400px" }} />
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
                                <strong>Transaksi</strong>
                            </h1>
                        </CCol>

                        <CCol xs="10" lg="7">
                            <Fragment>
                                <p>
                                    <strong>Nomor Transaksi:</strong> {this.state.data.keranjang.no_transaksi}
                                </p>
                                <p>
                                    <strong>Status Transaksi:</strong> {this.state.transaksi.status_transaksi}
                                </p>
                                <p>
                                    <strong>Pembeli:</strong> {this.state.pembeli.nama}
                                </p>
                                <p>
                                    <strong>Alamat Pembeli:</strong> {this.state.pembeli.alamat}
                                </p>
                                <p>
                                    <strong>Gapoktan:</strong> {this.state.gapoktan.nama}
                                </p>
                                <p>
                                    <strong>Total Transaksi:</strong> Rp. {parseInt(this.state.transaksi.jumlah_pembayaran).toLocaleString('en')}
                                </p>
                                <p>
                                    <strong>Tanggal Transaksi:</strong> {moment(this.state.transaksi.created_at).format('DD - MMMM - YYYY H:s')}
                                </p>
                                {
                                    this.state.data.transaksiHash && this.state.data.transaksiHash.hash ?
                                    (
                                        <p>
                                            <strong>Blockchain Hash:</strong> <a style={{ color:"white" }} href={"https://mumbai.polygonscan.com/tx/" + this.state.data.transaksiHash.hash} target="_blank">{this.state.data.transaksiHash.hash}</a>
                                        </p>
                                    ) :
                                    (
                                        <p>
                                            <strong>Blockchain Hash:</strong> Belum ditulis ke blockchain
                                        </p>
                                    )
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
                    {/* end data panen */}

                    {/* data Lahan */}
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
                                    <strong>Petani:</strong> {this.state.data.petani.username}
                                </p>
                                <p>
                                    <strong>Alamat Petani:</strong> {this.state.data.petani.get_profile && this.state.data.petani.get_profile.alamat ? this.state.data.petani.get_profile.alamat : "Petani belum menginput alamt"}
                                </p>
                                <hr></hr>
                                <p>
                                    <h4>Lahan</h4>
                                </p>
                                {
                                    this.state.lahan && this.state.lahan.map(function(v, i) {

                                        if(v.latitude && v.longitude) {

                                            const apiKey = 'AIzaSyCwO-uMs8PcFmBON8gqQAVK8EdX1NRUnOU' // api google punya akmal

                                            const defaultZoom = 11
                                            // const defaultCenter = { lat: -7.4491301, lng: 110.3810213 }
                                            const defaultCenter = { lat: parseFloat(v.latitude), lng: parseFloat(v.longitude) }
                                            const locations = [{
                                                lat: parseFloat(v.latitude),
                                                lng: parseFloat(v.longitude),
                                                label: v.luas_lahan,
                                                draggable: false,
                                                title: v.nama_lahan,
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
                                                    <div key={i}>
                                                        <p>
                                                            <strong>Nama Lahan:</strong> {v.nama_lahan}
                                                        </p>
                                                        <p>
                                                            <strong>Status Lahan:</strong> {v.status_kepemilikan}
                                                        </p>
                                                        <p>
                                                            <strong>Alamat Lahan:</strong> {v.alamat_lahan}
                                                        </p>
                                                        <p>
                                                            <strong>Luas Lahan:</strong> {v.luas_lahan} Hektar
                                                        </p>
                                                        <p>
                                                            <strong>Foto Lahan:</strong> {v.get_img.length < 1 ? " - " : " "}
                                                        </p>
                                                        {(() => {
                                                            if(v.get_img) {
                                                                return(
                                                                    <p>
                                                                        <div style={{width: "100%", height: "400px" }}>
                                                                            <CCarousel>
                                                                                <CCarouselInner>
                                                                                    { v.get_img && 
                                                                                        v.get_img.map((value, index) => {
                                                                                            return (
                                                                                                <CCarouselItem key={index}>
                                                                                                    <CImg className="d-block w-100" src={process.env.REACT_APP_BACKEND_URL + value.image} alt={`slide ${index}`} style={{width: "100%", height: "400px" }} />
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

                                                        <p>
                                                            <strong>Maps Lahan:</strong>
                                                        </p>
                                                        <p>
                                                            <ReactGoogleMaps />
                                                        </p>

                                                        <hr></hr>
                                                    </div>
                                                </>
                                            )
                                        } else {
                                            return(
                                                <>
                                                    <div key={i}>
                                                        <p>
                                                            <strong>Nama Lahan:</strong> {v.nama_lahan}
                                                        </p>
                                                        <p>
                                                            <strong>Status Lahan:</strong> {v.status_kepemilikan}
                                                        </p>
                                                        <p>
                                                            <strong>Alamat Lahan:</strong> {v.alamat_lahan}
                                                        </p>
                                                        <p>
                                                            <strong>Luas Lahan:</strong> {v.luas_lahan} Hektar
                                                        </p>
                                                        <p>
                                                            <strong>Foto Lahan:</strong> {v.get_img.length < 1 ? " - " : " "}
                                                        </p>

                                                        {(() => {
                                                            if(v.get_img) {
                                                                return(
                                                                    <p>
                                                                        <div style={{width: "100%", height: "400px" }}>
                                                                            <CCarousel>
                                                                                <CCarouselInner>
                                                                                    { v.get_img && 
                                                                                        v.get_img.map((value, index) => {
                                                                                            return (
                                                                                                <CCarouselItem key={index}>
                                                                                                    <CImg className="d-block w-100" src={process.env.REACT_APP_BACKEND_URL + value.image} alt={`slide ${index}`} style={{width: "100%", height: "400px" }} />
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
                        
                                                        <hr></hr>
                                                    </div>
                                                </>
                                            )
                                        }
                                    })
                                }
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

                    
                    {(() => {
                        if(this.state.data.qrcode) {
                            return(
                                <CRow style={{ marginTop: "40px" }}>
                                    <CCol xs="2" lg="5">
                                    <h1
                                        style={{
                                        transform: "rotate(180deg)",
                                        transformOrigin: "20% 55%",
                                        writingMode: "vertical-lr",
                                        color: "darkOrange",
                                        textAlign: "center",
                                        }}
                                    >
                                        <strong>QR CODE</strong>
                                    </h1>
                                    </CCol>

                                    <CCol xs="10" lg="7">
                                    <CCol xs="12" lg="7">
                                        <CImg
                                            src={MARKETPLACE_URL + this.state.data.qrcode}
                                            className="d-block w-100"
                                            alt={this.state.data.id}
                                        />
                                    </CCol>

                                    <hr
                                        style={{
                                        marginTop: "60px",
                                        color: "#178d88",
                                        backgroundColor: "#178d88",
                                        height: 2,
                                        }}
                                    />
                                    </CCol>
                                </CRow>
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
                                {this.renderDetail()}
                            </CCardBody>
                        </CCard>
                    </div>
                </main>
            </Fragment>
        );
    }
}
