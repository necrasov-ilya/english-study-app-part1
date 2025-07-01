(function () {
    window.scrollTo(0, 0);

    const video = document.createElement('video');

    video.src = 'materials/video/video.mp4';
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.style.position = 'fixed';
    video.style.top = '0';
    video.style.left = '0';
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';
    video.style.zIndex = '-1';
    video.style.transition = 'transform 1s ease, filter 1s ease';
    video.style.transform = 'translateY(-100%)';
    video.style.filter = 'blur(15px)';

    document.body.prepend(video);

    const postfElements = document.querySelectorAll('.postf');

    postfElements.forEach(el => {
        el.style.transition = 'color 1.5s ease';
    });

    const updateTextColor = (color) => {
        postfElements.forEach(el => {
            el.style.color = color;
        });
    };

    const header = document.querySelector('header'); 
    if (header) {
        header.style.transition = 'background 1s ease'; 
    }

    const updateHeaderBackground = (isPlaying) => {
        if (header) {
            if (isPlaying) {
                header.style.background = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'><filter id='noise'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noise)' fill='black' opacity='0.05'/></svg>")`;
            } else {
                header.style.background = 'rgba(30, 30, 30, 0.7)';
            }
        }
    };

    video.addEventListener('play', () => {
        updateTextColor('#ffffff');
        updateHeaderBackground(true);
    });

    video.addEventListener('pause', () => {
        updateTextColor('#777777');
        updateHeaderBackground(false);
    });

    const container = document.querySelector('.container');

    if (container) {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.style.transform = 'translateY(0)';
                    video.style.filter = 'blur(0px)';
                    if (video.paused) video.play();
                } else {
                    video.style.transform = 'translateY(-100%)';
                    video.style.filter = 'blur(15px)';
                    if (!video.paused) video.pause();
                }
            },
            { threshold: 0.9 }
        );

        observer.observe(container);
    } else {
        console.warn('Ошибка в наблюдении, проверьте video.js');
    }
})();
