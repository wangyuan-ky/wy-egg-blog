<template>
  <div>
     <div v-if="article.id">
        <Card class="title" :bordered="false">
          <p>{{article.title}}<span class="date">{{formatDate(article.createdAt)}}</span></p>
        </Card>
        <div class="bar">
          分类：<Tag @click.native="searchByCategory(article.category.id)" type="border" color="primary">{{article.category.name}}</Tag>
          标签：<Tag @click.native="searchByTag(tag.id)" v-for="tag in [article.tag]" :key="tag.id" color="primary">{{tag.name}}</Tag>
        </div>
        <div class="container">
          <section class="markdown-and-toc">
            <mavonEditor class="markdown" codeStyle="dark" :value="article.content" :toolbarsFlag="toolbarsFlag" :subfield="toolbarsFlag" defaultOpen="preview"></mavonEditor>
            <div class="toc">
            </div>
          </section>
          <section class="comment-box">
            <ul class="comment-list">
              <template v-for="(comment, index) in commentList">
                <li class="comment-item"
                    :key="index">
                  <div class="comment-line">
                    <div class="comment-avatar">
                      <svg t="1633531768997" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9961" width="48" height="48"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#BA67FD" p-id="9962"></path><path d="M573.80864 820.34688h-123.61728c-116.1216 0-208.0768 0-208.0768-58.90048v-12.288c0-113.0496 93.30688-205.0048 208.0768-205.0048h123.61728c114.688 0 208.0768 91.9552 208.0768 205.0048v12.288c0 58.90048-96.37888 58.90048-208.0768 58.90048zM506.0608 528.384c-90.9312 0-164.82304-72.86784-164.82304-162.44736s73.728-162.44736 164.82304-162.44736 164.82304 72.86784 164.82304 162.44736S596.95104 528.384 506.0608 528.384z" fill="#FFFFFF" p-id="9963"></path></svg>
                    </div>
                    <div class="comment-detail">
                      <div class="comment-header">
                        <div class="comment-header--left">
                          <div class="comment-nickname">
                            <a v-if="comment.user.website"
                               :href="comment.user.website"
                               target="_blank">
                              {{ comment.user.nickname }}
                            </a>
                            <span v-else>{{ comment.user.nickname }}</span>
                          </div>
                          <div class="comment-email"><span>{{ comment.user.email }}</span></div>
                        </div>
                        <div class="comment-header--right">
                          <div class="comment-created-at"><span>{{ formatDate(comment.createdAt) }}</span></div>
                        </div>
                      </div>

                      <div class="comment-content">
                        {{ comment.content }}
                      </div>
                    </div>
                  </div>
                </li>
              </template>
            </ul>

            <Form class="comment-operation"
                  ref="formComment"
                  :model="commentForm"
                  :rules="ruleCommentForm"
                  :label-width="80">
              <Form-item label="昵称" prop="nickname">
                <Input v-model="commentForm.nickname" placeholder="请输入您的昵称"></Input>
              </Form-item>
              <Form-item label="电子邮箱" prop="email">
                <Input v-model="commentForm.email" placeholder="请输入您的电子邮箱"></Input>
              </Form-item>
              <!-- <Form-item label="网址" prop="website">
                <Input v-model="commentForm.website" placeholder="请输入个人网站地址"></Input>
              </Form-item> -->

              <Form-item label="评论" prop="content">
                <Input v-model="commentForm.content"
                       type="textarea"
                       :autosize="{minRows: 2,maxRows: 5}"
                       placeholder="请输入..."></Input>
              </Form-item>

              <Form-item>
                <Button type="primary" @click="toCreateComment">评论</Button>
                <Button type="default" @click="toResetComment" style="margin-left: 8px">重置</Button>
              </Form-item>
            </Form>
          </section>
        </div>

      </div>
      <Spin size="large" fix v-if="loading"></Spin>
  </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { Card, Tag, Spin } from 'iview'
