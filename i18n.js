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
                lists: 'Listes',
                dataChat: 'Chat',
                account: 'Compte',
                
                // Account Modal
                accountSettings: 'Paramètres du compte',
                language: 'Langue',
                languageDescription: 'Choisissez votre langue préférée pour l\'interface.',
                profile: 'Profil',
                yourName: 'Votre nom',
                partnerName: 'Nom du partenaire',
                preferences: 'Préférences',
                enableNotifications: 'Activer les notifications',
                emailReminders: 'Rappels par email',
                cancel: 'Annuler',
                saveChanges: 'Sauvegarder',
                
                // Custom Item Modal
                editItem: 'Modifier l\'élément',
                itemName: 'Nom de l\'élément',
                url: 'URL (optionnel)',
                photosDocuments: 'Photos/Documents',
                clickToUpload: 'Cliquez pour télécharger des fichiers',
                supportedFormats: 'JPG, PNG, PDF supportés',
                notes: 'Notes',
                saveItem: 'Sauvegarder l\'élément',
                
                // Dashboard
                goodMorning: 'Bonjour !',
                dashboardSubtitle: 'Voici ce qui se passe avec vous et votre partenaire aujourd\'hui.',
                loveNotes: 'Notes d\'amour',
                todaysSchedule: 'Programme d\'aujourd\'hui',
                recentActivity: 'Activité récente',
                urgentTasks: 'Tâches urgentes',
                viewFullCalendar: 'Voir le calendrier complet',
                viewAllTasks: 'Voir toutes les tâches',
                quickActions: 'Actions rapides',
                addExpense: 'Ajouter une dépense',
                addTask: 'Ajouter une tâche',
                addEvent: 'Ajouter un événement',
                groceryList: 'Liste d\'épicerie',
                
                // Expenses
                sharedExpenses: 'Dépenses partagées',
                expensesSubtitle: 'Suivez et gérez vos dépenses communes.',
                youAreOwedOverall: 'On vous doit au total',
                youOwe: 'Vous devez',
                youreOwed: 'On vous doit',
                settleUp: 'Régler',
                requestPayment: 'Demander le paiement',
                addNewExpense: 'Ajouter une nouvelle dépense',
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
                allCategories: 'Toutes les catégories',
                categoryBreakdown: 'Répartition par catégorie',
                selectUser: 'Sélectionner un utilisateur',
                selectCategory: 'Sélectionner une catégorie',
                
                // Recurrence
                recurrence: 'Récurrence',
                oneTime: 'Unique',
                weekly: 'Chaque semaine',
                biweekly: 'Toutes les 2 semaines',
                monthly: 'Chaque mois',
                quarterly: 'Chaque trimestre',
                yearly: 'Chaque année',
                
                // Categories
                foodDining: '🍕 Alimentation',
                transport: '🚗 Transport',
                entertainment: '🎬 Divertissement',
                utilities: '💡 Services publics',
                shopping: '🛍️ Shopping',
                other: '📦 Autre',
                
                // Calendar
                sharedCalendar: 'Calendrier partagé',
                calendarSubtitle: 'Consultez et gérez vos événements ensemble.',
                calendarView: 'Vue du calendrier',
                addNewEvent: 'Ajouter un nouvel événement',
                eventName: 'Nom de l\'événement',
                dateTime: 'Date et heure',
                descriptionOptional: 'Description (optionnelle)',
                participants: 'Participants',
                both: 'Les deux',
                youOnly: 'Vous seulement',
                partnerOnly: 'Partenaire seulement',
                upcomingEvents: 'Événements à venir',
                
                // Lists
                sharedLists: 'Listes partagées',
                listsSubtitle: 'Créez, assignez et suivez vos tâches ensemble.',
                groceryListTab: 'Liste d\'épicerie',
                todoLists: 'Liste de tâches',
                customLists: 'Listes personnalisées',
                addGroceryItem: 'Ajouter un article d\'épicerie',
                item: 'Article',
                addItem: 'Ajouter l\'article',
                shoppingList: 'Liste de courses',
                exportList: 'Exporter la liste',
                addNewTask: 'Ajouter une nouvelle tâche',
                taskDescription: 'Description de la tâche',
                dueDateOptional: 'Date d\'échéance (optionnelle)',
                assignToOptional: 'Assigner à (optionnel)',
                pendingTasks: 'Tâches en attente',
                createNewList: 'Créer une nouvelle liste',
                listName: 'Nom de la liste',
                createList: 'Créer la liste',
                addText: 'Ajouter du texte',
                addLink: 'Ajouter un lien',
                addImage: 'Ajouter une image',
                
                // Data Chat
                chatWithData: 'Discuter avec vos données',
                chatSubtitle: 'Cette fonctionnalité sera bientôt disponible ! Vous pourrez poser des questions sur vos dépenses, tâches et événements.',
                chatExample: 'Bientôt disponible : "Combien avons-nous dépensé en épicerie ce mois-ci ?" ou "Quelles tâches sont en retard ?"',
                
                // Common
                today: 'Aujourd\'hui',
                yesterday: 'Hier',
                thisWeek: 'Cette semaine',
                nextWeek: 'La semaine prochaine',
                tonight: 'Ce soir',
                new: 'Nouveau',
                high: 'Élevé',
                medium: 'Moyen',
                low: 'Bas',
                urgent: 'Urgent',
                dueTomorrow: 'Échéance demain',
                dueIn2Days: 'Échéance dans 2 jours',
                addedJustNow: 'Ajouté à l\'instant',
                assignedToYou: 'Assigné à vous',
                assignedToPartner: 'Assigné au partenaire',
                assignedToBoth: 'Assigné aux deux',
                due: 'Échéance',
                
                // Time
                hoursAgo: 'il y a {0} heures',
                daysAgo: 'il y a {0} jours',
                
                // Placeholders
                placeholderGrocery: 'ex: Lait, Pain, Poitrine de poulet - 2 lbs',
                placeholderTask: 'ex: Acheter l\'épicerie',
                placeholderEvent: 'ex: Dîner romantique',
                placeholderAmount: 'ex: 50,00',
                placeholderDescription: 'ex: Épicerie',
                placeholderListName: 'ex: Plans de week-end, Idées cadeaux, Destinations de rêve',
                additionalDetails: 'Détails supplémentaires...',
                
                // Tasks - Enhanced
                taskTitle: 'Titre de la tâche',
                priority: 'Priorité',
                flag: 'Marqué',
                noFlag: 'Non marqué',
                addTask: 'Ajouter une tâche',
                pendingTasks: 'Tâches en attente'
            },
            en: {
                // Navigation
                dashboard: "Dashboard",
                expenses: "Expenses",
                calendar: "Calendar",
                lists: "Lists",
                dataChat: "Chat",
                account: "Account",
                
                // Account Modal
                accountSettings: 'Account Settings',
                language: 'Language',
                languageDescription: 'Choose your preferred interface language.',
                profile: 'Profile',
                yourName: 'Your name',
                partnerName: 'Partner\'s name',
                preferences: 'Preferences',
                enableNotifications: 'Enable notifications',
                emailReminders: 'Email reminders',
                cancel: 'Cancel',
                saveChanges: 'Save Changes',
                
                // Custom Item Modal
                editItem: 'Edit Item',
                itemName: 'Item Name',
                url: 'URL (optional)',
                photosDocuments: 'Photos/Documents',
                clickToUpload: 'Click to upload files',
                supportedFormats: 'JPG, PNG, PDF supported',
                notes: 'Notes',
                saveItem: 'Save Item',
                
                // Dashboard
                goodMorning: 'Good Morning!',
                dashboardSubtitle: 'Here\'s what\'s happening with you and your partner today.',
                loveNotes: 'Love Notes',
                todaysSchedule: 'Today\'s Schedule',
                recentActivity: 'Recent Activity',
                urgentTasks: 'Urgent Tasks',
                viewFullCalendar: 'View Full Calendar',
                viewAllTasks: 'View All Tasks',
                quickActions: 'Quick Actions',
                addExpense: 'Add Expense',
                addTask: 'Add Task',
                addEvent: 'Add Event',
                groceryList: 'Grocery List',
                
                // Expenses
                sharedExpenses: 'Shared Expenses',
                expensesSubtitle: 'Track and manage your joint spending.',
                youAreOwedOverall: 'You are owed overall',
                youOwe: 'You owe',
                youreOwed: 'You\'re owed',
                settleUp: 'Settle Up',
                requestPayment: 'Request Payment',
                addNewExpense: 'Add New Expense',
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
                allCategories: 'All Categories',
                categoryBreakdown: 'Category Breakdown',
                selectUser: 'Select user',
                selectCategory: 'Select category',
                
                // Recurrence
                recurrence: 'Recurrence',
                oneTime: 'One Time',
                weekly: 'Weekly',
                biweekly: 'Biweekly',
                monthly: 'Monthly',
                quarterly: 'Quarterly',
                yearly: 'Yearly',
                
                // Categories
                foodDining: '🍕 Food & Dining',
                transport: '🚗 Transport',
                entertainment: '🎬 Entertainment',
                utilities: '💡 Utilities',
                shopping: '🛍️ Shopping',
                other: '📦 Other',
                
                // Calendar
                sharedCalendar: 'Shared Calendar',
                calendarSubtitle: 'View and manage your events together.',
                calendarView: 'Calendar View',
                addNewEvent: 'Add New Event',
                eventName: 'Event Name',
                dateTime: 'Date & Time',
                descriptionOptional: 'Description (Optional)',
                participants: 'Participants',
                both: 'Both',
                youOnly: 'You only',
                partnerOnly: 'Partner only',
                upcomingEvents: 'Upcoming Events',
                
                // Lists
                sharedLists: 'Shared Lists',
                listsSubtitle: 'Create, assign, and track your tasks together.',
                groceryListTab: 'Grocery List',
                todoLists: 'To-Do Lists',
                customLists: 'Custom Lists',
                addGroceryItem: 'Add Grocery Item',
                item: 'Item',
                addItem: 'Add Item',
                shoppingList: 'Shopping List',
                exportList: 'Export List',
                addNewTask: 'Add New Task',
                taskDescription: 'Task Description',
                dueDateOptional: 'Due Date (Optional)',
                assignToOptional: 'Assign To (Optional)',
                pendingTasks: 'Pending Tasks',
                createNewList: 'Create New List',
                listName: 'List Name',
                createList: 'Create List',
                addText: 'Add Text',
                addLink: 'Add Link',
                addImage: 'Add Image',
                
                // Data Chat
                chatWithData: 'Chat with Your Data',
                chatSubtitle: 'This feature will be available soon! You\'ll be able to ask questions about your expenses, tasks, and events.',
                chatExample: 'Coming soon: "How much did we spend on groceries this month?" or "What tasks are overdue?"',
                
                // Common
                today: 'Today',
                yesterday: 'Yesterday',
                thisWeek: 'This Week',
                nextWeek: 'Next Week',
                tonight: 'Tonight',
                new: 'New',
                high: 'High',
                medium: 'Medium',
                low: 'Low',
                urgent: 'Urgent',
                duetomorrow: 'Due tomorrow',
                dueIn2Days: 'Due in 2 days',
                addedJustNow: 'Added just now',
                assignedToYou: 'Assigned to You',
                assignedToPartner: 'Assigned to Partner',
                assignedToBoth: 'Assigned to Both',
                due: 'Due',
                
                // Time
                hoursAgo: '{0} hours ago',
                daysAgo: '{0} days ago',
                
                // Placeholders
                placeholderGrocery: 'e.g., Milk, Bread, Chicken breast - 2 lbs',
                placeholderTask: 'e.g., Buy groceries',
                placeholderEvent: 'e.g., Dinner Date',
                placeholderAmount: 'e.g., 50.00',
                placeholderDescription: 'e.g., Groceries',
                placeholderListName: 'e.g., Weekend Plans, Gift Ideas, Dream Destinations',
                additionalDetails: 'Additional details...',
                
                // Tasks - Enhanced
                taskTitle: 'Task Title',
                priority: 'Priority',
                flag: 'Flag',
                noFlag: 'No flag',
                addTask: 'Add Task',
                pendingTasks: 'Pending Tasks'
            }
        };
        
        this.init();
    }
    
    init() {
        // Détecter la langue du navigateur
        const browserLang = navigator.language.substring(0, 2);
        this.currentLanguage = (browserLang === 'en') ? 'en' : 'fr';
        
        // Charger la langue sauvegardée
        const savedLang = localStorage.getItem('ustogether-language');
        if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
            this.currentLanguage = savedLang;
        }
        
        this.updateInterface();
    }
    
    t(key, params = []) {
        let translation = this.translations[this.currentLanguage][key] || key;
        
        // Remplacer les paramètres {0}, {1}, etc.
        if (params.length > 0) {
            params.forEach((param, index) => {
                translation = translation.replace(`{${index}}`, param);
            });
        }
        
        return translation;
    }
    
    setLanguage(lang) {
        if (lang === 'fr' || lang === 'en') {
            this.currentLanguage = lang;
            localStorage.setItem('ustogether-language', lang);
            this.updateInterface();
        }
    }
    
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    updateInterface() {
        // Mettre à jour tous les éléments avec data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.t(key);
        });
        
        // Mettre à jour les placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });
        
        // Mettre à jour le toggle de langue
        this.updateLanguageToggle();
    }
    
    updateLanguageToggle() {
        const toggle = document.getElementById('language-toggle');
        const currentLang = document.getElementById('currentLang');
        const otherLang = document.getElementById('otherLang');
        const languageSwitch = document.getElementById('languageSwitch');
        
        if (toggle) {
            toggle.textContent = this.currentLanguage === 'fr' ? 'FR' : 'EN';
        }
        
        if (currentLang && otherLang) {
            if (this.currentLanguage === 'fr') {
                currentLang.textContent = 'FR';
                otherLang.textContent = 'EN';
            } else {
                currentLang.textContent = 'EN';
                otherLang.textContent = 'FR';
            }
        }
        
        if (languageSwitch) {
            languageSwitch.checked = this.currentLanguage === 'en';
        }
    }
    
    toggleLanguage() {
        const newLang = this.currentLanguage === 'fr' ? 'en' : 'fr';
        this.setLanguage(newLang);
    }
}

// Initialiser le système i18n
window.i18n = new I18n(); 