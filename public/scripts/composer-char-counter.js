$(document).ready(function () {
  console.log('DOM is Ready');

const tweet = document.querySelector('#tweetbox');

  function textCounter (event) {
    let counter = document.querySelector('.counter');
    let counterValue = 140 - this.value.length;
    if (counterValue < 0) {
      counter.style.color = 'red';
      counter.innerText = counterValue;
    } else {
      counter.innerText = counterValue;
      counter.style.color = 'black';
    }
  }

  tweet.addEventListener('keyup', textCounter);


});
