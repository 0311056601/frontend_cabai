export const AddExpired = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "arr",
      "outputs": [
        {
          "internalType": "address",
          "name": "walletAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "expiredId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "gapoktanId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "gapoktan",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "totalVolume",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "catatan",
          "type": "string"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "json",
              "type": "string"
            }
          ],
          "internalType": "struct AddExpired.Json",
          "name": "json",
          "type": "tuple"
        },
        {
          "internalType": "string",
          "name": "created",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "init",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "expiredId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "gapoktanId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "gapoktan",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "totalVolume",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "catatan",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "json",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "created",
          "type": "string"
        }
      ],
      "name": "StoreTambahExpired",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllExpired",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "walletAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "expiredId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "gapoktanId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "gapoktan",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "totalVolume",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "catatan",
              "type": "string"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "json",
                  "type": "string"
                }
              ],
              "internalType": "struct AddExpired.Json",
              "name": "json",
              "type": "tuple"
            },
            {
              "internalType": "string",
              "name": "created",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "init",
              "type": "bool"
            }
          ],
          "internalType": "struct AddExpired.Expired[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "expiredId",
          "type": "string"
        }
      ],
      "name": "getDataByExpiredId",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "walletAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "expiredId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "gapoktanId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "gapoktan",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "totalVolume",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "catatan",
              "type": "string"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "json",
                  "type": "string"
                }
              ],
              "internalType": "struct AddExpired.Json",
              "name": "json",
              "type": "tuple"
            },
            {
              "internalType": "string",
              "name": "created",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "init",
              "type": "bool"
            }
          ],
          "internalType": "struct AddExpired.Expired",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "gapoktanId",
          "type": "string"
        }
      ],
      "name": "getDataByGapoktanId",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "walletAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "expiredId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "gapoktanId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "gapoktan",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "totalVolume",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "catatan",
              "type": "string"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "json",
                  "type": "string"
                }
              ],
              "internalType": "struct AddExpired.Json",
              "name": "json",
              "type": "tuple"
            },
            {
              "internalType": "string",
              "name": "created",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "init",
              "type": "bool"
            }
          ],
          "internalType": "struct AddExpired.Expired",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "gapoktan",
          "type": "string"
        }
      ],
      "name": "getDataByGapoktanName",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "walletAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "expiredId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "gapoktanId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "gapoktan",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "totalVolume",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "catatan",
              "type": "string"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "json",
                  "type": "string"
                }
              ],
              "internalType": "struct AddExpired.Json",
              "name": "json",
              "type": "tuple"
            },
            {
              "internalType": "string",
              "name": "created",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "init",
              "type": "bool"
            }
          ],
          "internalType": "struct AddExpired.Expired[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "totalVolume",
          "type": "string"
        }
      ],
      "name": "getDataByTotalVolume",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "walletAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "expiredId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "gapoktanId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "gapoktan",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "totalVolume",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "catatan",
              "type": "string"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "json",
                  "type": "string"
                }
              ],
              "internalType": "struct AddExpired.Json",
              "name": "json",
              "type": "tuple"
            },
            {
              "internalType": "string",
              "name": "created",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "init",
              "type": "bool"
            }
          ],
          "internalType": "struct AddExpired.Expired[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "catatan",
          "type": "string"
        }
      ],
      "name": "getDataByCatatan",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "walletAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "expiredId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "gapoktanId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "gapoktan",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "totalVolume",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "catatan",
              "type": "string"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "json",
                  "type": "string"
                }
              ],
              "internalType": "struct AddExpired.Json",
              "name": "json",
              "type": "tuple"
            },
            {
              "internalType": "string",
              "name": "created",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "init",
              "type": "bool"
            }
          ],
          "internalType": "struct AddExpired.Expired[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]