/*
  ALL CONTENT FOR ARTWORKS + MEDIA DESIGN LIVES HERE.
  Edit texts directly in this file, the pages and popups are built from it.

  Fields:
    id          short name, also used in links (e.g. artworks.html#retainer)
    title       shown on the grid and in the popup
    year        e.g. "2024"
    category    must match one of the filter buttons (see CATEGORIES below);
                use a list for several, e.g. ['Sculpture', 'Installation']
    material    optional, e.g. "Plaster, steel wire, TV mount"
    description 1–3 sentences
    images      number of images in img/<folder>/<id>/  (1.jpg, 2.jpg …), shown in that order
    ratio       artworks: width ÷ height of the first image (keeps the masonry grid steady while images load)
    tag         media only: short type shown under the title in the grid, e.g. 'Web game'
    link        media only: { label, href } → button in the popup; opens the project (website/PDF)
                full-screen inside the site. Extra project images belong in the project itself.
    placeholder media only: true = grey italic "placeholder" card, no popup
*/

const TODO = '[text coming]';

const CATEGORIES = {
  artworks: ['Sculpture', 'Installation', '2D works'],   // 2D works = drawings, prints, paintings
  media: ['Webdesign', 'Posters', 'Other'],
};

const ARTWORKS = [
  { id: 'fairings',     title: 'Fairings',     year: '2026', category: ['Sculpture', 'Installation'],
    material: 'Salvaged motorcycle fairings, melted plastic, cable ties, wire',
    description: 'Two wall-mounted forms built from discarded motorcycle body panels, wrapped in a translucent skin of melted plastic. Industrial surfaces turn into something shell-like and organic, somewhere between machine, insect and carcass.',
    images: 2, ratio: 1.778 },
  { id: 'the-waves',    title: 'The Waves',    year: '2020', category: 'Sculpture', material: '',
    description: 'A low, sprawling floor piece where horn-like limbs and a jagged, wing-like plate twist into one another. Worked in layered blues and white, the surface recalls breaking surf, as if a wave had frozen into a creature mid-movement.',
    images: 2, ratio: 1.5 },
  { id: 'chitin',       title: 'Chitin',       year: '2024', category: 'Installation', material: 'Ceramic',
    description: 'Three white, ribbed shells left on the shoreline, named after the material of insect and crustacean exoskeletons. Have they been shed, or are they waiting to be picked up and worn? Remains of something past, or casings holding potential for something yet to come? Conceived as a potentially performative work, the shells hover between leftover and prop.',
    images: 2, ratio: 1.76 },
  { id: 'print-red',    title: 'Print_Red',    year: '2021', category: '2D works',
    material: 'Linocut print on green tissue paper',
    description: 'A red linocut of dense, drawn line-work: twisting, root-like forms that sit between landscape and body. Hung loosely with clips, the torn lower edge of the tissue is left visible as part of the work.',
    images: 3, ratio: 0.667 },
  { id: 'circuit-tool', title: 'Circuit Tool', year: '2022', category: 'Sculpture',
    material: 'Carved concrete, motor oil, brass wire',
    description: 'A carved, blade-like concrete form, its oil-stained surface cut into grooves and folds like an old tool or relic. A thin brass wire traces its contours like a circuit, making the ancient-looking object read as a component of some unknown machine.',
    images: 1, ratio: 0.568 },
  { id: 'retainer',     title: 'Retainer',     year: '2026', category: 'Installation',
    material: 'Concrete, steel vices, steel wire, TV mount',
    description: 'A row of white, tooth-like concrete forms clamped between steel vices on a TV wall mount and held in tension by steel wires anchored to the wall. Like a dental brace at architectural scale, the piece is both restrained and restraining, suspended between body, machine and the room itself.',
    images: 3, ratio: 0.75 },
  { id: 'alicorn',      title: 'Alicorn',      year: '2020', category: 'Sculpture', material: '',
    description: 'A long, horn-tipped creature lies stretched across the floor, its body built from spiralling white strips like shed skin or bandages. Named after the mythical unicorn horn, the piece sits somewhere between relic, fossil and fantasy animal.',
    images: 4, ratio: 1.76 },
  { id: 'trident',      title: 'Trident',      year: '2024', category: 'Sculpture',
    material: 'Fine-grain concrete over a carved wooden core',
    description: 'A full-length trident laid on the floor, its shaft twisting like a vine before splitting into three bone-like prongs. The mythological weapon is softened into something grown rather than forged, part tool, part skeleton.',
    images: 3, ratio: 1.778 },
  { id: 'growth',       title: 'Growth',       year: '2022', category: 'Sculpture',
    material: 'Electro-magnet, steel vice, wood, papier-mâché, lifting magnet, lifting sling, cement',
    description: 'A silver, antler-like form rises in a flame-shaped loop, anchored to the ground by a red industrial lifting magnet, a steel vice and a purple sling. Organic growth and heavy-duty equipment are bound together, each holding the other in place.',
    images: 3, ratio: 0.667 },
  { id: 'of-stone',     title: 'Of Stone',     year: '2019', category: 'Sculpture', material: '',
    description: 'Broken slabs carved with spirals, a triangle-in-circle sign and a crouching, insect-like creature, like fragments of a forgotten tablet or an excavated floor. The pieces suggest a mythology that only survives in shards, leaving the viewer to piece together what the whole might have said.',
    images: 5, ratio: 1.5 },
  { id: 'bonework',     title: 'Bonework',     year: '2021', category: 'Sculpture',
    material: 'Wood, plaster, papier-mâché, thick wall paint, varnish',
    description: 'A towering white form rising from a jagged base, curving into a skeletal, jaw-like head lined with rows of teeth and thorns. Tendrils wind through the structure like sinew, so it reads as part skeleton, part plant, part predator. (Photo: the real sculpture, digitally placed in a gallery setting with AI.)',
    images: 1, ratio: 0.667 },
  { id: 'nymph',        title: 'Nymph',        year: '2025', category: 'Sculpture',
    material: 'Aluminium, woven willow branches, melted plastic',
    description: 'A silver, larva-like body with a hollow, mask-like head and a long, ridged tail that ends in a tuft of woven willow. Left on a weathered deck, it looks like a creature caught mid-transformation, the in-between stage its name refers to.',
    images: 4, ratio: 0.75 },
  { id: 'totem',        title: 'Totem',        year: '2021', category: ['Sculpture', 'Installation'], material: '',
    description: 'A carved column of angular, interlocking forms, pierced with rows of small holes, leaning against rough-cut blocks. Its layered, almost architectural shapes stack like a totem, with a carved pattern repeating across the surface.',
    images: 1, ratio: 0.667 },
  { id: 'lobster-pincers', title: 'Lobster Pincers', year: '2021', category: '2D works', sub: 'Digital work',
    material: 'Digital painting, photo-editing software',
    description: 'Two claw-like forms rendered in iridescent bands of teal, violet and blue against a flat dark ground. The surface breaks into stripes and moiré, so the pincers seem both solid and dissolving, a body translated into data and back.',
    images: 1, ratio: 0.748 },
  { id: 'painting-3', title: 'PNT_03v1.raw', year: '2022', category: '2D works', sub: 'Digital work',
    material: 'Digital painting, photo-editing software',
    description: 'Sharp, blade-like shapes cut diagonally through a black ground, built from stretched bands of yellow, lilac and bone-white. The image looks like a figure being pulled apart by its own data: a portrait smeared into speed and signal.',
    images: 1, ratio: 0.66 },
  { id: 'sotc', title: 'SotC', year: '2021', category: '2D works', sub: 'Digital work',
    material: 'Digital painting, photo-editing software',
    description: 'A dark, blue-black profile emerges from rippling, embossed surfaces, as if a face were pressed up through fabric or water. Light catches only the ridges, so the figure is half-sculpted, half-scanned, and never quite in focus.',
    images: 1, ratio: 0.682 },
  { id: 'boneless-wings', title: 'Boneless Wings', year: '2020', category: 'Sculpture', material: 'EVA foam',
    description: 'Grey foam strips woven into a tight, braided body from which long, curling tendrils spread across the floor like wings or antennae. Without an inner skeleton the form stays soft and collapsible, an insect or ornament that has lost its structure but kept its gesture.',
    images: 2, ratio: 1.5 },
  { id: 'disks', title: 'Disks', year: '2020', category: 'Sculpture', material: '',
    description: 'A row of white, carved disks threaded onto a thin steel rod, like a spine or a stack of weights lying on the floor. Each disk carries its own relief of spirals, signs and letter-like marks, so the piece reads as an archive of symbols that can be flipped through, one vertebra at a time.',
    images: 2, ratio: 1.5 },
  { id: 'drawing-gate', title: 'Drawing Gate', year: '2021', category: '2D works', material: 'Drawing on brown paper',
    description: 'A large drawing on brown paper where tendrils, horns and fibrous, bark-like forms knot together into a loose ring, a gateway grown rather than built. Dense hatching is set against open, single lines, so the image seems to be drawing itself as it grows.',
    images: 3, ratio: 0.667 },
  { id: 'mudrose', title: 'Mudrose', year: '2021', category: 'Sculpture',
    material: 'Hand-dug clay on mineral residue from iron-ore processing',
    description: 'A rose-like bloom of cracked, grey petals opening around a dark, porous core. The clay was dug up by hand in a quarry and built onto leftover minerals from iron-ore processing, so an industrial by-product becomes the root of a flower. Caught between blossoming and drying out, the cracks show it shrinking even as it unfolds.',
    images: 1, ratio: 1.76 },
  { id: 'chalk', title: 'Chalk', year: '2022', category: '2D works',
    material: 'Industrial (permanent) oilstick marker on raw canvas',
    description: 'An angular, stepped figure stands in an empty room, drawn in thin lines on a mottled grey surface. Long shadows fall across the floor toward the viewer, so the scene sits between architectural drawing, stage set and worn-out wall.',
    images: 1, ratio: 0.657 },
];

