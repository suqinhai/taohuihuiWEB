<template>
    <section>
        <div v-show="firstTable">
            <!--工具条-->
            <div v-if="!FormVisible">
                <el-col :span="19" class="toolbar" style="padding-bottom: 0px;">
                    <el-form :inline="true" :model="filters">
                        <el-form-item>
                            <strong class="title">{{$route.name}}</strong>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="small" type="primary" @click="refleshTable">刷新</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="small" type="primary" :disabled="this.sels.length!=1" @click="handleEdit">编辑</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="small" type="danger" @click="handleDel" :disabled="this.sels.length == 0">删除</el-button>
                        </el-form-item>
                         <el-form-item>
                            <el-button size="small" type="primary" @click="handleOnline" :disabled="this.sels.length == 0">上线</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="5" class="toolbar" style="padding-bottom: 0px;">
                    <el-form :inline="true" :model="filters" style="float: right;">
                        <el-form-item style="height:38px;margin-right:0px;">
                            <el-input size="small" v-model="filters.name" placeholder="搜索" @change="handleSearch"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
                <!--列表-->
                <el-table :data="tabledata" v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" :max-height="tableHeight" ref="table" @row-click="handleRowClick">
                    <el-table-column show-overflow-tooltip type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="_id" show-overflow-tooltip label="_id">
                    </el-table-column>
                    <el-table-column prop="title" show-overflow-tooltip label="标题">
                    </el-table-column>
                     <el-table-column prop="pictUrl"  show-overflow-tooltip label="海报">
                        <template scope="scope">
                             <el-tooltip placement="bottom"> 
                                <div slot="content"><img style="max-width:300px;" :src="scope.row.pictUrl"></div> 
                                <i class="fa fa-fw fa-picture-o bg-blue-light" style="cursor: pointer;" aria-hidden="true"></i> 
                            </el-tooltip> 
                        </template>
                    </el-table-column>
                    <el-table-column prop="zkPrice" show-overflow-tooltip label="价格">
                    </el-table-column>
                    <el-table-column prop="couponShortLinkUrl"  show-overflow-tooltip label="优惠券链接">
                        <template scope="scope">
                            <a :href="scope.row.couponShortLinkUrl" target="_blank" style="    color: #1f2d3d;"><i class="el-icon-document" style="cursor: pointer;" aria-hidden="true"></i></a> 
                        </template>
                    </el-table-column>
                    <el-table-column prop="clickUrl"  show-overflow-tooltip label="商品链接">
                        <template scope="scope">
                            <a :href="scope.row.clickUrl" target="_blank" style="color: #1f2d3d;"><i class="el-icon-document" style="cursor: pointer;" aria-hidden="true"></i></a> 
                        </template>
                    </el-table-column>
                    <el-table-column prop="tkCommFee"  show-overflow-tooltip label="佣金">
                    </el-table-column>
                    <el-table-column prop="category"  show-overflow-tooltip label="类目">
                    </el-table-column>
                    <el-table-column prop="sort"  show-overflow-tooltip label="排序">
                    </el-table-column>
                    <el-table-column prop="publish"  show-overflow-tooltip label="状态" :formatter='formatState'>
                    </el-table-column>
                    <!--  <el-table-column prop="couponEffectiveStartTime" width="120" show-overflow-tooltip label="优惠券开始时间">
                    </el-table-column>
                    <el-table-column prop="couponEffectiveEndTime" width="120" show-overflow-tooltip label="优惠券结束时间">
                    </el-table-column> -->
                    <el-table-column prop="category"  show-overflow-tooltip label="更多详情">
                        <template scope="scope">
                            <i class="el-icon-menu" style="cursor: pointer;" aria-hidden="true"></i> 
                        </template>
                    </el-table-column>
                </el-table>
                <!--分页-->
                <el-col :span="24" class="toolbar">
                    <el-pagination layout="total, sizes, prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-sizes="pageSizes" :page-size="per_page" :total="total" :current-page="page" style="float:right;">
                    </el-pagination>
                </el-col>
            </div>


            <!--编辑/新增-->
            <template v-if="FormVisible">
                <div :span="24" class="toolbar" style="padding-bottom: 0px;">
                    <el-form :inline="true">
                        <el-form-item>
                            <strong class="title">{{ $route.name }}</strong>
                            <strong class="title"> | {{ ( formType == 0 ? '新增' : '修改' ) }}</strong>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="small" type="primary" @click="preView">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="form-box">
                    <el-form ref="form" :model="form" :rules="formRules" label-width="180px">
                        <el-form-item prop="sort" label="排序">
                            <el-input v-model="form.sort" type="number"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click.native.prevent="onSubmit">提交</el-button>
                            <el-button @click="preView">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </template>
        </div>
    </section>
</template>
<script>
import NProgress from 'nprogress'

