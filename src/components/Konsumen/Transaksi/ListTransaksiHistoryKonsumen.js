import { Fragment, React, Component } from "react";
import "../../Cabai.css";
import "../../CabaiMedia.css";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import UserService from '../../../services/user.service';
import moment from 'moment';

export default class ListTransaksiHistoryKonsumen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: null,
        };
    }

    componentDidMount() {
        UserService.ListTransaksiHistoryKonsumen().then( async (response) => {
            this.setState({
                content: response.data.data,
            });
        },
        (error) => {
            this.setState({
            content:
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString(),
            });
        }
        );
    }


    handleKonfirmasi = async (item) => {

        await UserService.KonfirmasiBarang(item.id).then( async (response) => {
            if(response.data.message) {
                alert(response.data.message);
            } else {
                alert('Data berhasil dikonfirmasi');
            }
        });

        await UserService.ListTransaksiHistoryKonsumen().then( async (response) => {
            this.setState({
                content: response.data.data,
            });
        },
        (error) => {
            this.setState({
            content:
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString(),
            });
        }
        );

    }


    render() {

        const Data = [
            { key: "nomor", label: "No", _style: { textAlign: "center"}},
            { key: "transaksi", label: "Transaksi", _style: { textAlign: "center"}},
            { key: "status_transaksi", label: "Status", _style: { textAlign: "center"}},
            { key: "created_at", label: "Tanggal", _style: { textAlign: "center"}},
            {
                key: "dataControl",
                label: "Aksi",
                filter: false,
                _style: { textAlign: "center", width: "25%" },
            },
        ];

        
        if(this.state.content){
            return (
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
                                                        <h4 style={{ margin: "auto" }}>History Transaksi Konsumen</h4>
                                                    </CCol>
                                                </CRow>
                                            </CCardHeader>
                                            <CCardBody>
                                                <CDataTable
                                                    items={this.state.content}
                                                    fields={Data}
                                                    itemsPerPage={10}
                                                    tableFilter
                                                    cleaner
                                                    itemsPerPageSelect
                                                    hover
                                                    sorter
                                                    pagination
                                                    scopedSlots={{
                                                        nomor: (item, index) => {
                                                            return (
                                                                <>
                                                                    <td style={{ margin:"auto", textAlign:"center"}}>
                                                                        {index + 1}
                                                                    </td>
                                                                </>
                                                            )
                                                        },
                                                        transaksi: (item) => {
                                                            return (
                                                                <>
                                                                    <td style={{ margin:"auto", textAlign:"center"}}>
                                                                        {item.get_keranjang.no_transaksi}
                                                                    </td>
                                                                </>
                                                            )
                                                        },
                                                        status_transaksi: (item) => {
                                                            return (
                                                                <>
                                                                    <td style={{ margin:"auto", textAlign:"center"}}>
                                                                        {item.status_transaksi}
                                                                    </td>
                                                                </>
                                                            )
                                                        },
                                                        created_at: (item) => {
                                                            return (
                                                                <>
                                                                    <td style={{ margin:"auto", textAlign:"center"}}>
                                                                        {moment(item.created_at).format('DD/MMM/YYYY')}
                                                                    </td>
                                                                </>
                                                            )
                                                        },
                                                        dataControl: (item) => {
                                                            if(item.qrcode) {
                                                                return (
                                                                    <>
                                                                        <td style={{ margin:"auto", textAlign:"center"}}>
                                                                            <CButton size="sm" color="success" style={{ color:"white" }} to={`/Transaksi/Konsumen/Lacak/Transaksi/${item.get_keranjang.no_transaksi}`} >Lacak</CButton> &nbsp;
                                                                            {
                                                                                item.status_transaksi === 'Produk Dikirim Oleh Gapoktan' ?
                                                                                (
                                                                                    <>
                                                                                        <CButton size="sm" color="warning" style={{ color:"white" }} target="_blank" to={`/QRTransaksi/${item.get_keranjang.no_transaksi}`} >Lihat Data</CButton> &nbsp;
                                                                                        <CButton size="sm" color="danger" onClick={() => this.handleKonfirmasi(item)} >Barang Diterima</CButton>
                                                                                    </>
                                                                                ) :
                                                                                (
                                                                                    <>
                                                                                        <CButton size="sm" color="warning" style={{ color:"white" }} target="_blank" to={`/QRTransaksi/${item.get_keranjang.no_transaksi}`} >Lihat Data</CButton>
                                                                                    </>
                                                                                )
                                                                            }
                                                                        </td>
                                                                    </>
                                                                )
                                                            } else {
                                                                return(
                                                                    <>
                                                                        <td style={{ margin:"auto", textAlign:"center"}}>
                                                                            <CButton size="sm" color="success" style={{ color:"white" }} to={`/Transaksi/Konsumen/Lacak/Transaksi/${item.get_keranjang.no_transaksi}`} >Lacak</CButton> &nbsp;
                                                                            <CButton size="sm" color="danger" style={{ color:"white" }} to={`/Transaksi/detail/${item.id}`} >Bayar</CButton> &nbsp;
                                                                        </td>
                                                                    </>
                                                                )
                                                            }
                                                        }
                                                    }}
                                                />
                                            </CCardBody>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </div>
                    </main>

                </Fragment>
            );
        } else {
            return(
                <>
                    <div align="center">
                        <br></br>
                        <br></br>
                        <br></br>
                        <h3>Mohon Tunggu...</h3>
                    </div>
                </>
            )
        }

    }
}