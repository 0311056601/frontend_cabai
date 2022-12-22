import { Fragment, useState, React, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CForm,
  CFormGroup,
  CLabel,
  CCardFooter,
  CRow,
  CCol,
  CDataTable,
} from "@coreui/react";
import moment from 'moment';
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
import Web3 from "web3";
import UserService from '../../services/user.service';
import Loader from "react-spinners/DotLoader";
import { css } from "@emotion/react";
import { AddProduct } from "../../abi/produk";
import { AddTransaksi } from "../../abi/transaksi";
import { AddTransaksiRequest } from "../../abi/request";
import { AddExpired} from "../../abi/expired";

require("dotenv").config();

// var HDWalletProvider = require("@truffle/hdwallet-provider");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const RequestDataForm = (props) => {
  const { handleSubmit } = props;
  const [data, setData] = useState(null);
  const { parse } = require('json2csv');
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#3c4b64");
  let [dataFBC, setDFBC] = useState([]);
  // let [field, setField] = useState([]);
  let [listGapoktan, setListGapoktan] = useState(null);
  let [wallet, setWallet] = useState(null);

  // provider.engine.stop();

  useEffect(() => {
      getData();
  }, []);

  const getData = async () => {

    setLoading(true);

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const {chainId} = await provider.getNetwork();
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    if(chainId === parseInt(process.env.REACT_APP_CHAIN_ID)) {

      setWallet(address);
      props.AddressWallet(address);

      UserService.indexRequestData().then(
        async (response) => {
          if(response.data.message) {
            alert(response.data.message);
          } else {
            setListGapoktan(response.data.gapoktan);
          }
        },
        (error) => {
          console.log(error);
        }
      );

    } else {
      alert('Anda tidak terhubung ke jaringan polygon, harap hubungkan metamask ke jaringan polygon');
    }

    UserService.getRD(address).then(
      async (response) => {
        if(response.data.data) {
          setData(response.data.data);
        }
      },
      (error) => {
          console.log(error);
      }
    );

    setLoading(false);

  };

  
  const getDataApprove = async (item) => {

    const { Parser } = require('json2csv');
    console.log('cek item', item);
    setLoading(true)

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const {chainId} = await provider.getNetwork();
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    // const accounts = await window.ethereum.enable();
    // const akun = accounts[0];

    var getDataReq = [];
    var getDataReqCsv = [];
    if(item.data === "Transaksi") {
      // get transaksi
      let contractTransaksi = new ethers.Contract(process.env.REACT_APP_TRANSAKSI_ADDRESS, AddTransaksi, signer);
      console.log('cek data transaksi', contractTransaksi);
        let transactionTransaksi = await contractTransaksi.getAllTransaksi();
        // await transactionProduk.wait();


        await transactionTransaksi.forEach(async function (value, index) {
          getDataReq.push(
            {
              "Data Request" : "transaksi",
              "Wallet Gapoktan" : value[0],
              "Produk Hash" : value[2],
              "Nama Produk" : value[3],
              "Nomor Transaksi" : value[4],
              "Nama Pembeli" : value[5],
              "Email Pembeli" : value[6],
              "Data" : JSON.parse(value[7]),
              "Tanggal" : value[8]
            }
          );

          getDataReqCsv.push(
            {
              "Wallet Gapoktan" : value[0],
              "Produk Hash" : value[2],
              "Nama Produk" : value[3],
              "Nomor Transaksi" : value[4],
              "Nama Pembeli" : value[5],
              "Email Pembeli" : value[6],
              "Jumlah Pembayaran" : 'Rp. ' + JSON.parse(value[7]).jumlah_pembayaran,
              "Estimasi Sampai" : JSON.parse(value[7]).est_sampai,
              "Tanggal" : value[8]
            }
          );

        });
      // end get transaksi

      // generate file csv
      const fields = [`Wallet Gapoktan`, `Produk Hash`, `Nama Produk`, `Nomor Transaksi`, `Nama Pembeli`, `Email Pembeli`, `Jumlah Pembayaran`, `Estimasi Sampai`, `Tanggal`];
      const opts = { fields };
      const parser = new Parser(opts);
      const csv = parser.parse(getDataReqCsv);

      const fileName = "data";      
      const blob = new Blob([csv],{type:'text/csv;charset=utf-8'});
      const href = await URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = fileName + ".csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } else if(item.data === 'Produk') {
      // get produk
        let contractProduk = new ethers.Contract(process.env.REACT_APP_PRODUK_ADDRESS, AddProduct, signer);
        let transactionProduk = await contractProduk.getAllProduk();
        // await transactionProduk.wait();

        await transactionProduk.forEach(async function (value, index) {
          getDataReq.push(
            {
              "Data Request" : "produk",
              "Wallet Gapoktan" : value[0],
              "Nama" : value[2],
              "Data" : JSON.parse(value[3]),
              "Tanggal" : value[4]
            }
          );

          getDataReqCsv.push(
            {
              "Wallet Gapoktan" : value[0],
              "Nama" : value[2],
              "Deskripsi" : JSON.parse(value[3]).data ? JSON.parse(value[3]).data.deskripsi_produk : '-',
              "Harga Jual" : JSON.parse(value[3]).data ? 'Rp. ' + JSON.parse(value[3]).data.harga_jual : '-',
              "Biaya Pengemasan" : JSON.parse(value[3]).data ? 'Rp. ' + JSON.parse(value[3]).data.biaya_packaging : '-',
              "Tanggal Pengemasan" : JSON.parse(value[3]).data ? JSON.parse(value[3]).data.tanggal_pengemasan : '-',
              "Volume" : JSON.parse(value[3]).data ? JSON.parse(value[3]).data.volume + ' Kg' : '-',
              "Kualitas" : JSON.parse(value[3]).data && JSON.parse(value[3]).data.get_detail[0] ? JSON.parse(value[3]).data.get_detail[0].kualitas_cabai : '-',
              "Tanggal Panen" : JSON.parse(value[3]).data && JSON.parse(value[3]).data.get_detail[0] ? JSON.parse(value[3]).data.get_detail[0].tanggal_panen : '-'
            }
          );
        });
      // end get produk

      // generate file csv
      const fields = ['Wallet Gapoktan', 'Nama', 'Deskripsi', 'Harga Jual', 'Biaya Pengemasan', 'Tanggal Pengemasan', 'Volume', 'Kualitas', 'Tanggal Panen'];
      const opts = { fields };
      const parser = new Parser(opts);
      const csv = parser.parse(getDataReqCsv);

      const fileName = "data";      
      const blob = new Blob([csv],{type:'text/csv;charset=utf-8'});
      const href = await URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = fileName + ".csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } else if(item.data === 'Pemesanan Cabai') {

      // get request
        let contractRequest = new ethers.Contract(process.env.REACT_APP_REQUEST_ADDRESS, AddTransaksiRequest, signer);
        let transactionRequest = await contractRequest.getAllTransaksi();
        // await transactionSALES.wait();

        await transactionRequest.forEach(async function (value, index) {
          getDataReq.push(
            {
              "Data Request" : "request",
              "Wallet Gapoktan" : value[0],
              "Nomor Transaksi" : value[2],
              "Gapoktan" : value[3],
              "Nama Pembeli" : value[4],
              "Email Pembeli" : value[5],
              "Data" : JSON.parse(value[6]),
              "Tanggal" : value[7]
            }
          );

          getDataReqCsv.push(
            {
              "Wallet Gapoktan" : value[0],
              "Nomor Transaksi" : value[2],
              "Gapoktan" : value[3],
              "Nama Pembeli" : value[4],
              "Email Pembeli" : JSON.parse(value[6]).pembeli.get_user.email,
              "Harga" : 'Rp. ' + JSON.parse(value[6]).transaksi.harga,
              "Kualitas" : JSON.parse(value[6]).transaksi.kualitas,
              "Catatan" : JSON.parse(value[6]).transaksi.catatan,
              "Supply Demand" : JSON.parse(value[6]).transaksi.supply_demand == 0 ? '0%' : '20%',
              "Volume" : JSON.parse(value[6]).transaksi.volume + 'Kg',
              "Tanggal Pembelian" : JSON.parse(value[6]).transaksi.tanggal_pembelian
            }
          );
        });
      // end get request

      // generate file csv
      const fields = ['Wallet Gapoktan', 'Nomor Transaksi', 'Gapoktan', 'Nama Pembeli', 'Email Pembeli', 'Harga', 'Kualitas', 'Catatan', 'Supply Demand', 'Volume', 'Estimasi Sampai', 'Tanggal Pembelian'];
      const opts = { fields };
      const parser = new Parser(opts);
      const csv = parser.parse(getDataReqCsv);

      const fileName = "data";      
      const blob = new Blob([csv],{type:'text/csv;charset=utf-8'});
      const href = await URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = fileName + ".csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } else if(item.data === 'Expired') {

      // get expired
        let contractRequest = new ethers.Contract(process.env.REACT_APP_EXPIRED_ADDRESS, AddExpired, signer);
        let transactionRequest = await contractRequest.getAllExpired();
        // await transactionSALES.wait();

        await transactionRequest.forEach(async function (value, index) {
          getDataReq.push(
            {
              "Data Request" : "expired",
              "Wallet" : value[0],
              "Gapoktan" : value[3],
              "Total Volume" : value[4],
              "Catatan" : value[5],
              "Data" : JSON.parse(value[6]),
              "Tanggal" : value[7]
            }
          );          

          getDataReqCsv.push(
            {
              "Wallet Gapoktan" : value[0],
              "Gapoktan" : JSON.parse(value[6]).get_gapoktan.username,
              "Jumlah Volume" : JSON.parse(value[6]).jumlah_volume +' Kg',
              "Catatan" : JSON.parse(value[6]).catatan,
              "Tanggal" : value[7],
              "Detail" : JSON.parse(value[6]).get_detail
            }
          );
        });
      // end get expired

      // generate file csv
      const fields = ['Wallet Gapoktan', 'Gapoktan', 'Jumlah Volume', 'Catatan', 'Tanggal', 'Detail'];
      const opts = { fields };
      const parser = new Parser(opts);
      const csv = parser.parse(getDataReqCsv);

      const fileName = "data";      
      const blob = new Blob([csv],{type:'text/csv;charset=utf-8'});
      const href = await URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = fileName + ".csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    }

    // console.log("DATANYA NIH", getDataReq);

    // insert into log
      const dataLog = new FormData();
      dataLog.append('request_data_id', item.id);
      dataLog.append('wallet', item.wallet);
      dataLog.append('email', item.email);
      dataLog.append('name', item.nama);
      dataLog.append('data', item.data);
      dataLog.append('response', getDataReq.length);
      UserService.addLogRequestData(dataLog);
    // end insert log

    // generate file json
    const fileName = "file";
    // const json = JSON.stringify(getDataReq);
    const json = JSON.stringify(getDataReq, null, 4).replace(/[",\\]]/g, "");
    const blob = new Blob([json],{type:'application/json'});
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDFBC(getDataReq)

    // get data
    UserService.getRD(address).then(
      async (response) => {
        if(response.data.data) {
          setData(response.data.data);
        }
      },
      (error) => {
          console.log(error);
      }
    );

    // const formData = new FormData();
    // formData.append('requestDataId',item.id);
    // formData.append('status', 'Approve');
    // console.log(formData);
    setLoading(false)
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `
  ;

  const dataReq = [
      { key: "gapoktan", label: "Data Gapoktan"},
      { key: "wallet", label: "Wallet Saya"},
      { key: "data", label: "Request Data"},
      { key: "tanggal", label: "Tanggal"},
      { key: "status", label: "Status"},
      // { key: "approved_by", label: "Approve"},
      {
          key: "aksi",
          label: "Aksi",
          filter: false,
      },
  ];

  return (
    <Fragment>
      {(() => {
        if (loading === true) {
              return (
                  <div style={{textAlign : 'center', verticalAlign : 'middle', paddingTop : "150px"}}>
                      <div className="sweet-loading">
                          <h5>Sedang diproses</h5><br></br>
                          {/* <h5>{this.state.TxnHash === "" ? "" : <a href={"https://ropsten.etherscan.io/tx/" + this.state.TxnHash} target="_blank" >Detail</a>}</h5> */}
                          <br></br>
                              <Loader color={color} loading={loading} css={override} size={150} />
                          <br></br>
                          <br></br>
                          <h5>Mohon Tunggu...</h5>
                      </div>
                  </div>
              )
        } else {
          if(data){
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
                                              <h4 style={{ margin: "auto" }}>List History Minta Data</h4>
                                          </CCol>
                                      </CRow>
                                  </CCardHeader>
                                  <CCardBody>
                                      <CDataTable
                                        items={data}
                                        fields={dataReq}
                                        itemsPerPage={10}
                                        tableFilter
                                        cleaner
                                        itemsPerPageSelect
                                        hover
                                        sorter
                                        pagination
                                        scopedSlots={{
                                          gapoktan: (item) => {
                                            return (
                                              <td className="py-2">
                                                {item.get_gapoktan.username}
                                              </td>
                                            )
                                          },
                                          tanggal: (item) => {
                                            return (
                                                <td className="py-2">
                                                    {moment(item.created_at).format('DD/MMM/YYYY')}
                                                </td>
                                            );
                                          },
                                          aksi: (item) => {
                                            return (
                                                <td className="py-2">
                                                    {(() => {
                                                      // if(item.status === 'Diterima') {
                                                      if(item.status === 'Diterima' || item.status === 'Berhasil Diminta') {
                                                        return (
                                                          <CButton size="sm" color="info" onClick={() => getDataApprove(item)} >Minta Data</CButton>
                                                        )
                                                      }
                                                    })()}
                                                    {/* <CButton size="sm" color="info" onClick={() => getDataApprove(item)} >Minta Data</CButton> */}
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

                <form onSubmit={handleSubmit}>
                  <main className="c-main">
                    <div className="container-fluid">
                      <CCard>
                        <CCardHeader>
                          <CRow>
                            <CCol xs={9} md={10} lg={11} style={{ margin: "auto" }}>
                              <h4 style={{ margin: "auto" }}>Minta Data</h4>
                            </CCol>
                          </CRow>
                        </CCardHeader>
                        <CCardBody>
                          <CForm action="" method="post">
                            <CFormGroup>
                              <CLabel htmlFor="nf-namaJenis">Nama / Perusahaan</CLabel>
                              <Field
                                className="textInput cabai"
                                name="nama"
                                component="input"
                                type="text"
                                required={true}
                              />
                            </CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="nf-namaJenis">Alamat</CLabel>
                                <Field
                                    className="textAreaInput cabai"
                                    name="alamat"
                                    component="textarea"
                                    type="text"
                                    required={true}
                                />
                            </CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="nf-namaJenis">Email</CLabel>
                              <Field
                                className="textInput cabai"
                                name="email"
                                component="input"
                                type="email"
                                required={true}
                              />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="nf-namaJenis">Gapoktan</CLabel>
                                <Field
                                    className="textInput cabai"
                                    name="gapoktan"
                                    component="select"
                                    required={true}
                                >
                                  {
                                    listGapoktan ?
                                    (
                                      <>
                                        <option value="" hidden> -= Pilih Gapoktan =-</option>
                                        {
                                          listGapoktan && listGapoktan.map(function(v, i) {
                                            return(
                                              <option value={v.id} key={i}> {v.username} </option>
                                            )
                                          })
                                        }
                                      </>
                                    ):
                                    (
                                      <option value="" disabled hidden > -= Gapoktan Tidak Ada =- </option>
                                    )
                                  }
                                </Field>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="nf-namaJenis">Minta Data</CLabel>
                                <Field
                                    className="textInput cabai"
                                    name="data"
                                    component="select"
                                    required={true}
                                >
                                    <option value="">Pilih Data</option>
                                    <option value="Transaksi">Transaksi</option>
                                    <option value="Produk">Produk</option>
                                    <option value="Pemesanan Cabai">Pemesanan Cabai</option>
                                    <option value="Expired">Gudang Keluar</option>
                                </Field>
                            </CFormGroup>
                          </CForm>
                        </CCardBody>
                        <CCardFooter>
                          <CButton type="submit" size="sm" color="danger">
                            Submit
                          </CButton>
                        </CCardFooter>
                      </CCard>
                    </div>
                  </main>
                </form>
              </Fragment>
            )
          } else {
            return (
              <Fragment>
                <form onSubmit={handleSubmit}>
                  <main className="c-main">
                    <div className="container-fluid">
                      <CCard>
                        <CCardHeader>
                          <CRow>
                            <CCol xs={9} md={10} lg={11} style={{ margin: "auto" }}>
                              <h4 style={{ margin: "auto" }}>Minta Data</h4>
                            </CCol>
                          </CRow>
                        </CCardHeader>
                        <CCardBody>
                          <CForm action="" method="post">
                            <CFormGroup>
                              <CLabel htmlFor="nf-namaJenis">Nama / Perusahaan</CLabel>
                              <Field
                                className="textInput cabai"
                                name="nama"
                                component="input"
                                type="text"
                                required={true}
                              />
                            </CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="nf-namaJenis">Alamat</CLabel>
                                <Field
                                    className="textAreaInput cabai"
                                    name="alamat"
                                    component="textarea"
                                    type="text"
                                    required={true}
                                />
                            </CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="nf-namaJenis">Email</CLabel>
                              <Field
                                className="textInput cabai"
                                name="email"
                                component="input"
                                type="email"
                                required={true}
                              />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="nf-namaJenis">Gapoktan</CLabel>
                                <Field
                                    className="textInput cabai"
                                    name="gapoktan"
                                    component="select"
                                    required={true}
                                >
                                  {
                                    listGapoktan ?
                                    (
                                      <>
                                        <option value="" hidden> -= Pilih Gapoktan =-</option>
                                        {
                                          listGapoktan && listGapoktan.map(function(v, i) {
                                            return(
                                              <option value={v.id} key={i}> {v.username} </option>
                                            )
                                          })
                                        }
                                      </>
                                    ):
                                    (
                                      <option value="" disabled hidden > -= Gapoktan Tidak Ada =- </option>
                                    )
                                  }
                                </Field>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="nf-namaJenis">Minta Data</CLabel>
                                <Field
                                    className="textInput cabai"
                                    name="data"
                                    component="select"
                                    required={true}
                                >
                                    <option value="">Pilih Data</option>
                                    <option value="Transaksi">Transaksi</option>
                                    <option value="Produk">Produk</option>
                                    <option value="Pemesanan Cabai">Pemesanan Cabai</option>
                                    <option value="Expired">Gudang Keluar</option>
                                </Field>
                            </CFormGroup>
                          </CForm>
                        </CCardBody>
                        <CCardFooter>
                          <CButton type="submit" size="sm" color="danger">
                            Submit
                          </CButton>
                        </CCardFooter>
                      </CCard>
                    </div>
                  </main>
                </form>
              </Fragment>
            )
          }
        }
      })()}
    </Fragment>
  );
};

export default reduxForm({
  form: "RequestData", // a unique identifier for this form
})(RequestDataForm);



