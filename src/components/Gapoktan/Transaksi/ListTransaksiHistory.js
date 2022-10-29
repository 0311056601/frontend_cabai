import { Fragment, React, Component } from "react";
import "../../Cabai.css";
import "../../CabaiMedia.css";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CFormGroup,
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
import DatePicker from "react-datepicker";
import "../../react-datepicker.css";
import moment from 'moment';

export default class ListTransaksiHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: null,
            estimasi: null,
            modal: false,
            dataTransaksi: null,
            dataTransaksiId: null,
        };
    }

    componentDidMount() {
        UserService.ListTransaksiHistory().then( async (response) => {
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

        if(this.state.estimasi) {

            await UserService.UpdateKirimProduk(item.id, moment(this.state.estimasi).format('YYYY-MM-DD')).then( async (response) => {
                if(response.data.message) {
                    alert(response.data.message);
                } else {
                    alert('Data berhasil diupdate');
                }
            });

            await UserService.ListTransaksiHistory().then( async (response) => {
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

            this.setModal()
        } else {
            alert('Estimasi perlu diisi!.');
        }

    }

    getDateEstimasi = async (date) => {

        await this.setState({
            estimasi: date,
        })

        await console.log('cek estimasi', moment(this.state.estimasi).format('DD-MM-YYYY'));
        
    }

    setModal = async (data) => {
        if(data) {
            this.setState({
                dataTransaksi: data,
                dataTransaksiId: data.id,
            })
        }
    
        this.setState({
          modal: !this.state.modal,
        })
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
                                                                                item.status_transaksi === 'Pembayaran Dikonfirmasi' ?
                                                                                (
                                                                                    <>
                                                                                        <CButton size="sm" color="warning" style={{ color:"white" }} target="_blank" to={`/QRTransaksi/${item.get_keranjang.no_transaksi}`} >Lihat Data</CButton> &nbsp;
                                                                                        {/* <CButton size="sm" color="danger" onClick={() => this.handleKirim(item)} >Kirim Produk</CButton> */}
                                                                                        <CButton size="sm" color="danger" onClick={() => this.setModal(item)} >Kirim Produk</CButton>
                                                                                    </>
                                                                                ) :
                                                                                (<CButton size="sm" color="warning" style={{ color:"white" }} target="_blank" to={`/QRTransaksi/${item.get_keranjang.no_transaksi}`} >Lihat Data</CButton>)
                                                                            }
                                                                        </td>
                                                                    </>
                                                                )
                                                            } else {
                                                                return(
                                                                    <>
                                                                        <td style={{ margin:"auto", textAlign:"center"}}>
                                                                            {" "}
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

                    <CModal 
                        show={this.state.modal}
                        color="warning"
                    >
                        {console.log('cek item di modal',this.state.dataTransaksi)}
                        <CModalHeader closeButton>
                            <CModalTitle>Kirim Produk</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <strong>Produk akan dikirim ke alamat pembeli,</strong> tentukan estimasi produk sampai ke alamat pembeli
                            <CFormGroup>
                                <DatePicker
                                    selected={this.state.estimasi}
                                    className="textInput cabai"
                                    onChange={(date) => this.getDateEstimasi(date)}
                                    minDate={new Date()}
                                    dateFormat="dd/MMM/yyyy"
                                    name="estimasi_sampai"
                                    required={true}
                                    placeholderText="tentukan estimasi tanggal sampai..."
                                />
                            </CFormGroup>
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="danger" style={{color:"white"}} onClick={() => this.handleKirim(this.state.dataTransaksi)}> {' '}
                                Kirim Produk
                            </CButton>{' '}
                            <CButton color="secondary" onClick={this.setModal}>
                                Tutup
                            </CButton>
                        </CModalFooter>
                    </CModal>

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