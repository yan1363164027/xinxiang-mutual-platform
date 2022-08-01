<template>
  <div class="about">
    <p class="begin">西汉有国，其名稻侯，盈车嘉穗，抱德炀和</p>
    <main>
        <p>我 们 是 稻 侯 er</p>
        <article>
            <ul>
                <li>致敬在抗疫一线的医护人员、警察、志愿者等天使</li>
                <li>致敬各个小区制作救助表格，和将其影响至网络，发起节点救助需求的组织者</li>
                <li>致敬后缀93的FTP站发起人</li>
                <li>感谢王跃坤、闫志翔、衡盛永、张相朋、赵晓鹏，牛燕尾为本站提供支持</li>
                <li>我们是一群响应政府号召、封控在家的普通人，我们听到看到身边人的需求,我们力所能及施加帮助，我们不计报酬,我们只希望新乡会尽快好起来。</li>
            </ul>
        </article>
    </main>
    <div class="volunteer">
      <ul>
        <li>
          <p>志愿者1:</p>
          <img src="../assets/ewm.png" alt="">
        </li>
        <li>
          <p>志愿者2:</p>
          <img src="../assets/ewm.png" alt="">
        </li>
        <li>
          <p>成为志愿者:</p>
          <img src="../assets/ewm.png" alt="">
        </li>
      </ul>
      <p>本网站纯属公益，请慎防诈流，举报邮箱3099501060@qq.com</p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'XxAbout',
  props: {
    msg: String
  }
}
</script>
<style scoped>
    .about{
        margin: 2.5%;
        width: 95%;
    }
    .begin{
        font-size: 0.4rem;
        margin: 0.3rem 0.6rem;
    }
    main{
        width: 100%;
        background-color: rgba(252, 48, 37, .08);
        display: flex;
    }
    main p{
        display: flex;
        align-items: space-between;
        margin: 0.3rem;
        font-size: 0.5rem;
        width: 1.3rem;
        padding: 0.3rem;
        border: 0.1rem dotted #ccc;
        line-height: 0.7rem;
    }
    article{
        font-size: 0.3rem;
        line-height: 0.7rem;
    }
    article ul{
      margin: 0.5rem 0 0 1rem;
      list-style: disc;
    }
    .volunteer{
      margin: 0.3rem;
        color: red;
    }
    .volunteer ul{
        padding: 0rem 1rem;
        display: flex;
        font-size: 0.3rem;
        list-style: none;
        justify-content: space-between;
    }
    .volunteer ul li{
        width:2rem;
    }
    .volunteer ul li img{
        width: 2rem;
    }
    .volunteer>p{
        margin: 0.3rem 0.5rem;
        font-size: 0.3rem;
    }

</style>