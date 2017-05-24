
App.directive('amChart', ['$timeout', function ($timeout) {
      return {
          restrict: 'AE',
          replace: true,
          template: '<div class="amchart chart-responsive"></div>',
          scope: {
              options: '=',
              height: '@',
              width: '@',
          },
          link: function ($scope, element, attrs) {

              var height = $scope.dheight || '100%';
              var width = $scope.width || '100%';

              element.css({
                  'height': height,
                  'width': width
              });

              var getIdForUseInAmCharts = function () {
                  var id = $scope.id;// try to use existing outer id to create new id

                  if (!id) {//generate a UUID
                      var guid = function guid() {
                          function s4() {
                              return Math.floor((1 + Math.random()) * 0x10000)
                                  .toString(16)
                                  .substring(1);
                          }

                          return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                              s4() + '-' + s4() + s4() + s4();
                      };
                      id = guid();
                  }
                  return id;
              }
              var id = $scope.id || getIdForUseInAmCharts();
              element.attr('id', id);

              var chart;
              $scope.$watch("options", function (newValue) {
                 // if (!angular.equals(newValue, oldValue))
                      loadgraph(newValue);
              });
             

              var loadgraph = function (data) {

                  if (data != null) {
                      
                      if (chart != null)
                          chart.clear();

                      chart = AmCharts.makeChart(id, data);
                      // define an event to catch all click events on th emap
                      //chart.addListener("click", function (event) {
                      //    // find out the coordinates of under mouse cursor
                      //    var info = event.chart.getDevInfo();
                      //    $scope.change(info);
                      //});
                  }

              }


              
              
               $scope.$on("$destroy", function () {
                  // Remove jQuery plugin from element to prevent memory leaks
                  // If your plugin doesn't have a remove function its probably not well suited to persistent javascript environments
                   if(chart != null)
                   chart.clear();
               });

                
         }
      }
   }]);