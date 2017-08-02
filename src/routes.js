const Login = resolve => require(['./views/Login.vue'], resolve)
const NotFound = resolve => require(['./views/404.vue'], resolve)
const Home = resolve => require(['./views/Home.vue'], resolve)
const Main = resolve => require(['./views/Main.vue'], resolve)

//系统配置
const admin = resolve => require(['./views/system/admin.vue'], resolve)

//首页模块
const topNav = resolve => require(['./views/index/topNav.vue'], resolve)
const bottomNav = resolve => require(['./views/index/bottomNav.vue'], resolve)
const poster = resolve => require(['./views/index/poster.vue'], resolve)

//商品管理模块
const notOnline = resolve => require(['./views/goods/notOnline.vue'], resolve)
const online = resolve => require(['./views/goods/online.vue'], resolve)


//会员列表
const memberList = resolve => require(['./views/memberManage/memberList.vue'], resolve)

// 购物车管理
const shopCart = resolve => require(['./views/memberManage/shopCart.vue'], resolve)

// 收藏历史
const collectList = resolve => require(['./views/memberManage/collectList.vue'], resolve)

// 朋友圈
const circle = resolve => require(['./views/memberManage/circle.vue'], resolve)

//分类管理
const classify = resolve => require(['./views/classifyManage/classify.vue'], resolve)
const property = resolve => require(['./views/classifyManage/property.vue'], resolve)


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
        iconCls: 'fa fa-address-card-o',
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
        name: '分类管理',
        iconCls: 'fa fa-th-list',
        leaf: false,//有多个节点
        children: [
            { path: '/classifyManage/classify', component: classify, name: '分类列表' },
            { path: '/classifyManage/property/:classifyId', component: property, name: '属性列表', hidden:true },
        ]
    },

    {
        path: '/',
        component: Home,
        name: '购物车管理',
        iconCls: 'fa fa-truck',
        leaf: false,//有多个节点
        children: [
             { path: '/memberManage/shopCart', component: shopCart, name: '购物车列表' },
        ]
    },

    {
        path: '/',
        component: Home,
        name: '朋友圈',
        iconCls: 'fa fa-pie-chart',
        leaf: false,//有多个节点
        children: [
             { path: '/memberManage/circle', component: circle, name: '会员收藏' },
        ]
    },

    {
        path: '/',
        component: Home,
        name: '收藏历史',
        iconCls: 'fa fa-sticky-note-o',
        leaf: false,//有多个节点
        children: [
             { path: '/memberManage/collectList', component: collectList, name: '会员收藏' },
        ]
    },

    {
        path: '/',
        component: Home,
        name: '会员管理',
        iconCls: 'fa fa-user-circle',
        leaf: false,//有多个节点
        children: [
            { path: '/memberManage/memberList', component: memberList, name: '会员列表' },
        ]
    },

    {
        path: '/',
        component: Home,
        name: '商品管理',
        iconCls: 'fa fa-shopping-basket',
        leaf: false,//有多个节点
        children: [
            { path: '/goods/notOnline', component: notOnline, name: '未上线商品' },
            { path: '/goods/online', component: online, name: '已上线商品' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统配置',
        iconCls: 'fa fa-gear',
        leaf: false,//有多个节点
        children: [
            { path: '/system/admin', component: admin, name: '用户管理' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;