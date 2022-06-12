import { Fragment, React, Component } from "react";
import "../Cabai.css";
import "../CabaiMedia.css";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLabel,
  CInput,
  CFormGroup,
  CDataTable,
  CRow,
  CButton,
} from "@coreui/react";
import UserService from '../../services/user.service';
import LacakProdukDetail from './LacakProdukDetail';
import Invoice from './Invoicing';

export default class LacakProduk extends Component {
    constructor(props) {
        super(props);
        this.transaksi = this.transaksi.bind(this);

        this.state = {
            tx: null,
            data: null,
            invoice: null,
            loading: false,
        };
    }

    transaksi = async () => {

        this.setState({
            loading: true,
        });

        let noTx = this.state.tx.target.value;

        await UserService.getDetailTransaksi(noTx).then(
            async (response) => {
                console.log('cek response', response);
                if(response.data.message) {
                    await alert(response.data.message);
                } else {
                    await this.setState({
                        data: response.data,
                        loading: false,
                    });

                    await UserService.GetInvoice(noTx).then(
                        async (response) => {
                            console.log('cek response invoice', response);
                            if(response.data.message) {
                                await alert(response.data.message);
                            } else {
                                await this.setState({
                                    invoice: response.data,
                                    loading: false,
                                });
                            }
                        },
                        (error) => {
                            this.setState({
                            data:
                                (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                                error.message ||
                                error.toString(),
                            });
                            alert(error.message);
                        }
                    );
                }
            },
            (error) => {
                this.setState({
                data:
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString(),
                });
                alert(error.message);
            }
        );


        this.setState({
            loading: false,
        });

    }

    render() {

        if(this.state.loading) {
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
        } else {
            return (
                <Fragment>
                    <main className="c-main">
                        <div className="container-fluid">
                            <CCard>
                                <CCardBody>
                                    <CFormGroup>
                                        <div className="container-fluid">
                                            <CRow>
                                                <h2>Lacak Progress Tranaskasi</h2>
                                            </CRow>
                                        </div>
                                    </CFormGroup>
                                    <hr></hr>
                                    <br></br>
                                    <CFormGroup>
                                        <CRow>
                                            <CCol xs="2" md="2" xl="2">
                                                <CLabel htmlFor="nf-namaJenis">Masukkan Nomor Transaksi :</CLabel>
                                            </CCol>
                                            <CCol xs="8" md="8" xl="8">
                                                <CInput
                                                    className="textInput cabai"
                                                    name="transaksi"
                                                    component="input"
                                                    onChange={(v) => this.setState({tx: v})}
                                                    required={true}
                                                    placeholder="TX-..."
                                                />
                                            </CCol>
                                            <CCol xs="2" md="2" xl="2">
                                                {/* <CButton size="sm" color="danger" onClick={() => this.setModal(item)} >Lacak</CButton> &nbsp; */}
                                                <CButton size="sm" color="danger" onClick={() => this.transaksi()} >Lacak</CButton> &nbsp;
                                            </CCol>
                                        </CRow>
                                    </CFormGroup>
                                </CCardBody>
                            </CCard>
                            {
                                this.state.data ?
                                (<LacakProdukDetail DATA={this.state.data} />) :
                                (" ")
                            }
                            {
                                this.state.invoice ?
                                (<CCard> <Invoice DATA={this.state.invoice} /> </CCard>) :
                                (" ")
                            }
                        </div>
                    </main>
                </Fragment>
            );
        }

    }
}