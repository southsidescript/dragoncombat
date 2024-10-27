const app = document.querySelector('.app');

const hamster = document.querySelector('.display_tap');

const currentWallet = document.querySelector('#wallet_coin');

const currentEnergy = document.querySelector('#energy');

const lvlProgress = document.querySelector('.level_progress');

const level = document.querySelector('#level');

//DB база данных 
const data = {
   coin:0,
   energy:1000,
   profit:2,
   level:1,
   level_progress:0,
   earn_per_tap:1
}





//functions
function handleGreeting(){

   let div = document.createElement('div'); //Создаем блок
   let img = document.createElement('img'); //Создаем изображение
   img.src = '../img/hamster-poster.png';   //Вкладываем в img изображение
   div.classList.add('greating') ;    //Задаем  класс greating

   div.appendChild(img);
    
   document.body.appendChild(div)  //Добавляем на страницу 
   

   setTimeout(function(){
    div.remove();             //Удаляем приветственное окно
    app.style.display = 'flex'//Показываем наше приложение
   
   },6000)

}


function handleTap(e){
   
   if(data.energy > 0){
       data.coin = data.coin + data.earn_per_tap;
       data.energy = data.energy - 1;
       currentWallet.innerHTML = data.coin;
       currentEnergy.innerHTML = data.energy;
       hamster.classList.add('tap_mod');
   
       



       let timer = setTimeout(() => {
         hamster.classList.remove('tap_mod');
         clearTimeout(timer);
       },100);

       
   }

   const money = document.createElement('img');
   money.src = '../img/hamster_coin.png';
   console.log(money);

    money.classList.add('money');

    app.appendChild(money);

    money.style.left = e.clientX + 'px';
    money.style.top = e.clientY - 30 + 'px';

    setTimeout(()=>{
      money.remove();
    },1000)

    
   upgradeLevel();

   
   
}

function upgradeLevel(){
   
   if(data.level_progress >= 100){
      data.level  = data.level + 1;
      data.earn_per_tap = data.earn_per_tap + 1;
      data.profit = data.profit * 2;
      data.level_progress = 0;

      lvlProgress.style.width = data.level_progress + '%';
      level.innerHTML = data.level;
   }

   data.level_progress = data.level_progress + 1;
   lvlProgress.style.width = data.level_progress + '%';
}

function earnPerSecond(){

   let profitInterval = setInterval(function(){
       data.coin = data.coin + data.profit;
       currentWallet.innerHTML = data.coin;
 },1000)
   



}

function energyRecovery(){

let energyInterval = setInterval(function(){
   if(data.energy < 1000){
      data.energy = data.energy + 1;
      currentEnergy.innerHTML = data.energy;
   }
    
},1000)

}






//func calls 
handleGreeting();
earnPerSecond();
energyRecovery();









//События 

hamster.addEventListener('click',handleTap)


