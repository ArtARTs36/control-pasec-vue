	export default [
	{
		url: "/",
		name: "Домашняя страница",
		icon: "home",
	},
	{
		url: "/scores-for-payments",
		name: "Счета",
		icon: 'all_inbox',
		permission: window.SCORE_FOR_PAYMENTS_LIST_VIEW,
		children: [
			{
				url: "/scores-for-payments",
				name: "Список счетов",
				icon: 'all_inbox',
			},
			{
				url: "/scores-for-payments/create",
				name: "Выставить счет",
				icon: 'search',
				permission: window.SCORE_FOR_PAYMENTS_CREATE,
			}
		]
	},
	{
		url: "/employees",
		name: "Сотрудники",
		icon: 'all_inbox',
		permission: window.SCORE_FOR_PAYMENTS_LIST_VIEW,
		children: [
			{
				url: "/employees",
				name: "Список сотрудников",
				icon: 'all_inbox',
			},
			{
				url: "/employees/add",
				name: "Добавить сотрудника",
				icon: 'all_inbox',
			},
			{
				url: "/times",
				name: "Учет времени",
				icon: 'all_inbox',
			},
		]
	},
	{
		url: "/contragents",
		name: "Контрагенты",
		icon: 'face',
		permission: window.CONTRAGENTS_LIST_VIEW,
		children: [
			{
				url: "/contragents",
				name: "Список контрагентов",
				icon: 'face'
			},
			{
				url: "/contragents/find-in-external-system",
				name: "Найти контрагента",
				icon: 'search',
				permission: window.CONTRAGENTS_FIND_EXTERNAL_SYSTEM,
			}
		]
	},
	{
		url: "/products",
		name: "Товары",
		icon: 'shopping_cart',
		permission: window.PRODUCTS_LIST_VIEW,
		children: [
			{
				url: "/products",
				name: "Список товаров",
				icon: 'shopping_cart'
			},
			{
				url: "/products/create",
				name: "Создать",
				icon: 'note_add',
				permission: window.PRODUCTS_CREATE,
			}
		]
	},
	{
		url: "/supplies",
		name: "Поставки",
		icon: 'shopping_cart',
		children: [
			{
				url: "/supplies",
				name: "Список",
				icon: 'shopping_cart',
				permission: window.PERMISSION_SUPPLIES_VIEW,
			},
			{
				url: "/supplies/create",
				name: "Создать",
				icon: 'note_add',
				permission: window.PERMISSION_SUPPLIES_CREATE,
			}
		]
	},
	{
		url: "/contracts",
		name: "Договоры",
		icon: 'shopping_cart',
		permission: window.CONTRACTS_LIST_VIEW,
		children: [
			{
				url: "/contracts",
				name: "Список",
				icon: 'view_agenda'
			},
			{
				url: "/contracts/create",
				name: "Создать",
				icon: 'note_add',
				permission: window.CONTRACTS_CREATE,
			}
		]
	},
	{
		url: "/users",
		name: "Пользователи",
		icon: 'face',
		permission: window.PERMISSION_USERS_LIST_VIEW,
		children: [
			{
				url: "/users",
				name: "Список",
				icon: 'view_agenda'
			},
			{
				url: "/users/create",
				name: "Создать",
				icon: 'note_add',
				permission: window.PERMISSION_USER_CREATE,
			},
			{
				url: "/roles/",
				name: "Справочник ролей",
				icon: 'perm_identity',
				permission: window.PERMISSION_ROLE_LIST_VIEW,
			},
			{
				url: "/permissions/",
				name: "Справочник прав",
				icon: 'perm_identity',
				permission: window.PERMISSION_PERMISSIONS_LIST_VIEW,
			},
			{
				url: "/tech-support/reports/",
				name: "Техническая поддержка",
				icon: 'contact_support',
				permission: window.PERMISSION_TECH_SUPPORT_REPORT_SHOW_LIST,
			}
		]
	},
	{
		url: "/external-news",
		name: "Новости",
		icon: 'shopping_cart',
		permission: window.EXTERNAL_NEWS_LIST_VIEW,
		children: [
			{
				url: "/external-news",
				name: "Список",
				icon: 'view_agenda'
			},
			{
				url: "/external-news-sources",
				name: "Список источников",
				icon: 'view_agenda'
			},
		]
	},
	{
		url: "",
		name: "Справочники",
		icon: 'shopping_cart',
		permission: window.VOCABS_VIEW,
		children: [
			{
				url: "/vocab/gos-standards",
				name: "ГОСТ",
				icon: 'view_agenda',
				permission: window.VOCAB_GOS_STANDARD_LIST_VIEW,
			},
			{
				url: "/vocab/banks",
				name: "Банки",
				icon: 'attach_money',
				permission: window.VOCAB_BANKS_LIST_VIEW,
			},
			{
				url: "/vocab/quantities",
				name: "Ед измерения количества",
				icon: 'format_list_numbered',
				permission: window.VOCAB_QUANTITY_UNITS_LIST_VIEW,
			},
			{
				url: "/vocab/currencies",
				name: "Курсы валют",
				icon: 'monetization_on',
				permission: window.VOCAB_CURRENCIES_LIST_VIEW,
			},
			{
				url: "/vocab/words",
				name: "Словарь",
				icon: 'g_translate',
				permission: window.VOCAB_CURRENCIES_LIST_VIEW,
			},
		]
	},
	{
		url: "",
		name: "Настройки",
		icon: 'shopping_cart',
		permission: window.SETTINGS_VIEW,
		children: [
			{
				url: "/settings/variable-definitions",
				name: "Определения переменных",
				icon: 'flag',
				permission: window.VARIABLE_DEFINITIONS_LIST_VIEW,
			},
		]
	},
]
