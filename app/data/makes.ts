// Vehicle makes shown as cards in StepMake. NHTSA is used for model lookups.
export const VEHICLE_MAKES = [
  'Acura',
  'Alfa Romeo',
  'Aston Martin',
  'Audi',
  'Bentley',
  'BMW',
  'Buick',
  'Cadillac',
  'Chevrolet',
  'Chrysler',
  'Dodge',
  'Ferrari',
  'Fiat',
  'Ford',
  'Genesis',
  'GMC',
  'Honda',
  'Hummer',
  'Hyundai',
  'Infiniti',
  'Isuzu',
  'Jaguar',
  'Jeep',
  'Kia',
  'Lamborghini',
  'Land Rover',
  'Lexus',
  'Lincoln',
  'Maserati',
  'Mazda',
  'McLaren',
  'Mercedes-Benz',
  'Mercury',
  'Mini',
  'Mitsubishi',
  'Nissan',
  'Porsche',
  'Ram',
  'Rolls-Royce',
  'Subaru',
  'Tesla',
  'Toyota',
  'Volkswagen',
  'Volvo',
] as const

export type VehicleMake = (typeof VEHICLE_MAKES)[number]

// Years for the year picker — current year down to 1981
export function getVehicleYears(): string[] {
  const current = new Date().getFullYear()
  return Array.from({ length: current - 1980 }, (_, i) => String(current - i))
}
