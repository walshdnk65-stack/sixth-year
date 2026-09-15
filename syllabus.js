/* Leaving Certificate syllabus catalogue.
 *
 * One entry per subject, structured strand → topic at the size of a single study
 * block. Topics carry an exam weight (1 light … 3 heavily examined) that the
 * planner uses when deciding what to suggest, and `hl: true` marks material that
 * is Higher Level only.
 *
 * Headings follow the NCCA/SEC specifications. Textbooks listed are the ones in
 * common use; chapter numbers are deliberately NOT included here — they differ by
 * edition and by school, so students map their own book's chapters to topics
 * inside the app. Subjects without an entry get a blank syllabus the student can
 * fill in themselves. */
window.SYLLABUS = {
  aliases: {
    'Maths': 'Mathematics', 'Gaeilge': 'Irish', 'Ag Science': 'Agricultural Science',
    'Home Ec': 'Home Economics', 'DCG': 'Design & Communication Graphics'
  },
  subjects: {

    /* ------------------------------------------------------------ Mathematics */
    'Mathematics': {
      source: 'Leaving Certificate Mathematics syllabus — five strands (Project Maths)',
      note: 'Paper 1 covers Number, Algebra and Functions; Paper 2 covers Statistics, Probability, Geometry and Trigonometry.',
      books: [
        { id: 'active-maths-4', title: 'Active Maths 4 (Books 1 & 2)', publisher: 'Folens' },
        { id: 'text-tests-6-7', title: 'Text & Tests 6 and 7', publisher: 'Celtic Press' },
        { id: 'lsms-maths', title: 'Less Stress More Success — Maths', publisher: 'Gill' }
      ],
      strands: [
        { id: 'stats', title: 'Strand 1 — Statistics & Probability', paper: 'Paper 2', topics: [
          { id: 'counting', title: 'Counting & arrangements', detail: 'Fundamental principle of counting, permutations, combinations', weight: 2 },
          { id: 'prob', title: 'Probability', detail: 'Sample spaces, addition and multiplication rules, conditional probability, independence, tree diagrams', weight: 3 },
          { id: 'dists', title: 'Distributions & expected value', detail: 'Bernoulli trials, binomial distribution, expected value, normal distribution and z-scores', weight: 3 },
          { id: 'data', title: 'Collecting & presenting data', detail: 'Sampling, types of data, histograms, stem-and-leaf plots, scatter plots', weight: 2 },
          { id: 'summary', title: 'Summary statistics', detail: 'Mean, median, mode, range, interquartile range, standard deviation, skew', weight: 2 },
          { id: 'inference', title: 'Inference', detail: 'Correlation and line of best fit, margin of error, confidence intervals, hypothesis testing', weight: 3, hl: true }
        ]},
        { id: 'geom', title: 'Strand 2 — Geometry & Trigonometry', paper: 'Paper 2', topics: [
          { id: 'synthetic', title: 'Synthetic geometry', detail: 'Theorems and corollaries, constructions 1–22, geometric reasoning', weight: 2 },
          { id: 'proofs', title: 'Proofs of theorems 11, 12 and 13', detail: 'The three examinable proofs', weight: 2, hl: true },
          { id: 'coordline', title: 'Coordinate geometry — the line', detail: 'Slope, equation of a line, intersection, perpendicular distance, area of a triangle', weight: 2 },
          { id: 'coordcircle', title: 'Coordinate geometry — the circle', detail: 'Equation of a circle, tangents, intersection with a line', weight: 2 },
          { id: 'trigbasic', title: 'Trigonometry — triangles', detail: 'Ratios, sine and cosine rules, area of a triangle, bearings', weight: 3 },
          { id: 'trigfunc', title: 'Trig functions', detail: 'Unit circle, radians, graphs and periods, identities, solving trig equations', weight: 3 },
          { id: 'trig3d', title: '3D and applied trig problems', detail: 'Problems in three dimensions, real-world contexts', weight: 2 },
          { id: 'transform', title: 'Transformations & enlargements', detail: 'Translations, reflections, rotations, enlargements and scale factors', weight: 1 }
        ]},
        { id: 'number', title: 'Strand 3 — Number', paper: 'Paper 1', topics: [
          { id: 'numsys', title: 'Number systems, indices, logs & surds', detail: 'N, Z, Q, R, C; laws of indices and logs; simplifying surds', weight: 2 },
          { id: 'complex', title: 'Complex numbers', detail: 'Argand diagram, modulus, conjugate, quadratic roots, polar form', weight: 3 },
          { id: 'demoivre', title: 'De Moivre’s theorem', detail: 'Powers and roots of complex numbers, proof by induction', weight: 2, hl: true },
          { id: 'financial', title: 'Financial maths', detail: 'Compound interest, depreciation, present value, loans and annuities', weight: 3 },
          { id: 'arith', title: 'Arithmetic', detail: 'Percentages, percentage error, income tax and VAT, scientific notation', weight: 1 },
          { id: 'sequences', title: 'Sequences & series', detail: 'Arithmetic and geometric sequences, series, sum to infinity', weight: 3 },
          { id: 'induction', title: 'Proof by induction', detail: 'Series, divisibility and inequality proofs', weight: 2, hl: true },
          { id: 'measure', title: 'Length, area & volume', detail: 'Trapezoidal rule, nets, prisms, cylinders, cones, spheres', weight: 2 }
        ]},
        { id: 'algebra', title: 'Strand 4 — Algebra', paper: 'Paper 1', topics: [
          { id: 'expressions', title: 'Expressions & factorising', detail: 'Expanding, factorising, algebraic fractions, rearranging formulae', weight: 2 },
          { id: 'equations', title: 'Solving equations', detail: 'Linear, quadratic, simultaneous, modulus and surd equations', weight: 3 },
          { id: 'cubics', title: 'Cubic equations & the factor theorem', detail: 'Finding roots of cubics, remainder and factor theorem', weight: 2, hl: true },
          { id: 'inequalities', title: 'Inequalities', detail: 'Linear, quadratic, rational and modulus inequalities', weight: 2 },
          { id: 'binomial', title: 'Binomial theorem', detail: 'Expansions and general term', weight: 1, hl: true },
          { id: 'expolog', title: 'Exponential & log equations', detail: 'Solving with laws of logs, changing base, growth and decay', weight: 2 }
        ]},
        { id: 'functions', title: 'Strand 5 — Functions & Calculus', paper: 'Paper 1', topics: [
          { id: 'functions', title: 'Functions', detail: 'Domain and range, inverse and composite functions, injective/surjective/bijective, transformations', weight: 2 },
          { id: 'graphs', title: 'Graphing functions', detail: 'Quadratic, cubic, exponential, log and trig graphs; reading graphs', weight: 2 },
          { id: 'diff', title: 'Differentiation', detail: 'From first principles, power/chain/product/quotient rules, trig, exp and log', weight: 3 },
          { id: 'diffapps', title: 'Applications of differentiation', detail: 'Tangents, max and min, rates of change, curve sketching', weight: 3 },
          { id: 'integ', title: 'Integration', detail: 'Polynomials, exp and trig; area under a curve; average value', weight: 3, hl: true }
        ]}
      ]
    },

    /* ---------------------------------------------------------------- Biology */
    'Biology': {
      source: 'Leaving Certificate Biology syllabus — three units plus mandatory experiments',
      note: 'Section A short questions, Section B experiments, Section C long questions.',
      books: [
        { id: 'biology-plus', title: 'Biology Plus', publisher: 'Edco' },
        { id: 'lc-biology-educate', title: 'Leaving Certificate Biology', publisher: 'Educate.ie' },
        { id: 'lsms-biology', title: 'Less Stress More Success — Biology', publisher: 'Gill' }
      ],
      strands: [
        { id: 'u1', title: 'Unit 1 — Biology, the study of life', topics: [
          { id: 'scimethod', title: 'The scientific method', detail: 'Hypothesis, experiment design, controls, limitations', weight: 1 },
          { id: 'lifechar', title: 'Characteristics of life', detail: 'Metabolism, continuity of life, the five characteristics', weight: 1 },
          { id: 'nutrition', title: 'Nutrition & biomolecules', detail: 'Carbohydrates, lipids, proteins, vitamins, minerals, water; food tests', weight: 2 },
          { id: 'ecology', title: 'Ecology', detail: 'Ecosystems, energy flow, nutrient cycles, niche, factors, population dynamics, pollution and conservation', weight: 3 },
          { id: 'habitat', title: 'Habitat study', detail: 'Mapping, collecting, identifying, quantitative surveys, abiotic measurement', weight: 2 }
        ]},
        { id: 'u2', title: 'Unit 2 — The cell', topics: [
          { id: 'cellstruct', title: 'Cell structure', detail: 'Microscope, organelles, prokaryotic vs eukaryotic, plant vs animal cells', weight: 2 },
          { id: 'membranes', title: 'Movement through membranes', detail: 'Diffusion, osmosis, turgor, active transport', weight: 2 },
          { id: 'enzymes', title: 'Enzymes', detail: 'Active site, factors affecting activity, denaturation, immobilised enzymes', weight: 3 },
          { id: 'photosynth', title: 'Photosynthesis', detail: 'Light and dark stages, factors, role of chlorophyll', weight: 3 },
          { id: 'respiration', title: 'Respiration', detail: 'Aerobic and anaerobic, stages, fermentation', weight: 3 },
          { id: 'celldiv', title: 'Cell division', detail: 'Cell cycle, mitosis, meiosis, cancer', weight: 2 },
          { id: 'dna', title: 'DNA, RNA & protein synthesis', detail: 'Structure, replication, transcription, translation, DNA profiling', weight: 3 },
          { id: 'genetics', title: 'Genetic inheritance', detail: 'Mendel’s laws, monohybrid and dihybrid crosses, sex linkage, non-nuclear inheritance', weight: 3 },
          { id: 'geneng', title: 'Genetic engineering & evolution', detail: 'Techniques and applications, natural selection, evidence for evolution', weight: 2 }
        ]},
        { id: 'u3', title: 'Unit 3 — The organism', topics: [
          { id: 'diversity', title: 'Diversity of organisms', detail: 'Monera, fungi, protista; Amoeba, Rhizopus, yeast, bacteria', weight: 2 },
          { id: 'plantstruct', title: 'Plant structure & tissues', detail: 'Dermal, ground and vascular tissue; root, stem, leaf', weight: 2 },
          { id: 'planttrans', title: 'Transport & nutrition in plants', detail: 'Water and mineral uptake, transpiration, cohesion-tension, food transport', weight: 2 },
          { id: 'plantresp', title: 'Plant responses', detail: 'Growth regulators, tropisms, adaptations for protection', weight: 2 },
          { id: 'plantrepro', title: 'Plant reproduction', detail: 'Flower structure, pollination, fertilisation, seed and fruit, dispersal, dormancy, germination', weight: 3 },
          { id: 'humannut', title: 'Human nutrition', detail: 'Digestive system, enzymes, absorption, balanced diet', weight: 2 },
          { id: 'breathing', title: 'The breathing system', detail: 'Structure, gas exchange, control of breathing, disorders', weight: 2 },
          { id: 'circulation', title: 'Circulation & blood', detail: 'Heart, blood vessels, cardiac cycle, blood composition, lymph', weight: 3 },
          { id: 'excretion', title: 'Excretion & osmoregulation', detail: 'Kidney and nephron, skin, homeostasis', weight: 2 },
          { id: 'nervous', title: 'Nervous system & the senses', detail: 'Neuron, reflex arc, brain, eye, ear', weight: 3 },
          { id: 'endocrine', title: 'Endocrine system', detail: 'Glands and hormones, feedback, diabetes', weight: 2 },
          { id: 'skeleton', title: 'Musculoskeletal system', detail: 'Bone, joints, muscles, antagonistic pairs', weight: 1 },
          { id: 'defence', title: 'Defence & the immune system', detail: 'Barriers, white cells, antibodies, immunity, viruses', weight: 2 },
          { id: 'humanrepro', title: 'Human reproduction', detail: 'Systems, menstrual cycle, fertilisation, pregnancy, birth, infertility and contraception', weight: 3 }
        ]},
        { id: 'exps', title: 'Mandatory experiments', paper: 'Section B', topics: [
          { id: 'foodtests', title: 'Food tests & enzymes', detail: 'Reducing sugar, starch, fat, protein; enzyme activity vs pH and temperature; denaturation; immobilised enzymes', weight: 3 },
          { id: 'cellexps', title: 'Cell experiments', detail: 'Microscope prep of plant and animal cells, osmosis, mitosis slides', weight: 2 },
          { id: 'photoexps', title: 'Photosynthesis & respiration', detail: 'Rate of photosynthesis vs light/CO₂, anaerobic respiration in yeast', weight: 3 },
          { id: 'dnaexp', title: 'DNA extraction', detail: 'Isolating DNA from plant tissue', weight: 2 },
          { id: 'ecoexps', title: 'Ecology fieldwork', detail: 'Habitat study, quantitative survey, abiotic factors', weight: 2 },
          { id: 'physioexps', title: 'Physiology experiments', detail: 'Effect of exercise on breathing/pulse, dissection of the heart, transpiration, germination', weight: 2 }
        ]}
      ]
    },

    /* -------------------------------------------------------------- Chemistry */
    'Chemistry': {
      source: 'Leaving Certificate Chemistry syllabus, with the 28 mandatory experiments',
      note: 'Questions on experiments carry heavy marks — know procedures, results and precautions, not just theory.',
      books: [
        { id: 'chemistry-live', title: 'Chemistry Live!', publisher: 'Folens' },
        { id: 'lc-chemistry-edco', title: 'Leaving Certificate Chemistry', publisher: 'Edco' },
        { id: 'lsms-chemistry', title: 'Less Stress More Success — Chemistry', publisher: 'Gill' }
      ],
      strands: [
        { id: 'atomic', title: 'Atomic structure & the periodic table', topics: [
          { id: 'atom', title: 'Atomic structure', detail: 'History of the atom, subatomic particles, isotopes, mass spectrometer, electron configuration, emission spectra', weight: 3 },
          { id: 'periodic', title: 'The periodic table & trends', detail: 'Atomic radius, ionisation energy, electronegativity, group properties', weight: 2 },
          { id: 'radio', title: 'Radioactivity', detail: 'Alpha, beta, gamma; half-life; uses', weight: 1 }
        ]},
        { id: 'bonding', title: 'Chemical bonding', topics: [
          { id: 'bonds', title: 'Ionic & covalent bonding', detail: 'Electronegativity, polarity, shapes of molecules, intermolecular forces', weight: 3 }
        ]},
        { id: 'quant', title: 'Quantitative chemistry', topics: [
          { id: 'moles', title: 'The mole, formulas & equations', detail: 'Relative masses, mole calculations, empirical formulas, balancing, gas laws', weight: 3 },
          { id: 'volumetric', title: 'Volumetric analysis', detail: 'Preparing standard solutions, acid–base and redox titrations, calculations', weight: 3 }
        ]},
        { id: 'physchem', title: 'Physical chemistry', topics: [
          { id: 'acids', title: 'Acids, bases & pH', detail: 'Theories of acids and bases, pH scale, indicators, salts', weight: 2 },
          { id: 'redox', title: 'Oxidation & reduction', detail: 'Oxidation numbers, electrochemical series, electrolysis, corrosion', weight: 2 },
          { id: 'rates', title: 'Rates of reaction', detail: 'Collision theory, factors affecting rate, catalysis', weight: 2 },
          { id: 'equilibrium', title: 'Chemical equilibrium', detail: 'Le Chatelier’s principle, equilibrium constant', weight: 2 },
          { id: 'thermo', title: 'Thermochemistry', detail: 'Heats of reaction, Hess’s law, bond energies, fuels', weight: 2 }
        ]},
        { id: 'organic', title: 'Organic chemistry', topics: [
          { id: 'hydrocarbons', title: 'Hydrocarbons', detail: 'Alkanes, alkenes, alkynes, aromatics; oil refining, octane number, fuels', weight: 3 },
          { id: 'functional', title: 'Functional groups', detail: 'Alcohols, aldehydes, ketones, carboxylic acids, esters — properties and preparation', weight: 3 },
          { id: 'mechanisms', title: 'Reaction types & mechanisms', detail: 'Substitution, addition, elimination, oxidation/reduction, polymerisation, organic synthesis', weight: 2 },
          { id: 'analysis', title: 'Chromatography & instrumentation', detail: 'Paper/TLC/GC, mass spectrometry, IR and UV spectroscopy', weight: 1 }
        ]},
        { id: 'env', title: 'Environmental chemistry & options', topics: [
          { id: 'water', title: 'Water chemistry', detail: 'Hardness, water treatment, dissolved oxygen, BOD, sewage treatment', weight: 2 },
          { id: 'opt1a', title: 'Option 1A — Additional industrial chemistry', detail: 'Case study of an industrial process', weight: 1 },
          { id: 'opt1b', title: 'Option 1B — Atmospheric chemistry', detail: 'Oxygen, nitrogen, ozone, acid rain, greenhouse effect', weight: 1 },
          { id: 'opt2a', title: 'Option 2A — Materials', detail: 'Crystals, addition polymers, metals', weight: 1 },
          { id: 'opt2b', title: 'Option 2B — Electrochemistry & extraction of metals', detail: 'Electrolysis applications, extraction and corrosion', weight: 1 }
        ]},
        { id: 'exps', title: 'Mandatory experiments', topics: [
          { id: 'titrations', title: 'Titration experiments', detail: 'HCl/NaOH, standardising HCl, ethanoic acid in vinegar, iron tablets, iodine/thiosulfate, water hardness, dissolved oxygen', weight: 3 },
          { id: 'organicexps', title: 'Organic preparations', detail: 'Ethene, ethyne, soap, ethanal → ethanoic acid, recrystallisation of benzoic acid, chromatography', weight: 3 },
          { id: 'physexps', title: 'Physical chemistry experiments', detail: 'Rates vs concentration and temperature, heat of reaction, flame tests, pH of solutions', weight: 2 }
        ]}
      ]
    },

    /* ---------------------------------------------------------------- Physics */
    'Physics': {
      source: 'Leaving Certificate Physics syllabus, with the 24 mandatory experiments',
      books: [
        { id: 'real-world-physics', title: 'Real World Physics', publisher: 'Folens' },
        { id: 'lc-physics-educate', title: 'Leaving Certificate Physics', publisher: 'Educate.ie' },
        { id: 'lsms-physics', title: 'Less Stress More Success — Physics', publisher: 'Gill' }
      ],
      strands: [
        { id: 'mechanics', title: 'Mechanics', topics: [
          { id: 'motion', title: 'Motion & vectors', detail: 'Equations of motion, graphs, vectors and scalars, resolution of vectors', weight: 2 },
          { id: 'forces', title: 'Forces, Newton’s laws & moments', detail: 'Friction, equilibrium, levers, centre of gravity', weight: 2 },
          { id: 'energy', title: 'Work, energy, power & momentum', detail: 'Conservation laws, collisions, efficiency', weight: 2 },
          { id: 'circular', title: 'Circular motion, gravitation & SHM', detail: 'Centripetal force, satellites, Kepler, Hooke’s law, pendulum', weight: 3 },
          { id: 'pressure', title: 'Density, pressure & gases', detail: 'Archimedes, atmospheric pressure, Boyle’s law', weight: 1 }
        ]},
        { id: 'heat', title: 'Heat & temperature', topics: [
          { id: 'heat', title: 'Temperature, heat capacity & latent heat', detail: 'Thermometers, specific heat capacity, latent heat, heat transfer', weight: 2 }
        ]},
        { id: 'waves', title: 'Waves, sound & light', topics: [
          { id: 'waves', title: 'Wave properties', detail: 'Reflection, refraction, diffraction, interference, Doppler effect', weight: 2 },
          { id: 'sound', title: 'Sound', detail: 'Characteristics, resonance, stationary waves, intensity and the decibel', weight: 2 },
          { id: 'mirrors', title: 'Reflection & mirrors', detail: 'Laws of reflection, concave and convex mirrors, mirror formula', weight: 2 },
          { id: 'lenses', title: 'Refraction & lenses', detail: 'Snell’s law, total internal reflection, lenses, the eye, optical fibres', weight: 3 },
          { id: 'wavelight', title: 'Wave nature of light', detail: 'Diffraction grating, polarisation, dispersion, spectra, the electromagnetic spectrum', weight: 2 }
        ]},
        { id: 'electricity', title: 'Electricity', topics: [
          { id: 'static', title: 'Static electricity & fields', detail: 'Coulomb’s law, electric field, potential, capacitance', weight: 2 },
          { id: 'current', title: 'Current, resistance & circuits', detail: 'Ohm’s law, resistivity, series and parallel, Wheatstone bridge, potential divider', weight: 3 },
          { id: 'effects', title: 'Effects of current & domestic electricity', detail: 'Heating, chemical and magnetic effects; fuses, earthing, RCDs, kWh', weight: 2 },
          { id: 'semi', title: 'Semiconductors', detail: 'p–n junction, diodes, rectification', weight: 1 }
        ]},
        { id: 'magnetism', title: 'Magnetism & electromagnetism', topics: [
          { id: 'magfields', title: 'Magnetic fields & forces', detail: 'Field around conductors, force on a current, moving charges', weight: 2 },
          { id: 'induction', title: 'Electromagnetic induction & AC', detail: 'Faraday and Lenz, generators, transformers, mutual and self inductance', weight: 3 }
        ]},
        { id: 'modern', title: 'Modern physics', topics: [
          { id: 'electron', title: 'The electron', detail: 'Cathode rays, thermionic emission, photoelectric effect, X-rays', weight: 2 },
          { id: 'nuclear', title: 'Radioactivity & nuclear energy', detail: 'Decay, half-life, fission and fusion, detectors', weight: 2 },
          { id: 'option', title: 'Option — particle physics or applied electricity', detail: 'Whichever your class covers', weight: 1 }
        ]},
        { id: 'exps', title: 'Mandatory experiments', topics: [
          { id: 'mechexps', title: 'Mechanics & heat experiments', detail: 'g by free fall, Newton’s second law, conservation of momentum, Boyle’s law, specific heat capacity, latent heat', weight: 3 },
          { id: 'waveexps', title: 'Waves & light experiments', detail: 'Speed of sound, wavelength with a grating, focal lengths, refractive index, resonance', weight: 3 },
          { id: 'elecexps', title: 'Electricity experiments', detail: 'Joule’s law, resistivity, I–V characteristics, variation of resistance with temperature', weight: 3 }
        ]}
      ]
    },

    /* ---------------------------------------------------------------- English */
    'English': {
      source: 'Leaving Certificate English syllabus — Paper 1 (Language) and Paper 2 (Literature)',
      note: 'Prescribed texts and poets change by year and by school. Add your own texts and poets as topics under the headings below.',
      books: [],
      strands: [
        { id: 'p1', title: 'Paper 1 — Comprehending & composing', paper: 'Paper 1', topics: [
          { id: 'comprehension', title: 'Comprehending — Question A', detail: 'Reading for meaning, style and language analysis, evaluating argument', weight: 3 },
          { id: 'qb', title: 'Functional writing — Question B', detail: 'Letter, speech, article, diary entry, report, proposal', weight: 2 },
          { id: 'composing', title: 'Composing', detail: 'Personal essay, short story, speech, article, descriptive and discursive essays', weight: 3 },
          { id: 'language', title: 'Language genres', detail: 'The five language types: information, argument, persuasion, narration, aesthetic', weight: 2 }
        ]},
        { id: 'p2single', title: 'Paper 2 — Single text', paper: 'Paper 2', topics: [
          { id: 'single', title: 'Single text — themes, characters & key scenes', detail: 'Add your text as its own topic and build a quote bank', weight: 3 }
        ]},
        { id: 'p2comp', title: 'Paper 2 — Comparative study', paper: 'Paper 2', topics: [
          { id: 'modes', title: 'Comparative modes', detail: 'Theme or issue; cultural context; general vision and viewpoint; literary genre — whichever two are set', weight: 3 },
          { id: 'comptexts', title: 'Comparative texts', detail: 'Add each of your three texts as a topic; know key moments for each mode', weight: 3 }
        ]},
        { id: 'p2poetry', title: 'Paper 2 — Poetry', paper: 'Paper 2', topics: [
          { id: 'prescribed', title: 'Prescribed poetry', detail: 'Add each poet you are preparing as a topic — themes, style, five poems each', weight: 3 },
          { id: 'unseen', title: 'Unseen poetry', detail: 'Reading an unfamiliar poem, personal response, imagery and tone', weight: 1 }
        ]}
      ]
    },

    /* ------------------------------------------------------------------ Irish */
    'Irish': {
      source: 'Siollabas Gaeilge na hArdteistiméireachta — Béaltriail (40%), Páipéar 1, Páipéar 2',
      note: 'Seiceáil na téacsanna ainmnithe le do mhúinteoir — the prescribed literature list below is the current one, but confirm it matches what your class is doing.',
      books: [
        { id: 'fiuntas-nua', title: 'Fiúntas Nua', publisher: 'CJ Fallon' },
        { id: 'spreagadh', title: 'Spreagadh' },
        { id: 'lsms-irish', title: 'Less Stress More Success — Irish', publisher: 'Gill' }
      ],
      strands: [
        { id: 'beal', title: 'Béaltriail — an scrúdú cainte (40%)', paper: 'Oral', topics: [
          { id: 'failtiu', title: 'Fáiltiú', detail: 'Beannú, eolas pearsanta, dáta breithe, seoladh, uimhir scrúdaithe', weight: 1 },
          { id: 'leamhfil', title: 'Léamh na filíochta', detail: 'Na cúig dhán ainmnithe a léamh go nádúrtha le foghraíocht cheart', weight: 2 },
          { id: 'sraith', title: 'Sraith pictiúr', detail: 'Na fiche sraith — cur síos agus na ceisteanna a leanann', weight: 3 },
          { id: 'comhra', title: 'Comhrá', detail: 'Mé féin, mo cheantar, an scoil, caitheamh aimsire, an todhchaí, fadhbanna sóisialta, nuacht', weight: 3 }
        ]},
        { id: 'p1', title: 'Páipéar 1 — Cluastuiscint & ceapadóireacht', paper: 'Paper 1', topics: [
          { id: 'cluas', title: 'Cluastuiscint', detail: 'Fógraí, comhráite, píosaí nuachta; stór focal na nuachta', weight: 2 },
          { id: 'aiste', title: 'Ceapadóireacht — aiste & alt', detail: 'An timpeallacht, an óige, teicneolaíocht, cúrsaí reatha; nathanna agus struchtúr', weight: 3 },
          { id: 'sceal', title: 'Ceapadóireacht — scéal, díospóireacht & óráid', detail: 'Struchtúr an scéil; teanga na díospóireachta', weight: 2 }
        ]},
        { id: 'p2', title: 'Páipéar 2 — Léamhthuiscint & litríocht', paper: 'Paper 2', topics: [
          { id: 'leamh', title: 'Léamhthuiscint', detail: 'Dhá phíosa; ceisteanna tuisceana agus ceist gramadaí', weight: 3 },
          { id: 'pros', title: 'Prós ainmnithe', detail: 'Hurlamaboc, An Gnáthrud, Dís, Oisín i dTír na nÓg, Cáca Milis (scannán)', weight: 3 },
          { id: 'filiocht', title: 'Filíocht ainmnithe', detail: 'Géibheann, Colscaradh, Mo Ghrá-sa (idir lúibíní), An tEarrach Thiar, An Spailpín Fánach', weight: 3 },
          { id: 'breise', title: 'Litríocht bhreise', detail: 'An Triail nó an téacs breise atá ag do rang; stair na Gaeilge', weight: 2, hl: true },
          { id: 'gramadach', title: 'Gramadach', detail: 'Na haimsirí, séimhiú agus urú, an tuiseal ginideach, an chopail, an aidiacht', weight: 2 }
        ]}
      ]
    },

    /* -------------------------------------------------------------- Geography */
    'Geography': {
      source: 'Leaving Certificate Geography syllabus — core units, one elective, one option (HL)',
      note: 'Switch off the elective and option your class is not doing.',
      books: [
        { id: 'horizons', title: 'Horizons', publisher: 'Edco' },
        { id: 'planet-people', title: 'Planet and People', publisher: 'Educate.ie' },
        { id: 'lsms-geog', title: 'Less Stress More Success — Geography', publisher: 'Gill' }
      ],
      strands: [
        { id: 'physical', title: 'Core Unit 1 — Patterns & processes in the physical environment', topics: [
          { id: 'tectonics', title: 'Plate tectonics', detail: 'Plate boundaries, earthquakes, volcanoes, fold mountains', weight: 3 },
          { id: 'rocks', title: 'Rocks & the rock cycle', detail: 'Igneous, sedimentary, metamorphic; Irish examples; human interaction', weight: 2 },
          { id: 'landforms', title: 'Landform development', detail: 'Rivers, the sea, glaciation, mass movement, weathering — processes and landforms', weight: 3 },
          { id: 'isostasy', title: 'Isostasy & sea-level change', detail: 'Adjustments in the landscape', weight: 1 }
        ]},
        { id: 'regional', title: 'Core Unit 2 — Regional geography', topics: [
          { id: 'concept', title: 'The concept of a region', detail: 'Climatic, physical, administrative, cultural, socio-economic, nodal regions', weight: 2 },
          { id: 'irish', title: 'Irish regions', detail: 'A core Irish region (Greater Dublin) and a peripheral one (the West); physical, economic and human processes', weight: 3 },
          { id: 'european', title: 'European regions', detail: 'A core European region (Paris Basin) and a peripheral one (Mezzogiorno)', weight: 3 },
          { id: 'continental', title: 'A continental or sub-continental region', detail: 'India or Brazil — physical, economic and human processes', weight: 2 },
          { id: 'boundaries', title: 'Changing boundaries & the EU', detail: 'Ireland and the EU, cultural regions and political boundaries', weight: 1 }
        ]},
        { id: 'investigation', title: 'Core Unit 3 — Geographical investigation', topics: [
          { id: 'report', title: 'Fieldwork investigation report', detail: 'Aims, planning, gathering, presenting, analysing, conclusions — 20% of the marks', weight: 3 }
        ]},
        { id: 'econ', title: 'Elective 4 — Patterns & processes in economic activities', topics: [
          { id: 'development', title: 'Economic development', detail: 'Measuring development, developed and developing economies, colonialism', weight: 2 },
          { id: 'globalisation', title: 'Globalisation & multinationals', detail: 'MNCs, trade, the changing nature of economic activity', weight: 2 },
          { id: 'eupolicy', title: 'The EU & Ireland’s economy', detail: 'EU policies, the CAP, Ireland’s economic development', weight: 2 },
          { id: 'envimpact', title: 'Environmental impact of economic activity', detail: 'Pollution, sustainability, conflicts between economic and environmental interests', weight: 2 }
        ]},
        { id: 'human', title: 'Elective 5 — Patterns & processes in the human environment', topics: [
          { id: 'population', title: 'Population dynamics', detail: 'Growth, distribution, demographic transition, Ireland’s population', weight: 2 },
          { id: 'migration', title: 'Migration', detail: 'Causes and effects, Irish and European examples, policy', weight: 2 },
          { id: 'settlement', title: 'Settlement & urban land use', detail: 'Rural settlement, site and function, urban land-use models', weight: 2 },
          { id: 'urban', title: 'Urban problems & planning', detail: 'Sprawl, traffic, inner-city decline and renewal, planning strategies', weight: 2 }
        ]},
        { id: 'options', title: 'Options (Higher Level — one only)', topics: [
          { id: 'interdependence', title: 'Option 6 — Global interdependence', detail: 'Models of development, aid, trade, sustainability', weight: 2, hl: true },
          { id: 'geoecology', title: 'Option 7 — Geoecology', detail: 'Soils, soil processes, biomes, human impact', weight: 2, hl: true },
          { id: 'culture', title: 'Option 8 — Culture & identity', detail: 'Race, ethnicity, language, religion, nationality and identity', weight: 2, hl: true },
          { id: 'atmosphere', title: 'Option 9 — Atmosphere–ocean environment', detail: 'Energy budget, circulation, weather systems, climate change', weight: 2, hl: true }
        ]}
      ]
    },

    /* ---------------------------------------------------------------- History */
    'History': {
      source: 'Leaving Certificate History (Later Modern) — Ireland and Europe & the wider world topics',
      note: 'Your class studies a few of these topics, not all of them. Switch off the ones you are not doing.',
      books: [
        { id: 'making-modern', title: 'The Making of Modern Ireland / Europe', publisher: 'Edco' },
        { id: 'modern-ireland-europe', title: 'Modern Ireland / Modern Europe and the Wider World', publisher: 'Gill' }
      ],
      strands: [
        { id: 'rsr', title: 'Research study report & documents question', topics: [
          { id: 'rsr', title: 'Research Study Report', detail: 'Outline plan, extended essay, review of sources — 20% of the marks', weight: 3 },
          { id: 'dbq', title: 'Documents-based question', detail: 'Comprehension, comparison, criticism and contextualisation of the set case study', weight: 3 }
        ]},
        { id: 'irl2', title: 'Ireland 2 — Movements for political & social reform, 1870–1914', topics: [
          { id: 'irl2a', title: 'Home Rule & the Land War', detail: 'Parnell, Davitt, the Land League, Gladstone; the elections of 1885 and 1886', weight: 3 },
          { id: 'irl2b', title: 'Cultural revival', detail: 'GAA to 1891, Gaelic League, Anglo-Irish literary revival', weight: 2 },
          { id: 'irl2c', title: 'Labour & suffrage', detail: 'Larkin, Connolly, the 1913 Strike and Lockout; the suffrage movement', weight: 2 }
        ]},
        { id: 'irl3', title: 'Ireland 3 — The pursuit of sovereignty & the impact of partition, 1912–49', topics: [
          { id: 'irl3a', title: '1912–1923', detail: 'Home Rule crisis, 1916, the War of Independence, the Treaty negotiations, the Civil War', weight: 3 },
          { id: 'irl3b', title: 'The Free State & de Valera’s Ireland', detail: 'Cumann na nGaedheal, Fianna Fáil, the 1937 constitution, the Eucharistic Congress 1932, the Emergency', weight: 3 },
          { id: 'irl3c', title: 'Northern Ireland to 1949', detail: 'Craig, Brooke, discrimination, Belfast during World War II', weight: 2 }
        ]},
        { id: 'irl5', title: 'Ireland 5 — Politics & society in Northern Ireland, 1949–93', topics: [
          { id: 'irl5a', title: 'O’Neill, civil rights & the outbreak of the Troubles', detail: 'The Coleraine University controversy, NICRA, Derry 1968–69', weight: 3 },
          { id: 'irl5b', title: 'The Troubles & the search for a settlement', detail: 'Sunningdale and the power-sharing executive 1973–74, hunger strikes, the Anglo-Irish Agreement, the Downing Street Declaration', weight: 3 },
          { id: 'irl5c', title: 'Society & culture', detail: 'The Apprentice Boys of Derry, religious affiliation, economy and society', weight: 2 }
        ]},
        { id: 'irl6', title: 'Ireland 6 — Government, economy & society in the Republic, 1949–89', topics: [
          { id: 'irl6a', title: 'Economy & politics', detail: 'The First Programme for Economic Expansion, Lemass, Whitaker, the EEC, coalition governments', weight: 3 },
          { id: 'irl6b', title: 'Society & culture', detail: 'The impact of RTÉ 1962–72, education, the church, the women’s movement', weight: 3 }
        ]},
        { id: 'eur3', title: 'Europe 3 — Dictatorship & democracy, 1920–45', topics: [
          { id: 'eur3a', title: 'Fascism & Nazism', detail: 'Mussolini, Hitler, the Nuremberg rallies, propaganda, the Holocaust', weight: 3 },
          { id: 'eur3b', title: 'Stalin’s Russia', detail: 'Collectivisation, the Show Trials, the cult of personality', weight: 3 },
          { id: 'eur3c', title: 'Democracy under strain', detail: 'Britain and France, the Jarrow March 1936, appeasement, the war and the home front', weight: 2 }
        ]},
        { id: 'eur4', title: 'Europe 4 — Division & realignment in Europe, 1945–92', topics: [
          { id: 'eur4a', title: 'The Cold War in Europe', detail: 'Berlin blockade, Hungary 1956, the Berlin Wall, détente, 1989', weight: 3 },
          { id: 'eur4b', title: 'Western Europe & integration', detail: 'Economic recovery, the Treaty of Rome, the welfare state', weight: 2 }
        ]},
        { id: 'eur6', title: 'Europe 6 — The United States & the world, 1945–89', topics: [
          { id: 'eur6a', title: 'US foreign policy', detail: 'Truman to Reagan, Korea, Cuba, Lyndon Johnson and Vietnam 1963–68, the end of the Cold War', weight: 3 },
          { id: 'eur6b', title: 'US society & culture', detail: 'The Montgomery bus boycott 1956, civil rights, the Moon landing 1969, the affluent society, mass media', weight: 3 }
        ]},
        { id: 'other', title: 'Other topics', topics: [
          { id: 'irl1', title: 'Ireland 1 — Ireland & the Union, 1815–70', detail: 'O’Connell, the Famine, Young Ireland, Fenians', weight: 2 },
          { id: 'irl4', title: 'Ireland 4 — The Irish diaspora, 1840–1966', detail: 'Emigration to Britain, the US and Australia', weight: 2 },
          { id: 'eur1', title: 'Europe 1 — Nationalism & state formation, 1815–71', detail: 'Italian and German unification', weight: 2 },
          { id: 'eur2', title: 'Europe 2 — Nation states & international tensions, 1871–1920', detail: 'Alliances, imperialism, World War I', weight: 2 },
          { id: 'eur5', title: 'Europe 5 — European retreat from empire, 1945–90', detail: 'Decolonisation in Africa and Asia', weight: 2 }
        ]}
      ]
    },

    /* --------------------------------------------------------------- Business */
    'Business': {
      source: 'Leaving Certificate Business syllabus — seven units',
      note: 'The Applied Business Question (ABQ) is worth 20%; practise applying theory to the case.',
      books: [
        { id: 'business-express', title: 'Business Express', publisher: 'Edco' },
        { id: 'inside-business', title: 'Inside Business', publisher: 'Folens' },
        { id: 'lsms-business', title: 'Less Stress More Success — Business', publisher: 'Gill' }
      ],
      strands: [
        { id: 'u1', title: 'Unit 1 — People in business', topics: [
          { id: 'stakeholders', title: 'Stakeholders & their relationships', detail: 'Co-operative and competitive relationships, contracts', weight: 2 },
          { id: 'consumer', title: 'Consumer law', detail: 'Sale of Goods and Supply of Services Act, Consumer Protection Act, CCPC, Ombudsman', weight: 3 },
          { id: 'industrial', title: 'Industrial relations & employment law', detail: 'Trade unions, types of disputes, WRC and Labour Court, Employment Equality and Unfair Dismissals Acts', weight: 3 }
        ]},
        { id: 'u2', title: 'Unit 2 — Enterprise', topics: [
          { id: 'enterprise', title: 'Entrepreneurs & enterprise skills', detail: 'Characteristics, skills, intrapreneurship, enterprise in the community', weight: 2 }
        ]},
        { id: 'u3', title: 'Unit 3 — Managing 1', topics: [
          { id: 'mgtskills', title: 'Management skills', detail: 'Leading, motivating (Maslow, McGregor), communicating; meetings and reports', weight: 3 },
          { id: 'mgtactivities', title: 'Management activities', detail: 'Planning, organising (structures), controlling (stock, credit, quality)', weight: 3 }
        ]},
        { id: 'u4', title: 'Unit 4 — Managing 2', topics: [
          { id: 'hrm', title: 'Human resource management', detail: 'Planning, recruitment, training, appraisal, rewards, employer–employee relations', weight: 2 },
          { id: 'change', title: 'Changing role of management', detail: 'Facilitator, empowerment, teamwork, TQM, technology', weight: 2 },
          { id: 'finance', title: 'Monitoring the business — finance', detail: 'Sources of finance, cash flow, ratio analysis, insurance, taxation', weight: 3 },
          { id: 'household', title: 'Household & business', detail: 'Comparing household and business management', weight: 1 }
        ]},
        { id: 'u5', title: 'Unit 5 — Business in action', topics: [
          { id: 'marketing', title: 'Identifying opportunities & marketing', detail: 'Market research, product development, the marketing mix', weight: 3 },
          { id: 'startup', title: 'Getting started', detail: 'Ownership structures, finance, production, the business plan', weight: 3 },
          { id: 'expansion', title: 'Expansion', detail: 'Organic and inorganic growth, implications of expansion', weight: 2 }
        ]},
        { id: 'u6', title: 'Unit 6 — Domestic environment', topics: [
          { id: 'industry', title: 'Categories of industry & types of organisation', detail: 'Primary, secondary, tertiary; sole trader, company, co-op, franchise, state bodies', weight: 2 },
          { id: 'community', title: 'Community development', detail: 'Local enterprise, LEOs, social enterprise', weight: 1 },
          { id: 'economy', title: 'Business & the economy', detail: 'Economic variables, the effect of business on the economy', weight: 2 },
          { id: 'government', title: 'Government & business', detail: 'Regulation, support, employment, tax, infrastructure', weight: 2 },
          { id: 'ethics', title: 'Business & society', detail: 'Ethics, social responsibility, environmental issues', weight: 2 }
        ]},
        { id: 'u7', title: 'Unit 7 — International environment', topics: [
          { id: 'eu', title: 'The European Union', detail: 'Institutions, decision making, policies, the euro', weight: 2 },
          { id: 'global', title: 'International trade & global business', detail: 'Exporting, MNCs, protectionism, WTO, global marketing', weight: 2 }
        ]}
      ]
    },

    /* ------------------------------------------------------------- Accounting */
    'Accounting': {
      source: 'Leaving Certificate Accounting syllabus — financial and management accounting',
      books: [
        { id: 'accounting-tyrrell', title: 'Accounting for Senior Cycle', publisher: 'Edco' },
        { id: 'lsms-accounting', title: 'Less Stress More Success — Accounting', publisher: 'Gill' }
      ],
      strands: [
        { id: 'final', title: 'Final accounts', topics: [
          { id: 'soletrader', title: 'Sole trader final accounts', detail: 'Trading, profit and loss, appropriation, balance sheet, adjustments', weight: 3 },
          { id: 'company', title: 'Company final accounts', detail: 'Share capital, debentures, taxation, dividends; published accounts', weight: 3 },
          { id: 'manufacturing', title: 'Manufacturing accounts', detail: 'Prime cost, factory overheads, cost of manufacture', weight: 2 },
          { id: 'club', title: 'Club accounts', detail: 'Receipts and payments, income and expenditure, accumulated fund', weight: 2 },
          { id: 'service', title: 'Service firm accounts', detail: 'Income and expenditure of a service business', weight: 2 },
          { id: 'farm', title: 'Farm accounts', detail: 'Enterprise analysis, drawings, stock valuation', weight: 1 }
        ]},
        { id: 'adjust', title: 'Adjustments & analysis', topics: [
          { id: 'incomplete', title: 'Incomplete records', detail: 'Statement of affairs, control accounts, margin and mark-up', weight: 2 },
          { id: 'depreciation', title: 'Depreciation & revaluation', detail: 'Methods, disposal, revaluation reserve', weight: 2 },
          { id: 'control', title: 'Control accounts', detail: 'Debtors and creditors control, reconciliation', weight: 2 },
          { id: 'errors', title: 'Correction of errors & suspense', detail: 'Journal entries, suspense account, revised balance sheet', weight: 2 },
          { id: 'tabular', title: 'Tabular statements', detail: 'Balance sheet in tabular form across a period', weight: 2 },
          { id: 'cashflow', title: 'Cash flow statements', detail: 'Operating, investing and financing activities', weight: 2 },
          { id: 'ratios', title: 'Interpretation of accounts', detail: 'Profitability, liquidity, gearing, investor ratios; commentary', weight: 3 },
          { id: 'theory', title: 'Accounting theory', detail: 'Concepts, principles, users, limitations', weight: 1 }
        ]},
        { id: 'mgmt', title: 'Management accounting', topics: [
          { id: 'costing', title: 'Costing & marginal costing', detail: 'Cost classification, overhead absorption, break-even, contribution', weight: 2 },
          { id: 'budgeting', title: 'Budgeting', detail: 'Cash budgets, production and materials budgets, flexible budgets, master budget', weight: 3 }
        ]}
      ]
    },

    /* ----------------------------------------------------------- Applied Maths */
    'Applied Maths': {
      source: 'Leaving Certificate Applied Mathematics specification (2021) — four strands',
      books: [],
      strands: [
        { id: 's1', title: 'Strand 1 — Mathematical modelling', topics: [
          { id: 'modelling', title: 'The modelling cycle', detail: 'Formulating, solving, interpreting and refining models', weight: 1 }
        ]},
        { id: 's2', title: 'Strand 2 — Modelling with networks & graphs', topics: [
          { id: 'graphs', title: 'Graph theory', detail: 'Terminology, Euler and Hamilton paths, planarity', weight: 2 },
          { id: 'algorithms', title: 'Network algorithms', detail: 'Kruskal and Prim spanning trees, Dijkstra shortest path, bin packing, scheduling and critical paths', weight: 3 }
        ]},
        { id: 's3', title: 'Strand 3 — Modelling the physical world', topics: [
          { id: 'kinematics', title: 'Kinematics', detail: 'Uniform acceleration, velocity–time graphs, relative velocity', weight: 3 },
          { id: 'projectiles', title: 'Projectiles', detail: 'On horizontal and inclined planes', weight: 3 },
          { id: 'dynamics', title: 'Newton’s laws & connected particles', detail: 'Friction, inclined planes, pulleys, wedges', weight: 3 },
          { id: 'collisions', title: 'Momentum & collisions', detail: 'Impulse, direct and oblique collisions, coefficient of restitution', weight: 2 },
          { id: 'circular', title: 'Circular motion & SHM', detail: 'Conical pendulum, banked tracks, simple harmonic motion', weight: 2 },
          { id: 'energy', title: 'Work, energy & power', detail: 'Conservation of energy, power of engines', weight: 2 }
        ]},
        { id: 's4', title: 'Strand 4 — Modelling a changing world', topics: [
          { id: 'difference', title: 'Difference equations', detail: 'Recurrence relations, first and second order', weight: 2 },
          { id: 'differential', title: 'Differential equations', detail: 'Separable equations, growth and decay, motion with resistance', weight: 3 }
        ]}
      ]
    },

    /* ---------------------------------------------------------- Home Economics */
    'Home Economics': {
      source: 'Leaving Certificate Home Economics (Scientific & Social) syllabus — core plus one elective',
      note: 'Switch off the two electives your class is not taking.',
      books: [],
      strands: [
        { id: 'food', title: 'Core — Food studies', topics: [
          { id: 'nutrients', title: 'Nutrients', detail: 'Protein, carbohydrates, lipids, vitamins, minerals, water — structure, properties, functions', weight: 3 },
          { id: 'diet', title: 'Diet & health', detail: 'Dietary guidelines, energy, special diets, diet-related disorders', weight: 3 },
          { id: 'commodities', title: 'Food commodities', detail: 'Meat, fish, eggs, dairy, cereals, fruit and vegetables', weight: 2 },
          { id: 'foodprep', title: 'Food preparation & processing', detail: 'Cooking methods, food safety, additives, labelling', weight: 2 },
          { id: 'micro', title: 'Microbiology & food spoilage', detail: 'Bacteria, yeasts, moulds, preservation methods', weight: 2 },
          { id: 'practical', title: 'Food studies practical journal', detail: 'The assignment write-ups — 20% of the marks', weight: 3 }
        ]},
        { id: 'resource', title: 'Core — Resource management & consumer studies', topics: [
          { id: 'family', title: 'Family resource management', detail: 'Management systems, household finance, budgeting', weight: 2 },
          { id: 'housing', title: 'Housing', detail: 'Housing provision, design, services, technology', weight: 2 },
          { id: 'consumer', title: 'Consumer studies', detail: 'Consumer rights, protection, responsibility, decision making', weight: 2 },
          { id: 'textiles', title: 'Textiles', detail: 'Fibres, fabrics, care and labelling', weight: 1 }
        ]},
        { id: 'social', title: 'Core — Social studies', topics: [
          { id: 'familysoc', title: 'The family in society', detail: 'Family structures, functions, marriage, family law', weight: 2 }
        ]},
        { id: 'electives', title: 'Electives (one only)', topics: [
          { id: 'homedesign', title: 'Elective 1 — Home design & management', detail: 'Housing styles, planning, interior design, energy efficiency', weight: 2 },
          { id: 'textileselect', title: 'Elective 2 — Textiles, fashion & design', detail: 'Fashion, design principles, the textile industry', weight: 2 },
          { id: 'socialelect', title: 'Elective 3 — Social studies', detail: 'Education, work, leisure, poverty and unemployment', weight: 2 }
        ]}
      ]
    },

    /* ------------------------------------------------------------- Languages */
    'French': languageSyllabus('French', [
      { id: 'tout-va-bien', title: 'Tout va bien!', publisher: 'Folens' },
      { id: 'lsms-french', title: 'Less Stress More Success — French', publisher: 'Gill' }
    ]),
    'German': languageSyllabus('German', [
      { id: 'lsms-german', title: 'Less Stress More Success — German', publisher: 'Gill' }
    ]),
    'Spanish': languageSyllabus('Spanish', [
      { id: 'lsms-spanish', title: 'Less Stress More Success — Spanish', publisher: 'Gill' }
    ]),
    'Italian': languageSyllabus('Italian', [])
  }
};

