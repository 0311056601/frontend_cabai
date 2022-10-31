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

export default class GetQRTransaksiRequestShow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.DataQR,
            pembeli: props.DataQR.pembeli,
            gapoktan: props.DataQR.gapoktan,
            transaksi: props.DataQR.transaksi,
            detailCabai: props.DataQR.detailCabai,
        };
    }

    renderDetail = () => {
        console.log('cek data',this.state);
        if (this.state.data) {
            return (
                <Fragment>

                    {/* data Transaksi */}
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
                                <strong>Transaksi</strong>
                            </h1>
                        </CCol>

                        <CCol xs="10" lg="7">
                            <Fragment>
                                <p>
                                    <strong>Nomor Transaksi:</strong> {this.state.transaksi.no_transaksi}
                                </p>
                                <p>
                                    <strong>Status Transaksi:</strong> {this.state.transaksi.status}
                                </p>
                                <p>
                                    <strong>Volume:</strong> {this.state.transaksi.volume_final ? this.state.transaksi.volume_final : this.state.transaksi.volume} Kg
                                </p>
                                <p>
                                    <strong>Kualitas:</strong> {this.state.transaksi.kualitas}
                                </p>
                                <p>
                                    <strong>Catatan:</strong> {this.state.transaksi.catatan}
                                </p>
                                <p>
                                    <strong>Supply Demand:</strong> {this.state.transaksi.supply_demand === 0 ? '0%' : '20%'}
                                </p>
                                <p>
                                    <strong>Total Transaksi:</strong> Rp. {parseInt(this.state.transaksi.harga).toLocaleString('en')}
                                </p>
                                <p>
                                    <strong>Tanggal Transaksi:</strong> {moment(this.state.transaksi.created_at).format('DD - MMMM - YYYY H:s')}
                                </p>
                                <p>
                                    <strong>Estimasi Sampai:</strong> {moment(this.state.transaksi.est_sampai).format('DD - MMMM - YYYY')}
                                </p>
                                {
                                    this.state.detailCabai && this.state.detailCabai.map((value, index) => {
                                        return(
                                            <p key={index}>
                                                <strong>Cabai Petani {value.get_petani.username}:</strong> {value.volume_out} Kg
                                            </p>
                                        )
                                    })
                                }
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
                    {/* end data transaksi */}

                    {/* data Konsumen */}
                    <CRow>
                        <CCol xs="2" lg="5">
                            <h1
                                style={{
                                transform: "rotate(180deg)",
                                transformOrigin: "20% 50%",
                                writingMode: "vertical-lr",
                                color: "#f5ff49",
                                textAlign: "center",
                                }}
                            >
                                <strong>Konsumen</strong>
                            </h1>
                        </CCol>

                        <CCol xs="10" lg="7">
                            <Fragment>
                                <p>
                                    <strong>Nama Konsumen:</strong> {this.state.pembeli.nama}
                                </p>
                                <p>
                                    <strong>Alamat Konsumen:</strong> {this.state.pembeli.alamat}
                                </p>
                                <p>
                                    <strong>Kontak Konsumen:</strong> {this.state.pembeli.kontak}
                                </p>
                                <p>
                                    <strong>Email Konsumen:</strong> {this.state.pembeli.get_user.email}
                                </p>
                                {
                                    this.state.pembeli.profile_photo ?
                                    (
                                        <>
                                            <p>
                                                <strong>Photo Konsumen:</strong>
                                            </p>
                                            
                                            <p>
                                                <CImg
                                                    src={process.env.REACT_APP_BACKEND_URL + this.state.pembeli.profile_photo}
                                                    className="d-block w-100"
                                                    alt={this.state.pembeli.nama}
                                                />
                                            </p>
                                        </>

                                    ) :
                                    (
                                        <p>

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
                    {/* end data Konsumen */}

                    {/* data Gapoktan */}
                    <CRow>
                        <CCol xs="2" lg="5">
                            <h1
                                style={{
                                transform: "rotate(180deg)",
                                transformOrigin: "20% 50%",
                                writingMode: "vertical-lr",
                                color: "#f5ff49",
                                textAlign: "center",
                                }}
                            >
                                <strong>Gapoktan</strong>
                            </h1>
                        </CCol>

                        <CCol xs="10" lg="7">
                            <Fragment>
                                <p>
                                    <strong>Nama Gapoktan:</strong> {this.state.gapoktan.nama}
                                </p>
                                <p>
                                    <strong>Alamat Gapoktan:</strong> {this.state.gapoktan.alamat}
                                </p>
                                <p>
                                    <strong>Kontak Gapoktan:</strong> {this.state.gapoktan.kontak}
                                </p>
                                <p>
                                    <strong>Email Gapoktan:</strong> {this.state.gapoktan.get_user.email}
                                </p>
                                {
                                    this.state.gapoktan.profile_photo ?
                                    (
                                        <>
                                            <p>
                                                <strong>Photo Gapoktan:</strong>
                                            </p>
                                            
                                            <p>
                                                <CImg
                                                    src={process.env.REACT_APP_BACKEND_URL + this.state.gapoktan.profile_photo}
                                                    className="d-block w-100"
                                                    alt={this.state.gapoktan.nama}
                                                />
                                            </p>
                                        </>

                                    ) :
                                    (
                                        <p>

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
                    {/* end data Gapoktan */}

                    
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
