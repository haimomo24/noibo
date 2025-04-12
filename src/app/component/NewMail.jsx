'use client'

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const NewMail = () => {
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleFileChange = (e) => {
      setFile(e.target.files[0])
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)

      try {
        // Get logged in user
        const user = JSON.parse(localStorage.getItem('user'))
        
        // Handle file upload if exists
        let filePath = null
        if (file) {
          const formData = new FormData()
          formData.append('file', file)
          const uploadRes = await fetch('/api/upload', {
            method: 'POST',
            body: formData
          })
          const uploadData = await uploadRes.json()
          filePath = uploadData.filePath
        }

        // Create mail notification
        const res = await fetch('/api/mail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: user.username,
            title,
            description,
            file_path: filePath
          })
        })

        const data = await res.json()
        if (data.success) {
          router.push('/homepage')
          router.refresh()
        }
      } catch (error) {
        console.error('Error creating mail:', error)
      } finally {
        setLoading(false)
      }
    }

    return (
      <form
        onSubmit={handleSubmit}
        className="max-w-xl w-full mx-auto mt-50 border text-black border-gray-300 rounded-md shadow-lg bg-white"
      >
        <div className="flex flex-col px-4 py-2">
          <input
            type="text"
            placeholder="Tiêu đề thông báo"
            className="border-b text-black outline-none py-2 text-sm placeholder-gray-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            rows="10"
            placeholder="Nội dung thông báo..."
            className="text-black outline-none py-2 text-sm resize-none mt-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          {file && (
            <div className="mt-2 text-sm text-green-700">
              ✅ Đã chọn: <strong>{file.name}</strong>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-2 border-t">
          <div className="flex items-center space-x-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Đang gửi...' : 'Gửi thông báo'}
            </button>
          </div>

          <div className="flex items-center space-x-3 text-gray-600 text-lg">
            <label title="Đính kèm file" className="cursor-pointer">
              📎
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </form>
    )
}

export default NewMail
