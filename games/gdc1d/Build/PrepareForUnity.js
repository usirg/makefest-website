function AdaptedLaunchUnity () {

    var buildUrl = 'games/gdc1d/Build';
    var loaderUrl = buildUrl + '/Build.loader.js';
    var config = {
      dataUrl: buildUrl + '/Build.data.unityweb',
      frameworkUrl: buildUrl + '/Build.framework.js.unityweb',
      codeUrl: buildUrl + '/Build.wasm.unityweb',
      streamingAssetsUrl: 'StreamingAssets',
      companyName: 'SimHub',
      productName: 'GDC',
      productVersion: '0.1',
    };
  
    var canvas = document.querySelector('#unity-canvas');
    var loadingBar = document.querySelector('#unity-loading-bar');
    var progressBarFull = document.querySelector('#unity-progress-bar-full');
  
    // By default Unity keeps WebGL canvas render target size matched with
    // the DOM size of the canvas element (scaled by window.devicePixelRatio)
    // Set this to false if you want to decouple this synchronization from
    // happening inside the engine, and you would instead like to size up
    // the canvas DOM size and WebGL render target sizes yourself.
    // config.matchWebGLToCanvasSize = false;
  
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      // Avoid draining fillrate performance on mobile devices,
      // and default/override low DPI mode on mobile browsers.
      config.devicePixelRatio = 1;
    }
    
    loadingBar.style.display = 'block';
  
    var script = document.createElement('script');
    script.src = loaderUrl;
    script.onload = () => {
      createUnityInstance(canvas, config, (progress) => { 
        progressBarFull.style.width = 100 * progress + '%';
      }).then((unityInstance) => {
        loadingBar.style.display = 'none';
        fullscreenButton.onclick = () => {
          unityInstance.SetFullscreen(1);
        };
      }).catch((message) => {
        alert(message);
      });
    };
    document.body.appendChild(script);
    
  }

  function PrepareForUnity(evt) {
    var callerElement = evt.target;
    var callerParent = callerElement.parentElement;
    var inPageCanvas = callerParent.querySelector('.canvas');
    var image = callerParent.querySelector('.image');
    var checkbox = callerParent.querySelector('.toggle-checkbox');

    alert(callerElement.src);

  }