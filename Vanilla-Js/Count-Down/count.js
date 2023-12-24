const add = document.getElementById('add');
const start1 = document.getElementById('start');
const input1 = document.getElementById('date1');
const input2 = document.getElementById('disc1');

let outputdiv2 = document.getElementById('countDown');


    let alldiv2 = document.createElement('div');

    let day = document.createElement('p');
    day.classList.add('day');
    let hour = document.createElement('p');
    hour.classList.add('hour');
    let minute = document.createElement('p');
    minute.classList.add('minute')
    let second = document.createElement('p');
    second.classList.add('second');
    let date = JSON.parse(localStorage.getItem('date2'));

    clearInterval(outputdiv2.intervalId);

    function dayf(days){
        day.innerHTML = `<span class="num">${days}</span><br><span class="text">Days</span>`;
    }
    function hourf(hours){
        hour.innerHTML = `<span class="num">${hours}</span><br><span class="text">Hours</span>`;
    }
    function minutf(minutes){
        minute.innerHTML = `<span class="num">${minutes}</span><br><span class="text">Minutes</span>`;
    }
    function sf(seconds){
        second.innerHTML = `<span class="num">${seconds}</span><br><span class="text">Seconds</span>`;
    }
    
const display = () => {
    console.log('alew');
    let date = JSON.parse(localStorage.getItem('date2'));
    if(!date){

    }

    date.forEach((item, indx) => {
        console.log(item);
        console.log(indx);

        const display1 = document.getElementById('list'); 
    
        let alldiv = document.createElement('div');
        let disc = document.createElement('p');
        let start = document.createElement('div');
    
        display1.classList.add('outputdiv');
        alldiv.classList.add('created1');
       
        disc.classList.add('disc1');
        
        start.classList.add('startbtn');
        start.textContent = 'Set';
        start.style.color = 'green';     
        disc.textContent = date[indx].disc;
        alldiv.appendChild(disc);
        alldiv.appendChild(start);           
        display1.appendChild(alldiv);

        let indec = indx;

    start.onclick = function(){
        clearInterval(intervalIds);
        count(indx);
            
     } 
    });


    let intervalIds;

   function update1(in1){
    function update(){
        count(in1);
        console.log(in1);
    }
    intervalIds = setInterval(update, 1000);
}

 function count(idx){
       
        console.log(idx);
         timeDnce(idx);

        
       outputdiv2.children[0].innerHTML = '';
       outputdiv2.children[0].appendChild(day);

       outputdiv2.children[1].innerHTML = '';
       outputdiv2.children[1].appendChild(hour);

       outputdiv2.children[2].innerHTML = '';
       outputdiv2.children[2].appendChild(minute);

       outputdiv2.children[3].innerHTML = '';
       outputdiv2.children[3].appendChild(second);


    start1.onclick = function(){
        update1(idx);
   }

}
}



function timeDnce(idx){

    let current = new Date();
   
    let date = JSON.parse(localStorage.getItem('date2'));
    let index = date.length - 1;
    let user = Date.parse(date[idx].date);
    console.log(idx);

    if (user >= Date.now()){
    
    let updatediff =  user - current.getTime();
    let D = Math.ceil(updatediff / (24*60*60*1000));
    let H = Math.ceil((updatediff % (24*60*60*1000)) / (1000*60*60));
    let M = Math.ceil((updatediff % (1000*60*60)) / (1000 * 60));
    let S = Math.ceil((updatediff % (1000*60)) / 1000);

    dayf(D);
    hourf(H);
    minutf(M);
    sf(S);

}
}

    function displaysingle(){
        let date = JSON.parse(localStorage.getItem('date2'));

        const display1 = document.getElementById('list'); 
    
        let alldiv = document.createElement('div');
        let disc = document.createElement('p');
        let start = document.createElement('div');
    
        display1.classList.add('outputdiv');
        alldiv.classList.add('created1');
       
        disc.classList.add('disc1');
        start.classList.add('startbtn');
        start.textContent = 'Set';
        start.style.color = 'green';
        let index = 0;       
        disc.textContent = date[index].disc;
        alldiv.appendChild(disc);
        alldiv.appendChild(start);
        
        display1.insertBefore(alldiv, display1.firstChild);
        
    }
    display();
add.addEventListener('click', function(){
        let date = JSON.parse(localStorage.getItem('date2'));
    
        if (!date){
            let user = [
                {date: input1.value, disc: input2.value}
            ]
            localStorage.setItem('date2', JSON.stringify(user));
        }
        else{
        let newD = {
            date: input1.value,
            disc: input2.value
        };
    
        date.unshift(newD);
        localStorage.setItem('date2', JSON.stringify(date));
        displaysingle();
    }
    input1.value = '';
    input2.value = '';        
    });