// Hyper-local town content for /service-areas/<town>, /<category>/<town> and /<category>/<sub>/<town>.
// RULES: only verifiable public facts (sources: /workspace/hyperlocal/sources.md in the PR notes, summarized in SOURCES below).
// No invented projects, customers, reviews, job counts, prices (other than the approved bathroom range used elsewhere),
// dates or offers. Wording is "serving <town>"; nothing here claims a job was done in a given town.
// Housing figures: U.S. Census Bureau, American Community Survey (ACS) 2020-2024 5-year estimates, place level.
// Population: 2020 Census. Small towns have wide ACS margins of error, so pages say "about".
export const ACS_NOTE = 'Housing figures: U.S. Census Bureau, American Community Survey 2020–2024 5-year estimates. Population: 2020 Census.';

export const ACS = {
  austin: { medYear: 2008, units: 1521, pre1980: 5, since2000: 86, since2010: 43, owner: 81, age65: 7 },
  benton: { medYear: 1995, units: 16230, pre1980: 34, since2000: 44, since2010: 22, owner: 68, age65: 16 },
  bryant: { medYear: 2000, units: 8503, pre1980: 17, since2000: 49, since2010: 26, owner: 71, age65: 13 },
  cabot: { medYear: 2000, units: 10677, pre1980: 13, since2000: 50, since2010: 17, owner: 69, age65: 14 },
  conway: { medYear: 1998, units: 29267, pre1980: 19, since2000: 46, since2010: 19, owner: 45, age65: 11 },
  greenbrier: { medYear: 2003, units: 2627, pre1980: 8, since2000: 65, since2010: 22, owner: 68, age65: 13 },
  jacksonville: { medYear: 1979, units: 12845, pre1980: 51, since2000: 22, since2010: 8, owner: 50, age65: 12 },
  'little-rock': { medYear: 1978, units: 99643, pre1980: 53, since2000: 23, since2010: 12, owner: 54, age65: 16 },
  maumelle: { medYear: 2000, units: 7905, pre1980: 13, since2000: 50, since2010: 15, owner: 76, age65: 17 },
  mayflower: { medYear: 1995, units: 1209, pre1980: 29, since2000: 40, since2010: 17, owner: 79, age65: 18 },
  morrilton: { medYear: 1975, units: 3160, pre1980: 60, since2000: 23, since2010: 11, owner: 58, age65: 20 },
  'north-little-rock': { medYear: 1975, units: 35250, pre1980: 57, since2000: 24, since2010: 15, owner: 45, age65: 17 },
  roland: { medYear: 1993, units: 373, pre1980: 25, since2000: 31, since2010: 11, owner: null, age65: 8 },
  sherwood: { medYear: 1986, units: 15030, pre1980: 38, since2000: 32, since2010: 19, owner: 71, age65: 18 },
  vilonia: { medYear: 2000, units: 1537, pre1980: 25, since2000: 49, since2010: 24, owner: 72, age65: 10 },
  ward: { medYear: 2006, units: 2590, pre1980: 9, since2000: 71, since2010: 34, owner: 69, age65: 8 },
};

const CAW_SOFT = 'Central Arkansas Water, which draws from Lake Maumelle and Lake Winona, lists its hardness at 17–29 mg/L (1.0–1.7 grains per gallon) and calls it soft water';

