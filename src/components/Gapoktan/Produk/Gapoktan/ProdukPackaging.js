import { Fragment, React, Component } from "react";
import "../../../Cabai.css";
import "../../../CabaiMedia.css";
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
import UserService from '../../../../services/user.service';
import moment from 'moment';
import Loader from "react-spinners/DotLoader";
import { css } from "@emotion/react";
import QRcode from "qrcode.react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
import { AddProduct } from "../../../../abi/produk";

require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");

var override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `
;

export default class ProdukPackaging extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      color: "#3c4b64",
      modal: false,
      loading: false,
      dataId: '',
      dataProduk: '',
      qr: "test",
      akun: '',
    };
  }

  componentDidMount() {

    UserService.gapoktanGetProdukSiapJual().then(
      (response) => {
        console.log('cek data', response);
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

  handleChange = (value) => {
    this.setState({
      qr: value,
    })
  };

  setModal = async (data) => {
    if(data) {
      this.setState({
        dataProduk: data,
        dataId: data.id,
      })
    }

    this.setState({
      modal: !this.state.modal,
    })
  }

  HapusData = async (data) => {

    await UserService.HapusProdukSiapJual(data.id).then(
      (response) => {
        if(response.data.message) {
          alert(response.data.message);
        } else {
          alert("Data berhasil dihapus");
        }
      }
    );

    await UserService.gapoktanGetProdukSiapJual().then(
      (response) => {
        console.log('cek data', response);
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

  downloadQR = async (product_id) => {
    const canvas = document.getElementById("myqr");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "" + product_id + ".png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  generateQR = async (dataProduk) => {

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    const linkQRCode =
      process.env.REACT_APP_URL +
      "QRProduk/" +
      dataProduk.id;
    await this.handleChange(linkQRCode);

    const canvas = document.getElementById("myqr");
    let imageBlob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );

    let formDataQR = new FormData();
    formDataQR.append("files_qr", imageBlob, "" + dataProduk.id + ".png");
    formDataQR.append("fileName_qr", "" + dataProduk.id + ".png");

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

        await UserService.pushQRCodeImageProdukSiapJual(dataProduk.id, formDataQR).then(async (response) => {
          console.log('cek hasil update qr', response);

          var json = JSON.stringify(response.data);

          console.log('cek ini mal', json);

          // const updateData = new FormData();

          // input ke blockchain
            let contract = new ethers.Contract(process.env.REACT_APP_PRODUK_ADDRESS, AddProduct, signer)
            let transaction = await contract.StoreTambahProduk(
              dataProduk.id,
              dataProduk.nama_produk,
              json,
              year + "-" + month + "-" + date + " " + hours + ":" + minutes
            )
              const formData = new FormData();
              formData.append("contract", 'produk');
              formData.append("t_hash", transaction.hash);
              formData.append("name", dataProduk.nama_produk);
              formData.append("product_id", dataProduk.id);

              await UserService.addTransactionHash(formData);
              console.log(transaction.hash);
            await transaction.wait()

            this.setState({
              loading: false,
            })
          // end input ke blockchain

          await this.downloadQR(dataProduk.id);

          await UserService.gapoktanGetProdukSiapJual().then(
            (response) => {
              console.log('cek ini mal', response);
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

          await alert("Data berhasil disimpan");

        });

      } catch (e) {

        await UserService.ErrorTransactionProduk(dataProduk.id).then(async (response) => {
          console.log('cek hasil error', response);
        });

        await this.setState({
          loading: false,
        })

        await UserService.gapoktanGetProdukSiapJual().then(
          (response) => {
            console.log('cek ini mal', response);
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

        alert(e.message);
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
      { key: "nama_produk", label: "Produk"},
      { key: "tanggal_pengemasan", label: "Tanggal Packaging"},
      { key: "kualitas", label: "Kualitas"},
      { key: "harga_jual", label: "Harga Jual"},
      { key: "status_tayang", label: "Status", _style: { textAlign: "center", width: "10%" }},
      {
        key: "dataControl",
        label: "Aksi",
        filter: false,
        _style: { textAlign: "center", width: "15%" },
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
                                          <h4 style={{ margin: "auto" }}>Daftar Produk Siap Jual</h4>
                                      </CCol>
                                      <CCol>
                                          <CButton
                                              block
                                              color="danger"
                                              to="/AddProdukSiapJual"
                                              >
                                              Buat Produk Siap Jual
                                          </CButton>
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
                                    tanggal_pengemasan: (item) => {
                                      return (
                                        <td>
                                          {moment(item.tanggal_pengemasan).format('DD / MMM / YYYY')}
                                        </td>
                                      )
                                    },
                                    kualitas: (item) => {
                                      return (
                                        <td>
                                          {item.get_detail[0].kualitas_cabai}
                                        </td>
                                      )
                                    },
                                    harga_jual: (item) => {
                                      return(
                                        <td>
                                          {/* Rp. {item.harga_jual} */}
                                          Rp. {parseInt(item.harga_jual).toLocaleString('en')} - Rp. {(parseInt(item.harga_jual) * 20 / 100 + parseInt(item.harga_jual)).toLocaleString('en')}
                                        </td>
                                      )
                                    },
                                    status_tayang: (item) => {
                                      if(item.status_tayang === 0) {
                                        return(
                                          <td style={{ margin:"auto", textAlign:"center"}}>
                                            Belum Tayang
                                          </td>
                                        )
                                      } else if(item.status_tayang === 1) {
                                        return(
                                          <td style={{ margin:"auto", textAlign:"center"}}>
                                            Tayang di marketpalce
                                          </td>
                                        )
                                      } else {
                                        return(
                                          <td style={{ margin:"auto", textAlign:"center"}}>
                                            Telah diproses
                                          </td>
                                        )
                                      }
                                    }, 
                                    dataControl: (item) => {
                                      if(item.status_tayang === 0) {
                                        return(
                                          <td style={{ margin:"auto", textAlign:"center"}}>
                                            {/* <CButton type="button" size="sm" style={{color:"white"}} color="warning">Ubah</CButton>{" "} */}
                                            <CButton type="button" size="sm" style={{color:"white"}} onClick={() => this.HapusData(item)} color="warning">Hapus</CButton>{" "}
                                            <CButton type="button" size="sm" onClick={() => this.setModal(item)} color="danger">Tayangkan</CButton>
                                          </td>
                                        )
                                      } else {
                                        return(
                                          <td style={{ margin:"auto", textAlign:"center"}}>
                                            <CButton type="button" size="sm" color="info" to={`QRProduk/${item.id}`} >Show</CButton>
                                          </td>
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
              <CButton color="warning" to={`QRProduk/${this.state.dataId}`} style={{color:"white"}} >
                Lihat data QRCode
              </CButton>{' '}
              <CButton color="danger" style={{color:"white"}} onClick={() => this.generateQR(this.state.dataProduk)}> {' '}
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

    }

  }
}