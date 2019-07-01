<template>
  <div>
    <!-- 数据筛选 -->
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <span>数据筛选</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
    </el-card>
    <!-- 数据筛选 -->

    <!-- 文章列表 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          一共有
          <strong>{{ totalCount }}</strong>条数据
        </span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <!--
        talbel 表格不需要我们自己去手动 v-for 遍历
        你只需要将数组数据交给 table 表格的 data 属性就可以了
        然后配置 el-table-column 表格列组件即可
          label 列头标题
          prop  遍历项中的数据字段
          width 列宽
        表格默认把数据当做文本去输出
        如果需要其他数据格式，则可以自定义表格列
      -->
      <el-table class="article-list" style="width: 100%" :data="articles">
        <el-table-column label="封面" width="180">
          <!--
            template 中的内容就是自定义表格列内容
            如果需要在 template 中访问遍历项数据，则需要给 template 配置 slot-scope="scope"
              slot-scope 属性名是固定的
              scope 值是自己随便起的名字
            结果就是：我们可以通过 scope.row 访问到当前遍历项对象，就好比我们遍历中的 item 一样
          -->
          <template slot-scope="scope">
            <img width="20" v-for="item in scope.row.cover.images" :key="item" :src="item" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column label="状态" width="180">
          <template slot-scope="scope">
            <el-tag :type="statTypes[scope.row.status].type">{{ statTypes[scope.row.status].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间" width="180"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              plain
              @click="$router.push(`/publish/${scope.row.id}`)"
            >修改</el-button>
            <el-button size="mini" type="danger" plain @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--
        数据分页
        page-size 配置每页大小，默认是 10
        total 用来配置总记录数
        分页组件会根据每页大小和总记录数进行分页
      -->
      <el-pagination
        background
        :current-page="page"
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="totalCount"
        :disabled="articleLoading"
        @current-change="handleCurrentChange"
      ></el-pagination>
      <!-- /数据分页 -->
    </el-card>
    <!-- /文章列表 -->
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  data() {
    return {
      articles: [],
      totalCount: 0,
      page: 1,
      articleLoading: false,
      pageSize: 10,
      statTypes: [
        {
          type: "info",
          label: "草稿"
        },
        {
          type: "success",
          label: "审核通过"
        },
        {
          type: "",
          label: "待审核"
        },
        {
          type: "warning",
          label: "审核失败"
        },
        {
          type: "danger",
          label: "已删除"
        }
      ]
    };
  },
  created() {
    this.loadArticle();
  },
  methods: {
    async loadArticle() {
      try {
        const res = await this.$http({
          method: "get",
          url: "http://ttapi.research.itcast.cn/mp/v1_0/articles",
          params: {
            page: this.page, // 页码
            per_page: this.pageSize // 每页大小
          }
        });
       
        this.articles = res.results;
        this.totalCount = res.total_count
        this.articleLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async handleDelete(item) {
      try {
        await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        await this.$http({
          method: "DELETE",
          url: `http://ttapi.research.itcast.cn/mp/v1_0/articles/${item.id}`
        });
        this.$message({
          type: "success",
          message: "删除成功"
        });
        this.loadArticle();
      } catch (error) {
        this.$message.error("取消成功");
      }
      // 删除确认提示

      // 删除成功重新加载数据列表
    },
    async handleCurrentChange (page) {
      // 将数据中的页码修改为当前最新改变的数据页码
      this.page = page
     console.log('sss')
      // 页码改变，重新加载当前文章列表
     this.loadArticle();
    }
  }
};
</script>

<style lang="less" scoped>
.filter-card {
  margin-bottom: 15px;
}

.article-list {
  margin-bottom: 30px;
}
</style>
