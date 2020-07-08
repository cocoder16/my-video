var a = document.querySelector('#a');
var b = document.querySelector('#b');
var c = document.querySelector('#c');
var d = document.querySelector('#d');

myVideo.create(a,'../videos/demoVideo_MyPlanner.mp4', 320, 180);
myVideo.create(b, '../videos/demoVideo_MyPlanner.mp4', '480px', '270px');
myVideo.create(c, '../videos/demoVideo_MyPlanner.mp4');
myVideo.create(d, '../videos/demoVideo_MyPlanner.mp4', '100%', '56.25%');