// Per-town authored copy. bath[] has one sentence per bathroom sub-service in this order:
// all-star-shower-systems, walk-in-showers, tub-to-shower-conversions, walk-in-tubs, aging-in-place-ada.
// kitchen[]: cabinet-refacing, cabinet-renovations, countertop-replacement, backsplash-installation.
// handy[]: repairs, installation, maintenance.
export const TOWN = {
  conway: {
    pop: '64,134', tag: 'the City of Colleges',
    story: 'Conway began as Conway Station, a depot town laid out by railroad engineer Asa P. Robinson after the Civil War. It is now the Faulkner County seat and goes by the City of Colleges for the University of Central Arkansas, Hendrix College and Central Baptist College. Our office sits at 11 Arnett Ln, so every crew day starts and ends here.',
    homes: 'Conway’s housing is younger than its history: the median home was built in 1998, about 46% of homes date from 2000 or later, and roughly 19% were built before 1980. Older houses gather near downtown and the campuses, while much of the newer stock sits in subdivisions on the west and south sides. Only about 45% of occupied homes are owner-occupied, so a good number of local bathrooms and kitchens serve rentals as well as owners.',
    water: 'Conway Corp supplies city water from Brewer Lake near Plumerville, a reservoir the U.S. Army Corps of Engineers created in 1983 by damming Cypress Creek, with Cadron Creek as a backup source.',
    permit: { office: 'City of Conway Building Permits & Inspections (1111 Main St)', url: 'https://www.conwayarkansas.gov/permits-inspections/', text: 'Conway requires a building permit for remodels, and electrical, plumbing, gas and mechanical work each need their own permit. Homes inside a local historic district need approval before the permit application goes in.' },
    schools: 'Conway Public Schools',
    hubH: 'Living and Remodeling in Conway, Our Home Base',
    bathH: 'What Shapes a Conway Bathroom Remodel',
    kitchenH: 'Conway Kitchens: Campus Bungalows to West-Side Subdivisions',
    handyH: 'Keeping Up a Conway Home',
    bath: [
      'Brewer Lake water and long, humid Conway summers are easier on a grout-free wall system, since there are no grout lines for soap film and mildew to settle into.',
      'In the brick ranch houses built around Conway from the 1960s through the 1980s, a low-threshold walk-in shower can usually go into the footprint of the original 5-foot tub alcove.',
      'Roughly one in five Conway homes predates 1980, so a tub-to-shower conversion near downtown or the colleges can uncover older supply lines or a soft subfloor; we look for both at the visit and put any change in writing first.',
      'A walk-in tub only works if the water heater can fill it, so for Conway homes we check heater size and age at the free in-home quote before suggesting a model.',
      'About 11% of Conway residents are 65 or older, a younger mix than many nearby towns because of the three campuses, yet curbless entries and grab-bar blocking still come up whenever a parent moves in.',
    ],
    kitchen: [
      'A Conway kitchen from the 1990s or 2000s with sound cabinet boxes is where refacing makes sense instead of tearing everything out.',
      'In an older kitchen near Hendrix or UCA with a tight galley layout, a cabinet renovation is as much about storage and reach as looks.',
      'With about 46% of Conway homes built since 2000, a kitchen that still has its original builder-grade laminate is a natural candidate for new countertops.',
      'A new backsplash is a quick way to update a rental or a starter home in Conway without taking the kitchen out of service for long.',
    ],
    handy: [
      'In older houses near downtown Conway, sticking doors, cracked trim and tired caulk can be grouped into one visit.',
      'In Conway’s newer west- and south-side subdivisions, installs such as grab bars, shelving, light fixtures and door hardware are quick to schedule from our office across town.',
      'Spring storms and humid summers in Faulkner County are hard on exterior caulk and seals, so seasonal maintenance here is mostly about keeping water out.',
    ],
    faq: {
      hub: [
        { q: 'Where is All-Star Renovations located in Conway?', a: 'Our office is at 11 Arnett Ln, Conway, AR 72032. Conway is our home base, so visits anywhere in ZIP 72032 or 72034 are a short drive.' },
        { q: 'Do I need a permit to remodel in Conway?', a: 'The City of Conway requires a building permit for remodels, with separate permits for electrical, plumbing, gas and mechanical work. Homes in a local historic district need approval first. Details are on the city’s Building Permits & Inspections page.' },
      ],
      bath: [{ q: 'Which shower walls hold up best in humid Conway summers?', a: 'Grout-free wall panels leave fewer seams for soap film and mildew to settle into, which matters in humid Conway summers. Conway Corp supplies city water from Brewer Lake; we can talk through glass and fixture finishes at the free in-home quote.' }],
      kitchen: [{ q: 'Are Conway kitchens usually refaced or replaced?', a: 'It depends on the cabinet boxes. Kitchens from the 1990s and 2000s with solid boxes can often be refaced, while an older galley kitchen near the colleges may need a new layout. We check at the free in-home quote.' }],
      handy: [{ q: 'Can you handle repairs at a Conway rental?', a: 'Yes. With only about 45% of Conway homes owner-occupied, many homes here are rentals. We can group a punch list of repairs at a Conway rental into one visit. Call (501) 504-3398.' }],
    },
  },
  greenbrier: {
    pop: '5,707', tag: 'the US-65 town north of Conway',
    story: 'Greenbrier was named for the greenbrier vines along its creek and incorporated in 1880. US-65 was routed through town in 1942, and the city has grown into a bedroom community about 12 miles north of Conway, from 4,706 residents in 2010 to 5,707 in 2020. Woolly Hollow State Park is a short drive away.',
    homes: 'Greenbrier is one of the newest housing markets we serve: the median home was built in 2003, and about 65% of homes date from 2000 or later. Only about 8% were built before 1980, mostly on larger rural lots and along the older US-65 corridor.',
    water: 'Greenbrier Waterworks buys treated water from Community Water System, which draws from Greers Ferry Lake.',
    permit: { office: 'City of Greenbrier Planning & Zoning (City Hall, 11 Wilson Farm Road)', url: 'https://www.greenbrierar.gov/planning-zoning', text: 'Building permit and inspection questions in Greenbrier go to Planning & Zoning at City Hall on Wilson Farm Road.' },
    schools: 'Greenbrier School District',
    hubH: 'Greenbrier at a Glance: New Subdivisions on an Old Stage Route',
    bathH: 'Bathroom Projects in Greenbrier’s Newer Homes',
    kitchenH: 'Greenbrier Kitchens Built After 2000',
    handyH: 'Handyman Help Between US-65 and Springhill',
    bath: [
      'Because most Greenbrier homes were built after 2000, an All-Star Shower System there usually means swapping the existing tub or insert for a grout-free surround rather than reworking old plumbing.',
      'If your Greenbrier home from the 2000s has a garden tub that rarely gets used, a walk-in shower can take its place in the primary bath.',
      'The roughly 8% of Greenbrier homes built before 1980, many on acreage toward Springhill, are the likeliest to still have a tub-shower combo worth converting.',
      'Greenbrier’s median age was 32.5 at the 2020 Census, so walk-in tubs here tend to be about planning for a parent or for staying in the house long term.',
      'When a Greenbrier family plans for aging in place, we look at hallway and doorway widths as well as the shower, since newer builder plans can be tight.',
    ],
    kitchen: [
      'Cabinet refacing fits many Greenbrier kitchens because boxes built after 2000 are usually still square and solid.',
      'Adding pantry space or an island to a Greenbrier builder layout is a cabinet renovation rather than a refresh.',
      'If your Greenbrier home from the 2000s or 2010s still has builder-grade laminate, countertop replacement is a natural first upgrade.',
      'A backsplash adds finish to a Greenbrier kitchen that has bare painted drywall behind the counters.',
    ],
    handy: [
      'Newer Greenbrier houses still settle, so drywall cracks and doors that drift out of square are typical repair items.',
      'On rural Greenbrier lots, installs can range from shelving in shops and garages to grab bars inside the house.',
      'Greenbrier sits in northwestern Faulkner County, and after heavy spring rain, door sweeps and exterior caulk deserve a look.',
    ],
    faq: {
      hub: [{ q: 'How long does it take your crew to reach Greenbrier?', a: 'Greenbrier (ZIP 72058) is about 12 miles north of our Conway office on US-65, usually 15 to 20 minutes.' }],
      bath: [{ q: 'Can a garden tub in a Greenbrier home become a walk-in shower?', a: 'Often, yes. Many Greenbrier homes built since 2000 have a garden tub in the primary bath. We measure it at the free in-home quote and show you shower options that fit the space.' }],
      kitchen: [{ q: 'What kitchen updates suit newer Greenbrier homes?', a: 'Countertop replacement, refacing and backsplashes are the usual starting points, because about 65% of Greenbrier homes date from 2000 or later and the cabinet boxes are usually still solid.' }],
      handy: [{ q: 'Do you serve rural Greenbrier addresses?', a: 'Yes. We serve ZIP 72058, including rural lots toward Springhill. Call (501) 504-3398 to confirm your address.' }],
    },
  },
  vilonia: {
    pop: '4,288', tag: 'the US-64 town east of Conway',
    story: 'Vilonia was settled in the 1860s and incorporated in 1938; the town’s name comes from a transcription error that dropped the “s” from Vilsonia. It sits about 13 miles east of Conway off US-64. Tornadoes struck the town in April 2011 and again on April 27, 2014, when an EF4 storm destroyed homes and businesses, and many homes and businesses were rebuilt afterward.',
    homes: 'Vilonia more than doubled from 2,106 residents in 2000 to 4,288 in 2020. The median home was built in 2000, about 49% of homes date from 2000 or later, and about a quarter were built before 1980, so newer rebuilds sit next to older farmhouses and ranch homes.',
    water: 'Vilonia Waterworks buys its water from regional suppliers, including Community Water System on Greers Ferry Lake.',
    permit: { office: 'Vilonia City Hall (18 Bise Drive)', url: 'https://www.cityofvilonia.gov/municipal-code', text: 'Vilonia building permits come from City Hall on Bise Drive, and the city’s code enforcement staff handle inspections.' },
    schools: 'Vilonia School District',
    hubH: 'Vilonia: Rebuilt, Growing and 13 Miles From Our Office',
    bathH: 'Bathrooms in Vilonia’s Rebuilt and Older Homes',
    kitchenH: 'Kitchen Updates for Vilonia Homes',
    handyH: 'Repairs and Upkeep Along the US-64 Corridor',
    bath: [
      'If your Vilonia home was rebuilt after 2014 with a stock fiberglass shower, a grout-free All-Star Shower System is a step up without moving plumbing.',
      'In an older Vilonia farmhouse or ranch home with a small hall bath, a low-threshold walk-in shower can open up floor space.',
      'About a quarter of Vilonia homes predate 1980, and those original tub-shower combos are the usual candidates for a conversion.',
      'Only about 10% of Vilonia residents are 65 or older, so walk-in tubs here tend to be planned around one person’s needs; we size the tub and water heater to match.',
      'In a single-story Vilonia ranch home, curbless showers and wider doorways are easier to plan for aging in place.',
    ],
    kitchen: [
      'Refacing suits Vilonia homes built in the last two decades, where the cabinet boxes are still in good shape.',
      'In an older Vilonia farmhouse whose kitchen was added onto over the years, a cabinet renovation can pull the layout together.',
      'If your Vilonia home was rebuilt after 2014 with builder-grade laminate counters, new countertops are a good place to start.',
      'A tile backsplash is an easy way to give a Vilonia rebuild a finished, personal look.',
    ],
    handy: [
      'Vilonia homeowners know storm damage firsthand; after a storm we can handle interior repairs like drywall, trim and doors once the roof is dry.',
      'Installs in Vilonia often include grab bars, door hardware and storm-season basics like weatherstripping.',
      'Spring is severe-weather season in Faulkner County, so a pre-spring check of caulk, seals and door sweeps is worth scheduling in Vilonia.',
    ],
    faq: {
      hub: [{ q: 'Do you serve Vilonia and the area toward Mount Vernon?', a: 'Yes. We serve Vilonia (ZIP 72173) and nearby rural acreage, about 14 miles from our Conway office via US-64.' }],
      bath: [{ q: 'Can you upgrade the shower in a Vilonia home rebuilt after the 2014 tornado?', a: 'Yes. If your rebuilt Vilonia home has a stock fiberglass shower, a grout-free wall system or walk-in shower usually fits the existing space and plumbing.' }],
      kitchen: [{ q: 'Is it worth updating a kitchen in a newer Vilonia home?', a: 'About half of Vilonia homes date from 2000 or later, so cabinet boxes are often solid. Countertops, refacing or a backsplash can update the look without a full tear-out.' }],
      handy: [{ q: 'Do you do storm-related interior repairs in Vilonia?', a: 'We handle interior repairs such as drywall, trim, doors and fixtures in Vilonia. Roofing is not part of our services. Call (501) 504-3398.' }],
    },
  },
  maumelle: {
    pop: '19,251', tag: 'the planned New Town on the Arkansas River',
    story: 'Maumelle began as a planned “New Town”: developer Jess P. Odom bought about 5,000 acres in 1967, the first residents arrived in 1974, and the city incorporated in 1985. It sits on the Arkansas River northwest of Little Rock, with Lake Willastein, Lake Valencia and about 13 miles of city trails.',
    homes: 'Because the whole city was planned, Maumelle has almost no pre-1970 housing. The median home was built in 2000, about 37% of homes date from the 1980s and 1990s, and about half were built in 2000 or later. Roughly 76% of homes are owner-occupied, one of the higher rates among the towns we serve.',
    water: `Maumelle has been served by Central Arkansas Water since a 2016 merger. ${CAW_SOFT}.`,
    permit: { office: 'City of Maumelle Planning & Permits (550 Edgewood Dr)', url: 'https://www.maumelle.gov/534/Building-Code-Enforcement-Permits', text: 'Maumelle requires permits for additions and remodels and for electrical, plumbing and HVAC work, through Planning & Permits on Edgewood Drive.' },
    schools: 'Pulaski County Special School District',
    hubH: 'Maumelle: A Planned Community From the 1970s Onward',
    bathH: 'Updating Maumelle’s 1980s, 1990s and 2000s Bathrooms',
    kitchenH: 'Maumelle Kitchens Ready for a Second Act',
    handyH: 'Handyman Work for Maumelle Homeowners',
    bath: [
      'Maumelle’s soft Central Arkansas Water leaves little mineral scale, so a grout-free All-Star Shower System stays easy to clean with simple wipe-downs.',
      'In an original 1980s or 1990s Maumelle bathroom, either a hall-bath tub-shower or a dated primary-bath stall can become a low-threshold walk-in shower.',
      'With about 37% of Maumelle homes built in the 1980s and 1990s, many hall baths still have the original tub that a conversion can replace.',
      'About 17% of Maumelle residents are 65 or older, and walk-in tubs are one way long-time owners here plan to stay in their homes.',
      'Maumelle’s high owner-occupancy rate means many homeowners plan to stay put, which is when grab-bar blocking and curbless entries pay off.',
    ],
    kitchen: [
      'Cabinets from Maumelle’s 1980s and 1990s building years are often solid enough to reface rather than replace.',
      'Where a Maumelle kitchen from that era has a closed layout, a cabinet renovation can rework storage without moving walls.',
      'If your Maumelle kitchen still has its original laminate or tile counters, countertop replacement is usually the first step.',
      'A new backsplash brings an older Maumelle kitchen up to date for owners who are not ready for a full remodel.',
    ],
    handy: [
      'Thirty- and forty-year-old Maumelle homes bring repairs like worn trim, loose door hardware and cracked caulk around tubs.',
      'Installs in Maumelle often include grab bars, new fixtures and shelving for owners updating a home they plan to keep.',
      'Wooded Maumelle lots near the river and lakes see plenty of moisture, so exterior caulk and seals are worth checking each year.',
    ],
    faq: {
      hub: [{ q: 'Is Maumelle water hard?', a: 'No. Maumelle is served by Central Arkansas Water, which reports hardness of 17–29 mg/L (1.0–1.7 grains per gallon) and calls it soft water. That is easy on shower glass and fixtures.' }],
      bath: [{ q: 'Are 1990s Maumelle bathrooms good candidates for a walk-in shower?', a: 'Usually, yes. About 37% of Maumelle homes were built in the 1980s and 1990s, and their original tub-showers and stalls can often be replaced with a low-threshold walk-in shower in the same footprint.' }],
      kitchen: [{ q: 'Can I reface the cabinets in my 1990s Maumelle kitchen?', a: 'If the cabinet boxes are solid, often yes. We check them at the free in-home quote in Maumelle (ZIP 72113) and tell you whether refacing or replacement fits.' }],
      handy: [{ q: 'Do I need a permit for small repairs in Maumelle?', a: 'Maumelle requires permits for remodels and for electrical, plumbing and HVAC work. Small cosmetic repairs usually do not, but check with Maumelle Planning & Permits for your project.' }],
    },
  },
  'north-little-rock': {
    pop: '64,591', tag: 'Argenta’s side of the river',
    story: 'North Little Rock was founded as Argenta in 1871, annexed by Little Rock in 1890 and reincorporated as North Little Rock in 1901. The Argenta Historic District downtown, Burns Park, Dickey-Stephens Park and Simmons Bank Arena all sit on this side of the Arkansas River.',
    homes: 'North Little Rock has some of the oldest housing we serve. The median home was built in 1975, about 57% of homes predate 1980, and roughly 23% were built before 1960, from Argenta’s historic houses to the 1920s–1950s streets of Park Hill and mid-century Lakewood and Indian Hills.',
    water: `North Little Rock is inside Central Arkansas Water’s direct service area. ${CAW_SOFT}.`,
    permit: { office: 'City of North Little Rock Planning Department permit desk', url: 'https://nlr.ar.gov/business/permits/', text: 'North Little Rock issues building permits through its Planning Department, and homeowners can pull a permit for work on their own residence.' },
    schools: 'North Little Rock School District',
    hubH: 'North Little Rock: Historic Argenta to Mid-Century Lakewood',
    bathH: 'Bathrooms in North Little Rock’s Older Neighborhoods',
    kitchenH: 'North Little Rock Kitchens, From Park Hill to Indian Hills',
    handyH: 'Fixing Up Older North Little Rock Homes',
    bath: [
      'If your North Little Rock bath still has a tiled tub surround from the 1950s or 1960s, a grout-free All-Star Shower System replaces it without decades of grout to scrub.',
      'Narrow mid-century bathrooms in Park Hill, Lakewood and Indian Hills can often take a low-threshold walk-in shower in the old tub space.',
      'About 57% of North Little Rock homes predate 1980, so tub-to-shower conversions here call for a careful look at older drains and subfloors at demo.',
      'With about 17% of residents 65 or older, North Little Rock homeowners who want to keep soaking often ask how a walk-in tub fits a 5-foot alcove.',
      'Older North Little Rock homes may have narrow bathroom doors, so aging-in-place plans here start with the doorway, not just the shower.',
    ],
    kitchen: [
      'Solid-wood cabinets in some older North Little Rock homes can be good candidates for refacing when the boxes are still sound.',
      'Kitchens in 1920s–1950s Park Hill homes were not built for today’s appliances, so a cabinet renovation can rework storage and fit.',
      'Countertop replacement in a North Little Rock mid-century kitchen often means checking that older cabinets are level before new tops go on.',
      'A backsplash can bring a North Little Rock kitchen up to date while keeping the character of an older home.',
    ],
    handy: [
      'With about 23% of North Little Rock homes built before 1960, repairs here often mean older plaster or drywall, sticking doors and worn trim.',
      'Installs in older North Little Rock homes take extra care with framing and blocking, especially for grab bars.',
      'North Little Rock averages about 46 inches of rain a year, so caulk, seals and door sweeps are worth checking every season.',
    ],
    faq: {
      hub: [{ q: 'Do you serve all North Little Rock ZIP codes?', a: 'We serve North Little Rock ZIP 72114, 72116, 72117 and 72118, about 30 miles from our Conway office via I-40.' }],
      bath: [{ q: 'Can you remodel a bathroom in an older North Little Rock home?', a: 'Yes. About 57% of North Little Rock homes predate 1980. We check drains, subfloor and wall framing at the free in-home quote and explain any extra work before it starts.' }],
      kitchen: [{ q: 'Do you work on kitchens in Park Hill and Lakewood?', a: 'Yes. We serve kitchens across North Little Rock, including Park Hill, Lakewood and Indian Hills. Call (501) 504-3398 for a free in-home quote.' }],
      handy: [{ q: 'Can a homeowner pull a permit in North Little Rock?', a: 'North Little Rock lets homeowners permit work on their own residence through the Planning Department. For work we do, we confirm permit needs during your quote.' }],
    },
  },
  'little-rock': {
    pop: '202,591', tag: 'the capital city',
    story: 'Little Rock is the state capital and the Pulaski County seat. Its neighborhoods run from the Victorian houses of the Quapaw Quarter and the 1920s–1940s streets of the Heights and Hillcrest to Chenal Valley and West Little Rock.',
    homes: 'Little Rock’s housing is old by Central Arkansas standards: the median home was built in 1978, about 53% of homes predate 1980, and about 21% were built before 1960. Roughly 23% date from 2000 or later, concentrated in the western part of the city.',
    water: `Little Rock is served by Central Arkansas Water. ${CAW_SOFT}.`,
    permit: { office: 'City of Little Rock Planning & Development, Building Codes Division (723 W. Markham St.)', url: 'https://littlerock.gov/government/city-departments/planning-and-development/', text: 'Little Rock requires a building permit for work over $5,000 in materials and labor or any work that needs an inspection, while painting, floor coverings and cosmetic changes are exempt. Electrical, gas, plumbing and mechanical work need their own permits.' },
    schools: 'Little Rock School District',
    hubH: 'Little Rock: From the Quapaw Quarter to Chenal Valley',
    bathH: 'Little Rock Bathrooms, Old and New',
    kitchenH: 'Kitchens Across Little Rock’s Neighborhoods',
    handyH: 'Handyman Work in an Older City',
    bath: [
      'Little Rock’s soft Central Arkansas Water is easy on fixtures, and a grout-free All-Star Shower System removes the grout that older tiled baths in the Heights and Hillcrest need resealed.',
      'Small bathrooms in 1920s–1940s Heights and Hillcrest bungalows can often take a walk-in shower in the original tub space.',
      'Since about 53% of Little Rock homes predate 1980, a tub-to-shower conversion here gets a close look at drains, supply lines and subfloor before we quote.',
      'Walk-in tubs suit Little Rock owners who want to keep bathing rather than switch to a shower; we check the doorway and water heater first.',
      'About 16% of Little Rock residents are 65 or older, and aging-in-place bathrooms here range from grab bars in a Hillcrest bungalow to curbless showers in West Little Rock.',
    ],
    kitchen: [
      'Refacing can update a Little Rock kitchen with sound cabinet boxes, whether it is a mid-century ranch or a 1990s West Little Rock home.',
      'Bungalow kitchens in the Heights and Hillcrest are often small, so a cabinet renovation focuses on storage and workflow.',
      'In Little Rock, a project over $5,000 that needs an inspection requires a city permit, which can apply to bigger countertop and cabinet jobs.',
      'A backsplash is one of the simplest ways to modernize an older Little Rock kitchen while keeping its character.',
    ],
    handy: [
      'About 21% of Little Rock homes were built before 1960, which means plaster walls, older doors and trim that need patient repairs.',
      'Installs in Little Rock range from grab bars in older homes to shelving and fixtures in newer West Little Rock houses.',
      'Little Rock’s humid summers and stormy springs are hard on caulk, seals and exterior trim, so yearly maintenance pays off.',
    ],
    faq: {
      hub: [{ q: 'Which Little Rock ZIP codes do you serve?', a: 'We serve Little Rock ZIP 72201, 72202, 72204, 72205, 72206, 72207, 72209, 72210, 72211, 72212, 72223 and 72227, about 32 miles from our Conway office.' }],
      bath: [{ q: 'Do I need a permit for a bathroom remodel in Little Rock?', a: 'Little Rock requires a building permit for work over $5,000 or work that needs an inspection, and plumbing and electrical work need their own permits. We confirm permit needs for your project during the free in-home quote.' }],
      kitchen: [{ q: 'Do you remodel kitchens in the Heights and Hillcrest?', a: 'Yes. We serve kitchens across Little Rock, including the Heights, Hillcrest, Chenal Valley and West Little Rock. Call (501) 504-3398.' }],
      handy: [{ q: 'Can you repair plaster walls in an older Little Rock home?', a: 'We handle patching and drywall repairs in Little Rock homes, including older houses. We look at the wall at the visit and tell you what repair fits.' }],
    },
  },
  sherwood: {
    pop: '32,731', tag: 'the north Pulaski County suburb',
    story: 'Sherwood incorporated as a town in 1948 and became a first-class city in 1971. It annexed the Gravel Ridge community in 2008, and on March 31, 2023, a tornado that touched down in Little Rock tracked through Sherwood and damaged homes.',
    homes: 'Sherwood is a suburb of established neighborhoods: the median home was built in 1986, about 38% of homes predate 1980, and about 32% were built in 2000 or later. Roughly 71% of homes are owner-occupied.',
    water: `Sherwood is inside Central Arkansas Water’s direct service area. ${CAW_SOFT}.`,
    permit: { office: 'City of Sherwood Permits & Planning Division', url: 'https://www.cityofsherwood.net/158/Permits-Planning-Division', text: 'Sherwood residential permits need plans and a detailed scope of work, and the city asks contractors for a contractor license, a city business license and a city bond.' },
    schools: 'Pulaski County Special School District',
    hubH: 'Sherwood: Established Neighborhoods North of the River',
    bathH: 'Bathroom Remodeling for Sherwood’s 1970s–1990s Homes',
    kitchenH: 'Sherwood Kitchens Due for an Update',
    handyH: 'Handyman Help in Sherwood and Gravel Ridge',
    bath: [
      'Dated fiberglass tubs in Sherwood homes from the 1970s through the 1990s can be replaced with a grout-free All-Star Shower System in the same opening.',
      'A low-threshold walk-in shower suits Sherwood’s owner-occupied ranch and two-story homes when the primary bath still has its original stall.',
      'About 38% of Sherwood homes predate 1980, so original tub-showers in North Hills and older subdivisions are prime conversion candidates.',
      'About 18% of Sherwood residents are 65 or older, one of the higher shares we serve, which is where walk-in tubs come into the conversation.',
      'For long-time Sherwood owners planning to stay, aging-in-place updates like grab-bar blocking and curbless entries make a bathroom work for years.',
    ],
    kitchen: [
      'Refacing works well for 1980s and 1990s Sherwood kitchens with sturdy cabinet boxes and tired doors.',
      'In Sherwood’s older subdivisions, a cabinet renovation can rework a 1970s layout for today’s appliances.',
      'In a 1990s Sherwood kitchen, the countertops are usually the most worn surface and a logical first step.',
      'A new backsplash pairs well with new counters in a Sherwood kitchen and finishes the update.',
    ],
    handy: [
      'If the March 2023 tornado left interior drywall, trim or door damage in your Sherwood home, those repairs are part of our handyman work.',
      'Installs in Sherwood often include grab bars and fixtures for owners who plan to stay in their homes.',
      'Sherwood July highs average about 92°F, so humid-season checks of caulk and seals help prevent water damage.',
    ],
    faq: {
      hub: [{ q: 'Do you serve Gravel Ridge?', a: 'Yes. Gravel Ridge became part of Sherwood in 2008, and we serve Sherwood ZIP 72120 and nearby addresses, about 28 miles from our Conway office.' }],
      bath: [{ q: 'What should I ask a contractor before a Sherwood bathroom remodel?', a: 'Sherwood asks contractors for a contractor license, a city business license and a city bond, and residential permits need plans and a scope of work. Ask any contractor you hire about each one.' }],
      kitchen: [{ q: 'Is refacing a good fit for a 1990s Sherwood kitchen?', a: 'Often, if the cabinet boxes are sound. We check them at your free in-home quote and compare refacing with replacement.' }],
      handy: [{ q: 'Can you fix interior storm damage in Sherwood?', a: 'We handle interior repairs such as drywall, trim, doors and fixtures. Roofing is not part of our services. Call (501) 504-3398.' }],
    },
  },
  cabot: {
    pop: '26,569', tag: 'Lonoke County’s largest city',
    story: 'Cabot started around 1873 as a refueling stop on the Cairo & Fulton Railroad and is now the largest city in Lonoke County. It grew after Little Rock Air Force Base opened in nearby Jacksonville in 1955, and Camp Nelson Confederate Cemetery sits in the hills nearby.',
    homes: 'Cabot’s growth shows in its housing: the median home was built in 2000, about half of homes date from 2000 or later, and only about 13% predate 1980. Most of the rest went up in the 1980s and 1990s as the city became a commuter suburb.',
    water: 'Cabot WaterWorks uses alluvial aquifer wells plus treated water purchased from Central Arkansas Water.',
    permit: { office: 'City of Cabot Planning & Zoning (1 City Plaza)', url: 'https://www.cabotar.gov/415/Residential-Permits', text: 'Residential permits in Cabot, including remodels and electrical, plumbing and HVAC work, go through the city’s Planning & Zoning office.' },
    schools: 'Cabot Public Schools',
    hubH: 'Cabot: A Railroad Town Turned Commuter Suburb',
    bathH: 'Bathroom Remodeling in Cabot’s Subdivision Homes',
    kitchenH: 'Cabot Kitchens From the 1980s Onward',
    handyH: 'Handyman Services Across Cabot',
    bath: [
      'Cabot WaterWorks uses local wells plus Central Arkansas Water, and a grout-free All-Star Shower System keeps cleanup simple either way.',
      'Cabot’s 1990s and 2000s subdivision homes often have room in the primary bath to trade a garden tub for a walk-in shower.',
      'Only about 13% of Cabot homes predate 1980, so tub-to-shower conversions here usually work with newer plumbing.',
      'Walk-in tubs in Cabot are planned around one person’s mobility, with the tub and water heater sized together.',
      'Many Cabot households have ties to Little Rock Air Force Base, so aging-in-place features that also help resale, like grab-bar blocking, make sense.',
    ],
    kitchen: [
      'Cabinet boxes in Cabot homes from the 1990s and 2000s are usually sound, which makes refacing a practical choice.',
      'As Cabot families grow, cabinet renovations add pantry storage or an island to a builder layout.',
      'In a Cabot subdivision kitchen with builder-grade laminate, new countertops are the usual starting point.',
      'A backsplash gives a Cabot kitchen a finished look before a sale or a PCS move.',
    ],
    handy: [
      'Cabot homes from the 1980s and 1990s growth years now need trim, door and drywall repairs as they age.',
      'Installs in Cabot range from shelving and fixtures to grab bars for family members.',
      'Before a Cabot summer, a check of caulk, seals and weatherstripping helps keep cooling bills and moisture down.',
    ],
    faq: {
      hub: [{ q: 'How far is Cabot from your office?', a: 'Cabot (ZIP 72023) is about 29 miles from our Conway office via I-40 and US-67/167, roughly 40 to 45 minutes.' }],
      bath: [{ q: 'Can you replace a garden tub with a shower in a Cabot home?', a: 'Often, yes. About half of Cabot homes date from 2000 or later, and primary baths in newer homes often have room for a walk-in shower in place of a garden tub. We measure at the free in-home quote.' }],
      kitchen: [{ q: 'Can you update a Cabot kitchen before we sell or PCS?', a: 'Yes. Countertops, refacing and backsplashes are common pre-sale updates. Timing varies by project and is confirmed in your written quote.' }],
      handy: [{ q: 'Do you serve Cabot, Austin and Ward together?', a: 'Yes. We serve Cabot (72023), Austin (72007) and Ward (72176) along the US-67/167 corridor.' }],
    },
  },
  benton: {
    pop: '35,014', tag: 'the Saline County seat',
    story: 'Benton was first settled in 1833, named for Missouri Senator Thomas Hart Benton, and is the Saline County seat. Early industry included a salt works from 1827 and pottery made from local kaolin clay around 1900. The Saline River runs along the east side of town.',
    homes: 'Benton mixes old and new: the median home was built in 1995, about 34% of homes predate 1980 (13% before 1960), and about 44% were built in 2000 or later along the I-30 corridor.',
    water: 'Benton Utilities treats water from the Saline River, Lake Norrell and the Chenault Reservoir at its own purification plant.',
    permit: { office: 'City of Benton Community Development (410 River Street)', url: 'https://www.bentonar.gov/permits-and-applications', text: 'Benton requires permits for remodels and additions through Community Development, and residential permits include footing, framing and final inspections where they apply.' },
    schools: 'Benton School District (parts of Benton are in the Bryant, Bauxite and Harmony Grove districts)',
    hubH: 'Benton: Courthouse Square to the I-30 Corridor',
    bathH: 'Bathroom Remodeling in Benton’s Older and Newer Homes',
    kitchenH: 'Benton Kitchens, Mid-Century to Today',
    handyH: 'Repairs and Upkeep in Benton',
    bath: [
      'Benton’s water comes from the Saline River, Lake Norrell and the Chenault Reservoir, and a grout-free All-Star Shower System keeps cleanup simple whatever your tap leaves behind.',
      'In a mid-century Benton ranch home with a small hall bath, a walk-in shower makes better use of the room.',
      'About 34% of Benton homes predate 1980, and those original tub-showers near the courthouse square and along Military Road are typical conversion candidates.',
      'About 16% of Benton residents are 65 or older, and walk-in tubs give long-time owners a safer way to keep soaking.',
      'Aging-in-place plans in Benton often start with grab-bar blocking and a low or curbless shower entry in a single-level home.',
    ],
    kitchen: [
      'Benton kitchens from the 1990s and 2000s with sound cabinet boxes can be refaced instead of replaced.',
      'Older Benton homes near downtown may need a cabinet renovation to fit modern appliances and storage.',
      'In Benton subdivision homes along I-30, countertop replacement is a practical first kitchen upgrade.',
      'A tile backsplash refreshes an older Benton kitchen without a full remodel.',
    ],
    handy: [
      'About 13% of Benton homes were built before 1960, so repairs often involve older doors, trim and wall patches.',
      'Installs in Benton cover grab bars, fixtures, shelving and door hardware for homes of every age.',
      'The Saline River valley is humid in summer, so Benton homes benefit from yearly caulk and seal checks.',
    ],
    faq: {
      hub: [{ q: 'Do you serve Benton ZIP 72015 and 72019?', a: 'Yes. We serve Benton ZIP 72015 and 72019, about 44 miles from our Conway office via I-40, I-430 and I-30.' }],
      bath: [{ q: 'Do I need a permit for a bathroom remodel in Benton?', a: 'Benton requires permits for remodels through its Community Development office. We confirm what your project needs at the free in-home quote.' }],
      kitchen: [{ q: 'Do you remodel kitchens in older Benton homes?', a: 'Yes. About a third of Benton homes predate 1980. We check cabinets, walls and counters at the free in-home quote and explain the options.' }],
      handy: [{ q: 'How far out of Benton do you travel?', a: 'We serve Benton and nearby Saline County addresses within our 50-mile radius from Conway. Call (501) 504-3398 to confirm your address.' }],
    },
  },
  bryant: {
    pop: '20,663', tag: 'Saline County’s fast-growing suburb',
    story: 'Bryant grew up along Hurricane Creek; rail service in the 1870s brought development, and World War II demand for the area’s bauxite brought more. Today it is a Little Rock suburb on I-30 with Bishop Park at its center.',
    homes: 'Bryant is mostly newer housing: the median home was built in 2000, about 49% of homes date from 2000 or later, about 34% went up in the 1980s and 1990s, and only about 17% predate 1980.',
    water: `Bryant buys all of its treated water from Central Arkansas Water. ${CAW_SOFT}.`,
    permit: { office: 'City of Bryant Planning & Development', url: 'https://www.bryantar.gov/pages/departments/community_development/permits.php', text: 'Bryant handles permits and inspection requests through its Planning & Development department and online citizen portal.' },
    schools: 'Bryant School District',
    hubH: 'Bryant: Hurricane Creek to Bishop Park',
    bathH: 'Bathroom Upgrades for Bryant’s Family Homes',
    kitchenH: 'Bryant Kitchens Built for Busy Families',
    handyH: 'Handyman Work Around Bryant',
    bath: [
      'Bryant’s soft water from Central Arkansas Water and a grout-free All-Star Shower System make for a shower that wipes clean.',
      'If your Bryant home from the 1990s or 2000s has a builder stall in the primary bath, a walk-in shower can replace it.',
      'About 34% of Bryant homes went up in the 1980s and 1990s, and their hall-bath tub-showers are common conversion candidates.',
      'About 13% of Bryant residents are 65 or older, and walk-in tubs help when a grandparent moves in.',
      'Aging-in-place plans in Bryant often mean adding grab-bar blocking and a low-threshold shower before they are urgently needed.',
    ],
    kitchen: [
      'Refacing suits Bryant kitchens with solid 1990s and 2000s cabinet boxes and dated doors.',
      'Cabinet renovations in Bryant often add storage for families who have outgrown a builder layout.',
      'In Bryant’s newer subdivisions, countertops are a practical first kitchen upgrade.',
      'A backsplash adds a finished look to a Bryant kitchen with plain painted walls behind the counter.',
    ],
    handy: [
      'Newer Bryant homes still need drywall, door and trim repairs as they settle and age.',
      'Installs around Bryant include shelving, fixtures, door hardware and grab bars.',
      'Bryant’s hot, humid summers make a yearly check of caulk and seals worthwhile.',
    ],
    faq: {
      hub: [{ q: 'How far is Bryant from your office?', a: 'Bryant (ZIP 72022) is about 39 miles from our Conway office via I-40, I-430 and I-30, roughly 45 minutes.' }],
      bath: [{ q: 'Is Bryant water hard on showers?', a: 'Bryant buys its treated water from Central Arkansas Water, which reports 17–29 mg/L of hardness and calls it soft, so mineral scale on glass and fixtures is light.' }],
      kitchen: [{ q: 'What kitchen update makes sense for a 2000s Bryant home?', a: 'New countertops, refaced cabinets or a backsplash are the usual starting points. We compare options at the free in-home quote.' }],
      handy: [{ q: 'Do you serve the Hurricane Lake area of Bryant?', a: 'Yes. We serve Bryant ZIP 72022, including neighborhoods near Bishop Park and the Hurricane Lake area.' }],
    },
  },
  mayflower: {
    pop: '1,984', tag: 'the Lake Conway town',
    story: 'Mayflower sits on the southwest shore of Lake Conway along I-40, about 10 miles south of Conway, and incorporated in 1928. The April 27, 2014 EF4 tornado struck Mayflower before moving on to Vilonia.',
    homes: 'Mayflower’s median home was built in 1995. About 29% of homes predate 1980 and about 40% were built in 2000 or later, and roughly 79% of homes are owner-occupied, one of the highest rates among the towns we serve.',
    water: 'Mayflower Waterworks buys treated water from Community Water System, which draws from Greers Ferry Lake.',
    permit: { office: 'Mayflower Water Works/Permits Office (2 Ashmore Drive)', url: 'https://mayflowerar.gov/building-in-mayflower/', text: 'Mayflower building permits are handled at the Water Works/Permits Office on Ashmore Drive, separate from City Center.' },
    schools: 'Mayflower School District',
    hubH: 'Mayflower: Lakeside Living Just Down I-40',
    bathH: 'Bathrooms in Mayflower’s Lakeside Homes',
    kitchenH: 'Kitchen Updates in Mayflower',
    handyH: 'Handyman Help Around Lake Conway',
    bath: [
      'Lakeside humidity around Mayflower makes a grout-free All-Star Shower System appealing, with no grout lines to hold moisture.',
      'In an older ranch home near Lake Conway with a small bath, a walk-in shower opens up the room.',
      'About 29% of Mayflower homes predate 1980, so original tub-showers are common candidates for a conversion.',
      'About 18% of Mayflower residents are 65 or older, and walk-in tubs help owners stay in homes they love.',
      'With about 79% of Mayflower homes owner-occupied, aging-in-place updates are a long-term investment for owners who plan to stay.',
    ],
    kitchen: [
      'Refacing can refresh a Mayflower kitchen with solid cabinet boxes without a full tear-out.',
      'Older Mayflower homes near the lake may benefit from a cabinet renovation that adds storage.',
      'Countertop replacement updates Mayflower kitchens in homes off Highway 365.',
      'A backsplash is a quick kitchen refresh for a Mayflower lake home.',
    ],
    handy: [
      'Lakeside moisture near Lake Conway shows up in trim, doors and wall patches, which we can repair in one visit.',
      'Installs in Mayflower include grab bars, fixtures and shelving.',
      'Lakeside humidity makes yearly caulk, seal and weatherstrip checks worthwhile in Mayflower.',
    ],
    faq: {
      hub: [{ q: 'How close is Mayflower to your office?', a: 'Mayflower (ZIP 72106) is about {mi} miles from our Conway office, usually 10 to 15 minutes down I-40.' }],
      bath: [{ q: 'Do you remodel bathrooms in Mayflower lake homes?', a: 'Yes. We serve Mayflower homes near Lake Conway and along Highway 365, and we check for moisture damage at the free in-home quote.' }],
      kitchen: [{ q: 'Where do I get a building permit in Mayflower?', a: 'Mayflower permits are handled at the Water Works/Permits Office on Ashmore Drive. We confirm what your project needs during your quote.' }],
      handy: [{ q: 'Do you take small repair jobs in Mayflower?', a: 'Yes. Mayflower is close to our office, so small repairs can be grouped into one visit. Call (501) 504-3398.' }],
    },
  },
  jacksonville: {
    pop: '29,477', tag: 'the Air Force Base city',
    story: 'Jacksonville is named for Nicholas Jackson, who deeded land for the railroad in 1870, and incorporated in 1941. The Arkansas Ordnance Plant made fuses and detonators here in World War II, and Little Rock Air Force Base opened on part of that land in 1955.',
    homes: 'Jacksonville’s median home was built in 1979. About 51% of homes predate 1980, and only about 22% were built in 2000 or later. Roughly half of homes are owner-occupied and the rest are rented.',
    water: 'Jacksonville Water Works purchases water from Central Arkansas Water and other regional suppliers.',
    permit: { office: 'City of Jacksonville Engineering Department (1 Municipal Drive)', url: 'https://www.jacksonvillear.gov/182/Engineering-Planning', text: 'Jacksonville building permits come from the City Engineering Department, and electrical, plumbing and HVAC work need separate trade permits.' },
    schools: 'Jacksonville North Pulaski School District',
    hubH: 'Jacksonville: Home of Little Rock Air Force Base',
    bathH: 'Bathrooms in Jacksonville’s Mid-Century and 1970s Homes',
    kitchenH: 'Jacksonville Kitchens Before a Move or a Sale',
    handyH: 'Handyman Work for Jacksonville Owners and Landlords',
    bath: [
      'A grout-free All-Star Shower System is a durable choice for Jacksonville rentals and family homes alike.',
      'In Jacksonville’s mid-century and 1970s homes, a walk-in shower can replace a cramped tub-shower in the hall bath.',
      'About 51% of Jacksonville homes predate 1980, so conversions here include a close look at older drains and subfloors.',
      'Walk-in tubs suit Jacksonville owners, including retirees, who want to stay in their homes.',
      'For veterans and retirees planning to stay in Jacksonville, grab bars and a low-threshold shower help a bathroom work for the long run.',
    ],
    kitchen: [
      'Refacing is a cost-conscious way to update a Jacksonville kitchen with sound cabinet boxes.',
      'Cabinet renovations in older Jacksonville homes rework 1970s layouts for modern appliances.',
      'Countertop replacement is a practical pre-sale or pre-PCS update for a Jacksonville kitchen.',
      'A backsplash helps a Jacksonville kitchen show well to buyers or new tenants.',
    ],
    handy: [
      'A pre-move punch list in Jacksonville might include drywall patches, door adjustments and fixture swaps.',
      'Installs in Jacksonville homes include shelving, fixtures and grab bars.',
      'With about half of Jacksonville homes built before 1980, regular maintenance helps older seals and trim hold up.',
    ],
    faq: {
      hub: [{ q: 'Do you serve homes near Little Rock Air Force Base?', a: 'Yes. We serve Jacksonville ZIP 72076, including neighborhoods near the base, about {mi} miles from our Conway office.' }],
      bath: [{ q: 'Can you remodel a bathroom before a PCS move?', a: 'Yes. Tell us your move date at the free in-home quote. Timing varies by project and is confirmed in your written quote.' }],
      kitchen: [{ q: 'Do you work on kitchens in Jacksonville rentals?', a: 'Yes. We update kitchens in owner-occupied homes and rentals in Jacksonville. Call (501) 504-3398 for a free in-home quote.' }],
      handy: [{ q: 'Do I need a permit for repairs in Jacksonville?', a: 'Jacksonville requires building permits from the City Engineering Department for construction, with separate trade permits for electrical, plumbing and HVAC work. Cosmetic repairs may not need one; check with the city.' }],
    },
  },
  roland: {
    pop: '820', tag: 'the Lake Maumelle and Pinnacle Mountain area',
    story: 'Roland is an unincorporated community in western Pulaski County, near Pinnacle Mountain State Park and the north shore of Lake Maumelle, the reservoir finished in 1958 that is one of Central Arkansas Water’s two supply lakes. Students are zoned to the Joe T. Robinson schools of the Pulaski County Special School District.',
    homes: 'Roland is small and semi-rural. Census estimates put the median home at 1993, with about a quarter of homes built before 1980 and about 31% built in 2000 or later, many on wooded lots.',
    water: null,
    permit: { office: 'Pulaski County Planning & Development', url: 'https://www.pulaskicounty.net/planning-development', text: 'Because Roland is unincorporated, land-use and permit questions go to Pulaski County Planning & Development rather than a city office.' },
    schools: 'Pulaski County Special School District (Joe T. Robinson schools)',
    hubH: 'Roland: Wooded Lots Between Lake Maumelle and Pinnacle Mountain',
    bathH: 'Bathroom Remodeling for Roland’s Rural Homes',
    kitchenH: 'Roland Kitchens on Wooded Lots',
    handyH: 'Handyman Help in Western Pulaski County',
    bath: [
      'On wooded Roland lots, shade and humidity linger, and a grout-free All-Star Shower System leaves no grout lines for mildew.',
      'In a Roland home from the 1980s or 1990s, a walk-in shower can replace an older primary-bath stall or tub.',
      'About a quarter of Roland homes predate 1980, and their tub-showers are typical conversion candidates.',
      'For a walk-in tub in a Roland home, we check the water heater and the path from the door to the tub before recommending a model.',
      'On a rural Roland lot, grab bars and a low-threshold shower help owners stay independent at home.',
    ],
    kitchen: [
      'Refacing can update a Roland kitchen when the cabinet boxes are still solid.',
      'Larger Roland homes may benefit from a cabinet renovation that rethinks storage and island space.',
      'Countertop replacement is a straightforward upgrade for Roland kitchens of any age.',
      'A backsplash adds a finished look to a Roland kitchen quickly.',
    ],
    handy: [
      'Wooded Roland lots mean moisture, so repairs often involve trim, doors and areas exposed to damp.',
      'Installs in Roland homes include fixtures, shelving and grab bars.',
      'Seasonal maintenance in Roland focuses on caulk, seals and keeping water out of the house.',
    ],
    faq: {
      hub: [{ q: 'Who handles permits for Roland addresses?', a: 'Roland is unincorporated, so permit and land-use questions go to Pulaski County Planning & Development. We confirm what your project needs at the free in-home quote.' }],
      bath: [{ q: 'Do you serve Roland homes near Lake Maumelle?', a: 'Yes. We serve Roland ZIP 72135, including homes near Lake Maumelle and along Highway 300.' }],
      kitchen: [{ q: 'How far is Roland from your Conway office?', a: 'Roland is about {mi} miles from our Conway office, roughly 35 minutes via I-40 and Highway 10.' }],
      handy: [{ q: 'Do you take small repair jobs in Roland?', a: 'Yes. We group small repairs in Roland into one visit when we can. Call (501) 504-3398.' }],
    },
  },
  ward: {
    pop: '6,052', tag: 'Lonoke County’s second-largest city',
    story: 'Ward is the second most populous city in Lonoke County. Its downtown runs along the railroad beside Highway 367, the former path of US-67, and newer development has spread south along Peyton Street toward Old Austin.',
    homes: 'Ward is one of the newest housing markets we serve: the median home was built in 2006, about 71% of homes date from 2000 or later, and about 34% from 2010 or later. Only about 9% predate 1980.',
    water: 'The City of Ward operates its own water and wastewater utility.',
    permit: { office: 'City of Ward permitting office', url: 'https://wardarkansas.org/license-permits', text: 'Ward takes building permit applications online, including for plumbing, HVAC, electrical and roofing modifications.' },
    schools: 'Cabot Public Schools (Ward Central Elementary)',
    hubH: 'Ward: Fast-Growing Along Highway 367 and Peyton Street',
    bathH: 'Bathroom Upgrades for Ward’s Newer Homes',
    kitchenH: 'Ward Kitchens Built Since 2000',
    handyH: 'Handyman Services in Ward',
    bath: [
      'Ward’s housing boom is recent, about a third of homes since 2010, so an All-Star Shower System here usually goes over solid framing and needs no plumbing reroute.',
      'If the primary bath in your Peyton Street-area home pairs a big soaking tub with a small stall, merging them into one walk-in shower is a common layout fix.',
      'The handful of older houses near Ward’s downtown, along the railroad beside Highway 367, are the likeliest here to still have an original tub-shower to convert.',
      'Ward’s median age was 30.0 at the 2020 Census, so a walk-in tub in Ward is usually for one family member, such as a grandparent moving in.',
      'Because so many Ward homes are only a few years old, adding grab-bar blocking during any bathroom update is cheap insurance for later.',
    ],
    kitchen: [
      'Cabinets in a Ward home built in the 2010s are often too new to replace; new doors and drawer fronts can change the look.',
      'Growing households in Ward’s newer subdivisions use cabinet renovations to add a pantry wall or an island.',
      'If your Ward kitchen came with builder-grade laminate, stone or solid-surface tops are a logical next step.',
      'Bare drywall behind a Ward range or sink is the easiest place to add a tile backsplash.',
    ],
    handy: [
      'Houses this new still settle, so the Ward repair list is mostly nail pops, drywall cracks and doors that rub.',
      'Ward installs tend to be first-time items: shelving, curtain rods, mirrors, door hardware and grab bars.',
      'Builder caulk around tubs and windows in a young Ward home is usually the first thing to fail, so check it every year or two.',
    ],
    faq: {
      hub: [{ q: 'Do you serve Ward and nearby Old Austin?', a: 'Yes. We serve Ward ZIP 72176 and nearby Lonoke County addresses along US-67/167.' }],
      bath: [{ q: 'Is a walk-in shower a good fit for a newer Ward home?', a: 'Often, yes. About 71% of Ward homes date from 2000 or later. Where a large tub and a small stall share the primary bath, one walk-in shower can replace both.' }],
      kitchen: [{ q: 'How do I get a building permit in Ward?', a: 'Ward takes permit applications online for plumbing, HVAC, electrical and other modifications. We confirm what your project needs during your quote.' }],
      handy: [{ q: 'How far is Ward from your office?', a: 'Ward is about {mi} miles from our Conway office via I-40 and US-67/167, roughly 45 minutes.' }],
    },
  },
  austin: {
    pop: '3,460', tag: 'the city between Cabot and Ward',
    story: 'Austin began around 1872 as “Austin Station” when the railroad was laid about a mile from the original settlement, which became known as Old Austin. Today it sits between Cabot to the southwest and Ward to the northeast, with Exit 22 on I-57/US-67/167.',
    homes: 'Austin has the newest housing of any town we serve: the median home was built in 2008, and about 86% of homes date from 2000 or later. About 81% of homes are owner-occupied, the highest rate among our service towns.',
    water: null,
    permit: { office: 'Austin City Hall (3181 Hwy 367 N)', url: 'https://austin-ar.com/permits-and-inspections', text: 'Austin building permits are handled at City Hall on Highway 367.' },
    schools: 'Cabot Public Schools',
    hubH: 'Austin: Newer Homes Between Cabot and Ward',
    bathH: 'Bathroom Upgrades for Austin’s Newest Homes',
    kitchenH: 'Austin Kitchens: Builder-Grade to Built to Last',
    handyH: 'Handyman Help in Austin',
    bath: [
      'Austin’s homes are the newest we serve (median build year 2008), so an All-Star Shower System is usually a finish upgrade rather than a repair job.',
      'Merging an unused soaking tub and a cramped stall into one walk-in shower is a common way to rework an Austin primary bath.',
      'With so few Austin homes built before 1980, a tub-to-shower conversion here rarely runs into old galvanized pipe or rotted subfloor.',
      'Only about 7% of Austin residents are 65 or older, so a walk-in tub in Austin is usually planned for a parent or grandparent who lives with the family.',
      'About 81% of Austin homes are owner-occupied, the highest rate we serve, and owners who plan to stay can add blocking and low thresholds now.',
    ],
    kitchen: [
      'Most Austin cabinets are under 20 years old, so refacing or new doors can be worth pricing before replacement.',
      'Cabinet renovations in Austin can add a pantry, an island or a coffee-bar run to a builder layout.',
      'Swapping builder laminate for a sturdier surface is a logical first kitchen project in Austin.',
      'In an Austin builder kitchen, a backsplash is the quickest custom touch.',
    ],
    handy: [
      'Austin homes are young, so repair calls are usually settling cracks, sticking doors and loose hardware.',
      'In Austin, installs often mean finishing touches a builder left out: shelving, mirrors, towel bars and grab bars.',
      'Keeping a newer Austin home tight comes down to caulk, weatherstripping and door sweeps checked each year.',
    ],
    faq: {
      hub: [{ q: 'Do you serve Austin, AR in Lonoke County?', a: 'Yes. We serve Austin ZIP 72007, between Cabot and Ward, from our Conway office.' }],
      bath: [{ q: 'Can you replace a garden tub in a newer Austin home?', a: 'Yes, in most cases. About 86% of Austin homes date from 2000 or later, and an unused soaking tub can usually give way to a larger walk-in shower.' }],
      kitchen: [{ q: 'Are Austin kitchens good candidates for refacing?', a: 'Often, because most Austin cabinets are less than 20 years old. We check the boxes at the free in-home quote.' }],
      handy: [{ q: 'Where do I get a building permit in Austin?', a: 'Austin building permits are handled at City Hall on Highway 367 N. We confirm permit needs during your quote.' }],
    },
  },
  morrilton: {
    pop: '6,992', tag: 'the Conway County seat',
    story: 'Morrilton grew up around the Little Rock and Fort Smith Railroad in 1871, named for landowners E.J. and George H. Morrill, and became the Conway County seat in 1883. The Arkansas River forms its southern edge, and Petit Jean State Park and UA Community College at Morrilton are nearby.',
    homes: 'Morrilton has the oldest housing of any town we serve: the median home was built in 1975, about 60% of homes predate 1980, and about 21% were built before 1960. About 20% of residents are 65 or older.',
    water: null,
    permit: { office: 'City of Morrilton Planning Department (119 N. Division St.)', url: 'https://cityofmorrilton.com/planning-department/', text: 'Morrilton building permits and inspections go through the city Planning Department on North Division Street.' },
    schools: 'South Conway County School District',
    hubH: 'Morrilton: Railroad Town on the Arkansas River',
    bathH: 'Bathroom Remodeling in Morrilton’s Older Homes',
    kitchenH: 'Morrilton Kitchens With History',
    handyH: 'Repairs for Morrilton’s Older Houses',
    bath: [
      'Morrilton bathrooms with decades-old tile can trade grout upkeep for a grout-free All-Star Shower System.',
      'Small bathrooms in Morrilton’s older homes often gain room when a tub-shower becomes a walk-in shower.',
      'About 60% of Morrilton homes predate 1980, so tub-to-shower conversions here include a careful look at older drains and floors.',
      'About 20% of Morrilton residents are 65 or older, the highest share of any town we serve, which makes walk-in tubs a common question.',
      'Aging-in-place updates in Morrilton often start with grab bars and a low-threshold shower in an older single-story home.',
    ],
    kitchen: [
      'Refacing can update solid cabinets in Morrilton homes without losing their footprint.',
      'Older Morrilton kitchens may need a cabinet renovation to fit modern appliances and storage.',
      'Countertop replacement in an older Morrilton kitchen starts with checking that the cabinets are level.',
      'A backsplash can modernize a Morrilton kitchen while keeping the home’s character.',
    ],
    handy: [
      'With about 21% of Morrilton homes built before 1960, repairs often involve older doors, trim and walls.',
      'Installs in Morrilton homes include grab bars anchored into blocking, fixtures and shelving.',
      'Morrilton’s river-valley humidity makes yearly caulk and seal checks worthwhile.',
    ],
    faq: {
      hub: [{ q: 'Do you serve Morrilton and Conway County?', a: 'Yes. We serve Morrilton ZIP 72110 and nearby Conway County addresses, about 30 minutes west of our Conway office on I-40.' }],
      bath: [{ q: 'Can you remodel a bathroom in an older Morrilton home?', a: 'Yes. About 60% of Morrilton homes predate 1980. We check drains, floors and walls at the free in-home quote and explain any extra work before it starts.' }],
      kitchen: [{ q: 'Who issues building permits in Morrilton?', a: 'Morrilton building permits go through the city Planning Department on North Division Street. We confirm what your project needs during your quote.' }],
      handy: [{ q: 'Do you take small repair jobs in Morrilton?', a: 'Yes. We group small repairs in Morrilton into one visit when we can. Call (501) 504-3398.' }],
    },
  },
};

