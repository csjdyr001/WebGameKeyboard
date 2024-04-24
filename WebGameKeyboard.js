const getArgs = (function() {
    let sc = document.getElementsByTagName('script');
    let paramsArr = sc[sc.length - 1].src.split('?')[1].split('&');
    let args = {},
        argsStr = [],
        param, t, name, value;
    for (let i = 0, len = paramsArr.length; i < len; i++) {
        param = paramsArr[i].split('=');
        name = param[0], value = param[1];
        if (typeof args[name] == "undefined") {
            args[name] = value;
        } else if (typeof args[name] == "string") {
            args[name] = [args[name]]
            args[name].push(value);
        } else {
            args[name].push(value);
        }
    }
    return function() {
        return args;
    }
})();
class VirtualKey {
    constructor(content, keyCode, type = "key") {
        this.ele = document.createElement("div");
        this.ele.style.backgroundColor = "rgb(128,128,128,0.5)";
        this.ele.style.width = "50px";
        this.ele.style.height = "50px";
        this.ele.style.zIndex = "9999999";
        this.ele.textContent = content;
        this.ele.style.position = "absolute";
        this.ele.style.left = "0px";
        this.ele.style.top = "0px";
        this.ele.style.borderRadius = "10px";
        this.ele.style.justifyContent = "center";
        this.ele.style.display = "flex";
        this.ele.style.alignItems = "center";
        this.ele.style.fontSize = "17px";
        this.ele.style.cursor = "pointer";
        document.body.appendChild(this.ele);
        setFloatingWindowMove(this.ele, () => {
            if (type == "key") {
                simulateKey(keyCode);
            } else if (type == "input") {
                simulateInput(prompt("输入要输入的内容"));
            }
        });
    }
}

function simulateKey(code, keyType = "keydown", ele = document, repeat = false, location = 0, ctrlKey = false, altKey = false, shiftKey = false, metaKey = false) {
    let event = new KeyboardEvent(keyType, {
        keyCode: code,
        repeat: repeat,
        location: location,
        ctrlKey: ctrlKey,
        altKey: altKey,
        shiftKey: shiftKey,
        metaKey: metaKey
    });
    ele.dispatchEvent(event);
}

function simulateInput(content, ele = document) {
    let inputEvent = new InputEvent("input", {
        bubbles: true,
        composed: true,
        data: content,
        inputType: "insertText",
        isComposing: false
    });
    ele.dispatchEvent(inputEvent);
}

function setFloatingWindowMove(oDiv, onclickCallBack) {
    let disX, moveX, L, T, starX, starY, starXEnd, starYEnd;

    let beforeX, beforeY;

    oDiv.addEventListener('touchstart', function(e) {

        beforeX = this.offsetLeft;
        beforeY = this.offsetTop;

        e.preventDefault();
        disX = e.touches[0].clientX - this.offsetLeft;
        disY = e.touches[0].clientY - this.offsetTop;
        starX = e.touches[0].clientX;
        starY = e.touches[0].clientY;
    });

    oDiv.addEventListener('touchmove', function(e) {
        L = e.touches[0].clientX - disX;
        T = e.touches[0].clientY - disY;
        starXEnd = e.touches[0].clientX - starX;
        starYEnd = e.touches[0].clientY - starY;
        if (L < 0) {
            L = 0;
        } else if (L > document.documentElement.clientWidth - this.offsetWidth) {
            L = document.documentElement.clientWidth - this.offsetWidth;
        }
        if (T < 0) {
            T = 0;
        } else if (T > document.documentElement.clientHeight - this.offsetHeight) {
            T = document.documentElement.clientHeight - this.offsetHeight;
        }
        moveX = L + 'px';
        moveY = T + 'px';
        this.style.left = moveX;
        this.style.top = moveY;
    });

    oDiv.addEventListener('touchend', function() {
        if (beforeX === this.offsetLeft && beforeY === this.offsetTop) {
            onclickCallBack();
        }
    });
}

function initVirtualKeyFormURL(url) {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.send()
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) { 
            let json = JSON.parse(xhr.responseText);
            initVirtualKeyFormJSON(json);
        }
    }
}

function initVirtualKeyFormJSON(json) {
    for (let i = 0; i < json.length; i++) {
        let config = json[i];
        let type = config.type || "key";
        new VirtualKey(config.content, config.code, type);
    }
}

function isJSONArray(str) {
    try {
        const arr = JSON.parse(str);
        return Array.isArray(arr) && arr.every(item => typeof item === 'object');
    } catch (error) {
        return false;
    }
}
let config1 = decodeURIComponent("" + getArgs()["config"]);
if (config1 != "") {
    if (isJSONArray(config1) == true) {
        initVirtualKeyFormJSON(JSON.parse(config1));
    } else {
        initVirtualKeyFormURL(config1);
    }
} else {
    console.error("WebGameKeyboard.js需要传入config参数");
}