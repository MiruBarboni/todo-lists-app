// const lists = [
// 	{
// 		id: '1',
// 		title: 'Shopping List',
// 		category: 'Education',
// 		color: '#ffd7ba',
// 		todolist: [
// 			{
// 				id: '9',
// 				text: 'milk 200ml',
// 				isChecked: false,
// 			},
// 			{
// 				id: '89',
// 				text: ' 10 apples',
// 				isChecked: true,
// 			},
// 			{
// 				id: '10',
// 				text: 'bread',
// 				isChecked: false,
// 			},
// 			{
// 				id: '11',
// 				text: '2 tomatto souce',
// 				isChecked: false,
// 			},
// 			{
// 				id: '12',
// 				text: 'cucumber',
// 				isChecked: true,
// 			},
// 			{
// 				id: '21',
// 				text: '2 eggs',
// 				isChecked: true,
// 			},
// 			{
// 				id: '90',
// 				text: 'sugar',
// 				isChecked: true,
// 			},
// 		],
// 	},
// 	{
// 		id: '2',
// 		title: 'Buy books',
// 		category: 'Books',
// 		color: '#c9e4ca',
// 		todolist: [
// 			{
// 				id: '13',
// 				text: 'The Forever House',
// 				isChecked: false,
// 			},
// 			{
// 				id: '14',
// 				text: 'My Turn to Make the Tea (Virago Modern Classics)',
// 				isChecked: true,
// 			},
// 		],
// 	},
// 	{
// 		id: '3',
// 		title: 'Games ',
// 		category: 'Education',
// 		color: '#fbf8cc',
// 		todolist: [
// 			{
// 				id: '15',
// 				text: 'pool',
// 				isChecked: false,
// 			},
// 			{
// 				id: '16',
// 				text: 'golf',
// 				isChecked: true,
// 			},
// 			{
// 				id: '17',
// 				text: 'baseball',
// 				isChecked: true,
// 			},
// 			{
// 				id: '18',
// 				text: 'RtS',
// 				isChecked: false,
// 			},
// 			{
// 				id: '19',
// 				text: 'puzzlers',
// 				isChecked: true,
// 			},
// 			{
// 				id: '20',
// 				text: 'multuplayer online battle arena',
// 				isChecked: false,
// 			},
// 			{
// 				id: '23',
// 				text: 'sandbox',
// 				isChecked: false,
// 			},
// 			{
// 				id: '24',
// 				text: 'TPS',
// 				isChecked: false,
// 			},
// 		],
// 	},
// ];
function updateListToLocalStorage() {
	localStorage.setItem('todoList', JSON.stringify(lists));
}
function getListFromLocalStorage() {
	return JSON.parse(localStorage.getItem('todoList')) || [];
}
function clearListFromLocalStorage() {
	localStorage.removeItem('todoList');
}

const lists = getListFromLocalStorage();

const listsContainer = document.querySelector('#lists');

const addListButton = document.querySelector('#addListButton');
const container = document.querySelector('#todoListContainer');
const listTitle = document.querySelector('#title');

const listCategory = document.querySelector('#listCategory');
const optionsContainer = document.querySelector('.options-container');
const optionsList = document.querySelectorAll('.option');

const closeListBtn = document.querySelector('#closeListBtn');

const todosContainer = document.querySelector('#todosContainer');
const checkedContainer = document.querySelector('#checkedTodosContainer');
const totalNrOfcheckedItemsSpan = document.querySelector(
	'#totalNrOfcheckedTodo'
);
const colorOjb = {
	redColor: '#fcd5ce',
	orangeColor: '#ffd7ba',
	yellowColor: '#fbf8cc',
	greenColor: '#c9e4ca',
	blueColor: '#aed9e0',
};
const paletteColor = document.querySelector('#paletteColor');
const colorsMainContainer = document.querySelector('#colorsMainContainer');
const colorsContainer = document.querySelector('#colorsContainer');
const color1 = document.querySelector('#color1');
const color2 = document.querySelector('#color2');
const color3 = document.querySelector('#color3');
const color4 = document.querySelector('#color4');
const color5 = document.querySelector('#color5');

