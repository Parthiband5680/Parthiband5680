// Function to handle the scratch effect
function setupScratchCard() {
    const canvas = document.getElementById('scratchCanvas');
    const ctx = canvas.getContext('2d');

    // Fill canvas with a scratch-off layer
    ctx.fillStyle = '#999'; // Color of the scratch-off layer
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw a gray rectangle to cover the canvas
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = '#eee'; // Background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Function to scratch
    function scratch(x, y) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2, false);
        ctx.fill();
    }
   // Mouse and touch events
   let isScratching = false;
    
   canvas.addEventListener('mousedown', (e) => {
       isScratching = true;
       scratch(e.offsetX, e.offsetY);
   });
   
   canvas.addEventListener('mousemove', (e) => {
       if (isScratching) {
           scratch(e.offsetX, e.offsetY);
       }
   });
   
   canvas.addEventListener('mouseup', () => {
       isScratching = false;
   });
   
   canvas.addEventListener('mouseleave', () => {
       isScratching = false;
   });

   

   // Handle touch events for mobile
   canvas.addEventListener('touchstart', (e) => {
       isScratching = true;
       const rect = canvas.getBoundingClientRect();
       scratch(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
   });
 
   canvas.addEventListener('touchmove', (e) => {
    if (isScratching) {
        const rect = canvas.getBoundingClientRect();
        scratch(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
    }
});

canvas.addEventListener('touchend', () => {
    isScratching = false;
});
}

// Function to update the date and time
function updateDateTime() {
const now = new Date();

const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

document.getElementById('date').textContent = now.toLocaleDateString(undefined, optionsDate);
document.getElementById('time').textContent = now.toLocaleTimeString(undefined, optionsTime);
}
// Initialize functions
document.addEventListener('DOMContentLoaded', () => {
    setupScratchCard();
    setInterval(updateDateTime, 1000);
    updateDateTime(); // Initial call to display date and time immediately
});