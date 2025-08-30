import { useState, useEffect } from 'react'
import HabitForm from './components/HabitForm'
import HabitList from './components/HabitList'
import HabitStats from './components/HabitStats'
import Header from './components/Header'

function App() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habits')
    return saved ? JSON.parse(saved) : []
  })
  
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])

  const addHabit = (habit) => {
    const newHabit = {
      ...habit,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      streak: 0,
      longestStreak: 0,
      completedDates: [],
      totalCompletions: 0
    }
    setHabits([...habits, newHabit])
    setShowForm(false)
  }

  const toggleHabit = (habitId, date) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const dateStr = date.toISOString().split('T')[0]
        const isCompleted = habit.completedDates.includes(dateStr)
        
        let newCompletedDates, newStreak, newLongestStreak, newTotalCompletions
        
        if (isCompleted) {
          // Remove completion
          newCompletedDates = habit.completedDates.filter(d => d !== dateStr)
          newTotalCompletions = habit.totalCompletions - 1
          
          // Recalculate streak
          newStreak = calculateStreak(newCompletedDates)
        } else {
          // Add completion
          newCompletedDates = [...habit.completedDates, dateStr].sort()
          newTotalCompletions = habit.totalCompletions + 1
          
          // Calculate new streak
          newStreak = calculateStreak(newCompletedDates)
        }
        
        newLongestStreak = Math.max(habit.longestStreak, newStreak)
        
        return {
          ...habit,
          completedDates: newCompletedDates,
          streak: newStreak,
          longestStreak: newLongestStreak,
          totalCompletions: newTotalCompletions
        }
      }
      return habit
    }))
  }

  const calculateStreak = (completedDates) => {
    if (completedDates.length === 0) return 0
    
    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]
    
    let streak = 0
    let currentDate = new Date(today)
    
    while (true) {
      const dateStr = currentDate.toISOString().split('T')[0]
      if (completedDates.includes(dateStr)) {
        streak++
        currentDate.setDate(currentDate.getDate() - 1)
      } else {
        break
      }
    }
    
    return streak
  }

  const deleteHabit = (habitId) => {
    setHabits(habits.filter(habit => habit.id !== habitId))
  }

  const editHabit = (habitId, updatedHabit) => {
    setHabits(habits.map(habit => 
      habit.id === habitId ? { ...habit, ...updatedHabit } : habit
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header onAddHabit={() => setShowForm(true)} />
      
      <main className="container mx-auto px-4 py-8">
        {habits.length === 0 && !showForm ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Start Building Amazing Habits!</h2>
            <p className="text-gray-600 mb-8">Track your daily progress and build the life you want, one habit at a time.</p>
            <button 
              onClick={() => setShowForm(true)}
              className="btn-primary text-lg px-8 py-3"
            >
              Create Your First Habit
            </button>
          </div>
        ) : (
          <>
            {showForm && (
              <HabitForm 
                onSubmit={addHabit} 
                onCancel={() => setShowForm(false)}
              />
            )}
            
            {habits.length > 0 && (
              <>
                <HabitStats habits={habits} />
                <HabitList 
                  habits={habits}
                  onToggle={toggleHabit}
                  onDelete={deleteHabit}
                  onEdit={editHabit}
                />
              </>
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default App
