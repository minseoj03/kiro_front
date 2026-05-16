import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'data', 'smroad.db')

let db

export function getDB() {
  if (!db) {
    const dir = path.dirname(DB_PATH)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    db = new Database(DB_PATH)
    db.pragma('journal_mode = WAL')
  }
  return db
}

export function initDB() {
  const db = getDB()

  db.exec(`
    -- 사용자 테이블
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      major TEXT,
      year INTEGER DEFAULT 1,
      semester INTEGER DEFAULT 1,
      career TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 학업 프로필
    CREATE TABLE IF NOT EXISTS academic_profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER UNIQUE NOT NULL,
      total_earned INTEGER DEFAULT 0,
      total_required INTEGER DEFAULT 130,
      major_required_earned INTEGER DEFAULT 0,
      major_required_total INTEGER DEFAULT 30,
      major_elective_earned INTEGER DEFAULT 0,
      major_elective_total INTEGER DEFAULT 30,
      general_required_earned INTEGER DEFAULT 0,
      general_required_total INTEGER DEFAULT 12,
      general_elective_earned INTEGER DEFAULT 0,
      general_elective_total INTEGER DEFAULT 28,
      can_graduate INTEGER DEFAULT 0,
      extra_semester_risk INTEGER DEFAULT 0,
      extra_semester_reason TEXT,
      graduation_estimate TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    -- 이수 과목
    CREATE TABLE IF NOT EXISTS completed_courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      course_id TEXT NOT NULL,
      course_name TEXT,
      category TEXT,
      credit INTEGER,
      grade TEXT,
      year INTEGER,
      semester INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    -- 시간표
    CREATE TABLE IF NOT EXISTS timetables (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      semester TEXT NOT NULL,
      schedule TEXT NOT NULL,
      total_credits INTEGER DEFAULT 0,
      is_ai_generated INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    -- 로드맵
    CREATE TABLE IF NOT EXISTS roadmaps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      roadmap_data TEXT NOT NULL,
      career TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `)

  console.log('✅ Database initialized')
}
