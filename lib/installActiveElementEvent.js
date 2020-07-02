var installActiveElementEvent = (function () {
    var changeActiveEle = function (target) {
        var prevActive = document.querySelectorAll('.active-element');
        if (prevActive){
            Array.prototype.forEach.call(prevActive, function (cur) {
                cur.classList.remove('active-element');
            });
        }
        target.classList.add('active-element');
    };

    return {
        //마우스 이벤트로 활성화 엘리먼트 변경
        anyOnClick: function () {
            window.addEventListener("click", function (event) {
                changeActiveEle(event.target);
            });
        },
        //포커스 이벤트로 활성화 엘리먼트 변경
        focusToActive: function () {
            var focusableArr = document.querySelectorAll('.focusable');
            Array.prototype.forEach.call(focusableArr, function (cur) {
                cur.addEventListener("focus", function () {
                    changeActiveEle(cur);
                })
            })
        }
    }
})();

installActiveElementEvent.anyOnClick();