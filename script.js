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
      editFunction(container, cancelButton, shop, inputEditShop, rightBlock, date, calendar, cost, inputEditCost, icons, buttonSave, editContainer);
    }

    cancelButton.onclick = () => {
      cancelEdit(container, cancelButton, shop, inputEditShop, rightBlock, date, calendar, cost, inputEditCost, icons, buttonSave, editContainer);
    }

    buttonSave.onclick = () => {
      saveChanges(container, cancelButton, shop, inputEditShop, rightBlock, date, calendar, cost, inputEditCost, icons, buttonSave, index);
    }
  });
}

const removeTask = (collection) => {
  allGoods = allGoods.filter((item, index) => index !== +collection.id);
  render();
}

const saveChanges = (container, cancelButton, shop, inputEditShop, rightBlock, date, calendar, cost, inputEditCost, icons, buttonSave, index) => {
  allGoods[index].where = inputEditShop.value;
  allGoods[index].howMuch = inputEditCost.value;

  let newStr = calendar.value.replace(/-/gi, '.');
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
  date.classList.remove('editDate');
  calendar.classList.add('hide');
  cost.classList.remove('editCost');
  inputEditCost.classList.add('hide');
  inputEditCost.classList.remove('inputEditCost');
  icons.classList.remove('hide');
  buttonSave.classList.add('hide');
  calcFunction();
  render();
}

const editFunction = (container, cancelButton, shop, inputEditShop, rightBlock, date, calendar, cost, inputEditCost, icons, buttonSave, editContainer) => {
  container.classList.add('editContainer');
  container.classList.add('indent');
  cancelButton.classList.remove('hide');
  cancelButton.classList.add('cancelButton'); 
  shop.classList.add('editShop');
  shop.classList.add('hide');
  inputEditShop.classList.remove('hide');
  inputEditShop.classList.add('inputEditShop');
  rightBlock.classList.add('editRightBlock');
  date.classList.add('editDate');
  date.classList.add('hide');
  calendar.classList.remove('hide');
  calendar.classList.add('calendar');
  cost.classList.add('editCost');
  cost.classList.add('hide');
  inputEditCost.classList.remove('hide');
  inputEditCost.classList.add('inputEditCost');
  icons.classList.remove('icons');
  icons.classList.add('hide');
  buttonSave.classList.remove('hide');
  buttonSave.classList.add('saveButton');
  editContainer.classList.remove('hide');
  editContainer.classList.add('for-inputs');
}

const cancelEdit = (container, cancelButton, shop, inputEditShop, rightBlock, date, calendar, cost, inputEditCost, icons, buttonSave, editContainer) => {
  container.classList.remove('editContainer');
  container.classList.remove('indent');
  cancelButton.classList.add('hide');
  shop.classList.remove('editShop');
  shop.classList.remove('hide');
  inputEditShop.classList.remove('inputEditShop');
  inputEditShop.classList.add('hide');
  rightBlock.classList.remove('editRightBlock');
  date.classList.remove('editDate');
  date.classList.remove('hide');
  calendar.classList.add('hide');
  cost.classList.remove('editCost');
  cost.classList.remove('hide');
  inputEditCost.classList.add('hide');
  inputEditCost.classList.remove('inputEditCost');
  icons.classList.remove('hide');
  icons.classList.add('icons');
  buttonSave.classList.add('hide');
  editContainer.classList.remove('for-inputs');
  editContainer.classList.add('hide');
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