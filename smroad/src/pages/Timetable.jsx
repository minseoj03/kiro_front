import Navbar from '../components/Navbar'

const courses = [
  { name: '데이터베이스', room: '순헌관 301', credit: 3, color: 'green', slots: [{ day: 0, hour: 9 }, { day: 2, hour: 9 }] },
  { name: '컴퓨터네트워크', room: '정보과학관 201', credit: 3, color: 'blue', slots: [{ day: 1, hour: 10 }, { day: 3, hour: 10 }] },
  { name: '알고리즘', room: '순헌관 205', credit: 3, color: 'purple', slots: [{ day: 1, hour: 11 }, { day: 3, hour: 11 }] },
  { name: '소프트웨어공학', room: '정보과학관 105', credit: 3, color: 'orange', slots: [{ day: 0, hour: 13 }, { day: 3, hour: 13 }] },
  { name: '영어회화', room: '명신관 402', credit: 2, color: 'teal', slots: [{ day: 1, hour: 14 }] },
]

const days = ['월', '화', '수', '목', '금']
const hours = [9, 10, 11, 12, 13, 14, 15]

const colorMap = {
  green: 'bg-green-50 border-l-[3px] border-green-600 text-green-900',
  blue: 'bg-blue-50 border-l-[3px] border-blue-600 text-blue-900',
  purple: 'bg-purple-50 border-l-[3px] border-purple-600 text-purple-900',
  orange: 'bg-orange-50 border-l-[3px] border-orange-500 text-orange-900',
  teal: 'bg-teal-50 border-l-[3px] border-teal-600 text-teal-900',
}

const barColorMap = {
  green: 'bg-green-600', blue: 'bg-blue-600', purple: 'bg-purple-600', orange: 'bg-orange-500', teal: 'bg-teal-600',
}

function Timetable() {
  const getSlot = (day, hour) => courses.find(c => c.slots.some(s => s.day === day && s.hour === hour))

  return (
    <>
      <Navbar />
      <div className="mt-14 p-8 max-w-[1100px] mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-extrabold text-green-900">📅 시간표 <span className="text-sm text-gray-400 font-normal">2025년 2학기</span></h1>
          <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-3.5 py-1.5 text-sm text-green-700 font-semibold">✦ AI 추천 시간표</div>
        </div>

        {/* 선호 설정 */}
        <div className="flex gap-2 flex-wrap mb-6">
          {['🌅 오전 수업 선호', '🍱 점심시간 확보', '🔗 연강 허용'].map(p => (
            <span key={p} className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-green-700 text-white">{p}</span>
          ))}
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold border border-gray-200 text-gray-400">📅 공강 요일</span>
        </div>

        {/* 시간표 그리드 */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="grid grid-cols-[52px_repeat(5,1fr)]">
            <div className="p-3 text-center text-[11px] text-gray-300 bg-gray-50 border-b-2 border-green-100 border-r border-gray-100">시간</div>
            {days.map(d => <div key={d} className="p-3 text-center text-sm font-bold text-green-700 bg-lime-50 border-b-2 border-green-100 border-r border-gray-100 last:border-r-0">{d}</div>)}
            {hours.map(h => (
              <>
                <div key={`h-${h}`} className="text-[10px] text-gray-300 flex items-start justify-end pr-2 pt-1.5 h-[60px] border-r border-gray-100 border-b border-gray-100">{h}:00</div>
                {days.map((_, di) => {
                  const c = getSlot(di, h)
                  return (
                    <div key={`${di}-${h}`} className={`h-[60px] border-r border-gray-100 border-b border-gray-100 last:border-r-0 p-0.5 ${h === 12 ? 'bg-green-50/30' : ''}`}>
                      {c && (
                        <div className={`rounded-lg px-2 py-1 h-full flex flex-col justify-center ${colorMap[c.color]}`}>
                          <div className="text-[11px] font-bold">{c.name}</div>
                          <div className="text-[10px] opacity-70">{c.room}</div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </>
            ))}
          </div>
        </div>

        {/* 수강 과목 목록 */}
        <h3 className="text-base font-bold text-gray-800 mb-3">수강 과목 <span className="text-sm text-gray-300 font-normal">총 14학점 · 5과목</span></h3>
        <div className="grid grid-cols-3 gap-3.5 mb-6">
          {courses.map(c => (
            <div key={c.name} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3.5">
              <div className={`w-1 h-11 rounded ${barColorMap[c.color]}`} />
              <div className="flex-1">
                <div className="text-sm font-bold text-gray-800">{c.name}</div>
                <div className="text-xs text-gray-400">{c.room}</div>
              </div>
              <div className="text-base font-extrabold text-green-700">{c.credit}학점</div>
            </div>
          ))}
        </div>

        {/* 버튼 */}
        <div className="flex gap-2.5 justify-end">
          <button className="px-5 py-2.5 rounded-xl text-sm font-bold bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 transition">+ 강좌 추가</button>
          <button className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-green-700 to-green-600 text-white shadow-lg shadow-green-700/30 hover:-translate-y-0.5 transition">✦ AI 시간표 재생성</button>
        </div>
      </div>
    </>
  )
}

export default Timetable
