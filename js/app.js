(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
        ? t(exports, require("jquery"))
        : "function" == typeof define && define.amd
        ? define(["exports", "jquery"], t)
        : ((e = "undefined" != typeof globalThis ? globalThis : e || self), t((e.adminlte = {}), e.jQuery));
})(this, function (e, t) {
    "use strict";
    function a(e) {
        return e && "object" == typeof e && "default" in e ? e : { default: e };
    }
    var n = a(t),
        i = "CardRefresh",
        o = "lte.cardrefresh",
        l = "." + o,
        s = n.default.fn[i],
        r = "loaded" + l,
        d = "overlay.added" + l,
        f = "overlay.removed" + l,
        u = "card",
        c = "." + u,
        h = '[data-card-widget="card-refresh"]',
        g = {
            source: "",
            sourceSelector: "",
            params: {},
            trigger: h,
            content: ".card-body",
            loadInContent: !0,
            loadOnInit: !0,
            loadErrorTemplate: !0,
            responseType: "",
            overlayTemplate: '<div class="overlay"><i class="fas fa-2x fa-sync-alt fa-spin"></i></div>',
            errorTemplate: '<span class="text-danger"></span>',
            onLoadStart: function () {},
            onLoadDone: function (e) {
                return e;
            },
            onLoadFail: function (e, t, a) {},
        },
        p = (function () {
            function e(e, t) {
                if (
                    ((this._element = e),
                    (this._parent = e.parents(c).first()),
                    (this._settings = n.default.extend({}, g, t)),
                    (this._overlay = n.default(this._settings.overlayTemplate)),
                    e.hasClass(u) && (this._parent = e),
                    "" === this._settings.source)
                )
                    throw new Error("Source url was not defined. Please specify a url in your CardRefresh source option.");
            }
            var t = e.prototype;
            return (
                (t.load = function () {
                    var e = this;
                    this._addOverlay(),
                        this._settings.onLoadStart.call(n.default(this)),
                        n.default
                            .get(
                                this._settings.source,
                                this._settings.params,
                                function (t) {
                                    e._settings.loadInContent && ("" !== e._settings.sourceSelector && (t = n.default(t).find(e._settings.sourceSelector).html()), e._parent.find(e._settings.content).html(t)),
                                        e._settings.onLoadDone.call(n.default(e), t),
                                        e._removeOverlay();
                                },
                                "" !== this._settings.responseType && this._settings.responseType
                            )
                            .fail(function (t, a, i) {
                                if ((e._removeOverlay(), e._settings.loadErrorTemplate)) {
                                    var o = n.default(e._settings.errorTemplate).text(i);
                                    e._parent.find(e._settings.content).empty().append(o);
                                }
                                e._settings.onLoadFail.call(n.default(e), t, a, i);
                            }),
                        n.default(this._element).trigger(n.default.Event(r));
                }),
                (t._addOverlay = function () {
                    this._parent.append(this._overlay), n.default(this._element).trigger(n.default.Event(d));
                }),
                (t._removeOverlay = function () {
                    this._parent.find(this._overlay).remove(), n.default(this._element).trigger(n.default.Event(f));
                }),
                (t._init = function () {
                    var e = this;
                    n
                        .default(this)
                        .find(this._settings.trigger)
                        .on("click", function () {
                            e.load();
                        }),
                        this._settings.loadOnInit && this.load();
                }),
                (e._jQueryInterface = function (t) {
                    var a = n.default(this).data(o),
                        i = n.default.extend({}, g, n.default(this).data());
                    a || ((a = new e(n.default(this), i)), n.default(this).data(o, "string" == typeof t ? a : t)), "string" == typeof t && /load/.test(t) ? a[t]() : a._init(n.default(this));
                }),
                e
            );
        })();
    n.default(document).on("click", h, function (e) {
        e && e.preventDefault(), p._jQueryInterface.call(n.default(this), "load");
    }),
        n.default(function () {
            n.default(h).each(function () {
                p._jQueryInterface.call(n.default(this));
            });
        }),
        (n.default.fn[i] = p._jQueryInterface),
        (n.default.fn[i].Constructor = p),
        (n.default.fn[i].noConflict = function () {
            return (n.default.fn[i] = s), p._jQueryInterface;
        });
    var m = "CardWidget",
        v = "lte.cardwidget",
        _ = "." + v,
        b = n.default.fn[m],
        C = "expanded" + _,
        y = "collapsed" + _,
        w = "maximized" + _,
        x = "minimized" + _,
        I = "removed" + _,
        T = "card",
        S = "collapsed-card",
        j = "collapsing-card",
        k = "expanding-card",
        Q = "was-collapsed",
        H = "maximized-card",
        z = '[data-card-widget="remove"]',
        E = '[data-card-widget="collapse"]',
        F = '[data-card-widget="maximize"]',
        D = "." + T,
        L = ".card-header",
        R = ".card-body",
        A = ".card-footer",
        M = { animationSpeed: "normal", collapseTrigger: E, removeTrigger: z, maximizeTrigger: F, collapseIcon: "fa-minus", expandIcon: "fa-plus", maximizeIcon: "fa-expand", minimizeIcon: "fa-compress" },
        q = (function () {
            function e(e, t) {
                (this._element = e), (this._parent = e.parents(D).first()), e.hasClass(T) && (this._parent = e), (this._settings = n.default.extend({}, M, t));
            }
            var t = e.prototype;
            return (
                (t.collapse = function () {
                    var e = this;
                    this._parent
                        .addClass(j)
                        .children(R + ", " + A)
                        .slideUp(this._settings.animationSpeed, function () {
                            e._parent.addClass(S).removeClass(j);
                        }),
                        this._parent
                            .find("> " + L + " " + this._settings.collapseTrigger + " ." + this._settings.collapseIcon)
                            .addClass(this._settings.expandIcon)
                            .removeClass(this._settings.collapseIcon),
                        this._element.trigger(n.default.Event(y), this._parent);
                }),
                (t.expand = function () {
                    var e = this;
                    this._parent
                        .addClass(k)
                        .children(R + ", " + A)
                        .slideDown(this._settings.animationSpeed, function () {
                            e._parent.removeClass(S).removeClass(k);
                        }),
                        this._parent
                            .find("> " + L + " " + this._settings.collapseTrigger + " ." + this._settings.expandIcon)
                            .addClass(this._settings.collapseIcon)
                            .removeClass(this._settings.expandIcon),
                        this._element.trigger(n.default.Event(C), this._parent);
                }),
                (t.remove = function () {
                    this._parent.slideUp(), this._element.trigger(n.default.Event(I), this._parent);
                }),
                (t.toggle = function () {
                    this._parent.hasClass(S) ? this.expand() : this.collapse();
                }),
                (t.maximize = function () {
                    this._parent
                        .find(this._settings.maximizeTrigger + " ." + this._settings.maximizeIcon)
                        .addClass(this._settings.minimizeIcon)
                        .removeClass(this._settings.maximizeIcon),
                        this._parent
                            .css({ height: this._parent.height(), width: this._parent.width(), transition: "all .15s" })
                            .delay(150)
                            .queue(function () {
                                var e = n.default(this);
                                e.addClass(H), n.default("html").addClass(H), e.hasClass(S) && e.addClass(Q), e.dequeue();
                            }),
                        this._element.trigger(n.default.Event(w), this._parent);
                }),
                (t.minimize = function () {
                    this._parent
                        .find(this._settings.maximizeTrigger + " ." + this._settings.minimizeIcon)
                        .addClass(this._settings.maximizeIcon)
                        .removeClass(this._settings.minimizeIcon),
                        this._parent
                            .css("cssText", "height: " + this._parent[0].style.height + " !important; width: " + this._parent[0].style.width + " !important; transition: all .15s;")
                            .delay(10)
                            .queue(function () {
                                var e = n.default(this);
                                e.removeClass(H), n.default("html").removeClass(H), e.css({ height: "inherit", width: "inherit" }), e.hasClass(Q) && e.removeClass(Q), e.dequeue();
                            }),
                        this._element.trigger(n.default.Event(x), this._parent);
                }),
                (t.toggleMaximize = function () {
                    this._parent.hasClass(H) ? this.minimize() : this.maximize();
                }),
                (t._init = function (e) {
                    var t = this;
                    (this._parent = e),
                        n
                            .default(this)
                            .find(this._settings.collapseTrigger)
                            .click(function () {
                                t.toggle();
                            }),
                        n
                            .default(this)
                            .find(this._settings.maximizeTrigger)
                            .click(function () {
                                t.toggleMaximize();
                            }),
                        n
                            .default(this)
                            .find(this._settings.removeTrigger)
                            .click(function () {
                                t.remove();
                            });
                }),
                (e._jQueryInterface = function (t) {
                    var a = n.default(this).data(v),
                        i = n.default.extend({}, M, n.default(this).data());
                    a || ((a = new e(n.default(this), i)), n.default(this).data(v, "string" == typeof t ? a : t)),
                        "string" == typeof t && /collapse|expand|remove|toggle|maximize|minimize|toggleMaximize/.test(t) ? a[t]() : "object" == typeof t && a._init(n.default(this));
                }),
                e
            );
        })();
    n.default(document).on("click", E, function (e) {
        e && e.preventDefault(), q._jQueryInterface.call(n.default(this), "toggle");
    }),
        n.default(document).on("click", z, function (e) {
            e && e.preventDefault(), q._jQueryInterface.call(n.default(this), "remove");
        }),
        n.default(document).on("click", F, function (e) {
            e && e.preventDefault(), q._jQueryInterface.call(n.default(this), "toggleMaximize");
        }),
        (n.default.fn[m] = q._jQueryInterface),
        (n.default.fn[m].Constructor = q),
        (n.default.fn[m].noConflict = function () {
            return (n.default.fn[m] = b), q._jQueryInterface;
        });
    var O = "ControlSidebar",
        N = "lte.controlsidebar",
        P = "." + N,
        U = n.default.fn[O],
        B = "collapsed" + P,
        $ = "collapsed-done" + P,
        J = "expanded" + P,
        W = ".control-sidebar",
        V = ".control-sidebar-content",
        G = '[data-widget="control-sidebar"]',
        K = ".main-header",
        X = ".main-footer",
        Y = "control-sidebar-animate",
        Z = "control-sidebar-open",
        ee = "control-sidebar-slide-open",
        te = "layout-fixed",
        ae = "layout-navbar-fixed",
        ne = "layout-sm-navbar-fixed",
        ie = "layout-md-navbar-fixed",
        oe = "layout-lg-navbar-fixed",
        le = "layout-xl-navbar-fixed",
        se = "layout-footer-fixed",
        re = "layout-sm-footer-fixed",
        de = "layout-md-footer-fixed",
        fe = "layout-lg-footer-fixed",
        ue = "layout-xl-footer-fixed",
        ce = { controlsidebarSlide: !0, scrollbarTheme: "os-theme-light", scrollbarAutoHide: "l", target: W, animationSpeed: 300 },
        he = (function () {
            function e(e, t) {
                (this._element = e), (this._config = t);
            }
            var t = e.prototype;
            return (
                (t.collapse = function () {
                    var e = this,
                        t = n.default("body"),
                        a = n.default("html");
                    this._config.controlsidebarSlide
                        ? (a.addClass(Y),
                          t
                              .removeClass(ee)
                              .delay(300)
                              .queue(function () {
                                  n.default(W).hide(), a.removeClass(Y), n.default(this).dequeue();
                              }))
                        : t.removeClass(Z),
                        n.default(this._element).trigger(n.default.Event(B)),
                        setTimeout(function () {
                            n.default(e._element).trigger(n.default.Event($));
                        }, this._config.animationSpeed);
                }),
                (t.show = function (e) {
                    void 0 === e && (e = !1);
                    var t = n.default("body"),
                        a = n.default("html");
                    e && n.default(W).hide(),
                        this._config.controlsidebarSlide
                            ? (a.addClass(Y),
                              n
                                  .default(this._config.target)
                                  .show()
                                  .delay(10)
                                  .queue(function () {
                                      t
                                          .addClass(ee)
                                          .delay(300)
                                          .queue(function () {
                                              a.removeClass(Y), n.default(this).dequeue();
                                          }),
                                          n.default(this).dequeue();
                                  }))
                            : t.addClass(Z),
                        this._fixHeight(),
                        this._fixScrollHeight(),
                        n.default(this._element).trigger(n.default.Event(J));
                }),
                (t.toggle = function () {
                    var e = n.default("body"),
                        t = this._config.target,
                        a = !n.default(t).is(":visible"),
                        i = e.hasClass(Z) || e.hasClass(ee),
                        o = a && (e.hasClass(Z) || e.hasClass(ee));
                    a || o ? this.show(a) : i && this.collapse();
                }),
                (t._init = function () {
                    var e = this,
                        t = n.default("body"),
                        a = t.hasClass(Z) || t.hasClass(ee);
                    a ? (n.default(W).not(this._config.target).hide(), n.default(this._config.target).css("display", "block")) : n.default(W).hide(),
                        this._fixHeight(),
                        this._fixScrollHeight(),
                        n.default(window).resize(function () {
                            e._fixHeight(), e._fixScrollHeight();
                        }),
                        n.default(window).scroll(function () {
                            var t = n.default("body"),
                                a = t.hasClass(Z) || t.hasClass(ee);
                            a && e._fixScrollHeight();
                        });
                }),
                (t._isNavbarFixed = function () {
                    var e = n.default("body");
                    return e.hasClass(ae) || e.hasClass(ne) || e.hasClass(ie) || e.hasClass(oe) || e.hasClass(le);
                }),
                (t._isFooterFixed = function () {
                    var e = n.default("body");
                    return e.hasClass(se) || e.hasClass(re) || e.hasClass(de) || e.hasClass(fe) || e.hasClass(ue);
                }),
                (t._fixScrollHeight = function () {
                    var e = n.default("body"),
                        t = n.default(this._config.target);
                    if (e.hasClass(te)) {
                        var a = { scroll: n.default(document).height(), window: n.default(window).height(), header: n.default(K).outerHeight(), footer: n.default(X).outerHeight() },
                            i = { bottom: Math.abs(a.window + n.default(window).scrollTop() - a.scroll), top: n.default(window).scrollTop() },
                            o = this._isNavbarFixed() && "fixed" === n.default(K).css("position"),
                            l = this._isFooterFixed() && "fixed" === n.default(X).css("position"),
                            s = n.default(this._config.target + ", " + this._config.target + " " + V);
                        if (0 === i.top && 0 === i.bottom) t.css({ bottom: a.footer, top: a.header }), s.css("height", a.window - (a.header + a.footer));
                        else if (i.bottom <= a.footer)
                            if (!1 === l) {
                                var r = a.header - i.top;
                                t.css("bottom", a.footer - i.bottom).css("top", r >= 0 ? r : 0), s.css("height", a.window - (a.footer - i.bottom));
                            } else t.css("bottom", a.footer);
                        else
                            i.top <= a.header
                                ? !1 === o
                                    ? (t.css("top", a.header - i.top), s.css("height", a.window - (a.header - i.top)))
                                    : t.css("top", a.header)
                                : !1 === o
                                ? (t.css("top", 0), s.css("height", a.window))
                                : t.css("top", a.header);
                        l && o ? (s.css("height", "100%"), t.css("height", "")) : (l || o) && (s.css("height", "100%"), s.css("height", ""));
                    }
                }),
                (t._fixHeight = function () {
                    var e = n.default("body"),
                        t = n.default(this._config.target + " " + V);
                    if (e.hasClass(te)) {
                        var a = { window: n.default(window).height(), header: n.default(K).outerHeight(), footer: n.default(X).outerHeight() },
                            i = a.window - a.header;
                        this._isFooterFixed() && "fixed" === n.default(X).css("position") && (i = a.window - a.header - a.footer),
                            t.css("height", i),
                            void 0 !== n.default.fn.overlayScrollbars && t.overlayScrollbars({ className: this._config.scrollbarTheme, sizeAutoCapable: !0, scrollbars: { autoHide: this._config.scrollbarAutoHide, clickScrolling: !0 } });
                    } else t.attr("style", "");
                }),
                (e._jQueryInterface = function (t) {
                    return this.each(function () {
                        var a = n.default(this).data(N),
                            i = n.default.extend({}, ce, n.default(this).data());
                        if ((a || ((a = new e(this, i)), n.default(this).data(N, a)), "undefined" === a[t])) throw new Error(t + " is not a function");
                        a[t]();
                    });
                }),
                e
            );
        })();
    n.default(document).on("click", G, function (e) {
        e.preventDefault(), he._jQueryInterface.call(n.default(this), "toggle");
    }),
        n.default(document).ready(function () {
            he._jQueryInterface.call(n.default(G), "_init");
        }),
        (n.default.fn[O] = he._jQueryInterface),
        (n.default.fn[O].Constructor = he),
        (n.default.fn[O].noConflict = function () {
            return (n.default.fn[O] = U), he._jQueryInterface;
        });
    var ge = "DirectChat",
        pe = "lte.directchat",
        me = "." + pe,
        ve = n.default.fn[ge],
        _e = "toggled" + me,
        be = '[data-widget="chat-pane-toggle"]',
        Ce = ".direct-chat",
        ye = "direct-chat-contacts-open",
        we = (function () {
            function e(e) {
                this._element = e;
            }
            var t = e.prototype;
            return (
                (t.toggle = function () {
                    n.default(this._element).parents(Ce).first().toggleClass(ye), n.default(this._element).trigger(n.default.Event(_e));
                }),
                (e._jQueryInterface = function (t) {
                    return this.each(function () {
                        var a = n.default(this).data(pe);
                        a || ((a = new e(n.default(this))), n.default(this).data(pe, a)), a[t]();
                    });
                }),
                e
            );
        })();
    n.default(document).on("click", be, function (e) {
        e && e.preventDefault(), we._jQueryInterface.call(n.default(this), "toggle");
    }),
        (n.default.fn[ge] = we._jQueryInterface),
        (n.default.fn[ge].Constructor = we),
        (n.default.fn[ge].noConflict = function () {
            return (n.default.fn[ge] = ve), we._jQueryInterface;
        });
    var xe = "Dropdown",
        Ie = "lte.dropdown",
        Te = n.default.fn[xe],
        Se = ".navbar",
        je = ".dropdown-menu",
        ke = ".dropdown-menu.show",
        Qe = '[data-toggle="dropdown"]',
        He = "dropdown-menu-right",
        ze = "dropdown-submenu",
        Ee = {},
        Fe = (function () {
            function e(e, t) {
                (this._config = t), (this._element = e);
            }
            var t = e.prototype;
            return (
                (t.toggleSubmenu = function () {
                    this._element.siblings().show().toggleClass("show"),
                        this._element.next().hasClass("show") || this._element.parents(je).first().find(".show").removeClass("show").hide(),
                        this._element.parents("li.nav-item.dropdown.show").on("hidden.bs.dropdown", function () {
                            n.default(".dropdown-submenu .show").removeClass("show").hide();
                        });
                }),
                (t.fixPosition = function () {
                    var e = n.default(ke);
                    if (0 !== e.length) {
                        e.hasClass(He) ? e.css({ left: "inherit", right: 0 }) : e.css({ left: 0, right: "inherit" });
                        var t = e.offset(),
                            a = e.width(),
                            i = n.default(window).width() - t.left;
                        t.left < 0 ? e.css({ left: "inherit", right: t.left - 5 }) : i < a && e.css({ left: "inherit", right: 0 });
                    }
                }),
                (e._jQueryInterface = function (t) {
                    return this.each(function () {
                        var a = n.default(this).data(Ie),
                            i = n.default.extend({}, Ee, n.default(this).data());
                        a || ((a = new e(n.default(this), i)), n.default(this).data(Ie, a)), ("toggleSubmenu" !== t && "fixPosition" !== t) || a[t]();
                    });
                }),
                e
            );
        })();
    n.default(je + " " + Qe).on("click", function (e) {
        e.preventDefault(), e.stopPropagation(), Fe._jQueryInterface.call(n.default(this), "toggleSubmenu");
    }),
        n.default(Se + " " + Qe).on("click", function (e) {
            e.preventDefault(),
                n.default(e.target).parent().hasClass(ze) ||
                    setTimeout(function () {
                        Fe._jQueryInterface.call(n.default(this), "fixPosition");
                    }, 1);
        }),
        (n.default.fn[xe] = Fe._jQueryInterface),
        (n.default.fn[xe].Constructor = Fe),
        (n.default.fn[xe].noConflict = function () {
            return (n.default.fn[xe] = Te), Fe._jQueryInterface;
        });
    var De = "ExpandableTable",
        Le = "lte.expandableTable",
        Re = "." + Le,
        Ae = n.default.fn[De],
        Me = "expanded" + Re,
        qe = "collapsed" + Re,
        Oe = ".expandable-table",
        Ne = ".expandable-body",
        Pe = '[data-widget="expandable-table"]',
        Ue = "aria-expanded",
        Be = (function () {
            function e(e, t) {
                (this._options = t), (this._element = e);
            }
            var t = e.prototype;
            return (
                (t.init = function () {
                    n.default(Pe).each(function (e, t) {
                        var a = n.default(t).attr(Ue),
                            i = n.default(t).next(Ne).children().first().children();
                        "true" === a ? i.show() : "false" === a && (i.hide(), i.parent().parent().addClass("d-none"));
                    });
                }),
                (t.toggleRow = function () {
                    var e = this._element;
                    "TR" !== e[0].nodeName && ((e = e.parent()), "TR" !== e[0].nodeName && (e = e.parent()));
                    var t = 500,
                        a = e.attr(Ue),
                        i = e.next(Ne).children().first().children();
                    i.stop(),
                        "true" === a
                            ? (i.slideUp(t, function () {
                                  e.next(Ne).addClass("d-none");
                              }),
                              e.attr(Ue, "false"),
                              e.trigger(n.default.Event(qe)))
                            : "false" === a && (e.next(Ne).removeClass("d-none"), i.slideDown(t), e.attr(Ue, "true"), e.trigger(n.default.Event(Me)));
                }),
                (e._jQueryInterface = function (t) {
                    return this.each(function () {
                        var a = n.default(this).data(Le);
                        a || ((a = new e(n.default(this))), n.default(this).data(Le, a)), "string" == typeof t && /init|toggleRow/.test(t) && a[t]();
                    });
                }),
                e
            );
        })();
    n.default(Oe).ready(function () {
        Be._jQueryInterface.call(n.default(this), "init");
    }),
        n.default(document).on("click", Pe, function () {
            Be._jQueryInterface.call(n.default(this), "toggleRow");
        }),
        (n.default.fn[De] = Be._jQueryInterface),
        (n.default.fn[De].Constructor = Be),
        (n.default.fn[De].noConflict = function () {
            return (n.default.fn[De] = Ae), Be._jQueryInterface;
        });
    var $e = "Fullscreen",
        Je = "lte.fullscreen",
        We = n.default.fn[$e],
        Ve = '[data-widget="fullscreen"]',
        Ge = Ve + " i",
        Ke = "webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange",
        Xe = { minimizeIcon: "fa-compress-arrows-alt", maximizeIcon: "fa-expand-arrows-alt" },
        Ye = (function () {
            function e(e, t) {
                (this.element = e), (this.options = n.default.extend({}, Xe, t));
            }
            var t = e.prototype;
            return (
                (t.toggle = function () {
                    document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement ? this.windowed() : this.fullscreen();
                }),
                (t.toggleIcon = function () {
                    document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement
                        ? n.default(Ge).removeClass(this.options.maximizeIcon).addClass(this.options.minimizeIcon)
                        : n.default(Ge).removeClass(this.options.minimizeIcon).addClass(this.options.maximizeIcon);
                }),
                (t.fullscreen = function () {
                    document.documentElement.requestFullscreen
                        ? document.documentElement.requestFullscreen()
                        : document.documentElement.webkitRequestFullscreen
                        ? document.documentElement.webkitRequestFullscreen()
                        : document.documentElement.msRequestFullscreen && document.documentElement.msRequestFullscreen();
                }),
                (t.windowed = function () {
                    document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen();
                }),
                (e._jQueryInterface = function (t) {
                    var a = n.default(this).data(Je);
                    a || (a = n.default(this).data());
                    var i = n.default.extend({}, Xe, "object" == typeof t ? t : a),
                        o = new e(n.default(this), i);
                    n.default(this).data(Je, "object" == typeof t ? t : a), "string" == typeof t && /toggle|toggleIcon|fullscreen|windowed/.test(t) ? o[t]() : o.init();
                }),
                e
            );
        })();
    n.default(document).on("click", Ve, function () {
        Ye._jQueryInterface.call(n.default(this), "toggle");
    }),
        n.default(document).on(Ke, function () {
            Ye._jQueryInterface.call(n.default(Ve), "toggleIcon");
        }),
        (n.default.fn[$e] = Ye._jQueryInterface),
        (n.default.fn[$e].Constructor = Ye),
        (n.default.fn[$e].noConflict = function () {
            return (n.default.fn[$e] = We), Ye._jQueryInterface;
        });
    var Ze = "IFrame",
        et = "lte.iframe",
        tt = n.default.fn[Ze],
        at = '[data-widget="iframe"]',
        nt = '[data-widget="iframe-close"]',
        it = '[data-widget="iframe-scrollleft"]',
        ot = '[data-widget="iframe-scrollright"]',
        lt = '[data-widget="iframe-fullscreen"]',
        st = ".content-wrapper",
        rt = st + " iframe",
        dt = st + ".iframe-mode .nav",
        ft = st + ".iframe-mode .navbar-nav",
        ut = ft + " .nav-item",
        ct = ft + " .nav-link",
        ht = st + ".iframe-mode .tab-content",
        gt = ht + " .tab-empty",
        pt = ht + " .tab-loading",
        mt = ht + " .tab-pane",
        vt = ".main-sidebar .nav-item > a.nav-link",
        _t = ".sidebar-search-results .list-group-item",
        bt = ".main-header .nav-item a.nav-link",
        Ct = ".main-header a.dropdown-item",
        yt = "iframe-mode",
        wt = "iframe-mode-fullscreen",
        xt = {
            onTabClick: function (e) {
                return e;
            },
            onTabChanged: function (e) {
                return e;
            },
            onTabCreated: function (e) {
                return e;
            },
            autoIframeMode: !0,
            autoItemActive: !0,
            autoShowNewTab: !0,
            autoDarkMode: !1,
            allowDuplicates: !1,
            allowReload: !0,
            loadingScreen: !0,
            useNavbarItems: !0,
            scrollOffset: 40,
            scrollBehaviorSwap: !1,
            iconMaximize: "fa-expand",
            iconMinimize: "fa-compress",
        },
        It = (function () {
            function e(e, t) {
                (this._config = t), (this._element = e), this._init();
            }
            var t = e.prototype;
            return (
                (t.onTabClick = function (e) {
                    this._config.onTabClick(e);
                }),
                (t.onTabChanged = function (e) {
                    this._config.onTabChanged(e);
                }),
                (t.onTabCreated = function (e) {
                    this._config.onTabCreated(e);
                }),
                (t.createTab = function (e, t, a, i) {
                    var o = this,
                        l = "panel-" + a,
                        s = "tab-" + a;
                    this._config.allowDuplicates && ((l += "-" + Math.floor(1e3 * Math.random())), (s += "-" + Math.floor(1e3 * Math.random())));
                    var r =
                        '<li class="nav-item" role="presentation"><a href="#" class="btn-iframe-close" data-widget="iframe-close" data-type="only-this"><i class="fas fa-times"></i></a><a class="nav-link" data-toggle="row" id="' +
                        s +
                        '" href="#' +
                        l +
                        '" role="tab" aria-controls="' +
                        l +
                        '" aria-selected="false">' +
                        e +
                        "</a></li>";
                    n.default(ft).append(unescape(escape(r)));
                    var d = '<div class="tab-pane fade" id="' + l + '" role="tabpanel" aria-labelledby="' + s + '"><iframe src="' + t + '"></iframe></div>';
                    if ((n.default(ht).append(unescape(escape(d))), i))
                        if (this._config.loadingScreen) {
                            var f = n.default(pt);
                            f.fadeIn(),
                                n.default(l + " iframe").ready(function () {
                                    "number" == typeof o._config.loadingScreen
                                        ? (o.switchTab("#" + s),
                                          setTimeout(function () {
                                              f.fadeOut();
                                          }, o._config.loadingScreen))
                                        : (o.switchTab("#" + s), f.fadeOut());
                                });
                        } else this.switchTab("#" + s);
                    this.onTabCreated(n.default("#" + s));
                }),
                (t.openTabSidebar = function (e, t) {
                    void 0 === t && (t = this._config.autoShowNewTab);
                    var a = n.default(e).clone();
                    void 0 === a.attr("href") && (a = n.default(e).parent("a").clone()), a.find(".right, .search-path").remove();
                    var i = a.find("p").text();
                    "" === i && (i = a.text());
                    var o = a.attr("href");
                    if ("#" !== o && "" !== o && void 0 !== o) {
                        var l = unescape(o)
                                .replace("./", "")
                                .replace(/["#&'./:=?[\]]/gi, "-")
                                .replace(/(--)/gi, ""),
                            s = "tab-" + l;
                        if (!this._config.allowDuplicates && n.default("#" + s).length > 0) return this.switchTab("#" + s, this._config.allowReload);
                        ((!this._config.allowDuplicates && 0 === n.default("#" + s).length) || this._config.allowDuplicates) && this.createTab(i, o, l, t);
                    }
                }),
                (t.switchTab = function (e, t) {
                    var a = this;
                    void 0 === t && (t = !1);
                    var i = n.default(e),
                        o = i.attr("href");
                    if ((n.default(gt).hide(), t)) {
                        var l = n.default(pt);
                        this._config.loadingScreen
                            ? l.show(0, function () {
                                  n.default(o + " iframe")
                                      .attr("src", n.default(o + " iframe").attr("src"))
                                      .ready(function () {
                                          a._config.loadingScreen &&
                                              ("number" == typeof a._config.loadingScreen
                                                  ? setTimeout(function () {
                                                        l.fadeOut();
                                                    }, a._config.loadingScreen)
                                                  : l.fadeOut());
                                      });
                              })
                            : n.default(o + " iframe").attr("src", n.default(o + " iframe").attr("src"));
                    }
                    n
                        .default(ft + " .active")
                        .tab("dispose")
                        .removeClass("active"),
                        this._fixHeight(),
                        i.tab("show"),
                        i.parents("li").addClass("active"),
                        this.onTabChanged(i),
                        this._config.autoItemActive && this._setItemActive(n.default(o + " iframe").attr("src"));
                }),
                (t.removeActiveTab = function (e, t) {
                    if ("all" == e) n.default(ut).remove(), n.default(mt).remove(), n.default(gt).show();
                    else if ("all-other" == e) n.default(ut + ":not(.active)").remove(), n.default(mt + ":not(.active)").remove();
                    else if ("only-this" == e) {
                        var a = n.default(t),
                            i = a.parent(".nav-item"),
                            o = i.parent(),
                            l = i.index(),
                            s = a.siblings(".nav-link").attr("aria-controls");
                        if ((i.remove(), n.default("#" + s).remove(), n.default(ht).children().length == n.default(gt + ", " + pt).length)) n.default(gt).show();
                        else {
                            var r = l - 1;
                            this.switchTab(o.children().eq(r).find("a.nav-link"));
                        }
                    } else {
                        var d = n.default(ut + ".active"),
                            f = d.parent(),
                            u = d.index();
                        if ((d.remove(), n.default(mt + ".active").remove(), n.default(ht).children().length == n.default(gt + ", " + pt).length)) n.default(gt).show();
                        else {
                            var c = u - 1;
                            this.switchTab(f.children().eq(c).find("a.nav-link"));
                        }
                    }
                }),
                (t.toggleFullscreen = function () {
                    n.default("body").hasClass(wt)
                        ? (n
                              .default(lt + " i")
                              .removeClass(this._config.iconMinimize)
                              .addClass(this._config.iconMaximize),
                          n.default("body").removeClass(wt),
                          n.default(gt + ", " + pt).height("100%"),
                          n.default(st).height("100%"),
                          n.default(rt).height("100%"))
                        : (n
                              .default(lt + " i")
                              .removeClass(this._config.iconMaximize)
                              .addClass(this._config.iconMinimize),
                          n.default("body").addClass(wt)),
                        n.default(window).trigger("resize"),
                        this._fixHeight(!0);
                }),
                (t._init = function () {
                    var e = n.default(ht).children().length > 2;
                    if ((this._setupListeners(), this._fixHeight(!0), e)) {
                        var t = n.default("" + mt).first();
                        console.log(t);
                        var a = t.attr("id").replace("panel-", ""),
                            i = "#tab-" + a;
                        this.switchTab(i, !0);
                    }
                }),
                (t._initFrameElement = function () {
                    if (window.frameElement && this._config.autoIframeMode) {
                        var e = n.default("body");
                        e.addClass(yt), this._config.autoDarkMode && e.addClass("dark-mode");
                    }
                }),
                (t._navScroll = function (e) {
                    var t = n.default(ft).scrollLeft();
                    n.default(ft).animate({ scrollLeft: t + e }, 250, "linear");
                }),
                (t._setupListeners = function () {
                    var e = this;
                    n.default(window).on("resize", function () {
                        setTimeout(function () {
                            e._fixHeight();
                        }, 1);
                    }),
                        n.default(st).hasClass(yt) &&
                            (n.default(document).on("click", vt + ", " + _t, function (t) {
                                t.preventDefault(), e.openTabSidebar(t.target);
                            }),
                            this._config.useNavbarItems &&
                                n.default(document).on("click", bt + ", " + Ct, function (t) {
                                    t.preventDefault(), e.openTabSidebar(t.target);
                                })),
                        n.default(document).on("click", ct, function (t) {
                            t.preventDefault(), e.onTabClick(t.target), e.switchTab(t.target);
                        }),
                        n.default(document).on("click", ct, function (t) {
                            t.preventDefault(), e.onTabClick(t.target), e.switchTab(t.target);
                        }),
                        n.default(document).on("click", nt, function (t) {
                            t.preventDefault();
                            var a = t.target;
                            "I" == a.nodeName && (a = t.target.offsetParent), e.removeActiveTab(a.attributes["data-type"] ? a.attributes["data-type"].nodeValue : null, a);
                        }),
                        n.default(document).on("click", lt, function (t) {
                            t.preventDefault(), e.toggleFullscreen();
                        });
                    var t = !1,
                        a = null;
                    n.default(document).on("mousedown", it, function (n) {
                        n.preventDefault(), clearInterval(a);
                        var i = e._config.scrollOffset;
                        e._config.scrollBehaviorSwap || (i = -i),
                            (t = !0),
                            e._navScroll(i),
                            (a = setInterval(function () {
                                e._navScroll(i);
                            }, 250));
                    }),
                        n.default(document).on("mousedown", ot, function (n) {
                            n.preventDefault(), clearInterval(a);
                            var i = e._config.scrollOffset;
                            e._config.scrollBehaviorSwap && (i = -i),
                                (t = !0),
                                e._navScroll(i),
                                (a = setInterval(function () {
                                    e._navScroll(i);
                                }, 250));
                        }),
                        n.default(document).on("mouseup", function () {
                            t && ((t = !1), clearInterval(a), (a = null));
                        });
                }),
                (t._setItemActive = function (e) {
                    n.default(vt + ", " + Ct).removeClass("active"), n.default(bt).parent().removeClass("active");
                    var t = n.default(bt + '[href$="' + e + '"]'),
                        a = n.default(Ct + '[href$="' + e + '"]'),
                        i = n.default(vt + '[href$="' + e + '"]');
                    t.each(function (e, t) {
                        n.default(t).parent().addClass("active");
                    }),
                        a.each(function (e, t) {
                            n.default(t).addClass("active");
                        }),
                        i.each(function (e, t) {
                            n.default(t).addClass("active"), n.default(t).parents(".nav-treeview").prevAll(".nav-link").addClass("active");
                        });
                }),
                (t._fixHeight = function (e) {
                    if ((void 0 === e && (e = !1), n.default("body").hasClass(wt))) {
                        var t = n.default(window).height(),
                            a = n.default(dt).outerHeight();
                        n.default(gt + ", " + pt + ", " + rt).height(t - a), n.default(st).height(t);
                    } else {
                        var i = parseFloat(n.default(st).css("height")),
                            o = n.default(dt).outerHeight();
                        1 == e
                            ? setTimeout(function () {
                                  n.default(gt + ", " + pt).height(i - o);
                              }, 50)
                            : n.default(rt).height(i - o);
                    }
                }),
                (e._jQueryInterface = function (t) {
                    if (n.default(at).length > 0) {
                        var a = n.default(this).data(et);
                        a || (a = n.default(this).data());
                        var i = n.default.extend({}, xt, "object" == typeof t ? t : a);
                        localStorage.setItem("AdminLTE:IFrame:Options", JSON.stringify(i));
                        var o = new e(n.default(this), i);
                        n.default(this).data(et, "object" == typeof t ? t : a), "string" == typeof t && /createTab|openTabSidebar|switchTab|removeActiveTab/.test(t) && o[t]();
                    } else new e(n.default(this), JSON.parse(localStorage.getItem("AdminLTE:IFrame:Options")))._initFrameElement();
                }),
                e
            );
        })();
    n.default(window).on("load", function () {
        It._jQueryInterface.call(n.default(at));
    }),
        (n.default.fn[Ze] = It._jQueryInterface),
        (n.default.fn[Ze].Constructor = It),
        (n.default.fn[Ze].noConflict = function () {
            return (n.default.fn[Ze] = tt), It._jQueryInterface;
        });
    var Tt = "Layout",
        St = "lte.layout",
        jt = n.default.fn[Tt],
        kt = ".main-header",
        Qt = ".main-sidebar",
        Ht = ".main-sidebar .sidebar",
        zt = ".content-wrapper",
        Et = ".control-sidebar-content",
        Ft = '[data-widget="control-sidebar"]',
        Dt = ".main-footer",
        Lt = '[data-widget="pushmenu"]',
        Rt = ".login-box",
        At = ".register-box",
        Mt = ".preloader",
        qt = "sidebar-collapse",
        Ot = "sidebar-focused",
        Nt = "layout-fixed",
        Pt = "control-sidebar-slide-open",
        Ut = "control-sidebar-open",
        Bt = "iframe-mode",
        $t = { scrollbarTheme: "os-theme-light", scrollbarAutoHide: "l", panelAutoHeight: !0, panelAutoHeightMode: "min-height", preloadDuration: 200, loginRegisterAutoHeight: !0 },
        Jt = (function () {
            function e(e, t) {
                (this._config = t), (this._element = e);
            }
            var t = e.prototype;
            return (
                (t.fixLayoutHeight = function (e) {
                    void 0 === e && (e = null);
                    var t = n.default("body"),
                        a = 0;
                    (t.hasClass(Pt) || t.hasClass(Ut) || "control_sidebar" === e) && (a = n.default(Et).outerHeight());
                    var i = {
                            window: n.default(window).height(),
                            header: n.default(kt).length > 0 ? n.default(kt).outerHeight() : 0,
                            footer: n.default(Dt).length > 0 ? n.default(Dt).outerHeight() : 0,
                            sidebar: n.default(Ht).length > 0 ? n.default(Ht).height() : 0,
                            controlSidebar: a,
                        },
                        o = this._max(i),
                        l = this._config.panelAutoHeight;
                    !0 === l && (l = 0);
                    var s = n.default(zt);
                    !1 !== l &&
                        (o === i.controlSidebar
                            ? s.css(this._config.panelAutoHeightMode, o + l)
                            : o === i.window
                            ? s.css(this._config.panelAutoHeightMode, o + l - i.header - i.footer)
                            : s.css(this._config.panelAutoHeightMode, o + l - i.header),
                        this._isFooterFixed() && s.css(this._config.panelAutoHeightMode, parseFloat(s.css(this._config.panelAutoHeightMode)) + i.footer)),
                        t.hasClass(Nt) &&
                            (void 0 !== n.default.fn.overlayScrollbars
                                ? n.default(Ht).overlayScrollbars({ className: this._config.scrollbarTheme, sizeAutoCapable: !0, scrollbars: { autoHide: this._config.scrollbarAutoHide, clickScrolling: !0 } })
                                : n.default(Ht).css("overflow-y", "auto"));
                }),
                (t.fixLoginRegisterHeight = function () {
                    var e = n.default("body"),
                        t = n.default(Rt + ", " + At);
                    if (e.hasClass(Bt)) e.css("height", "100%"), n.default(".wrapper").css("height", "100%"), n.default("html").css("height", "100%");
                    else if (0 === t.length) e.css("height", "auto"), n.default("html").css("height", "auto");
                    else {
                        var a = t.height();
                        e.css(this._config.panelAutoHeightMode) !== a && e.css(this._config.panelAutoHeightMode, a);
                    }
                }),
                (t._init = function () {
                    var e = this;
                    this.fixLayoutHeight(),
                        !0 === this._config.loginRegisterAutoHeight
                            ? this.fixLoginRegisterHeight()
                            : this._config.loginRegisterAutoHeight === parseInt(this._config.loginRegisterAutoHeight, 10) && setInterval(this.fixLoginRegisterHeight, this._config.loginRegisterAutoHeight),
                        n.default(Ht).on("collapsed.lte.treeview expanded.lte.treeview", function () {
                            e.fixLayoutHeight();
                        }),
                        n.default(Qt).on("mouseenter mouseleave", function () {
                            n.default("body").hasClass(qt) && e.fixLayoutHeight();
                        }),
                        n.default(Lt).on("collapsed.lte.pushmenu shown.lte.pushmenu", function () {
                            setTimeout(function () {
                                e.fixLayoutHeight();
                            }, 300);
                        }),
                        n
                            .default(Ft)
                            .on("collapsed.lte.controlsidebar", function () {
                                e.fixLayoutHeight();
                            })
                            .on("expanded.lte.controlsidebar", function () {
                                e.fixLayoutHeight("control_sidebar");
                            }),
                        n.default(window).resize(function () {
                            e.fixLayoutHeight();
                        }),
                        setTimeout(function () {
                            n.default("body.hold-transition").removeClass("hold-transition");
                        }, 50),
                        setTimeout(function () {
                            var e = n.default(Mt);
                            e &&
                                (e.css("height", 0),
                                setTimeout(function () {
                                    e.children().hide();
                                }, 200));
                        }, this._config.preloadDuration);
                }),
                (t._max = function (e) {
                    var t = 0;
                    return (
                        Object.keys(e).forEach(function (a) {
                            e[a] > t && (t = e[a]);
                        }),
                        t
                    );
                }),
                (t._isFooterFixed = function () {
                    return "fixed" === n.default(Dt).css("position");
                }),
                (e._jQueryInterface = function (t) {
                    return (
                        void 0 === t && (t = ""),
                        this.each(function () {
                            var a = n.default(this).data(St),
                                i = n.default.extend({}, $t, n.default(this).data());
                            a || ((a = new e(n.default(this), i)), n.default(this).data(St, a)), "init" === t || "" === t ? a._init() : ("fixLayoutHeight" !== t && "fixLoginRegisterHeight" !== t) || a[t]();
                        })
                    );
                }),
                e
            );
        })();
    n.default(window).on("load", function () {
        Jt._jQueryInterface.call(n.default("body"));
    }),
        n
            .default(Ht + " a")
            .on("focusin", function () {
                n.default(Qt).addClass(Ot);
            })
            .on("focusout", function () {
                n.default(Qt).removeClass(Ot);
            }),
        (n.default.fn[Tt] = Jt._jQueryInterface),
        (n.default.fn[Tt].Constructor = Jt),
        (n.default.fn[Tt].noConflict = function () {
            return (n.default.fn[Tt] = jt), Jt._jQueryInterface;
        });
    var Wt = "PushMenu",
        Vt = "lte.pushmenu",
        Gt = "." + Vt,
        Kt = n.default.fn[Wt],
        Xt = "collapsed" + Gt,
        Yt = "collapsed-done" + Gt,
        Zt = "shown" + Gt,
        ea = '[data-widget="pushmenu"]',
        ta = "body",
        aa = "#sidebar-overlay",
        na = ".wrapper",
        ia = "sidebar-collapse",
        oa = "sidebar-open",
        la = "sidebar-is-opening",
        sa = "sidebar-closed",
        ra = { autoCollapseSize: 992, enableRemember: !1, noTransitionAfterReload: !0, animationSpeed: 300 },
        da = (function () {
            function e(e, t) {
                (this._element = e), (this._options = n.default.extend({}, ra, t)), 0 === n.default(aa).length && this._addOverlay(), this._init();
            }
            var t = e.prototype;
            return (
                (t.expand = function () {
                    var e = n.default(ta);
                    this._options.autoCollapseSize && n.default(window).width() <= this._options.autoCollapseSize && e.addClass(oa),
                        e
                            .addClass(la)
                            .removeClass(ia + " " + sa)
                            .delay(50)
                            .queue(function () {
                                e.removeClass(la), n.default(this).dequeue();
                            }),
                        this._options.enableRemember && localStorage.setItem("remember" + Gt, oa),
                        n.default(this._element).trigger(n.default.Event(Zt));
                }),
                (t.collapse = function () {
                    var e = this,
                        t = n.default(ta);
                    this._options.autoCollapseSize && n.default(window).width() <= this._options.autoCollapseSize && t.removeClass(oa).addClass(sa),
                        t.addClass(ia),
                        this._options.enableRemember && localStorage.setItem("remember" + Gt, ia),
                        n.default(this._element).trigger(n.default.Event(Xt)),
                        setTimeout(function () {
                            n.default(e._element).trigger(n.default.Event(Yt));
                        }, this._options.animationSpeed);
                }),
                (t.toggle = function () {
                    n.default(ta).hasClass(ia) ? this.expand() : this.collapse();
                }),
                (t.autoCollapse = function (e) {
                    if ((void 0 === e && (e = !1), this._options.autoCollapseSize)) {
                        var t = n.default(ta);
                        n.default(window).width() <= this._options.autoCollapseSize ? t.hasClass(oa) || this.collapse() : !0 === e && (t.hasClass(oa) ? t.removeClass(oa) : t.hasClass(sa) && this.expand());
                    }
                }),
                (t.remember = function () {
                    if (this._options.enableRemember) {
                        var e = n.default("body"),
                            t = localStorage.getItem("remember" + Gt);
                        t === ia
                            ? this._options.noTransitionAfterReload
                                ? e
                                      .addClass("hold-transition")
                                      .addClass(ia)
                                      .delay(50)
                                      .queue(function () {
                                          n.default(this).removeClass("hold-transition"), n.default(this).dequeue();
                                      })
                                : e.addClass(ia)
                            : this._options.noTransitionAfterReload
                            ? e
                                  .addClass("hold-transition")
                                  .removeClass(ia)
                                  .delay(50)
                                  .queue(function () {
                                      n.default(this).removeClass("hold-transition"), n.default(this).dequeue();
                                  })
                            : e.removeClass(ia);
                    }
                }),
                (t._init = function () {
                    var e = this;
                    this.remember(),
                        this.autoCollapse(),
                        n.default(window).resize(function () {
                            e.autoCollapse(!0);
                        });
                }),
                (t._addOverlay = function () {
                    var e = this,
                        t = n.default("<div />", { id: "sidebar-overlay" });
                    t.on("click", function () {
                        e.collapse();
                    }),
                        n.default(na).append(t);
                }),
                (e._jQueryInterface = function (t) {
                    return this.each(function () {
                        var a = n.default(this).data(Vt),
                            i = n.default.extend({}, ra, n.default(this).data());
                        a || ((a = new e(this, i)), n.default(this).data(Vt, a)), "string" == typeof t && /collapse|expand|toggle/.test(t) && a[t]();
                    });
                }),
                e
            );
        })();
    n.default(document).on("click", ea, function (e) {
        e.preventDefault();
        var t = e.currentTarget;
        "pushmenu" !== n.default(t).data("widget") && (t = n.default(t).closest(ea)), da._jQueryInterface.call(n.default(t), "toggle");
    }),
        n.default(window).on("load", function () {
            da._jQueryInterface.call(n.default(ea));
        }),
        (n.default.fn[Wt] = da._jQueryInterface),
        (n.default.fn[Wt].Constructor = da),
        (n.default.fn[Wt].noConflict = function () {
            return (n.default.fn[Wt] = Kt), da._jQueryInterface;
        });
    var fa = "SidebarSearch",
        ua = "lte.sidebar-search",
        ca = n.default.fn[fa],
        ha = "sidebar-search-open",
        ga = "fa-search",
        pa = "fa-times",
        ma = "nav-header",
        va = "sidebar-search-results",
        _a = "list-group",
        ba = '[data-widget="sidebar-search"]',
        Ca = ".main-sidebar .nav-sidebar",
        ya = ".nav-link",
        wa = ".nav-treeview",
        xa = ba + " .form-control",
        Ia = ba + " .btn",
        Ta = Ia + " i",
        Sa = "." + _a,
        ja = "." + va,
        ka = ja + " ." + _a,
        Qa = { arrowSign: "->", minLength: 3, maxResults: 7, highlightName: !0, highlightPath: !1, highlightClass: "text-light", notFoundText: "No element found!" },
        Ha = [],
        za = (function () {
            function e(e, t) {
                (this.element = e), (this.options = n.default.extend({}, Qa, t)), (this.items = []);
            }
            var a = e.prototype;
            return (
                (a.init = function () {
                    var e = this;
                    0 !== n.default(ba).length &&
                        (0 === n.default(ba).next(ja).length && n.default(ba).after(n.default("<div />", { class: va })),
                        0 === n.default(ja).children(Sa).length && n.default(ja).append(n.default("<div />", { class: _a })),
                        this._addNotFound(),
                        n
                            .default(Ca)
                            .children()
                            .each(function (t, a) {
                                e._parseItem(a);
                            }));
                }),
                (a.search = function () {
                    var e = this,
                        t = n.default(xa).val().toLowerCase();
                    if (t.length < this.options.minLength) return n.default(ka).empty(), this._addNotFound(), void this.close();
                    var a = Ha.filter(function (e) {
                            return e.name.toLowerCase().includes(t);
                        }),
                        i = n.default(a.slice(0, this.options.maxResults));
                    n.default(ka).empty(),
                        0 === i.length
                            ? this._addNotFound()
                            : i.each(function (t, a) {
                                  n.default(ka).append(e._renderItem(escape(a.name), encodeURI(a.link), a.path));
                              }),
                        this.open();
                }),
                (a.open = function () {
                    n.default(ba).parent().addClass(ha), n.default(Ta).removeClass(ga).addClass(pa);
                }),
                (a.close = function () {
                    n.default(ba).parent().removeClass(ha), n.default(Ta).removeClass(pa).addClass(ga);
                }),
                (a.toggle = function () {
                    n.default(ba).parent().hasClass(ha) ? this.close() : this.open();
                }),
                (a._parseItem = function (e, t) {
                    var a = this;
                    if ((void 0 === t && (t = []), !n.default(e).hasClass(ma))) {
                        var i = {},
                            o = n
                                .default(e)
                                .clone()
                                .find("> " + ya),
                            l = n
                                .default(e)
                                .clone()
                                .find("> " + wa),
                            s = o.attr("href"),
                            r = o.find("p").children().remove().end().text();
                        if (((i.name = this._trimText(r)), (i.link = s), (i.path = t), 0 === l.length)) Ha.push(i);
                        else {
                            var d = i.path.concat([i.name]);
                            l.children().each(function (e, t) {
                                a._parseItem(t, d);
                            });
                        }
                    }
                }),
                (a._trimText = function (e) {
                    return t.trim(e.replace(/(\r\n|\n|\r)/gm, " "));
                }),
                (a._renderItem = function (e, t, a) {
                    var i = this;
                    if (((a = a.join(" " + this.options.arrowSign + " ")), (e = unescape(e)), (t = decodeURI(t)), this.options.highlightName || this.options.highlightPath)) {
                        var o = n.default(xa).val().toLowerCase(),
                            l = new RegExp(o, "gi");
                        this.options.highlightName &&
                            (e = e.replace(l, function (e) {
                                return '<strong class="' + i.options.highlightClass + '">' + e + "</strong>";
                            })),
                            this.options.highlightPath &&
                                (a = a.replace(l, function (e) {
                                    return '<strong class="' + i.options.highlightClass + '">' + e + "</strong>";
                                }));
                    }
                    var s = n.default("<a/>", { href: decodeURIComponent(t), class: "list-group-item" }),
                        r = n.default("<div/>", { class: "search-title" }).html(e),
                        d = n.default("<div/>", { class: "search-path" }).html(a);
                    return s.append(r).append(d), s;
                }),
                (a._addNotFound = function () {
                    n.default(ka).append(this._renderItem(this.options.notFoundText, "#", []));
                }),
                (e._jQueryInterface = function (t) {
                    var a = n.default(this).data(ua);
                    a || (a = n.default(this).data());
                    var i = n.default.extend({}, Qa, "object" == typeof t ? t : a),
                        o = new e(n.default(this), i);
                    n.default(this).data(ua, "object" == typeof t ? t : a), "string" == typeof t && /init|toggle|close|open|search/.test(t) ? o[t]() : o.init();
                }),
                e
            );
        })();
    n.default(document).on("click", Ia, function (e) {
        e.preventDefault(), za._jQueryInterface.call(n.default(ba), "toggle");
    }),
        n.default(document).on("keyup", xa, function (e) {
            return 38 == e.keyCode
                ? (e.preventDefault(), void n.default(ka).children().last().focus())
                : 40 == e.keyCode
                ? (e.preventDefault(), void n.default(ka).children().first().focus())
                : void setTimeout(function () {
                      za._jQueryInterface.call(n.default(ba), "search");
                  }, 100);
        }),
        n.default(document).on("keydown", ka, function (e) {
            var t = n.default(":focus");
            38 == e.keyCode && (e.preventDefault(), t.is(":first-child") ? t.siblings().last().focus() : t.prev().focus()), 40 == e.keyCode && (e.preventDefault(), t.is(":last-child") ? t.siblings().first().focus() : t.next().focus());
        }),
        n.default(window).on("load", function () {
            za._jQueryInterface.call(n.default(ba), "init");
        }),
        (n.default.fn[fa] = za._jQueryInterface),
        (n.default.fn[fa].Constructor = za),
        (n.default.fn[fa].noConflict = function () {
            return (n.default.fn[fa] = ca), za._jQueryInterface;
        });
    var Ea = "NavbarSearch",
        Fa = "lte.navbar-search",
        Da = n.default.fn[Ea],
        La = '[data-widget="navbar-search"]',
        Ra = ".navbar-search-block",
        Aa = ".form-control",
        Ma = "navbar-search-open",
        qa = { resetOnClose: !0, target: Ra },
        Oa = (function () {
            function e(e, t) {
                (this._element = e), (this._config = n.default.extend({}, qa, t));
            }
            var t = e.prototype;
            return (
                (t.open = function () {
                    n.default(this._config.target).css("display", "flex").hide().fadeIn().addClass(Ma), n.default(this._config.target + " " + Aa).focus();
                }),
                (t.close = function () {
                    n.default(this._config.target).fadeOut().removeClass(Ma), this._config.resetOnClose && n.default(this._config.target + " " + Aa).val("");
                }),
                (t.toggle = function () {
                    n.default(this._config.target).hasClass(Ma) ? this.close() : this.open();
                }),
                (e._jQueryInterface = function (t) {
                    return this.each(function () {
                        var a = n.default(this).data(Fa),
                            i = n.default.extend({}, qa, n.default(this).data());
                        if ((a || ((a = new e(this, i)), n.default(this).data(Fa, a)), !/toggle|close|open/.test(t))) throw new Error("Undefined method " + t);
                        a[t]();
                    });
                }),
                e
            );
        })();
    n.default(document).on("click", La, function (e) {
        e.preventDefault();
        var t = n.default(e.currentTarget);
        "navbar-search" !== t.data("widget") && (t = t.closest(La)), Oa._jQueryInterface.call(t, "toggle");
    }),
        (n.default.fn[Ea] = Oa._jQueryInterface),
        (n.default.fn[Ea].Constructor = Oa),
        (n.default.fn[Ea].noConflict = function () {
            return (n.default.fn[Ea] = Da), Oa._jQueryInterface;
        });
    var Na = "Toasts",
        Pa = "lte.toasts",
        Ua = "." + Pa,
        Ba = n.default.fn[Na],
        $a = "init" + Ua,
        Ja = "created" + Ua,
        Wa = "removed" + Ua,
        Va = "#toastsContainerTopRight",
        Ga = "#toastsContainerTopLeft",
        Ka = "#toastsContainerBottomRight",
        Xa = "#toastsContainerBottomLeft",
        Ya = "toasts-top-right",
        Za = "toasts-top-left",
        en = "toasts-bottom-right",
        tn = "toasts-bottom-left",
        an = "topRight",
        nn = "topLeft",
        on = "bottomRight",
        ln = "bottomLeft",
        sn = { position: an, fixed: !0, autohide: !1, autoremove: !0, delay: 1e3, fade: !0, icon: null, image: null, imageAlt: null, imageHeight: "25px", title: null, subtitle: null, close: !0, body: null, class: null },
        rn = (function () {
            function e(e, t) {
                (this._config = t), this._prepareContainer(), n.default("body").trigger(n.default.Event($a));
            }
            var t = e.prototype;
            return (
                (t.create = function () {
                    var e = n.default('<div class="toast" role="alert" aria-live="assertive" aria-atomic="true"/>');
                    e.data("autohide", this._config.autohide),
                        e.data("animation", this._config.fade),
                        this._config.class && e.addClass(this._config.class),
                        this._config.delay && 500 != this._config.delay && e.data("delay", this._config.delay);
                    var t = n.default('<div class="toast-header">');
                    if (null != this._config.image) {
                        var a = n.default("<img />").addClass("rounded mr-2").attr("src", this._config.image).attr("alt", this._config.imageAlt);
                        null != this._config.imageHeight && a.height(this._config.imageHeight).width("auto"), t.append(a);
                    }
                    if (
                        (null != this._config.icon && t.append(n.default("<i />").addClass("mr-2").addClass(this._config.icon)),
                        null != this._config.title && t.append(n.default("<strong />").addClass("mr-auto").html(this._config.title)),
                        null != this._config.subtitle && t.append(n.default("<small />").html(this._config.subtitle)),
                        1 == this._config.close)
                    ) {
                        var i = n.default('<button data-dismiss="toast" />').attr("type", "button").addClass("ml-2 mb-1 close").attr("aria-label", "Close").append('<span aria-hidden="true">&times;</span>');
                        null == this._config.title && i.toggleClass("ml-2 ml-auto"), t.append(i);
                    }
                    e.append(t), null != this._config.body && e.append(n.default('<div class="toast-body" />').html(this._config.body)), n.default(this._getContainerId()).prepend(e);
                    var o = n.default("body");
                    o.trigger(n.default.Event(Ja)),
                        e.toast("show"),
                        this._config.autoremove &&
                            e.on("hidden.bs.toast", function () {
                                n.default(this).delay(200).remove(), o.trigger(n.default.Event(Wa));
                            });
                }),
                (t._getContainerId = function () {
                    return this._config.position == an ? Va : this._config.position == nn ? Ga : this._config.position == on ? Ka : this._config.position == ln ? Xa : void 0;
                }),
                (t._prepareContainer = function () {
                    if (0 === n.default(this._getContainerId()).length) {
                        var e = n.default("<div />").attr("id", this._getContainerId().replace("#", ""));
                        this._config.position == an ? e.addClass(Ya) : this._config.position == nn ? e.addClass(Za) : this._config.position == on ? e.addClass(en) : this._config.position == ln && e.addClass(tn), n.default("body").append(e);
                    }
                    this._config.fixed ? n.default(this._getContainerId()).addClass("fixed") : n.default(this._getContainerId()).removeClass("fixed");
                }),
                (e._jQueryInterface = function (t, a) {
                    return this.each(function () {
                        var i = n.default.extend({}, sn, a),
                            o = new e(n.default(this), i);
                        "create" === t && o[t]();
                    });
                }),
                e
            );
        })();
    (n.default.fn[Na] = rn._jQueryInterface),
        (n.default.fn[Na].Constructor = rn),
        (n.default.fn[Na].noConflict = function () {
            return (n.default.fn[Na] = Ba), rn._jQueryInterface;
        });
    var dn = "TodoList",
        fn = "lte.todolist",
        un = n.default.fn[dn],
        cn = '[data-widget="todo-list"]',
        hn = "done",
        gn = {
            onCheck: function (e) {
                return e;
            },
            onUnCheck: function (e) {
                return e;
            },
        },
        pn = (function () {
            function e(e, t) {
                (this._config = t), (this._element = e), this._init();
            }
            var t = e.prototype;
            return (
                (t.toggle = function (e) {
                    e.parents("li").toggleClass(hn), n.default(e).prop("checked") ? this.check(e) : this.unCheck(n.default(e));
                }),
                (t.check = function (e) {
                    this._config.onCheck.call(e);
                }),
                (t.unCheck = function (e) {
                    this._config.onUnCheck.call(e);
                }),
                (t._init = function () {
                    var e = this,
                        t = this._element;
                    t.find("input:checkbox:checked").parents("li").toggleClass(hn),
                        t.on("change", "input:checkbox", function (t) {
                            e.toggle(n.default(t.target));
                        });
                }),
                (e._jQueryInterface = function (t) {
                    return this.each(function () {
                        var a = n.default(this).data(fn);
                        a || (a = n.default(this).data());
                        var i = n.default.extend({}, gn, "object" == typeof t ? t : a),
                            o = new e(n.default(this), i);
                        n.default(this).data(fn, "object" == typeof t ? t : a), "init" === t && o[t]();
                    });
                }),
                e
            );
        })();
    n.default(window).on("load", function () {
        pn._jQueryInterface.call(n.default(cn));
    }),
        (n.default.fn[dn] = pn._jQueryInterface),
        (n.default.fn[dn].Constructor = pn),
        (n.default.fn[dn].noConflict = function () {
            return (n.default.fn[dn] = un), pn._jQueryInterface;
        });
    var mn = "Treeview",
        vn = "lte.treeview",
        _n = "." + vn,
        bn = n.default.fn[mn],
        Cn = "expanded" + _n,
        yn = "collapsed" + _n,
        wn = "load" + _n,
        xn = ".nav-item",
        In = ".nav-link",
        Tn = ".nav-treeview",
        Sn = ".menu-open",
        jn = '[data-widget="treeview"]',
        kn = "menu-open",
        Qn = "menu-is-opening",
        Hn = "sidebar-collapse",
        zn = { trigger: jn + " " + In, animationSpeed: 300, accordion: !0, expandSidebar: !1, sidebarButtonSelector: '[data-widget="pushmenu"]' },
        En = (function () {
            function e(e, t) {
                (this._config = t), (this._element = e);
            }
            var t = e.prototype;
            return (
                (t.init = function () {
                    n.default("" + xn + Sn + " " + Tn + Sn).css("display", "block"), this._setupListeners();
                }),
                (t.expand = function (e, t) {
                    var a = this,
                        i = n.default.Event(Cn);
                    if (this._config.accordion) {
                        var o = t.siblings(Sn).first(),
                            l = o.find(Tn).first();
                        this.collapse(l, o);
                    }
                    t.addClass(Qn),
                        e.stop().slideDown(this._config.animationSpeed, function () {
                            t.addClass(kn), n.default(a._element).trigger(i);
                        }),
                        this._config.expandSidebar && this._expandSidebar();
                }),
                (t.collapse = function (e, t) {
                    var a = this,
                        i = n.default.Event(yn);
                    t.removeClass(Qn + " " + kn),
                        e.stop().slideUp(this._config.animationSpeed, function () {
                            n.default(a._element).trigger(i), e.find(Sn + " > " + Tn).slideUp(), e.find(Sn).removeClass(Qn + " " + kn);
                        });
                }),
                (t.toggle = function (e) {
                    var t = n.default(e.currentTarget),
                        a = t.parent(),
                        i = a.find("> " + Tn);
                    if (i.is(Tn) || (a.is(xn) || (i = a.parent().find("> " + Tn)), i.is(Tn))) {
                        e.preventDefault();
                        var o = t.parents(xn).first(),
                            l = o.hasClass(kn);
                        l ? this.collapse(n.default(i), o) : this.expand(n.default(i), o);
                    }
                }),
                (t._setupListeners = function () {
                    var e = this,
                        t = void 0 !== this._element.attr("id") ? "#" + this._element.attr("id") : "";
                    n.default(document).on("click", "" + t + this._config.trigger, function (t) {
                        e.toggle(t);
                    });
                }),
                (t._expandSidebar = function () {
                    n.default("body").hasClass(Hn) && n.default(this._config.sidebarButtonSelector).PushMenu("expand");
                }),
                (e._jQueryInterface = function (t) {
                    return this.each(function () {
                        var a = n.default(this).data(vn),
                            i = n.default.extend({}, zn, n.default(this).data());
                        a || ((a = new e(n.default(this), i)), n.default(this).data(vn, a)), "init" === t && a[t]();
                    });
                }),
                e
            );
        })();
    n.default(window).on(wn, function () {
        n.default(jn).each(function () {
            En._jQueryInterface.call(n.default(this), "init");
        });
    }),
        (n.default.fn[mn] = En._jQueryInterface),
        (n.default.fn[mn].Constructor = En),
        (n.default.fn[mn].noConflict = function () {
            return (n.default.fn[mn] = bn), En._jQueryInterface;
        }),
        (e.CardRefresh = p),
        (e.CardWidget = q),
        (e.ControlSidebar = he),
        (e.DirectChat = we),
        (e.Dropdown = Fe),
        (e.ExpandableTable = Be),
        (e.Fullscreen = Ye),
        (e.IFrame = It),
        (e.Layout = Jt),
        (e.NavbarSearch = Oa),
        (e.PushMenu = da),
        (e.SidebarSearch = za),
        (e.Toasts = rn),
        (e.TodoList = pn),
        (e.Treeview = En),
        Object.defineProperty(e, "__esModule", { value: !0 });
});
