// Initialize Quill editor
let quillEditor;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Quill with toolbar at bottom
    quillEditor = new Quill('#quillEditor', {
        theme: 'snow',
        placeholder: 'Tapez vos notes ici... Les liens peuvent être ajoutés directement dans le texte.',
        modules: {
            toolbar: {
                container: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'align': [] }],
                    ['blockquote', 'code-block'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
                    ['link', 'image'],
                    ['clean']
                ]
            }
        }
    });
    
    // Move toolbar to bottom
    const editor = document.querySelector('#quillEditor');
    const toolbar = editor.querySelector('.ql-toolbar');
    if (toolbar) {
        toolbar.style.borderTop = '1px solid #ccc';
        toolbar.style.borderBottom = 'none';
        editor.appendChild(toolbar);
    }
    
    // Set today's date as default for forms
    const today = new Date().toISOString().split('T')[0];
    const expenseDateField = document.getElementById('expense-date');
    if (expenseDateField) {
        expenseDateField.value = today;
    }
    
    // Generate initial calendar
    generateCalendar(currentMonth, currentYear);
    
    // Initialize i18n system
    if (window.i18n) {
        window.i18n.updateInterface();
    }
    
    console.log('UsTogether app initialized!');
});

// Handle file upload for custom items
function handleFileUpload(input) {
    const files = input.files;
    const container = document.getElementById('uploadedPhotos');
    
    for (let file of files) {
        if (file.type.startsWith('image/') || file.type === 'application/pdf') {
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.createElement('div');
                preview.className = 'photo-preview';
                
                if (file.type.startsWith('image/')) {
                    preview.innerHTML = `
                        <img src="${e.target.result}" alt="Preview">
                        <button class="photo-remove" onclick="this.parentElement.remove()">×</button>
                    `;
                } else {
                    preview.innerHTML = `
                        <div class="d-flex align-items-center justify-content-center h-100 bg-light">
                            <i class="fas fa-file-pdf fa-2x text-danger"></i>
                        </div>
                        <button class="photo-remove" onclick="this.parentElement.remove()">×</button>
                    `;
                }
                
                container.appendChild(preview);
            };
            reader.readAsDataURL(file);
        }
    }
}

// Save custom item
function saveCustomItem() {
    const name = document.getElementById('itemName').value;
    const notes = quillEditor.getContents();
    
    if (name) {
        // Here you would save the item data
        console.log('Saving item:', { name, notes });
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('customItemModal'));
        modal.hide();
        
        // Show success message
        alert('Élément sauvegardé avec succès !');
    }
}

// Calendar functionality
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

const daysOfWeek = ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'];

function generateCalendar(month, year) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    let html = '';
    
    // Add day headers
    daysOfWeek.forEach(day => {
        html += `<div class="calendar-day-header">${day}</div>`;
    });
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear = month === 0 ? year - 1 : year;
        const prevMonthDays = new Date(prevYear, prevMonth + 1, 0).getDate();
        const day = prevMonthDays - firstDay + i + 1;
        html += `<div class="calendar-day other-month">${day}</div>`;
    }
    
    // Add days of current month
    for (let day = 1; day <= daysInMonth; day++) {
        let classes = 'calendar-day';
        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
            classes += ' today';
        }
        // Add sample events
        if (day === 15 || day === 22) {
            classes += ' has-event';
        }
        html += `<div class="${classes}">${day}</div>`;
    }
    
    // Fill remaining cells
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (firstDay + daysInMonth);
    for (let day = 1; day <= remainingCells; day++) {
        html += `<div class="calendar-day other-month">${day}</div>`;
    }
    
    const calendarGrid = document.getElementById('calendar-grid');
    const calendarTitle = document.getElementById('calendar-title');
    if (calendarGrid) {
        calendarGrid.innerHTML = html;
    }
    if (calendarTitle) {
        calendarTitle.textContent = `${months[month]} ${year}`;
    }
}

function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
}

// Navigation functionality
function showView(viewId) {
    // Hide all views
    const views = document.querySelectorAll('.view-section');
    views.forEach(view => view.classList.remove('active'));
    
    // Show selected view
    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.add('active');
    }
    
    // Update active nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // Generate calendar if calendar view is shown
    if (viewId === 'calendar') {
        generateCalendar(currentMonth, currentYear);
    }
    
    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }
}

