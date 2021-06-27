<template>
  <div class="lib-container">
    <div class="top">
      <i class="el-icon-s-home"></i>
      <span class="txt">控件库管理</span>
    </div>
    <div class="content">
      <div class="panel">
        <div class="head">
          <div class="search-bar">
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
              <el-form-item>
                <el-input v-model="searchForm.keyword" prefix-icon="el-icon-search" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="opr-btns">
            <el-button type="primary" icon="el-icon-plus" @click="openModal">创建控件库</el-button>
            <el-button @click="isEnableItem('1')">启用</el-button>
            <el-button @click="isEnableItem('0')">停用</el-button>
          </div>
        </div>
        <div class="table-box">
          <el-table
            v-loading="loadingStatus"
            ref="listTable"
            :data="tableData"
            height="100%"
            tooltip-effect="dark">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="序号"
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              prop="name"
              label="控件库名称"
              width="120">
            </el-table-column>
            <el-table-column
              label="使用状态"
              width="80">
              <template v-slot="scope"><span :style="{color: scope.row.flag === 0 ? 'red' : 'green'}">{{ scope.row.flag === 0 ? '停用' : '启用' }}</span></template>
            </el-table-column>
            <el-table-column
              label="创建时间"
              width="200">
              <template v-slot="scope">{{ scope.row.createTime }}</template>
            </el-table-column>
            <el-table-column
              prop="remark"
              label="控件库描述"
              min-width="200"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="200">
              <template v-slot="scope">
                <el-button @click="editList(scope.row)" type="text" size="small">修改</el-button>
                <el-button @click="linkDetail(scope.row)" type="text" size="small">管理控件</el-button>
                <el-button @click="changeStatus([scope.row.id], scope.row.flag === 0 ? '1' : '0')" type="text" size="small"><span :style="{color: scope.row.flag === 0 ? 'green' : 'red'}">{{ scope.row.flag === 0 ? '启用' : '停用' }}</span></el-button>
                <el-button @click="deleteItem(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination-box">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
      </div>
    </div>

    <el-dialog :title="formType === 1 ? '创建控件库' : '编辑控件库'" @close="closeModal" v-model="dialogFormVisible" width="450px">
      <el-form :model="form" :rules="rules" ref="addForm">
        <el-form-item label="是否开通" :label-width="formLabelWidth" prop="flag" v-if="formType === 2">
          <el-radio-group v-model="form.flag">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="控件库名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="控件库描述" :label-width="formLabelWidth" prop="desc">
          <el-input v-model="form.desc" type="textarea" :rows="2" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getLibList, addLibItem, delLibItem, changeLibStatus, getLibDetail } from '../utils/api'
export default defineComponent({
  name: 'control-main',
  data () {
    return {
      searchForm: {
        keyword: ''
      },
      form: {
        name: '',
        desc: '',
        flag: ''
      },
      loadingStatus: false,
      formType: 1,
      curRow: null,
      formLabelWidth: '100px',
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogFormVisible: false,
      rules: {
        name: [
          { required: true, message: '请输入控件库名称', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    openModal () {
      this.form.name = ''
      this.form.desc = ''
      this.formType = 1
      this.dialogFormVisible = true
    },
    closeModal () {
      // 重置表单数据
      this.$refs.addForm.resetFields()
      this.$refs.addForm.clearValidate()
    },
    onSearch () {
      // 查询
      this.getList()
    },
    add () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          const params:any = {
            name: this.form.name,
            remark: this.form.desc
          }
          if (this.formType === 2) {
            params.flag = this.form.flag
            params.id = this.curRow.id
          }
          addLibItem(params).then((res) => {
            if (res.code === 200) {
              this.getList()
              this.dialogFormVisible = false
              this.$message({
                message: res.msg,
                type: 'success'
              })
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              })
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    },
    getList () {
      const params = {
        name: this.searchForm.keyword
      }
      this.loadingStatus = true
      getLibList(params, { pageNo: this.currentPage, pageSize: this.pageSize }).then((res) => {
        this.loadingStatus = false
        if (res.code === 200) {
          if (res.obj) {
            res.obj.total && (this.total = res.obj.total)
            res.obj.list && (this.tableData = res.obj.list)
          }
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch((err) => {
        this.loadingStatus = false
        console.log(err)
      })
    },
    editList (row) {
      this.curRow = row
      // 请求详情信息
      getLibDetail(row.id).then((res) => {
        if (res.code === 200) {
          this.formType = 2
          this.dialogFormVisible = true
          if (res.obj) {
            // 回显
            this.form.name = res.obj.name
            this.form.flag = res.obj.flag + ''
            this.form.desc = res.obj.remark
          }
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    isEnableItem (type) {
      var selection = this.$refs.listTable.selection
      if (!selection || selection.length <= 0) {
        this.$message({
          message: '请选中一行进行操作',
          type: 'warning'
        })
        return
      }
      const ids = []
      selection.forEach((item) => {
        ids.push(item.id)
      })
      this.changeStatus(ids, type)
    },
    changeStatus (ids, type) {
      const params = {
        ids: ids.join(','),
        flag: type
      }
      changeLibStatus(params).then((res) => {
        if (res.code === 200) {
          this.getList()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    deleteItem (row) {
      this.$confirm('是否删除此条?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delLibItem(row.id).then((res) => {
          if (res.code === 200) {
            this.getList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList()
    },
    linkDetail (row) {
      this.$emit('changeCont', row)
    }
  }
})
</script>

<style lang="less" scoped>
</style>
