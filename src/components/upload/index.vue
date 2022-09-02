<script lang="ts" setup>
import { ref, defineExpose, inject } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { bookOperate } from '@/types/symbol'

const fileList = ref<UploadUserFile[]>([])
const dialogVisible = ref(false)

const { addBook } = inject(bookOperate, {})

const handleSubmit = () => {
  if (!fileList.value) {
    ElMessage({
      type: 'warning',
      message: '请至少选择一个文件',
    })
    return
  }
  fileList.value.forEach((item) => {
    if (item.raw?.type === 'application/pdf') {
      ElMessage({
        type: 'warning',
        message: '暂不支持上传PDF文件',
      })
      return
    }
    addBook(item.name.replace('.epub', ''), item.raw)
  })
  dialogVisible.value = false
}

const uploadChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  const isRepeat: boolean = uploadFiles.slice(0, uploadFiles.length - 1).some((file) => {
    return file.name === uploadFile.name
  })
  if (isRepeat) {
    ElMessage({
      message: '文件已上传',
      type: 'warning',
    })
    fileList.value.pop()
  }
}

defineExpose({
  dialogVisible,
})
</script>

<template>
  <el-dialog v-model="dialogVisible" title="上传" width="30%">
    <el-upload
      class="upload"
      drag
      action="#"
      multiple
      :file-list="fileList"
      :auto-upload="false"
      :on-change="uploadChange"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="upload-text">
        拖拽文件到此处 或
        <span class="upload-text-select-file">选择文件</span>
      </div>
      <div class="upload-text-tip">上传完成后可在书架上查看</div>
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped></style>
