import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from './helpers/history';
import "./scss/style.scss";
// halaman
import Header from "./components/header/Header";
import HalamanUtama from "./components/view/HalamanUtama";
import Login from "./components/login";
import Register from "./components/Register";
import DaftarGapoktan from "./components/DaftarGapoktan";
import RequestData from "./components/MintaData/RequestData";

// akses user login
import NotifikasiAll from "./components/header/NotifikasiAll";
import NotifikasiDetail from "./components/header/NotifikasiDetail";
// end akses user login

// akses petani
// import DashboardPetani from "./components/Petani/Dashboard/DashboardPetani";
import ProfilePetani from "./components/Petani/Profile/ProfilePetani";
import ListLahan from "./components/Petani/Lahan/ListLahan";
import PreviewLahan from "./components/Petani/Lahan/PreviewLahan";
import AddLahan from "./components/Petani/Lahan/AddLahan";
import EditLahan from "./components/Petani/Lahan/EditLahan";
import ProdukPetani from "./components/Petani/Produk/ProdukPetani";
import AddProdukCabai from "./components/Petani/Produk/AddProdukCabai";
import TracePanen from "./components/Petani/Produk/TracePanen";
// end akses petani

// akses gapoktan
// import DashboardGapoktan from "./components/Gapoktan/Dashboard/DashboardGapoktan";
import DaftarAkunPetani from "./components/Gapoktan/Petani/DaftarAkunPetani";
import ListPetani from "./components/Gapoktan/Petani/ListPetani";
import ListHargaPengemasan from "./components/Gapoktan/Master/ListHargaPengemasan";
import ListHargaCabaiPetani from "./components/Gapoktan/Master/ListHargaCabaiPetani";
import AddHargaPengemasan from "./components/Gapoktan/Master/AddHargaPengemasan";
import AddHargaCabaiPetani from "./components/Gapoktan/Master/AddHargaCabaiPetani";
import ProfileGapoktan from "./components/Gapoktan/Profile/ProfileGapoktan";
import ListProdukPetani from "./components/Gapoktan/Produk/Petani/ListProdukPetani";
import GudangGapoktan from "./components/Gapoktan/Gudang/Gudang";
import ProdukPackaging from "./components/Gapoktan/Produk/Gapoktan/ProdukPackaging";
import TimbangProdukPetani from "./components/Gapoktan/Produk/Gapoktan/TimbangProdukPetani";
import AddProdukSiapJual from "./components/Gapoktan/Produk/Gapoktan/AddProdukSiapJual";
import LogBlockchain from "./components/Gapoktan/Logs/HistoryBlockchain";
import ListTransaksi from "./components/Gapoktan/Transaksi/ListTransaksi";
import ListTransaksiHistory from "./components/Gapoktan/Transaksi/ListTransaksiHistory";
import ListTransaksiPermintaan from "./components/Gapoktan/Transaksi/ListTransaksiPermintaan";
import GapoktanMintaData from "./components/Gapoktan/MintaData/GapoktanMintaData";
import ListLamaPenyimpanan from "./components/Gapoktan/Master/ListLamaPenyimpanan";
import GudangExpired from "./components/Gapoktan/Gudang/GudangExpired";
import AddExpired from "./components/Gapoktan/Master/AddExpired";
import MinimalPembelian from "./components/Gapoktan/Master/MinimalPembelian";
// end halaman

// akses konsumen
import ProfileKonsumen from "./components/Konsumen/Profile/ProfileKonsumen";
import ProfileKonsumenEdit from "./components/Konsumen/Profile/ProfileKonsumenEdit";
import Transaksi from "./components/Market/Transaksi";
import TransaksiDetail from "./components/Market/TransaksiDetail";
import ListTransaksiHistoryKonsumen from "./components/Konsumen/Transaksi/ListTransaksiHistoryKonsumen";
import KonsumenLacakTransaksi from "./components/Konsumen/Transaksi/KonsumenLacakTransaksi";
import ListRequest from "./components/Konsumen/Pemesanan/ListRequest";
import AddRequest from "./components/Konsumen/Pemesanan/AddRequest";
import EditRequest from "./components/Konsumen/Pemesanan/EditRequest";
import TransaksiDetailRequest from "./components/Market/TransaksiDetailRequest";
// end akses konsumen

