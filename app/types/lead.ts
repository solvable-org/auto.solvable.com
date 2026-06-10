export interface Car {
  year: string
  make: string
  model: string
}

export interface LeadData {
  // Vehicles
  cars: Car[]

  // Current insurance
  currently_insured: boolean
  insured_with: string

  // Profile — discounts captured as boolean flags matching payload field names
  homeowner: boolean
  marital_status: boolean // true = married
  military_affiliation: boolean

  // Demographics
  gender: 'male' | 'female' | 'non-binary' | ''
  credit_score: 'excellent' | 'good' | 'fair' | 'poor' | ''

  // Personal info
  birth_date: string // YYYY-MM-DD
  first_name: string
  last_name: string
  zip: string
  state: string
  city: string
  address1: string
  address2: string
  email: string
  phone: string // E.164: +15558675309

  // Compliance
  trustedform_cert_url: string
  jornaya_leadid: string

  // UTM / tracking
  pid: string
  cid: string
  sub1: string
  sub2: string
  sub3: string
  sub4: string
  sub5: string

  // Geo (resolved from ZIP)
  ip: string
}

export const defaultLeadData = (): LeadData => ({
  cars: [],
  currently_insured: true,
  insured_with: '',
  homeowner: false,
  marital_status: false,
  military_affiliation: false,
  gender: '',
  credit_score: '',
  birth_date: '',
  first_name: '',
  last_name: '',
  zip: '',
  state: '',
  city: '',
  address1: '',
  address2: '',
  email: '',
  phone: '',
  trustedform_cert_url: '',
  jornaya_leadid: '',
  pid: '',
  cid: '1001',
  sub1: '',
  sub2: '',
  sub3: '',
  sub4: '',
  sub5: '',
  ip: '',
})

// Step identifiers — drives navigation and GA event names
export type StepId =
  | 'zip'
  | 'year'
  | 'make'
  | 'model'
  | 'another-vehicle'
  | 'insured'
  | 'discounts'
  | 'gender'
  | 'credit'
  | 'birthdate'
  | 'name'
  | 'address'
  | 'email'
  | 'phone'
  | 'result'

export const STEP_ORDER: StepId[] = [
  'zip',
  'year',
  'make',
  'model',
  'another-vehicle',
  'insured',
  'discounts',
  'gender',
  'credit',
  'birthdate',
  'name',
  'address',
  'email',
  'phone',
  'result',
]

// GA event name per step (matches legacy tracking)
export const STEP_GA_EVENT: Record<StepId, string> = {
  'zip': 'zipcode',
  'year': 'vclyear',
  'make': 'vclmake',
  'model': 'vclmodel',
  'another-vehicle': 'anothervcl',
  'insured': 'insured',
  'discounts': 'demographic',
  'gender': 'gender',
  'credit': 'creditscore',
  'birthdate': 'birthdate',
  'name': 'name',
  'address': 'address',
  'email': 'email',
  'phone': 'phone',
  'result': 'leadsubmit',
}
