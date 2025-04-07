//********** 购物车交互 **********//
$(function() {
	//计算总价格
	function all_price() {
		//定义初始总价格为0
		var pricesum = 0;
		//然后遍历每一个选项
		$(".dx").each(function() {
			//设置其在选中状态下时
			if ($(this).prop("checked") === true) {
				//定义每个商品的总价，再与总价格相加
				var pricenum = $(this).parent().siblings().find
(".subtotal-price").html();
				pricesum += parseFloat(pricenum);
			} else {
				pricesum = pricesum;
			}
		});
		//最后将总价格放入html
		$(".total-price").html("￥" + pricesum);
	}
	//显示总商品数
	function all_num() {
		//定义初始商品数为0
		var sum = 0;
		//然后遍历每一个选项
		$(".dx").each(function() {
			//设置其在选中状态下时
			if ($(this).prop("checked") === true) {
				//定义每个商品的数量，并与总数量相加
				var spnum = $(this).parent().siblings().find
(".input-num").val();
				sum += Number(spnum);
			} else {
				sum = sum;
			}
		});
		//最终将总数量放入html
		$(".total-num").html(sum);
	}
	//创建对象Car
	function Car() {
		this.init();
	}
	//将其初始化
	Car.prototype.init = function() {
		var self = this;
		$("*[data-car-action]").click(function() {
			var action = $(this).attr("data-car-action");
			self[action]($(this));
		});
	};
	//设置单击“全选”按钮时，选中所有复选框并计算价格
	Car.prototype.all = function(the) {
		if ($(the).find(".qx").prop("checked") === true) {
			$(".checkbox-input").prop("checked", true);
		} else {
			$(".checkbox-input").prop("checked", false);
		}
		all_price();
		all_num();
	};
	//设置单击“单选”按钮时，单独计算价格
	Car.prototype.one = function(the) {
		//判断是否单选
		if ($(the).prop("checked") === true) {
			$(the).prop("checked", true);
		} else {
			$(the).prop("checked", false);
		}
		//判断是否全选
		if ($(".dx:checked").length === $(".dx").length) {
			//确认全选时，添加全选标志
			$(".qx").prop("checked", true);
		} else {
			//非全选时，取消全选标志
			$(".qx").prop("checked", false);
		}
		all_price();
		all_num();
	};
	//设置单击增加商品数量按钮时，根据商品数量计算价格
	Car.prototype.add = function(the) {
		//获取商品数量
		var num = $(the).prev().val();
		//执行加操作
		num++;
		//将数值放入html
		$(the).prev().val(num);
		//获取商品现在的价格
		var pric = $(the).parent().prev().find(".goods-price")
.html();
		//计算价格*数量，得到总价
		var pri = num * pric;
		//最终将结果放入html
		$(the).parent().next().find(".subtotal-price")
.html(pri);
		//当选中该商品时，修改总价格与数量
		if ($(the).parent().siblings(":first").find(".dx")
.prop("checked") === true) {
			all_price();
			all_num();
		}
	};
	//设置单击减少商品数量按钮时，根据商品数量计算价格
	Car.prototype.reduce = function(the) {
		//获取商品数量
		var num = $(the).next().val();
		//执行减操作
		num--;
		if (num < 1) {
			return false;
		}
		//把数值放入html
		$(the).next().val(num);
		//获取商品现在的价格
		var pric = $(the).parent().prev().find(".goods-price")
.html();
		//计算价格*数量，得到总价
		var pri = num * pric;
		//最终将结果放入html
		$(the).parent().next().find(".subtotal-price")
.html(pri);
		//当选中该商品时，修改总价格与数量
		if ($(the).parent().siblings(":first").find(".dx")
.prop("checked") === true) {
			all_price();
			all_num();
		}
	};
	//设置单击删除单行按钮时，删除该商品
	Car.prototype.del = function(the) {
		$(the).parent().parent().remove();
		all_price();
		all_num();
	};
	//设置单击“删除已选商品”按钮时，删除选中商品
	$(".bot-delete-btn").click(function() {
		//获取选中商品
		var selected = $(".dx:checked").parent().parent();
		//删除选中商品
		selected.remove();
		all_price();
		all_num();
	});
	//实例化Car对象
	new Car();
});
