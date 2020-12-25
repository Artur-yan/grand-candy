import React, {useEffect, useState} from "react";
import './styles.scss'
import Carousel, { Modal, ModalGateway } from 'react-images';
import '../../../assets/img/branch1.png'
import t from "../../../i18n/translate";
export function About() {

  const [modal, setModal] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const images = [
    { source: '/static/media/factoryX2.fadd4797.png' },
    { source: '/static/media/branch2.7bcfd563.png' },
    { source: '/static/media/career2x.d6ef179d.png' },
    { source: '/static/media/factory4.cce87121.png' },
    { source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
  ];

  useEffect(() => {

  }, [])

  return (
    <div className='P-about G-flex-column G-mb-100 G-mt-100'>
      <ModalGateway>
        {modal ? (
          <Modal onClose={() => {setModal(false)}}>
            <Carousel currentIndex={currentImgIndex} views={images} />
          </Modal>
        ) : null}
      </ModalGateway>
      <h1 className='G-mb-25 G-width-90'>{t('about_company_title')}</h1>
      <div className='G-fs-20 G-mb-25'>
        {t('about_company_description')}
      </div>
      <div className='P-about-album G-mb-35 G-mt-10 G-cursor-pointer'>
        <div className='P-center-img G-width-80' onClick={() => {setCurrentImgIndex(0); setModal(true)}}></div>
        <div className='G-flex-column G-width-20'>
          <div className='P-right-img' onClick={() => {setCurrentImgIndex(1); setModal(true)}}></div>
          <div className='P-right-img G-black-blur G-position-relative' onClick={() => {setCurrentImgIndex(3); setModal(true)}}>
            <span className='G-position-absolute-full-center P-additional-img'>+1</span>
          </div>
        </div>
      </div>
      <div className='G-fs-20  G-mb-25'>
        {t('about_company_description1')}
      </div>

      <div className='G-fs-20 G-mb-25'>
        {t('about_company_description2')}
      </div>

      <div className='G-fs-20 G-mb-25'>
        {t('about_company_description3')}
      </div>

      <div className='G-fs-20 G-mb-35'>
        {t('about_company_description4')}
      </div>
    </div>
  );
}
