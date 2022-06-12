import { Fragment, useState,  useEffect } from "react";
import "../Cabai.css";
import "../CabaiMedia.css";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CFormGroup,
  CRow,
  CButton,
} from "@coreui/react";
import UserService from '../../services/user.service';
import { useParams } from "react-router";
import moment from 'moment';


const NotifikasiDetail = () => {
  // Can be a string as well. Need to ensure each key-value pair ends with ;

    const { notifId } = useParams();
    const [data, setData] = useState(false);

    const getData = () => {
        UserService.NotifikasiDetail(notifId).then(
            (response) => {
              console.log('cek response get data', response);
              if(response.data.message) {
                alert(response.data.message);
              } else {
                setData(response.data.data);
              }              
            },
            (error) => {
                setData((error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString()
                )
            }
        );
    }

    useEffect(() => {
        getData();
    }, []);


    if(data) {
        return (
            <Fragment>
                <main className="c-main">
                    <div className="container-fluid">
                        <CCard>
                            <CCardBody>
                                <CFormGroup>
                                    <div className="container-fluid">
                                        <CRow>
                                            <h2>Notifikasi</h2>
                                        </CRow>
                                    </div>
                                </CFormGroup>
                                <hr></hr>
                                <br></br>
                                <CFormGroup>
                                    {data.notifikasi}
                                </CFormGroup>
                            </CCardBody>
                            <CCardFooter>
                                <CButton size="sm" color="secondary" to={`/SemuaPemberitahuan`} >Semua Notifikasi</CButton> &nbsp;
                            </CCardFooter>
                        </CCard>
                    </div>
                </main>
            </Fragment>
        );
    } else {
        return(
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

};
export default NotifikasiDetail;