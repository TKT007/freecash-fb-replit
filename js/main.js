// ========================================
// DEVICE GATE - BLOCK DESKTOP CLICKS
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

    if (!window._isMobile) {
        document.addEventListener('DOMContentLoaded', function () {
            var cta = document.getElementById('cta');
            if (cta) {
                cta.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    alert('This app is only available on mobile devices. Please visit this page on your phone or tablet.');
                    return false;
                }, true);

                cta.removeAttribute('href');
                cta.style.opacity = '0.5';
                cta.style.cursor = 'not-allowed';
            }
        });
    }
})();


// ========================================
// FREECASH - AGE SELECTION & TRANSITION
// ========================================
var selectedAge = '';

function selectAge(age) {
    selectedAge = age;
    console.log('🎂 Age selected:', age);

    var firstStep = document.getElementById('firstStep');
    var secondStep = document.getElementById('secondStep');

    // Fade out first step
    firstStep.classList.add('fade-out');

    // Wait for fade out animation to complete
    setTimeout(function () {
        firstStep.classList.add('hidden');
        secondStep.classList.remove('hidden');

        // Force reflow to ensure animation triggers
        void secondStep.offsetWidth;

        // Trigger fade in animation
        secondStep.classList.add('fade-in');
    }, 400);
}


// ========================================
// TIKTOK TRACKING - CLIENT-SIDE ONLY
// ========================================
var CTA_URL = 'https://tk.unlockbonusapp.com/click';

function handleClick(event) {
    event.preventDefault();

    // Block desktop
    if (!window._isMobile) {
        alert('This app is only available on mobile devices. Please visit this page on your phone or tablet.');
        return false;
    }

    console.log('🚀 Button clicked! Firing client-side events...');

    // CLIENT-SIDE - 3 events
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

        console.log('✅ Client-side: AddToCart, CompleteRegistration & Purchase OK');
    } catch (e) {
        console.warn('⚠️ Client-side failed:', e);
    }

    // Redirect
    console.log('🔀 Redirecting to:', CTA_URL);
    window.location.href = CTA_URL;
}
