angular.module('rm.roommates.controller', [])
.controller('RoommatesController', ['$scope', 'roommateInit',
  function ($scope, roommateInit) {

  if(Object.keys(roommateInit.vars).length === 0) {
    var promise = roommateInit.init();
    promise.then(function(roommateInfo) {
      // console.log(roommateInfo);
      $scope.roommateInfo = roommateInfo;
      setNoMutualInfo();
    }, function(reason) {
      console.log('Failed ', reason);
    }, function(update) {
      console.log('Got notification ', update);
    });
  } else {
    $scope.roommateInfo = roommateInit.vars;
  }

  var showNextRoommate = function() {
    $scope.roommateInfo.roommates.splice(0,1);
    $scope.roommateInfo.mutualRoommateInfo.splice(0,1);
    setNoMutualInfo();
    if($scope.roommateInfo.roommates.length >= 1) {
      $scope.roommateInfo.roommates[0].isActive = true;
    }
  };

  var setNoMutualInfo = function() {
    console.log($scope.roommateInfo.mutualRoommateInfo[0].movies);
    if($scope.roommateInfo.mutualRoommateInfo[0].movies.length === 0) {
      $scope.moviePic = '../img/nothing.jpg';
      $scope.movieName = 'none';
    } else {
      $scope.moviePic = $scope.roommateInfo.mutualRoommateInfo[0].movies[0].picture.data.url;
      $scope.movieName = $scope.roommateInfo.mutualRoommateInfo[0].movies[0].name;
    }
    if($scope.roommateInfo.mutualRoommateInfo[0].music.length === 0) {
      $scope.musicPic = '../img/nothing.jpg';
      $scope.musicName = 'none';
    } else {
      $scope.musicPic = $scope.roommateInfo.mutualRoommateInfo[0].music[0].picture.data.url;
      $scope.musicName = $scope.roommateInfo.mutualRoommateInfo[0].music[0].name;
    }
    if($scope.roommateInfo.mutualRoommateInfo[0].friends.length === 0) {
      $scope.friendsPic = '../img/nothing.jpg';
      $scope.friendsName = 'none';
    } else {
      $scope.friendsPic = $scope.roommateInfo.mutualRoommateInfo[0].friends[0].picture.data.url;
      $scope.friendsName = $scope.roommateInfo.mutualRoommateInfo[0].friends[0].name;
    }
  };

  $scope.mutualMoviesModal = function() {
    $('#mutualMoviesModal').modal('toggle');
  };

  $scope.mutualMusicModal = function() {
    $('#mutualMusicModal').modal('toggle');
  };

  $scope.mutualFriendsModal = function() {
    $('#mutualFriendsModal').modal('toggle');
  };

  $scope.likeButton = function() {
    //modal messaging
    // $('#myModal').modal('toggle');
    //input into favorites && skipBox
    showNextRoommate()
  };

  $scope.nopeButton = function() {
    //input into skipBox
    //showNextRoommate()
  };
}]);