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
import showResults from '../../showResults/showResults';
import moment from 'moment';
import { Redirect } from "react-router-dom";

export default class ListRequest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: null,
            tanggalSekarang: '',
            redirect: false,
            requestId: null,
        };
    }

    componentDidMount() {
        UserService.ListRequest().then( async (response) => {
            console.log('cek tgl server', response);
            this.setState({
                content: response.data.data,
                tanggalSekarang: response.data.dateNow,
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

    HapusData = async (data) => {

        await UserService.deleteRequestcabai(data.id).then( async (response) => {
            if(response.data.message) {
                alert(response.data.message);
            } else {
                alert('Data berhasil dihapus');
            }
        });

        await UserService.ListRequest().then( async (response) => {
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


    handleKirim = async (item) => {

        await UserService.KirimRequestProduk(item.id).then( async (response) => {
            if(response.data.message) {
                alert(response.data.message);
            } else {
                alert('Data berhasil diupdate');
            }
        });

        await UserService.ListRequest().then( async (response) => {
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

    handleBayar = async (item) => {
        console.log('cek bayar', item);

        await UserService.konsumenBayarPemesanan(item.no_transaksi).then( async (response) => {
            console.log('cek response', response);
            if(response.data.message) {

                alert(response.data.message);

            } else {

                await alert('Silahkan lakukan pembayaran');

                this.setState({
                    redirect: true,
                    requestId: item.id,
                })

            }
        });

    }

    handleProdukDiterima = async (item) => {

        await UserService.konsumenTerimaProdukRequest(item.no_transaksi).then( async (response) => {
            console.log('cek response', response);
            if(response.data.message) {

                alert(response.data.message);

            } else {

                await alert('Terimakasih, telah melakukan transaksi di aplikasi kami');

                await UserService.ListRequest().then( async (response) => {
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
        });

    }


    render() {

        const Data = [
            { key: "no_transaksi", label: "Transaksi", _style: { textAlign: "center"}},
            { key: "tanggal_pembelian", label: "Tanggal Beli", _style: { textAlign: "center"}},
            { key: "volume", label: "Volume", _style: { textAlign: "center"}},
            { key: "kualitas", label: "Kualitas", _style: { textAlign: "center"}},
            { key: "status", label: "Status", _style: { textAlign: "center"}},
            {
                key: "dataControl",
                label: "Aksi",
                filter: false,
                _style: { textAlign: "center", width: "20%" },
            },
        ];

        if(this.state.redirect && this.state.requestId) {

            return <Redirect to={`/Transaksi/detail/request/${this.state.requestId}`} />;

        } else {

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
                                                            <h4 style={{ margin: "auto" }}>History Pemesanan</h4>
                                                        </CCol>
                                                        <CCol>
                                                            <CButton color="danger" style={{ color:"white" }} to={`/Request/Add`} >Pesan Cabai</CButton>
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
                                                            tanggal_pembelian: (item) => {
                                                                return (
                                                                    <td>
                                                                        {moment(item.tanggal_pembelian).format('DD / MMM / YYYY')}
                                                                    </td>
                                                                )
                                                            },
                                                            volume: (item) => {
                                                                return (
                                                                    <td>
                                                                        {`${item.volume} Kg`}
                                                                    </td>
                                                                )
                                                            },
                                                            dataControl: (item) => {
                                                                if(item.status === 'Pengajuan pemesanan cabai') {
                                                                    return (
                                                                        <>
                                                                            <td style={{ margin:"auto", textAlign:"center"}}>
                                                                                {/* <CButton size="sm" color="warning" style={{ color:"white" }} target="_blank" to={`/Request/Edit/${item.id}`} >Ubah</CButton> &nbsp; */}
                                                                                <CButton size="sm" color="success" onClick={() => this.HapusData(item)} >Hapus</CButton> &nbsp;
                                                                                <CButton size="sm" color="danger" onClick={() => this.handleKirim(item)} >Kirim</CButton>
                                                                            </td>
                                                                        </>
                                                                    )
                                                                } else {
                                                                    // if(item.status === 'Dikonfirmasi oleh gapoktan' && this.state.tanggalSekarang === item.tanggal_pembelian.replaceAll(" 00:00:00", "")) {
                                                                    if(item.status === 'Dikonfirmasi oleh gapoktan') {
                                                                        return (
                                                                            <td style={{ margin:"auto", textAlign:"center"}}>
                                                                                <CButton size="sm" color="danger" onClick={() => this.handleBayar(item)} >Bayar</CButton>
                                                                            </td>
                                                                        )
                                                                    } else if(item.status === 'Menunggu konfirmasi pembayaran') {
                                                                        return (
                                                                            <td style={{ margin:"auto", textAlign:"center"}}>
                                                                                <CButton size="sm" color="danger" to={`/Transaksi/detail/request/${item.id}`} >Detail</CButton>
                                                                            </td>
                                                                        )
                                                                    } else if(item.status === 'Barang dalam masa pengiriman') {
                                                                        return (
                                                                            <td style={{ margin:"auto", textAlign:"center"}}>
                                                                                <CButton size="sm" color="danger" onClick={() => this.handleProdukDiterima(item)} >Produk Diterima</CButton> {" "}
                                                                                <CButton size="sm" color="danger" to={`/QRTransaksi/request/${item.no_transaksi}`} > Detail </CButton>

                                                                            </td>
                                                                        )
                                                                    } else {
                                                                        return (
                                                                            <td style={{ margin:"auto", textAlign:"center"}}>

                                                                                {/* {
                                                                                    item.status === 'Produk diterima konsumen' ? 'Selesai' : 'Data sedang diproses'
                                                                                } */}
                                                                                {
                                                                                    item.status === 'Produk diterima konsumen' ? 
                                                                                    (
                                                                                        <>
                                                                                            <CButton size="sm" color="danger" to={`/Transaksi/detail/request/${item.id}`} > Selesai </CButton> {" "}
                                                                                            <CButton size="sm" color="warning" style={{color:"white"}} to={`/QRTransaksi/request/${item.no_transaksi}`} > Detail </CButton>
                                                                                        </>
                                                                                    ) : 
                                                                                    (
                                                                                        'Data sedang diproses'
                                                                                    )
                                                                                }
                                                                                {/* <CButton size="sm" color="danger" to={`/Transaksi/detail/request/${item.id}`} >
                                                                                    {
                                                                                        item.status === 'Produk diterima konsumen' ? 'Selesai' : 'Data sedang diproses'
                                                                                    }
                                                                                </CButton> */}
                                                                            </td>
                                                                        )
                                                                    }
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
}