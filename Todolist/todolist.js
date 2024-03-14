init()

function init() {
    // DOM Selection
    let form = document.querySelector('#new-item-form');
    let input = document.querySelector('#item-input');

    // Prevents form from auto submitting
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        
        // Prevent blank input
        if (input.value == "") { console.log("Input field is empty"); return }
    
        listItem(input.value)
        
        // Clear input upon successful task addition
        input.value = ""
    })
}

// Add Task
function listItem(task) {
    let listItem = document.createElement('div')
    listItem.classList.add("list-item")
    listItem.innerHTML = task;

    // Display the task
    document.querySelector('#list').appendChild(listItem)

    // Remove the element
    listItem.addEventListener('click', () => {
        list.removeChild(listItem);
    })
}