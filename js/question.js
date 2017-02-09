///**
// * Created by shijie on 2016/12/10.
// */
//var answerArr = [
//    "您好，拼在衡阳商城您参与拼团并成功后，商家将在48小时内发货。除预售及其他特殊情形商品，商品会在约定发货时间内安排发货，发货时间以商家商品描述页面为准。 ",
//    "未超过规定使用时间的订单退款，请联系拼在衡阳平台客服。",
//    "买家可在已发货订单里查看物流单号，并点击查看物流，查看发货信息。物流信息不准确可以联系卖家客服核实并要求处理，若商家拒绝处理，可以要求拼在衡阳客服介入处理。",
//    "买家可以先联系卖家客服，并提供实物图片确认问题是否属实。如果确认商品问题，或无法说明商品是否合格，卖家应与买家协商解决；若因商品问题商家拒绝处理，可以要求拼在衡阳客服介入处理。",
//    "1.在商品详情里面点击“客服”可直接联系商家。<br><br>2.也可在订单详情里面“联系卖家”。",
//    "拼团券是用来参与拼团活动的一个凭证，只有凭此券去店内消费才能享受拼团价。",
//    "亲，您好，请查看一下您的拼团产品参与人数，可以使用的拼团券必须是拼团产品参与人数达到商家规定的数量，否则不能使用。比如某拼团产品需5人成团才能购买使用拼团券。",
//    "拼在衡阳商城支持7天无理由退换货，在不影响第二次销售的情况下，可以要求商家无理由退换货。因为商品的特殊性，7天无理由退货换不支持生鲜/虚拟/海淘直供类目。",
//    "请您务必先通过微信公众号寻找拼在衡阳客服或者直接与商家客服联系，说明退换货原因。<br><br>1.若商品符合退换货规则条件，客服将会为您提供商家退货地址和退货流程，买家未联系客服自行退货导致商家无法收到产品，商家有权不予处理。<br><br>2.若商品符合退换货规则条件，卖家不提供退货地址，买家可联系拼在衡阳官方客服介入处理。拼在衡阳不支付退货到付。在您没有和卖家协商好货到付款时，请联系物流公司取回货物，拿回货物后重新退货，运费买家自行承担。<br><br>退换货规则（只针对单纯网购商品，不涉及到店消费产品）<br><br>1.买家须在签收商品之日起7天内（按照物流签收后的第二天零时起计算时间，满168小时为7天）向商家提出退换货。<br><br>2.买家申请退款金额不得高于已实际付款金额。<br><br>3.若买家退换原因为7天无理由退货，买家须承担退货运费。<br><br>4.若产品因质量问题、发错、丢件等形式导致退换货，运费全部由商家承担。<br><br>5.若因个人原因对水产肉类/新鲜蔬果/熟食等食品进行拒收，商家有理由拒绝对买家进行退款。<br><br>6.若买家收到产品后超过7天未联系商家或平台客服处理退换货需求，商家有权不予处理。<br><br>7.若买家自收到商品之日起7天内根据卖家或系统提供的退货地址进行无理由退货，卖家收到所退商品之日起3天内（按照物流签收后的第二天零时起计算时间，满72小时为3天）未有异议但并未退款的，拼在衡阳介入后有权对买家进行退款。<br><br>8.若买家要求换货，商家需在收到所退产品起3天内（按照物流签收后的第二天零时起计算时间，满72小时为3天）安排换货，逾期未发出换货拼在衡阳有权介入处理。关于拒收：若为无理由拒签，运费应由买家承担。有理拒签的情况包括但不仅限于以下几种： a、在卖家未发货前，买家已申请退款表示取消订单，后未经买家同意而卖家强行发货所导致的买家拒签；b、买家验货时发现货物破损，或商品不符，然后拒签。",
//    "七天无理由退换货是指消费者在拼在衡阳购物后，在签收货物后7天内，如因主观原因要求退换货，可以提出“7天无理由退换货”的申请（部分商品及类目除外），并且买家退货的货物不得影响卖家的二次销售。若因个人原因对水产肉类/新鲜蔬果/熟食等食品进行拒收，商家有理由拒绝对买家进行退款。<br><br>支持7天无理由退换货类目<br><br>1.奶粉/辅食/营养品/零食<br><br>2.零食/坚果<br><br>3.茶/咖啡/冲饮<br><br>4.彩妆/香水/美妆工具<br><br>5.美容护肤/美体/精油<br><br>6.服装类<br><br>7.个人护理/保健/按摩器材<br><br>不支持7天无理由退换货类目<br><br>1.电影/演出/体育赛事<br><br>2.珠宝/钻石/翡翠/黄金<br><br>3.酒类<br><br>4.水产肉类/新鲜蔬果/熟食<br><br>5.成人用品/避孕/计生用品<br><br>6.网络店铺代金/优惠券<br><br>若此类商品详情页中出现“7天退换”标识的商品，则支持7天无理由退货。"
//]
//
//
//$(".suggestion-one").on("click",function(){
//    location.href = "questionDetail.html?qid="+ $(this).find(".suggestion-title").attr("qid")
//})
//
//var qid = GetQueryString("qid");
//console.log(qid)
//
//$(".answer").html(answerArr[qid])