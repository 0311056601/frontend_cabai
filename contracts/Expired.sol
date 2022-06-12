// SPDX-License-Identifier: MIT
pragma solidity ^0.6.4;
pragma experimental ABIEncoderV2;

contract AddExpired {

    mapping (string => Expired) expired;
    mapping (string => Expired) private expiredMappingId;
    mapping (string => Expired) private expiredMappingGapoktanId;
    mapping (string => Expired[]) private expiredMappingGapoktanName;
    mapping (string => Expired[]) private expiredMappingTotalVolume;
    mapping (string => Expired[]) private expiredMappingCatatan;

    struct Expired {

        address walletAddress;
        string expiredId;
        string gapoktanId;
        string gapoktan;
        string totalVolume;
        string catatan;
        Json json;
        string created;
        bool init;

    }

    struct Json {
        string json;
    }

    Expired[] public arr;

    function StoreTambahExpired(string memory expiredId, string memory gapoktanId, string memory gapoktan, string memory totalVolume, string memory catatan, string memory json, string memory created) public {
        Expired memory _expired = Expired(msg.sender, expiredId, gapoktanId, gapoktan, totalVolume, catatan, Json(json), created, true);
        expiredMappingId[_expired.expiredId] = _expired;
        expiredMappingGapoktanId[_expired.gapoktanId] = _expired;
        expiredMappingGapoktanName[gapoktan].push(_expired);
        expiredMappingTotalVolume[totalVolume].push(_expired);
        expiredMappingCatatan[catatan].push(_expired);
        arr.push(_expired);
    }

    function getAllExpired() public view returns (Expired[] memory) {
        return arr;
    }

    function getDataByExpiredId(string memory expiredId) public view returns (Expired memory)  {
        return (expiredMappingId[expiredId]);
    }

    function getDataByGapoktanId(string memory gapoktanId) public view returns (Expired memory)  {
        return (expiredMappingGapoktanId[gapoktanId]);
    }

    function getDataByGapoktanName(string memory gapoktan) public view returns (Expired[] memory)  {
        return expiredMappingGapoktanName[gapoktan];
    }

    function getDataByTotalVolume(string memory totalVolume) public view returns (Expired[] memory)  {
        return expiredMappingTotalVolume[totalVolume];
    }

    function getDataByCatatan(string memory catatan) public view returns (Expired[] memory)  {
        return expiredMappingCatatan[catatan];
    }

} 
