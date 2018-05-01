import React from 'react';
import './DashBoard.css';

const removePersitKey = cities =>
    Object.keys(cities).filter(city => 
        city !== '_persist'
    )

const DashBoard = ({cities, removeCity}) => {
    console.log("rendering DashBoard");
    let citiesList = removePersitKey(cities); // removing _persist key from state (this key created automatically by redux-persist)

    if (citiesList.length === 0) {
      return(
        <div className='dashboard-placeholder'>
            Dashboard is empty
        </div>
      )
    }
    return (
        <div className='dashboard'>
        { citiesList.map( city =>
                <div key={city} className='weather'>
                    <h3>{city}</h3>
                    {
                    cities[city].error ?
                        <div>
                            <p>{cities[city].error}</p>
                            <div className='weather__delete' onClick={() => removeCity(city)}>Delete</div>
                        </div> :
                            cities[city].isFetching ?
                                <div>
                                    <div className='spinner'><img src="../images/spinner.svg" /></div>
                                    <div className='weather__delete' onClick={() => removeCity(city)}>Delete</div>
                                </div> :
                                    <div>
                                        <div>{cities[city].temperature}</div>
                                        <img src={`http://openweathermap.org/img/w/${cities[city].icon}.png`} />
                                        <div className='weather__delete' onClick={() => removeCity(city)}>Delete</div>
                                    </div>                                
                    }
                </div>
        )}
        </div> 
    )
}

export default DashBoard;