<template>
  <a-drawer
    title="修改宠物日志"
    :maskClosable="false"
    width=650
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="petEditVisiable"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-form :form="form">
      <a-form-item label='昵称' v-bind="formItemLayout">
        <a-input v-decorator="['petName',
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
        <!--<a-input v-decorator="['petBreed']" style="width: 100%"/>-->
      </a-form-item>
      <a-form-item label='性别' v-bind="formItemLayout">
        <a-radio-group
          v-model="petSex"
          v-decorator="['petSex',{rules: [{ required: true, message: '请选择性别' }]}]">
          <a-radio value="1">雄</a-radio>
          <a-radio value="0">雌</a-radio>
          <a-radio value="2" checked="checked">不详</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label='出生日期' v-bind="formItemLayout">
        <a-input type="date" v-decorator="['birthday']" style="width: 100%" />
      </a-form-item>
       <a-form-item label='描述' v-bind="formItemLayout">
              <a-input v-decorator="['description']" style="width: 100%"/>
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
  name: 'PetEdit',
  props: {
    petEditVisiable: {
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
      defaultCheckedKeys: []
    }
  },
  methods: {
    reset () {
      this.loading = false
      this.deptTreeKey = +new Date()
      this.expandedKeys = this.checkedKeys = this.defaultCheckedKeys = []
      this.button = {}
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
    setFormValues ({...pet}) {
      this.form.getFieldDecorator('petName')
      this.form.setFieldsValue({'petName': pet.petName})
      this.form.getFieldDecorator('petBreed')
      this.form.setFieldsValue({'petBreed': pet.petBreed})
      this.form.getFieldDecorator('petSex')
      this.form.setFieldsValue({'petSex': pet.petSex})
      this.form.getFieldDecorator('birthday')
      this.form.setFieldsValue({'birthday': pet.birthday})
      this.form.getFieldDecorator('description')
       this.form.setFieldsValue({'description': pet.description})
      this.pet.petId = pet.petId
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          let pet = this.form.getFieldsValue()
          pet.petId = this.pet.petId
          this.$put('pet', {
            ...pet
          }).then(() => {
            this.reset()
            this.$emit('success')
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>
