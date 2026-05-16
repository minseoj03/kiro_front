import { useState } from 'react'
import Navbar from '../components/Navbar'

const reqData = [
  { label: '전공필수', val: 18, total: 30, pct: 60 },
  { label: '전공선택', val: 20, total: 30, pct: 67 },
  { label: '교양필수', val: 8, total: 12, pct: 67 },
  { label: '교양선택', val: 16, total: 28, pct: 57 },
]

const missingCourses = [
  { name: '소프트웨어공학', type: '전공필수', credit: 3, year: '3학년' },
  { name: '캡스톤디자인', type: '전공필수', credit: 3, year: '4학년' },
  { name: '글쓰기와 표현', type: '교양필수', credit: 2, year: '1학년' },
]

const currentCourses = [
  { name: '데이터베이스', type: '전공필수', credit: 3 },
  { name: '컴퓨터네트워크', type: '전공선택', credit: 3 },
  { name: '알고리즘', type: '전공필수', credit: 3 },
  { name: '소프트웨어공학', type: '전공필수', credit: 3 },
  { name: '영어회화', type: '교양필수', credit: 2 },
]

const gradTimeline = [
  { sem: '2022-1', label: '프로그래밍 기초, 이산수학 외', credit: 18, pct: 100 },
  { sem: '2022-2', label: '자료구조, 회계원리 외', credit: 18, pct: 100 },
  { sem: '2023-1', label: '마케팅원론, 통계학 입문 외', credit: 16, pct: 100 },
  { sem: '2023-2', label: '운영체제, 재무관리 외', credit: 18, pct: 100 },
  { sem: '2025-1', label: '데이터베이스, 알고리즘 외', credit: 14, pct: 100, current: true },
  { sem: '2025-2', label: '머신러닝, 경영전략 외 (예정)', credit: 15, pct: 85, future: true },
  { sem: '2026-1', label: '캡스톤디자인 외 (예정)', credit: 12, pct: 60, future: true },
  { sem: '2026-2', label: '졸업 요건 충족 예정 🎓', credit: 5, pct: 30, future: true },
]

