/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CButton,
  CImg,
} from '@coreui/react'
import { canUseDOM } from '@coreui/react/src/utils/helper'
import CIcon from '@coreui/icons-react'
import moment from 'moment'

const Invoice = (props) => {
  const print = e => {
    e.preventDefault()
    canUseDOM && window.print()
  }

  const data = props.DATA.data;
  const pembeli = props.DATA.pembeli;
  const gapoktan = props.DATA.gapoktan;
  const supplyDemand = props.DATA.supplyDemand;

  console.log('cek props', props.DATA);

  return (
    <CCard>
      <CCardHeader>
        Invoice <strong>#{data.get_keranjang.no_transaksi}</strong>
        {/* <CButton className="mr-1 float-right" href="" tag="a" size="sm" color="secondary" onClick={print} ><CIcon name="cil-print" /> Print</CButton>
        <CButton className="mr-1 float-right" href="" tag="a" size="sm" color="info"><CIcon name="cil-save" /> Save</CButton> */}
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-4">
          <CCol sm="4">
            <h6 className="mb-3">Dari:</h6>
            {/* <div><strong>Gapoktan</strong></div> */}
            <div><strong>{gapoktan ? gapoktan.username : "Gapoktan"}</strong></div>
            {/* <div>Konopnickiej 42</div> */}
            {/* <div>Bekasi</div> */}
            <div>{gapoktan && gapoktan.get_profile && gapoktan.get_profile.alamat ? gapoktan.get_profile.alamat : " " }</div>
            <div>Email: {gapoktan ? gapoktan.email : " "}</div>
            <div>kontak: {gapoktan && gapoktan.get_profile && gapoktan.get_profile.kontak ? gapoktan.get_profile.kontak : " " }</div>
          </CCol>
          <CCol sm="4">
            <h6 className="mb-3">Kepada:</h6>
            <div><strong>{pembeli.nama}</strong></div>
            {/* <div>Konopnickiej 42</div> */}
            <div>{pembeli.alamat}</div>
            <div>Email: {pembeli.get_user.email}</div>
            <div>kontak: {pembeli.kontak}</div>
          </CCol>
          <CCol sm="4">
            <h6 className="mb-3">Detail:</h6>
            <div>Invoice <strong>#{data.get_keranjang.no_transaksi}</strong></div>
            <div>{moment(data.created_at).format('DD MMMM, YYYY')}</div>
            <div>Transaksi: {data.get_keranjang.no_transaksi}</div>
            <div>Produk: {data.get_produk.nama_produk}</div>
            {/* <div><strong>SWIFT code: 99 8888 7777 6666 5555</strong></div> */}
          </CCol>
        </CRow>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="center">#</th>
              <th>Produk</th>
              <th>Deskripsi</th>
              <th className="center">Jumlah</th>
              <th className="right">Harga</th>
              <th className="right">Total Harga</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="center">1</td>
              <td className="left">{data.get_produk.nama_produk}</td>
              <td className="left">{data.get_produk.deskripsi_produk}</td>
              <td className="center">1</td>
              <td className="right">Rp. {parseInt(data.get_keranjang.harga).toLocaleString('en')}</td>
              <td className="right">Rp. {parseInt(data.get_keranjang.harga).toLocaleString('en')}</td>
            </tr>
          </tbody>
        </table>
        <CRow>
          <CCol lg="4" sm="4">
            Produk yang sudah dibeli tidak bisa dikembalikan lagi. <br></br>Untuk info lebih lanjut silahkan untuk menghubungi pihak gapoktan
          </CCol>
          <CCol lg="4" sm="4">
            {
              data.qrcode ? 
              (
                <CImg
                  src={process.env.REACT_APP_BACKEND_URL + data.qrcode}
                  className="d-block w-50"
                  alt={data.get_keranjang.no_transaksi}
                />
              ) : 
              (" ")
            }
            
          </CCol>
          <CCol lg="4" sm="4" className="ml-auto">
            <table className="table table-clear">
              <tbody>
                <tr>
                  <td className="left"><strong>Subtotal</strong></td>
                  <td className="right">Rp. {parseInt(data.get_keranjang.harga).toLocaleString('en')}</td>
                </tr>
                {/* <tr>
                  <td className="left"><strong>Discount (0%)</strong></td>
                  <td className="right">Rp. -0</td>
                </tr> */}
                <tr>
                  <td className="left"><strong>Supply / Demand {supplyDemand ? '(20%)' : '(0%)'}</strong></td>
                  <td className="right"> Rp. {supplyDemand ? parseInt(data.get_keranjang.harga * 20 / 100).toLocaleString('en') : '-0'} </td>
                </tr>
                <tr>
                  <td className="left"><strong>Total</strong></td>
                  <td className="right"><strong>
                    Rp. {supplyDemand ? 
                    parseInt(data.get_keranjang.harga * 20 / 100 + parseInt(data.get_keranjang.harga)).toLocaleString('en') : 
                    parseInt(data.get_keranjang.harga).toLocaleString('en')},00</strong></td>
                </tr>
              </tbody>
            </table>
            {/* <a href="#" className="btn btn-success"> Proceed to Payment</a> */}
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default Invoice
