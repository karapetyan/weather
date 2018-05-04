const getAllCitiesList = cities =>
    Object.keys(cities).filter(city => 
        city !== '_persist'
    )
    
export default getAllCitiesList;    