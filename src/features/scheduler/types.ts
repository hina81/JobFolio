export interface CalendarEvent {
  time: string;
  title: string;
}

export interface CalendarEvents {
  [dateKey: string]: CalendarEvent[];
}

export interface TimeSlot {
  dateStr: string;
  timeStr: string;
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface CalendarData {
  daysInMonth: number;
  startingDayOfWeek: number;
  year: number;
  month: number;
}

export interface CalendarDataWithActions extends CalendarData {
  currentMonth: Date;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
}

export interface DateRangeWithActions {
  selectedRange: DateRange;
  handleDateClick: (date: Date) => void;
  isDateInRange: (date: Date) => boolean;
  isDateStart: (date: Date) => boolean;
  isDateEnd: (date: Date) => boolean;
}

export interface ScheduleSettings {
  bufferBefore: number;
  bufferAfter: number;
  interviewDuration: number;
  startTime: string;
  endTime: string;

}

export interface ScheduleSettingsWithActions extends ScheduleSettings {
  setBufferBefore: (value: number) => void;
  setBufferAfter: (value: number) => void;
  setInterviewDuration: (value: number) => void;
  setStartTime: (value: string) => void;
  setEndTime: (value: string) => void;

}

