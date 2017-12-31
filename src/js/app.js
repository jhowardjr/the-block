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

    App.contracts.TheBlock.deployed().then(function (instance) {

      instance.length().then(function (value) {
        for (var i = 0; i < value.toNumber(); i++) {
          instance.retrieveAt(i).then(function (property) {

            App.contracts.Property.at(property).getAttributes().then(function (attributes) {

              html = '<li class="list-group-item">';
              html += '<div>';
              html += '<span>' + attributes[0] + '</span>';
              html += '<span>' + attributes[1] + '</span>';
              html += '</div>';
              html += '<div>' + property + '</div>';
              html += '</li>';

              $('#properties').append(html);

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