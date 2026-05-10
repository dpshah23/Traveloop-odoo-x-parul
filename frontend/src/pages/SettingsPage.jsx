import { useState } from 'react'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Card } from '../components/dashboard/Card'
import { Bell, Lock, User, Palette, Eye } from 'lucide-react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    darkMode: true,
    privateProfile: false,
  })

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const settingSections = [
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          id: 'emailNotifications',
          label: 'Email Notifications',
          description: 'Receive email updates about your trips',
        },
        {
          id: 'pushNotifications',
          label: 'Push Notifications',
          description: 'Get browser push notifications',
        },
        {
          id: 'weeklyDigest',
          label: 'Weekly Digest',
          description: 'Receive a weekly summary of your trips',
        },
      ],
    },
    {
      title: 'Appearance',
      icon: Palette,
      settings: [
        {
          id: 'darkMode',
          label: 'Dark Mode',
          description: 'Use dark theme across the app',
        },
      ],
    },
    {
      title: 'Privacy',
      icon: Eye,
      settings: [
        {
          id: 'privateProfile',
          label: 'Private Profile',
          description: 'Only you can see your trips and activities',
        },
      ],
    },
  ]

  return (
    <DashboardLayout title="Settings">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Settings</h2>
        <p className="text-slate-400">Manage your account preferences</p>
      </div>

      <div className="space-y-6">
        {/* Account section */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-teal-400/10 to-teal-600/10 rounded-lg border border-teal-500/20">
              <User className="w-6 h-6 text-teal-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Account</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Email
              </label>
              <input
                type="email"
                defaultValue="user@example.com"
                disabled
                className="w-full px-4 py-2 bg-slate-700/30 border border-slate-600 rounded-lg text-slate-300 disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Username
              </label>
              <input
                type="text"
                defaultValue="traveler"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:border-teal-500 focus:outline-none"
              />
            </div>
            <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors">
              Update Profile
            </button>
          </div>
        </Card>

        {/* Password section */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-teal-400/10 to-teal-600/10 rounded-lg border border-teal-500/20">
              <Lock className="w-6 h-6 text-teal-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Security</h3>
          </div>
          <button className="px-4 py-2 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 rounded-lg font-medium transition-colors">
            Change Password
          </button>
        </Card>

        {/* Settings sections */}
        {settingSections.map((section) => {
          const Icon = section.icon
          return (
            <Card key={section.title}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-teal-400/10 to-teal-600/10 rounded-lg border border-teal-500/20">
                  <Icon className="w-6 h-6 text-teal-400" />
                </div>
                <h3 className="text-lg font-bold text-white">{section.title}</h3>
              </div>
              <div className="space-y-4">
                {section.settings.map((setting) => (
                  <div
                    key={setting.id}
                    className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                  >
                    <div>
                      <p className="text-slate-300 font-medium">
                        {setting.label}
                      </p>
                      <p className="text-xs text-slate-500">
                        {setting.description}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleSetting(setting.id)}
                      className={`relative w-12 h-7 rounded-full transition-colors ${
                        settings[setting.id]
                          ? 'bg-teal-500'
                          : 'bg-slate-600'
                      }`}
                    >
                      <div
                        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                          settings[setting.id] ? 'translate-x-5' : ''
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )
        })}

        {/* Danger zone */}
        <Card className="border-red-500/20 bg-red-500/5">
          <h3 className="text-lg font-bold text-red-400 mb-4">Danger Zone</h3>
          <button className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-lg font-medium transition-colors">
            Delete Account
          </button>
        </Card>
      </div>
    </DashboardLayout>
  )
}
