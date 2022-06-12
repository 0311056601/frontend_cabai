// SPDX-License-Identifier: MIT
pragma solidity ^0.6.4;
pragma experimental ABIEncoderV2;

contract AddTransaksi {

    mapping (string => TambahTransaksi) transaksi;
    mapping (string => TambahTransaksi) private transaksiMappingId;
    mapping (string => TambahTransaksi) private transaksiMappingprodukHash;
    mapping (string => TambahTransaksi[]) private transaksiMappingNamaProduk;
    mapping (string => TambahTransaksi[]) private transaksiMappingNomorTransaksi;
    mapping (string => TambahTransaksi[]) private transaksiMappingPembeli;
    mapping (string => TambahTransaksi[]) private transaksiMappingEmailPembeli;

    struct TambahTransaksi {
        address walletAddress;
        string transaksiId;
        string produkHash;
        string namaProduk;
        string noTransaksi;
        string namaPembeli;
        string emailPembeli;
        Json json;
        string created;
        bool init;
    }

    struct Json {
        string json;
    }

    TambahTransaksi[] public arr;

    function StoreTambahTransaksi(string memory transaksiId, string memory produkHash, string memory namaProduk, string memory noTransaksi, string memory namaPembeli, string memory emailPembeli, string memory json, string memory created) public {
        TambahTransaksi memory _transaksi = TambahTransaksi(msg.sender, transaksiId, produkHash, namaProduk, noTransaksi, namaPembeli, emailPembeli, Json(json), created, true);
        transaksiMappingId[_transaksi.transaksiId] = _transaksi;
        transaksiMappingprodukHash[_transaksi.produkHash] = _transaksi;
        transaksiMappingNamaProduk[namaProduk].push(_transaksi);
        transaksiMappingNomorTransaksi[noTransaksi].push(_transaksi);
        transaksiMappingPembeli[namaPembeli].push(_transaksi);
        transaksiMappingEmailPembeli[emailPembeli].push(_transaksi);
        arr.push(_transaksi);
    }

    function getAllTransaksi() public view returns (TambahTransaksi[] memory) {
        return arr;
    }

    function getDataByTransaksiId(string memory transaksiId) public view returns (TambahTransaksi memory)  {
        return (transaksiMappingId[transaksiId]);
    }

    function getDataByProdukHash(string memory produkHash) public view returns (TambahTransaksi memory)  {
        return (transaksiMappingprodukHash[produkHash]);
    }

    function getDataByNamaProduk(string memory namaProduk) public view returns (TambahTransaksi[] memory)  {
        return transaksiMappingNamaProduk[namaProduk];
    }

    function getDataByNomorTransaksi(string memory noTransaksi) public view returns (TambahTransaksi[] memory)  {
        return transaksiMappingNomorTransaksi[noTransaksi];
    }

    function getDataByNamaPembeli(string memory namaPembeli) public view returns (TambahTransaksi[] memory)  {
        return transaksiMappingPembeli[namaPembeli];
    }

    function getDataByEmailPembeli(string memory emailPembeli) public view returns (TambahTransaksi[] memory)  {
        return transaksiMappingEmailPembeli[emailPembeli];
    }

} 
