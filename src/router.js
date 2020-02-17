import Vue from 'vue'
import Router from 'vue-router'
import ContragentFindInExternalSystem from "./components/Contragent/ContragentFindInExternalSystem";
import ProductList from "./components/Product/ProductList";
import ProductEdit from "./components/Product/ProductEdit";
import SupplyList from "./components/Supply/SupplyList";
import SupplyEdit from "./components/Supply/SupplyEdit";
import ContractList from "./components/Contract/ContractList";
import ContractEdit from "./components/Contract/ContractEdit";
import ScoreForPaymentList from "./components/Product/ScoreForPaymentList";
import ScoreForPaymentEdit from "./components/Product/ScoreForPaymentEdit";
import ScoreForPaymentCreate from "./components/Product/ScoreForPaymentCreate";

Vue.use(Router)

export default new Router({
	routes: [
    {
    // ======================
    // Full Layout
    // ======================
			path: '',
            component: () => import('./layout/full/MainContainer.vue'),
            // ======================
            // Theme routes / pages
            // ======================

            children: [
                {
                    path: '/',
                    redirect: '/starterkit'
                },
                {
                    path: '/starterkit',
                    name: 'Starterkit',
                    index: 1,
                    component: () => import('./views/StarterPage.vue')
                },{
                    path: '/alert',
                    name: 'Alert',
                    index: 2,
                    component: () => import('./views/components/vuesax/alert/alert.vue')
                },{
                    path: '/avatar',
                    name: 'Avatar',
                    index: 3,
                    component: () => import('./views/components/vuesax/avatar/avatar.vue')
                },{
                    path: '/breadcrumb',
                    name: 'Breadcrumb',
                    index: 4,
                    component: () => import('./views/components/vuesax/breadcrumb/breadcrumb.vue')
                },{
                    path: '/buttons',
                    name: 'Buttons',
                    index: 5,
                    component: () => import('./views/components/vuesax/buttons/buttons.vue')
                },{
                    path: '/cards',
                    name: 'Cards',
                    index: 6,
                    component: () => import('./views/components/vuesax/cards/cards.vue')
                },{
                    path: '/checkbox',
                    name: 'Checkbox',
                    index: 7,
                    component: () => import('./views/components/vuesax/checkbox/checkbox.vue')
                },{
                    path: '/collapse',
                    name: 'Collapse',
                    index: 9,
                    component: () => import('./views/components/vuesax/collapse/collapse.vue')
                },{
                    path: '/dialog',
                    name: 'Dialog',
                    index: 10,
                    component: () => import('./views/components/vuesax/dialog/dialog.vue')
                },{
                    path: '/divider',
                    name: 'Divider',
                    index: 11,
                    component: () => import('./views/components/vuesax/divider/divider.vue')
                },{
                    path: '/dropdown',
                    name: 'Dropdown',
                    index: 12,
                    component: () => import('./views/components/vuesax/dropdown/dropdown.vue')
                },{
                    path: '/input',
                    name: 'Input',
                    index: 13,
                    component: () => import('./views/components/vuesax/input/input.vue')
                },{
                    path: '/list',
                    name: 'List',
                    index: 14,
                    component: () => import('./views/components/vuesax/list/list.vue')
                },{
                    path: '/loading',
                    name: 'Loading',
                    index: 15,
                    component: () => import('./views/components/vuesax/loading/loading.vue')
                },{
                    path: '/navbar',
                    name: 'Navbar',
                    index: 16,
                    component: () => import('./views/components/vuesax/navbar/navbar.vue')
                },{
                    path: '/notification',
                    name: 'Notification',
                    index: 17,
                    component: () => import('./views/components/vuesax/notification/notification.vue')
                },{
                    path: '/number-input',
                    name: 'Number input',
                    index: 18,
                    component: () => import('./views/components/vuesax/number-input/number-input.vue')
                },{
                    path: '/pagination',
                    name: 'Pagination',
                    index: 19,
                    component: () => import('./views/components/vuesax/pagination/pagination.vue')
                },{
                    path: '/popup',
                    name: 'Popup',
                    index: 20,
                    component: () => import('./views/components/vuesax/popup/popup.vue')
                },{
                    path: '/progress',
                    name: 'Progress',
                    index: 21,
                    component: () => import('./views/components/vuesax/progress/progress.vue')
                },{
                    path: '/radio',
                    name: 'Radio',
                    index: 22,
                    component: () => import('./views/components/vuesax/radio/radio.vue')
                },{
                    path: '/switch',
                    name: 'Switch',
                    index: 26,
                    component: () => import('./views/components/vuesax/switch/switch.vue')
                },{
                    path: '/tabs',
                    name: 'Tabs',
                    index: 28,
                    component: () => import('./views/components/vuesax/tabs/tabs.vue')
                },{
                    path: '/textarea',
                    name: 'Textarea',
                    index: 29,
                    component: () => import('./views/components/vuesax/textarea/textarea.vue')
                },
                {
                    path: '/contragents',
                    name: 'ContragentList',
                    index: 30,
                    component: () => import('./components/Contragent/ContragentList.vue')
                },
                {
                    path: '/contragents/:id/edit',
                    name: 'ContragentEdit',
                    index: 30,
                    component: () => import('./components/Contragent/ContragentEdit.vue')
                },
                {
                    path: '/contragents/find-in-external-system',
                    name: 'ContragentFindInExternalSystem',
                    component: ContragentFindInExternalSystem
                },
                {
                    path: '/products',
                    name: 'ProductList',
                    component: ProductList
                },
                {
                    path: '/products/create',
                    name: 'ProductCreate',
                    component: ProductEdit
                },
                {
                    path: '/products/:id/edit',
                    name: 'ProductEdit',
                    component: ProductEdit
                },
                {
                    path: '/supplies',
                    name: 'SupplyList',
                    component: SupplyList
                },
                {
                    path: '/supplies/create',
                    name: 'SupplyCreate',
                    component: SupplyEdit
                },
                {
                    path: '/supplies/:id/edit',
                    name: 'SupplyEdit',
                    component: SupplyEdit
                },
                {
                    path: '/contracts',
                    name: 'ContractList',
                    component: ContractList
                },
                {
                    path: '/contracts/:id/edit',
                    name: 'ContractEdit',
                    component: ContractEdit
                },
                {
                    path: '/contracts/create',
                    name: 'ContractCreate',
                    component: ContractEdit
                },
                {
                    path: '/scores-for-payments',
                    name: 'ScoresForPaymentsList',
                    component: ScoreForPaymentList
                },
                {
                    path: '/scores-for-payments/:id/edit',
                    name: 'ScoreForPaymentEdit',
                    component: ScoreForPaymentEdit
                },
                {
                    path: '/scores-for-payments/create',
                    name: 'ScoreForPaymentCreate',
                    component: ScoreForPaymentCreate
                }
            ]
		},
    // Redirect to starterkit page, if no match found
        {
            path: '*',
            redirect: '/starterkit'
        }
	]
})