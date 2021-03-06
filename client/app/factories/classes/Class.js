angular.module('app')
  .factory('Class', function Class($http, $stateParams, User, socketFactory) {

    // REAL-TIME CLASS SOCKET
    var classSocket = socketFactory({
      ioSocket: io.connect('http://127.0.0.1:8000/classSocket')
    });

    var establishClassSocket = function(scope, cb) {
      classSocket.forward('teacherUpdate', scope);
      scope.$on('socket:teacherUpdate', function(data) {
        cb(data);
      });
    };

    var updateStudentStatus = function(project, page) {
      classSocket.emit('update', {
        project: project,
        page: page,
        studentId: User.getUser()._id
      });
    };

    // CLASS FUNCTIONALITY

    var getClasses = function() {
      return $http.get('/api/class').then(function(response){
        return response.data;
      });
    };

    var getAllClasses = function() {
      return $http.get('/api/class/all').then(function(response){
        return response.data;
      });
    };

    var getClass = function() {
      return $http.get('/api/class/' + $stateParams.classId).then(function(response) {
        console.log('Current class:', response.data);
        return response.data;
      });
    };

    var createClass = function(className) {
      return $http.post('/api/class/', {name: className})
        .then(function(response) {
          return response.data.id;
        })
        .catch(function(error) {
          console.log("Error: ");
          console.log(error);
          throw error;
        });
    };

    var deleteClass = function(classId) {
      return $http.delete('/api/class/' + classId).then(function(response) {
        return response.data;
      });
    };

    var joinClass = function(classId) {
      return $http.post('api/studentClass/' + classId, {
        StudentId: User.getUser()._id
      }).then(function(response){
        console.log('error');
        return response.data;
      }).catch(function(error){
        throw error;
      });
    };

    return {
      establishClassSocket: establishClassSocket,
      updateStudentStatus: updateStudentStatus,
      getClasses: getClasses,
      getAllClasses: getAllClasses,
      getClass: getClass,
      createClass: createClass,
      deleteClass: deleteClass,
      joinClass: joinClass
    };

  });
     



