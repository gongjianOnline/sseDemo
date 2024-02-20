const router = require('koa-router')()
const { PassThrough } = require("stream");

router.get('/', async (ctx, next) => {  
  ctx.request.socket.setTimeout(0);  
  ctx.req.socket.setNoDelay(true);  
  ctx.req.socket.setKeepAlive(true);  
  ctx.set({  
    "Content-Type": "text/event-stream",  
    "Cache-Control": "no-cache",  
    "Connection": "keep-alive",  
  });  
  
  const stream = new PassThrough();  
  
  ctx.status = 200;  
  ctx.body = stream;  
  
  const content = "SSE是一种基于 HTTP 的服务器推送技术，它允许服务器向客户端推送数据。SSE 使用一个单向的连接来传输数据，而不是使用 HTTP 请求/响应模型。这意味着 SSE 连接一旦建立，服务器就可以向客户端推送数据，而客户端无法主动发起请求。";  
  
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
