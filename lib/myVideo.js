// IE 기능제약
// 모든버전
// 툴팁출력 안됨, 키보드 단축키로 전체모드 변화 지원 안됨. (esc만 됨). 
// < 10
// fullscreenAPI 자체가 지원이 안됨.

// 크로스 브라우징
// IE 기능o, 브라우저별 css, IE 이미지계단,

var myVideo = (function () {
    //elements
    var selectorList = {
        video: 'video',
        controlbar: '.controlbar',
        progressbar: '.progress .bar',
        playBtn: '.play-btn',
        stopBtn: '.stop-btn',
        muteBtn: '.mute-btn',
        volumebar: '.volume .bar',
        currentTimeText: '.current-time-text',
        totalTimeText: '.total-time-text',
        zoomBtn: '.zoom-btn',
        fullBtn: '.full-btn',
        alertImgSkipNext: '.alert-img.skip-next',
        alertImgSkipPrev: '.alert-img.skip-prev',
        alertImgVolumeUp: '.alert-img.volume-up',
        alertImgVolumeDown: '.alert-img.volume-down',
        alertImgPlay: '.alert-img.play',
        alertImgPause: '.alert-img.pause',
        alertImgStop: '.alert-img.stop'
    };

    //버튼들의 상태
    var playBtnStateList = { onpause: '재생', onplay: '일시정지', onend: '다시보기' };
    var stopBtnStateList = { onalways: '정지' };
    var muteBtnStateList = { onsound: '음소거', offsound: '음소거해제' };
    var zoomBtnStateList = { onzoomout: '영화관모드', onzoomin: '기본모드' };
    var fullBtnStateList = { onbasic: '전체화면', onfull: '전체화면종료' };

    // 기본데이터
    var controlbarClass = ['controlbar', 'controlbar show'];
    var isMouseHidden = false;
    var skipTime = 5;
    var shortKeyArr = [ 32, 67, 77, 84, 13, 37, 38, 39, 40 ];
    var timeout;

    //시분초 계산
    var timeFormat = function (s) {
        var hour = Math.floor(s / 3600);
        var min = Math.floor((s - hour * 3600) / 60);
        var sec = Math.floor(s - (hour * 3600 + min * 60));
        if (min < 10) {
            min = "0" + min;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }
        return hour + ":" + min + ":" + sec;
    };

    var createVideoTemplate = function (src, width, height) {
        var template = 
            '<div class="my-video" style="width:' + width + 'px; height:' + height + 'px;">' +
                '<div class="video-wrap">' +
                    '<video width=' + width + ' height=' + height + '>' +
                        '<source src="' + src + '"/>' +
                    '</video>' +
                '</div>' +
                '<div class="controlbar show">' +
                    '<div class="progress">' +
                        '<input type="range" class="bar focusable" min=0 value=0>' +
                    '</div>' +
                    '<div class="cell-wrap">' +
                        '<div class="cell">' +
                            '<button class="play-btn left focusable"></button>' +
                        '</div>' +
                        '<div class="cell">' +
                            '<button class="stop-btn left focusable"</button>' +
                        '</div>' +
                        '<div class="cell">' +
                            '<button class="mute-btn left focusable"></button>' +
                        '</div>' +
                        '<div class="volume">' +
                            '<input type="range" class="bar focusable" min=0 max=1 step=0.01 value=1>' +
                        '</div>' +
                        '<div class="text cell">' +
                            '<span class="current-time-text">0:00:00</span> / ' +
                            '<span class="total-time-text">0:00:00</span>' +
                        '</div>' +
                        '<div></div>' +
                        '<div class="cell">' +
                            '<button class="zoom-btn right focusable"></button>' +
                        '</div>' +
                        '<div class="cell">' +
                            '<button class="full-btn right focusable"></button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="alert-img skip-next"></div>' +
                '<div class="alert-img skip-prev"></div>' +
                '<div class="alert-img volume-up"></div>' +
                '<div class="alert-img volume-down"></div>' +
                '<div class="alert-img play"></div>' +
                '<div class="alert-img pause"></div>' +
                '<div class="alert-img stop"></div>' +
            '</div>'
        ;
        return template;
    };

    // 버튼 생성자
    var btnKey = (function () {
        function btnKey (vp, btnElement, btnStateList, shortKey, handleWhenFire) {
            this.btnElement = btnElement;
            this.btnStateList = btnStateList;
            this.shortKey = shortKey;
            this.handleWhenFire = handleWhenFire;
            this.state;

            this.changeBtnState(Object.keys(this.btnStateList)[0]);

            this.btnElement.addEventListener('click', function () {
                handleWhenFire(vp);
            });
        }

        btnKey.prototype.changeBtnState = function (nextState) {
            for (var i in this.btnStateList) {
                if (i !== nextState) {
                    this.btnElement.classList.remove(i); //css위해서?
                } else {
                    this.btnElement.classList.add(i);
                    this.state = i;
                    //툴팁
                    var text = this.btnStateList[i] + '(' + this.shortKey + ')';
                    this.btnElement.setAttribute('data-tooltip', text);
                }
            }
        }

        return btnKey;
    })();
    
    //버튼 생성함수 (생성자함수이용), 리턴값을 create()내 video에 할당.
    var createBtnList = function (vp) {
        vp.btnKey['32'] = new btnKey (vp, vp.elements.playBtn, playBtnStateList, 'spacebar', function (vp) {
            playOrPause(vp);
        });
        vp.btnKey['67'] = new btnKey (vp, vp.elements.stopBtn, stopBtnStateList, 'c', function (vp) {
            stop(vp);
        });
        vp.btnKey['77'] = new btnKey (vp, vp.elements.muteBtn, muteBtnStateList, 'm', function (vp) {
            changeMute(vp);
        });
        vp.btnKey['84'] = new btnKey (vp, vp.elements.zoomBtn, zoomBtnStateList, 't', function (vp) {
            changeVideoZoom(vp);
        });
        vp.btnKey['13'] = new btnKey (vp, vp.elements.fullBtn, fullBtnStateList, 'enter', function (vp) {
            fullScreenController.changeFullscreen(vp);
            if (browser.name == 'IE') {
                vp.state.isFull = !vp.state.isFull;
                changeVideoFull(vp);
            }
        });
    };

    // event handler definition
    var play = function (vp) {
        vp.state.isPlay = true;
        vp.btnKey['32'].changeBtnState('onplay');
        vp.video.play();
    };

    var pause = function (vp) {
        vp.state.isPlay = false;
        vp.btnKey['32'].changeBtnState('onpause');
        vp.video.pause();
        revealBoth(vp);
    };

    var playOrPause = function (vp) {
        if (vp.state.isPlay) {
            pause(vp);
        } else {
            play(vp);
        }
    };

    var stop = function (vp) {
        vp.video.currentTime = 0;
        pause(vp);
    };

    var changeMute = function (vp) {
        var turnOn = function () {
            vp.video.volume = vp.state.volumeValue;
            vp.elements.volumebar.value = vp.state.volumeValue;
            vp.btnKey['77'].changeBtnState('onsound');
        }
        if (vp.video.volume == 0 && vp.state.volumeValue != 0) {
            turnOn();
        } else if (vp.video.volume ==0 && vp.state.volumeValue == 0) {
            vp.state.volumeValue = 1;
            turnOn();
        } else {
            vp.video.volume = 0;
            vp.elements.volumebar.value = 0;
            vp.btnKey['77'].changeBtnState('offsound');
        }
    };

    var changeVolume = function (vp) {
        vp.video.volume = vp.elements.volumebar.value;
        vp.state.volumeValue = vp.video.volume;
        if (vp.elements.volumebar.value != 0){
            vp.btnKey['77'].changeBtnState('onsound');
        } else {
            vp.btnKey['77'].changeBtnState('offsound');
        }
    };

    var hideControlbar = function (vp) { 
        console.log('x')
        console.log(vp);
        vp.elements.controlbar.className = controlbarClass[0];
    };

    var revealControlbar = function (vp) {
        vp.elements.controlbar.className = controlbarClass[1];
    };

    var hideMouse = function () {
        isMouseHidden = true;
        var body = document.querySelector('body');
        body.style.cursor = 'none';
    };

    var revealMouse = function () {
        isMouseHidden = false;
        var body = document.querySelector('body');
        body.style.cursor = 'default';
    };
    
    var hideBoth = function (vp) {
        hideControlbar(vp); hideMouse();
    };

    var revealBoth = function (vp) {
        revealControlbar(vp); revealMouse();
    };

    var controlProgress = function (vp) {
        vp.video.currentTime = vp.elements.progressbar.value;
        vp.elements.currentTimeText.textContent = timeFormat(vp.video.currentTime);
        if (vp.elements.progressbar.value == vp.state.maxTime){
            vp.btnKey['32'].changeBtnState('onend');
        } else {
            if (vp.state.isPlay) {
                vp.btnKey['32'].changeBtnState('onplay');
            } else {
                vp.btnKey['32'].changeBtnState('onpause');
            }
        }
    };

    //사이즈 조절 함수
    var setSize = function (vp, width, height) {
        vp.parent.style.width = width;
        vp.parent.style.height = height;
        vp.videoframe.style.width = '100%';
        vp.videoframe.style.height = '100%';
        vp.video.style.width = '100%';
        vp.video.style.height = '100%';
    };
    var sizeToFull = function (vp) {
        setSize(vp, '100%', '100%'); //IE
        vp.elements.zoomBtn.style.display = 'none';
        vp.btnKey['13'].changeBtnState('onfull');
    };
    var sizeToBasic = function (vp) {
        setSize(vp, vp.state.width, vp.state.height);
        vp.elements.zoomBtn.style.display = 'inline-block';
        vp.btnKey['13'].changeBtnState('onbasic');
    };
    var resizeVideo = function (vp) {
        setSize(vp, '100%', 'auto');
        if (vp.video.getBoundingClientRect().height > window.innerHeight*0.8){
            setSize(vp, '100%', window.innerHeight * 0.8 + 'px');
        }  
    };

    var changeVideoZoom = function (vp) {
        if (!vp.state.isFull){
            if (!vp.state.isZoomIn){
                vp.state.isZoomIn = true;
                vp.btnKey['84'].changeBtnState('onzoomin');
                resizeVideo(vp);
            } else {
                vp.state.isZoomIn = false;
                vp.btnKey['84'].changeBtnState('onzoomout');
                sizeToBasic(vp);
            }
        }
    };

    var handleTurnOnFullscreen = function (vp) {
        console.log('on');
        sizeToFull(vp);
    };

    var handleTurnOffFullscreen = function (vp) {
        clearTimeout(timeout);
        sizeToBasic(vp);
        revealBoth(vp);
        if (vp.state.isZoomIn) {
            resizeVideo(vp);
        }
    };

    var changeVideoFull = function (vp) {
        if (vp.state.isFull) {
            console.log('on');
            handleTurnOnFullscreen(vp);
        } else {
            console.log('off');
            handleTurnOffFullscreen(vp);
        }
    };

    //방치
    var hideWhenIdle = function (vp) { 
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(function () {
            if (!isMouseHidden) {
                hideBoth(vp);
            }
        }, 3000);
        if (isMouseHidden) {
            revealBoth(vp);
        }
    };

    //alert-img 
    var removeAlertImg = function (className) {
        var removeTar = document.querySelector('.alert-img.' + className);
        while (removeTar){
            removeTar.classList.remove(className);
            removeTar = document.querySelector('.alert-img.' + className);
        }
    };
    var showAlertImgStart = function (targetEle) {
        removeAlertImg('show-up-start');
        removeAlertImg('show-up-end');
        targetEle.classList.add("show-up-start");
    };
    var showAlertImgEnd = function (targetEle) {
        removeAlertImg('show-up-start');
        removeAlertImg('show-up-end');
        targetEle.classList.add("show-up-end");
    };

    //키보드
    var preControl = function (vp, event) {
        if (shortKeyArr.indexOf(event.keyCode) >= 0) {
            control(vp, event);
        }
    };

    var handleShowAlertImg = function (vp, key, method) {
        console.log(vp);
        console.log(key);
        console.log(method);
        switch (key) {
            case 32 :
                if (vp.state.isPlay) method(vp.elements.alertImgPlay);
                else method(vp.elements.alertImgPause);
                break;
            case 67 :
                method(vp.elements.alertImgStop);
                break;
            case 77 :
                if (vp.btnKey['77'].state == 'offsound') method(vp.elements.alertImgVolumeDown);
                else method(vp.elements.alertImgVolumeUp);
                break;
            case 37 :
                method(vp.elements.alertImgSkipPrev);
                break;
            case 38 :
                method(vp.elements.alertImgVolumeUp);
                break;
            case 39 :
                method(vp.elements.alertImgSkipNext);
                break;
            case 40 :
                method(vp.elements.alertImgVolumeDown);
                break;
        }
    };

    var preShowAlertImg = function (vp, key) {
        handleShowAlertImg(vp, key, showAlertImgStart);
    };

    var postShowAlertImg = function (vp, key) {
        handleShowAlertImg(vp, key, showAlertImgEnd);
    };
    
    var control = function (vp, event) {
        event.preventDefault();
        var key = event.keyCode;
        if (vp.btnKey[key] && !(key == 13 && browser.name == 'IE')) { //IE에서는 키보드 이벤트로 전체화면이 안됨
            vp.btnKey[key].handleWhenFire(vp);
        } else {
            switch (key) {
                case 37 :
                    if (vp.btnKey['32'].state === 'onend'){
                        vp.btnKey['32'].changeBtnState('onpause');
                    }
                    vp.video.currentTime -= skipTime;
                    break;
                case 39 :
                    vp.video.currentTime += skipTime;
                    break;
                case 38 :
                    vp.video.volume = Math.min(1, vp.video.volume + 0.1);
                    vp.elements.volumebar.value = vp.video.volume;
                    changeVolume(vp);
                    break;
                case 40 :
                    vp.video.volume = Math.max(0, vp.video.volume - 0.1);
                    vp.elements.volumebar.value = vp.video.volume; 
                    changeVolume(vp);
                    break;
            }
        }
    };

    // 이벤트 설치
    var installEvents = function (vp) {
        //마우스 오버, 리브 -> 컨트롤바 표시, 숨기기
        vp.videoframe.addEventListener("mouseover", function () {
            revealControlbar(vp);
        });
        vp.videoframe.addEventListener("mouseleave", function () {
            if (!vp.state.isMoving && vp.state.isPlay){ 
                hideControlbar(vp);
            }
        });

        // 재생, 일시정지, 정지
        vp.video.addEventListener("click", function () {
            playOrPause(vp);
        });

        //현재 재생시간
        vp.video.addEventListener("timeupdate", function () {
            //progress bar 진행
            vp.elements.progressbar.value = Math.floor(vp.video.currentTime);
            //재생완료되면
            if (vp.video.duration == vp.video.currentTime) {
                vp.state.isPlay = false;
                vp.video.pause();
                vp.btnKey['32'].changeBtnState('onend');
                revealBoth(vp);
            }
            //타임 텍스트 출력
            vp.elements.currentTimeText.textContent = timeFormat(vp.video.currentTime);
        });

        //총 재생시간
        vp.video.addEventListener("durationchange", function () { 
            vp.state.maxTime = Math.floor(vp.video.duration);
            vp.elements.progressbar.setAttribute('max', vp.state.maxTime);
            vp.elements.totalTimeText.textContent = timeFormat(vp.state.maxTime);
        });

        // 진행바 조작
        if (browser.name !== "IE"){
            vp.elements.progressbar.addEventListener("input", function () {
                controlProgress(vp);
            });
        } else {
            vp.elements.progressbar.addEventListener("change", function () {
                controlProgress(vp);
            });
        }
        vp.elements.progressbar.addEventListener("mousedown", function () {
            vp.state.isMoving = true;
        });

        window.addEventListener("mouseup", function () { // 진행바, 볼륨바 둘다 포함. window나 document는 각 동영상마다 각각 이벤트 설치되서 n번 실행됨. 즉, 모든 vp의 isMoving이 false로.
            if (vp.state.isMoving){
                vp.state.isMoving = false;
            }   
        });

        // 볼륨바 조작
        if (browser.name !== "IE"){
            vp.elements.volumebar.addEventListener("input", function () {
                changeVolume(vp);
            });
        } else {
            vp.elements.volumebar.addEventListener("change", function () {
                changeVolume(vp);
            });
        }
        vp.elements.volumebar.addEventListener("mousedown", function () {
            vp.state.isMoving = true;
        });

        window.addEventListener("resize", function () {
            if (!vp.state.isFull && vp.state.isZoomIn) { //IE 풀스크린때 리사이즈 이벤트 발생 browser.name != 'IE' && 
                resizeVideo(vp);
            }
        });

        //방치
        vp.videoframe.addEventListener("mousemove", function () {
            if (vp.state.isFull){
                hideWhenIdle(vp);
            }
        });

        var handleKeyDown = function (event) {
            if (vp.videoframe == document.querySelector('.active-element').closest('.my-video')) {
                preControl(vp, event);
                preShowAlertImg(vp, event.keyCode);
                if (vp.state.isFull) {
                    hideWhenIdle(vp);
                }
            }
        };

        var handleKeyUp = function (event) {
            if (vp.videoframe == document.querySelector('.active-element').closest('.my-video')) {
                console.log(vp);
                console.log(event.keyCode);
                postShowAlertImg(vp, event.keyCode);
            }
        };

        var handleKeyDownIE = function (event) {
            if (vp.videoframe == document.querySelector('.active-element').closest('.my-video')) {
                event.preventDefault();
                fullScreenController.changeFullscreen(vp);
                vp.state.isFull = !vp.state.isFull;
                changeVideoFull(vp);
            }
        };

        //키보드 조작
        if (browser.name !== 'IE') {
            window.addEventListener("keydown", function (event) {
                handleKeyDown(event);
            });
            window.addEventListener("keyup", function (event) {
                handleKeyUp(event);
            });
        } else {
            document.addEventListener("keydown", function (event) {
                if (event.keyCode == 27 && vp.state.isFull) { //풀스크린 - esc - ie
                    handleKeyDownIE(event);
                } else {
                    handleKeyDown(event);
                }
            });
            document.addEventListener("keyup", function (event) {
                handleKeyUp(event);
            });
        }

        //풀스크린 - esc는 키이벤트가 아니라 여기서 다룸
        var handleFullscreenChange = function (event, vp) {            
            if (vp.videoframe == event.target.closest('.my-video')){
                vp.state.isFull = !vp.state.isFull;
                changeVideoFull(vp);
            }
        };

        document.addEventListener("fullscreenchange", function (event) {
            handleFullscreenChange(event, vp);
        });
        document.addEventListener("webkitfullscreenchange", function (event) {
            handleFullscreenChange(event, vp);
        }); 
        document.addEventListener("mozfullscreenchange", function (event) {
            handleFullscreenChange(event, vp);
        });
    };

    // 비디오생성
    var creater = function (vp) {
        //focus시 activeEle변경 이벤트리스너설치
        installActiveElementEvent.focusToActive();

        var parent = vp.parent;

        // 템플릿의 루트 엘리먼트를 할당
        vp.videoframe = parent.querySelector('.my-video');

        // 그 외 엘리멘트들 할당
        for (var i in selectorList) {
            if (i == 'video') {
                vp.video = parent.querySelector('.my-video ' + selectorList[i]);
            } else {
                vp.elements[i] = parent.querySelector('.my-video ' + selectorList[i]);
            }
        }

        // btnList 생성 함수 - 버튼 엘리멘트이용.
        createBtnList(vp);

        if (browser.ieVersion === "under10") { //ie10이하는 전체화면 지원안함
            vp.elements.fullBtn.style.opacity = 0.3;               
            vp.elements.fullBtn.style.cursor = "default";
            vp.elements.fullBtn.disabled = "true";
        }
    };

    var create = function (parent, src, width, height) {
        if (!width) width = 800;
        if (!height) height = 450;
        // 출력
        var template = createVideoTemplate(src, width, height);
        parent.innerHTML = template;
        parent.style.display = 'inline-block';
        parent.style.width = width;
        parent.style.height = height;

        // video객체 = 비디오플레이어
        var videoPlayer = {
            // 할당됨
            parent: parent,
            src: src,
            state: {
                width: width + 'px',
                height: height + 'px',
                isPlay: false,
                isMoving: false, //진행바 혹은 볼륨바 조절중인 상태
                maxTime: 0, //총 재생시간
                isZoomIn: false, //영화관모드 상태
                isFull: false, //전체모드 상태
                volumeValue: 1, //음소거와 상관없이 저장되어 있는 볼륨값
                isControllbarHidden: false,
            },
            // creater()에서 할당됨.
            videoframe: null,
            elements: {},
            video: null,
            btnKey: {}
        };

        // 비디오플레이어 완성
        creater(videoPlayer);

        installEvents(videoPlayer);

        document.querySelector('.my-video').classList.add('active-element');
    };

    return {
        create: create
    }
})();