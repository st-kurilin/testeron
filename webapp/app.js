function Ctrl2($scope) {
    $scope.format = 'M/d/yy h:mm:ss a';
}

angular.module('global', [])
    .directive('story', function factory() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: function($scope, $element, $http) {
                $scope.form = {};
                $scope.create = function() {
                    $http.post('main.html', $scope.form).success(function(response)
                    {
                    });
                };
            },
            templateUrl : 'story.html',
            replace : true
        };
    }).directive('storylist', function factory() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: function($scope, $element, $http) {
                $scope.stories = {};
                $http.get('stories', {}).success(function(response){
                    $scope.stories = response;
                });

            },
            template : "<ul> \
                            <li ng-repeat='story in stories'> \
                                {{story.title}}\
                            </li>\
                        </ul>",
            replace : true
        };
    })
