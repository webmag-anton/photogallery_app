import React from 'react'
import './App.scss'
import { GalleryState } from './context/gallery/galleryState'
import {Switch, Route, Redirect} from 'react-router-dom'
import Authors from './components/Authors/Authors'
import Albums from './components/Albums/Albums'
import Photos from './components/Photos/Photos'


function App() {

   return (
      <GalleryState>

         <Switch>
            <Route path='/' exact component={Authors} />
            <Route path='/author/:name' component={Albums} />
            <Route path='/album/:name' component={Photos} />
            <Redirect to='/' />
         </Switch>
         
      </GalleryState>
   )
}

export default App
