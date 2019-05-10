<template>
  <a-drawer
    title="新增宠物日志"
    :maskClosable="false"
    width=650
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="petAddVisiable"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-form :form="form">
      <a-form-item label='昵称' v-bind="formItemLayout">
        <a-input v-model="pet.petName"
                 v-decorator="['petName',
                   {rules: [
                    { required: true, message: '昵称不能为空'},
                    { max: 20, message: '长度不能超过20个字符'}
                  ]}]"/>
      </a-form-item>
      <a-form-item label='品种' v-bind="formItemLayout">
        <a-select
          v-model="pet.petBreed"
          style="width: 100%"
          v-decorator="['petBreed',{rules: [{ required: true, message: '请选择品种' }]}]">
          <a-select-option value="狗">狗</a-select-option>
          <a-select-option value="猪">猪</a-select-option>
          <a-select-option value="猫">猫</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label='性别' v-bind="formItemLayout">
        <a-radio-group
          v-model="pet.petSex"
          v-decorator="['petSex',{rules: [{ required: true, message: '请选择性别' }]}]">
          <a-radio value="1">雄</a-radio>
          <a-radio value="0">雌</a-radio>
          <a-radio value="2" checked="checked">不详</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label='出生日期' v-bind="formItemLayout">
        <a-input type="date" v-model="pet.birthday" style="width: 100%" />
        <!--<range-date @change="handleDateChange" ref="birthday"></range-date>-->
      </a-form-item>
      <a-form-item label='描述' v-bind="formItemLayout">
              <a-input v-model="pet.description" style="width: 100%"/>
       </a-form-item>
    </a-form>
    <div class="drawer-bootom-button">
      <a-popconfirm title="确定放弃编辑？" @confirm="onClose" okText="确定" cancelText="取消">
        <a-button style="margin-right: .8rem">取消</a-button>
      </a-popconfirm>
      <a-button @click="handleSubmit" type="primary" :loading="loading">提交</a-button>
    </div>
  </a-drawer>
</template>
<script>
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 }
}
export default {
  name: 'PetAdd',
  props: {
    petAddVisiable: {
      default: false
    }
  },
  data () {
    return {
      loading: false,
      formItemLayout,
      form: this.$form.createForm(this),
      pet: {},
      checkedKeys: [],
      expandedKeys: [],
      deptTreeData: [],
      deptTreeKeys: +new Date()
    }
  },
  methods: {
    reset () {
      this.loading = false
      this.deptTreeKeys = +new Date()
      this.expandedKeys = this.checkedKeys = []
      this.pet = {}
      this.form.resetFields()
    },
    onClose () {
      this.reset()
      this.$emit('close')
    },
    handleCheck (checkedKeys) {
      this.checkedKeys = checkedKeys
    },
    handleExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          this.$post('pet', {
            ...this.pet
          }).then(() => {
            this.reset()
            this.$emit('success')
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    handleDateChange (value) {
      if (value) {
        this.queryParams.createTimeFrom = value[0]
        this.queryParams.createTimeTo = value[1]
      }
    }
  }
}
</script>
