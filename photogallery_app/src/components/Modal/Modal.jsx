import React, { useEffect, useContext, useRef, useState } from 'react'
import './Modal.scss'
import { GalleryContext } from './../../context/gallery/galleryContext'
import Preloader from '../Preloader/Preloader'



export default ({eventObj}) => {

   const $target = eventObj.target,
         $body = document.querySelector('body'),
         scrollWidth = calcScroll(),
         ref_$popUp = useRef(null),
         ref_$popUpContent = useRef(null),
         ref_$popUpClose = useRef(null),
         ref_$bigImg = useRef(null),
         ref_$bigImgTitle = useRef(null),
         ref_$popUpNavigation = useRef(null),
         ref_$popUpNavigationPrev = useRef(null),
         ref_$popUpNavigationNext = useRef(null)

   let $currentThumbnailWrapper = null


   const { closeModal } = useContext(GalleryContext)

   useEffect(() => {
      $body.classList.add('modal-open')
      $body.style.marginRight = `${scrollWidth}px`

      // componrntDidUnmount
      return () => {
         $body.classList.remove('modal-open')
         $body.style.marginRight = '0px'
         closeModal()
      }
   // eslint-disable-next-line
   }, [])

   const [isImgLoaded, setImgLoaded] = useState(false)


   function calcScroll() {
      const div = document.createElement('div')
      div.style.width = '50px'
      div.style.height = '50px'
      div.style.overflowY = 'scroll'
      div.style.visibility = 'hidden'
      document.body.appendChild(div)
      const scrollWidth = div.offsetWidth - div.clientWidth
      div.remove()
      return scrollWidth
   }

   function mouseenterHandler() {
      ref_$popUpNavigation.current.classList.add('active')
   }

   function mouseleaveHandler() {
      ref_$popUpNavigation.current.classList.remove('active')
   }

   function popUpClickHandler(e) {
      // remove modal
      if (e.target === ref_$popUpClose.current || e.target === ref_$popUp.current) {
         $body.classList.remove('modal-open')
         $body.style.marginRight = '0px'
         closeModal()
      }

      // <- click
      if (e.target === ref_$popUpNavigationPrev.current) {
         let $item = null

         if ($currentThumbnailWrapper) {
            $item = $currentThumbnailWrapper
         } else {
            $item = $target.closest('.photos-list__item')
         }
         
         if ($item.previousElementSibling) {
            $currentThumbnailWrapper = $item.previousElementSibling
         } else {
            $currentThumbnailWrapper = $item.closest('.photos-list').lastElementChild
         }

         ref_$bigImg.current.src = $currentThumbnailWrapper.querySelector('img').dataset.src
         ref_$bigImg.current.alt = $currentThumbnailWrapper.querySelector('img').alt
         ref_$bigImgTitle.current.innerHTML = $currentThumbnailWrapper.querySelector('img').alt
      }

      // -> click
      if (e.target === ref_$popUpNavigationNext.current) {
         let $item = null

         if ($currentThumbnailWrapper) {
            $item = $currentThumbnailWrapper
         } else {
            $item = $target.closest('.photos-list__item')
         }
         
         if ($item.nextElementSibling) {
            $currentThumbnailWrapper = $item.nextElementSibling
         } else {
            $currentThumbnailWrapper = $item.closest('.photos-list').firstElementChild
         }
         
         ref_$bigImg.current.src = $currentThumbnailWrapper.querySelector('img').dataset.src
         ref_$bigImg.current.alt = $currentThumbnailWrapper.querySelector('img').alt
         ref_$bigImgTitle.current.innerHTML = $currentThumbnailWrapper.querySelector('img').alt
      }
   }


   return (
      <div 
         className='popUp'
         onClick={popUpClickHandler}
         ref={ref_$popUp}
      >
         {isImgLoaded 
            ?  null 
            :  <Preloader />
         }
         <div 
            className='popUp-content' 
            style={isImgLoaded ? {} : {display: 'none'}}
            onMouseEnter={mouseenterHandler}
            onMouseLeave={mouseleaveHandler}
            ref={ref_$popUpContent}
         >
            <div 
               className='popUp-close'
               onMouseEnter={mouseleaveHandler}
               ref={ref_$popUpClose}
            >X</div>

            <span 
               className='popUp-content__title'
               ref={ref_$bigImgTitle}
            >
               {$target.alt}
            </span>

            <img 
               className='popUp-content__img' 
               src={$target.dataset.src} 
               alt={$target.alt}
               onLoad={() => setImgLoaded(true)}
               ref={ref_$bigImg}
            />

            <div 
               className='popUp-navigation'
               ref={ref_$popUpNavigation}   
            >
               <span 
                  className='popUp-navigation__prev' 
                  ref={ref_$popUpNavigationPrev}
               />
               <span 
                  className='popUp-navigation__next' 
                  ref={ref_$popUpNavigationNext}
               />
            </div>
         </div>
      </div>
   )
}