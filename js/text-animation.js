document.addEventListener('DOMContentLoaded', () => {
    const displayElements = document.querySelectorAll('.display-2');

    const animateNumber = (element, targetValue, duration) => {
        const startValue = 0;
        const startTime = performance.now();

        const updateNumber = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const currentValue = Math.floor(progress * targetValue);


            element.style.transition = 'color 0.3s ease, transform 1s ease';
            element.style.transform = 'scale(0.7)';
            element.style.color = 'red';

            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                    element.style.color = 'black';
                }, 300);
            }
        };

        requestAnimationFrame(updateNumber);
    };

    displayElements.forEach(element => {
        const targetValue = parseInt(element.textContent, 10);
        if (!isNaN(targetValue)) {
            animateNumber(element, targetValue, 3000);
        }
    });
});
