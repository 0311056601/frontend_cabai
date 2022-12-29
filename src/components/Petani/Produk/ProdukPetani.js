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
  CModalTitle
} from "@coreui/react";
import UserService from '../../../services/user.service';
import showResults from '../../showResults/showResults';
import moment from 'moment';

export default class ProdukPetani extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      loading: false,
      color: "#3c4b64",
      produkId : '',
    };
  }

  componentDidMount() {
    UserService.listProdukPetani().then(
      (response) => {
        this.setState({
          content: response.data.produkPetani,
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

  setModal = async (produk) => {
    if(produk) {
      this.setState({
        produkId: produk,
      })
    }

    this.setState({
      modal: !this.state.modal,
    })
  }

  kirimProduk = async () => {

    const produkId = this.state.produkId;

    if(produkId) {
      await UserService.petaniKirimProduk(produkId).then(
        async (response) => {
          if(response.message) {
            await alert(response.message);
          } else {
            await alert("Data berhasil dikirim ke gapoktan");

            await UserService.listProdukPetani().then(
              (response) => {
                this.setState({
                  content: response.data.produkPetani,
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
        }
      )
    } else {
      alert("Produk tidak ditemukan");
    }
    
  }

  HapusProduk = async (item) => {
    console.log(item);
    await UserService.HapusProduk(item.id).then(
      async (response) => {

        await showResults("Data berhasil dihapus");
        
        UserService.listProdukPetani().then(
          (response) => {
            this.setState({
              content: response.data.produkPetani,
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

      },
        (error) => {
      }
    );
  }

  render() {

    const Data = [
      { key: "tanggal_panen", label: "Tanggal Panen"},
      { key: "kualitas", label: "Kualitas"},
      { key: "harga", label: "Harga"},
      { key: "volume", label: "Volume"},
      {
        key: "dataControl",
        label: "Aksi",
        filter: false,
        _style: { textAlign: "center", width: "30%" },
      },
    ];

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
                                      <h4 style={{ margin: "auto" }}>Catatan Produk Cabai</h4>
                                    </CCol>
                                    <CCol>
                                        <CButton
                                          block
                                          color="danger"
                                          to="/AddProdukCabai"
                                        >
                                          Input Cabai
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
                                  tanggal_panen:(item) => {
                                    return(
                                      <td>
                                        {moment(item.tanggal_panen).format('DD / MMM / YYYY' )}
                                      </td>
                                    )
                                  },
                                  harga:(item) => {
                                    return(
                                      <td>
                                        Rp. {parseInt(item.harga).toLocaleString('en')}
                                      </td>
                                    )
                                  },
                                  volume:(item) => {
                                    return(
                                      <td>
                                        {parseInt(item.volume).toLocaleString('en')} Kg
                                      </td>
                                    )
                                  },
                                  dataControl: (item) => {
                                    return (
                                      <>
                                        <td style={{ margin:"auto", textAlign:"center"}}>
                                          {(() => {
                                            if(item.status === 'Produk Dibuat Petani') {
                                              return (
                                                <>
                                                  {/* <CButton size="sm" color="success" to={`/EditProduk/${item.id}`} >Ubah</CButton> &nbsp; */}
                                                  <CButton size="sm" color="warning" style={{color:"white"}} onClick={() => this.HapusProduk(item)} >Hapus</CButton> &nbsp;
                                                  <CButton size="sm" color="danger" onClick={() => this.setModal(item.id)} >Kirim </CButton> &nbsp;
                                                </>
                                              )
                                            } else {
                                              return (
                                                <>
                                                  Data sudah dikirim ke gapoktan
                                                  &nbsp; 
                                                  <CButton size="sm" color="success" to={`/TracePanen/${item.id}`} >Check</CButton> 
                                                </>
                                              )
                                            }
                                          })()}
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
            <CModalTitle>Kirim ke Gapoktan</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {/* <strong>Pemberitahuan,</strong> ketika data dikirim ke gapoktan, maka data tidak bisa lagi diubah atau dihapus */}
            <strong>Pemberitahuan,</strong> ketika data dikirim ke gapoktan, maka data tidak bisa lagi dihapus
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={this.setModal}>
              Close
            </CButton>{' '}
            <CButton color="info" onClick={this.kirimProduk}>
              Kirim
            </CButton>
          </CModalFooter>
        </CModal>
        
      </Fragment>
    );
  }
}