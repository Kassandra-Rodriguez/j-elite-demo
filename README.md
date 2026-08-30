# J's Elite Mobile Detailing — concept site

Spec one-pager built for **J's Elite Mobile Detailing** (mobile auto detailing, El Paso, TX).
Static site: `index.html` + `styles.css` + `script.js` + `assets/`. No build step, no dependencies.

Demo #3 in the El Paso pipeline. Built from the `jada-landscaping-demo` / `best-airr-demo`
template with an aggressive dark + gold "elite / automotive" skin pulled from the client's own
Meta ad creatives.

---

## The hook (drives the outreach)

J's Elite has **no website at all** and is one of the most aggressive local advertisers in the
El Paso detailing category — 8+ active Meta ad variants running since July 2026 ($149 interior /
$199 full detail). **100% of that ad spend funnels into manual Facebook Messenger back-and-forth.**
Every click becomes a DM they have to triage by hand, and the customers who won't message just leave.

A booking one-pager — price list + a "request a booking" form (name, phone, vehicle, day, area) —
lets people book while J's is detailing someone else's car, and gives the ad clicks somewhere to
land besides a DM thread.

---

## Verified vs. placeholder

| Item | Status | Source / note |
|---|---|---|
| Business name "J's Elite Mobile Detailing" | **Verified** | Instagram bio, logo, ad creatives |
| Mobile auto detailing, El Paso TX ("we come to you") | **Verified** | IG bio: "📍El Paso, TX ✨ Mobile Auto Detailing … We bring the elite shine to you!" |
| Instagram @js.elitedetailing | **Verified** | Saved profile page (45 followers, 13 posts, active Oct 2025–Apr 2026) |
| Tagline "We bring the elite shine to you" | **Verified** | Their IG bio, used verbatim as the H1 |
| Services: wash, wax, interior clean, wash/clay/seal | **Verified** | IG bio + ad creatives ("WASH, CLAY & SEAL", "Deep Clean", "Smooth Finish") |
| Price: interior detail **from $149** | **From their ads** | 8+ Meta ad variants; confirm current pricing before launch |
| Price: full detail **from $199** | **From their ads** | Same; site labels both as "from" + a disclaimer |
| Phone **(915) 443-5789** | **From their ad creative** | Printed on their "10% OFF ANY FULL DETAIL" ad ("BOOK NOW (915)443-5789"). Not found on Google/BBB. **Confirm this is the number to route bookings to.** |
| Pet hair / stain removal, headlight restoration | **Placeholder** | Standard detailing services — plausible, not seen in their posts. Trim if they don't offer them. |
| "Custom / ceramic — request a quote" tier | **Placeholder** | Gives a 3rd price column; confirm they do ceramic / paint decon |
| Service-area list (West Side, Northeast, Lower Valley, Horizon City, Clint, Canutillo…) | **Placeholder** | "serves greater El Paso" is verified; specific neighborhoods are illustrative |
| Hours "7 days · by appointment" | **Placeholder** | Footer says "(confirm hours)" |
| Facebook link | **Placeholder** | Advertiser page exists; exact URL not found — points to facebook.com |
| Star ratings / review counts / testimonials | **Not on the page** | None found publicly — nothing invented |
| Before/after photo | **Verified (their post)** | Real J's Elite interior-detail post, split into two halves for the slider |

Footer carries a permanent "Concept site prepared for J's Elite Mobile Detailing — not an
official page." line and every page ships `<meta name="robots" content="noindex, nofollow">`.

---

## Photos (`assets/`)

All pulled from J's Elite's own Instagram (@js.elitedetailing) + two screenshots on file.

