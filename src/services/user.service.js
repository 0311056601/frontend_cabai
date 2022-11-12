import axios from "axios";
import authHeader from "./auth-header";
import authHeaderImage from "./auth-header-image";

require("dotenv").config();

const API_URL = process.env.REACT_APP_BACKEND_URL + "api/v2/";

class UserService {
    // getAllUserWithRole
    // api get
    getAllUserWithRole() {
        return axios.get(API_URL + "get-all-user", { headers: authHeader() });
    }

    changeStatusPetani(userId) {
        return axios.get(API_URL + "change-status-petani/" + userId, { headers: authHeader() });
    }

    getDetailUser() {
        return axios.get(API_URL + "detail-user", { headers: authHeader() });
    }

    ListLahan() {
        return axios.get(API_URL + "listLahan", { headers: authHeader() });
    }

    DetailLahan(lahanId) {
        return axios.get(API_URL + "DetailLahan/"+ lahanId, { headers: authHeader() });
    }

    HapusLahan(lahanId) {
        return axios.get(API_URL + "HapusLahan/"+ lahanId, { headers: authHeader() });
    }

    listProdukPetani() {
        return axios.get(API_URL + "listProdukPetani", { headers: authHeader() });
    }

    petaniKirimProduk(produkId) {
        return axios.get(API_URL + "petani-kirim-produk/"+ produkId, { headers: authHeader() });
    }

    gapoktanGetProduk() {
        return axios.get(API_URL + "gapoktan-get-produk", { headers: authHeader() });
    }

    gapoktanGetDataGudang() {
        return axios.get(API_URL + "gapoktan-get-data-gudang", { headers: authHeader() });
    }

    gapoktanKonfirmasiProduk(produkId) {
        return axios.get(API_URL + "gapoktan-konrimasi-produk/"+ produkId, { headers: authHeader() });
    }

    HapusProduk(produkId) {
        return axios.get(API_URL + "petani-hapus-produk/"+ produkId, { headers: authHeader() });
    }

    detailProdukPetani(produkId) {
        return axios.get(API_URL + "detailProdukPetani/"+ produkId, { headers: authHeader() });
    }

    getDataForProdukSiapJual() {
        return axios.get(API_URL + "getDataForProdukSiapJual", { headers: authHeader() });
    }

    onChangePetani(data) {
        return axios.get(API_URL + "onChangeSelect/"+data, { headers: authHeader() });
    }

    onChangeTanggal(petani, tanggal) {
        return axios.get(API_URL + "onChangeTanggal/"+petani+'/'+tanggal, { headers: authHeader() });
    }

    onChangeKualitas(petani, tanggalPanen, kualitas) {
        return axios.get(API_URL + "onChangeKualitas/"+petani+'/'+tanggalPanen+"/"+kualitas, { headers: authHeader() });
    }

    gapoktanGetProdukSiapJual() {
        return axios.get(API_URL + "gapoktan-get-produk-siap-jual", { headers: authHeader() });
    }

    getProdukSiapJual(produkId) {
        return axios.get(API_URL + "get-produk-siap-jual/"+produkId, { headers: authHeader() });
    }

    ErrorTransactionProduk(produkId) {
        return axios.get(API_URL + "error-transaction-produk-blockchain/" + produkId, {
            headers: authHeader(),
        });
    }

    ErrorTransactionTransaksi(transaksiId) {
        return axios.get(API_URL + "error-transaction-transaksi-blockchain/" + transaksiId, {
            headers: authHeader(),
        });
    }

    ErrorTransactionRequest(transaksiId) {
        return axios.get(API_URL + "error-transaction-request-blockchain/" + transaksiId, {
            headers: authHeader(),
        });
    }

    getTransaksiBlockchain() {
        return axios.get(API_URL + "transaction-blockchain-log", {
            headers: authHeader(),
        });
    }

    getMarketGapoktan() {
        return axios.get(API_URL + "get-market-data", {
            headers: authHeader(),
        });
    }

    getMarketProduk(gapoktanId) {
        return axios.get(API_URL + "get-market-produk/"+ gapoktanId, {
            headers: authHeader(),
        });
    }

