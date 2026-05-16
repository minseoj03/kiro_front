import Navbar from '../components/Navbar'

function Home() {
  return (
    <>
      <Navbar />
      <div className="mt-14 p-8 max-w-[1100px] mx-auto">

        {/* 환영 배너 */}
        <div className="bg-gradient-to-r from-green-700 via-green-600 to-green-400 rounded-2xl px-9 py-7 text-white flex items-center justify-between mb-7">
          <div>
            <h1 className="text-xl font-extrabold mb-1">안녕하세요, 전민서님 👋</h1>
            <p className="text-sm opacity-85">컴퓨터과학전공 · 2학년 · AI·ML 트랙</p>
          </div>
          <div className="text-5xl opacity-90">🌿</div>
        </div>

        {/* 학점 이수 현황 */}
        <h3 className="text-sm font-bold text-gray-700 mb-3">학점 이수 현황</h3>
        <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-9 mb-7">
          <div className="shrink-0 min-w-[110px]">
            <div className="text-sm text-gray-400 mb-2">전체 이수율</div>
            <div className="text-4xl font-extrabold text-gray-800 leading-none">62<span className="text-2xl">%</span></div>
            <div className="text-xs text-gray-300 mt-1 mb-4">(62/100 학점)</div>
            <div className="text-xs text-gray-500">• 졸업요건: <strong className="text-green-700">130학점</strong> 이상</div>
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
          <div className="flex-1 flex flex-col gap-3.5">
            {[
              { color: 'bg-blue-500', label: '전공필수', val: '18 / 30' },
              { color: 'bg-green-600', label: '전공선택', val: '20 / 30' },
              { color: 'bg-yellow-400', label: '교양필수', val: '8 / 12' },
              { color: 'bg-purple-400', label: '교양선택', val: '16 / 28' },
            ].map(r => (
              <div key={r.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${r.color}`} />
                  <span className="text-sm text-gray-600">{r.label}</span>
                </div>
                <span className="text-sm font-bold text-gray-800">{r.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 로드맵 + 시간표 2열 */}
        <div className="grid grid-cols-2 gap-5 mb-7">

          {/* 로드맵 미리보기 */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-gray-700">🗺️ 커리큘럼 로드맵</span>
              <a href="/roadmap" className="text-xs text-green-600 font-medium">전체 보기 →</a>
            </div>
            <div className="flex gap-3 mb-3">
              <span className="flex items-center gap-1 text-[11px] text-gray-500"><span className="w-2.5 h-2.5 rounded-sm bg-green-400 inline-block" />이수</span>
              <span className="flex items-center gap-1 text-[11px] text-gray-500"><span className="w-2.5 h-2.5 rounded-sm bg-blue-400 inline-block" />수강중</span>
              <span className="flex items-center gap-1 text-[11px] text-gray-500"><span className="w-2.5 h-2.5 rounded-sm bg-gray-200 inline-block" />미이수</span>
            </div>
            {[
              { year: '1학년', items: [{ name: '프로그래밍기초', s: 'done' }, { name: '자료구조', s: 'done' }, { name: '이산수학', s: 'done' }] },
              { year: '2학년', items: [{ name: '알고리즘', s: 'done' }, { name: '데이터베이스', s: 'current' }, { name: '네트워크', s: 'current' }] },
              { year: '3학년', items: [{ name: '소프트웨어공학', s: 'todo' }, { name: '머신러닝', s: 'todo' }, { name: '캡스톤', s: 'locked' }] },
            ].map(row => (
              <div key={row.year} className="flex items-center gap-1.5 flex-wrap mb-2">
                <span className="text-[11px] text-gray-300 w-11 shrink-0 font-semibold">{row.year}</span>
                {row.items.map((it, i) => (
                  <span key={it.name} className="flex items-center gap-1">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${it.s === 'done' ? 'bg-green-50 border-green-200 text-green-800' : it.s === 'current' ? 'bg-blue-50 border-blue-200 text-blue-800' : it.s === 'todo' ? 'bg-gray-50 border-gray-200 text-gray-400' : 'bg-gray-100 border-gray-100 text-gray-300'}`}>{it.name}</span>
                    {i < row.items.length - 1 && <span className="text-gray-200 text-[11px]">→</span>}
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* 시간표 미리보기 */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-gray-700">📅 AI 추천 시간표</span>
              <a href="/timetable" className="text-xs text-green-600 font-medium">전체 보기 →</a>
            </div>
            <div className="inline-flex items-center gap-1 text-[11px] text-green-700 font-semibold bg-green-50 border border-green-200 rounded-lg px-2 py-0.5 mb-3">✦ AI 생성 완료</div>
            <div className="grid grid-cols-[36px_repeat(5,1fr)] gap-0.5">
              <div />{['월','화','수','목','금'].map(d => <div key={d} className="text-center text-[11px] font-bold text-gray-400 py-1">{d}</div>)}
              {[
                { time: '9시', slots: ['c1', null, 'c1', null, null] },
                { time: '10시', slots: [null, 'c2', null, 'c2', null] },
                { time: '11시', slots: [null, 'c3', null, 'c3', null] },
                { time: '13시', slots: ['c4', null, null, 'c4', null] },
              ].map(row => (
                <>
                  <div key={row.time} className="text-[10px] text-gray-300 text-right pr-1 flex items-center justify-end">{row.time}</div>
                  {row.slots.map((s, i) => (
                    <div key={`${row.time}-${i}`} className={`h-8 rounded ${s ? '' : 'bg-gray-100'} ${s === 'c1' ? 'bg-green-50 border-l-[3px] border-green-600 text-green-800 text-[10px] font-semibold flex items-center px-1.5' : ''} ${s === 'c2' ? 'bg-blue-50 border-l-[3px] border-blue-600 text-blue-800 text-[10px] font-semibold flex items-center px-1.5' : ''} ${s === 'c3' ? 'bg-purple-50 border-l-[3px] border-purple-600 text-purple-800 text-[10px] font-semibold flex items-center px-1.5' : ''} ${s === 'c4' ? 'bg-orange-50 border-l-[3px] border-orange-500 text-orange-800 text-[10px] font-semibold flex items-center px-1.5' : ''}`}>
                      {s === 'c1' && 'DB'}{s === 'c2' && '네트워크'}{s === 'c3' && '알고리즘'}{s === 'c4' && 'SW공학'}
                    </div>
                  ))}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
