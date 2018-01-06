App = {
  web3Provider: null,
  contracts: {},

  init: function () {

    return App.initWeb3();
  },

  initWeb3: function () {
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }

    web3 = new Web3(App.web3Provider);

    // TODO: CHECK IF VALID WALLET
    return App.initContract();
  },

  initContract: function () {
    $.getJSON('TheBlock.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var AdoptionArtifact = data;
      App.contracts.TheBlock = TruffleContract(AdoptionArtifact);

      // Set the provider for our contract
      App.contracts.TheBlock.setProvider(App.web3Provider);

      // TODO: CALL FROM A DIFFERENT INTERFACE
      // App.createInitialProperty();

      // TODO: LOAD LAND NOT CLAIMED OR FOR SALE?
      App.loadProperty();

      // Use our contract to retrieve and mark the adopted pets
      return
    });

    $.getJSON('Property.json', function (data) {
      var AdoptionArtifact = data;
      App.contracts.Property = TruffleContract(AdoptionArtifact);
      App.contracts.Property.setProvider(App.web3Provider);
    });

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on('click', '.btn-genesis', App.createInitialProperty);
  },

  createInitialProperty: function () {
    App.contracts.TheBlock.deployed().then(function (instance) {
      instance.genesis();
    });
  },

  loadProperty: function () {

    var img = document.getElementById('base-image');

    App.contracts.TheBlock.deployed().then(function (instance) {

      instance.length().then(function (value) {
        for (var i = 0; i < value.toNumber(); i++) {
          instance.retrieveAt(i).then(function (property) {

            App.contracts.Property.at(property).getAttributes().then(function (attributes) {

              uint = new Uint8Array(property.length);

              for (var i = 0, j = property.length; i < j; ++i) {
                uint[i] = property.charCodeAt(i);
              }

              var canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;

              var context = canvas.getContext('2d');
              context.drawImage(img, 0, 0, img.width, img.height);

              var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
              var data = imageData.data;


              for (var i = 0; i < data.length; i += 4) {

                if (uint[2] < 85) {
                  data[i] = data[i] - uint[2]; // red
                }

                if (uint[2] >= 85 && uint[2] < 170) {
                  data[i + 1] = data[i + 1] - uint[2]; // green
                }

                if (uint[2] >= 170) {
                  data[i + 2] = data[i + 2] - uint[2]; // blue
                }

                if ((data[i] + data[i + 1] + data[i + 2]) === 0) {
                  data[i] = data[i] + uint[2]; // red
                  data[i + 1] = data[i + 1] + uint[2]; // green
                  data[i + 2] = data[i + 2] + uint[2]; // blue
                }

              }

              context.putImageData(imageData, 0, 0);

              var li = document.createElement('li');
              li.append(canvas);

              $('#properties').append(li);

            });
          });
        }
      });
    });
  }
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});