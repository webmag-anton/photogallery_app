import React, { useEffect, useContext } from 'react'
import './Authors.scss'
import { GalleryContext } from '../../context/gallery/galleryContext'
import Preloader from '../Preloader/Preloader'
import { Link } from 'react-router-dom'


export default () => {

   const {getAuthors, authors} = useContext(GalleryContext)

   useEffect(() => {
      getAuthors()
   // eslint-disable-next-line
   }, [])

   return (
      <>
         {!authors.length
            ?  <Preloader />
            :  <div className='authors'>
                  <div className='authors__container'>
                  
                     <h1 className='authors__title'>
                        Photographers
                     </h1>

                     <ul className='authors-list'>
                        {authors.map((item, id) => {
                           return (
                              <li
                                 key={id}
                                 className='authors-list__item'
                              >
                                 
                                 <Link 
                                    to={`/author/${item.id}`}
                                    className='authors-list__link'
                                 >
                                    {item.name}
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