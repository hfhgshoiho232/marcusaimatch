'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function GroupSelector() {
  const [groups, setGroups] = useState([])
  const [selectedGroups, setSelectedGroups] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetchGroups()
  }, [])

  const fetchGroups = async () => {
    const response = await fetch('/api/mock-whatsapp/groups')
    if (response.ok) {
      const data = await response.json()
      setGroups(data.groups)
    } else {
      console.error('Failed to fetch groups')
    }
  }

  const handleGroupToggle = (groupId) => {
    setSelectedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/mock-whatsapp/update-selected-groups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedGroups }),
    })

    if (response.ok) {
      router.refresh()
    } else {
      console.error('Failed to update selected groups')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Select WhatsApp Groups (Simulated)</h2>
      <div className="mb-4">
        {groups.map(group => (
          <label key={group.id} className="block mb-2">
            <input
              type="checkbox"
              checked={selectedGroups.includes(group.id)}
              onChange={() => handleGroupToggle(group.id)}
              className="mr-2"
            />
            {group.name}
          </label>
        ))}
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Update Selected Groups
      </button>
    </form>
  )
}

