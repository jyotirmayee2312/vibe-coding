import { useState } from 'react'

const Header = ({ onAddHabit }) => {
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every minute
  useState(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(interval)
  })

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <header className="bg-white shadow-lg border-b border-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <div className="text-3xl">🚀</div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                HabitTracker
              </h1>
              <p className="text-sm text-gray-600">Build better habits, one day at a time</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <div className="text-center sm:text-right">
              <div className="text-2xl font-bold text-gray-800">{formatTime(currentTime)}</div>
              <div className="text-sm text-gray-600">{formatDate(currentTime)}</div>
            </div>
            
            <button
              onClick={onAddHabit}
              className="btn-primary flex items-center space-x-2 px-6 py-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <span className="text-xl">+</span>
              <span>Add Habit</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
