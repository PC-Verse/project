var boxContainer;
var numRects = 100;
var sliderSpeed = 50;
var timeouts = [];
var canSort = true;

function initialize() {
    //boxContainer = document.getElementById( "Box-Container" );
    createRectangles();
    // console.log( "Page Loaded! :)" );
    /*  Add and remove HTML elements */
}

function getRandHeight() {
    let randH = Math.floor(299 * Math.random(0))+1;
    return randH;
}

function getWidth() {
    return parseFloat(80.0 / numRects).toString() + "vw";
}

function createRectangles() {
    killAllTimeouts();

    boxContainer = document.getElementById("Box-Container");

    let rects = document.getElementsByClassName("rectangle");

    while (rects.length != 0) {
        boxContainer.removeChild(rects[0]);

    }

    //let NumRectangles = getElementById("amountOfRectangles");
    let N = document.getElementById("amountOfRectangles");
    let S = document.getElementById("myRange");
    sliderSpeed = parseInt(S.value)/100;
    N = parseInt(N.value);
    numRects = N;
    console.log(sliderSpeed);

    if (N < 801 && N > 9) {
        //console.log(N);
        for (let i = 0; i < N; i++) {
            let box = document.createElement("div");
            box.className = "rectangle";
            if (i % 2 == 0)
                box.style.backgroundColor = "red";
            else
                box.style.backgroundColor = "blue";

            let x = getRandHeight();
            let y = x.toString() + "px";
            box.style.height = y;
            box.style.width = getWidth();
            box.setAttribute("data-boxsize", x.toString());
            // to get value use {ELEMENT}.dataset.boxsize
            //parseint(box.dataset.boxsize);
            //box.dataset.boxsize= somevalue.toString();

            boxContainer.appendChild(box);
        }
    }
    else {
        alert("Must be between 10 and 800 rectangles");
        return -1;
    }

    // selectionSort();


}

function displayFinish() {

    let boxes = boxContainer.childNodes;
    for (let i = 1; i <= numRects; i++) {

        let timeout = setTimeout(() => {
            // get min
            boxes[i].style.backgroundColor = "#3cff00";
        }, 500 / numRects * i);
        timeouts.push(timeout);
    }
}

function killAllTimeouts() {
    while (timeouts.length >= 1) {
        clearTimeout(timeouts[0]);
        timeouts.shift();   // deletes first element in array
    }
}


