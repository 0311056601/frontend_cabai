import { Fragment, useState, useEffect } from "react";
import "../Cabai.css";
import "../CabaiMedia.css";
import UserService from '../../services/user.service';
import { Redirect } from "react-router-dom";
import { useParams } from "react-router";
import moment from 'moment';
import InvoiceRequest from './InvoicingRequest';
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

const TransaksiDetailRequest = (props) => {
  // Can be a string as well. Need to ensure each key-value pair ends with ;
  
  const { transaksiId } = useParams();

  const [redirect, setRedirect] = useState(false);
  const [data, setData] = useState(null);
  const [profile, setProfile] = useState(false);
  const [gapoktan, setGapoktan] = useState(null);

    const getData = async () => {
        await UserService.getTransaksiDetailRequest(transaksiId).then( async (response) => {
            console.log('cek response', response);

            await setGapoktan(response.data.gapoktan);

            if(response.data.message) {
                if(response.data.profile) {
                    await alert(response.data.message);
                    await setProfile(true);
                    await setRedirect(true);
                } else {
                    await alert(response.data.message);
                }
            } else {
                
                await UserService.GetInvoiceRequest(response.data.data.no_transaksi).then( async (response) => {
                    console.log('cek invoice data', response);
                    await setData(response.data);
                })
            }
        })
    }


    useEffect(() => {
        getData();
    }, []);


    if(redirect && profile) {

        return <Redirect to="/ProfilKonsumen/Edit" />;
        // if(bayar) {
        //     return <Redirect to="/Keranjang" />;
            
        // } 

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
                                                    <CCol xs="12" md="12" xl="12">
                                                        <CFormGroup style={{ margin:"auto", textAlign:"center"}}>
                                                            <hr></hr> 
                                                                <h1>Terima kasih telah bertransaksi di platform kami</h1>
                                                            <hr></hr>
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol xs="12" md="12" xl="12">
                                                        <CFormGroup style={{ margin:"auto", textAlign:"justify"}}>
                                                            <h5>Silahkan untuk melakukan pembayaran </h5>
                                                            {/* <p>
                                                            </p> */}
                                                                <h5>Saat ini pembayaran baru bisa melalui transfer bank, untuk melakukan pembayaran silahkan transfer ke rekening berikut </h5>
                                                            {/* <p>
                                                            </p> */}
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                                {/* <CRow>
                                                    <CCol xs="12" md="12" xl="12">
                                                        <CFormGroup style={{ margin:"auto", textAlign:"justify"}}>
                                                            <hr></hr>
                                                            <p>
                                                                <strong>Alamat Pengiriman :</strong> 
                                                            </p>
                                                            <p>
                                                                {data.pembeli.alamat}
                                                            </p>
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow> */}
                                                <CRow>
                                                    <CCol xs="4" md="4" xl="4">
                                                        <CFormGroup style={{ margin:"auto", textAlign:"justify"}}>

                                                        </CFormGroup>
                                                    </CCol>
                                                    <CCol xs="4" md="4" xl="4">
                                                        <CFormGroup style={{ margin:"auto", textAlign:"center"}}>
                                                            <hr></hr>
                                                                <p>
                                                                    <strong>Pembayaran :</strong> 
                                                                </p>
                                                                <p>
                                                                    <b>Bank</b> : {gapoktan.bank ? gapoktan.bank : 'Hubungi Gapoktan'}
                                                                </p>
                                                                <p>
                                                                    <b>Atas Nama</b> : {gapoktan.atas_nama ? gapoktan.atas_nama : '-'}
                                                                </p>
                                                                <p>
                                                                    <b>Rekening</b> : {gapoktan.no_rekening ? gapoktan.no_rekening : '-'}
                                                                </p>
                                                            <hr></hr>
                                                        </CFormGroup>
                                                    </CCol>
                                                    <CCol xs="4" md="4" xl="4">
                                                        <CFormGroup style={{ margin:"auto", textAlign:"justify"}}>

                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                            </CCardBody>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                            <hr></hr>
                            {
                                data ? 
                                (<CCard> <InvoiceRequest DATA={data} /> </CCard>) :
                                (" ")
                            }
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
export default TransaksiDetailRequest;