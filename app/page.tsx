"use client"

import { useState, useEffect } from "react"
import dynamic from 'next/dynamic'
import { getCurrentPosition } from '@tauri-apps/plugin-geolocation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Battery, Signal, Clock, Wifi, WifiOff } from "lucide-react"

const MapComponent = dynamic(() => import('@/components/MapComponent'), { ssr: false })

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
  const [userLocation, setUserLocation] = useState({ lat: 40.7128, lng: -74.0060 }) // Default to NYC
  const [dogLocation, setDogLocation] = useState({ lat: 40.7130, lng: -74.0050 }) // Dummy dog location nearby

  useEffect(() => {
    getUserLocation()
  }, [])

  const generateDogLocation = (user) => {
    const latOffset = (Math.random() - 0.5) * 0.002 // +/- 0.001 degrees ~100m
    const lngOffset = (Math.random() - 0.5) * 0.002
    setDogLocation({ lat: user.lat + latOffset, lng: user.lng + lngOffset })
  }

  const getUserLocation = async () => {
    try {
      const position = await getCurrentPosition()
      const newUserLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      setUserLocation(newUserLocation)
      generateDogLocation(newUserLocation)
    } catch (error) {
      console.error("Error getting location:", error)
      // Fallback to dummy location
      const fallback = { lat: 40.7128, lng: -74.0060 }
      setUserLocation(fallback)
      generateDogLocation(fallback)
    }
  }

  const handleConnect = () => {
    const newConnected = !isConnected
    setIsConnected(newConnected)
    if (newConnected) {
      generateDogLocation(userLocation)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <Card className="rounded-3xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-4xl font-bold text-slate-800 flex items-center justify-center gap-3">
              <MapPin className="h-8 w-8 text-blue-500" />
              GPS Dog Collar Tracker
            </CardTitle>
            <p className="text-slate-600 text-lg">Monitor your dog's location in real-time</p>
          </CardHeader>
        </Card>

        {/* Connect Button */}
        <div className="text-center">
          <Button
            onClick={handleConnect}
            variant={isConnected ? "destructive" : "default"}
            size="lg"
            className="rounded-full px-10 py-4 text-xl font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-105 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0"
          >
            {isConnected ? (
              <>
                <WifiOff className="mr-3 h-5 w-5" />
                Disconnect Module
              </>
            ) : (
              <>
                <Wifi className="mr-3 h-5 w-5" />
                Connect to Module
              </>
            )}
          </Button>
        </div>

        {/* Status Cards */}
        {isConnected && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="rounded-2xl shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="flex flex-col items-center space-y-3 p-6">
                <div className="p-3 bg-green-100 rounded-full flex items-center justify-center">
                  <Battery className="h-7 w-7 text-green-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Battery</p>
                  <p className="text-2xl font-bold text-slate-800">85%</p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="flex flex-col items-center space-y-3 p-6">
                <div className="p-3 bg-blue-100 rounded-full flex items-center justify-center">
                  <Signal className="h-7 w-7 text-blue-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">LoRA Signal</p>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Strong</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="flex flex-col items-center space-y-3 p-6">
                <div className="p-3 bg-purple-100 rounded-full flex items-center justify-center">
                  <Clock className="h-7 w-7 text-purple-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Last Update</p>
                  <p className="text-2xl font-bold text-slate-800">2 min ago</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Map */}
        <Card className="rounded-3xl shadow-xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-3 text-2xl font-bold text-slate-800">
              <div className="p-2 bg-red-100 rounded-full">
                <MapPin className="h-6 w-6 text-red-600" />
              </div>
              <span>Live Map</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <MapComponent key={`${isConnected}-${dogLocation.lat}`} userLocation={userLocation} dogLocation={dogLocation} isConnected={isConnected} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
