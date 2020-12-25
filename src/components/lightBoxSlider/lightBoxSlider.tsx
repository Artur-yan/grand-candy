import React, {useEffect, useState, useRef} from "react";
import './styles.scss';
import {FileEnum} from "../../platform/enums/fileEnum";

interface IProps {
  images: Array<{
    fileType: FileEnum,
    imageFileUrl?: string,
    videoFileUrl?: string
  }>,
  show: boolean,
  current?: number,
  close: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}

export function LightBoxSlider(props: IProps) {

  const [slideIndex, setSlideIndex] = useState(props.images.length);
  const vidRef = useRef(null);

  const close = (e) => {
    if (vidRef.current) {
      vidRef.current.pause();
    }
    props.close(e)
  }

  const plusSlides = (n) => {
    setSlideIndex(slideIndex + n)
  }

  const currentSlide = (n) => {
    setSlideIndex(n)
  }

  const escFunction = (e) => {
    if (e.keyCode === 27) {
      close(e)
    }
  }

  const showSlides = (n) => {
    if (n > props.images.length) {
      setSlideIndex(1)
    }
    if (n < 1) {
      setSlideIndex(props.images.length)
    }
  }


  useEffect(() => {
    showSlides(slideIndex)
    document.addEventListener("keydown", escFunction, false);
  }, [slideIndex])

  return (
    <div className='P-slider-files' style={{display: `${!props.show || props.images.length < 1 ? 'none' : 'block'}`}}>
      <div id="myModal" className="modal">
        <span className="close cursor" onClick={close}>&times;</span>
        <div className="modal-content">
          {props.images.map((file, index) => {
            return (
              <div key={index}>
                {(index + 1) === slideIndex &&
                <>
                  {
                    file.fileType === FileEnum.video ? (
                      <div className="mySlides">
                        <div className="numbertext">{(index + 1)} / {props.images.length}</div>
                        <video ref={vidRef} className='P-modal-file' controls={true}>
                          <source src={file.videoFileUrl} type="video/mp4"/>
                        </video>
                      </div>
                    ) : (
                      <div className="mySlides">
                        <div className="numbertext">{(index + 1)} / {props.images.length}</div>
                        <img className='P-modal-file' src={file.imageFileUrl}/>
                      </div>
                    )
                  }
                </>
                }
              </div>
            )
          })}
          {props.images.length > 1 &&
          <>
            <a className="prev" onClick={() => {
              plusSlides(-1)
            }}>&#10094;</a>
            <a className="next" onClick={() => {
              plusSlides(1)
            }}>&#10095;</a>
          </>
          }
        </div>
      </div>
    </div>
  );
}
