<!--
@file: DialogCommentsManage.vue
@author: 王媛
@description: 评论管理 弹框
 -->
<template>
  <div class="dialog-comments-manage">
    <el-tooltip :disabled="true"
                content=""
                placement="top">
      <div class="comments-manage-tooltip"
           slot="content">
      </div>

      <div class="click-comments-manage"
           @click="showDialogCommentsManage">
        <slot></slot>
      </div>
    </el-tooltip>

    <el-dialog class="dialog-comments-manage-box"
               ref="refDialogCommentsManage"
               @closed="resetCommentsManage"
               :visible.sync="dialogCommentsManage">
      <template slot="title">
        <span class="el-dialog__title">
          {{ formCommentsManage.title }}
          <span class="tips">(ID: {{ formCommentsManage.id }})</span>
        </span>
      </template>

      <section class="comments-manage-box"
               v-loading="requesting">
        <div class="comments-table-wrap">
          <div class="comments-table-box">
            <el-table :data="commentsList"
                      border
                      stripe
                      class="hide-border">

              <el-table-column label="评论ID"
                               prop="id"
                               align="left"
                               width="120">
              </el-table-column>

              <el-table-column label="昵称"
                               prop="nickName"
                               align="left">
                <template v-slot="{ row }">
                  {{ row.user.nickname }}
                </template>
              </el-table-column>

              <el-table-column label="邮箱"
                               prop="email"
                               align="left"
                               min-width="120">
                <template v-slot="{ row }">
                  {{ row.user.email }}
                </template>
              </el-table-column>

              <el-table-column label="评论内容"
                               prop="content"
                               show-overflow-tooltip
                               align="left">
              </el-table-column>

              <el-table-column label="评论时间"
                               prop="createdAt"
                               min-width="110"
                               :formatter="timeFormatter"
                               align="left">
              </el-table-column>

              <el-table-column label="操作"
                               class-name="ctrl-td"
                               width="160px"
                               fixed="right"
                               align="left">
                <template v-slot="{ row }">

                  <el-popconfirm title="确认要删除该评论吗？"
                                 @confirm="toDeleteComment(row)">
                    <el-button slot="reference"
                               type="danger"
                               plain
                               size="mini"
                               icon="el-icon-delete"
                               :loading="row._ing"></el-button>
                  </el-popconfirm>
                </template>
              </el-table-column>

            </el-table>
          </div>
        </div>
      </section>

      <div class="comments-manage-footer">
        <div class="comments-manage-btn">
          <el-button @click="cancelCommentsManage"
                     size="small">关闭</el-button>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>

import moment from 'moment'

export default {
  name: 'DialogCommentsManage',
  components: {
  },
  props: {
    articleLine: {
      type: Object,
      default () {
        return null
      }
    }
  },
  data () {
    return {
      dialogCommentsManage: false,
      requesting: false,
      formCommentsManage: {
        id: '',
        title: ''
      },
      commentsList: []
    }
  },
  methods: {
    getCommentsList() {
      this.requesting = true
      this.$axios.get('/comments', { params: this.formCommentsManage })
        .then(res => {
          this.commentsList = res.data
        })
        .catch(() => {
        })
        .finally(() => {
          this.requesting = false
        })
    },
    reRender () {
      if (!this.articleLine) {
        return
      }
      this.formCommentsManage.id = this.articleLine.id
      this.formCommentsManage.title = this.articleLine.title
      this.getCommentsList()
    },
    showDialogCommentsManage () {
      this.reRender()
      this.dialogCommentsManage = true
    },
    cancelCommentsManage () {
      this.dialogCommentsManage = false
    },
    resetCommentsManage () {
      this.formCommentsManage.id = ''

      this.$refs.refFormCommentsManage && this.$refs.refFormCommentsManage.resetFields()
    },
    toDeleteComment (commentLine) {
      if (this.requesting) {
        return
      }
      this.requesting = true
      this.$axios.post('/delete/comment', commentLine)
        .then((res) => {
          this.$message({
            type: +res.errcode === 0 ? 'success' : 'warning',
            message: res.msg
          })
          this.getCommentsList()
        })
        .catch((e) => {
        })
        .finally(() => {
          this.requesting = false
        })
    },
    timeFormatter(row, column, cellValue, index) {
      return moment(new Date(cellValue)).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style lang="stylus" scoped>
.dialog-comments-manage {
  display inline-block
  box-sizing: border-box;
  margin-right 10px
}
</style>

<style lang="stylus">
.dialog-comments-manage-box {
  text-align left
  .el-dialog {
    width: 960px;
    .tips {
      color #aaa
      font-size 14px
    }
    .el-dialog__body {
      padding: 5px;
      .el-row {
        > .el-col:first-child {
          padding-right: 0 !important;
        }
      }
      .el-form-item {
        .single-file-upload {
          .el-upload {
            display: flex;
            > .el-button {
              margin-left: 8px;
            }
          }
        }
      }
      .comments-manage-box {
        padding: 0 20px;
        box-sizing: border-box;
        width: 100%;
        position: relative;
      }
      .comments-manage-footer {
        padding: 16px;
        margin-top: 12px;
        box-sizing: border-box;
        min-height: 48px;
        background: #f0f0f0;
        position: relative;
        .comments-manage-btn {
          position: absolute;
          top: 50%;
          right: 20px;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>
