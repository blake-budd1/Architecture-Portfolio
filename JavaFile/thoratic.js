const html = document.documentElement;
var canvas = document.querySelector('.scroll-anim');
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//change frame count to how many frames in thoratic file
const frameCount = 1513;
const currentFrame = index => (
    //change to our render frames of thoratic
    `mp4_to_JPEG/thoratic_compressed/Thoratic Project Page${index.toString().padStart(4, '0')}.jpg`
)
function start() {
  screen.addEventListener('resize', fitCanvas, false);
  fitCanvas();    // initial canvas border
}
function fitCanvas() {
  canvas.width = screen.innerWidth;
  canvas.height = screen.innerHeight;
  resize();
}
const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};
  // set this to false to maintain the canvas aspect ratio, or true otherwise
var stretch_to_fit = true;

const img = new Image();
img.src = currentFrame(1);

img.onload=function(){
  context.drawImage(img, 0, 0,img.width, img.height, 0, 0, canvas.width, canvas.height);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0,img.width, img.height, 0, 0, canvas.width, canvas.height);
}

window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  //console.log(scrollFraction)
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );
  console.log(frameIndex)
  requestAnimationFrame(() => updateImage(frameIndex + 1))
  
});


preloadImages()