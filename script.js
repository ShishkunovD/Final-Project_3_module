let allGoods = [];
let valueInputWhere = '';
let valueInputMuch = '';
let inputWhere = null;
let inputMuch = null;

window.onload = async () => {
  inputWhere = document.querySelector('#where-input');
  inputMuch = document.querySelector('#much-input');
  inputWhere.addEventListener('change', updateInputWhere);
  inputMuch.addEventListener('change', updateInputMuch);

  const resp = await fetch ('http://localhost:8000/getGoods', {
    method: 'GET'
  });
  const result = await resp.json();
  allGoods = result.data;
  render();
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

    // container for change one input
    const containerEditOnly = document.createElement('div');
    containerEditOnly.className = 'hide';

    const { where, howMuch, day } = item;

    // button for cancel change one value
    const cancelButtonOnly = document.createElement('button');
    cancelButtonOnly.innerText = 'Отмена';
    cancelButtonOnly.className = 'cancel-button-only';
    containerEditOnly.appendChild(cancelButtonOnly);

    // input for change only shop
    const inputEditShopOnly = document.createElement('input');
    inputEditShopOnly.value = where;
    inputEditShopOnly.className = 'hide';
    containerEditOnly.appendChild(inputEditShopOnly);

    // input for change only date
    const calendarOnly = document.createElement('input');
    calendarOnly.type = 'date';
    calendarOnly.value = getDate();
    calendarOnly.className = 'hide';
    containerEditOnly.appendChild(calendarOnly);

    // input for change only cost
    const inputEditCostOnly = document.createElement('input');
    inputEditCostOnly.className = 'hide';
    inputEditCostOnly.value = howMuch;
    containerEditOnly.appendChild(inputEditCostOnly);

    // button for save one change
    const buttonSaveOnly = document.createElement('button');
    buttonSaveOnly.innerText = 'Сохранить';
    buttonSaveOnly.className = 'button-save-only';
    containerEditOnly.appendChild(buttonSaveOnly);

    //

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
    content.appendChild(containerEdit);
    content.appendChild(containerEditOnly);

    const buttonSave = document.createElement('button');
    buttonSave.innerText = 'Сохранить';
    buttonSave.className = 'saveButton';
    containerEdit.appendChild(buttonSave);

    //button for cancel editing one value
    cancelButtonOnly.onclick = () => {
      cancelOnlyEdit(container, containerEdit, containerEditOnly);
    }

    // for change shop using dblclick
    shop.ondblclick = () => {
      hideMainContainer(container, containerEdit, containerEditOnly);
      changedOnlyShop(inputEditShopOnly, calendarOnly, inputEditCostOnly);
    }

    // for change date using dblclick
    date.ondblclick = () => {
      hideMainContainer(container, containerEdit, containerEditOnly);
      changedOnlyDate(calendarOnly, inputEditShopOnly, inputEditCostOnly);
    }

    // for change cost using dbclick
    cost.ondblclick = () => {
      hideMainContainer(container, containerEdit, containerEditOnly);
      changedOnlyCost(inputEditShopOnly, calendarOnly, inputEditCostOnly);
    }

    // for save one value after editing 
    buttonSaveOnly.onclick = () => {
      saveOnly(inputEditShopOnly.value, calendarOnly.value, inputEditCostOnly.value, item._id);
    } 

    deleteImage.onclick = () => {
      removeTask(item._id);
    }

    editImage.onclick = () => {
      editFunction(container, containerEdit);
    }

    cancelButton.onclick = () => {
      cancelEdit(container, containerEdit);
    }

    buttonSave.onclick = () => {
      updateData(inputEditShop.value, inputEditCost.value, calendar, item._id);
      saveChanges(container, containerEdit);
    }
  });
}

const removeTask = async (id) => {
  const resp = await fetch(`http://localhost:8000/deleteGood?id=${id}`, {
    method: 'DELETE'
  });
  const result = await resp.json();
  allGoods = result.data;
  render();
}

const updateData = async (inputEditShop, inputEditCost, calendar, id) => {
  const resp = await fetch(`http://localhost:8000/updateGood?id=${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin' : '*'
    },
    body: JSON.stringify({
      where: inputEditShop,
      howMuch: +inputEditCost,
      day: calendar.value
    })
  })

  const result = await resp.json();
  allGoods = result.data;
  calcFunction();
  render();
}

const saveChanges = (container, containerEdit) => {
  container.classList.remove('indent');
  containerEdit.classList.add('hide');
}

//for hide container and containerEdit and show containerEditOnly
const hideMainContainer = (container, containerEdit, containerEditOnly) => {
  containerEditOnly.classList.remove('hide');
  containerEditOnly.classList.add('container-edit-only');
  container.classList.add('hide');
  containerEdit.classList.add('hide');
}

const cancelOnlyEdit = (container, containerEdit, containerEditOnly) => {
  container.classList.remove('hide');
  containerEdit.classList.add('hide');
  containerEditOnly.classList.add('hide');
  containerEditOnly.classList.remove('container-edit-only');
}

const changedOnlyShop = (inputEditShopOnly, calendarOnly, inputEditCostOnly) => {
  inputEditShopOnly.classList.remove('hide');
  inputEditShopOnly.classList.add('input-shop-only');
  calendarOnly.classList.add('hide');
  inputEditCostOnly.classList.add('hide');
}

const changedOnlyDate = (calendarOnly, inputEditShopOnly, inputEditCostOnly) => {
  calendarOnly.classList.remove('hide');
  calendarOnly.classList.add('calendar-only');
  inputEditShopOnly.classList.add('hide');
  inputEditCostOnly.classList.add('hide');
}

const changedOnlyCost = (inputEditShopOnly, calendarOnly, inputEditCostOnly) => {
  inputEditShopOnly.classList.add('hide');
  calendarOnly.classList.add('hide');
  inputEditCostOnly.classList.remove('hide');
  inputEditCostOnly.classList.add('input-cost-only')
}

const saveOnly = async (inputEditShopOnly, calendarOnly, inputEditCostOnly, id) => {
  const resp = await fetch(`http://localhost:8000/updateGood?id=${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      where: inputEditShopOnly,
      howMuch: +inputEditCostOnly,
      day: calendarOnly
    })
  });
  const result = await resp.json();
  allGoods = result.data;
  calcFunction();
  render();
}

const editFunction = (container, containerEdit) => {
  container.classList.add('editContainer');
  container.classList.add('indent');
  container.classList.add('hide');

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

const onClickButton = async () => {
const resp = await fetch ('http://localhost:8000/createGood', {
    method: 'POST',
    headers: {
      'Content-type' : 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin' : '*'
    },
    body: JSON.stringify({
      where: valueInputWhere,
      howMuch: Number(valueInputMuch),
      day: getDate()
    })
  });
  
  const result = await resp.json();
  allGoods.push(result.data);

  valueInputWhere = '';
  valueInputMuch = '';
  inputWhere.value = '';
  inputMuch.value = '';

  calcFunction();
  getDate();
  render();
}

document.querySelector('.add-btn').addEventListener('click', onClickButton);