// List tab functionality
function showListTab(tabId) {
    // Hide all tab contents
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected tab
    const targetTab = document.getElementById(tabId + '-tab');
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Update active tab button
    const tabButtons = document.querySelectorAll('.list-tab');
    tabButtons.forEach(button => button.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

// Mobile sidebar toggle
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');
    
    if (sidebar) {
        sidebar.classList.toggle('show');
    }
    if (overlay) {
        overlay.classList.toggle('show');
    }
}

// Form submission handlers
document.addEventListener('DOMContentLoaded', function() {
    // Expense form
    const expenseForm = document.getElementById('expense-form');
    if (expenseForm) {
        expenseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const description = document.getElementById('expense-description').value;
            const amount = document.getElementById('expense-amount').value;
            const category = document.getElementById('expense-category').value;
            const payer = document.getElementById('expense-payer').value;
            const date = document.getElementById('expense-date').value;
            const recurrence = document.getElementById('expense-recurrence').value;
            
            if (description && amount && category && payer && date) {
                addExpenseToList(description, amount, category, payer, date, recurrence);
                this.reset();
                // Reset today's date
                const today = new Date().toISOString().split('T')[0];
                document.getElementById('expense-date').value = today;
            }
        });
    }

    // Task form - simplified without priority, flag, and assignee
    const taskForm = document.getElementById('task-form');
    if (taskForm) {
        taskForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('task-title').value;
            const description = document.getElementById('task-description').value;
            const date = document.getElementById('task-date').value;
            
            if (title) {
                addTaskToList(title, description, date);
                this.reset();
            }
        });
    }

    // Grocery form
    const groceryForm = document.getElementById('grocery-form');
    if (groceryForm) {
        groceryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const item = document.getElementById('grocery-item').value;
            
            if (item) {
                addGroceryItem(item);
                this.reset();
            }
        });
    }

    // Event form
    const eventForm = document.getElementById('event-form');
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('event-name').value;
            const datetime = document.getElementById('event-datetime').value;
            const description = document.getElementById('event-description').value;
            const participants = document.getElementById('event-participants').value;
            
            if (name && datetime) {
                addEventToList(name, datetime, description, participants);
                this.reset();
            }
        });
    }

    // Custom list form
    const customListForm = document.getElementById('custom-list-form');
    if (customListForm) {
        customListForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const listName = document.getElementById('custom-list-name').value;
            
            if (listName) {
                createCustomList(listName);
                this.reset();
            }
        });
    }
});

function addExpenseToList(description, amount, category, payer, date, recurrence) {
    const expensesList = document.getElementById('expenses-list');
    const newExpense = document.createElement('div');
    newExpense.className = 'expense-item';
    newExpense.setAttribute('data-category', category);
    
    const payerText = payer === 'you' ? 'You' : 'Partner';
    const oweAmount = (amount / 2).toFixed(2);
    
    // Get category info
    const categoryInfo = getCategoryInfo(category);
    
    // Get recurrence info
    const recurrenceInfo = getRecurrenceInfo(recurrence);
    const recurrenceText = recurrence ? ` • ${recurrenceInfo}` : '';
    
    newExpense.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <span class="category-badge category-${category}">${categoryInfo}</span>
                <strong>${description}</strong>
                <br><small>Paid by ${payerText} • Split equally • ${date}${recurrenceText}</small>
            </div>
            <div class="text-end">
                <div class="fw-bold">$${amount}</div>
                <small class="text-muted">You owe: $${oweAmount}</small>
            </div>
        </div>
    `;
    expensesList.insertBefore(newExpense, expensesList.firstChild);
}

// Simplified task function without priority, flag, and assignee
function addTaskToList(title, description, date) {
    const todosList = document.getElementById('todos-list');
    const newTask = document.createElement('div');
    const taskId = 'task' + Date.now();
    
    newTask.className = 'task-item';
    
    const dateText = date ? ` • Due: ${date}` : '';
    
    newTask.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <div class="flex-grow-1">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="${taskId}">
                    <label class="form-check-label" for="${taskId}">
                        <strong>${title}</strong>
                        ${description ? `<br><small>${description}</small>` : ''}
                        <br><small class="text-muted">Added just now${dateText}</small>
                    </label>
                </div>
            </div>
        </div>
    `;
    todosList.insertBefore(newTask, todosList.firstChild);
}

