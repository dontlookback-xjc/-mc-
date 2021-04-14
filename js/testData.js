var right = []
var left = []
let i = 0
while (i < 9) {

	right.push({
		name: '炸鸡小食桶',
		price: 39,
		
		detail: {regular:['巨无霸', '大薯条'],custom:{
			drink:['可乐'],snack:[],others:[]
		}}, 
		num: 0,
		custom: [{
				text: '去定制',
				button: 'arrowright'
			},
			{
				text: '去定制',
				button: 'plus'
			},
		]
	})
	left.push({
		text: '鸡肉 汉堡包'
	})
	i++
}

export {
	left as l, right as r
}
