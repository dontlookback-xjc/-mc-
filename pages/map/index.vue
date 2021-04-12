<template>
	<view>
		<map style="width: 100%; height: 300px;" :longitude="location.longitude" :latitude="location.latitude"
			 @markertap="m2" :markers="markers"></map>
	</view>
</template>

<script>
	import map from "../../js/map.js"
	export default {
		data() {
			return {
				
				location: {
					longitude: undefined,
					latitude: undefined
				},
				markers:[]
			}
		},
		
		created() {
			uni.getLocation({
				type: 'gcj02',
				success: (res) => {
					let l = this.location;
					l.latitude = res.latitude
					l.longitude = res.longitude

				}
			});
			
			map.search('麦当劳', (res) => {
				// 注意id转number
			
				res.forEach(item => {
					item.id = parseInt(item.id)
				})
			
				this.markers = res
				console.log(this.markers)
				
			})

		},
		methods: {
		
			m2(e){
			
				let id=e.detail.markerId
				for(let item of this.markers){
					if(item.id===id){
						uni.setStorage({
							key:'lastPostion',
							data:item
						})
						 uni.$emit('setPosition',item)
						 uni.navigateBack()
						 return
					}
				}
				
				console.log('m2',e)
			},
		}

	}
</script>

<style>
</style>