const CAW_SHORT = 'Central Arkansas Water (soft, 17–29 mg/L)';
const WATER_SHORT = { conway: 'Conway Corp (Brewer Lake)', greenbrier: 'Greenbrier Waterworks (Greers Ferry Lake supply)', vilonia: 'Vilonia Waterworks (purchased supply)',
  maumelle: CAW_SHORT, 'north-little-rock': CAW_SHORT, 'little-rock': CAW_SHORT, sherwood: CAW_SHORT, bryant: CAW_SHORT,
  cabot: 'Cabot WaterWorks (wells + Central Arkansas Water)', benton: 'Benton Utilities (Saline River, Lake Norrell)',
  mayflower: 'Mayflower Waterworks (Greers Ferry Lake supply)', jacksonville: 'Jacksonville Water Works (purchased supply)', ward: 'City of Ward water utility' };

// ---------- helpers used by CityPage.astro and SubCityPage.astro ----------
const CAT_KEY = { 'bathroom-remodeling': 'bath', 'kitchen-remodeling': 'kitchen', 'handyman-services': 'handy' };
const SUB_IDX = {
  'all-star-shower-systems': ['bath', 0], 'walk-in-showers': ['bath', 1], 'tub-to-shower-conversions': ['bath', 2], 'walk-in-tubs': ['bath', 3], 'aging-in-place-ada': ['bath', 4],
  'cabinet-refacing': ['kitchen', 0], 'cabinet-renovations': ['kitchen', 1], 'countertop-replacement': ['kitchen', 2], 'backsplash-installation': ['kitchen', 3],
  repairs: ['handy', 0], installation: ['handy', 1], maintenance: ['handy', 2],
};
export const catKey = (catSlug) => CAT_KEY[catSlug];
export const townFor = (slug) => (TOWN[slug] ? { ...TOWN[slug], acs: ACS[slug] } : null);
const fill = (s, city) => s.replace(/\{mi\}/g, String(city.milesFromHQ));
export const townFaqs = (slug, key, city) => (TOWN[slug]?.faq?.[key] || []).map((f) => ({ q: f.q, a: fill(f.a, city) }));