    DeleteMHargaPengemasan(id) {
        return axios.get(API_URL + "DeleteMHargaPengemasan/"+ id, {
            headers: authHeader(),
        });
    }

    ChangeStatusMHargaPengemasan(id) {
        return axios.get(API_URL + "ChangeStatusMHargaPengemasan/"+ id, {
            headers: authHeader(),
        });
    }

    getKeranjang() {
        return axios.get(API_URL + "getKeranjang", {
            headers: authHeader(),
        });
    }

    getTransaksi() {
        return axios.get(API_URL + "getTransaksi", {
            headers: authHeader(),
        });
    }

    getTransaksiDetail(transaksiId) {
        return axios.get(API_URL + "getTransaksiDetail/"+ transaksiId, {
            headers: authHeader(),
        });
    }

    updateTransaksiBayar(transaksiId) {
        return axios.get(API_URL + "updateTransaksiBayar/"+ transaksiId, {
            headers: authHeader(),
        });
    }

    ListTransaksi() {
        return axios.get(API_URL + "ListTransaksi", {
            headers: authHeader(),
        });
    }

    getNotif() {
        return axios.get(API_URL + "getNotif", {
            headers: authHeader(),
        });
    }

    getTransaksiQR(noTx) {
        return axios.get(API_URL + "getTransaksiQR/"+ noTx, {
            headers: authHeader(),
        });
    }

    ListTransaksiHistory() {
        return axios.get(API_URL + "ListTransaksiHistory", {
            headers: authHeader(),
        });
    }

    UpdateKirimProduk(transaksiId, estimasi) {
        return axios.get(API_URL + "UpdateKirimProduk/"+ transaksiId +'/'+estimasi, {
            headers: authHeader(),
        });
    }

    ListTransaksiHistoryKonsumen() {
        return axios.get(API_URL + "ListTransaksiHistoryKonsumen", {
            headers: authHeader(),
        });
    }

    KonfirmasiBarang(transaksiId) {
        return axios.get(API_URL + "KonfirmasiBarang/"+ transaksiId, {
            headers: authHeader(),
        });
    }

    getDetailTransaksi(noTx) {
        return axios.get(API_URL + "getDetailTransaksi/"+ noTx, {
            headers: authHeader(),
        });
    }

    GetInvoice(noTx) {
        return axios.get(API_URL + "GetInvoice/"+ noTx, {
            headers: authHeader(),
        });
    }

    ListNotifikasi() {
        return axios.get(API_URL + "ListNotifikasi", {
            headers: authHeader(),
        });
    }

    NotifikasiDetail(notifId) {
        return axios.get(API_URL + "NotifikasiDetail/"+notifId, {
            headers: authHeader(),
        });
    }

    HapusNotif(notifId) {
        return axios.get(API_URL + "HapusNotif/"+notifId, {
            headers: authHeader(),
        });
    }

    ListRequest() {
        return axios.get(API_URL + "ListRequest", {
            headers: authHeader(),
        });
    }

    getMasterHargaCabaiPetani() {
        return axios.get(API_URL + "getMasterHargaCabaiPetani", {
            headers: authHeader(),
        });
    }

    getMasterHargaPengemasan() {
        return axios.get(API_URL + "getMasterHargaPengemasan", {
            headers: authHeader(),
        });
    }

    ChangeStatusMHargaCabaiPetani(id) {
        return axios.get(API_URL + "ChangeStatusMHargaCabaiPetani/"+ id, {
            headers: authHeader(),
        });
    }

    DeleteMHargaCabaiPetani(id) {
        return axios.get(API_URL + "DeleteMHargaCabaiPetani/"+ id, {
            headers: authHeader(),
        });
    }

    HapusProdukSiapJual(id) {
        return axios.get(API_URL + "HapusProdukSiapJual/"+ id, {
            headers: authHeader(),
        });
    }

    getGapoktanList() {
        return axios.get(API_URL + "getGapoktanList", {
            headers: authHeader(),
        });
    }

    getGapoktanHarga(gapoktanId) {
        return axios.get(API_URL + "getGapoktanHarga/"+ gapoktanId, {
            headers: authHeader(),
        });
    }

