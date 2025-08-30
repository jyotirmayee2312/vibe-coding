import { useState } from 'react'
import HabitForm from './HabitForm'

const HabitList = ({ habits, onToggle, onDelete, onEdit }) => {
  const [editingHabit, setEditingHabit] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  const isDateCompleted = (habit, date) => {
    if (!date) return false
    const dateStr = date.toISOString().split('T')[0]
    return habit.completedDates.includes(dateStr)
  }

  const isToday = (date) => {
    if (!date) return false
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const getCategoryIcon = (category) => {
    const icons = {
      health: '🏥',
      productivity: '💼',
      learning: '📚',
      mindfulness: '🧘',
      social: '👥',
      creative: '🎨',
      finance: '💰',
      other: '✨'
    }
    return icons[category] || '✨'
  }

  const getColorClass = (color) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      red: 'bg-red-500',
      yellow: 'bg-yellow-500',
      pink: 'bg-pink-500'
    }
    return colors[color] || 'bg-blue-500'
  }

  const handleEdit = (habit) => {
    setEditingHabit(habit)
  }

  const handleEditSubmit = (updatedHabit) => {
    onEdit(editingHabit.id, updatedHabit)
    setEditingHabit(null)
  }

  const handleEditCancel = () => {
    setEditingHabit(null)
  }

  const days = getDaysInMonth(selectedDate)
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const changeMonth = (direction) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + direction, 1))
  }

  if (editingHabit) {
    return (
      <HabitForm 
        habit={editingHabit}
        onSubmit={handleEditSubmit}
        onCancel={handleEditCancel}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Month Navigation */}
      <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-4">
        <button
          onClick={() => changeMonth(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          ←
        </button>
        <h2 className="text-xl font-bold text-gray-800">
          {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          →
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => (
            <div
              key={index}
              className={`aspect-square p-1 ${
                date ? 'border border-gray-200' : ''
              } ${isToday(date) ? 'bg-primary-50 border-primary-200' : ''}`}
            >
              {date && (
                <div className="h-full flex flex-col">
                  <div className={`text-xs text-right mb-1 ${
                    isToday(date) ? 'font-bold text-primary-600' : 'text-gray-600'
                  }`}>
                    {date.getDate()}
                  </div>
                  <div className="flex-1 flex flex-wrap gap-1">
                    {habits.map(habit => (
                      <div
                        key={habit.id}
                        className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-200 ${
                          isDateCompleted(habit, date) 
                            ? getColorClass(habit.color) 
                            : 'bg-gray-200'
                        } hover:scale-125`}
                        onClick={() => onToggle(habit.id, date)}
                        title={`${habit.title} - ${isDateCompleted(habit, date) ? 'Click to uncheck' : 'Click to check'}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Habits List */}
      <div className="space-y-4">
        {habits.map(habit => (
          <div key={habit.id} className="habit-card">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{getCategoryIcon(habit.category)}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{habit.title}</h3>
                    {habit.description && (
                      <p className="text-gray-600 text-sm">{habit.description}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <span className="capitalize">{habit.frequency}</span>
                  <span>•</span>
                  <span>Reminder: {habit.reminderTime}</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🔥</span>
                    <span className="font-semibold text-gray-800">{habit.streak}</span>
                    <span className="text-gray-600">day streak</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🏆</span>
                    <span className="font-semibold text-gray-800">{habit.longestStreak}</span>
                    <span className="text-gray-600">best</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">✅</span>
                    <span className="font-semibold text-gray-800">{habit.totalCompletions}</span>
                    <span className="text-gray-600">total</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(habit)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Edit habit"
                >
                  ✏️
                </button>
                <button
                  onClick={() => onDelete(habit.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete habit"
                >
                  🗑️
                </button>
              </div>
            </div>
            
            {/* Quick Toggle for Today */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Today's completion:</span>
                <button
                  onClick={() => onToggle(habit.id, new Date())}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isDateCompleted(habit, new Date())
                      ? 'bg-success-100 text-success-800 hover:bg-success-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isDateCompleted(habit, new Date()) ? '✓ Completed' : 'Mark Complete'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HabitList
