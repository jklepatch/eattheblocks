artifact = {
  "contractName": "ToDo",
  "abi": [
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "",
          "type": "bool"
        }
      ],
      "name": "TaskCreated",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_content",
          "type": "string"
        },
        {
          "name": "_author",
          "type": "string"
        }
      ],
      "name": "createTask",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getTaskIds",
      "outputs": [
        {
          "name": "",
          "type": "uint256[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "getTask",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b50600080819055506107c9806100276000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631d65e77e1461005c578063292a458514610187578063bcd1480514610236575b600080fd5b34801561006857600080fd5b50610087600480360381019080803590602001909291905050506102a2565b60405180868152602001858152602001806020018060200184151515158152602001838103835286818151815260200191508051906020019080838360005b838110156100e15780820151818401526020810190506100c6565b50505050905090810190601f16801561010e5780820380516001836020036101000a031916815260200191505b50838103825285818151815260200191508051906020019080838360005b8381101561014757808201518184015260208101905061012c565b50505050905090810190601f1680156101745780820380516001836020036101000a031916815260200191505b5097505050505050505060405180910390f35b34801561019357600080fd5b50610234600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610483565b005b34801561024257600080fd5b5061024b6106a0565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b8381101561028e578082015181840152602081019050610273565b505050509050019250505060405180910390f35b6000806060806000856000600260008381526020019081526020016000206000015414156102cf57600080fd5b866002600089815260200190815260200160002060010154600260008a8152602001908152602001600020600201600260008b8152602001908152602001600020600301600260008c815260200190815260200160002060040160009054906101000a900460ff16828054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103cc5780601f106103a1576101008083540402835291602001916103cc565b820191906000526020600020905b8154815290600101906020018083116103af57829003601f168201915b50505050509250818054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104685780601f1061043d57610100808354040283529160200191610468565b820191906000526020600020905b81548152906001019060200180831161044b57829003601f168201915b50505050509150955095509550955095505091939590929450565b600080815480929190600101919050555060a0604051908101604052806000548152602001428152602001838152602001828152602001600015158152506002600080548152602001908152602001600020600082015181600001556020820151816001015560408201518160020190805190602001906105059291906106f8565b5060608201518160030190805190602001906105229291906106f8565b5060808201518160040160006101000a81548160ff021916908315150217905550905050600160005490806001815401808255809150509060018203906000526020600020016000909192909190915055507fb322bdd3250d405f7845d27fa1f0753f8f7e18e40886bc254b89005c3e9c0324600054428484600060405180868152602001858152602001806020018060200184151515158152602001838103835286818151815260200191508051906020019080838360005b838110156105f75780820151818401526020810190506105dc565b50505050905090810190601f1680156106245780820380516001836020036101000a031916815260200191505b50838103825285818151815260200191508051906020019080838360005b8381101561065d578082015181840152602081019050610642565b50505050905090810190601f16801561068a5780820380516001836020036101000a031916815260200191505b5097505050505050505060405180910390a15050565b606060018054806020026020016040519081016040528092919081815260200182805480156106ee57602002820191906000526020600020905b8154815260200190600101908083116106da575b5050505050905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061073957805160ff1916838001178555610767565b82800160010185558215610767579182015b8281111561076657825182559160200191906001019061074b565b5b5090506107749190610778565b5090565b61079a91905b8082111561079657600081600090555060010161077e565b5090565b905600a165627a7a7230582015c5ca109443d6657c399e3a759930210738151bdfb41b998bc831dda37004d90029",
  "deployedBytecode": "0x608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631d65e77e1461005c578063292a458514610187578063bcd1480514610236575b600080fd5b34801561006857600080fd5b50610087600480360381019080803590602001909291905050506102a2565b60405180868152602001858152602001806020018060200184151515158152602001838103835286818151815260200191508051906020019080838360005b838110156100e15780820151818401526020810190506100c6565b50505050905090810190601f16801561010e5780820380516001836020036101000a031916815260200191505b50838103825285818151815260200191508051906020019080838360005b8381101561014757808201518184015260208101905061012c565b50505050905090810190601f1680156101745780820380516001836020036101000a031916815260200191505b5097505050505050505060405180910390f35b34801561019357600080fd5b50610234600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610483565b005b34801561024257600080fd5b5061024b6106a0565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b8381101561028e578082015181840152602081019050610273565b505050509050019250505060405180910390f35b6000806060806000856000600260008381526020019081526020016000206000015414156102cf57600080fd5b866002600089815260200190815260200160002060010154600260008a8152602001908152602001600020600201600260008b8152602001908152602001600020600301600260008c815260200190815260200160002060040160009054906101000a900460ff16828054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103cc5780601f106103a1576101008083540402835291602001916103cc565b820191906000526020600020905b8154815290600101906020018083116103af57829003601f168201915b50505050509250818054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104685780601f1061043d57610100808354040283529160200191610468565b820191906000526020600020905b81548152906001019060200180831161044b57829003601f168201915b50505050509150955095509550955095505091939590929450565b600080815480929190600101919050555060a0604051908101604052806000548152602001428152602001838152602001828152602001600015158152506002600080548152602001908152602001600020600082015181600001556020820151816001015560408201518160020190805190602001906105059291906106f8565b5060608201518160030190805190602001906105229291906106f8565b5060808201518160040160006101000a81548160ff021916908315150217905550905050600160005490806001815401808255809150509060018203906000526020600020016000909192909190915055507fb322bdd3250d405f7845d27fa1f0753f8f7e18e40886bc254b89005c3e9c0324600054428484600060405180868152602001858152602001806020018060200184151515158152602001838103835286818151815260200191508051906020019080838360005b838110156105f75780820151818401526020810190506105dc565b50505050905090810190601f1680156106245780820380516001836020036101000a031916815260200191505b50838103825285818151815260200191508051906020019080838360005b8381101561065d578082015181840152602081019050610642565b50505050905090810190601f16801561068a5780820380516001836020036101000a031916815260200191505b5097505050505050505060405180910390a15050565b606060018054806020026020016040519081016040528092919081815260200182805480156106ee57602002820191906000526020600020905b8154815260200190600101908083116106da575b5050505050905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061073957805160ff1916838001178555610767565b82800160010185558215610767579182015b8281111561076657825182559160200191906001019061074b565b5b5090506107749190610778565b5090565b61079a91905b8082111561079657600081600090555060010161077e565b5090565b905600a165627a7a7230582015c5ca109443d6657c399e3a759930210738151bdfb41b998bc831dda37004d90029",
  "sourceMap": "25:1023:1:-;;;271:48;8:9:-1;5:2;;;30:1;27;20:12;5:2;271:48:1;313:1;300:10;:14;;;;25:1023;;;;;;",
  "deployedSourceMap": "25:1023:1:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;656:283;;8:9:-1;5:2;;;30:1;27;20:12;5:2;656:283:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;656:283:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;656:283:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;323:246;;8:9:-1;5:2;;;30:1;27;20:12;5:2;323:246:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;573:79;;8:9:-1;5:2;;;30:1;27;20:12;5:2;573:79:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;573:79:1;;;;;;;;;;;;;;;;;656:283;733:4;745;757:6;771;785:4;693:2;1001:1;985:5;:9;991:2;985:9;;;;;;;;;;;:12;;;:17;982:49;;;1014:8;;;982:49;821:2;833:5;:9;839:2;833:9;;;;;;;;;;;:14;;;857:5;:9;863:2;857:9;;;;;;;;;;;:17;;884:5;:9;890:2;884:9;;;;;;;;;;;:16;;910:5;:9;916:2;910:9;;;;;;;;;;;:14;;;;;;;;;;;;805:127;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;656:283;;;;;;;;:::o;323:246::-;389:10;;:12;;;;;;;;;;;;;427:47;;;;;;;;;432:10;;427:47;;;;444:3;427:47;;;;449:8;427:47;;;;459:7;427:47;;;;468:5;427:47;;;;;407:5;:17;413:10;;407:17;;;;;;;;;;;:67;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;480:7;493:10;;480:24;;39:1:-1;33:3;27:10;23:18;57:10;52:3;45:23;79:10;72:17;;0:93;480:24:1;;;;;;;;;;;;;;;;;;;;;;510:54;522:10;;534:3;539:8;549:7;558:5;510:54;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;510:54:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;510:54:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;323:246;;:::o;573:79::-;619:6;640:7;633:14;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;573:79;:::o;25:1023::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o",
  "source": "pragma solidity ^0.4.4;\n\ncontract ToDo {\n  struct Task {\n    uint id;\n    uint date;\n    string content;\n    string author;\n    bool done;\n  }\n\n  uint lastTaskId;\n  uint[] taskIds;\n  mapping(uint => Task) tasks;\n\n  event TaskCreated(uint, uint, string, string, bool);\n\n  function ToDo() public {\n    lastTaskId = 0;\n  }\n\n  function createTask(string _content, string _author) public {\n    lastTaskId++;\n    tasks[lastTaskId] = Task(lastTaskId, now, _content, _author, false);\n    taskIds.push(lastTaskId);\n    TaskCreated(lastTaskId, now, _content, _author, false);\n  }\n\n  function getTaskIds() public constant returns(uint[]) {\n    return taskIds;\n  }\n\n  function getTask(uint id) taskExists(id) public constant \n    returns(\n      uint,\n      uint,\n      string,\n      string,\n      bool\n    ) {\n\n      return(\n        id,\n        tasks[id].date,\n        tasks[id].content,\n        tasks[id].author,\n        tasks[id].done\n      );\n    }\n\n    modifier taskExists(uint id) {\n      if(tasks[id].id == 0) {\n        revert();\n      }\n      _;\n    }\n}\n",
  "sourcePath": "/Users/jklepatch/ETB/code/special-episode-1/step5/contracts/ToDo.sol",
  "ast": {
    "absolutePath": "/Users/jklepatch/ETB/code/special-episode-1/step5/contracts/ToDo.sol",
    "exportedSymbols": {
      "ToDo": [
        200
      ]
    },
    "id": 201,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 58,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".4"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:1"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 200,
        "linearizedBaseContracts": [
          200
        ],
        "name": "ToDo",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "ToDo.Task",
            "id": 69,
            "members": [
              {
                "constant": false,
                "id": 60,
                "name": "id",
                "nodeType": "VariableDeclaration",
                "scope": 69,
                "src": "61:7:1",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 59,
                  "name": "uint",
                  "nodeType": "ElementaryTypeName",
                  "src": "61:4:1",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 62,
                "name": "date",
                "nodeType": "VariableDeclaration",
                "scope": 69,
                "src": "74:9:1",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 61,
                  "name": "uint",
                  "nodeType": "ElementaryTypeName",
                  "src": "74:4:1",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 64,
                "name": "content",
                "nodeType": "VariableDeclaration",
                "scope": 69,
                "src": "89:14:1",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_string_storage_ptr",
                  "typeString": "string"
                },
                "typeName": {
                  "id": 63,
                  "name": "string",
                  "nodeType": "ElementaryTypeName",
                  "src": "89:6:1",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_storage_ptr",
                    "typeString": "string"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 66,
                "name": "author",
                "nodeType": "VariableDeclaration",
                "scope": 69,
                "src": "109:13:1",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_string_storage_ptr",
                  "typeString": "string"
                },
                "typeName": {
                  "id": 65,
                  "name": "string",
                  "nodeType": "ElementaryTypeName",
                  "src": "109:6:1",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_storage_ptr",
                    "typeString": "string"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 68,
                "name": "done",
                "nodeType": "VariableDeclaration",
                "scope": 69,
                "src": "128:9:1",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_bool",
                  "typeString": "bool"
                },
                "typeName": {
                  "id": 67,
                  "name": "bool",
                  "nodeType": "ElementaryTypeName",
                  "src": "128:4:1",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "Task",
            "nodeType": "StructDefinition",
            "scope": 200,
            "src": "43:99:1",
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 71,
            "name": "lastTaskId",
            "nodeType": "VariableDeclaration",
            "scope": 200,
            "src": "146:15:1",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 70,
              "name": "uint",
              "nodeType": "ElementaryTypeName",
              "src": "146:4:1",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": null,
            "visibility": "internal"
          },
          {
            "constant": false,
            "id": 74,
            "name": "taskIds",
            "nodeType": "VariableDeclaration",
            "scope": 200,
            "src": "165:14:1",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_array$_t_uint256_$dyn_storage",
              "typeString": "uint256[]"
            },
            "typeName": {
              "baseType": {
                "id": 72,
                "name": "uint",
                "nodeType": "ElementaryTypeName",
                "src": "165:4:1",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                }
              },
              "id": 73,
              "length": null,
              "nodeType": "ArrayTypeName",
              "src": "165:6:1",
              "typeDescriptions": {
                "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                "typeString": "uint256[]"
              }
            },
            "value": null,
            "visibility": "internal"
          },
          {
            "constant": false,
            "id": 78,
            "name": "tasks",
            "nodeType": "VariableDeclaration",
            "scope": 200,
            "src": "183:27:1",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_Task_$69_storage_$",
              "typeString": "mapping(uint256 => struct ToDo.Task)"
            },
            "typeName": {
              "id": 77,
              "keyType": {
                "id": 75,
                "name": "uint",
                "nodeType": "ElementaryTypeName",
                "src": "191:4:1",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                }
              },
              "nodeType": "Mapping",
              "src": "183:21:1",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_Task_$69_storage_$",
                "typeString": "mapping(uint256 => struct ToDo.Task)"
              },
              "valueType": {
                "contractScope": null,
                "id": 76,
                "name": "Task",
                "nodeType": "UserDefinedTypeName",
                "referencedDeclaration": 69,
                "src": "199:4:1",
                "typeDescriptions": {
                  "typeIdentifier": "t_struct$_Task_$69_storage_ptr",
                  "typeString": "struct ToDo.Task"
                }
              }
            },
            "value": null,
            "visibility": "internal"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 90,
            "name": "TaskCreated",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 89,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 80,
                  "indexed": false,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 90,
                  "src": "233:4:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 79,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "233:4:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 82,
                  "indexed": false,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 90,
                  "src": "239:4:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 81,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "239:4:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 84,
                  "indexed": false,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 90,
                  "src": "245:6:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 83,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "245:6:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 86,
                  "indexed": false,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 90,
                  "src": "253:6:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 85,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "253:6:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 88,
                  "indexed": false,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 90,
                  "src": "261:4:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 87,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "261:4:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "232:34:1"
            },
            "src": "215:52:1"
          },
          {
            "body": {
              "id": 97,
              "nodeType": "Block",
              "src": "294:25:1",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 95,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 93,
                      "name": "lastTaskId",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 71,
                      "src": "300:10:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 94,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "313:1:1",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "src": "300:14:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 96,
                  "nodeType": "ExpressionStatement",
                  "src": "300:14:1"
                }
              ]
            },
            "documentation": null,
            "id": 98,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "ToDo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 91,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "284:2:1"
            },
            "payable": false,
            "returnParameters": {
              "id": 92,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "294:0:1"
            },
            "scope": 200,
            "src": "271:48:1",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 134,
              "nodeType": "Block",
              "src": "383:186:1",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 106,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "UnaryOperation",
                    "operator": "++",
                    "prefix": false,
                    "src": "389:12:1",
                    "subExpression": {
                      "argumentTypes": null,
                      "id": 105,
                      "name": "lastTaskId",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 71,
                      "src": "389:10:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 107,
                  "nodeType": "ExpressionStatement",
                  "src": "389:12:1"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 118,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 108,
                        "name": "tasks",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 78,
                        "src": "407:5:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_Task_$69_storage_$",
                          "typeString": "mapping(uint256 => struct ToDo.Task storage ref)"
                        }
                      },
                      "id": 110,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 109,
                        "name": "lastTaskId",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 71,
                        "src": "413:10:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "407:17:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Task_$69_storage",
                        "typeString": "struct ToDo.Task storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 112,
                          "name": "lastTaskId",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 71,
                          "src": "432:10:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 113,
                          "name": "now",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 217,
                          "src": "444:3:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 114,
                          "name": "_content",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 100,
                          "src": "449:8:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_string_memory_ptr",
                            "typeString": "string memory"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 115,
                          "name": "_author",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 102,
                          "src": "459:7:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_string_memory_ptr",
                            "typeString": "string memory"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "hexValue": "66616c7365",
                          "id": 116,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "bool",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "468:5:1",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          },
                          "value": "false"
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          {
                            "typeIdentifier": "t_string_memory_ptr",
                            "typeString": "string memory"
                          },
                          {
                            "typeIdentifier": "t_string_memory_ptr",
                            "typeString": "string memory"
                          },
                          {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        ],
                        "id": 111,
                        "name": "Task",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 69,
                        "src": "427:4:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_struct$_Task_$69_storage_ptr_$",
                          "typeString": "type(struct ToDo.Task storage pointer)"
                        }
                      },
                      "id": 117,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "structConstructorCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "427:47:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Task_$69_memory",
                        "typeString": "struct ToDo.Task memory"
                      }
                    },
                    "src": "407:67:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Task_$69_storage",
                      "typeString": "struct ToDo.Task storage ref"
                    }
                  },
                  "id": 119,
                  "nodeType": "ExpressionStatement",
                  "src": "407:67:1"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 123,
                        "name": "lastTaskId",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 71,
                        "src": "493:10:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 120,
                        "name": "taskIds",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 74,
                        "src": "480:7:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_storage",
                          "typeString": "uint256[] storage ref"
                        }
                      },
                      "id": 122,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "480:12:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_uint256_$returns$_t_uint256_$",
                        "typeString": "function (uint256) returns (uint256)"
                      }
                    },
                    "id": 124,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "480:24:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 125,
                  "nodeType": "ExpressionStatement",
                  "src": "480:24:1"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 127,
                        "name": "lastTaskId",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 71,
                        "src": "522:10:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 128,
                        "name": "now",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 217,
                        "src": "534:3:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 129,
                        "name": "_content",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 100,
                        "src": "539:8:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory_ptr",
                          "typeString": "string memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 130,
                        "name": "_author",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 102,
                        "src": "549:7:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory_ptr",
                          "typeString": "string memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "66616c7365",
                        "id": 131,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "bool",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "558:5:1",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        "value": "false"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_string_memory_ptr",
                          "typeString": "string memory"
                        },
                        {
                          "typeIdentifier": "t_string_memory_ptr",
                          "typeString": "string memory"
                        },
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 126,
                      "name": "TaskCreated",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 90,
                      "src": "510:11:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_uint256_$_t_uint256_$_t_string_memory_ptr_$_t_string_memory_ptr_$_t_bool_$returns$__$",
                        "typeString": "function (uint256,uint256,string memory,string memory,bool)"
                      }
                    },
                    "id": 132,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "510:54:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 133,
                  "nodeType": "ExpressionStatement",
                  "src": "510:54:1"
                }
              ]
            },
            "documentation": null,
            "id": 135,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "createTask",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 103,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 100,
                  "name": "_content",
                  "nodeType": "VariableDeclaration",
                  "scope": 135,
                  "src": "343:15:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 99,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "343:6:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 102,
                  "name": "_author",
                  "nodeType": "VariableDeclaration",
                  "scope": 135,
                  "src": "360:14:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 101,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "360:6:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "342:33:1"
            },
            "payable": false,
            "returnParameters": {
              "id": 104,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "383:0:1"
            },
            "scope": 200,
            "src": "323:246:1",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 143,
              "nodeType": "Block",
              "src": "627:25:1",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 141,
                    "name": "taskIds",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 74,
                    "src": "640:7:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage",
                      "typeString": "uint256[] storage ref"
                    }
                  },
                  "functionReturnParameters": 140,
                  "id": 142,
                  "nodeType": "Return",
                  "src": "633:14:1"
                }
              ]
            },
            "documentation": null,
            "id": 144,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getTaskIds",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 136,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "592:2:1"
            },
            "payable": false,
            "returnParameters": {
              "id": 140,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 139,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 144,
                  "src": "619:6:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 137,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "619:4:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 138,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "619:6:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "618:8:1"
            },
            "scope": 200,
            "src": "573:79:1",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 181,
              "nodeType": "Block",
              "src": "796:143:1",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "components": [
                      {
                        "argumentTypes": null,
                        "id": 162,
                        "name": "id",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 146,
                        "src": "821:2:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 163,
                            "name": "tasks",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 78,
                            "src": "833:5:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_Task_$69_storage_$",
                              "typeString": "mapping(uint256 => struct ToDo.Task storage ref)"
                            }
                          },
                          "id": 165,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 164,
                            "name": "id",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 146,
                            "src": "839:2:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "833:9:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_Task_$69_storage",
                            "typeString": "struct ToDo.Task storage ref"
                          }
                        },
                        "id": 166,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "date",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 62,
                        "src": "833:14:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 167,
                            "name": "tasks",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 78,
                            "src": "857:5:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_Task_$69_storage_$",
                              "typeString": "mapping(uint256 => struct ToDo.Task storage ref)"
                            }
                          },
                          "id": 169,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 168,
                            "name": "id",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 146,
                            "src": "863:2:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "857:9:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_Task_$69_storage",
                            "typeString": "struct ToDo.Task storage ref"
                          }
                        },
                        "id": 170,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "content",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 64,
                        "src": "857:17:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_storage",
                          "typeString": "string storage ref"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 171,
                            "name": "tasks",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 78,
                            "src": "884:5:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_Task_$69_storage_$",
                              "typeString": "mapping(uint256 => struct ToDo.Task storage ref)"
                            }
                          },
                          "id": 173,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 172,
                            "name": "id",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 146,
                            "src": "890:2:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "884:9:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_Task_$69_storage",
                            "typeString": "struct ToDo.Task storage ref"
                          }
                        },
                        "id": 174,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "author",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 66,
                        "src": "884:16:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_storage",
                          "typeString": "string storage ref"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 175,
                            "name": "tasks",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 78,
                            "src": "910:5:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_Task_$69_storage_$",
                              "typeString": "mapping(uint256 => struct ToDo.Task storage ref)"
                            }
                          },
                          "id": 177,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 176,
                            "name": "id",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 146,
                            "src": "916:2:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "910:9:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_Task_$69_storage",
                            "typeString": "struct ToDo.Task storage ref"
                          }
                        },
                        "id": 178,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "done",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 68,
                        "src": "910:14:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "id": 179,
                    "isConstant": false,
                    "isInlineArray": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "TupleExpression",
                    "src": "811:121:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$_t_uint256_$_t_uint256_$_t_string_storage_$_t_string_storage_$_t_bool_$",
                      "typeString": "tuple(uint256,uint256,string storage ref,string storage ref,bool)"
                    }
                  },
                  "functionReturnParameters": 161,
                  "id": 180,
                  "nodeType": "Return",
                  "src": "805:127:1"
                }
              ]
            },
            "documentation": null,
            "id": 182,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 149,
                    "name": "id",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 146,
                    "src": "693:2:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  }
                ],
                "id": 150,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 148,
                  "name": "taskExists",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 199,
                  "src": "682:10:1",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_uint256_$",
                    "typeString": "modifier (uint256)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "682:14:1"
              }
            ],
            "name": "getTask",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 147,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 146,
                  "name": "id",
                  "nodeType": "VariableDeclaration",
                  "scope": 182,
                  "src": "673:7:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 145,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "673:4:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "672:9:1"
            },
            "payable": false,
            "returnParameters": {
              "id": 161,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 152,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 182,
                  "src": "733:4:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 151,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "733:4:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 154,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 182,
                  "src": "745:4:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 153,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "745:4:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 156,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 182,
                  "src": "757:6:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 155,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "757:6:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 158,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 182,
                  "src": "771:6:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 157,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "771:6:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 160,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 182,
                  "src": "785:4:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 159,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "785:4:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "725:70:1"
            },
            "scope": 200,
            "src": "656:283:1",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 198,
              "nodeType": "Block",
              "src": "974:72:1",
              "statements": [
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 191,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 186,
                          "name": "tasks",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 78,
                          "src": "985:5:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_Task_$69_storage_$",
                            "typeString": "mapping(uint256 => struct ToDo.Task storage ref)"
                          }
                        },
                        "id": 188,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 187,
                          "name": "id",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 184,
                          "src": "991:2:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "985:9:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Task_$69_storage",
                          "typeString": "struct ToDo.Task storage ref"
                        }
                      },
                      "id": 189,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "id",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 60,
                      "src": "985:12:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "==",
                    "rightExpression": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 190,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1001:1:1",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "src": "985:17:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": null,
                  "id": 196,
                  "nodeType": "IfStatement",
                  "src": "982:49:1",
                  "trueBody": {
                    "id": 195,
                    "nodeType": "Block",
                    "src": "1004:27:1",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [],
                          "expression": {
                            "argumentTypes": [],
                            "id": 192,
                            "name": "revert",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [
                              220,
                              221
                            ],
                            "referencedDeclaration": 220,
                            "src": "1014:6:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_revert_pure$__$returns$__$",
                              "typeString": "function () pure"
                            }
                          },
                          "id": 193,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1014:8:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 194,
                        "nodeType": "ExpressionStatement",
                        "src": "1014:8:1"
                      }
                    ]
                  }
                },
                {
                  "id": 197,
                  "nodeType": "PlaceholderStatement",
                  "src": "1038:1:1"
                }
              ]
            },
            "documentation": null,
            "id": 199,
            "name": "taskExists",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 185,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 184,
                  "name": "id",
                  "nodeType": "VariableDeclaration",
                  "scope": 199,
                  "src": "965:7:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 183,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "965:4:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "964:9:1"
            },
            "src": "945:101:1",
            "visibility": "internal"
          }
        ],
        "scope": 201,
        "src": "25:1023:1"
      }
    ],
    "src": "0:1049:1"
  },
  "legacyAST": {
    "absolutePath": "/Users/jklepatch/ETB/code/special-episode-1/step5/contracts/ToDo.sol",
    "exportedSymbols": {
      "ToDo": [
        200
      ]
    },
    "id": 201,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 58,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".4"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:1"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 200,
        "linearizedBaseContracts": [
          200
        ],
        "name": "ToDo",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "ToDo.Task",
            "id": 69,
            "members": [
              {
                "constant": false,
                "id": 60,
                "name": "id",
                "nodeType": "VariableDeclaration",
                "scope": 69,
                "src": "61:7:1",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 59,
                  "name": "uint",
                  "nodeType": "ElementaryTypeName",
                  "src": "61:4:1",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 62,
                "name": "date",
                "nodeType": "VariableDeclaration",
                "scope": 69,
                "src": "74:9:1",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 61,
                  "name": "uint",
                  "nodeType": "ElementaryTypeName",
                  "src": "74:4:1",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 64,
                "name": "content",
                "nodeType": "VariableDeclaration",
                "scope": 69,
                "src": "89:14:1",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_string_storage_ptr",
                  "typeString": "string"
                },
                "typeName": {
                  "id": 63,
                  "name": "string",
                  "nodeType": "ElementaryTypeName",
                  "src": "89:6:1",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_storage_ptr",
                    "typeString": "string"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 66,
                "name": "author",
                "nodeType": "VariableDeclaration",
                "scope": 69,
                "src": "109:13:1",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_string_storage_ptr",
                  "typeString": "string"
                },
                "typeName": {
                  "id": 65,
                  "name": "string",
                  "nodeType": "ElementaryTypeName",
                  "src": "109:6:1",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_storage_ptr",
                    "typeString": "string"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 68,
                "name": "done",
                "nodeType": "VariableDeclaration",
                "scope": 69,
                "src": "128:9:1",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_bool",
                  "typeString": "bool"
                },
                "typeName": {
                  "id": 67,
                  "name": "bool",
                  "nodeType": "ElementaryTypeName",
                  "src": "128:4:1",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "Task",
            "nodeType": "StructDefinition",
            "scope": 200,
            "src": "43:99:1",
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 71,
            "name": "lastTaskId",
            "nodeType": "VariableDeclaration",
            "scope": 200,
            "src": "146:15:1",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 70,
              "name": "uint",
              "nodeType": "ElementaryTypeName",
              "src": "146:4:1",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": null,
            "visibility": "internal"
          },
          {
            "constant": false,
            "id": 74,
            "name": "taskIds",
            "nodeType": "VariableDeclaration",
            "scope": 200,
            "src": "165:14:1",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_array$_t_uint256_$dyn_storage",
              "typeString": "uint256[]"
            },
            "typeName": {
              "baseType": {
                "id": 72,
                "name": "uint",
                "nodeType": "ElementaryTypeName",
                "src": "165:4:1",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                }
              },
              "id": 73,
              "length": null,
              "nodeType": "ArrayTypeName",
              "src": "165:6:1",
              "typeDescriptions": {
                "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                "typeString": "uint256[]"
              }
            },
            "value": null,
            "visibility": "internal"
          },
          {
            "constant": false,
            "id": 78,
            "name": "tasks",
            "nodeType": "VariableDeclaration",
            "scope": 200,
            "src": "183:27:1",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_Task_$69_storage_$",
              "typeString": "mapping(uint256 => struct ToDo.Task)"
            },
            "typeName": {
              "id": 77,
              "keyType": {
                "id": 75,
                "name": "uint",
                "nodeType": "ElementaryTypeName",
                "src": "191:4:1",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                }
              },
              "nodeType": "Mapping",
              "src": "183:21:1",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_Task_$69_storage_$",
                "typeString": "mapping(uint256 => struct ToDo.Task)"
              },
              "valueType": {
                "contractScope": null,
                "id": 76,
                "name": "Task",
                "nodeType": "UserDefinedTypeName",
                "referencedDeclaration": 69,
                "src": "199:4:1",
                "typeDescriptions": {
                  "typeIdentifier": "t_struct$_Task_$69_storage_ptr",
                  "typeString": "struct ToDo.Task"
                }
              }
            },
            "value": null,
            "visibility": "internal"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 90,
            "name": "TaskCreated",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 89,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 80,
                  "indexed": false,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 90,
                  "src": "233:4:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 79,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "233:4:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 82,
                  "indexed": false,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 90,
                  "src": "239:4:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 81,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "239:4:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 84,
                  "indexed": false,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 90,
                  "src": "245:6:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 83,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "245:6:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 86,
                  "indexed": false,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 90,
                  "src": "253:6:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 85,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "253:6:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 88,
                  "indexed": false,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 90,
                  "src": "261:4:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 87,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "261:4:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "232:34:1"
            },
            "src": "215:52:1"
          },
          {
            "body": {
              "id": 97,
              "nodeType": "Block",
              "src": "294:25:1",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 95,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 93,
                      "name": "lastTaskId",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 71,
                      "src": "300:10:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 94,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "313:1:1",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "src": "300:14:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 96,
                  "nodeType": "ExpressionStatement",
                  "src": "300:14:1"
                }
              ]
            },
            "documentation": null,
            "id": 98,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "ToDo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 91,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "284:2:1"
            },
            "payable": false,
            "returnParameters": {
              "id": 92,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "294:0:1"
            },
            "scope": 200,
            "src": "271:48:1",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 134,
              "nodeType": "Block",
              "src": "383:186:1",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 106,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "UnaryOperation",
                    "operator": "++",
                    "prefix": false,
                    "src": "389:12:1",
                    "subExpression": {
                      "argumentTypes": null,
                      "id": 105,
                      "name": "lastTaskId",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 71,
                      "src": "389:10:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 107,
                  "nodeType": "ExpressionStatement",
                  "src": "389:12:1"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 118,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 108,
                        "name": "tasks",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 78,
                        "src": "407:5:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_Task_$69_storage_$",
                          "typeString": "mapping(uint256 => struct ToDo.Task storage ref)"
                        }
                      },
                      "id": 110,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 109,
                        "name": "lastTaskId",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 71,
                        "src": "413:10:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "407:17:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Task_$69_storage",
                        "typeString": "struct ToDo.Task storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 112,
                          "name": "lastTaskId",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 71,
                          "src": "432:10:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 113,
                          "name": "now",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 217,
                          "src": "444:3:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 114,
                          "name": "_content",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 100,
                          "src": "449:8:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_string_memory_ptr",
                            "typeString": "string memory"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 115,
                          "name": "_author",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 102,
                          "src": "459:7:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_string_memory_ptr",
                            "typeString": "string memory"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "hexValue": "66616c7365",
                          "id": 116,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "bool",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "468:5:1",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          },
                          "value": "false"
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          {
                            "typeIdentifier": "t_string_memory_ptr",
                            "typeString": "string memory"
                          },
                          {
                            "typeIdentifier": "t_string_memory_ptr",
                            "typeString": "string memory"
                          },
                          {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        ],
                        "id": 111,
                        "name": "Task",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 69,
                        "src": "427:4:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_struct$_Task_$69_storage_ptr_$",
                          "typeString": "type(struct ToDo.Task storage pointer)"
                        }
                      },
                      "id": 117,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "structConstructorCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "427:47:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Task_$69_memory",
                        "typeString": "struct ToDo.Task memory"
                      }
                    },
                    "src": "407:67:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Task_$69_storage",
                      "typeString": "struct ToDo.Task storage ref"
                    }
                  },
                  "id": 119,
                  "nodeType": "ExpressionStatement",
                  "src": "407:67:1"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 123,
                        "name": "lastTaskId",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 71,
                        "src": "493:10:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 120,
                        "name": "taskIds",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 74,
                        "src": "480:7:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_storage",
                          "typeString": "uint256[] storage ref"
                        }
                      },
                      "id": 122,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "480:12:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_uint256_$returns$_t_uint256_$",
                        "typeString": "function (uint256) returns (uint256)"
                      }
                    },
                    "id": 124,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "480:24:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 125,
                  "nodeType": "ExpressionStatement",
                  "src": "480:24:1"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 127,
                        "name": "lastTaskId",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 71,
                        "src": "522:10:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 128,
                        "name": "now",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 217,
                        "src": "534:3:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 129,
                        "name": "_content",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 100,
                        "src": "539:8:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory_ptr",
                          "typeString": "string memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 130,
                        "name": "_author",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 102,
                        "src": "549:7:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory_ptr",
                          "typeString": "string memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "66616c7365",
                        "id": 131,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "bool",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "558:5:1",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        "value": "false"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_string_memory_ptr",
                          "typeString": "string memory"
                        },
                        {
                          "typeIdentifier": "t_string_memory_ptr",
                          "typeString": "string memory"
                        },
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 126,
                      "name": "TaskCreated",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 90,
                      "src": "510:11:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_uint256_$_t_uint256_$_t_string_memory_ptr_$_t_string_memory_ptr_$_t_bool_$returns$__$",
                        "typeString": "function (uint256,uint256,string memory,string memory,bool)"
                      }
                    },
                    "id": 132,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "510:54:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 133,
                  "nodeType": "ExpressionStatement",
                  "src": "510:54:1"
                }
              ]
            },
            "documentation": null,
            "id": 135,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "createTask",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 103,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 100,
                  "name": "_content",
                  "nodeType": "VariableDeclaration",
                  "scope": 135,
                  "src": "343:15:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 99,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "343:6:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 102,
                  "name": "_author",
                  "nodeType": "VariableDeclaration",
                  "scope": 135,
                  "src": "360:14:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 101,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "360:6:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "342:33:1"
            },
            "payable": false,
            "returnParameters": {
              "id": 104,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "383:0:1"
            },
            "scope": 200,
            "src": "323:246:1",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 143,
              "nodeType": "Block",
              "src": "627:25:1",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 141,
                    "name": "taskIds",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 74,
                    "src": "640:7:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage",
                      "typeString": "uint256[] storage ref"
                    }
                  },
                  "functionReturnParameters": 140,
                  "id": 142,
                  "nodeType": "Return",
                  "src": "633:14:1"
                }
              ]
            },
            "documentation": null,
            "id": 144,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getTaskIds",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 136,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "592:2:1"
            },
            "payable": false,
            "returnParameters": {
              "id": 140,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 139,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 144,
                  "src": "619:6:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 137,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "619:4:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 138,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "619:6:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "618:8:1"
            },
            "scope": 200,
            "src": "573:79:1",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 181,
              "nodeType": "Block",
              "src": "796:143:1",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "components": [
                      {
                        "argumentTypes": null,
                        "id": 162,
                        "name": "id",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 146,
                        "src": "821:2:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 163,
                            "name": "tasks",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 78,
                            "src": "833:5:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_Task_$69_storage_$",
                              "typeString": "mapping(uint256 => struct ToDo.Task storage ref)"
                            }
                          },
                          "id": 165,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 164,
                            "name": "id",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 146,
                            "src": "839:2:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "833:9:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_Task_$69_storage",
                            "typeString": "struct ToDo.Task storage ref"
                          }
                        },
                        "id": 166,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "date",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 62,
                        "src": "833:14:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 167,
                            "name": "tasks",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 78,
                            "src": "857:5:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_Task_$69_storage_$",
                              "typeString": "mapping(uint256 => struct ToDo.Task storage ref)"
                            }
                          },
                          "id": 169,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 168,
                            "name": "id",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 146,
                            "src": "863:2:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "857:9:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_Task_$69_storage",
                            "typeString": "struct ToDo.Task storage ref"
                          }
                        },
                        "id": 170,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "content",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 64,
                        "src": "857:17:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_storage",
                          "typeString": "string storage ref"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 171,
                            "name": "tasks",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 78,
                            "src": "884:5:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_Task_$69_storage_$",
                              "typeString": "mapping(uint256 => struct ToDo.Task storage ref)"
                            }
                          },
                          "id": 173,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 172,
                            "name": "id",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 146,
                            "src": "890:2:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "884:9:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_Task_$69_storage",
                            "typeString": "struct ToDo.Task storage ref"
                          }
                        },
                        "id": 174,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "author",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 66,
                        "src": "884:16:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_storage",
                          "typeString": "string storage ref"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 175,
                            "name": "tasks",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 78,
                            "src": "910:5:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_Task_$69_storage_$",
                              "typeString": "mapping(uint256 => struct ToDo.Task storage ref)"
                            }
                          },
                          "id": 177,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 176,
                            "name": "id",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 146,
                            "src": "916:2:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "910:9:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_Task_$69_storage",
                            "typeString": "struct ToDo.Task storage ref"
                          }
                        },
                        "id": 178,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "done",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 68,
                        "src": "910:14:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "id": 179,
                    "isConstant": false,
                    "isInlineArray": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "TupleExpression",
                    "src": "811:121:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$_t_uint256_$_t_uint256_$_t_string_storage_$_t_string_storage_$_t_bool_$",
                      "typeString": "tuple(uint256,uint256,string storage ref,string storage ref,bool)"
                    }
                  },
                  "functionReturnParameters": 161,
                  "id": 180,
                  "nodeType": "Return",
                  "src": "805:127:1"
                }
              ]
            },
            "documentation": null,
            "id": 182,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 149,
                    "name": "id",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 146,
                    "src": "693:2:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  }
                ],
                "id": 150,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 148,
                  "name": "taskExists",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 199,
                  "src": "682:10:1",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_uint256_$",
                    "typeString": "modifier (uint256)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "682:14:1"
              }
            ],
            "name": "getTask",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 147,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 146,
                  "name": "id",
                  "nodeType": "VariableDeclaration",
                  "scope": 182,
                  "src": "673:7:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 145,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "673:4:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "672:9:1"
            },
            "payable": false,
            "returnParameters": {
              "id": 161,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 152,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 182,
                  "src": "733:4:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 151,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "733:4:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 154,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 182,
                  "src": "745:4:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 153,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "745:4:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 156,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 182,
                  "src": "757:6:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 155,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "757:6:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 158,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 182,
                  "src": "771:6:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 157,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "771:6:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 160,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 182,
                  "src": "785:4:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 159,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "785:4:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "725:70:1"
            },
            "scope": 200,
            "src": "656:283:1",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 198,
              "nodeType": "Block",
              "src": "974:72:1",
              "statements": [
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 191,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 186,
                          "name": "tasks",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 78,
                          "src": "985:5:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_Task_$69_storage_$",
                            "typeString": "mapping(uint256 => struct ToDo.Task storage ref)"
                          }
                        },
                        "id": 188,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 187,
                          "name": "id",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 184,
                          "src": "991:2:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "985:9:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Task_$69_storage",
                          "typeString": "struct ToDo.Task storage ref"
                        }
                      },
                      "id": 189,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "id",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 60,
                      "src": "985:12:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "==",
                    "rightExpression": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 190,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1001:1:1",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "src": "985:17:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": null,
                  "id": 196,
                  "nodeType": "IfStatement",
                  "src": "982:49:1",
                  "trueBody": {
                    "id": 195,
                    "nodeType": "Block",
                    "src": "1004:27:1",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [],
                          "expression": {
                            "argumentTypes": [],
                            "id": 192,
                            "name": "revert",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [
                              220,
                              221
                            ],
                            "referencedDeclaration": 220,
                            "src": "1014:6:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_revert_pure$__$returns$__$",
                              "typeString": "function () pure"
                            }
                          },
                          "id": 193,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1014:8:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 194,
                        "nodeType": "ExpressionStatement",
                        "src": "1014:8:1"
                      }
                    ]
                  }
                },
                {
                  "id": 197,
                  "nodeType": "PlaceholderStatement",
                  "src": "1038:1:1"
                }
              ]
            },
            "documentation": null,
            "id": 199,
            "name": "taskExists",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 185,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 184,
                  "name": "id",
                  "nodeType": "VariableDeclaration",
                  "scope": 199,
                  "src": "965:7:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 183,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "965:4:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "964:9:1"
            },
            "src": "945:101:1",
            "visibility": "internal"
          }
        ],
        "scope": 201,
        "src": "25:1023:1"
      }
    ],
    "src": "0:1049:1"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {
    "4447": {
      "events": {},
      "links": {},
      "address": "0x345ca3e014aaf5dca488057592ee47305d9b3e10",
      "transactionHash": "0x9eae46f9c6b973736a76643529dd53e18fba43a7bfe540a6250cc65586b260c1"
    }
  },
  "schemaVersion": "2.0.1",
  "updatedAt": "2018-09-03T08:01:17.175Z"
}
console.log('loaded');

web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));

abstraction = new TruffleContract(artifact);
abstraction.setProvider(web3.currentProvider);

network = Object.keys(artifact.networks)[0];
address = artifact.networks[network].address;

abstraction.at(address)
  .then((todo) => {
    todo.getTaskIds()
      .then((taskIds) => {
        console.log(taskIds);
      });
  });

web3.eth.getAccounts(console.log);

