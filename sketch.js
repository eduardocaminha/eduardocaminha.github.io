let classifier;

var img

imginput = document.getElementById("imginput")
imagem = document.getElementById("imagem")
botao = document.getElementById("botao")
label = document.getElementById("labelId")
confidence = document.getElementById("confidenceId")

imginput.addEventListener('change', function () {
  reader = new FileReader()
  label.innerText = ``

  confidence.innerText = ``

  reader.addEventListener("load", () => {
    sessionStorage.setItem("recent-image", reader.result)
    recentImageDataURL = sessionStorage.getItem("recent-image")
    imagem.setAttribute("src", recentImageDataURL)
    botao.style.visibility = "visible"
  })
  reader.readAsDataURL(this.files[0])

})


function preload() {
  classifier = ml5.imageClassifier('model/model.json',modelLoaded);
}
function modelLoaded(){
  console.log('model loaded')
}
function setup() {
}

async function btnFunction() {
  img = new Image()
  img.setAttribute("src", recentImageDataURL)
  botao.style.visibility = "hidden"
  classifier.classify(img, gotResult);
  imagem.setAttribute("src", recentImageDataURL)
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);

    if(results[0].label==0){
      label.innerText = `Label: com pneumonia` + " - "
    }
    if(results[0].label==1){
      label.innerText = `Label: sem pneumonia` + " - "
    }

    confidence.innerText = `Confidence: ${nf(results[0].confidence, 0, 2)}`

  }
}
