/**
 * Simulation Service
 * Handles automated simulation of IoT system for demo and testing purposes
 * Only active when systemMode is 'simulation' and enableSimulation is true
 */

import type { MedicationDrawer } from '@/types'

export interface SimulationConfig {
  autoAdvanceTime: boolean
  timeAdvanceInterval: number // milliseconds between time advances
  timeAdvanceAmount: number // minutes to advance per interval
}

const defaultConfig: SimulationConfig = {
  autoAdvanceTime: true,
  timeAdvanceInterval: 2500, // advance every 2.5 seconds
  timeAdvanceAmount: 30, // advance 30 minutes each time
}

/**
 * Checks if current simulated time is within medication due window
 * Due window is 15 minutes from scheduled time
 */
export const isDueWindow = (simulatedTime: Date, schedule: string): boolean => {
  const currentMinutes = simulatedTime.getHours() * 60 + simulatedTime.getMinutes()
  return parseScheduleTimes(schedule).some((time) => {
    const targetMinutes = toMinutes(time)
    return currentMinutes >= targetMinutes && currentMinutes < targetMinutes + 15
  })
}

/**
 * Checks if medication was missed
 * Missed if current time is more than 45 minutes past scheduled time
 */
export const isMissedWindow = (simulatedTime: Date, schedule: string): boolean => {
  const currentMinutes = simulatedTime.getHours() * 60 + simulatedTime.getMinutes()
  return parseScheduleTimes(schedule).some((time) => currentMinutes > toMinutes(time) + 45)
}

/**
 * Parses schedule string and returns array of time strings
 * e.g., "06:00 / 18:00" -> ["06:00", "18:00"]
 */
export const parseScheduleTimes = (schedule: string): string[] =>
  schedule
    .split('/')
    .map((time) => time.trim())
    .filter(Boolean)

/**
 * Converts time string to minutes since midnight
 * e.g., "06:30" -> 390
 */
export const toMinutes = (time: string): number => {
  const [hours, minutes] = time.trim().split(':').map(Number)
  return hours * 60 + minutes
}

/**
 * Generates unique automation key for tracking processed automations
 * Prevents duplicate automation for same medication on same day
 */
export const generateAutomationKey = (
  drawerNumber: number,
  schedule: string,
  simulatedDate: Date
): string => {
  return `${drawerNumber}:${schedule}:${simulatedDate.toDateString()}`
}

/**
 * Get simulation configuration
 */
export const getSimulationConfig = (): SimulationConfig => {
  return defaultConfig
}

/**
 * Update simulation configuration
 */
export const updateSimulationConfig = (config: Partial<SimulationConfig>): void => {
  Object.assign(defaultConfig, config)
}

/**
 * Process drawer for automatic dispensing
 * Returns true if drawer should be automatically opened
 */
export const shouldAutoDispense = (
  drawer: MedicationDrawer,
  simulatedTime: Date,
  processedKeys: Set<string>
): boolean => {
  if (!drawer.medicationName || drawer.consumptionState !== 'pending') {
    return false
  }

  const automationKey = generateAutomationKey(
    drawer.drawerNumber,
    drawer.schedule,
    simulatedTime
  )

  if (processedKeys.has(automationKey)) {
    return false
  }

  return isDueWindow(simulatedTime, drawer.schedule)
}

/**
 * Check if medication should be marked as missed
 */
export const shouldMarkMissed = (
  drawer: MedicationDrawer,
  simulatedTime: Date,
  processedKeys: Set<string>
): boolean => {
  if (!drawer.medicationName || drawer.consumptionState !== 'pending') {
    return false
  }

  const automationKey = generateAutomationKey(
    drawer.drawerNumber,
    drawer.schedule,
    simulatedTime
  )

  if (processedKeys.has(automationKey)) {
    return false
  }

  return isMissedWindow(simulatedTime, drawer.schedule)
}

/**
 * Get human-readable status for simulation
 */
export const getSimulationStatus = (): string => {
  return 'Simulation Active - Mock data and automatic automation enabled'
}
