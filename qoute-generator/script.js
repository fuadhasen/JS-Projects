let userFrom = JSON.parse(localStorage.getItem('user') || []);
let fav2 = JSON.parse(localStorage.getItem('fav'));

// localStorage.removeItem('fav')
    if (!fav2){
        let fav2 = [];
        localStorage.setItem('fav', JSON.stringify(fav2));
    }

if (!userFrom){

let user = [
    [
    {qarie: 'mishari', title:'sura beqerah'},
    {qarie: 'alijabir', title:'sura imran'},
    {qarie: 'sudeys', title:'sura maida'},
    {qarie: 'mahir', title:'sura khafe'},
],
[
    {reporter: 'abahureyra', title:'ye alimoch abat'},
    {reporter: 'abushureyh', title:'ye shurey abat'},
    {reporter: 'ibnu-mesud', title:'hufazel quran'},
    {reporter: 'ibnu-malk', title:'ye malik lij'},
],
[
    {author: 'imamumalik', title:'ahlesuna'},
    {author: 'imamhamed', title:'aqidetul wasitiya'},
    {author: 'imamhanefiy', title:'tewhid arububiya'},
    {author: 'imamushafiy', title:'sherhusuna we'},
]
];
    localStorage.setItem('user', JSON.stringify(user));
}


const del = document.getElementById('delete');
const add = document.getElementById('btn');
const enter1 = document.getElementById('enter1');
const enter2 = document.getElementById('enter2');

const subm = document.getElementById('check');
const qouteTxt = document.getElementById('qouteText');
const authorTxt =  document.getElementById('authorText');

function checkradio(){
    const radio = document.getElementsByName('radio');

    radio.forEach(input => {
        if(input.checked){
            switch(input.value){
                case 'quran':
                    quran();
                    break;
                case 'hadis':
                    hadis();
                    break;
                case 'ulemaIgtihad':
                    ulema();
                    break;
                
            }
        }
        
    });
    applyliked();

}

function quran() {

    // heart.style.color = 'black';
    let userFrom = JSON.parse(localStorage.getItem('user')) || [];

    const userArray = userFrom[0] || [];

    if (userArray.length > 0){
    const randI = Math.floor(Math.random() * userArray.length);
    qouteTxt.textContent = '"' + userArray[randI].title + '"';
    authorTxt.textContent = '-> ' + userArray[randI].qarie;
    }

}
function hadis() {
    let userFrom = JSON.parse(localStorage.getItem('user')) || [];

    const userArray = userFrom[1] || [];

    const randI = Math.floor(Math.random() * userArray.length);
    qouteTxt.textContent = '"' + userArray[randI].title + '"';
    authorTxt.textContent = '-> ' + userArray[randI].reporter;
}
function ulema() {
    let userFrom = JSON.parse(localStorage.getItem('user')) || [];

    const userArray = userFrom[2] || [];

    if (userArray.length > 0){

    const randI = Math.floor(Math.random() * userArray.length);
    qouteTxt.textContent = '"' + userArray[randI].title + '"';
    authorTxt.textContent = '-> ' + userArray[randI].author;
    }
}
function push(){
    const radio = document.getElementsByName('radio');

    radio.forEach(input => {
        if(input.checked){
            switch(input.value){
                case 'quran':
                    addquran();
                    break;
                case 'hadis':
                    addhadis();
                    break;
                case 'ulemaIgtihad':
                    addulema();
                    break;
                 
            }
            

        }
    }
);
if (enter2.value != "" && enter1.value != ""){
    enter2.value = "";   
    enter1.value = ""; 
}
else{
    if(enter2.value == "" && enter1.value != "")
        alert('please fill out  author');
    else if(enter2.value == "" && enter1.value == "")
       alert('please fill out  both');
    else
    alert('please fill out  title');
}

}
    
function addquran(){
    let userFrom = JSON.parse(localStorage.getItem('user')) || [[]];

    if (enter2.value != "" && enter1.value != ""){
        let index = 0;
        userFrom[index].push({
            qarie:  enter2.value,
            title: enter1.value,
        });
         localStorage.setItem('user', JSON.stringify(userFrom));
    }
}        

function addhadis(){
    let userFrom = JSON.parse(localStorage.getItem('user')) || [[]];
    if (enter2.value != "" && enter1.value != ""){

        userFrom[1].push({
            reporter: enter2.value,
            title: enter1.value,
        });
        localStorage.setItem('user', JSON.stringify(userFrom));

    }
}
function addulema(){

    let userFrom = JSON.parse(localStorage.getItem('user')) || [[]];

    if (enter2.value != "" && enter1.value != ""){
        userFrom[2].push({
            author: enter2.value,
            title: enter1.value,
        });       
          localStorage.setItem('user', JSON.stringify(userFrom));
    }
}

function dele(){
    const radio = document.getElementsByName('radio');

    radio.forEach(input => {
        if (input.checked){
            switch(input.value){
                case 'quran':
                    delquran();
                    break;
                case 'hadis':
                    delhadis();
                    break;
                case 'ulemaIgtihad':
                    delulema();
                    break;
            }
        }
    });
}

