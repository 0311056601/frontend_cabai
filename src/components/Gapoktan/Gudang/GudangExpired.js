import { Fragment, React, Component } from "react";
import "../../Cabai.css";
import "../../CabaiMedia.css";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLabel,
  CDataTable,
  CRow,
  CButton,
  CBadge,
  CFormGroup,
  CInputCheckbox,
  CTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import UserService from '../../../services/user.service';
import moment from 'moment';
import Loader from "react-spinners/DotLoader";
import { css } from "@emotion/react";
import QRcode from "qrcode.react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
import { AddExpired } from "../../../abi/expired";

require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");

var override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `
;

export default class GudangExpired extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      modal: false,
      loading: false,
      color: "#3c4b64",
      qr: "test",
      dataExpired: '',
      dataId: '',
    };
  }

  componentDidMount() {
    UserService.getListExpired().then(
      (response) => {
        console.log('cek response get data', response);
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
        dataExpired: data,
        dataId: data.id,
      })
    }

    this.setState({
      modal: !this.state.modal,
    })
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

  generateQR = async (dataExpired) => {

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    const linkQRCode =
      process.env.REACT_APP_URL +
      "QRProcessGudang/" +
      dataExpired.id;
    await this.handleChange(linkQRCode);

    const canvas = document.getElementById("myqr");
    let imageBlob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );

    let formDataQR = new FormData();
    formDataQR.append("files_qr", imageBlob, "" + dataExpired.id + ".png");
    formDataQR.append("fileName_qr", "" + dataExpired.id + ".png");

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

        await UserService.pushQRCodeImageExpired(dataExpired.id, formDataQR).then(async (response) => {
          console.log('cek hasil update qr', response);

          var json = JSON.stringify(response.data.data);

          console.log('cek ini mal', json);

          // const updateData = new FormData();

          // input ke blockchain
            let contract = new ethers.Contract(process.env.REACT_APP_EXPIRED_ADDRESS, AddExpired, signer)
            let transaction = await contract.StoreTambahExpired(
              dataExpired.id,
              response.data.data.gapoktan_id,
              response.data.data.get_gapoktan.username,
              response.data.data.jumlah_volume,
              response.data.data.catatan,
              json,
              year + "-" + month + "-" + date + " " + hours + ":" + minutes
            )
              const formData = new FormData();
              formData.append("contract", 'expired');
              formData.append("t_hash", transaction.hash);
              formData.append("name", dataExpired.catatan);
              formData.append("product_id", dataExpired.id);

              await UserService.addTransactionHash(formData);
              console.log(transaction.hash);
            await transaction.wait()

            this.setState({
              loading: false,
            })
          // end input ke blockchain

          await this.downloadQR(dataExpired.id);

          await UserService.getListExpired().then(
            (response) => {
              console.log('cek response get data', response);
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

        await UserService.ErrorTransactionExpired(dataExpired.id).then(async (response) => {
          console.log('cek hasil error', response);
        });

        await this.setState({
          loading: false,
        })

        await UserService.getListExpired().then(
          (response) => {
            console.log('cek response get data', response);
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

  HapusData = async (data) => {

    await UserService.HapusDataExpired(data.id).then(
      (response) => {
        if(response.data.message) {
          alert(response.data.message);
        } else {
          alert("Data berhasil dihapus");
        }
      }
    );

    await UserService.getListExpired().then(
      (response) => {
        console.log('cek response get data', response);
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
      { key: "created_at", label: "Tanggal Diproses"},
      { key: "jumlah_volume", label: "Total Volume"},
      { key: "catatan", label: "Catatan"},
      { key: "status", label: "Status"},
      {
        key: "aksi",
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
                                                <h4 style={{ margin: "auto" }}>Data gudang yang telah diproses</h4>
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
                                                    created_at: (item) => {
                                                    return (
                                                        <>
                                                        <td>
                                                            {moment(item.created_at).format('DD / MMM / YYYY')}
                                                        </td>
                                                        </>
                                                    )
                                                    },
                                                    jumlah_volume: (item) => {
                                                    return (
                                                        <>
                                                        <td>
                                                            {`${item.jumlah_volume} Kg`}
                                                        </td>
                                                        </>
                                                    )
                                                    },
                                                    aksi: (item) => {
                                                        return (
                                                            <>
                                                                <td>
                                                                    {
                                                                        item.status === 'Belum Dipost ke Blockchain' ? 
                                                                        (
                                                                            <>
                                                                                <CButton type="button" size="sm" style={{color:"white"}} onClick={() => this.HapusData(item)} color="warning">Hapus</CButton>{" "}
                                                                                <CButton type="button" size="sm" onClick={() => this.setModal(item)} color="danger">Blockchain</CButton>
                                                                            </>
                                                                        ) :
                                                                        (
                                                                            <>
                                                                                <CButton type="button" size="sm" color="info" to={`QRProcessGudang/${item.id}`} >Detail</CButton>
                                                                            </>
                                                                        )
                                                                    }
                                                                </td>
                                                            </>
                                                        )
                                                    },
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
                        <strong>Pemberitahuan,</strong> ketika data digenerate maka data tidak bisa lagi diubah atau dihapus karena akan tercatat di blockchain dan dibuatkan QRCode
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="warning" to={`QRProcessGudang/${this.state.dataId}`} style={{color:"white"}} >
                            Lihat data QRCode
                        </CButton>{' '}
                        <CButton color="danger" style={{color:"white"}} onClick={() => this.generateQR(this.state.dataExpired)}> {' '}
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