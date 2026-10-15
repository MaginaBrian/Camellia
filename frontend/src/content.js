// Edit this file to change the site's text and contact details.
export const brand = {
  name: 'Camellia Horizons',
  phone: '+254 720 321993',
  phoneHref: 'tel:+254720321993',
  whatsapp: '254720321993',
  email: 'info@camelliahorizons.com',
  address: ['Lavington, Nairobi', 'Kenya'],
  map: 'https://www.google.com/maps/search/?api=1&query=Lavington%2C%20Nairobi%2C%20Kenya',
}

export const aboutLines = [
  'Each journey is shaped around who is coming: the parks, the pace and the time of year, and it is planned by people who know the ground.',
  'Guides, camps and the day-to-day work stay near the places you visit.',
]

export const philanthropyLine = 'A trip with us is meant to leave the wildlife, the livelihoods and the cultures you meet better cared for.'

export const destinations = [
  {
    id: 'kenya',
    name: 'Kenya',
    image: '/images/journeys/northern-circuit.jpg',
    alt: 'Elephants in the Maasai Mara',
    credit: 'Elephants, Maasai Mara. Photo: Ray in Manila, CC BY 2.0',
    places: ['Maasai Mara'],
  },
  {
    id: 'tanzania',
    name: 'Tanzania',
    image: '/images/journeys/kilimanjaro.jpg',
    alt: 'The summit of Kilimanjaro above the clouds',
    credit: 'Kilimanjaro. Photo: Joel Peel, CC0',
    places: ['Serengeti', 'Ngorongoro', 'Tarangire', 'Kilimanjaro', 'Mount Meru'],
  },
  {
    id: 'coast',
    name: 'The coast',
    image: '/images/journeys/island.jpg',
    alt: 'A dhow on the water at Zanzibar',
    credit: 'Dhow, Zanzibar. Photo: Anton Zelenov, CC BY-SA 3.0',
    places: ['Zanzibar'],
  },
]

export const enquireFallback = {
  image: '/images/hero.jpg',
  alt: 'A male lion resting in the grass of the Serengeti',
  credit: 'Lion, Serengeti. Photo: Giles Laurent, CC BY-SA 4.0',
  label: 'East Africa',
}

// Profile addresses are not published on the contact page yet. Add a href when each account is live.
export const socials = [
  { name: 'Facebook', href: '' },
  { name: 'X', href: '' },
  { name: 'YouTube', href: '' },
  { name: 'Threads', href: '' },
  { name: 'LinkedIn', href: '' },
]

// Real photographs, fetched from Wikimedia Commons. Keep the credit with the picture.
export const wildlife = [
  { src: '/images/wildlife/zebra.jpg', name: 'Plains zebra', place: 'Tarangire', position: 'center' },
  { src: '/images/wildlife/giraffe.jpg', name: 'Giraffe', place: 'Open country', position: 'center 15%' },
  { src: '/images/wildlife/buffalo.jpg', name: 'Cape buffalo', place: 'Ngorongoro', position: 'center' },
]

// PLACEHOLDER numbers. Replace with your real figures before launch.
export const proof = [
  { value: '12', label: 'years planning journeys in East Africa' },
  { value: '4', label: 'countries covered, one planner for all' },
  { value: '24/7', label: 'support while you are travelling' },
  { value: '1', label: 'guide with you from first day to last' },
]

export const about = {
  title: 'Private journeys, planned close to the ground.',
  parts: [
    {
      title: 'Our story',
      text: 'Camellia Horizons plans private travel across East Africa. Each journey is shaped around who is coming: the parks, the pace and the time of year. The point is time with the wildlife, with the cultures beside the parks, and with the people who live there.',
    },
    {
      title: 'Our purpose',
      text: 'The trip is planned and run by people who know the ground. Guides, camps and the day-to-day work stay near the places you visit. That same planning is meant to leave those places better cared for: the wildlife, the livelihoods and the cultures you meet.',
    },
  ],
}

export const whyIntro = 'The itinerary is built by the same team that runs it. The pace is yours, and the way we plan is meant to leave the places you visit better cared for.'

export const why = [
  { title: 'Planned on the ground', text: 'Your itinerary is built by the same team that runs it, so nothing is lost between offices.' },
  { title: 'Private vehicles and guides', text: 'The vehicle is yours. You set the pace, and your guide knows when to stay and when to move.' },
  { title: 'Journeys made to order', text: 'Safaris, treks and time on the coast can be reshaped around dates, pace, children and celebrations.' },
  { title: 'Honest seasons advice', text: 'We tell you what each month is really like, including the quiet and wet ones.' },
  { title: 'A desk you can reach', text: 'Trained guides, vetted camps, and a Nairobi desk that stays on the trip with you.' },
  { title: 'Travel that gives back', text: 'Wildlife, community livelihoods, culture, and support for children with special needs, including children with Down syndrome, are part of how we hope each journey gives back.' },
]