// "At a glance" rows. which: 'hub' | 'bath' | 'kitchen' | 'handy'
export function glanceRows(slug, city, which = 'hub') {
  const T = TOWN[slug], A = ACS[slug];
  if (!T || !A) return [];
  const rows = [];
  if (which === 'hub') rows.push(['Population', `${T.pop} (2020 Census)`], ['County', city.county]);
  rows.push(['Median year homes were built', String(A.medYear)]);
  if (which !== 'kitchen') rows.push(['Homes built before 1980', `About ${A.pre1980}%`]);
  if (which !== 'handy') rows.push(['Homes built 2000 or later', `About ${A.since2000}%`]);
  if (which === 'handy' || which === 'hub') rows.push(['Homes built 2010 or later', `About ${A.since2010}%`]);
  if (A.owner != null && which !== 'handy') rows.push(['Owner-occupied homes', `About ${A.owner}%`]);
  if (which === 'bath' || which === 'hub') rows.push(['Residents 65 or older', `About ${A.age65}%`]);
  if (which !== 'kitchen' && WATER_SHORT[slug]) rows.push(['Water', WATER_SHORT[slug]]);
  rows.push(['Permits', { text: T.permit.office, href: T.permit.url }]);
  if (which === 'hub') rows.push(['Public schools', T.schools]);
  return rows;
}

