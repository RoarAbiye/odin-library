const new_book_btn = document.querySelector('[data-open-modal]')
const form_close = document.querySelector('[data-close-modal]')
const modal = document.querySelector('[data-modal]')
const main = document.querySelector('.main')
const form = document.querySelector('form')


let library = [{
  title: 'The Hobbit',
  author: 'J. R. R. Tolkien',
  read: true,
  index: 0
}, {
  title: 'The Lord of the Rings',
  author: 'J. R. R. Tolkien',
  read: true,
  index: 1
},
{
  title: 'The Silmarillion',
  author: 'J. R. R. Tolkien',
  read: false,
  index: 2
},
{
  title: 'Violent Sun',
  author: 'Adrian Tchaikovsky',
  read: false,
  index: 3
}];

function Book(title, author, read, index) {
  this.title = title;
  this.author = author
  this.read = read
  this.index = index;
}

function BookCard(BookObj) {

  let title = document.createElement('h4')
  title.textContent = BookObj.title

  let author = document.createElement('h5')
  author.textContent = BookObj.author

  let read = document.createElement('input')
  read.setAttribute('type', 'checkbox')
  read.addEventListener("change", (event) => {
    BookObj.read = event.target.checked
    updateDisplay(library)
  })
  read.checked = BookObj.read

  let remove_btn = document.createElement('button')
  remove_btn.setAttribute('class', 'remove_btn')
  remove_btn.setAttribute('data-index', BookObj.index)
  remove_btn.textContent = 'Remove'
  remove_btn.addEventListener('click', () => {
    removeBook(remove_btn.dataset.index)
  })

  this.bookCardElm = document.createElement('div')
  this.bookCardElm.setAttribute('class', 'book_card')
  this.bookCardElm.appendChild(title)
  this.bookCardElm.appendChild(author)
  this.bookCardElm.appendChild(read)
  this.bookCardElm.appendChild(remove_btn)  
}

function removeBook(index) {
  library.splice(index, 1);
  for (let i = 0; i < library.length; i++) {
    library[i].index = i
  }
  updateDisplay(library)
}

function addBookToLibrary(title, author, read) {
  library.push(new Book(title, author, read, library.length))
}

function updateDisplay(library) {
  main.innerHTML = ''
  library.forEach((book) => {
    let book_card = new BookCard(book)
    main.appendChild((book_card.bookCardElm))
  })
}

document.addEventListener('load', updateDisplay(library))

new_book_btn.addEventListener('click', () => {
  modal.showModal()
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
  let _title = document.querySelector('.book_title_in').value
  let _author = document.querySelector('.book_author_in').value
  let _read = document.querySelector('.read_in').checked
  modal.close()
  addBookToLibrary(_title, _author, _read)
  updateDisplay(library)
})

form_close.addEventListener("click",
  (event) => {
    event.preventDefault()
    modal.close()
  }
)

