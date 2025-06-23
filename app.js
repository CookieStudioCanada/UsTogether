// Initialize Quill editor
let quillEditor;

// Auto-detect category based on description
function detectCategory(description) {
    const desc = description.toLowerCase().trim();
    
    // Épicerie patterns
    if (/\b(épicerie|grocery|marché|supermarché|iga|metro|provigo|loblaws|walmart|costco|maxi|nourriture|courses|alimentation|légumes|fruits|viande|pain|lait|œufs|fromage)\b/i.test(desc)) {
        return 'epicerie';
    }
    
    // Restaurant patterns
    if (/\b(restaurant|resto|mcdonald|burger|pizza|sushi|café|bar|dîner|souper|déjeuner|livraison|uber eats|doordash|skip|takeout|fast food)\b/i.test(desc)) {
        return 'restaurants';
    }
    
    // Transport patterns
    if (/\b(essence|gas|station|esso|shell|petro|transport|bus|métro|taxi|uber|bolt|train|avion|parking|stationnement|auto|voiture|réparation auto)\b/i.test(desc)) {
        return 'transport';
    }
    
    // Divertissement patterns
    if (/\b(cinéma|théâtre|concert|netflix|spotify|jeu|game|divertissement|entertainment|sortie|loisir|hobby|livre|film|musique)\b/i.test(desc)) {
        return 'divertissement';
    }
    
    // Dépenses maison patterns
    if (/\b(électricité|hydro|internet|bell|videotron|télé|cable|chauffage|climatisation|rénovation|réparation|outil|canadian tire|home depot|rona|meubles|décoration|nettoyage)\b/i.test(desc)) {
        return 'depenses-maison';
    }
    
    // Prêt maison patterns
    if (/\b(hypothèque|mortgage|prêt|loan|banque|intérêt|capital|payment|versement|crédit)\b/i.test(desc)) {
        return 'pret-maison';
    }
    
    // Default to "autre" if no pattern matches
    return 'autre';
}

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
    
    // Real-time category detection
    const expenseDescField = document.getElementById('expense-description');
    const expenseCategoryField = document.getElementById('expense-category');
    if (expenseDescField && expenseCategoryField) {
        expenseDescField.addEventListener('input', function() {
            const description = this.value;
            // Only auto-detect if category is still empty/unselected
            if (description && !expenseCategoryField.value) {
                const detectedCategory = detectCategory(description);
                // Only set if detection finds a specific category (not 'autre')
                if (detectedCategory && detectedCategory !== 'autre') {
                    expenseCategoryField.value = detectedCategory;
                }
            }
        });
    }
    
    // Generate initial calendar
    generateCalendar(currentMonth, currentYear);
    
    // Initialize i18n system
    if (window.i18n) {
        window.i18n.updateInterface();
    }
    
    // Expense form
    const expenseForm = document.getElementById('expense-form');
    if (expenseForm) {
        expenseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const description = document.getElementById('expense-description').value;
            const amount = document.getElementById('expense-amount').value;
            let category = document.getElementById('expense-category').value;
            const payer = document.getElementById('expense-payer').value;
            const date = document.getElementById('expense-date').value;
            const recurrence = document.getElementById('expense-recurrence').value;
            
            // Auto-detect category if not selected
            if (!category && description) {
                category = detectCategory(description);
            }
            
            // Category is no longer required - will default to 'autre' if not detected
            if (description && amount && payer && date) {
                addExpenseToList(description, amount, category || 'autre', payer, date, recurrence);
                this.reset();
                // Reset today's date
                const today = new Date().toISOString().split('T')[0];
                document.getElementById('expense-date').value = today;
            }
        });
    }

    // Grocery form
    const groceryForm = document.getElementById('grocery-form');
    if (groceryForm) {
        groceryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const item = document.getElementById('grocery-item').value;
            const category = document.getElementById('grocery-category').value;
            
            if (item) {
                addGroceryItem(item, category);
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
            const date = document.getElementById('event-date').value;
            const time = document.getElementById('event-time').value;
            const description = document.getElementById('event-description').value;

            if (name && date) {
                const datetime = time ? `${date}T${time}` : `${date}T00:00`;
                addEventToList(name, datetime, description, !!time);
                
                this.reset();
                
                generateCalendar(currentMonth, currentYear);
                loadExistingEvents();
                loadDashboardEvents();
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

    // Initialize sample events if none exist
    initializeSampleEvents();
    
    // Load existing events into the UI
    loadExistingEvents();
    loadDashboardEvents();
    
    // Initialize calendar with current month
    generateCalendar(currentMonth, currentYear);
    
    // Initialize grocery items
    initializeGroceryItems();
    
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
    
    // Get stored events
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    
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
        
        // Check if this day has any events
        const hasEvent = events.some(event => {
            const eventDate = new Date(event.datetime);
            return eventDate.getFullYear() === year && 
                   eventDate.getMonth() === month && 
                   eventDate.getDate() === day;
        });
        
        if (hasEvent) {
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

// Initialize sample events with real dates
function initializeSampleEvents() {
    const existingEvents = JSON.parse(localStorage.getItem('events') || '[]');
    
    // Only add sample events if none exist
    if (existingEvents.length === 0) {
        const today = new Date();
        const currentYear = today.getFullYear();
        const sampleEvents = [
            {
                id: Date.now() + 1,
                name: 'Shower à Ced',
                datetime: new Date(currentYear, 5, 28, 14, 0).toISOString().slice(0, 16), // June 28th
                description: 'Fête pour le bébé de Cédric',
                hasTime: true,
                timestamp: new Date().toISOString()
            },
            {
                id: Date.now() + 2,
                name: 'Enterrement vie de jeune garçon',
                datetime: new Date(currentYear, 6, 5, 19, 0).toISOString().slice(0, 16), // July 5th
                description: 'Soirée pour l\'EVG de Marc',
                hasTime: true,
                timestamp: new Date().toISOString()
            },
            {
                id: Date.now() + 3,
                name: 'Fête Blanche chez Michel',
                datetime: new Date(currentYear, 6, 12).toISOString().slice(0, 16), // July 12th
                description: 'Fête Blanche chez Michel',
                hasTime: true,
                timestamp: new Date().toISOString()
            },
            {
                id: Date.now() + 4,
                name: 'Amsterdam',
                datetime: new Date(currentYear, 6, 13).toISOString().slice(0, 10) + 'T00:00', // July 13th
                description: 'Départ pour Amsterdam',
                hasTime: false,
                timestamp: new Date().toISOString()
            }
        ];
        
        // Store sample events
        localStorage.setItem('events', JSON.stringify(sampleEvents));
    }
}

// Load existing events from localStorage and display them
function loadExistingEvents() {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const eventsList = document.getElementById('events-list');
    
    if (eventsList) {
        // Clear existing events in the UI
        eventsList.innerHTML = '';
        
        // Filter for upcoming events and sort them
        const upcomingEvents = events
            .filter(event => new Date(event.datetime) >= new Date())
            .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

        if (upcomingEvents.length === 0) {
            eventsList.innerHTML = '<div class="text-center text-muted p-3">Aucun événement à venir.</div>';
            return;
        }

        upcomingEvents.forEach(event => {
            const eventDate = new Date(event.datetime);
            const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
            const formattedDate = event.hasTime 
                ? eventDate.toLocaleDateString('fr-CA', dateOptions) + ', ' + eventDate.toLocaleTimeString('en-US', {hour: 'numeric', minute:'2-digit', hour12: true})
                : eventDate.toLocaleDateString('fr-CA', dateOptions);

            const eventItem = document.createElement('div');
            eventItem.className = 'event-item';
            eventItem.setAttribute('onclick', `editEvent(${event.id})`);
            
            eventItem.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <strong>${event.name}</strong>
                        <br><small><i class="fas fa-${event.hasTime ? 'clock' : 'calendar-alt'}"></i> ${formattedDate}</small>
                        ${event.description ? `<br><small class="text-muted">${event.description}</small>` : ''}
                    </div>
                </div>
            `;
            eventsList.appendChild(eventItem);
        });
    }
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
    
    // Update active nav link based on viewId
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        // Check if this link's onclick matches the current viewId
        const onclick = link.getAttribute('onclick');
        if (onclick && onclick.includes(`'${viewId}'`)) {
            link.classList.add('active');
        }
    });
    
    // Generate calendar if calendar view is shown
    if (viewId === 'calendar') {
        generateCalendar(currentMonth, currentYear);
    }
    
    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 768) {
        toggleSidebar();
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

function addExpenseToList(description, amount, category, payer, date, recurrence) {
    const expensesList = document.getElementById('expenses-list');
    const newExpense = document.createElement('div');
    newExpense.className = 'expense-item';
    newExpense.setAttribute('data-category', category);
    
    // Store raw data - no translation
    const payerDisplayText = payer === 'you' ? 'Vous' : 'Partenaire';
    const oweAmount = (amount / 2).toFixed(2);
    
    // Fix the payment logic: if YOU paid, then PARTNER owes you
    let debtText;
    if (payer === 'you') {
        debtText = `<small class="text-success">Partenaire doit : $${oweAmount}</small>`;
    } else {
        debtText = `<small class="text-muted">Vous devez : $${oweAmount}</small>`;
    }
    
    // Get category info
    const categoryInfo = getCategoryInfo(category);
    
    // Get recurrence info
    const recurrenceInfo = getRecurrenceInfo(recurrence);
    const recurrenceText = recurrence ? ` • ${recurrenceInfo}` : '';
    
    // Create expense entry with raw data
    const expenseData = {
        id: Date.now(),
        description: description, // Raw description as entered
        amount: parseFloat(amount),
        category: category, // Raw category value
        payer: payer, // Raw payer value
        date: date,
        recurrence: recurrence || null,
        timestamp: new Date().toISOString()
    };
    
    // Store in localStorage for persistence
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    expenses.unshift(expenseData);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    
    newExpense.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <strong>${description}</strong>
                <span class="category-badge category-${category}">${categoryInfo}</span>
                <br><small>Payé par ${payerDisplayText} • Partagé équitablement • ${date}${recurrenceText}</small>
            </div>
            <div class="text-end">
                <div class="fw-bold">$${amount}</div>
                ${debtText}
            </div>
        </div>
    `;
    expensesList.insertBefore(newExpense, expensesList.firstChild);
}

function addGroceryItem(item, selectedCategory = '') {
    // Auto-detect category if none selected
    const category = selectedCategory || detectGroceryCategory(item);
    const itemId = 'grocery' + Date.now();
    
    // Store item in localStorage
    const groceryItems = JSON.parse(localStorage.getItem('groceryItems') || '[]');
    const newItemData = {
        id: itemId,
        name: item,
        category: category,
        completed: false,
        timestamp: new Date().toISOString()
    };
    groceryItems.push(newItemData);
    localStorage.setItem('groceryItems', JSON.stringify(groceryItems));
    
    // Refresh the display
    displayGroceryItems();
}

function displayGroceryItems() {
    const groceryList = document.getElementById('grocery-list');
    const groceryItems = JSON.parse(localStorage.getItem('groceryItems') || '[]');
    
    // Group items by category
    const groupedItems = {};
    const categoryOrder = ['fruits-legumes', 'boulangerie', 'viandes', 'congeles', 'laitiers', 'epicerie', 'autre'];
    
    groceryItems.forEach(item => {
        if (!groupedItems[item.category]) {
            groupedItems[item.category] = [];
        }
        groupedItems[item.category].push(item);
    });
    
    let html = '';
    
    categoryOrder.forEach(category => {
        if (groupedItems[category] && groupedItems[category].length > 0) {
            const categoryInfo = getGroceryCategoryInfo(category);
            html += `
                <div class="grocery-category-section" data-category="${category}">
                    <h6 class="grocery-category-title">${categoryInfo}</h6>
            `;
            
            groupedItems[category].forEach(item => {
                html += `
                    <div class="grocery-item ${item.completed ? 'completed' : ''}" data-category="${category}" data-id="${item.id}">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="${item.id}" ${item.completed ? 'checked' : ''} onchange="toggleGroceryItem('${item.id}')">
                            <label class="form-check-label" for="${item.id}">
                                <strong>${item.name}</strong>
                            </label>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-outline-danger" onclick="removeGroceryItem('${item.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
            });
            
            html += '</div>';
        }
    });
    
    groceryList.innerHTML = html;
}

function toggleGroceryItem(itemId) {
    const groceryItems = JSON.parse(localStorage.getItem('groceryItems') || '[]');
    const itemIndex = groceryItems.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        groceryItems[itemIndex].completed = !groceryItems[itemIndex].completed;
        localStorage.setItem('groceryItems', JSON.stringify(groceryItems));
        displayGroceryItems();
    }
}

function removeGroceryItem(itemId) {
    const groceryItems = JSON.parse(localStorage.getItem('groceryItems') || '[]');
    const filteredItems = groceryItems.filter(item => item.id !== itemId);
    localStorage.setItem('groceryItems', JSON.stringify(filteredItems));
    displayGroceryItems();
}

function addEventToList(name, datetime, description, hasTime = true) {
    const eventsList = document.getElementById('events-list');
    const newEvent = document.createElement('div');
    newEvent.className = 'event-item';
    
    const date = new Date(datetime);
    // Format date with or without time based on hasTime flag
    const formattedDate = hasTime ? 
        date.toLocaleDateString() + ', ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) :
        date.toLocaleDateString();
    
    // Store event in localStorage
    const eventData = {
        id: Date.now(),
        name: name,
        datetime: datetime,
        description: description || '',
        hasTime: hasTime,
        timestamp: new Date().toISOString()
    };
    
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    events.unshift(eventData);
    localStorage.setItem('events', JSON.stringify(events));
    
    newEvent.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <strong>${name}</strong>
                <br><small><i class="fas fa-${hasTime ? 'clock' : 'calendar'}"></i> ${formattedDate}</small>
                ${description ? `<br><small class="text-muted">${description}</small>` : ''}
            </div>
        </div>
    `;
    eventsList.insertBefore(newEvent, eventsList.firstChild);
}

function getCategoryInfo(category) {
    const categories = {
        'epicerie': '🛒 Épicerie',
        'pret-maison': '🏠 Prêt maison',
        'restaurants': '🍽️ Restaurants',
        'transport': '🚗 Transport',
        'divertissement': '🎬 Divertissement',
        'depenses-maison': '🏡 Dépenses maison',
        'autre': '📦 Autre'
    };
    return categories[category] || category;
}

function getGroceryCategoryInfo(category) {
    const categories = {
        'fruits-legumes': '🍎 Fruits/Légumes',
        'boulangerie': '🥖 Boulangerie',
        'viandes': '🥩 Viandes',
        'congeles': '🧊 Congelés',
        'laitiers': '🥛 Laitiers',
        'epicerie': '🛒 Épicerie',
        'autre': '📦 Autre'
    };
    return categories[category] || '📦 Autre';
}

function detectGroceryCategory(item) {
    const itemLower = item.toLowerCase();
    
    // Fruits/Légumes
    if (itemLower.match(/\b(pomme|poire|banane|orange|citron|lime|fraise|raisin|ananas|melon|pastèque|pêche|abricot|kiwi|mangue|avocat|tomate|carotte|pomme de terre|oignon|ail|poivron|courgette|aubergine|brocoli|chou|épinard|laitue|salade|concombre|radis|betterave|navet|champignon|céleri|persil|coriandre|basilic|menthe|légume|fruit|bio|organique)\b/)) {
        return 'fruits-legumes';
    }
    
    // Boulangerie
    if (itemLower.match(/\b(pain|baguette|croissant|brioche|viennoiserie|pâtisserie|gâteau|tarte|muffin|bagel|tortilla|wrap|pita|naan|focaccia|biscuit|cracker|céréale|avoine|granola|müesli|farine|levure|sucre|cassonade|miel|sirop|confiture|nutella|beurre d'arachide)\b/)) {
        return 'boulangerie';
    }
    
    // Viandes
    if (itemLower.match(/\b(bœuf|porc|agneau|veau|poulet|dinde|canard|saumon|thon|morue|crevette|homard|crabe|poisson|viande|steak|côtelette|rôti|jambon|bacon|saucisse|chorizo|pepperoni|salami|prosciutto|pâté|foie gras|escalope|filet|cuisse|aile|poitrine)\b/)) {
        return 'viandes';
    }
    
    // Congelés
    if (itemLower.match(/\b(congelé|surgelé|glace|crème glacée|sorbet|pizza congelée|légumes congelés|fruits congelés|poisson congelé|viande congelée|glaçon|ice cream)\b/)) {
        return 'congeles';
    }
    
    // Laitiers
    if (itemLower.match(/\b(lait|fromage|yaourt|yogourt|crème|beurre|margarine|œuf|oeuf|mozzarella|cheddar|parmesan|feta|brie|camembert|cottage|ricotta|mascarpone|crème fraîche|crème sure|babeurre|kéfir)\b/)) {
        return 'laitiers';
    }
    
    // Épicerie (items généraux d'épicerie)
    if (itemLower.match(/\b(riz|pâtes|nouilles|quinoa|couscous|bulgur|orge|lentille|haricot|pois chiche|conserve|sauce|huile|vinaigre|épice|sel|poivre|thé|café|jus|eau|soda|bière|vin|shampoing|savon|dentifrice|détergent|papier|essuie-tout|mouchoir|sac poubelle|aluminium|pellicule plastique)\b/)) {
        return 'epicerie';
    }
    
    // Default category
    return 'autre';
}

function filterGroceryByCategory(category) {
    const categorySections = document.querySelectorAll('.grocery-category-section');
    
    // Update dropdown button text
    const dropdownButton = document.querySelector('.grocery-filter .dropdown-toggle');
    if (dropdownButton && event && event.target) {
        const selectedText = event.target.textContent;
        dropdownButton.innerHTML = `<i class="fas fa-filter me-1"></i>${selectedText}`;
    }
    
    categorySections.forEach(section => {
        if (category === 'all' || section.getAttribute('data-category') === category) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

function initializeGroceryItems() {
    // Initialize with sample data if no items exist
    const existingItems = JSON.parse(localStorage.getItem('groceryItems') || '[]');
    
    if (existingItems.length === 0) {
        const sampleItems = [
            { id: 'grocery1', name: 'Lait bio - 1 litre', category: 'laitiers', completed: false },
            { id: 'grocery2', name: 'Pain complet', category: 'boulangerie', completed: false },
            { id: 'grocery3', name: 'Pommes de terre - 2 kg', category: 'fruits-legumes', completed: false },
            { id: 'grocery4', name: 'Saumon frais - 400g', category: 'viandes', completed: false },
            { id: 'grocery5', name: 'Œufs - 12 unités', category: 'laitiers', completed: true },
            { id: 'grocery6', name: 'Fromage de chèvre', category: 'laitiers', completed: false },
            { id: 'grocery7', name: 'Bananes', category: 'fruits-legumes', completed: false },
            { id: 'grocery8', name: 'Avocats', category: 'fruits-legumes', completed: false },
            { id: 'grocery9', name: 'Tomates cerises', category: 'fruits-legumes', completed: false },
            { id: 'grocery10', name: 'Épinards frais', category: 'fruits-legumes', completed: false },
            { id: 'grocery11', name: 'Poitrines de poulet', category: 'viandes', completed: false },
            { id: 'grocery12', name: 'Steak de boeuf', category: 'viandes', completed: false },
            { id: 'grocery13', name: 'Baguette tradition', category: 'boulangerie', completed: false },
            { id: 'grocery14', name: 'Croissants x4', category: 'boulangerie', completed: false },
            { id: 'grocery15', name: 'Yogourt grec', category: 'laitiers', completed: false },
            { id: 'grocery16', name: 'Beurre salé', category: 'laitiers', completed: false },
            { id: 'grocery17', name: 'Pizza congelée', category: 'congeles', completed: false },
            { id: 'grocery18', name: 'Crème glacée vanille', category: 'congeles', completed: false },
            { id: 'grocery19', name: 'Pâtes (Spaghetti)', category: 'epicerie', completed: false },
            { id: 'grocery20', name: 'Sauce tomate', category: 'epicerie', completed: false },
            { id: 'grocery21', name: 'Huile d\'olive', category: 'epicerie', completed: false },
            { id: 'grocery22', name: 'Café en grains', category: 'epicerie', completed: false },
            { id: 'grocery23', name: 'Shampoing', category: 'autre', completed: false },
            { id: 'grocery24', name: 'Papier toilette', category: 'autre', completed: false },
            { id: 'grocery25', name: 'Vin rouge', category: 'epicerie', completed: false },
            { id: 'grocery26', name: 'Céréales', category: 'boulangerie', completed: false }
        ];
        
        localStorage.setItem('groceryItems', JSON.stringify(sampleItems));
    }
    
    displayGroceryItems();
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

function showGroceryList() {
    showView('grocery');
}

// Quick action functions (for backward compatibility)
function showAddExpenseForm() {
    showView('expenses');
}

function showAddTaskForm() {
    showView('lists');
}

function showAddEventForm() {
    showView('calendar');
}

function openList(listType) {
    alert(`Opening ${listType} list. This feature will be expanded with full CRUD functionality when connected to Firebase.`);
}

// Task item completion handling
document.addEventListener('change', function(e) {
    if (e.target.type === 'checkbox' && e.target.closest('.task-item')) {
        const taskItem = e.target.closest('.task-item');
        if (e.target.checked) {
            taskItem.style.opacity = '0.6';
            taskItem.style.textDecoration = 'line-through';
            setTimeout(() => {
                taskItem.remove();
            }, 1000);
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

// Post-it editing functionality
function editPostIt(postItElement) {
    const contentElement = postItElement.querySelector('.post-it-content');
    const editHint = postItElement.querySelector('.post-it-edit-hint');
    
    if (contentElement.contentEditable === 'false') {
        // Start editing
        contentElement.contentEditable = 'true';
        contentElement.focus();
        editHint.innerHTML = '<i class="fas fa-save"></i> Cliquez pour sauvegarder';
        
        // Select all text for easy editing
        const range = document.createRange();
        range.selectNodeContents(contentElement);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        
        // Handle Enter key to save
        contentElement.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                savePostIt(postItElement);
            }
        });
        
        // Handle click outside to save
        document.addEventListener('click', function outsideClickHandler(e) {
            if (!postItElement.contains(e.target)) {
                savePostIt(postItElement);
                document.removeEventListener('click', outsideClickHandler);
            }
        });
    } else {
        savePostIt(postItElement);
    }
}

function savePostIt(postItElement) {
    const contentElement = postItElement.querySelector('.post-it-content');
    const editHint = postItElement.querySelector('.post-it-edit-hint');
    
    contentElement.contentEditable = 'false';
    editHint.innerHTML = '<i class="fas fa-edit"></i> Cliquez pour modifier';
    
    // Save to localStorage - preserve HTML to maintain formatting
    const content = contentElement.innerHTML;
    localStorage.setItem('postItContent', content);
    
    // Remove focus
    contentElement.blur();
}

// Load saved post-it content on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedContent = localStorage.getItem('postItContent');
    if (savedContent) {
        const contentElement = document.querySelector('.post-it-content');
        if (contentElement) {
            contentElement.innerHTML = savedContent;
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

function editEvent(eventId) {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const eventToEdit = events.find(event => event.id === eventId);

    if (eventToEdit) {
        // Populate the modal form
        document.getElementById('edit-event-id').value = eventToEdit.id;
        document.getElementById('edit-event-name').value = eventToEdit.name;
        document.getElementById('edit-event-description').value = eventToEdit.description;

        const eventDate = new Date(eventToEdit.datetime);
        document.getElementById('edit-event-date').value = eventDate.toISOString().split('T')[0];
        
        if (eventToEdit.hasTime) {
            document.getElementById('edit-event-time').value = eventDate.toTimeString().split(' ')[0].substring(0, 5);
        } else {
            document.getElementById('edit-event-time').value = '';
        }

        // Show the modal
        const modal = new bootstrap.Modal(document.getElementById('editEventModal'));
        modal.show();
    }
}

function saveEditedEvent() {
    const eventId = document.getElementById('edit-event-id').value;
    const name = document.getElementById('edit-event-name').value;
    const date = document.getElementById('edit-event-date').value;
    const time = document.getElementById('edit-event-time').value;
    const description = document.getElementById('edit-event-description').value;

    if (eventId && name && date) {
        let events = JSON.parse(localStorage.getItem('events') || '[]');
        const eventIndex = events.findIndex(event => event.id === parseInt(eventId));
        
        if (eventIndex !== -1) {
            const datetime = time ? `${date}T${time}` : `${date}T00:00`;
            events[eventIndex].name = name;
            events[eventIndex].datetime = datetime;
            events[eventIndex].description = description;
            events[eventIndex].hasTime = !!time;
            localStorage.setItem('events', JSON.stringify(events));

            // Close modal and refresh UI
            const modal = bootstrap.Modal.getInstance(document.getElementById('editEventModal'));
            modal.hide();
            
            generateCalendar(currentMonth, currentYear);
            loadExistingEvents();
            loadDashboardEvents();
        }
    }
}

function deleteEvent() {
    const eventId = document.getElementById('edit-event-id').value;
    if (confirm(i18n.t('deleteConfirmation'))) {
        let events = JSON.parse(localStorage.getItem('events') || '[]');
        const filteredEvents = events.filter(event => event.id !== parseInt(eventId));
        localStorage.setItem('events', JSON.stringify(filteredEvents));

        // Close modal and refresh UI
        const modal = bootstrap.Modal.getInstance(document.getElementById('editEventModal'));
        modal.hide();

        generateCalendar(currentMonth, currentYear);
        loadExistingEvents();
        loadDashboardEvents();
    }
}

function loadDashboardEvents() {
    const eventsList = document.getElementById('dashboard-events-list');
    if (!eventsList) return;

    const events = JSON.parse(localStorage.getItem('events') || '[]');
    
    // Filter for upcoming events, sort by date, and take the first 4
    const upcomingEvents = events
        .filter(event => new Date(event.datetime) >= new Date())
        .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
        .slice(0, 4);

    eventsList.innerHTML = ''; // Clear previous content

    if (upcomingEvents.length === 0) {
        eventsList.innerHTML = '<div class="text-center text-muted p-3">Aucun événement à venir.</div>';
        return;
    }

    upcomingEvents.forEach(event => {
        const eventDate = new Date(event.datetime);
        const formattedDate = event.hasTime 
            ? eventDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' }) + ' ' + eventDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            : eventDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

        const eventItem = document.createElement('div');
        eventItem.className = 'mini-event';
        eventItem.setAttribute('onclick', `editEvent(${event.id})`);
        
        eventItem.innerHTML = `
            <strong>${event.name}</strong>
            <br><small>${formattedDate}</small>
        `;
        eventsList.appendChild(eventItem);
    });
} 