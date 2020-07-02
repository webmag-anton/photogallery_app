import { GET_AUTHORS, 
         GET_ALBUMS, 
         GET_PHOTOS, 
         OPEN_MODAL,
         CLOSE_MODAL,
         FIND_AUTHOR_BY_ALBUM } from '../actionTypes'


export const galleryReducer = (state, action) => {
   switch (action.type) {
      case GET_AUTHORS:
         return {
            ...state, 
            authors: action.payload
         }
      case GET_ALBUMS:
         return {
            ...state, 
            lastAuthorId: action.payload.lastAuthorId,
            authorAlbums: action.payload.authorAlbums
         }
      case GET_PHOTOS:
         return {
            ...state, 
            lastAlbumId: action.payload.lastAlbumId,
            albumPhotos: action.payload.albumPhotos
         }
      case OPEN_MODAL:
         return {
            ...state,
            isModalOpen: true
         }
      case CLOSE_MODAL:
         return {
            ...state,
            isModalOpen: false
         }
      case FIND_AUTHOR_BY_ALBUM:
         return {
            ...state,
            findedAuthorId: action.payload
         }
      default:
         return state
   }
}