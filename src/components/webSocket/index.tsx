import React from "react";
import SockJsClient from 'react-stomp';
import {environment} from "../../environments/environment";

interface IProps {
  onMessage: (data) => void
  id: number
}

export function WebSocket(prop: IProps) {

  return (
    <>
      <SockJsClient url={environment.baseUrl+'api/support/'}
                    topics={[`/topic/newTextMessage/${prop.id}`]}
                    onMessage={(msg) => { prop.onMessage(msg) }}/>
      <SockJsClient url={environment.baseUrl+'api/support/'}
                    topics={[`/topic/newFileMessage/${prop.id}`]}
                    onMessage={(msg) => { prop.onMessage(msg) }}/>
    </>
  )
}