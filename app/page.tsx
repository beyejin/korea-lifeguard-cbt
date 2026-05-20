'use client'

import { useEffect, useState } from 'react'

type Question = {
  id: number
  part: string
  question: string
  options: string[]
  answer: number
  explanation: string
}

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [selectedParts, setSelectedParts] = useState<string[]>([])
  const [testQuestions, setTestQuestions] = useState<Question[]>([])
  const [current, setCurrent] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [wrongCount, setWrongCount] = useState(0)
  const [isRandom, setIsRandom] = useState(false)
  const [isStarted, setIsStarted] = useState(false)

  useEffect(() => {
    fetch('/questions.json')
      .then((res) => res.json())
      .then((data: Question[]) => {
        setQuestions(data)
        const parts = Array.from(new Set(data.map((q) => q.part)))
        setSelectedParts(parts)
      })
  }, [])

  const parts = Array.from(new Set(questions.map((q) => q.part)))

  const togglePart = (part: string) => {
    setSelectedParts((prev) =>
      prev.includes(part) ? prev.filter((p) => p !== part) : [...prev, part]
    )
  }

  const shuffleQuestions = (items: Question[]) => {
    const shuffled = [...items]

    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    return shuffled
  }

  const startTest = () => {
    const filtered = questions.filter((q) => selectedParts.includes(q.part))

    if (filtered.length === 0) {
      alert('과목을 하나 이상 선택해줘')
      return
    }

    setTestQuestions(isRandom ? shuffleQuestions(filtered) : filtered)
    setCurrent(0)
    setSelectedAnswer(null)
    setCorrectCount(0)
    setWrongCount(0)
    setIsStarted(true)
  }

  const selectAnswer = (answerNumber: number) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(answerNumber)

    if (answerNumber === testQuestions[current].answer) {
      setCorrectCount((prev) => prev + 1)
    } else {
      setWrongCount((prev) => prev + 1)
    }
  }

  const nextQuestion = () => {
    setSelectedAnswer(null)
    setCurrent((prev) => prev + 1)
  }

  const jumpToQuestion = (questionId: number) => {
    const nextIndex = testQuestions.findIndex((question) => question.id === questionId)

    if (nextIndex === -1) {
      alert('선택한 과목 안에 없는 문제 번호야')
      return
    }

    setCurrent(nextIndex)
    setSelectedAnswer(null)
  }

  const restart = () => {
    setIsStarted(false)
    setTestQuestions([])
    setCurrent(0)
    setSelectedAnswer(null)
    setCorrectCount(0)
    setWrongCount(0)
  }

  if (!isStarted) {
    return (
      <main className="min-h-screen bg-gray-100">
        <header className="bg-neutral-900 text-white px-8 py-4 text-xl font-bold">
          수상구조사 CBT
        </header>

        <section className="max-w-2xl mx-auto mt-16 bg-white border rounded-lg shadow-sm">
          <h1 className="text-center text-2xl font-bold border-b py-6">
            수상구조사 모의시험 설정
          </h1>

          <div className="p-8 space-y-4">
            {parts.map((part) => {
              const count = questions.filter((q) => q.part === part).length

              return (
                <label
                  key={part}
                  className="flex items-center gap-4 border-b pb-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedParts.includes(part)}
                    onChange={() => togglePart(part)}
                    className="w-5 h-5"
                  />
                  <span className="text-lg">
                    {part} ({count}문제)
                  </span>
                </label>
              )
            })}

            <label className="flex items-center gap-4 pt-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isRandom}
                onChange={(event) => setIsRandom(event.target.checked)}
                className="w-5 h-5"
              />
              <span className="text-lg">문제 순서 랜덤</span>
            </label>

            <button
              onClick={startTest}
              className="w-full mt-8 bg-blue-600 text-white py-4 rounded-md text-lg font-semibold hover:bg-blue-700"
            >
              모의시험 시작
            </button>
          </div>
        </section>
      </main>
    )
  }

  const q = testQuestions[current]
  const isLast = current === testQuestions.length - 1

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-neutral-900 text-white px-8 py-4 text-xl font-bold">
        수상구조사 CBT
      </header>

      <section className="max-w-3xl mx-auto mt-10 bg-white border rounded-lg shadow-sm p-8">
        <div className="flex justify-between mb-6 text-sm text-gray-600">
          <span>
            {current + 1} / {testQuestions.length}
          </span>
          <span>
            정답: {correctCount} · 오답: {wrongCount}
          </span>
        </div>

        <form
          className="mb-6 flex gap-2"
          onSubmit={(event) => {
            event.preventDefault()
            const form = event.currentTarget
            const formData = new FormData(form)
            const questionId = Number(formData.get('questionId'))

            if (!Number.isInteger(questionId) || questionId < 1 || questionId > 500) {
              alert('1번부터 500번 사이로 입력해줘')
              return
            }

            jumpToQuestion(questionId)
            form.reset()
          }}
        >
          <input
            name="questionId"
            type="number"
            min={1}
            max={500}
            placeholder="문제 번호"
            className="w-32 border rounded-md px-3 py-2"
          />
          <button
            type="submit"
            className="px-4 py-2 border rounded-md font-semibold hover:bg-gray-100"
          >
            이동
          </button>
        </form>

        <div className="mb-4 text-blue-600 font-semibold">{q.part}</div>

        <h1 className="text-xl font-bold leading-relaxed mb-8">
          {q.id}. {q.question}
        </h1>

        <div className="space-y-3">
          {q.options.map((option, idx) => {
            const num = idx + 1
            const isCorrect = num === q.answer
            const isSelected = selectedAnswer === num

            let style = 'border-gray-300 bg-white'

            if (selectedAnswer !== null && isCorrect) {
              style = 'border-green-500 bg-green-100'
            }

            if (selectedAnswer !== null && isSelected && !isCorrect) {
              style = 'border-red-500 bg-red-100'
            }

            return (
              <button
                key={idx}
                onClick={() => selectAnswer(num)}
                className={`w-full text-left border rounded-md p-4 ${style}`}
              >
                {num}. {option}
              </button>
            )
          })}
        </div>

        {selectedAnswer !== null && (
          <div className="mt-8 p-4 bg-gray-100 rounded-md">
            <p className="font-bold mb-2">
              {selectedAnswer === q.answer ? '정답' : '오답'}
            </p>
            <p className="mb-2">정답: {q.answer}번</p>
            <p>{q.explanation}</p>
          </div>
        )}

        <div className="mt-8 flex gap-3">
          <button
            onClick={restart}
            className="px-5 py-3 border rounded-md"
          >
            처음으로
          </button>

          {selectedAnswer !== null && !isLast && (
            <button
              onClick={nextQuestion}
              className="flex-1 bg-blue-600 text-white py-3 rounded-md font-semibold"
            >
              다음 문제
            </button>
          )}

          {selectedAnswer !== null && isLast && (
            <button
              onClick={restart}
              className="flex-1 bg-blue-600 text-white py-3 rounded-md font-semibold"
            >
              시험 종료
            </button>
          )}
        </div>
      </section>
    </main>
  )
}
