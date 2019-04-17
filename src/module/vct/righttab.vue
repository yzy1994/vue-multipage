<template>
  <div class="col-xs-9">
    <div>
      <ul id="myTab" class="nav nav-tabs">
        <li class=""><a href="#tab0" data-toggle="tab" aria-expanded="false">操作指南</a></li>
        <li class="active"><a href="#tab1" data-toggle="tab" aria-expanded="true">关于事件本体</a></li>
        <li class=""><a href="#tab3" data-toggle="tab" aria-expanded="false">事件层次图目录结构</a></li>
        <!-- <li><a href="#tab2" data-toggle="tab">概念层次图目录结构</a></li> -->
      </ul>
      <div id="myTabContent" class="tab-content clearfix list-wrap">
        <div class="tab-pane fade m-t-20 in" id="tab0">
          <div class="artical-title">
            当前操作的本体: <i><span class="ontname">"突发事件本体"</span></i>
          </div>
          <hr>
          <div class="artical-title">编辑事件类层次图</div>
          <div class="markdown">创建（修改）事件类，建立事件类之间的层次关系（上下位关系）。</div>
          <div class="artical-title">编辑概念层次图</div>
          <div class="markdown">建立事件本体中的概念，并且建立概念之间的层次关系，事件类中包含的人物、对象（物体）、地点都属于概念。</div>
          <div class="artical-title">非分类关系图</div>
          <div class="markdown">建立事件本体中事件类之间的非分类关系，例如事件类和事件类之间的因果关系、跟随关系、组成关系、并发关系等。</div>
          <div class="artical-title">其他</div>
          <div class="markdown">正在开发中。。。</div>
        </div>
        <div class="tab-pane fade m-t-20 active in" id="tab1">
          <img id="EOimg" src="/static/images/bont/EO.png">
          <div class="artical-title">事件</div>
          <div class="markdown">
            事件指在某个特定的时间和环境下发生的、由若干角色参与、表现出若干动作特征的一件事情形式上，
            事件可表示为e，定义为一个六元组：e一(A，O，T，V，P，L)其中，事件六元组中的元素称为事件要素，
            分别表示动作、对象、时间、环境、断言、语言表现。</div>
          <div class="artical-title">对象要素</div>
          <div class="markdown">对象是事件的主要参与者，是事件中的主导作用者或被改变者。
            对象可分为主体和客体。主体是主导者，是事件中的主角，有时是事 件的制造者或期望事件发生者客体是事件中的被动者。按照分工，
            事件中的对象分为不同的角色，例如“选举”事件，其中有主持组织 者、监票者、投票者、候选人、当选者、落选者。事件的对象一般是
            第一实体，但也可能又是事件，也可能是关系。还有的事件的对象是 有关联的事件集合。对于特定的事件类，对象是有约束的，例如选举
            事件的组织者可以是人或组织。利用这些约束，可以判断句子中的主 语或宾语。其他要素也有约束，也可以利用。</div>
          <div class="artical-title">时间要素</div>
          <div class="markdown">每个事件都必须发生在一个时间段内。事件有开始、发展、
            结束。时间段由绝对时间表示，也可以用相对时间表示，也就是 用另一个事件的时问的相对偏差表示。</div>
          <div class="artical-title">环境要素</div>
          <div class="markdown">任何事件必然发生在一定的环境中。环境由多
            个实体按照特定的关系组成。例如“上课”事件的环 境有教室，教室内有黑板、讲台、课桌、椅子等，
            这些东西是有序存在的。环境要素中的实体与对象 要素中的实体都是事件涉及的，还有动作要素中的
            工具。为什么有的属于对象要素、有的属于环境要 素、有的属于动作要素?关键在于它们在事件中的
            地位和作用。环境要素中的实体是相对静止的，在 事件中几乎是不变的，或者虽然变化，但并不重要。
            而动作要素的工具中的实体是运动的，是对事件的 实施有重要作用的。对象要素中的实体是最重要的，
            或者是事件的主角，或者是事件的驱动者，或者是 事件的主要被改变者。</div>
          <div class="artical-title">语言表现要素</div>
          <div class="markdown">将事件与语言分离有很多优点。事件是客观的，
            本来就不依赖于语言。语言是人类为了交流各自知道 的事件发生而创造出来的符号表示，因而事件就有了
            语言特性。交流和思考离不开语言，然而很多研究工 作往往将它们混为一谈。混为一谈的研究方法容易把
            问题搞复杂。事件的语言表现是随着语言的变化而变 化的。同一个事件，对于不同的语言有不同的表现，
            即使对于同一个语言，也会有不同的表现。语言表现 的主要内容是核心词。核心词是对于事件的称谓、对
            于事件中各角色的称谓、对时问和环境的描述格式、 对各要素结合的描述格式。语言表现可以用文法表示，
            也可以用规则表示，或用模板表示。</div>
          <div class="artical-title">断言要素</div>
          <div class="markdown">断言描述的是事件的作用。前置条件表示的是事件发生
            之前的状态特点，也是事件发生的条件。中间断言表示事件 进行过程中的状态特点，也就是在开始后和结束前各状态共
            同的特点。后置条件是事件结束状态的特点。</div>
          <div class="artical-title">动作要素</div>
          <div class="markdown">
            动作要素描述事件的变化过程及其特征，是对程度，方式，方法，工具等的描述，例如快慢，使用什么，根据什么等等。</div>
        </div>
        <div class="tab-pane fade m-t-20 in" id="tab3">
          <div class="artical-title">事件类层次图目录结构</div>
          <div>
            <ul id="treeDemo" class="ztree"></ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from '../../assets/jquery-vendor.js'
import '@ztree/ztree_v3/js/jquery.ztree.core.js'
export default {
  props: {
    eclist: null
  },
  watch: {
    eclist (newVal) {
      if (newVal === null) {
        return
      }
      console.log(newVal)
      let zNodes = []
      for (let i = 0; i < newVal.length; i++) {
        let zNode = {}
        zNode.id = newVal[i].id
        zNode.pId = newVal[i].parentId
        zNode.name = newVal[i].name
        zNodes.push(zNode)
      }
      let settings = {
        data: {
          simpleData: {
            enable: true
          }
        }
      }
      console.log(settings)
      console.log(zNodes)
      console.log($.fn)
      $.fn.zTree.init($('#treeDemo'), settings, zNodes)
    }
  },
  mounted: function () {
    let test = $('tab3')
    console.log(test)
  }
}
</script>


<style lang="stylus">
  .artical-title {
    color: #3e485c;
    font-size: 18px;
    font-weight: 700;
    padding: 0 20px 20px 20px;
  }
  .markdown {
    line-height: 30px;
    font-size: 16px;
    padding: 0 20px 20px 20px;
  }
</style>