export default {
    data() {
            return {
                tableHeight: document.documentElement.clientHeight - 220,
                filters: {
                    name: '',
                },
                interface: {
                    upload: '/taohuihui/public/upload',
                    list: {
                        get: '/taohuihui/goods/get',
                        status: '/taohuihui/goods/status',
                        edit: '/taohuihui/goods/modify',
                        del: '/taohuihui/goods/del'
                    },
                },
                level: 0,
                levelid: [],
                tabledata: [],
                pageSizes: [10, 20, 50, 100],
                per_page: 50,
                total: 0,
                page: 1,
                listLoading: false,
                sels: [], //列表选中列
                firstTable: true,
                FormVisible: false, //编辑界面是否显示
                //编辑界面数据
                form: {
                    'sort': '',
                },
                formRules: {},
            }
        },
        methods: {
            formatState(row, column){
                return row.publish ? '已上线' : '未上线'
            },
            handleSizeChange(val) {
                this.per_page = val
                this.getData()
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getData();
            },
            selsChange: function(sels) {
                this.sels = sels;
            },
            handleRowClick: function(row, event, column) {
                this.$refs.table.toggleRowSelection(row)
            },
            handleSearch: function() {
                this.getData()
            },
            refleshTable: function() {
                this.level = 0
                this.levelid = []
                this.fid = 0
                this.filters.name = ''
                this.per_page = 50
                this.page = 1;
                this.getData()
            },

            //获取列表
            getData() {
                let para = {
                    page: this.page,
                    name: this.filters.name,
                };
                this.listLoading = true
                this.$http.get(this.interface.list.get + '?page=' + para.page + '&name=' + para.name + '&pageSize=' + this.per_page  + '&publish=0').then((data) => {
                    this.tabledata = data.body.list
                    this.total = parseInt(data.body.count)
                    this.listLoading = false
                });
            },

            handleOnline:function(){
                this.$confirm('确认上线选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    var data = this.sels.map(item => item)
                    var _ids = []
                    data.forEach(function(value, key) {
                        _ids.push(value._id)
                    })
                    this.listLoading = true;
                    this.$http.post(this.interface.list.status, {
                        _ids: _ids,
                        publish:1,
                    }).then(res => {
                        this.listLoading = false
                        if (res.code == 0) {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            })
                            return false;
                        }
                        this.getData()
                        this.$message({
                            message: '上线成功',
                            type: 'success'
                        });

                    })
                }).catch(() => {

                });
            },
           
            //显示编辑界面
            handleEdit: function() {
                let data = this.sels.map(item => item)[0]
                this.formType = data._id
                this.form._id = data._id
                this.form.url = data.url
                this.form.img = data.img
                this.form.title = data.title
                this.form.alt = data.alt
                this.form.sort = parseInt(data.sort)
                this.FormVisible = true
            },
            handleAdd: function() {
                this.formType = 0
                this.form._id = ''
                this.form.title = ''
                this.form.alt = ''
                this.form.img = ''
                this.form.url = ''
                this.form.sort = ''
                this.FormVisible = true
            },

            handleDel: function() {
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    var data = this.sels.map(item => item)
                    var _ids = []
                    data.forEach(function(value, key) {
                        _ids.push(value._id)
                    })
                    this.listLoading = true;
                    this.$http.post(this.interface.list.del, {
                        _ids: _ids
                    }).then(res => {
                        this.listLoading = false
                        if (res.code == 0) {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            })
                            return false;
                        }
                        this.getData()
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });

                    })
                }).catch(() => {

                });
            },

            onSubmit: function() {
                this.form.sort = parseInt(this.form.sort)
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        if (this.form._id) {
                            this.listLoading = true;
                            this.$http.post(this.interface.list.edit, this.form).then(res => {
                                this.listLoading = false;
                                if (res.code == 0) {
                                    this.$message({
                                        message: res.msg,
                                        type: 'error'
                                    })
                                    return false;
                                }
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                })
                                this.FormVisible = false;
                                this.getData();
                            })
                        } else {
                            this.listLoading = true;
                            this.$http.post(this.interface.list.add, this.form).then(res => {
                                this.listLoading = false;
                                if (res.code == 0) {
                                    this.$message({
                                        message: res.msg,
                                        type: 'error'
                                    })
                                    return false;
                                }
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                })
                                this.FormVisible = false;
                                this.getData();
                            })
                        }
                    } else {
                        return false
                    }
                })
            },
            preView() {
                this.firstTable = true;
                this.FormVisible = false;
                this.sels = []
            },
            handleAvatarSuccess(res, file) {
                this.form.img = res.data.url
            },
            beforeAvatarUpload(file) {
                // const isJPG = file.type === 'image/jpeg';
                // const isLt2M = file.size / 1024 / 1024 < 2;

                // if (!isJPG) {
                //   this.$message.error('上传头像图片只能是 JPG 格式!');
                // }
                // if (!isLt2M) {
                //   this.$message.error('上传头像图片大小不能超过 2MB!');
                // }
                // return isJPG && isLt2M;
            }

        },
        mounted() {
            this.getData();
        }
}
</script>
<style scoped>
.form-box {
    margin-top: 50px;
    width: 500px;
}

.title {
    font-size: 18px;
    color: #20a0ff;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