    deleteRequestcabai(requestId) {
        return axios.get(API_URL + "deleteRequestcabai/"+ requestId, {
            headers: authHeader(),
        });
    }

    KirimRequestProduk(requestId) {
        return axios.get(API_URL + "KirimRequestProduk/"+ requestId, {
            headers: authHeader(),
        });
    }

    ListTransaksiPermintaan() {
        return axios.get(API_URL + "ListTransaksiPermintaan", {
            headers: authHeader(),
        });
    }

    updateTransaksiRequest(requestId, estimasi) {
        return axios.get(API_URL + "updateTransaksiRequest/"+requestId+'/'+ estimasi, {
            headers: authHeader(),
        });
    }

    konsumenBayarPemesanan(noTx) {
        return axios.get(API_URL + "konsumenBayarPemesanan/"+noTx, {
            headers: authHeader(),
        });
    }

    getTransaksiDetailRequest(transaksiId) {
        return axios.get(API_URL + "getTransaksiDetailRequest/"+transaksiId, {
            headers: authHeader(),
        });
    }

    GetInvoiceRequest(noTx) {
        return axios.get(API_URL + "GetInvoice/request/"+ noTx, {
            headers: authHeader(),
        });
    }

    konsumenTerimaProdukRequest(noTx) {
        return axios.get(API_URL + "konsumenTerimaProdukRequest/"+ noTx, {
            headers: authHeader(),
        });
    }

    getTransaksiRequestQR(noTx) {
        return axios.get(API_URL + "getTransaksiQR/request/"+ noTx, {
            headers: authHeader(),
        });
    }

    getDashboardGapoktan() {
        return axios.get(API_URL + "getDashboardGapoktan", {
            headers: authHeader(),
        });
    }

    getDashboardSummary() {
        return axios.get(API_URL + "getDashboardSummaryGapoktan", {
            headers: authHeader(),
        });
    }

    getDashboardPetani() {
        return axios.get(API_URL + "getDashboardPetani", {
            headers: authHeader(),
        });
    }

    indexRequestData() {
        return axios.get(API_URL + "indexRequestData", {
            headers: authHeader(),
        });
    }

    getRD(address) {
        return axios.get(API_URL + "getRD/"+ address, {
            headers: authHeader(),
        });
    }

    getAdminLRD() {
        return axios.get(API_URL + "list-request-data", { 
            headers: authHeader() 
        });
    }

    getMasterExpired() {
        return axios.get(API_URL + "getMasterExpired", { 
            headers: authHeader() 
        });
    }

    ChangeStatusMExpired(expiredId) {
        return axios.get(API_URL + "ChangeStatusMExpired/"+ expiredId, { 
            headers: authHeader() 
        });
    }

    DeleteMExpired(expiredId) {
        return axios.get(API_URL + "DeleteMExpired/"+ expiredId, { 
            headers: authHeader() 
        });
    }

    getListExpired() {
        return axios.get(API_URL + "getListExpired", { 
            headers: authHeader() 
        });
    }

    ErrorTransactionExpired(expiredId) {
        return axios.get(API_URL + "ErrorTransactionExpired/"+ expiredId, { 
            headers: authHeader() 
        });
    }

    HapusDataExpired(expiredId) {
        return axios.get(API_URL + "hapus-data-expired/"+ expiredId, { 
            headers: authHeader() 
        });
    }

    getExpiredQR(expiredId) {
        return axios.get(API_URL + "getExpiredQR/"+ expiredId, { 
            headers: authHeader() 
        });
    }

    getMasterBank() {
        return axios.get(API_URL + "getMasterBank", { 
            headers: authHeader() 
        });
    }

    getDataMinimal() {
        return axios.get(API_URL + "getDataMinimal", { 
            headers: authHeader() 
        });
    }

    detailSaldo() {
        return axios.get(API_URL + "detailSaldo", { 
            headers: authHeader() 
        });
    }

    getDashboardPetaniHome() {
        return axios.get(API_URL + "getDashboardPetaniHome", { 
            headers: authHeader() 
        });
    }

    getTracePanen(produkPanenId) {
        return axios.get(API_URL + "getTracePanen/"+produkPanenId, { 
            headers: authHeader() 
        });
    }

