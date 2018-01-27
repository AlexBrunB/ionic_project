angular.module('starter.controllers', [])
.controller('LoginCtrl', function($scope, $state, BackendAPI, $ionicLoading, $ionicPopup) {
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
$state.go('tab.dash');
})
.catch(function(err) {
console.log("Connection error : "+ JSON.stringify(err));
$ionicLoading.hide();
$ionicPopup.show({
  template: 'An error happened... D:',
  title: 'login',
  buttons: [{text: 'cancel'}]
});
})
.finally(function() {
console.log("Finish ");
ionicLoading.hide();
});
};
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

.controller('AccountCtrl', function($scope) {

});
