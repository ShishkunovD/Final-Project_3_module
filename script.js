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

const calcFunction = () => {
  const sum = allGoods.reduce((accum, item)=> { 
    return accum += Number(item.howMuch);
  }, 0);
  return sum;
}

const render = () => {
  const content = document.querySelector('#content-page');
  const sum = document.querySelector('.sum');
  sum.className = 'sum';

  while (sum.firstChild) {
    sum.removeChild(sum.firstChild);
  }
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
  const containerSum = document.createElement('div');
  containerSum.className = 'containerSum';
  containerSum.innerText = `Итого: ${calcFunction()} р.`;
  sum.appendChild(containerSum);
  allGoods.map((item, index) => {
    const container = document.createElement('div');
    container.id = index;
    container.className = 'good-container';

    const { where, howMuch, day } = item;

    const cancelButton = document.createElement('button');
    cancelButton.innerText = 'Отмена';
    cancelButton.className = 'hide';
    container.appendChild(cancelButton);

    const editContainer = document.createElement('div');
    editContainer.className = 'hide';
    container.appendChild(editContainer);

    const shop = document.createElement('p');
    shop.innerText = `${ index + 1 }) ${ where }`;
    shop.className = 'shop';
    container.appendChild(shop);

    const inputEditShop = document.createElement('input');
    inputEditShop.value = where;
    inputEditShop.className = 'hide';
    editContainer.appendChild(inputEditShop);

    const rightBlock = document.createElement('div');
    rightBlock.className = 'rightBlock';
    container.appendChild(rightBlock);

    const date = document.createElement('p');
    date.innerHTML = getDatePoint(); 
    date.className = 'date';
    rightBlock.appendChild(date);

    const calendar = document.createElement('input');
    calendar.type = 'date';
    calendar.value = getDate();
    calendar.className = 'hide';
    editContainer.appendChild(calendar);

    const cost = document.createElement('p');
    cost.innerText = `${ howMuch } р.`;
    cost.className = 'cost';
    rightBlock.appendChild(cost);

    const inputEditCost = document.createElement('input');
    inputEditCost.value = howMuch;
    inputEditCost.className = 'hide';
    editContainer.appendChild(inputEditCost);

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

    const buttonSave = document.createElement('button');
    buttonSave.innerText = 'Сохранить';
    buttonSave.className = 'hide';
    container.appendChild(buttonSave);

    deleteImage.onclick = () => {
      removeTask(container);
    }

    editImage.onclick = () => {
      editFunction(container, cancelButton, shop, inputEditShop, rightBlock, ...arrayParams);
    }

    cancelButton.onclick = () => {
      cancelEdit(container, cancelButton, shop, inputEditShop, rightBlock, ...arrayParams);
    }

    buttonSave.onclick = () => {
      saveChanges(container, cancelButton, shop, inputEditShop, rightBlock, index, ...arrayButtonSave);
    }

    const arrayParams = [date, calendar, cost, inputEditCost, icons, buttonSave, editContainer];
    const arrayButtonSave = [date, calendar, cost, inputEditCost, icons, buttonSave];
  });
}

const removeTask = (collection) => {
  allGoods = allGoods.filter((item, index) => index !== +collection.id);
  render();
}

const saveChanges = (container, cancelButton, shop, inputEditShop, rightBlock, index, ...arrayButtonSave) => {
  allGoods[index].where = inputEditShop.value;
  allGoods[index].howMuch = arrayButtonSave[3].value;

  let newStr = arrayButtonSave[1].value.replace(/-/gi, '.');
  let newArray = newStr.split('.').reverse();
  let str = '';
  newArray.forEach(item => {
    if(item.length !== 4) {
      str += `${item}.`
    } else {
      str += item;
    }
  })
  
  allGoods[index].day = str;

  container.classList.remove('editContainer');
  container.classList.remove('indent');
  cancelButton.classList.add('hide');
  shop.classList.remove('editShop');
  inputEditShop.classList.remove('inputEditShop');
  inputEditShop.classList.add('hide');
  rightBlock.classList.remove('editRightBlock')
  arrayButtonSave[0].classList.remove('editDate');
  arrayButtonSave[1].classList.add('hide');
  arrayButtonSave[2].classList.remove('editCost');
  arrayButtonSave[3].classList.add('hide');
  arrayButtonSave[3].classList.remove('inputEditCost');
  arrayButtonSave[4].classList.remove('hide');
  arrayButtonSave[5].classList.add('hide');
  calcFunction();
  render();
}

const editFunction = (container, cancelButton, shop, inputEditShop, rightBlock, ...arrayParams) => {
  container.classList.add('editContainer');
  container.classList.add('indent');
  cancelButton.classList.remove('hide');
  cancelButton.classList.add('cancelButton'); 
  shop.classList.add('editShop');
  shop.classList.add('hide');
  inputEditShop.classList.remove('hide');
  inputEditShop.classList.add('inputEditShop');
  rightBlock.classList.add('editRightBlock');
  arrayParams[0].classList.add('editDate');
  arrayParams[0].classList.add('hide');
  arrayParams[1].classList.remove('hide');
  arrayParams[1].classList.add('calendar');
  arrayParams[2].classList.add('editCost');
  arrayParams[2].classList.add('hide');
  arrayParams[3].classList.remove('hide');
  arrayParams[3].classList.add('inputEditCost');
  arrayParams[4].classList.remove('icons');
  arrayParams[4].classList.add('hide');
  arrayParams[5].classList.remove('hide');
  arrayParams[5].classList.add('saveButton');
  arrayParams[6].classList.remove('hide');
  arrayParams[6].classList.add('for-inputs');
}

const cancelEdit = (container, cancelButton, shop, inputEditShop, rightBlock, ...arrayParams) => {
  container.classList.remove('editContainer');
  container.classList.remove('indent');
  cancelButton.classList.add('hide');
  shop.classList.remove('editShop');
  shop.classList.remove('hide');
  inputEditShop.classList.remove('inputEditShop');
  inputEditShop.classList.add('hide');
  rightBlock.classList.remove('editRightBlock');
  arrayParams[0].classList.remove('editDate');
  arrayParams[0].classList.remove('hide');
  arrayParams[1].classList.add('hide');
  arrayParams[2].classList.remove('editCost');
  arrayParams[2].classList.remove('hide');
  arrayParams[3].classList.add('hide');
  arrayParams[3].classList.remove('inputEditCost');
  arrayParams[4].classList.remove('hide');
  arrayParams[4].classList.add('icons');
  arrayParams[5].classList.add('hide');
  arrayParams[6].classList.remove('for-inputs');
  arrayParams[6].classList.add('hide');
}

const getDate = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;
  return today;
}

const getDatePoint = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  todayPoint = `${dd}.${mm}.${yyyy}`;
  return todayPoint;
}

const onClickButton = () => {
  allGoods.push({
    where: valueInputWhere,
    howMuch: valueInputMuch,
    day: getDate()
  });

  valueInputWhere = '';
  valueInputMuch = '';
  inputWhere.value = '';
  inputMuch.value = '';
  calcFunction();
  getDate();
  render();
}

document.querySelector('.add-btn').addEventListener('click', onClickButton);