angular.module('starter.services', [])
.factory('bakendlessAPI', function() {

})

.factory('BackendAPI', function($http) {
var baseURL ="https://api.backendless.com/0E548BB8-EE8A-B78E-FFFD-A683D01A8800/8606A3F3-CD25-639B-FFE3-1AE592E11700/";
var header ={ 'Content-Type': 'application/json' };
return {
register: function(data) {
return $http.post(baseURL+"users/register", data, header);
},
login: function(data) {
return $http.post(baseURL+"users/login", data, header);
}
};
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
