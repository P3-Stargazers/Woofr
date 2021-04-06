const orm = require('./db/orm.mongoose')
const sessionManager = require('./session-manager')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

// session checking middleware
async function authRequired(req, res, next) {
   // check session set, and it's valid
   const sessionData = sessionManager.verifyAndLoad(req.headers.session)
   if (!sessionData) {
      console.log(`[${req.method} ${req.url}] .. [authRequired] invalid session, refusing (403)`)
      res.status(403).send({ status: false, message: 'Requires valid session. Please login again.' })
      return
   }
   console.log(`[${req.method} ${req.url}] .. [authRequired] session GOOD`)
   // session was good, pass info on, let's continue endpoint processing...
   req.sessionData = sessionData
   next()
}


function router(app, API_URL) {
   // OAUTH Authentication --------------------------------------------
   async function createOAuthSession({ type, authId, name, thumbnail }) {
      console.log(`[createOAuthSession] called for ${name}`);

      // register user in system (if they aren't there, and get the associated session)
      const { status, message, userData } = await orm.userOAuthRegister({ type, authId, name, thumbnail })

      const session = sessionManager.create(userData.id)
      // returns the logged-in user info to javascript
      return { status, session, userData, message };
   }
   // oAuth - list providers we'll accept .env info for
   // generates the ENDpoints
   require('./oAuth')(app, API_URL, ['twitter', 'google', 'facebook', 'github', 'linkedin'], createOAuthSession)
   // ---------------------------------------------------------------------

   app.post('/api/users/register', async function (req, res) {
      console.log('[POST /api/users/register] request body:', req.body)
      const { status, userData, message } = await orm.userRegister(req.body)
      if (!status) {
         res.status(403).send({ status, message }); return
      }

      // generate a session-key
      const session = sessionManager.create(userData.id)
      console.log(`.. registration complete! session: ${session}`)

      res.send({ status, session, userData, message })
   })

   app.post('/api/users/login', async function (req, res) {
      console.log('[POST /api/users/login] req.body:', req.body)
      const { status, userData, message } = await orm.userLogin(req.body.email, req.body.password)
      if (!status) {
         res.status(403).send({ status, message }); return
      }

      // generate a session-key
      const session = sessionManager.create(userData.id)
      // console.log( `.. login complete! session: ${session}` )
      res.send({ status, session, userData, message })
   })

   app.put('/api/users/buyers/:id', async function (req, res) {
      const userId = req.params.id
      console.log(`[POST /api/users/buyer/${userId}] req.body:`, req.body)
      const { status, userData, message } = await orm.createBuyer(userId, req.body)
      if (!status) {
         res.status(403).send({ status, message }); return
      }
      res.send({ status, userData, message })
   })

   app.put('/api/users/sellers/:id', async function (req, res) {
      const userId = req.params.id
      console.log(`[POST /api/users/sellers/${userId}] req.body:`, req.body)
      const { status, userData, message } = await orm.createSeller(userId, req.body)
      if (!status) {
         res.status(403).send({ status, message }); return
      }
      res.send({ status, userData, message })
   })

   app.put(`/api/users/images/:id`, upload.single('image'), async function (req, res) {
      const userId = req.params.id
      console.log(`RIGHT HERE--------------------->`, req.file)
      const response = await orm.addSellerImage(userId, req.file)
      res.send("ya")
   })

   app.get('/api/users/session', authRequired, async function (req, res) {
      const { status, userData, message } = await orm.userSession(req.sessionData.userId)
      if (!status) {
         res.status(403).send({ status, message }); return
      }

      // console.log( `.. login complete! session: ${session}` )
      res.send({ status, session, userData, message })
   })

   // all these endpoints require VALID session info
   app.get('/api/users/logout', authRequired, async function (req, res) {
      sessionManager.remove(req.header.session)
      console.log(` .. removed session ${req.header.session}`)
      res.send({ status: true, message: 'Logout complete' })
   })

   app.get('/api/products/:id?', authRequired, async function (req, res) {
      const productId = req.params.id
      const { status, products, message } = await orm.productList(productId) // req.sessionData.userId
      console.log(` .. got ${products.length} tasks for ownerId(${req.sessionData.userId})`)
      res.send({ status, products, message })
   })

   app.post('/api/products', authRequired, async function (req, res) {
      const newProduct = req.body.task
      const { status, products, message } = await orm.productSaveAndList(newProduct, req.sessionData.userId)
      console.log(` .. updated with '${newProduct}' for ownerId(${req.sessionData.userId})`)
      res.send({ status, products, message })
   })

   app.get('/api/sellers', async function (req, res) {
      const sellerData = await orm.getSellers()
      res.send(sellerData)
   })

   app.get('/api/matches/:id', async (req, res) => {
      const id = req.params.id
      console.log(`testinggernf`, id)
      const getMatchData = await orm.getMatches(id)
      res.send(getMatchData)
   })

   app.post('/api/matches', async (req, res) => {
      console.log(`[USERS ID]`, req.body)
      let sellerID = req.body.sellerid
      let userID = req.body.userid
      const sellerMatch = await orm.newMatch(sellerID, userID)
      res.send(sellerMatch)
   })
}

module.exports = router