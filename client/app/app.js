angular.module('app', ['ui.router', 'ngSanitize', 'froala', 'ui.bootstrap', 'ngAnimate', 'btford.socket-io', 'nvd3'])
.config(function($urlRouterProvider, $stateProvider) {

  $stateProvider
    .state("landing", {
        url: "/",
        templateUrl: "app/landing/landingView.html",
        controller: "landingCtrl"
    })
    .state("signin", {
        url: "/signin",
        templateUrl: "app/signin/signinView.html",
        controller: "signinCtrl"
    })
    .state("signup", {
        url: "/signup",
        templateUrl: "app/signup/signupView.html",
        controller: "signupCtrl"
    })
    .state("studentHome", {
        url: "/studentHome",
        templateUrl: "app/studentHome/studentHomeView.html",
        controller: "studentHomeCtrl"
    })
    .state("studentProject", {
        url: "/studentProject/:projectId",
        templateUrl: "app/studentProject/studentProjectView.html",
        controller: "studentProjectCtrl"
    })
    .state("teacherHome", {
        url: "/teacherHome",
        templateUrl: "app/teacherHome/teacherHomeView.html",
        controller: "teacherHomeCtrl"
    })
    .state("teacherProject", {
        url: "/teacherProject/:projectId",
        templateUrl: "app/teacherProject/teacherProjectView.html",
        controller: "teacherProjectCtrl"
    })
    .state("helpRequest", {
        url: "/helpRequest",
        templateUrl: "app/studentHelpRequest/studentHelpRequestView.html",
        controller: "studentHelpRequestCtrl"
    })
    .state("teacherClass", {
        url: "/teacherClass/:classId",
        templateUrl: "app/teacherClass/teacherClassView.html",
        controller: "teacherClassCtrl"
    });

  $urlRouterProvider.otherwise("/");

});