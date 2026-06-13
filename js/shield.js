(function() {
    'use strict';

    if (window.location.pathname === '/devtoolprank' || window.location.pathname === '/devtoolprank.html') {
        return;
    }

    var _detected = false;

    function bang() {
        if (_detected) return;
        _detected = true;
        window.location.replace('/devtoolprank.html');
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault(); e.stopPropagation(); bang(); return false;
        }
        if ((e.ctrlKey || e.metaKey) && e.shiftKey &&
            (e.key === 'I' || e.key === 'i' ||
             e.key === 'J' || e.key === 'j' ||
             e.key === 'C' || e.key === 'c')) {
            e.preventDefault(); e.stopPropagation(); bang(); return false;
        }
        if ((e.ctrlKey || e.metaKey) && e.altKey &&
            (e.key === 'I' || e.key === 'i' ||
             e.key === 'J' || e.key === 'j' ||
             e.key === 'C' || e.key === 'c')) {
            e.preventDefault(); e.stopPropagation(); bang(); return false;
        }
        if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) {
            e.preventDefault(); e.stopPropagation(); bang(); return false;
        }
        if ((e.ctrlKey || e.metaKey) && (e.key === 'S' || e.key === 's')) {
            e.preventDefault(); e.stopPropagation(); bang(); return false;
        }
        if ((e.ctrlKey || e.metaKey) && (e.key === 'P' || e.key === 'p')) {
            e.preventDefault(); e.stopPropagation(); bang(); return false;
        }
        if ((e.ctrlKey || e.metaKey) && (e.key === 'A' || e.key === 'a')) {
            e.preventDefault(); e.stopPropagation(); bang(); return false;
        }
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'K' || e.key === 'k')) {
            e.preventDefault(); e.stopPropagation(); bang(); return false;
        }
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
            e.preventDefault(); e.stopPropagation(); bang(); return false;
        }
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'M' || e.key === 'm')) {
            e.preventDefault(); e.stopPropagation(); bang(); return false;
        }
    }, true);

    document.addEventListener('contextmenu', function(e) {
        e.preventDefault(); return false;
    }, true);

    setInterval(function() {
        if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) return;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return;

        var widthDiff  = window.outerWidth  - window.innerWidth;
        var heightDiff = window.outerHeight - window.innerHeight;

        if (widthDiff > 280 || heightDiff > 280) {
            bang();
        }
    }, 500);

    setInterval(function() {
        try { console.clear(); } catch(e) {}
    }, 1000);

    try {
        var noop = function() {};
        Object.defineProperty(window, 'console', {
            get: function() {
                return {
                    log: noop, warn: noop, error: noop, info: noop,
                    debug: noop, dir: noop, dirxml: noop, table: noop,
                    trace: noop, group: noop, groupEnd: noop, groupCollapsed: noop,
                    assert: noop, count: noop, countReset: noop,
                    time: noop, timeEnd: noop, timeLog: noop,
                    profile: noop, profileEnd: noop,
                    clear: noop, timeStamp: noop
                };
            },
            configurable: false
        });
    } catch(e) {}

    var style = document.createElement('style');
    style.textContent = 'body{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}input,textarea,[contenteditable]{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;}@media print{html,body{display:none !important;visibility:hidden !important;height:0 !important;width:0 !important;overflow:hidden !important;}}';
    document.head.appendChild(style);

    document.addEventListener('dragstart', function(e) {
        e.preventDefault(); return false;
    }, true);

    document.addEventListener('copy', function(e) {
        e.preventDefault(); return false;
    }, true);
    document.addEventListener('cut', function(e) {
        e.preventDefault(); return false;
    }, true);

    window.print = function() { return false; };
    window.addEventListener('beforeprint', function() { document.body.style.display = 'none'; });
    window.addEventListener('afterprint',  function() { document.body.style.display = ''; });

    (function detectBot() {
        var dominated = false;
        if (navigator.webdriver) dominated = true;
        if (/HeadlessChrome|PhantomJS|Electron|Nightmare/i.test(navigator.userAgent)) dominated = true;
        if (window._phantom || window.__nightmare || window.callPhantom) dominated = true;
        if (window.domAutomation || window.domAutomationController) dominated = true;
        if (document.documentElement.getAttribute('webdriver') !== null) dominated = true;
        if (window.__playwright || window.__pw_manual) dominated = true;
        if (dominated) { document.documentElement.innerHTML = ''; bang(); }
    })();

    setInterval(function() {
        if (navigator.webdriver || window._phantom || window.__nightmare ||
            window.domAutomation || window.domAutomationController ||
            window.__playwright || window.__pw_manual) {
            document.documentElement.innerHTML = '';
            bang();
        }
    }, 2000);

    if (window.top !== window.self) {
        try {
            if (window.top.location.hostname !== window.self.location.hostname) {
                window.top.location.href = window.self.location.href;
            }
        } catch(e) {
            window.top.location.href = window.self.location.href;
        }
    }

    (function getterTrap() {
        var el = new Image();
        Object.defineProperty(el, 'id', {
            get: function() { bang(); }
        });
        setInterval(function() {
            console.log('%c', el);
            console.clear();
        }, 1500);
    })();

    (function toStringTrap() {
        var devCheck = /./;
        devCheck.toString = function() { bang(); return ''; };
        setInterval(function() {
            console.log('%c', devCheck);
            console.clear();
        }, 2000);
    })();

    (function stripSourceMaps() {
        var meta = document.createElement('meta');
        meta.httpEquiv = 'SourceMap';
        meta.content = '';
        try { document.head.appendChild(meta); } catch(e) {}
    })();

    setInterval(function() {
        document.oncontextmenu = function() { return false; };
    }, 3000);

})();
