// SPDX-License-Identifier: MIT
pragma solidity ^0.6.4;
pragma experimental ABIEncoderV2;

contract AddTransaksiRequest {

    mapping (string => TambahTransaksiRequest) transaksi;
    mapping (string => TambahTransaksiRequest) private transaksiMappingId;
    mapping (string => TambahTransaksiRequest[]) private transaksiMappingNomorTransaksi;
    mapping (string => TambahTransaksiRequest[]) private transaksiMappingGapoktan;
    mapping (string => TambahTransaksiRequest[]) private transaksiMappingPembeli;
    mapping (string => TambahTransaksiRequest[]) private transaksiMappingEmailPembeli;

    struct TambahTransaksiRequest {
        address walletAddress;
        string transaksiId;
        string noTransaksi;
        string gapoktan;
        string namaPembeli;
        string emailPembeli;
        Json json;
        string created;
        bool init;
    }

    struct Json {
        string json;
    }

    TambahTransaksiRequest[] public arr;

    function StoreTambahTransaksiRequest(string memory transaksiId, string memory noTransaksi, string memory gapoktan, string memory namaPembeli, string memory emailPembeli, string memory json, string memory created) public {
        TambahTransaksiRequest memory _transaksi = TambahTransaksiRequest(msg.sender, transaksiId, noTransaksi, gapoktan, namaPembeli, emailPembeli, Json(json), created, true);
        transaksiMappingId[_transaksi.transaksiId] = _transaksi;
        transaksiMappingNomorTransaksi[noTransaksi].push(_transaksi);
        transaksiMappingGapoktan[gapoktan].push(_transaksi);
        transaksiMappingPembeli[namaPembeli].push(_transaksi);
        transaksiMappingEmailPembeli[emailPembeli].push(_transaksi);
        arr.push(_transaksi);
    }

    function getAllTransaksi() public view returns (TambahTransaksiRequest[] memory) {
        return arr;
    }

    function getDataByTransaksiId(string memory transaksiId) public view returns (TambahTransaksiRequest memory)  {
        return (transaksiMappingId[transaksiId]);
    }

    function getDataByGapoktan(string memory gapoktan) public view returns (TambahTransaksiRequest[] memory)  {
        return transaksiMappingGapoktan[gapoktan];
    }

    function getDataByNomorTransaksi(string memory noTransaksi) public view returns (TambahTransaksiRequest[] memory)  {
        return transaksiMappingNomorTransaksi[noTransaksi];
    }

    function getDataByNamaPembeli(string memory namaPembeli) public view returns (TambahTransaksiRequest[] memory)  {
        return transaksiMappingPembeli[namaPembeli];
    }

    function getDataByEmailPembeli(string memory emailPembeli) public view returns (TambahTransaksiRequest[] memory)  {
        return transaksiMappingEmailPembeli[emailPembeli];
    }

} 
