import { useMemo, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import './Destination.css';
import { useJsApiLoader, DirectionsRenderer, GoogleMap, Marker, Autocomplete} from '@react-google-maps/api';

// I have applied google map for developer use only. That is why there are some limitations to implement the complete the desired functions

export default function Api(){
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
    });
    if(!isLoaded) return <div>Loading...</div>;
    return <Map />;
}

function Map(){
    // Here the default marker would be Joensuu as I live here now
    const center = useMemo(() => ({lat: 62.600990, lng: 29.763531 }), []);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [directionsResponse, setDirectionResponse] = useState(null);
    const originRef = useRef();
    const destinationRef = useRef();

    function calculateRoute(){
        if(originRef.current.value === '' || destinationRef.current.value === ''){
            return
        }
        // eslint-disable-next-line no-undef 
        const directionsService = new google.maps.DirectionsService();
        const results = directionsService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            // eslint-disable-next-line no-undef 
            travelMode: google.maps.TravelMode.DRIVING
        })
        setDirectionResponse(results);
    }

    // This function writen for clearing the state after place search
/*     function clearRoute(){
        setDirectionResponse(null);
        originRef.current.value = '';
        destinationRef.current.value = '';
    } */

    const onSubmit = () => {
        calculateRoute();
    };
    return (
        <div className='row flex'>
            <div className='col-lg-4 col-xs-12'>
                <div className='search-box'>
                    <form className='search-form col-md-4 col-md-offset-4' onSubmit={handleSubmit(onSubmit)}>
                        <label>Pick From</label>
                        <Autocomplete>
                            <input {...register("from", { required: true })} ref={originRef} placeholder="Your start point" />
                        </Autocomplete>
                        {errors.from && <span className='error'>Start point</span>}
                        <label>Pick To</label>
                        <Autocomplete>
                            <input {...register("to", { required: true })} ref={destinationRef} placeholder="Your end point" />
                        </Autocomplete>
                        {errors.to && <span className='error'>End point</span>}
                        <input type="submit" value="Search" />
                    </form>
                </div>
            </div>
            <div className='col-lg-8 col-xs-12'>
                <div className='map-box'>
                    <GoogleMap
                        center={center}
                        zoom={15}
                        mapContainerStyle={{width: '100%', height: '100%'}}
                    >
                        <Marker position={center} />
                        {
                            directionsResponse && <DirectionsRenderer directions={directionsResponse} />
                        }
                    </GoogleMap>
                </div>
            </div>
        </div>
    );
}