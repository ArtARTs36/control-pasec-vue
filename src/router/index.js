import Vue from 'vue'
import Router from 'vue-router'
import ContragentFindInExternalSystem from "../components/Contragent/ContragentFindInExternalSystem";
import ProductList from "../components/Product/ProductList";
import ProductEdit from "../components/Product/ProductEdit";
import ScoreForPaymentList from "../components/Product/ScoreForPaymentList";
import ScoreForPaymentEdit from "../components/Product/ScoreForPaymentEdit";
import ScoreForPaymentCreate from "../components/Product/ScoreForPaymentCreate";
import VocabGosStandardList from "../components/Vocab/VocabGosStandardList";
import VocabGosStandardEdit from "../components/Vocab/VocabGosStandardEdit";
import VocabBankList from "../components/Vocab/VocabBankList";
import VocabBankEdit from "../components/Vocab/VocabBankEdit";
import VocabQuantityList from "../components/Vocab/VocabQuantityList";
import VocabQuantityEdit from "../components/Vocab/VocabQuantityEdit";
import VocabCurrencyList from "../components/Vocab/VocabCurrencyList";
import VocabCurrencyEdit from "../components/Vocab/VocabCurrencyEdit";
import beforeEach from './beforeEach';

import { routes as appRoutes } from '../app';
import { routes as authRoutes } from '../app/auth';

Vue.use(Router);

