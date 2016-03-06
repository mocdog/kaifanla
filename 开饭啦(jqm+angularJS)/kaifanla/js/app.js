angular.module('kaifanla', ['ng', 'ngTouch'])
  .controller('parentCtrl', function ($scope) {
    console.log('parentCtrl被创建了....');
    $scope.jump = function (url) {
      $.mobile.changePage(url);
    }

    //监听每个Page创建事件(pagecreate),只要DOM树上新添了一个PAGE，必须编译并链接该PAGE
    $(document).on('pagecreate', function (event) {
      var page = event.target; //新添的Page元素
      var scope = $(page).scope();
      $(page).injector().invoke(function ($compile) {
        $compile(page)(scope);
        scope.$digest();
      });
    })
  })
  .controller('startCtrl', function ($scope) {
    console.log('startCtrl被创建了....');
  })
  .controller('mainCtrl', function ($scope, $http,$rootScope) {
    console.log('mainCtrl被创建了....');
    $scope.dishList = [];
    $http.get('data/dish_getbypage.php')
      .success(function (data) {
        $scope.dishList = data;
      })
    //查看某道菜的详情
    $scope.showDetail = function (did) {
      console.log('待查看的菜品编号：' + did);
      sessionStorage.did = did;
      $.mobile.changePage('detail.html');
    }
    $scope.isLogin = true;
    $scope.toggle = function (method) {
      $scope.isLogin = method == 'login' ? true : false;
    }
    var name, pwd;
    $scope.$watch('name', function () {
      name = $scope.name;
    })
    $scope.$watch('pwd', function () {
      pwd = $scope.pwd;
    })
    $rootScope.logSuccess = false;
    $scope.login = function () {
      var transform = function (data) {
        return $.param(data);
      };
      $http.post("data/user_login.php",{
        uname : name,
        upwd : pwd
      }, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        transformRequest: transform
      }).success(function(result){
        if(result["status"]!="fail"){
          $scope.info = result[0];
          sessionStorage.uname = $scope.info.uname;
          sessionStorage.uid = $scope.info.uid;
          sessionStorage.tel = $scope.info.utel;
          $rootScope.logSuccess = true;
        }
        else {
          console.log("login fail");
        }

      })
    }
  })
  .controller('detailCtrl', function ($scope, $http) {
    console.log('detailCtrl被创建了....');
    console.log('DETAIL:' + sessionStorage.did);
    $scope.uname = sessionStorage.uname;
    var transform = function (data) {
      return $.param(data);
    };
    $http.post("data/dish_getbyid.php", {
      did: sessionStorage.did
    }, {
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
      transformRequest: transform
    })
      .success(function (detailData) {
        $scope.dish = detailData[0];
      });
    $scope.jumpOrder = function (did) {
      sessionStorage.did = did;
      $.mobile.changePage("order.html");
    }
  })
  .controller("orderCtrl", function ($scope, $http) {
    $scope.uname = sessionStorage.uname;
    console.log('orderCtrl被创建了....');
    $scope.mystatus = "fail";
    var name, sex, tel, addr;
    $scope.$watch('name', function () {
      name = $scope.name;
    })
    $scope.$watch('sex', function () {
      sex = $scope.sex == "male" ? 1 : 0;
    })
    $scope.$watch('tel', function () {
      tel = $scope.tel;
    })
    $scope.$watch('addr', function () {
      addr = $scope.addr;
    })
    $scope.yes = function () {
      var transform = function (data) {
        return $.param(data);
      };
      $http.post("data/order_add.php", {
        did: sessionStorage.did,
        user_name: name,
        sex: sex,
        phone: tel,
        addr: addr
      }, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        transformRequest: transform
      }).success(function (result) {
        $scope.oid = result.oid;
        $scope.mystatus = result.result;
      })
    }
  })
  .controller("myorderCtrl", function ($scope, $http) {
    $scope.uname = sessionStorage.uname;
    var transform = function (data) {
      return $.param(data);
    };
    $http.post("data/order_getbyphone.php",{
      phone : sessionStorage.tel
    },{
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
      transformRequest: transform
    }).success(function(order){
      $scope.myorder = order;
    })
  })