const listMenuBtn = document.querySelector('#listMenuBtn');
const listMenuMainContainer = document.querySelector('#listMenuMainContainer');
const listMenuContainer = document.querySelector('#listMenuContainer');
const deleteListBtn = document.querySelector('#deleteListBtn');
const deleteAllListsBtn = document.querySelector('#deleteAllListsButton');
const copyListBtn = document.querySelector('#copyListBtn');
const messageDisplay = document.querySelector('#messageDisplay');

// use resetElementToContent instead of container.innerHTML = '';
const resetElementToContent = (element, content) => {
	element.innerHTML = content;
};

listCategory.addEventListener('click', () => {
	optionsContainer.classList.toggle('active');
});

optionsList.forEach((o) => {
	o.addEventListener('click', () => {
		listCategory.innerHTML = o.querySelector('label').innerHTML;
		optionsContainer.classList.remove('active');
	});
});

copyListBtn.addEventListener('click', (e) => {
	const copyList = _.cloneDeep(
		lists.find((el) => el.id === currentDisplayedId)
	);

	copyList.title = `Copy of ${copyList.title}`;
	// copyList.id = uuidv4();
	copyList.id = Math.random().toString();
	copyList.todolist.forEach((todo) => {
		todo.id = Math.random().toString();
	});
	lists.push(copyList);

	createList(copyList);

	resetElementToContent(todosContainer, '');
	resetElementToContent(checkedContainer, '');

	addTodoListData(copyList.id);

	displayElementToBlock(messageDisplay);
	messageDisplay.textContent = 'Editing copy';
	setTimeout(() => {
		displayElementToNone(messageDisplay);
	}, 3000);
});

const setTodoItemToBeChecked = (
	inputField,
	containerElement,
	checkedContainer
) => {
	inputField.style.textDecoration = 'line-through';
	displayElementToBlock(checkedContainer);
	displayElementToBlock(totalNrOfcheckedItemsSpan);
	checkedContainer.appendChild(containerElement);
	calculateTotalNrOfcheckedtodos();
};

const setTodoItemToBeUnchecked = (
	inputField,
	containerElement,
	todosContainer
) => {
	inputField.style.textDecoration = 'none';
	todosContainer.appendChild(containerElement);
	calculateTotalNrOfcheckedtodos();
};

const updateTodoContent = (inputField) => {
	const id = inputField.dataset.id;
	const fieldToUpdate = document.querySelector(`.todo-input[data-id='${id}'`);

	if (fieldToUpdate) fieldToUpdate.value = inputField.value;
};

const displayElementToNone = (field) => {
	if (field) field.style.display = 'none';
};
const displayElementToBlock = (field) => {
	if (field) field.style.display = 'block';
};
const displayElementToFlex = (field) => {
	if (field) field.style.display = 'flex';
};

