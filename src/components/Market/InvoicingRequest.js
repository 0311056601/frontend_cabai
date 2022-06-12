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

const InvoiceRequest = (props) => {
  const print = e => {
    e.preventDefault()
    canUseDOM && window.print()
  }

  const data = props.DATA.data;
  const pembeli = props.DATA.pembeli;
  const gapoktan = props.DATA.gapoktan;
  const hargaCabai = props.DATA.hargaCabai;
  const hargaPeckaging = props.DATA.hargaPeckaging;
  const supplyDemand = props.DATA.supplyDemand;

  return (
    <CCard>
      <CCardHeader>
        Invoice <strong>#{data.no_transaksi}</strong>
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
            <div>Invoice <strong>#{data.no_transaksi}</strong></div>
            <div>{moment(data.created_at).format('DD MMMM, YYYY')}</div>
            <div>Transaksi: {data.no_transaksi}</div>
            <div>Produk: {`Pemesanan ${data.no_transaksi} dari ${pembeli.nama}`}</div>
            {/* <div><strong>SWIFT code: 99 8888 7777 6666 5555</strong></div> */}
          </CCol>
        </CRow>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="center">#</th>
              <th>Produk</th>
              <th className="center">Jumlah</th>
              <th className="right">Harga</th>
              <th className="right">Pengemasan</th>
              <th className="right">Total Harga</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="center">1</td>
              <td className="left">{`Pemesanan ${data.no_transaksi} dari ${pembeli.nama}`}</td>
              <td className="center">{`${data.volume} Kg`}</td>
              <td className="right">Rp. {parseInt(hargaCabai.harga_jual * data.volume).toLocaleString('en')}</td>
              <td className="right">Rp. {parseInt(hargaPeckaging.harga * data.volume).toLocaleString('en')}</td>
              <td className="right">Rp. {parseInt((hargaCabai.harga_jual * data.volume) + (hargaPeckaging.harga * data.volume)).toLocaleString('en')}</td>
            </tr>
          </tbody>
        </table>
        <CRow>
          <CCol lg="4" sm="5">
            Produk yang sudah dibeli tidak bisa dikembalikan lagi. <br></br>Untuk info lebih lanjut silahkan untuk menghubungi pihak gapoktan
          </CCol>
          <CCol lg="4" sm="4">
            {
              data.qrcode ? 
              (
                <CImg
                  src={process.env.REACT_APP_BACKEND_URL + data.qrcode}
                  className="d-block w-50"
                  alt={data.no_transaksi}
                />
              ) : 
              (" ")
            }
            
          </CCol>
          <CCol lg="4" sm="5" className="ml-auto">
            <table className="table table-clear">
              <tbody>
                <tr>
                  <td className="left"><strong>Subtotal</strong></td>
                  <td className="right">Rp. {parseInt((hargaCabai.harga_jual * data.volume) + (hargaPeckaging.harga * data.volume)).toLocaleString('en')}</td>
                </tr>
                {/* <tr>
                  <td className="left"><strong>Discount (0%)</strong></td>
                  <td className="right">Rp. -0</td>
                </tr> */}
                <tr>
                  <td className="left"><strong>Supply / Demand {supplyDemand === 1 ? '(20%)' : '(0%)'} </strong></td>
                  <td className="right">
                    {supplyDemand === 1 ?
                      (
                        <>
                        {`Rp. ${parseInt(((hargaCabai.harga_jual * data.volume) + (hargaPeckaging.harga * data.volume)) * 20 / 100).toLocaleString('en')}`}
                        </>
                      ) :
                      (
                        <>
                          Rp. -0
                        </>
                      )
                    }
                  </td>
                </tr>
                <tr>
                  <td className="left"><strong>Total</strong></td>
                  <td className="right"><strong>Rp. {parseInt(data.harga).toLocaleString('en')},00</strong></td>
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

export default InvoiceRequest