function Curriculum() {
  const [tab, setTab] = useState('overview')

  return (
    <>
      <Navbar />
      <div className="mt-14 p-8 max-w-[1100px] mx-auto">
        <div className="mb-6">
          <h1 className="text-xl font-extrabold text-green-900 mb-1">📊 커리큘럼 기반 학업 현황</h1>
          <p className="text-sm text-gray-400">2025년 1학기 기준 · 컴퓨터과학전공</p>
        </div>

        {/* 탭 */}
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm w-fit mb-6">
          {[{ key: 'overview', label: '전체 요약' }, { key: 'major', label: '전공 이수' }, { key: 'liberal', label: '교양 이수' }, { key: 'grad', label: '졸업 예상' }].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${tab === t.key ? 'bg-green-700 text-white' : 'text-gray-400 hover:bg-green-50 hover:text-green-700'}`}>{t.label}</button>
          ))}
        </div>

        {tab === 'overview' && (
          <>
            {/* 요건 카드 */}
            <div className="grid grid-cols-4 gap-3.5 mb-7">
              {reqData.map(r => (
                <div key={r.label} className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide mb-2">{r.label}</div>
                  <div className="text-2xl font-extrabold text-green-700">{r.val}</div>
                  <div className="text-xs text-gray-300 mt-0.5 mb-2.5">/ {r.total}학점</div>
                  <div className="h-1.5 bg-green-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-700 to-green-400 rounded-full" style={{ width: `${r.pct}%` }} />
                  </div>
                  <div className={`text-[11px] font-bold mt-2 ${r.pct >= 70 ? 'text-green-600' : r.pct >= 50 ? 'text-yellow-600' : 'text-red-500'}`}>{r.total - r.val}학점 남음</div>
                </div>
              ))}
            </div>

            {/* 미이수 필수 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm mb-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-gray-800">⚠️ 미이수 필수 과목</h2>
                <span className="text-[11px] font-bold bg-red-50 text-red-500 px-2.5 py-1 rounded-lg">{missingCourses.length}과목 미이수</span>
              </div>
              <table className="w-full">
                <thead><tr className="text-[11px] text-gray-300 font-bold uppercase tracking-wide border-b-2 border-gray-100"><th className="text-left py-2 px-3">과목명</th><th className="text-left py-2 px-3">구분</th><th className="text-left py-2 px-3">학점</th><th className="text-left py-2 px-3">권장 학년</th></tr></thead>
                <tbody>
                  {missingCourses.map(c => (
                    <tr key={c.name} className="border-b border-gray-50 hover:bg-green-50/30 text-sm text-gray-600"><td className="py-2.5 px-3">{c.name}</td><td className="py-2.5 px-3">{c.type}</td><td className="py-2.5 px-3">{c.credit}</td><td className="py-2.5 px-3">{c.year}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 현재 수강 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-gray-800">📚 현재 수강 중</h2>
                <span className="text-[11px] font-bold bg-green-50 text-green-700 px-2.5 py-1 rounded-lg">2025-1 · 14학점</span>
              </div>
              <table className="w-full">
                <thead><tr className="text-[11px] text-gray-300 font-bold uppercase tracking-wide border-b-2 border-gray-100"><th className="text-left py-2 px-3">과목명</th><th className="text-left py-2 px-3">구분</th><th className="text-left py-2 px-3">학점</th><th className="text-left py-2 px-3">상태</th></tr></thead>
                <tbody>
                  {currentCourses.map(c => (
                    <tr key={c.name} className="border-b border-gray-50 hover:bg-green-50/30 text-sm text-gray-600"><td className="py-2.5 px-3">{c.name}</td><td className="py-2.5 px-3">{c.type}</td><td className="py-2.5 px-3">{c.credit}</td><td className="py-2.5 px-3"><span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded">수강 중</span></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'grad' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-gray-800">🎓 졸업 예상 플랜</h2>
              <span className="text-[11px] font-bold bg-green-50 text-green-700 px-2.5 py-1 rounded-lg">예상 졸업 2026-2</span>
            </div>
            <div className="flex flex-col gap-3">
              {gradTimeline.map(r => (
                <div key={r.sem} className="flex items-center gap-4">
                  <div className={`text-xs font-bold w-16 shrink-0 ${r.current ? 'text-green-700' : 'text-green-600'}`}>{r.sem} {r.current && '◀'}</div>
                  <div className="flex-1 bg-green-100 rounded-lg h-8 overflow-hidden">
                    <div className={`h-full rounded-lg flex items-center px-3 ${r.future ? 'bg-gradient-to-r from-green-200 to-green-100' : r.current ? 'bg-gradient-to-r from-green-600 to-green-400 ring-2 ring-green-200' : 'bg-gradient-to-r from-green-700 to-green-400'}`} style={{ width: `${r.pct}%` }}>
                      <span className="text-[11px] font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis">{r.label}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 w-14 text-right shrink-0">{r.credit}학점</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'major' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-800">💻 전공 이수 현황</h2>
              <span className="text-[11px] font-bold bg-green-50 text-green-700 px-2.5 py-1 rounded-lg">38 / 60학점</span>
            </div>
            <p className="text-sm text-gray-400">전공필수 + 전공선택 합산 기준</p>
          </div>
        )}

        {tab === 'liberal' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-800">📖 교양 이수 현황</h2>
              <span className="text-[11px] font-bold bg-yellow-50 text-yellow-600 px-2.5 py-1 rounded-lg">24 / 40학점</span>
            </div>
            <p className="text-sm text-gray-400">교양필수 + 교양선택 합산 기준</p>
          </div>
        )}
      </div>
    </>
  )
}

export default Curriculum
