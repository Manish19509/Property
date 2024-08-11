# PropertyTrader Smart Contract
This is the project consisting of a smart contract in Solidity, called PropertyTrader, and a web-based JavaScript script to complement it using the Web3 library to integrate it with MetaMask. In this smart contract, properties can be added, updated, purchased, and sold. The JavaScript code communicates with the Ethereum blockchain for such actions through a web interface.

## Function
>>addProperty : Function to add a new property (only owner).
>>updatePropertyPrice : Function to update the price of a property (only owner).
>>propertyExists: Function to check if a property exists.
>>buyProperty: Function to simulate buying a property.
>>sellProperty: Function to simulate selling a property (currently a placeholder).


### Description
This is a project consisting of a Solidity smart contract called `PropertyTrader` and a frontend JavaScript application that connects with MetaMask through Web3.js. It provides a smart contract for running property management, through which users can create, update, buy, and sell properties on the Ethereum blockchain. On top of this, the JavaScript code provides user interaction through a web interface, thus having nice integration with MetaMask to perform blockchain transactions.

>> Structs and Mappings:
        1. The property struct stores information about property
        2. A mapping called cryptos links the names to their details.

>> Owner Management:
        1. The owner address is set to the contract deployer and is the only entity allowed to add or update properties.

>> Access Control:
        The onlyOwner modifier restricts certain functions to be called only by the contract owner.


#### Getting Started

##### Executing program
#### solidity
```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PropertyTrader {
    // Enum to represent property types
    enum PropertyType { House, Flat }

    // Struct to store information about a property
    struct Property {
        string name;
        PropertyType propertyType;
        uint256 price; // Price in wei
    }

    // Mapping of property names to their details
    mapping(string => Property) public properties;

    // Address of the owner (who can update property prices)
    address public owner;

    // Event emitted when a property price is updated
    event PropertyPriceUpdated(string name, uint256 price);

    constructor() {
        owner = msg.sender; // Set the contract deployer as the owner
    }

    // Function to add a new property (only owner)
    function addProperty(string memory name, PropertyType propertyType, uint256 price) public onlyOwner {
        require(!propertyExists(name), "Property already exists");
        properties[name] = Property(name, propertyType, price);
    }

    // Function to update the price of a property (only owner)
    function updatePropertyPrice(string memory name, uint256 price) public onlyOwner {
        require(propertyExists(name), "Property does not exist");
        properties[name].price = price;
        emit PropertyPriceUpdated(name, price);
    }

    // Function to check if a property exists
    function propertyExists(string memory name) public view returns (bool) {
        return bytes(properties[name].name).length > 0;
    }

    // Function to simulate buying a property
    function buyProperty(string memory name) public payable {
        require(propertyExists(name), "Property does not exist");
        Property storage property = properties[name];
        uint256 propertyPrice = property.price;
        require(msg.value >= propertyPrice, "Insufficient funds");
        // Simulate property purchase logic (e.g., update ownership records)
    }

    // Function to simulate selling a property (currently a placeholder)
function sellProperty(string memory name) public view {
    require(propertyExists(name), "Property does not exist");
    // Simulate property selling logic (e.g., update ownership records)
}

    // Modifier to restrict functions to the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }
}
```
            
#### JavaScript

```
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

```

###### Author
Manish Kumar 
(https://www.linkedin.com/in/manish-kmr/)

###### License
This Cryptotrading is licensed under the MIT License
