const itemList = document.querySelector('#item-list')

const items = itemList.children;

const clearAll = document.querySelector('#clear')



// newItem("watermelon")
// newItem("keri ka pani")
// newItem("Aamrass")
// newItem('randiiiiiiiii')

/* 

<li>
    Apples
    <button class="remove-item btn-link text-red">
    <i class="fa-solid fa-xmark"></i>
    </button>
</li>

*/


// const filter = document.querySelector('.filter')

// const h2 = document.createElement('h2')
// h2.textContent = "hellooo"

// filter.insertAdjacentElement('afterend', h2)

// const ul = document.querySelector('ul')

// const li = document.createElement('li')
// li.textContent = 'lauda lele mera'

// const elem = document.querySelector(`li:nth-child(${1 + 1})`)

// ul.insertBefore(li, elem)

function insertAfter(newEl, existingEl){
    const ul = document.querySelector('ul');

    const li = document.createElement('li')
    li.textContent = `${newEl}`

    const elem = document.querySelector(`li:nth-child(${existingEl + 1})`)

    ul.insertBefore(li, elem)
}

// insertAfter('bullet bike', 2)

// insertAfter('insertAfter', 1)
// insertAfter('chal laudee', 2)
// insertAfter('kya vishay broo', 4)

// function insertAfter(newEl, existingEl) {
//     existingEl.parentElement.insertBefore(newEl, existingEl.nextSibling);
//   }

// const li = document.createElement('li')
// li.textContent = `hthhh`

// const elem = document.querySelector(`li:nth-child(7)`)

// insertAfter(li, elem)
// insertAfter(li, elem)


/*====================
ADD ITEMS TO THE LIST BY CLICKING 'ADD ITEMS'
======================*/

//this is a search field
const addItem = document.querySelector('#item-input')

// this is an add item button
const addItemBtn = document.querySelector('.btn')

// this adds the input to my list
addItemBtn.addEventListener('click', (e)=>{
    // e.preventDefault()
    if (addItem.value !== ''){
        // this newItem function is defined above
        newItem(addItem.value)
    } else {
        alert('Please fill in the form')
    }
    addItem.value = ''
})

function newItem(item) {
    const li = document.createElement('li')

    const text = document.createTextNode(`${item}`)
    
    const btn = createBtn('remove-item btn-link text-red')

    li.appendChild(text)
    li.appendChild(btn)

    itemList.appendChild(li)

    btn.addEventListener('click', () => {
        li.outerHTML = '';
      });
    
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
 CLICK ON CROSS TO REMOVE ITEM
======================*/

//   const crossBtn = document.getElementsByClassName('remove-item')

// console.log(crossBtn)

// for (const item of crossBtn) {
//     item.addEventListener('click', () => {
//       item.parentElement.outerHTML = '';
//     });
//   }

itemList.addEventListener('click', (e) => {
    if(e.target.tagName === 'I'){
        e.target.parentElement.parentElement.remove()
    } else if (e.target.tagName === 'BUTTON'){
        e.target.parentElement.remove()
    }
})


  /*====================
 CLEAR ALL BUTTON
======================*/

clearAll.addEventListener('click', ()=>{
    itemList.innerHTML = ''
})


function onSubmit(e){
    e.preventDefault()
    
    console.log('form submitted')
}


const form = document.querySelector('#item-form')
console.log(form)

form.addEventListener('submit', onSubmit)


// window.addEventListener('click', ()=>{
//     alert('event bubbling')
// })