    getDashboardLogin() {
        return axios.get(API_URL + "getDashboardLogin", { 
            headers: authHeader() 
        });
    }

    // api post 
    daftarAkunPetani(raw) {
        return axios.post(API_URL + "daftar-akun-petani", raw, {
            headers: authHeader(),
        });
    }

    UpdateLahan(lahanId, raw) {
        return axios.post(API_URL + "updateLahan/"+lahanId, raw, {
            headers: authHeader(),
        });
    }

    SimpanHasilTimbang(raw) {
        return axios.post(API_URL + "simpanHasilTimbang", raw, {
            headers: authHeader(),
        });
    }

    addTransactionHash(raw) {
        return axios.post(API_URL + "add-transaction-hash", raw, {
            headers: authHeader(),
        });
    }

    AddMHargaPengemasan(raw) {
        return axios.post(API_URL + "AddMHargaPengemasan", raw, {
            headers: authHeader(),
        });
    }

    AddMHargaCabaiPetani(raw) {
        return axios.post(API_URL + "AddMHargaCabaiPetani", raw, {
            headers: authHeader(),
        });
    }

    postKeranjang(raw) {
        return axios.post(API_URL + "postKeranjang", raw, {
            headers: authHeader(),
        });
    }

    checkOutProduk(raw) {
        return axios.post(API_URL + "checkOutProduk", raw, {
            headers: authHeader(),
        });
    }

    SimpanRequestCabai(raw) {
        return axios.post(API_URL + "SimpanRequestCabai", raw, {
            headers: authHeader(),
        });
    }

    DaftarGapoktan(raw) {
        return axios.post(API_URL + "DaftarGapoktan", raw, {
            headers: authHeader(),
        });
    }

    RequestData(raw) {
        return axios.post(API_URL + "RequestData", raw, {
            headers: authHeader(),
        });
    }

    ApproveRequestData(raw) {
        return axios.post(API_URL + "ApproveRequestData", raw, { 
            headers: authHeader() 
        });
    }

    addLogRequestData(raw) {
        return axios.post(API_URL + "addLogRequestData", raw, { 
            headers: authHeader() 
        });
    }

    addMExpired(raw) {
        return axios.post(API_URL + "addMExpired", raw, { 
            headers: authHeader() 
        });
    }

    gudangProcess(raw) {
        return axios.post(API_URL + "gudangProcess", raw, { 
            headers: authHeader() 
        });
    }

    addMinimalPembelian(raw) {
        return axios.post(API_URL + "addMinimalPembelian", raw, { 
            headers: authHeader()
        });
    }


    
    // api post with image
    insertProfile(raw) {
        return axios.post(API_URL + "insert-profile", raw, {
            headers: authHeaderImage(),
        });
    }

    SimpanLahan(raw) {
        return axios.post(API_URL + "simpanLahan", raw, {
            headers: authHeaderImage(),
        });
    }

    SimpanProdukPetani(raw) {
        return axios.post(API_URL + "simpan-produk-petani", raw, {
            headers: authHeaderImage(),
        });
    }

    SimpanProdukSiapJual(raw) {
        return axios.post(API_URL + "postProdukSiapJual", raw, {
            headers: authHeaderImage(),
        });
    }

    pushQRCodeImageProdukSiapJual(produkId, raw) {
        return axios.post(API_URL + "update-qr-produk-siap-jual/"+produkId, raw, { 
            headers: authHeaderImage(),
        });
    }

    pushQRCodeImageTransaksi(transaksiId, raw) {
        return axios.post(API_URL + "update-qr-transaksi/"+transaksiId, raw, { 
            headers: authHeaderImage(),
        });
    }

    pushQRCodeImageTransaksiRequest(transaksiId, raw) {
        return axios.post(API_URL + "update-qr-transaksi/request/"+transaksiId, raw, { 
            headers: authHeaderImage(),
        });
    }

    pushQRCodeImageExpired(expiredId, raw) {
        return axios.post(API_URL + "update-qr-expired/"+expiredId, raw, { 
            headers: authHeaderImage(),
        });
    }

}

export default new UserService();