const router = require('express').Router()
const UserController = require('../controllers/userController')
const sessionController = require('../controllers/sessionController')
const { authenticate, authorize } = require('../middlewares/auth')

// 1. Register.
// Pastikan email yang sama tidak dapat register, dan terdapat requirement password confirmation.
router.post('/register', UserController.register) // done

// 2. Login
// Pastikan login membalikan token (JWT) untuk login.
router.post('/login', UserController.login) // done

// 3. List Session
// Pastikan terdapat filter berdasarkan user pembuat data session, keyword, dan durasi. Pastikan juga terdapat sorting data. Dan pastikan response nya terdapat data user yang membuat session tersebut.
router.get('/sessions/user/:user', sessionController.showAllByUser) // done
router.get('/sessions/keyword/:keyword', sessionController.showAllByKeyword) // done
router.get('/sessions/duration/:durasi', sessionController.showAllByDurasi) // done

// 4. Detail Session
// Pastikan ketika sesi nya tidak ada, terdapat pesan error dari API. Dan pastikan response nya terdapat data user yang membuat session tersebut.
router.get('/sessions/detail/:id', sessionController.findId) // done

router.use(authenticate)

// 5. Create Session
// Pastikan Endpoint ini hanya dapat diakses ketika menggunakan token, dan userID didapatkan dari token, bukan dari input manual di API.
router.post('/sessions', sessionController.addPost)  // done

// 6. Update Session
// Pastikan Endpoint ini hanya dapat diakses ketika menggunakan token, dan hanya dapat update session yang user tersebut buat saja.
router.put('/sessions/:id', authorize, sessionController.update) // done

// 7. Delete Session
// Pastikan Endpoint ini hanya dapat diakses ketika menggunakan token, dan hanya dapat hapus session yang user tersebut buat saja.
router.delete('/sessions/:id', authorize, sessionController.delete) // done

module.exports = router