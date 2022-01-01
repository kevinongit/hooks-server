let express = require('express')
let app = express()
let bodyParser = require('body-parser')

///
const path = require('path')
const glob = require('glob')
const files = glob.sync('public/faces/*.*')
const url = 'http://localhost:8080/'
const uFiles = files.map(i => url + i)
console.log(uFiles)

const cors = require('cors')
app.use(cors({origin: '*'}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const port = process.env.PORT || 8080
let router = express.Router()

app.use('/public', express.static(path.join(__dirname, 'public')))
router.use(function (req, res, next) {
  console.log('a new request')
  next()
})
router.get('/', function (req, res) {
  res.json({message: 'Hellow World'})
})

router.route('/faces/:count').get(function (req, res) {
  let count = req.params.count
  if (count < 0 || count > uFiles.length) {
    count = 1
  }
  console.log(`count : ${count}`)
  const list = uFiles.slice(0, count)
  console.log(list)
  res.json(list)

  // res.json({message: `received count is ${count}`})
})

app.use('/api', cors(), router)

app.listen(port)
console.log(`imready at ${port}`)
