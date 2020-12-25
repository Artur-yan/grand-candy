import React, {useCallback, useEffect, useRef, useState} from 'react';
import './style.scss'
import {ClickOutside, MomentTime} from "../../platform/services/helpers";
import {Input, Textarea} from "../formElements";
import Arrow from "../../assets/svg/right-arrow.svg";
import ArrowPing from "../../assets/svg/right-arrow-pink.svg";
import Customer from "../../assets/svg/customer.svg";
import AuthStorage from "../../platform/services/storages/authStorage";
import Support from "../../platform/api/support/support";
import {WebSocket} from "../webSocket";
import defaultImg from "../../assets/img/default.png";
import avatar from "../../assets/img/avatar.png";
import Carousel, {Modal, ModalGateway} from "react-images";
import {Gallery} from "./components/gallery";
import {CircularProgress} from "@material-ui/core";
import t from '../../i18n/translate';
import LanguageStorage from "../../platform/services/storages/languageStorage";
import messages from "../../i18n/messages/index";

export function CustomerSupport() {

  const [supportChatIsOpen, setSupportChatIsOpen] = useState(false);
  const [conversationId, setConversationId] = useState<number>(null);
  const [chatMessages, setChatMessages] = useState(null);
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);
  const [authUser] = useState(AuthStorage.getUser() ? AuthStorage.getUser() : null);
  const [files, setFiles] = useState(null);
  const [modal, setModal] = useState(false);

  const handleKeyDown = (name, value) => {
    if (value) {
      send()
    }
  }

  const send = () => {

    setMessage('');

    if (!!message.trim()) {
      Support.send({
        conversationId: conversationId,
        messageUniqueId: Date.now(),
        text: message
      }).then((res) => {
        const clone = [...chatMessages]
        clone.unshift(res.data);
        setChatMessages(clone);
      })
    }
  }

  const sendFile = (pdfFile = null) => {

    const data = new FormData();
    let getFiles =  pdfFile ? pdfFile : files;

    for (let file in getFiles) {
      if (getFiles[file] instanceof File) {
        data.append('files', getFiles[file]);
      }
    }

    Support.sendFile({
      conversationId: conversationId,
      messageUniqueId: Date.now(),
      files: data
    }).then((res) => {

      if (res.success) {
        const clone = [...chatMessages];
        clone.unshift(res.data);
        setChatMessages(clone);
        setFiles(null)
      }
    })
  }

  const getPdf = (pdf) => {
    sendFile(pdf)
  }

  useEffect(() => {

    if (files) {
      sendFile()
    }
  }, [files])

  useEffect(() => {
    Support.getConversation().then((res) => {
      if (res) {
        if (res.success) {
          setConversationId(res.data)
        }
      }
    })
  }, [])

  useEffect(() => {
    setLoader(true)
    if (conversationId) {
      Support.getMessages({conversationId: conversationId, size: 20, skip: 0}).then((res) => {
        setChatMessages(res.data.messagePreviewDTOS)
        setLoader(false)
      })
    }
  }, [conversationId])

  return (
    <div className='P-customer-support'>
      <ClickOutside onClickOutside={() => {
        // setSupportChatIsOpen(false)
      }}>
        <WebSocket onMessage={(res) => {
          if (res.data.user.userId !== authUser.userId) {
            setChatMessages([res.data, ...chatMessages])
          }
        }} id={conversationId}/>
        <div className={`G-position-relative P-support-chat ${supportChatIsOpen || 'G-d-none'}`}>
          <div className="P-chat-close">
            <span className="P-closebtn" onClick={() => setSupportChatIsOpen(false)}><i className='icon-ic_close'/></span>
          </div>
          <div className='P-chat-discussions '>
            {loader ? (
              <CircularProgress size={70} className='G-full-center' color="secondary"/>
            ) : (chatMessages && chatMessages.map((message, idx) =>
              <div className='G-flex G-mt-19' key={idx}>
                {message.user.userId !== authUser.userId &&
                <div className='G-circle-image-middle G-bg-image' style={{backgroundImage: `url(${message.user.userImageUrl || avatar})`}}></div>
                }
                {(message.messageImageUrls.length > 0) &&
                <div className={`G-width-100 P-chat-image-size G-mb-15 ${message.user.userId === authUser.userId ? 'G-flex-content-end G-move-right' : 'G-move-left '}`}>
                  <Gallery message={message} isAuth={message.user.userId === authUser.userId}/>
                </div>}
                {message.text && (
                  <div className={`P-message-item G-mb-15 ${message.user.userId === authUser.userId ? 'P-sender' : 'P-receiver'}`}>
                    {message.text}
                    <span className='P-message-time'>
                      <MomentTime milliSec={message.date}/>
                    </span>
                  </div>
                )}
                {message.file && (
                  <div className={`P-message-item G-mb-15 ${message.user.userId === authUser.userId ? 'P-sender' : 'P-receiver'}`}>
                    <a target='_blank' rel="noopener noreferrer" href={message.file.fileUrl}>
                      <span>{t('attachment')} {message.file.fileSize ? message.file.fileSize / 1000 | 0 : 0}kb</span>
                      <span className='P-message-time'>
                      <MomentTime milliSec={message.date}/>
                    </span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className='P-support-actions'>
            <div className='P-support-files'>
              <label className='P-file-label'>
                <i className='icon-attachment-1'/>
                <input type="file" accept="application/pdf" name='files' onChange={(e) => {
                  if (!files) {
                    getPdf(e.target.files)
                  }
                  e.target.value = '';
                }}/>
              </label>
              <label className='P-file-label'>
                <i className='icon-photo-camera-9'/>
                <input multiple type="file" accept=".png, .jpg, .jpeg" name='files' onChange={(e) => {
                  setFiles(e.target.files)
                }}/>
              </label>
            </div>
            <div className='P-support-input'>
              <Input classes='P-ri-45'
                     value={message ? message : ''}
                     placeholder={messages[LanguageStorage.getLanguage()]['chat_write_message']}
                     name='message'
                     onEnter={handleKeyDown}
                     onChanging={(name, value) => {
                       setMessage(value)
                     }}
                     onBlur={(name, value) => {
                     }}/>
              <div className='G-flex P-send-arrow'
                   onClick={() => {
                send()
              }}>
                <img src={!message ? Arrow : ArrowPing} alt="icon"/>
              </div>
            </div>
          </div>
        </div>
      </ClickOutside>
      <div className='P-customer-support-btn G-p-20' onClick={() => {
        setSupportChatIsOpen(!supportChatIsOpen)
      }}>
        <img className='P-customer-ic G-height-100 G-width-100' src={Customer} alt="icon"/>
      </div>
    </div>
  )
}
