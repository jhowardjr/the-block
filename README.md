# The Block

A simple example implementing a property trading game. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

* Windows, Linux or Mac OS X
* [NodeJS 5.0+ recommended.](https://nodejs.org/en/)
* [ganache](http://truffleframework.com/ganache/)

#### Browser Requirement  

* [MetaMask](https://metamask.io/) (Recommended) 
or 
* [Ethereum Mist](https://github.com/ethereum/mist/releases)

### Installing

A step by step series of examples that tell you have to get a development env running

1. Install the prerequisites above

2. Clone the git repository. 

```
git clone https://hustle24@bitbucket.org/hustle24/the-block.git
```

3. Start [ganache](http://truffleframework.com/ganache/)

4. Configure the MetaMask client to use the Ganache blockchain. See how-to [here](http://truffleframework.com/docs/advanced/truffle-with-metamask#setting-up-metamask)

5. From the command line terminal, navigate to the *the-block* directory.

6. Start the Dapp.

```
npm run dev
```

7. From a *new* command line terminal, navigate to the *the-block* directory.

8. Open the truffle console.

```
truffle console
```

9. Deploy the contract.

```
truffle migrate
```

10. For testing purposes, generate 10 initial property contracts.

```
TheBlock.deployed().then(function (instance) {instance.genesis();});
```

11. In Chrome, with the MetaMask plugin enabled, go to http://localhost:3000/

* If successful, the following will be display (The auction section will be different): 

![Screenshot](/src/images/success.png)

## How does it work

Running the genesis() function above creates 10 contracts on the blockchain. Each contract is represented with an address that looks like 0x2d3fdb70870a072fddc3b9d64b163d2b11d2dc29. Removing the first two character 0x there are 40 remain hexadecimal values. Each hexadecimal digit can be used to make decisions 40^16 combinations. In this example, using 2d3fdb70870a072fddc3b9d64b163d2b11d2dc29, the type of property is selected based on the '2' in the first position and a simple image color manipulation is done using the 'd' in the second position. Based on the user unlocking other features of the contract more elements or tranformations of the photo can occur. Imagine they unlocked the "house" feature we could use the 'd' in the second position to choose from 16 different house to place and use the adjacent '3' in the thrid position to tranform the pattern of the house. This example could be expanded to many different operations. Imagine also users could trade ownsership on the contract before all the options are exhausted or even resell the contract once they are tired of upgrading an existing property. The big question is how do we gamify unlocking these options in an way that is fun. 

## Running the tests

TODO

### Break down into end to end tests

TODO

### And coding style tests

TODO

## Deployment

TODO

## Built With

* [Truffle](http://truffleframework.com/)
* [NodeJS](https://nodejs.org/)
* [Bootstrap](https://getbootstrap.com/)
* [Ethereum JavaScript API](https://github.com/ethereum/web3.js/)

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Bruce Smalls** 
* **Johnathan Howard**

## License

This project is licensed under the TBD License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* TODO