'use client'

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MdAttachFile, MdSend, MdClose } from 'react-icons/md'

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
        const user = JSON.parse(localStorage.getItem('user'))
        
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
      <div className="max-w-4xl mt-20 mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h2 className="text-white text-xl font-semibold">Tạo thông báo mới</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-black font-medium text-gray-700 mb-2">
                  Tiêu đề thông báo
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập tiêu đề thông báo..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nội dung thông báo
                </label>
                <textarea
                  rows="8"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập nội dung chi tiết thông báo..."
                  required
                ></textarea>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <MdAttachFile className="text-gray-600 text-xl" />
                    <span className="text-sm text-gray-600">Đính kèm file</span>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {file && (
                    <div className="flex items-center space-x-2 px-3 py-1 bg-blue-50 rounded-lg">
                      <span className="text-sm text-blue-600 truncate max-w-xs">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <MdClose />
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MdSend className={loading ? 'animate-pulse' : ''} />
                  <span>{loading ? 'Đang gửi...' : 'Gửi thông báo'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
}

export default NewMail
