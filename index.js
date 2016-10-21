/**
 * Inject this script to facebook page to get it to work
 */
window.addEventListener('scroll', () => {
  var log = (...args) => true && console.log.call(console, ...args);
  //                       ^---- change this to false for debugging
  var video = null;
  document.querySelectorAll('video:not(.floating)').forEach(v => video = !v.paused ? v : video);
  if (video) {
    var rect = video.getBoundingClientRect();
    if (rect.top + rect.height > 0) {
      log('Found a playing video but still in viewport.');
      return;
    }
    log('Floated a video!');
    (function (video) {
      video.setAttribute('style', 'position: fixed; z-index: 99999; bottom: 0; width: 300px; height: 300px');
      video.addEventListener('mousemove', function () {
        video.parentNode.removeChild(video);
        log('Destroyed a video.');
      }, false);
      video.classList.add('floating');
      document.getElementsByTagName('body')[0].appendChild(video);
      video.play();
    })(video);
  } else {
    log('No playing hidden video found :)');
  }
}, false);
