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

export default class ListLahan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      loading: false,
      color: "#3c4b64"
    };
  }

  componentDidMount() {
    UserService.ListLahan().then(
      (response) => {
        this.setState({
          content: response.data.lahan,
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

  HapusLahan = async (item) => {
    await UserService.HapusLahan(item.id).then(
      async (response) => {

        showResults("Data berhasil dihapus");
        
        await UserService.ListLahan().then(
            (response) => {
              console.log('cek response', response);
                this.setState({
                  content: response.data.lahan,
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
                                        <h4 style={{ margin: "auto" }}>Daftar Lahan</h4>
                                    </CCol>
                                    <CCol>
                                        <CButton
                                            block
                                            color="danger"
                                            to="/AddLahan"
                                            >
                                            Tambah Lahan
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
                                          <CButton size="sm" color="success" to={`/EditLahan/${item.id}`} >Ubah</CButton> &nbsp;
                                          <CButton size="sm" color="warning" style={{color:"white"}} onClick={() => this.HapusLahan(item)} >Hapus</CButton> &nbsp;
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