"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Battery, Signal, Clock } from "lucide-react"

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
  const [userLocation] = useState({ lat: 40.7128, lng: -74.0060 }) // Dummy user location (NYC)
  const [dogLocation] = useState({ lat: 40.7130, lng: -74.0050 }) // Dummy dog location nearby

  const handleConnect = () => {
    setIsConnected(!isConnected)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="rounded-xl shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800">GPS Dog Collar Tracker</CardTitle>
            <p className="text-gray-600">Monitor your dog's location in real-time</p>
          </CardHeader>
        </Card>

        {/* Connect Button */}
        <div className="text-center">
          <Button
            onClick={handleConnect}
            variant={isConnected ? "destructive" : "default"}
            size="lg"
            className="rounded-full px-8 py-3 text-lg font-semibold shadow-md transition-all hover:shadow-lg"
          >
            {isConnected ? "Disconnect Module" : "Connect to Module"}
          </Button>
        </div>

        {/* Status Cards */}
        {isConnected && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="rounded-xl shadow-md">
              <CardContent className="flex items-center space-x-3 p-4">
                <Battery className="h-6 w-6 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Battery</p>
                  <p className="text-lg font-bold text-gray-800">85%</p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-md">
              <CardContent className="flex items-center space-x-3 p-4">
                <Signal className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">LoRA Signal</p>
                  <Badge variant="secondary">Strong</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-md">
              <CardContent className="flex items-center space-x-3 p-4">
                <Clock className="h-6 w-6 text-purple-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Last Update</p>
                  <p className="text-lg font-bold text-gray-800">2 min ago</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Map */}
        <Card className="rounded-xl shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-6 w-6 text-red-500" />
              <span>Live Map</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gray-200 rounded-lg h-96 overflow-hidden">
              {/* Dummy Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-blue-200"></div>

              {/* User Marker */}
              <div
                className="absolute w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"
                style={{
                  top: `${(1 - (userLocation.lat - 40.7125) / 0.001) * 50}%`,
                  left: `${((userLocation.lng + 74.0065) / 0.002) * 50}%`,
                }}
                title="You"
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  You
                </div>
              </div>

              {/* Dog Marker */}
              <div
                className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-bounce"
                style={{
                  top: `${(1 - (dogLocation.lat - 40.7125) / 0.001) * 50}%`,
                  left: `${((dogLocation.lng + 74.0065) / 0.002) * 50}%`,
                }}
                title="Dog"
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Dog
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}