export const philanthropy = {
  title: ['Beyond safaris.', 'Beyond conservation.', 'Changing lives.'],
  lede: [
    'At Camellia Horizons, every journey should leave a positive mark: protecting wildlife, empowering communities, preserving cultures, and supporting children with special needs. The greatest journeys are the ones that leave the world a little better for everyone.',
    'A journey with us is about more than an unforgettable safari. It is also a chance to make a meaningful difference in the lives of communities across Kenya.',
  ],
  sections: [
    {
      kicker: 'Every journey creates an opportunity to give back',
      title: 'Giving back to our communities',
      text: [
        'The beauty of travel lies in the places you explore and in the lives you touch along the way.',
        'Our commitment to responsible travel goes beyond protecting wildlife and preserving Kenya’s natural heritage. We are equally committed to supporting local communities, standing with vulnerable families, and creating opportunities for children and people living with disabilities.',
      ],
    },
    {
      kicker: 'Every child deserves a chance to shine',
      title: 'Supporting children with special needs',
      text: [
        'We are committed to making a positive difference in the lives of children with special needs, including children with Down syndrome, autism, and other developmental or physical disabilities.',
        'Every child deserves love, dignity, inclusion, and the chance to thrive. Each child has abilities, dreams and potential of their own. We hope to help create a future where children of all abilities are valued, supported, and given room to flourish, through learning, belonging and personal growth.',
        'That hope includes inclusive education, the resources a family needs, social inclusion, and stronger families. How a particular journey can contribute is something we explain when you enquire.',
      ],
    },
    {
      title: 'Empowering families and local communities',
      text: [
        'Our vision also reaches families facing social and economic challenges. We hope to strengthen livelihoods, widen access to education, and support community-led efforts that create lasting change.',
      ],
    },
    {
      title: 'Travel with purpose',
      text: [
        'When you explore Kenya with Camellia Horizons, you become part of a journey that values people as much as places.',
        'We believe tourism can be a force for good: connecting travellers with communities, and encouraging compassion, understanding and a meaningful contribution.',
      ],
      close: 'Explore Kenya. Celebrate humanity. Make a difference.',
    },
  ],
  pillars: [
    {
      title: 'Wildlife and conservation',
      text: 'Protecting Kenya’s wildlife and the natural habitats that sustain it.',
    },
    {
      title: 'Community empowerment',
      text: 'Supporting local livelihoods and opportunities that can last.',
    },
    {
      title: 'Cultural preservation',
      text: 'Celebrating traditions and protecting the heritage of the places you visit.',
    },
    {
      title: 'Special needs and inclusion',
      text: 'A commitment to dignity, inclusion and opportunity for children of all abilities, including children with Down syndrome.',
    },
  ],
}

export const tradePoints = [
  'Rates and itineraries under your own branding',
  'Ground handling, vehicles and guides included',
  'A named contact who answers quickly',
  'Support for your clients around the clock',
]

export const months = [
  { m: 'Jan', climate: 'Dry and warm', crowds: 'Moderate', note: 'Calving begins on the southern plains, which draws lions and cheetahs close to the young.' },
  { m: 'Feb', climate: 'Hot and mostly dry', crowds: 'Busy', note: 'Peak of the calving season, with the herds spread across the short-grass plains.' },
  { m: 'Mar', climate: 'Rains arriving', crowds: 'Quiet', note: 'Green landscapes and good rates. Showers tend to come in the afternoon.' },
  { m: 'Apr', climate: 'Long rains', crowds: 'Quiet', note: 'The wettest stretch. Some camps close, but those open offer great value and empty roads.' },
  { m: 'May', climate: 'Rains easing', crowds: 'Quiet', note: 'Lush scenery, excellent birdlife and herds beginning to move north-west.' },
  { m: 'Jun', climate: 'Dry and cool', crowds: 'Moderate', note: 'Roads dry out and the herds travel through the western corridor.' },
  { m: 'Jul', climate: 'Dry and cool', crowds: 'Busy', note: 'Herds reach the northern rivers and river crossings become possible.' },
  { m: 'Aug', climate: 'Dry', crowds: 'Busy', note: 'Peak safari month. Book early for the best camps and the best crossing locations.' },
  { m: 'Sep', climate: 'Dry', crowds: 'Busy', note: 'Crossings continue and the grass is short, so predators are easy to watch.' },
  { m: 'Oct', climate: 'Dry, warming', crowds: 'Moderate', note: 'Fewer vehicles at the northern rivers before the short rains begin.' },
  { m: 'Nov', climate: 'Short rains', crowds: 'Quiet', note: 'Herds head south again. Brief storms, fresh green plains and lower prices.' },
  { m: 'Dec', climate: 'Warm, some showers', crowds: 'Busy', note: 'Festive season brings crowds, but wildlife on the southern plains is excellent.' },
]
