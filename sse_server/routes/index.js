const router = require('koa-router')()
const { PassThrough } = require("stream");

router.get('/', async (ctx, next) => {  
  /**配置 HTTP 相关请求方式 */
  ctx.request.socket.setTimeout(0);  
  ctx.req.socket.setNoDelay(true);  
  ctx.req.socket.setKeepAlive(true); 
  /**设置 SSE 请求头 */
  ctx.set({  
    "Content-Type": "text/event-stream",  
    "Cache-Control": "no-cache",  
    "Connection": "keep-alive",  
  });  
  
  const stream = new PassThrough();  
  
  ctx.status = 200;  
  ctx.body = stream;  
  
  const content = "简单总结 SSE是基于 HTTP 协议的服务端推送技术，其中并不是传统意义上的 HTTP 请求 / 响应模型，SSE 可保持一次请求长久连接，但也不是 WebSockets 双工通信模型；SSE 只是支持服务端主动推送到客户端，可以理解成 单项长连接；";  
  
  // 将内容分割成多个事件消息  
  const messages = content.split(''); // 每个字符作为一个消息  
  
  const sendMessage = () => {  
    if (messages.length > 0) {  
      const message = messages.shift(); // 获取并移除第一个消息  
      stream.write(`data: ${message}\n\n`); // 发送消息，包括换行符  
      setTimeout(sendMessage, 100); // 延迟后发送下一个消息  
    } else {  
      stream.end(); // 没有更多消息时结束流  
    }  
  };  
  
  sendMessage(); // 开始发送消息  
  
  stream.on("close", () => {  
    console.log("已关闭");  
  });  
});


module.exports = router
