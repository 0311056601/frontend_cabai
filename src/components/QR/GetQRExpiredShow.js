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
import moment from 'moment';

require("dotenv").config();

const MARKETPLACE_URL = process.env.REACT_APP_BACKEND_URL;

export default class GetQRExpiredShow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.DataQR.data,
            detail: props.DataQR.detail,
            transaksiHash: props.DataQR.transaksiHash,
        };
    }

    renderDetail = () => {
        console.log('cek data',this.state.data);
        console.log('cek detail',this.state.detail);
        console.log('cek transaksiHash',this.state.transaksiHash);
        if (this.state.data) {
            return (
                <Fragment>

                    {/* data Expired */}
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
                                <strong>DATA</strong>
                            </h1>
                        </CCol>

                        <CCol xs="10" lg="7">
                            <Fragment>
                                <p>
                                    <strong>Tanggal Proses:</strong> {moment(this.state.data.created_at).format('DD / MMMM / YYYY H:s')}
                                </p>
                                <p>
                                    <strong>Gapoktan:</strong> {this.state.data.get_gapoktan.username}
                                </p>
                                <p>
                                    <strong>Total Volume:</strong> {this.state.data.jumlah_volume} Kg
                                </p>
                                <p>
                                    <strong>Catatan:</strong> {this.state.data.catatan}
                                </p>
                                {
                                    this.state.transaksiHash ?
                                    (
                                        <p>
                                            <strong>Blockchain Hash:</strong> {this.state.transaksiHash.hash}
                                        </p>
                                    ) :
                                    (
                                        <p> </p>
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
                    {/* end data expired */}

                    {/* data detail expired */}
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
                                <strong>DETAIL</strong>
                            </h1>
                        </CCol>

                        <CCol xs="10" lg="7">
                            <Fragment>
                                {
                                    this.state.detail && this.state.detail.map((value, index) => {
                                        return(
                                            <>
                                                <div key={index}>
                                                    <hr></hr>
                                                    <h3>Detail Data #{index+1}</h3>
                                                    <p>
                                                        <strong>Petani:</strong> {value.get_petani.username}
                                                    </p>
                                                    <p>
                                                        <strong>Tanggal Panen:</strong> {moment(value.tanggal_panen).format('DD / MMMM / YYYY')}
                                                    </p>
                                                    <p>
                                                        <strong>Kualitas:</strong> {value.kualitas}
                                                    </p>
                                                    <p>
                                                        <strong>Volume:</strong> {`${value.volume} Kg`}
                                                    </p>
                                                    <p>
                                                        <strong>Tanggal Expired Gudang:</strong> {value.expired}
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
                    {/* end data detail expired */}
                    
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
