var boxContainer;
var numRects;

function initialize() {
    //boxContainer = document.getElementById( "Box-Container" );
    createRectangles() ;
    // console.log( "Page Loaded! :)" );
    /*  Add and remove HTML elements */
}

function getRandHeight(){
    let randH = Math.floor(300 * Math.random(0));
    return randH;
}

function getWidth(){
    return parseFloat(80.0/numRects).toString() + "vw";
}



function createRectangles() {
    boxContainer = document.getElementById( "Box-Container" );

    
    let rects = document.getElementsByClassName( "rectangle" );
     
    while ( rects.length != 0 ){
        boxContainer.removeChild( rects[0] );

    }

    //let NumRectangles = getElementById("amountOfRectangles");
    let N = document.getElementById("amountOfRectangles");
    N = parseInt(N.value);
    numRects = N;

    if(N < 800 && N>0){
    //console.log(N);
        for(let i =0 ; i<N; i++){
            let box = document.createElement( "div" );
            box.className = "rectangle";
            box.style.backgroundColor= 'blue';
            let x =  getRandHeight();
            let y = x.toString() + "px";
            box.style.height = y;
            box.style.width = getWidth();
            box.setAttribute("data-boxsize" , x.toString());
            // to get value use {ELEMENT}.dataset.boxsize
            //parseint(box.dataset.boxsize);
            //box.dataset.boxsize= somevalue.toString();

            boxContainer.appendChild( box );
        }
    }
    else{
        alert ("Must be less than 800 rectangles");
        return -1;
    }

    selectionSort();


}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }
 async function Tutor() {
    await sleep(30000);
 }

function selectionSort(){

    let boxes = boxContainer.childNodes;
    
    console.log(boxes[0]);
    for(let i = numRects; i>1; i--){
        let max=0;
        let index=1;
        for(let j=1; j<=i; j++){
            let x = parseInt(boxes[j].dataset.boxsize);
            if(x > max){
                max = x;
                index=j;
            }

        }


        //debugger;
        let temp = parseInt(boxes[i].dataset.boxsize);
        boxes[i].dataset.boxsize = max.toString();
        boxes[index].dataset.boxsize =  temp;

        boxes[i].style.height = (boxes[i].dataset.boxsize) + "px";
        boxes[index].style.height = (boxes[index].dataset.boxsize) +"px";
        Tutor();


    }
    

}

function insertionSort(){

}

function mergeSort(){

}