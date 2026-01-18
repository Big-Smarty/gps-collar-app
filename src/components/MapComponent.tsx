"use client"

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

interface MapProps {
  userLocation: { lat: number; lng: number }
  dogLocation: { lat: number; lng: number }
  isConnected: boolean
}

export default function MapComponent({ userLocation, dogLocation, isConnected }: MapProps) {
  const userIcon = L.divIcon({
    html: '<span style="font-size: 36px;">👨</span>',
    className: 'custom-emoji-icon',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  })

  const dogIcon = L.divIcon({
    html: '<span style="font-size: 36px;">🐶</span>',
    className: 'custom-emoji-icon',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  })

  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    })
  }, [])

  return (
    <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={15} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
        <Popup>You are here</Popup>
      </Marker>
      {isConnected && (
        <Marker position={[dogLocation.lat, dogLocation.lng]} icon={dogIcon}>
          <Popup>Your dog is here</Popup>
        </Marker>
      )}
    </MapContainer>
  )
}