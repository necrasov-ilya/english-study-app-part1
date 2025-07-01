// анимка для переноса на якорь
function scrollToAnchor(anchorId) {
    const target = document.getElementById(anchorId) || document.querySelector(`.${anchorId}`);
    if (target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offset = -150;  // Смещение

        window.scrollTo({
            top: targetPosition + offset,
            behavior: 'smooth'
        });
    }
}

(function() {
    const header = document.querySelector('header');


    const svgNS = "http://www.w3.org/2000/svg";
    const svgEl = document.createElementNS(svgNS, "svg");
    const pathEl = document.createElementNS(svgNS, "path");
    svgEl.classList.add("pill-svg");
    pathEl.classList.add("pill-path");
    svgEl.appendChild(pathEl);
    header.appendChild(svgEl);


    let currentOffset = 0;    
    let targetOffset = 0;     
    let isAnimating = false; 

    function setupPillPath() {

        const rect = header.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;


        svgEl.setAttribute("width", w);
        svgEl.setAttribute("height", h);


        const r = h / 2;

        const d = [
            `M ${r},0`,           
            `H ${w - r}`,        
            `A ${r},${r} 0 0 1 ${w},${r}`,
            `V ${h - r}`,
            `A ${r},${r} 0 0 1 ${w - r},${h}`,
            `H ${r}`,
            `A ${r},${r} 0 0 1 0,${h - r}`,
            `V ${r}`,
            `A ${r},${r} 0 0 1 ${r},0`,
            `Z`
        ].join(" ");

        pathEl.setAttribute("d", d);


        const length = pathEl.getTotalLength();
        pathEl.style.strokeDasharray = length;

        pathEl.style.strokeDashoffset = length;
        currentOffset = length;  
        targetOffset = length;   
    }

    setupPillPath();

    window.addEventListener('resize', setupPillPath);


    function animate() {
        if (!isAnimating) return;

        const diff = targetOffset - currentOffset;

        if (Math.abs(diff) > 0.1) {
            currentOffset += diff * 0.1;
            pathEl.style.strokeDashoffset = currentOffset;
            requestAnimationFrame(animate);
        } else {

            currentOffset = targetOffset;
            pathEl.style.strokeDashoffset = currentOffset;
            isAnimating = false;
        }
    }


    window.addEventListener('scroll', () => {

        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) || 0; 


        const length = pathEl.getTotalLength();
        targetOffset = length * (1 - scrollPercent);

        if (!isAnimating) {
            isAnimating = true;
            requestAnimationFrame(animate);
        }
    });
})();

