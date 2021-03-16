import './App.css';
// import DropDown from './component/DropDown.js';
import InfoBox from './component/InfoBox.js';
import Map from './component/Map.js';
import { Card, CardContent,} from '@material-ui/core'
import React , {useState , useEffect} from 'react';
import {FormControl,Select,MenuItem} from '@material-ui/core';
import Table from './component/Table.js';
import { sortData, prettyPrintStat } from './component/util.js';
import LineGraph from './LineGraph.js';
import "leaflet/dist/leaflet.css";

function App() {
  const [countries,setCountries] = useState([])
    const [country,setCountry] = useState('worldwide');
    const [countryInfo, setCountryInfo]= useState({});
    const [tableData,setTableData] = useState([]);
    const [mapCenter, setMapCenter] = useState({lat: 34.80746,  lng: -40.4796})
    const [mapCountries, setMapCountries] = useState([]);
    const [ mapZoom, setMapZoom ] = useState(3);
    const [casesType, setCasesType] = useState("cases");

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

                 const sortedData = sortData(data);
                 console.log(countries);
                setTableData(sortedData);
                setMapCountries(data);
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
         setMapCenter([data.countryInfo.lat, data.countryInfo.lng])
         setMapZoom(4)
  })
  }
  console.log(countryInfo)

  


  return (
    <div className='app'> 
      {/* header file */}
          <div className='app__left'>

                 <div className='app__header'> 
                     <h1>Covid-19 Tracker </h1>
                     {/* Drop list is being added */}
                     {/* start */}
                     <FormControl >
                        <Select variant='outlined' value={country} onChange={onCountryChange}>
                          <MenuItem value='worldwide'> worldwide </MenuItem>
                          {countries.map((country)=>(
                          <MenuItem value={country.value}>{country.name}</MenuItem>
  
                         ))}
                            </Select>
             
                      </FormControl> 
                   </div>

            {/* info box is being added here */}
                  <div className="app__stats">

                    <InfoBox
                    isRed
                     active={casesType === "cases"}
                     onClick={ (e) => setCasesType('cases')}
                     title='Coronavirus Cases'
                     total={prettyPrintStat(countryInfo.active)}
                      cases={prettyPrintStat(countryInfo.todayCases)}
                    />

                    <InfoBox
                    active={casesType === "recovered"}
                     onClick={ (e) => setCasesType('recovered')}
                     title='Recovered' 
                      total={prettyPrintStat(countryInfo.recovered)}
                      cases={prettyPrintStat(countryInfo.todayRecovered)}
                    />

                    <InfoBox 
                    isRed
                    active={casesType === "deaths"}
                     onClick={(e )=> setCasesType('deaths')}
                     title='Deaths'
                      total={prettyPrintStat(countryInfo.deaths)}
                      cases={prettyPrintStat(countryInfo.todayDeaths)}
                    />

                  </div>

                  {/* map here */}
                  <Map
              
                  casesType={casesType}
                  center={mapCenter}
                  zoom={mapZoom}
                  countries={mapCountries}
                  />

          </div>

          <Card className="app__right">

               <CardContent>
                  <h3> Live Cases By Country</h3>
                  <Table countries={tableData}/>
                  <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
                   <LineGraph className="app__graph" casesType={casesType}/>
                </CardContent>
          </Card>
    

   </div>
  );
}

export default App;
