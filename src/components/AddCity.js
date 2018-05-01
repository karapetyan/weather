import React from 'react';
import './AddCity.css';

const AddCity = ({addCityAndLoadForecast}) => {    
    let cityNameInput;
    const submit = (e) => {
        e.preventDefault();
        addCityAndLoadForecast(cityNameInput.value);
        cityNameInput.value = '';
    }

    return (
        <form className="cityForm" onSubmit={submit}> 
            <label htmlFor="cityName">Назание города</label>
            <input name="cityName" placeholder="Moscow" ref={input => cityNameInput = input}/>
            <div>
                <button>Add</button>
                <input type="reset" value="Clear"/>
            </div>
        </form>
    )
}

export default AddCity;