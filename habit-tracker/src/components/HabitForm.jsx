import { useState } from 'react'

const HabitForm = ({ onSubmit, onCancel, habit = null }) => {
  const [formData, setFormData] = useState({
    title: habit?.title || '',
    description: habit?.description || '',
    category: habit?.category || 'health',
    frequency: habit?.frequency || 'daily',
    reminderTime: habit?.reminderTime || '09:00',
    color: habit?.color || 'blue'
  })

  const [errors, setErrors] = useState({})

  const categories = [
    { value: 'health', label: '🏥 Health & Fitness', icon: '🏥' },
    { value: 'productivity', label: '💼 Productivity', icon: '💼' },
    { value: 'learning', label: '📚 Learning', icon: '📚' },
    { value: 'mindfulness', label: '🧘 Mindfulness', icon: '🧘' },
    { value: 'social', label: '👥 Social', icon: '👥' },
    { value: 'creative', label: '🎨 Creative', icon: '🎨' },
    { value: 'finance', label: '💰 Finance', icon: '💰' },
    { value: 'other', label: '✨ Other', icon: '✨' }
  ]

  const frequencies = [
    { value: 'daily', label: 'Every day' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ]

  const colors = [
    { value: 'blue', class: 'bg-blue-500' },
    { value: 'green', class: 'bg-green-500' },
    { value: 'purple', class: 'bg-purple-500' },
    { value: 'red', class: 'bg-red-500' },
    { value: 'yellow', class: 'bg-yellow-500' },
    { value: 'pink', class: 'bg-pink-500' }
  ]

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Habit title is required'
    }
    
    if (formData.title.length > 50) {
      newErrors.title = 'Title must be less than 50 characters'
    }
    
    if (formData.description.length > 200) {
      newErrors.description = 'Description must be less than 200 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <div className="habit-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {habit ? 'Edit Habit' : 'Create New Habit'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Habit Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="e.g., Morning Exercise, Read 30 minutes"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows="3"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Describe your habit and why it's important to you..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              {formData.description.length}/200 characters
            </p>
          </div>

          {/* Category and Frequency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.icon} {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Frequency
              </label>
              <select
                value={formData.frequency}
                onChange={(e) => handleChange('frequency', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              >
                {frequencies.map(freq => (
                  <option key={freq.value} value={freq.value}>
                    {freq.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reminder Time and Color */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reminder Time
              </label>
              <input
                type="time"
                value={formData.reminderTime}
                onChange={(e) => handleChange('reminderTime', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Theme
              </label>
              <div className="flex space-x-2">
                {colors.map(color => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => handleChange('color', color.value)}
                    className={`w-8 h-8 rounded-full ${color.class} transition-transform ${
                      formData.color === color.value ? 'scale-110 ring-2 ring-gray-400' : 'hover:scale-105'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="btn-primary flex-1 py-3 text-lg"
            >
              {habit ? 'Update Habit' : 'Create Habit'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary flex-1 py-3 text-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default HabitForm
