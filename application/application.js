import $ from 'jquery';
import _ from 'lodash';
import Radio from 'backbone.radio';
import {Application} from 'backbone.marionette';
import LayoutView from './layout';

let routerChannel = Radio.channel('router');

export default Application.extend({
  initialize() {
    this.$body = $(document.body);
    this.layout = new LayoutView();
    this.layout.render();

    this.listenTo(routerChannel, {
      'before:enter:route' : this.onBeforeEnterRoute,
      'enter:route'        : this.onEnterRoute,
      'error:route'        : this.onErrorRoute
    });
  },

  onBeforeEnterRoute() {
    this.transitioning = true;
    _.defer(() => {
      if (this.transitioning) {
        nprogress.start();
      }
    });
  },

  onEnterRoute() {
    this.transitioning = false;
    this.$body.scrollTop(0);
    nprogress.done();
  },

  onErrorRoute() {
    this.transitioning = false;
    nprogress.done(true);
  }
});