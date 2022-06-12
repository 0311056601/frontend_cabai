import { Fragment, React, Component } from "react";
import "../../Cabai.css";
import "../../CabaiMedia.css";
import { Redirect } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLabel,
  CDataTable,
  CRow,
  CButton,
  CBadge,
  CFormGroup,
  CInputCheckbox,
  CTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import UserService from '../../../services/user.service';
import moment from 'moment';

const current = new Date();
const date = `${current.getFullYear()}/${current.getMonth()+1}/${current.getDate()}`;

// code untuk remove spesific data dari array
(function removeFromArrayPolyfill() {
  if (window.Array.prototype.remove) return;

  Array.prototype.remove = function (value) {
    if (!this.length || !value) return;

    const indexOfValue = this.indexOf(value);

    if (indexOfValue >= 0) {
      this.splice(indexOfValue, 1);
    }
  };
})();
// end code

export default class Gudang extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      modalProses: false,
      loading: false,
      color: "#3c4b64",
      expDue: null,
      exp: [],
      dataExp: [],
      formProses: false,
      catatan: null,
      redirect: false,
    };
  }

  componentDidMount() {
    UserService.gapoktanGetDataGudang().then(
      (response) => {
        console.log('cek response get data', response);
        this.setState({
          content: response.data.gudang,
          expDue: response.data.expired.expired,
          exp: [],
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

  setModal = async (exp) => {
    if(exp.length >= 1) {
      this.setState({
        formProses: true,
      })

      this.setState({
        modalProses: !this.state.modalProses,
      })
    } else {
      this.setState({
        formProses: false,
      })
      await alert('Harap pilih data yang ingin diproses');
    }
  }

  handleProcess = async () => {
    if(this.state.catatan) {

      let catatan = this.state.catatan;
      let dataExp = this.state.dataExp;
      let exp = this.state.exp;

      if(exp) {

        let formData = new FormData();
        formData.append("catatan", catatan);

        for (let i = 0; i < exp.length; i++) {
          formData.append("expired[]", exp[i]);
        }

        for (let i = 0; i < dataExp.length; i++) {
          formData.append("tglExp[]", dataExp[i]);
        }

        await UserService.gudangProcess(formData).then((response) => {
          
          console.log('cek res', response);
          if(response.data.message) {
            alert(response.data.message);
            console.log('cek message', response.data.message);
          } else {
            alert("Data berhasil disimpan");
          }
          
        });

        await this.setState({
          modalProses: !this.state.modalProses,
          redirect: true,
        })

      }

    }

  }

  getKarakter = (e) => {
    console.log('cek karakter', e.target.value);
    let val = e.target.value;
    this.setState({
      catatan: val,
    })
  }

  pushData = async (item, tglExpired) => {

    if(this.state.exp.includes(item.id)) {
      this.state.exp.remove(item.id);
      this.state.dataExp.remove(tglExpired);
    } else {
      console.log('push');
      this.state.exp.push(item.id);
      this.state.dataExp.push(tglExpired);
    }

    // salah karena tidak push ke array jika tanggalnya sama
    // if(this.state.dataExp.includes(tglExpired)) {
    //   this.state.dataExp.remove(tglExpired);
    // } else {
    //   console.log('push');
    //   this.state.dataExp.push(tglExpired);
    // }

    console.log('cek exp', this.state.exp);
    console.log('cek tglExp', this.state.dataExp);

  }

  render() {

    if(this.state.redirect) {
      return <Redirect to="/GudangExpired" />;
    }

    const Data = [
      { key: "petani", label: "Petani"},
      { key: "tanggal_panen", label: "Tanggal Panen"},
      { key: "kualitas", label: "Kualitas"},
      { key: "HPP", label: "HPP"},
      { key: "volume", label: "Volume (kg)"},
      { key: "Expired", label: "Expired"},
      { key: "pilih", label: "Pilih"},
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
                                    <h4 style={{ margin: "auto" }}>Gudang Penyimpanan</h4>
                                  </CCol>
                                  <CCol>
                                    <CButton
                                      block
                                      color="danger"
                                      // onClick={() => this.prosesExpired(this.state.exp)}
                                      onClick={() => this.setModal(this.state.exp)}
                                      >
                                      Proses
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
                                  petani: (item) => {
                                    return (
                                      <>
                                        <td>
                                          {item.get_petani.username}
                                        </td>
                                      </>
                                    )
                                  },
                                  tanggal_panen: (item) => {
                                    return (
                                      <>
                                        <td>
                                          {moment(item.get_produk.tanggal_panen).format('DD/MMM/YYYY')}
                                        </td>
                                      </>
                                    )
                                  },
                                  HPP: (item) => {
                                    return (
                                      <>
                                        <td>
                                          Rp. {parseInt(item.get_produk.harga).toLocaleString('en')}
                                        </td>
                                      </>
                                    )
                                  },
                                  kualitas: (item) => {
                                    return (
                                      <>
                                        <td>
                                          {item.get_produk.kualitas}
                                        </td>
                                      </>
                                    )
                                  },
                                  Expired: (item) => {

                                    let tglExp = moment(item.get_produk.tanggal_panen).add(this.state.expDue, 'days').format('YYYYMMDD');
                                    let now = moment(date).format('YYYYMMDD');

                                    return (
                                      <>
                                        <td>
                                          {parseInt(tglExp) < parseInt(now) ? 
                                            (
                                              <>
                                                <CBadge color="danger" size="sm"><CLabel>Exp : {moment(item.get_produk.tanggal_panen).add(this.state.expDue, 'days').format('DD / MMM / YYYY')}</CLabel></CBadge>
                                              </>
                                            ) : 
                                            (
                                              <>
                                                <CBadge color="success" size="sm"><CLabel>Exp : {moment(item.get_produk.tanggal_panen).add(this.state.expDue, 'days').format('DD / MMM / YYYY')}</CLabel></CBadge>
                                              </>
                                            )
                                          }
                                        </td>
                                      </>
                                    )
                                  },
                                  pilih: (item) => {

                                    let tglExp = moment(item.get_produk.tanggal_panen).add(this.state.expDue, 'days').format('YYYYMMDD');
                                    let now = moment(date).format('YYYYMMDD');

                                    return (
                                      <>
                                        <td>
                                          {parseInt(tglExp) < parseInt(now) ? 
                                            (
                                              <>
                                                <input type="checkbox" value={item} onClick={() => this.pushData(item, moment(item.get_produk.tanggal_panen).add(this.state.expDue, 'days').format('DD / MMM / YYYY'))} /> &nbsp;
                                              </>
                                            ) : 
                                            (
                                              <>
                                                
                                              </>
                                            )
                                          }
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

        <CModal 
          show={this.state.modalProses}
          color="primary" 
        >
          <CModalHeader closeButton>
            <CModalTitle>Warehouse Receipts</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormGroup>
              <CLabel>Isi Catatan</CLabel>
              <CTextarea 
                onChange={this.getKarakter}
                name="catatan" 
                id="textarea-input" 
                rows="3"
                placeholder="Catatan..." 
                required={true}
              />
            </CFormGroup>
          </CModalBody>
          <CModalFooter>
            <CButton color="dark" style={{ backgroundColor: "#00c4cc" }} onClick={() => this.handleProcess(this.state.catatan)}>
              Submit
            </CButton>
          </CModalFooter>
        </CModal>

      </Fragment>
    );
  }
}