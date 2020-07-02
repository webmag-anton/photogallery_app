import React, { useContext, useEffect } from 'react'
import './BreadCrumbs.scss'
import { NavLink } from 'react-router-dom'
import { GalleryContext } from './../../context/gallery/galleryContext'



export default ({isAlbumsPage, isPhotosPage, lastAuthorId, albumId}) => {

   const { findAuthorByAlbum, findedAuthorId } = useContext(GalleryContext)

   useEffect(() => {
      // если перезагрузили страницу, то нет поля lastAuthorId, поэтому ищем фотографа
      if (isPhotosPage && !lastAuthorId && !findedAuthorId) {
         findAuthorByAlbum(albumId)
      }
   // eslint-disable-next-line
   }, [])


   return (
      <ul 
         className='breadcrumbs'
      >
         <li className='breadcrumbs__item'>
            <NavLink 
               to='/' 
               className='breadcrumbs__link'
            >
               Photographers
            </NavLink>
         </li>

         {isAlbumsPage
            ?  <li className='breadcrumbs__item'>
                  Albums
               </li>
            :  null
         }

         {isPhotosPage && lastAuthorId
            ?  <li className='breadcrumbs__item'>
                  <NavLink 
                     to={`/author/${lastAuthorId}`}
                     className='breadcrumbs__link'
                  >
                     Albums
                  </NavLink>
               </li>
            :  isPhotosPage && findedAuthorId
                  ?  <li className='breadcrumbs__item'>
                        <NavLink 
                           to={`/author/${findedAuthorId}`}
                           className='breadcrumbs__link'
                        >
                           Albums
                        </NavLink>
                     </li>
                  :  null
         }
         {isPhotosPage
            ?  <li className='breadcrumbs__item'>
                  Photos
               </li>
            :  null
         }
      </ul>
   )
}