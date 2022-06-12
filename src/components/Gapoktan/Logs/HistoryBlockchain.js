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
  CButton,
  CTabContent,
  CTabPane,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import UserService from '../../../services/user.service';
import moment from 'moment';

export default class LogBlockchain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      loading: false,
      color: "#3c4b64"
    };
  }

  componentDidMount() {
    UserService.getTransaksiBlockchain().then(
      (response) => {
        console.log('cek response', response);
        this.setState({
          content: response.data,
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

  render() {

    const DataProduk = [
      { key: "name", label: "Nama"},
      { key: "hash", label: "Blockchain Hash"},
      { key: "created_at", label: "Tanggal Transaksi"},
      { key: "aksi", label: "Aksi"},
    ];

    const DataTransaksi = [
      { key: "name", label: "Nama"},
      { key: "hash", label: "Blockchain Hash"},
      { key: "created_at", label: "Tanggal Transaksi"},
      { key: "aksi", label: "Aksi"},
    ];

    const DataRequest = [
      { key: "name", label: "Transaksi"},
      { key: "hash", label: "Blockchain Hash"},
      { key: "created_at", label: "Tanggal Transaksi"},
      { key: "aksi", label: "Aksi"},
    ];

    const DataExpired = [
      { key: "name", label: "Catatan"},
      { key: "hash", label: "Blockchain Hash"},
      { key: "created_at", label: "Tanggal Transaksi"},
      { key: "aksi", label: "Aksi"},
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
                                        <h4 style={{ margin: "auto" }}>Log Transaksi Blockchain</h4>
                                    </CCol>
                                    <CCol>
                                    </CCol>
                                </CRow>
                            </CCardHeader>
                            <CCardBody>

                            <CTabs>
                              <CNav variant="tabs">
                                <CNavItem>
                                  <CNavLink>Produk</CNavLink>
                                </CNavItem>
                                <CNavItem>
                                  <CNavLink>Transaksi</CNavLink>
                                </CNavItem>
                                <CNavItem>
                                  <CNavLink>Request</CNavLink>
                                </CNavItem>
                                <CNavItem>
                                  <CNavLink>Expired Gudang</CNavLink>
                                </CNavItem>
                              </CNav>
                                <CTabContent>

                                  <CTabPane>
                                    <CCol>
                                      <CCardBody>

                                        <CDataTable
                                          items={this.state.content.produk}
                                          fields={DataProduk}
                                          itemsPerPage={10}
                                          tableFilter
                                          cleaner
                                          itemsPerPageSelect
                                          hover
                                          sorter
                                          pagination
                                          scopedSlots={{
                                              aksi: (item) => {
                                                return(
                                                  <td>
                                                    <CButton
                                                      href={"https://mumbai.polygonscan.com/tx/" + item.hash}
                                                      target="_blank"
                                                      className="btn btn-info btn-sm"
                                                      // style={{ backgroundColor: "white" }}
                                                    >
                                                      Check
                                                    </CButton>
                                                  </td>
                                                )
                                              },
                                              created_at: (item) => {
                                                return(
                                                  <td>
                                                    {moment(item.created_at).format('DD/MMM/YYYY HH:mm')}
                                                  </td>
                                                )
                                              }
                                          }}
                                        />

                                      </CCardBody>
                                    </CCol>
                                  </CTabPane>


                                  <CTabPane>
                                    <CCol>
                                      <CCardBody>

                                        <CDataTable
                                          items={this.state.content.transaksi}
                                          fields={DataTransaksi}
                                          itemsPerPage={10}
                                          tableFilter
                                          cleaner
                                          itemsPerPageSelect
                                          hover
                                          sorter
                                          pagination
                                          scopedSlots={{
                                              aksi: (item) => {
                                                return(
                                                  <td>
                                                    <CButton
                                                      href={"https://mumbai.polygonscan.com/tx/" + item.hash}
                                                      target="_blank"
                                                      className="btn btn-info btn-sm"
                                                      // style={{ backgroundColor: "white" }}
                                                    >
                                                      Check
                                                    </CButton>
                                                  </td>
                                                )
                                              },
                                              created_at: (item) => {
                                                return(
                                                  <td>
                                                    {moment(item.created_at).format('DD/MMM/YYYY HH:mm')}
                                                  </td>
                                                )
                                              }
                                          }}
                                        />

                                      </CCardBody>
                                    </CCol>
                                  </CTabPane>

                                  <CTabPane>
                                    <CCol>
                                      <CCardBody>

                                        <CDataTable
                                          items={this.state.content.request}
                                          fields={DataRequest}
                                          itemsPerPage={10}
                                          tableFilter
                                          cleaner
                                          itemsPerPageSelect
                                          hover
                                          sorter
                                          pagination
                                          scopedSlots={{
                                              aksi: (item) => {
                                                return(
                                                  <td>
                                                    <CButton
                                                      href={"https://mumbai.polygonscan.com/tx/" + item.hash}
                                                      target="_blank"
                                                      className="btn btn-info btn-sm"
                                                      // style={{ backgroundColor: "white" }}
                                                    >
                                                      Check
                                                    </CButton>
                                                  </td>
                                                )
                                              },
                                              created_at: (item) => {
                                                return(
                                                  <td>
                                                    {moment(item.created_at).format('DD/MMM/YYYY HH:mm')}
                                                  </td>
                                                )
                                              }
                                          }}
                                        />

                                      </CCardBody>
                                    </CCol>
                                  </CTabPane>

                                  <CTabPane>
                                    <CCol>
                                      <CCardBody>

                                        <CDataTable
                                          items={this.state.content.expired}
                                          fields={DataExpired}
                                          itemsPerPage={10}
                                          tableFilter
                                          cleaner
                                          itemsPerPageSelect
                                          hover
                                          sorter
                                          pagination
                                          scopedSlots={{
                                              aksi: (item) => {
                                                return(
                                                  <td>
                                                    <CButton
                                                      href={"https://mumbai.polygonscan.com/tx/" + item.hash}
                                                      target="_blank"
                                                      className="btn btn-info btn-sm"
                                                      // style={{ backgroundColor: "white" }}
                                                    >
                                                      Check
                                                    </CButton>
                                                  </td>
                                                )
                                              },
                                              created_at: (item) => {
                                                return(
                                                  <td>
                                                    {moment(item.created_at).format('DD/MMM/YYYY HH:mm')}
                                                  </td>
                                                )
                                              }
                                          }}
                                        />

                                      </CCardBody>
                                    </CCol>
                                  </CTabPane>

                                </CTabContent>
                              </CTabs>

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