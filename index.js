window.addEventListener('scroll', () => {
  var log = (...args) => false && console.log.call(console, ...args);
  //                       ^---- change this to true for debugging
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
      var oldStyle = video.getAttribute('style');
      var oldParent = video.parentNode;
      video.setAttribute('style', 'position: fixed; z-index: 99999; bottom: 0; width: 300px; height: 300px');

      const handler = function () {
        // video.parentNode.removeChild(video);
        video.setAttribute('style', oldStyle);
        video.classList.remove('floating');
        oldParent.appendChild(video);
        video.removeEventListener('mousemove', handler);
        log('Put the video back to where it is.');
      };

      video.addEventListener('mousemove', handler, false);
      video.classList.add('floating');
      document.getElementsByTagName('body')[0].appendChild(video);
      video.play();
    })(video);
  } else {
    log('No playing hidden video found :)');
  }
}, false);
console.log('Facebook Floating Video initiated!');