const routes = [
    ...authRoutes,
{
    path: '',
    component: () => import('../layout/full/MainContainer.vue'),

    children: [
        ...appRoutes,
        {
            path: '/',
            name: 'Home',
            index: 1,
            component: () => import('../views/StarterPage.vue'),
            meta: { requiresAuth: true },
        }, {
            path: '/alert',
            name: 'Alert',
            index: 2,
            component: () => import('../views/components/vuesax/alert/alert.vue')
        },{
            path: '/avatar',
            name: 'Avatar',
            index: 3,
            component: () => import('../views/components/vuesax/avatar/avatar.vue')
        },{
            path: '/breadcrumb',
            name: 'Breadcrumb',
            index: 4,
            component: () => import('../views/components/vuesax/breadcrumb/breadcrumb.vue')
        },{
            path: '/buttons',
            name: 'Buttons',
            index: 5,
            component: () => import('../views/components/vuesax/buttons/buttons.vue')
        },{
            path: '/cards',
            name: 'Cards',
            index: 6,
            component: () => import('../views/components/vuesax/cards/cards.vue')
        },{
            path: '/checkbox',
            name: 'Checkbox',
            index: 7,
            component: () => import('../views/components/vuesax/checkbox/checkbox.vue')
        },{
            path: '/collapse',
            name: 'Collapse',
            index: 9,
            component: () => import('../views/components/vuesax/collapse/collapse.vue')
        },{
            path: '/dialog',
            name: 'Dialog',
            index: 10,
            component: () => import('../views/components/vuesax/dialog/dialog.vue')
        },{
            path: '/divider',
            name: 'Divider',
            index: 11,
            component: () => import('../views/components/vuesax/divider/divider.vue')
        },{
            path: '/dropdown',
            name: 'Dropdown',
            index: 12,
            component: () => import('../views/components/vuesax/dropdown/dropdown.vue')
        },{
            path: '/input',
            name: 'Input',
            index: 13,
            component: () => import('../views/components/vuesax/input/input.vue')
        },{
            path: '/list',
            name: 'List',
            index: 14,
            component: () => import('../views/components/vuesax/list/list.vue')
        },{
            path: '/loading',
            name: 'Loading',
            index: 15,
            component: () => import('../views/components/vuesax/loading/loading.vue')
        },{
            path: '/navbar',
            name: 'Navbar',
            index: 16,
            component: () => import('../views/components/vuesax/navbar/navbar.vue')
        },{
            path: '/notification',
            name: 'Notification',
            index: 17,
            component: () => import('../views/components/vuesax/notification/notification.vue')
        },{
            path: '/number-input',
            name: 'Number input',
            index: 18,
            component: () => import('../views/components/vuesax/number-input/number-input.vue')
        },{
            path: '/pagination',
            name: 'Pagination',
            index: 19,
            component: () => import('../views/components/vuesax/pagination/pagination.vue')
        },{
            path: '/popup',
            name: 'Popup',
            index: 20,
            component: () => import('../views/components/vuesax/popup/popup.vue')
        },{
            path: '/progress',
            name: 'Progress',
            index: 21,
            component: () => import('../views/components/vuesax/progress/progress.vue')
        },{
            path: '/radio',
            name: 'Radio',
            index: 22,
            component: () => import('../views/components/vuesax/radio/radio.vue')
        },{
            path: '/switch',
            name: 'Switch',
            index: 26,
            component: () => import('../views/components/vuesax/switch/switch.vue')
        },{
            path: '/tabs',
            name: 'Tabs',
            index: 28,
            component: () => import('../views/components/vuesax/tabs/tabs.vue')
        },{
            path: '/textarea',
            name: 'Textarea',
            index: 29,
            component: () => import('../views/components/vuesax/textarea/textarea.vue')
        },
        {
            path: '/contragents',
            name: 'ContragentList',
            index: 30,
            component: () => import('../components/Contragent/ContragentList.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/contragents/:id/edit',
            name: 'ContragentEdit',
            index: 30,
            component: () => import('../components/Contragent/ContragentEdit.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/contragents/find-in-external-system',
            name: 'ContragentFindInExternalSystem',
            component: ContragentFindInExternalSystem,
            meta: { requiresAuth: true },
        },
        {
            path: '/products',
            name: 'ProductList',
            component: ProductList,
            meta: { requiresAuth: true },
        },
        {
            path: '/products/create',
            name: 'ProductCreate',
            component: ProductEdit,
            meta: { requiresAuth: true },
        },
        {
            path: '/products/:id/edit',
            name: 'ProductEdit',
            component: ProductEdit,
            meta: { requiresAuth: true },
        },
        {
            path: '/scores-for-payments',
            name: 'ScoresForPaymentsList',
            component: ScoreForPaymentList,
            meta: { requiresAuth: true },
        },
        {
            path: '/scores-for-payments/:id/edit',
            name: 'ScoreForPaymentEdit',
            component: ScoreForPaymentEdit,
            meta: { requiresAuth: true },
        },
        {
            path: '/scores-for-payments/create',
            name: 'ScoreForPaymentCreate',
            component: ScoreForPaymentCreate,
            meta: { requiresAuth: true },
        },
        {
            path: '/vocab/gos-standards',
            name: 'VocabGosStandardList',
            component: VocabGosStandardList,
            meta: { requiresAuth: true },
        },
        {
            path: '/vocab/gos-standards/:id/edit',
            name: 'VocabGosStandardEdit',
            component: VocabGosStandardEdit,
            meta: { requiresAuth: true },
        },
        {
            path: '/vocab/gos-standards/create',
            name: 'VocabGosStandardCreate',
            component: VocabGosStandardEdit,
            meta: { requiresAuth: true },
        },
        {
            path: '/vocab/banks',
            name: 'VocabBankList',
            component: VocabBankList,
            meta: { requiresAuth: true },
        },
        {
            path: '/vocab/banks/:id/edit',
            name: 'VocabBankEdit',
            component: VocabBankEdit,
            meta: { requiresAuth: true },
        },
        {
            path: '/vocab/banks/create',
            name: 'VocabBankCreate',
            component: VocabBankEdit,
            meta: { requiresAuth: true },
        },
        {
            path: '/vocab/quantities',
            name: 'VocabQuantityList',
            component: VocabQuantityList,
            meta: { requiresAuth: true },
        },
        {
            path: '/vocab/quantities/:id/edit',
            name: 'VocabQuantityEdit',
            component: VocabQuantityEdit,
            meta: { requiresAuth: true },
        },
        {
            path: '/vocab/quantities/create',
            name: 'VocabQuantityCreate',
            component: VocabQuantityEdit,
            meta: { requiresAuth: true },
        },
        {
            path: '/vocab/currencies',
            name: 'VocabCurrencyList',
            component: VocabCurrencyList,
            meta: { requiresAuth: true },
        },
        {
            path: '/vocab/currencies/:id/edit',
            name: 'VocabCurrencyEdit',
            component: VocabCurrencyEdit,
            meta: { requiresAuth: true },
        },
        {
            path: '/vocab/currencies/create',
            name: 'VocabCurrencyCreate',
            component: VocabCurrencyEdit,
            meta: { requiresAuth: true },
        },
    ]
},
{
    path: '*',
    redirect: '/'
}
];
const index = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

index.beforeEach(beforeEach);

// this.$vs.loading();

// index.beforeResolve((to, from, next) => {
//     if(to.path) {
//         console.log(Vue.prototype);
//     }
//     next()
// });
//
// router.afterEach((to, from) => {
//     setTimeout(function() {
//         this.$vs.loading.close();
//     }, 555);
// });

export default index
