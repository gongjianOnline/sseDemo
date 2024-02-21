import React, { useState } from "react"
import styled, { keyframes } from "styled-components"

const blinkAnimation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;
const CursorContent = styled.span`
  display: inline-block;
  line-height: 20px;
  width: 2px;
  height: 20px;
  background: #000;
  animation: ${blinkAnimation} 0.5s linear infinite;
`
const TextContainer = styled.div`

`

const Home:React.FC<any> = ()=>{
  const handleClick = ()=>{
    const eventSource = new EventSource('/api/')

    // 监听消息事件
    eventSource.onmessage  = (event:any) => {
      // const result = JSON.parse(event)
      console.log(event);
      setContent((state)=>{
        return state+event.data
      })
    }

    eventSource.onopen = () => {
      console.log("SSE 连接成功，状态${eventSource.readyState}<br />")
    }

    eventSource.onerror = () => {
      console.log("SSE 连接错误，状态${eventSource.readyState}<br />")
      eventSource.close();
    }
  }
  const [content,setContent] = useState("")

  return (
    <div>
      <button onClick={()=>handleClick()}>什么是SSE</button>
      <TextContainer>
        {content}
        <CursorContent></CursorContent>
      </TextContainer>

    </div>
  )
}

export default Home