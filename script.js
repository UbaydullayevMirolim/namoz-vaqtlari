"use strict";



const regions = [...provencie];


//dynamic option

function renderOptions() {
  regions.forEach((item) => {
    const option = createElement("option", "item-option", item);


    $("#region").appendChild(option);
  });
}


///
renderOptions();

$("#region").addEventListener("change", (e) => {
    e.preventDefault()
  localStorage.setItem("region", e.target.value);
  
  const city = localStorage.getItem("region");


   
  switch (city.toLowerCase()) {
    case "farg'ona":
         getData("qo'qon");
         break;
      case "qashqadaryo":
         getData("qarshi");
         break;
      case "surxondaryo":
         getData("termiz");
         break;
      case "xorazm":
         getData("urganch");
         break;
      case "sirdaryo":
         getData("guliston");
         break;
      case "buxoro":
         getData("buxoro");
         break;
      case "andijon":
         getData("andijon");
         break;
      case "samarqand":
         getData("samarqand");
         break;
      case "jizzax":
         getData("jizzax");
         break;
         case "navoiy":
         getData("navoiy");
         break;
      case "toshkent":
         getData("toshkent");
         break; 

      default:
         getData('toshkent');
  }
});

/// ==== request api==== ///
// bugun uchun //
async function getData(select) {
  const today = await fetch(
    `https://islomapi.uz/api/present/day?region=${select}`);

     const dayResult= await today.json();


// hafta uchun
   
     const week = await fetch(
      `https://islomapi.uz/api/present/week?region=${select}`);
  
       const weekResult= await week.json();
  
       localStorage.setItem("data", JSON.stringify(dayResult))
       localStorage.setItem("week", JSON.stringify(weekResult))
         
     renderData()

     console.log(dayResult);
     console.log(weekResult);
   
}



/// === render data ====



function renderData(){ 
   $('#week').innerHTML=''

const data=JSON.parse(localStorage.getItem("data"));
const week = JSON.parse(localStorage.getItem("week"))



   const {

     region,
     date,
      times:{
         asr,
         hufton,
         peshin,
         quyosh,
         shom_iftor,
         tong_saharlik
      }
   }=data;
   $('#city').innerHTML=region

 $a('.card-time')[0].innerHTML=tong_saharlik
 $a('.card-time')[1].innerHTML=quyosh
 $a('.card-time')[2].innerHTML=peshin
 $a('.card-time')[3].innerHTML=asr
 $a('.card-time')[4].innerHTML=shom_iftor
 $a('.card-time')[5].innerHTML=hufton

 $('.date').innerHTML=date





//    week render      //

week.forEach((item)=>{
   const tr=createElement('tr', 'td-item' ,

   `
   <tr>
   <td>${item.region}</td> <td>${item.date.substring(0,10)}</td> <td>${item.weekday}</td> <td>${item.times.tong_saharlik}</td> <td>${item.times.quyosh}</td>
    <td>${item.times.peshin}</td> <td>${item.times.asr}</td>
    <td>${item.times.shom_iftor}</td> <td>${item.times.hufton}</td>
   </tr>
   
   `)

   $('#week').appendChild(tr)

})





 

    
}

renderData()



// ====== hours ====

function clock(){
   const date=new Date()

   setInterval(()=>{
      const dat=new Date()
      $('#hour').innerHTML=`${dat.getHours()}: ${dat.getMinutes()}: ${dat.getSeconds()}`
   },1000)
}

clock()