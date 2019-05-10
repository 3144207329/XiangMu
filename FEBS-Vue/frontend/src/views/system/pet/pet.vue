<template>
  <a-card :bordered="false" class="card-area">
    <div :class="advanced ? 'search' : null">
      <!-- 搜索区域 -->
      <a-form layout="horizontal">
        <span style="float: right; margin-top: 3px;">
          <a-button type="primary" @click="search">查询</a-button>
          <a-button style="margin-left: 8px" @click="reset">重置</a-button>
        </span>
      </a-form>
    </div>
    <div>
      <div class="operator">
        <a-button type="primary" v-hasPermission="'dict:add'" @click="add">新增</a-button>
        <a-button v-hasPermission="'dict:add'" @click="batchDelete">删除</a-button>
      </div>
      <!-- 表格区域 -->
      <a-table :columns="columns"
               :dataSource="dataSource"
               :pagination="pagination"
               :loading="loading"
               :scroll="{ x: 900 }"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">
        <template slot="operation" slot-scope="text, record">
          <a-icon v-hasPermission="'dept:update'" type="setting" theme="twoTone" twoToneColor="#4a9ff5" @click="edit(record)" title="修改"></a-icon>
          <a-badge v-hasNoPermission="'dept:update'" status="warning" text="无权限"></a-badge>
        </template>
      </a-table>
    </div>
    <!-- 新增报警日志 -->
    <pet-add
      @success="handlePetAddSuccess"
      @close="handlePetAddClose"
      :petAddVisiable="petAddVisiable">
    </pet-add>
    <!-- 修改报警日志 -->
    <dept-edit
      ref="deptEdit"
      @success="handleDeptEditSuccess"
      @close="handleDeptEditClose"
      :petEditVisiable="petEditVisiable">
    </dept-edit>
  </a-card>
</template>

<script>
import RangeDate from '@/components/datetime/RangeDate'
import PetAdd from './PetAdd'
import DeptEdit from './PetEdit'

export default {
  name: 'Dept',
  components: {PetAdd, DeptEdit, RangeDate},
  data () {
    return {
      advanced: false,
      dataSource: [],
      selectedRowKeys: [],
      queryParams: {},
      sortedInfo: null,
      pagination: {
        pageSizeOptions: ['10', '20', '30', '40', '100'],
        defaultCurrent: 1,
        defaultPageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total, range) => `显示 ${range[0]} ~ ${range[1]} 条记录，共 ${total} 条记录`
      },
      loading: false,
      petAddVisiable: false,
      petEditVisiable: false
    }
  },
  computed: {
    columns () {
      let { sortedInfo } = this
      sortedInfo = sortedInfo || {}
      return [{
        title: '昵称',
        dataIndex: 'petName'
      }, {
        title: '品种',
        dataIndex: 'petBreed'
      }, {
        title: '性别',
        dataIndex: 'petSex',
        customRender: (text, row, index) => {
          switch (text) {
            case '0':
              return '雌'
            case '1':
              return '雄'
            case '2':
              return '不详'
            default:
              return text
          }
        }
      },{
        title: '出生日期',
        dataIndex: 'birthday'
      }, {
        title: '描述',
        dataIndex: 'description'
      }, {
        title: '创建时间',
        dataIndex: 'petCreateTime'
      }, {
        title: '修改时间',
        dataIndex: 'petModifyTime'
      }, {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
        fixed: 'right',
        width: 120
      }]
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    handlePetAddClose () {
      this.petAddVisiable = false
    },
    handlePetAddSuccess () {
      this.petAddVisiable = false
      this.$message.success('新增宠物成功')
      this.fetch()
    },
    add () {
      this.petAddVisiable = true
    },
    handleDeptEditClose () {
      this.petEditVisiable = false
    },
    handleDeptEditSuccess () {
      this.petEditVisiable = false
      this.$message.success('修改宠物成功')
      this.fetch()
    },
    edit (record) {
      this.petEditVisiable = true
      this.$refs.deptEdit.setFormValues(record)
    },
    handleDateChange (value) {
      if (value) {
        this.queryParams.createTimeFrom = value[0]
        this.queryParams.createTimeTo = value[1]
      }
    },
    batchDelete () {
      if (!this.selectedRowKeys.length) {
        this.$message.warning('请选择需要删除的记录')
        return
      }
      let that = this
      this.$confirm({
        title: '确定删除所选中的记录?',
        content: '当您点击确定按钮后，这些记录将会被彻底删除，如果其包含子记录，也将一并删除！',
        centered: true,
        onOk () {
          let petIds = []
          for (let key of that.selectedRowKeys) {
            petIds.push(that.dataSource[key].petId)
          }

          that.$delete('pet/' + petIds.join(',')).then(() => {
            that.$message.success('删除成功')
            that.selectedRowKeys = []
            that.fetch()
          })
        },
        onCancel () {
          that.selectedRowKeys = []
        }
      })
    },
    exportExcel () {
      let {sortedInfo} = this
      let sortField, sortOrder
      // 获取当前列的排序和列的过滤规则
      if (sortedInfo) {
        sortField = sortedInfo.field
        sortOrder = sortedInfo.order
      }
      this.$export('dept/excel', {
        sortField: sortField,
        sortOrder: sortOrder,
        ...this.queryParams
      })
    },
    search () {
      let {sortedInfo} = this
      let sortField, sortOrder
      // 获取当前列的排序和列的过滤规则
      if (sortedInfo) {
        sortField = sortedInfo.field
        sortOrder = sortedInfo.order
      }
      this.fetch({
        sortField: sortField,
        sortOrder: sortOrder,
        ...this.queryParams
      })
    },
    reset () {
      // 取消选中
      this.selectedRowKeys = []
      // 重置列排序规则
      this.sortedInfo = null
      // 重置查询参数
      this.queryParams = {}
      // 清空时间选择
      this.$refs.createTime.reset()
      this.fetch()
    },
    handleTableChange (pagination, filters, sorter) {
      this.sortedInfo = sorter
      this.fetch({
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...this.queryParams,
        ...filters
      })
    },
    fetch (params = {}) {
      this.loading = true
      params.pageSize = 5
      params.pageNum = 1
      this.$get('pet', {
        ...params
      }).then((r) => {
        let data = r.data
        this.loading = false
        this.dataSource = data.rows
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../../static/less/Common";
</style>
