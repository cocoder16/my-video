# my-video

This is not a module but just a source code which store the idea to make a video player module later.

## Achievement

  * Cross browsing experience with Fullscreen API.
  * Designed Video Player using video tag.
  * Learned various CSS techniques.

## How to use

```
myVideo.create(parentNode, src, width, height);
```

|parameter|type|description|
|---------|----|-----------|
|parentNode|Object|A video player will be created under this Element.|
|src|String|The path where a video is located must be specified.|
|[width]|Number|The video player's width (px). The default is 800.|
|[height]|Number|The video player's height (px). The default is 450.|

## Features

  * This video player have buttons that play or pause btn, stop btn, mute or not btn, zoom in or out btn and fullscreen or not btn.
  * Also a progress bar and volume bar which can be controlled by user.
  * Various short keys provide convenience to users.

## Not Supported

  * The IE doesn't show tooltip when mouse over the buttons.
  * IE 10 and below doesn't support fullscreen API so fullscreen button is disabled.
