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

const Transaksi = (props) => {
  // Can be a string as well. Need to ensure each key-value pair ends with ;
  
  const { user } = useParams();

  const [redirect, setRedirect] = useState(false);
  const [data, setData] = useState(null);
  const [transaksiId, settransaksiId] = useState(null);

    const getData = () => {
        UserService.getTransaksi().then((response) => {
            setData(response.data.data);
        })
    }

    useEffect(() => {
        getData();
    }, []);

    const handleBayar = (item) => {

        console.log('cek ini mal',item);

        UserService.updateTransaksiBayar(item.id).then( async (response) => {
            if(response.data.message) {
                if(response.data.bayar) {
                    await alert(response.data.message);
                    await settransaksiId(item.id);
                    await setRedirect(true);
                } else {
                    await alert(response.data.message);
                }
            } else {
                settransaksiId(item.id);
                await setRedirect(true);
            }
        })

    }

    if(redirect && transaksiId) {

        return <Redirect to={`/Transaksi/detail/${transaksiId}`} />;

    } else {
        if(data) {

            const Fields = [
                { key: "nomor", label: "No.", _style: { textAlign: "center", width: "7%"}},
                { key: "transaksi", label: "Transaksi", _style: { textAlign: "center"}},
                { key: "produk", label: "Produk", _style: { textAlign: "center"}},
                { key: "volume", label: "QTY", _style: { textAlign: "center"}},
                { key: "status_transaksi", label: "Status", _style: { textAlign: "center"}},
                { key: "harga", label: "Harga", _style: { textAlign: "center"}},
                {
                  key: "dataControl",
                  label: "Aksi",
                  filter: false,
                  _style: { textAlign: "center", width: "13%" },
                },
            ];

            return (
                <Fragment>
                    <main className="c-main">
                        <div className="container-fluid">
                            <CCard>
                                <CCardHeader>
                                    <h3>Transaksi</h3>
                                </CCardHeader>
                                <CCardBody>
                                    <CRow>
                                        <CCol xs="12" md="12" xl="12">
                                            <CCardBody>
                                                <CDataTable
                                                    items={data}
                                                    fields={Fields}
                                                    itemsPerPage={5}
                                                    tableFilter
                                                    cleaner
                                                    itemsPerPageSelect
                                                    sorter
                                                    pagination
                                                    scopedSlots={{
                                                        nomor: (item, index) => {
                                                            return (
                                                                <td style={{ margin:"auto", textAlign:"center"}}>
                                                                    {index + 1}
                                                                </td>
                                                            )
                                                        },
                                                        transaksi: (item) => {
                                                            return (
                                                                <td style={{ margin:"auto", textAlign:"center"}}>
                                                                    {item.get_keranjang.no_transaksi}
                                                                </td>
                                                            )
                                                        },
                                                        produk: (item) => {
                                                            return (
                                                                <td style={{ margin:"auto", textAlign:"center"}}>
                                                                    {item.get_produk.nama_produk}
                                                                </td>
                                                            )
                                                        },
                                                        volume: (item) => {
                                                            return (
                                                                <td style={{ margin:"auto", textAlign:"center"}}>
                                                                    {item.get_produk.volume} Kg
                                                                </td>
                                                            )
                                                        },
                                                        harga: (item) => {
                                                            return (
                                                                <td style={{ margin:"auto", textAlign:"center"}}>
                                                                    {/* Rp. {parseInt(item.get_produk.harga_jual).toLocaleString('en')} */}
                                                                    Rp. {parseInt(item.get_produk.harga_jual).toLocaleString('en')} - Rp. {(parseInt(item.get_produk.harga_jual) * 20 / 100 + parseInt(item.get_produk.harga_jual)).toLocaleString('en')}
                                                                </td>
                                                            )
                                                        },
                                                        dataControl: (item) => {
                                                            return (
                                                                <>
                                                                    <td style={{ margin:"auto", textAlign:"center"}}>
                                                                        {/* <CButton size="sm" color="info" style={{color:"white"}} to={`/Transaksi/detail/${item.id}`} >Bayar</CButton> {" "} */}
                                                                        <CButton size="sm" color="info" style={{color:"white"}} onClick={() => handleBayar(item)} >Bayar</CButton> {" "}
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
                                <CCardFooter>
                                    <b style={{color:"red"}}>*Note: Jika belum melakukan pembayaran, harga masih bisa berubah tergantung dari jumlah supply dan demand</b>
                                </CCardFooter>
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
export default Transaksi;