| File on page | Source | Shows |
|---|---|---|
| `hero.jpg` | `car-detailed.jpg` | Silver Corvette Stingray w/ carbon hood, Franklin Mtns behind — hero background (portrait crop) |
| `area-elpaso.jpg` | `car-detailed.jpg` | Landscape crop of the same job — mountains, El Paso rooftops, driveway — service-area photo. Customer plate blurred. |
| `g2-transam-foam.jpg` | `car-detailed-washing.jpg` | Pontiac Trans Am in snow foam (J's Elite plate frame visible) |
| `g3-bmw.jpg` | IG post | Black BMW X5, gloss-restored |
| `g4-denali.jpg` | IG post | GMC Acadia Denali, front end / chrome grille |
| `g5-truck.jpg` | IG post | White GMC Sierra Denali HD, front end / chrome grille |
| `g6-interior.jpg` | IG post | Clean compact-SUV front interior |
| `ba-before.jpg` / `ba-after.jpg` | IG before/after post | Rear bench seat, split from one stacked image into two halves |
| `logo-source.jpg` | IG avatar | Original winged-badge logo (redrawn as inline SVG in the header/footer) |
| `g1-corvette-foam.jpg` | IG post | Spare — Corvette in snow foam; not currently placed on the page |

Originals kept: `car-detailed.jpg`, `car-detailed-washing.jpg`, `before-after.jpg`.

---

## Skin / palette

Aggressive dark + metallic gold, taken straight from J's Elite's ad creatives (black ground,
champagne-gold accent, white type, condensed display lettering).

```css
--ink:#0B0B0C;          /* page ground */
--jet:#141416;          /* alt sections / cards */
--gold:#C9A24B;         /* primary accent */
--gold-bright:#E8CE8F;  /* highlights, gradient top */
--gold-deep:#8A6D2F;    /* pressed / borders */
--white:#F4F3EF;
```

- Display type: **Oswald** (condensed, uppercase) for all headings, nav, buttons, labels.
- Body type: **Inter**.
- Squared corners (`--r: 4px`), gold hairlines, gold "shine" streak on the hero, diamond bullets.
- Logo is a hand-drawn inline SVG (winged circle + car silhouette) evoking their real badge — not
  their actual logo file.
- Fully bilingual EN/ES via `data-en` / `data-es` attributes + the header toggle.

## Sections

Header · hero + booking form · trust bar (we-come-to-you / interior & exterior / book by text /
se habla español) · before/after slider · services grid · pricing (3 tiers) · how mobile
detailing works (3 steps) · work carousel · service area (area chips + a real El Paso job photo) ·
final CTA · footer · sticky mobile bar (Book / Text / Call).

The booking form asks 4 qualifying questions — service, vehicle type, when, area/ZIP — so J's
walks into the text conversation already knowing the job. Form is **demo only**, not wired to
text/email/CRM.

---

## Ship

```
cd j-elite-demo
git init -q && git add -A
git -c user.name="Kassandra-Rodriguez" -c user.email="kassandra.rodriguez2014@gmail.com" \
  commit -q -m "J's Elite Mobile Detailing concept site"
git branch -M main
gh repo create j-elite-demo --private --source=. --remote=origin --push
```

Then (assistant is blocked from these — run yourself):

```
gh repo edit Kassandra-Rodriguez/j-elite-demo --visibility public --accept-visibility-change-consequences
gh api --method POST /repos/Kassandra-Rodriguez/j-elite-demo/pages -f "source[branch]=main" -f "source[path]=/"
```

Live ~1 min later at `https://kassandra-rodriguez.github.io/j-elite-demo/`.
Every `git push` to `main` redeploys.

---

## Outreach talk track

DM the Facebook/Instagram page that runs the ads (@js.elitedetailing). Lead with the compliment,
then the gap:

> "You're running eight-plus ads at once and every click turns into a Messenger chat you have to
> answer by hand. I built a one-page site with your price list and a 'request a booking' form —
> name, phone, vehicle, preferred day — so people can book while you're detailing someone else's
> car. Same dark-and-gold look as your ads. Here's the link: [url]. It's a free concept — if you
> like it, it's $300 and it's yours."

Confirm before it goes live: the booking phone number, current interior/full pricing, whether
they do ceramic/clay, and their real hours.
