/* Global Variables */

// personal API key for OpenWeatherMap API
const key ='&appid=7162708c931f31f126dff1d50fbfcd96&units=imperial';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
let zipCode='giza,12511';
let userResponse = '';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();



// Async POST
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};



const generateProcess = async ()=>{
 
    zipCode = document.getElementById('zip').value;
    userResponse = document.getElementById('feelings').value;

  	const url = baseURL+zipCode+key;
  	console.log(url);
    getWeatherData(url)
  	 .then(function(data){
      console.log(data);
      let temperature = '';
      if(data.cod == "200"){
        temperature = data.main.temp;
      }else{
        temperature = data.message;
      }
      if(userResponse === '')
        userResponse = "please enter your feelings";
      postData('/addWeatherData',{temperature:temperature , newDate: newDate, userResponse: userResponse})

      updateUI()
    })
}

document.getElementById('generate').addEventListener('click',generateProcess);

const getWeatherData = async (url)=>{
	
  	const res = await fetch(url)
  	try{
   	 const data = await res.json();
     console.log(data);
     return data;
	 }catch(error){
    console.log("error", error);
  }
}


const updateUI = async () =>{
  const request =await fetch('/getWeatherData')
  try{
    const allData = await request.json();
    console.log(allData);
    document.getElementById('date').innerHTML = `Temperature: ${allData.temperature}`;
    document.getElementById('temp').innerHTML = `Date: ${allData.newDate}`;
    document.getElementById('content').innerHTML = `User Input: ${allData.userResponse}`;

  }catch(error){
    console.log("error",error);

  }
}