function delquran(){
    let userFrom = JSON.parse(localStorage.getItem('user')) || [];

    const displayqout = qouteTxt.textContent.trim().replace(/['"]+/g, '');
    console.log(displayqout);
    const index = userFrom[0].findIndex(element => element.title === displayqout);
    console.log(index);

    if(index !== -1){
        userFrom[0].splice(index, 1);
        const isContentInArray = userFrom[0].length;
        if (isContentInArray){
            localStorage.setItem('user', JSON.stringify(userFrom));
            quran();
        }
        else{
            qouteTxt.textContent = 'NO ANY QOUTE';
            authorTxt.textContent = 'no any author';
            localStorage.setItem('user', JSON.stringify(userFrom));
        }
}
}

function delhadis(){
    const displayqout = qouteTxt.textContent.trim().replace(/['"]+/g, '');
    console.log(displayqout);
    const index = userFrom[1].findIndex(element => element.title === displayqout);
    console.log(index);

    if(index !== -1){
        userFrom[1].splice(index, 1);
        const isContentInArray = userFrom[1].length;
        if (isContentInArray){
            localStorage.setItem('user', JSON.stringify(userFrom));
            hadis();
        }
        else{
            qouteTxt.textContent = 'NO ANY QOUTE';
            authorTxt.textContent = 'no any author';

        }
        localStorage.setItem('user', JSON.stringify(userFrom));
}
}
function delulema(){
    const displayqout = qouteTxt.textContent.trim().replace(/['"]+/g, '');
    console.log(displayqout);
    const index = userFrom[2].findIndex(element => element.title === displayqout);
    console.log(index);

    if(index !== -1){
        userFrom[2].splice(index, 1);
        const isContentInArray = userFrom[2].length;
        if (isContentInArray){
            localStorage.setItem('user', JSON.stringify(userFrom));
            ulema();
        }
        else{
            qouteTxt.textContent = 'NO ANY QOUTE';
            authorTxt.textContent = 'no any author';

        }
        localStorage.setItem('user', JSON.stringify(userFrom));

}

}
function favo(){
    const radio = document.getElementsByName('radio');

    radio.forEach(input => {
        if (input.checked){
            switch(input.value){
                case 'quran':
                    fquran();
                    break;
                case 'hadis':
                    fhadis();
                    break;
                case 'ulemaIgtihad':
                    fulema();
                    break;
            }
        }
    });
}
 
function fquran(){
    const displayqout = qouteTxt.textContent.trim().replace(/['"]+/g, '');
    const displayAuthor = authorTxt.textContent.trim().replace(/[]+/g, '');
    let fav2 = JSON.parse(localStorage.getItem('fav'));

    let faver = false;

    fav2.forEach((obj, index)=> {
        if (obj.title === displayqout){
            faver = true;
            fav2.splice(index, 1);
            localStorage.setItem('fav', JSON.stringify(fav2))
            heart.style.color = 'black';

            
        }
    });

    if (!faver){
        fav2.push({
            title: displayqout,
            author: displayAuthor
        });
        heart.style.color = 'red';
        localStorage.setItem('fav', JSON.stringify(fav2));
}
}

function fhadis(){
    const displayqout = qouteTxt.textContent.trim().replace(/['"]+/g, '');
    const displayAuthor = authorTxt.textContent.trim().replace(/[]+/g, '');
    let fav2 = JSON.parse(localStorage.getItem('fav'));

    let faver = false;

    fav2.forEach((obj, index)=> {
        if (obj.title === displayqout){
            faver = true;
            fav2.splice(index, 1);
            localStorage.setItem('fav', JSON.stringify(fav2))
            heart.style.color = 'black';

            
        }
    });

    if (!faver){
        fav2.push({
            title: displayqout,
            author: displayAuthor
        });
        heart.style.color = 'red';
        localStorage.setItem('fav', JSON.stringify(fav2))
    }
}

function fulema(){
    const displayqout = qouteTxt.textContent.trim().replace(/['"]+/g, '');
    const displayAuthor = authorTxt.textContent.trim().replace(/[]+/g, '');
    let fav2 = JSON.parse(localStorage.getItem('fav'));

    let faver = false;

    fav2.forEach((obj, index)=> {
        if (obj.title === displayqout){
            faver = true;
            fav2.splice(index, 1);
            localStorage.setItem('fav', JSON.stringify(fav2))
            heart.style.color = 'black';

        }
    });

    if (!faver){
        fav2.push({
            title: displayqout,
            author: displayAuthor
        });
        heart.style.color = 'red';
        localStorage.setItem('fav', JSON.stringify(fav2))
}
}
function applyliked(){
    const displayqout = qouteTxt.textContent.trim().replace(/['"]+/g, '');
    const displayAuthor = authorTxt.textContent.trim().replace(/[]+/g, '');

    const liked = JSON.parse(localStorage.getItem('fav')) || [];

    liked.forEach(like => {
        if (like.title === displayqout && like.author === displayAuthor){
            heart.style.color = 'red';
        }
        else{
            heart.style.color = 'black';
        }
    });
}
add.addEventListener('click', push);
subm.addEventListener('click', checkradio);
del.addEventListener('click', dele);

document.addEventListener('DOMContentLoaded', function() {
    const heart = document.getElementById('heart');

    console.log(heart);  // Check if the element is selected properly

    heart.addEventListener('click', favo); // Attach the click event listener
});