// Sub-service x town copy: heading, 2-3 paragraphs and one town-fact FAQ. Every paragraph mixes this town's own
// numbers, names and authored notes so pages for different towns do not read as swapped-noun templates.
export function subLocal(subSlug, city) {
  const T = TOWN[city.slug], A = ACS[city.slug];
  if (!T || !A || !SUB_IDX[subSlug]) return null;
  const [k, i] = SUB_IDX[subSlug];
  const own = T[k][i];
  const n = city.name;
  const yrs = `median build year ${A.medYear}; about ${A.pre1980}% before 1980, ${A.since2000}% since 2000`;
  const P = [own];
  let h, faq;
  switch (subSlug) {
    case 'all-star-shower-systems':
      h = `Grout-Free Showers for ${n}, ${T.tag}`;
      P.push(T.water || `${n} housing at a glance: ${yrs}.`);
      faq = { q: `Do All-Star Shower Systems work in older ${n} homes?`, a: `Yes. About ${A.pre1980}% of ${n} homes predate 1980 (median build year ${A.medYear}). We check framing, drain and subfloor at the free in-home quote and fix what is needed before panels go up.` };
      break;
    case 'walk-in-showers':
      h = `Walk-In Showers in ${n}: What to Know`;
      P.push(T.story.split('. ')[0] + '.');
      faq = { q: `What size bathroom does a walk-in shower need in ${n}?`, a: `Most walk-in showers in ${n} (ZIP ${city.zips.join(', ')}) go into the space of an existing 5-foot tub or stall. ${n}’s median home dates to ${A.medYear}; we measure yours at the free in-home quote.` };
      break;
    case 'tub-to-shower-conversions':
      h = `Converting a Tub to a Shower in ${n}`;
      P.push(`${n} housing: ${yrs}. Federal lead-safe work rules cover renovations in homes built before 1978.`, T.permit.text);
      faq = { q: `Do I need a permit for a tub-to-shower conversion in ${n}?`, a: `${T.permit.text} We confirm what your project needs at the free in-home quote.` };
      break;
    case 'walk-in-tubs':
      h = `Walk-In Tubs for ${n} Homeowners`;
      P.push(`About ${A.age65}% of ${n} residents are 65 or older${A.owner != null ? `, and about ${A.owner}% of homes are owner-occupied` : ''}.`, T.water);
      faq = { q: `Will my ${n} water heater handle a walk-in tub?`, a: `It depends on the heater’s size and age. In a ${n} home with a median build year of ${A.medYear}, we check it at the free in-home quote before you choose a tub.` };
      break;
    case 'aging-in-place-ada':
      h = `Aging in Place in ${n}`;
      P.push(`${n}: about ${A.age65}% of residents are 65 or older${A.owner != null ? `; about ${A.owner}% of homes are owner-occupied` : ''}.`, T.permit.text);
      faq = { q: `Can you plan an accessible bathroom for a parent moving to ${n}?`, a: `Yes. We plan curbless or low-threshold entries, seating and grab-bar blocking for ${n} bathrooms. Grab bars we install are rated to 500 lbs and teak seats to 400 lbs.` };
      break;
    case 'cabinet-refacing':
      h = `Cabinet Refacing in ${n} Kitchens`;
      P.push(`${n} housing: ${yrs}.`);
      faq = { q: `How do I know if my ${n} cabinets can be refaced?`, a: `Refacing works when the boxes are solid and square. With a median build year of ${A.medYear} in ${n}, we check yours at the free in-home quote.` };
      break;
    case 'cabinet-renovations':
      h = `Cabinet Renovations for ${n} Layouts`;
      P.push(T.permit.text);
      faq = { q: `Do cabinet renovations in ${n} need a permit?`, a: `Cabinet work alone often does not, but moving plumbing or electrical usually does. ${T.permit.text}` };
      break;
    case 'countertop-replacement':
      h = `Countertops for ${n} Kitchens`;
      P.push(`${n} housing: ${yrs}.`);
      faq = { q: `Can new countertops go on my existing ${n} cabinets?`, a: `Usually, if they are level and sound. About ${A.pre1980}% of ${n} homes predate 1980, and older cabinets may need shimming or reinforcing first.` };
      break;
    case 'backsplash-installation':
      h = `Backsplash Ideas for ${n} Homes`;
      P.push(T.story.split('. ').slice(-1)[0]);
      faq = { q: `How long does a backsplash take in ${n}?`, a: `It depends on the tile and the wall surface; we confirm timing in your written ${n} quote.` };
      break;
    case 'repairs':
      h = `Home Repairs Around ${n}`;
      P.push(`${n} housing: ${yrs}.`);
      faq = { q: `What repairs do ${n} homeowners call about?`, a: `Drywall cracks, sticking doors, loose trim, caulk and fixture swaps are typical for homes of ${n}’s age (median build year ${A.medYear}). Send us your list or call (501) 504-3398.` };
      break;
    case 'installation':
      h = `Installation Help in ${n}`;
      P.push(`About ${A.since2010}% of ${n} homes were built in 2010 or later and about ${A.pre1980}% before 1980; older walls may need blocking added before a grab bar or heavy shelf goes up.`);
      faq = { q: `Can you install a grab bar in an older ${n} home?`, a: `Yes. We anchor grab bars into studs or added blocking, never drywall alone. Grab bars we install are rated to 500 lbs.` };
      break;
    case 'maintenance':
      h = `Seasonal Maintenance for ${n} Homes`;
      P.push(T.water || `${n} housing: ${yrs}.`);
      faq = { q: `When should ${n} homeowners schedule maintenance?`, a: `Late winter, before spring storms, and early fall, before cold weather, are good times to check caulk, seals and weatherstripping in ${n}.` };
      break;
  }
  return { h, i, paras: P.filter(Boolean).map((t) => t.endsWith('.') ? t : t + '.'), faq };
}

