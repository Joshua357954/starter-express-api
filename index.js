const express= require('express')
const cors = require('cors')
const app =express()
const Routes= require('./app')
const { storyJob1 } = require('./backgroundService/storyJob.js')

const PORT= process.env.PORT || 5001

const cors_options = {
	pingTimeout : 60000,
	cors : {
		origin:'http://localhost:3000'
	}
}

// tabnine
// Middleware
app.use(cors())

app.use(express.json())

app.use('/api',Routes)



// Make Backend Props Validation tool like (joi)
app.get('/', (req,res) => {

	res.send("Welcome to Memoriez Api , V 1.0")

})



// All Jobs ...
function runBackgroundService () {
	storyJob1()
}

// Service Runner
// setInterval( runBackgroundService , 1000)




const server = app.listen(PORT,() => console.log("Server is running on PORT :",PORT))

const io = require('socket.io')(server, cors_options )

io.on("connection",(socket) => {
	console.log(`Connected to socket : `,socket?.id)

	socket.on('setup', (userInfo) => {
		socket.join(userInfo?.id || 0)
		console.log("User ID Don SET ",userInfo?.username)
		socket.emit('connected', userInfo?.id)
	})

	socket.on('join chat', (convId) => {
		socket.join(convId)
		socket.emit('joined chat', convId)
	})

	socket.on('send message', ({toSocket:mesg,recipient}) => {
		socket.broadcast.emit('new message', mesg)
		console.log("Found Message ,",mesg)
		socket.to(recipient).emit('new-chat-arrival', recipient)
	})

})
