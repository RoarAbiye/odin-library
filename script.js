const new_book_btn = document.querySelector('[data-open-modal]')
const form_close = document.querySelector('[data-close-modal]')
const modal = document.querySelector('[data-modal]')
const main = document.querySelector('.main')
const form = document.querySelector('form')


library = [{
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

function Book(title, author, read) {
  this.title = title;
  this.author = author
  this.read = read
}

function removeBook() {
  library.splice(library.indexOf(this), 1);
  for (let i = 0; i < library.length; i++) {
    library[i].index = i
  }
  updateDisplay()
}

function addBookToLibrary(title, author, read) {
  library.push(new Book(title, author, read, library.length + 1))
}

// function addBookToLibrary(title, author, read) {
//   library.push(new Book(title, author, read, library.length + 1))
// }




function BookCard(BookObj) {

  let bookCardElm = document.createElement('div')
  bookCardElm.setAttribute('class', 'book_card')

  let title = document.createElement('h3')
  title.setAttribute('class', 'title')
  title.textContent = BookObj.title

  let author = document.createElement('h4')
  author.setAttribute('class', 'author')
  author.textContent = BookObj.author

  let read = document.createElement('input')
  read.setAttribute('type', 'checkbox')
  read.setAttribute('class', 'read')
  read.checked = BookObj.read
  read.setAttribute('data-index', BookObj.index)

  let remove_btn = document.createElement('button')
  remove_btn.setAttribute('class', 'remove_btn')
  remove_btn.setAttribute('data-index', BookObj.index)
  remove_btn.textContent = 'Remove'

  bookCardElm.appendChild(title)
  bookCardElm.appendChild(author)
  bookCardElm.appendChild(read)
  bookCardElm.appendChild(remove_btn)
  bookCardElm.setAttribute('data-index', library.length + 1)

  return bookCardElm

}


function updateDisplay() {
  main.innerHTML = ''
  library.forEach((book) => {
    main.appendChild((function() { return BookCard(book) }()))
  })

  document.querySelectorAll('.read').forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      library[event.target.dataset.index].read = event.target.checked
      updateDisplay()
    })
  })

  document.querySelectorAll('.remove_btn').forEach((button) => {
    button.addEventListener("click", (event) => {
      library.splice(event.target.dataset.index, 1)
      updateDisplay()
  })
  removeBook()
})

console.table(library)
}



document.addEventListener('load', updateDisplay())

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
  updateDisplay()
})

form_close.addEventListener("click",
  (event) => {
    event.preventDefault()
    modal.close()
  }
)

