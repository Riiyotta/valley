// GENERATED from the plays dataset in spec/pages/playbooks/source/2fchlP4D...mjs (`F`, `I`,
// `L`, `R`), cross-checked against spec/pages/playbooks/states/plays.json (card text, hrefs and
// drawer text for all 58 plays). Card copy, titles, summaries, flow chips, step headings and
// labelled fields are verbatim. Drawer prose blocks longer than about two sentences are replaced
// with neutral placeholder text of similar length (content rule); 1 block(s) affected.

// "The basics" category is a curated title list, not a section.
export const BASICS = [
  "Hyper-relevant messaging to a Sales Nav audience",
  "Upload a list + send hyper-relevant messages",
  "Message your qualified profile viewers",
  "Message your competitors' engagers",
  "Hijack lead-magnet posts",
  "Find companies with signal-based search",
  "Find people with AI"
]

// Category tiles: [key, label]. Tile art cycles through TILE_IMAGES (index % 4).
export const CATEGORIES = [["all","All plays"],["basic","The basics"],["social","Content & social signals"],["signal","Buying signals"],["list","Your lists & network"],["growth","Press, investors & advisors"]]

export const TILE_IMAGES = [
  "/assets/img/PFm0moxeBn8eOm66rVN2ssTio.png",
  "/assets/img/5WP0tI1lICNwC23waJVfpSCTTpE.png",
  "/assets/img/V5YzrhTWz6oX6qYDyJJzGKbRnIU.png",
  "/assets/img/DzF7ltBGreQELkgImDCaxxldqH0.jpg"
]

