import React , {useState , useEffect} from 'react';
import {FormControl,Select,MenuItem} from '@material-ui/core';

function DropDown() {
    const [countries,setCountries] = useState([])
    const [country,setCountry] = useState('worldwide');
    const [countryInfo, setCountryInfo]= useState({});

    useEffect(()=>{
        fetch("https://disease.sh/v3/covid-19/all")
        .then(response => response.json())
        .then(data => {
            setCountryInfo(data);
        })
    },[])

 useEffect(()=>{
     const getDataFromApi = async ()=>{ 
        await fetch('https://disease.sh/v3/covid-19/countries')
         .then ((response)=> response.json())
         .then ((data)=> {
             const countries = data.map((country)=>({
                     name: country.country,
                     value: country.countryInfo.iso2,
                 }));
                 console.log(countries)

                 setCountries(countries);
         });
        }
         getDataFromApi();
 },  []);
 
  const onCountryChange = async (event) => {
      const countryCode = event.target.value;
      console.log(countryCode)
      setCountry(countryCode)

      const url =
    countryCode === 'worldwide'
     ?'https://disease,sh/v3/covid-19/all'
     :`https://disease.sh/v3/covid-19/countries/${countryCode}`;

     await fetch (url)
     .then(response => response.json())
     .then(data => {
         setCountry(countryCode);
        //   all of the data from the country response 
         setCountryInfo(data);
  })
  }
  console.log(countryInfo)

  

    return (
        <div className='DropDown_width'>
          <FormControl >
              <Select variant='outlined' value={country} onChange={onCountryChange}>
              <MenuItem value='worldwide'>Worldwide</MenuItem>

                  {countries.map((country)=>(
                    <MenuItem value={country.value}>{country.name}</MenuItem>
  
                  ))}
{/* 
                  <MenuItem value='worldwide'>World wide</MenuItem>
                  <MenuItem value='worldwide'> wide</MenuItem>
                  <MenuItem value='worldwide'>World wide</MenuItem>
                  <MenuItem value='worldwide'>wide</MenuItem>
                  <MenuItem value='worldwide'>World </MenuItem>
                  <MenuItem value='worldwide'>World wide</MenuItem> */}

              </Select>
             
          </FormControl>   
        </div>
    )
}

export default DropDown;