const getChild = (listHtml, childNumber) => {
	if (listHtml && listHtml.children) {
		const field = listHtml.children.item(childNumber);
		return field;
	}
};
const calculateTotalNrOfcheckedtodos = () => {
	const totalNrOfcheckedItemsSpan = document.querySelector(
		'#totalNrOfcheckedTodo'
	);
	const totalCheckedItems = checkedContainer.children.length;
	const checkedSpan = document.querySelector(
		`.checked-items[data-id='${currentDisplayedId}'`
	);

	if (totalCheckedItems > 0) {
		totalNrOfcheckedItemsSpan.textContent = `${totalCheckedItems} ticked items`;

		if (checkedSpan)
			checkedSpan.innerHTML = `${totalCheckedItems} ticked items`;
	} else {
		if (totalCheckedItems === 0) {
			displayElementToNone(checkedContainer);
			displayElementToNone(totalNrOfcheckedItemsSpan);

			if (checkedSpan) checkedSpan.innerHTML = ``;
		}
	}
};
const createTodoItem = (todoElement, containerElement) => {
	const toDoContainer = document.createElement('div');
	const toDoCheckbox = document.createElement('input');
	const toDoCheckmarkSpan = document.createElement('span');
	const toDoInput = document.createElement('input');
	const toDoDeleteBtn = document.createElement('button');
	const todoId = todoElement.id;

	toDoContainer.dataset.id = todoId;
	toDoContainer.classList.add('todo-container');
	containerElement.appendChild(toDoContainer);

	toDoCheckbox.dataset.id = todoId;
	toDoCheckbox.type = 'checkbox';
	toDoCheckbox.classList.add('todo-checkbox');
	toDoContainer.appendChild(toDoCheckbox);

	toDoCheckmarkSpan.classList.add('checkmark');
	toDoContainer.appendChild(toDoCheckmarkSpan);

	toDoInput.dataset.id = todoId;
	toDoInput.classList.add('todo-input');
	toDoContainer.appendChild(toDoInput);

	toDoDeleteBtn.dataset.id = todoId;
	toDoDeleteBtn.textContent = 'X';
	toDoDeleteBtn.classList.add('todo-deleteBtn', 'btn');
	toDoContainer.appendChild(toDoDeleteBtn);

	let list = lists.find((l) => l.todolist.find((t) => t.id === todoId));
	if (list) {
		//lists section
		if (
			containerElement.id !== 'todosContainer' &&
			containerElement.id !== 'checkedTodosContainer'
		) {
			toDoCheckbox.disabled = toDoInput.disabled = true;
			displayElementToNone(toDoDeleteBtn);
		}

		//todoListContainer
		if (
			containerElement.id === 'todosContainer' ||
			containerElement.id === 'checkedTodosContainer'
		) {
			toDoInput.focus();
			toDoInput.addEventListener('keyup', (e) => {
				if (e.key === 'Enter') {
					addItemsHandler(list.id);
				}
			});
			toDoInput.addEventListener('change', (e) => {
				lists
					.find((el) => el.id === list.id)
					.todolist.find((todo) => todo.id === todoId).text = e.target.value;

				updateTodoContent(toDoInput);
			});

			toDoCheckbox.addEventListener('click', (e) => {
				const todoItem = lists
					.find((el) => el.id === list.id)
					.todolist.find((todo) => todo.id === todoId);

				const inputField = e.target.nextElementSibling.nextElementSibling;
				const crtToDoContainer = e.target.parentElement;
				const crtToDoContainerId = toDoContainer.dataset.id;
				const fieldToUpdate = document.querySelector(
					`.todo-container[data-id='${crtToDoContainerId}'`
				);
				const todoContainerToUpdate = document.querySelector(
					`.todos-container[data-id='${list.id}']`
				);

				if (toDoCheckbox.checked) {
					todoItem.isChecked = true;

					setTodoItemToBeChecked(
						inputField,
						crtToDoContainer,
						checkedContainer
					);

					if (fieldToUpdate) todoContainerToUpdate.removeChild(fieldToUpdate);
				} else {
					todoItem.isChecked = false;

					setTodoItemToBeUnchecked(
						inputField,
						crtToDoContainer,
						todosContainer,
						checkedContainer
					);

					createTodoItem(todoItem, todoContainerToUpdate);
				}
				updateListToLocalStorage();
			});

			toDoDeleteBtn.addEventListener('click', (e) => {
				let todoArray = lists.find((el) => el.id === list.id).todolist;
				todoArray.splice(todoArray.indexOf(todoElement), 1);

				//remove todo from todoListContainer
				const parentSection = e.target.parentElement.parentElement;
				const todoElementToRemove = e.target.parentElement;
				parentSection.removeChild(todoElementToRemove);

				//remove todo from lists section -> todos-container only
				const todoContainerToRemove = document.querySelector(
					`.todo-container[data-id='${todoId}']`
				);
				const todosContainer = document.querySelector(
					`.todos-container[data-id='${list.id}']`
				);
				console.log({
					todoContainerToRemove,
					todosContainer,
					todoId,
					listid: list.id,
				});
				if (todosContainer && todoContainerToRemove) {
					todosContainer.removeChild(todoContainerToRemove);
				}

				calculateTotalNrOfcheckedtodos();
				updateListToLocalStorage();
			});
		}
		if (containerElement.id === 'checkedTodosContainer') {
			toDoInput.style.textDecoration = 'line-through';
		}

		toDoInput.value = todoElement.text;
		toDoCheckbox.checked = todoElement.isChecked;
	}
};