function addGroceryItem(item) {
    const groceryList = document.getElementById('grocery-list');
    const newItem = document.createElement('div');
    const itemId = 'grocery' + Date.now();
    
    newItem.className = 'grocery-item';
    
    newItem.innerHTML = `
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="${itemId}">
            <label class="form-check-label" for="${itemId}">
                <strong>${item}</strong>
            </label>
        </div>
        <div>
            <button class="btn btn-sm btn-outline-danger" onclick="removeGroceryItem(this)">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    groceryList.insertBefore(newItem, groceryList.firstChild);
}

function addEventToList(name, datetime, description, participants) {
    const eventsList = document.getElementById('events-list');
    const newEvent = document.createElement('div');
    newEvent.className = 'event-item';
    
    const date = new Date(datetime);
    const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    newEvent.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <strong>${name}</strong>
                <br><small><i class="fas fa-clock"></i> ${formattedDate}</small>
                ${description ? `<br><small class="text-muted">${description}</small>` : ''}
            </div>
            <div>
                <span class="badge bg-primary">New</span>
            </div>
        </div>
    `;
    eventsList.insertBefore(newEvent, eventsList.firstChild);
}

function getCategoryInfo(category) {
    const categories = {
        'food': '🍕 Food',
        'transport': '🚗 Transport',
        'entertainment': '🎬 Entertainment',
        'utilities': '💡 Utilities',
        'shopping': '🛍️ Shopping',
        'other': '📦 Other'
    };
    return categories[category] || category;
}

function getRecurrenceInfo(recurrence) {
    const recurrences = {
        'weekly': 'Chaque semaine',
        'biweekly': 'Toutes les 2 semaines',
        'monthly': 'Chaque mois',
        'quarterly': 'Chaque trimestre',
        'yearly': 'Chaque année'
    };
    return recurrences[recurrence] || '';
}

// Enhanced functions
function settleUp(type) {
    const message = type === 'owe' 
        ? '💸 Fonctionnalité de règlement à implémenter avec intégration de paiement (Venmo, PayPal, etc.)'
        : '💰 Fonctionnalité de demande de paiement à implémenter avec système de notification';
    alert(message);
}

function exportExpenses() {
    alert('📊 Fonctionnalité d\'export à implémenter pour générer des rapports PDF/Excel');
}

function exportGroceryList() {
    alert('📝 Fonctionnalité d\'export de liste d\'épicerie à implémenter pour générer des listes partageables');
}

function filterByCategory() {
    const filter = document.getElementById('category-filter').value;
    const expenses = document.querySelectorAll('.expense-item');
    
    expenses.forEach(expense => {
        if (!filter || expense.getAttribute('data-category') === filter) {
            expense.style.display = 'block';
        } else {
            expense.style.display = 'none';
        }
    });
}

function removeGroceryItem(button) {
    button.closest('.grocery-item').remove();
}

function showGroceryList() {
    showView('lists');
    showListTab('grocery');
}

// Quick action functions (for backward compatibility)
function showAddExpenseForm() {
    showView('expenses');
}

function showAddTaskForm() {
    showView('lists');
    showListTab('todos');
}

function showAddEventForm() {
    showView('calendar');
}

function openList(listType) {
    alert(`Opening ${listType} list. This feature will be expanded with full CRUD functionality when connected to Firebase.`);
}

// Grocery item completion handling
document.addEventListener('change', function(e) {
    if (e.target.type === 'checkbox') {
        if (e.target.closest('.task-item')) {
            const taskItem = e.target.closest('.task-item');
            if (e.target.checked) {
                taskItem.style.opacity = '0.6';
                taskItem.style.textDecoration = 'line-through';
                setTimeout(() => {
                    taskItem.remove();
                }, 1000);
            }
        } else if (e.target.closest('.grocery-item')) {
            const groceryItem = e.target.closest('.grocery-item');
            if (e.target.checked) {
                groceryItem.classList.add('completed');
            } else {
                groceryItem.classList.remove('completed');
            }
        }
    }
});

