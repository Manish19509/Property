window.addEventListener('load', async () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Replace with your contract address and ABI
        const contractAddress = '0x1F15DEFDF07A1c3aB2c6481c7D599837925a72A4';
        const abi = [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    }
                ],
                "name": "PropertyPriceUpdated",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "enum PropertyTrader.PropertyType",
                        "name": "propertyType",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    }
                ],
                "name": "addProperty",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    }
                ],
                "name": "buyProperty",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "name": "properties",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "enum PropertyTrader.PropertyType",
                        "name": "propertyType",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    }
                ],
                "name": "propertyExists",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    }
                ],
                "name": "sellProperty",
                "outputs": [],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    }
                ],
                "name": "updatePropertyPrice",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }


        ];
        const propertyTrader = new web3.eth.Contract(abi, contractAddress);

        // Handle adding a property
        document.getElementById('addPropertyForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const name = document.getElementById('propertyName').value;
            const type = parseInt(document.getElementById('propertyType').value);
            const price = document.getElementById('propertyPrice').value;

            try {
                await propertyTrader.methods.addProperty(name, type, price).send({ from: ethereum.selectedAddress });
                document.getElementById('result').innerText = 'Property added successfully!';
            } catch (error) {
                console.error(error);
                document.getElementById('result').innerText = 'Error adding property.';
            }
        });

        // Handle updating property price
        document.getElementById('updatePriceForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const name = document.getElementById('updatePropertyName').value;
            const price = document.getElementById('updatePropertyPrice').value;

            try {
                await propertyTrader.methods.updatePropertyPrice(name, price).send({ from: ethereum.selectedAddress });
                document.getElementById('result').innerText = 'Property price updated successfully!';
            } catch (error) {
                console.error(error);
                document.getElementById('result').innerText = 'Error updating property price.';
            }
        });

        // Handle buying a property
        document.getElementById('buyPropertyForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const name = document.getElementById('buyPropertyName').value;
            const amount = document.getElementById('buyAmount').value;

            try {
                await propertyTrader.methods.buyProperty(name).send({
                    from: ethereum.selectedAddress,
                    value: amount
                });
                document.getElementById('result').innerText = 'Property bought successfully!';
            } catch (error) {
                console.error(error);
                document.getElementById('result').innerText = 'Error buying property.';
            }
        });

        // Handle selling a property
        document.getElementById('sellPropertyForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const name = document.getElementById('sellPropertyName').value;

            try {
                await propertyTrader.methods.sellProperty(name).send({ from: ethereum.selectedAddress });
                document.getElementById('result').innerText = 'Property sold successfully!';
            } catch (error) {
                console.error(error);
                document.getElementById('result').innerText = 'Error selling property.';
            }
        });
    } else {
        console.log('MetaMask is not installed!');
        document.getElementById('result').innerText = 'Please install MetaMask!';
    }
});
