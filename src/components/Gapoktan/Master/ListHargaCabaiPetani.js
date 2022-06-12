import { Fragment, React, Component } from "react";
import "../../Cabai.css";
import "../../CabaiMedia.css";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton
} from "@coreui/react";
import UserService from '../../../services/user.service';
import showResults from '../../showResults/showResults';
import moment from 'moment';

export default class ListHargaCabaiPetani extends Component {
    constructor(props) {
        super(props);

        console.log('cek props', props);

        this.state = {
            content: [],
            loading: false,
            color: "#3c4b64"
        };
    }

    componentDidMount() {

        UserService.getMasterHargaCabaiPetani().then(
            (response) => {
                this.setState({
                content: response.data.data,
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

    HapusData = async (item) => {
        await UserService.DeleteMHargaCabaiPetani(item.id).then(
          async (response) => {

            await showResults("Data berhasil dihapus");
            
            await UserService.getMasterHargaCabaiPetani().then(
                (response) => {
                    this.setState({
                      content: response.data.data,
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

          },
            (error) => {
          }
        );
    }

    UbahStatus = async (item) => {

        await UserService.ChangeStatusMHargaCabaiPetani(item.id).then(
        async (response) => {

            await showResults("Data berhasil diupdate");
            
            await UserService.getMasterHargaCabaiPetani().then(
                (response) => {
                    this.setState({
                    content: response.data.data,
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

        },
            (error) => {
            }
        );
    }

    render() {

        const Data = [
            { key: "harga_dasar", label: "Harga Dasar"},
            { key: "kualitas", label: "Kualitas"},
            { key: "profit", label: "Profit"},
            { key: "harga_jual", label: "Harga Jual Petani"},
            { key: "status", label: "Status"},
            { key: "dibuat", label: "Dibuat"},
            {
                key: "dataControl",
                label: "Aksi",
                filter: false,
                _style: { textAlign: "center", width: "20%" },
            },
        ];

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
                                                <h4 style={{ margin: "auto" }}>Daftar Harga Cabai Petani</h4>
                                            </CCol>
                                            <CCol>
                                                <CButton
                                                    block
                                                    color="danger"
                                                    to="/AddHargaCabaiPetani"
                                                >
                                                    harga cabai petani
                                                </CButton>
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
                                                harga_jual: (item) => {
                                                    return (
                                                        <td>
                                                            Rp. {parseInt(item.harga_jual).toLocaleString('en')}
                                                        </td>
                                                    )
                                                },
                                                kualitas: (item) => {
                                                    return(
                                                        <td>
                                                            {item.kualitas}
                                                        </td>
                                                    )
                                                },
                                                profit: (item) => {
                                                    return (
                                                        <td>
                                                            {`${item.profit}%`}
                                                        </td>
                                                    )
                                                },
                                                status:(item) => {
                                                    return(
                                                        <td>
                                                            {item.status === 1 ? "Aktif" : "Tidak Aktif"}
                                                        </td>
                                                    )
                                                },
                                                dibuat:(item) => {
                                                    return(
                                                        <td>
                                                            {moment(item.created_at).format('DD/MMM/YYYY HH:mm')}
                                                        </td>
                                                    )
                                                },
                                                dataControl: (item) => {
                                                    return (
                                                        <>
                                                            <td style={{ margin:"auto", textAlign:"center"}}>
                                                                <CButton size="sm" color="warning" style={{color:"white"}} onClick={() => this.UbahStatus(item)} >Ubah Status</CButton> &nbsp;
                                                                <CButton size="sm" color="danger" onClick={() => this.HapusData(item)} >Hapus</CButton> &nbsp;
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
    }
}