const getDataSetId = (list, currentDisplayedId) => {
	const listId = list.id;
	const listsHtml = document.querySelectorAll('.list-item');
	let foundList;

	listsHtml.forEach((listHtml) => {
		if (
			listHtml.dataset.id === currentDisplayedId &&
			listHtml.dataset.id === listId
		) {
			foundList = listHtml;
		}
	});

	return foundList;
};
const setColor = (color, currentDisplayedId) => {
	lists.find((el) => el.id === currentDisplayedId).color = color;
	const containerToUpdate = document.querySelector(
		`.list-item[data-id='${currentDisplayedId}']`
	);
	const titleInputToUpdate = document.querySelector(
		`.title[data-id='${currentDisplayedId}']`
	);
	const categoryInputToUpdate = document.querySelector(
		`.category[data-id ='${currentDisplayedId}']`
	);

	container.style.background = color;
	containerToUpdate.style.background = color;
	titleInputToUpdate.style.background = color;
	categoryInputToUpdate.style.background = color;
};
const displayContent = (container, classNameToAdd, classNameToRemove) => {
	container.classList.add(classNameToAdd);
	container.classList.remove(classNameToRemove);
};

let isEditWindowOpen = false;
const closeToDoListContainer = () => {
	isEditWindowOpen = false;

	displayElementToNone(container);
	displayElementToNone(checkedContainer);
	displayElementToNone(totalNrOfcheckedItemsSpan);

	resetElementToContent(todosContainer, '');
	resetElementToContent(checkedContainer, '');

	optionsContainer.classList.remove('active');
	colorsContainer.classList.remove('openMenuAnimation');
	colorsContainer.classList.remove('closeMenuAnimation');
	listMenuContainer.classList.remove('openMenuAnimation');
	listMenuContainer.classList.remove('closeMenuAnimation');
};

