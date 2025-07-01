const primaryColor = "#904CFF";
const DELAY_AFTER_FULL_LOAD = 600;

const style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
:root {
  --primary-color: ${primaryColor};
}

#preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  color: #FFFFFF;
  font-family: 'Involve', sans-serif;
  text-align: center;
}

.loader {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 146px;
  height: 146px;
  margin-bottom: 25px;
}

.loader::before,
.loader::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  animation-duration: 1.8s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  filter: drop-shadow(0 0 11px var(--primary-color));
}

.loader::before {
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 0 17px var(--primary-color);
  animation-name: pulsA;
}

.loader::after {
  width: calc(100% - 34px);
  height: calc(100% - 34px);
  box-shadow: 0 0 0 0 var(--primary-color);
  animation-name: pulsB;
}

@keyframes pulsA {
  0% {
    box-shadow: inset 0 0 0 17px var(--primary-color);
    opacity: 1;
  }
  50%, 100% {
    box-shadow: inset 0 0 0 0 var(--primary-color);
    opacity: 0;
  }
}

@keyframes pulsB {
  0%, 50% {
    box-shadow: 0 0 0 0 var(--primary-color);
    opacity: 0;
  }
  100% {
    box-shadow: 0 0 0 17px var(--primary-color);
    opacity: 1;
  }
}

.preloader-text {
  font-size: 1.5em;
  font-weight: 500;
  letter-spacing: 0.5px;
  margin-bottom: 20px;
  transition: opacity 0.5s ease, transform 0.5s ease;
  opacity: 0;
  transform: translateY(10px);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  min-height: 1.5em;
  padding: 0 10px;
}

.preloader-text.visible {
  opacity: 1;
  transform: translateY(0);
}

.progress-bar {
  width: 260px;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  margin-top: 20px;
  overflow: hidden;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
}

.progress {
  width: 0%;
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color),rgb(255, 255, 255));
  border-radius: 4px;
  transition: width 1s ease;
}`;
document.head.appendChild(style);

const preloader = document.createElement('div');
preloader.id = 'preloader';

const loader = document.createElement('div');
loader.className = 'loader';

const preloaderText = document.createElement('div');
preloaderText.className = 'preloader-text';

const progressBarContainer = document.createElement('div');
progressBarContainer.className = 'progress-bar';

const progressBar = document.createElement('div');
progressBar.className = 'progress';

progressBarContainer.appendChild(progressBar);
preloader.appendChild(loader);
preloader.appendChild(preloaderText);
preloader.appendChild(progressBarContainer);
document.body.appendChild(preloader);

const messages = [
  "Make English localization...",
  "Eating scripts...",
  "fry students...",
  "Check coffee...",
  "Formatting the brains of students...",
  "Page still doesn't load. Why?...",
  "I'm trying my best to load the page...",
  "Breaking 4th wall...",
  "Reloading the matrix...",
];

let messageIndex = 0;
let progress = 0;
let isLoaded = false;

function updateCycle() {
  preloaderText.classList.remove('visible');
  setTimeout(() => {
    preloaderText.textContent = messages[messageIndex];
    preloaderText.classList.add('visible');
    messageIndex = (messageIndex + 1) % messages.length;
  }, 300);
  
  const increment = Math.floor(Math.random() * 6) + 10;
  if (!isLoaded) {
    progress = Math.min(progress + increment, 90);
  } else {
    progress = Math.min(progress + increment, 100);
  }
  progressBar.style.width = progress + '%';
}

const cycleInterval = setInterval(updateCycle, 1000);

window.addEventListener('load', () => {
  isLoaded = true;
  setTimeout(() => {
    clearInterval(cycleInterval);
    progress = 100;
    progressBar.style.width = '100%';
    
    preloader.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    preloader.style.opacity = '0';
    preloader.style.transform = 'scale(1.1)';
    setTimeout(() => {
      preloader.remove();
    }, 800);
  }, DELAY_AFTER_FULL_LOAD);
});
