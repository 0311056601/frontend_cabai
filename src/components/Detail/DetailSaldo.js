import { Fragment, React, Component } from "react";
import "../Cabai.css";
import "../CabaiMedia.css";
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

export default class DetailSaldo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      loading: false,
      color: "#3c4b64"
    };
  }

  componentDidMount() {
    UserService.detailSaldo().then(
      (response) => {
        console.log('cek response', response);
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

  render() {

    const Data = [
      { key: "saldo_in", label: "Saldo Masuk"},
      { key: "total_saldo", label: "Total Saldo"},
      { key: "transaksi", label: "Transaksi"},
      { key: "tanggal", label: "Tanggal"},
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
                                        <h4 style={{ margin: "auto" }}>Detail Saldo</h4>
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
                                    transaksi: (item) => {
                                        return(
                                        <td>
                                            {item.get_detail.no_transaksi} : {item.get_detail.transaksi_volume_cabai} Kilo
                                        </td>
                                        )
                                    },
                                    tanggal: (item) => {
                                        return(
                                        <td>
                                            {moment(item.created_at).format('DD/MMM/YYYY')}
                                        </td>
                                        )
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