// Custom Lists Functions
function addCustomItem(listId, type) {
    let content = '';
    let description = '';
    
    if (type === 'text') {
        content = prompt('Enter item name:');
        description = prompt('Enter description (optional):') || '';
    } else if (type === 'link') {
        content = prompt('Enter item name:');
        const url = prompt('Enter URL:');
        description = prompt('Enter description (optional):') || '';
        if (content && url) {
            content = `<a href="${url}" target="_blank" class="text-decoration-none">
                <strong>${content}</strong>
                <i class="fas fa-external-link-alt ms-2 small"></i>
            </a>`;
        }
    } else if (type === 'image') {
        content = prompt('Enter item name:');
        const imageUrl = prompt('Enter image URL:');
        description = prompt('Enter description (optional):') || '';
        if (content && imageUrl) {
            content = `<div>
                <strong>${content}</strong>
                <br><img src="${imageUrl}" alt="${content}" style="max-width: 100px; max-height: 60px; border-radius: 5px; margin-top: 5px;">
            </div>`;
        }
    }
    
    if (content) {
        const list = document.getElementById(listId + '-list');
        const newItem = document.createElement('div');
        newItem.className = 'custom-item';
        
        newItem.innerHTML = `
            <div class="custom-item-content">
                ${content}
                ${description ? `<br><small class="text-muted">${description}</small>` : ''}
            </div>
            <button class="btn btn-sm btn-outline-danger" onclick="removeCustomItem(this)">
                <i class="fas fa-trash"></i>
            </button>
        `;
        list.insertBefore(newItem, list.firstChild);
    }
}

function removeCustomItem(button) {
    button.closest('.custom-item').remove();
}

function createCustomList(name) {
    const container = document.getElementById('custom-lists-container');
    const listId = 'custom-' + Date.now();
    const emoji = getRandomEmoji();
    
    const newList = document.createElement('div');
    newList.className = 'col-lg-6 mb-4';
    
    newList.innerHTML = `
        <div class="card">
            <div class="card-header">
                <span>${emoji} ${name}</span>
                <div class="dropdown">
                    <button class="btn btn-sm btn-outline-light" data-bs-toggle="dropdown">
                        <i class="fas fa-plus"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" onclick="addCustomItem('${listId}', 'text')"><i class="fas fa-text-width me-2"></i>Add Text</a></li>
                        <li><a class="dropdown-item" href="#" onclick="addCustomItem('${listId}', 'link')"><i class="fas fa-link me-2"></i>Add Link</a></li>
                        <li><a class="dropdown-item" href="#" onclick="addCustomItem('${listId}', 'image')"><i class="fas fa-image me-2"></i>Add Image</a></li>
                    </ul>
                </div>
            </div>
            <div class="card-body">
                <div id="${listId}-list" class="custom-list">
                    <!-- Items will be added here -->
                </div>
            </div>
        </div>
    `;
    
    container.appendChild(newList);
}

function getRandomEmoji() {
    const emojis = ['📝', '⭐', '🎯', '💡', '🎉', '🌟', '📚', '🎨', '🚀', '💝', '🎭', '🎪'];
    return emojis[Math.floor(Math.random() * emojis.length)];
}

// Update custom item click handler to open simplified modal
document.addEventListener('click', function(e) {
    if (e.target.closest('.custom-item-content')) {
        const customItem = e.target.closest('.custom-item');
        if (customItem) {
            // Get item data (in a real app, this would come from a database)
            const itemName = customItem.querySelector('strong')?.textContent || '';
            
            // Populate modal
            document.getElementById('itemName').value = itemName;
            
            // Clear previous uploads
            document.getElementById('uploadedPhotos').innerHTML = '';
            
            // Clear and reset Quill editor
            quillEditor.setContents([]);
            
            // Show modal
            const modal = new bootstrap.Modal(document.getElementById('customItemModal'));
            modal.show();
        }
    }
});

// Override i18n toggle to update account view button
document.addEventListener('DOMContentLoaded', function() {
    if (window.i18n && i18n.toggleLanguage) {
        const originalToggle = i18n.toggleLanguage;
        i18n.toggleLanguage = function() {
            originalToggle.call(this);
            // Update any specific UI elements if needed
        };
    }
}); 