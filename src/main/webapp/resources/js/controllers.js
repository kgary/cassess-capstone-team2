'use strict';


myapp.controller('LoginController', function ($rootScope, $scope, AuthSharedService) {
        $scope.rememberMe = true;
        $scope.login = function () {
            $rootScope.authenticationError = false;
            AuthSharedService.login(
                $scope.username,
                $scope.password,
                $scope.rememberMe
            );
        }
    })
    .controller('HomeController', function ($scope, HomeService) {
        $scope.technos = HomeService.getTechno();
    })
    .controller('UsersController', function ($scope, $log, UsersService) {
        $scope.users = UsersService.getAll();
    })
    .controller('ApiDocController', function ($scope) {
        // init form
        $scope.isLoading = false;
        $scope.url = $scope.swaggerUrl = 'v2/api-docs';
        // error management
        $scope.myErrorHandler = function (data, status) {
            console.log('failed to load swagger: ' + status + '   ' + data);
        };

        $scope.infos = false;
    })
    .controller('TokensController', function ($scope, UsersService, TokensService, $q) {

        var browsers = ["Firefox", 'Chrome', 'Trident']

        $q.all([
            UsersService.getAll().$promise,
            TokensService.getAll().$promise
        ]).then(function (data) {
            var users = data[0];
            var tokens = data[1];

            tokens.forEach(function (token) {
                users.forEach(function (user) {
                    if (token.userLogin === user.login) {
                        token.firstName = user.firstName;
                        token.familyName = user.familyName;
                        browsers.forEach(function (browser) {
                            if (token.userAgent.indexOf(browser) > -1) {
                                token.browser = browser;
                            }
                        });
                    }
                });
            });

            $scope.tokens = tokens;
        });


    })
    .controller('LogoutController', function (AuthSharedService) {
        AuthSharedService.logout();
    })
    .controller('ErrorController', function ($scope, $routeParams) {
        $scope.code = $routeParams.code;

        switch ($scope.code) {
            case "403" :
                $scope.message = "Oops! you have come to unauthorised page."
                break;
            case "404" :
                $scope.message = "Page not found."
                break;
            default:
                $scope.code = 500;
                $scope.message = "Oops! unexpected error"
        }

    })
    .controller("TaigaAdmin", [ '$scope', '$http', function($scope, $http) {

    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=utf-8";

    $http({
        url : './taigaCourses',
        method : "GET"
    }).then(function(response) {
        console.log("Worked!");
        //console.log(response.data);
        $scope.courses = response.data;
    });

    $scope.selectedCourseChanged = function(){
        $http({
            url : './taigaTeams',
            method : "GET",
            headers: {'course' : $scope.selectedCourse.value.course}
        }).then(function(response) {
            console.log("Worked!: " + $scope.selectedCourse.value.course);
            //console.log(response.data);
            $scope.teams = response.data;
            console.log($scope.teams);
        }, function(response) {
            //fail case
            console.log("didn't work");
            //console.log(response);
            $scope.message = response;
        });

    }

    $scope.selectedTeamChanged = function(){
        $http({
            url : './taigaStudents',
            method : "GET",
            headers: {'team' : $scope.selectedTeam.value.team}
        }).then(function(response) {
            console.log("Worked!: " + $scope.selectedTeam.value.team);
            //console.log(response.data);
            $scope.students = response.data;
            console.log($scope.students);
        }, function(response) {
            //fail case
            console.log("didn't work");
            //console.log(response);
            $scope.message = response;
        });

    }

    $scope.sendPost = function() {
        console.log($scope.name);
        $http({
            url : './taigaTasks',
            method : "POST",
            headers: {'name' : $scope.selectedStudent.value.full_name}
        }).then(function(response) {
            console.log("Worked!");
            //console.log(response.data);
            $scope.tasks = response.data;
        }, function(response) {
            //fail case
            console.log("didn't work");
            //console.log(response);
            $scope.message = response;
        });

    };

    $scope.updateTaigaProjects = function() {
        $http({
            url : './taiga/Update/Projects',
            method : "POST"
        }).then(function(response) {
            console.log("Worked!");
            //console.log(response.data);
            $scope.tasks = response.data;
        }, function(response) {
            //fail case
            console.log("didn't work");
            //console.log(response);
            $scope.message = response;
        });

    };

    $scope.updateTaigaMemberships = function() {
        $http({
            url : './taiga/Update/Memberships',
            method : "POST"
        }).then(function(response) {
            console.log("Worked!");
            //console.log(response.data);
            $scope.tasks = response.data;
        }, function(response) {
            //fail case
            console.log("didn't work");
            //console.log(response);
            $scope.message = response;
        });

    };

    $scope.updateTaigaTaskTotals = function() {
        $http({
            url : './taiga/Update/Tasks',
            method : "POST"
        }).then(function(response) {
            console.log("Worked!");
            //console.log(response.data);
            $scope.tasks = response.data;
        }, function(response) {
            //fail case
            console.log("didn't work");
            //console.log(response);
            $scope.message = response;
        });

    };

    } ]);