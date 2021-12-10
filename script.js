let allGoods = [];
let valueInputWhere = '';
let valueInputMuch = '';
let inputWhere = null;
let inputMuch = null;

window.onload = () => {
  inputWhere = document.querySelector('#where-input');
  inputMuch = document.querySelector('#much-input');
  inputWhere.addEventListener('change', updateInputWhere);
  inputMuch.addEventListener('change', updateInputMuch);
}

const updateInputWhere = (event) => {
  valueInputWhere = event.target.value;
}

const updateInputMuch = (event) => {
  valueInputMuch = event.target.value;
}

const render = (sumParam, dateParam) => {
  const content = document.querySelector('#content-page');
  const sum = document.querySelector('.sum');
  sum.className = 'sum';

  while(sum.firstChild) {
    sum.removeChild(sum.firstChild);
  }
  while(content.firstChild) {
    content.removeChild(content.firstChild);
  }
  const containerSum = document.createElement('div');
  containerSum.className = 'containerSum';
  containerSum.innerText = `Итого: ${sumParam} р.`;
  sum.appendChild(containerSum);
  allGoods.map((item, index) => {
    const container = document.createElement('div');
    container.id = index;
    container.className = 'good-container';

    const {where, howMuch} = item;

    const shop = document.createElement('p');
    shop.innerText = `${index+1}) ${where}`;
    shop.className = 'shop';
    container.appendChild(shop);

    const rightBlock = document.createElement('div');
    rightBlock.className = 'rightBlock';
    container.appendChild(rightBlock);

    const date = document.createElement('p');
    date.innerHTML = dateParam; 
    date.className = 'date';
    rightBlock.appendChild(date);

    const cost = document.createElement('p');
    cost.innerText = `${howMuch} р.`;
    cost.className = 'cost';
    rightBlock.appendChild(cost);

    const icons = document.createElement('div');
    icons.className = 'icons';
    rightBlock.appendChild(icons);

    const editImage = document.createElement('img');
    editImage.src = 'images/pancel.png';
    editImage.className = 'editImage';
    icons.appendChild(editImage);

    const deleteImage = document.createElement('img');
    deleteImage.src = 'images/delete.png';
    deleteImage.className = 'deleteImage';
    icons.appendChild(deleteImage);
    content.appendChild(container);

  })
}

const getDate = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  today = `${dd}.${mm}.${yyyy}`;
  return today;
}

const calcFunction = () => {
  let sum = 0;
  allGoods.forEach(item => {
    sum += +item.howMuch;  
  })
  return sum;
}

const onClickButton = () => {
  allGoods.push({
    where: valueInputWhere,
    howMuch: valueInputMuch
  });

  valueInputWhere = '';
  valueInputMuch = '';
  inputWhere.value = '';
  inputMuch.value = '';
  let sum = calcFunction();
  let today = getDate();
  render(sum, today);
}

document.querySelector('.add-btn').addEventListener('click', onClickButton)