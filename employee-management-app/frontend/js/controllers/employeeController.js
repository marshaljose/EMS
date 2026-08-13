// Employee Controller
angular.module('employeeApp')
    .controller('EmployeeController', ['$scope', '$http', 'EmployeeService', 
        function($scope, $http, EmployeeService) {
            

            
            // Initialize variables
            $scope.employees = [];
            $scope.loading = false;
            $scope.isEditMode = false;
            $scope.successMessage = '';
            $scope.errorMessage = '';
            $scope.formData = {};

            // API base URL
            var API_URL = 'http://localhost:3000/api/employees';

            /**
             * Load all employees
             */
            $scope.loadEmployees = function() {
                $scope.loading = true;
                $scope.errorMessage = '';
                
                EmployeeService.getAll().then(
                    function(response) {
                        $scope.employees = response.data;
                        $scope.loading = false;
                    },
                    function(error) {
                        $scope.errorMessage = 'Failed to load employees. Please try again.';
                        $scope.loading = false;
                        console.error('Error loading employees:', error);
                    }
                );
            };

            /**
             * Open Add Modal
             */
            $scope.openAddModal = function() {
                $scope.isEditMode = false;
                $scope.formData = {};
                $('#employeeModal').modal('show');
            };

            /**
             * Open Edit Modal
             */
            $scope.openEditModal = function(employee) {
                $scope.isEditMode = true;
                $scope.formData = angular.copy(employee);
                $('#employeeModal').modal('show');
            };

            /**
             * Close Modal
             */
            $scope.closeModal = function() {
                $('#employeeModal').modal('hide');
                $scope.formData = {};
                $scope.isEditMode = false;
            };

            /**
             * Save Employee (Add or Update)
             */
            $scope.saveEmployee = function() {
                if (!$scope.employeeForm.$valid) {
                    $scope.errorMessage = 'Please fill all required fields.';
                    return;
                }

                $scope.errorMessage = '';
                $scope.successMessage = '';

                if ($scope.isEditMode) {
                    // Update employee
                    EmployeeService.update($scope.formData.EmployeeID, $scope.formData).then(
                        function(response) {
                            $scope.successMessage = 'Employee updated successfully!';
                            $scope.closeModal();
                            $scope.loadEmployees();
                        },
                        function(error) {
                            $scope.errorMessage = 'Failed to update employee. ' + (error.data?.message || '');
                            console.error('Error updating employee:', error);
                        }
                    );
                } else {
                    // Add new employee
                    EmployeeService.create($scope.formData).then(
                        function(response) {
                            $scope.successMessage = 'Employee added successfully!';
                            $scope.closeModal();
                            $scope.loadEmployees();
                        },
                        function(error) {
                            $scope.errorMessage = 'Failed to add employee. ' + (error.data?.message || '');
                            console.error('Error adding employee:', error);
                        }
                    );
                }
            };

            /**
             * Delete Employee
             */
            $scope.deleteEmployee = function(employeeId) {
                if (confirm('Are you sure you want to delete this employee?')) {
                    $scope.errorMessage = '';
                    $scope.successMessage = '';

                    EmployeeService.delete(employeeId).then(
                        function(response) {
                            $scope.successMessage = 'Employee deleted successfully!';
                            $scope.loadEmployees();
                        },
                        function(error) {
                            $scope.errorMessage = 'Failed to delete employee. ' + (error.data?.message || '');
                            console.error('Error deleting employee:', error);
                        }
                    );
                }
            };

            // Load employees on controller initialization
            $scope.loadEmployees();
        }
    ]);
