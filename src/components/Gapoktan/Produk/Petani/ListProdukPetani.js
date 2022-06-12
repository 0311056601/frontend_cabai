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
  CButton
} from "@coreui/react";
import UserService from '../../../../services/user.service';
import showResults from '../../../showResults/showResults';
import moment from 'moment';

export default class ListProdukPetani extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      loading: false,
      color: "#3c4b64"
    };
  }

  handleKonfirmasi = async (item) => {
    if(item.volume === null) {
      alert('Harap timbang terlebih dahulu untuk menginput volume!')
    } else {
      this.setState({
        loading: true,
      });

      try{
        await UserService.gapoktanKonfirmasiProduk(item.id).then(
          async (response) => {
            console.log('cek response', response);
            
            await UserService.gapoktanGetProduk().then(
              (response) => {
                this.setState({
                  content: response.data.produkPetani,
                });
              }
            );
  
            await alert('Berhasil dimasukan ke gudang');
  
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
      } catch(e) {
        alert(e.message);
      }

      this.setState({
        loading: false,
      });
    }
  }

  componentDidMount() {
    UserService.gapoktanGetProduk().then(
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

  render() {

    const Data = [
      { key: "petani", label: "Petani"},
      { key: "tanggal_panen", label: "Tanggal Panen"},
      { key: "kualitas", label: "Kualitas"},
      { key: "harga", label: "Harga"},
      { key: "volume", label: "Volume (kg)"},
      { key: "status", label: "Status"},
      {
        key: "dataControl",
        label: "Aksi",
        filter: false,
        _style: { textAlign: "center", width: "25%" },
      },
    ];

    if(this.state.loading === true) {

      return (
        <div style={{textAlign : 'center', verticalAlign : 'middle', paddingTop : "150px"}}>
          <div className="sweet-loading">
              <h5>Memproses data</h5><br></br>
              <br></br>
              <br></br>
              <br></br>
              <h5>Mohon Tunggu...</h5>
          </div>
        </div>
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
                                          <h4 style={{ margin: "auto" }}>Daftar Produk Petani</h4>
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
                                    tanggal_panen: (item) => {
                                      return (
                                        <>
                                          <td>
                                            {moment(item.tanggal_panen).format('DD/MMM/YYYY')}
                                          </td>
                                        </>
                                      )
                                    },
                                    petani: (item) => {
                                      return (
                                        <>
                                          <td>
                                            {item.get_creator.username}
                                          </td>
                                        </>
                                      )
                                    },
                                    harga: (item) => {
                                      return (
                                        <>
                                          <td>
                                            Rp. {parseInt(item.harga).toLocaleString('en')}
                                          </td>
                                        </>
                                      )
                                    },
                                    volume: (item) => {
                                      if(item.volume === null) {
                                        return(
                                          <>
                                            <td>
                                              <span style={{color:"red"}}>Belum ditimbang</span>
                                            </td>
                                          </>
                                        )
                                      } else {
                                        return(
                                          <>
                                            <td>
                                              {item.volume}
                                            </td>
                                          </>
                                        )
                                      }
                                    },
                                    dataControl: (item) => {
                                      if(item.status === 'Produk dikonfirmasi gapoktan') {
                                        return(
                                          <>
                                            <td style={{ margin:"auto", textAlign:"center"}}>
                                              Data berhasil dimasukan ke gudang
                                            </td>
                                          </>
                                        )
                                      } else {
                                        return (
                                          <>
                                            <td style={{ margin:"auto", textAlign:"center"}}>
                                              <CButton size="sm" color="success" onClick={() => this.handleKonfirmasi(item)} >Masukan ke gudang</CButton> {" "}
                                              {(() => {
                                                if(item.volume === null) {
                                                  return(
                                                    <CButton size="sm" color="info" to={`/TimbangProdukPetani/${item.id}`}>
                                                      <span style={{ color: "white" }}>Timbang</span>
                                                    </CButton>
                                                  )
                                                } else {
                                                  return(
                                                    <CButton size="sm" color="info" to={`/TimbangProdukPetani/${item.id}`}>
                                                      <span style={{ color: "white" }}>Timbang Ulang</span>
                                                    </CButton>
                                                  )
                                                }
                                              })()}
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

    }

  }
}