/* The modern languages share one exam shape; only the book list differs. */
function languageSyllabus(name, books) {
  return {
    source: 'Leaving Certificate ' + name + ' syllabus — oral, listening, reading and writing',
    note: 'The oral is worth 25% at both levels. Build a topic bank for the conversation and revise it aloud.',
    books: books,
    strands: [
      { id: 'oral', title: 'Oral examination', paper: 'Oral', topics: [
        { id: 'conversation', title: 'General conversation', detail: 'Yourself, family, school, hobbies, your area, plans, opinions on current issues', weight: 3 },
        { id: 'document', title: 'Document, picture or role-play', detail: 'Whichever your level and language set: prepared document, picture story or role-play', weight: 2 }
      ]},
      { id: 'listening', title: 'Listening comprehension', paper: 'Aural', topics: [
        { id: 'aural', title: 'Aural comprehension', detail: 'Past papers, news items, dialogues; numbers, dates, weather, directions', weight: 3 }
      ]},
      { id: 'reading', title: 'Reading comprehension', paper: 'Written', topics: [
        { id: 'journalistic', title: 'Journalistic texts', detail: 'Newspaper and magazine articles; answering in the target language and in English', weight: 3 },
        { id: 'literary', title: 'Literary texts', detail: 'Extracts from novels and stories; character, mood, inference', weight: 2 }
      ]},
      { id: 'writing', title: 'Written production', paper: 'Written', topics: [
        { id: 'opinion', title: 'Opinion piece & discursive writing', detail: 'Structuring an argument, connectors, formal register', weight: 3 },
        { id: 'diary', title: 'Diary entry & informal message', detail: 'Reacting to a situation, feelings, past and future tenses', weight: 2 },
        { id: 'formal', title: 'Formal letter or email', detail: 'Layout, formal phrases, complaints, applications', weight: 2 }
      ]},
      { id: 'language', title: 'Vocabulary & grammar', topics: [
        { id: 'themes', title: 'Vocabulary by theme', detail: 'Family, school, work, health, environment, technology, travel, current affairs', weight: 2 },
        { id: 'tenses', title: 'Tenses', detail: 'Present, past, future, conditional; subjunctive at Higher Level', weight: 3 },
        { id: 'grammar', title: 'Grammar essentials', detail: 'Agreement, pronouns, prepositions, negatives, question forms', weight: 2 }
      ]}
    ]
  };
}
