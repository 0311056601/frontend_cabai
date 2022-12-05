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

export default class ListPetani extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      loading: false,
      color: "#3c4b64"
    };
  }

  componentDidMount() {
    UserService.getAllUserWithRole().then(
      (response) => {
        console.log('cek response', response);
        this.setState({
          content: response.data.petani,
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

  changeStatus = async (item) => {
    this.setState({
      loading: true,
    });

    await UserService.changeStatusPetani(item.id).then(
      async (response) => {
        console.log(response);
        this.setState({
          loading: false,
        });

        await UserService.getAllUserWithRole().then(
            (response) => {
                console.log('cek response', response);
                this.setState({
                content: response.data.petani,
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

        await showResults("Data Berhasil Diupdate");

      },
        (error) => {
      }
    );
  };

  render() {

    const Data = [
      { key: "username", label: "Nama"},
      { key: "email", label: "Email"},
      {
        key: "dataControl",
        label: "",
        filter: false,
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
                                        <h4 style={{ margin: "auto" }}>Daftar Petani</h4>
                                    </CCol>
                                    <CCol>
                                        <CButton
                                            block
                                            color="danger"
                                            to="/DaftarAkunPetani"
                                            >
                                            Buat Akun Petani
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
                                      dataControl: (item) => {
                                          console.log('cek item', item)
                                        return (
                                          <td className="py-2" align="center">
                                            <div>
                                              {(() => {
                                                  if(item.status === "1") {
                                                    return(
                                                      <CButton size="sm" color="danger" onClick={() => this.changeStatus(item)}>Non Aktifkan</CButton>
                                                    )
                                                  } else {
                                                    return (
                                                      <CButton size="sm" color="warning" onClick={() => this.changeStatus(item)}>Aktifkan</CButton>
                                                    )
                                                  }
                                              })()}
                                              <CButton size="sm" color="info" className="ml-1" to={`LahanPetani/${item.id}`} >Lihat Lahan</CButton>
                                              {/* <CButton size="sm" color="info" className="ml-1" to={`Detail-mitra-petani/${item.id}`} >Detail</CButton> */}
                                            </div>
                                          </td>
                                        );
                                      },
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