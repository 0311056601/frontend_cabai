import React, { useState } from "react";
import "./Header.css";
import "./HeaderMedia.css";
import {
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavbar,
  CNavbarNav,
  CToggler,
  CNavLink,
  CDropdown
} from "@coreui/react";
import TheHeaderDropdownNotif from './TheHeaderDropdownNotif';

const Header = props => {
  const [isOpen, setIsOpen] = useState(false);
  const userRole = props.userRole;
  const userName = props.userName;

    return(
        <CNavbar expandable="sm" style={{ backgroundColor: "#7f240e" }}>
        {/* <CNavbar expandable="sm" color="warning"> */}
          <CToggler inNavbar onClick={() => setIsOpen(!isOpen)} />
          <CCollapse show={isOpen} navbar>
          {(() => {
            if(userName && userRole === 'gapoktan') {
              return (
                <CNavbarNav>
                  <CNavLink to="/Dashboard">Dashboard</CNavLink>
                  <CNavLink to="/ProfileGapoktan">Profil</CNavLink>
                  {/* <CDropdown inNav>
                      <CDropdownToggle color="primary">Master</CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem to="/ListHargaPengemasan">Harga Pengemasan</CDropdownItem>
                      </CDropdownMenu>
                  </CDropdown> */}
                  <CDropdown inNav>
                    <CDropdownToggle color="primary">Master</CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem to="/ListHargaPengemasan" > Biaya Pengemasan </CDropdownItem>
                      <CDropdownItem to="/ListHargaCabaiPetani" > Harga Cabai Petani </CDropdownItem>
                      <CDropdownItem to="/ListLamaPenyimpanan" > Lama Penyimpanan Gudang </CDropdownItem>
                      <CDropdownItem to="/MinimalPembelian" > Minimal Pembelian</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                  <CNavLink to="/ListPetani">Petani</CNavLink>
                  <CDropdown inNav>
                      <CDropdownToggle color="primary">Produk</CDropdownToggle>
                      <CDropdownMenu>
                      <CDropdownItem to="/ListProdukPetani">Petani</CDropdownItem>
                      <CDropdownItem to="/ProdukPackaging">Pengemasan</CDropdownItem>
                      </CDropdownMenu>
                  </CDropdown>
                  <CDropdown inNav>
                      <CDropdownToggle color="primary">Transaksi</CDropdownToggle>
                      <CDropdownMenu>
                      <CDropdownItem to="/Transaksi/Konfirmasi">Konfirmasi</CDropdownItem>
                      <CDropdownItem to="/Transaksi/Permintaan">Permintaan</CDropdownItem>
                      <CDropdownItem to="/Transaksi/History">History</CDropdownItem>
                      </CDropdownMenu>
                  </CDropdown>
                  {/* <CNavLink to="/">Gudang</CNavLink> */}
                  <CDropdown inNav>
                    <CDropdownToggle color="primary">Gudang</CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem to="/Gudang" > Gudang Tersedia </CDropdownItem>
                      <CDropdownItem to="/GudangExpired" > Expired </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                  <CNavLink to="/Gapoktan/MintaData">Minta Data</CNavLink>
                  <CNavLink to="/historyBlockchain">Logs</CNavLink>
                  {/* <CNavLink to="/">Cari Transaksi</CNavLink> */}
                </CNavbarNav>
              )
            } else if(userName && userRole === 'petani') {
              return (
                <CNavbarNav>
                  <CNavLink to="/Dashboard">Dashboard</CNavLink>
                  <CNavLink to="/ProfilePetani">Profil</CNavLink>
                  <CNavLink to="/ListLahan">Lahan</CNavLink>
                  <CNavLink to="/ProdukPetani">Produk</CNavLink>
                  {/* <CNavLink to="/">Cari Transaksi</CNavLink> */}
                </CNavbarNav>
              )
            } else if(userName && userRole === 'konsumen') {
              return (
                <CNavbarNav>
                  <CNavLink to="/Dashboard">Dashboard</CNavLink>
                  <CNavLink to="/Market">Market</CNavLink>
                  <CNavLink to="/ProfilKonsumen">Profil</CNavLink>
                  <CDropdown inNav>
                      <CDropdownToggle color="primary">Transaksi</CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem to="/Keranjang" >Keranjang</CDropdownItem>
                        <CDropdownItem to="/Transaksi/Pembayaran">Transaksi</CDropdownItem>
                        <CDropdownItem to="/Transaksi/Konsumen">History</CDropdownItem>
                      </CDropdownMenu>
                  </CDropdown>
                  <CNavLink to="/Request/List">Ajukan Pesanan</CNavLink>
                  {/* <CNavLink to="/">Cari Transaksi</CNavLink> */}
                </CNavbarNav>
              )
            } else {
              return (
                <CNavbarNav>
                  <CNavLink to="/Market">Market</CNavLink>
                  <CNavLink to="/LacakProduk">Lacak Produk</CNavLink>
                  <CNavLink href="/RequestData">Minta Data</CNavLink>
                  {/* <CNavLink to="/">Cari Transaksi</CNavLink> */}
                </CNavbarNav>
              )
            }
          })()}
            
            {(() => {
              if (userName && userRole) {
                return (
                  <CNavbarNav className="ml-auto">
                    <TheHeaderDropdownNotif/>
                    <CDropdown inNav>
                      <CDropdownToggle color="primary">
                        {userName}
                      </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem href="/login" onClick={() => props.logoutClick()}>
                          LogOut
                        </CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  </CNavbarNav>
                )
              } else {
                return (
                  <CNavbarNav className="ml-auto">
                    {/* <CNavLink href="/Login">Login</CNavLink> */}
                    <CDropdown inNav>
                      <CDropdownToggle color="primary">Masuk / Daftar</CDropdownToggle>
                      <CDropdownMenu>
                      {/* <CDropdownItem to="/Login">Masuk</CDropdownItem> */}
                      <CDropdownItem href="/Login">Masuk</CDropdownItem>
                      <CDropdownItem to="/Daftar">Daftar Konsumen</CDropdownItem>
                      <CDropdownItem to="/DaftarGapoktan">Daftar Gapoktan</CDropdownItem>
                      </CDropdownMenu>
                  </CDropdown>
                  </CNavbarNav>
                )
              }
            })()}
          </CCollapse>
        </CNavbar>
    );
}

export default Header;
