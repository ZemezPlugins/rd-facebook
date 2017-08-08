/**
 * @module       RDFacebookFeed
 * @author       Rafael Shayvolodyan
 * @see          https://ua.linkedin.com/in/rafael-shayvolodyan-3a297b96
 * @version      1.0.3
 */

(function() {
  (function($, document, window) {

    /**
     * Creates a RDFacebookFeed.
     * @class RDFacebookFeed.
     * @public
     * @param {HTMLElement} element - The element to create the RDFacebookFeed for.
     * @param {Object} [options] - The options
     */
    var RDFacebookFeed;
    RDFacebookFeed = (function() {

      /**
       * Default options for RDFacebookFeed.
       * @public
       */
      RDFacebookFeed.prototype.Defaults = {
        id: '',
        accessToken: '',
        showLog: false,
        dateFormat: {
          seconds: 'less than a minute ago',
          minute: 'about a minute ago',
          minutes: ' minutes ago',
          hour: 'about an hour ago',
          hours: ' hours ago',
          day: '1 day ago',
          days: '%b/%d/%Y'
        },
        callbacks: {
          userLoaded: false,
          postsLoaded: false
        }
      };

      function RDFacebookFeed(element, options) {
        this.options = $.extend(true, {}, this.Defaults, options);
        this.element = element;
        this.$element = $(element);
        this.$win = $(window);
        this.$doc = $(document);
        this.$items = this.$element.find('[data-fb-post]');
        this.$user = this.$element.find('[data-fb-user]');
        this.initialize();
      }


      /**
       * Initializes the RD Facebook Feed.
       * @protected
       */

      RDFacebookFeed.prototype.initialize = function() {
        var access, ctx, graphPOSTS, graphUSER, id, id2, limit, pageType;
        ctx = this;
        id = this.element.getAttribute('data-fb-id') ? this.element.getAttribute('data-fb-id') : this.options.id;
        id2 = this.element.getAttribute('data-fb-id') ? this.element.getAttribute('data-fb-id') : this.options.id;
        access = this.element.getAttribute('data-fb-access') ? this.element.getAttribute('data-fb-access') : this.options.accessToken;
        if (!id) {
          throw new Error('You need to provide an user/page id!');
        }
        if (!access) {
          throw new Error('You need to provide an access token!');
        }
        limit = ctx.$items.length;
        pageType = this.element.getAttribute('data-fb-page-type');
        queryModificator = 'posts';
        switch(pageType){
          case 'user':
            queryModificator = 'me/feed';
            id = '';
            id2 = 'me';

            break;
          case 'group':
            queryModificator = 'feed';
            break;
        }
        graphUSER = 'https://graph.facebook.com/v2.9/' + id2 + '/?fields=name,picture&access_token=' + access + '';
        graphPOSTS = 'https://graph.facebook.com/v2.9/' + id + '/' + queryModificator + '/?fields=message,picture,likes,actions,comments,name,created_time&access_token=' + access + '&date_format=U&limit=' + 20;
        $.when($.getJSON(graphUSER), $.getJSON(graphPOSTS)).done(function(user, posts) {
          var fb, showLog;
          showLog = ctx.element.getAttribute('data-fb-showlog') === 'true' ? ctx.element.getAttribute('data-fb-showlog') : ctx.options.showLog;
          if (showLog) {
            console.log('User: ');
            console.log(user[0]);
            console.log('Posts: ');
            console.log(posts[0].data);
          }
          fb = {
            user: user[0],
            posts: []
          };
          $.each(posts[0].data, function() {
            var comment, j, len, ref;
            if (!this.message) {
              return true;
            }

            this.from = {};
            if (fb.user.picture) {
              this.from.picture = fb.user.picture.data.url;
            };
            this.from.name = fb.user.name;
            this.message = ctx.urlHyperlinks(this.message);
            if (this.likes) {
              this.likes.count = this.likes.data.length;
            } else {
              this['likes'] = [];
              this.likes.count = 0;
            }
            if (this.comments) {
              this.comments.count = this.comments.data.length;
            } else {
              this['comments'] = [];
              this.comments.count = 0;
            }
            if (this.actions != null) {
              if ((this.actions[0] != null) && this.actions[0].name === 'Share') {
                this.postlink = this.actions[0].link;
              }
            } else {
              this.postlink = this.link;
            }
            if (this.comments.data != null) {
              ref = this.comments.data;
              for (j = 0, len = ref.length; j < len; j++) {
                comment = ref[j];
                comment.from.link = 'https://facebook.com/' + comment.from.id;
              }
            }
            fb.posts.push(this);
          });
          ctx.loopData(fb.user, true);
          ctx.loopData(fb.posts, false);
        });
      };


      /**
       * Formating a date
       * @protected
       * @param {Object} twt_date - Twitter date.
       * @param {Boolean} datetime - if true value will be converted to datetime attribute format (for tag time).
       */

      RDFacebookFeed.prototype.dating = function(time, datetime) {
        var _date, current, date, datef, delta, format, formats, j, k, len, len1, months;
        date = new Date(time * 1000);
        current = new Date();
        delta = parseInt((current.getTime() - date.getTime()) / 1000);
        delta += (-120 - current.getTimezoneOffset()) * 60;
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        _date = {
          '%d': date.getDate(),
          '%m': date.getMonth() + 1,
          '%b': months[date.getMonth()].substring(0, 3),
          '%B': months[date.getMonth()],
          '%y': String(date.getFullYear()).slice(-2),
          '%Y': date.getFullYear()
        };
        if (datetime) {
          datef = '%Y-%m-%d';
          formats = datef.match(/%[dmbByY]/g);
          for (j = 0, len = formats.length; j < len; j++) {
            format = formats[j];
            datef = datef.replace(format, _date[format]);
          }
          return datef;
        } else {
          datef = this.element.getAttribute('data-fb-date-format') ? this.element.getAttribute('data-fb-date-format') : this.options.dateFormat.days;
        }
        if (delta < 60) {
          return this.options.dateFormat.seconds;
        } else if (delta < 120) {
          return this.options.dateFormat.minute;
        } else if (delta < (60 * 60)) {
          return (parseInt(delta / 60)).toString() + this.options.dateFormat.minutes;
        } else if (delta < (120 * 60)) {
          return this.options.dateFormat.hour;
        } else if (delta < (24 * 60 * 60)) {
          return 'about ' + (parseInt(delta / 3600)).toString() + this.options.dateFormat.hours;
        } else if (delta < (48 * 60 * 60)) {
          return this.options.dateFormat.day;
        } else {
          formats = datef.match(/%[dmbByY]/g);
          for (k = 0, len1 = formats.length; k < len1; k++) {
            format = formats[k];
            datef = datef.replace(format, _date[format]);
          }
          return datef;
        }
      };


      /**
       * Wrap all links in string with tag 'A'
       * @protected
       * @param {Array} str - string for parse.
       */

      RDFacebookFeed.prototype.urlHyperlinks = function(str) {
        return str.replace(/\b((http|https):\/\/\S+)/g, '<a href="$1" target="_blank">$1</a>');
      };


      /**
       * Loop html elements for attribute parsing
       * @protected
       * @param {Array} data - Facebook response object.
       * @param {Boolean} isUser - flag for checking is data about user or posts.
       */

      RDFacebookFeed.prototype.loopData = function(data, isUser) {
        var ctx, i, indexes;
        ctx = this;
        if (ctx.interval != null) {
          clearInterval(ctx.interval);
        }
        if (isUser) {
          ctx.$user.find('*').each(function() {
            return ctx.parseAttributes(this, data, 0);
          });
          if (ctx.options.callbacks.userLoaded) {
            ctx.options.callbacks.userLoaded.call(this, ctx);
          }
        } else {
          if (Array.isArray(data)) {
            i = 0;
            while (i < data.length) {
              indexes = {
                likes: -1,
                comments: -1
              };
              ctx.$items.eq(i).find('*').each(function() {
                if (ctx.checkAttribute(this, 'data-fb-like')) {
                  indexes.likes++;
                  return;
                }
                if (ctx.checkAttribute(this, 'data-fb-comment')) {
                  indexes.comments++;
                  return;
                }
                if (ctx.checkAttribute(this, 'data-likes')) {
                  ctx.parseAttributes(this, data[i], indexes.likes);
                } else if (ctx.checkAttribute(this, 'data-comments')) {
                  ctx.parseAttributes(this, data[i], indexes.comments);
                } else {
                  ctx.parseAttributes(this, data[i], 0);
                }
              });
              i++;
            }
          }
          if (ctx.options.callbacks.postsLoaded) {
            ctx.options.callbacks.postsLoaded.call(this, ctx);
          }
        }
      };


      /**
       * Checks for the presence of an element attribute
       * @protected
       * @param {DOM Element Object} el - HTML element.
       * @param {String} attribute - attribute name.
       */

      RDFacebookFeed.prototype.checkAttribute = function(el, attribute) {
        var attr, j, len, ref;
        ref = el.attributes;
        for (j = 0, len = ref.length; j < len; j++) {
          attr = ref[j];
          if (attr.name.indexOf(attribute) > -1) {
            return true;
          }
        }
        return false;
      };


      /**
       * Parse element attributes and replace it
       * @protected
       * @param {DOM Element Object} el - HTML element.
       * @param {JSON Object} json - attribute name.
       * @param {Integer} index - index for likes, comments.
       */

      RDFacebookFeed.prototype.parseAttributes = function(el, json, index) {
        var attr, attributes, dataArr, dataEl, date, j, k, len, len1, temp, tmp, value, valueArr, valueIndex;
        dataArr = el.attributes;
        for (dataEl in dataArr) {
          if (dataArr[dataEl].name && dataArr[dataEl].name.substring(0, 6) === "data-x") {
            continue;
          }
          if ((dataArr[dataEl] != null) && dataArr[dataEl].name !== 'data-remove' && typeof dataArr[dataEl] === 'object' && dataArr[dataEl].name.indexOf('data-') !== -1 && dataArr[dataEl].name.indexOf('data-fb-') === -1) {
            valueIndex = dataArr[dataEl].name.substring(5);
            value = null;
            if (valueIndex.indexOf('-') !== -1) {
              valueArr = valueIndex.split('-');
              value = json;
              for (j = 0, len = valueArr.length; j < len; j++) {
                tmp = valueArr[j];
                if (tmp === 'data' && (value[tmp] != null) && (value[tmp][index] != null)) {
                  value = value[tmp][index];
                } else if (value[tmp] != null) {
                  value = value[tmp];
                } else {
                  if (el.hasAttribute('data-remove')) {
                    $(el).remove();
                  } else {
                    continue;
                  }
                }
              }
            }
            if (typeof dataArr[dataEl].value === 'string') {
              attributes = dataArr[dataEl].value.split(/\s?,\s?/i);
              if (value != null) {
                temp = value;
              } else if (json[valueIndex] != null) {
                temp = json[valueIndex];
              }
              if (valueIndex.indexOf('created_time') !== -1) {
                date = temp;
              }
              if ((temp != null) && (attributes != null) && (typeof temp === 'string' || typeof temp === 'number')) {
                for (k = 0, len1 = attributes.length; k < len1; k++) {
                  attr = attributes[k];
                  if (valueIndex.indexOf('created_time') !== -1) {
                    if (attr === 'datetime') {
                      temp = this.dating(date, true);
                    } else {
                      temp = this.dating(date, false);
                    }
                  }
                  if (attr.toLowerCase() === 'text') {
                    el.innerHTML = temp;
                  } else {
                    el.setAttribute(attr, temp);
                  }
                }
              }
            }
          }
        }
      };


      /**
       * Gets specific option of plugin
       * @protected
       */

      RDFacebookFeed.prototype.getOption = function(key) {
        var point, targetPoint;
        if (this.options.responsive != null) {
          for (point in this.options.responsive) {
            if (point <= window.innerWidth) {
              targetPoint = point;
            }
          }
          if (this.options.responsive[targetPoint][key] != null) {
            return this.options.responsive[targetPoint][key];
          } else {
            return this.options[key];
          }
        } else {
          return this.options[key];
        }
      };

      return RDFacebookFeed;

    })();

    /**
     * The jQuery Plugin for the RD Facebook Feed
     * @public
     */
    $.fn.extend({
      RDFacebookFeed: function(options) {
        return this.each(function() {
          var $this;
          $this = $(this);
          if (!$this.data('RDFacebookFeed')) {
            return $this.data('RDFacebookFeed', new RDFacebookFeed(this, options));
          }
        });
      }
    });
    return window.RDFacebookFeed = RDFacebookFeed;
  })(window.jQuery, document, window);


  /**
   * The Plugin AMD export
   * @public
   */

  if (typeof module !== "undefined" && module !== null) {
    module.exports = window.RDFacebookFeed;
  } else if (typeof define === 'function' && define.amd) {
    define(["jquery"], function() {
      'use strict';
      return window.RDFacebookFeed;
    });
  }

}).call(this);