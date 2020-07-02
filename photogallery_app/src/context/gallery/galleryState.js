import React, { useReducer } from 'react'
import { GalleryContext } from './galleryContext'
import { GET_AUTHORS, 
         GET_ALBUMS, 
         GET_PHOTOS, 
         OPEN_MODAL,
         CLOSE_MODAL,
         FIND_AUTHOR_BY_ALBUM } from '../actionTypes'
import { galleryReducer } from './galleryReducer'
import axios from 'axios'



export const GalleryState = ({children}) => {

   const initialState = {
      authors: [], 
      lastAuthorId: null,
      authorAlbums: [],
      lastAlbumId: null,
      albumPhotos: [],
      isModalOpen: false,
      findedAuthorId: null
   }

   const [state, dispatch] = useReducer(galleryReducer, initialState)

   const getAuthors = async () => {
      try {
         await axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
               dispatch({
                  type: GET_AUTHORS,
                  payload: response.data
               })
            })
            .catch(err => {
               console.log('server response error: ', err)
            })
      } 
      catch(err) {
         console.log('fetching data error: ', err)
      }
   }

   const getAlbums = async (authorId) => {
      try {
         // получаем все альбомы 
         const allAlbums = await axios.get('https://jsonplaceholder.typicode.com/albums')
            .catch(err => {
               console.log('server response error: ', err)
            })
         // фильтруем альбомы, оставляя только выбранного автора
         const authorAlbums = allAlbums.data.filter(item => {
            return item.userId === authorId
         })
         // получаем все фото
         const allPhotos = await axios.get('https://jsonplaceholder.typicode.com/photos')
            .catch(err => {
               console.log('server response error: ', err)
            })
         // для каждго альбома...
         authorAlbums.forEach(alb => {
            // ищем все фото альбома
            const albumPhotos = allPhotos.data.filter(pht => {
               return pht.albumId === alb.id
            })
            // добавляем обложку (первая фотка альбома) и количество фоток альбома
            alb.cover = albumPhotos[0].thumbnailUrl
            alb.size = albumPhotos.length
         })

         dispatch({
            type: GET_ALBUMS,
            payload: {
               lastAuthorId: authorId,
               authorAlbums
            }
         })
      } 
      catch(err) {
         console.log('fetching data error: ', err)
      }
   }

   const getPhotos = async (albumId) => {
      try {
         await axios.get('https://jsonplaceholder.typicode.com/photos')
            .then(response => {
               const albumPhotos = response.data.filter(item => {
                  return item.albumId === albumId
               })

               dispatch({
                  type: GET_PHOTOS,
                  payload: {
                     lastAlbumId: albumId,
                     albumPhotos
                  }
               })
            })
            .catch(err => {
               console.log('server response error: ', err)
            })
      } 
      catch(err) {
         console.log('fetching data error: ', err)
      }
   }

   const openModal = () => {
      dispatch({
         type: OPEN_MODAL
      })
   }

   const closeModal = () => {
      dispatch({
         type: CLOSE_MODAL
      })
   }
   
   const findAuthorByAlbum = async (albumId) => {
      try {
         // получаем все альбомы 
         const allAlbums = await axios.get('https://jsonplaceholder.typicode.com/albums')
            .catch(err => {
               console.log('server response error: ', err)
            })
         // находим альбом по id
         const findedAlbum = allAlbums.data.find(item => {
            return item.id === albumId
         })
         // id автора
         const authorId = findedAlbum.userId

         dispatch({
            type: FIND_AUTHOR_BY_ALBUM,
            payload: authorId
         })
      } 
      catch(err) {
         console.log('fetching data error: ', err)
      }
   }


   const { authors, lastAuthorId, authorAlbums, lastAlbumId, 
           albumPhotos, isModalOpen, findedAuthorId} = state

   return (
      <GalleryContext.Provider 
         value={{getAuthors, getAlbums, getPhotos, openModal, closeModal, findAuthorByAlbum, authors,
            lastAuthorId, authorAlbums, lastAlbumId, albumPhotos, isModalOpen, findedAuthorId
         }}
      >
         {children}
      </GalleryContext.Provider>
   )
}