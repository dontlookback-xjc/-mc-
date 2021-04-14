<template>
	<view class="content" >
		<view class="left"> <label @click="e">图标</label >
		<text class="num">{{num}}</text>
		<text class="price"> ￥{{price}}</text>
		</view>
		<view class="right">
			选好了<uni-icons style="display: inline;" type="arrowright"></uni-icons>
			</view>
		</view>
</template>

<script>
	export default {
		name:"cart",
		data() {
			return {
				
			};
		},
		methods:{
			e(){
				
				this.$emit('showDetail')
			}
		},
		computed:{
			
			num(){
				return this.cart.reduce((num,item)=>{
					return num+item.num
				},0)
				
			},
			price(){
				return this.cart.reduce((price,item)=>{
					return price+item.price*item.num
				},0)
			}
		},
		created(){
			console.log(this.cart)
		},
		props:['cart']
	}
</script>

<style lang="scss">
$width:18px;
.content{
		
		width: 100%; background-color: white;
		display: flex;
		padding: 0 30rpx;
		box-sizing: border-box;
		height: 122rpx;
		justify-content: space-between;
		align-content: center;
		flex-wrap: wrap;
		.left{
			height: 30px;
			line-height: 30px;
			.num{
				display: inline-block;

				border: 1px solid black;
			
				border-radius:($width/2+0.5px) ;
				width: $width;
				height: $width;
				top: -12px;
				font-size: 10px;
				position: relative;
				text-align: center;
				line-height: $width;
				
			}
			.price{
				margin-left: 60rpx;
				
				font-size: 22px;
			}
		}
		
		.right{
			background-color: rgb(244,190,67);
			
			border-radius: 40rpx;
			width: 160rpx;
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
		}
	}
</style>
