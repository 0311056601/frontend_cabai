import { Fragment, React, Component } from "react";
import "../Cabai.css";
import "../CabaiMedia.css";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CCarousel,
  CCarouselInner,
  CCarouselItem,
  CCarouselControl,
  CImg,
} from "@coreui/react";
import UserService from '../../services/user.service';

export default class Market extends Component {
  constructor(props) {
    super(props);
    this.KlikGapoktan = this.KlikGapoktan.bind(this);
    this.PilihGapoktan = this.PilihGapoktan.bind(this);

    this.state = {
      ListGapoktan: null,
      gapoktan: null,
      content: null,
      loading: false,
      color: "#3c4b64",
      halaman: 'gapoktan',
    };
  }

  componentDidMount() {
        UserService.getMarketGapoktan().then(
        (response) => {
            console.log('cek response', response);
            this.setState({
                ListGapoktan: response.data.gapoktan,
            });
        },
        //   (error) => {
        //     alert(error.message);
            // this.setState({
            //   content:
            //     (error.response &&
            //       error.response.data &&
            //       error.response.data.message) ||
            //     error.message ||
            //     error.toString(),
            // });
        //   }
        );
    }

    PilihGapoktan = () => {

        this.setState({
            halaman: 'gapoktan',
        })
        
    }

    KlikGapoktan = async (item) => {

        console.log('cek gapoktan selected', item);

        await UserService.getMarketProduk(item.id).then(

            (response) => {
                console.log('cek response', response);
                this.setState({
                    gapoktan: item,
                    content: response.data.data,
                    halaman: 'produk',
                });
            },

        );
        
    }

    render() {

        const Data = [
            { key: "nama_produk", label: "Produk", _style: { textAlign: "center"}},
            { key: "deskripsi_produk", label: "Deskripsi", _style: { textAlign: "center"}},
            { key: "harga_produk", label: "Harga Produk", _style: { textAlign: "center"}},
            { key: "gambar", label: "Gambar", _style: { textAlign: "center", width: "35%"}},
            {
              key: "dataControl",
              label: "Aksi",
              filter: false,
              _style: { textAlign: "center", width: "17%" },
            },
        ];

        
        if(this.state.halaman === 'produk') {

            if(this.state.content) {

                return (
                    <Fragment>
                        <main className="c-main">
                            <div className="container-fluid">
                                <CCard>
                                    <CCardHeader>
                                        
                                        <CRow>
                                            <CCol xs={9} md={10} lg={11} style={{ margin: "auto" }}>
                                                <h1 style={{ margin: "auto" }}>{this.state.gapoktan.username}</h1>
                                            </CCol>
                                            <CCol>
                                                <CButton block color="warning" onClick={() => this.PilihGapoktan()}>
                                                    <span style={{ color: "white" }}>Kembali</span>
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CCardHeader>
                                    <CCardBody>
                                        <CRow>
                                            <CCol xs="12" md="12" xl="12">
                                                <CCardBody>
                                                    <CDataTable
                                                        items={this.state.content}
                                                        fields={Data}
                                                        itemsPerPage={5}
                                                        tableFilter
                                                        cleaner
                                                        itemsPerPageSelect
                                                        sorter
                                                        pagination
                                                        scopedSlots={{
                                                            harga_produk: (item) => {
                                                                return(
                                                                    <td>
                                                                        Rp. {parseInt(item.harga_jual).toLocaleString('en')} - Rp {parseInt(parseInt(item.harga_jual) + parseInt(item.harga_jual * 20 / 100)).toLocaleString('en')}
                                                                    </td>
                                                                )
                                                            },
                                                            gambar: (item) => {
                                                                return(
                                                                    <td className="py-2" align="center">
                                                                        <CCard color="danger" style={{width: "100%", height: "100%" }}>
                                                                            <CCarousel>
                                                                                <CCarouselInner>
                                                                                    { item.get_img && 
                                                                                        item.get_img.map((value, index) => {
                                                                                            return (
                                                                                                <CCarouselItem key={index}>
                                                                                                    <CImg className="d-block w-50" src={process.env.REACT_APP_BACKEND_URL + value.file} alt={`slide ${index}`} style={{width: "100%", height: "150px" }} />
                                                                                                </CCarouselItem>
                                                                                            );
                                                                                        })
                                                                                    }
                                                                                    <CCarouselItem>
                                                                                        <CImg className="d-block w-50" src={process.env.REACT_APP_BACKEND_URL + item.qrcode} style={{width: "100%", height: "150px" }} />
                                                                                    </CCarouselItem>
                                                                                </CCarouselInner>
                                                                                <CCarouselControl direction="prev" />
                                                                                <CCarouselControl direction="next" />
                                                                            </CCarousel>
                                                                        </CCard>
                                                                    </td>
                                                                )
                                                            },
                                                            dataControl: (item) => {
                                                                return (
                                                                    <>
                                                                        <td style={{ margin:"auto", textAlign:"center"}}>
                                                                            <CButton size="sm" color="danger" style={{color:"white"}} target="_blank" to={`/Market/DetailProduk/${item.id}`} >Beli</CButton>
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
                    </Fragment>
                );

            } else {
                return (
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

        } else {

            if(this.state.ListGapoktan) {

                if(this.state.ListGapoktan.length === 0) {

                    return (
                        <>
                            <div align="center">
                                <br></br>
                                <br></br>
                                <br></br>
                                <h3>Data Belum Ada</h3>
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
                                            {   
                                                this.state.ListGapoktan.map((v, i) => {
                                                    return(
                                                        <Fragment key={i}>
                                                            <CCol xs="12" md="4" xl="4">
                                                                <main className="c-main">
                                                                    <div className="container-fluid">
                                                                        <CButton type="button" block color="warning">
                                                                            <CCard color="warning" onClick={() => this.KlikGapoktan(v)} style={{height:"350px"}} >
                                                                                <CCardBody>
                                                                                    <h4>{v.username}</h4>
                                                                                    <hr></hr>
                                                                                    <CImg className="d-block w-50" src={process.env.REACT_APP_BACKEND_URL + v.get_profile.profile_photo} style={{width: "100%", height: "150px" }} />
                                                                                    <hr></hr>
                                                                                    Alamat : {v.get_profile.alamat}
                                                                                </CCardBody>
                                                                            </CCard>
                                                                        </CButton>
                                                                    </div>
                                                                </main>
                                                            </CCol>
                                                        </Fragment>
                                                    )
                                                })
                                            }
                                        </CRow>
                                    </CCardBody>
                                </CCard>
                            </div>
                        </main>
                        </Fragment>
                    )

                }

            } else {
                return (
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