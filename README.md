# WebGameKeyboard

#### 介绍
移动端玩电脑端的网页游戏的操作工具

#### 使用说明
在浏览器地址栏中输入以下代码（将$[config]替换为json文本或url）：
```js
javascript:(function () { var script = document.createElement('script'); script.src="https://cdn.jsdelivr.net/gh/csjdyr001/WebGameKeyboard/WebGameKeyboard.js?config=$[config]"; document.body.append(script);})();
```

json格式例示：
```json
[{"content":"测试","code":13,"type":"key"}]
```