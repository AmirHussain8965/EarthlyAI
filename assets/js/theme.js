/**
 * Theme toggle: Light / Dark mode with localStorage and system preference.
 * Dark theme is the default fallback. Applies theme to <html data-theme="...">.
 */

(function () {
    "use strict";

    var STORAGE_KEY = "earthlyai-theme";
    var THEME_DARK = "dark";
    var THEME_LIGHT = "light";

    function getStoredTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function setStoredTheme(theme) {
        try {
            if (theme) {
                localStorage.setItem(STORAGE_KEY, theme);
            } else {
                localStorage.removeItem(STORAGE_KEY);
            }
        } catch (e) {}
    }

    function getSystemPreference() {
        if (typeof window.matchMedia !== "function") return null;
        return window.matchMedia("(prefers-color-scheme: light)").matches ? THEME_LIGHT : THEME_DARK;
    }

    function applyTheme(theme) {
        var doc = document.documentElement;
        if (theme === THEME_LIGHT) {
            doc.setAttribute("data-theme", THEME_LIGHT);
        } else {
            doc.setAttribute("data-theme", THEME_DARK);
        }
        var toggle = document.getElementById("themeToggle");
        if (toggle) {
            toggle.setAttribute("aria-label", theme === THEME_LIGHT ? "Switch to dark theme" : "Switch to light theme");
        }
    }

    function getEffectiveTheme() {
        var stored = getStoredTheme();
        if (stored === THEME_LIGHT || stored === THEME_DARK) {
            return stored;
        }
        return getSystemPreference() || THEME_DARK;
    }

    function init() {
        var theme = getEffectiveTheme();
        applyTheme(theme);

        var toggle = document.getElementById("themeToggle");
        if (toggle) {
            toggle.addEventListener("click", function () {
                var current = document.documentElement.getAttribute("data-theme");
                var next = current === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
                applyTheme(next);
                setStoredTheme(next);
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    window.addEventListener("storage", function (e) {
        if (e.key === STORAGE_KEY && e.newValue) {
            applyTheme(e.newValue === THEME_LIGHT ? THEME_LIGHT : THEME_DARK);
        }
    });
})();