function selectionSortSlowed() {
    // killAllTimeouts();

    // if(!canSort)
    //     return;

    // canSort = false;
    createRectangles();
    let boxes = boxContainer.childNodes;
    console.log("selection sort started");

    for (let i = 1; i <= numRects; i++) {
        let timeout = setTimeout(() => {
            // get min
            let min = parseInt(boxes[i].dataset.boxsize);
            let minIndex = i;
            for (let j = i + 1; j <= numRects; j++) {
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
            if (i == numRects) {
                displayFinish();
                // canSort = true;
            }
            boxes[minIndex].style.height = (boxes[minIndex].dataset.boxsize) + "px";
        }, 1000 / sliderSpeed /numRects  * i);
        timeouts.push(timeout);
    }
}

function insertionSortSlowed() {
    // killAllTimeouts();

    // if(!canSort)
    //     return;

    // canSort = false;
    createRectangles();

    console.log("insertion sort started");

    let boxes = boxContainer.childNodes;
    let shift = 0;
    let value = 0;
    for (let i = 1; i <= numRects; i++) {
        let timeout = setTimeout(() => {

            let boxSize = parseInt(boxes[i].dataset.boxsize);
            //find the correct insertion point
            for (let j = i - 1; j >= 1; j--) {
                let currentBoxSize = parseInt(boxes[j].dataset.boxsize);    // error printed to console about this line (run insertion sort to see error)
                if (boxSize >= currentBoxSize || (j == 1 && boxSize <= currentBoxSize)) {
                    if (j <= 1 && boxSize < currentBoxSize)
                        shift = 1;
                    else
                        shift = j + 1;
                    value = boxSize;
                    break;
                }
            }

            //shift elements in front of insertion point one to the right
            for (let x = i; x > shift; x--) {
                //shifting values
                let prev = parseInt(boxes[x - 1].dataset.boxsize);
                boxes[x].dataset.boxsize = prev;
                boxes[x].style.height = prev.toString() + "px";
            }
            //set value at insertion point to correct value
            boxes[shift].dataset.boxsize = value;
            boxes[shift].style.height = value.toString() + "px";

            boxes[i].style.backgroundColor = "grey";
            if (i == numRects) {
                displayFinish();
                // canSort = true;
            }
        }, 1000 / sliderSpeed /numRects  * i);
        timeouts.push(timeout);
    }
    boxes[1].style.backgroundColor = "grey";
}

function runQuickSort(){

    console.log("quick sort started");
    createRectangles();
    let boxes = boxContainer.childNodes;
    var iteration = { "value": 1 };
    // let timeout = setTimeout(() => {
    //     Quicksort(boxes, 1, numRects, iteration);
    //     displayFinish();
    // }, 0);
    
    Quicksort(boxes, 1, numRects, iteration);

    let delayT = 1000 / numRects / sliderSpeed * Math.pow(numRects, 1.325)
    console.log("display finish delay time multiplier: "+2*numRects + ", delay time: " + delayT);
    let timeout = setTimeout(displayFinish, delayT);
    timeouts.push(timeout);
}

function Quicksort(boxes, low, high, iteration){
    if(low < high){
        console.log(low + " " + high);
        // var index = partition(boxes, low, high, iteration);

        let index;
        let timeout = setTimeout(() => {
            index = partition(boxes, low, high);
            Quicksort(boxes, low, index-1, iteration);        
            Quicksort(boxes, index+1, high, iteration);
        }, 1000 / sliderSpeed /numRects  * iteration.value);
        console.log("index: " +index + ", iteration: " + iteration.value+ ", delay time: "+2000 / numRects * iteration.value);
        timeouts.push(timeout);
        iteration.value = iteration.value + 1;

        // let timeout2 = setTimeout(Quicksort, 2000 / numRects*(iteration.value+0.5), low, index-1, iteration);
        // let timeout3 = setTimeout(Quicksort, 200/numRects * (iteration.value+0.5), index+1, high, iteration);
        // timeouts.push(timeout2);
        // timeouts.push(timeout3);

        // let index;
        // let promise = new Promise(function(myResolve, myReject) {
        //     let timeout = setTimeout(() => {
        //         index = partition(boxes, low, high);
        //     }, 2000/numRects * iteration.value);
        //     timeouts.push(timeout);
        //     console.log("index: " +index + ", iteration: " + iteration.value+ ", delay time: "+2000 / numRects * iteration.value);
        //     iteration.value = iteration.value + 1;
        //     if (index != "undefined") {
        //         myResolve("OK");
        //     }
        //     else {
        //         myReject("Error");
        //     }
        // })
        // promise.then(
        //     function(value) {
        //         Quicksort(boxes, low, index-1, iteration);        
        //         Quicksort(boxes, index+1, high, iteration);
        //     }
        // );

        // Quicksort(boxes, low, index-1, iteration);        
        // Quicksort(boxes, index+1, high, iteration);
    }
}

/*
        let timeout = setTimeout(merge, 2000 / numRects * iteration.value, boxes, leftIndex, half, rightIndex, iteration);
        timeouts.push(timeout);

        iteration.value = iteration.value + 1; */

function partition( boxes, low, high){
    // setTimeout(() => {
        // var pivot = parseInt(boxes[high].dataset.boxsize);
        // var i = low-1;

        // for(var j =low; j<high; j++){
        //     var curr = parseInt(boxes[j].dataset.boxsize);
        //     if(curr<pivot){
        //         i++;
        //         // swap boxes[i] and boxes[j]
        //         var temp = parseInt(boxes[j].dataset.boxsize);

        //         boxes[j].dataset.boxsize = boxes[i].dataset.boxsize;
        //         boxes[j].style.boxsize = boxes[i].dataset.boxsize + "px";
                
        //         boxes[i].dataset.boxsize = temp;
        //         boxes[i].style.height = temp.toString()+"px";
        //     }
        // }
        // // swap boxes[i+1] and boxes[high]
        // var temp1 = boxes[i+1].dataset.boxsize;
        // boxes[i+1].dataset.boxsize = boxes[high].dataset.boxsize;
        // boxes[i+1].style.height = boxes[high].dataset.boxsize.toString() + "px";
        // boxes[i+1].style.backgroundColor = "grey";
        // boxes[high].style.backgroundColor = "grey";
        // boxes[high].dataset.boxsize = temp1;
        // boxes[high].style.height = temp1.toString() + "px";

        // return i+1;
    // }, 2000/numRects*iteration.value);
    var pivot = parseInt(boxes[high].dataset.boxsize);
    var i = low-1;

    for(var j =low; j<high; j++){
        var curr = parseInt(boxes[j].dataset.boxsize);
        if(curr<pivot){
            i++;
            // swap boxes[i] and boxes[j]
            var temp = parseInt(boxes[j].dataset.boxsize);

            boxes[j].dataset.boxsize = boxes[i].dataset.boxsize;
            boxes[j].style.boxsize = boxes[i].dataset.boxsize + "px";
            boxes[j].style.backgroundColor = "grey";

            boxes[i].dataset.boxsize = temp;
            boxes[i].style.height = temp.toString()+"px";
        }
    }
    // swap boxes[i+1] and boxes[high]
    var temp1 = boxes[i+1].dataset.boxsize;
    boxes[i+1].dataset.boxsize = boxes[high].dataset.boxsize;
    boxes[i+1].style.height = boxes[high].dataset.boxsize.toString() + "px";
    boxes[i+1].style.backgroundColor = "grey";
    boxes[high].style.backgroundColor = "grey";

    boxes[high].dataset.boxsize = temp1;
    boxes[high].style.height = temp1.toString() + "px";

    return i+1;
}



function runMergeSort() {
    // killAllTimeouts();

    // if(!canSort)
    //     return;
    // canSort = false;

    console.log("merge sort started");

    createRectangles();

    let boxes = boxContainer.childNodes;

    var iteration = { "value": 1 };    // make iteration an object so it gets passed by reference
    mergeSort(boxes, 1, numRects, iteration);
    let timeout = setTimeout(displayFinish, 1000 / numRects / sliderSpeed * (numRects));
    timeouts.push(timeout);
    // canSort = true;
}




function mergeSort(boxes, leftIndex, rightIndex, iteration) {
    if (leftIndex < rightIndex) {
        let half = parseInt(leftIndex + (rightIndex - leftIndex) / 2);

        mergeSort(boxes, leftIndex, half, iteration);
        mergeSort(boxes, half + 1, rightIndex, iteration);

        let timeout = setTimeout(merge, 1000 / numRects / sliderSpeed * iteration.value, boxes, leftIndex, half, rightIndex);
        timeouts.push(timeout);

        iteration.value = iteration.value + 1;
    }
}

function merge(boxes, leftIndex, half, rightIndex) {
    let heights = [];
    heights.length = parseInt((rightIndex - leftIndex) + 1);

    let l = leftIndex;
    let r = half + 1;
    let i = 0;

    while (l < (half + 1) && r < (rightIndex + 1) && i < heights.length) {
        let leftBoxSize = parseInt(boxes[l].dataset.boxsize);
        let rightBoxSize = parseInt(boxes[r].dataset.boxsize);
        if (leftBoxSize < rightBoxSize) {
            heights[i] = leftBoxSize;
            l++
        }
        else {  // rightBoxSize < leftBoxSize
            heights[i] = rightBoxSize;
            r++
        }
        i++;
    }
    if (i < heights.length) {
        while (l < half + 1) {
            heights[i] = parseInt(boxes[l].dataset.boxsize);
            l++;
            i++;
        }
        while (r < rightIndex + 1) {
            heights[i] = parseInt(boxes[r].dataset.boxsize);
            r++;
            i++;
        }
    }

    for (let j = leftIndex; j < (rightIndex + 1); j++) {
        boxes[j].dataset.boxsize = "" + heights[j - leftIndex];

        boxes[j].style.height = (boxes[j].dataset.boxsize) + "px";
        boxes[j].style.backgroundColor = "grey";
    }
}

function bubbleSortSlowed() {
    // killAllTimeouts();
    
    createRectangles();
    
    let boxes = boxContainer.childNodes;
    console.log("bubble sort started");

    for (let i = numRects; i >= 1; i--) {

        let timeout = setTimeout(() => {
            for (let j = 2; j <= i; j++) {
                let leftBoxSize = parseInt(boxes[j-1].dataset.boxsize);
                let currentBoxSize = parseInt(boxes[j].dataset.boxsize);
                if (leftBoxSize > currentBoxSize) {
                    // swap them
                    let temp = leftBoxSize;
                    boxes[j-1].dataset.boxsize = currentBoxSize + "";
                    boxes[j].dataset.boxsize = temp + "";

                    boxes[j-1].style.height = (boxes[j-1].dataset.boxsize) + "px";
                    boxes[j].style.height = (boxes[j].dataset.boxsize) + "px";

                    // boxes[j-1].style.backgroundColor = "grey";
                    // boxes[j].style.backgroundColor = "grey";

                }
            }
            boxes[i].style.backgroundColor = "grey";
            if (i == 1) {
                displayFinish();
            }
        }, 4000/numRects/sliderSpeed * (numRects-i));
        timeouts.push(timeout);
        

    }
}