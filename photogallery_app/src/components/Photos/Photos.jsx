import React, { useEffect, useContext, useState } from 'react'
import './Photos.scss'
import { GalleryContext } from './../../context/gallery/galleryContext'
import Preloader from '../Preloader/Preloader'
import Modal from '../Modal/Modal'
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs'



export default ({match}) => {

   const albumId = +match.params.name

   const [eventObj, setEventObj] = useState(null)

   const { getPhotos, 
           openModal, 
           lastAuthorId,
           lastAlbumId, 
           albumPhotos, 
           isModalOpen
         } = useContext(GalleryContext)

   useEffect(() => {
      if (albumId !== lastAlbumId) {
         getPhotos(albumId)
      }
   // eslint-disable-next-line
   }, [])


   const openModalHandler = e => {
      e.persist()

      setEventObj(e)
      openModal()
   }


   return (
      <>
         {albumId !== lastAlbumId
            ?  <Preloader />
            :  <div className='photos'>
                  <div className='photos__container'>
                  
                     <h1 className='photos__title'>
                        Album # {albumId}
                     </h1>

                     <BreadCrumbs 
                        isPhotosPage={true} 
                        lastAuthorId={lastAuthorId}
                        albumId={albumId}
                     />

                     <ul className='photos-list'>
                        {albumPhotos.map((item, id) => {
                           return (
                              <li
                                 key={id}
                                 className='photos-list__item'
                              >
                                 <div className="photos-list__item-box">
                                 <div className="photos-list__wrapper">
                                    <img 
                                       className='photos-list__thumbnail'
                                       src={item.thumbnailUrl} 
                                       alt={item.title}
                                       data-src={item.url}
                                       onClick={openModalHandler}
                                    />
                                 </div>
                                 </div>
                              </li>
                           )
                        })}
                     </ul>
                  </div>
               </div>
         }

         {isModalOpen
            ?  <Modal eventObj={eventObj} />
            :  null
         }
      </>
   )
}