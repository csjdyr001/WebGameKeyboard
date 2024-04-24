# WebGameKeyboard

#### 介绍
移动端玩电脑端的网页游戏的操作工具

#### 使用说明
在浏览器地址栏中输入以下代码（将$[config]替换为json文本或url）：
```js
javascript:(function () { var script = document.createElement('script'); script.src="WebGameKeyboard.js?config=$[config]"; document.body.append(script);})();
```