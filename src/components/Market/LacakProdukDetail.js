import { Fragment, React, Component } from "react";
import "../Cabai.css";
import "../CabaiMedia.css";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLabel,
  CInput,
  CFormGroup,
  CDataTable,
  CRow,
  CButton,
  CProgress,
  CProgressBar,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";
import UserService from '../../services/user.service';
import { Redirect } from "react-router-dom";
import LacakProdukDetail from './LacakProdukDetail';

export default class LacakProduk extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.DATA,
        };
    }


    render() {

        return (
            <CCard>
                <CCardBody>

                    <CFormGroup>
                        <div className="container-fluid">
                            <CRow>
                                <h2>{this.state.data.keranjang.no_transaksi}</h2>
                            </CRow>
                        </div>
                    </CFormGroup>
                    <hr></hr>
                    <br></br>

                    <CFormGroup>
                        <h4><strong>Status Transaksi :</strong> {this.state.data.transaksi.status_transaksi} </h4> &nbsp;
                        <h4><strong>Proses Transaksi :</strong> {this.state.data.transaksi.status_transaksi === 'Barang telah diterima' ? "Completed" : this.state.data.transaksi.progress_transaksi+"%"} </h4> &nbsp;&nbsp;

                            {(() => {
                                if(this.state.data.transaksi.status_transaksi === 'Check Out') {
                                    return (
                                        <>
                                            <CProgress className="mb-3">
                                                <CProgressBar color="danger" value={30}>Check Out</CProgressBar>
                                                <CProgressBar color="danger" animated value={20}>Konfirmasi Pembayaran</CProgressBar>
                                            </CProgress>
                                        </>
                                    )
                                } else if(this.state.data.transaksi.status_transaksi === 'Menunggu Konfirmasi Pembayaran') {
                                    return (
                                        <>
                                            <CProgress className="mb-3">
                                                <CProgressBar color="danger" value={30}>Check Out</CProgressBar>
                                                <CProgressBar color="danger" value={20}>Konfirmasi Pembayaran</CProgressBar>
                                                <CProgressBar color="danger" animated value={20}>Menunggu Dikonfirmasi</CProgressBar>
                                            </CProgress>
                                        </>
                                    )
                                } else if(this.state.data.transaksi.status_transaksi === 'Pembayaran Dikonfirmasi') {
                                    return (
                                        <>
                                            <CProgress className="mb-3">
                                                <CProgressBar color="danger" value={30}>Check Out</CProgressBar>
                                                <CProgressBar color="danger" value={20}>Konfirmasi Pembayaran</CProgressBar>
                                                <CProgressBar color="danger" value={20}>Pembayaran Dikonfirmasi</CProgressBar>
                                                <CProgressBar color="danger" animated value={10}>Proses Pengiriman</CProgressBar>
                                            </CProgress>
                                        </>
                                    )
                                } else if(this.state.data.transaksi.status_transaksi === 'Produk Dikirim Oleh Gapoktan') {
                                    return (
                                        <>
                                            <CProgress className="mb-3">
                                                <CProgressBar color="danger" value={30}>Check Out</CProgressBar>
                                                <CProgressBar color="danger" value={20}>Konfirmasi Pembayaran</CProgressBar>
                                                <CProgressBar color="danger" value={20}>Pembayaran Dikonfirmasi</CProgressBar>
                                                <CProgressBar color="danger" animated value={10}>Produk Dalam Perjalanan</CProgressBar>
                                            </CProgress>
                                        </>
                                    )
                                } else if(this.state.data.transaksi.status_transaksi === 'Barang telah diterima') {
                                    return (
                                        <>
                                            <CProgress className="mb-3">
                                                <CProgressBar color="danger" value={30}>Check Out</CProgressBar>
                                                <CProgressBar color="danger" value={20}>Konfirmasi Pembayaran</CProgressBar>
                                                <CProgressBar color="danger" value={20}>Pembayaran Dikonfirmasi</CProgressBar>
                                                <CProgressBar color="danger" value={10}>Produk Dikirim</CProgressBar>
                                                <CProgressBar color="danger" value={20}>Barang telah diterima</CProgressBar>
                                            </CProgress>
                                        </>
                                    )
                                }
                            })()}

                    </CFormGroup>

                </CCardBody>

            </CCard>
        );

    }
}