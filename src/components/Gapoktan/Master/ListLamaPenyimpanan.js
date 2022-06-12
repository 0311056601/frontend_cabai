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

export default class ListLamaPenyimpanan extends Component {
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

    UserService.getMasterExpired().then(
      (response) => {
        if(response.data.message) {
          alert(response.data.message);
        } else {
          this.setState({
            content: response.data.data,
          });
        }
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
    await UserService.DeleteMExpired(item.id).then(
      async (response) => {

        await alert(response.data.message);
        
        await UserService.getMasterExpired().then(
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
    await UserService.ChangeStatusMExpired(item.id).then(
      async (response) => {

        if(response.data.message) {
          alert(response.data.message);
        } else {
          await showResults("Data berhasil diupdate");
        }

        await UserService.getMasterExpired().then(
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
      { key: "expired", label: "Harga Pengemasan"},
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
                                        <h4 style={{ margin: "auto" }}>Lamanya Cabai Disimpan Di Gudang</h4>
                                    </CCol>
                                    <CCol>
                                        <CButton
                                            block
                                            color="danger"
                                            to="/AddExpired"
                                        >
                                            Buat Data
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
                                  expired: (item) => {
                                    return (
                                        <td>
                                            {`${item.expired} Hari`}
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