/**
 * AngularStrap - Twitter Bootstrap directives for AngularJS
 * @version v0.7.2 - 2013-04-13
 * @link http://mgcrea.github.com/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module("$strap.config", []).value("$strap.config", {}), angular.module("$strap.filters",
  ["$strap.config"]), angular.module("$strap.directives", ["$strap.config"]), angular.module("$strap",
  ["$strap.filters", "$strap.directives", "$strap.config"]), angular.module("$strap.directives").directive("bsAlert",
  ["$parse", "$timeout", "$compile", function(t, e, n) {
    "use strict";
    return{restrict: "A", link: function(e, a, i) {
      var o = t(i.bsAlert), r = (o.assign, o(e));
      i.bsAlert ? e.$watch(i.bsAlert, function(t, o) {
        r = t, a.html((t.title ? "<strong>" + t.title + "</strong>&nbsp;" : "") + t.content || ""), t.closed &&
          a.hide(), n(a.contents())(e), (t.type || o.type) && (o.type && a.removeClass("alert-" + o.type), t.type &&
          a.addClass("alert-" + t.type)), (angular.isUndefined(i.closeButton) ||
          "0" !== i.closeButton && "false" !== i.closeButton) &&
          a.prepend('<button type="button" class="close" data-dismiss="alert">&times;</button>')
      }, !0) : (angular.isUndefined(i.closeButton) || "0" !== i.closeButton && "false" !== i.closeButton) &&
        a.prepend('<button type="button" class="close" data-dismiss="alert">&times;</button>'), a.addClass("alert").alert(), a.hasClass("fade") &&
        (a.removeClass("in"), setTimeout(function() {
          a.addClass("in")
        }));
      var s = i.ngRepeat && i.ngRepeat.split(" in ").pop();
      a.on("close", function(t) {
        var n;
        s ? (t.preventDefault(), a.removeClass("in"), n = function() {
          a.trigger("closed"), e.$parent && e.$parent.$apply(function() {
            for (var t = s.split("."), n = e.$parent, a = 0; t.length > a; ++a)n && (n = n[t[a]]);
            n && n.splice(e.$index, 1)
          })
        }, $.support.transition && a.hasClass("fade") ? a.on($.support.transition.end, n) : n()) :
          r && (t.preventDefault(), a.removeClass("in"), n = function() {
            a.trigger("closed"), e.$apply(function() {
              r.closed = !0
            })
          }, $.support.transition && a.hasClass("fade") ? a.on($.support.transition.end, n) : n())
      })
    }}
  }]), angular.module("$strap.directives").directive("bsButton", ["$parse", "$timeout", function(t) {
    "use strict";
    return{restrict: "A", require: "?ngModel", link: function(e, n, a, i) {
      if (i) {
        n.parent('[data-toggle="buttons-checkbox"], [data-toggle="buttons-radio"]').length || n.attr("data-toggle", "button");
        var o = !!e.$eval(a.ngModel);
        o && n.addClass("active"), e.$watch(a.ngModel, function(t, e) {
          var a = !!t, i = !!e;
          a !== i ? $.fn.button.Constructor.prototype.toggle.call(r) : a && !o && n.addClass("active")
        })
      }
      n.hasClass("btn") || n.on("click.button.data-api", function() {
        n.button("toggle")
      }), n.button();
      var r = n.data("button");
      r.toggle = function() {
        if (!i)return $.fn.button.Constructor.prototype.toggle.call(this);
        var a = n.parent('[data-toggle="buttons-radio"]');
        a.length ? (n.siblings("[ng-model]").each(function(n, a) {
          t($(a).attr("ng-model")).assign(e, !1)
        }), e.$digest(), i.$modelValue || (i.$setViewValue(!i.$modelValue), e.$digest())) : e.$apply(function() {
          i.$setViewValue(!i.$modelValue)
        })
      }
    }}
  }]).directive("bsButtonsCheckbox", ["$parse", function() {
    "use strict";
    return{restrict: "A", require: "?ngModel", compile: function(t) {
      t.attr("data-toggle", "buttons-checkbox").find("a, button").each(function(t, e) {
        $(e).attr("bs-button", "")
      })
    }}
  }]).directive("bsButtonsRadio", ["$timeout", function(t) {
    "use strict";
    return{restrict: "A", require: "?ngModel", compile: function(e, n) {
      return e.attr("data-toggle", "buttons-radio"), n.ngModel || e.find("a, button").each(function(t, e) {
        $(e).attr("bs-button", "")
      }), function(e, n, a, i) {
        i && (t(function() {
          n.find("[value]").button().filter('[value="' + i.$viewValue + '"]').addClass("active")
        }), n.on("click.button.data-api", function(t) {
          e.$apply(function() {
            i.$setViewValue($(t.target).closest("button").attr("value"))
          })
        }), e.$watch(a.ngModel, function(t, i) {
          if (t !== i) {
            var o = n.find('[value="' + e.$eval(a.ngModel) + '"]');
            o.length && o.button("toggle")
          }
        }))
      }
    }}
  }]), angular.module("$strap.directives").directive("bsButtonSelect", ["$parse", "$timeout", function(t) {
  "use strict";
  return{restrict: "A", require: "?ngModel", link: function(e, n, a, i) {
    var o = t(a.bsButtonSelect);
    o.assign, i && (n.text(e.$eval(a.ngModel)), e.$watch(a.ngModel, function(t) {
      n.text(t)
    }));
    var r, s, u, l;
    n.bind("click", function() {
      r = o(e), s = i ? e.$eval(a.ngModel) : n.text(), u = r.indexOf(s), l = u > r.length - 2 ? r[0] : r[u + 1], console.warn(r,
        l), e.$apply(function() {
        n.text(l), i && i.$setViewValue(l)
      })
    })
  }}
}]), angular.module("$strap.directives").directive("bsDatepicker", ["$timeout", "$strap.config", function(t, e) {
  "use strict";
  var n = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? !0 : !1, a = function a(t) {
    return t = t ||
      "en", {"/": "[\\/]", "-": "[-]", ".": "[.]", " ": "[\\s]", dd: "(?:(?:[0-2]?[0-9]{1})|(?:[3][01]{1}))", d: "(?:(?:[0-2]?[0-9]{1})|(?:[3][01]{1}))", mm: "(?:[0]?[1-9]|[1][012])", m: "(?:[0]?[1-9]|[1][012])", DD: "(?:" +
      $.fn.datepicker.dates[t].days.join("|") + ")", D: "(?:" + $.fn.datepicker.dates[t].daysShort.join("|") + ")", MM: "(?:" +
      $.fn.datepicker.dates[t].months.join("|") + ")", M: "(?:" + $.fn.datepicker.dates[t].monthsShort.join("|") +
      ")", yyyy: "(?:(?:[1]{1}[0-9]{1}[0-9]{1}[0-9]{1})|(?:[2]{1}[0-9]{3}))(?![[0-9]])", yy: "(?:(?:[0-9]{1}[0-9]{1}))(?![[0-9]])"}
  }, i = function i(t, e) {
    var n, i = t, o = a(e);
    return n = 0, angular.forEach(o, function(t, e) {
      i = i.split(e).join("${"+n+"}"), n++
    }), n = 0, angular.forEach(o, function(t) {
      i = i.split("${"+n+"}").join(t), n++
    }), RegExp("^" + i + "$", ["i"])
  };
  return{restrict: "A", require: "?ngModel", link: function(t, a, o, r) {
    var s = e.datepicker || {}, u = o.language || s.language || "en", l = o.dateType || s.type || "date", c = o.dateFormat ||
      s.format || $.fn.datepicker.dates[u] && $.fn.datepicker.dates[u].format || "yyyy-mm-dd", d = n ? i("yyyy-mm-dd", u) : i(c, u);
    r && (r.$parsers.unshift(function(t) {
      return t ? "date" === l && angular.isDate(t) ? (r.$setValidity("date", !0), t) : angular.isString(t) && d.test(t) ?
        (r.$setValidity("date", !0), n ? new Date(t) :
          "string" === l ? t : $.fn.datepicker.DPGlobal.parseDate(t, $.fn.datepicker.DPGlobal.parseFormat(c), u)) :
        (r.$setValidity("date", !1), void 0) : (r.$setValidity("date", !0), null)
    }), r.$render = function() {
      return r.$modelValue && a.datepicker("update", r.$modelValue)
    }), n ? a.prop("type", "date").css("-webkit-appearance", "textfield") : (r && a.on("changeDate", function(e) {
      t.$apply(function() {
        r.$setViewValue("string" === l ? a.val() : e.date)
      })
    }), a.attr("data-toggle", "datepicker"), a.datepicker({autoclose: !0, format: c, language: u, forceParse: o.forceParse ||
      !1}), t.$on("$destroy", function() {
      console.warn("$destroy");
      var t = a.data("datepicker");
      t && (t.picker.remove(), a.data("datepicker", null))
    }));
    var p = a.siblings('[data-toggle="datepicker"]');
    p.length && p.on("click", function() {
      a.trigger("focus")
    })
  }}
}]), angular.module("$strap.directives").directive("bsDropdown", ["$parse", "$compile", "$timeout", function(t, e, n) {
  "use strict";
  var a = function(t, e) {
    return e || (e = ['<ul class="dropdown-menu" role="menu" aria-labelledby="drop1">', "</ul>"]), angular.forEach(t,
      function(t, n) {
        if (t.divider)return e.splice(n + 1, 0, '<li class="divider"></li>');
        var i = "<li" + (t.submenu && t.submenu.length ? ' class="dropdown-submenu"' : "") + ">" + '<a tabindex="-1" ng-href="' +
          (t.href || "") + '"' + (t.click ? '" ng-click="' + t.click + '"' : "") + (t.target ? '" target="' + t.target + '"' : "") +
          ">" + (t.text || "") + "</a>";
        t.submenu && t.submenu.length && (i += a(t.submenu).join("\n")), i += "</li>", e.splice(n + 1, 0, i)
      }), e
  };
  return{restrict: "EA", scope: !0, link: function(i, o, r) {
    var s = t(r.bsDropdown), u = s(i);
    n(function() {
      !angular.isArray(u);
      var t = angular.element(a(u).join(""));
      t.insertAfter(o), e(o.next("ul.dropdown-menu"))(i)
    }), o.addClass("dropdown-toggle").attr("data-toggle", "dropdown")
  }}
}]), angular.module("$strap.directives").factory("$modal",
    ["$rootScope", "$compile", "$http", "$timeout", "$q", "$templateCache", function(t, e, n, a, i, o) {
      var r = function r(r) {
        function s(r) {
          r || (r = {});
          var s = r.scope || t.$new(), u = r.template;
          return i.when(o.get(u) || n.get(u, {cache: !0}).then(function(t) {
              return t.data
            })).then(function(t) {
              var n = u.replace(".html", "").replace(/[\/|\.|:]/g, "-") + "-" +
                s.$id, i = $('<div class="modal hide" tabindex="-1"></div>').attr("id", n).addClass("fade").html(t);
              return r.modalClass && i.addClass(r.modalClass), $("body").append(i), a(function() {
                e(i)(s)
              }), s.$modal = function(t) {
                i.modal(t)
              }, s.hide = function() {
                i.modal("hide")
              }, s.show = function() {
                i.modal("show")
              }, s.dismiss = s.hide, angular.forEach(["show", "shown", "hide", "hidden"], function(t) {
                i.on(t, function(e) {
                  s.$emit("modal-" + t, e)
                })
              }), i.on("shown", function() {
                $("input[autofocus]", i).first().trigger("focus")
              }), r.show && i.modal("show"), i
            })
        }

        return new s(r)
      };
      return r
    }]).directive("bsModal", ["$q", "$modal", function(t, e) {
    "use strict";
    return{restrict: "A", scope: !0, link: function(n, a, i) {
      var o = {template: n.$eval(i.bsModal), scope: n, modalClass: i.modalClass || "", backdrop: 1 * i.backdrop || !0, keyboard: 1 *
        i.keyboard || !0, show: 1 * i.show || !1};
      t.when(e(o)).then(function(t) {
        a.attr("data-target", "#" + t.attr("id")).attr("data-toggle", "modal")
      })
    }}
  }]), angular.module("$strap.directives").directive("bsNavbar", ["$location", function(t) {
  "use strict";
  return{restrict: "A", link: function(e, n) {
    e.$watch(function() {
      return t.path()
    }, function(t) {
      $("li[data-match-route]", n).each(function(e, n) {
        var a = angular.element(n), i = a.attr("data-match-route"), o = RegExp("^" + i + "$", ["i"]);
        o.test(t) ? a.addClass("active") : a.removeClass("active")
      })
    })
  }}
}]), angular.module("$strap.directives").directive("bsPopover",
  ["$parse", "$compile", "$http", "$timeout", "$q", "$templateCache", function(t, e, n, a, i, o) {
    "use strict";
    return $("body").on("keyup", function(t) {
      27 === t.keyCode && $(".popover.in").each(function() {
        $(this).popover("hide")
      })
    }), {restrict: "A", scope: !0, link: function(a, r, s) {
      var u = t(s.bsPopover), l = (u.assign, u(a)), c = {};
      angular.isObject(l) && (c = l), i.when(c.content || o.get(l) || n.get(l, {cache: !0})).then(function(t) {
        angular.isObject(t) && (t = t.data), s.unique && r.on("show", function() {
          $(".popover.in").each(function() {
            var t = $(this), e = t.data("popover");
            e && !e.$element.is(r) && t.popover("hide")
          })
        }), s.hide && a.$watch(s.hide, function(t, e) {
          t ? n.hide() : t !== e && n.show()
        }), r.popover(angular.extend({}, c, {content: t, html: !0}));
        var n = r.data("popover");
        n.hasContent = function() {
          return this.getTitle() || t
        }, n.getPosition = function() {
          var t = $.fn.popover.Constructor.prototype.getPosition.apply(this, arguments);
          return e(this.$tip)(a), a.$digest(), this.$tip.data("popover", this), t
        }, a._popover = function(t) {
          r.popover(t)
        }, a.hide = function() {
          r.popover("hide")
        }, a.show = function() {
          r.popover("show")
        }, a.dismiss = a.hide
      })
    }}
  }]), angular.module("$strap.directives").directive("bsSelect", ["$timeout", function(t) {
  "use strict";
  return{restrict: "A", require: "?ngModel", link: function(e, n, a, i) {
    var o = e.$eval(a.bsSelect) || {};
    t(function() {
      n.selectpicker(o), n.next().removeClass("ng-scope")
    }), i && e.$watch(a.ngModel, function(t, e) {
      t !== e && n.selectpicker("refresh")
    })
  }}
}]), angular.module("$strap.directives").directive("bsTabs", ["$parse", "$compile", "$timeout", function(t, e, n) {
  "use strict";
  var a = '<div class="tabs"><ul class="nav nav-tabs"><li ng-repeat="pane in panes" ng-class="{active:pane.active}"><a data-target="#{{pane.id}}" data-index="{{$index}}" data-toggle="tab">{{pane.title}}</a></li></ul><div class="tab-content" ng-transclude></div>';
  return{restrict: "A", require: "?ngModel", priority: 0, scope: !0, template: a, replace: !0, transclude: !0, compile: function() {
    return function(e, a, i, o) {
      var r = t(i.bsTabs);
      r.assign, r(e), e.panes = [];
      var s, u, l, c = a.find("ul.nav-tabs"), d = a.find("div.tab-content"), p = 0;
      n(function() {
        d.find("[data-title], [data-tab]").each(function(t) {
          var n = angular.element(this);
          s = "tab-" + e.$id + "-" + t, u = n.data("title") || n.data("tab"), l = !l && n.hasClass("active"), n.attr("id",
            s).addClass("tab-pane"), i.fade &&
            n.addClass("fade"), e.panes.push({id: s, title: u, content: this.innerHTML, active: l})
        }), e.panes.length && !l && (d.find(".tab-pane:first").addClass("active" + (i.fade ? " in" : "")), e.panes[0].active = !0)
      }), o && (a.on("show", function(t) {
        var n = $(t.target);
        e.$apply(function() {
          o.$setViewValue(n.data("index"))
        })
      }), e.$watch(i.ngModel, function(t) {
        angular.isUndefined(t) || (p = t, setTimeout(function() {
          var e = c.find("li:eq(" + 1 * t + ")");
          e.hasClass("active") || e.children("a").tab("show")
        }))
      }))
    }
  }}
}]), angular.module("$strap.directives").directive("bsTimepicker", ["$timeout", function(t) {
  "use strict";
  var e = "((?:(?:[0-1][0-9])|(?:[2][0-3])|(?:[0-9])):(?:[0-5][0-9])(?::[0-5][0-9])?(?:\\s?(?:am|AM|pm|PM))?)";
  return{restrict: "A", require: "?ngModel", link: function(n, a, i, o) {
    o && a.on("changeTime.timepicker", function() {
      t(function() {
        o.$setViewValue(a.val())
      })
    });
    var r = RegExp("^" + e + "$", ["i"]);
    o.$parsers.unshift(function(t) {
      return!t || r.test(t) ? (o.$setValidity("time", !0), t) : (o.$setValidity("time", !1), void 0)
    }), a.attr("data-toggle", "timepicker"), a.parent().addClass("bootstrap-timepicker"), a.timepicker();
    var s = a.data("timepicker"), u = a.siblings('[data-toggle="timepicker"]');
    u.length && u.on("click", $.proxy(s.showWidget, s))
  }}
}]), angular.module("$strap.directives").directive("bsTooltip", ["$parse", "$compile", function(t) {
  "use strict";
  return{restrict: "A", scope: !0, link: function(e, n, a) {
    var i = t(a.bsTooltip), o = (i.assign, i(e));
    e.$watch(a.bsTooltip, function(t, e) {
      t !== e && (o = t)
    }), a.unique && n.on("show", function() {
      $(".tooltip.in").each(function() {
        var t = $(this), e = t.data("tooltip");
        e && !e.$element.is(n) && t.tooltip("hide")
      })
    }), n.tooltip({title: function() {
      return angular.isFunction(o) ? o.apply(null, arguments) : o
    }, html: !0});
    var r = n.data("tooltip");
    r.show = function() {
      var t = $.fn.tooltip.Constructor.prototype.show.apply(this, arguments);
      return this.tip().data("tooltip", this), t
    }, e._tooltip = function(t) {
      n.tooltip(t)
    }, e.hide = function() {
      n.tooltip("hide")
    }, e.show = function() {
      n.tooltip("show")
    }, e.dismiss = e.hide
  }}
}]), angular.module("$strap.directives").directive("bsTypeahead", ["$parse", function(t) {
  "use strict";
  return{restrict: "A", require: "?ngModel", link: function(e, n, a, i) {
    var o = t(a.bsTypeahead), r = (o.assign, o(e));
    e.$watch(a.bsTypeahead, function(t, e) {
      t !== e && (r = t)
    }), n.attr("data-provide", "typeahead"), n.typeahead({source: function() {
      return angular.isFunction(r) ? r.apply(null, arguments) : r
    }, minLength: a.minLength || 1, items: a.items, updater: function(t) {
      return i && e.$apply(function() {
        i.$setViewValue(t)
      }), e.$emit("typeahead-updated", t), t
    }});
    var s = n.data("typeahead");
    s.lookup = function() {
      var t;
      return this.query = this.$element.val() || "", this.query.length < this.options.minLength ? this.shown ? this.hide() : this :
        (t = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source, t ? this.process(t) :
          this)
    }, "0" === a.minLength && setTimeout(function() {
      n.on("focus", function() {
        0 === n.val().length && setTimeout(n.typeahead.bind(n, "lookup"), 200)
      })
    })
  }}
}]);

