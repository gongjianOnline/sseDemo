import React from "react"
import axios from "axios"

const Home:React.FC<any> = ()=>{
  const handleClick = ()=>{
    const eventSource = new EventSource('/api/')

    // 监听消息事件
   
    eventSource.onmessage  = (event) => console.log(event);

    eventSource.onopen = () => {
      console.log("SSE 连接成功，状态${eventSource.readyState}<br />")
    }

    eventSource.onerror = () => {
    console.log("SSE 连接错误，状态${eventSource.readyState}<br />")
    eventSource.close();
    }

  }
  return (
    <div>
      <button onClick={()=>handleClick()}>创建连接</button>
    </div>
  )
}

export default Home