const Login = resolve => require(['./views/Login.vue'], resolve)
const NotFound = resolve => require(['./views/404.vue'], resolve)
const Home = resolve => require(['./views/Home.vue'], resolve)
const Main = resolve => require(['./views/Main.vue'], resolve)


//首页模块
const nav = resolve => require(['./views/index/nav.vue'], resolve)

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '首页',
        iconCls: 'fa fa-address-card',
        leaf: false,//有多个节点
        children: [
            { path: '/index/nav', component: nav, name: '首页菜单' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;