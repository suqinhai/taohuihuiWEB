const Login = resolve => require(['./views/Login.vue'], resolve)
const NotFound = resolve => require(['./views/404.vue'], resolve)
const Home = resolve => require(['./views/Home.vue'], resolve)
const Main = resolve => require(['./views/Main.vue'], resolve)


//首页模块
const topNav = resolve => require(['./views/index/topNav.vue'], resolve)
const bottomNav = resolve => require(['./views/index/bottomNav.vue'], resolve)
const poster = resolve => require(['./views/index/poster.vue'], resolve)

//商品管理模块
const notOnline = resolve => require(['./views/goods/notOnline.vue'], resolve)
const online = resolve => require(['./views/goods/online.vue'], resolve)


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
        name: '首页配置',
        iconCls: 'fa fa-address-card',
        leaf: false,//有多个节点
        children: [
            { path: '/index/topNav', component: topNav, name: '头部菜单' },
            { path: '/index/bottomNav', component: bottomNav, name: '底部菜单' },
            { path: '/index/poster', component: poster, name: '海报轮播' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '商品管理',
        iconCls: 'fa fa-address-card',
        leaf: false,//有多个节点
        children: [
            { path: '/goods/notOnline', component: notOnline, name: '未上线商品' },
            { path: '/goods/online', component: online, name: '已上线商品' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;