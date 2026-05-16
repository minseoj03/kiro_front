import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { initDB } from './db/init.js'
import userRouter from './routes/user.js'
import academicRouter from './routes/academic.js'
import aiRouter from './routes/ai.js'
import timetableRouter from './routes/timetable.js'
import courseRouter from './routes/course.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

// ─── 미들웨어 ───
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())

// ─── DB 초기화 ───
initDB()

// ─── 라우터 ───
app.use('/api/user', userRouter)
app.use('/api/academic', academicRouter)
app.use('/api/ai', aiRouter)
app.use('/api/timetable', timetableRouter)
app.use('/api/courses', courseRouter)

// ─── 서버 상태 확인 ───
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ─── 에러 핸들링 ───
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message)
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  })
})

app.listen(PORT, () => {
  console.log(`🚀 smroad server running on http://localhost:${PORT}`)
})
