# my-video

## purpose

커스텀 컨트롤바 DOM을 제작하여 video player를 인스턴스화 할 수 있는 모듈을 제작한다.
기본적인 컨트롤바만 콤팩트하게 제작함으로써, 추후 더 다양한 기능이 들어간 (react npm)모듈을 만들기 위한 코어 모듈이 될 것이다.

## Interface (outdated)

|parameter|type|description|
|---------|----|-----------|
|parentNode|Object|A video player will be created under this Element.|
|src|String|The path where a video is located must be specified.|
|[width]|Number or String|The video player's width (px or %). The default is 800px.|
|[height]|Number or String|The video player's height (px or %). The default is 450px.|

## reference

input range
https://www.cssportal.com/style-input-range/

비디오 조작 참고
https://mcatcher.github.io/2018/02/05/videotag.html

풀스크린 참고
https://wit.nts-corp.com/2014/06/26/1604
https://www.sitepoint.com/use-html5-full-screen-api/

툴팁 참고
https://stackoverflow.com/questions/52706615/styling-button-tooltip
https://webisfree.com/2015-05-14/[css]-%ED%95%B4%EB%8B%B9-contents%EC%9D%98-%EC%95%9E-%EB%92%A4%EC%97%90-%ED%8A%B9%EC%A0%95-%EB%AC%B8%EC%9E%A5-%EC%82%BD%EC%9E%85%ED%95%98%EA%B8%B0-content
https://programmingsummaries.tistory.com/369