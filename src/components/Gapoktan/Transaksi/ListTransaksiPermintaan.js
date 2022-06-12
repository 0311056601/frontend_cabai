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
import Loader from "react-spinners/DotLoader";
import { css } from "@emotion/react";
import QRcode from "qrcode.react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
import { AddTransaksiRequest } from "../../../abi/request";

require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");

var override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `
;

export default class ListTransaksiPermintaan extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
            qr: "test",
            modal: false,
            loading: false,
            dataId: '',
            dataTransaksi: '',
            color: "#3c4b64",
        };
    }

    componentDidMount() {
        UserService.ListTransaksiPermintaan().then( async (response) => {
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

    handleKonfirmasi = async (data) => {

        console.log('cek data', data);

        await UserService.updateTransaksiRequest(data.id).then( async (response) => {
            
            if(response.data.message) {

                alert(response.data.message);

            } else {

                // transaksi blockchain jika data statusnya Menunggu konfirmasi pembayaran
                if(data.status === 'Menunggu konfirmasi pembayaran') {

                    await this.generateQR(data);

                }

                await UserService.ListTransaksiPermintaan().then( async (response) => {
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
                )

            }

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
        )

    }

    handleChange = (value) => {
        this.setState({
            qr: value,
        })
    };

    setModal = async (data) => {
        if(data) {
            this.setState({
                dataTransaksi: data,
                dataId: data.id,
            })
        }
    
        this.setState({
          modal: !this.state.modal,
        })
    }

    downloadQR = async (transaksiId) => {
        const canvas = document.getElementById("myqr");
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "" + transaksiId + ".png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    generateQR = async (dataTransaksi) => {

        console.log('cek ini mal', dataTransaksi);

        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
    
        const linkQRCode =
          process.env.REACT_APP_URL +
          "QRTransaksi/request/" +
          dataTransaksi.no_transaksi;
        await this.handleChange(linkQRCode);
    
        const canvas = document.getElementById("myqr");
        let imageBlob = await new Promise((resolve) =>
          canvas.toBlob(resolve, "image/png")
        );
    
        let formDataQR = new FormData();
        formDataQR.append("files_qr", imageBlob, "" + dataTransaksi.id + ".png");
        formDataQR.append("fileName_qr", "" + dataTransaksi.id + ".png");
    
        this.setState({
          loading: true,
        })

        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const {chainId} = await provider.getNetwork();
        const signer = provider.getSigner();

        if(chainId === parseInt(process.env.REACT_APP_CHAIN_ID)) {
    
            try {
        
                await UserService.pushQRCodeImageTransaksiRequest(dataTransaksi.id, formDataQR).then(async (response) => {
                    console.log('cek hasil update qr', response);
            
                    // var json = JSON.stringify([response.data.transaksi, response.data.gapoktan, response.data.pembeli]);
                    var json = JSON.stringify(response.data);
            
                    // input ke blockchain
                        let contract = new ethers.Contract(process.env.REACT_APP_REQUEST_ADDRESS, AddTransaksiRequest, signer)
                        let transaction = await contract.StoreTambahTransaksiRequest(
                            response.data.transaksi.id,
                            response.data.transaksi.no_transaksi,
                            response.data.gapoktan.nama,
                            response.data.pembeli.nama,
                            response.data.pembeli.get_user.email,
                            json,
                            year + "-" + month + "-" + date + " " + hours + ":" + minutes
                        )

                        // input log transaksi hash
                        const formData = new FormData();
                        formData.append("contract", 'request');
                        formData.append("t_hash", transaction.hash);
                        formData.append("name", response.data.transaksi.no_transaksi);
                        formData.append("product_id", response.data.transaksi.id);
            
                        await UserService.addTransactionHash(formData);
                        console.log(transaction.hash);
                        // end input log transaksi hash

                        await transaction.wait()
            
                      this.setState({
                        loading: false,
                      })
                    // end input ke blockchain
            
                    await this.downloadQR(dataTransaksi.id);
            
                    // await showResults("Data berhasil disimpan");

                    this.setState({
                        loading: false,
                    })
            
                });

                await alert('Data berhasil dikonfirmasi');
        
            } catch (e) {
        
                await UserService.ErrorTransactionRequest(dataTransaksi.id).then(async (response) => {
                    console.log('cek hasil error', response);
                });
            
                await this.setState({
                    loading: false,
                })
        
                await UserService.ListTransaksiPermintaan().then( async (response) => {
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
                )
        
                await alert(e.message);
            }

        } else {
            alert('Anda tidak terhubung ke jaringan polygon, harap hubungkan metamask ke jaringan polygon');
        }

        this.setState({
            loading: false,
        })
    
    }


    render() {

        const Data = [
            { key: "konsumen", label: "Konsumen", _style: { textAlign: "center"}},
            { key: "no_transaksi", label: "Transaksi", _style: { textAlign: "center"}},
            { key: "volume", label: "Volume", _style: { textAlign: "center"}},
            { key: "kualitas", label: "Kualitas", _style: { textAlign: "center"}},
            { key: "tanggal_pembelian", label: "Tanggal", _style: { textAlign: "center"}},
            { key: "status", label: "Status", _style: { textAlign: "center"}},
            {
                key: "dataControl",
                label: "Aksi",
                filter: false,
                _style: { textAlign: "center", width: "20%" },
            },
        ];

        if(this.state.loading) {
            return(
              <>
                <div style={{textAlign : 'center', verticalAlign : 'middle', paddingTop : "150px"}}>
                  <div className="sweet-loading">
                    <h5>Mohon Tunggu...</h5>
                    <br></br>
                      <Loader color={this.state.color} loading={this.state.loading} css={override} size={150} />
                    <br></br>
                    <br></br>
                    <h5>Data sedang ditulis ke blockchain</h5>
                  </div>
                </div>

                <div style={{ visibility: "hidden" }}>
                    {this.state.qr ? (
                        <QRcode id="myqr" value={this.state.qr} size={320} includeMargin={true} />
                    ) : (
                        <p>No QR code preview</p>
                    )}
                </div>
              </>
            )
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
                                                            <h4 style={{ margin: "auto" }}>Transaksi Permintaan Konsumen</h4>
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
                                                            konsumen: (item) => {
                                                                return(
                                                                    <>
                                                                        <td style={{ margin:"auto", textAlign:"center"}}>
                                                                            {item.get_konsumen.username} - {item.get_konsumen.email}
                                                                        </td>
                                                                    </>
                                                                )
                                                            },
                                                            volume: (item) => {
                                                                return(
                                                                    <>
                                                                        <td style={{ margin:"auto", textAlign:"center"}}>
                                                                            {item.volume_final ? item.volume_final : item.volume} Kg
                                                                        </td>
                                                                    </>
                                                                )
                                                            },
                                                            tanggal_pembelian: (item) => {
                                                                return(
                                                                    <>
                                                                        <td style={{ margin:"auto", textAlign:"center"}}>
                                                                            {moment(item.tanggal_pembelian).format('DD/MMM/YYYY')}
                                                                        </td>
                                                                    </>
                                                                )
                                                            },
                                                            dataControl: (item) => {
                                                                if(item.status === 'Menunggu konfirmasi gapoktan') {
                                                                    return (
                                                                        <>
                                                                            <td style={{ margin:"auto", textAlign:"center"}}>
                                                                                <CButton size="sm" color="danger" onClick={() => this.handleKonfirmasi(item)} > Konfirmasi Pesanan</CButton>
                                                                            </td>
                                                                        </>
                                                                    )
                                                                } else if(item.status === 'Menunggu konfirmasi pembayaran') {
                                                                    return(
                                                                        <>
                                                                            <td style={{ margin:"auto", textAlign:"center"}}>
                                                                                {/* <CButton size="sm" color="danger" onClick={() => this.handleKonfirmasi(item)} >Konfirmasi Pembayaran </CButton> {" "} */}
                                                                                <CButton size="sm" color="danger" onClick={() => this.setModal(item)} >Konfirmasi Pembayaran </CButton> {" "}
                                                                                <CButton size="sm" color="warning" style={{color:"white"}} to={`/Transaksi/detail/request/${item.id}`} >Detail</CButton>
                                                                            </td>
                                                                        </>
                                                                    )
                                                                } else if(item.status === 'Pembayaran telah dikonfirmasi') {
                                                                    return(
                                                                        <>
                                                                            <td style={{ margin:"auto", textAlign:"center"}}>
                                                                                <CButton size="sm" color="danger" onClick={() => this.handleKonfirmasi(item)} >Kirim Cabai </CButton>
                                                                            </td>
                                                                        </>
                                                                    )
                                                                } else if(item.status === 'Produk diterima konsumen') {
                                                                    return(
                                                                        <>
                                                                            <td style={{ margin:"auto", textAlign:"center"}}>
                                                                                {/* <CButton size="sm" color="danger" to={`/Transaksi/detail/request/${item.id}`} > Selesai </CButton> {" "} */}
                                                                                <CButton size="sm" color="warning" style={{color:"white"}} to={`/QRTransaksi/request/${item.no_transaksi}`} > Detail </CButton>
                                                                            </td>
                                                                        </>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <>
                                                                            <td style={{ margin:"auto", textAlign:"center"}}>
                                                                                Data sedang diproses
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
                            onClick={this.setModal}
                            color="warning"
                        >
                            <CModalHeader closeButton>
                                <CModalTitle>Generate QRCode</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <strong>Pemberitahuan,</strong> ketika data digenerate maka data tidak bisa lagi diubah karena akan tercatat di blockchain dan dibuatkan QRCode
                            </CModalBody>
                            <CModalFooter>
                                {
                                    this.state.dataTransaksi.no_transaksi ?
                                    (
                                        <CButton color="warning" to={`/QRTransaksi/request/${this.state.dataTransaksi.no_transaksi}`} style={{color:"white"}} >
                                            Lihat data QRCode
                                        </CButton>
                                    ) :
                                    (
                                        <CButton color="warning" style={{color:"white"}} >
                                            Lihat data QRCode
                                        </CButton>

                                    )
                                }
                                {" "}
                                {/* <CButton color="danger" style={{color:"white"}} onClick={() => this.generateQR(this.state.dataTransaksi)}> {' '} */}
                                <CButton color="danger" style={{color:"white"}} onClick={() => this.handleKonfirmasi(this.state.dataTransaksi)}> {' '}
                                    Generate QRCode
                                </CButton>{' '}
                                <CButton color="secondary" onClick={this.setModal}>
                                    Tutup
                                </CButton>
                            </CModalFooter>
                        </CModal>
                        
                        <div style={{ visibility: "hidden" }}>
                            {this.state.qr ? (
                                <QRcode id="myqr" value={this.state.qr} size={320} includeMargin={true} />
                            ) : (
                                <p>No QR code preview</p>
                            )}
                        </div>

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