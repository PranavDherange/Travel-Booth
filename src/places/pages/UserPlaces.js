import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../Components/PlaceList';

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the tallest building in New York',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/375px-Empire_State_Building_%28aerial_view%29.jpg',
        address: '20 W 34th St, New York, NY 10001, United States',
        location: {
            lat: 40.7484405,
            lng: -73.9878531
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Taj Mahal',
        description: 'One of the seven wonders of the world',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5-nNmWzILiz2HtwoKYcxoJL-CW6fqFOYa8Q&usqp=CAU',
        address: 'Agra, Uttar Pradesh 282001, India.',
        location: {
            lat: 27.1750151,
            lng: 78.0421552
        },
        creator: 'u2'
    }
]

const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return <PlaceList items={loadedPlaces} />
}

export default UserPlaces
