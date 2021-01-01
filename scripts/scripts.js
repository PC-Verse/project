var boxContainer;
var numRects = 100;

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

    if(N < 801 && N>9){
    //console.log(N);
        for(let i =0 ; i<N; i++){
            let box = document.createElement( "div" );
            box.className = "rectangle";
            if(i%2==0)
                box.style.backgroundColor= "red";
            else
                box.style.backgroundColor= "blue";

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
        alert ("Must be between 10 and 800 rectangles");
        return -1;
    }

    // selectionSort();


}
function sort() {
    let radioBtn = document.getElementsByName('sort');
    for (let i = 0; i < radioBtn.length; i++) {
        if (radioBtn[i].checked) {

            if (radioBtn[i].value == "merge") {
                mergeSort();
            }
            else if (radioBtn[i].value == "selection") {
                selectionSortSlowed();
            }
            else if (radioBtn[i].value == "insertion") {
                insertionSortSlowed();
            }
        }
    }
}

function displayFinish(){
    let boxes = boxContainer.childNodes;
    for (let i = 1; i <= numRects; i++) {

        setTimeout(() => {
                // get min
            boxes[i].style.backgroundColor = "#3cff00";
            }, 1000/numRects * i );    
    }
}
function selectionSortSlowed() {
    createRectangles();
    let boxes = boxContainer.childNodes;
    console.log("selection sort started");

    for (let i = 1; i <= numRects; i++) {

        setTimeout(() => {
            // get min
            let min = parseInt(boxes[i].dataset.boxsize);
            let minIndex = i;
            for (let j = i+1; j <= numRects; j++) {
                let currentBoxSize = parseInt(boxes[j].dataset.boxsize);
                if (currentBoxSize < min) {
                    min = currentBoxSize;
                    minIndex = j;
                }
            }
    
            // swap min
            let temp = parseInt(boxes[i].dataset.boxsize);
            boxes[i].dataset.boxsize = min.toString();
            boxes[minIndex].dataset.boxsize = temp;
    
            boxes[i].style.height = (boxes[i].dataset.boxsize) + "px";
            boxes[i].style.backgroundColor = "grey";
            if(i==numRects)
                displayFinish();
            boxes[minIndex].style.height = (boxes[minIndex].dataset.boxsize) + "px";}, 2000/numRects * i ); 





    }
    // displayFinish();
 }

// function selectionSort() {

//     let boxes = boxContainer.childNodes;
    
//     console.log(boxes[1]);
//     for(let i = numRects; i>1; i--){
//         let max=0;
//         let index=1;
//         for(let j=1; j<=i; j++){
//             let x = parseInt(boxes[j].dataset.boxsize);
//             if(x > max){
//                 max = x;
//                 index=j;
//             }

//         }


//         //debugger;
//         let temp = parseInt(boxes[i].dataset.boxsize);
//         boxes[i].dataset.boxsize = max.toString();
//         boxes[index].dataset.boxsize =  temp;

//         boxes[i].style.height = (boxes[i].dataset.boxsize) + "px";
//         boxes[index].style.height = (boxes[index].dataset.boxsize) +"px";


//     }
    
// }

function insertionSortSlowed(){
    createRectangles();

    console.log("insertion sort started");

    let boxes = boxContainer.childNodes;
    let shift = 0;
    let value = 0;
    for (let i = 0; i <= numRects; i++) {

        setTimeout(() => {
                
            let boxSize = parseInt(boxes[i].dataset.boxsize);
            //find the correct insertion point
            for (let j = i-1; j >=0; j--) {
                let currentBoxSize = parseInt(boxes[j].dataset.boxsize);    // error printed to console about this line (run insertion sort to see error)
                if(boxSize >= currentBoxSize || (j==1 && boxSize<=currentBoxSize)){
                    if(j<=1 && boxSize<currentBoxSize)
                        shift=1;
                    else
                        shift=j+1;
                    value = boxSize;
                    break;
                }
            }

            //shift elements in front of insertion point one to the right
            for(let x = i; x>shift; x--){
                //shifting values
                let prev = parseInt(boxes[x-1].dataset.boxsize);
                boxes[x].dataset.boxsize = prev;
                boxes[x].style.height = prev.toString() + "px";
            }
            //set value at insertion point to correct value
            boxes[shift].dataset.boxsize = value;
            boxes[shift].style.height =  value.toString() + "px";
            
            boxes[i].style.backgroundColor = "grey";
            if(i==numRects)
                displayFinish();

            // swap min
           }, 2000/numRects * i );



    }
    boxes[1].style.backgroundColor = "grey";

}

function mergeSort(){
    console.log("merge sort started");
}