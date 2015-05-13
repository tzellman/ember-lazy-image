import Ember           from 'ember';
import ImageLoadMixin  from '../mixins/image-load';
import LazyImageMixin  from '../mixins/lazy-image';
import InViewportMixin from 'ember-in-viewport';

var on        = Ember.on;
var get       = Ember.get;
var set       = Ember.set;
var keys      = Ember.keys;
var computed  = Ember.computed;
var dasherize = Ember.String.dasherize;
var Component = Ember.Component;
var forEach   = Ember.EnumerableUtils.forEach;

export default Component.extend(InViewportMixin, ImageLoadMixin, LazyImageMixin, {
  classNames: ['lazy-image-container'],

  concatenatedProperties: ['class'],

  class: ['lazy-image'],

  _classJoin: on('init', function() {
    var classArray = get(this, 'class');
    set(this, 'class', classArray.join(' '));
  }),

  _setupAttributes: function() {
    var img       = this.$('img');
    var component = this;

    forEach(keys(component), function(key) {
      if (key.substr(0, 5) === 'data-' && !key.match(/Binding$/)) {
        img.attr(key, component.get(key));
      }
    });
  },

  useDimensionsAttrs: computed('width', 'height', function() {
    return ! this.get('width') || ! this.get('height') ? false : true;
  })
});
