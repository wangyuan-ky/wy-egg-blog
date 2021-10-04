<template>
  <div class="wrapper">
    <div class="logo">
      <img src="http://r0e3p8ohy.hb-bkt.clouddn.com/wy_s_blog.png" alt="">
    </div>
    <Menu class="nav" mode="horizontal" theme="light" active-name="1">
        <MenuItem name="1">
          <router-link to="/">
            <Icon type="ios-paper" />
            全部文章
          </router-link>
        </MenuItem>
        <MenuItem name="2">
            <a href="https://github.com/wangyuan-ky" target="_blank">
              <Icon type="md-navigate" />
              王多肉的 Git
            </a>
        </MenuItem>
    </Menu>
    <Dropdown trigger="click" class="menu">
      <a href="javascript:void(0)">
        <Icon type="md-menu" />
      </a>
      <DropdownMenu slot="list">
        <DropdownItem>
          <router-link to="/">
            <Icon type="ios-paper" />
            全部文章
          </router-link>
        </DropdownItem>
        <DropdownItem>
          <a href="https://github.com/wangyuan-ky" target="_blank">
            <Icon type="md-navigate" />
            王多肉的 Git
          </a>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script>
import {Menu, MenuItem, Icon, Dropdown, DropdownMenu} from 'iview'
export default {
  components: {
    Menu,
    MenuItem,
    Icon,
    Dropdown,
    DropdownMenu
  },
  data () {
    return {
    }
  }
}
</script>
<style lang='stylus' scoped>
.wrapper
  display flex
.logo
  width 300px
  height 60px
  text-align center
  background #fff
  img
    width auto
    height 100%
.nav
  flex 1
  position relative
  a
    display block
    width 100%
    height 100%
.menu
  position absolute
  right 5px
  top 10px
  display none
  font-size 40px
@media (max-width: 780px)
  .nav
    display none
  .menu
    display inline-block
</style>
