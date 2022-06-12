export const AddTransaksiRequest = [
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
          "name": "transaksiId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "noTransaksi",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "gapoktan",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "namaPembeli",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "emailPembeli",
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
          "internalType": "struct AddTransaksiRequest.Json",
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
          "name": "transaksiId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "noTransaksi",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "gapoktan",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "namaPembeli",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "emailPembeli",
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
      "name": "StoreTambahTransaksiRequest",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllTransaksi",
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
              "name": "transaksiId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "noTransaksi",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "gapoktan",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "namaPembeli",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "emailPembeli",
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
              "internalType": "struct AddTransaksiRequest.Json",
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
          "internalType": "struct AddTransaksiRequest.TambahTransaksiRequest[]",
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
          "name": "transaksiId",
          "type": "string"
        }
      ],
      "name": "getDataByTransaksiId",
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
              "name": "transaksiId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "noTransaksi",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "gapoktan",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "namaPembeli",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "emailPembeli",
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
              "internalType": "struct AddTransaksiRequest.Json",
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
          "internalType": "struct AddTransaksiRequest.TambahTransaksiRequest",
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
      "name": "getDataByGapoktan",
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
              "name": "transaksiId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "noTransaksi",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "gapoktan",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "namaPembeli",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "emailPembeli",
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
              "internalType": "struct AddTransaksiRequest.Json",
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
          "internalType": "struct AddTransaksiRequest.TambahTransaksiRequest[]",
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
          "name": "noTransaksi",
          "type": "string"
        }
      ],
      "name": "getDataByNomorTransaksi",
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
              "name": "transaksiId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "noTransaksi",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "gapoktan",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "namaPembeli",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "emailPembeli",
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
              "internalType": "struct AddTransaksiRequest.Json",
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
          "internalType": "struct AddTransaksiRequest.TambahTransaksiRequest[]",
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
          "name": "namaPembeli",
          "type": "string"
        }
      ],
      "name": "getDataByNamaPembeli",
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
              "name": "transaksiId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "noTransaksi",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "gapoktan",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "namaPembeli",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "emailPembeli",
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
              "internalType": "struct AddTransaksiRequest.Json",
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
          "internalType": "struct AddTransaksiRequest.TambahTransaksiRequest[]",
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
          "name": "emailPembeli",
          "type": "string"
        }
      ],
      "name": "getDataByEmailPembeli",
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
              "name": "transaksiId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "noTransaksi",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "gapoktan",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "namaPembeli",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "emailPembeli",
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
              "internalType": "struct AddTransaksiRequest.Json",
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
          "internalType": "struct AddTransaksiRequest.TambahTransaksiRequest[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]