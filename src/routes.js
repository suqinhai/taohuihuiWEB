const Login = resolve => require(['./views/Login.vue'], resolve)
const NotFound = resolve => require(['./views/404.vue'], resolve)
const Home = resolve => require(['./views/Home.vue'], resolve)
const Main = resolve => require(['./views/Main.vue'], resolve)
const Table = resolve => require(['./views/nav1/Table.vue'], resolve)     
const Form = resolve => require(['./views/nav1/Form.vue'], resolve)
const user = resolve => require(['./views/nav1/user.vue'], resolve)
const Page4 = resolve => require(['./views/nav2/Page5.vue'], resolve)
const Page5 = resolve => require(['./views/nav2/Page5.vue'], resolve)
const Page6 = resolve => require(['./views/nav3/Page6.vue'], resolve)
const echarts = resolve => require(['./views/charts/echarts.vue'], resolve)

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
        name: '导航一',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航二',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '页面4' },
            { path: '/page5', component: Page5, name: '页面5' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;