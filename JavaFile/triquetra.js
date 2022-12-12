const html = document.documentElement;
var canvas = document.querySelector('.scroll-anim');
const context = canvas.getContext("2d");
const container = document.querySelector('showcase');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const frameCount = 785;
const currentFrame = index => (
  `mp4_to_JPEG/t_new_frames/frame${index.toString()}.jpg`
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
/*
function resize() {
  // aspect ratio
  
  var widthToHeight = canvas.width / canvas.height;
  var newWidthToHeight = widthToHeight;

  // cache the window dimensions (discount the border)
  var newWidth = window.innerWidth,
      newHeight = window.innerHeight;

  if (stretch_to_fit) {
      // overwrite the current canvas aspect ratio to fit the entire screen
      widthToHeight = window.innerWidth / window.innerHeight;
  } else {
      newWidthToHeight = newWidth / newHeight;
  }

  
  // scale the container using CSS		
  if (newWidthToHeight > widthToHeight) {
      newWidth = newHeight * widthToHeight;
      //container.style.height = newHeight + 'px';

      canvas.style.width = newWidth + 'px';

  } else {
      newHeight = newWidth / widthToHeight;
      canvas.style.width = newWidth + 'px';
     
      //container.style.height = newHeight + 'px';
  }

  // adjust the container position 
  // (a visual sugar that centralises the canvas on result page)
  canvas.style.marginTop = (-newHeight / 2) + 'px';
  canvas.style.marginLeft = (-newWidth / 2) + 'px';

};
 // listen to resize events
window.addEventListener('resize', function () {
  resize();
}, false);
*/
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
  context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
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
  //console.log(frameIndex)
  requestAnimationFrame(() => updateImage(frameIndex + 1))

});



preloadImages()