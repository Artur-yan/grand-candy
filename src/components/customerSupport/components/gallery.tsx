import React, {useEffect, useState} from "react";
import Carousel, {Modal, ModalGateway} from "react-images";
import {MomentTime} from "../../../platform/services/helpers";

interface IProps {
  message: {
    date: number
    file: File
    messageId: number
    messageImageUrls: []
    messageType: number
    messageUniqueId: string
    text: string
    user: {
      role: string
      userId: number
      userImageUrl: string
    }
  }
  isAuth: boolean
}
export function Gallery(props: IProps) {

  const [modal, setModal] = useState(false);
  const [images, setImages] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setImages(null);
    let newImages = []
    newImages = props.message.messageImageUrls.map((image, index) => {
      return {source: image}
    });
    setImages(newImages);
  }, [props.message])

  return (
    <div className='G-flex'>
      {images &&
        <>
          <ModalGateway>
            {modal ? (
              <Modal onClose={() => {setModal(false)}}>
                <Carousel currentIndex={index} views={images} />
              </Modal>
            ) : ''}
          </ModalGateway>
          {props.message.messageImageUrls.slice(0, 2).map((image, key) => (
            <div key={key} className={`P-chat-images ${props.isAuth && 'G-border-ping'} ${key === 1 && props.message.messageImageUrls.length > 2 && 'G-black-blur'}`}
               style={{backgroundImage: `url(${image})`}} onClick={() => {setModal(true); setIndex(key)}}>
                  {key === 1 && props.message.messageImageUrls.length > 2 && <span className="G-position-absolute-full-center P-additional-img">+{props.message.messageImageUrls.length - 2}</span>}
                  <span className='P-message-time'>
                    <MomentTime milliSec={props.message.date}/>
                  </span>
            </div>
          ))}
        </>
      }
    </div>
  )
}