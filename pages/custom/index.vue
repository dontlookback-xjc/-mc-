<template>
	<view style="padding-bottom: 200rpx;">
		<!-- 主食 -->
		<view class="border" v-for="(item,index) in goods.detail.regular">
			{{item}}
		</view>

		<!-- 附加品 --><!-- {drink snack other} -->	
		<view v-for="(other,name) in goods.detail.custom">

			<!-- [可乐，奶茶] -->
			<view v-for="(item,index) in other">
				
			
					<view style="display: flex;justify-content: space-between;">
						<view>l{{goods.detail.custom.drink[0]}}</view>
						<view>r</view>
					</view>
					<view class="border ">
						<radio-group @change="radioChange($event,index,name)" style="width: 750rpx;height:300rpx;">
							<swiper style="height: 100%;width: 750rpx;" duration="300">

								<swiper-item v-for="(value,key) in priceType[name]" :key="key">
									<view class="others">{{key}}</view>
									<view style="text-align: center;">
										<label class="radio">
											<radio :checked="item==key" :value="key" />
										</label>

									</view>
								</swiper-item>

							</swiper>
						</radio-group>

				
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="row">
				<view>单价 ￥{{price}}</view>
				<view>
					<uni-icons type="minus" @click="sub"></uni-icons>
					<label for="" style="margin: 0 20rpx;">{{goods?goods.num:''}}</label>
					<uni-icons type="plus" @click="add"></uni-icons>
				</view>
			</view>
			<view class="row">
				<view>合计 ￥{{goods?price*goods.num:''}}</view>
				<view class="submit" @click="submit">
					选好了<uni-icons style="display: inline;" type="arrowright"></uni-icons>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods: undefined,
				priceType: {
					drink:{
					可乐: 0,
					奶茶: 2
					}
					
				},



			}
		}

		,
		created() {


		},
		computed: {
			price() {
				
				if (this.goods) {
				
					let othersPrice=0
					for(let key in this.goods.detail.custom) {
						
						this.goods.detail.custom[key].forEach( value => {
											
							othersPrice += this.priceType[key][value]
						})
						
					}
					
					return this.goods.price + othersPrice
				}
				return 0

			}


		},
		methods: {
			radioChange(e, index, name) {
				let r=this.goods.detail;
			
				r.custom[name].splice(index,1,e.detail.value)
				
			

			},
			submit() {
				uni.$emit('custom', Object.assign(this.goods, {
					price: this.price
				}))
				uni.navigateBack({

				})
			},
			add() {
				this.goods.num++
			},
			sub() {
				this.goods.num--
			}
		},
		onLoad(option) {

			const eventChannel = this.getOpenerEventChannel()

			eventChannel.on('acceptDataFromOpenerPage', (data) => {
				var obj = {}
				obj=JSON.parse(JSON.stringify(data))	
				
				// for (let key in data) {
				// 	if (data.hasOwnProperty(key)) {
				// 		if(typeof data[key]=='object')
				// 			obj[key] = data[key]
				// 	}
				// }
				obj.num = 1
				this.goods = obj
				console.log(this.goods)

			})

		}
	}
</script>

<style lang="scss">
	.border {
		border-bottom: 1px solid #f5f4f9;
		height: 300rpx;
		display: flex;
		// align-content: center;
		// flex-wrap: wrap;
		align-items: center;
		justify-content: center;

		.others {
			
			text-align: center;
font-size: 18px;
			border: 1px solid double;
		}


	}

	.bottom {
		position: fixed;
		bottom: 0;
		width: 100%;

		.row {
			padding: 30rpx;
			display: flex;
			box-sizing: border-box;
			height: 122rpx;
			justify-content: space-between;
			align-content: center;
			flex-wrap: wrap;

			.submit {
				background-color: rgb(244, 190, 67);

				border-radius: 40rpx;
				width: 160rpx;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
			}
		}

	}
</style>
