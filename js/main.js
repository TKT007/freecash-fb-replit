// ========================================
// DEVICE DETECTION
// ========================================
(function () {
    function isMobileOrTablet() {
        var hasTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        var smallScreen = window.innerWidth <= 1024;
        var mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i.test(navigator.userAgent);
        var iPadSafari = (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        return (hasTouch && (smallScreen || mobileUA)) || iPadSafari || mobileUA;
    }

    window._isMobile = isMobileOrTablet();

    // ========================================
    // BLOCK RIGHT-CLICK (all devices)
    // ========================================
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        return false;
    });

    // ========================================
    // BLOCK DEVTOOLS SHORTCUTS (all devices)
    // ========================================
    document.addEventListener('keydown', function (e) {
        if (e.key === 'F12') { e.preventDefault(); return false; }
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i')) { e.preventDefault(); return false; }
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j')) { e.preventDefault(); return false; }
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.key === 'c')) { e.preventDefault(); return false; }
        if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) { e.preventDefault(); return false; }
        if ((e.ctrlKey || e.metaKey) && (e.key === 'S' || e.key === 's')) { e.preventDefault(); return false; }
    });

    // ========================================
    // DESKTOP = BLACK SCREEN (nothing shown)
    // ========================================
    if (!window._isMobile) {
        document.documentElement.style.cssText = 'background:#000!important;';

        function nukeDesktop() {
            document.body.innerHTML = '';
            document.body.style.cssText = 'background:#000!important;margin:0;padding:0;min-height:100vh;';
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', nukeDesktop);
        } else {
            nukeDesktop();
        }

        // Stop here - nothing else loads on desktop
        return;
    }
})();


// ========================================
// === BELOW ONLY RUNS ON MOBILE/TABLET ===
// ========================================

// ========================================
// AGE SELECTION & TRANSITION
// ========================================
var selectedAge = '';

function selectAge(age) {
    selectedAge = age;

    var firstStep = document.getElementById('firstStep');
    var secondStep = document.getElementById('secondStep');

    firstStep.classList.add('fade-out');

    setTimeout(function () {
        firstStep.classList.add('hidden');
        secondStep.classList.remove('hidden');
        void secondStep.offsetWidth;
        secondStep.classList.add('fade-in');
    }, 400);
}


// ========================================
// TIKTOK TRACKING + CTA
// ========================================
var CTA_URL = 'https://tk.unlockbonusapp.com/click';

function handleClick(event) {
    event.preventDefault();

    try {
        ttq.track('AddToCart', {
            content_type: 'product',
            content_id: 'freecash-tiktok-rewards',
            value: 1.00,
            currency: 'USD'
        });

        ttq.track('CompleteRegistration', {
            content_type: 'product',
            content_id: 'freecash-tiktok-rewards',
            value: 1.00,
            currency: 'USD'
        });

        ttq.track('Purchase', {
            content_type: 'product',
            content_id: 'freecash-tiktok-rewards',
            value: 1.00,
            currency: 'USD'
        });
    } catch (e) {}

    window.location.href = CTA_URL;
}