// Town-specific line for a sub-service card on /<category>/<town>.
export const townSubLine = (citySlug, subSlug) => { const T = TOWN[citySlug], x = SUB_IDX[subSlug]; return T && x ? T[x[0]][x[1]] : null; };

// Number-driven paragraph + FAQ for /<category>/<town> pages.
export function catFacts(citySlug, key, city) {
  const A = ACS[citySlug]; if (!A) return null;
  const n = city.name;
  if (key === 'bath') return {
    p: `In ${n}, about ${A.pre1980}% of homes predate 1980 and about ${A.since2000}% were built in 2000 or later, with a median build year of ${A.medYear}. About ${A.age65}% of residents are 65 or older, which shapes how many ${n} owners plan for low thresholds and grab bars.`,
    faq: { q: `How old are most bathrooms in ${n}?`, a: `${n}’s median home was built in ${A.medYear}. About ${A.pre1980}% of homes predate 1980 and about ${A.since2000}% date from 2000 or later (U.S. Census Bureau ACS 2020–2024), so original tub-showers and builder-grade baths are both common.` } };
  if (key === 'kitchen') return {
    p: `${n}’s housing has a median build year of ${A.medYear}: about ${A.since2000}% of homes date from 2000 or later and about ${A.pre1980}% from before 1980${A.owner != null ? `, and about ${A.owner}% are owner-occupied` : ''}. That mix decides whether a ${n} kitchen needs new surfaces, new doors or a new layout.`,
    faq: { q: `What kitchen update fits a ${n} home built around ${A.medYear}?`, a: `It depends on the cabinets. About ${A.since2000}% of ${n} homes date from 2000 or later, where solid boxes often suit refacing and new counters; in the ${A.pre1980}% built before 1980, a layout change may make more sense.` } };
  return {
    p: `About ${A.pre1980}% of ${n} homes were built before 1980 and about ${A.since2010}% in 2010 or later (median ${A.medYear}). Older houses bring wear and patch work; newer ones bring settling cracks and first-time installs.`,
    faq: { q: `Do you work on both older and newer homes in ${n}?`, a: `Yes. ${n} homes range from pre-1980 houses (about ${A.pre1980}%) to homes built since 2010 (about ${A.since2010}%). We quote repairs, installs and maintenance for both.` } };
}

