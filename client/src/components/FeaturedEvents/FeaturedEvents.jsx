import React from 'react'
import {  concert_list } from '../../assets/assets'
import { genres_list } from '../../assets/assets'
import './FeaturedEvents.css'

function FeaturedEvents(){

  return(
        <div class="container-fluid" id="featured-events">
            <h1>Featured Events</h1>
            <div class="featured-events-list">
                {concert_list.map((item,index) => {
                    return (
                        <div key={index} class="featured-events-list-item">
                            <img src={item.concert_img} class="img-fluid" alt=""/>
                            <h5>{item.concert_name}</h5>
                            <p>{item.concert_artist}</p>
                        </div> 
                    )
                })}
            </div>
            <h1>Top Genres</h1>
            <div class="featured-events-list">
                {genres_list.map((item,index) => {
                    return (
                        <div key={index} class="featured-events-list-item">
                            <button class="genres-btn" type="button">{item.genre_name}</button>
                        </div> 
                    )
                })}
            </div>
        </div>
  );
}
export default FeaturedEvents