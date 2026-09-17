/* Leaving Certificate syllabus catalogue.
 *
 * One entry per subject, structured strand → topic at the size of a single study
 * block. Topics carry an exam weight (1 light … 3 heavily examined) that the
 * planner uses when deciding what to suggest, and `hl: true` marks material that
 * is Higher Level only.
 *
 * Headings follow the NCCA/SEC specifications. Textbooks listed are the ones in
 * common use. Where a book's chapter list has been verified against the edition
 * (see Text & Tests 4 and 5 under Mathematics) its chapters are included and map
 * onto topics; otherwise chapter numbers are left for the student to type in from
 * their own copy, since editions differ. Subjects without an entry get a blank
 * syllabus the student can fill in themselves. */
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
        /* Chapter titles from the 2nd edition (2016); the book's section headings are not
           reproduced, so chapters map straight onto syllabus topics. Book 1 is Paper 1
           (strands 3–5), Book 2 is Paper 2 (strands 1–2). */
        { id: 'active-maths-4', title: 'Active Maths 4, 2nd edition (Books 1 & 2, Higher Level)', short: 'Active Maths 4',
          publisher: 'Folens',
          volumes: ['Book 1 — Paper 1 (Strands 3–5)', 'Book 2 — Paper 2 (Strands 1–2)'],
          chapters: [
            { vol: 0, n: 1,  ref: 'Bk 1 ch. 1',  title: 'Algebra I', topics: ['algebra.expressions', 'algebra.equations'] },
            { vol: 0, n: 2,  ref: 'Bk 1 ch. 2',  title: 'Algebra II', topics: ['algebra.cubics', 'algebra.inequalities'] },
            { vol: 0, n: 3,  ref: 'Bk 1 ch. 3',  title: 'Algebra III', topics: ['algebra.binomial'] },
            { vol: 0, n: 4,  ref: 'Bk 1 ch. 4',  title: 'Length, Area and Volume', topics: ['number.measure'] },
            { vol: 0, n: 5,  ref: 'Bk 1 ch. 5',  title: 'Real Numbers', topics: ['number.numsys'] },
            { vol: 0, n: 6,  ref: 'Bk 1 ch. 6',  title: 'Functions', topics: ['functions.functions', 'functions.graphs'] },
            { vol: 0, n: 7,  ref: 'Bk 1 ch. 7',  title: 'Indices and Logarithms', topics: ['number.numsys', 'algebra.expolog'] },
            { vol: 0, n: 8,  ref: 'Bk 1 ch. 8',  title: 'Number Patterns, Sequence and Series', topics: ['number.sequences'] },
            { vol: 0, n: 9,  ref: 'Bk 1 ch. 9',  title: 'Arithmetic', topics: ['number.arith'] },
            { vol: 0, n: 10, ref: 'Bk 1 ch. 10', title: 'Financial Mathematics', topics: ['number.financial'] },
            { vol: 0, n: 11, ref: 'Bk 1 ch. 11', title: 'Proof By Induction', topics: ['number.induction'] },
            { vol: 0, n: 12, ref: 'Bk 1 ch. 12', title: 'Complex Numbers', topics: ['number.complex', 'number.demoivre'] },
            { vol: 0, n: 13, ref: 'Bk 1 ch. 13', title: 'Differential Calculus I', topics: ['functions.diff'] },
            { vol: 0, n: 14, ref: 'Bk 1 ch. 14', title: 'Differential Calculus II', topics: ['functions.diffapps'] },
            { vol: 0, n: 15, ref: 'Bk 1 ch. 15', title: 'Integral Calculus', topics: ['functions.integ'] },
            { vol: 1, n: 1,  ref: 'Bk 2 ch. 1',  title: 'Statistics I', topics: ['stats.data'] },
            { vol: 1, n: 2,  ref: 'Bk 2 ch. 2',  title: 'Probability I', topics: ['stats.counting', 'stats.prob'] },
            { vol: 1, n: 3,  ref: 'Bk 2 ch. 3',  title: 'Probability II', topics: ['stats.dists'] },
            { vol: 1, n: 4,  ref: 'Bk 2 ch. 4',  title: 'Statistics II', topics: ['stats.summary'] },
            { vol: 1, n: 5,  ref: 'Bk 2 ch. 5',  title: 'Statistics III', topics: ['stats.inference'] },
            { vol: 1, n: 6,  ref: 'Bk 2 ch. 6',  title: 'Geometry I', topics: ['geom.synthetic'] },
            { vol: 1, n: 7,  ref: 'Bk 2 ch. 7',  title: 'Trigonometry', topics: ['geom.trigbasic', 'geom.trigfunc', 'geom.trig3d'] },
            { vol: 1, n: 8,  ref: 'Bk 2 ch. 8',  title: 'Co-ordinate Geometry (The Line)', topics: ['geom.coordline'] },
            { vol: 1, n: 9,  ref: 'Bk 2 ch. 9',  title: 'Co-ordinate Geometry (The Circle)', topics: ['geom.coordcircle'] },
            { vol: 1, n: 10, ref: 'Bk 2 ch. 10', title: 'Geometry II', topics: ['geom.proofs'] },
            { vol: 1, n: 11, ref: 'Bk 2 ch. 11', title: 'Constructions', topics: ['geom.synthetic'] },
            { vol: 1, n: 12, ref: 'Bk 2 ch. 12', title: 'Enlargements', topics: ['geom.transform'] }
          ] },
        /* Chapter numbers and titles are from the 2018 editions (Morris, Cooke & O'Regan;
           Celtic Press, now CJ Fallon). The two volumes replaced the old Text & Tests
           4/5/6/7. "covers" describes what each chapter maps to in the syllabus above;
           the book's own numbered section headings are not reproduced here. */
        { id: 'text-tests-4-5', title: 'Text & Tests 4 and 5 (Higher Level)', short: 'Text & Tests',
          publisher: 'Celtic Press / CJ Fallon',
          volumes: ['Text & Tests 4 — Fifth Year', 'Text & Tests 5 — Sixth Year'],
          chapters: [
            { vol: 0, n: 1,  ref: 'Bk 4 ch. 1',  title: 'Algebra 1',
              covers: 'Polynomial expressions and factorising; algebraic fractions; linear, quadratic and cubic equations; simultaneous equations; the factor theorem and identities',
              topics: ['algebra.expressions', 'algebra.equations', 'algebra.cubics'] },
            { vol: 0, n: 2,  ref: 'Bk 4 ch. 2',  title: 'Algebra 2',
              covers: 'Indices, surds and logarithms; linear, quadratic, rational and modulus inequalities; exponential and log equations',
              topics: ['number.numsys', 'algebra.inequalities', 'algebra.expolog'] },
            { vol: 0, n: 3,  ref: 'Bk 4 ch. 3',  title: 'Trigonometry 1',
              covers: 'Trig ratios; the sine and cosine rules; area of a triangle; bearings and problems in three dimensions',
              topics: ['geom.trigbasic', 'geom.trig3d'] },
            { vol: 0, n: 4,  ref: 'Bk 4 ch. 4',  title: 'Co-ordinate Geometry (The Line)',
              covers: 'Slope and equation of a line; intersection; perpendicular distance; area of a triangle; dividing a segment in a ratio',
              topics: ['geom.coordline'] },
            { vol: 0, n: 5,  ref: 'Bk 4 ch. 5',  title: 'Probability 1',
              covers: 'Counting and arrangements; the rules of probability; conditional probability and independence; tree diagrams',
              topics: ['stats.counting', 'stats.prob'] },
            { vol: 0, n: 6,  ref: 'Bk 4 ch. 6',  title: 'Geometry 1',
              covers: 'Theorems and corollaries; the proofs of theorems 11, 12 and 13; geometric reasoning',
              topics: ['geom.synthetic', 'geom.proofs'] },
            { vol: 0, n: 7,  ref: 'Bk 4 ch. 7',  title: 'Differential Calculus',
              covers: 'Differentiation from first principles; power, chain, product and quotient rules; trig, exponential and log functions; second derivatives',
              topics: ['functions.diff'] },
            { vol: 0, n: 8,  ref: 'Bk 4 ch. 8',  title: 'Trigonometry 2',
              covers: 'The unit circle and radians; trig functions and their graphs; identities; solving trig equations',
              topics: ['geom.trigfunc'] },
            { vol: 0, n: 9,  ref: 'Bk 4 ch. 9',  title: 'Sequence, Series and Patterns',
              covers: 'Arithmetic and geometric sequences and series; sum to infinity; patterns; proof by induction',
              topics: ['number.sequences', 'number.induction'] },
            { vol: 0, n: 10, ref: 'Bk 4 ch. 10', title: 'Statistics 1',
              covers: 'Types of data and sampling; representing data; mean, median, mode and standard deviation; scatter graphs',
              topics: ['stats.data', 'stats.summary'] },
            { vol: 0, n: 11, ref: 'Bk 4 ch. 11', title: 'Co-ordinate Geometry (The Circle)',
              covers: 'Equation of a circle; tangents; intersection of a line and a circle',
              topics: ['geom.coordcircle'] },
            { vol: 0, n: 12, ref: 'Bk 4 ch. 12', title: 'Algebra 3',
              covers: 'The binomial theorem; further equations, identities and proof',
              topics: ['algebra.binomial'] },

            { vol: 1, n: 1,  ref: 'Bk 5 ch. 1',  title: 'Complex Numbers',
              covers: 'The Argand diagram, modulus and conjugate; quadratic roots; polar form; De Moivre’s theorem and roots of complex numbers',
              topics: ['number.complex', 'number.demoivre'] },
            { vol: 1, n: 2,  ref: 'Bk 5 ch. 2',  title: 'Enlargements and Constructions',
              covers: 'Enlargements and scale factors; transformations; the constructions',
              topics: ['geom.transform', 'geom.synthetic'] },
            { vol: 1, n: 3,  ref: 'Bk 5 ch. 3',  title: 'Integration',
              covers: 'Indefinite and definite integrals of polynomials, exponentials and trig functions; area under a curve; average value',
              topics: ['functions.integ'] },
            { vol: 1, n: 4,  ref: 'Bk 5 ch. 4',  title: 'Applications of Differential Calculus',
              covers: 'Tangents and normals; maxima and minima; rates of change; curve sketching',
              topics: ['functions.diffapps'] },
            { vol: 1, n: 5,  ref: 'Bk 5 ch. 5',  title: 'Financial Maths',
              covers: 'Compound interest and depreciation; present value; loans, annuities and amortisation; percentages and tax',
              topics: ['number.financial', 'number.arith'] },
            { vol: 1, n: 6,  ref: 'Bk 5 ch. 6',  title: 'Length, Area, Volume',
              covers: 'Perimeter and area; the trapezoidal rule; nets; volumes of prisms, cylinders, cones and spheres',
              topics: ['number.measure'] },
            { vol: 1, n: 7,  ref: 'Bk 5 ch. 7',  title: 'Probability 2',
              covers: 'Bernoulli trials and the binomial distribution; expected value; introducing the normal distribution',
              topics: ['stats.dists'] },
            { vol: 1, n: 8,  ref: 'Bk 5 ch. 8',  title: 'Functions and Graphs',
              covers: 'Domain and range; inverse and composite functions; injective, surjective and bijective; graphing and transformations',
              topics: ['functions.functions', 'functions.graphs'] },
            { vol: 1, n: 9,  ref: 'Bk 5 ch. 9',  title: 'Statistics 2',
              covers: 'The normal distribution and z-scores; sampling; correlation and the line of best fit',
              topics: ['stats.dists', 'stats.inference'] },
            { vol: 1, n: 10, ref: 'Bk 5 ch. 10', title: 'Inferential Statistics',
              covers: 'Margin of error; confidence intervals; hypothesis testing and p-values',
              topics: ['stats.inference'] }
          ] },
        { id: 'text-tests-3', title: 'Text & Tests 3 (Ordinary Level)', short: 'Text & Tests 3', publisher: 'Celtic Press / CJ Fallon' },
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
    /* ---------------------------------------------------------------- Biology */
    'Biology': {
      source: 'Leaving Certificate Biology specification (2025) — first examined 2027. Unifying strand plus three contextual strands; section numbers are the specification’s own',
      note: 'Written exam 60%, Biology in Practice Investigation 40% (common brief, externally assessed). Higher Level extras are marked HL.',
      books: [
        { id: 'biology-plus-2025', title: 'Biology Plus (2025 specification)', short: 'Biology Plus', publisher: 'Edco', sectioned: false,
          chapters: [
            { n: 1,  ref: 'ch. 1',  title: 'Scientific Knowledge', topics: ['u.nature'] },
            { n: 2,  ref: 'ch. 2',  title: 'Investigating in Science', topics: ['u.investigating'] },
            { n: 3,  ref: 'ch. 3',  title: 'Science in Society', topics: ['u.society'] },
            { n: 4,  ref: 'ch. 4',  title: 'Biological Reasoning', topics: ['u.investigating'] },
            { n: 5,  ref: 'ch. 5',  title: 'The Characteristics of Life', topics: ['s1.char'] },
            { n: 6,  ref: 'ch. 6',  title: 'Viruses, Classification and the Domains of Life', topics: ['s1.classify'] },
            { n: 7,  ref: 'ch. 7',  title: 'The Unit of Life: The Cell', topics: ['s1.cells'] },
            { n: 8,  ref: 'ch. 8',  title: 'Biomolecules: The Chemicals of Life', topics: ['s1.biomol'] },
            { n: 9,  ref: 'ch. 9',  title: 'Transfer Molecules', topics: ['s1.biomol'] },
            { n: 10, ref: 'ch. 10', title: 'DNA, RNA and the Genetic Code', topics: ['s1.dna'] },
            { n: 11, ref: 'ch. 11', title: 'Genetic Inheritance', topics: ['s1.inherit'] },
            { n: 12, ref: 'ch. 12', title: 'Evolution: The Origins of Life', topics: ['s1.evolution'] },
            { n: 13, ref: 'ch. 13', title: 'Enzymes', topics: ['s2.enzymes'] },
            { n: 14, ref: 'ch. 14', title: 'Photosynthesis', topics: ['s2.photo'] },
            { n: 15, ref: 'ch. 15', title: 'Respiration', topics: ['s2.resp'] },
            { n: 16, ref: 'ch. 16', title: 'Cell Division and Cancer', topics: ['s2.celldiv'] },
            { n: 17, ref: 'ch. 17', title: 'DNA Replication, Protein Synthesis and Mutations', topics: ['s2.protein'] },
            { n: 18, ref: 'ch. 18', title: 'The Musculoskeletal System', topics: ['s2.musculo'] },
            { n: 19, ref: 'ch. 19', title: 'The Nervous System', topics: ['s2.nervous'] },
            { n: 20, ref: 'ch. 20', title: 'The Endocrine System', topics: ['s2.endocrine'] },
            { n: 21, ref: 'ch. 21', title: 'Homeostasis', topics: ['s2.endocrine'] },
            { n: 22, ref: 'ch. 22', title: 'Immunity', topics: ['s2.immune'] },
            { n: 23, ref: 'ch. 23', title: 'Human Reproduction', topics: ['s2.humanrepro'] },
            { n: 24, ref: 'ch. 24', title: 'Plant Reproduction', topics: ['s2.plantrepro'] },
            { n: 25, ref: 'ch. 25', title: 'Transport Across Membranes', topics: ['s2.membranes'] },
            { n: 26, ref: 'ch. 26', title: 'The Urinary System', topics: ['s2.urinary'] },
            { n: 27, ref: 'ch. 27', title: 'The Digestive System', topics: ['s2.digestive'] },
            { n: 28, ref: 'ch. 28', title: 'The Breathing System', topics: ['s2.breathing'] },
            { n: 29, ref: 'ch. 29', title: 'The Circulatory System and Blood', topics: ['s2.circulation'] },
            { n: 30, ref: 'ch. 30', title: 'Transport in Plants', topics: ['s2.planttransport'] },
            { n: 31, ref: 'ch. 31', title: 'Ecology, Ecosystems and Biodiversity', topics: ['s3.ecology'] },
            { n: 32, ref: 'ch. 32', title: 'Investigating an Ecosystem', topics: ['s3.fieldwork'] },
            { n: 33, ref: 'ch. 33', title: 'Microorganisms', topics: ['s3.micro'] },
            { n: 34, ref: 'ch. 34', title: 'Nutrient Cycling', topics: ['s3.cycling'] },
            { n: 35, ref: 'ch. 35', title: 'Genetic Engineering', topics: ['s3.geneng'] }
          ] },
        { id: 'evolution-biology', title: 'Evolution: Leaving Certificate Biology (2025 specification)', short: 'Evolution' },
        { id: 'lsms-biology', title: 'Less Stress More Success — Biology', publisher: 'Gill' }
      ],
      strands: [
        { id: 'u', title: 'Unifying strand — Nature of Science', topics: [
          { id: 'nature', title: 'The nature of scientific knowledge', detail: 'How scientific ideas are built, tested and revised; models and their limits', weight: 2 },
          { id: 'investigating', title: 'Investigating in science', detail: 'Designing investigations, variables, primary and secondary data, analysis, error and reliability', weight: 3 },
          { id: 'society', title: 'Science in society', detail: 'Evidence, ethics and communication; biology in health, sustainability and technology', weight: 2 },
          { id: 'aac', title: 'Biology in Practice Investigation (40%)', detail: 'The externally assessed investigation from the common brief — planning, data, analysis and report', weight: 3 }
        ]},
        { id: 's1', title: 'Strand 1 — Organisation of Life', topics: [
          { id: 'char', title: '1.1 Characteristics of life & viruses', detail: 'Characteristics of living things; virus structure, the case for living or non-living, economic and medical importance', weight: 2 },
          { id: 'classify', title: '1.1 Classification & the domains of life', detail: 'Archaea, bacteria, eukaryota; the kingdoms; prokaryotic vs eukaryotic; classification as an evolving system', weight: 2 },
          { id: 'biomol', title: '1.2 Chemicals of life — biomolecules', detail: 'Carbohydrates, lipids, proteins, nucleic acids and their metabolic roles; nutritional sources; food tests', weight: 3 },
          { id: 'cells', title: '1.3 Unit of life — cells', detail: 'Organisation from cell to organism; organelles and their functions; light and electron microscope images', weight: 3 },
          { id: 'dna', title: '1.4 DNA, RNA & the genetic code', detail: 'Chromosome structure, coding and non-coding DNA, nuclear vs non-nuclear inheritance', weight: 3 },
          { id: 'inherit', title: '1.4 Genetic inheritance', detail: 'Mendel’s laws, crosses, sex linkage, using models to predict inheritance', weight: 3 },
          { id: 'evolution', title: '1.5 Origins of life — evolution', detail: 'Natural vs artificial selection, mutations, evidence for evolution, common ancestry', weight: 2 }
        ]},
        { id: 's2', title: 'Strand 2 — Structures and Processes of Life', topics: [
          { id: 'enzymes', title: '2.1 Enzymes', detail: 'Selective catalysts, 3D structure and specificity, factors affecting activity, immobilised enzymes', weight: 3 },
          { id: 'photo', title: '2.2 Photosynthesis', detail: 'Anabolic process, light-dependent and light-independent stages, photosynthesis as a carbon sink', weight: 3 },
          { id: 'resp', title: '2.2 Respiration', detail: 'Aerobic and anaerobic respiration, stages, carbon release, fermentation', weight: 3 },
          { id: 'celldiv', title: '2.3 Cell division & cancer', detail: 'The cell cycle, mitosis, meiosis, haploid and diploid, cancer', weight: 2 },
          { id: 'protein', title: '2.3 DNA replication, protein synthesis & mutations', detail: 'Replication, transcription, translation, mutations', weight: 3 },
          { id: 'nervous', title: '2.4 Response — the nervous system', detail: 'Neurons, neurotransmitters, reflex arc, brain, sense organs', weight: 3 },
          { id: 'endocrine', title: '2.4 Response — hormones & homeostasis', detail: 'Endocrine glands, hormone action, feedback, homeostasis', weight: 2 },
          { id: 'musculo', title: '2.4 Response — the musculoskeletal system', detail: 'Bone, joints, muscle, movement', weight: 1 },
          { id: 'immune', title: '2.4 Response — the immune system', detail: 'Defence, white cells, antibodies, immunity and vaccination', weight: 2 },
          { id: 'plantresp', title: '2.4 Response in plants', detail: 'Anatomical and chemical adaptations, growth regulators', weight: 1 },
          { id: 'humanrepro', title: '2.5 Human reproduction', detail: 'Male and female systems, gamete production, the menstrual cycle, fertilisation, pregnancy and birth', weight: 3 },
          { id: 'plantrepro', title: '2.5 Plant reproduction', detail: 'Flower structure, pollination, fertilisation, seed, dispersal, germination', weight: 2 },
          { id: 'membranes', title: '2.6 Transport across membranes', detail: 'Diffusion, osmosis and active transport; factors affecting osmosis', weight: 2 },
          { id: 'urinary', title: '2.6 The urinary system', detail: 'Kidney, nephron, excretion and osmoregulation', weight: 2 },
          { id: 'digestive', title: '2.6 The digestive system', detail: 'Digestion, absorption, the role of enzymes', weight: 2 },
          { id: 'breathing', title: '2.6 The breathing system', detail: 'Gas exchange, control of breathing', weight: 2 },
          { id: 'circulation', title: '2.6 Circulation & blood', detail: 'Heart, vessels, blood composition, blood groups and Rhesus factors', weight: 3 },
          { id: 'planttransport', title: '2.6 Transport in plants', detail: 'Water and mineral uptake, transpiration, food transport', weight: 2 }
        ]},
        { id: 's3', title: 'Strand 3 — Interactions of Life', topics: [
          { id: 'ecology', title: '3.1 Ecology, ecosystems & biodiversity', detail: 'Ecosystems, energy flow, biodiversity loss and its impacts, species diversity index', weight: 3 },
          { id: 'fieldwork', title: '3.1 Investigating an ecosystem', detail: 'Local ecosystem study — sampling, quantitative surveys, abiotic factors, reporting', weight: 2 },
          { id: 'micro', title: '3.2 Microorganisms', detail: 'Bacteria and Rhizopus; autotrophic, heterotrophic, saprophytic and parasitic nutrition', weight: 2 },
          { id: 'cycling', title: '3.2 Nutrient cycling', detail: 'Carbon and nitrogen cycles and the organisms that drive them', weight: 2 },
          { id: 'geneng', title: '3.3 Genetic engineering', detail: 'Isolation, cutting, ligation, transformation and expression; applications and biotechnology', weight: 2 }
        ]}
      ]
    },

    /* -------------------------------------------------------------- Chemistry */
    'Chemistry': {
      source: 'Leaving Certificate Chemistry specification (2025) — first examined 2027. Unifying strand plus four contextual strands; section numbers are the specification’s own',
      note: 'Written exam 60%, Chemistry in Practice Investigation 40% (common brief, externally assessed).',
      books: [
        { id: 'chemistry-live-3', title: 'Chemistry Live! 3rd edition (2025)', short: 'Chemistry Live!', publisher: 'Folens', sectioned: true,
          volumes: ['Textbook', 'Assessment and Exam Guide'],
          chapters: [
            { vol: 0, n: 1,  ref: 'ch. 1',  title: 'The Nature of Science', covers: 'How scientists work; how scientific ideas are modified over time; science as a global enterprise; models in chemistry; chemistry in society', topics: ['u.nature', 'u.society'] },
            { vol: 0, n: 2,  ref: 'ch. 2',  title: 'Atomic Structure: The Nuclear Model', covers: 'Development of the nuclear model; the plum pudding model (Thomson); the nuclear model (Rutherford); discovery of the proton and neutron; properties of the proton, neutron and electron', topics: ['s1.atomic'] },
            { vol: 0, n: 3,  ref: 'ch. 3',  title: 'Atomic Structure: The Bohr and Orbital Models', covers: 'Bohr’s study of spectra; the Bohr model; energy sublevels; developments leading to changes in Bohr’s model; the orbital model', topics: ['s1.atomic'] },
            { vol: 0, n: 4,  ref: 'ch. 4',  title: 'The Periodic Table: Arrangement of Electrons', covers: 'The elements; development of the modern periodic table; atomic and mass numbers; relative atomic mass and isotopes; electron configurations of atoms and ions; orbitals of equal energy', topics: ['s1.periodic', 's1.atomic'] },
            { vol: 0, n: 5,  ref: 'ch. 5',  title: 'Chemical Bonding and Structure', covers: 'The octet rule; ionic bonding; formulas of ionic compounds; d-block and transition elements; covalent bonding; shapes of covalent molecules; tests for anions', topics: ['s2.bonding'] },
            { vol: 0, n: 6,  ref: 'ch. 6',  title: 'Electronegativity and the Continuum of Chemical Bonding', covers: 'Electronegativity; the continuum of chemical bonding; intermolecular forces; physical properties of ionic and covalent compounds', topics: ['s2.bonding', 's2.imf'] },
            { vol: 0, n: 7,  ref: 'ch. 7',  title: 'Families and Trends in the Periodic Table', covers: 'Trends in atomic radii, ionisation energy and electronegativity; Groups 1, 2, 17 and 18', topics: ['s1.periodic'] },
            { vol: 0, n: 8,  ref: 'ch. 8',  title: 'The Mole: The Chemist’s Counting Unit', covers: 'Converting moles to grams and grams to moles; calculations with the Avogadro constant', topics: ['s1.mole'] },
            { vol: 0, n: 9,  ref: 'ch. 9',  title: 'Kinetic Theory of Matter and Behaviour of Gases', covers: 'The kinetic theory of matter and evidence for it; volume, pressure and temperature of gases; kinetic theory applied to gases; the ideal gas equation', topics: ['s1.matter', 's2.gases'] },
            { vol: 0, n: 10, ref: 'ch. 10', title: 'Law of Conservation of Mass: Introducing Stoichiometry', covers: 'Conservation of mass; physical and chemical changes; balancing equations; the mole in balanced equations; percentage composition; empirical formulas; masses and gas volumes from equations', topics: ['s1.mole'] },
            { vol: 0, n: 11, ref: 'ch. 11', title: 'Acids and Bases', covers: 'Arrhenius and Brønsted–Lowry theories; conjugate acid–base pairs; neutralisation; reactions of acids with carbonates and metals', topics: ['s3.acids'] },
            { vol: 0, n: 12, ref: 'ch. 12', title: 'Volumetric Analysis: Acid–Base', covers: 'Concentrations of solutions (percentage, ppm, molarity); converting units; dilution; standard solutions; apparatus and titration procedure; calculating unknown concentrations', topics: ['s4.volumetric'] },
            { vol: 0, n: 13, ref: 'ch. 13', title: 'Acid–Base Volumetric Exam-Style Questions', covers: 'Key formulas; solving exam-style problems; accuracy and precision', topics: ['s4.volumetric'] },
            { vol: 0, n: 14, ref: 'ch. 14', title: 'Oxidation and Reduction', covers: 'Electron transfer; oxidation numbers; balancing redox equations', topics: ['s3.electrochem'] },
            { vol: 0, n: 15, ref: 'ch. 15', title: 'Volumetric Analysis: Oxidation–Reduction', covers: 'Potassium permanganate as oxidising agent; MnO₄⁻ and Fe²⁺; redox volumetric problems; iodine and sodium thiosulfate', topics: ['s4.volumetric', 's3.electrochem'] },
            { vol: 0, n: 16, ref: 'ch. 16', title: 'Oxidation–Reduction Volumetric Exam-Style Questions', covers: 'Key formulas; exam-style problems; random and systematic errors in practical work', topics: ['s4.volumetric'] },
            { vol: 0, n: 17, ref: 'ch. 17', title: 'Rates of Reaction', covers: 'Reaction rate; measuring rates; factors affecting rates; collision theory and activation energy', topics: ['s3.rates'] },
            { vol: 0, n: 18, ref: 'ch. 18', title: 'Chemical Equilibrium', covers: 'What equilibrium is; Le Chatelier’s Principle and optimising yield; the equilibrium constant and its calculations', topics: ['s3.equilibrium'] },
            { vol: 0, n: 19, ref: 'ch. 19', title: 'pH and Indicators', covers: 'Self-ionisation of water; the pH scale; strengths of acids and bases; pH of strong and weak acids and bases; acid–base indicators', topics: ['s3.acids'] },
            { vol: 0, n: 20, ref: 'ch. 20', title: 'Environmental Chemistry', covers: 'Water as a finite resource; water contamination and treatment; the carbon cycle; the natural and enhanced greenhouse effect; greenhouse gases; climate change and sustainability; solutions', topics: ['s4.environment'] },
            { vol: 0, n: 21, ref: 'ch. 21', title: 'Thermochemistry', covers: 'Enthalpy change; heat of combustion; bond enthalpy; enthalpy of neutralisation and formation; Hess’s Law; ΔH trends for hydrocarbons and alcohols', topics: ['s3.thermo'] },
            { vol: 0, n: 22, ref: 'ch. 22', title: 'Electrochemistry', covers: 'Galvanic cells; the electrochemical series; primary and secondary cells; fuel cells; electrolytic cells', topics: ['s3.electrochem'] },
            { vol: 1, n: 23, ref: 'Exam Guide ch. 23', title: 'Allotropes of Carbon. Hydrocarbons', covers: 'Allotropes; introducing organic chemistry; alkanes, alkenes, cis-trans isomerism, alkynes, aromatic hydrocarbons; shapes and properties; uses of hydrocarbons', topics: ['s2.hydrocarbons'] },
            { vol: 1, n: 24, ref: 'Exam Guide ch. 24', title: 'More Families of Organic Compounds', covers: 'Chloroalkanes and alcohols; aldehydes, ketones, carboxylic acids and esters; structural isomerism; pharmaceuticals; polymers', topics: ['s4.organic'] },
            { vol: 1, n: 25, ref: 'Exam Guide ch. 25', title: 'Reactions of Organic Compounds', covers: 'Substitution, addition, elimination, redox and acid–base reactions of organic compounds; reaction schemes', topics: ['s4.organic'] },
            { vol: 1, n: 26, ref: 'Exam Guide ch. 26', title: 'Stoichiometry: Limiting Reactants and Percentage Yield', covers: 'The limiting reactant; calculating percentage yield', topics: ['s1.mole'] }
          ] },
        { id: 'lsms-chemistry', title: 'Less Stress More Success — Chemistry', publisher: 'Gill' }
      ],
      strands: [
        { id: 'u', title: 'Unifying strand — The Nature of Science', topics: [
          { id: 'nature', title: 'How scientific ideas develop', detail: 'Models, their assumptions and limits; how ideas are revised over time', weight: 2 },
          { id: 'investigating', title: 'Investigating in chemistry', detail: 'Planning, variables, measurement, uncertainty, analysing and communicating data', weight: 3 },
          { id: 'society', title: 'Chemistry in society', detail: 'Ethics, sustainability and the role of chemistry in the wider world', weight: 2 },
          { id: 'aac', title: 'Chemistry in Practice Investigation (40%)', detail: 'The externally assessed research investigation from the common brief', weight: 3 }
        ]},
        { id: 's1', title: 'Strand 1 — Nature of Matter', topics: [
          { id: 'matter', title: '1.1 Matter', detail: 'Kinetic theory; pure substances and mixtures; changes of state and the limits of the model', weight: 2 },
          { id: 'atomic', title: '1.2 Atomic structure', detail: 'Nuclear, Bohr and orbital models; proton, neutron and electron; electron configuration; spectra', weight: 3 },
          { id: 'periodic', title: '1.3 The periodic table', detail: 'Mendeleev and the modern table; trends in radius, ionisation energy and electronegativity; Groups 1, 2, 17 and 18', weight: 2 },
          { id: 'mole', title: '1.4 Quantifying matter', detail: 'The mole; relating particles, mass, volume and moles; formulas, equations and stoichiometry', weight: 3 }
        ]},
        { id: 's2', title: 'Strand 2 — Behaviour of Matter', topics: [
          { id: 'bonding', title: '2.1 Chemical bonding', detail: 'The ionic–polar–covalent continuum; electronegativity and bond type; properties of compounds', weight: 3 },
          { id: 'imf', title: '2.2 Intermolecular forces & molecular shapes', detail: 'Van der Waals forces, dipole–dipole and hydrogen bonding; shapes of molecules', weight: 2 },
          { id: 'gases', title: '2.3 Behaviour of gases', detail: 'Pressure, volume and temperature relationships; the ideal gas model', weight: 2 },
          { id: 'hydrocarbons', title: '2.4 Hydrocarbons', detail: 'Alkanes, alkenes, alkynes and aromatics; sources, uses and impact', weight: 3 }
        ]},
        { id: 's3', title: 'Strand 3 — Interactions of Matter', topics: [
          { id: 'thermo', title: '3.1 Thermochemistry', detail: 'Enthalpy change, bond making and breaking, Hess’s law, heats of reaction', weight: 2 },
          { id: 'rates', title: '3.2 Rates of reaction', detail: 'Collision theory; concentration, surface area, temperature, catalysts and pressure', weight: 2 },
          { id: 'equilibrium', title: '3.3 Chemical equilibrium', detail: 'Dynamic equilibrium, Le Chatelier’s principle, the equilibrium constant', weight: 2 },
          { id: 'acids', title: '3.4 Acid–base systems', detail: 'Everyday acids and bases, indicators, neutralisation, pH and strength', weight: 3 },
          { id: 'electrochem', title: '3.5 Electrochemistry', detail: 'Oxidation and reduction, oxidation numbers, corrosion, cells and electrolysis', weight: 2 }
        ]},
        { id: 's4', title: 'Strand 4 — Matter in our World', topics: [
          { id: 'volumetric', title: '4.1 Volumetric analysis', detail: 'Standard solutions, acid–base and redox titrations, calculations, accuracy and error', weight: 3 },
          { id: 'organic', title: '4.2 Reactivity of organic compounds', detail: 'Alcohols, aldehydes, ketones, carboxylic acids, esters; reaction types; fuels, pharmaceuticals, plastics', weight: 3 },
          { id: 'environment', title: '4.3 Our chemical environment', detail: 'The carbon cycle, greenhouse gases and climate change, water quality and treatment, sustainability', weight: 2 }
        ]}
      ]
    },

    /* ---------------------------------------------------------------- Physics */
    'Physics': {
      source: 'Leaving Certificate Physics specification (2025) — first examined 2027. Unifying strand plus four contextual strands; section numbers are the specification’s own',
      note: 'Written exam 60%, Physics in Practice Investigation 40% (common brief, externally assessed).',
      books: [
        { id: 'real-world-physics-2', title: 'Real World Physics 2nd edition (2025)', short: 'Real World Physics', publisher: 'Folens', sectioned: true,
          chapters: [
            { n: 1,  ref: 'ch. 1',  title: 'The Nature of Science', covers: 'The nature of scientific knowledge; measurement and units; error in measurements; basic and derived units; scientific notation; unit analysis', topics: ['u.nature', 'u.investigating'] },
            { n: 2,  ref: 'ch. 2',  title: 'Reflection of Light', covers: 'The nature of light; vision; types of reflection; laws of reflection; the plane mirror image; uses of mirrors', topics: ['s2.interaction'] },
            { n: 3,  ref: 'ch. 3',  title: 'Refraction of Light', covers: 'Refraction; laws of refraction and refractive index; refractive index and relative speeds; critical angle and total internal reflection; applications', topics: ['s2.interaction'] },
            { n: 4,  ref: 'ch. 4',  title: 'Lenses', covers: 'Converging and diverging lenses; image formation; lens formulas; uses of lenses; models in physics', topics: ['s2.interaction'] },
            { n: 5,  ref: 'ch. 5',  title: 'Speed, Displacement and Velocity', covers: 'Time; distance; speed; displacement; velocity; measuring velocity in the laboratory; displacement–time graphs', topics: ['s1.motion'] },
            { n: 6,  ref: 'ch. 6',  title: 'Acceleration', covers: 'Acceleration; constant acceleration; velocity–time graphs; measuring acceleration; acceleration due to gravity', topics: ['s1.motion'] },
            { n: 7,  ref: 'ch. 7',  title: 'Vectors and Scalars', covers: 'Physical quantities; vectors in two dimensions; resolving a vector into perpendicular components', topics: ['s1.motion', 's1.forces'] },
            { n: 8,  ref: 'ch. 8',  title: 'Force, Mass and Momentum', covers: 'Force; mass; the newton; weight and mass; momentum and Newton’s laws; projectiles; conservation of momentum; collisions in two dimensions', topics: ['s1.forces'] },
            { n: 9,  ref: 'ch. 9',  title: 'Density, Pressure and Gravity', covers: 'Density; pressure; pressure in liquids; buoyancy; pressure in gases and atmospheric pressure; gravity; gravity and weight; gravitational fields; escape velocity', topics: ['s1.gravity', 's1.forces'] },
            { n: 10, ref: 'ch. 10', title: 'Work, Energy and Power', covers: 'Work; energy; conservation of energy; kinetic and potential energy; renewable and non-renewable sources; power; efficiency', topics: ['s1.energy'] },
            { n: 11, ref: 'ch. 11', title: 'Circular Motion', covers: 'A particle moving in a circle; centripetal force; circular satellite orbits; near-Earth and geostationary orbits', topics: ['s1.circular'] },
            { n: 12, ref: 'ch. 12', title: 'Elasticity and Hooke’s Law', covers: 'Elasticity; Hooke’s law; work done in stretching or compressing; energy changes in an oscillating body', topics: ['s1.hooke'] },
            { n: 13, ref: 'ch. 13', title: 'Temperature and Thermometers', covers: 'Concept of temperature; thermometric properties', topics: ['s2.heat'] },
            { n: 14, ref: 'ch. 14', title: 'Heat Transfer and Temperature Change', covers: 'States of matter; heat capacity; specific heat capacity; latent heat; specific latent heat; the heat pump; heat transfer', topics: ['s2.heat'] },
            { n: 15, ref: 'ch. 15', title: 'Waves and Wave Motion', covers: 'Travelling waves; waves as energy transfer; transverse and longitudinal waves; v = fλ; wave behaviour; stationary waves; the Doppler effect', topics: ['s2.waves', 's2.superposition', 's2.effects'] },
            { n: 16, ref: 'ch. 16', title: 'Vibrations and Sound', covers: 'Sources of sound; sound as a mechanical wave; how vibration produces sound; speed of sound; characteristics of sound; audibility and ultrasound; resonance; standing waves on a string; the sonometer', topics: ['s2.sound', 's2.superposition'] },
            { n: 17, ref: 'ch. 17', title: 'The Wave Nature of Light', covers: 'Wave nature of light; wavelength and colour; diffraction grating; polarisation; dispersion; the electromagnetic spectrum; solar irradiance', topics: ['s2.em'] },
            { n: 18, ref: 'ch. 18', title: 'Static Electricity', covers: 'Charging by friction and induction; atomic nature of charge; conductors and insulators; the gold leaf electroscope; distribution of charge; force between charges; electric fields and field strength', topics: ['s3.charge', 's3.fields'] },
            { n: 19, ref: 'ch. 19', title: 'Potential Difference', covers: 'Potential difference; relationship between potential difference and field strength', topics: ['s3.fields'] },
            { n: 20, ref: 'ch. 20', title: 'Current and Charge', covers: 'Three effects of current; electric charge; size of a current; conventional current; DC and AC; series and parallel circuits', topics: ['s3.circuits'] },
            { n: 21, ref: 'ch. 21', title: 'Potential Difference and Electromotive Force', covers: 'Energy changes in a circuit; potential difference between two points; rate of heat production; voltages in series and parallel; emf', topics: ['s3.circuits'] },
            { n: 22, ref: 'ch. 22', title: 'Resistance', covers: 'Resistance and measuring it; circuit diagrams and symbols; Ohm’s law; resistors in series and parallel; resistance and temperature; resistivity; the potential divider', topics: ['s3.circuits'] },
            { n: 23, ref: 'ch. 23', title: 'Heating Effect of an Electric Current', covers: 'The heating effect; heat and the current–voltage relationship; high voltage transmission; domestic circuits', topics: ['s3.circuits'] },
            { n: 24, ref: 'ch. 24', title: 'Semiconductors', covers: 'Semiconductors and conduction; the p-n junction; the LED; the transistor and the transistor as a switch; real-world applications', topics: ['s3.circuits'] },
            { n: 25, ref: 'ch. 25', title: 'Magnets and Magnetic Fields', covers: 'Properties of magnets; magnetic fields; magnetic effect of a current; fields due to a loop, a coil and a solenoid; uses of permanent and temporary magnets', topics: ['s3.magnets'] },
            { n: 26, ref: 'ch. 26', title: 'Current in a Magnetic Field', covers: 'Force on a current-carrying conductor; magnetic flux density; force on a coil; force on a moving charge; force between two conductors', topics: ['s3.motor'] },
            { n: 27, ref: 'ch. 27', title: 'Electromagnetic Induction', covers: 'The generator effect; magnetic flux; Faraday’s and Lenz’s laws; generators; alternating current; mutual inductance; transformers; generating electricity', topics: ['s3.induction'] },
            { n: 28, ref: 'ch. 28', title: 'The Electron', covers: 'Properties of the electron; thermionic emission; the cathode ray tube; deflection in electric and magnetic fields; the photoelectric effect and photocell; the particle model of light; Einstein’s photoelectric law; applications; X-rays', topics: ['s4.electron', 's4.photoelectric'] },
            { n: 29, ref: 'ch. 29', title: 'The Atom, the Nucleus and Radioactivity', covers: 'Atoms; emission spectra; the Bohr model; spectroscopy; structure of the nucleus; radioactivity; α, β and γ radiation; the law of radioactive decay; detecting radiation; safety', topics: ['s4.atom', 's4.radioactivity'] },
            { n: 30, ref: 'ch. 30', title: 'Fission, Fusion and Nuclear Energy', covers: 'Nuclear fission; the atomic bomb; nuclear reactors; nuclear fusion; mass–energy equivalence; mass defect, binding energy and stability', topics: ['s4.massenergy', 's4.nuclear'] },
            { n: 31, ref: 'ch. 31', title: 'Particle Physics', covers: 'Conservation of energy and momentum in nuclear reactions; splitting the nucleus; antiparticles; accelerators; the fundamental forces; leptons and hadrons; the standard model', topics: ['s4.massenergy'] }
          ] },
        { id: 'the-physics-book', title: 'The Physics Book (2025 specification)', short: 'The Physics Book', publisher: 'CJ Fallon' },
        { id: 'lsms-physics', title: 'Less Stress More Success — Physics', publisher: 'Gill' }
      ],
      strands: [
        { id: 'u', title: 'Unifying strand — The Nature of Science', topics: [
          { id: 'nature', title: 'The nature of scientific knowledge', detail: 'Models, evidence and how ideas change; units, measurement and error', weight: 2 },
          { id: 'investigating', title: 'Investigating in physics', detail: 'Designing experiments, graphs, uncertainty, analysing and communicating data', weight: 3 },
          { id: 'aac', title: 'Physics in Practice Investigation (40%)', detail: 'The externally assessed investigation from the common brief', weight: 3 }
        ]},
        { id: 's1', title: 'Strand 1 — Forces and Motion: Kinematics and Dynamics', topics: [
          { id: 'motion', title: '1.1 Particle motion in a straight line', detail: 'Displacement, velocity, acceleration; equations of motion; motion graphs', weight: 3 },
          { id: 'forces', title: '1.2 Forces acting on a particle', detail: 'Newton’s laws; mass and centre of mass; types of force; resultant force; momentum', weight: 3 },
          { id: 'hooke', title: '1.3 Stretching & compressing objects', detail: 'Hooke’s law, elastic potential energy', weight: 1 },
          { id: 'energy', title: '1.4 A work–energy model', detail: 'Work, kinetic and potential energy, conservation of energy, power', weight: 2 },
          { id: 'gravity', title: '1.5 Forces in a gravitational field', detail: 'Models for g; Newton’s law of gravitation as an inverse-square law; weight', weight: 2 },
          { id: 'circular', title: '1.6 Uniform circular motion', detail: 'Centripetal force; gravity as the centripetal force for planets; satellite orbits', weight: 2 }
        ]},
        { id: 's2', title: 'Strand 2 — Wave Motion and Energy Transfer', topics: [
          { id: 'heat', title: '2.1 Heat energy & temperature change', detail: 'Temperature, thermometric properties, Kelvin and Celsius, heat capacity, latent heat', weight: 2 },
          { id: 'waves', title: '2.2 Travelling waves', detail: 'Energy transfer without matter; mechanical and electromagnetic, transverse and longitudinal waves; wave terms', weight: 2 },
          { id: 'interaction', title: '2.3 Waves interacting with their environment', detail: 'Ray diagrams, reflection, refraction and refractive index, critical angle and total internal reflection, lenses', weight: 3 },
          { id: 'em', title: '2.4 Electromagnetic energy', detail: 'The electromagnetic spectrum, ionising radiation, dispersion, irradiance', weight: 2 },
          { id: 'sound', title: '2.5 Sound energy', detail: 'Sound needs a medium; characteristics of sound; ultrasound', weight: 2 },
          { id: 'superposition', title: '2.6 Superposition of waves', detail: 'Stationary waves, nodes and antinodes, harmonics, interference', weight: 2 },
          { id: 'effects', title: '2.7 Wave effects', detail: 'The Doppler effect and its applications', weight: 1 }
        ]},
        { id: 's3', title: 'Strand 3 — Electric and Magnetic Fields and their Interactions', topics: [
          { id: 'charge', title: '3.1 Charge interactions', detail: 'Charging by friction and induction, conductors and insulators, grounding', weight: 2 },
          { id: 'fields', title: '3.2 Modelling electric fields', detail: 'Coulomb’s law, electric potential, field strength, the vector nature of fields', weight: 2 },
          { id: 'circuits', title: '3.3 Electric circuits', detail: 'Current, potential difference and emf; Ohm’s law; series and parallel; resistivity; heating effect; mains safety; semiconductors', weight: 3 },
          { id: 'magnets', title: '3.4 Magnetic fields', detail: 'Fields around magnets and currents; force on a moving charge; ferrous cores', weight: 2 },
          { id: 'motor', title: '3.5 Force on a current-carrying conductor', detail: 'The motor effect, Fleming’s rule, the DC motor', weight: 2 },
          { id: 'induction', title: '3.6 Induced potential difference & the generator effect', detail: 'Magnetic flux, Faraday’s and Lenz’s laws, generators, transformers, mutual inductance', weight: 3 }
        ]},
        { id: 's4', title: 'Strand 4 — Modern Physics: Atomic and Nuclear', topics: [
          { id: 'electron', title: '4.1 The electron', detail: 'The electron as the unit of charge; cathode rays; deflection in fields', weight: 2 },
          { id: 'photoelectric', title: '4.2 Photoelectric emission & X-ray production', detail: 'The photoelectric effect, the particle model of light, X-rays', weight: 2 },
          { id: 'atom', title: '4.3 Early models of the atom', detail: 'Thomson, Rutherford and Bohr; energy levels and quantum leaps', weight: 2 },
          { id: 'radioactivity', title: '4.4 Radioactivity', detail: 'Detecting ionising radiation; isotopes and stability; α, β, γ; decay and half-life', weight: 2 },
          { id: 'massenergy', title: '4.5 Mass–energy equivalence', detail: 'Splitting the nucleus, accelerators, the standard model, matter and antimatter', weight: 2 },
          { id: 'nuclear', title: '4.6 Harnessing nuclear energy', detail: 'Chain reactions, fission and fusion, reactors, annihilation', weight: 2 }
        ]}
      ]
    },

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
    /* ------------------------------------------------------------------ Irish */
    'Irish': {
      source: 'Siollabas Gaeilge na hArdteistiméireachta — Béaltriail (40%), Páipéar 1, Páipéar 2. Litríocht ainmnithe: the list prescribed for the 2027 examination onwards',
      note: 'The prescribed prose and poetry changed for the 2027 exam — the list below is the new one. Confirm your class’s choices with your teacher.',
      books: [
        { id: 'fiuntas-nua', title: 'Fiúntas Nua (Ardleibhéal, 2025 — Prós agus Filíocht Nua)', short: 'Fiúntas Nua', publisher: 'Edco' },
        { id: 'fuinneamh-nua', title: 'Fuinneamh Nua (Gnáthleibhéal, 2025 — Prós agus Filíocht Nua)', short: 'Fuinneamh Nua', publisher: 'Edco' },
        { id: 'bua-na-teanga', title: 'Bua na Teanga (Béaltriail)', short: 'Bua na Teanga' },
        { id: 'lsms-irish', title: 'Less Stress More Success — Irish', publisher: 'Gill' }
      ],
      strands: [
        { id: 'beal', title: 'Béaltriail — an scrúdú cainte (40%)', paper: 'Oral', topics: [
          { id: 'failtiu', title: 'Fáiltiú', detail: 'Beannú, eolas pearsanta, dáta breithe, seoladh, uimhir scrúdaithe', weight: 1 },
          { id: 'leamhfil', title: 'Léamh na filíochta', detail: 'Na dánta ainmnithe a léamh go nádúrtha le foghraíocht cheart', weight: 2 },
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
          { id: 'pros', title: 'Prós ainmnithe (comónta)', detail: 'Clann Lir · Athair · Glantóir · An Bóthar go Santiago · Cuairteoir · An tIriseoir · Eoinín na nÉan (gearrscannán) · An Féileacán agus an Crann Úll', weight: 3 },
          { id: 'filiocht', title: 'Filíocht ainmnithe (comónta)', detail: 'Dínit an Bhróin · Deireadh na Feide · Iníon · Glaoch Abhaile · Úirchill an Chreagáin', weight: 3 },
          { id: 'filiochtard', title: 'Filíocht ardleibhéil', detail: 'Trén bhFearann Breac · Eanáir 1991 · Ag Tiomáint Siar · Dijeridiú · Anthony Daly', weight: 3, hl: true },
          { id: 'breise', title: 'Litríocht bhreise & stair na Gaeilge', detail: 'An téacs breise atá ag do rang; stair na Gaeilge', weight: 2, hl: true },
          { id: 'gramadach', title: 'Gramadach', detail: 'Na haimsirí, séimhiú agus urú, an tuiseal ginideach, an chopail, an aidiacht', weight: 2 }
        ]}
      ]
    },

    'Geography': {
      source: 'Leaving Certificate Geography syllabus — core units, one elective, one option (HL)',
      note: 'Switch off the elective and option your class is not doing.',
      books: [
        { id: 'horizons', title: 'Horizons', publisher: 'Edco' },
        { id: 'landscapes', title: 'Landscapes — Core Units with Human or Economic elective', short: 'Landscapes', publisher: 'Gill' },
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
        { id: 'making-of-europe', title: 'The Making of Europe and the Wider World', short: 'Making of Europe', publisher: 'Edco' },
        { id: 'us-and-the-world', title: 'The United States and the World (Europe topic 6)', short: 'US and the World', publisher: 'Edco' },
        { id: 'modern-ireland-europe', title: 'Modern Ireland / Modern Europe and the Wider World', publisher: 'Gill' },
        { id: 'edco-case-studies', title: 'Edco Leaving Cert History Case Studies', short: 'Case Studies', publisher: 'Edco' }
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
    /* --------------------------------------------------------------- Business */
    'Business': {
      source: 'Leaving Certificate Business specification (2025) — first examined 2027. Unifying strand Investigating Business plus four strands; section numbers are the specification’s own',
      note: 'Written exam 60%, Business Alive Investigative Study 40% (common brief, externally assessed).',
      books: [
        { id: 'lets-do-business', title: 'Let’s Do Business (2025 specification)', short: 'Let’s Do Business', publisher: 'Edco',
          chapters: [
            { n: 1,  ref: 'ch. 1',  title: 'The Unifying Strand', covers: 'Developing questions to research, managing information, project planning, analysing and evaluating information, presenting findings, acknowledging sources', topics: ['u.research', 'u.aac'] },
            { n: 2,  ref: 'ch. 2',  title: 'Stakeholders', covers: 'Stakeholder mapping', topics: ['s1.stakeholders'] },
            { n: 3,  ref: 'ch. 3',  title: 'Forms of Business', covers: 'Types of enterprise including not-for-profit; their contribution locally and nationally', topics: ['s1.forms'] },
            { n: 4,  ref: 'ch. 4',  title: 'Business Regulation', covers: 'Regulation and governance; ESG reports', topics: ['s1.forms'] },
            { n: 5,  ref: 'ch. 5',  title: 'Economic Indicators', covers: 'Value of the business economy in Ireland; consumer confidence', topics: ['s1.economy'] },
            { n: 6,  ref: 'ch. 6',  title: 'National Policy', covers: 'Government policy and its impact on sectors', topics: ['s1.policy'] },
            { n: 7,  ref: 'ch. 7',  title: 'European Union', covers: 'EU regulations and directives', topics: ['s1.policy'] },
            { n: 8,  ref: 'ch. 8',  title: 'International Business', covers: 'Trade, trading blocs, international business', topics: ['s1.global'] },
            { n: 9,  ref: 'ch. 9',  title: 'Internationalisation and Globalisation', covers: 'Globalisation, FDI and the role of technology', topics: ['s1.global'] },
            { n: 10, ref: 'ch. 10', title: 'Enterprise', covers: 'Enterprise in its broadest sense; role of government', topics: ['s2.enterprise'] },
            { n: 11, ref: 'ch. 11', title: 'Idea Development', covers: 'Design thinking', topics: ['s2.ideas'] },
            { n: 12, ref: 'ch. 12', title: 'Business Planning', covers: 'Business models; the Business Model Canvas', topics: ['s2.planning'] },
            { n: 13, ref: 'ch. 13', title: 'Market Research and Market Analysis', covers: 'Power–interest grid; STEEPLE analysis', topics: ['s2.market'] },
            { n: 14, ref: 'ch. 14', title: 'Marketing Mix', covers: 'The 7Ps; USP analysis; developing and evaluating a marketing mix', topics: ['s2.market'] },
            { n: 15, ref: 'ch. 15', title: 'Operations and Finance', covers: 'Operational model — key partnerships, activities and resources', topics: ['s2.operations'] },
            { n: 16, ref: 'ch. 16', title: 'Growth, Development and Expansion', covers: 'Porter’s Five Forces; cost–benefit analysis', topics: ['s2.growth'] },
            { n: 17, ref: 'ch. 17', title: 'Managing Risk', covers: 'Risk management', topics: ['s2.risk'] },
            { n: 18, ref: 'ch. 18', title: 'Leading and Managing an Organisation', covers: 'Organisational culture; workplace conflict and its management', topics: ['s3.organisation'] },
            { n: 19, ref: 'ch. 19', title: 'Leading and Managing People', covers: 'Ethics in recruitment; digital technology and recruitment; appraisal', topics: ['s3.people'] },
            { n: 20, ref: 'ch. 20', title: 'Human Capital Management', covers: 'The organisational environment; sustainable workplaces; digital technology; remote working; corporate wellness', topics: ['s3.people'] },
            { n: 21, ref: 'ch. 21', title: 'The Importance of Communication', covers: 'Communication in business', topics: ['s3.communication'] },
            { n: 22, ref: 'ch. 22', title: 'The Rationale for Planning', covers: 'Resistance to change and overcoming it', topics: ['s3.planning'] },
            { n: 23, ref: 'ch. 23', title: 'Force Field Analysis and Strategic Planning', covers: 'Strategic planning; force field analysis; contingency planning', topics: ['s3.planning'] },
            { n: 24, ref: 'ch. 24', title: 'Consumer Rights and Responsibilities', covers: 'Consumer law and protection', topics: ['s4.consumer'] },
            { n: 25, ref: 'ch. 25', title: 'Making Informed Consumer Decisions', covers: 'Ethics, sustainability and consumer behaviour; consumer behaviour and digital technology', topics: ['s4.consumer'] },
            { n: 26, ref: 'ch. 26', title: 'Making Informed Financial Decisions', covers: 'Risk tolerance; switching financial products; fintech; credit ratings', topics: ['s4.financial'] },
            { n: 27, ref: 'ch. 27', title: 'Financial Regulation', covers: 'Financial services regulation; consumer protection; digital currencies', topics: ['s4.financial'] },
            { n: 28, ref: 'ch. 28', title: 'Being an Informed Employee', covers: 'Employment rights and responsibilities', topics: ['s4.employee'] },
            { n: 29, ref: 'ch. 29', title: 'Employee Governance', covers: 'The gig-based economy', topics: ['s4.employee'] }
          ] },
        { id: 'inside-business', title: 'Inside Business (2025 specification)', short: 'Inside Business', publisher: 'Edco' },
        /* Chapter titles and the numbered learning outcomes under each are from the
           publisher's Back in Business Hub (2025 specification edition). The learning
           outcomes are the specification's own, so rating them rates the course itself. */
        { id: 'back-in-business', title: 'Back in Business (2025 specification)', short: 'Back in Business', publisher: 'GD Education',
          volumes: ['Strand 1 — Exploring the Business Environment', 'Strand 2 — Understanding Enterprise',
                    'Strand 3 — Leading in Business', 'Strand 4 — Being Informed and Making Informed Decisions',
                    'Unifying strand — Business Alive'],
          chapters: [
            { vol: 0, n: 1,  ref: 'ch. 1',  title: 'Key Stakeholders in Business',
              subs: [
                '1.1 Outline the key internal and external stakeholders in a business and demonstrate their importance in the business environment',
                '1.2 Demonstrate how stakeholders interact and identify potential conflict between stakeholders',
                '1.3 Suggest appropriate ways of avoiding and resolving conflict between stakeholders',
                '1.4 Conduct stakeholder mapping and explain the importance of prioritising different stakeholder interests'
              ],
              topics: ['s1.stakeholders'] },
            { vol: 0, n: 2,  ref: 'ch. 2',  title: 'Forms of Business, Business Regulation and Governance',
              subs: [
                '2.1 Distinguish between public, private, and not-for-profit enterprises and analyse the contribution of each type both locally and nationally',
                '2.2 Outline how business ownership differs between different types of organisations and how ownership can change over time',
                '2.3 Outline the purpose of regulation in business and investigate how organisations are regulated both internally and externally',
                '2.4 Explain what is meant by governance in an organisation',
                '2.5 Outline the three factors considered in an ESG report'
              ],
              topics: ['s1.forms'] },
            { vol: 0, n: 3,  ref: 'ch. 3',  title: 'Business and the Economy',
              subs: [
                '3.1 Explain how economic indicators can impact on business development and growth',
                '3.2 Outline the value of the business economy in Ireland'
              ],
              topics: ['s1.economy'] },
            { vol: 0, n: 4,  ref: 'ch. 4',  title: 'The Influence of National and EU Policy',
              subs: [
                '4.1 Outline three Irish government policies that impact on three different sectors of the economy',
                '4.2 Explain the difference between government policy and legislation',
                '4.3 Outline the role played by business in the development of national policy',
                '4.4 Identify the key decision-makers in European policy development',
                '4.5 Distinguish between European regulations, directives, and opinions',
                '4.6 Evaluate the effect of one EU regulation and one EU directive on business activity in Ireland'
              ],
              topics: ['s1.policy'] },
            { vol: 0, n: 5,  ref: 'ch. 5',  title: 'Irish Business Globally and Internationally',
              subs: [
                '5.1 Explain what is meant by a trading bloc and discuss why they are important for businesses in the Irish economy',
                '5.2 Identify the trading blocs most relevant for Irish businesses',
                '5.3 Evaluate Ireland’s membership of the EU from the perspective of the economy, businesses, and consumers',
                '5.4 Outline the factors to be considered when trading internationally',
                '5.5 Explain why Irish businesses trade globally and compare the challenges and benefits of trading internationally',
                '5.6 Distinguish between balance of payments and balance of trade, and calculate both',
                '5.7 Evaluate the impact of Irish organisations trading internationally — positive, negative, social and environmental impacts of globalisation',
                '5.8 Explain how globalisation increases interdependence and evaluate the consequences for businesses and consumers',
                '5.9 Evaluate the role of technology in globalisation',
                '5.10 Explain what is meant by Foreign Direct Investment and investigate how the Irish government promotes FDI',
                '5.11 Outline the contribution of Foreign Direct Investment to the Irish economy'
              ],
              topics: ['s1.global'] },
            { vol: 1, n: 6,  ref: 'ch. 6',  title: 'Enterprise in Action',
              subs: [
                '6.1 Identify examples of innovation, intrapreneurship and entrepreneurship in their local community, nationally and internationally, and explain the importance of innovation for business, the economy and society',
                '6.2 Identify the competencies of innovators and outline why these are significant when starting a business',
                '6.3 Investigate the role of government in fostering enterprise and supporting business development and growth'
              ],
              topics: ['s2.enterprise'] },
            { vol: 1, n: 7,  ref: 'ch. 7',  title: 'Idea Development',
              subs: [
                '7.1 Determine the factors that impact on the development of business ideas',
                '7.2 Outline design thinking as an innovative approach to idea development and appreciate how the process is iterative and both solution- and person-centred',
                '7.3 Appreciate the importance of conducting a feasibility study to evaluate a business idea'
              ],
              topics: ['s2.ideas'] },
            { vol: 1, n: 8,  ref: 'ch. 8',  title: 'Business Planning',
              subs: [
                '8.1 Appreciate the importance of having a business plan and outline the key functions of a business plan',
                '8.2 Outline the importance of ethics and sustainability when planning in business',
                '8.3 Explain what is meant by a business model and appreciate its role within the business plan',
                '8.4 Identify the key elements of the business model canvas and outline the role of business models in successful enterprises',
                '8.5 Identify and compare the most common business models',
                '8.6 Outline how digital technology is a driver of change in business',
                '8.7 Identify and compare a number of technology-driven business models and outline the key characteristics of each model'
              ],
              topics: ['s2.planning'] },
            { vol: 1, n: 9,  ref: 'ch. 9',  title: 'The Target Market',
              subs: [
                '9.1 Appreciate the importance of market research in identifying the target market and discuss how businesses conduct market research',
                '9.2 Outline the elements of the marketing mix and explain their significance for a business and how they are influenced by the target market',
                '9.3 Develop a marketing mix for a product and a service of choice and provide a USP analysis for each',
                '9.4 Evaluate and suggest ways of improving an existing marketing mix',
                '9.5 Demonstrate an understanding of the disruptive impact and influence of digital technology on market research and marketing',
                '9.6 Evaluate the influence of ethics and sustainability on marketing',
                '9.7 Use a power-interest grid to analyse customer interest and adjust the marketing mix as necessary',
                '9.8 Conduct a STEEPLE analysis to develop greater understanding of the external environment and identify issues of concern for a business'
              ],
              topics: ['s2.market'] },
            { vol: 1, n: 10, ref: 'ch. 10', title: 'Operations and Finance',
              subs: [
                '10.1 Outline the main elements that are key to the operational model of a business and explain why these may change over time',
                '10.2 Identify the key costs and sources of finance for a business and explore why these may change over the lifecycle of the product or service',
                '10.3 Analyse the cashflow of a business and recommend a suitable course of action to address the issues arising from the analysis'
              ],
              topics: ['s2.operations'] },
            { vol: 1, n: 11, ref: 'ch. 11', title: 'Growth, Development and Expansion',
              subs: [
                '11.1 Demonstrate an understanding of the importance of identifying competition in the market',
                '11.2 Use Porter’s Five Forces Model to identify and analyse competition and identify the competitive advantage of a business',
                '11.3 Outline the strategies employed by a business to adapt or expand',
                '11.4 Appreciate the potential of technology to support adaptation and expansion',
                '11.5 Conduct a cost-benefit analysis to analyse the implications of business expansion',
                '11.6 Outline strategies that a business may employ to adapt based on their marketing mix and/or business model'
              ],
              topics: ['s2.growth'] },
            { vol: 1, n: 12, ref: 'ch. 12', title: 'Managing Risk',
              subs: [
                '12.1 Outline the challenges and risks associated with enterprise and entrepreneurship',
                '12.2 Outline the importance of assessing and managing risks in business',
                '12.3 Analyse a range of risk management strategies that can be used to respond to the challenges and risks in business'
              ],
              topics: ['s2.risk'] },
            { vol: 2, n: 13, ref: 'ch. 13', title: 'Leadership and Conflict',
              subs: [
                '13.1 Distinguish between leadership and management in organisations',
                '13.2 Analyse the significance of organisational culture and innovation in successful organisations',
                '13.3 Outline how leadership styles foster organisational culture and organisational innovation',
                '13.4 Appreciate the range of reasons for conflict in the workplace and demonstrate an understanding of how conflict may impact on the workplace',
                '13.5 Analyse how both employees and employers may deal with conflict internally',
                '13.6 Outline different external approaches to conflict resolution'
              ],
              topics: ['s3.organisation'] },
            { vol: 2, n: 14, ref: 'ch. 14', title: 'Leading and Managing People',
              subs: [
                '14.1 Discuss the internal and external factors that impact on workforce planning',
                '14.2 Outline the key stages in the recruitment process and suggest how organisations might adopt ethical approaches to recruitment',
                '14.3 Evaluate how digital technologies influence the process of recruitment and selection',
                '14.4 Investigate the factors that impact on employee motivation',
                '14.5 Describe what is meant by effective employee appraisal',
                '14.6 Identify a number of approaches to appraisal and analyse how these approaches might contribute to employee motivation',
                '14.7 Explain what is meant by human capital management and outline how the organisational environment is a factor in its development',
                '14.8 Investigate the different types of training and professional development that may be offered to employees and outline why ongoing training is an important aspect of HCM',
                '14.9 Appreciate the opportunities and challenges associated with working in teams for both employees and employers',
                '14.10 Outline how employers and employees can work together to create a more sustainable workplace',
                '14.11 Investigate how digital technology impacts on the workplace',
                '14.12 Identify the opportunities and challenges associated with remote and blended working arrangements for both employees and employers',
                '14.13 Analyse the ethical and sustainability issues associated with remote and blended working',
                '14.14 Outline the importance of corporate wellness and investigate the impact of corporate wellness on employee motivation and organisational culture',
                '14.15 Identify the role of leadership in promoting corporate wellness'
              ],
              topics: ['s3.people'] },
            { vol: 2, n: 15, ref: 'ch. 15', title: 'The Importance of Communication',
              subs: [
                '15.1 Explain the importance of communication in an organisation',
                '15.2 Identify different modes of communication and analyse the efficacy of each mode as an approach within an organisation',
                '15.3 Discuss how technology enables communication in organisations',
                '15.4 Discuss how communication might be improved in an organisation'
              ],
              topics: ['s3.communication'] },
            { vol: 2, n: 16, ref: 'ch. 16', title: 'The Rationale for Planning',
              subs: [
                '16.1 Outline the internal and external changes that organisations encounter through their lifetime',
                '16.2 Analyse the reasons for resistance to change in an organisation',
                '16.3 Identify the practices that promote innovation and entrepreneurial/intrapreneurial thinking',
                '16.4 Outline a range of approaches which may help to overcome resistance to change',
                '16.5 Outline what is meant by strategic planning and appreciate the importance of strategic planning as an ongoing process',
                '16.6 Describe the benefit of strategic planning for an organisation',
                '16.7 Explain the importance of planning for change and discuss how a force-field analysis could support strategically planning for change',
                '16.8 Explain what is meant by contingency planning in terms of crisis management in an organisation',
                '16.9 Discuss the factors that should be considered when developing a contingency plan'
              ],
              topics: ['s3.planning'] },
            { vol: 3, n: 17, ref: 'ch. 17', title: 'Making Informed Decisions as a Consumer',
              subs: [
                '17.1 Investigate the rights and responsibilities of consumers using current relevant consumer legislation',
                '17.2 Demonstrate how consumer behaviour might be informed by ethical and sustainability concerns',
                '17.3 Investigate how digital technology impacts on consumer behaviour',
                '17.4 Investigate how personal data is protected by European regulation',
                '17.5 Appreciate the importance of making informed consumer decisions and use this understanding to discuss consumer-related stories in the news and media'
              ],
              topics: ['s4.consumer'] },
            { vol: 3, n: 18, ref: 'ch. 18', title: 'Making Informed Financial Decisions',
              subs: [
                '18.1 Examine the factors to be considered with saving, investing, and borrowing',
                '18.2 Explain risk tolerance from a consumer perspective and investigate the range of risks facing consumers of financial products and how consumers can identify reliable sources of financial information',
                '18.3 Outline the importance of considering switching between financial product providers',
                '18.4 Explain how technology impacts the provision of financial products and outline the benefits and challenges of fintech',
                '18.5 Outline how a person’s credit rating is established, the factors that can impact on credit rating, and the consequences of a poor credit rating',
                '18.6 Investigate how the financial services industry is regulated and discuss the potential consequences of under-regulation',
                '18.7 Outline a range of financial fraud activities and discuss how consumers can protect themselves',
                '18.8 Describe Central Bank Digital Currency and examine the potential impact of digital currency on consumers and businesses',
                '18.9 Appreciate the importance of making informed financial decisions and use this understanding to discuss finance-related stories in the news and media'
              ],
              topics: ['s4.financial'] },
            { vol: 3, n: 19, ref: 'ch. 19', title: 'Being an Informed Employee',
              subs: [
                '19.1 Examine how employees are protected both legislatively and non-legislatively in the workplace',
                '19.2 Investigate how the rights and responsibilities of both employees and employers are set out in current relevant employment legislation',
                '19.3 Describe the role of trade unions in the workplace',
                '19.4 Discuss the role of the gig-based economy and identify the associated opportunities and challenges for workers',
                '19.5 Investigate how the annual government budget impacts on workers',
                '19.6 Appreciate the importance of making informed decisions as an employee and use this understanding to discuss workplace-related stories in the news and media'
              ],
              topics: ['s4.employee'] },
            { vol: 4, n: 'AB', ref: 'Activity Book', title: 'Project Planner (Activity Book)',
              subs: [
                'Stage 1 — getting started: reading the project brief and choosing a focus',
                'Stages 2–3 — research questions and data sources; the role of evidence',
                'Analysing and evaluating information; presenting findings and acknowledging sources'
              ],
              topics: ['u.research', 'u.aac'] }
          ] },
        { id: 'making-it-happen', title: 'Making it Happen', publisher: 'Folens' }
      ],
      strands: [
        { id: 'u', title: 'Unifying strand — Investigating Business', topics: [
          { id: 'research', title: 'Investigating business', detail: 'Developing research questions, managing information, project planning, analysing, presenting findings, acknowledging sources', weight: 2 },
          { id: 'aac', title: 'Business Alive Investigative Study (40%)', detail: 'The externally assessed investigative study from the common brief', weight: 3 }
        ]},
        { id: 's1', title: 'Strand 1 — Exploring the Business Environment', topics: [
          { id: 'stakeholders', title: '1.1 Key stakeholders in business', detail: 'Who the stakeholders are and how their interests relate', weight: 2 },
          { id: 'forms', title: '1.2 Forms of business, regulation & governance', detail: 'Public, private, semi-state and not-for-profit; ownership over a business lifecycle; internal and external regulation; ESG', weight: 3 },
          { id: 'economy', title: '1.3 Business and the economy', detail: 'Inflation, employment, interest rates, growth, exchange rates and consumer confidence; the value of the business economy', weight: 2 },
          { id: 'policy', title: '1.4 National and EU policy', detail: 'Government policy vs legislation, lobbying and interest groups, EU institutions, regulations and directives', weight: 2 },
          { id: 'global', title: '1.5 Irish business globally', detail: 'Trade, trading blocs, globalisation, FDI and technology', weight: 2 }
        ]},
        { id: 's2', title: 'Strand 2 — Understanding Enterprise', topics: [
          { id: 'enterprise', title: '2.1 Enterprise in its broadest sense', detail: 'Enterprise and entrepreneurship in business, community and public life; the role of government', weight: 2 },
          { id: 'ideas', title: '2.2 Idea development', detail: 'Generating and developing ideas; design thinking', weight: 2 },
          { id: 'planning', title: '2.3 Business planning', detail: 'Business models and the Business Model Canvas; the business plan', weight: 3 },
          { id: 'market', title: '2.4 The target market', detail: 'Market research and analysis, segmentation, the marketing mix (7Ps), USP', weight: 3 },
          { id: 'operations', title: '2.5 Operations and finance', detail: 'Operational model, key resources and partnerships, sources of finance, cash flow', weight: 3 },
          { id: 'growth', title: '2.6 Growth, development & expansion', detail: 'Reasons and methods for expansion; Porter’s Five Forces; cost–benefit analysis', weight: 2 },
          { id: 'risk', title: '2.7 Managing risk', detail: 'Identifying, assessing and managing business risk', weight: 2 }
        ]},
        { id: 's3', title: 'Strand 3 — Leading in Business', topics: [
          { id: 'organisation', title: '3.1 Leading & managing an organisation', detail: 'Leadership styles, organisational culture, structures, managing conflict', weight: 3 },
          { id: 'people', title: '3.2 Leading & managing people', detail: 'Recruitment and ethics, motivation, appraisal, human capital, sustainable and remote workplaces', weight: 3 },
          { id: 'communication', title: '3.3 The importance of communication', detail: 'Internal and external communication, meetings, reports, digital channels', weight: 2 },
          { id: 'planning', title: '3.4 The rationale for planning', detail: 'Strategic and contingency planning, force field analysis, managing change', weight: 2 }
        ]},
        { id: 's4', title: 'Strand 4 — Being Informed and Making Informed Decisions', topics: [
          { id: 'consumer', title: '4.1 Informed consumer decisions', detail: 'Consumer rights and responsibilities, consumer law, ethical and sustainable choices, digital consumer behaviour', weight: 3 },
          { id: 'financial', title: '4.2 Informed financial decisions', detail: 'Personal finance, risk tolerance, switching products, fintech, credit ratings, financial regulation, digital currencies', weight: 3 },
          { id: 'employee', title: '4.3 Being an informed employee', detail: 'Employment rights and responsibilities, employee governance, the gig economy', weight: 2 }
        ]}
      ]
    },

    'Accounting': {
      source: 'Leaving Certificate Accounting syllabus — financial and management accounting',
      books: [
        { id: 'accounting-senior-cycle-4', title: 'Accounting for Senior Cycle, 4th edition (Kielthy & Tyrrell)', short: 'Accounting for Senior Cycle', publisher: 'Edco' },
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
      books: [
        { id: 'fundamental-applied-maths-3', title: 'Fundamental Applied Maths, 3rd edition (Oliver Murphy)', short: 'Fundamental Applied Maths', publisher: 'Folens' }
      ],
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
      books: [
        { id: 'complete-home-ec-2', title: 'Complete Home Economics, 2nd edition (Gillick & Healy)', short: 'Complete Home Economics', publisher: 'Educate.ie' }
      ],
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
      /* Units, grammar and exam-preparation focus from the 4th edition's own
         detailed contents table (Folens, 2025). */
      { id: 'tout-va-bien-4', title: 'Tout va bien! 4th edition (2025)', short: 'Tout va bien!', publisher: 'Folens', sectioned: true,
        chapters: [
          { n: 1, ref: 'Unité 1', title: 'Bonjour, je me présente', covers: 'Descriptions, personality, dates and numbers · Oral: parler de soi · Writing: le texte à trous, le formulaire, la question d’opinion · Grammar: le présent, les verbes pronominaux · Exam: la compréhension écrite', topics: ['oral.conversation', 'reading.journalistic', 'language.tenses'] },
          { n: 2, ref: 'Unité 2', title: 'La vie en famille', covers: 'Family, relationships, chores, equality · Oral: la famille · Writing: la question d’opinion · Grammar: adjectives, negation, questions · Exam: la production écrite — la question d’opinion', topics: ['oral.conversation', 'writing.opinion', 'language.grammar'] },
          { n: 3, ref: 'Unité 3', title: 'Chez moi', covers: 'Housing, my area, town and country, nationalities, la francophonie · Oral: mon quartier · Grammar: le passé composé, l’imparfait · Exam: l’épreuve orale', topics: ['oral.conversation', 'oral.document', 'language.tenses'] },
          { n: 4, ref: 'Unité 4', title: 'La vie des jeunes', covers: 'Friends, weekends, fashion, pocket money and part-time jobs, celebrities · Oral: les sorties et les amis · Grammar: le passé récent, le futur proche, le futur simple · Exam: le journal intime', topics: ['oral.conversation', 'writing.diary', 'language.tenses'] },
          { n: 5, ref: 'Unité 5', title: 'À l’école', covers: 'School systems, subjects, technology, careers, languages · Oral: l’école et l’avenir · Grammar: le conditionnel, adverbs, si clauses · Exam: la compréhension orale', topics: ['oral.conversation', 'listening.aural', 'language.tenses'] },
          { n: 6, ref: 'Unité 6', title: 'Mon temps libre', covers: 'Hobbies, reading, TV, cinema, sport, music · Oral: mes passe-temps · Grammar: articles, prepositions · Exam: la production écrite — le récit', topics: ['oral.conversation', 'writing.narrative', 'language.grammar'] },
          { n: 7, ref: 'Unité 7', title: 'Vive les vacances !', covers: 'Holidays, travel, tourism, weather, transport, environment · Oral: les vacances · Grammar: personal and relative pronouns · Exam: la lettre informelle', topics: ['oral.conversation', 'writing.diary', 'language.grammar', 'language.themes'] },
          { n: 8, ref: 'Unité 8', title: 'Le bien-être physique et digital', covers: 'Health, food, addiction, technology · Oral: le bien-être · Grammar: le plus-que-parfait, le passé simple · Exam: la carte postale et le message', topics: ['oral.conversation', 'writing.diary', 'language.tenses', 'language.themes'] },
          { n: 9, ref: 'Unité 9', title: 'Le monde actuel', covers: 'Society today, social problems, politics, the EU · Oral: la société irlandaise · Grammar: l’impératif, le subjonctif · Exam: la lettre formelle', topics: ['oral.conversation', 'writing.formal', 'writing.opinion', 'language.tenses'] }
        ] },
      /* Unit and chapter titles and each chapter's Grammaire section are from the
         2nd edition's own contents (Gill Education, 2019). Every unit ends with
         Focus examen and an Évaluation, listed under its last chapter. */
      { id: 'a-l-attaque-2', title: 'À l’Attaque ! 2nd edition (Higher Level)', short: 'À l’Attaque !', publisher: 'Gill Education', sectioned: true,
        volumes: ['Unité 1 — C’est moi', 'Unité 2 — Les loisirs', 'Unité 3 — Ma ville', 'Unité 4 — Les études et le français',
                  'Unité 5 — On y va ?', 'Unité 6 — La santé', 'Unité 7 — La citoyenneté'],
        chapters: [
          { vol: 0, n: 1,  ref: 'ch. 1',  title: 'Parlez-moi de vous',
            subs: ['Se présenter, la description physique et la personnalité', 'Grammaire — les noms et les déterminants', 'Grammaire — les adjectifs qualificatifs et possessifs', 'Bilan'],
            topics: ['oral.conversation', 'language.grammar'] },
          { vol: 0, n: 2,  ref: 'ch. 2',  title: 'Moi et ma famille',
            subs: ['La famille et les relations', 'Grammaire — l’infinitif', 'Grammaire — le présent de l’indicatif', 'Bilan'],
            topics: ['oral.conversation', 'language.tenses'] },
          { vol: 0, n: 3,  ref: 'ch. 3',  title: 'Moi et mes copains',
            subs: ['Les amis et l’amitié', 'Grammaire — le comparatif et le superlatif', 'Bilan'],
            topics: ['oral.conversation', 'language.grammar'] },
          { vol: 0, n: 4,  ref: 'ch. 4',  title: 'Mes sentiments et mes opinions',
            subs: ['Exprimer ses sentiments et donner son avis', 'Grammaire — les questions', 'Bilan', 'Focus examen — Unité 1', 'Évaluation — Unité 1'],
            topics: ['writing.opinion', 'language.grammar', 'oral.conversation'] },

          { vol: 1, n: 5,  ref: 'ch. 5',  title: 'Les passe-temps et les médias',
            subs: ['Les loisirs, la télévision, la musique et les médias', 'Grammaire — les adverbes', 'Bilan'],
            topics: ['oral.conversation', 'language.themes', 'language.grammar'] },
          { vol: 1, n: 6,  ref: 'ch. 6',  title: 'Faites-vous du sport ?',
            subs: ['Le sport et la forme', 'Grammaire — la négation', 'Bilan'],
            topics: ['oral.conversation', 'language.grammar'] },
          { vol: 1, n: 7,  ref: 'ch. 7',  title: 'Communication et nouvelles technologies',
            subs: ['Internet, les réseaux sociaux et le portable', 'Grammaire — les prépositions', 'Bilan'],
            topics: ['language.themes', 'reading.journalistic', 'language.grammar'] },
          { vol: 1, n: 8,  ref: 'ch. 8',  title: 'Le travail et l’argent',
            subs: ['Les petits boulots, l’argent de poche et le monde du travail', 'Grammaire — l’impératif', 'Bilan', 'Focus examen — Unité 2', 'Évaluation — Unité 2'],
            topics: ['language.themes', 'writing.formal', 'language.tenses'] },

          { vol: 2, n: 9,  ref: 'ch. 9',  title: 'Où habitez-vous ?',
            subs: ['Ma maison et mon quartier', 'Grammaire — le passé composé', 'Bilan'],
            topics: ['oral.conversation', 'language.tenses'] },
          { vol: 2, n: 10, ref: 'ch. 10', title: 'Ville ou campagne ?',
            subs: ['La vie en ville et à la campagne', 'Grammaire — l’imparfait', 'Bilan'],
            topics: ['writing.opinion', 'language.tenses'] },
          { vol: 2, n: 11, ref: 'ch. 11', title: 'Les problèmes urbains',
            subs: ['La circulation, le logement, la pollution et la sécurité', 'Grammaire — le conditionnel présent', 'Bilan'],
            topics: ['language.themes', 'reading.journalistic', 'language.tenses'] },
          { vol: 2, n: 12, ref: 'ch. 12', title: 'Protégeons la planète',
            subs: ['L’environnement et le changement climatique', 'Grammaire — le participe présent', 'Bilan', 'Focus examen — Unité 3', 'Évaluation — Unité 3'],
            topics: ['language.themes', 'writing.opinion', 'language.grammar'] },

          { vol: 3, n: 13, ref: 'ch. 13', title: 'Mon lycée',
            subs: ['L’école, les matières et la vie scolaire', 'Grammaire — le passé composé ou l’imparfait ?', 'Bilan'],
            topics: ['oral.conversation', 'writing.narrative', 'language.tenses'] },
          { vol: 3, n: 14, ref: 'ch. 14', title: 'Après le bac',
            subs: ['Les projets d’avenir, les études supérieures et les métiers', 'Grammaire — le futur proche', 'Bilan'],
            topics: ['oral.conversation', 'language.tenses'] },
          { vol: 3, n: 15, ref: 'ch. 15', title: 'La francophonie',
            subs: ['Le français dans le monde', 'Grammaire — le futur simple', 'Bilan'],
            topics: ['reading.journalistic', 'language.themes', 'language.tenses'] },
          { vol: 3, n: 16, ref: 'ch. 16', title: 'La pression des examens',
            subs: ['Le stress, les examens et les points', 'Grammaire — le passé récent : je viens de', 'Bilan', 'Focus examen — Unité 4', 'Évaluation — Unité 4'],
            topics: ['writing.diary', 'oral.conversation', 'language.tenses'] },

          { vol: 4, n: 17, ref: 'ch. 17', title: 'Les vacances',
            subs: ['Les vacances et les voyages', 'Grammaire — les pronoms', 'Bilan'],
            topics: ['oral.conversation', 'language.grammar'] },
          { vol: 4, n: 18, ref: 'ch. 18', title: 'Les souvenirs de vacances',
            subs: ['Raconter un séjour au passé', 'Grammaire — le pronom y', 'Bilan'],
            topics: ['writing.narrative', 'writing.diary', 'language.grammar'] },
          { vol: 4, n: 19, ref: 'ch. 19', title: 'Les transports',
            subs: ['Les moyens de transport et les déplacements', 'Grammaire — le pronom en', 'Bilan'],
            topics: ['language.themes', 'language.grammar'] },
          { vol: 4, n: 20, ref: 'ch. 20', title: 'Le tourisme',
            subs: ['Le tourisme et ses effets', 'Grammaire — la position des pronoms', 'Bilan', 'Focus examen — Unité 5', 'Évaluation — Unité 5'],
            topics: ['reading.journalistic', 'writing.formal', 'language.grammar'] },

          { vol: 5, n: 21, ref: 'ch. 21', title: 'L’alcool',
            subs: ['L’alcool et les jeunes', 'Grammaire — les pronoms possessifs', 'Bilan'],
            topics: ['language.themes', 'writing.opinion', 'language.grammar'] },
          { vol: 5, n: 22, ref: 'ch. 22', title: 'La dépendance',
            subs: ['Le tabac, la drogue et les autres dépendances', 'Grammaire — les pronoms relatifs', 'Bilan'],
            topics: ['language.themes', 'reading.journalistic', 'language.grammar'] },
          { vol: 5, n: 23, ref: 'ch. 23', title: 'L’alimentation',
            subs: ['Manger sain, la nourriture et les régimes', 'Grammaire — le plus-que-parfait', 'Bilan'],
            topics: ['language.themes', 'oral.conversation', 'language.tenses'] },
          { vol: 5, n: 24, ref: 'ch. 24', title: 'L’image de soi',
            subs: ['L’apparence, la mode et l’estime de soi', 'Grammaire — le conditionnel passé', 'Bilan', 'Focus examen — Unité 6', 'Évaluation — Unité 6'],
            topics: ['reading.literary', 'writing.opinion', 'language.tenses'] },

          { vol: 6, n: 25, ref: 'ch. 25', title: 'Les problèmes de société',
            subs: ['Les grands problèmes de la société d’aujourd’hui', 'Grammaire — la concordance des temps : si', 'Bilan'],
            topics: ['writing.opinion', 'reading.journalistic', 'language.tenses'] },
          { vol: 6, n: 26, ref: 'ch. 26', title: 'La précarité',
            subs: ['La pauvreté, le chômage et les sans-abri', 'Grammaire — le subjonctif présent', 'Bilan'],
            topics: ['language.themes', 'reading.journalistic', 'language.tenses'] },
          { vol: 6, n: 27, ref: 'ch. 27', title: 'La discrimination',
            subs: ['Le racisme, l’égalité et la discrimination', 'Grammaire — le passif', 'Grammaire — comment éviter le passif ?', 'Bilan'],
            topics: ['writing.opinion', 'language.themes', 'language.grammar'] },
          { vol: 6, n: 28, ref: 'ch. 28', title: 'L’Europe',
            subs: ['L’Union européenne et l’Europe des jeunes', 'Grammaire — le passé simple', 'Bilan', 'Focus examen — Unité 7', 'Évaluation — Unité 7'],
            topics: ['language.themes', 'reading.journalistic', 'language.tenses'] }
        ] },
      { id: 'a-la-une', title: 'À La Une (Webb & Voyard-Venant)', short: 'À La Une' },
      { id: 'lsms-french', title: 'Less Stress More Success — French', publisher: 'Gill' }
    ]),
    'German': languageSyllabus('German', [
      { id: 'deutsch-komplett-2', title: 'Deutsch Komplett, 2nd edition', short: 'Deutsch Komplett', publisher: 'Folens' },
      { id: 'auf-kurs', title: 'Auf Kurs (Braun-McCarthy & Caton)', short: 'Auf Kurs' },
      { id: 'lsms-german', title: 'Less Stress More Success — German', publisher: 'Gill' }
    ]),
    'Spanish': languageSyllabus('Spanish', [
      { id: 'exito', title: 'Éxito (Hilliard & Tomás Cebollada)', short: 'Éxito', publisher: 'Educate.ie' },
      { id: 'espanol-en-accion-2', title: 'Español en acción, 2nd edition', short: 'Español en acción' },
      { id: 'lsms-spanish', title: 'Less Stress More Success — Spanish', publisher: 'Gill' }
    ]),
    'Italian': languageSyllabus('Italian', []),

    /* No built-in topic list yet — the books are listed so chapters can be mapped once
       the student adds the topics their class covers. */
    'Economics': {
      source: 'Leaving Certificate Economics specification (2019) — topics to be added by the student',
      note: '',
      books: [
        { id: 'economics-now', title: 'Economics Now (Michael Ruane)', short: 'Economics Now', publisher: 'Gill' },
        { id: 'positive-economics', title: 'Positive Economics', publisher: 'Edco' }
      ],
      strands: []
    }
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
        { id: 'formal', title: 'Formal letter or email', detail: 'Layout, formal phrases, complaints, applications', weight: 2 },
        { id: 'narrative', title: 'Narrative writing', detail: 'Recounting events and telling a story in the past tenses', weight: 2 }
      ]},
      { id: 'language', title: 'Vocabulary & grammar', topics: [
        { id: 'themes', title: 'Vocabulary by theme', detail: 'Family, school, work, health, environment, technology, travel, current affairs', weight: 2 },
        { id: 'tenses', title: 'Tenses', detail: 'Present, past, future, conditional; subjunctive at Higher Level', weight: 3 },
        { id: 'grammar', title: 'Grammar essentials', detail: 'Agreement, pronouns, prepositions, negatives, question forms', weight: 2 }
      ]}
    ]
  };
}
