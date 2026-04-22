"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ChiropractorData } from "./ChiropractorCard";

// Fix for default marker icons in Leaflet with webpack
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const featuredIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [30, 49],
  iconAnchor: [15, 49],
  popupAnchor: [1, -40],
  shadowSize: [49, 49],
  className: "featured-marker",
});

interface SearchMapProps {
  chiropractors: (ChiropractorData & { lat: number; lng: number })[];
  selectedId?: string | null;
  onMarkerClick?: (id: string) => void;
  center?: [number, number];
  zoom?: number;
}

export function SearchMap({
  chiropractors,
  selectedId,
  onMarkerClick,
  center = [37.7749, -122.4194], // Default to San Francisco
  zoom = 11,
}: SearchMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    mapRef.current = L.map(mapContainerRef.current).setView(center, zoom);

    // Add tile layer (OpenStreetMap - free, no API key)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update markers when chiropractors change
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers
    chiropractors.forEach((chiro) => {
      const marker = L.marker([chiro.lat, chiro.lng], {
        icon: chiro.featured ? featuredIcon : defaultIcon,
      });

      // Create popup content
      const popupContent = `
        <div style="min-width: 200px; font-family: system-ui, sans-serif;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #C8A45C, #a8863c); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">
              ${chiro.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <div style="font-weight: 600; color: #1A1A2E;">${chiro.name}</div>
              <div style="font-size: 12px; color: #666;">${chiro.clinic}</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 8px;">
            <span style="color: #C8A45C;">★</span>
            <span style="font-weight: 600;">${chiro.rating}</span>
            <span style="color: #666; font-size: 12px;">(${chiro.reviewCount} reviews)</span>
          </div>
          <div style="font-size: 12px; color: #666; margin-bottom: 8px;">
            ${chiro.address}, ${chiro.city}
          </div>
          <div style="font-size: 12px; color: #22c55e; margin-bottom: 12px;">
            Next: ${chiro.nextAvailable}
          </div>
          <a href="/chiropractor/${chiro.id}" style="display: block; text-align: center; background: linear-gradient(135deg, #C8A45C, #a8863c); color: #1A1A2E; padding: 8px 16px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
            View Profile
          </a>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 280,
        className: "chirofind-popup",
      });

      marker.on("click", () => {
        if (onMarkerClick) {
          onMarkerClick(chiro.id);
        }
      });

      marker.addTo(mapRef.current!);
      markersRef.current.push(marker);
    });

    // Fit bounds if we have markers
    if (chiropractors.length > 0) {
      const bounds = L.latLngBounds(
        chiropractors.map((c) => [c.lat, c.lng] as [number, number])
      );
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [chiropractors, onMarkerClick]);

  // Highlight selected marker
  useEffect(() => {
    if (!mapRef.current || !selectedId) return;

    const selectedChiro = chiropractors.find((c) => c.id === selectedId);
    if (selectedChiro) {
      mapRef.current.setView([selectedChiro.lat, selectedChiro.lng], 14);

      // Find and open the popup for the selected marker
      const markerIndex = chiropractors.findIndex((c) => c.id === selectedId);
      if (markerIndex >= 0 && markersRef.current[markerIndex]) {
        markersRef.current[markerIndex].openPopup();
      }
    }
  }, [selectedId, chiropractors]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full min-h-[400px] rounded-xl overflow-hidden"
      style={{ zIndex: 0 }}
    />
  );
}