// populate fields with data in todoListContainer and update data if it has changed
const addTodoListData = (id) => {
	currentDisplayedId = id;

	let totalNrOfCheckedItems = 0;
	const list = lists.find((el) => el.id === id);

	if (list) {
		displayElementToBlock(checkedContainer);
		displayElementToBlock(totalNrOfcheckedItemsSpan);
		listTitle.value = list.title;
		listCategory.innerHTML = list.category;

		list.todolist.forEach((todo) => {
			if (!todo.isChecked) {
				createTodoItem(todo, todosContainer);
			} else {
				createTodoItem(todo, checkedContainer);
				totalNrOfCheckedItems++;
			}
		});

		calculateTotalNrOfcheckedtodos();

		listTitle.addEventListener('change', (e) => {
			lists.find((el) => el.id === currentDisplayedId).title = e.target.value;
			const listHtml = getDataSetId(list, currentDisplayedId);
			const fieldToUpdate = getChild(listHtml, 1);
			if (fieldToUpdate) fieldToUpdate.value = e.target.value;
			updateListToLocalStorage();
		});

		// select the target node - should be done separately towords the initial declaration of ListCategory
		let target = document.querySelector('#listCategory');

		let observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				console.log(mutation.type);
			});
		});
		let config = { attributes: true, childList: true, characterData: true };

		observer.observe(listCategory, config);
		observer.disconnect(); // later, you can stop observing\

		listCategory.addEventListener(
			'DOMNodeInserted',
			function (e) {
				lists.find((el) => el.id === currentDisplayedId).category =
					e.target.textContent;
				const listHtml = getDataSetId(list, currentDisplayedId);
				const fieldToUpdate = getChild(listHtml, 2);
				if (fieldToUpdate) fieldToUpdate.value = e.target.textContent;
				updateListToLocalStorage();
			},
			false
		);

		paletteColor.addEventListener('click', (e) => {
			colorsContainer.classList.add('openMenuAnimation');
			colorsContainer.classList.remove('closeMenuAnimation');
			listMenuContainer.classList.remove('openMenuAnimation');
			listMenuContainer.classList.remove('closeMenuAnimation');
			colorsContainer.style.backgroundColor = list.color;
		});

		color1.addEventListener('click', () => {
			setColor(colorOjb.redColor, currentDisplayedId);
			colorsContainer.style.backgroundColor = list.color;
			updateListToLocalStorage();
		});
		color2.addEventListener('click', () => {
			setColor(colorOjb.orangeColor, currentDisplayedId);
			colorsContainer.style.backgroundColor = list.color;
			updateListToLocalStorage();
		});
		color3.addEventListener('click', () => {
			setColor(colorOjb.yellowColor, currentDisplayedId);
			colorsContainer.style.backgroundColor = list.color;
			updateListToLocalStorage();
		});
		color4.addEventListener('click', () => {
			setColor(colorOjb.greenColor, currentDisplayedId);
			colorsContainer.style.backgroundColor = list.color;
			updateListToLocalStorage();
		});
		color5.addEventListener('click', () => {
			setColor(colorOjb.blueColor, currentDisplayedId);
			colorsContainer.style.backgroundColor = list.color;
			updateListToLocalStorage();
		});
		listMenuBtn.addEventListener('click', () => {
			displayContent(listMenuBtn, 'display-none', 'display-flex');
			listMenuContainer.style.backgroundColor = list.color;
			listMenuContainer.classList.add('openMenuAnimation');
			listMenuContainer.classList.remove('closeMenuAnimation');
			colorsContainer.classList.remove('openMenuAnimation');
			colorsContainer.classList.remove('closeMenuAnimation');
		});
		container.addEventListener('click', (e) => {
			if (
				!colorsContainer.contains(e.target) &&
				!colorsMainContainer.contains(e.target)
			) {
				if (colorsContainer.classList.contains('openMenuAnimation')) {
					colorsContainer.classList.add('closeMenuAnimation');
					colorsContainer.classList.remove('openMenuAnimation');
				}
			}
			if (
				!listMenuMainContainer.contains(e.target) &&
				!listMenuContainer.contains(e.target)
			) {
				if (listMenuContainer.classList.contains('openMenuAnimation')) {
					listMenuContainer.classList.add('closeMenuAnimation');
					listMenuContainer.classList.remove('openMenuAnimation');
				}
			}
		});

		closeListBtn.addEventListener('click', () => {
			closeToDoListContainer();
		});
	}
};
const removeList = (identifier) => {
	const listToRemove = lists.findIndex((el, index) => el.id === identifier);
	lists.splice(listToRemove, 1);

	const listToRemoveFromUI = document.querySelector(
		`.list-item[data-id='${identifier}']`
	);
	if (listToRemoveFromUI) listsContainer.removeChild(listToRemoveFromUI);
	updateListToLocalStorage();
};
//create the list in #lists section and populate it with data
const createList = (el) => {
	const listContainer = document.createElement('section');
	const titleInput = document.createElement('input');
	const categoryInput = document.createElement('input');
	const toDoSContainer = document.createElement('div');
	const checkItemsSpan = document.createElement('span');

	listContainer.dataset.id = el.id;
	listContainer.style.background = el.color;
	listContainer.classList.add('list-item');
	listsContainer.appendChild(listContainer);

	titleInput.value = el.title;
	titleInput.dataset.id = el.id;
	titleInput.placeholder = 'Insert a title';
	titleInput.classList.add('title');
	listContainer.appendChild(titleInput);

	categoryInput.value = el.category;
	categoryInput.dataset.id = el.id;
	categoryInput.classList.add('category');
	listContainer.appendChild(categoryInput);

	toDoSContainer.dataset.id = el.id;
	toDoSContainer.classList.add('todos-container');
	listContainer.appendChild(toDoSContainer);

	checkItemsSpan.dataset.id = el.id;
	checkItemsSpan.classList.add('checked-items');
	listContainer.appendChild(checkItemsSpan);

	let totalNrOfCheckedItems = 0;
	el.todolist.forEach((todo) => {
		if (!todo.isChecked) {
			createTodoItem(todo, toDoSContainer);
		} else {
			totalNrOfCheckedItems++;
		}
	});
	if (totalNrOfCheckedItems > 0)
		checkItemsSpan.textContent = `+${totalNrOfCheckedItems} ticked items`;

	const newDeleteListBtn = document.createElement('button');
	newDeleteListBtn.innerHTML =
		'<span class="material-symbols-outlined delete-icon">delete<div class="tooltiptext">Delete List</div></span>';
	newDeleteListBtn.classList.add('btn', 'delete-btn');
	listContainer.insertBefore(newDeleteListBtn, titleInput);
	displayContent(newDeleteListBtn, 'display-none', 'display-flex');

	listContainer.addEventListener('mouseover', (e) => {
		displayContent(newDeleteListBtn, 'display-flex', 'display-none');
	});
	listContainer.addEventListener('mouseleave', (e) => {
		displayContent(newDeleteListBtn, 'display-none', 'display-flex');
	});
	newDeleteListBtn.addEventListener('click', () => {
		removeList(el.id);
	});
	listContainer.addEventListener('click', (e) => {
		if (!e.target.classList.contains('delete-icon')) {
			if (!isEditWindowOpen) {
				isEditWindowOpen = true;
				addTodoListData(e.currentTarget.dataset.id);
				displayElementToFlex(container);
				container.style.background = el.color;
			}
		}
	});

	if (listsContainer) {
		displayContent(deleteAllListsBtn, 'display-block', 'display-none');
	}
};

