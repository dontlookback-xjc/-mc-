<template>
	<scroll-view   scroll-y="true"   >
		<view  style="z-index: 2;position:fixed;top:0;width: 100%;background-color: white;" :style="{paddingTop:marginTop+'rpx'} " >
					<uni-nav-bar title="到店取餐"></uni-nav-bar>
				</view>
		<!-- 轮播 -->
		<view :style="{marginTop:88+marginTop+'rpx'}">

			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item>
					<view class="swiper-item">123</view>
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
			<view class="right">button</view>
			<!-- <view style="display: inline-block; height: 100%; width: 1px;vertical-align: middle;"></view> -->
		</view>
		<!-- 点单 -->
		<view class="order" :style="{height:enable?'100vh':''}" @touchmove.stop = "">
			<!-- 左 -->
			<view class="left">

				<view class="type" :class="{'active':index===leftIndex}" v-for="(item,index) in left"
					@click="leftIndex=index">
					<view style="white-space:nowrap;" v-for="(sitem,sindex) in  item.text.split(' ')">
						{{sitem+' '}}
					</view>

				</view>

			</view>
			<!-- 右 -->
			<scroll-view class="right" @scrolltoupper="toTop"
			 scroll-y="true" @scroll="scroll">
				<view class="card" v-for="(item,index) in right">
				
					<view style="
					position: absolute;right: 0;top:40rpx;
					background-image: url(../../static/w.png);
					 background-size: 100% auto;
					width: 300rpx;height: 300rpx;">

					</view>
					<view class="text">
						<view style="font-size: 20px;">{{item.name}}</view>
						<view style="font-size: 14px;">￥{{item.price}}</view>

					</view>
					<view class="bottom" v-for="(sitem,sindex) in item.custom">

						{{sitem}}
					</view>

				</view>
			</scroll-view>

		</view>

	</scroll-view>
</template>

<script>
	var timeOut=null
	import map from "../../js/map.js"
	export default {
		data() {
			return {
				title: 'Hello',
				position: {},
				left: [{
						text: '鸡肉 汉堡包'
					},
					{
						text: '炸鸡'
					},
					{
						text: '鸡肉 汉堡包'
					},
					{
						text: '炸鸡'
					},
					{
						text: '鸡肉 汉堡包'
					},
					{
						text: '炸鸡'
					},
					{
						text: '鸡肉 汉堡包'
					},
					{
						text: '炸鸡'
					},
				],
				right: [
					{
					name: '炸鸡小食桶',
					price: '39',
					custom: ['去定制']	
				},
				{
					name: '炸鸡小食桶',
					price: '39',
					custom: ['去定制']	
				},
				{
					name: '炸鸡小食桶',
					price: '39',
					custom: ['去定制']	
				},
				{
					name: '炸鸡小食桶',
					price: '39',
					custom: ['去定制']	
				}
				
				],
				leftIndex: 0,
				enable:false

			}
		},
		computed: {
			marginTop() {
				return this.$navHeight - 80 
			}

		},
		onLoad() {
			// 监听定位设置
			uni.$on('setPosition', (res) => {
				this.position = res;
				console.log(res)
			})

			let res = uni.getStorageSync('lastPostion')

			if (res) {
				this.position = res;

				return
			}

			map.search('麦当劳', (res) => {
				// 注意id转number

				this.position = res[0]
				this.position.id = parseInt(this.position.id)

			})

		},
		filters: {
			sp(value) {
				return value.split(' ')
			}
		},
		methods: {

			toMap() {
				uni.navigateTo({
					url: '../map/index'
				})
			},
			scroll(e){
				
				if(timeOut) return
				timeOut=true
				setTimeout(()=>{
					timeOut=false
				},100)
				
				if(e.detail.scrollTop>50&&e.detail.deltaY<0){
					// console.log( '1',e.detail)
					if(this.enable) return
					this.enable=true;
					this.$nextTick(()=>{
						console.log(1)
						uni.pageScrollTo({
						    scrollTop:254,
						    duration: 300
						});
					})
				}
				
				
				
				
			},
			toTop(){
				
					uni.pageScrollTo({
						    scrollTop: 1,
						    duration: 300
						});
						setTimeout(()=>{
						this.enable=false
						},300)
					
				
			}
		}
	}
</script>

<style lang="scss">
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
		height: 60vh;
		display: flex;
		font-size: 14px;

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
			
			.card {
				
				box-sizing: border-box;
				width: 100%;
				height: 336rpx;
				margin-bottom: 30rpx;
				padding: 30rpx 0;
				padding-left: 60rpx;
				display: inline-block;
				background-color: white;
				border-radius: 10rpx;
				box-shadow: 1px 0px 6px #C8C7CC;
				position: relative;

				.bottom {
					height: 40%;
					box-sizing: border-box;
					padding-top: 20rpx;
					font-size: 16px;
					display: flex;
					align-items: center;
				}

				.text {
					height: 60%;
					width: 50%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

				}

			}
		}
	}
</style>
