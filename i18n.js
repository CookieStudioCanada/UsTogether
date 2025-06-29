// Système d'internationalisation pour UsTogether
class I18n {
    constructor() {
        this.currentLanguage = 'fr';
        this.translations = {
            fr: {
                // Navigation
                dashboard: 'Tableau de bord',
                expenses: 'Dépenses',
                calendar: 'Calendrier',
                grocery: 'Épicerie',
                lists: 'Listes',
                account: 'Compte',

                // Modale Compte
                language: 'Langue',
                cancel: 'Annuler',
                deconnexion: 'Déconnexion',
                saveChanges: 'Sauvegarder',
                
                // Modale Élément personnalisé
                editItem: 'Modifier l\'élément',
                itemName: 'Nom de l\'élément',
                photosDocuments: 'Photos/Documents',
                clickToUpload: 'Cliquez pour télécharger des fichiers',
                supportedFormats: 'JPG, PNG, PDF supportés',
                notes: 'Notes',
                saveItem: 'Sauvegarder l\'élément',
                
                // Tableau de bord
                goodMorning: 'Bonjour !',
                dashboardSubtitle: 'Voici ce qui se passe avec vous et votre partenaire aujourd\'hui.',
                upcomingEvents: 'Prochains événements',
                viewFullCalendar: 'Voir le calendrier complet',
                addExpense: 'Ajouter une dépense',
                addTask: 'Ajouter une tâche',
                addEvent: 'Ajouter un événement',
                groceryList: 'Liste d\'épicerie',
                
                // Dépenses
                expensesTitle: 'Dépenses',
                expensesSubtitle: 'Suivez et gérez vos dépenses communes.',
                youAreOwedOverall: 'On vous doit au total',
                settleUp: 'Régler',
                addNewExpense: 'Ajouter une nouvelle dépense',
                addExpenseTitle: 'Ajouter une dépense',
                newExpense: 'Nouvelle dépense',
                expenseDetails: 'Entrez les détails d\'une dépense partagée.',
                description: 'Description',
                amount: 'Montant',
                category: 'Catégorie',
                paidBy: 'Payé par',
                date: 'Date',
                you: 'Vous',
                partner: 'Partenaire',
                recentExpenses: 'Dépenses récentes',
                export: 'Exporter',
                allCategories: 'Catégories',
                categoryBreakdown: 'Répartition par catégorie',
                selectCategory: 'Sélectionner une catégorie',
                
                // Récurrence
                recurrence: 'Récurrence',
                oneTime: 'Unique',
                weekly: 'Chaque semaine',
                biweekly: '2 semaines',
                monthly: 'Chaque mois',
                quarterly: 'Chaque trimestre',
                yearly: 'Chaque année',
                
                // Calendrier
                calendarSubtitle: 'Planifiez et visualisez vos événements communs.',
                calendarView: 'Vue du calendrier',
                addNewEvent: 'Ajouter un nouvel événement',
                addEventTitle: 'Ajouter un événement',
                newEvent: 'Nouvel événement',
                editEventTitle: 'Modifier l\'événement',
                eventName: 'Nom de l\'événement',
                timeOptional: 'Heure (optionnelle)',
                descriptionOptional: 'Description (optionnelle)',
                deleteEvent: 'Supprimer',
                deleteConfirmation: 'Êtes-vous sûr de vouloir supprimer cet événement ? Cette action est irréversible.',
                
                // Listes
                listsSubtitle: 'Créez et gérez vos listes partagées.',
                grocerySubtitle: 'Gérez votre liste de courses partagée.',
                autoDetect: 'Détection automatique',
                item: 'Article',
                addItem: 'Ajouter l\'article',
                addNewItem: 'Ajouter un nouvel article',
                addItemTitle: 'Ajouter un article',
                newItem: 'Nouvel article',
                itemDetails: 'Entrez les détails de l\'article à ajouter à votre liste.',
                shoppingList: 'Liste de courses',
                exportList: 'Exporter la liste',
                createNewList: 'Créer une nouvelle liste',
                listName: 'Nom de la liste',
                createList: 'Créer la liste',
                addText: 'Ajouter du texte',
                addLink: 'Ajouter un lien',
                addImage: 'Ajouter une image',
                
                // Placeholders
                placeholderAmount: 'ex: 50.00',
                placeholderDescription: 'ex: Épicerie',
                placeholderEvent: 'ex: Dîner romantique',
                placeholderItem: 'ex: Lait',
                additionalDetails: 'Détails supplémentaires...',
                placeholderListName: 'ex: Plans de week-end',
                
                // Commun
                email: "Courriel",
                groupId: "ID du Groupe (Les Amoureux)",
                logs: "Logs",
            },
            en: {
                // Navigation
                dashboard: "Dashboard",
                expenses: "Expenses",
                calendar: "Calendar",
                grocery: "Grocery",
                lists: "Lists",
                account: "Account",

                // Account Modal
                language: 'Language',
                cancel: 'Cancel',
                deconnexion: 'Logout',
                saveChanges: 'Save',

                // Custom Item Modal
                editItem: 'Edit Item',
                itemName: 'Item Name',
                photosDocuments: 'Photos/Documents',
                clickToUpload: 'Click to upload files',
                supportedFormats: 'JPG, PNG, PDF supported',
                notes: 'Notes',
                saveItem: 'Save Item',

                // Dashboard
                goodMorning: 'Good Morning!',
                dashboardSubtitle: 'Here\'s what\'s happening with you and your partner today.',
                upcomingEvents: 'Upcoming Events',
                viewFullCalendar: 'View Full Calendar',
                addExpense: 'Add Expense',
                addTask: 'Add Task',
                addEvent: 'Add Event',
                groceryList: 'Grocery List',

                // Expenses
                expensesTitle: 'Expenses',
                expensesSubtitle: 'Track and manage your shared expenses.',
                youAreOwedOverall: 'You are owed overall',
                settleUp: 'Settle Up',
                addNewExpense: 'Add New Expense',
                addExpenseTitle: 'Add Expense',
                newExpense: 'New Expense',
                expenseDetails: 'Enter details for a shared expense.',
                description: 'Description',
                amount: 'Amount',
                category: 'Category',
                paidBy: 'Paid By',
                date: 'Date',
                you: 'You',
                partner: 'Partner',
                recentExpenses: 'Recent Expenses',
                export: 'Export',
                allCategories: 'Categories',
                categoryBreakdown: 'Category Breakdown',
                selectCategory: 'Select category',

                // Recurrence
                recurrence: 'Recurrence',
                oneTime: 'One Time',
                weekly: 'Weekly',
                biweekly: '2 weeks',
                monthly: 'Monthly',
                quarterly: 'Quarterly',
                yearly: 'Yearly',

                // Calendar
                calendarSubtitle: 'Plan and view your shared events.',
                calendarView: 'Calendar View',
                addNewEvent: 'Add New Event',
                addEventTitle: 'Add Event',
                newEvent: 'New Event',
                editEventTitle: 'Edit Event',
                eventName: 'Event Name',
                timeOptional: 'Time (Optional)',
                descriptionOptional: 'Description (Optional)',
                deleteEvent: 'Delete',
                deleteConfirmation: 'Are you sure you want to delete this event? This action cannot be undone.',

                // Lists
                listsSubtitle: 'Create and manage your shared lists.',
                grocerySubtitle: 'Manage your shared shopping list.',
                autoDetect: 'Automatic Detection',
                item: 'Item',
                addItem: 'Add Item',
                addNewItem: 'Add New Item',
                addItemTitle: 'Add Item',
                newItem: 'New Item',
                itemDetails: 'Enter the details of the item to add to your list.',
                shoppingList: 'Shopping List',
                exportList: 'Export List',
                createNewList: 'Create New List',
                listName: 'List Name',
                createList: 'Create List',
                addText: 'Add Text',
                addLink: 'Add Link',
                addImage: 'Add Image',

                // Placeholders
                placeholderAmount: 'e.g., 50.00',
                placeholderDescription: 'e.g., Groceries',
                placeholderEvent: 'e.g., Dinner Date',
                placeholderItem: 'e.g., Milk',
                additionalDetails: 'Additional details...',
                placeholderListName: 'e.g., Weekend Plans, Gift Ideas, Dream Destinations',
                
                // Common
                email: "Email",
                groupId: "Group ID (The Lovers)",
                logs: "Logs",
            }
        };
        
        this.init();
    }
    
