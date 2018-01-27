angular.module('starter.services', [])
.factory('bakendlessAPI', function() {

})

.factory('BackendAPI', function($http) {
var baseURL ="https://api.backendless.com/81BE0A2A-D0FC-E7B7-FF4F-0A718CD0A500/A3226DA6-3397-8FB6-FFFD-306838125B00/";
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
})

.factory('Sellers', function($http, $rootScope) {
  var baseUrl = "https://api.backendless.com/81BE0A2A-D0FC-E7B7-FF4F-0A718CD0A500/A3226DA6-3397-8FB6-FFFD-306838125B00/data";
  return {
    all: function(callback) {
      $http.get(baseUrl + '/Sellers').then(
        function(response) {
          console.log(response.data);
          callback(response.data);
        }, function(error) {
          console.log(error);
        }
      )
    },
    getSeller: function(sellerId) {
      for (var i = 0; i < $rootScope.sellers.length; i++) {
        if ($rootScope.sellers[i].id === sellerId) {
          return $rootScope.sellers[i];
        }
      }
      return null;
    }
  };

})