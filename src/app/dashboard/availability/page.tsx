"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface DaySchedule {
  enabled: boolean;
  startTime: string;
  endTime: string;
}

type WeekSchedule = {
  [key: string]: DaySchedule;
};

const daysOfWeek = [
  { key: "sunday", label: "Sunday", index: 0 },
  { key: "monday", label: "Monday", index: 1 },
  { key: "tuesday", label: "Tuesday", index: 2 },
  { key: "wednesday", label: "Wednesday", index: 3 },
  { key: "thursday", label: "Thursday", index: 4 },
  { key: "friday", label: "Friday", index: 5 },
  { key: "saturday", label: "Saturday", index: 6 },
];

const defaultSchedule: WeekSchedule = {
  sunday: { enabled: false, startTime: "09:00", endTime: "17:00" },
  monday: { enabled: true, startTime: "09:00", endTime: "17:00" },
  tuesday: { enabled: true, startTime: "09:00", endTime: "17:00" },
  wednesday: { enabled: true, startTime: "09:00", endTime: "17:00" },
  thursday: { enabled: true, startTime: "09:00", endTime: "17:00" },
  friday: { enabled: true, startTime: "09:00", endTime: "16:00" },
  saturday: { enabled: true, startTime: "09:00", endTime: "13:00" },
};

export default function AvailabilityPage() {
  const [schedule, setSchedule] = useState<WeekSchedule>(defaultSchedule);
  const [slotDuration, setSlotDuration] = useState("30");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing availability
  useEffect(() => {
    async function fetchAvailability() {
      try {
        const response = await fetch("/api/dashboard/availability");
        if (response.ok) {
          const data = await response.json();

          if (data.length > 0) {
            // Convert API data to schedule format
            const newSchedule = { ...defaultSchedule };

            for (const slot of data) {
              const day = daysOfWeek.find((d) => d.index === slot.dayOfWeek);
              if (day) {
                newSchedule[day.key] = {
                  enabled: true,
                  startTime: slot.startTime,
                  endTime: slot.endTime,
                };
              }
              if (slot.slotDuration) {
                setSlotDuration(slot.slotDuration.toString());
              }
            }

            // Mark days without data as disabled
            for (const day of daysOfWeek) {
              if (!data.find((s: { dayOfWeek: number }) => s.dayOfWeek === day.index)) {
                newSchedule[day.key].enabled = false;
              }
            }

            setSchedule(newSchedule);
          }
        }
      } catch (err) {
        console.error("Error fetching availability:", err);
      } finally {
        setInitialLoading(false);
      }
    }
    fetchAvailability();
  }, []);

  const toggleDay = (day: string) => {
    setSchedule({
      ...schedule,
      [day]: { ...schedule[day], enabled: !schedule[day].enabled },
    });
  };

  const updateTime = (day: string, field: "startTime" | "endTime", value: string) => {
    setSchedule({
      ...schedule,
      [day]: { ...schedule[day], [field]: value },
    });
  };

  const handleSave = async () => {
    setLoading(true);
    setSaved(false);
    setError(null);

    try {
      // Convert schedule to API format
      const availability = daysOfWeek
        .filter((day) => schedule[day.key].enabled)
        .map((day) => ({
          dayOfWeek: day.index,
          startTime: schedule[day.key].startTime,
          endTime: schedule[day.key].endTime,
          slotDuration: parseInt(slotDuration),
        }));

      const response = await fetch("/api/dashboard/availability", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ availability }),
      });

      if (!response.ok) {
        throw new Error("Failed to save schedule");
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-secondary">
          Availability
        </h1>
        <p className="text-muted-foreground mt-1">
          Set your weekly schedule and appointment slot duration.
        </p>
      </div>

      <div className="space-y-6">
        {/* Slot Duration */}
        <Card>
          <CardHeader>
            <CardTitle>Appointment Duration</CardTitle>
            <CardDescription>
              Default length of each appointment slot.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <select
                value={slotDuration}
                onChange={(e) => setSlotDuration(e.target.value)}
                className="px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
              </select>
              <span className="text-sm text-muted-foreground">
                per appointment slot
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
            <CardDescription>
              Set your working hours for each day of the week.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {daysOfWeek.map((day) => (
                <div
                  key={day.key}
                  className={`flex items-center gap-4 p-4 rounded-lg border ${
                    schedule[day.key].enabled
                      ? "bg-white border-border"
                      : "bg-muted/50 border-transparent"
                  }`}
                >
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={schedule[day.key].enabled}
                      onChange={() => toggleDay(day.key)}
                      className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span
                      className={`font-medium w-28 ${
                        !schedule[day.key].enabled ? "text-muted-foreground" : ""
                      }`}
                    >
                      {day.label}
                    </span>
                  </label>

                  {schedule[day.key].enabled ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="time"
                        value={schedule[day.key].startTime}
                        onChange={(e) =>
                          updateTime(day.key, "startTime", e.target.value)
                        }
                        className="w-32"
                      />
                      <span className="text-muted-foreground">to</span>
                      <Input
                        type="time"
                        value={schedule[day.key].endTime}
                        onChange={(e) =>
                          updateTime(day.key, "endTime", e.target.value)
                        }
                        className="w-32"
                      />
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Closed</span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <Button onClick={handleSave} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Schedule"
            )}
          </Button>
          {saved && (
            <span className="text-green-600 text-sm">
              Schedule saved successfully!
            </span>
          )}
          {error && (
            <span className="text-red-600 text-sm">
              {error}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
