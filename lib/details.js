var module = angular.module('fortune', []);

/**
 * @ngdoc directive
 * @name  details
 *
 * @description
 * The `details` directive serves as a polyfill for the details HTML5 element.
 * The details element behaves by default by showing the summary element but
 * none of the other children elements. Once the summary element is clicked,
 * the others are then shown. In supported browsers, this happens without
 * JavaScript. Currently only Webkit browsers support the element.
 */
module.directive('details', function ($compile) {
  return {
    restrict: 'E',
    compile: function (el, attrs) {
      // if the browser supports the details element, don't do anything
      // if (Modernizr.details) return;

      // find and remove the summary element
      var summary = el.find('summary').remove(),
          summaryReplacement = angular.element('<div></div>')
              .append(summary.html()),
          // surround children by a div to control hide and show
          wrapped = angular.element('<div></div>').append(el.html()),
          detailsReplacement = angular.element('<div></div>')
              .append(summaryReplacement).append(wrapped);

      el.replaceWith(detailsReplacement);

      // FIXME: if the open attribute is filled in, it is always true
      if (!attrs.open) {
        // hide all except summary
        wrapped.addClass('ng-hide');
      }

      summaryReplacement.on('click', function () {
        // either show or hide all children elements besides the summary
        wrapped.toggleClass('ng-hide');
      });
    }
  };
});