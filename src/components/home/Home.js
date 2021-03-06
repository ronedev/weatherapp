import React, { useContext, useState } from 'react'
import placeIcon from 'img/icon/place.png'
import nube from 'img/icon/nube.png'
import ubicacion from 'img/icon/mapa.png'
import Search from 'components/search/Search'
import { geoContext } from 'components/context/geoContext'
import { loadingContext } from 'components/context/loadingContext'
import Loading from 'components/loading/Loading'

const Home = ({ weather, place }) => {

  const GeoContext = useContext(geoContext)
  const LoadingContext = useContext(loadingContext)

  const [searchPlace, setSearchPlace] = useState(false)

  if (!LoadingContext.isLoading) {
    return (
      <aside className='homeContainer'>
        <Search visibility={searchPlace} setVisibility={setSearchPlace} placeActual={place}/>
        <img src={nube} alt="nubeIcon" className='nubeBackground one' />
        <img src={nube} alt="nubeIcon" className='nubeBackground two' />
        <img src={nube} alt="nubeIcon" className='nubeBackground three' />
        <img src={nube} alt="nubeIcon" className='nubeBackground four' />
        <div className='btnContainer'>
          <button className='btn1' onClick={()=> setSearchPlace(true)}>Search for places</button>
          <button className='btn2' onClick={()=> {
            LoadingContext.setLoading(true)
            GeoContext.getActualLocation()
            } }><img src={placeIcon} alt="locationIcon" /></button>
        </div>
        <img src={`https://www.metaweather.com/static/img/weather/png/${weather.weather_state_abbr}.png`} alt="weatherIcon" />
        <h1 className='temperature'>{ GeoContext.escalaTemperatura === 'celsius' ? Math.round(weather.the_temp) : (Math.round(weather.the_temp * (9/5))) + 32 }<span>{GeoContext.escalaTemperatura === 'celsius' ? 'ºC' : 'ºF'}</span></h1>
        <h2 className='weather'>{weather.weather_state_name}</h2>
        <div className='datePlaceContainer'>
          <span className='date'>Today</span>
          <span className='punto'>·</span>
          <span className='date'>{(weather.applicable_date)}</span>
        </div>
          <span className='place'><img src={ubicacion} alt="ubicacionIcon" />{place}</span>
      </aside>
    )
  } else {
    return (
      <Loading />
    )
  }
}

export default Home