import moment from 'moment'
import { genToc } from '@/assets/js/utils.js'
import { getArticleDetail, getArticleComments, createArticleComment } from '@/assets/js/api.js'
export default {
  components: {
    mavonEditor,
    Card,
    Tag,
    Spin
  },
  data() {
    return {
      id: '',
      toolbarsFlag: false,
      article: {},
      loading: false,
      tocShow: true,
      commentForm: {
        email: '',
        nickname: '',
        website: '',
        article_id: '',
        content: '',
        status: 1
      },
      ruleCommentForm: {
        nickname: [
          { required: true, message: '请输入您的昵称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入您的电子邮箱', trigger: 'blur' }
        ],
        /* website: [
          { required: true, message: '请输入个人网站地址', trigger: 'blur' }
        ], */
        content: [
          { required: true, message: '请输入评论', trigger: 'blur' }
        ]
      },
      commentList: []
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.commentForm.article_id = this.id
    this.fetchArticle(this.id)
    this.fetchArticleComments(this.id)
  },
  methods: {
    toCreateComment() {
      this.$refs.formComment.validate((valid) => {
        if (this.loading) {
          return
        }
        if (valid) {
          this.loading = true
          createArticleComment(this.commentForm)
            .then(res => {
              if (res.errcode === 0) {
                console.log(res.data)
              }
              this.toResetComment()
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },
    toResetComment() {
      this.$refs.formComment.resetFields()
      this.fetchArticleComments(this.id)
    },
    fetchArticle(id) {
      this.loading = true
      getArticleDetail({ id }).then(res => {
        this.loading = false
        if (res.errcode === 0) {
          this.article = res.data
          // 生成目录
          this.$nextTick(() => {
            genToc('.v-show-content', '.toc')
          })
        }
      })
    },
    fetchArticleComments(id) {
      this.loading = true
      getArticleComments({ id }).then(res => {
        this.loading = false
        if (res.errcode === 0) {
          this.commentList = res.data
        }
      })
    },
    formatDate(date) {
      return moment(new Date(date)).format('YYYY-MM-DD HH:mm:ss')
    },
    searchByCategory(id) {
      // 去搜索结果页
      this.$router.push(`/SearchList/1/${id}`)
    },
    searchByTag(id) {
      // 去搜索结果页
      this.$router.push(`/SearchList/2/${id}`)
    }
  }
}
</script>
<style lang='stylus' scoped>
.title
  font-size 20px
  font-weight bold
  margin-bottom 10px
  .date
    float right
    font-size 14px
    color #999
    font-weight normal
.bar
  background #fff
  padding 5px
  margin-bottom 10px
.container
  display flex
  flex-wrap wrap
  position: absolute
  top 130px
  bottom 0
  left 10px
  right 10px
  .markdown-and-toc
    display flex
    box-sizing border-box
    width 100%
    .toc
      color #2185d0
      width 200px
      height 100%
      background #fff
      padding 10px
      margin-left 10px
    .markdown
      flex 1
      height 100%
  .comment-box
    display flex
    box-sizing border-box
    padding 12px 0 30px
    width: 100%;
    justify-content flex-start
    align-items flex-start
    .comment-operation
      box-sizing border-box
    .comment-list
      flex: 1;
      box-sizing border-box
      padding 12px
      .comment-item
        padding-top 12px
        box-sizing border-box
        &:first-child
          padding-top 0
        .comment-line
          box-sizing border-box
          padding 8px
          border 1px dashed #757F9A
          border-radius 6px
          display flex
          justify-content flex-start
          align-items flex-start
          .comment-avatar
            box-sizing border-box
          .comment-detail
            box-sizing border-box
            padding-left 8px
            flex 1
            .comment-header
              box-sizing border-box
              display flex
              justify-content space-between
              align-items center
              .comment-header--left
                box-sizing border-box
                display flex
                justify-content flex-start
                align-items center
                > div
                  box-sizing border-box
                  padding-left 8px
                  &:first-child
                    padding-left 0
                  > span
                    color #333
                  font-size 16px
                .comment-nickname
                  box-sizing border-box
                .comment-email
                  span
                    color #a3a3a3
              .comment-header--right
                box-sizing border-box
                display flex
                flex-direction row-reverse
                justify-content flex-start
                align-items center
                > div
                  box-sizing border-box
                  padding-right 8px
                  &:first-child
                    padding-right 0
                  > span
                    color #333
                  font-size 16px
                .comment-created-at
                  span
                    color #a3a3a3
            .comment-content
              box-sizing border-box
              padding-top 8px
              font-size 14px
@media (max-width: 780px)
  .toc
    display none
  .title
    .date
      display block
      float none
      margin-top 10px
  .container
    position static
</style>