    init() {
        const browserLang = navigator.language.substring(0, 2);
        this.currentLanguage = (browserLang === 'en') ? 'en' : 'fr';
        
        const savedLang = localStorage.getItem('ustogether-language');
        if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
            this.currentLanguage = savedLang;
        }
        
        this.updateInterface();
    }
    
    t(key, params = []) {
        let translation = this.translations[this.currentLanguage][key] || key;
        
        if (params.length > 0) {
            params.forEach((param, index) => {
                translation = translation.replace(`{${index}}`, param);
            });
        }
        
        return translation;
    }
    
    setLanguage(lang) {
        if ((lang === 'fr' || lang === 'en') && lang !== this.currentLanguage) {
            this.currentLanguage = lang;
            localStorage.setItem('ustogether-language', lang);
            this.updateInterface();
        }
    }
    
    toggleLanguage() {
        const newLang = this.currentLanguage === 'fr' ? 'en' : 'fr';
        this.setLanguage(newLang);
    }

    updateInterface() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.t(key);
        });
        
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });
        
        document.documentElement.lang = this.currentLanguage;
        this.updateLanguageSelector();
    }

    updateLanguageSelector() {
        const lang = this.currentLanguage;
        const frButton = document.getElementById('lang-fr');
        const enButton = document.getElementById('lang-en');

        if (frButton && enButton) {
            if (lang === 'fr') {
                frButton.classList.add('btn-red');
                frButton.classList.remove('btn-outline-red');
                enButton.classList.add('btn-outline-red');
                enButton.classList.remove('btn-red');
            } else {
                enButton.classList.add('btn-red');
                enButton.classList.remove('btn-outline-red');
                frButton.classList.add('btn-outline-red');
                frButton.classList.remove('btn-red');
            }
        }
    }
}

// Initialiser le système i18n
window.i18n = new I18n(); 