// Extra FAQs for /bathroom-remodeling/conway (approved or already-published claims only).
export const CONWAY_BATH_FAQ = [
  { q: 'Do I need a permit for a bathroom remodel in Conway?', a: 'Often, yes. The City of Conway requires a building permit for remodels, and plumbing, electrical, gas and mechanical work each need their own permit. We go over what your project needs at the free in-home quote; details are on the City of Conway Building Permits & Inspections page.' },
  { q: 'How long does a bathroom remodel take in Conway?', a: 'Most shower replacements and tub-to-shower conversions take 1-2 days once materials arrive. Larger remodels take longer. Timing varies by project and is confirmed in your written quote.' },
  { q: 'What warranty comes with a Conway bathroom remodel?', a: 'Every job is backed by a 5-year workmanship warranty and our 100% Customer Guarantee, plus a lifetime product warranty on All-Star Shower Systems materials. See the warranty page for details.' },
  { q: 'What if there is mold or water damage behind my Conway shower?', a: 'We check the walls, subfloor, drain and layout at the free in-home quote so the written scope reflects what is actually there. Damaged or moldy materials need to be dealt with before new walls or a new base go in, and we review that with you as part of the quote.' },
  { q: 'Walk-in shower or tub-to-shower conversion: which fits my Conway bathroom?', a: 'A tub-to-shower conversion replaces a tub you no longer use with a shower in the same space. A walk-in shower centers on a low or curbless entry and can replace a tub or an old stall. We measure your Conway bathroom and walk through both options at the free in-home quote.' },
  { q: 'Can you make a Conway bathroom safer for aging in place?', a: 'Yes. We plan curbless or low-threshold entries, shower seating and grab bars anchored into blocking or studs, with ADA-style clearances where the room allows. We review the layout at the free in-home quote.' },
];
