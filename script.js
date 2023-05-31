const itemList = document.querySelector('#item-list')

const clearAll = document.querySelector('#clear')

const filter = document.querySelector('#filter')

const form = document.querySelector('#item-form')

let isEditMode = false


/*====================
LETS YOU ADD ITEMS IN A CUSTOMIZABLE WAY
======================*/

function insertAfter(newEl, existingEl){
    const ul = document.querySelector('ul');

    const li = document.createElement('li')
    li.textContent = `${newEl}`

    const elem = document.querySelector(`li:nth-child(${existingEl + 1})`)

    ul.insertBefore(li, elem)
}



/*====================
ADD ITEMS TO THE LIST BY CLICKING 'ADD ITEMS'
======================*/

//this is a search field
const addItem = document.querySelector('#item-input')


// this is an add item button
const addItemBtn = document.querySelector('.btn')

// this adds the input to my list
addItemBtn.addEventListener('click', (e)=>{
    e.preventDefault()

    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');

        removeItemFromStorage(itemToEdit.textContent)
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove()
        isEditMode = false
    } else {
        if (checkIfItemExists(addItem.value)){
            alert('That item already exists!')
            return;
        }
    }
    
    if (addItem.value !== ''){
        // this newItem function is defined below
        newItem(addItem.value)
        addItemToStorage(addItem.value)
    } else {
        alert('Please fill in the form')
    }

    
    

    // It empties the search field after you press add item button
    addItem.value = ''

    checkUI()
})

function newItem(item) {
    const li = document.createElement('li')

    const text = document.createTextNode(`${item}`)
    
    const btn = createBtn('remove-item btn-link text-red')

    li.appendChild(text)
    li.appendChild(btn)

    itemList.appendChild(li)

}

function createBtn(classes){
    const btn = document.createElement('button')
    btn.classList = classes;
    btn.appendChild(createIcon('fa-solid fa-xmark'))
    return btn
}

function createIcon(classes){
    const icon = document.createElement('i')
    icon.classList = classes;
    return icon
}

/*====================
    LOCAL STORAGE
======================*/
function addItemToStorage(item){
    const itemsFromStorage = getItemsFromStorage();

    // add new item to array
    itemsFromStorage.push(item);
    
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}


function getItemsFromStorage(){
    let itemsFromStorage;

    if(localStorage.getItem('items') === null){
        itemsFromStorage = []
    } else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    }

    return itemsFromStorage
}

function displayItems(){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => newItem(item))
    checkUI()
}

document.addEventListener('DOMContentLoaded', displayItems)

/*====================
 CLICK ON CROSS TO REMOVE ITEM
======================*/

function onClickItem(e){
    if (e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement)
    } else{
        setItemToEdit(e.target)
    }
}

function checkIfItemExists(item){
    const itemsFromStorage = getItemsFromStorage();

    return itemsFromStorage.includes(item)
}

function setItemToEdit(item){
    isEditMode = true
    console.log('yoyo')
    itemList
    .querySelectorAll('li')
    .forEach((i)=> i.classList.remove('edit-mode'))
    
    item.classList.add('edit-mode');
    addItemBtn.innerHTML = '<i class="fa-solid fa-pen"></i>  Update Item'
    addItemBtn.style.backgroundColor = '#228b22'
    addItem.value = item.textContent
}

function removeItem(e){
    
        if (confirm('Are you sure you want to delete the item ? Press "OK" for Yes')) {
            e.remove();
            //remove item from storage
            removeItemFromStorage(e.textContent)
            checkUI()
        }
}

function removeItemFromStorage(item){
    let itemsFromStorage = getItemsFromStorage();

    // filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    // re-set to localstorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

itemList.addEventListener('click', onClickItem)


  /*====================
 CLEAR ALL BUTTON
======================*/

function clear(){
    if (confirm("Are you sure?")) {
        while(itemList.firstChild){
            itemList.removeChild(itemList.firstChild)
            localStorage.clear()
        }
    }
    // localStorage.removeItem('items')
    checkUI()
}



clearAll.addEventListener('click', clear)

function checkUI(){
    addItem.value = ''
    const items = itemList.querySelectorAll('li');
    if (items.length === 0){
        filter.style.display = 'none'
        clearAll.style.display = 'none'
    } else {
        filter.style.display = 'block'
        clearAll.style.display = 'block'
    }

    addItemBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add item'
    addItemBtn.style.backgroundColor = '#333'

    isEditMode = false
}

checkUI()


  /*====================
    FILTER ITEMS
======================*/

function filterItems(e){
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach((item) =>{
        const itemName = item.innerText.toLowerCase()
        if(itemName.indexOf(text) != -1){
            item.style.display = 'flex'
            console.log(itemName)
        } else{
            item.style.display = 'none'


        }

        
    })
}

filter.addEventListener('input', filterItems)


