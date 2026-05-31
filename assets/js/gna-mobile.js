(function () {
    function ready(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    ready(function () {
        var menu = document.getElementById('menu');
        var logoSection = document.getElementById('logo');
        if (!menu || !logoSection) return;

        if (!document.querySelector('.mobile-menu-toggle')) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'mobile-menu-toggle';
            btn.setAttribute('aria-label', 'Toggle navigation');
            btn.setAttribute('aria-expanded', 'false');
            btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/></svg>';
            logoSection.style.position = 'relative';
            logoSection.insertBefore(btn, logoSection.firstChild);

            btn.addEventListener('click', function () {
                var isOpen = menu.classList.toggle('menu-open');
                btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            });
        }

        function isMobile() { return window.innerWidth <= 768; }

        function disableBsDropdownsOnMobile() {
            if (!isMobile()) return;
            document.querySelectorAll('.menu-list .dropdown-toggle').forEach(function (toggle) {
                if (toggle.dataset._bsToggleOrig === undefined && toggle.hasAttribute('data-bs-toggle')) {
                    toggle.dataset._bsToggleOrig = toggle.getAttribute('data-bs-toggle');
                    toggle.removeAttribute('data-bs-toggle');
                }
                if (window.bootstrap && window.bootstrap.Dropdown) {
                    var inst = window.bootstrap.Dropdown.getInstance(toggle);
                    if (inst) inst.dispose();
                }
            });
            document.querySelectorAll('.menu-list .dropdown-menu').forEach(function (m) {
                m.classList.remove('show');
                m.removeAttribute('data-popper-placement');
                m.removeAttribute('data-popper-escaped');
                m.style.removeProperty('position');
                m.style.removeProperty('inset');
                m.style.removeProperty('transform');
                m.style.removeProperty('margin');
            });
        }

        function restoreBsDropdownsOnDesktop() {
            if (isMobile()) return;
            document.querySelectorAll('.menu-list .dropdown-toggle').forEach(function (toggle) {
                if (toggle.dataset._bsToggleOrig !== undefined) {
                    toggle.setAttribute('data-bs-toggle', toggle.dataset._bsToggleOrig);
                    delete toggle.dataset._bsToggleOrig;
                }
            });
        }

        disableBsDropdownsOnMobile();

        document.querySelectorAll('.menu-list .dropdown-toggle').forEach(function (toggle) {
            toggle.addEventListener('click', function (e) {
                if (isMobile()) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    var parent = toggle.parentElement;
                    document.querySelectorAll('.menu-list li.mobile-open').forEach(function (li) {
                        if (li !== parent) li.classList.remove('mobile-open');
                    });
                    parent.classList.toggle('mobile-open');
                }
            }, true);
        });

        document.addEventListener('click', function (e) {
            if (window.innerWidth <= 768 && menu.classList.contains('menu-open')) {
                if (!menu.contains(e.target) && !e.target.closest('.mobile-menu-toggle')) {
                    menu.classList.remove('menu-open');
                    var t = document.querySelector('.mobile-menu-toggle');
                    if (t) t.setAttribute('aria-expanded', 'false');
                }
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) {
                menu.classList.remove('menu-open');
                document.querySelectorAll('.menu-list li.mobile-open').forEach(function (li) {
                    li.classList.remove('mobile-open');
                });
                restoreBsDropdownsOnDesktop();
            } else {
                disableBsDropdownsOnMobile();
            }
        });
    });
})();
