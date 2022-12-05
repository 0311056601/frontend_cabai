import { Fragment, useState, useEffect } from "react";
import "../../Cabai.css";
import "../../CabaiMedia.css";
import UserService from '../../../services/user.service';
import showResults from '../../showResults/showResults';
import { css } from "@emotion/react";
import Loader from "react-spinners/DotLoader";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CButton,
    CFormGroup,
    CNavLink,
    CCarousel,
    CCarouselInner,
    CCarouselItem,
    CCarouselControl,
    CImg,
} from "@coreui/react";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from 'react-google-maps';

const LahanPetani = () => {
  // Can be a string as well. Need to ensure each key-value pair ends with ;

  const { petaniId } = useParams();

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `
  ;

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#3c4b64");
  const [redirect, setRedirect] = useState(false);
  const [data, setData] = useState(null);

    const getData = () => {
        UserService.listLahanWithPetaniId(petaniId).then((response) => {
            console.log('cek response', response);
            setData(response.data.lahan);
        })
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Fragment>
            {(() => {
                if (loading === true) {
                    return (
                        <>
                            <div style={{textAlign : 'center', verticalAlign : 'middle', paddingTop : "150px"}}>
                                <div className="sweet-loading">
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <h5>Mohon Tunggu...</h5>
                                </div>
                            </div>
                        </>
                    )
                } else {

                    const Data = [
                        { key: "nama_lahan", label: "Lahan"},
                        { key: "luas_lahan", label: "Luas Lahan"},
                        { key: "alamat_lahan", label: "Lokasi Lahan"},
                        {
                          key: "dataControl",
                          label: "Aksi",
                          filter: false,
                          _style: { textAlign: "center", width: "20%" },
                        },
                    ];

                    return(
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
                                                            <h4 style={{ margin: "auto" }}>Daftar Lahan</h4>
                                                        </CCol>
                                                    </CRow>
                                                </CCardHeader>
                                                <CCardBody>
                                                <CDataTable
                                                    items={data}
                                                    fields={Data}
                                                    itemsPerPage={10}
                                                    tableFilter
                                                    cleaner
                                                    itemsPerPageSelect
                                                    hover
                                                    sorter
                                                    pagination
                                                    scopedSlots={{
                                                    luas_lahan: (item) => {
                                                        return(
                                                        <td>
                                                            {item.luas_lahan} Hektar
                                                        </td>
                                                        )
                                                    },
                                                    dataControl: (item) => {
                                                        return (
                                                            <>
                                                                <td style={{ margin:"auto", textAlign:"center"}}>
                                                                    <CButton size="sm" color="info" to={`/PreviewLahan/${item.id}`} >Preview</CButton> &nbsp;
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
                    )
                }
            }
            )()}
        </Fragment>
    );

};
export default LahanPetani;