const MEDIA = [
  { id: 'flinta', title: 'CC Flinta', tag: 'Event poster', year: '2026', category: 'Posters', material: '',
    description: 'Poster series for CVNTY.VOL1, an evening of fashion show, flea market, exhibitions and live DJ sets. A digital painting of a chrome, skeletal serpent coils through the centre of the layout, set against soft lilac type, in 4 variations.',
    images: 4, thumbs: 3 },   // thumbs: show the first N images side by side in the grid
  { id: 'phil', title: 'Phil the Phish', tag: 'Web game', year: '2026', category: 'Webdesign', material: '',
    tools: 'HTML, SCSS, JavaScript, Figma, Photoshop, GIMP',
    description: 'An interactive, branching web story about phishing and suspicious downloads. A stressed student meets "Phil the Positivity Fish", a free browser plugin that promises a nicer internet, and every choice leads to the consequences of safe or unsafe behaviour. Fake pop-ups, trust signals and reviews are used with humour to teach young users to spot scams. Built mobile-first, with illustrated scenes and a JavaScript scene system that updates the page without reloading.',
    images: 2,
    link: { label: 'Play Phil the Phish', href: 'projects/phil-the-phish/index.html' } },
  { id: 'gls', title: 'GLS AI-Playbook', tag: 'Editorial / playbook', year: '2026', category: 'Other', material: '',
    tools: 'Editorial design, copywriting · Language: Danish',
    description: 'A 20-page AI playbook for GLS employees: a practical guide to using AI with value, care and critical sense. It covers when AI makes sense, choosing between GLS’ internal assistant Finn and external tools, prompting, data security and quality control. Finn (GLS’ official internal AI system, designed by GLS) guides the reader, alongside a first look at Ally, the proactive AI assistant GLS will launch in the future. Written in Danish.',
    images: 1,
    link: { label: 'Read the playbook', href: 'files/gls-ai-playbook.pdf' } },
  { id: 'weathered-forms', title: 'Website', category: 'Webdesign', placeholder: true },
  { id: 'tide',            title: 'Poster',  category: 'Posters',   placeholder: true },
  { id: 'vestur',          title: 'Poster',  category: 'Posters',   placeholder: true },
  { id: 'errata',          title: 'Poster',  category: 'Posters',   placeholder: true },
  { id: 'nordurljos',      title: 'Poster',  category: 'Posters',   placeholder: true },
];

/* Frontpage "Selected work" carousel, ids from the lists above */
const SELECTED = ['fairings', 'the-waves', 'alicorn', 'disks', 'retainer', 'gls', 'growth', 'flinta'];

/* Frontpage events, dates as YYYY-MM-DD. The site shows "NOW ON" while an event runs,
   "UPCOMING" before it starts, and hides it after the end date. Empty list → "dates to be announced". */
const EVENTS = [
  { title: 'XIRAFI', type: 'Exhibition', place: 'Athens', start: '2026-10-01', end: '2026-10-11',
    href: 'https://www.instagram.com/p/Ddi1-5LAJRU/' },
];

const INSTAGRAM = 'https://www.instagram.com/mrcs_kje/';
