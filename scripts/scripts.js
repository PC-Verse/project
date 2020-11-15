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

function getY(){
    return parseFloat(70.0/numRects).toString() + "vh";
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
    //console.log(N);
    for(let i =0 ; i<N; i++){
        console.log(i);
        let box = document.createElement( "div" );
        box.className = "rectangle";
        box.style.backgroundColor= 'blue';
        let x =  getRandHeight();
        let y = x.toString() + "px";
        box.style.width = y;
        box.style.height = getY();

        boxContainer.appendChild( box );
    }

}