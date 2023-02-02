import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  width: calc(100% - 80px);
  left: 50%;
  transform: translateX(-50%);
  bottom: 60px;
  overflow: hidden;
  border-radius: 999px;
  border: 1px solid black;
  z-index: 2;
  pointer-events: none;

  @media(max-width: 989px) {
    width: calc(100% - 45px);
  }

  font-family: FluxischElse Light;

  // Ticker CSS

  .ticker {
    display: flex;
    background: white;
  }

  .ticker__list {
    display: flex;
    margin: 7px 0;
    animation: ticker 120s infinite linear;
  }

  // .ticker:hover .ticker__list {
  //   animation-play-state: paused;
  // }
  
  .ticker__item {
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
  
  @keyframes ticker {
    100% {
      transform translateX(-100%)
    }
  }

  .ticker__item-element {
    position: relative;
    margin-right: 0
  }

  .ticker__item > div:not(:nth-last-child(2)) {
    margin-right: 20px;
  }

  .ticker__item > div:last-child {
    margin-right: 10px;
  }

  .ticker__item > div:not(:nth-last-child(2))::after {
    content: '';
    position: absolute;
    right: -12.5px;
    top: 50%;
    transform: translateY(-50%);
    height: 5px;
    width: 5px;
    background: black;
    border-radius: 999px;
  }

  .ticker__item-dot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: black;
    margin: 0 10px;
  }

`



export default function Component() {
  let [all, setAll] = useState([]);
  let containerRef = useRef();

  let cities = [
    "Paris",
    "London",
    "New York", 
    "Tokyo",
    "Brasilia",
    "Kinshasa"
  ]

  let getAllCitiesInformation = async () => {
    
    let promises = [];

    let data = null;

    cities.forEach(item => promises.push(getCityInformation(item)))

    await Promise.all(promises).then(values => {
      data = values
    })

    setAll(data)

  }

  let getCityInformation = async (city) => {

    let obj = {}

    let population = await fetch(`https://api.api-ninjas.com/v1/city?name=${city}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'xIve4kUksY6ZqPHxIO3+2A==aV0tDuyxwlDdkkIW'
      }
    }).then((res) => {
      return res.json()
    })

    obj.population = population[0]

    let weather = await fetch(`https://api.api-ninjas.com/v1/weather?city=${city}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'xIve4kUksY6ZqPHxIO3+2A==aV0tDuyxwlDdkkIW'
      }
    }).then((res) => {
      return res.json()
    })

    obj.weather = weather

    let stats = await fetch(`https://api.api-ninjas.com/v1/country?name=${obj.population.country}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'xIve4kUksY6ZqPHxIO3+2A==aV0tDuyxwlDdkkIW'
      }
    }).then((res) => {
      return res.json()
    })

    obj.stats = stats[0]

    return obj

  }

  useEffect(() => {

    // Get API Info

    getAllCitiesInformation();

  }, []);

  useEffect(() => {
    let ticker = document.querySelector('.ticker')
    let list = document.querySelector('.ticker__list')
    let clone = list.cloneNode(true)

    ticker.append(clone);

  }, [all])


  return (
    <Container ref={containerRef}>
      <div className='ticker'>
        <div className='ticker__list'>
          {all.map(item => 
            <div className='ticker__item'>
              <div className='ticker__item-element'>{item.population.name}, {item.stats.name}</div>
              <div className='ticker__item-element'>Population: {item.population.population.toLocaleString()}</div>
              <div className='ticker__item-element'>{item.weather.temp}°C</div>
              <div className='ticker__item-element'>Currency: {item.stats.currency.code}</div>
              <div className='ticker__item-element'>Sex ratio: {item.stats.sex_ratio}</div>
              <div className='ticker__item-element'>Fertility: {item.stats.fertility}</div>
              <div className='ticker__item-element'>Co2 emissions: {item.stats.co2_emissions}</div>
              <div className='ticker__item-element'>Forested area: {item.stats.forested_area}</div>
              <div className='ticker__item-dot'></div>
            </div>
            )}
        </div>
      </div>
    </Container>
  )
}
