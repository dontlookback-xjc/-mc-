<template>
	<view>

		<mmask :maskShow="maskShow" @maskClick="maskShow=!maskShow">
			<scroll-view :scroll-y="enable?true:false">
				<view style="display: flex; flex-direction: column;" :style="{height:enable?'auto':'100vh'}">
					<view style="z-index: 2;position:fixed;top:0;width: 100%;background-color: white;"
						:style="{paddingTop:marginTop+'rpx'} ">
						<uni-nav-bar title="到店取餐"></uni-nav-bar>
					</view>
					<!-- 轮播 -->
					<view :style="{marginTop:88+marginTop+'rpx'}">

						<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000"
							:duration="1000">
							<swiper-item>
								<view class="swiper-item">{{cart.length}}</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item">123</view>
							</swiper-item>
						</swiper>
					</view>

					<!-- 定位 -->
					<view class="position">
						<view class="left" @click="toMap">
							{{position.address}}
						</view>
						<view class="right">图标</view>
						<!-- <view style="display: inline-block; height: 100%; width: 1px;vertical-align: middle;"></view> -->
					</view>
					<!-- 点单 -->
					<view class="order" :style="{height:enable?'100vh':''}" @touchmove.stop="">
						<!-- 左 -->
						<view class="left">

							<view class="type" :class="{'active':index===leftIndex}" v-for="(item,index) in left"
								:key="index" @click="leftIndex=index">
								<view style="white-space:nowrap;" v-for="(sitem,sindex) in  item.text.split(' ')"
									:key="sindex">
									{{sitem+' '}}
								</view>

							</view>

						</view>
						<!-- 右 -->
						<scroll-view class="right" @scrolltoupper="toTop" scroll-y="true" @scroll="scroll">
							<view class="card" v-for="(item,index) in right" :key="index">
								<!-- 信息 -->
								<view class="bg" style="background-image: url(../../static/w.png);">
								</view>
								<view class="text">
									<view style="font-size: 20px;">{{item.name}}</view>
									<view style="font-size: 14px;">￥{{item.price}}</view>

								</view>
								<!-- 按钮 -->
								<view class="custom">
									<view class="bottom" v-for="(sitem,sindex) in item.custom" :key="sindex">
										<text style="display: inline-block;margin-right: 10rpx;">{{sitem.text}} </text>

										<uni-icons v-show="item.num&&sitem.button=='plus'" type="minus" size="20"
											@click="customClick(item,'minus')" />
										<text style="padding: 0 10rpx;"
											v-show="item.num&&sitem.button=='plus'">{{item.num}}</text>


										<uni-icons :type="sitem.button" size="20"
											@click="customClick(item,sitem.button)" />

									</view>
								</view>

							</view>
						</scroll-view>

					</view>
				</view>
			</scroll-view>
		</mmask>

		<!-- 底部 -->
		<!-- 这个地方用v-show="cart.length" 会有bug -->
		<view class="cart" v-show="cart.length">
			<view v-show="this.maskShow">
				<view class="row" style="font-size: 12px;display: flex;justify-content: space-between;">
					<view>已选产品</view>
					<view @click="cart=[];maskShow=false">清空</view>
				</view>
				<view class="row" v-for="(item,index) in cart" :key="index">
					<view class="message">
						<view class="left">
							<view style="font-size: 18px;">{{item.name}}</view>
							<view style="font-size: 12px;color: #C8C7CC;">
								{{item.detail|varJoin}}
							</view>
							<view style="font-size: 18px;">{{item.price}}</view>
						</view>
						<view class="right">
							<uni-icons type="minus" @click="customClick(item,'minus')"></uni-icons>
							<label for="" style="margin: 0 20rpx;">{{item.num}}</label>
							<uni-icons type="plus" @click="customClick(item,'plus')"></uni-icons>

						</view>
					</view>

				</view>
			</view>
			<cart :cart="cart" @showDetail="showDetail"></cart>
		</view>
	</view>
</template>

