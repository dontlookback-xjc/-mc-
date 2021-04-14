<template>
	<view class="mask" :class="{'active':maskShow}" >
		<view :class="{'gray':maskShow}" @click="$emit('maskClick');" @touchmove.stop=""></view>
		<view :class="{'blur':maskShow}" style="height: 100%;">
			<slot></slot>
		</view>
		
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				
			};
		},
		mounted(){
			
		},
		methods:{
			
		}
		,props:['maskShow']
	}
</script>

<style lang="scss">
	.active{
		height: 100vh;
		overflow-y: hidden;
	}
	.mask{
		
		
		.gray{
			width: 100%;
			height: 100%;
			position: absolute;
			top:0;
			background-color:rgba($color: #000000, $alpha:0.2);
			z-index: 2;
	
		}
		.blur{
			filter: blur(2px);
			
		}
		}
</style>
