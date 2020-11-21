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
            box.setAttribute("BoxSize" , x.toString());

            boxContainer.appendChild( box );
        }
    }
    else{
        alert ("Must be less than 800 rectangles");
        return -1;
    }


}

function selectionSort(){

}

function insertionSort(){

}

function mergeSort(){

}