<script>
	import {
		l,
		r
	} from "../../js/testData.js"

	var timeOut = null
	import map from "../../js/map.js"
	import mmask from "../../components/mask/mask.vue"
	import cart from "../../components/cart.vue"
	export default {
		data() {
			return {
				title: 'Hello',
				position: {},
				left: l,
				right: r,
				leftIndex: 0,
				enable: false,

				cart: [],
				maskShow: false

			}
		},
		components: {
			mmask,
			cart
		},
		computed: {
			marginTop() {
				return this.$navHeight - 80
			},
			// cart(){

			// 	let result=[];
			// 	this.right.forEach(item=>{if(item.num) result.push(item)})
			// 	// this.right.forEach(item=>{if(item.num) result.push(item)})
			// 	return  result?result:[]
			// }

		},
		onLoad() {
			uni.$on('custom', (res) => {
				console.log('f',this.cart)
				let custom = res.detail.custom
				let name = res.name
				let same
				// 遍历cart
				for (let item of this.cart) {
					
					// name一样 检测detail
					if (item.name == name) {
						same=true
						let temp = {};
						for (let key in custom) {
							temp[key] = custom[key].map(item => item)

						}
						console.log(this.cart)
						let iCustom = item.detail.custom
						//  检测deatil各项{drink snack}
						loop:
						for (let key in iCustom) {
							if (!temp[key]) return;
							if (temp[key].length != iCustom[key].length) return
								// [可乐 奶茶]
							for (let sitem of iCustom[key]) {
								let i = temp[key].indexOf(sitem)
								console.log(i)
								if (i > -1) {
									temp[key].splice(i, 1)
								} else {
									// 打断循环 找下一项cart
									same=false;
									break loop;
								}
							}					
						}
						// 
						if(same){
							item.num++;
						
							return;
						}
						
					}
					
					
				}
				this.cart.push(res);
				// 	this.cart.push(res)
				// 	console.log(this)
				// 	console.log(this.cart)

			})
			// 监听定位设置
			uni.$on('setPosition', (res) => {
				this.position = res;

			})

			let res = uni.getStorageSync('lastPostion')

			if (res) {
				this.position = res;

				return
			}

			map.search('麦当劳', (res) => {
				// 注意id转number
				res[0].id = parseInt(res[0].id)
				this.position = res[0]


				uni.setStorage({
					key: 'lastPostion',
					data: res
				})

			})

		},
		filters: {
			sp(value) {
				return value.split(' ')
			},
			varJoin(value) {
				let ar = value.regular
				for (let key in value.custom) {
					ar = ar.concat(value.custom[key])
				}
			
				return ar.join("+")
			}
		},
		methods: {
			showDetail() {

				this.maskShow = !this.maskShow
			},
			toMap() {
				uni.navigateTo({
					url: '../map/index'
				})
			},
			scroll(e) {

				if (timeOut) return
				timeOut = true
				setTimeout(() => {
					timeOut = false
				}, 200)

				if (e.detail.scrollTop > 50 && e.detail.deltaY < 0) {

					if (this.enable) return
					this.enable = true;
					this.$nextTick(() => {

						uni.pageScrollTo({
							scrollTop: 254,
							duration: 300
						});
					})
				}

			},
			customClick(item, button) {
				switch (button) {
					case "arrowright":
						uni.navigateTo({
							url: '../custom/index',
							success: (res) => {
								// 通过eventChannel向被打开页面传送数据

								res.eventChannel.emit('acceptDataFromOpenerPage', item)
							},
						})
						break;
					case "plus":
						item.num++;
						if (this.cart.indexOf(item) == -1) this.cart.push(item)
						
						break;


					case "minus":

						item.num--;

						if (this.cart.length == 0) this.maskShow = false;
						break;
				}


			},
			toTop() {

				uni.pageScrollTo({
					scrollTop: 1,
					duration: 300
				});
				setTimeout(() => {
					this.enable = false
				}, 300)


			}
		}
	}
</script>

<style lang="scss" scoped>
	::-webkit-scrollbar {
		display: none
	}

	.swiper {
		height: 364rpx;
	}

	.position {
		background-color: white;
		height: 126rpx;
		text-align: center;

		.left {
			display: inline-block;
			vertical-align: middle;
			padding: 0 60rpx;
			box-sizing: border-box;
			width: 80%;
			word-wrap: break-word;
		}

		.right {
			display: inline-block;
			vertical-align: middle;
			width: 20%;

		}

	}

	.position::after {
		content: '';
		height: 100%;
		display: inline-block;
		width: 0;
		vertical-align: middle;


	}

	.order {
		background-color: #f2f1f5;
		flex: 1;
		display: flex;
		font-size: 14px;
		overflow-y: hidden;

		.left {
			height: 100%;
			margin-top: 18rpx;

			overflow-y: scroll;
			margin-right: 16rpx;
			width: 122rpx;

			.type {

				box-sizing: border-box;
				width: 122rpx;
				padding: 40rpx 20rpx;
				text-align: center;
				background-color: white;

				border-bottom: 1px solid #f5f4f9;

			}

			.active {
				background-color: transparent;
				border-left: 6rpx solid gold;
				font-weight: bold;
			}
		}

		.right {
			margin-top: 18rpx;
			width: 600rpx;
			height: 100%;

			.card {

				box-sizing: border-box;
				width: 100%;
				height: 336rpx;
				margin-bottom: 30rpx;
				padding-top: 30rpx;
				padding-left: 60rpx;
				display: inline-block;
				background-color: white;
				border-radius: 10rpx;
				box-shadow: 1px 0px 6px #C8C7CC;
				position: relative;

				.bg {
					position: absolute;
					right: 0;
					top: 40rpx;

					background-size: 100% auto;
					width: 300rpx;
					height: 300rpx;
				}

				.custom {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					flex-wrap: wrap;
					height: 45%;

					.bottom {

						box-sizing: border-box;
						height: 42rpx;
						line-height: 42rpx;
						font-size: 14px;
						display: inline-block;

						text {
							vertical-align: middle;
						}

						uni-icons {
							vertical-align: middle;
						}


					}
				}


				.text {
					height: 45%;
					width: 50%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

				}

			}
		}
	}

	.cart {
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 4;

		.row {
			padding: 30rpx;
			background-color: white;
			border-bottom: 1px solid #ebeaef;

			.message {
				display: flex;
				align-content: center;
				justify-content: space-between;


				.left {
					view {
						margin-bottom: 10rpx;
					}

				}

				.right {
					font-size: 18px;
					display: flex;

					align-items: center;


				}
			}
		}
	}
</style>