const addItemsHandler = (id) => {
	// const newTodoId = uuidv4();
	const newTodoId = Math.random().toString();

	const newtodo = {
		id: newTodoId,
		text: '',
		isChecked: false,
	};

	lists.forEach((el) => {
		if (el.id === id) {
			el.todolist.unshift(newtodo);
		}
	});
	createTodoItem(newtodo, todosContainer);

	const listId = lists.find((el) => el.id === id).id;
	const todoContainer = document.querySelector(
		`.todos-container[data-id='${listId}']`
	);

	createTodoItem(newtodo, todoContainer);
	updateListToLocalStorage();
};

const addItemBtn = document.querySelector('#addItemBtn');
let currentDisplayedId;
addItemBtn.addEventListener('click', () => {
	addItemsHandler(currentDisplayedId);
});

addListButton.addEventListener('click', () => {
	// let uuid = uuidv4();
	const uuid = Math.random().toString();
	const newList = {
		id: uuid,
		title: '',
		category: 'Select a category',
		color: '#ead2ac',
		todolist: [],
	};
	//added in list vector
	lists.push(newList);

	createList(newList);
	addTodoListData(uuid);
});

lists.forEach((el) => {
	createList(el);
});

// Search Part
const searchInput = document.querySelector('#searchInput');
const deleteSearchedTextBtn = document.querySelector('#deleteSearchedText');

searchInput.addEventListener('keyup', () => {
	const searchedValue = searchInput.value.toLowerCase();
	lists.forEach((list) => {
		const container = document.querySelector(
			`.list-item[data-id='${list.id}']`
		);
		if (
			list.title.toLowerCase().indexOf(searchedValue) === -1 &&
			list.category.toLowerCase().indexOf(searchedValue) === -1 &&
			!findTodo(list, searchedValue)
		) {
			displayElementToNone(container);
		} else {
			displayElementToFlex(container);
		}
	});

	if (searchedValue.length > 0) {
		displayContent(deleteSearchedTextBtn, 'display-block', 'display-none');
	} else {
		displayContent(deleteSearchedTextBtn, 'display-none', 'display-block');
	}
});
deleteSearchedTextBtn.addEventListener('click', () => {
	searchInput.value = '';

	lists.forEach((list) => {
		const container = document.querySelector(
			`.list-item[data-id='${list.id}']`
		);

		displayElementToFlex(container);
	});
	if (searchInput.value > 0) {
		displayContent(deleteSearchedTextBtn, 'display-block', 'display-none');
	} else {
		displayContent(deleteSearchedTextBtn, 'display-none', 'display-block');
	}
});

function findTodo(list, searchedValue) {
	let isFound = false;
	list.todolist.forEach((todo) => {
		if (
			!todo.isChecked &&
			todo.text.toLowerCase().indexOf(searchedValue) > -1
		) {
			isFound = true;
		}
	});
	return isFound;
}

deleteListBtn.addEventListener('click', () => {
	removeList(currentDisplayedId);
	closeToDoListContainer();
	if (listsContainer) {
		displayContent(deleteAllListsBtn, 'display-block', 'display-none');
	}
});

deleteAllListsBtn.addEventListener('click', () => {
	lists.forEach((list) => {
		lists.splice(list);
	});

	const listsToRemoveFromUI = document.querySelectorAll('.list-item');
	listsToRemoveFromUI.forEach((list) => {
		listsContainer.removeChild(list);
	});
	displayContent(deleteAllListsBtn, 'display-none', 'display-block');
	clearListFromLocalStorage();
});
