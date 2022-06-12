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

const Keranjang = (props) => {
  // Can be a string as well. Need to ensure each key-value pair ends with ;
  
  const { user } = useParams();

  const [redirect, setRedirect] = useState(false);
  const [data, setData] = useState(null);

    const getData = () => {
        UserService.getKeranjang().then((response) => {
            setData(response.data.data);
        })
    }

    useEffect(() => {
        getData();
    }, []);

    const handleCheckOut = (item) => {

        console.log('cek ini mal',item);

        const formData = new FormData();
        formData.append('keranjang_id',item.id);
        formData.append('produk_id',item.get_produk.id);

        UserService.checkOutProduk(formData).then( async (response) => {
            console.log('cek response', response);
            if(response.data.message) {
                await alert(response.data.message);
            } else {
                await UserService.getKeranjang().then((response) => {
                    setData(response.data.data);
                })

                await setRedirect(true);
            }
        })

    }

    if(redirect) {

        return <Redirect to="/Transaksi/Pembayaran" />;

    } else {
        if(data) {

            const Fields = [
                { key: "nomor", label: "No.", _style: { textAlign: "center", width: "7%"}},
                { key: "no_transaksi", label: "Transaksi", _style: { textAlign: "center"}},
                { key: "produk", label: "Produk", _style: { textAlign: "center"}},
                { key: "volume", label: "QTY", _style: { textAlign: "center"}},
                { key: "harga", label: "Harga", _style: { textAlign: "center"}},
                {
                  key: "dataControl",
                  label: "Aksi",
                  filter: false,
                  _style: { textAlign: "center", width: "17%" },
                },
            ];

            return (
                <Fragment>
                    <main className="c-main">
                        <div className="container-fluid">
                            <CCard>
                                <CCardHeader>
                                    <h3>Keranjang Belanja</h3>
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
                                                                    {/* Rp. {parseInt(item.harga).toLocaleString('en')} */}
                                                                    Rp. {parseInt(item.harga).toLocaleString('en')} - Rp. {(parseInt(item.harga) * 20 / 100 + parseInt(item.harga)).toLocaleString('en')}
                                                                </td>
                                                            )
                                                        },
                                                        dataControl: (item) => {
                                                            return (
                                                                <>
                                                                    <td style={{ margin:"auto", textAlign:"center"}}>
                                                                        <CButton size="sm" color="info" style={{color:"white"}} to={`/Market/DetailProduk/${item.produk}`} >Detail</CButton> {" "}
                                                                        <CButton size="sm" color="danger" style={{color:"white"}} onClick={() => handleCheckOut(item)} >Check Out</CButton>
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
export default Keranjang;