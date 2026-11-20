import { useState } from 'react'
import { AlertCircle, CheckCircle2, Send } from 'lucide-react'
import { addItem } from '../utils/storage'

const categories = [
  'Electronics',
  'Accessories',
  'Personal Items',
  'Books & Stationery',
  'Clothing',
  'Other',
]

const initialForm = {
  itemName: '',
  category: '',
  color: '',
  location: '',
  date: '',
  description: '',
  privateClue: '',
}

function ReportForm({ type, onSuccess, onCancel }) {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')

  const isLost = type === 'lost'

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (
      !form.itemName.trim() ||
      !form.category ||
      !form.color.trim() ||
      !form.location.trim() ||
      !form.date ||
      !form.description.trim() ||
      !form.privateClue.trim()
    ) {
      setError('Please complete all fields before submitting.')
      return
    }

    const newItem = addItem({
      type,
      itemName: form.itemName.trim(),
      category: form.category,
      color: form.color.trim(),
      location: form.location.trim(),
      date: form.date,
      description: form.description.trim(),
      privateClue: form.privateClue.trim(),
    })

    setForm(initialForm)
    onSuccess?.(newItem)
  }

  const inputClass =
    'mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="itemName" className="text-sm font-semibold text-brand-navy">
          Item name
        </label>
        <input
          id="itemName"
          name="itemName"
          value={form.itemName}
          onChange={handleChange}
          placeholder="e.g. Black leather wallet"
          className={inputClass}
          maxLength={80}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className="text-sm font-semibold text-brand-navy">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="color" className="text-sm font-semibold text-brand-navy">
            Colour
          </label>
          <input
            id="color"
            name="color"
            value={form.color}
            onChange={handleChange}
            placeholder="e.g. Black"
            className={inputClass}
            maxLength={40}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="location" className="text-sm font-semibold text-brand-navy">
            {isLost ? 'Where did you lose it?' : 'Where did you find it?'}
          </label>
          <input
            id="location"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. University Library"
            className={inputClass}
            maxLength={100}
          />
        </div>

        <div>
          <label htmlFor="date" className="text-sm font-semibold text-brand-navy">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="text-sm font-semibold text-brand-navy">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe the item and any visible details..."
          className={inputClass}
          rows={4}
          maxLength={500}
        />
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <div className="flex gap-2 text-sm font-semibold text-amber-900">
          <AlertCircle size={18} className="shrink-0" />
          Private ownership clue
        </div>
        <p className="mt-2 text-xs leading-5 text-amber-800">
          Enter a detail that only the genuine owner should know. This clue
          will not appear in the public listing.
        </p>
        <input
          id="privateClue"
          name="privateClue"
          value={form.privateClue}
          onChange={handleChange}
          placeholder="Enter a private identifying detail"
          className={inputClass}
          maxLength={200}
        />
      </div>

      {error && (
        <p role="alert" className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle size={17} /> {error}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Send size={16} />
          Submit {isLost ? 'Lost' : 'Found'} Report
        </button>
      </div>
    </form>
  )
}

export default ReportForm
