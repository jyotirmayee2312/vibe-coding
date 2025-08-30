const HabitStats = ({ habits }) => {
  const totalHabits = habits.length
  const completedToday = habits.filter(habit => {
    const today = new Date().toISOString().split('T')[0]
    return habit.completedDates.includes(today)
  }).length
  
  const totalCompletions = habits.reduce((sum, habit) => sum + habit.totalCompletions, 0)
  const averageStreak = habits.length > 0 
    ? Math.round(habits.reduce((sum, habit) => sum + habit.streak, 0) / habits.length * 10) / 10
    : 0
  
  const longestStreak = Math.max(...habits.map(habit => habit.longestStreak), 0)
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0

  const getMotivationalMessage = () => {
    if (completionRate === 100) return "🎉 Perfect day! You're on fire!"
    if (completionRate >= 80) return "🚀 Amazing progress! Keep it up!"
    if (completionRate >= 60) return "💪 Good work! You're building momentum!"
    if (completionRate >= 40) return "🌟 Every step counts! You're doing great!"
    if (completionRate >= 20) return "🌱 Getting started is the hardest part!"
    return "💫 New day, new opportunities! Let's make it count!"
  }

  const stats = [
    {
      label: 'Total Habits',
      value: totalHabits,
      icon: '📋',
      color: 'bg-blue-500'
    },
    {
      label: 'Completed Today',
      value: completedToday,
      icon: '✅',
      color: 'bg-green-500'
    },
    {
      label: 'Completion Rate',
      value: `${completionRate}%`,
      icon: '📊',
      color: 'bg-purple-500'
    },
    {
      label: 'Total Completions',
      value: totalCompletions,
      icon: '🎯',
      color: 'bg-orange-500'
    },
    {
      label: 'Avg. Streak',
      value: averageStreak,
      icon: '🔥',
      color: 'bg-red-500'
    },
    {
      label: 'Longest Streak',
      value: longestStreak,
      icon: '🏆',
      color: 'bg-yellow-500'
    }
  ]

  return (
    <div className="mb-8">
      {/* Motivational Message */}
      <div className="text-center mb-8">
        <div className="text-4xl mb-2">✨</div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          {getMotivationalMessage()}
        </h2>
        <p className="text-gray-600">
          {completedToday === 0 
            ? "Start your journey by completing your first habit today!"
            : `You've completed ${completedToday} out of ${totalHabits} habits today.`
          }
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition-shadow duration-200">
            <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      {totalHabits > 0 && (
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Today's Progress</h3>
            <span className="text-sm text-gray-600">
              {completedToday} / {totalHabits} completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default HabitStats
