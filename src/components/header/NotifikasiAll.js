import { Fragment, React, Component } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton
} from "@coreui/react";
import UserService from '../../services/user.service';
import moment from 'moment';

export default class NotifikasiAll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      loading: false,
      color: "#3c4b64"
    };
  }

  componentDidMount() {
    UserService.ListNotifikasi().then(
      (response) => {
        this.setState({
          content: response.data.listNotif,
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

  handleHapus = async (item) => {

    await UserService.HapusNotif(item.id).then(
        (response) => {
            if(response.data.message) {
                alert(response.data.message);
            } else {
                alert('Data berhasil dihapus')
            }
        },
    );

    await UserService.ListNotifikasi().then(
        (response) => {
          this.setState({
            content: response.data.listNotif,
          });
        },
    );
  }


  render() {

    const Data = [
      { key: "nomor", label: "No."},
      { key: "notifikasi", label: "Notifikasi"},
      { key: "status", label: "Status"},
      { key: "tanggal", label: "Tanggal"},
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
                                        <h4 style={{ margin: "auto" }}>List Notifikasi</h4>
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
                                  nomor: (item, index) => {
                                    return(
                                      <td>
                                        {index + 1}
                                      </td>
                                    )
                                  },
                                  notifikasi: (item) => {
                                    return (
                                        <td>
                                            {item.notifikasi.substring(0, 10)} ...
                                        </td>
                                    )
                                  },
                                  tanggal: (item) => {
                                    return (
                                        <td>
                                            {moment(item.updated_at).format('DD/MMM/YYYY H:s')}
                                        </td>
                                    )
                                  },
                                  dataControl: (item) => {
                                    return (
                                      <>
                                        <td style={{ margin:"auto", textAlign:"center"}}>
                                          <CButton size="sm" color="danger" href={`/Pemberitahuan/${item.id}`} >Baca</CButton> &nbsp;
                                          <CButton size="sm" color="warning" style={{color:"white"}} onClick={() => this.handleHapus(item)} >Hapus</CButton> &nbsp;
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