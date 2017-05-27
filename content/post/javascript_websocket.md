+++
categories = ["y"]
date = "2017-05-27T16:42:34+08:00"
description = "html5带来了websocket, 可以实时双向通信，传送二进制数据， 为web应用带来了更多的可能；本例使用ES6进行封装，实现自动重连"
tags = ["javascript", "development"]
title = "websocket Javascript 客户端"

+++

#### 构造方法

> WebSocket WebSocket(url, protocols);  

#### 参数

> url: 连接地址， ws://xxxxx:xx or wss://xxxxx:xx (tsl/ssl 加密)  
> protocols: 可选参数

#### 方法

发送数据
> send(data) 支持string arraybuffer blob(二进制大对象块) 等类型数据  

关闭连接
> clsoe(code, reason) 关闭代码（默认1000），关闭原因（string）

#### 属性

> binaryType 二进制数据类型， "blob" 或者 “arraybuffer”， 可不设置  
> onopen 回调函数， 连载建立时调用  
> onmessage 回调函数， 收到消息时调用  
> onclose 回调函数， 连载断开时回调  
> onerror 回调函数， 连载出错时回调  
> readyState 连接状态， 只读  
 
#### ES6封装
```
  const WsStateDisconnected = 0;
  const WsStateDisconnecting = 1;
  const WsStateConnected = 2;
  const WsStateConnecting = 3;
  class SimpleWSocket {
    constructor(url) {
      this.wsState = WsStateDisconnected;
      this.timer = null;
      this.url = url;
      this.ws = null;
      this.isreconnect = false;
    }

    connect() {
        if (this.wsState === WsStateConnected) {
          this.disconnect();
        }

      if (this.wsState !== WsStateDisconnected) {
        tlog('connection is busy')
        return
      }

      this.wsState = WsStateConnecting;
      this.ws = null;
      this.ws = new WebSocket(this.url);
      this.ws.binaryType = 'arraybuffer';

      this.ws.onmessage = function (e) {
        if (typeof e.data === 'string') {
            // TODO process string message
            // console.log('string:', e.data)
        } else {
          if (e.data.byteLength > 0) {
              // TODO process arraybuffer message
          }
        }
      }.bind(this);

      this.ws.onclose = function (e) {
        tlog(e);
        this.wsState = WsStateDisconnected;
        this.onclose();

        if (this.isreconnect) {
          if (typeof this.timer !== 'undefined' || this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
          }

          this.timer = setInterval(function () {
            if (this.isconnected() == false) {
              this.connect();
            }
          }.bind(this), 5000);
        }
      }.bind(this);

      this.ws.onerror = function (e) {
        // TODO
        this.disconnect();
      }.bind(this);

      this.ws.onopen = function (e) {
        this.wsState = WsStateConnected;
        if (this.wsState === WsStateConnected) {
          this.onopen();
        } else {
          tlog('connection is closed or closing')
        }
      }.bind(this);
    }

    disconnect() {
      this.setreconnect(false);
      if (this.ws !== null) {
        if (this.wsState === WsStateConnected) {
          this.onclose();
          this.wsState = WsStateDisconnecting;
          this.ws.close(1000, 'doclose');
        } else {
          tlog('connection is not complete');
        }
      } else {
        tlog('WebSocket session is null');
      }
    }

    isconnected() {
      return this.wsState === WsStateConnected ? true : false;
    }

    setreconnect(ok) {
      if (ok) {
        this.isreconnect = true;
      } else {
        this.isreconnect = false;
        if (typeof this.timer !== 'undefined' || this.timer !== null) {
          clearInterval(this.timer);
          this.timer = null;
        }
      }
    }

    postmessage(message) {
      if (this.wsState === WsStateConnected) {
          this.ws.send(message);
      } else {
        console.log('connection is closed or closing')
      }
    }

    // virtual function
    onclose() {
      // TODO
    }

    // virtual function
    onopen() {
      // TODO
    }

    // message dispatch // virtual function
    onmessage(message) {
        // TODO
    }
  }

```