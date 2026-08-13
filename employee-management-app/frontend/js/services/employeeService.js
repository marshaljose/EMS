// Employee Service
angular.module('employeeApp')
    .factory('EmployeeService', ['$http', function($http) {
        
        var API_URL = 'http://localhost:3000/api/employees';

        return {
            /**
             * Get all employees
             */
            getAll: function() {
                return $http.get(API_URL);
            },

            /**
             * Get employee by ID
             */
            getById: function(id) {
                return $http.get(API_URL + '/' + id);
            },

            /**
             * Create new employee
             */
            create: function(employee) {
                return $http.post(API_URL, employee);
            },

            /**
             * Update employee
             */
            update: function(id, employee) {
                return $http.put(API_URL + '/' + id, employee);
            },

            /**
             * Delete employee
             */
            delete: function(id) {
                return $http.delete(API_URL + '/' + id);
            }
        };
    }]);
