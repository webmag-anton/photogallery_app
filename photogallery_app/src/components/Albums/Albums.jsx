import React, { useEffect, useContext } from 'react'
import './Albums.scss'
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs'
import { GalleryContext } from './../../context/gallery/galleryContext'
import Preloader from '../Preloader/Preloader'
import { Link } from 'react-router-dom'


export default ({match}) => {

   const authorId = +match.params.name

   const {getAlbums, lastAuthorId, authorAlbums} = useContext(GalleryContext)

   useEffect(() => {
      if (authorId !== lastAuthorId) {
         getAlbums(authorId)
      }
   // eslint-disable-next-line
   }, [])


   return (
      <>
         {authorId !== lastAuthorId
            ?  <Preloader />
            :  <div className='albums'>
                  <div className='albums__container'>
                  
                     <h1 className='albums__title'>
                        {authorAlbums.length} аlbums
                     </h1>

                     <BreadCrumbs 
                        isAlbumsPage={true}
                     />

                     <ul className='albums-list'>
                        {authorAlbums.map((item, id) => {
                           return (
                              <li
                                 key={id}
                                 className='albums-item'
                              >
                                 <Link 
                                    to={`/album/${item.id}`}
                                    className='albums-item__link'
                                 >
                                    <div
                                       className='albums-item__name'
                                    >
                                       {item.title}
                                    </div>
                                    <img 
                                       className='albums-item__cover'
                                       src={item.cover} 
                                       alt={item.title} 
                                    />
                                    <div
                                       className='albums-item__size'
                                    >
                                       {item.size} photos
                                    </div>
                                 </Link>
                              </li>
                           )
                        })}
                     </ul>
                  </div>
               </div>
         }
      </>
   )
}