// external
import Market from "./components/Market/Market";
import BeliProdukMarket from "./components/Market/BeliProdukMarket";
import Keranjang from "./components/Market/Keranjang";
import LacakProduk from "./components/Market/LacakProduk";
import LacakProdukDetail from "./components/Market/LacakProdukDetail";
// end external

// halaman qrcode
import GetQRProduk from "./components/QR/getQRProduk";
import GetQRExpired from "./components/QR/GetQRExpired";
import GetQRTransaksi from "./components/QR/GetQRTransaksi";
import GetQRTransaksiRequest from "./components/QR/GetQRTransaksiRequest";
// end halamana qrcode

// halaman lain
import DetailSaldo from "./components/Detail/DetailSaldo";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;
    // console.log(user);

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { currentUser } = this.state;
    const { isLoggedIn } = this.props;

    if (!isLoggedIn) {
      // history.push("/Market");
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      if(user !== null) {
        const exampleJWT = user.token;
        function getPayload(jwt){
          return atob(jwt.split(".")[1])
        }
        const payload = getPayload(exampleJWT);
        if (payload.exp < Date.now() / 1000) {
          localStorage.removeItem("user");
          history.push("/login");
        }
      }
    }

    return (
      <Router history={history}>
        <Suspense fallback={<div>Loading...</div>}>

          {(() => {
            if (currentUser ) {
              return (
                <div>
                  <Header logoutClick={this.logOut} userRole={this.props.user.user.role} userName={this.props.user.user.username} userDetail={this.state.currentUser} />
                </div>
              )
            } else {
              return (
                <div>
                  <Header />
                </div>
              )
            }
          })()}

          {(() => {
            if (this.props.user && this.props.user.user.role ) {
              return(
                <Route path="/Dashboard" exact component={() => <HalamanUtama userRole={this.props.user.user.role} />} />
              )
            } else {
              return (
                <Route path="/Dashboard" exact component={() => <HalamanUtama />} />
              )
            }
          })()}

          <Route path="/" exact component={Market} />

          <Route path="/login" exact component={Login} />
          <Route path="/Daftar" exact component={Register} />
          <Route path="/DaftarGapoktan" exact component={DaftarGapoktan} />
          <Route path="/Market" exact component={Market} />
          <Route path="/SemuaPemberitahuan" exact component={NotifikasiAll} />
          <Route path="/Pemberitahuan/:notifId" exact component={NotifikasiDetail} />
          <Route path="/RequestData" exact component={RequestData} />
          <Route path="/DetailSaldo" exact component={DetailSaldo} />

          {/* login petani */}
          {/* <Route path="/DashboardPetani" exact component={DashboardPetani} /> */}
          <Route path="/ProfilePetani" exact component={ProfilePetani} />
          <Route path="/ListLahan" exact component={ListLahan} />
          <Route path="/PreviewLahan/:lahanId" exact component={PreviewLahan} />
          <Route path="/AddLahan" exact component={AddLahan} />
          <Route path="/EditLahan/:lahanId" exact component={EditLahan} />
          <Route path="/ProdukPetani" exact component={ProdukPetani} />
          <Route path="/AddProdukCabai" exact component={AddProdukCabai} />
          <Route path="/TracePanen/:ProdukPetaniId" exact component={TracePanen} />
          {/* end login petani */}

          {/* login gapoktan */}
          {/* <Route path="/DashboardGapoktan" exact component={DashboardGapoktan} /> */}
          <Route path="/ListPetani" exact component={ListPetani} />
          <Route path="/ProfileGapoktan" exact component={ProfileGapoktan} />
          <Route path="/ListHargaPengemasan" exact component={ListHargaPengemasan} />
          <Route path="/ListHargaCabaiPetani" exact component={ListHargaCabaiPetani} />
          <Route path="/AddHargaPengemasan" exact component={AddHargaPengemasan} />
          <Route path="/AddHargaCabaiPetani" exact component={AddHargaCabaiPetani} />
          <Route path="/DaftarAkunPetani" exact component={DaftarAkunPetani} />
          <Route path="/ListProdukPetani" exact component={ListProdukPetani} />
          <Route path="/Gudang" exact component={GudangGapoktan} />
          <Route path="/ProdukPackaging" exact component={ProdukPackaging} />
          <Route path="/TimbangProdukPetani/:produkId" exact component={TimbangProdukPetani} />
          <Route path="/AddProdukSiapJual" exact component={AddProdukSiapJual} />
          <Route path="/historyBlockchain" exact component={LogBlockchain} />
          <Route path="/Transaksi/Konfirmasi" exact component={ListTransaksi} />
          <Route path="/Transaksi/History" exact component={ListTransaksiHistory} />
          <Route path="/Transaksi/Permintaan" exact component={ListTransaksiPermintaan} />
          <Route path="/Gapoktan/MintaData" exact component={GapoktanMintaData} />
          <Route path="/ListLamaPenyimpanan" exact component={ListLamaPenyimpanan} />
          <Route path="/GudangExpired" exact component={GudangExpired} />
          <Route path="/AddExpired" exact component={AddExpired} />
          <Route path="/MinimalPembelian" exact component={MinimalPembelian} />
          {/* end login gapoktan */}

          {/* login konsumen */}
          <Route path="/ProfilKonsumen" exact component={ProfileKonsumen} />
          <Route path="/ProfilKonsumen/Edit" exact component={ProfileKonsumenEdit} />
          <Route path="/Transaksi/Pembayaran" exact component={Transaksi} />
          <Route path="/Transaksi/detail/:transaksiId" exact component={TransaksiDetail} />
          <Route path="/Transaksi/Konsumen/" exact component={ListTransaksiHistoryKonsumen} />
          <Route path="/Transaksi/Konsumen/Lacak/Transaksi/:noTx" exact component={KonsumenLacakTransaksi} />
          <Route path="/Request/List" exact component={ListRequest} />
          <Route path="/Request/Add" exact component={AddRequest} />
          <Route path="/Request/Edit/:reqId" exact component={EditRequest} />
          <Route path="/Transaksi/detail/request/:transaksiId" exact component={TransaksiDetailRequest} />
          {/* end login konsumen */}

          {/* eksternal */}
          {(() => {
            if (this.props.user && this.props.user.user.role ) {
              return(
                <Route path="/Market/DetailProduk/:id" exact component={() => <BeliProdukMarket dataUser={this.props.user} userRole={this.props.user.user.role} />} />
              )
            } else {
              return (
                <Route path="/Market/DetailProduk/:id" exact component={() => <BeliProdukMarket />} />
              )
            }
          })()}

            <Route path="/Keranjang" exact component={Keranjang} />
            <Route path="/LacakProduk" exact component={LacakProduk} />
            <Route path="/LacakProduk/:noTx" exact component={LacakProdukDetail} />
          {/* end eksternal */}

          {/* QR Code */}
          <Route path="/QRProduk/:id" exact component={GetQRProduk} />
          <Route path="/QRTransaksi/:noTx" exact component={GetQRTransaksi} />
          <Route path="/QRProcessGudang/:expiredId" exact component={GetQRExpired} />
          <Route path="/QRTransaksi/request/:noTx" exact component={GetQRTransaksiRequest} />
          {/* <Route path="/QRTransaksi/:code/:id" exact component={getQRTransaksi} /> */}

        </Suspense>

      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const { isLoggedIn } = state.auth;
  return {
    user,
    isLoggedIn
  };
}

export default connect(mapStateToProps)(App);