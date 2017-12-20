# Vue-
基于Vue本地script+router设置,简单本地配置

<!-- 先引入 Vue -->  
<script src="https://unpkg.com/vue/dist/vue.js"></script>  

<!-- 引入组件库 -->  
<script src="https://unpkg.com/element-ui/lib/index.js"></script>  
<!-- 引入路由组件 -->  
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>  
  
<script>  
    // 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)  
    import xiaoxiXiangqing from 'xiaoxiXiangqing'  

  
  
    // 1. 定义（路由）组件。  
    // 可以从其他文件 import 进来  
    // const Foo = {  
    //     template: '<div>这里是路由出来的文字</div>'    
    // }  

    // 2. 定义路由    
    // 每个路由应该映射一个组件。 其中"component" 可以是  
    // 通过 Vue.extend() 创建的组件构造器，  
    // 或者，只是一个组件配置对象。  
    // 我们晚点再讨论嵌套路由。  
    const routes = [{  
        path: '/foo',  
        component: xiaoxiXiangqing  
    }]  
  
    // 3. 创建 router 实例，然后传 `routes` 配置  
    // 你还可以传别的配置参数, 不过先这么简单着吧。  
    const router = new VueRouter({  
        routes // （缩写）相当于 routes: routes  
    })  
  
    // 4. 创建和挂载根实例。  
    // 记得要通过 router 配置参数注入路由，  
    // 从而让整个应用都有路由功能  
  
    new Vue({  
  
        el: '#app',  
        data: function () {  
            return {  
                visible: false  
            }  
        },  
        methods: {  
            handleOpen(index) {  
                console.log("打开子菜单" + key);  
            },  
            handleClose(key) {  
                console.log("关闭子菜单" + key);  
            }  
        },  
        router  
    }).$mount('#app')  
</script>    
  
