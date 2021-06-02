//Storage Controller
const StorageCtrl = (function () {
  return {
    storeItem: function (item) {
      let items;
      if (localStorage.getItem('items') === null) {
        items = [];
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        items = JSON.parse(localStorage.getItem('items'));
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
      }
    },

    getItemsFormStorage: function () {
      let items;
      if (localStorage.getItem('items') === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },

    updateItemStorage: function (updatedItem) {
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach(function (item, index) {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },

    deleteItemFromStorage: function (id) {
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach(function (item, index) {
        if (id === item.id) {
          items.splice(index, 1);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },

    clearAllItemsFromStorage: function () {
      localStorage.removeItem('items');
    }
  };
})();

//Item Controller
const ItemCtrl = (function () {
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  const data = {
    // items: [
    //   //   { id: 0, name: 'Stake Dinner', calories: 1000 },
    //   //   { id: 1, name: 'Burger', calories: 600 },
    //   //   { id: 2, name: 'Cookies', calories: 400 }
    // ],
    items: StorageCtrl.getItemsFormStorage(),
    currentItem: null,
    totalCalories: 0
  };

  return {
    logData: function () {
      return data;
    },

    getItems: function () {
      return data.items;
    },

    addItem: function (name, calories) {
      let id, newItem;
      if (data.items.length > 0) {
        id = data.items[data.items.length - 1].id + 1;
      } else {
        id = 0;
      }
      let cal = parseInt(calories);
      newItem = new Item(id, name, cal);
      data.items.push(newItem);
      return newItem;
    },

    getTotalCalories: function () {
      let total = 0;
      data.items.forEach(function (item) {
        total += item.calories;
      });
      data.totalCalories = total;
      return data.totalCalories;
    },

    getItemById: function (id) {
      let found = null;
      data.items.forEach(function (item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },

    setCurrentItem: function (item) {
      data.currentItem = item;
    },

    getCurrentItem: function () {
      return data.currentItem;
    },

    updateItem: function (name, calories) {
      let cal = parseInt(calories);
      let found = null;
      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = cal;
          found = item;
        }
      });
      return found;
    },

    deleteItem: function (id) {
      let ids = data.items.map(function (item) {
        return item.id;
      });
      const index = ids.indexOf(id);
      data.items.splice(index, 1);
    },

    clearAllItems: function () {
      data.items = [];
    }
  };
})();

//UI Controller
const UICtrl = (function () {
  const uiSelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  };

  return {
    populateItemsList: function (items) {
      let html = '';
      items.forEach((item) => {
        html += `<li class="collection-item" id="item-${item.id}">
                 <strong>${item.name} : </strong> <em> ${item.calories} Cal</em>
                 <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
                 </li>`;
      });
      document.querySelector(uiSelectors.itemList).innerHTML = html;
    },

    getSelectors: function () {
      return uiSelectors;
    },

    getItemInput: function () {
      let nameValue = document.querySelector(uiSelectors.itemNameInput).value;
      let caloriesValue = document.querySelector(uiSelectors.itemCaloriesInput).value;
      return { name: nameValue, calories: caloriesValue };
    },

    addListItem: function (item) {
      document.querySelector(uiSelectors.itemList).style.display = 'block';
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      li.innerHTML = `<strong>${item.name} : </strong> <em> ${item.calories} Cal</em>
                 <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
      document.querySelector(uiSelectors.itemList).insertAdjacentElement('beforeend', li);
    },

    clearInput: function () {
      document.querySelector(uiSelectors.itemNameInput).value = '';
      document.querySelector(uiSelectors.itemCaloriesInput).value = '';
    },

    hideList: function () {
      document.querySelector(uiSelectors.itemList).style.display = 'none';
    },

    showTotalCalories: function (calories) {
      document.querySelector(uiSelectors.totalCalories).textContent = calories;
    },

    clearEditState: function () {
      UICtrl.clearInput();
      document.querySelector(uiSelectors.updateBtn).style.display = 'none';
      document.querySelector(uiSelectors.deleteBtn).style.display = 'none';
      document.querySelector(uiSelectors.backBtn).style.display = 'none';
      document.querySelector(uiSelectors.addBtn).style.display = 'inline';
    },

    addItemToForm: function () {
      document.querySelector(uiSelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(uiSelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
    },

    showEditState: function () {
      document.querySelector(uiSelectors.updateBtn).style.display = 'inline';
      document.querySelector(uiSelectors.deleteBtn).style.display = 'inline';
      document.querySelector(uiSelectors.backBtn).style.display = 'inline';
      document.querySelector(uiSelectors.addBtn).style.display = 'none';
    },

    updateListItem: function (item) {
      let listItems = document.querySelectorAll('#item-list li');
      //turn node list to array
      listItems = Array.from(listItems);

      listItems.forEach(function (listItem) {
        const itemId = listItem.getAttribute('id');
        if (itemId === `item-${item.id}`) {
          document.querySelector(
            `#${itemId}`
          ).innerHTML = `<strong>${item.name} : </strong> <em> ${item.calories} Cal</em>
                 <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
        }
      });
    },

    deleteListItem: function (id) {
      const itemId = `#item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();
    },

    clearListItems: function () {
      let listItems = document.querySelector('#item-list li');
      //turn node list to array
      listItems = Array.from(listItems);
      listItems.forEach(function (item) {
        item.remove();
      });
    }
  };
})();

//App Controller
const app = (function (ItemCtrl, StorageCtrl, UICtrl) {
  console.log(ItemCtrl.logData());

  const loadEventListeners = function () {
    const uiSelectors = UICtrl.getSelectors();
    document.querySelector(uiSelectors.addBtn).addEventListener('click', itemAddSubmit);
    //disable submit on enter
    document.addEventListener('keypress', function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });
    document.querySelector(uiSelectors.itemList).addEventListener('click', itemEditClick);
    document.querySelector(uiSelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
    document.querySelector(uiSelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
    document.querySelector(uiSelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
    document.querySelector(uiSelectors.clearBtn).addEventListener('click', clearAllItemsClick);
  };

  const itemAddSubmit = function (e) {
    const input = UICtrl.getItemInput();
    if (input.name !== '' && input.calories !== '') {
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      UICtrl.addListItem(newItem);
      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);
      StorageCtrl.storeItem(newItem);
      UICtrl.clearInput();
    }
    e.preventDefault();
  };

  const itemEditClick = function (e) {
    if (e.target.classList.contains('edit-item')) {
      const listId = e.target.parentNode.parentNode.id;
      const listIdArr = listId.split('-');
      const id = parseInt(listIdArr[1]);
      const itemToEdit = ItemCtrl.getItemById(id);
      ItemCtrl.setCurrentItem(itemToEdit);
      UICtrl.addItemToForm();
      UICtrl.showEditState();
    }
    e.preventDefault();
  };

  const itemUpdateSubmit = function (e) {
    const editInput = UICtrl.getItemInput();
    const updated = ItemCtrl.updateItem(editInput.name, editInput.calories);
    UICtrl.updateListItem(updated);
    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);
    StorageCtrl.updateItemStorage(updated);
    UICtrl.clearEditState();
    e.preventDefault();
  };

  const itemDeleteSubmit = function (e) {
    const currentItem = ItemCtrl.getCurrentItem();
    ItemCtrl.deleteItem(currentItem.id);
    UICtrl.deleteListItem(currentItem.id);
    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);
    ItemCtrl.setCurrentItem(null);
    StorageCtrl.deleteItemFromStorage(currentItem.id);
    UICtrl.clearEditState();
    e.preventDefault();
  };

  const clearAllItemsClick = function () {
    ItemCtrl.clearAllItems();
    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);
    ItemCtrl.setCurrentItem(null);
    UICtrl.clearListItems();
    StorageCtrl.clearAllItemsFromStorage();
    UICtrl.clearEditState();
    UICtrl.hideList();
  };

  // on page load
  return {
    init: function () {
      UICtrl.clearEditState();
      // fetch items
      const items = ItemCtrl.getItems();
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // add UI to page
        UICtrl.populateItemsList(items);
      }
      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);
      loadEventListeners();
    }
  };
})(ItemCtrl, StorageCtrl, UICtrl);

app.init();
