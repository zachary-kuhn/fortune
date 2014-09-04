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
      if (Modernizr.details) return;

      /*
        Just a note, styles are handled inline here so the end user doesn't
        need to include a stylesheet. Hopefully you will agree with me that this
        is a necessary evil.
       */

      var isOpen = Boolean(attrs.open);

      // find and remove the summary element
      var summary = el.find('summary').remove().css('display', 'block'),
          summaryReplacement = angular.element('<div></div>')
              .append(summary.html()),
          // surround children by a div to control hide and show
          wrapped = angular.element('<div></div>').append(el.html());

      // add a triangle in front of summary
      var triangle = angular.element('<span></span>').css({
        display: 'inline-block',
        position: 'relative',
        'margin-right': '16px'
      });

      var closed = {
          'border-top': '4.5px solid transparent',
          'border-right': 'none',
          'border-bottom': '4.5px solid transparent',
          'border-left': '9px solid black'
        }, opened = {
          'border-top': '9px solid black',
          'border-right': '4.5px solid transparent',
          'border-bottom': 'none',
          'border-left': '4.5px solid transparent'
        };

      /**
       * Update the display of the details element based on the current state.
       */
      function updateDisplay() {
        // FIXME: if the open attribute is filled in, it is always true
        if (isOpen) {
          wrapped.removeClass('ng-hide');

          triangle.css(opened);
        } else {
          // hide all except summary
          wrapped.addClass('ng-hide');

          triangle.css(closed);
        }
      }

      updateDisplay();

      el.empty().append(summary.prepend(triangle)).append(wrapped);

      summary.on('click', function () {
        // either show or hide all children elements besides the summary
        isOpen = !isOpen;

        updateDisplay();
      });
    }
  };
});