var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');
var sharedMomentsArea = document.querySelector('#shared-moments');

function openCreatePostModal() {
  let transform = "scale(1)"
  createPostArea.style.transform = transform;
  createPostArea.style.webkitTransform = transform;
  createPostArea.style.msTransform = transform;
  if(deferrtPrompt){
    deferrtPrompt.prompt()
    deferrtPrompt.userChoice.then(function(choiceResult){
      console.log(choiceResult.outcome);
      deferrtPrompt=null
    })
  }
}

function closeCreatePostModal() {
  let transform = "scale(0)"
  createPostArea.style.transform = transform;
  createPostArea.style.webkitTransform = transform;
  createPostArea.style.msTransform = transform;
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);


function createCard(data) {
  var cardWrapper = document.createElement('div');
  cardWrapper.className = 'shared-moment-card mdl-card mdl-shadow--2dp ';
  var cardTitle = document.createElement('div');
  cardTitle.className = 'mdl-card__title';
  cardTitle.style.backgroundImage = 'url('+ data.image +')';
  cardTitle.style.backgroundSize = 'contain';
  cardTitle.style.height = '250px';
  cardWrapper.appendChild(cardTitle);
  var cardTitleTextElement = document.createElement('h2');
  cardTitleTextElement.className = 'mdl-card__title-text';
  cardTitleTextElement.textContent = data.title;
  cardTitle.appendChild(cardTitleTextElement);
  var cardSupportingText = document.createElement('div');
  cardSupportingText.className = 'mdl-card__supporting-text';
  cardSupportingText.textContent = data.location;
  cardSupportingText.style.textAlign = 'center';
  cardWrapper.appendChild(cardSupportingText);
  componentHandler.upgradeElement(cardWrapper);
  sharedMomentsArea.appendChild(cardWrapper);
}



function updateUi(data){
  for(let i =0 ; i<data.length;i++){
    createCard(data[i])
  }
}


let url = "https://pro-pwa-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json"


fetch(url)
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    let dataArray=[]
    for(let key in data){
      dataArray.push(data[key])
    }
   updateUi(dataArray)
  });