export const PLAYS = [
  {
    "id": "message-your-qualified-profile-viewers",
    "title": "Message your qualified profile viewers",
    "d": "Highly relevant outreach to people viewing your LinkedIn profile who fit your ICP.",
    "section": "social_yours",
    "pop": 98,
    "requiresLinkedInPremium": true,
    "flow": [
      [
        "src",
        "Profile viewers"
      ],
      [
        "ai",
        "Qualify fit"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "watch:Runs daily",
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Valley watches your profile viewers",
        "desc": "New viewers picked up on a daily sync."
      },
      {
        "heading": "Qualifies against your ICP",
        "desc": "Only high and medium fits move forward. The rest are ignored."
      },
      {
        "heading": "Researches each person",
        "desc": "The message references why they matter, not that they viewed you."
      },
      {
        "heading": "Sends and manages replies",
        "desc": "Drafts wait for your approval if you want them to."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "Watch · daily"
      ]
    ],
    "meta": {
      "listSource": null,
      "bring": "none"
    }
  },
  {
    "id": "message-your-competitors-engagers",
    "title": "Message your competitors' engagers",
    "d": "People engaging with a competitor you name. Already problem-aware, already shopping.",
    "section": "social_others",
    "pop": 97,
    "flow": [
      [
        "src",
        "Competitor posts"
      ],
      [
        "ai",
        "Qualify fit"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "watch:Runs daily",
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Name a competitor profile",
        "desc": "Valley monitors their posts for engagers."
      },
      {
        "heading": "Qualifies against your ICP",
        "desc": "Their audience overlaps yours. This finds the overlap."
      },
      {
        "heading": "Writes without naming names",
        "desc": "Messages lead with the problem space, never \"I saw you like our competitor.\""
      },
      {
        "heading": "Sends and manages replies",
        "desc": "New engagers keep flowing in while the watch is on."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "Watch · daily"
      ]
    ],
    "meta": {
      "listSource": null,
      "bring": "both"
    }
  },
  {
    "id": "message-your-post-engagers",
    "title": "Message your post engagers",
    "d": "People reacting to and commenting on your posts, qualified and messaged.",
    "section": "social_yours",
    "pop": 94,
    "flow": [
      [
        "src",
        "Your posts"
      ],
      [
        "ai",
        "Qualify fit"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "watch:Runs daily",
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Valley monitors your posts",
        "desc": "Reactors and commenters collected as they engage."
      },
      {
        "heading": "Qualifies against your ICP",
        "desc": "Placeholder step copy. Kept neutral and of similar length."
      },
      {
        "heading": "Writes from the engagement",
        "desc": "The message knows which post they engaged and what it said."
      },
      {
        "heading": "Sends while the interest is warm",
        "desc": "Timing matters more here than anywhere."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "Watch · daily"
      ]
    ],
    "meta": {
      "listSource": null,
      "bring": "none"
    }
  },
  {
    "id": "message-your-personal-linkedin-followers",
    "title": "Message your personal LinkedIn followers",
    "d": "A follow is a hand raise. Valley finds the ones worth shaking.",
    "section": "social_yours",
    "pop": 76,
    "flow": [
      [
        "src",
        "New followers"
      ],
      [
        "ai",
        "Qualify fit"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "watch:Runs daily",
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Valley watches your followers",
        "desc": "New follows picked up daily."
      },
      {
        "heading": "Qualifies against your ICP",
        "desc": "Most followers are noise. A few are pipeline."
      },
      {
        "heading": "Welcomes the fits",
        "desc": "A light, personal opener. No pitch on message one."
      }
    ],
    "conf": [
      [
        "Audience",
        "High fit only"
      ],
      [
        "Cadence",
        "Watch · daily"
      ]
    ],
    "meta": {
      "listSource": null,
      "bring": "none"
    }
  },
  {
    "id": "reach-ex-colleagues-at-new-companies",
    "title": "Reach ex-colleagues at new companies",
    "d": "People who worked where you worked, now sitting in buying seats elsewhere.",
    "section": "list",
    "pop": 70,
    "flow": [
      [
        "src",
        "Past-company search"
      ],
      [
        "ai",
        "Qualify fit"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Valley builds the search for you",
        "desc": "It prefills where you have worked and the titles you sell to as editable pills, then builds the Sales Navigator search itself. Or paste your own."
      },
      {
        "heading": "Qualifies where they landed",
        "desc": "Only the ones now at companies that fit."
      },
      {
        "heading": "Opens with the common ground",
        "desc": "A shared era beats a cold opener."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "meta": {
      "listSource": "salesnav",
      "bring": "paste"
    }
  },
  {
    "id": "hijack-lead-magnet-posts",
    "title": "Hijack lead-magnet posts",
    "d": "Find viral lead-magnet posts your audience engaged with, scrape the engagers, message the best fits.",
    "section": "social_others",
    "pop": 95,
    "flow": [
      [
        "ai",
        "Find posts"
      ],
      [
        "src",
        "Engagers"
      ],
      [
        "ai",
        "Qualify fit"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Scout finds the posts",
        "desc": "Lead-magnet posts in your space with heavy engagement from your target audience."
      },
      {
        "heading": "Scrapes the engagers",
        "desc": "Reactors and commenters from each post."
      },
      {
        "heading": "Qualifies against your ICP",
        "desc": "A 4,000-comment post might hold 200 buyers. Valley finds them."
      },
      {
        "heading": "Messages reference the topic",
        "desc": "They raised their hand for content about the problem. The message picks it up from there."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "One-time per post"
      ]
    ],
    "meta": {
      "listSource": null,
      "bring": "both"
    }
  },
  {
    "id": "message-the-post-engagers-of-major-influencers-in-your-space",
    "title": "Message the post engagers of major influencers in your space",
    "d": "The people commenting on the big accounts in your space are your buyers, pre-warmed.",
    "section": "social_others",
    "pop": 90,
    "flow": [
      [
        "src",
        "Influencer posts"
      ],
      [
        "ai",
        "Qualify fit"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "watch:Runs daily",
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Valley finds the influencers your buyers follow",
        "desc": "Valley monitors their posts."
      },
      {
        "heading": "Qualifies the commenters",
        "desc": "Commenters beat reactors: they showed up with an opinion."
      },
      {
        "heading": "Messages pick up the thread",
        "desc": "Opens from the conversation they were already having in public."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "Watch · daily"
      ]
    ],
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "ambush-a-competitor-s-launch",
    "title": "Ambush a competitor's launch",
    "d": "Everyone engaging their launch post is evaluating. Get in the consideration set.",
    "section": "signal_voice",
    "pop": 88,
    "flow": [
      [
        "src",
        "Launch post"
      ],
      [
        "ai",
        "Qualify fit"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Paste their launch post URL",
        "desc": "Valley scrapes reactors and commenters."
      },
      {
        "heading": "Qualifies against your ICP",
        "desc": "Their launch audience, filtered to your buyers."
      },
      {
        "heading": "Messages lead with the category",
        "desc": "They are actively looking at solutions. Be one of them, gracefully."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "meta": {
      "listSource": null,
      "bring": "both"
    }
  },
  {
    "id": "mine-your-old-viral-post",
    "title": "Mine your old viral post",
    "d": "That post that popped six months ago is a prospect list nobody harvested.",
    "section": "list",
    "pop": 84,
    "flow": [
      [
        "src",
        "Your past posts"
      ],
      [
        "ai",
        "Qualify fit"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Pick your best-performing posts",
        "desc": "Valley pulls every engager, however old."
      },
      {
        "heading": "Qualifies against your ICP today",
        "desc": "People change jobs. The list is warmer than you think."
      },
      {
        "heading": "Reopens the thread",
        "desc": "\"You engaged with my piece on X\" still works months later."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "meta": {
      "listSource": null,
      "bring": "both"
    }
  },
  {
    "id": "harvest-a-testimonial-post-s-engagers",
    "title": "Harvest a testimonial post's engagers",
    "d": "When a customer posts about you, everyone who liked it just raised a hand.",
    "section": "list",
    "pop": 80,
    "flow": [
      [
        "src",
        "Customer post"
      ],
      [
        "ai",
        "Qualify fit"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Paste the customer’s post",
        "desc": "A testimonial, a case study share, a shout-out."
      },
      {
        "heading": "Qualifies the engagers",
        "desc": "Peers of your happy customer are your best next customers."
      },
      {
        "heading": "Messages reference the proof",
        "desc": "Social proof plus timing. The rarest combination in outbound."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "meta": {
      "listSource": null,
      "bring": "both"
    }
  },
  {
    "id": "follow-through-on-your-case-study",
    "title": "Follow through on your case study",
    "d": "Engagers of your own case-study post get the longer story, one to one.",
    "section": "list",
    "pop": 78,
    "flow": [
      [
        "src",
        "Case-study post"
      ],
      [
        "ai",
        "Qualify fit"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Post the case study, then point Valley at it",
        "desc": "Reactors and commenters collected."
      },
      {
        "heading": "Qualifies for lookalike fit",
        "desc": "Prioritizes people who look like the customer in the story."
      },
      {
        "heading": "Offers the full narrative",
        "desc": "\"Happy to share how they actually did it\" converts readers into calls."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "meta": {
      "listSource": null,
      "bring": "both"
    }
  },
  {
    "id": "crossover-a-newsletter-author-s-audience",
    "title": "Crossover a newsletter author's audience",
    "d": "The engaged readership of a niche newsletter, reached where they actually reply.",
    "section": "signal_voice",
    "pop": 76,
    "flow": [
      [
        "src",
        "Author posts"
      ],
      [
        "ai",
        "Qualify fit"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "watch:Runs weekly",
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Name newsletter authors in your niche",
        "desc": "Valley monitors their LinkedIn posts."
      },
      {
        "heading": "Qualifies their engagers",
        "desc": "A curated audience someone else spent years building."
      },
      {
        "heading": "Opens on the shared interest",
        "desc": "Reference the piece, not the pitch."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "Watch · weekly"
      ]
    ],
    "meta": {
      "listSource": null,
      "bring": "both"
    }
  },
  {
    "id": "mine-a-conference-before-you-get-there",
    "title": "Mine a conference before you get there",
    "d": "Engagers of the event and speaker posts, messaged before the booth even opens.",
    "section": "signal_voice",
    "pop": 74,
    "flow": [
      [
        "src",
        "Event posts"
      ],
      [
        "ai",
        "Qualify fit"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Point Valley at the event’s posts",
        "desc": "Speaker announcements, agendas, hype posts."
      },
      {
        "heading": "Qualifies the engagers",
        "desc": "Attendees and interested lurkers, filtered to your ICP."
      },
      {
        "heading": "Books meetings for event week",
        "desc": "\"Grabbing coffee at X?\" beats the booth raffle."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "catch-podcast-clip-engagers",
    "title": "Catch podcast-clip engagers",
    "d": "People engaging podcast clips in your niche are listening to someone about your problem.",
    "section": "signal_voice",
    "pop": 71,
    "flow": [
      [
        "src",
        "Clip posts"
      ],
      [
        "ai",
        "Qualify fit"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Name the podcasts your buyers hear",
        "desc": "Valley finds the hosts’ clip posts."
      },
      {
        "heading": "Qualifies the engagers",
        "desc": "Listeners with buying titles float to the top."
      },
      {
        "heading": "Opens on the episode",
        "desc": "A shared listen is a shared context."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "hiring-for-roles-that-signal-your-problem",
    "title": "Hiring for roles that signal your problem",
    "d": "A job post is a company announcing a gap. Catch them while it hurts.",
    "section": "signal_hiring",
    "pop": 96,
    "flow": [
      [
        "ai",
        "Scan job posts"
      ],
      [
        "ai",
        "Find buyers"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "watch:Refills daily",
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Scout picks the roles",
        "desc": "The roles that signal your problem, inferred from your product. Editable if you disagree."
      },
      {
        "heading": "Scans live job posts",
        "desc": "LinkedIn and Indeed job boards, off your accounts. Valley dedupes many posts into the accounts hiring hardest."
      },
      {
        "heading": "Finds the decision makers",
        "desc": "The hiring manager and the budget holder, not the recruiter."
      },
      {
        "heading": "Messages cite the job post",
        "desc": "They are hiring because something is broken. The message names it."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "Watch · refills daily"
      ]
    ],
    "q": "Companies hiring the roles that signal your problem, on LinkedIn and Indeed, in your market",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "companies-running-paid-ads",
    "title": "Companies running paid ads",
    "d": "Companies actively spending on paid ads right now, across Meta, Google, and LinkedIn. A live in-market budget signal.",
    "section": "signal_stack",
    "pop": 90,
    "flow": [
      [
        "ai",
        "Scan ad libraries"
      ],
      [
        "ai",
        "Find buyers"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "watch:Refills daily",
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Scans public ad libraries",
        "desc": "Meta, Google, and LinkedIn ad libraries for the platforms you pick. Runs off your accounts."
      },
      {
        "heading": "Merges the advertisers",
        "desc": "One company can advertise on several platforms. Valley dedupes them into the accounts spending now."
      },
      {
        "heading": "Finds the decision makers",
        "desc": "The budget holder and the growth lead, not the ad-ops contractor."
      },
      {
        "heading": "Messages cite the signal",
        "desc": "They are already buying paid growth. The message meets them there."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "Watch · refills daily"
      ]
    ],
    "q": "Companies actively running paid ads on Meta, Google, or LinkedIn for your category or competitors",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "clone-your-icp-by-firmographics",
    "title": "Clone your ICP by firmographics",
    "d": "Companies that match your ICP on size, industry, and geography, from Apollo firmographics.",
    "section": "signal_lookalike",
    "pop": 82,
    "flow": [
      [
        "ai",
        "Match firmographics"
      ],
      [
        "ai",
        "Find buyers"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "watch:Refills daily",
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Matches your firmographics",
        "desc": "Headcount band, industries, and HQ location, pulled from public firmographic data off your accounts."
      },
      {
        "heading": "Dedupes to the companies",
        "desc": "Unique companies that fit the profile, with revenue and growth signals."
      },
      {
        "heading": "Finds the buyers inside",
        "desc": "Titles and seniority matched to who buys your product."
      },
      {
        "heading": "Messages fit the profile",
        "desc": "A message tuned to a company that looks like your best accounts."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "Watch · refills daily"
      ]
    ],
    "q": "Companies matching your ideal size band, industries, and HQ location, from public firmographics",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "recently-launched-on-product-hunt",
    "title": "Recently launched on Product Hunt",
    "d": "Companies that just shipped and are trending on Product Hunt, founders named.",
    "section": "signal_events",
    "pop": 80,
    "flow": [
      [
        "ai",
        "Scan Product Hunt"
      ],
      [
        "ai",
        "Find founders"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "watch:Refills daily",
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Scans the leaderboard",
        "desc": "Recent Product Hunt launches for the window you pick. Runs off your accounts."
      },
      {
        "heading": "Reads the makers",
        "desc": "Founders and makers named on each launch, folded in as a warm reason to reach out."
      },
      {
        "heading": "Finds the decision makers",
        "desc": "The founder and the growth lead, resolved even when the inline maker is sparse."
      },
      {
        "heading": "Messages open on the launch",
        "desc": "They just shipped. The message congratulates the launch and meets them in growth mode."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "Watch · refills daily"
      ]
    ],
    "q": "Companies trending on a recent Product Hunt leaderboard, with their makers named",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "shopify-brands-with-a-stack-gap",
    "title": "Shopify brands with a stack gap",
    "d": "Shopify DTC brands in your niche missing an app category you sell into.",
    "section": "signal_stack",
    "pop": 78,
    "flow": [
      [
        "ai",
        "Scan storefronts"
      ],
      [
        "ai",
        "Find owners"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "watch:Refills daily",
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Scans public storefronts",
        "desc": "Shopify DTC brands in the niche you pick, detected off their public stores."
      },
      {
        "heading": "Reads the app stack",
        "desc": "The apps each store runs, surfacing the ones missing a category you sell into."
      },
      {
        "heading": "Finds the owners",
        "desc": "The founder and the retention or ecommerce lead, not the store inbox."
      },
      {
        "heading": "Messages name the gap",
        "desc": "A message that names the missing app and the revenue it leaves on the table."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "Watch · refills daily"
      ]
    ],
    "q": "Shopify DTC brands in your niche missing an app category you sell into",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "companies-at-a-target-funding-stage",
    "title": "Companies at a target funding stage",
    "d": "Companies at the funding stage you target, optionally only ones that raised recently. Valley finds them.",
    "section": "signal_events",
    "pop": 76,
    "flow": [
      [
        "ai",
        "Find companies"
      ],
      [
        "ai",
        "Find buyers"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "watch:Refills daily",
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Finds the companies",
        "desc": "Valley reads the open web for companies at the funding stage you pick, optionally only those that raised in the last few weeks."
      },
      {
        "heading": "Keeps the fits",
        "desc": "Companies at the funding stage and growth you target, scored against your ICP."
      },
      {
        "heading": "Finds the buyers inside",
        "desc": "Titles and seniority matched to who buys your product."
      },
      {
        "heading": "Messages fit the stage",
        "desc": "A message tuned to where the company is in its funding and growth."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "Watch · refills daily"
      ]
    ],
    "q": "Companies that raised a Seed or Series A round in the last 90 days in my market, under 500 employees",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "publicly-discussing-a-problem-you-solve",
    "title": "Publicly discussing a problem you solve",
    "d": "Companies and decision makers talking about your problem, out loud, on the record.",
    "section": "signal_voice",
    "pop": 93,
    "flow": [
      [
        "ai",
        "Deep Search"
      ],
      [
        "ai",
        "Find buyers"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "watch:Refills daily",
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Scout writes the query",
        "desc": "One search, generated from what you sell. No settings maze."
      },
      {
        "heading": "Deep Search finds the companies",
        "desc": "Verified against public statements, posts, and pages. Every match has evidence."
      },
      {
        "heading": "Finds the decision makers inside",
        "desc": "Titles and seniority matched to who buys your product."
      },
      {
        "heading": "Messages cite the signal",
        "desc": "\"Saw your post about X\" beats any cold opener ever written."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "Watch · refills daily"
      ]
    ],
    "q": "B2B SaaS companies whose founders or sales leaders publicly post about pipeline generation, SDR productivity, or LinkedIn outbound falling flat",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "just-raised-or-acquired",
    "title": "Just raised or acquired",
    "d": "New money means new headcount, new tools, new urgency.",
    "section": "signal_events",
    "pop": 91,
    "flow": [
      [
        "ai",
        "Deep Search"
      ],
      [
        "ai",
        "Find buyers"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "watch:Refills weekly",
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Scout writes the query",
        "desc": "Funding stage and recency matched to when companies actually buy your product."
      },
      {
        "heading": "Deep Search finds the raises",
        "desc": "Announcements from the last 90 days, verified."
      },
      {
        "heading": "Finds the decision makers",
        "desc": "Founders and first GTM hires, mid-spending-spree."
      },
      {
        "heading": "Messages congratulate, then help",
        "desc": "The raise is the opener. Your product is the second sentence."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "Watch · refills weekly"
      ]
    ],
    "q": "B2B companies that raised seed or Series A in the last 90 days and are building their first sales team",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "clone-your-best-customers",
    "title": "Clone your best customers",
    "d": "Companies that look exactly like your top ten accounts, found on the open web.",
    "section": "signal_lookalike",
    "pop": 90,
    "flow": [
      [
        "ai",
        "Deep Search"
      ],
      [
        "ai",
        "Find buyers"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "watch:Refills weekly",
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Scout profiles your best customers",
        "desc": "Industry, size, motion, stack. The pattern behind your wins."
      },
      {
        "heading": "Deep Search finds the twins",
        "desc": "Companies matching the pattern, verified with evidence."
      },
      {
        "heading": "Finds the same buyer",
        "desc": "The title that bought at your customers, found at the lookalikes."
      },
      {
        "heading": "Messages lead with the resemblance",
        "desc": "\"We work with companies like yours\" is finally literally true."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "Watch · refills weekly"
      ]
    ],
    "q": "Companies matching your best customers’ profile: B2B SaaS, 11 to 200 employees, outbound-led go-to-market, US or EU",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "displace-a-competitor",
    "title": "Displace a competitor",
    "d": "Companies publicly using the tool you replace. The category is sold, the vendor is not.",
    "section": "signal_stack",
    "pop": 89,
    "flow": [
      [
        "ai",
        "Deep Search"
      ],
      [
        "ai",
        "Find buyers"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "watch:Refills weekly",
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Scout targets the competitor’s footprint",
        "desc": "Public mentions, job posts, and pages that reveal the tool."
      },
      {
        "heading": "Deep Search verifies usage",
        "desc": "Evidence-backed, not a stale technographic database."
      },
      {
        "heading": "Finds the tool owner",
        "desc": "The person living with the tool’s shortcomings daily."
      },
      {
        "heading": "Messages sell the difference",
        "desc": "No trash talk. Just the thing they wish their tool did."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "Watch · refills weekly"
      ]
    ],
    "q": "B2B companies publicly mentioning they run outbound with generic mass-automation or AI SDR tools",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "new-exec-new-budget",
    "title": "New exec, new budget",
    "d": "A just-hired VP or C-level in your buying seat rethinks the stack in their first 90 days.",
    "section": "signal_hiring",
    "pop": 88,
    "flow": [
      [
        "ai",
        "Deep Search"
      ],
      [
        "ai",
        "Find buyers"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "watch:Refills weekly",
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Scout watches for leadership changes",
        "desc": "In the exact seat that buys your product."
      },
      {
        "heading": "Deep Search finds the announcements",
        "desc": "New-hire posts, press, and profile changes."
      },
      {
        "heading": "Times the outreach",
        "desc": "Day 30 to 90: mandate fresh, budget unspent, patience for vendors high."
      },
      {
        "heading": "Messages speak to the mandate",
        "desc": "New execs buy change. Sell the change."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "Watch · refills weekly"
      ]
    ],
    "q": "Companies that appointed a new VP of Sales, CRO, or Head of Growth in the last 90 days, 20 to 500 employees",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "hiring-the-role-you-replace",
    "title": "Hiring the role you replace",
    "d": "They budgeted a salary for the problem. Offer them the software instead.",
    "section": "signal_hiring",
    "pop": 87,
    "flow": [
      [
        "ai",
        "Deep Search"
      ],
      [
        "ai",
        "Find buyers"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "watch:Refills daily",
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Scout maps your product to the req",
        "desc": "The job description is your feature list in prose."
      },
      {
        "heading": "Deep Search finds the open reqs",
        "desc": "Live postings, refreshed as new ones appear."
      },
      {
        "heading": "Finds who owns the headcount",
        "desc": "The hiring manager comparing candidates has a budget line already approved."
      },
      {
        "heading": "Messages reframe the hire",
        "desc": "\"Before you fill that role\" is a first line that gets read."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "Watch · refills daily"
      ]
    ],
    "q": "Companies with an open req for the role your product automates or augments",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "catch-competitor-churn",
    "title": "Catch competitor churn",
    "d": "People publicly complaining about the tool they use are mid-switch. Be there.",
    "section": "signal_voice",
    "pop": 86,
    "flow": [
      [
        "ai",
        "Deep Search"
      ],
      [
        "ai",
        "Find buyers"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "watch:Refills daily",
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Scout listens for public frustration",
        "desc": "Complaint posts, rant threads, \"looking for alternatives\" asks."
      },
      {
        "heading": "Deep Search verifies the gripe",
        "desc": "Real complaints from real buyers, with the receipt."
      },
      {
        "heading": "Finds the complainer and their boss",
        "desc": "The frustrated user and the person who signs."
      },
      {
        "heading": "Messages answer the complaint",
        "desc": "They already wrote your opener for you. Respond to it."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "Watch · refills daily"
      ]
    ],
    "q": "Sales leaders publicly complaining about spammy automation tools, LinkedIn restrictions, or robotic AI messages",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "using-complementary-technology",
    "title": "Using complementary technology",
    "d": "Their stack tells you they are your buyer before they do.",
    "section": "signal_stack",
    "pop": 85,
    "flow": [
      [
        "ai",
        "Deep Search"
      ],
      [
        "ai",
        "Find buyers"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "watch:Refills weekly",
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Scout writes the query",
        "desc": "Technographic criteria built from what your product plugs into or replaces."
      },
      {
        "heading": "Deep Search verifies the stack",
        "desc": "Job posts, docs pages, and public mentions. Not a stale database."
      },
      {
        "heading": "Finds the decision makers",
        "desc": "The people who own that part of the stack."
      },
      {
        "heading": "Messages speak their language",
        "desc": "Compatible-stack outreach converts because context is pre-installed."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "Watch · refills weekly"
      ]
    ],
    "q": "B2B companies with Clay, Apollo, or HubSpot in their stack that run outbound sales motions",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "launched-or-partnered-recently",
    "title": "Launched or partnered recently",
    "d": "A launch or partnership in the last six months means motion, budget, and press to reference.",
    "section": "signal_events",
    "pop": 78,
    "flow": [
      [
        "ai",
        "Deep Search"
      ],
      [
        "ai",
        "Find buyers"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Scout writes the query",
        "desc": "News criteria tuned to companies in motion in your market."
      },
      {
        "heading": "Deep Search finds the news",
        "desc": "Launches and partnerships, verified against announcements."
      },
      {
        "heading": "Finds the decision makers",
        "desc": "The team behind the launch."
      },
      {
        "heading": "Messages reference the moment",
        "desc": "Everyone congratulates the funding. Almost nobody references the launch."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "q": "B2B companies that launched a product or announced a partnership in the last 6 months and sell to sales or marketing teams",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "fastest-growing-lists-and-awards",
    "title": "Fastest-growing lists and awards",
    "d": "Inc 5000 types. Public proof of growth, and founders who love talking about it.",
    "section": "signal_events",
    "pop": 77,
    "flow": [
      [
        "ai",
        "Deep Search"
      ],
      [
        "ai",
        "Find buyers"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Scout finds the list-makers",
        "desc": "Award and ranking announcements, verified."
      },
      {
        "heading": "Finds the leaders",
        "desc": "Growth creates the problems your product solves."
      },
      {
        "heading": "Messages open on the win",
        "desc": "Congratulations that segue into \"growth breaks things, here’s what usually breaks first.\""
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "q": "Companies named to a fastest-growing or top-startups list in the last 12 months in your target industry",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "headcount-surge",
    "title": "Headcount surge",
    "d": "Companies growing over 20% a year are buying tools this quarter, not someday.",
    "section": "signal_hiring",
    "pop": 75,
    "flow": [
      [
        "ai",
        "Deep Search"
      ],
      [
        "ai",
        "Find buyers"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "watch:Refills monthly",
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Scout sets the growth criteria",
        "desc": "Growth rate and team size tuned to your sweet spot."
      },
      {
        "heading": "Deep Search verifies the surge",
        "desc": "Public team pages, hiring velocity, announcements."
      },
      {
        "heading": "Messages name the growing pain",
        "desc": "Scaling pain is predictable. Predict it."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "Watch · refills monthly"
      ]
    ],
    "q": "B2B companies that grew headcount over 20% in the last year with sales teams still under 20 people",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "opening-new-offices-or-markets",
    "title": "Opening new offices or markets",
    "d": "Geographic expansion means new teams, new processes, and no incumbent vendors.",
    "section": "signal_events",
    "pop": 73,
    "flow": [
      [
        "ai",
        "Deep Search"
      ],
      [
        "ai",
        "Find buyers"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Scout watches for expansion news",
        "desc": "New offices, new markets, new country pages."
      },
      {
        "heading": "Finds who runs the new region",
        "desc": "The GM or first hire building from zero."
      },
      {
        "heading": "Messages meet the moment",
        "desc": "New market, no incumbent. The easiest competitive landscape there is."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "q": "Companies announcing US or European expansion in the last 6 months that sell B2B",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "modernizing-off-a-legacy-stack",
    "title": "Modernizing off a legacy stack",
    "d": "Companies stuck on aging tools, found by the artifacts legacy software leaves in public.",
    "section": "signal_stack",
    "pop": 71,
    "flow": [
      [
        "ai",
        "Deep Search"
      ],
      [
        "ai",
        "Find buyers"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Scout fingerprints the legacy tools",
        "desc": "Job reqs asking for experience with them are the tell."
      },
      {
        "heading": "Finds the modernization owner",
        "desc": "Often a newer leader brought in to fix exactly this."
      },
      {
        "heading": "Messages sell the upgrade path",
        "desc": "Not \"your stack is old.\" Rather \"here’s what the switch looks like.\""
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "q": "Companies still running sales engagement on legacy platforms, showing in job posts and docs",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "recently-pe-acquired-or-ipo-d",
    "title": "Recently PE-acquired or IPO’d",
    "d": "Ownership change resets every budget and every vendor relationship.",
    "section": "signal_events",
    "pop": 69,
    "flow": [
      [
        "ai",
        "Deep Search"
      ],
      [
        "ai",
        "Find buyers"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Scout watches ownership events",
        "desc": "PE acquisitions, IPOs, majority investments."
      },
      {
        "heading": "Finds the operators under new pressure",
        "desc": "New owners demand efficiency. Efficiency is a software purchase."
      },
      {
        "heading": "Messages speak to the mandate",
        "desc": "Post-acquisition companies buy ROI stories. Tell one."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "q": "Companies acquired by private equity or newly public in the last 6 months in your target industry",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "people-talking-about-it-on-podcasts",
    "title": "People talking about it on podcasts",
    "d": "Founders and leaders who discussed your problem on a podcast will discuss it with you.",
    "section": "signal_voice",
    "pop": 68,
    "flow": [
      [
        "ai",
        "Deep Search"
      ],
      [
        "ai",
        "Find buyers"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Scout scans podcast guests",
        "desc": "Episode pages and show notes in your niche."
      },
      {
        "heading": "Matches guests to your ICP",
        "desc": "People who talk publicly reply more. It’s who they are."
      },
      {
        "heading": "Messages quote the episode",
        "desc": "\"You said something on X podcast that stuck with me\" is irresistible."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "q": "Founders and sales leaders who discussed pipeline generation on a podcast in the last 6 months",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "regulation-with-a-deadline",
    "title": "Regulation with a deadline",
    "d": "When a rule changes in your space, every affected company becomes in-market at once.",
    "section": "signal_events",
    "pop": 62,
    "flow": [
      [
        "ai",
        "Deep Search"
      ],
      [
        "ai",
        "Find buyers"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Scout maps the regulation to your buyers",
        "desc": "Who is exposed, and what the deadline is."
      },
      {
        "heading": "Finds the affected companies",
        "desc": "Public evidence of exposure to the change."
      },
      {
        "heading": "Messages lead with the date",
        "desc": "Deadlines convert better than discounts."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "q": "Companies affected by the new bulk-sender deliverability requirements that run cold email programs",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "recently-rebranded",
    "title": "Recently rebranded",
    "d": "A rebrand is a company mid-reinvention. Every process is up for review.",
    "section": "signal_events",
    "pop": 58,
    "flow": [
      [
        "ai",
        "Deep Search"
      ],
      [
        "ai",
        "Find buyers"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Scout catches the rebrand announcements",
        "desc": "New name, new site, new positioning."
      },
      {
        "heading": "Finds the change-makers",
        "desc": "Rebrands have executive sponsors. Find them."
      },
      {
        "heading": "Messages ride the reinvention",
        "desc": "\"New chapter\" energy extends to new vendors."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "q": "Companies that rebranded or renamed in the last 6 months in your target industry",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "listed-in-partner-directories",
    "title": "Listed in partner directories",
    "d": "Agencies and consultancies in your ecosystem’s partner directories, already qualified by someone else.",
    "section": "signal_stack",
    "pop": 54,
    "flow": [
      [
        "ai",
        "Deep Search"
      ],
      [
        "ai",
        "Find buyers"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Scout crawls the directories",
        "desc": "Public partner pages of complementary platforms."
      },
      {
        "heading": "Qualifies the partners",
        "desc": "Someone else’s certification is your pre-qualification."
      },
      {
        "heading": "Messages propose the fit",
        "desc": "Partners multiply. One good one is worth twenty accounts."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "q": "Agencies and consultancies listed in the partner directories of tools your customers use",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "find-companies-with-signal-based-search",
    "title": "Find companies with signal-based search",
    "d": "Companies and decision makers talking about your problem, out loud, on the record.",
    "section": "signal_voice",
    "pop": 92,
    "flow": [
      [
        "ai",
        "Deep Search"
      ],
      [
        "ai",
        "Find buyers"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "watch:Refills daily",
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Scout writes the query",
        "desc": "One search, generated from what you sell. No settings maze."
      },
      {
        "heading": "Deep Search finds the companies",
        "desc": "Verified against public statements, posts, and pages. Every match has evidence."
      },
      {
        "heading": "Finds the decision makers inside",
        "desc": "Titles and seniority matched to who buys your product."
      },
      {
        "heading": "Messages cite the signal",
        "desc": "\"Saw your post about X\" beats any cold opener ever written."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "Watch · refills daily"
      ]
    ],
    "q": "B2B SaaS companies whose founders or sales leaders publicly post about pipeline generation, SDR productivity, or LinkedIn outbound falling flat",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "find-people-with-ai",
    "title": "Find people with AI",
    "d": "Describe who you want to reach. Valley finds matching people on LinkedIn and builds your list.",
    "section": "list",
    "pop": 70,
    "flow": [
      [
        "ai",
        "Describe them"
      ],
      [
        "ai",
        "Find people"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Describe who to reach",
        "desc": "One sentence: title, industry, seniority, geography. No query to write."
      },
      {
        "heading": "Finds real LinkedIn people",
        "desc": "Searches LinkedIn in real time and shows you the matches to approve."
      },
      {
        "heading": "Messages fit the person",
        "desc": "A message tuned to the people you described."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "meta": {
      "listSource": "csv",
      "bring": "find"
    }
  },
  {
    "id": "named-accounts",
    "title": "Named accounts",
    "d": "Bring the accounts you are going after. Valley groups the buyers at each, watches every account for buying signals, and drafts the opener the moment one fires.",
    "section": "list",
    "pop": 82,
    "soon": true,
    "flow": [
      [
        "src",
        "Account list"
      ],
      [
        "ai",
        "Group by account"
      ],
      [
        "ai",
        "Watch signals"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Bring your target accounts",
        "desc": "Paste your leads, upload a CSV, or drop a Sales Navigator lead search. Name, title, company is enough."
      },
      {
        "heading": "Groups the buyers by account",
        "desc": "Valley dedupes your list and organizes it into the accounts you are going after, with the buying committee at each."
      },
      {
        "heading": "Watches every account for signals",
        "desc": "Ad-spend surges, new hires, funding, launches. Valley keeps a live eye on each named account."
      },
      {
        "heading": "Drafts the opener when a signal fires",
        "desc": "The moment an account moves, Valley writes the message that meets it, ready for your approval."
      }
    ],
    "conf": [
      [
        "Audience",
        "Named accounts"
      ],
      [
        "Cadence",
        "Always on"
      ]
    ],
    "meta": {
      "listSource": null,
      "bring": "none"
    }
  },
  {
    "id": "hyper-relevant-messaging-to-a-sales-nav-audience",
    "title": "Hyper-relevant messaging to a Sales Nav audience",
    "d": "Paste the search. Valley qualifies, researches, and writes for every person in it.",
    "section": "list",
    "pop": 92,
    "flow": [
      [
        "src",
        "Sales Nav URL"
      ],
      [
        "ai",
        "Qualify fit"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Paste a Sales Navigator search",
        "desc": "Valley imports the audience."
      },
      {
        "heading": "Qualifies against your ICP",
        "desc": "Sales Nav filters are broad. Fit scoring is the sharp edge."
      },
      {
        "heading": "Researches each person",
        "desc": "Per-prospect research feeds every message. Nothing templated."
      },
      {
        "heading": "Sequences run automatically",
        "desc": "Connects, follow-ups, and replies, managed end to end."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "meta": {
      "listSource": "salesnav",
      "bring": "paste"
    }
  },
  {
    "id": "upload-a-list-send-hyper-relevant-messages",
    "title": "Upload a list + send hyper-relevant messages",
    "d": "Your list, Valley’s brain. Every row needs a LinkedIn profile URL.",
    "section": "list",
    "pop": 86,
    "flow": [
      [
        "src",
        "CSV upload"
      ],
      [
        "ai",
        "Qualify fit"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Upload the CSV",
        "desc": "LinkedIn URLs, or just emails. Valley resolves emails to profiles."
      },
      {
        "heading": "Qualifies against your ICP",
        "desc": "Old lists rot. Fit scoring separates the live ones."
      },
      {
        "heading": "Researches each person",
        "desc": "Fresh research, even on a stale list."
      },
      {
        "heading": "Sequences run automatically",
        "desc": "Connects, follow-ups, and replies, managed end to end."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "meta": {
      "listSource": "csv",
      "bring": "upload"
    }
  },
  {
    "id": "message-a-synced-clay-table",
    "title": "Message a synced Clay table",
    "d": "Your Clay workflows feed Valley continuously. New rows become outreach.",
    "section": "list",
    "pop": 68,
    "flow": [
      [
        "src",
        "Clay table"
      ],
      [
        "ai",
        "Qualify fit"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "watch:Syncs live",
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Connect the Clay table",
        "desc": "Rows sync into Valley as your Clay workflow adds them."
      },
      {
        "heading": "Qualifies against your ICP",
        "desc": "A second gate after your Clay logic."
      },
      {
        "heading": "Researches each person",
        "desc": "Valley research stacks on top of your Clay enrichment."
      },
      {
        "heading": "Sequences run continuously",
        "desc": "A standing pipe from Clay to conversations."
      }
    ],
    "conf": [
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "Watch · live sync"
      ]
    ],
    "meta": {
      "listSource": "clay",
      "bring": "upload"
    }
  },
  {
    "id": "message-any-post-s-engagers",
    "title": "Message any post's engagers",
    "d": "Paste any LinkedIn posts, yours or anyone's. Valley scrapes everyone who engaged and messages the best fits.",
    "section": "social_others",
    "pop": 90,
    "flow": [
      [
        "src",
        "Your post links"
      ],
      [
        "ai",
        "Qualify fit"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "You bring: posts",
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "You paste the post URLs",
        "desc": "One or many. That's the only thing Valley needs from you."
      },
      {
        "heading": "Scrapes every engager",
        "desc": "Reactors and commenters, deduped against people you already know."
      },
      {
        "heading": "Qualifies and researches",
        "desc": "Only High and Medium fits continue; each gets researched on why they engaged."
      },
      {
        "heading": "Sends and manages replies",
        "desc": "Drafts wait for your approval."
      }
    ],
    "conf": [
      [
        "You bring",
        "Post URLs"
      ],
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "One-time or watch"
      ]
    ],
    "meta": {
      "listSource": null,
      "bring": "both"
    }
  },
  {
    "id": "message-your-company-page-followers",
    "title": "Message your company page followers",
    "d": "Your own company page. Valley pulls everyone who follows you and messages the best fits.",
    "section": "social_yours",
    "pop": 84,
    "flow": [
      [
        "src",
        "Your company page"
      ],
      [
        "ai",
        "Qualify fit"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "Your company page",
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Confirm your company page",
        "desc": "Valley prefills your LinkedIn company page. Change it only if you manage more than one."
      },
      {
        "heading": "Pulls your followers",
        "desc": "Everyone who follows your company, deduped against people you already know."
      },
      {
        "heading": "Qualifies and researches",
        "desc": "Only High and Medium fits continue; each gets researched before Valley writes."
      },
      {
        "heading": "Sends and manages replies",
        "desc": "Drafts wait for your approval."
      }
    ],
    "conf": [
      [
        "Source",
        "Your followers"
      ],
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Pull",
        "Up to 100k"
      ]
    ],
    "meta": {
      "listSource": null,
      "bring": "paste"
    }
  },
  {
    "id": "competitors-followers",
    "title": "Competitors' followers",
    "d": "Valley finds your competitors' LinkedIn pages and pulls everyone following them. They already care about your category.",
    "section": "social_others",
    "pop": 84,
    "flow": [
      [
        "src",
        "Competitor pages"
      ],
      [
        "ai",
        "Qualify fit"
      ],
      [
        "ai",
        "Research"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "Valley finds competitors",
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Valley recommends competitors",
        "desc": "Valley proposes your direct competitors and verifies each is a real LinkedIn company page. Pick the ones you want, or add your own."
      },
      {
        "heading": "Pulls their followers",
        "desc": "Everyone who follows those competitors, deduped against people you already know."
      },
      {
        "heading": "Qualifies and researches",
        "desc": "Only High and Medium fits continue; each gets researched before Valley writes."
      },
      {
        "heading": "Sends and manages replies",
        "desc": "Drafts wait for your approval."
      }
    ],
    "conf": [
      [
        "Source",
        "Competitor followers"
      ],
      [
        "Audience",
        "High + medium fit"
      ],
      [
        "Cadence",
        "One-time or watch"
      ]
    ],
    "meta": {
      "listSource": null,
      "bring": "paste"
    }
  },
  {
    "id": "upload-a-list-send-templated-messages",
    "title": "Upload a list + send templated messages",
    "d": "A proven three-step connect sequence that asks for the meeting.",
    "section": "list",
    "pop": 89,
    "flow": [
      [
        "src",
        "Your list"
      ],
      [
        "plain",
        "3-step sequence"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Pick your audience",
        "desc": "Sales Nav URL, saved list, or CSV."
      },
      {
        "heading": "Sequence runs",
        "desc": "Connect note, a value follow-up, a direct ask. Proven copy you can edit."
      },
      {
        "heading": "Replies land in your inbox",
        "desc": "Valley pauses the sequence the moment someone responds."
      }
    ],
    "conf": [
      [
        "Audience",
        "You choose"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "meta": {
      "listSource": "csv",
      "bring": "upload"
    }
  },
  {
    "id": "re-engage-a-previous-campaign",
    "title": "Re-engage a previous campaign",
    "d": "People who accepted your connect but never replied get a fresh motion, by stage reached.",
    "section": "list",
    "pop": 82,
    "flow": [
      [
        "src",
        "Previous campaign"
      ],
      [
        "plain",
        "Pick stages"
      ],
      [
        "ai",
        "New DMs"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn",
      "AI messages"
    ],
    "steps": [
      {
        "heading": "Pick the campaign and stages",
        "desc": "A paused or finished campaign; pull people by how far they got (accepted, follow-up 1, 2, 3+)."
      },
      {
        "heading": "Valley writes fresh DMs",
        "desc": "They are already 1st-degree connections, so the messages pick the conversation back up instead of restarting the pitch."
      },
      {
        "heading": "The old campaign lets go",
        "desc": "It keeps its record and never touches these people again; replies land in the new campaign."
      }
    ],
    "conf": [
      [
        "Audience",
        "Previous campaign"
      ],
      [
        "Cadence",
        "One-time pull"
      ]
    ],
    "meta": {
      "listSource": null,
      "bring": "none"
    }
  },
  {
    "id": "ask-your-network-for-intros",
    "title": "Ask your network for intros",
    "d": "A warm, low-pressure referral ask to first-degree connections who know your buyers.",
    "section": "list",
    "pop": 79,
    "flow": [
      [
        "src",
        "1st-degree champions"
      ],
      [
        "ai",
        "Personal ask"
      ],
      [
        "send",
        "LinkedIn DM"
      ]
    ],
    "tags": [
      "LinkedIn",
      "AI messages"
    ],
    "steps": [
      {
        "heading": "Pick your champions",
        "desc": "A CSV of first-degree connections positioned near your buyers. Valley verifies everyone is a real connection."
      },
      {
        "heading": "Valley writes each ask personally",
        "desc": "A direct message in your voice, grounded in your real relationship. One honest ask, easy to decline, never a pitch."
      },
      {
        "heading": "A single gentle follow-up",
        "desc": "Then it stops for good. Every message waits for your approval."
      }
    ],
    "conf": [
      [
        "Audience",
        "1st-degree only"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "meta": {
      "listSource": "csv",
      "bring": "upload"
    }
  },
  {
    "id": "conference-follow-up",
    "title": "Conference follow-up",
    "d": "Upload the attendee list, follow up while the badge scan is warm.",
    "section": "list",
    "pop": 74,
    "flow": [
      [
        "src",
        "Attendee CSV"
      ],
      [
        "plain",
        "3-step sequence"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Upload the CSV",
        "desc": "Names and companies are enough. Valley resolves LinkedIn profiles."
      },
      {
        "heading": "Reference the event",
        "desc": "Copy opens with where you crossed paths."
      },
      {
        "heading": "Three touches",
        "desc": "Then it stops. No zombie sequences."
      }
    ],
    "conf": [
      [
        "Audience",
        "Your CSV"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "meta": {
      "listSource": "csv",
      "bring": "upload"
    }
  },
  {
    "id": "share-a-lead-magnet",
    "title": "Share a lead magnet",
    "d": "Give-first sequence that opens with the asset, not the ask.",
    "section": "list",
    "pop": 73,
    "flow": [
      [
        "src",
        "Your list"
      ],
      [
        "plain",
        "Give-first sequence"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Pick your audience",
        "desc": "A list that would genuinely want the asset."
      },
      {
        "heading": "Lead with the give",
        "desc": "First message offers the asset with no strings."
      },
      {
        "heading": "Soft ask later",
        "desc": "The meeting ask only shows up after they engage."
      }
    ],
    "conf": [
      [
        "Audience",
        "You choose"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "meta": {
      "listSource": "csv",
      "bring": "upload"
    }
  },
  {
    "id": "invite-a-list-to-an-event",
    "title": "Invite a list to an event",
    "d": "Invite plus two reminders, timed around your event date.",
    "section": "list",
    "pop": 71,
    "flow": [
      [
        "src",
        "Your list"
      ],
      [
        "plain",
        "Invite + 2 nudges"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Pick your audience",
        "desc": "Anyone you want in the room."
      },
      {
        "heading": "Set the event date",
        "desc": "Reminders time themselves backward from it."
      },
      {
        "heading": "Invite, nudge, last call",
        "desc": "Three touches, then it stops."
      }
    ],
    "conf": [
      [
        "Audience",
        "You choose"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "meta": {
      "listSource": "csv",
      "bring": "upload"
    }
  },
  {
    "id": "engage-your-first-degree-network",
    "title": "Engage your first-degree network",
    "d": "A slow, personal drip to people already in your network.",
    "section": "list",
    "pop": 69,
    "flow": [
      [
        "src",
        "1st-degree list"
      ],
      [
        "ai",
        "Personal DMs"
      ],
      [
        "send",
        "LinkedIn DM"
      ]
    ],
    "tags": [
      "LinkedIn",
      "AI messages"
    ],
    "steps": [
      {
        "heading": "Import first-degree connections",
        "desc": "A CSV of your connections. Valley verifies connection status automatically; non-connections never enroll."
      },
      {
        "heading": "Valley writes each message personally",
        "desc": "Real shared history when it exists, continuing an existing thread instead of restarting it. Never a cold intro, never a pitch-first note."
      },
      {
        "heading": "Slow drip, stops on reply",
        "desc": "Two widely spaced touches. Any response ends the drip and starts a conversation."
      }
    ],
    "conf": [
      [
        "Audience",
        "1st-degree only"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "meta": {
      "listSource": "csv",
      "bring": "upload"
    }
  },
  {
    "id": "pitch-journalists-and-analysts",
    "title": "Pitch journalists and analysts",
    "d": "The people covering your category, found for you and pitched with a story, not a press release.",
    "section": "growth",
    "pop": 63,
    "flow": [
      [
        "ai",
        "Find the writers"
      ],
      [
        "plain",
        "Story pitch"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Valley finds the writers",
        "desc": "Journalists and analysts covering your space at the outlets you name. No list to bring."
      },
      {
        "heading": "Lead with the story",
        "desc": "Data, a contrarian take, or a customer arc. Not your funding."
      },
      {
        "heading": "Two touches maximum",
        "desc": "Media relationships compound. Don’t spend them on spam."
      }
    ],
    "conf": [
      [
        "Audience",
        "Valley finds them"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "q": "Journalists and analysts who cover my category at technology and business outlets",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "reach-investors-for-your-raise",
    "title": "Reach investors for your raise",
    "d": "Angels and VCs active in your category, found for you and approached with traction, not a cold deck.",
    "section": "growth",
    "pop": 61,
    "flow": [
      [
        "ai",
        "Find the investors"
      ],
      [
        "plain",
        "Traction note"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Valley finds the investors",
        "desc": "Firms and angels with a thesis matching your space, plus the partners at each. No list to bring."
      },
      {
        "heading": "Lead with the metric",
        "desc": "One number that makes them lean in. The deck comes second."
      },
      {
        "heading": "Warm, patient cadence",
        "desc": "Two touches, spaced. Fundraising is a long game."
      }
    ],
    "conf": [
      [
        "Audience",
        "Valley finds them"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "q": "Venture and angel investors that invest in my category at seed to Series A, and their partners",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "recruit-advisors",
    "title": "Recruit advisors",
    "d": "The operators you want around the table, found for you and approached with a real role.",
    "section": "growth",
    "pop": 56,
    "flow": [
      [
        "ai",
        "Find the operators"
      ],
      [
        "plain",
        "Advisor ask"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Valley finds the operators",
        "desc": "People who have done what you are attempting, matched to the experience you want. No list to bring."
      },
      {
        "heading": "A specific, bounded ask",
        "desc": "What you want, how much time, what they get."
      },
      {
        "heading": "One follow-up",
        "desc": "Senior people respect a clean ask and a clean stop."
      }
    ],
    "conf": [
      [
        "Audience",
        "Valley finds them"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "q": "Experienced operators and executives in my category who advise early-stage startups",
    "meta": {
      "listSource": null,
      "bring": "find"
    }
  },
  {
    "id": "reach-candidates-engaging-hiring-content",
    "title": "Reach candidates engaging hiring content",
    "d": "People engaging posts about roles like yours are quietly looking.",
    "section": "recruit",
    "pop": 57,
    "flow": [
      [
        "src",
        "Hiring posts"
      ],
      [
        "ai",
        "Qualify fit"
      ],
      [
        "send",
        "LinkedIn"
      ]
    ],
    "tags": [
      "LinkedIn"
    ],
    "steps": [
      {
        "heading": "Point Valley at hiring-adjacent posts",
        "desc": "Yours, or big posts about careers in the role."
      },
      {
        "heading": "Qualifies for the role",
        "desc": "Filters engagers against the role’s requirements."
      },
      {
        "heading": "A quiet, personal approach",
        "desc": "Passive candidates answer DMs, not job boards."
      }
    ],
    "conf": [
      [
        "Audience",
        "Role fit"
      ],
      [
        "Cadence",
        "One-time"
      ]
    ],
    "meta": {
      "listSource": null,
      "bring": "both"
    }
  }
]
