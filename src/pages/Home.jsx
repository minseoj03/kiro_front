import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useUser } from '../context/UserContext'
import { AVAILABLE_COURSES, AI_RECOMMENDED_IDS, DAYS, HOURS, colorMap } from '../data/timetable'
import { analyzeCredits, getGraduationStatus, getExtraSemesterRisk } from '../api/academic'
import { getTimetable } from '../api/timetable'

function Home() {
  const { user } = useUser()
  const [credits, setCredits] = useState(null)
  const [graduation, setGraduation] = useState(null)
  const [extraSemester, setExtraSemester] = useState(null)
  const [timetableData, setTimetableData] = useState(null)
  const [loading, setLoading] = useState(true)

  // 백엔드에서 데이터 로드
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [creditsRes, gradRes, extraRes, ttRes] = await Promise.allSettled([
          analyzeCredits(),
          getGraduationStatus(),
          getExtraSemesterRisk(),
          getTimetable(),
        ])
        if (creditsRes.status === 'fulfilled') setCredits(creditsRes.value)
        if (gradRes.status === 'fulfilled') setGraduation(gradRes.value)
        if (extraRes.status === 'fulfilled') setExtraSemester(extraRes.value)
        if (ttRes.status === 'fulfilled') setTimetableData(ttRes.value)
      } catch (err) {
        console.error('데이터 로드 실패:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // 백엔드 데이터가 없으면 폴백(하드코딩) 사용
  const creditData = credits?.breakdown || {
    majorRequired: { earned: 18, required: 30 },
    majorElective: { earned: 20, required: 30 },
    generalRequired: { earned: 8, required: 12 },
    generalElective: { earned: 16, required: 28 },
  }
  const totalEarned = credits?.totalCredits?.earned || 62
  const totalRequired = credits?.totalCredits?.required || 130
  const completionRate = Math.round((totalEarned / totalRequired) * 100)

  // 시간표: 백엔드 데이터 또는 폴백
  const selectedCourses = timetableData?.schedule || AVAILABLE_COURSES.filter(c => AI_RECOMMENDED_IDS.includes(c.id))
  const timetableCredits = timetableData?.totalCredits || selectedCourses.reduce((sum, c) => sum + (c.credit || 3), 0)

  const getSlot = (day, hour) => selectedCourses.find(c => c.slots.some(s => s.day === day && s.hour === hour))

  return (
    <>
      <Navbar />
      <div className="mt-14 p-8 max-w-[1100px] mx-auto">

        {/* 환영 배너 */}
        <div className="bg-gradient-to-r from-green-700 via-green-600 to-green-400 rounded-2xl px-9 py-7 text-white flex items-center justify-between mb-7">
          <div>
            <h1 className="text-xl font-extrabold mb-1">안녕하세요, {user?.name || '사용자'}님 👋</h1>
            <p className="text-sm opacity-85">{user?.major || '전공 미설정'} · {user?.year || '?'}학년 · {user?.career || '진로 미설정'}</p>
          </div>
          <div className="text-5xl opacity-90">🌿</div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-gray-700">학점 이수 현황</h3>
          <button className="text-xs text-green-600 font-medium border border-green-200 rounded-lg px-3 py-1 hover:bg-green-50 transition">
            📄 이수표 재업로드
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
          <div className="flex items-center gap-9">
            {/* 도넛 차트 + 이수율 */}
            <div className="shrink-0 min-w-[110px]">
              <div className="text-sm text-gray-400 mb-2">전체 이수율</div>
              <div className="text-4xl font-extrabold text-gray-800 leading-none">{completionRate}<span className="text-2xl">%</span></div>
              <div className="text-xs text-gray-300 mt-1 mb-4">({totalEarned}/{totalRequired} 학점)</div>
              <div className="text-xs text-gray-500">• 졸업요건: <strong className="text-green-700">{totalRequired}학점</strong> 이상</div>
            </div>
            <div className="shrink-0">
              <svg width="140" height="140" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r="52" fill="none" stroke="#eee" strokeWidth="18" transform="rotate(-90 70 70)"/>
                <circle cx="70" cy="70" r="52" fill="none" stroke="#4285f4" strokeWidth="18" strokeDasharray="58.8 267.9" strokeDashoffset="0" transform="rotate(-90 70 70)"/>
                <circle cx="70" cy="70" r="52" fill="none" stroke="#34a853" strokeWidth="18" strokeDasharray="65.3 261.4" strokeDashoffset="267.9" transform="rotate(-90 70 70)"/>
                <circle cx="70" cy="70" r="52" fill="none" stroke="#fbbc04" strokeWidth="18" strokeDasharray="26.1 300.6" strokeDashoffset="202.6" transform="rotate(-90 70 70)"/>
                <circle cx="70" cy="70" r="52" fill="none" stroke="#a78bfa" strokeWidth="18" strokeDasharray="52.3 274.4" strokeDashoffset="176.5" transform="rotate(-90 70 70)"/>
              </svg>
            </div>
            {/* 범례 */}
            <div className="flex-1 flex flex-col gap-3.5">
              {[
                { color: 'bg-blue-500', label: '전공필수', earned: creditData.majorRequired.earned, required: creditData.majorRequired.required },
                { color: 'bg-green-600', label: '전공선택', earned: creditData.majorElective.earned, required: creditData.majorElective.required },
                { color: 'bg-yellow-400', label: '교양필수', earned: creditData.generalRequired.earned, required: creditData.generalRequired.required },
                { color: 'bg-purple-400', label: '교양선택', earned: creditData.generalElective.earned, required: creditData.generalElective.required },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${r.color}`} />
                    <span className="text-sm text-gray-600">{r.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">{r.earned} / {r.required}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${r.earned >= r.required ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                      {r.earned >= r.required ? '충족' : `-${r.required - r.earned}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 졸업 분석 요약 */}
          <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-xs text-gray-400 mb-1">졸업 가능 여부</div>
              <div className="text-sm font-bold text-yellow-600">{graduation?.canGraduate ? '✅ 가능' : '⚠️ 조건부 가능'}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-400 mb-1">예상 졸업</div>
              <div className="text-sm font-bold text-gray-800">{graduation?.graduationEstimate || '2026-2'}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-400 mb-1">부족 학점</div>
              <div className="text-sm font-bold text-red-500">{totalRequired - totalEarned}학점</div>
            </div>
          </div>
        </div>

        {/* 추가학기 경고 팝업 (조건부 표시) */}
        {(extraSemester?.extraSemesterRisk !== false) && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-7 flex items-start gap-3">
          <span className="text-lg">⚠️</span>
          <div>
            <div className="text-sm font-bold text-red-700 mb-1">추가학기 가능성 감지</div>
            <p className="text-xs text-red-600 leading-relaxed">{extraSemester?.extraSemesterReason || '현재 이수 속도 기준, 졸업 필수 과목이 남아있어 추가학기가 필요할 수 있어요. 다음 학기 로드맵을 확인해보세요.'}</p>
          </div>
        </div>
        )}

        {/* ═══ 커리큘럼 로드맵 + AI 시간표 2열 ═══ */}
        <div className="grid grid-cols-2 gap-5 mb-7">

          {/* ─── 커리큘럼 로드맵 (AI 생성 후 연결) ─── */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-gray-700">🗺️ 커리큘럼 로드맵</span>
              <a href="/roadmap" className="text-xs text-green-600 font-medium">전체 보기 →</a>
            </div>

            <div className="flex items-center justify-center h-48 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <div className="text-center">
                <div className="text-3xl mb-2">🗺️</div>
                <p className="text-sm text-gray-400 font-medium">AI가 로드맵을 생성 중이에요</p>
                <p className="text-xs text-gray-300 mt-1">로그인 정보 기반으로 분석 후 표시됩니다</p>
              </div>
            </div>
          </div>

          {/* ─── AI 추천 시간표 ─── */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-gray-700">📅 AI 추천 시간표</span>
              <a href="/timetable" className="text-xs text-green-600 font-medium">수정하기 →</a>
            </div>

            <div className="inline-flex items-center gap-1 text-[11px] text-green-700 font-semibold bg-green-50 border border-green-200 rounded-lg px-2 py-0.5 mb-3">✦ AI 생성 완료</div>

            {/* 시간표 미니 그리드 */}
            <div className="grid grid-cols-[32px_repeat(5,1fr)] gap-0.5">
              <div />
              {DAYS.map(d => <div key={d} className="text-center text-[10px] font-bold text-gray-400 py-1">{d}</div>)}
              {HOURS.map(h => (
                <>
                  <div key={`t-${h}`} className="text-[9px] text-gray-300 text-right pr-1 flex items-center justify-end h-6">{h}</div>
                  {DAYS.map((_, di) => {
                    const slot = getSlot(di, h)
                    return (
                      <div key={`${di}-${h}`} className={`h-6 rounded-sm ${slot ? colorMap[slot.color] + ' flex items-center px-1' : 'bg-gray-50'}`}>
                        {slot && <span className="text-[9px] font-semibold truncate">{slot.name}</span>}
                      </div>
                    )
                  })}
                </>
              ))}
            </div>

            {/* 시간표 요약 */}
            <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
              <span>{selectedCourses.length}과목 · {timetableCredits}학점</span>
              <span className="text-green-600 font-medium">금요일 공강 ✓</span>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Home
