var HtmlWebpackPlugin=require('html-webpack-plugin');
var ExtractTextPlugin=require('extract-text-webpack-plugin');
var CleanWebpackPlugin=require('clean-webpack-plugin');
var isProd=process.env.NODE_ENV==='production';
var cssDev=['style-loader','css-loader','sass-loader'];
var cssProd=ExtractTextPlugin.extract({
	fallback:'style-loader',
	use:['css-loader','sass-loader']
})
var cssConfig=isProd?cssProd:cssDev;
const path=require('path')
let pathsToClean=[
	'dist',
]
module.exports={
	entry:/*'./src/app.js',*/
		{
			"app.bundle":'./src/app.js',
			'contact':'./src/contact.js'
		},
	output:{
		/*path:__dirname + '/dist',
		filename:'../dist/app.bundle.js'*/
		path: path.resolve(__dirname, 'dist'),
   		filename: '[name].[hash].js'
	},
	plugins:[new HtmlWebpackPlugin({
		template:'./index.html',
		filename:'index.html',
		minify:{
			collapseWhitespace:true,
		},
		hash:true,
		excludeChunks:['contact']
	}),
	new HtmlWebpackPlugin({
		template:'./contact.html',
		filename:'contact.html',
		minify:{
			collapseWhitespace:true,
		},
		hash:true,
		chunks:['contact']
	}),
		new ExtractTextPlugin({
			filename:'style.css',
			disable:!isProd
		}),
		new CleanWebpackPlugin(pathsToClean)
	],
	/*module:{
		rules:[
			{
				test:/\.css$/,
				use:['style-loader','css-loader']
			},
			{
				test:/\.scss$/,
				use:['style-loader','css-loader','sass-loader']
			}
		]
	}*/
	module:{
		rules:[
			{
        		test: /\.css$/,
        		use: ExtractTextPlugin.extract({
          		use: 'css-loader',
          		fallback: 'style-loader'
        		})
      		},
			{
				test:/\.s(a|c)ss$/,
				/*use:ExtractTextPlugin.extract({
				fallback:'style-loader',
				use:['css-loader','sass-loader']
				})*/
/*				use:['style-loader','css-loader','sass-loader']
*/
				use:cssConfig	
			},
			{
				test:/\.(png|gif|jpe?g|svg)$/i,
				use:[
					{
						loader:'file-loader',
						options:{
							name:'[name].[ext]',
							outputPath:'images/'
						}
					},
					{
						loader:'image-webpack-loader',
						options:{
							bypassOnDebug:true,
						}
					}
				]
			},
			/*{
				test:/\.html$/,
				use:[{
					loader:'html-loader',
					options:{
						minimize:true
					}
				}],
			},*/
			/*{
				test:/\.pug$/,loader:['raw-loader','pug-html-loader']
			},*/
			{test:/\.js$/,loader:'babel-loader',exclude:/node_modules/},
			{test:/\.jsx$/,loader:'babel-loader',exclude:/node_modules/}
		]
	},
	devServer:{
		port:7000,
		open:true,
		hot:true
	}
};