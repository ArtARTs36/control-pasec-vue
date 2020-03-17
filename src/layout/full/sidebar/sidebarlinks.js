	export default [
	{
		url: "/",
		name: "Домашняя страница",
		icon: "home"
	},
	{
		url: "/scores-for-payments",
		name: "Счета",
		icon: 'all_inbox',
		children: [
			{
				url: "/scores-for-payments",
				name: "Список счетов",
				icon: 'all_inbox'
			},
			{
				url: "/scores-for-payments/create",
				name: "Выставить счет",
				icon: 'search'
			}
		]
	},
	{
		url: "/contragents",
		name: "Контрагенты",
		icon: 'face',
		children: [
			{
				url: "/contragents",
				name: "Список контрагентов",
				icon: 'face'
			},
			{
				url: "/contragents/find-in-external-system",
				name: "Найти контрагента",
				icon: 'search'
			}
		]
	},
	{
		url: "/products",
		name: "Товары",
		icon: 'shopping_cart',
		children: [
			{
				url: "/products",
				name: "Список товаров",
				icon: 'shopping_cart'
			},
			{
				url: "/products/create",
				name: "Создать",
				icon: 'note_add'
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
				icon: 'shopping_cart'
			},
			{
				url: "/supplies/create",
				name: "Создать",
				icon: 'note_add'
			}
		]
	},
	{
		url: "/contracts",
		name: "Договоры",
		icon: 'shopping_cart',
		children: [
			{
				url: "/contracts",
				name: "Список",
				icon: 'view_agenda'
			},
			{
				url: "/contracts/create",
				name: "Создать",
				icon: 'note_add'
			}
		]
	},
	{
		url: "",
		name: "Справочники",
		icon: 'shopping_cart',
		children: [
			{
				url: "/vocab/gos-standards",
				name: "ГОСТ",
				icon: 'view_agenda'
			},
			{
				url: "/vocab/banks",
				name: "Банки",
				icon: 'attach_money'
			},
			{
				url: "/vocab/quantities",
				name: "Ед измерения количества",
				icon: 'format_list_numbered'
			},
			{
				url: "/vocab/currencies",
				name: "Курсы валют",
				icon: 'monetization_on'
			},
		]
	},
	{
		url: "",
		name: "Настройки",
		icon: 'shopping_cart',
		children: [
			{
				url: "/settings/variable-definitions",
				name: "Определения переменных",
				icon: 'flag'
			},
		]
	},
]
