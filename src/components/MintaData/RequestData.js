import { Fragment, useState, useEffect, useCallback } from "react";
import "../Cabai.css";
import "../CabaiMedia.css";
import RequestDataForm from "./RequestDataForm";
import RequestDataListExt from "./RequestDataListExt";
import UserService from '../../services/user.service';
// import Web3Modal from "web3modal"
import Web3 from "web3";
// import { ethers } from 'ethers'
import { css } from "@emotion/react";
import Loader from "react-spinners/DotLoader";
import { Redirect } from 'react-router-dom';
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
} from "@coreui/react";

require("dotenv").config();

var HDWalletProvider = require("@truffle/hdwallet-provider");

var m = new Date();
var dateString =
    m.getUTCFullYear() + "-" +
    ("0" + (m.getUTCMonth()+1)).slice(-2) + "-" +
    ("0" + m.getUTCDate()).slice(-2);

const RequestData = () => {
  // Can be a string as well. Need to ensure each key-value pair ends with ;
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `
  ;

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#3c4b64");

  let [TxnHash, setHash] = useState("");

  const [balance, setBalance] = useState(0);
  const [akun, setAkun] = useState("");
//   const [data, setData] = useState([]);
//   const [statusData, setStatusData] = useState(false);
  const [walletSigner, setWalletSigner] = useState('');

//   const provider = new HDWalletProvider(process.env.REACT_APP_MNEMONIC,'https://ropsten.infura.io/v3/'+process.env.REACT_APP_INFURA_PROJECT_ID);
//   const web3 = new Web3(provider);

//   provider.engine.stop();

const AddressWallet = async (address) => {

    setWalletSigner(address);

}

const handleSubmit = async (values) => {
    setLoading(true);
    
    if(walletSigner) {

      console.log('wallet ada', walletSigner);
      console.log('cek values', values);

      try{
        const formData = new FormData();
        formData.append('data',values.data);
        formData.append('nama',values.nama);
        formData.append('email',values.email);
        formData.append('alamat',values.alamat);
        formData.append('signer', walletSigner);
        formData.append('gapoktan', values.gapoktan);

        // insert data ke mysql
        await UserService.RequestData(formData).then(
          async (response) => {
            console.log('response', response);
            alert("Disimpan, menunggu approval");
          },
            (error) => {
          }
        );
      } catch (err) {
        console.log(err);
      }

    } else {

      await alert('Wallet tidak ditemukan');
      console.log('cek values', values);

    }

    await setLoading(false);

    await window.location.reload();

  };

  return (
    <Fragment>
        {(() => {
            if (loading === true) {
                return (
                    <div style={{textAlign : 'center', verticalAlign : 'middle', paddingTop : "150px"}}>
                    <div className="sweet-loading">
                        <h5>Mengajukan Permintaan Data</h5><br></br>
                        {/* <h5>{TxnHash === "" ? "" : <a href={"https://ropsten.etherscan.io/tx/" + TxnHash} target="_blank" >Detail</a>}</h5> */}
                        <br></br>
                            <Loader color={color} loading={loading} css={override} size={150} />
                        <br></br>
                        <br></br>
                        <h5>Mohon Tunggu...</h5>
                    </div>
                    </div>
                )
            } else {
                return(
                    <RequestDataForm onSubmit={handleSubmit} AddressWallet={AddressWallet} />
                )
            }
        }
        )()}
    </Fragment>
  );
};
export default RequestData;