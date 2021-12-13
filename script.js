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

    const containerEdit = document.createElement('div');
    containerEdit.className = 'hide';


    const { where, howMuch, day } = item;

    const cancelButton = document.createElement('button');
    cancelButton.innerText = 'Отмена';
    cancelButton.className = 'cancelButton';
    containerEdit.appendChild(cancelButton);

    const shop = document.createElement('p');
    shop.innerText = `${ index + 1 }) ${ where }`;
    shop.className = 'shop';
    container.appendChild(shop);

    const inputEditShop = document.createElement('input');
    inputEditShop.value = where;
    inputEditShop.className = 'inputEditShop';
    containerEdit.appendChild(inputEditShop);

    const rightBlock = document.createElement('div');
    rightBlock.className = 'rightBlock';
    container.appendChild(rightBlock);

    const date = document.createElement('p');
    date.innerHTML = getDatePoint(day); 
    date.className = 'date';
    rightBlock.appendChild(date);

    const calendar = document.createElement('input');
    calendar.type = 'date';
    calendar.className = 'calendar';
    calendar.value = getDate();
    containerEdit.appendChild(calendar);

    const cost = document.createElement('p');
    cost.innerText = `${ howMuch } р.`;
    cost.className = 'cost';
    rightBlock.appendChild(cost);

    const inputEditCost = document.createElement('input');
    inputEditCost.value = howMuch;
    inputEditCost.className = 'inputEditCost';
    containerEdit.appendChild(inputEditCost);

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
    content.appendChild(containerEdit)

    const buttonSave = document.createElement('button');
    buttonSave.innerText = 'Сохранить';
    buttonSave.className = 'saveButton';
    containerEdit.appendChild(buttonSave);

    deleteImage.onclick = () => {
      removeTask(container);
    }

    editImage.onclick = () => {
      editFunction(container, containerEdit);
    }

    cancelButton.onclick = () => {
      cancelEdit(container, containerEdit);
    }

    buttonSave.onclick = () => {
      updateData(inputEditShop, inputEditCost, calendar, index);
      saveChanges(container, containerEdit);
    }
  });
}

const removeTask = (collection) => {
  allGoods = allGoods.filter((item, index) => index !== +collection.id);
  render();
}

const updateData = (inputEditShop, inputEditCost, calendar, index) => {
  allGoods[index].where = inputEditShop.value;
  allGoods[index].howMuch = inputEditCost.value;
  allGoods[index].day = calendar.value;
}

const saveChanges = (container, containerEdit) => {
  container.classList.remove('indent');
  containerEdit.classList.add('hide');
  calcFunction();
  render();
}

const editFunction = (container, containerEdit) => {
  container.classList.add('editContainer');
  container.classList.add('indent');
  container.classList.add('hide')

  containerEdit.classList.remove('hide');
  containerEdit.classList.add('for-inputs');
}

const cancelEdit = (container, containerEdit) => {
  container.classList.remove('editContainer');
  container.classList.remove('hide');
  container.classList.remove('indent');
  containerEdit.classList.remove('for-inputs');
  containerEdit.classList.add('hide');
}

const getDate = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;
  return today;
}

const getDatePoint = (day) => {
  let today = new Date(day);
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