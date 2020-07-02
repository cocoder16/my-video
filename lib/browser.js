var browser = (function () {
    var name;
    var ieVersion = null;
    var agent = navigator.userAgent.toLowerCase();
    if (navigator.appName == "Netscape" && navigator.userAgent.search('Trident') != -1) {
        name = 'IE'; ieVersion = "11";
    } else if (agent.indexOf("msie") != -1) { 
        name = 'IE'; ieVersion = "under10";
    } else if (agent.indexOf("edge") != -1) {
        name = 'Edge';
    } else if (agent.indexOf('chrome') != -1) {
        name = 'Chrome';
    } else if (agent.indexOf('safari') != -1) {
        name = 'Safari';
    } else if (agent.indexOf('firefox') != -1) {
        name = 'Firefox';
    }
    return { name: name, ieVersion: ieVersion }
})();