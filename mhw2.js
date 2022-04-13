/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

function resetBox(boxList){
    for(const box of boxList){
        box.classList.remove('checked');
        box.classList.remove('unchecked');
        box.classList.add('default');
        box.querySelector('.checkbox').src = "images/unchecked.png";
    }
}

function fineTest(personality){
    const titoloRisposta = document.querySelector("#response h1");
    titoloRisposta.textContent = RESULTS_MAP[personality].title;
    const testoRisposta = document.querySelector("p");
    testoRisposta.textContent = RESULTS_MAP[personality].contents;
    document.querySelector("#response").classList.remove("hidden");
    for(const box of boxes){
        box.removeEventListener('click', selected);
    }
}


function restartTest(){
    document.querySelector("#response").classList.add("hidden");
    resetBox(boxes);
    for(const box of boxes){
        box.addEventListener('click', selected);
    }
    questionBox1.splice(0, questionBox1.length);
    questionBox2.splice(0, questionBox1.length);
    questionBox3.splice(0, questionBox1.length);
    Selected.splice(0, Selected.length)
}


function fillList(){
    for(const box of boxes){
        if(box.dataset.questionId === "one"){
            if(!questionBox1.includes(box))
            questionBox1.push(box);
        }
        else if(box.dataset.questionId === "two"){
            if(!questionBox2.includes(box))
            questionBox2.push(box);
        }
        else if(box.dataset.questionId === "three"){
            if(!questionBox3.includes(box))
            questionBox3.push(box);
        }
    }
}


function response(){
    let personality;
    let max=1;
    let personalityMap = {
        "blep" : 0,
        "burger": 0,
        "cart": 0,
        "dopey":0,
        "happy":0,
        "nerd":0, 
        "shy":0,
        "sleeping": 0,
        "sleepy":0
    }

    personality=Selected[0];
    

    for (let i = 0; i<Selected.length; i++){
        switch (Selected[i]) {
            case "blep":
                personalityMap.blep ++;      
                if(max<personalityMap.blep){
                    personality = "blep";  

                }           
                break;
                
            case "burger":
                personalityMap.burger ++;  
                if(max<personalityMap.burger){
                    personality = "burger";  
                }               
                break;
    
            case "cart":
                personalityMap.cart ++;     
                if(max<personalityMap.cart){
                    personality = "cart";  
                }            
                break;

            case "dopey":
                personalityMap.dopey ++;    
                if(max<personalityMap.dopey){
                    personality = "dopey";  
                }             
                break;

            case "happy":
                personalityMap.happy ++;   
                if(max<personalityMap.happy){
                    personality = "happy";  
                }              
                break;

            case "nerd":
                personalityMap.nerd ++;
                if(max<personalityMap.nerd){
                    personality = "nerd";  
                }                 
                break;

            case "shy":
                personalityMap.shy ++;  
                if(max<personalityMap.shy){
                    personality = "shy";  
                }               
                break;

            case "sleeping":
                personalityMap.sleeping ++;    
                if(max<personalityMap.sleeping){
                    personality = "sleeping";  
                }           
                break;

            default:
                personalityMap.sleepy ++;    
                if(max<personalityMap.sleepy){
                    personality = "sleepy";
                }             
                break;
            }
        }
        fineTest(personality);
} 



function verifyAnswer(elem){
    let flag=0;

            switch (elem.dataset.questionId) {
                case "one":
                Selected[0] = elem.dataset.choiceId;
                break;

            case "two":
                Selected[1] = elem.dataset.choiceId;
                break;
        
            default:
                Selected[2] = elem.dataset.choiceId;
                break;
    }  
    for(let i=0; i<Selected.length; i++){
        if(Selected[i]!==undefined){
        flag++;
        }
    }
    if(flag===3){
        response();
    }
}

function selected(event){
    const container = event.currentTarget;
    fillList();
    
    let indexToRemove = 0;

    if(container.dataset.questionId === "one"){
        resetBox(questionBox1);
        indexToRemove=questionBox1.indexOf(container);
        questionBox1.splice(indexToRemove, 1);

        for(let i=0; i<questionBox1.length; i++){
            questionBox1[i].classList.add('unchecked');
        }
    }
    else if(container.dataset.questionId === "two"){
        resetBox(questionBox2);
        indexToRemove=questionBox2.indexOf(container);
        questionBox2.splice(indexToRemove, 1);

        for(let i=0; i<questionBox2.length; i++){
            questionBox2[i].classList.add('unchecked');
        }
    }
    else{
        resetBox(questionBox3);
        indexToRemove=questionBox3.indexOf(container);
        questionBox3.splice(indexToRemove, 1);

        for(let i=0; i<questionBox3.length; i++){
            questionBox3[i].classList.add('unchecked');
        }
    }
    container.classList.remove('default');
    container.classList.add('checked');
    container.querySelector('.checkbox').src = "images/checked.png";

    verifyAnswer(container);
}




const questionBox1 = [];
const questionBox2 = [];
const questionBox3 = [];
const Selected = [];



const boxes = document.querySelectorAll('.choice-grid div');
for(const box of boxes){
    box.addEventListener('click', selected);
} 

document.querySelector("button").addEventListener("click", restartTest);

