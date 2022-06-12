// SPDX-License-Identifier: MIT
pragma solidity ^0.6.4;
pragma experimental ABIEncoderV2;

contract AddProduk {

    mapping (string => TambahProduk) produk;
    mapping (string => TambahProduk) private farmerMappingId;
    mapping (string => TambahProduk[]) private farmerMappingNama;

    struct TambahProduk {
        address walletAddress;
        string produkid;
        string nama;
        Json json;
        string created;
        bool init;
    }

    struct Json {
        string json;
    }

    TambahProduk[] public arr;

    function getAllProduk() public view returns (TambahProduk[] memory) {
        return arr;
    }

    function StoreTambahProduk(string memory produkid, string memory nama, string memory json, string memory created) public {
        TambahProduk memory _farmer = TambahProduk(msg.sender, produkid, nama, Json(json), created, true);
        farmerMappingId[_farmer.produkid] = _farmer;
        farmerMappingNama[nama].push(_farmer);
        arr.push(_farmer);
    }

    function getDataById(string memory produkid) public view returns (TambahProduk memory)  {
        return (farmerMappingId[produkid]);
    }

    function getDataByNama(string memory nama) public view returns (TambahProduk[] memory)  {
        return farmerMappingNama[nama];
    }

} 
