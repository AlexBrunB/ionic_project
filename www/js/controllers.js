angular.module('starter.controllers', [])
.controller('LoginCtrl', function($scope, $rootScope, $state, BackendAPI, $ionicLoading, $ionicPopup) {
    $scope.loginUser = { login: null, password: null };
    $scope.goToSignup = function(){
    $state.go('signup');
  };
  $scope.doLoging = function(){
    $ionicLoading.show({
      template: 'Loading...'
        });
        BackendAPI.login($scope.loginUser)
        .then(function(res){
          $ionicLoading.hide();
          $rootScope.currUser = res.data;
          $state.go('tab.dash');
        })
        .catch(function(err) {
          console.log("Connection error : "+ JSON.stringify(err));
          $ionicLoading.hide();
          $ionicPopup.show({
            template: err.data.message,
            title: 'An error occured',
            buttons: [{text: 'cancel'}]
          });
        })
        .finally(function() {
          console.log("Finish ");
          ionicLoading.hide();
        });
      };
    })
    .controller('SellersCtrl', function($scope,Sellers,$stateParams, $state) {
       Sellers.all(function(data) {
         $scope.sellers = data;
       });
      //$scope.goToSection= function(sect){
        //$state.go('tab.newsTitles',{ServiceProvider: sect.ServiceProvider, section: sect.title, url: sect.url});
      //};

      })
.controller('SignupCtrl', function($scope, $state, BackendAPI) {
  $scope.newUser = {name: null, email: null, password: null };
  $scope.doSignup= function(){
    BackendAPI.register($scope.newUser)
.then(function(res){
$state.go('tab.dash');
})
.catch(function(err) {
console.log("Connection error : "+ JSON.stringify(err));
})
.finally(function() {
console.log("Finish ");
});
};
})
.controller('DashCtrl', function($scope) {


})


.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $rootScope, $state, BackendAPI) {
  $scope.profilEdit = {status:false};


  $scope.logout = function() {
    $scope.currUser = null;
    $state.go('login');
  };

  $scope.editclick = function() {
    console.log('prev: ' + $scope.profilEdit.status);
    $scope.profilEdit.status = !$scope.profilEdit.status;
        console.log('next: ' + $scope.profilEdit.status);
  };
})
  .controller('ProductsCtrl', function($scope, $state, $stateParams, Products) {
    Products.all($stateParams.sellerId, function(data) {
      $scope.products = data;
      $scope.panier = {};
      for (var i = 0; i < $scope.products.length; i++) {
        $scope.panier[$scope.products[i].id] = {};
        $scope.panier[$scope.products[i].id].quantity = 0;
        $scope.getTotalPrice = function(item) {
          return $scope.panier[item.id].quantity * item.price;
        };
        $scope.increaseQuantity = function(item) {
          $scope.panier[item.id].quantity += 1;
        };
        $scope.decreaseQuantity = function(item) {
          $scope.panier[item.id].quantity -= 1;
          if ($scope.panier[item.id].quantity < 0) {
            $scope.panier[item.id].quantity = 0;
          }
        };
        $scope.orderCmd = function() {
          var cmd = [];
          var j = 0;
          for (var i = 0; i < $scope.products.length; i++) {
            if ($scope.panier[$scope.products[i].id].quantity !== 0) {
              cmd[j] = {};
              cmd[j].quantity = $scope.panier[$scope.products[i].id].quantity;
              cmd[j].products = $scope.products[i];
              j++
            }
          }
          $state.go('tab.final', { order : cmd});
        }
      }
    })
  })
  .controller('FinalCtrl', function($scope, $stateParams) {

    $scope.order = $stateParams.order;
    $scope.getProductTotalPrice = function(item) {
      return item.quantity * item.products.price;
    };
    $scope.getOrderTotalPrice = function(orders) {
      if (orders == null) {
        return 0;
      }
      var total = 0;
      for (var i = 0; i < orders.length; i++) {
        total = total + (orders[i].quantity * orders[i].products.price);
      }
      return total;
    };
  });
