import { Fragment, useState, useEffect } from "react";
import "../../Cabai.css";
import "../../CabaiMedia.css";
import {
  CCard,
} from "@coreui/react";
import UserService from '../../../services/user.service';
import KonsumenLacakTransaksiDetail from './KonsumenLacakTransaksiDetail';
import Invoice from '../../Market/Invoicing';
import { useParams } from "react-router";

const KonsumenLacakTransaksi = () => {

    let [tx, setTx] = useState(null);
    let [data, setData] = useState(null);
    let [invoice, setinvoice] = useState(null);

    const { noTx } = useParams();

    useEffect(() => {
        getData();
    }, []);
  
    const getData = async () => {

        await UserService.getDetailTransaksi(noTx).then(
            async (response) => {
                if(response.data.message) {
                    await alert(response.data.message);
                } else {
                    await setData(response.data);
                }
            },
            (error) => {
                setData((error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString())

                alert(error.message);
            }
        );

        await UserService.GetInvoice(noTx).then(
            async (response) => {
                if(response.data.message) {
                    await alert(response.data.message);
                } else {
                    await setinvoice(response.data);
                }
            },
            (error) => {
                setData((error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString())

                alert(error.message);
            }
        );

    }

    if(data) {
        return (
            <Fragment>
                <main className="c-main">
                    <div className="container-fluid">
                        <KonsumenLacakTransaksiDetail DATA={data} />

                        {(() => {
                            if(invoice) {
                                console.log('cek invoice', invoice);
                                return (
                                    <>
                                        <CCard> 
                                            <Invoice DATA={invoice} /> 
                                        </CCard>
                                    </>
                                )
                            }
                        })()}
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
export default KonsumenLacakTransaksi;