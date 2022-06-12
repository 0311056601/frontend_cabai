import { Fragment, useState, useEffect } from "react";
import "../Cabai.css";
import "../CabaiMedia.css";
import UserService from '../../services/user.service';
import { Redirect } from "react-router-dom";
import { useParams } from "react-router";
import moment from 'moment';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardFooter,
    CCol,
    CDataTable,
    CFormGroup,
    CRow,
    CButton,
    CCarousel,
    CCarouselInner,
    CCarouselItem,
    CCarouselControl,
    CImg,
  } from "@coreui/react";

const BeliProdukMarket = (props) => {
  // Can be a string as well. Need to ensure each key-value pair ends with ;
  
  const { id } = useParams();

  const [redirect, setRedirect] = useState(false);
  const [beli, setBeli] = useState(false);
  const [data, setData] = useState(null);

    const getData = () => {
        UserService.getProdukSiapJual(id).then((response) => {
            console.log('cek response', response);
            setData(response.data);
        })
    }

    const handleBeli = async () => {
        // console.log('produk id', id);
        // console.log('user', props.dataUser.user.id);
        if(props.dataUser) {

            // input ke keranjang
            try{
                const formData = new FormData();
                formData.append('user', props.dataUser.user.id);
                formData.append('produk', id);

                UserService.postKeranjang(formData).then( async (response) => {
                    console.log('cek response', response);
                    if(response.data.message) {
                        await alert(response.data.message);
                    } else {
                        await alert("Data berhasil dimasukan keranjang");

                        await setBeli(props.dataUser);
                        await setRedirect(true);
                    }
                })
            } catch (e) {
                await alert(e.message);
            }


        } else {

            await alert("Harap login terlebih dahulu");

            await setRedirect(true);

        }
    }

    // const handleKeranjang = async (id) => {
    //     console.log('produk id', id);
    //     if(props.userRole) {

    //     } else {
    //         await alert("Harap login terlebih dahulu");

    //         await setRedirect(true);
    //     }
    // }

    useEffect(() => {
        getData();
    }, []);


    if(redirect) {

        if(beli) {
            return <Redirect to="/Keranjang" />;
        } else {
            return <Redirect to="/Login" />;
        }

    } else {
        if(data) {

            return (
                <Fragment>
                    <main className="c-main">
                        <div className="container-fluid">
                            <CCard>
                                <CCardBody>
                                    <CRow>
                                        <CCol xs="12" md="12" xl="12">
                                            <CCardBody>
                                                <CRow>
                                                    <CCol xs="6" md="6" xl="6">
                                                        <CFormGroup>
                                                            <div style={{width: "100%", height: "100%" }}>
                                                                <CCarousel>
                                                                    <CCarouselInner>
                                                                        { data.produkJual.get_img && 
                                                                            data.produkJual.get_img.map((value, index) => {
                                                                                return (
                                                                                    <CCarouselItem key={index}>
                                                                                        <CImg className="d-block w-100 h-100" src={process.env.REACT_APP_BACKEND_URL + value.file} alt={`slide ${index}`} />
                                                                                    </CCarouselItem>
                                                                                );
                                                                            })
                                                                        }
                                                                    </CCarouselInner>
                                                                    <CCarouselControl direction="prev" />
                                                                    <CCarouselControl direction="next" />
                                                                </CCarousel>
                                                            </div>
                                                        </CFormGroup>
                                                    </CCol>
                                                    <CCol xs="6" md="6" xl="6">
                                                        <CCard>
                                                            <CCardBody>
                                                                <CFormGroup>
                                                                    <h3>{data.produkJual.nama_produk.toUpperCase()}</h3>
                                                                    <hr></hr>
                                                                    <h5>{data.produkJual.deskripsi_produk}</h5>
                                                                    <br></br>
                                                                    <h5>
                                                                        Rp. {parseInt(data.produkJual.harga_jual).toLocaleString('en')} - Rp. {(parseInt(data.produkJual.harga_jual) * 20 / 100 + parseInt(data.produkJual.harga_jual)).toLocaleString('en')}
                                                                    </h5>
                                                                    <br></br>
                                                                    <br></br>
                                                                    <span style={{color:"red"}} >*Note: <br></br>Harga diatas adalah range harga yang dipengaruhi supply demand</span>
                                                                </CFormGroup>
                                                            </CCardBody>
                                                        </CCard>
                                                        <CCard>
                                                            <CCardBody>
                                                                <CFormGroup>
                                                                    <h4>Cabai</h4>
                                                                    <hr></hr>
                                                                    <p>
                                                                        <b>Kualitas Cabai :</b> {data.ProdukPetani.kualitas}
                                                                    </p>
                                                                    <p>
                                                                        <b>Tanggal Panen :</b> {moment(data.ProdukPetani.tanggal_panen).format('DD/MMM/YYYY')}
                                                                    </p>
                                                                    <br></br>
                                                                    <h4>Kemasan</h4>
                                                                    <hr></hr>
                                                                    {/* <p>
                                                                        <b>Kualitas Kemasan :</b> {data.produkJual.kualitas_kemasan}
                                                                    </p> */}
                                                                    <p>
                                                                        <b>Tanggal Pengemasan :</b> {moment(data.produkJual.tanggal_pengemasan).format('DD/MMM/YYYY')}
                                                                    </p>
                                                                    <p>
                                                                        <b>Volume :</b> {data.produkJual.volume} Kg
                                                                    </p>
                                                                    <br></br>
                                                                    <p>
                                                                        <CImg className="d-block w-50 h-50" src={process.env.REACT_APP_BACKEND_URL + data.produkJual.qrcode} />
                                                                    </p>
                                                                    <br></br>
                                                                    <br></br>
                                                                    <div className="container-fluid">
                                                                        <CRow>
                                                                            {/* <div >
                                                                                <CButton size="sm" color="dark" style={{ color: "white" }} to="/Market" >Kembali</CButton>
                                                                            </div> */}
                                                                            <div className="ml-auto" align="right">
                                                                                <CButton size="sm" color="success" target="_blank" to={`/QRProduk/${id}`} >Detail</CButton> {" "}
                                                                                <CButton
                                                                                    className="btn btn-danger btn-sm"
                                                                                    onClick={handleBeli}
                                                                                >
                                                                                    Beli
                                                                                </CButton> {" "}
                                                                                {/* <CButton
                                                                                    className="btn btn-warning btn-sm"
                                                                                    onClick={handleKeranjang}
                                                                                    style={{ color: "white" }}
                                                                                >
                                                                                    Masukan Keranjang
                                                                                </CButton> */}
                                                                            </div>
                                                                        </CRow>
                                                                    </div>
                                                                </CFormGroup>
                                                            </CCardBody>
                                                        </CCard>
                                                    </CCol>
                                                </CRow>
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
                    <br></br>
                    <br></br>
                    <br></br>
                    <div style={{textAlign:"center"}}>
                        <h3>Mohon Tunggu...</h3>
                    </div>
                </>
            )

        }
    }

};
export default BeliProdukMarket;