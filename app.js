let video = document.getElementById('videoElement');
let flipBtn = document.getElementById('flip');
let detector;
let detections = [];

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true, facingMode: "environment" })
      .then(function (stream) {
        video.srcObject = stream;
         detector = ml5.objectDetector('cocossd', modelReady);
      })
      .catch(function (err0r) {
        console.log("Something went wrong!");
      });
  }

function modelReady() {
    console.log('Model is ready!');
    detector.detect(video, gotDetections);
}

let divs = [];
for(let i = 0; i < 11; i++) {
     divs[i] = document.createElement('DIV');
     let text = document.createElement('H2');
     divs[i].appendChild(text);

    document.body.appendChild(divs[i]);
}

function gotDetections(error, results) {
    if( error ) {
        console.error(error);
    } else {
        //console.log(results);

        detections = results;

        let i;
        for( i = 0; i < detections.length && i < 11; i++) {
            let object = detections[i];
            let div = divs[i];
            
            //the green rectangular
            div.style.height = object.height.toFixed(2) + 'px';
            div.style.width = object.width.toFixed(2) + 'px';
            div.style.position = 'absolute';
            div.style.top = object.y.toFixed(2) + 'px';
            div.style.left = object.x.toFixed(2) + 'px';
            div.className = 'detect';
            
            let txt = div.querySelectorAll('h2');
            txt[0].innerHTML = object.label;
            txt[0].style.color = 'white';
        
            //label
            /* let text = document.createElement('H2');
            text.innerHTML = object.label;
            text.style.color = 'white';
            div.appendChild(text); */
        
            //videoZone.appendChild(div);
        }

        for(let j = i; j < 11; j++) {
            //clear unused divs
            divs[j].style.width = 0 + 'px';
            divs[j].style.height = 0 + 'px';
            divs[j].style.top = -1000 + 'px';

            let cuv = divs[j].querySelectorAll('h2');
            cuv[0].innerHTML = "";
        }

         detector.detect(video, gotDetections);
    }
}