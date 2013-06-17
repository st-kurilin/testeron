function Ctrl2($scope) {
    $scope.format = 'M/d/yy h:mm:ss a';
}


angular.module('global', [])
    .directive('story',function factory() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: function ($rootScope, $scope, $element, $http, storyService) {
                $scope.form = {};
                $scope.create = function () {
                    storyService.addStory($scope.form, function () {
                        $scope.form = {};
                    });
                    return false;
                };
            },
            templateUrl: 'story.html',
            replace: true
        };
    }).directive('storylist',function factory() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: function ($scope) {
                $scope.stories = {};
                $scope.$on('stories_updated', function (event, stories) {
                    console.log('story list updated'  + stories.length);
                    $scope.stories = stories
                })
            },
            template: "<ul> \
                            <li ng-repeat='story in stories'> \
                                {{story.title}}\
                            </li>\
                        </ul>",
            replace: true
        };
    }).service('storyService', function ($rootScope, $http) {
        var stories = [];
        $http.get('stories', {}).success(function (data) {
            console.log("init by: " + JSON.stringify(data));
            stories = data;
            updated();
        });
        function updated() {
            $rootScope.$broadcast('stories_updated', stories)
        }

        return {
            addStory: function (story, callback) {
                $http.post('main.html', story).success(function (response) {
                    stories.push(story);
                    console.log("current stories: " + $rootScope.stories);
                    if (callback != null)callback();
                    updated();
                });
            },
            getStories: function () {
                return stories
            }
        }
    });