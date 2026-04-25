export interface PlaylistFormValues {
  paceMinutes:       number;   // e.g. 9
  paceSeconds:       number;   // e.g. 30  → pace of 9:30
  paceUnit:          PaceUnit; // "min/mi" | "min/km"
  distance:          number;   // e.g. 3.1
  distanceUnit:      DistanceUnit; // "miles" | "km"
  timingMode:        TimingMode;   // "pace+distance" | "duration"
  durationMinutes:   number;   // used when timingMode is "duration"
  genres:            string[]; // e.g. ["hip-hop", "pop"]
  halfTimeEnabled:   boolean;  // halve the BPM target
  doubleTimeEnabled: boolean;  // double the BPM target
}

export type PaceUnit = "min/mi" | "min/km";
export type DistanceUnit = "miles" | "km";
export type TimingMode = "pace+distance" | "duration";