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
import { AddTransaksi } from "../../../abi/transaksi";

require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");

var override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `
;

export default class ListTransaksi extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: null,
            color: "#3c4b64",
            gapoktan: null,
            modal: false,
            loading: false,
            dataId: '',
            dataTransaksi: '',
            qr: "test",
            akun: '',
        };
    }

    componentDidMount() {
        UserService.ListTransaksi().then( async (response) => {
            this.setState({
                content: response.data.data,
                gapoktan: response.data.gapoktan,
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

    handleChange = (value) => {
        this.setState({
            qr: value,
        })
    };

    HandleKonfirmasi = async (data) => {
        console.log('cek data', data);
        console.log('cek gapoktan', this.state.gapoktan);
    }

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
        console.log('cek gapoktan mal', this.state.gapoktan);

        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
    
        const linkQRCode =
          process.env.REACT_APP_URL +
          "QRTransaksi/" +
          dataTransaksi.get_keranjang.no_transaksi;
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
        
                await UserService.pushQRCodeImageTransaksi(dataTransaksi.id, formDataQR).then(async (response) => {
                    console.log('cek hasil update qr', response);
            
                    var json = JSON.stringify(response.data.transaksi);
            
                    console.log('cek ini mal', json);
                    console.log('cek sol', AddTransaksi);
                    console.log('cek address', process.env.REACT_APP_TRANSAKSI_ADDRESS);
                    console.log('cek signer', signer);
            
                    // input ke blockchain
                    let contract = new ethers.Contract(process.env.REACT_APP_TRANSAKSI_ADDRESS, AddTransaksi, signer)
                    let transaction = await contract.StoreTambahTransaksi(
                        dataTransaksi.id,
                        response.data.produkHash.hash,
                        response.data.transaksi.get_produk.nama_produk,
                        response.data.transaksi.get_keranjang.no_transaksi,
                        response.data.transaksi.get_pembeli.username,
                        response.data.transaksi.get_pembeli.email,
                        json,
                        year + "-" + month + "-" + date + " " + hours + ":" + minutes
                    )

                        // input log transaksi hash
                        const formData = new FormData();
                        formData.append("contract", 'transaksi');
                        formData.append("gapoktan_id", response.data.gapoktan.id);
                        formData.append("t_hash", transaction.hash);
                        formData.append("name", response.data.transaksi.get_produk.nama_produk);
                        formData.append("product_id", dataTransaksi.id);
            
                        await UserService.addTransactionHash(formData);
                        console.log(transaction.hash);
                        // end input log transaksi hash

                        await transaction.wait()
            
                    this.setState({
                        loading: false,
                    })
                    // end input ke blockchain
            
                    await this.downloadQR(dataTransaksi.id);
            
                    await UserService.ListTransaksi().then( async (response) => {
                        this.setState({
                            content: response.data.data,
                            gapoktan: response.data.gapoktan,
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
            
                    await showResults("Data berhasil disimpan");
            
                });
        
            } catch (e) {
        
                await UserService.ErrorTransactionTransaksi(dataTransaksi.id).then(async (response) => {
                    console.log('cek hasil error', response);
                });
            
                await this.setState({
                    loading: false,
                })
        
                await UserService.ListTransaksi().then( async (response) => {
                    this.setState({
                        content: response.data.data,
                        gapoktan: response.data.gapoktan,
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
            { key: "nomor", label: "No", _style: { textAlign: "center"}},
            { key: "transaksi", label: "Transaksi", _style: { textAlign: "center"}},
            { key: "pembeli", label: "Pembeli", _style: { textAlign: "center"}},
            { key: "status_transaksi", label: "Status", _style: { textAlign: "center"}},
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
                                                            <h4 style={{ margin: "auto" }}>Daftar Transaksi Konsumen</h4>
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
                                                            pembeli: (item) => {
                                                                return (
                                                                    <>
                                                                        <td style={{ margin:"auto", textAlign:"center"}}>
                                                                            {item.get_pembeli.email}
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
                                                            dataControl: (item) => {
                                                                return (
                                                                    <>
                                                                        <td style={{ margin:"auto", textAlign:"center"}}>
                                                                            {/* <CButton size="sm" color="danger" onClick={() => this.HandleKonfirmasi(item)} >Konfirmasi</CButton> &nbsp; */}
                                                                            <CButton size="sm" color="success" style={{color:"white"}} target="_blank" to={`/Transaksi/Konsumen/Lacak/Transaksi/${item.get_keranjang.no_transaksi}`} >Transaksi</CButton> &nbsp;
                                                                            <CButton size="sm" color="danger" onClick={() => this.setModal(item)} >Konfirmasi</CButton> &nbsp;
                                                                        </td>
                                                                    </>
                                                                )
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
                                    this.state.dataTransaksi && this.state.dataTransaksi.get_keranjang ?
                                    (
                                        <CButton color="warning" to={`/QRTransaksi/${this.state.dataTransaksi.get_keranjang.no_transaksi}`} style={{color:"white"}} >
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
                                <CButton color="danger" style={{color:"white"}} onClick={() => this.generateQR(this.state.dataTransaksi)}> {' '}
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
