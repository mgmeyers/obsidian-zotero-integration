import Fuse from 'fuse.js';

export const cslListRaw = [
  {
    value: 'academy-of-management-review',
    label: 'Academy of Management Review',
  },
  {
    value: 'accident-analysis-and-prevention',
    label: 'Accident Analysis and Prevention',
  },
  {
    value: 'aci-materials-journal',
    label: 'ACI Materials Journal',
  },
  {
    value: 'acm-sig-proceedings-long-author-list',
    label: 'ACM SIG Proceedings ("et al." for 15+ authors)',
  },
  {
    value: 'acm-sig-proceedings',
    label: 'ACM SIG Proceedings ("et al." for 3+ authors)',
  },
  {
    value: 'acm-sigchi-proceedings-extended-abstract-format',
    label: 'ACM SIGCHI Proceedings - Extended Abstract Format',
  },
  {
    value: 'acm-sigchi-proceedings',
    label: 'ACM SIGCHI Proceedings (2016)',
  },
  {
    value: 'acm-siggraph',
    label: 'ACM SIGGRAPH',
  },
  {
    value: 'acme-an-international-journal-for-critical-geographies',
    label: 'ACME: An International Journal for Critical Geographies',
  },
  {
    value: 'acta-amazonica',
    label: 'Acta Amazonica',
  },
  {
    value: 'acta-anaesthesiologica-scandinavica',
    label: 'Acta Anaesthesiologica Scandinavica',
  },
  {
    value: 'acta-anaesthesiologica-taiwanica',
    label: 'Acta Anaesthesiologica Taiwanica',
  },
  {
    value: 'acta-botanica-croatica',
    label: 'Acta Botanica Croatica',
  },
  {
    value: 'acta-chiropterologica',
    label: 'Acta Chiropterologica',
  },
  {
    value: 'acta-chirurgiae-orthopaedicae-et-traumatologiae-cechoslovaca',
    label: 'Acta chirurgiae orthopaedicae et traumatologiae Čechoslovaca',
  },
  {
    value: 'acta-hydrotechnica',
    label: 'Acta hydrotechnica',
  },
  {
    value: 'acta-ichthyologica-et-piscatoria',
    label: 'Acta Ichthyologica et Piscatoria',
  },
  {
    value: 'acta-medica-peruana',
    label: 'Acta Médica Peruana',
  },
  {
    value: 'acta-naturae',
    label: 'Acta Naturae',
  },
  {
    value: 'acta-neurobiologiae-experimentalis',
    label: 'Acta Neurobiologiae Experimentalis',
  },
  {
    value: 'acta-neurochirurgica',
    label: 'Acta Neurochirurgica',
  },
  {
    value: 'acta-ophthalmologica',
    label: 'Acta Ophthalmologica',
  },
  {
    value: 'acta-ornithologica',
    label: 'Acta Ornithologica',
  },
  {
    value: 'acta-orthopaedica-belgica',
    label: 'Acta Orthopædica Belgica',
  },
  {
    value: 'acta-orthopaedica',
    label: 'Acta Orthopaedica',
  },
  {
    value: 'acta-paediatrica',
    label: 'Acta Paediatrica',
  },
  {
    value: 'acta-palaeontologica-polonica',
    label: 'Acta Palaeontologica Polonica',
  },
  {
    value: 'acta-pharmaceutica-sinica-b',
    label: 'Acta Pharmaceutica Sinica B',
  },
  {
    value: 'acta-pharmaceutica',
    label: 'Acta Pharmaceutica',
  },
  {
    value: 'acta-philosophica',
    label: 'Acta Philosophica',
  },
  {
    value: 'acta-physica-sinica',
    label: 'Acta Physica Sinica (物理学报)',
  },
  {
    value: 'acta-physiologica',
    label: 'Acta Physiologica',
  },
  {
    value: 'acta-polytechnica',
    label: 'Acta Polytechnica',
  },
  {
    value: 'acta-radiologica',
    label: 'Acta Radiologica',
  },
  {
    value: 'acta-scientiae-veterinariae',
    label: 'Acta Scientiae Veterinariae',
  },
  {
    value: 'acta-societatis-botanicorum-poloniae',
    label: 'Acta Societatis Botanicorum Poloniae',
  },
  {
    value:
      'acta-universitatis-agriculturae-et-silviculturae-mendelianae-brunensis',
    label:
      'Acta Universitatis Agriculturae et Silviculturae Mendelianae Brunensis',
  },
  {
    value: 'acta-universitatis-agriculturae-sueciae',
    label:
      'Acta Universitatis Agriculturae Sueciae (Swedish University of Agricultural Sciences)',
  },
  {
    value: 'acta-zoologica-academiae-scientiarum-hungaricae',
    label: 'Acta Zoologica Academiae Scientiarum Hungaricae',
  },
  {
    value: 'administrative-science-quarterly',
    label: 'Administrative Science Quarterly',
  },
  {
    value: 'advanced-engineering-materials',
    label: 'Advanced Engineering Materials',
  },
  {
    value: 'advanced-functional-materials',
    label: 'Advanced Functional Materials',
  },
  {
    value: 'advanced-healthcare-materials',
    label: 'Advanced Healthcare Materials',
  },
  {
    value: 'advanced-materials',
    label: 'Advanced Materials',
  },
  {
    value: 'advanced-optical-materials',
    label: 'Advanced Optical Materials',
  },
  {
    value: 'advanced-pharmaceutical-bulletin',
    label: 'Advanced Pharmaceutical Bulletin',
  },
  {
    value: 'advances-in-alzheimers-disease',
    label: "Advances in Alzheimer's Disease",
  },
  {
    value: 'advances-in-complex-systems',
    label: 'Advances in Complex Systems',
  },
  {
    value: 'aerosol-and-air-quality-research',
    label: 'Aerosol and Air Quality Research',
  },
  {
    value: 'aerosol-science-and-technology',
    label: 'Aerosol Science and Technology',
  },
  {
    value: 'aerospace-medicine-and-human-performance',
    label: 'Aerospace Medicine and Human Performance',
  },
  {
    value: 'african-journal-of-marine-science',
    label: 'African Journal of Marine Science',
  },
  {
    value: 'african-online-scientific-information-systems-harvard',
    label: 'African Online Scientific Information Systems - Harvard',
  },
  {
    value: 'african-online-scientific-information-systems-vancouver',
    label: 'African Online Scientific Information Systems - Vancouver',
  },
  {
    value: 'african-zoology',
    label: 'African Zoology',
  },
  {
    value: 'afro-asia',
    label: 'Afro-Ásia (Português - Brasil)',
  },
  {
    value: 'age-and-ageing',
    label: 'Age and Ageing',
  },
  {
    value: 'ageing-and-society',
    label: 'Ageing & Society',
  },
  {
    value: 'aging-and-disease',
    label: 'Aging and Disease',
  },
  {
    value: 'aging-cell',
    label: 'Aging Cell',
  },
  {
    value: 'aging',
    label: 'Aging',
  },
  {
    value: 'agora',
    label: 'Agora',
  },
  {
    value: 'agriculturae-conspectus-scientificus',
    label: 'Agriculturae Conspectus Scientificus',
  },
  {
    value: 'aib-studi',
    label: 'AIB studi (Italiano)',
  },
  {
    value: 'aids',
    label: 'AIDS',
  },
  {
    value: 'aims-press',
    label: 'AIMS Press',
  },
  {
    value: 'aix-marseille-universite-departement-d-etudes-asiatiques',
    label:
      "Aix-Marseille Université - Département d'études asiatiques (Français)",
  },
  {
    value: 'al-jamiah-journal-of-islamic-studies',
    label: "Al-Jami'ah - Journal of Islamic Studies",
  },
  {
    value: 'alcohol-and-alcoholism',
    label: 'Alcohol and Alcoholism',
  },
  {
    value: 'alcoholism-clinical-and-experimental-research',
    label: 'Alcoholism: Clinical and Experimental Research',
  },
  {
    value: 'alkoholizmus-a-drogove-zavislosti',
    label: 'Alkoholizmus a drogové závislosti',
  },
  {
    value: 'allergology-international',
    label: 'Allergology International',
  },
  {
    value: 'allergy',
    label: 'Allergy',
  },
  {
    value: 'alternatif-politika',
    label: 'Alternatif Politika',
  },
  {
    value: 'alternatives-to-animal-experimentation',
    label: 'Alternatives to Animal Experimentation',
  },
  {
    value: 'ambio',
    label: 'AMBIO',
  },
  {
    value: 'ameghiniana',
    label: 'Ameghiniana',
  },
  {
    value: 'american-anthropological-association',
    label: 'American Anthropological Association',
  },
  {
    value: 'american-association-for-cancer-research',
    label: 'American Association for Cancer Research',
  },
  {
    value: 'american-association-of-petroleum-geologists',
    label: 'American Association of Petroleum Geologists',
  },
  {
    value: 'american-chemical-society',
    label: 'American Chemical Society',
  },
  {
    value: 'american-fisheries-society',
    label: 'American Fisheries Society',
  },
  {
    value: 'american-geophysical-union',
    label: 'American Geophysical Union',
  },
  {
    value: 'american-heart-association',
    label: 'American Heart Association',
  },
  {
    value: 'american-institute-of-aeronautics-and-astronautics',
    label: 'American Institute of Aeronautics and Astronautics',
  },
  {
    value: 'american-institute-of-physics',
    label: 'American Institute of Physics',
  },
  {
    value: 'american-journal-of-agricultural-economics',
    label: 'American Journal of Agricultural Economics',
  },
  {
    value: 'american-journal-of-archaeology',
    label: 'American Journal of Archaeology',
  },
  {
    value: 'american-journal-of-botany',
    label: 'American Journal of Botany',
  },
  {
    value: 'american-journal-of-climate-change',
    label: 'American Journal of Climate Change',
  },
  {
    value: 'american-journal-of-clinical-pathology',
    label: 'American Journal of Clinical Pathology',
  },
  {
    value: 'american-journal-of-enology-and-viticulture',
    label: 'American Journal of Enology and Viticulture',
  },
  {
    value: 'american-journal-of-epidemiology',
    label: 'American Journal of Epidemiology',
  },
  {
    value: 'american-journal-of-health-behavior',
    label: 'American Journal of Health Behavior',
  },
  {
    value: 'american-journal-of-hypertension',
    label: 'American Journal of Hypertension',
  },
  {
    value: 'american-journal-of-medical-genetics',
    label: 'American Journal of Medical Genetics',
  },
  {
    value: 'american-journal-of-neuroradiology',
    label: 'American Journal of Neuroradiology',
  },
  {
    value: 'american-journal-of-orthodontics-and-dentofacial-orthopedics',
    label: 'American Journal of Orthodontics & Dentofacial Orthopedics',
  },
  {
    value: 'american-journal-of-plant-sciences',
    label: 'American Journal of Plant Sciences',
  },
  {
    value: 'american-journal-of-political-science',
    label: 'American Journal of Political Science',
  },
  {
    value: 'american-journal-of-respiratory-and-critical-care-medicine',
    label: 'American Journal of Respiratory and Critical Care Medicine',
  },
  {
    value: 'american-journal-of-science',
    label: 'American Journal of Science',
  },
  {
    value: 'american-journal-of-sociology',
    label: 'American Journal of Sociology',
  },
  {
    value: 'american-journal-of-sonography',
    label: 'American Journal of Sonography',
  },
  {
    value: 'american-journal-of-surgical-pathology',
    label: 'American Journal of Surgical Pathology',
  },
  {
    value: 'american-journal-of-translational-research',
    label: 'American Journal of Translational Research',
  },
  {
    value: 'american-marketing-association',
    label: 'American Marketing Association',
  },
  {
    value: 'american-medical-association-10th-edition',
    label: 'American Medical Association 10th edition',
  },
  {
    value: 'american-medical-association-alphabetical',
    label: 'American Medical Association 11th edition (sorted alphabetically)',
  },
  {
    value: 'american-medical-association-brackets',
    label: 'American Medical Association 11th edition (brackets)',
  },
  {
    value: 'american-medical-association-no-et-al',
    label: 'American Medical Association 11th edition (no "et al.")',
  },
  {
    value: 'american-medical-association-no-url',
    label: 'American Medical Association 11th edition (no URL)',
  },
  {
    value: 'american-medical-association',
    label: 'American Medical Association 11th edition',
  },
  {
    value: 'american-meteorological-society',
    label: 'American Meteorological Society',
  },
  {
    value: 'american-mineralogist',
    label: 'American Mineralogist',
  },
  {
    value: 'american-nuclear-society',
    label: 'American Nuclear Society',
  },
  {
    value: 'american-physical-society-et-al',
    label: 'American Physical Society - et al. (if more than 3 authors)',
  },
  {
    value: 'american-physics-society-without-titles',
    label: 'American Physical Society (without titles)',
  },
  {
    value: 'american-physics-society',
    label: 'American Physical Society',
  },
  {
    value: 'american-physiological-society',
    label: 'American Physiological Society',
  },
  {
    value: 'american-phytopathological-society',
    label: 'American Phytopathological Society',
  },
  {
    value: 'american-political-science-association',
    label: 'American Political Science Association',
  },
  {
    value: 'american-school-of-classical-studies-at-athens',
    label: 'American School of Classical Studies at Athens',
  },
  {
    value: 'american-society-for-horticultural-science',
    label: 'American Society for Horticultural Science',
  },
  {
    value: 'american-society-for-microbiology',
    label: 'American Society for Microbiology',
  },
  {
    value: 'american-society-for-pharmacology-and-experimental-therapeutics',
    label: 'American Society for Pharmacology and Experimental Therapeutics',
  },
  {
    value: 'american-society-of-agricultural-and-biological-engineers',
    label: 'American Society of Agricultural and Biological Engineers',
  },
  {
    value: 'american-society-of-civil-engineers',
    label: 'American Society of Civil Engineers',
  },
  {
    value: 'american-society-of-mechanical-engineers',
    label: 'American Society of Mechanical Engineers',
  },
  {
    value: 'american-sociological-association',
    label: 'American Sociological Association 6th edition',
  },
  {
    value: 'american-statistical-association',
    label: 'American Statistical Association',
  },
  {
    value: 'american-veterinary-medical-association',
    label: 'American Veterinary Medical Association',
  },
  {
    value: 'amerindia',
    label: 'Amerindia',
  },
  {
    value: 'amphibia-reptilia',
    label: 'Amphibia-Reptilia',
  },
  {
    value: 'amsterdam-university-press-academic',
    label: 'Amsterdam University Press - Academic',
  },
  {
    value: 'anabases',
    label: 'Anabases',
  },
  {
    value: 'anaesthesia',
    label: 'Anaesthesia',
  },
  {
    value: 'analytical-sciences',
    label: 'Analytical Sciences',
  },
  {
    value: 'anatomical-sciences-education',
    label: 'Anatomical Sciences Education',
  },
  {
    value: 'ancilla-iuris',
    label: 'Ancilla Iuris',
  },
  {
    value: 'andean-geology',
    label: 'Andean Geology',
  },
  {
    value: 'anesthesia-and-analgesia',
    label: 'Anesthesia and Analgesia',
  },
  {
    value: 'anesthesiology',
    label: 'Anesthesiology',
  },
  {
    value: 'angewandte-chemie',
    label: 'Angewandte Chemie International Edition',
  },
  {
    value: 'angiologia',
    label: 'Angiologia (Español)',
  },
  {
    value: 'anglia',
    label: 'Anglia',
  },
  {
    value: 'animal-conservation',
    label: 'Animal Conservation',
  },
  {
    value: 'animal-migration',
    label: 'Animal Migration',
  },
  {
    value: 'animal-welfare',
    label: 'Animal Welfare',
  },
  {
    value: 'animal',
    label: 'animal',
  },
  {
    value: 'annalen-des-naturhistorischen-museums-in-wien',
    label: 'Annalen des Naturhistorischen Museums in Wien',
  },
  {
    value: 'annales-de-demographie-historique',
    label: 'Annales de démographie historique',
  },
  {
    value: 'annales',
    label: 'Annales. Histoire, Sciences sociales (Français)',
  },
  {
    value: 'annals-of-applied-biology',
    label: 'Annals of Applied Biology',
  },
  {
    value: 'annals-of-behavioral-medicine',
    label: 'Annals of Behavioral Medicine',
  },
  {
    value: 'annals-of-biomedical-engineering',
    label: 'Annals of Biomedical Engineering',
  },
  {
    value: 'annals-of-botany',
    label: 'Annals of Botany',
  },
  {
    value: 'annals-of-eye-science',
    label: 'Annals of Eye Science',
  },
  {
    value: 'annals-of-joint',
    label: 'Annals of Joint',
  },
  {
    value: 'annals-of-laboratory-medicine',
    label: 'Annals of Laboratory Medicine',
  },
  {
    value: 'annals-of-neurology',
    label: 'Annals of Neurology',
  },
  {
    value: 'annals-of-oncology',
    label: 'Annals of Oncology',
  },
  {
    value: 'annals-of-public-and-cooperative-economics',
    label: 'Annals of Public and Cooperative Economics',
  },
  {
    value: 'annals-of-surgery',
    label: 'Annals of Surgery',
  },
  {
    value: 'annals-of-the-association-of-american-geographers',
    label: 'Annals of the Association of American Geographers',
  },
  {
    value: 'annals-of-the-new-york-academy-of-sciences',
    label: 'Annals of the New York Academy of Sciences',
  },
  {
    value: 'annals-of-work-exposures-and-health',
    label: 'Annals of Work Exposures and Health',
  },
  {
    value: 'annual-review-of-astronomy-and-astrophysics',
    label: 'Annual Review of Astronomy and Astrophysics',
  },
  {
    value: 'annual-review-of-linguistics',
    label: 'Annual Review of Linguistics',
  },
  {
    value: 'annual-review-of-medicine',
    label: 'Annual Review of Medicine',
  },
  {
    value: 'annual-review-of-nuclear-and-particle-science',
    label: 'Annual Review of Nuclear and Particle Science',
  },
  {
    value: 'annual-reviews-alphabetical',
    label: 'Annual Reviews (sorted alphabetically)',
  },
  {
    value: 'annual-reviews-author-date',
    label: 'Annual Reviews (author-date)',
  },
  {
    value: 'annual-reviews-without-titles',
    label: 'Annual Reviews (sorted by order of appearance, without titles)',
  },
  {
    value: 'annual-reviews',
    label: 'Annual Reviews (sorted by order of appearance)',
  },
  {
    value: 'antarctic-science',
    label: 'Antarctic Science',
  },
  {
    value: 'anthropologie-et-societes',
    label: 'Anthropologie et Sociétés (Français)',
  },
  {
    value: 'anti-trafficking-review',
    label: 'Anti-Trafficking Review',
  },
  {
    value: 'anticancer-research',
    label: 'Anticancer Research',
  },
  {
    value: 'antipode',
    label: 'Antipode',
  },
  {
    value: 'antiquites-africaines',
    label: 'Antiquités africaines',
  },
  {
    value: 'antiquity',
    label: 'Antiquity',
  },
  {
    value: 'apa-5th-edition',
    label: 'American Psychological Association 5th edition',
  },
  {
    value: 'apa-6th-edition-no-ampersand',
    label: 'American Psychological Association 6th edition (no ampersand)',
  },
  {
    value: 'apa-6th-edition',
    label: 'American Psychological Association 6th edition',
  },
  {
    value: 'apa-annotated-bibliography',
    label:
      'American Psychological Association 7th edition (annotated bibliography)',
  },
  {
    value: 'apa-cv',
    label:
      'American Psychological Association 7th edition (curriculum vitae, sorted by descending date)',
  },
  {
    value: 'apa-fr-provost',
    label:
      'American Psychological Association 6th edition (Provost) (Français - Canada)',
  },
  {
    value: 'apa-no-ampersand',
    label: 'American Psychological Association 7th edition (no ampersand)',
  },
  {
    value: 'apa-no-doi-no-issue',
    label:
      'American Psychological Association 6th edition (no DOIs, no issue numbers)',
  },
  {
    value: 'apa-no-initials',
    label: 'American Psychological Association 7th edition (no initials)',
  },
  {
    value: 'apa-numeric-superscript-brackets',
    label: 'American Psychological Association 7th edition (numeric, brackets)',
  },
  {
    value: 'apa-numeric-superscript',
    label:
      'American Psychological Association 7th edition (numeric, superscript)',
  },
  {
    value: 'apa-old-doi-prefix',
    label: 'American Psychological Association 6th edition ("doi:" DOI prefix)',
  },
  {
    value: 'apa-single-spaced',
    label:
      'American Psychological Association 7th edition (single-spaced bibliography)',
  },
  {
    value: 'apa-tr',
    label: 'American Psychological Association 6th edition (Türkçe)',
  },
  {
    value: 'apa-with-abstract',
    label: 'American Psychological Association 7th edition (with abstract)',
  },
  {
    value: 'apa',
    label: 'American Psychological Association 7th edition',
  },
  {
    value: 'aporia-the-nursing-journal',
    label: 'Aporia: The Nursing Journal',
  },
  {
    value: 'applied-clay-science',
    label: 'Applied Clay Science',
  },
  {
    value: 'applied-spectroscopy-reviews',
    label: 'Applied Spectroscopy Reviews',
  },
  {
    value: 'applied-spectroscopy',
    label: 'Applied Spectroscopy',
  },
  {
    value: 'aquatic-conservation',
    label: 'Aquatic Conservation: Marine and Freshwater Ecosystems',
  },
  {
    value: 'aquatic-invasions',
    label: 'Aquatic Invasions',
  },
  {
    value: 'aquatic-living-resources',
    label: 'Aquatic Living Resources',
  },
  {
    value: 'aquitania',
    label: 'Aquitania (Français)',
  },
  {
    value: 'arachne',
    label: 'Arachne',
  },
  {
    value: 'arachnology',
    label: 'Arachnology',
  },
  {
    value: 'arbok-hins-islenzka-fornleifafelags',
    label: 'Árbók Hins íslenzka fornleifafélags (Íslenska)',
  },
  {
    value: 'archaeologia-austriaca',
    label: 'Archaeologia Austriaca',
  },
  {
    value: 'archaeometry',
    label: 'Archaeometry',
  },
  {
    value: 'archaeonautica',
    label: 'Archaeonautica',
  },
  {
    value: 'archeologia-classica',
    label: 'Archeologia Classica (Italiano)',
  },
  {
    value: 'archeologicke-rozhledy',
    label: 'Archeologické rozhledy',
  },
  {
    value: 'archeologie-medievale',
    label: 'Archéologie médiévale (Français)',
  },
  {
    value: 'archeologies-et-sciences-de-lantiquite',
    label: "Archéologies et Sciences de l'Antiquité (Français)",
  },
  {
    value: 'archeosciences',
    label: 'ArcheoSciences (Français)',
  },
  {
    value: 'archiv-fur-die-civilistische-praxis',
    label: 'Archiv für die civilistische Praxis (Deutsch)',
  },
  {
    value: 'archiv-fur-geschichte-der-philosophie',
    label: 'Archiv für Geschichte der Philosophie',
  },
  {
    value: 'archives-of-hand-and-microsurgery',
    label: 'Archives of Hand and Microsurgery',
  },
  {
    value: 'archives-of-physical-medicine-and-rehabilitation',
    label: 'Archives of Physical Medicine and Rehabilitation',
  },
  {
    value: 'archivos-de-bronconeumologia',
    label: 'Archivos de Bronconeumología',
  },
  {
    value: 'archivos-de-la-sociedad-espanola-de-oftalmologia',
    label: 'Archivos de la Sociedad Española de Oftalmología (Español)',
  },
  {
    value: 'archivum-latinitatis-medii-aevi',
    label: 'Archivum Latinitatis Medii Aevi (Français)',
  },
  {
    value: 'arctic-antarctic-and-alpine-research',
    label: 'Arctic, Antarctic, and Alpine Research',
  },
  {
    value: 'arctic',
    label: 'Arctic',
  },
  {
    value: 'arhiv-za-higijenu-rada-i-toksikologiju',
    label:
      'Arhiv za higijenu rada i toksikologiju (Archives of Industrial Hygiene and Toxicology)',
  },
  {
    value: 'art-history',
    label: 'Art History',
  },
  {
    value: 'art-libraries-society-of-north-america-arlisna-reviews',
    label: 'Art Libraries Society of North America: ARLIS/NA Reviews',
  },
  {
    value: 'artery-research',
    label: 'Artery Research',
  },
  {
    value: 'arthritis-and-rheumatism',
    label: 'Arthritis & Rheumatism',
  },
  {
    value: 'arthropod-systematics-and-phylogeny',
    label: 'Arthropod Systematics & Phylogeny',
  },
  {
    value: 'arts-university-bournemouth',
    label: 'Arts University Bournemouth',
  },
  {
    value: 'arzneimitteltherapie',
    label: 'Arzneimitteltherapie',
  },
  {
    value: 'asa-cssa-sssa',
    label:
      'American Society of Agronomy, Crop Science Society of America, Soil Science Society of America',
  },
  {
    value: 'asaio-journal',
    label: 'ASAIO Journal (American Society for Artificial Internal Organs)',
  },
  {
    value: 'asia-and-the-pacific-policy-studies',
    label: 'Asia & the Pacific Policy Studies',
  },
  {
    value: 'asia-pacific-journal-of-human-resources',
    label: 'Asia Pacific Journal of Human Resources',
  },
  {
    value: 'asian-journal-of-neurosurgery',
    label: 'Asian Journal of Neurosurgery',
  },
  {
    value: 'asian-myrmecology',
    label: 'Asian Myrmecology',
  },
  {
    value: 'asian-studies-review',
    label: 'Asian Studies Review',
  },
  {
    value: 'associacao-brasileira-de-normas-tecnicas-eceme',
    label:
      'Escola de Comando e Estado-Maior do Exército - ABNT (Português - Brasil)',
  },
  {
    value: 'associacao-brasileira-de-normas-tecnicas-instituto-meira-mattos',
    label:
      'Escola de Comando e Estado-Maior do Exército - Instituto Meira Mattos - ABNT (Português - Brasil)',
  },
  {
    value: 'associacao-brasileira-de-normas-tecnicas-ipea',
    label:
      'Instituto de Pesquisa Econômica Aplicada - ABNT (Português - Brasil)',
  },
  {
    value: 'associacao-brasileira-de-normas-tecnicas-note',
    label:
      'Associação Brasileira de Normas Técnicas (note, Português - Brasil)',
  },
  {
    value: 'associacao-brasileira-de-normas-tecnicas-ufmg-face-full',
    label:
      'Universidade Federal de Minas Gerais - Faculdade de Ciências Econômicas - ABNT (autoria completa) (Português - Brasil)',
  },
  {
    value: 'associacao-brasileira-de-normas-tecnicas-ufmg-face-initials',
    label:
      'Universidade Federal de Minas Gerais - Faculdade de Ciências Econômicas - ABNT (autoria abreviada) (Português - Brasil)',
  },
  {
    value: 'associacao-brasileira-de-normas-tecnicas-ufpr',
    label: 'Universidade Federal do Paraná - ABNT (Português - Brasil)',
  },
  {
    value: 'associacao-brasileira-de-normas-tecnicas-ufrgs-initials',
    label:
      'Universidade Federal do Rio Grande do Sul - ABNT (autoria abreviada) (Português - Brasil)',
  },
  {
    value:
      'associacao-brasileira-de-normas-tecnicas-ufrgs-note-initials-with-ibid',
    label:
      'Universidade Federal do Rio Grande do Sul - ABNT (autoria abreviada, nota, com Ibid.) (Português - Brasil)',
  },
  {
    value: 'associacao-brasileira-de-normas-tecnicas-ufrgs',
    label:
      'Universidade Federal do Rio Grande do Sul - ABNT (autoria completa) (Português - Brasil)',
  },
  {
    value: 'associacao-brasileira-de-normas-tecnicas-ufs',
    label: 'Universidade Federal de Sergipe - ABNT (Português - Brasil)',
  },
  {
    value: 'associacao-brasileira-de-normas-tecnicas-unirio-eipp',
    label:
      'Universidade Federal do Estado do Rio de Janeiro - Educação Infantil e Políticas Públicas - ABNT (Português - Brasil)',
  },
  {
    value: 'associacao-brasileira-de-normas-tecnicas-usp-fmvz',
    label:
      'Universidade de São Paulo - Faculdade de Medicina Veterinária e Zootecnia - ABNT (Português - Brasil)',
  },
  {
    value: 'associacao-brasileira-de-normas-tecnicas',
    label: 'Associação Brasileira de Normas Técnicas (Português - Brasil)',
  },
  {
    value: 'associacao-nacional-de-pesquisa-e-ensino-em-transportes',
    label:
      'ANPET - Congresso de Pesquisa e Ensino em Transportes (Português - Brasil)',
  },
  {
    value: 'association-de-science-regionale-de-langue-francaise',
    label: 'Association de Science Régionale de Langue Française (Français)',
  },
  {
    value: 'association-for-computational-linguistics',
    label: 'Association for Computational Linguistics - Conference Proceedings',
  },
  {
    value: 'association-for-computing-machinery',
    label: 'Association for Computing Machinery',
  },
  {
    value: 'atlande',
    label: 'Atlande (author-date, Français)',
  },
  {
    value: 'atlas-of-genetics-and-cytogenetics-in-oncology-and-haematology',
    label: 'Atlas of Genetics and Cytogenetics in Oncology and Haematology',
  },
  {
    value: 'ausonius-editions',
    label: 'Ausonius Éditions (Français)',
  },
  {
    value: 'austral-ecology',
    label: 'Austral Ecology',
  },
  {
    value: 'austral-entomology',
    label: 'Austral Entomology',
  },
  {
    value: 'australian-archaeology',
    label: 'Australian Archaeology',
  },
  {
    value: 'australian-critical-care',
    label: 'Australian Critical Care',
  },
  {
    value: 'australian-dental-journal',
    label: 'Australian Dental Journal',
  },
  {
    value: 'australian-guide-to-legal-citation-3rd-edition',
    label: 'Australian Guide to Legal Citation 3rd edition',
  },
  {
    value: 'australian-guide-to-legal-citation',
    label: 'Australian Guide to Legal Citation 4th edition',
  },
  {
    value: 'australian-historical-studies',
    label: 'Australian Historical Studies',
  },
  {
    value: 'australian-journal-of-earth-sciences',
    label: 'Australian Journal of Earth Sciences',
  },
  {
    value: 'australian-journal-of-grape-and-wine-research',
    label: 'Australian Journal of Grape and Wine Research',
  },
  {
    value: 'australian-road-research-board',
    label: 'Australian Road Research Board',
  },
  {
    value: 'australian-veterinary-journal',
    label: 'Australian Veterinary Journal',
  },
  {
    value: 'austrian-journal-of-development-studies',
    label:
      'Austrian Journal of Development Studies (Journal für Entwicklungspolitik)',
  },
  {
    value: 'austrian-legal',
    label: 'Austrian Legal (Deutsch - Österreich)',
  },
  {
    value: 'avian-conservation-and-ecology',
    label: 'Avian Conservation and Ecology',
  },
  {
    value: 'avian-diseases',
    label: 'Avian Diseases',
  },
  {
    value: 'avian-pathology',
    label: 'Avian Pathology',
  },
  {
    value: 'ayer',
    label: 'Ayer (Español)',
  },
  {
    value:
      'azr-abkurzungs-und-zitierregeln-der-osterreichischen-rechtssprache-und-europarechtlicher-rechtsquellen',
    label:
      'AZR - Abkürzungs- und Zitierregeln der österreichischen Rechtssprache und europarechtlicher Rechtsquellen (Deutsch - Österreich)',
  },
  {
    value: 'babes-bolyai-university-faculty-of-orthodox-theology',
    label:
      'Babes-Bolyai University - Faculty of Orthodox Theology (no ibid., Română)',
  },
  {
    value: 'babesch-annual-papers-on-mediterranean-archaeology',
    label: 'BABESCH - Annual Papers on Mediterranean Archaeology',
  },
  {
    value: 'baghdad-science-journal',
    label: 'Baghdad Science Journal',
  },
  {
    value: 'baishideng-publishing-group',
    label: 'Baishideng Publishing Group',
  },
  {
    value: 'bakhtiniana-journal-of-discourse-studies',
    label: 'Bakhtiniana: Journal of Discourse Studies',
  },
  {
    value: 'begell-house-apa',
    label: 'Begell House - APA',
  },
  {
    value: 'begell-house-chicago-author-date',
    label: 'Begell House - Chicago Manual of Style',
  },
  {
    value: 'behaviour',
    label: 'Behaviour',
  },
  {
    value: 'beilstein-journal-of-organic-chemistry',
    label: 'Beilstein Journal of Organic Chemistry',
  },
  {
    value: 'beltz-padagogik',
    label: 'Beltz - Pädagogik (Deutsch)',
  },
  {
    value: 'berghahn-books-author-date-en-gb',
    label: 'Berghahn Books (author-date, English - UK)',
  },
  {
    value:
      'berlin-school-of-economics-and-law-international-marketing-management',
    label:
      'Berlin School of Economics and Law - International Marketing Management',
  },
  {
    value:
      'bern-university-of-applied-sciences-school-of-agricultural-forest-and-food-sciences-hafl',
    label:
      'Bern University of Applied Sciences - School of Agricultural, Forest and Food Sciences HAFL (author-date)',
  },
  {
    value: 'betriebswirtschaftliche-forschung-und-praxis',
    label: 'Betriebswirtschaftliche Forschung und Praxis (Deutsch)',
  },
  {
    value: 'biblio-3w',
    label: 'Biblio 3W (Español)',
  },
  {
    value: 'bibliothecae-it',
    label: 'Bibliothecae.it (Italiano)',
  },
  {
    value: 'bibliotheque-d-archeologie-mediterraneenne-et-africaine-biama',
    label:
      "Bibliothèque d'archéologie méditerranéenne et africaine (BiAMA) (Français)",
  },
  {
    value: 'bibliotheque-universitaire-de-medecine-vancouver',
    label: 'Bibliothèque universitaire de médecine - Vancouver (Français)',
  },
  {
    value: 'bibtex',
    label: 'BibTeX generic citation style',
  },
  {
    value: 'biens-symboliques-symbolic-goods',
    label: 'Biens symboliques / Symbolic Goods',
  },
  {
    value: 'bioarchaeology-international',
    label: 'Bioarchaeology International',
  },
  {
    value: 'bioarchaeology-of-the-near-east',
    label: 'Bioarchaeology of the Near East',
  },
  {
    value: 'biochemical-journal',
    label: 'Biochemical Journal',
  },
  {
    value: 'biochemical-society-transactions',
    label: 'Biochemical Society Transactions',
  },
  {
    value: 'biochemistry-and-molecular-biology-education',
    label: 'Biochemistry and Molecular Biology Education',
  },
  {
    value: 'biochemistry',
    label: 'Biochemistry',
  },
  {
    value: 'biochimica-et-biophysica-acta',
    label: 'Biochimica et Biophysica Acta',
  },
  {
    value: 'bioelectromagnetics',
    label: 'Bioelectromagnetics',
  },
  {
    value: 'bioinformatics',
    label: 'Bioinformatics',
  },
  {
    value: 'biologia',
    label: 'Biologia',
  },
  {
    value: 'biological-and-pharmaceutical-bulletin',
    label: 'Biological and Pharmaceutical Bulletin',
  },
  {
    value: 'biological-journal-of-the-linnean-society',
    label: 'Biological Journal of the Linnean Society',
  },
  {
    value: 'biological-psychiatry',
    label: 'Biological Psychiatry',
  },
  {
    value: 'biological-reviews',
    label: 'Biological Reviews',
  },
  {
    value: 'biology-of-reproduction',
    label: 'Biology of Reproduction',
  },
  {
    value: 'biomarkers',
    label: 'Biomarkers',
  },
  {
    value: 'biomed-central',
    label: 'BioMed Central',
  },
  {
    value: 'biomed-research-international',
    label: 'BioMed Research International',
  },
  {
    value: 'biometrics',
    label: 'Biometrics',
  },
  {
    value: 'biophysical-journal',
    label: 'Biophysical Journal',
  },
  {
    value: 'biophysics-and-physicobiology',
    label: 'Biophysics and Physicobiology',
  },
  {
    value: 'biopolymers',
    label: 'Biopolymers',
  },
  {
    value: 'bioresources',
    label: 'BioResources',
  },
  {
    value: 'bioscience',
    label: 'BioScience',
  },
  {
    value: 'biosocieties',
    label: 'BioSocieties',
  },
  {
    value: 'biostatistics',
    label: 'Biostatistics',
  },
  {
    value: 'biota-neotropica',
    label: 'Biota Neotropica',
  },
  {
    value: 'biotechniques',
    label: 'BioTechniques',
  },
  {
    value: 'biotechnology-and-bioengineering',
    label: 'Biotechnology and Bioengineering',
  },
  {
    value: 'biotropica',
    label: 'Biotropica',
  },
  {
    value: 'bitonline',
    label: 'b.i.t.online (note, Deutsch)',
  },
  {
    value: 'biuletyn-polskiego-towarzystwa-jezykoznawczego',
    label: 'Biuletyn Polskiego Towarzystwa Językoznawczego (Polski)',
  },
  {
    value: 'blood',
    label: 'Blood',
  },
  {
    value: 'bloomsbury-academic',
    label: 'Bloomsbury Academic',
  },
  {
    value: 'bluebook-inline',
    label: 'Bluebook Inline',
  },
  {
    value: 'bluebook-law-review',
    label: 'Bluebook Law Review',
  },
  {
    value: 'bluebook2',
    label: 'Bluebook Law Review (2)',
  },
  {
    value: 'bmj',
    label: 'BMJ',
  },
  {
    value: 'body-and-society',
    label: 'Body & Society',
  },
  {
    value: 'boletin-de-la-sociedad-geologica-mexicana',
    label: 'Boletín de la Sociedad Geológica Mexicana (Español - Mexico)',
  },
  {
    value: 'boletin-de-pediatria',
    label: 'Boletín de Pediatría (Español)',
  },
  {
    value: 'bollettino-d-archeologia-online',
    label: "Bollettino d'archeologia online (Italiano)",
  },
  {
    value: 'boreal-environment-research',
    label: 'Boreal Environment Research',
  },
  {
    value: 'bourgogne-franche-comte-nature',
    label: 'Bourgogne-Franche-Comté Nature (Français)',
  },
  {
    value: 'brachytherapy',
    label: 'Brachytherapy',
  },
  {
    value: 'brain-behavior-and-evolution',
    label: 'Brain, Behavior and Evolution',
  },
  {
    value:
      'brazilian-journal-of-experimental-design-data-analysis-and-inferential-statistics',
    label:
      'Brazilian Journal of Experimental Design, Data Analysis and Inferential Statistics',
  },
  {
    value: 'brazilian-journal-of-infectious-diseases',
    label: 'Brazilian Journal of Infectious Diseases',
  },
  {
    value: 'brazilian-journal-of-psychiatry',
    label: 'Brazilian Journal of Psychiatry',
  },
  {
    value: 'brazilian-journal-of-veterinary-research-and-animal-science',
    label: 'Brazilian Journal of Veterinary Research and Animal Science',
  },
  {
    value: 'brazilian-oral-research',
    label: 'Brazilian Oral Research',
  },
  {
    value: 'brewingscience',
    label: 'BrewingScience',
  },
  {
    value: 'briefings-in-bioinformatics',
    label: 'Briefings in Bioinformatics',
  },
  {
    value: 'british-journal-of-anaesthesia',
    label: 'British Journal of Anaesthesia',
  },
  {
    value: 'british-journal-of-cancer',
    label: 'British Journal of Cancer',
  },
  {
    value: 'british-journal-of-dermatology',
    label: 'British Journal of Dermatology',
  },
  {
    value: 'british-journal-of-haematology',
    label: 'British Journal of Haematology',
  },
  {
    value: 'british-journal-of-industrial-relations',
    label: 'British Journal of Industrial Relations',
  },
  {
    value: 'british-journal-of-pharmacology',
    label: 'British Journal of Pharmacology',
  },
  {
    value: 'british-journal-of-political-science',
    label: 'British Journal of Political Science',
  },
  {
    value: 'british-journal-of-surgery',
    label: 'British Journal of Surgery',
  },
  {
    value: 'budownictwo-i-architektura-pl',
    label: 'Budownictwo i Architektura',
  },
  {
    value: 'building-structure',
    label: 'Building Structure (中文)',
  },
  {
    value: 'buletin-agrohorti',
    label: 'Buletin Agrohorti',
  },
  {
    value: 'bulletin-de-correspondance-hellenique',
    label: 'Bulletin de correspondance hellénique',
  },
  {
    value: 'bulletin-de-la-societe-entomologique-de-france',
    label: 'Bulletin de la Société Entomologique de France',
  },
  {
    value: 'bulletin-de-la-societe-prehistorique-francaise',
    label: 'Bulletin de la Société préhistorique française (Français)',
  },
  {
    value: 'bulletin-du-centre-detudes-medievales-dauxerre',
    label: 'Bulletin du Centre d’études médiévales d’Auxerre (Français)',
  },
  {
    value: 'bulletin-of-geosciences',
    label: 'Bulletin of Geosciences',
  },
  {
    value: 'bulletin-of-marine-science',
    label: 'Bulletin of Marine Science',
  },
  {
    value: 'bulletin-of-the-american-schools-of-oriental-research',
    label: 'Bulletin of the American Schools of Oriental Research',
  },
  {
    value: 'bulletin-of-the-seismological-society-of-america',
    label: 'Bulletin of the Seismological Society of America',
  },
  {
    value: 'bursa-uludag-universitesi-egitim-bilimleri-enstitusu',
    label: 'Bursa Uludağ Üniversitesi - Eğitim Bilimleri Enstitüsü',
  },
  {
    value: 'bursa-uludag-universitesi-fen-bilimleri-enstitusu',
    label: 'Bursa Uludag Üniversitesi Fen Bilimleri Enstitüsü',
  },
  {
    value: 'bursa-uludag-universitesi-saglik-bilimleri-enstitusu',
    label: 'Bursa Uludağ Üniversitesi - Sağlık Bilimleri Enstitüsü',
  },
  {
    value: 'bursa-uludag-universitesi-sosyal-bilimler-enstitusu-metinici-atif',
    label:
      'Bursa Uludağ Üniversitesi - Sosyal Bilimler Enstitüsü (metinici atif)',
  },
  {
    value: 'bursa-uludag-universitesi-sosyal-bilimler-enstitusu',
    label: 'Bursa Uludağ Üniversitesi - Sosyal Bilimler Enstitüsü',
  },
  {
    value: 'business-ethics-a-european-review',
    label: 'Business Ethics: A European Review',
  },
  {
    value: 'byzantina-symmeikta',
    label: 'BYZANTINA SYMMEIKTA',
  },
  {
    value: 'byzantine-and-modern-greek-studies',
    label: 'Byzantine and Modern Greek Studies',
  },
  {
    value: 'cahiers-d-ethnomusicologie',
    label: "Cahiers d'ethnomusicologie (Français)",
  },
  {
    value: 'cahiers-du-centre-gustave-glotz',
    label: 'Cahiers du Centre Gustave-Glotz (Français)',
  },
  {
    value: 'california-agriculture',
    label: 'California Agriculture',
  },
  {
    value: 'cambridge-journal-of-economics',
    label: 'Cambridge Journal of Economics',
  },
  {
    value: 'cambridge-university-press-author-date',
    label: 'Cambridge University Press (author-date)',
  },
  {
    value: 'cambridge-university-press-law-note',
    label: 'Cambridge University Press - Law (note)',
  },
  {
    value: 'cambridge-university-press-note',
    label: 'Cambridge University Press (note)',
  },
  {
    value: 'cambridge-university-press-numeric',
    label: 'Cambridge University Press (numeric)',
  },
  {
    value: 'campus-adventiste-du-saleve-faculte-adventiste-de-theologie',
    label:
      'Campus adventiste du Salève - Faculté adventiste de théologie (Français)',
  },
  {
    value: 'canadian-biosystems-engineering',
    label: 'Canadian Biosystems Engineering',
  },
  {
    value: 'canadian-geotechnical-journal',
    label: 'Canadian Geotechnical Journal',
  },
  {
    value: 'canadian-journal-of-chemistry',
    label: 'Canadian Journal of Chemistry',
  },
  {
    value: 'canadian-journal-of-dietetic-practice-and-research',
    label: 'Canadian Journal of Dietetic Practice and Research',
  },
  {
    value: 'canadian-journal-of-earth-sciences',
    label: 'Canadian Journal of Earth Sciences',
  },
  {
    value: 'canadian-journal-of-economics',
    label: 'Canadian Journal of Economics',
  },
  {
    value: 'canadian-journal-of-fisheries-and-aquatic-sciences',
    label: 'Canadian Journal of Fisheries and Aquatic Sciences',
  },
  {
    value: 'canadian-journal-of-physics',
    label: 'Canadian Journal of Physics',
  },
  {
    value: 'canadian-journal-of-public-health',
    label: 'Canadian Journal of Public Health',
  },
  {
    value: 'canadian-journal-of-soil-science',
    label: 'Canadian Journal of Soil Science',
  },
  {
    value: 'canadian-public-policy',
    label: 'Canadian Public Policy',
  },
  {
    value: 'cancer-biomarkers',
    label: 'Cancer Biomarkers',
  },
  {
    value: 'cancer-drug-resistance',
    label: 'Cancer Drug Resistance',
  },
  {
    value: 'cancer-translational-medicine',
    label: 'Cancer Translational Medicine',
  },
  {
    value: 'carcinogenesis',
    label: 'Carcinogenesis',
  },
  {
    value: 'cardiff-university-harvard',
    label: 'Cardiff University - Harvard',
  },
  {
    value: 'cardiff-university-vancouver',
    label: 'Cardiff University - Vancouver',
  },
  {
    value: 'cardiocore',
    label: 'Cardiocore (Español)',
  },
  {
    value: 'cath-lab-digest',
    label: 'Cath Lab Digest',
  },
  {
    value: 'catholic-biblical-association',
    label: 'Catholic Biblical Association (full note)',
  },
  {
    value: 'cell-numeric-superscript',
    label: 'Cell journals (numeric, superscript)',
  },
  {
    value: 'cell-numeric',
    label: 'Cell journals (numeric)',
  },
  {
    value: 'cell-research',
    label: 'Cell Research',
  },
  {
    value: 'cell-structure-and-function',
    label: 'Cell Structure and Function',
  },
  {
    value: 'cell-transplantation',
    label: 'Cell Transplantation',
  },
  {
    value: 'cell',
    label: 'Cell',
  },
  {
    value: 'cellular-and-molecular-bioengineering',
    label: 'Cellular and Molecular Bioengineering',
  },
  {
    value: 'cellular-and-molecular-gastroenterology-and-hepatology',
    label: 'Cellular and Molecular Gastroenterology and Hepatology',
  },
  {
    value: 'centaurus',
    label: 'Centaurus',
  },
  {
    value:
      'centre-de-recherche-sur-les-civilisations-de-l-asie-orientale-auteur-date',
    label:
      'Centre de recherche sur les civilisations de l’Asie orientale (Français - Auteur, Date)',
  },
  {
    value: 'centre-de-recherche-sur-les-civilisations-de-l-asie-orientale',
    label:
      "Centre de recherche sur les civilisations de l'Asie orientale (Français - note)",
  },
  {
    value: 'cerebral-cortex',
    label: 'Cerebral Cortex',
  },
  {
    value:
      'ceska-zemedelska-univerzita-v-praze-fakulta-agrobiologie-potravinovych-a-prirodnich-zdroju',
    label:
      'Česká zemědělská univerzita v Praze - Fakulta agrobiologie, potravinových a přírodních zdrojů',
  },
  {
    value: 'changer-d-epoque',
    label: "Changer d'époque (Français)",
  },
  {
    value: 'chemical-and-pharmaceutical-bulletin',
    label: 'Chemical and Pharmaceutical Bulletin',
  },
  {
    value: 'chemical-biology-and-drug-design',
    label: 'Chemical Biology & Drug Design',
  },
  {
    value: 'chemical-engineering-progress',
    label: 'Chemical Engineering Progress',
  },
  {
    value: 'chemical-senses',
    label: 'Chemical Senses',
  },
  {
    value: 'chemie-ingenieur-technik',
    label: 'Chemie Ingenieur Technik',
  },
  {
    value: 'chemistry-education-research-and-practice',
    label: 'Chemistry Education Research and Practice',
  },
  {
    value: 'chest',
    label: 'Chest',
  },
  {
    value: 'chicago-annotated-bibliography',
    label:
      'Chicago Manual of Style 17th edition (note, annotated bibliography)',
  },
  {
    value: 'chicago-author-date-16th-edition',
    label: 'Chicago Manual of Style 16th edition (author-date)',
  },
  {
    value: 'chicago-author-date-basque',
    label: 'Chicago Manual of Style 16th edition (author-date, Euskara)',
  },
  {
    value: 'chicago-author-date-de',
    label: 'Chicago Manual of Style 16th edition (author-date, Deutsch)',
  },
  {
    value: 'chicago-author-date-fr',
    label: 'Chicago Manual of Style 17th edition (author-date, Français)',
  },
  {
    value: 'chicago-author-date',
    label: 'Chicago Manual of Style 17th edition (author-date)',
  },
  {
    value: 'chicago-figures',
    label: 'Chicago Manual of Style 16th edition (figures and illustrations)',
  },
  {
    value: 'chicago-fullnote-bibliography-16th-edition',
    label: 'Chicago Manual of Style 16th edition (full note)',
  },
  {
    value: 'chicago-fullnote-bibliography-fr',
    label: 'Chicago Manual of Style 17th edition (full note, Français)',
  },
  {
    value: 'chicago-fullnote-bibliography-short-title-subsequent',
    label:
      'Chicago Manual of Style 17th edition (full note, short title subsequent)',
  },
  {
    value: 'chicago-fullnote-bibliography-with-ibid',
    label: 'Chicago Manual of Style 17th edition (full note, with Ibid.)',
  },
  {
    value: 'chicago-fullnote-bibliography',
    label: 'Chicago Manual of Style 17th edition (full note)',
  },
  {
    value: 'chicago-library-list',
    label: 'Chicago Manual of Style 17th edition (library list)',
  },
  {
    value: 'chicago-note-bibliography-16th-edition',
    label: 'Chicago Manual of Style 16th edition (note)',
  },
  {
    value: 'chicago-note-bibliography-with-ibid',
    label: 'Chicago Manual of Style 17th edition (note, with Ibid.)',
  },
  {
    value: 'chicago-note-bibliography',
    label: 'Chicago Manual of Style 17th edition (note)',
  },
  {
    value: 'chimia',
    label: 'CHIMIA',
  },
  {
    value: 'china-information',
    label: 'China Information',
  },
  {
    value: 'china-national-standard-gb-t-7714-2015-author-date',
    label: 'China National Standard GB/T 7714-2015 (author-date, 中文)',
  },
  {
    value: 'china-national-standard-gb-t-7714-2015-note',
    label: 'China National Standard GB/T 7714-2015 (note, 中文)',
  },
  {
    value: 'china-national-standard-gb-t-7714-2015-numeric',
    label: 'China National Standard GB/T 7714-2015 (numeric, 中文)',
  },
  {
    value: 'chinese-gb7714-1987-numeric',
    label: 'China National Standard GB/T 7714-1987 (numeric, 中文)',
  },
  {
    value: 'chinese-gb7714-2005-author-date',
    label: 'China National Standard GB/T 7714-2005 (author-date, 中文)',
  },
  {
    value: 'chinese-gb7714-2005-numeric',
    label: 'China National Standard GB/T 7714-2005 (numeric, 中文)',
  },
  {
    value: 'chinese-journal-of-aeronautics',
    label: 'Chinese Journal of Aeronautics',
  },
  {
    value: 'chinese-medical-journal',
    label: 'Chinese Medical Journal',
  },
  {
    value:
      'chroniques-des-activites-archeologiques-de-l-ecole-francaise-de-rome',
    label:
      "Chroniques des activités archéologiques de l'Ecole française de Rome",
  },
  {
    value: 'chungara-revista-de-antropologia-chilena',
    label: 'Chungara Revista de Antropología Chilena (Español - Chile)',
  },
  {
    value: 'circulation-journal',
    label: 'Circulation Journal',
  },
  {
    value: 'circulation',
    label: 'Circulation',
  },
  {
    value: 'cirugia-cardiovascular',
    label: 'Cirugia Cardiovascular (Español)',
  },
  {
    value: 'citation-compass-apa-note',
    label: 'Citation Compass (Kildekompasset) - APA (note)',
  },
  {
    value: 'citizen-science-theory-and-practice',
    label: 'Citizen Science: Theory and Practice',
  },
  {
    value: 'civilta-italiana',
    label: 'Civiltà Italiana (Italiano)',
  },
  {
    value: 'civitas-revista-de-ciencias-sociais',
    label: 'Civitas: Revista de Ciências Sociais',
  },
  {
    value: 'cladistics',
    label: 'Cladistics',
  },
  {
    value: 'clara-architecture-recherche',
    label: 'CLARA Architecture/Recherche (Français)',
  },
  {
    value: 'clay-minerals',
    label: 'Clay Minerals',
  },
  {
    value: 'clays-and-clay-minerals',
    label: 'Clays and Clay Minerals',
  },
  {
    value: 'climate-change-economics',
    label: 'Climate Change Economics',
  },
  {
    value: 'clinica-e-investigacion-en-arteriosclerosis',
    label: 'Clínica e Investigación en Arteriosclerosis (Español)',
  },
  {
    value: 'clinical-anatomy',
    label: 'Clinical Anatomy',
  },
  {
    value: 'clinical-dysmorphology',
    label: 'Clinical Dysmorphology',
  },
  {
    value: 'clinical-gastroenterology-and-hepatology',
    label: 'Clinical Gastroenterology and Hepatology',
  },
  {
    value: 'clinical-hemorheology-and-microcirculation',
    label: 'Clinical Hemorheology and Microcirculation',
  },
  {
    value: 'clinical-infectious-diseases',
    label: 'Clinical Infectious Diseases',
  },
  {
    value: 'clinical-journal-of-sport-medicine',
    label: 'Clinical Journal of Sport Medicine',
  },
  {
    value: 'clinical-journal-of-the-american-society-of-nephrology',
    label: 'Clinical Journal of the American Society of Nephrology',
  },
  {
    value: 'clinical-management-issues',
    label: 'Clinical Management Issues',
  },
  {
    value: 'clinical-nuclear-medicine',
    label: 'Clinical Nuclear Medicine',
  },
  {
    value: 'clinical-oral-implants-research',
    label: 'Clinical Oral Implants Research',
  },
  {
    value: 'clinical-orthopaedics-and-related-research',
    label: 'Clinical Orthopaedics and Related Research',
  },
  {
    value: 'clinical-otolaryngology',
    label: 'Clinical Otolaryngology',
  },
  {
    value: 'clinical-pharmacology-and-therapeutics',
    label: 'Clinical Pharmacology & Therapeutics',
  },
  {
    value: 'clinical-physiology-and-functional-imaging',
    label: 'Clinical Physiology and Functional Imaging',
  },
  {
    value: 'clinical-radiology',
    label: 'Clinical Radiology',
  },
  {
    value: 'clinical-spine-surgery',
    label: 'Clinical Spine Surgery',
  },
  {
    value: 'clio-medica',
    label: 'Clio Medica',
  },
  {
    value: 'cns-and-neurological-disorders-drug-targets',
    label: 'CNS & Neurological Disorders - Drug Targets',
  },
  {
    value: 'cns-spectrums',
    label: 'CNS Spectrums',
  },
  {
    value: 'cold-spring-harbor-laboratory-press',
    label: 'Cold Spring Harbor Laboratory Press',
  },
  {
    value: 'collection-de-l-ecole-francaise-de-rome-full-note',
    label: "Collection de l'Ecole française de Rome (full note, Français)",
  },
  {
    value: 'collection-de-l-ecole-francaise-de-rome-note',
    label: "Collection de l'Ecole française de Rome (note, Français)",
  },
  {
    value: 'collection-du-centre-jean-berard',
    label: 'Collection du Centre Jean-Bérard (Français)',
  },
  {
    value: 'collections-electroniques-de-l-inha-author-date',
    label: "Collections électroniques de l'INHA (author-date, Français)",
  },
  {
    value: 'collections-electroniques-de-l-inha-full-note',
    label: "Collections électroniques de l'INHA (full note, Français)",
  },
  {
    value: 'college-montmorency',
    label: 'Collège Montmorency (note, Français - Canada)',
  },
  {
    value: 'college-of-naturopathic-medicine',
    label: 'College of Naturopathic Medicine',
  },
  {
    value: 'colombian-journal-of-anesthesiology',
    label: 'Colombian Journal of Anesthesiology',
  },
  {
    value: 'colorado-state-university-school-of-biomedical-engineering',
    label: 'Colorado State University - School of Biomedical Engineering',
  },
  {
    value: 'comision-economica-para-america-latina-y-el-caribe',
    label: 'Comisión Económica para América Latina y el Caribe (Español)',
  },
  {
    value: 'common-market-law-review',
    label: 'Common Market Law Review',
  },
  {
    value: 'communication-et-langages',
    label: 'Communication et Langages',
  },
  {
    value: 'comparativ',
    label: 'Comparativ',
  },
  {
    value: 'comparative-politics',
    label: 'Comparative Politics',
  },
  {
    value: 'comparative-population-studies',
    label: 'Comparative Population Studies',
  },
  {
    value: 'computer-und-recht',
    label: 'Computer und Recht (Deutsch)',
  },
  {
    value: 'conservation-and-society',
    label: 'Conservation & Society',
  },
  {
    value: 'conservation-biology',
    label: 'Conservation Biology',
  },
  {
    value: 'conservation-letters',
    label: 'Conservation Letters',
  },
  {
    value: 'conservation-physiology',
    label: 'Conservation Physiology',
  },
  {
    value: 'contemporary-accounting-research',
    label: 'Contemporary Accounting Research',
  },
  {
    value: 'continuity-and-change',
    label: 'Continuity and Change',
  },
  {
    value: 'contributions-to-the-archaeology-of-egypt-nubia-and-the-levant',
    label: 'Contributions to the Archaeology of Egypt, Nubia and the Levant',
  },
  {
    value: 'copeia',
    label: 'Copeia',
  },
  {
    value: 'copernicus-publications',
    label: 'Copernicus Publications',
  },
  {
    value: 'coral-reefs',
    label: 'Coral Reefs',
  },
  {
    value: 'cornea',
    label: 'Cornea',
  },
  {
    value: 'corrosion',
    label: 'Corrosion',
  },
  {
    value: 'council-of-science-editors-alphabetical',
    label:
      'Council of Science Editors, Citation-Name (numeric, sorted alphabetically)',
  },
  {
    value: 'council-of-science-editors-author-date',
    label: 'Council of Science Editors, Name-Year (author-date)',
  },
  {
    value: 'council-of-science-editors-brackets',
    label: 'Council of Science Editors, Citation-Sequence (numeric, brackets)',
  },
  {
    value: 'council-of-science-editors',
    label: 'Council of Science Editors, Citation-Sequence (numeric)',
  },
  {
    value: 'cranfield-university-numeric',
    label: 'Cranfield University (numeric)',
  },
  {
    value: 'creativity-and-innovation-management',
    label: 'Creativity and Innovation Management',
  },
  {
    value: 'critical-care-medicine',
    label: 'Critical Care Medicine',
  },
  {
    value: 'critical-reviews-in-plant-sciences',
    label: 'Critical Reviews in Plant Sciences',
  },
  {
    value: 'critical-reviews-in-solid-state-and-materials-sciences',
    label: 'Critical Reviews in Solid State and Materials Sciences',
  },
  {
    value: 'crop-breeding-and-applied-biotechnology',
    label: 'Crop Breeding and Applied Biotechnology',
  },
  {
    value: 'crustaceana',
    label: 'Crustaceana',
  },
  {
    value: 'cuadernos-de-filologia-clasica',
    label:
      'Cuadernos de Filología Clásica. Estudios Griegos e Indoeuropeos (autor-año, Español)',
  },
  {
    value: 'cultivos-tropicales',
    label: 'Cultivos Tropicales (Español)',
  },
  {
    value: 'cultural-geographies',
    label: 'cultural geographies',
  },
  {
    value: 'cultural-studies-of-science-education',
    label: 'Cultural Studies of Science Education',
  },
  {
    value: 'culture-medicine-and-psychiatry',
    label: 'Culture, Medicine, and Psychiatry',
  },
  {
    value: 'cureus',
    label: 'Cureus',
  },
  {
    value: 'current-alzheimer-research',
    label: 'Current Alzheimer Research',
  },
  {
    value: 'current-gene-therapy',
    label: 'Current Gene Therapy',
  },
  {
    value: 'current-neurology-aktualnosci-neurologiczne',
    label: 'Current Neurology - Aktualności Neurologiczne',
  },
  {
    value: 'current-opinion-in-endocrinology-diabetes-and-obesity',
    label: 'Current Opinion in Endocrinology, Diabetes and Obesity',
  },
  {
    value: 'current-opinion',
    label: 'Current Opinion journals',
  },
  {
    value: 'current-pharmaceutical-design',
    label: 'Current Pharmaceutical Design',
  },
  {
    value: 'current-proteomics',
    label: 'Current Proteomics',
  },
  {
    value: 'current-protocols',
    label: 'Current Protocols journals',
  },
  {
    value: 'current-science',
    label: 'Current Science',
  },
  {
    value: 'current-topics-in-medicinal-chemistry',
    label: 'Current Topics in Medicinal Chemistry',
  },
  {
    value: 'currents-in-biblical-research',
    label: 'Currents in Biblical Research',
  },
  {
    value: 'cybium',
    label: 'Cybium',
  },
  {
    value: 'cytometry',
    label: 'Cytometry',
  },
  {
    value: 'data-science-journal',
    label: 'Data Science Journal',
  },
  {
    value: 'database',
    label: 'Database',
  },
  {
    value: 'de-buck',
    label: 'De Buck (Nederlands)',
  },
  {
    value: 'de-montfort-university-harvard',
    label: 'De Montfort University - Harvard',
  },
  {
    value: 'decision-sciences',
    label: 'Decision Sciences',
  },
  {
    value: 'demographic-research',
    label: 'Demographic Research',
  },
  {
    value: 'der-moderne-staat',
    label: 'der moderne staat (Deutsch)',
  },
  {
    value: 'dermatology-online-journal',
    label: 'Dermatology Online Journal',
  },
  {
    value: 'deutsche-gesellschaft-fur-psychologie',
    label: 'Deutsche Gesellschaft für Psychologie 5. Auflage (Deutsch)',
  },
  {
    value: 'deutsche-sprache',
    label: 'Deutsche Sprache (Deutsch)',
  },
  {
    value: 'deutsches-archaologisches-institut',
    label: 'Deutsches Archäologisches Institut',
  },
  {
    value: 'deutsches-arzteblatt',
    label: 'Deutsches Ärzteblatt',
  },
  {
    value: 'developing-world-bioethics',
    label: 'Developing World Bioethics',
  },
  {
    value: 'development-and-change',
    label: 'Development and Change',
  },
  {
    value: 'development-policy-review',
    label: 'Development Policy Review',
  },
  {
    value: 'developmental-medicine-and-child-neurology',
    label: 'Developmental Medicine & Child Neurology',
  },
  {
    value: 'developmental-neurobiology',
    label: 'Developmental Neurobiology',
  },
  {
    value: 'diabetologia',
    label: 'Diabetologia',
  },
  {
    value: 'diagnostico-prenatal',
    label: 'Diagnóstico Prenatal (Español)',
  },
  {
    value: 'dialisis-y-trasplante',
    label: 'Dialisis y Trasplante (Español)',
  },
  {
    value: 'diatom-research',
    label: 'Diatom Research',
  },
  {
    value: 'die-bachelorarbeit-samac-et-al-in-text',
    label: 'Die Bachelorarbeit (Samac et al.) (in-text, Deutsch)',
  },
  {
    value: 'die-bachelorarbeit-samac-et-al-note',
    label: 'Die Bachelorarbeit (Samac et al.) (note, Deutsch)',
  },
  {
    value: 'digital-humanities-im-deutschsprachigen-raum',
    label: 'Digital Humanities im deutschsprachigen Raum (Deutsch)',
  },
  {
    value: 'digital-scholarship-in-the-humanities',
    label: 'Digital Scholarship in the Humanities',
  },
  {
    value: 'din-1505-2-alphanumeric',
    label:
      'DIN 1505-2 (alphanumeric, Deutsch) - standard superseded by ISO-690',
  },
  {
    value: 'din-1505-2-numeric-alphabetical',
    label:
      'DIN 1505-2 (numeric, sorted alphabetically, Deutsch) - standard superseded by ISO-690',
  },
  {
    value: 'din-1505-2-numeric',
    label: 'DIN 1505-2 (numeric, Deutsch) - standard superseded by ISO-690',
  },
  {
    value: 'din-1505-2',
    label: 'DIN 1505-2 (author-date, Deutsch) - standard superseded by ISO-690',
  },
  {
    value: 'diplo',
    label: 'Diplo',
  },
  {
    value: 'disability-and-rehabilitation',
    label: 'Disability and Rehabilitation',
  },
  {
    value: 'discovery-medicine',
    label: 'Discovery Medicine',
  },
  {
    value: 'dna-research',
    label: 'DNA Research',
  },
  {
    value: 'documents-d-archeologie-francaise',
    label: "Documents d'archéologie française (Français)",
  },
  {
    value:
      'donau-universitat-krems-department-fur-e-governance-in-wirthschaft-und-verwaltung',
    label:
      'Donau-Universität Krems - Department für E-Governance in Wirtschaft und Verwaltung (Deutsch - Österreich)',
  },
  {
    value: 'drug-development-research',
    label: 'Drug Development Research',
  },
  {
    value: 'drug-testing-and-analysis',
    label: 'Drug Testing and Analysis',
  },
  {
    value: 'drugs-of-today',
    label: 'Drugs of Today',
  },
  {
    value: 'durban-university-of-technology-harvard',
    label: 'Durban University of Technology - Harvard',
  },
  {
    value: 'e3s-web-of-conferences',
    label: 'E3S Web of Conferences',
  },
  {
    value: 'ear-and-hearing',
    label: 'Ear and Hearing',
  },
  {
    value: 'early-christianity',
    label: 'Early Christianity',
  },
  {
    value: 'early-medieval-europe',
    label: 'Early Medieval Europe',
  },
  {
    value: 'early-music-history',
    label: 'Early Music History',
  },
  {
    value: 'earth-surface-processes-and-landforms',
    label: 'Earth Surface Processes and Landforms',
  },
  {
    value: 'earthquake-engineering-and-structural-dynamics',
    label: 'Earthquake Engineering & Structural Dynamics',
  },
  {
    value: 'earthquake-spectra',
    label: 'Earthquake Spectra',
  },
  {
    value: 'ecclesial-practices',
    label: 'Ecclesial Practices',
  },
  {
    value: 'ecole-de-technologie-superieure-apa',
    label: 'École de technologie supérieure - APA (Français - Canada)',
  },
  {
    value:
      'ecole-pratique-des-hautes-etudes-sciences-historiques-et-philologiques',
    label:
      'École Pratique des Hautes Études - Sciences historiques et philologiques (Français)',
  },
  {
    value: 'ecological-entomology',
    label: 'Ecological Entomology',
  },
  {
    value: 'ecological-restoration',
    label: 'Ecological Restoration',
  },
  {
    value: 'ecology-and-society',
    label: 'Ecology and Society',
  },
  {
    value: 'ecology-letters',
    label: 'Ecology Letters',
  },
  {
    value: 'ecology-of-freshwater-fish',
    label: 'Ecology of Freshwater Fish',
  },
  {
    value: 'ecology',
    label: 'Ecology',
  },
  {
    value: 'econometrica',
    label: 'Econometrica',
  },
  {
    value: 'economia-y-politica',
    label: 'Economía y Política (Español - Chile)',
  },
  {
    value: 'economic-commission-for-latin-america-and-the-caribbean',
    label: 'Economic Commission for Latin America and the Caribbean',
  },
  {
    value: 'economic-geology',
    label: 'Economic Geology',
  },
  {
    value: 'economie-et-statistique',
    label: 'Économie et Statistique (Français)',
  },
  {
    value: 'ecoscience',
    label: 'Écoscience',
  },
  {
    value: 'ecosistemas',
    label: 'Ecosistemas (Español)',
  },
  {
    value: 'ecosystems',
    label: 'Ecosystems',
  },
  {
    value: 'edward-elgar-business-and-social-sciences',
    label: 'Edward Elgar Publishing - Business and Social Sciences',
  },
  {
    value: 'effective-altruism-wiki',
    label: 'Effective Altruism Wiki',
  },
  {
    value: 'egretta',
    label: 'Egretta (Deutsch - Österreich)',
  },
  {
    value: 'einaudi',
    label: 'Einaudi (Italiano)',
  },
  {
    value: 'eksploatacja-i-niezawodnosc',
    label: 'Eksploatacja i Niezawodnosc - Maintenance and Reliability',
  },
  {
    value: 'el-profesional-de-la-informacion',
    label: 'Profesional de la información (Español)',
  },
  {
    value: 'electrophoresis',
    label: 'Electrophoresis',
  },
  {
    value: 'elementa',
    label: 'Elementa',
  },
  {
    value: 'elife',
    label: 'eLife',
  },
  {
    value: 'elsevier-harvard-without-titles',
    label: 'Elsevier - Harvard (without titles)',
  },
  {
    value: 'elsevier-harvard',
    label: 'Elsevier - Harvard (with titles)',
  },
  {
    value: 'elsevier-harvard2',
    label: 'Elsevier - Harvard 2',
  },
  {
    value: 'elsevier-vancouver-author-date',
    label: 'Elsevier - Vancouver (author-date)',
  },
  {
    value: 'elsevier-vancouver',
    label: 'Elsevier - Vancouver',
  },
  {
    value: 'elsevier-with-titles-alphabetical',
    label: 'Elsevier (numeric, with titles, sorted alphabetically)',
  },
  {
    value: 'elsevier-with-titles',
    label: 'Elsevier (numeric, with titles)',
  },
  {
    value: 'elsevier-without-titles',
    label: 'Elsevier (numeric, without titles)',
  },
  {
    value: 'embnet-journal',
    label: 'EMBnet.journal',
  },
  {
    value: 'embo-press',
    label: 'EMBO Press',
  },
  {
    value: 'emerald-harvard',
    label: 'Emerald - Harvard',
  },
  {
    value: 'emu-austral-ornithology',
    label: 'Emu - Austral Ornithology',
  },
  {
    value: 'endocrine-connections',
    label: 'Endocrine Connections',
  },
  {
    value: 'endocrine-press',
    label: 'Endocrine Press',
  },
  {
    value: 'endoscopia',
    label: 'Endoscopia (Español)',
  },
  {
    value: 'eneuro',
    label: 'eNeuro',
  },
  {
    value: 'enfermeria-clinica',
    label: 'Enfermería Clínica (Español)',
  },
  {
    value: 'enfermeria-intensiva',
    label: 'Enfermería Intensiva (Español)',
  },
  {
    value: 'engineered-regeneration',
    label: 'Engineered Regeneration',
  },
  {
    value: 'engineering-in-life-sciences',
    label: 'Engineering in Life Sciences',
  },
  {
    value: 'engineering-technology-and-applied-science-research',
    label: 'Engineering, Technology & Applied Science Research',
  },
  {
    value: 'ens-de-lyon-centre-d-ingenierie-documentaire',
    label: "ENS de Lyon - Centre d'ingénierie documentaire (Français)",
  },
  {
    value: 'entecho',
    label: 'ENTECHO (Čeština)',
  },
  {
    value: 'entomologia-experimentalis-et-applicata',
    label: 'Entomologia Experimentalis et Applicata',
  },
  {
    value: 'entomological-society-of-america',
    label: 'Entomological Society of America',
  },
  {
    value: 'environment-and-planning',
    label: 'Environment and Planning',
  },
  {
    value: 'environment-and-urbanization',
    label: 'Environment and Urbanization',
  },
  {
    value: 'environmental-and-engineering-geoscience',
    label: 'Environmental & Engineering Geoscience',
  },
  {
    value: 'environmental-chemistry',
    label: 'Environmental Chemistry',
  },
  {
    value: 'environmental-conservation',
    label: 'Environmental Conservation',
  },
  {
    value: 'environmental-health-perspectives',
    label: 'Environmental Health Perspectives',
  },
  {
    value: 'environmental-microbiology',
    label: 'Environmental Microbiology',
  },
  {
    value: 'environmental-values',
    label: 'Environmental Values',
  },
  {
    value: 'environnement-risques-et-sante',
    label: 'Environnement, Risques & Santé',
  },
  {
    value: 'ephemerides-theologicae-lovanienses',
    label: 'Ephemerides Theologicae Lovanienses',
  },
  {
    value: 'epidemiologie-et-sante-animale',
    label: 'Épidémiologie et Santé Animale',
  },
  {
    value: 'epidemiology-and-infection',
    label: 'Epidemiology & Infection',
  },
  {
    value: 'epilepsia',
    label: 'Epilepsia',
  },
  {
    value: 'equine-veterinary-education',
    label: 'Equine Veterinary Education',
  },
  {
    value: 'equine-veterinary-journal',
    label: 'Equine Veterinary Journal',
  },
  {
    value: 'ergo',
    label: 'Ergo',
  },
  {
    value: 'ergoscience',
    label: 'ergoscience',
  },
  {
    value: 'errata',
    label: 'Errata: Publicação sobre processos editoriais (Português - Brasil)',
  },
  {
    value: 'escuela-nacional-de-antropologia-e-historia-author-date',
    label:
      'Escuela Nacional de Antropología e Historia (autor-fecha, Español - México)',
  },
  {
    value: 'escuela-nacional-de-antropologia-e-historia-full-note',
    label:
      'Escuela Nacional de Antropología e Historia (nota completa, Español - México)',
  },
  {
    value: 'escuela-nacional-de-antropologia-e-historia-short-note',
    label:
      'Escuela Nacional de Antropología e Historia (nota corta, Español - México)',
  },
  {
    value: 'estuaries-and-coasts',
    label: 'Estuaries and Coasts',
  },
  {
    value: 'estudios-de-cultura-maya',
    label: 'Estudios de Cultura Maya (Español - México)',
  },
  {
    value: 'estudios-de-fonetica-experimental',
    label: 'Estudios de Fonética Experimental',
  },
  {
    value: 'estudios-hispanicos',
    label: 'Estudios Hispánicos (Español)',
  },
  {
    value: 'ethics-book-reviews',
    label: 'Ethics (for book reviews)',
  },
  {
    value: 'ethnobiology-and-conservation',
    label: 'Ethnobiology and Conservation',
  },
  {
    value: 'ethnobiology-letters',
    label: 'Ethnobiology Letters',
  },
  {
    value: 'ethnographiques-org',
    label: 'ethnographiques.org (Français)',
  },
  {
    value: 'ethnologie-francaise',
    label: 'Ethnologie française (Français)',
  },
  {
    value: 'ethnomusicology',
    label: 'Ethnomusicology',
  },
  {
    value: 'etri-journal',
    label: 'ETRI Journal',
  },
  {
    value: 'ets-ecole-de-technologie-superieure',
    label: 'ÉTS - École de technologie supérieure (Français - Canada)',
  },
  {
    value: 'eurasian-journal-of-medical-investigation',
    label: 'Eurasian Journal of Medical Investigation',
  },
  {
    value: 'eurasian-journal-of-medicine-and-oncology',
    label: 'Eurasian Journal of Medicine and Oncology',
  },
  {
    value: 'eurointervention',
    label: 'EuroIntervention',
  },
  {
    value: 'europace',
    label: 'Europace',
  },
  {
    value: 'european-cells-and-materials',
    label: 'European Cells & Materials',
  },
  {
    value: 'european-journal-for-philosophy-of-religion',
    label: 'European Journal for Philosophy of Religion',
  },
  {
    value: 'european-journal-of-anaesthesiology',
    label: 'European Journal of Anaesthesiology',
  },
  {
    value: 'european-journal-of-clinical-microbiology-and-infectious-diseases',
    label: 'European Journal of Clinical Microbiology & Infectious Diseases',
  },
  {
    value: 'european-journal-of-emergency-medicine',
    label: 'European Journal of Emergency Medicine',
  },
  {
    value: 'european-journal-of-endocrinology',
    label: 'European Journal of Endocrinology',
  },
  {
    value: 'european-journal-of-entomology',
    label: 'European Journal of Entomology',
  },
  {
    value: 'european-journal-of-human-genetics',
    label: 'European Journal of Human Genetics',
  },
  {
    value: 'european-journal-of-immunology',
    label: 'European Journal of Immunology',
  },
  {
    value: 'european-journal-of-information-systems',
    label: 'European Journal of Information Systems',
  },
  {
    value: 'european-journal-of-international-law',
    label: 'European Journal of International Law',
  },
  {
    value: 'european-journal-of-microbiology-and-immunology',
    label: 'European Journal of Microbiology & Immunology',
  },
  {
    value: 'european-journal-of-neuroscience',
    label: 'European Journal of Neuroscience',
  },
  {
    value: 'european-journal-of-ophthalmology',
    label: 'European Journal of Ophthalmology',
  },
  {
    value: 'european-journal-of-paediatric-neurology',
    label: 'European Journal of Paediatric Neurology',
  },
  {
    value: 'european-journal-of-pain',
    label: 'European Journal of Pain',
  },
  {
    value: 'european-journal-of-political-research',
    label: 'European Journal of Political Research',
  },
  {
    value: 'european-journal-of-public-health',
    label: 'European Journal of Public Health',
  },
  {
    value: 'european-journal-of-soil-science',
    label: 'European Journal of Soil Science',
  },
  {
    value: 'european-journal-of-taxonomy',
    label: 'European Journal of Taxonomy',
  },
  {
    value: 'european-journal-of-theology',
    label: 'European Journal of Theology',
  },
  {
    value: 'european-journal-of-ultrasound',
    label: 'European Journal of Ultrasound (Ultraschall in der Medizin)',
  },
  {
    value: 'european-journal-of-vascular-and-endovascular-surgery',
    label: 'European Journal of Vascular and Endovascular Surgery',
  },
  {
    value: 'european-respiratory-journal',
    label: 'European Respiratory Journal',
  },
  {
    value: 'european-retail-research',
    label: 'European Retail Research',
  },
  {
    value: 'european-review-of-agricultural-economics',
    label: 'European Review of Agricultural Economics',
  },
  {
    value: 'european-society-of-cardiology',
    label: 'European Society of Cardiology',
  },
  {
    value: 'european-union-interinstitutional-style-guide-author-date',
    label: 'European Union - Interinstitutional Style Guide (author-date)',
  },
  {
    value: 'european-union-interinstitutional-style-guide',
    label: 'European Union - Interinstitutional Style Guide (note)',
  },
  {
    value: 'eva-berlin-konferenz',
    label: 'EVA Berlin Konferenz (Deutsch)',
  },
  {
    value: 'evidence-based-complementary-and-alternative-medicine',
    label: 'Evidence-Based Complementary and Alternative Medicine',
  },
  {
    value: 'evolution-and-development',
    label: 'Evolution & Development',
  },
  {
    value: 'evolution-letters',
    label: 'Evolution Letters',
  },
  {
    value: 'evolution',
    label: 'Evolution',
  },
  {
    value: 'evolutionary-anthropology',
    label: 'Evolutionary Anthropology',
  },
  {
    value: 'evolutionary-ecology-research',
    label: 'Evolutionary Ecology Research',
  },
  {
    value: 'excli-journal',
    label: 'EXCLI Journal',
  },
  {
    value: 'exercer',
    label: 'exercer (Français)',
  },
  {
    value: 'experimental-biology-and-medicine',
    label: 'Experimental Biology and Medicine',
  },
  {
    value: 'experimental-biomedical-research',
    label: 'Experimental Biomedical Research',
  },
  {
    value: 'experimental-dermatology',
    label: 'Experimental Dermatology',
  },
  {
    value: 'expert-reviews-in-molecular-medicine',
    label: 'Expert Reviews in Molecular Medicine',
  },
  {
    value: 'express-polymer-letters',
    label: 'eXPRESS Polymer Letters',
  },
  {
    value: 'extracellular-vesicles-and-circulating-nucleic-acids',
    label: 'Extracellular Vesicles and Circulating Nucleic Acids',
  },
  {
    value: 'eye',
    label: 'Eye',
  },
  {
    value: 'fachhochschule-kiel-fachbereich-medien',
    label: 'Fachhochschule Kiel - Fachbereich Medien (Deutsch)',
  },
  {
    value: 'fachhochschule-sudwestfalen',
    label: 'Fachhochschule Südwestfalen (Deutsch)',
  },
  {
    value: 'fachhochschule-vorarlberg-author-date',
    label: 'Fachhochschule Vorarlberg (author-date)',
  },
  {
    value: 'fachhochschule-vorarlberg-note',
    label: 'Fachhochschule Vorarlberg (note)',
  },
  {
    value: 'facial-plastic-surgery-clinics-of-north-america',
    label: 'Facial Plastic Surgery Clinics of North America',
  },
  {
    value: 'facolta-teologica-dell-italia-settentrionale-milano',
    label:
      "Facoltà Teologica dell'Italia Settentrionale - Milano (titoli di riviste non abbreviati, Italiano)",
  },
  {
    value: 'family-business-review',
    label: 'Family Business Review',
  },
  {
    value: 'farmeconomia',
    label: 'Farmeconomia. Health Economics and Therapeutic Pathways',
  },
  {
    value: 'fatigue-and-fracture-of-engineering-materials-and-structures',
    label: 'Fatigue & Fracture of Engineering Materials & Structures',
  },
  {
    value: 'feminist-economics',
    label: 'Feminist Economics',
  },
  {
    value: 'feminist-theory',
    label: 'Feminist Theory',
  },
  {
    value: 'ferdinand-porsche-fern-fachhochschule',
    label: 'Ferdinand Porsche Fernfachhochschule (Deutsch - Österreich)',
  },
  {
    value: 'fertility-and-sterility',
    label: 'Fertility and Sterility',
  },
  {
    value: 'finance-and-society',
    label: 'Finance and Society',
  },
  {
    value: 'finanzarchiv',
    label: 'FinanzArchiv - Public Finance Analysis',
  },
  {
    value: 'fine-focus',
    label: 'Fine Focus',
  },
  {
    value: 'first-break',
    label: 'First Break',
  },
  {
    value: 'first-monday',
    label: 'First Monday',
  },
  {
    value: 'fishery-bulletin',
    label: 'Fishery Bulletin',
  },
  {
    value: 'flavour-and-fragrance-journal',
    label: 'Flavour and Fragrance Journal',
  },
  {
    value: 'florida-entomologist',
    label: 'Florida Entomologist',
  },
  {
    value: 'focaal-journal-of-global-and-historical-anthropology',
    label: 'Focaal—Journal of Global and Historical Anthropology',
  },
  {
    value: 'foerster-geisteswissenschaft',
    label: 'Sascha Foerster - Geisteswissenschaft (Deutsch)',
  },
  {
    value: 'fold-and-r',
    label: 'FOLD&R (Fasti On Line Documents & Research)',
  },
  {
    value: 'folia-biologica',
    label: 'Folia Biologica',
  },
  {
    value: 'folia-morphologia',
    label: 'Folia Morphologia',
  },
  {
    value: 'food-and-agriculture-organization-of-the-united-nations',
    label: 'Food and Agriculture Organization of the United Nations',
  },
  {
    value: 'forensic-anthropology',
    label: 'Forensic Anthropology',
  },
  {
    value: 'forensic-science-review',
    label: 'Forensic Science Review',
  },
  {
    value: 'forest-science',
    label: 'Forest Science',
  },
  {
    value: 'forschungsjournal-soziale-bewegungen-fjsb',
    label: 'Forschungsjournal Soziale Bewegungen FJSB(German)',
  },
  {
    value: 'forum-qualitative-social-research',
    label: 'Forum: Qualitative Social Research (English)',
  },
  {
    value: 'forum-qualitative-sozialforschung',
    label: 'Forum: Qualitative Sozialforschung (Deutsch)',
  },
  {
    value:
      'frattura-ed-integrita-strutturale-fracture-and-structural-integrity',
    label:
      'Frattura ed Integrità Strutturale - Fracture and Structural Integrity',
  },
  {
    value: 'free-radical-research',
    label: 'Free Radical Research',
  },
  {
    value: 'freie-hochschule-stuttgart',
    label: 'Freie Hochschule Stuttgart (Deutsch)',
  },
  {
    value: 'freie-universitat-berlin-geographische-wissenschaften',
    label: 'Freie Universität Berlin - Geographische Wissenschaften (Deutsch)',
  },
  {
    value: 'french-politics',
    label: 'French Politics',
  },
  {
    value: 'french1',
    label: 'France (tous les auteurs, numérotation, Français)',
  },
  {
    value: 'french2',
    label: 'France (auteurs et al., numérotation, Français)',
  },
  {
    value: 'french3',
    label: 'France (tous les auteurs, auteur-date, Français)',
  },
  {
    value: 'french4',
    label: 'France (auteurs et al., auteur-date, Français)',
  },
  {
    value: 'freshwater-biology',
    label: 'Freshwater Biology',
  },
  {
    value: 'freshwater-crayfish',
    label: 'Freshwater Crayfish',
  },
  {
    value: 'freshwater-science',
    label: 'Freshwater Science',
  },
  {
    value: 'friedrich-schiller-universitat-jena-medizinische-fakultat',
    label:
      'Friedrich-Schiller-Universität Jena - Medizinische Fakultät (Deutsch)',
  },
  {
    value: 'frontiers-in-bioscience',
    label: 'Frontiers in Bioscience',
  },
  {
    value: 'frontiers-in-ecology-and-the-environment',
    label: 'Frontiers in Ecology and the Environment',
  },
  {
    value: 'frontiers-in-optics',
    label: 'Frontiers in Optics',
  },
  {
    value: 'frontiers-in-physics',
    label: 'Frontiers in Physics',
  },
  {
    value: 'frontiers-medical-journals',
    label: 'Frontiers medical journals',
  },
  {
    value: 'frontiers-of-biogeography',
    label: 'Frontiers of Biogeography',
  },
  {
    value: 'frontiers',
    label: 'Frontiers journals',
  },
  {
    value: 'fundamental-and-applied-limnology',
    label: 'Fundamental and Applied Limnology',
  },
  {
    value: 'future-medicine',
    label: 'Future Medicine journals',
  },
  {
    value: 'future-science-group',
    label: 'Future Science Group',
  },
  {
    value: 'g-giappichelli-editore',
    label: 'G. Giappichelli Editore (Italiano)',
  },
  {
    value: 'g3',
    label: 'G3: Genes, Genomes, Genetics',
  },
  {
    value: 'gaceta-sanitaria',
    label: 'Gaceta Sanitaria',
  },
  {
    value: 'gaia',
    label: 'GAIA',
  },
  {
    value: 'galatasaray-universitesi-sosyal-bilimler-enstitusu',
    label: 'Galatasaray Üniversitesi Sosyal Bilimler Enstitüsü',
  },
  {
    value: 'gallia-prehistoire',
    label: 'Gallia Préhistoire (Français)',
  },
  {
    value: 'gallia',
    label: 'Gallia (Français)',
  },
  {
    value: 'gastroenterology',
    label: 'Gastroenterology',
  },
  {
    value: 'gastrointestinal-endoscopy-clinics-of-north-america',
    label: 'Gastrointestinal Endoscopy Clinics of North America',
  },
  {
    value: 'gastrointestinal-intervention',
    label: 'Gastrointestinal Intervention',
  },
  {
    value: 'gazeta-medica',
    label: 'Gazeta Médica',
  },
  {
    value: 'geistes-und-kulturwissenschaften-heilmann',
    label: 'Geistes- und Kulturwissenschaften (Heilmann) (Deutsch)',
  },
  {
    value: 'generic-style-rules-for-linguistics',
    label: 'Generic Style Rules for Linguistics',
  },
  {
    value: 'genes-brain-and-behavior',
    label: 'Genes, Brain and Behavior',
  },
  {
    value: 'genes-to-cells',
    label: 'Genes to Cells',
  },
  {
    value: 'geneses',
    label: 'Genèses: Sciences sociales et histoire (Français)',
  },
  {
    value: 'genetics-and-molecular-biology',
    label: 'Genetics and Molecular Biology',
  },
  {
    value: 'genetics',
    label: 'Genetics',
  },
  {
    value: 'genome-biology-and-evolution',
    label: 'Genome Biology and Evolution',
  },
  {
    value: 'genomics-and-informatics',
    label: 'Genomics & Informatics',
  },
  {
    value: 'geoarchaeology',
    label: 'Geoarchaeology',
  },
  {
    value: 'geobiology',
    label: 'Geobiology',
  },
  {
    value: 'geochemical-perspectives-letters',
    label: 'Geochemical Perspectives Letters',
  },
  {
    value: 'geochimica-et-cosmochimica-acta',
    label: 'Geochimica et Cosmochimica Acta',
  },
  {
    value: 'geochronometria',
    label: 'Geochronometria',
  },
  {
    value: 'geografia-fisica-e-dinamica-quaternaria',
    label: 'Geografia Fisica e Dinamica Quaternaria',
  },
  {
    value: 'geografie-sbornik-cgs',
    label: 'Geografie Sborník ČGS',
  },
  {
    value: 'geographie-et-cultures',
    label: 'Géographie et cultures (Français)',
  },
  {
    value: 'geographische-zeitschrift',
    label: 'Geographische Zeitschrift',
  },
  {
    value: 'geological-magazine',
    label: 'Geological Magazine',
  },
  {
    value: 'geophysical-journal-international',
    label: 'Geophysical Journal International',
  },
  {
    value: 'geophysics',
    label: 'Geophysics',
  },
  {
    value: 'geopolitics',
    label: 'Geopolitics',
  },
  {
    value:
      'georg-august-universitat-gottingen-institut-fur-ethnologie-und-ethnologische-sammlung',
    label:
      'Georg-August-Universität Göttingen - Institut für Ethnologie und Ethnologische Sammlung (Deutsch)',
  },
  {
    value: 'geriatrics-and-gerontology-international',
    label: 'Geriatrics & Gerontology International',
  },
  {
    value: 'geriatrie-et-psychologie-neuropsychiatrie-du-vieillissement',
    label: 'Gériatrie et Psychologie Neuropsychiatrie du Vieillissement',
  },
  {
    value: 'german-council-of-economic-experts',
    label: 'German Council of Economic Experts',
  },
  {
    value: 'german-journal-of-agricultural-economics',
    label: 'German Journal of Agricultural Economics',
  },
  {
    value: 'german-yearbook-of-international-law',
    label: 'German Yearbook of International Law',
  },
  {
    value: 'geschichte-und-gesellschaft',
    label: 'Geschichte und Gesellschaft',
  },
  {
    value: 'gesellschaft-fur-popularmusikforschung',
    label: 'Gesellschaft fur Popularmusikforschung (Deutsch)',
  },
  {
    value: 'gewerblicher-rechtsschutz-und-urheberrecht',
    label: 'Gewerblicher Rechtsschutz und Urheberrecht (Deutsch)',
  },
  {
    value: 'gigascience',
    label: 'GigaScience',
  },
  {
    value: 'global-ecology-and-biogeography',
    label: 'Global Ecology and Biogeography',
  },
  {
    value: 'glossa',
    label: 'Glossa',
  },
  {
    value: 'gost-r-7-0-5-2008-numeric-alphabetical',
    label:
      'Russian GOST R 7.0.5-2008 (numeric, sorted alphabetically, Ру́сский)',
  },
  {
    value: 'gost-r-7-0-5-2008-numeric',
    label: 'Russian GOST R 7.0.5-2008 (numeric)',
  },
  {
    value: 'gost-r-7-0-5-2008',
    label: 'Russian GOST R 7.0.5-2008 (Ру́сский)',
  },
  {
    value: 'government-and-opposition',
    label: 'Government and Opposition',
  },
  {
    value: 'grasas-y-aceites',
    label: 'Grasas y Aceites',
  },
  {
    value: 'griffith-college-harvard',
    label: 'Griffith College - Harvard',
  },
  {
    value: 'groundwater',
    label: 'Groundwater',
  },
  {
    value: 'groupe-danthropologie-et-darcheologie-funeraire',
    label: "Groupe d'anthropologie et d'archéologie funéraire (Français)",
  },
  {
    value: 'guide-des-citations-references-et-abreviations-juridiques',
    label:
      'Guide des citations, références et abréviations juridiques 6e édition (Français)',
  },
  {
    value:
      'guide-pour-la-redaction-et-la-presentation-des-theses-a-lusage-des-doctorants',
    label:
      "Guide pour la rédaction et la présentation des thèses à l'usage des doctorants (Français)",
  },
  {
    value: 'haaga-helia-university-of-applied-sciences-harvard',
    label: 'Haaga-Helia ammattikorkeakoulu - Harvard',
  },
  {
    value: 'haematologica',
    label: 'Haematologica',
  },
  {
    value: 'haemophilia',
    label: 'Haemophilia',
  },
  {
    value: 'hainan-medical-university-journal-publisher',
    label: 'Hainan Medical University Journal Publisher',
  },
  {
    value: 'hamburg-school-of-food-science',
    label: 'Hamburg School of Food Science (diploma, Deutsch)',
  },
  {
    value: 'hand',
    label: 'HAND',
  },
  {
    value: 'handbook-of-clinical-neurology',
    label: 'Handbook of Clinical Neurology',
  },
  {
    value: 'harvard-anglia-ruskin-university',
    label: 'Anglia Ruskin University - Harvard',
  },
  {
    value: 'harvard-bournemouth-university',
    label: 'Bournemouth University - Harvard',
  },
  {
    value: 'harvard-cape-peninsula-university-of-technology',
    label: 'Cape Peninsula University of Technology - Harvard',
  },
  {
    value: 'harvard-cardiff-university-old',
    label: 'Cardiff University - (old) Harvard',
  },
  {
    value: 'harvard-cite-them-right-10th-edition',
    label: 'Cite Them Right 10th edition - Harvard',
  },
  {
    value: 'harvard-cite-them-right-no-et-al',
    label: 'Cite Them Right 11th edition - Harvard (no "et al.")',
  },
  {
    value: 'harvard-cite-them-right',
    label: 'Cite Them Right 11th edition - Harvard',
  },
  {
    value: 'harvard-coventry-university',
    label: 'Coventry University - Harvard',
  },
  {
    value: 'harvard-cranfield-university',
    label: 'Cranfield University - Harvard',
  },
  {
    value: 'harvard-deakin-university',
    label: 'Deakin University - Harvard',
  },
  {
    value: 'harvard-dundalk-institute-of-technology',
    label: 'Dundalk Institute of Technology - Harvard',
  },
  {
    value: 'harvard-durham-university-business-school',
    label: 'Durham University Business School - Harvard',
  },
  {
    value: 'harvard-edge-hill-university',
    label: 'Edge Hill University - Harvard',
  },
  {
    value: 'harvard-european-archaeology',
    label: 'European Archaeology - Harvard',
  },
  {
    value: 'harvard-fachhochschule-salzburg',
    label: 'Fachhochschule Salzburg - Harvard',
  },
  {
    value: 'harvard-falmouth-university',
    label: 'Falmouth University - Harvard',
  },
  {
    value: 'harvard-gesellschaft-fur-bildung-und-forschung-in-europa',
    label:
      'Gesellschaft für Bildung und Forschung in Europa - Harvard (Deutsch)',
  },
  {
    value: 'harvard-imperial-college-london',
    label: 'Imperial College London - Harvard',
  },
  {
    value: 'harvard-institut-fur-praxisforschung-de',
    label:
      'Institut für Praxisforschung - Harvard (Bahr & Frackmann) (Deutsch)',
  },
  {
    value: 'harvard-kings-college-london',
    label: "King's College London - Harvard",
  },
  {
    value: 'harvard-leeds-beckett-university',
    label: 'Leeds Beckett University - Harvard',
  },
  {
    value: 'harvard-leeds-metropolitan-university',
    label: 'Leeds Metropolitan University - Harvard',
  },
  {
    value: 'harvard-limerick',
    label: 'University of Limerick (Cite it Right) - Harvard',
  },
  {
    value: 'harvard-london-south-bank-university',
    label: 'London South Bank University - Harvard',
  },
  {
    value: 'harvard-manchester-business-school',
    label: 'Manchester Business School - Harvard',
  },
  {
    value: 'harvard-manchester-metropolitan-university',
    label: 'Manchester Metropolitan University - Harvard',
  },
  {
    value: 'harvard-melbourne-polytechnic',
    label: 'Melbourne Polytechnic - Harvard',
  },
  {
    value: 'harvard-newcastle-university',
    label: 'Newcastle University - Harvard',
  },
  {
    value: 'harvard-north-west-university',
    label: 'North-West University - Harvard',
  },
  {
    value:
      'harvard-oxford-brookes-university-faculty-of-health-and-life-sciences',
    label:
      'Oxford Brookes University - Faculty of Health and Life Sciences - Harvard',
  },
  {
    value: 'harvard-pontificia-universidad-catolica-del-ecuador',
    label: 'Pontificia Universidad Católica del Ecuador (Español) - Harvard',
  },
  {
    value: 'harvard-robert-gordon-university',
    label: 'Robert Gordon University - Harvard',
  },
  {
    value: 'harvard-staffordshire-university',
    label: 'Staffordshire University - Harvard',
  },
  {
    value: 'harvard-stellenbosch-university',
    label: 'Stellenbosch University - Harvard',
  },
  {
    value: 'harvard-swinburne-university-of-technology',
    label: 'Swinburne University of Technology - Harvard',
  },
  {
    value: 'harvard-the-university-of-melbourne',
    label: 'The University of Melbourne - Harvard',
  },
  {
    value: 'harvard-the-university-of-northampton',
    label: 'The University of Northampton - Harvard',
  },
  {
    value: 'harvard-the-university-of-sheffield-school-of-east-asian-studies',
    label:
      'The University of Sheffield - School of East Asian Studies - Harvard',
  },
  {
    value: 'harvard-the-university-of-sheffield-town-and-regional-planning',
    label: 'The University of Sheffield - Town and Regional Planning - Harvard',
  },
  {
    value: 'harvard-theologisches-seminar-adelshofen',
    label: 'Theologisches Seminar Adelshofen - Harvard (Deutsch)',
  },
  {
    value: 'harvard-universiti-teknologi-malaysia',
    label: 'Universiti Teknologi Malaysia - Harvard',
  },
  {
    value: 'harvard-universiti-tunku-abdul-rahman',
    label: 'Universiti Tunku Abdul Rahman - Harvard',
  },
  {
    value: 'harvard-university-for-the-creative-arts',
    label: 'University for the Creative Arts - Harvard',
  },
  {
    value: 'harvard-university-of-abertay-dundee',
    label: 'University of Abertay Dundee - Harvard',
  },
  {
    value: 'harvard-university-of-bath',
    label: 'University of Bath - Harvard',
  },
  {
    value: 'harvard-university-of-birmingham',
    label: 'University of Birmingham - Harvard',
  },
  {
    value:
      'harvard-university-of-brighton-school-of-environment-and-technology',
    label:
      'University of Brighton School of Environment & Technology - Harvard',
  },
  {
    value: 'harvard-university-of-cape-town',
    label: 'University of Cape Town - Harvard',
  },
  {
    value: 'harvard-university-of-exeter-geography',
    label: 'University of Exeter - Geography - Harvard',
  },
  {
    value: 'harvard-university-of-greenwich',
    label: 'University of Greenwich - Harvard',
  },
  {
    value: 'harvard-university-of-kent',
    label: 'University of Kent - Harvard',
  },
  {
    value: 'harvard-university-of-leeds',
    label: 'University of Leeds - Harvard',
  },
  {
    value: 'harvard-university-of-technology-sydney',
    label: 'University of Technology Sydney - Harvard',
  },
  {
    value: 'harvard-university-of-the-west-of-england',
    label: 'University of the West of England (Bristol) - Harvard',
  },
  {
    value: 'harvard-university-of-the-west-of-scotland',
    label: 'University of the West of Scotland - Harvard',
  },
  {
    value: 'harvard-university-of-westminster',
    label: 'University of Westminster - Harvard',
  },
  {
    value: 'harvard-university-of-wolverhampton',
    label: 'University of Wolverhampton - Harvard',
  },
  {
    value: 'harvard-university-of-worcester',
    label: 'University of Worcester - Harvard',
  },
  {
    value: 'harvard-york-st-john-university',
    label: 'York St John University - Harvard (pre September 2019 entry)',
  },
  {
    value: 'haute-ecole-de-gestion-de-geneve-iso-690',
    label: 'Haute école de gestion de Genève - ISO 690',
  },
  {
    value: 'haute-ecole-pedagogique-fribourg',
    label: 'Haute Ecole pédagogique Fribourg (Français)',
  },
  {
    value: 'hawaii-international-conference-on-system-sciences-proceedings',
    label: 'Hawaii International Conference on System Sciences Proceedings',
  },
  {
    value: 'health-and-human-rights-journal',
    label: 'Health and Human Rights Journal',
  },
  {
    value: 'health-and-social-care-in-the-community',
    label: 'Health & Social Care in the Community',
  },
  {
    value: 'health-economics-policy-and-law',
    label: 'Health Economics, Policy and Law',
  },
  {
    value: 'health-economics',
    label: 'Health Economics',
  },
  {
    value: 'health-education-england-harvard',
    label: 'Health Education England - Harvard',
  },
  {
    value: 'health-education-research',
    label: 'Health Education Research',
  },
  {
    value: 'health-policy-and-planning',
    label: 'Health Policy and Planning',
  },
  {
    value: 'health-reform-observer-observatoire-des-reformes-de-sante',
    label: 'Health Reform Observer - Observatoire des Réformes de Santé',
  },
  {
    value: 'health-sports-and-rehabilitation-medicine',
    label: 'Health, Sports & Rehabilitation Medicine',
  },
  {
    value: 'heart-failure-clinics',
    label: 'Heart Failure Clinics',
  },
  {
    value: 'heart-rhythm',
    label: 'Heart Rhythm',
  },
  {
    value: 'heidelberg-university-faculty-of-medicine',
    label:
      'Heidelberg University - Faculty of Medicine (Universität Heidelberg - Medizinische Fakultät Heidelberg)',
  },
  {
    value: 'heiliger-dienst',
    label: 'Heiliger Dienst (Deutsch)',
  },
  {
    value: 'helvetica-chimica-acta',
    label: 'Helvetica Chimica Acta',
  },
  {
    value: 'hematology-oncology-clinics-of-north-america',
    label: 'Hematology/Oncology Clinics of North America',
  },
  {
    value: 'hemijska-industrija',
    label: 'Hemijska industrija',
  },
  {
    value: 'henoch',
    label: 'Henoch',
  },
  {
    value: 'hepatology',
    label: 'Hepatology',
  },
  {
    value: 'heredity',
    label: 'Heredity',
  },
  {
    value: 'herpetologica',
    label: 'Herpetologica',
  },
  {
    value: 'hiob-ludolf-centre-for-ethiopian-studies-long-names',
    label: 'Hiob Ludolf Centre for Ethiopian Studies (long names)',
  },
  {
    value: 'hiob-ludolf-centre-for-ethiopian-studies-with-url-doi',
    label: 'Hiob Ludolf Centre for Ethiopian Studies (with URL/DOI)',
  },
  {
    value: 'hiob-ludolf-centre-for-ethiopian-studies',
    label: 'Hiob Ludolf Centre for Ethiopian Studies',
  },
  {
    value: 'hipertension-y-riesgo-vascular',
    label: 'Hipertensión y Riesgo Vascular (Español)',
  },
  {
    value: 'histoire-at-politique',
    label: 'Histoire@Politique. Politique, culture, société (Français)',
  },
  {
    value: 'histoire-et-mesure',
    label: 'Histoire & Mesure (Français)',
  },
  {
    value: 'histopathology',
    label: 'Histopathology',
  },
  {
    value: 'historia-scribere',
    label: 'historia-scribere (Deutsch)',
  },
  {
    value: 'historical-materialism',
    label: 'Historical Materialism',
  },
  {
    value: 'historical-social-research',
    label: 'Historical Social Research',
  },
  {
    value: 'historio-plus',
    label: 'historioPLUS (Deutsch - Österreich)',
  },
  {
    value: 'history-and-theory',
    label: 'History and Theory',
  },
  {
    value: 'history-australia',
    label: 'History Australia',
  },
  {
    value: 'history-of-the-human-sciences',
    label: 'History of the Human Sciences',
  },
  {
    value: 'hochschule-bonn-rhein-sieg',
    label: 'Hochschule Bonn-Rhein-Sieg (Harvard, Deutsch)',
  },
  {
    value: 'hochschule-fur-soziale-arbeit-fhnw',
    label: 'Hochschule für Soziale Arbeit FHNW (Deutsch - Schweiz)',
  },
  {
    value: 'hochschule-fur-wirtschaft-und-recht-berlin',
    label: 'Hochschule für Wirtschaft und Recht Berlin (Deutsch)',
  },
  {
    value: 'hochschule-hannover-soziale-arbeit',
    label: 'Hochschule Hannover - Soziale Arbeit (Deutsch)',
  },
  {
    value: 'hochschule-munchen-fakultat-fur-angewandte-sozialwissenschaften',
    label:
      'Hochschule München - Fakultät für Angewandte Sozialwissenschaften (Deutsch)',
  },
  {
    value:
      'hochschule-osnabruck-fakultat-agrarwissenschaften-und-landschaftsarchitektur',
    label:
      'Hochschule Osnabrück - Fakultät Agrarwissenschaften und Landschaftsarchitektur (Deutsch)',
  },
  {
    value: 'hochschule-pforzheim-fakultat-fur-wirtschaft-und-recht',
    label: 'Hochschule Pforzheim - Fakultät für Wirtschaft und Recht (Deutsch)',
  },
  {
    value: 'hong-kong-journal-of-radiology',
    label: 'Hong Kong Journal of Radiology',
  },
  {
    value: 'hospital-a-domicilio',
    label: 'Hospital a Domicilio',
  },
  {
    value: 'housing-studies',
    label: 'Housing Studies',
  },
  {
    value: 'hpb',
    label: 'HPB',
  },
  {
    value: 'human-brain-mapping',
    label: 'Human Brain Mapping',
  },
  {
    value: 'human-ecology',
    label: 'Human Ecology',
  },
  {
    value: 'human-molecular-genetics',
    label: 'Human Molecular Genetics',
  },
  {
    value: 'human-mutation',
    label: 'Human Mutation',
  },
  {
    value: 'human-reproduction-update',
    label: 'Human Reproduction Update',
  },
  {
    value: 'human-reproduction',
    label: 'Human Reproduction',
  },
  {
    value: 'human-resource-management-journal',
    label: 'Human Resource Management Journal',
  },
  {
    value: 'human-rights-law-review',
    label: 'Human Rights Law Review',
  },
  {
    value: 'human-wildlife-interactions',
    label: 'Human-Wildlife Interactions',
  },
  {
    value: 'humanistica-lovaniensia-journal-of-neo-latin-studies',
    label: 'Humanistica Lovaniensia. Journal of Neo-Latin Studies',
  },
  {
    value: 'humboldt-state-university-environmental-resources-engineering',
    label: 'Humboldt State University - Environmental Resources Engineering',
  },
  {
    value: 'hydrobiologia',
    label: 'Hydrobiologia',
  },
  {
    value: 'hydrological-processes',
    label: 'Hydrological Processes',
  },
  {
    value: 'hydrological-sciences-journal',
    label: 'Hydrological Sciences Journal',
  },
  {
    value: 'hypertension-research',
    label: 'Hypertension Research',
  },
  {
    value: 'hypotheses-in-the-life-sciences',
    label: 'Hypotheses in the Life Sciences',
  },
  {
    value: 'hystrix-the-italian-journal-of-mammalogy',
    label: 'Hystrix, the Italian Journal of Mammalogy',
  },
  {
    value: 'iawa-journal',
    label: 'IAWA Journal',
  },
  {
    value: 'ib-tauris-note',
    label: 'I.B. Tauris (note)',
  },
  {
    value: 'ibis',
    label: 'Ibis',
  },
  {
    value: 'ices-journal-of-marine-science',
    label: 'ICES Journal of Marine Science',
  },
  {
    value: 'idojaras-quarterly-journal-of-the-hungarian-meteorological-service',
    label:
      'Időjárás - Quarterly Journal of the Hungarian Meteorological Service',
  },
  {
    value: 'ie-comunicaciones',
    label: 'IE Comunicaciones',
  },
  {
    value: 'ieee-transactions-on-medical-imaging',
    label: 'IEEE Transactions on Medical Imaging',
  },
  {
    value: 'ieee-with-url',
    label: 'IEEE (with URL)',
  },
  {
    value: 'ieee',
    label: 'IEEE',
  },
  {
    value: 'iforest',
    label: 'iForest',
  },
  {
    value: 'igaku-toshokan',
    label: 'Igaku Toshokan (日本語)',
  },
  {
    value: 'iica-catie',
    label: 'IICA-CATIE (Español)',
  },
  {
    value: 'ilahiyat-studies',
    label: 'Ilahiyat Studies (full note)',
  },
  {
    value: 'im-gesprach',
    label: 'Im Gespräch - Hefte der Martin Buber-Gesellschaft (Deutsch)',
  },
  {
    value: 'incontext-studies-in-translation-and-interculturalism',
    label: 'INContext: Studies in Translation and Interculturalism',
  },
  {
    value: 'indian-dermatology-online-journal',
    label: 'Indian Dermatology Online Journal',
  },
  {
    value: 'indian-journal-of-medical-research',
    label: 'Indian Journal of Medical Research',
  },
  {
    value: 'indian-journal-of-orthopaedics',
    label: 'Indian Journal of Orthopaedics',
  },
  {
    value: 'indian-journal-of-physics',
    label: 'Indian Journal of Physics',
  },
  {
    value: 'indian-journal-of-traditional-knowledge',
    label: 'Indian Journal of Traditional Knowledge',
  },
  {
    value: 'indiana',
    label: 'INDIANA',
  },
  {
    value: 'indoor-air',
    label: 'Indoor Air',
  },
  {
    value: 'industrial-relations',
    label: 'Industrial Relations',
  },
  {
    value: 'infectio',
    label: 'Infectio (Español)',
  },
  {
    value: 'infectious-disease-clinics-of-north-america',
    label: 'Infectious Disease Clinics of North America',
  },
  {
    value: 'inflammatory-bowel-diseases',
    label: 'Inflammatory Bowel Diseases',
  },
  {
    value: 'influenza-and-other-respiratory-viruses',
    label: 'Influenza and Other Respiratory Viruses',
  },
  {
    value: 'infoclio-de-kurzbelege',
    label: 'infoclio.ch (Kurzbelege, Deutsch - Schweiz)',
  },
  {
    value: 'infoclio-de',
    label: 'infoclio.ch (Deutsch - Schweiz)',
  },
  {
    value: 'infoclio-fr-nocaps',
    label: 'infoclio.ch (sans majuscules, Français)',
  },
  {
    value: 'infoclio-fr-smallcaps',
    label: 'infoclio.ch (petites majuscules, Français)',
  },
  {
    value: 'infomin',
    label: 'Infomin',
  },
  {
    value: 'informal-logic',
    label: 'Informal Logic',
  },
  {
    value: 'ingenieria-agricola',
    label: 'Ingeniería Agrícola (Español)',
  },
  {
    value: 'innovations-therapeutiques-en-oncologie',
    label: 'Innovations & Thérapeutiques en Oncologie',
  },
  {
    value: 'instap-academic-press',
    label: 'INSTAP Academic Press',
  },
  {
    value: 'institut-francais-darcheologie-orientale-arab-studies',
    label: "Institut français d'archéologie orientale - Arab Studies (English)",
  },
  {
    value: 'institut-francais-darcheologie-orientale-en',
    label: "Institut français d'archéologie orientale - Egyptology (English)",
  },
  {
    value: 'institut-francais-darcheologie-orientale-etudes-arabes',
    label:
      "Institut français d'archéologie orientale - études arabes (Français)",
  },
  {
    value: 'institut-francais-darcheologie-orientale',
    label:
      "Institut français d'archéologie orientale - archéologie et égyptologie (Français)",
  },
  {
    value: 'institut-national-de-la-recherche-scientifique-sciences-sociales',
    label:
      'Institut national de la recherche scientifique - Sciences sociales (author-date, Français)',
  },
  {
    value: 'institut-national-de-recherches-archeologiques-preventives',
    label:
      'Institut national de recherches archéologiques préventives (Français)',
  },
  {
    value: 'institut-national-de-sante-publique-du-quebec-napp',
    label:
      'Institut national de santé publique du Québec - NAPP (Français - Canada)',
  },
  {
    value: 'institut-national-de-sante-publique-du-quebec-topo',
    label:
      'Institut national de santé publique du Québec - TOPO (Français - Canada)',
  },
  {
    value: 'institut-pertanian-bogor',
    label:
      'Institut Pertanian Bogor: Pedoman Penulisan Karya Ilmiah Edisi ke-3 (Bahasa Indonesia)',
  },
  {
    value: 'institut-teknologi-bandung-sekolah-pascasarjana',
    label: 'Institut Teknologi Bandung - Sekolah Pascasarjana',
  },
  {
    value: 'institute-for-operations-research-and-the-management-sciences',
    label: 'Institute for Operations Research and the Management Sciences',
  },
  {
    value: 'institute-of-mathematical-statistics',
    label: 'Institute of Mathematical Statistics journals',
  },
  {
    value: 'institute-of-mathematics-and-its-applications',
    label: 'Institute of Mathematics and its Applications',
  },
  {
    value: 'institute-of-physics-harvard',
    label: 'Institute of Physics - Harvard',
  },
  {
    value: 'institute-of-physics-numeric',
    label: 'Institute of Physics (numeric)',
  },
  {
    value:
      'instituto-brasileiro-de-informacao-em-ciencia-e-tecnologia-abnt-initials',
    label:
      'Instituto Brasileiro de Informação em Ciência e Tecnologia - ABNT (autoria abreviada)',
  },
  {
    value: 'instituto-brasileiro-de-informacao-em-ciencia-e-tecnologia-abnt',
    label:
      'Instituto Brasileiro de Informação em Ciência e Tecnologia - ABNT (autoria completa)',
  },
  {
    value:
      'instituto-de-investigaciones-sobre-la-universidad-y-la-educacion-moderno',
    label:
      'Instituto de Investigaciones sobre la Universidad y la Educación - Moderno (autor-fecha, Español)',
  },
  {
    value: 'instituto-de-pesquisas-energeticas-e-nucleares',
    label:
      'Instituto de Pesquisas Energéticas e Nucleares (Português - Brasil)',
  },
  {
    value: 'instituto-de-pesquisas-tecnologicas',
    label: 'Instituto de Pesquisas Tecnológicas (Português - Brasil)',
  },
  {
    value: 'instituto-superior-de-teologia-de-las-islas-canarias',
    label: 'Instituto Superior de Teología de las Islas Canarias (Español)',
  },
  {
    value: 'integrated-science-publishing-journals',
    label: 'Integrated Science Publishing journals',
  },
  {
    value: 'integrative-and-comparative-biology',
    label: 'Integrative & Comparative Biology',
  },
  {
    value: 'inter-research-science-center',
    label: 'Inter-Research Science Center',
  },
  {
    value: 'inter-ro',
    label: 'INTER: Romanian Review for Theological and Religious Studies',
  },
  {
    value: 'interaction-design-and-architectures',
    label: 'Interaction Design & Architecture(s)',
  },
  {
    value: 'interactive-cardiovascular-and-thoracic-surgery',
    label: 'Interactive CardioVascular and Thoracic Surgery',
  },
  {
    value: 'interdisziplinare-anthropologie',
    label: 'Interdisziplinäre Anthropologie (Deutsch)',
  },
  {
    value: 'interdisziplinare-zeitschrift-fur-technologie-und-lernen',
    label: 'Interdisziplinäre Zeitschrift für Technologie und Lernen (Deutsch)',
  },
  {
    value: 'interkulturelle-germanistik-gottingen',
    label: 'Interkulturelle Germanistik Göttingen (Deutsch)',
  },
  {
    value: 'international-atomic-energy-agency',
    label: 'International Atomic Energy Agency',
  },
  {
    value: 'international-biodeterioration-and-biodegradation',
    label: 'International Biodeterioration & Biodegradation',
  },
  {
    value: 'international-brazilian-journal-of-urology',
    label: 'International Brazilian Journal Of Urology',
  },
  {
    value: 'international-conference-on-information-systems-development',
    label: 'International Conference on Information Systems Development',
  },
  {
    value: 'international-development-policy',
    label: 'International Development Policy',
  },
  {
    value:
      'international-energy-agency-organisation-for-economic-co-operation-and-development',
    label:
      'International Energy Agency - Organisation for Economic Co-operation and Development',
  },
  {
    value:
      'international-islamic-university-malaysia-ahmad-ibrahim-kulliyyah-of-laws',
    label:
      'International Islamic University Malaysia - Ahmad Ibrahim Kulliyyah of Laws',
  },
  {
    value:
      'international-journal-for-numerical-methods-in-biomedical-engineering',
    label:
      'International Journal for Numerical Methods in Biomedical Engineering',
  },
  {
    value: 'international-journal-of-audiology',
    label: 'International Journal of Audiology',
  },
  {
    value: 'international-journal-of-automotive-technology',
    label: 'International Journal of Automotive Technology',
  },
  {
    value: 'international-journal-of-cancer',
    label: 'International Journal of Cancer',
  },
  {
    value: 'international-journal-of-circuit-theory-and-applications',
    label: 'International Journal of Circuit Theory and Applications',
  },
  {
    value: 'international-journal-of-climatology',
    label: 'International Journal of Climatology',
  },
  {
    value: 'international-journal-of-clinical-research',
    label: 'International Journal of Clinical Research',
  },
  {
    value: 'international-journal-of-cosmetic-science',
    label: 'International Journal of Cosmetic Science',
  },
  {
    value: 'international-journal-of-electrochemical-science',
    label: 'International Journal of Electrochemical Science',
  },
  {
    value: 'international-journal-of-electronic-commerce',
    label: 'International Journal of Electronic Commerce',
  },
  {
    value: 'international-journal-of-epidemiology',
    label: 'International Journal of Epidemiology',
  },
  {
    value: 'international-journal-of-exercise-science',
    label: 'International Journal of Exercise Science',
  },
  {
    value: 'international-journal-of-food-science-and-technology',
    label: 'International Journal of Food Science & Technology',
  },
  {
    value: 'international-journal-of-geriatric-psychiatry',
    label: 'International Journal of Geriatric Psychiatry',
  },
  {
    value: 'international-journal-of-humanoid-robotics',
    label: 'International Journal of Humanoid Robotics',
  },
  {
    value: 'international-journal-of-language-and-communication-disorders',
    label: 'International Journal of Language & Communication Disorders',
  },
  {
    value: 'international-journal-of-learner-corpus-research',
    label: 'International Journal of Learner Corpus Research',
  },
  {
    value: 'international-journal-of-lexicography',
    label: 'International Journal of Lexicography',
  },
  {
    value: 'international-journal-of-management-reviews',
    label: 'International Journal of Management Reviews',
  },
  {
    value: 'international-journal-of-nuclear-security',
    label: 'International Journal of Nuclear Security',
  },
  {
    value: 'international-journal-of-obstetric-anesthesia',
    label: 'International Journal of Obstetric Anesthesia',
  },
  {
    value:
      'international-journal-of-occupational-medicine-and-environmental-health',
    label:
      'International Journal of Occupational Medicine and Environmental Health',
  },
  {
    value: 'international-journal-of-oral-and-maxillofacial-surgery',
    label: 'International Journal of Oral and Maxillofacial Surgery',
  },
  {
    value: 'international-journal-of-osteoarchaeology',
    label: 'International Journal of Osteoarchaeology',
  },
  {
    value: 'international-journal-of-plant-sciences',
    label: 'International Journal of Plant Sciences',
  },
  {
    value: 'international-journal-of-polymer-analysis-and-characterization',
    label: 'International Journal of Polymer Analysis and Characterization',
  },
  {
    value:
      'international-journal-of-polymeric-materials-and-polymeric-biomaterials',
    label:
      'International Journal of Polymeric Materials and Polymeric Biomaterials',
  },
  {
    value: 'international-journal-of-population-data-science',
    label: 'International Journal of Population Data Science',
  },
  {
    value: 'international-journal-of-quantum-chemistry',
    label: 'International Journal of Quantum Chemistry',
  },
  {
    value: 'international-journal-of-radiation-oncology-biology-physics',
    label: 'International Journal of Radiation Oncology, Biology, Physics',
  },
  {
    value: 'international-journal-of-research-in-exercise-physiology',
    label: 'International Journal of Research in Exercise Physiology',
  },
  {
    value: 'international-journal-of-simulation-modelling',
    label: 'International Journal of Simulation Modelling',
  },
  {
    value: 'international-journal-of-spatial-data-infrastructures-research',
    label: 'International Journal of Spatial Data Infrastructures Research',
  },
  {
    value: 'international-journal-of-sports-medicine',
    label: 'International Journal of Sport Medicine',
  },
  {
    value: 'international-journal-of-urban-and-regional-research',
    label: 'International Journal of Urban and Regional Research',
  },
  {
    value: 'international-journal-of-wildland-fire',
    label: 'International Journal of Wildland Fire',
  },
  {
    value: 'international-microbiology',
    label: 'International Microbiology',
  },
  {
    value: 'international-organization',
    label: 'International Organization',
  },
  {
    value: 'international-pig-veterinary-society-congress-proceedings',
    label: 'International Pig Veterinary Society Congress Proceedings',
  },
  {
    value: 'international-review-of-the-red-cross',
    label: 'International Review of the Red Cross',
  },
  {
    value: 'international-security',
    label: 'International Security',
  },
  {
    value: 'international-studies-association',
    label: 'International Studies Association',
  },
  {
    value: 'international-union-of-crystallography',
    label: 'International Union of Crystallography journals',
  },
  {
    value: 'international-union-of-forest-research-organizations-headquarters',
    label:
      'International Union of Forest Research Organizations - Headquarters',
  },
  {
    value:
      'inventaire-general-du-patrimoine-culturel-iso-690-full-note-with-ibid',
    label:
      'Inventaire général du patrimoine culturel - ISO-690 (full note, with Ibid., Français)',
  },
  {
    value: 'inventaire-general-du-patrimoine-culturel-iso-690-full-note',
    label:
      'Inventaire général du patrimoine culturel - ISO-690 (full note, Français)',
  },
  {
    value: 'inventaire-general-du-patrimoine-culturel-iso-690-note',
    label:
      'Inventaire général du patrimoine culturel - ISO-690 (note, Français)',
  },
  {
    value: 'invertebrate-biology',
    label: 'Invertebrate Biology',
  },
  {
    value: 'investigative-radiology',
    label: 'Investigative Radiology',
  },
  {
    value: 'invisu',
    label: 'InVisu',
  },
  {
    value: 'ios-press-books',
    label: 'IOS Press (books)',
  },
  {
    value: 'ipag-business-school-apa',
    label: 'IPAG Business School - APA',
  },
  {
    value: 'iran-manual-of-style',
    label: 'Iran Manual of Style - شیوه‌نامه ایران (فارسی)',
  },
  {
    value: 'iranian-journal-of-basic-medical-sciences',
    label: 'Iranian Journal of Basic Medical Sciences',
  },
  {
    value: 'iranian-journal-of-pharmaceutical-research',
    label: 'Iranian Journal of Pharmaceutical Research',
  },
  {
    value: 'irish-historical-studies',
    label: 'Irish Historical Studies',
  },
  {
    value: 'isabella-stewart-gardner-museum',
    label: 'Isabella Stewart Gardner Museum',
  },
  {
    value: 'isnad-dipnotlu',
    label: 'İSNAD Atıf Sistemi 2. Edisyon (dipnotlu)',
  },
  {
    value: 'isnad-metinici',
    label: 'İSNAD Atıf Sistemi 2. Edisyon (metiniçi)',
  },
  {
    value: 'isnad',
    label: 'İSNAD Atıf Sistemi 1. Edisyon (dipnotlu)',
  },
  {
    value: 'iso690-author-date-cs',
    label: 'ISO-690 (author-date, Čeština)',
  },
  {
    value: 'iso690-author-date-de',
    label: 'ISO-690 (author-date, Deutsch)',
  },
  {
    value: 'iso690-author-date-en',
    label: 'ISO-690 (author-date, English)',
  },
  {
    value: 'iso690-author-date-es',
    label: 'ISO-690 (author-date, Español)',
  },
  {
    value: 'iso690-author-date-fr-no-abstract',
    label: 'ISO-690 (author-date, no abstract, Français)',
  },
  {
    value: 'iso690-author-date-fr',
    label: 'ISO-690 (author-date, Français)',
  },
  {
    value: 'iso690-author-date-pt-br',
    label: 'ISO-690 (author-date, Português - Brasil)',
  },
  {
    value: 'iso690-author-date-sk',
    label: 'ISO-690 (author-date, Slovenčina)',
  },
  {
    value: 'iso690-full-note-cs',
    label: 'ISO-690 (full note, Čeština)',
  },
  {
    value: 'iso690-full-note-sk',
    label: 'ISO-690 (full note, Slovenčina)',
  },
  {
    value: 'iso690-full-note-with-ibid-ro',
    label: 'ISO-690 (full note, with Ibid., Română)',
  },
  {
    value: 'iso690-note-cs',
    label: 'ISO-690 (note, without bibliography, Čeština)',
  },
  {
    value: 'iso690-note-fr',
    label: 'ISO-690 (note, no abstract, Français)',
  },
  {
    value: 'iso690-numeric-brackets-cs',
    label: 'ISO-690 (numeric, brackets, Čeština)',
  },
  {
    value: 'iso690-numeric-cs',
    label: 'ISO-690 (numeric, parentheses, Čeština)',
  },
  {
    value: 'iso690-numeric-en',
    label: 'ISO-690 (numeric, English)',
  },
  {
    value: 'iso690-numeric-fr',
    label: 'ISO-690 (numeric, Français)',
  },
  {
    value: 'iso690-numeric-lt',
    label: 'ISO-690 (numeric, Lietuvių kalba)',
  },
  {
    value: 'iso690-numeric-sk',
    label: 'ISO-690 (numeric, Slovenčina)',
  },
  {
    value: 'israel-medical-association-journal',
    label: 'Israel Medical Association Journal',
  },
  {
    value: 'istanbul-medical-journal',
    label: 'İstanbul Medical Journal',
  },
  {
    value: 'istanbul-universitesi-sosyal-bilimler-enstitusu',
    label: 'İstanbul Üniversitesi Sosyal Bilimler Enstitüsü (Türkçe)',
  },
  {
    value: 'italian-journal-of-agronomy',
    label: 'Italian Journal of Agronomy',
  },
  {
    value: 'italus-hortus',
    label: 'Italus Hortus',
  },
  {
    value: 'ithaque',
    label: 'Ithaque (Français - Canada)',
  },
  {
    value: 'iubmb-life',
    label: 'IUBMB Life',
  },
  {
    value: 'ius-ecclesiae',
    label: 'Ius Ecclesiae',
  },
  {
    value: 'izmir-katip-celebi-universitesi-sosyal-bilimler-enstitusu',
    label:
      'İzmir Katip Çelebi Üniversitesi - Sosyal Bilimler Enstitüsü (Türkçe)',
  },
  {
    value: 'jacc-cardiovascular-imaging',
    label: 'JACC: Cardiovascular Imaging',
  },
  {
    value: 'jacc-cardiovascular-interventions',
    label: 'JACC: Cardiovascular Interventions',
  },
  {
    value: 'jahrbuch-der-osterreichischen-byzantinischen-gesellschaft',
    label: 'Jahrbuch der Österreichischen Byzantinischen Gesellschaft',
  },
  {
    value: 'jahrbuch-fur-evangelikale-theologie',
    label: 'Jahrbuch für evangelikale Theologie (Deutsch)',
  },
  {
    value: 'japanese-journal-of-applied-physics',
    label: 'Japanese Journal of Applied Physics',
  },
  {
    value: 'javnost-the-public',
    label: 'Javnost - The Public',
  },
  {
    value: 'jci-insight',
    label: 'JCI Insight',
  },
  {
    value: 'jcom-journal-of-science-communication',
    label: 'JCOM: Journal of Science Communication',
  },
  {
    value:
      'john-benjamins-publishing-company-iconicity-in-language-and-literature',
    label:
      'John Benjamins Publishing Company - Iconicity in Language and Literature',
  },
  {
    value:
      'john-benjamins-publishing-company-linguistik-aktuell-linguistics-today',
    label:
      'John Benjamins Publishing Company - Linguistik Aktuell/Linguistics Today',
  },
  {
    value: 'johnson-matthey-technology-review',
    label: 'Johnson Matthey Technology Review',
  },
  {
    value: 'journal-and-proceedings-of-the-royal-society-of-new-south-wales',
    label: 'Journal and Proceedings of the Royal Society of New South Wales',
  },
  {
    value: 'journal-de-la-societe-des-americanistes',
    label: 'Journal de la Société des américanistes',
  },
  {
    value: 'journal-de-la-societe-des-oceanistes',
    label: 'Journal de la Société des Océanistes',
  },
  {
    value: 'journal-for-the-history-of-astronomy',
    label: 'Journal for the History of Astronomy',
  },
  {
    value: 'journal-for-the-study-of-the-new-testament',
    label: 'Journal for the Study of the New Testament',
  },
  {
    value: 'journal-for-veterinary-medicine-biotechnology-and-biosafety',
    label: 'Journal for Veterinary Medicine, Biotechnology and Biosafety',
  },
  {
    value: 'journal-fur-kulturpflanzen-journal-of-cultivated-plants',
    label: 'Journal für Kulturpflanzen - Journal of Cultivated Plants',
  },
  {
    value: 'journal-fur-kunstgeschichte',
    label: 'Journal für Kunstgeschichte',
  },
  {
    value: 'journal-of-accounting-research',
    label: 'Journal of Accounting Research',
  },
  {
    value: 'journal-of-acoustics',
    label: 'Journal of Acoustics',
  },
  {
    value: 'journal-of-adolescent-health',
    label: 'Journal of Adolescent Health',
  },
  {
    value: 'journal-of-advertising-research',
    label: 'Journal of Advertising Research',
  },
  {
    value: 'journal-of-agricultural-and-applied-economics',
    label: 'Journal of Agricultural and Applied Economics',
  },
  {
    value: 'journal-of-agricultural-and-resource-economics',
    label: 'Journal of Agricultural and Resource Economics',
  },
  {
    value: 'journal-of-alzheimers-disease',
    label: "Journal of Alzheimer's Disease",
  },
  {
    value: 'journal-of-analytical-toxicology',
    label: 'Journal of Analytical Toxicology',
  },
  {
    value: 'journal-of-animal-physiology-and-animal-nutrition',
    label: 'Journal of Animal Physiology and Animal Nutrition',
  },
  {
    value: 'journal-of-animal-science',
    label: 'Journal of Animal Science',
  },
  {
    value: 'journal-of-antimicrobial-chemotherapy',
    label: 'Journal of Antimicrobial Chemotherapy',
  },
  {
    value: 'journal-of-aoac-international',
    label: 'Journal of AOAC International',
  },
  {
    value: 'journal-of-applied-animal-science',
    label: 'Journal of Applied Animal Science',
  },
  {
    value: 'journal-of-applied-clinical-medical-physics',
    label: 'Journal of Applied Clinical Medical Physics',
  },
  {
    value: 'journal-of-applied-entomology',
    label: 'Journal of Applied Entomology',
  },
  {
    value: 'journal-of-applied-pharmaceutical-research',
    label: 'Journal of Applied Pharmaceutical Research',
  },
  {
    value: 'journal-of-applied-philosophy',
    label: 'Journal of Applied Philosophy',
  },
  {
    value: 'journal-of-applied-polymer-science',
    label: 'Journal of Applied Polymer Science',
  },
  {
    value: 'journal-of-archaeological-research',
    label: 'Journal of Archaeological Research',
  },
  {
    value: 'journal-of-atrial-fibrillation',
    label: 'Journal of Atrial Fibrillation',
  },
  {
    value: 'journal-of-australian-strength-and-conditioning',
    label: 'Journal of Australian Strength & Conditioning',
  },
  {
    value: 'journal-of-avian-biology',
    label: 'Journal of Avian Biology',
  },
  {
    value: 'journal-of-basic-microbiology',
    label: 'Journal of Basic Microbiology',
  },
  {
    value: 'journal-of-biological-chemistry',
    label: 'The Journal of Biological Chemistry',
  },
  {
    value: 'journal-of-biological-regulators-and-homeostatic-agents',
    label: 'Journal of Biological Regulators & Homeostatic Agents',
  },
  {
    value: 'journal-of-biomedical-materials-research-part-a',
    label: 'Journal of Biomedical Materials Research Part A',
  },
  {
    value: 'journal-of-biosciences',
    label: 'Journal of Biosciences',
  },
  {
    value: 'journal-of-bone-and-mineral-research',
    label: 'Journal of Bone and Mineral Research',
  },
  {
    value: 'journal-of-brachial-plexus-and-peripheral-nerve-injury',
    label: 'Journal of Brachial Plexus and Peripheral Nerve Injury',
  },
  {
    value: 'journal-of-breast-cancer',
    label: 'Journal of Breast Cancer',
  },
  {
    value: 'journal-of-burn-care-and-research',
    label: 'Journal of Burn Care & Research',
  },
  {
    value: 'journal-of-business-logistics',
    label: 'Journal of Business Logistics',
  },
  {
    value: 'journal-of-cachexia-sarcopenia-and-muscle',
    label: 'Journal of Cachexia, Sarcopenia and Muscle',
  },
  {
    value: 'journal-of-cardiothoracic-and-vascular-anesthesia',
    label: 'Journal of Cardiothoracic and Vascular Anesthesia',
  },
  {
    value: 'journal-of-cellular-and-molecular-medicine',
    label: 'Journal of Cellular and Molecular Medicine',
  },
  {
    value: 'journal-of-cellular-biochemistry',
    label: 'Journal of Cellular Biochemistry',
  },
  {
    value: 'journal-of-chemistry-and-chemical-engineering',
    label: 'Journal of Chemistry and Chemical Engineering',
  },
  {
    value: 'journal-of-chemometrics',
    label: 'Journal of Chemometrics',
  },
  {
    value: 'journal-of-clinical-and-translational-science',
    label: 'Journal of Clinical and Translational Science',
  },
  {
    value: 'journal-of-clinical-neurology',
    label: 'Journal of Clinical Neurology',
  },
  {
    value: 'journal-of-clinical-neurophysiology',
    label: 'Journal of Clinical Neurophysiology',
  },
  {
    value: 'journal-of-clinical-oncology',
    label: 'Journal of Clinical Oncology',
  },
  {
    value: 'journal-of-clinical-rheumatology',
    label: 'Journal of Clinical Rheumatology',
  },
  {
    value: 'journal-of-clinical-sleep-medicine',
    label: 'Journal of Clinical Sleep Medicine',
  },
  {
    value: 'journal-of-combinatorics',
    label: 'Journal of Combinatorics',
  },
  {
    value: 'journal-of-common-market-studies',
    label: 'Journal of Common Market Studies',
  },
  {
    value: 'journal-of-comparative-pathology',
    label: 'Journal of Comparative Pathology',
  },
  {
    value: 'journal-of-computational-chemistry',
    label: 'Journal of Computational Chemistry',
  },
  {
    value: 'journal-of-computer-applications-in-archaeology',
    label: 'Journal of Computer Applications in Archaeology',
  },
  {
    value: 'journal-of-computer-assisted-tomography',
    label: 'Journal of Computer Assisted Tomography',
  },
  {
    value: 'journal-of-computer-information-systems',
    label: 'Journal of Computer Information Systems',
  },
  {
    value: 'journal-of-consumer-research',
    label: 'Journal of Consumer Research',
  },
  {
    value: 'journal-of-contemporary-medicine',
    label: 'Journal of Contemporary Medicine',
  },
  {
    value: 'journal-of-contemporary-water-research-and-education',
    label: 'Journal of Contemporary Water Research and Education',
  },
  {
    value: 'journal-of-crohns-and-colitis-supplements',
    label: "Journal of Crohn's and Colitis Supplements",
  },
  {
    value: 'journal-of-crohns-and-colitis',
    label: "Journal of Crohn's and Colitis",
  },
  {
    value: 'journal-of-dairy-science',
    label: 'Journal of Dairy Science',
  },
  {
    value: 'journal-of-dental-research',
    label: 'Journal of Dental Research',
  },
  {
    value: 'journal-of-early-christian-studies',
    label: 'Journal of Early Christian Studies',
  },
  {
    value: 'journal-of-economic-impact',
    label: 'Journal of Economic Impact',
  },
  {
    value: 'journal-of-egyptian-history',
    label: 'Journal of Egyptian History',
  },
  {
    value: 'journal-of-elections-public-opinion-and-parties',
    label: 'Journal of Elections, Public Opinion & Parties',
  },
  {
    value: 'journal-of-endodontics',
    label: 'Journal of Endodontics',
  },
  {
    value: 'journal-of-environmental-science-and-health-part-b',
    label: 'Journal of Environmental Science and Health, Part B',
  },
  {
    value: 'journal-of-ethnobiology',
    label: 'Journal of Ethnobiology',
  },
  {
    value: 'journal-of-european-public-policy',
    label: 'Journal of European Public Policy',
  },
  {
    value: 'journal-of-evolution-and-health',
    label: 'Journal of Evolution and Health',
  },
  {
    value: 'journal-of-evolutionary-biology',
    label: 'Journal of Evolutionary Biology',
  },
  {
    value: 'journal-of-experimental-botany',
    label: 'Journal of Experimental Botany',
  },
  {
    value: 'journal-of-field-ornithology',
    label: 'Journal of Field Ornithology',
  },
  {
    value: 'journal-of-finance',
    label: 'Journal of Finance',
  },
  {
    value: 'journal-of-financial-and-quantitative-analysis',
    label: 'Journal of Financial and Quantitative Analysis',
  },
  {
    value: 'journal-of-fish-biology',
    label: 'Journal of Fish Biology',
  },
  {
    value: 'journal-of-food-protection',
    label: 'Journal of Food Protection',
  },
  {
    value: 'journal-of-foraminiferal-research',
    label: 'Journal of Foraminiferal Research',
  },
  {
    value: 'journal-of-forensic-sciences',
    label: 'Journal of Forensic Sciences',
  },
  {
    value: 'journal-of-frailty-and-aging',
    label: 'Journal of Frailty & Aging',
  },
  {
    value: 'journal-of-geriatric-psychiatry-and-neurology',
    label: 'Journal of Geriatric Psychiatry and Neurology',
  },
  {
    value: 'journal-of-glaciology',
    label: 'Journal of Glaciology',
  },
  {
    value: 'journal-of-global-health',
    label: 'Journal of Global Health',
  },
  {
    value: 'journal-of-health-care-for-the-poor-and-underserved',
    label: 'Journal of Health Care for the Poor and Underserved',
  },
  {
    value: 'journal-of-hearing-science',
    label: 'Journal of Hearing Science',
  },
  {
    value: 'journal-of-historical-linguistics',
    label: 'Journal of Historical Linguistics',
  },
  {
    value: 'journal-of-human-evolution',
    label: 'Journal of Human Evolution',
  },
  {
    value: 'journal-of-human-rights',
    label: 'Journal of Human Rights',
  },
  {
    value: 'journal-of-hypertension',
    label: 'Journal of Hypertension',
  },
  {
    value: 'journal-of-industrial-and-engineering-chemistry',
    label: 'Journal of Industrial and Engineering Chemistry',
  },
  {
    value: 'journal-of-industrial-ecology',
    label: 'Journal of Industrial Ecology',
  },
  {
    value: 'journal-of-infection',
    label: 'Journal of Infection',
  },
  {
    value: 'journal-of-infectious-diseases',
    label: 'Journal of Infectious Diseases',
  },
  {
    value: 'journal-of-information-technology',
    label: 'Journal of Information Technology',
  },
  {
    value: 'journal-of-institutional-and-theoretical-economics',
    label: 'Journal of Institutional and Theoretical Economics',
  },
  {
    value: 'journal-of-instrumentation',
    label: 'Journal of Instrumentation',
  },
  {
    value: 'journal-of-integrated-omics',
    label: 'Journal of Integrated OMICS',
  },
  {
    value: 'journal-of-interactive-marketing',
    label: 'Journal of Interactive Marketing',
  },
  {
    value: 'journal-of-intercultural-studies',
    label: 'Journal of Intercultural Studies',
  },
  {
    value: 'journal-of-internal-medicine',
    label: 'Journal of Internal Medicine',
  },
  {
    value: 'journal-of-international-business-studies',
    label: 'Journal of International Business Studies',
  },
  {
    value: 'journal-of-international-economic-law',
    label: 'Journal of International Economic Law',
  },
  {
    value: 'journal-of-international-peacekeeping',
    label: 'Journal of International Peacekeeping',
  },
  {
    value: 'journal-of-international-relations-and-development',
    label: 'Journal of International Relations and Development',
  },
  {
    value: 'journal-of-investigative-dermatology',
    label: 'Journal of Investigative Dermatology',
  },
  {
    value: 'journal-of-jewish-studies',
    label: 'Journal of Jewish Studies',
  },
  {
    value: 'journal-of-korean-neurosurgical-society',
    label: 'Journal of Korean Neurosurgical Society',
  },
  {
    value: 'journal-of-leukocyte-biology',
    label: 'Journal of Leukocyte Biology',
  },
  {
    value: 'journal-of-limnology',
    label: 'Journal of Limnology',
  },
  {
    value: 'journal-of-linguistics',
    label: 'Journal of Linguistics',
  },
  {
    value: 'journal-of-lipid-research',
    label: 'Journal of Lipid Research',
  },
  {
    value: 'journal-of-magnetic-resonance-imaging',
    label: 'Journal Of Magnetic Resonance Imaging',
  },
  {
    value: 'journal-of-mammalogy',
    label: 'Journal of Mammalogy',
  },
  {
    value: 'journal-of-management-information-systems',
    label: 'Journal of Management Information Systems',
  },
  {
    value: 'journal-of-management-studies',
    label: 'Journal of Management Studies',
  },
  {
    value: 'journal-of-management',
    label: 'Journal of Management',
  },
  {
    value: 'journal-of-materials-research',
    label: 'Journal of Materials Research',
  },
  {
    value: 'journal-of-mechanical-science-and-technology',
    label: 'Journal of Mechanical Science and Technology',
  },
  {
    value: 'journal-of-medical-genetics',
    label: 'Journal of Medical Genetics',
  },
  {
    value: 'journal-of-medical-internet-research',
    label: 'Journal of Medical Internet Research',
  },
  {
    value: 'journal-of-microbiology-and-biotechnology',
    label: 'Journal of Microbiology and Biotechnology',
  },
  {
    value: 'journal-of-microbiology',
    label: 'Journal of Microbiology',
  },
  {
    value: 'journal-of-minimally-invasive-gynecology',
    label: 'Journal of Minimally Invasive Gynecology',
  },
  {
    value: 'journal-of-molecular-cell-biology',
    label: 'Journal of Molecular Cell Biology',
  },
  {
    value: 'journal-of-molecular-endocrinology',
    label: 'Journal of Molecular Endocrinology',
  },
  {
    value: 'journal-of-molecular-recognition',
    label: 'Journal of Molecular Recognition',
  },
  {
    value: 'journal-of-molecular-signaling',
    label: 'Journal of Molecular Signaling',
  },
  {
    value: 'journal-of-move-and-therapeutic-science',
    label: 'Journal of Move and Therapeutic Science',
  },
  {
    value: 'journal-of-musculoskeletal-research',
    label: 'Journal of Musculoskeletal Research',
  },
  {
    value: 'journal-of-music-technology-and-education',
    label: 'Journal of Music Technology and Education',
  },
  {
    value: 'journal-of-nanoscience-and-nanotechnology',
    label: 'Journal of Nanoscience and Nanotechnology',
  },
  {
    value: 'journal-of-natural-history',
    label: 'Journal of Natural History',
  },
  {
    value: 'journal-of-neolithic-archaeology',
    label: 'Journal of Neolithic Archaeology',
  },
  {
    value: 'journal-of-neurochemistry',
    label: 'Journal of Neurochemistry',
  },
  {
    value: 'journal-of-neuroendocrinology',
    label: 'Journal of Neuroendocrinology',
  },
  {
    value: 'journal-of-neurological-disorders',
    label: 'Journal of Neurological Disorders',
  },
  {
    value: 'journal-of-neurophysiology',
    label: 'Journal of Neurophysiology',
  },
  {
    value: 'journal-of-neuroscience-and-neuroengineering',
    label: 'Journal of Neuroscience and Neuroengineering',
  },
  {
    value: 'journal-of-new-zealand-grasslands',
    label: 'Journal of New Zealand Grasslands',
  },
  {
    value: 'journal-of-nutrition',
    label: 'Journal of Nutrition',
  },
  {
    value: 'journal-of-oil-palm-research',
    label: 'Journal of Oil Palm Research',
  },
  {
    value: 'journal-of-open-research-software',
    label: 'Journal of Open Research Software',
  },
  {
    value: 'journal-of-oral-and-maxillofacial-surgery',
    label: 'Journal of Oral and Maxillofacial Surgery',
  },
  {
    value: 'journal-of-orthopaedic-research',
    label: 'Journal of Orthopaedic Research',
  },
  {
    value: 'journal-of-orthopaedic-trauma',
    label: 'Journal of Orthopaedic Trauma',
  },
  {
    value: 'journal-of-orthopaedics-trauma-and-rehabilitation',
    label: 'Journal of Orthopaedics, Trauma and Rehabilitation',
  },
  {
    value: 'journal-of-paleontology',
    label: 'Journal of Paleontology',
  },
  {
    value: 'journal-of-peace-research',
    label: 'Journal of Peace Research',
  },
  {
    value: 'journal-of-pediatric-gastroenterology-and-nutrition',
    label: 'Journal of Pediatric Gastroenterology and Nutrition',
  },
  {
    value: 'journal-of-peptide-science',
    label: 'Journal of Peptide Science',
  },
  {
    value: 'journal-of-perinatal-medicine',
    label: 'Journal of Perinatal Medicine',
  },
  {
    value: 'journal-of-periodontal-research',
    label: 'Journal of Periodontal Research',
  },
  {
    value: 'journal-of-petrology',
    label: 'Journal of Petrology',
  },
  {
    value: 'journal-of-pharmacy-and-pharmacology',
    label: 'Journal of Pharmacy and Pharmacology',
  },
  {
    value: 'journal-of-phycology',
    label: 'Journal of Phycology',
  },
  {
    value: 'journal-of-physical-therapy-science',
    label: 'Journal of Physical Therapy Science',
  },
  {
    value: 'journal-of-plankton-research',
    label: 'Journal of Plankton Research',
  },
  {
    value: 'journal-of-plant-ecology',
    label: 'Journal of Plant Ecology',
  },
  {
    value: 'journal-of-plant-nutrition-and-soil-science',
    label: 'Journal of Plant Nutrition and Soil Science',
  },
  {
    value: 'journal-of-plant-protection-research',
    label: 'Journal of Plant Protection Research',
  },
  {
    value: 'journal-of-political-ideologies',
    label: 'Journal of Political Ideologies',
  },
  {
    value: 'journal-of-political-philosophy',
    label: 'Journal of Political Philosophy',
  },
  {
    value: 'journal-of-pollination-ecology',
    label: 'Journal of Pollination Ecology',
  },
  {
    value: 'journal-of-polymer-science-part-a-polymer-chemistry',
    label: 'Journal of Polymer Science Part A: Polymer Chemistry',
  },
  {
    value: 'journal-of-porphyrins-and-phthalocyanines',
    label: 'Journal of Porphyrins and Phthalocyanines',
  },
  {
    value: 'journal-of-product-innovation-management',
    label: 'Journal of Product Innovation Management',
  },
  {
    value: 'journal-of-psychiatric-and-mental-health-nursing',
    label: 'Journal of Psychiatric and Mental Health Nursing',
  },
  {
    value: 'journal-of-psychiatry-and-neuroscience',
    label: 'Journal of Psychiatry & Neuroscience',
  },
  {
    value: 'journal-of-raman-spectroscopy',
    label: 'Journal of Raman Spectroscopy',
  },
  {
    value: 'journal-of-reconstructive-microsurgery',
    label: 'Journal of Reconstructive Microsurgery',
  },
  {
    value: 'journal-of-refugee-studies',
    label: 'Journal of Refugee Studies',
  },
  {
    value: 'journal-of-retailing',
    label: 'Journal of Retailing',
  },
  {
    value: 'journal-of-rheumatology',
    label: 'Journal of Rheumatology',
  },
  {
    value: 'journal-of-roman-archaeology-a',
    label: 'Journal of Roman Archaeology (A)',
  },
  {
    value: 'journal-of-roman-archaeology-b',
    label: 'Journal of Roman Archaeology (B)',
  },
  {
    value: 'journal-of-science-and-medicine-in-sport',
    label: 'Journal of Science and Medicine in Sport',
  },
  {
    value: 'journal-of-separation-science',
    label: 'Journal of Separation Science',
  },
  {
    value: 'journal-of-shoulder-and-elbow-surgery',
    label: 'Journal of Shoulder and Elbow Surgery',
  },
  {
    value: 'journal-of-simulation',
    label: 'Journal of Simulation',
  },
  {
    value: 'journal-of-sleep-research',
    label: 'Journal of Sleep Research',
  },
  {
    value: 'journal-of-small-animal-practice',
    label: 'Journal of Small Animal Practice',
  },
  {
    value: 'journal-of-small-business-management',
    label: 'Journal of Small Business Management',
  },
  {
    value: 'journal-of-social-archaeology',
    label: 'Journal of Social Archaeology',
  },
  {
    value: 'journal-of-social-philosophy',
    label: 'Journal of Social Philosophy',
  },
  {
    value: 'journal-of-soil-and-water-conservation',
    label: 'Journal of Soil and Water Conservation',
  },
  {
    value: 'journal-of-soil-science-and-plant-nutrition',
    label: 'Journal of Soil Science and Plant Nutrition',
  },
  {
    value: 'journal-of-sport-and-health-science',
    label: 'Journal of Sport and Health Science',
  },
  {
    value: 'journal-of-sports-science-and-medicine',
    label: 'Journal of Sports Science & Medicine',
  },
  {
    value: 'journal-of-strength-and-conditioning-research',
    label: 'Journal of Strength and Conditioning Research',
  },
  {
    value: 'journal-of-stroke',
    label: 'Journal of Stroke',
  },
  {
    value: 'journal-of-structural-geology',
    label: 'Journal of Structural Geology',
  },
  {
    value: 'journal-of-studies-on-alcohol-and-drugs',
    label: 'Journal of Studies on Alcohol and Drugs',
  },
  {
    value: 'journal-of-surgery-and-medicine',
    label: 'Journal of Surgery and Medicine',
  },
  {
    value: 'journal-of-surgical-oncology',
    label: 'Journal of Surgical Oncology',
  },
  {
    value: 'journal-of-systematic-palaeontology',
    label: 'Journal of Systematic Palaeontology',
  },
  {
    value: 'journal-of-the-air-and-waste-management-association',
    label: 'Journal of the Air & Waste Management Association',
  },
  {
    value: 'journal-of-the-american-academy-of-audiology',
    label: 'Journal of the American Academy of Audiology',
  },
  {
    value: 'journal-of-the-american-academy-of-orthopaedic-surgeons',
    label: 'Journal of the American Academy of Orthopaedic Surgeons',
  },
  {
    value: 'journal-of-the-american-animal-hospital-association',
    label: 'Journal of the American Animal Hospital Association',
  },
  {
    value: 'journal-of-the-american-association-of-laboratory-animal-science',
    label: 'Journal of the American Association of Laboratory Animal Science',
  },
  {
    value: 'journal-of-the-american-ceramic-society',
    label: 'Journal of the American Ceramic Society',
  },
  {
    value: 'journal-of-the-american-college-of-cardiology',
    label: 'Journal of the American College of Cardiology',
  },
  {
    value: 'journal-of-the-american-college-of-surgeons',
    label: 'Journal of the American College of Surgeons',
  },
  {
    value: 'journal-of-the-american-heart-association',
    label: 'Journal of the American Heart Association',
  },
  {
    value: 'journal-of-the-american-society-of-brewing-chemists',
    label: 'Journal of the American Society of Brewing Chemists',
  },
  {
    value: 'journal-of-the-american-society-of-nephrology',
    label: 'Journal of the American Society of Nephrology',
  },
  {
    value: 'journal-of-the-american-water-resources-association',
    label: 'Journal of the American Water Resources Association',
  },
  {
    value: 'journal-of-the-association-for-information-systems',
    label: 'Journal of the Association for Information Systems',
  },
  {
    value:
      'journal-of-the-association-of-environmental-and-resource-economists',
    label:
      'Journal of the Association of Environmental and Resource Economists',
  },
  {
    value: 'journal-of-the-botanical-research-institute-of-texas',
    label: 'Journal of the Botanical Research Institute of Texas',
  },
  {
    value: 'journal-of-the-brazilian-chemical-society',
    label: 'Journal of the Brazilian Chemical Society',
  },
  {
    value: 'journal-of-the-electrochemical-society',
    label: 'Journal of The Electrochemical Society',
  },
  {
    value: 'journal-of-the-european-academy-of-dermatology-and-venereology',
    label: 'Journal of the European Academy of Dermatology and Venereology',
  },
  {
    value: 'journal-of-the-history-of-collections',
    label: 'Journal of the History of Collections',
  },
  {
    value: 'journal-of-the-indian-law-institute',
    label: 'Journal of the Indian Law Institute',
  },
  {
    value: 'journal-of-the-korean-society-of-civil-engineers',
    label: 'Journal of the Korean Society of Civil Engineers',
  },
  {
    value: 'journal-of-the-marine-biological-association-of-the-united-kingdom',
    label: 'Journal of the Marine Biological Association of the United Kingdom',
  },
  {
    value: 'journal-of-the-royal-anthropological-institute',
    label: 'Journal of the Royal Anthropological Institute',
  },
  {
    value: 'journal-of-the-royal-society-of-western-australia',
    label: 'Journal of the Royal Society of Western Australia',
  },
  {
    value: 'journal-of-the-royal-statistical-society',
    label: 'Journal of the Royal Statistical Society',
  },
  {
    value: 'journal-of-the-science-of-food-and-agriculture',
    label: 'Journal of the Science of Food and Agriculture',
  },
  {
    value: 'journal-of-the-serbian-chemical-society',
    label: 'Journal of the Serbian Chemical Society',
  },
  {
    value: 'journal-of-the-warburg-and-courtauld-institutes',
    label: 'Journal of the Warburg and Courtauld Institutes',
  },
  {
    value: 'journal-of-thermal-spray-technology',
    label: 'Journal of Thermal Spray Technology',
  },
  {
    value: 'journal-of-threatened-taxa',
    label: 'Journal of Threatened Taxa',
  },
  {
    value: 'journal-of-thrombosis-and-haemostasis',
    label: 'Journal of Thrombosis and Haemostasis',
  },
  {
    value: 'journal-of-tropical-ecology',
    label: 'Journal of Tropical Ecology',
  },
  {
    value: 'journal-of-tropical-life-science',
    label: 'Journal of Tropical Life Science',
  },
  {
    value: 'journal-of-universal-computer-science',
    label: 'Journal of Universal Computer Science',
  },
  {
    value: 'journal-of-urban-and-environmental-engineering',
    label: 'Journal of Urban and Environmental Engineering',
  },
  {
    value: 'journal-of-urban-technology',
    label: 'Journal of Urban Technology',
  },
  {
    value: 'journal-of-value-inquiry',
    label: 'The Journal of Value Inquiry',
  },
  {
    value: 'journal-of-vegetation-science',
    label: 'Journal of Vegetation Science',
  },
  {
    value: 'journal-of-vertebrate-biology',
    label: 'Journal of Vertebrate Biology',
  },
  {
    value: 'journal-of-vertebrate-paleontology',
    label: 'Journal of Vertebrate Paleontology',
  },
  {
    value: 'journal-of-vestibular-research',
    label: 'Journal of Vestibular Research',
  },
  {
    value: 'journal-of-veterinary-diagnostic-investigation',
    label: 'Journal of Veterinary Diagnostic Investigation',
  },
  {
    value: 'journal-of-visualized-experiments',
    label: 'Journal of Visualized Experiments',
  },
  {
    value: 'journal-of-water-sanitation-and-hygiene-for-development',
    label: 'Journal of Water Sanitation and Hygiene for Development',
  },
  {
    value: 'journal-of-wildlife-diseases',
    label: 'Journal of Wildlife Diseases',
  },
  {
    value: 'journal-of-zoo-and-wildlife-medicine',
    label: 'Journal of Zoo and Wildlife Medicine',
  },
  {
    value: 'journal-of-zoo-biology',
    label: 'Journal of Zoo Biology',
  },
  {
    value: 'journal-of-zoology',
    label: 'Journal of Zoology',
  },
  {
    value: 'journal-on-efficiency-and-responsibility-in-education-and-science',
    label: 'Journal on Efficiency and Responsibility in Education and Science',
  },
  {
    value: 'journalistica',
    label: 'Journalistica (Dansk)',
  },
  {
    value: 'jurisprudence',
    label: 'Jurisprudence (Čeština)',
  },
  {
    value: 'juristische-schulung',
    label: 'Juristische Schulung (Deutsch)',
  },
  {
    value: 'juristische-zitierweise-offentliches-recht',
    label: 'Juristische Zitierweise - Öffentliches Recht (Deutsch)',
  },
  {
    value: 'juristische-zitierweise-schweizer',
    label:
      'Juristische Zitierweise Schweizer (Ryser Büschi et al.) (Deutsch - Schweiz)',
  },
  {
    value: 'juristische-zitierweise',
    label: 'Juristische Zitierweise (Stüber) (Deutsch)',
  },
  {
    value: 'jurnal-ilmu-dan-teknologi-hasil-ternak',
    label: 'Jurnal Ilmu dan Teknologi Hasil Ternak',
  },
  {
    value: 'jurnal-pangan-dan-agroindustri',
    label: 'Jurnal Pangan dan Agroindustri (Bahasa Indonesia)',
  },
  {
    value: 'jurnal-sains-farmasi-dan-klinis',
    label: 'Jurnal Sains Farmasi & Klinis',
  },
  {
    value: 'jyvaskylan-yliopisto-kemian-laitos',
    label: 'Jyväskylän yliopisto - Kemian laitos (Suomi)',
  },
  {
    value: 'karabuk-university-graduate-school-of-natural-and-applied-sciences',
    label:
      'Karabuk University - Graduate School of Natural and Applied Sciences',
  },
  {
    value: 'karger-journals-author-date',
    label: 'Karger journals (author-date)',
  },
  {
    value: 'karger-journals',
    label: 'Karger journals',
  },
  {
    value: 'karlstad-universitet-harvard',
    label: 'Karlstad Universitet - Harvard (Svenska)',
  },
  {
    value: 'karstenia',
    label: 'Karstenia',
  },
  {
    value: 'keel-ja-kirjandus',
    label: 'Keel ja Kirjandus (Eesti keel)',
  },
  {
    value: 'kidney-research-and-clinical-practice',
    label: 'Kidney Research and Clinical Practice',
  },
  {
    value: 'kindheit-und-entwicklung',
    label: 'Kindheit und Entwicklung',
  },
  {
    value:
      'kit-karlsruher-institut-fur-technologie-germanistik-ndl-neuere-deutsche-literaturwissenschaft',
    label:
      'KIT Karlsruher Institut für Technologie Germanistik NDL Neuere Deutsche Literaturwissenschaft (German)',
  },
  {
    value: 'klinische-padiatrie',
    label: 'Klinische Pädiatrie',
  },
  {
    value: 'knee-surgery-and-related-research',
    label: 'Knee Surgery & Related Research',
  },
  {
    value: 'knee-surgery-sports-traumatology-arthroscopy',
    label: 'Knee Surgery, Sports Traumatology, Arthroscopy',
  },
  {
    value: 'knowledge-and-management-of-aquatic-ecosystems',
    label: 'Knowledge & Management of Aquatic Ecosystems',
  },
  {
    value: 'kolner-zeitschrift-fur-soziologie-und-sozialpsychologie',
    label: 'Kölner Zeitschrift für Soziologie und Sozialpsychologie (Deutsch)',
  },
  {
    value: 'kommunikation-und-recht',
    label: 'Kommunikation und Recht (Deutsch)',
  },
  {
    value: 'kona-powder-and-particle-journal',
    label: 'KONA Powder and Particle Journal',
  },
  {
    value: 'korean-journal-of-anesthesiology',
    label: 'Korean Journal of Anesthesiology',
  },
  {
    value: 'korean-journal-of-radiology',
    label: 'Korean Journal of Radiology',
  },
  {
    value: 'kritische-ausgabe',
    label: 'Kritische Ausgabe (Deutsch)',
  },
  {
    value: 'ksce-journal-of-civil-engineering',
    label: 'KSCE Journal of Civil Engineering',
  },
  {
    value:
      'kth-royal-institute-of-technology-school-of-computer-science-and-communication-sv',
    label:
      'KTH Royal Institute of Technology - School of Computer Science and Communication (Svenska)',
  },
  {
    value:
      'kth-royal-institute-of-technology-school-of-computer-science-and-communication',
    label:
      'KTH Royal Institute of Technology - School of Computer Science and Communication',
  },
  {
    value: 'kunstakademie-munster',
    label: 'Kunstakademie Münster (Deutsch)',
  },
  {
    value: 'l-homme',
    label: "L'homme – Revue française d'anthropologie",
  },
  {
    value: 'la-revue-des-sciences-de-gestion',
    label: 'La Revue des Sciences de Gestion (Français)',
  },
  {
    value: 'la-trobe-university-apa',
    label: 'La Trobe University - APA 6th edition',
  },
  {
    value: 'la-trobe-university-harvard',
    label: 'La Trobe University - Harvard',
  },
  {
    value: 'laboratory-animal-science-professional',
    label: 'Laboratory Animal Science Professional',
  },
  {
    value: 'lancaster-university-harvard',
    label: 'Lancaster University - Harvard',
  },
  {
    value: 'land-degradation-and-development',
    label: 'Land Degradation & Development',
  },
  {
    value: 'landes-bioscience-journals',
    label: 'Landes Bioscience Journals',
  },
  {
    value: 'language-in-society',
    label: 'Language in Society',
  },
  {
    value: 'language',
    label: 'Language',
  },
  {
    value: 'lannee-sociologique',
    label: 'L’Année sociologique (Français)',
  },
  {
    value: 'laser-and-photonics-reviews',
    label: 'Laser & Photonics Reviews',
  },
  {
    value: 'latin-american-perspectives',
    label: 'Latin American Perspectives',
  },
  {
    value: 'latin-american-research-review',
    label: 'Latin American Research Review',
  },
  {
    value: 'lauterbornia',
    label:
      'Lauterbornia - Internationale Zeitschrift für Faunistik und Floristik des Süßwassers (Deutsch)',
  },
  {
    value: 'law-and-society-review',
    label: 'Law & Society Review',
  },
  {
    value: 'law-citation-manual',
    label: 'Law Citation Manual (中法学注引手册, 中文)',
  },
  {
    value: 'law-technology-and-humans',
    label: 'Law, Technology and Humans',
  },
  {
    value: 'lcgc',
    label: 'LCGC',
  },
  {
    value: 'le-mouvement-social',
    label: 'Le Mouvement Social (Français)',
  },
  {
    value: 'le-tapuscrit-author-date',
    label:
      'Le tapuscrit (École des hautes études en sciences sociales) (author-date, Français)',
  },
  {
    value: 'le-tapuscrit-note',
    label:
      'Le tapuscrit (École des hautes études en sciences sociales) (note, Français)',
  },
  {
    value: 'leiden-journal-of-international-law',
    label: 'Leiden Journal of International Law',
  },
  {
    value: 'leidraad-voor-juridische-auteurs',
    label: 'Leidraad voor juridische auteurs 2019 (Nederlands)',
  },
  {
    value: 'leonardo',
    label: 'Leonardo',
  },
  {
    value: 'les-cahiers-du-journalisme',
    label: 'Les Cahiers du journalisme (Français)',
  },
  {
    value: 'les-journees-de-la-recherche-avicole',
    label: 'Les Journées de la Recherche Avicole (Français)',
  },
  {
    value: 'les-journees-de-la-recherche-porcine',
    label: 'Les Journées de la Recherche Porcine (Français)',
  },
  {
    value: 'les-nouvelles-de-l-archeologie',
    label: "Les nouvelles de l'archéologie (Français)",
  },
  {
    value: 'lethaia',
    label: 'Lethaia',
  },
  {
    value: 'letters-in-applied-microbiology',
    label: 'Letters in Applied Microbiology',
  },
  {
    value: 'lettres-et-sciences-humaines-fr',
    label: 'Lettres et Sciences Humaines (biblio et notes, Français)',
  },
  {
    value: 'leviathan',
    label: 'Leviathan (Deutsch)',
  },
  {
    value: 'lien-social-et-politiques',
    label: 'Lien social et Politiques (Français)',
  },
  {
    value: 'limnetica',
    label: 'Limnetica',
  },
  {
    value: 'limnology-and-oceanography',
    label: 'Limnology and Oceanography',
  },
  {
    value: 'liver-international',
    label: 'Liver International',
  },
  {
    value: 'liverpool-john-moores-university-harvard',
    label: 'Liverpool John Moores University - Harvard',
  },
  {
    value: 'lluelles-no-ibid',
    label:
      'Guide des références pour la rédaction juridique 7e édition (Notes complètes) (Guide Lluelles, no Ibid., Français - Canada)',
  },
  {
    value: 'lluelles',
    label:
      'Guide des références pour la rédaction juridique 7e édition (Guide Lluelles, Français - Canada)',
  },
  {
    value: 'london-metropolitan-university-harvard',
    label: 'London Metropolitan University - Harvard',
  },
  {
    value: 'london-review-of-international-law',
    label: 'London Review of International Law',
  },
  {
    value: 'london-south-bank-university-numeric',
    label: 'London South Bank University (numeric)',
  },
  {
    value: 'lund-university-school-of-economics-and-management',
    label: 'Lund University School of Economics and Management',
  },
  {
    value: 'macromolecular-reaction-engineering',
    label: 'Macromolecular Reaction Engineering',
  },
  {
    value: 'magnetic-resonance-in-medical-sciences',
    label: 'Magnetic Resonance in Medical Sciences',
  },
  {
    value: 'magnetic-resonance-in-medicine',
    label: 'Magnetic Resonance in Medicine',
  },
  {
    value: 'magnetic-resonance-materials-in-physics-biology-and-medicine',
    label: 'Magnetic Resonance Materials in Physics, Biology and Medicine',
  },
  {
    value: 'maison-de-l-orient-et-de-la-mediterranee-en',
    label: "Maison de l'Orient et de la Méditerranée (English)",
  },
  {
    value: 'maison-de-l-orient-et-de-la-mediterranee',
    label: "Maison de l'Orient et de la Méditerranée (Français)",
  },
  {
    value: 'malaysian-orthopaedic-journal',
    label: 'Malaysian Orthopaedic Journal',
  },
  {
    value: 'mammal-review',
    label: 'Mammal Review',
  },
  {
    value: 'mammalia',
    label: 'Mammalia',
  },
  {
    value: 'mammalogy-notes',
    label: 'Mammalogy Notes',
  },
  {
    value: 'management-et-avenir',
    label: 'Management & Avenir (Français)',
  },
  {
    value: 'management-international',
    label: 'Management international',
  },
  {
    value: 'management-of-biological-invasions',
    label: 'Management of Biological Invasions',
  },
  {
    value: 'manchester-university-press-author-date',
    label: 'Manchester University Press monographs (author-date)',
  },
  {
    value: 'manchester-university-press',
    label: 'Manchester University Press monographs (note)',
  },
  {
    value: 'marine-biology',
    label: 'Marine Biology',
  },
  {
    value: 'marine-mammal-science',
    label: 'Marine Mammal Science',
  },
  {
    value: 'marine-ornithology',
    label: 'Marine Ornithology',
  },
  {
    value: 'marine-turtle-newsletter',
    label: 'Marine Turtle Newsletter',
  },
  {
    value: 'marmara-universitesi-turkiyat-arastirmalari-enstitusu',
    label: 'Marmara Üniversitesi - Türkiyat Araştırmaları Enstitüsü (Türkçe)',
  },
  {
    value: 'mary-ann-liebert-harvard',
    label: 'Mary Ann Liebert - Harvard',
  },
  {
    value: 'mary-ann-liebert-vancouver',
    label: 'Mary Ann Liebert - Vancouver',
  },
  {
    value: 'masarykova-univerzita-pravnicka-fakulta',
    label: 'Masarykova univerzita - Právnická fakulta',
  },
  {
    value: 'mastozoologia-neotropical',
    label: 'Mastozoologia Neotropical',
  },
  {
    value: 'materials-express',
    label: 'Materials Express',
  },
  {
    value: 'mathematical-geosciences',
    label: 'Mathematical Geosciences',
  },
  {
    value: 'mathematics-and-computers-in-simulation',
    label: 'Mathematics and Computers in Simulation',
  },
  {
    value: 'mcdonald-institute-monographs',
    label: 'McDonald Institute Monographs',
  },
  {
    value: 'mcgill-en',
    label:
      'Canadian Guide to Uniform Legal Citation 9th edition (McGill Guide)',
  },
  {
    value: 'mcgill-fr',
    label:
      'Manuel canadien de la référence juridique 9e édition (Guide McGill, Français - Canada)',
  },
  {
    value: 'medecine-intensive-reanimation',
    label: 'Médecine Intensive Réanimation',
  },
  {
    value: 'medecine-sciences',
    label: 'médecine/sciences',
  },
  {
    value: 'media-culture-and-society',
    label: 'Media, Culture & Society',
  },
  {
    value: 'mediaeval-studies',
    label: 'Mediaeval Studies',
  },
  {
    value: 'medical-dosimetry',
    label: 'Medical Dosimetry',
  },
  {
    value: 'medical-history',
    label: 'Medical History',
  },
  {
    value: 'medicina-clinica',
    label: 'Medicina Clínica (Español)',
  },
  {
    value: 'medicina-delle-dipendenze-italian-journal-of-the-addictions',
    label:
      'Medicina delle Dipendenze - Italian Journal of the Addictions (Italiano)',
  },
  {
    value: 'medicinal-research-reviews',
    label: 'Medicinal Research Reviews',
  },
  {
    value: 'medicine-and-science-in-sports-and-exercise',
    label: 'Medicine & Science in Sports & Exercise',
  },
  {
    value: 'medicine-publishing',
    label: 'Medicine Publishing',
  },
  {
    value: 'medicinski-razgledi',
    label: 'Medicinski razgledi',
  },
  {
    value: 'medicinskiy-akademicheskiy-zhurnal',
    label: 'Medicinskiy Akademicheskiy Zhurnal',
  },
  {
    value: 'mediterranean-journal-of-chemistry',
    label: 'Mediterranean Journal of Chemistry',
  },
  {
    value: 'mediterranean-journal-of-infection-microbes-and-antimicrobials',
    label: 'Mediterranean Journal of Infection, Microbes and Antimicrobials',
  },
  {
    value: 'mediterranean-politics',
    label: 'Mediterranean Politics',
  },
  {
    value: 'melbourne-school-of-theology',
    label: 'Melbourne School of Theology',
  },
  {
    value: 'memorias-do-instituto-oswaldo-cruz',
    label: 'Memórias do Instituto Oswaldo Cruz',
  },
  {
    value: 'mercator-institut-fur-sprachforderung-und-deutsch-als-zweitsprache',
    label:
      'Mercator-Institut für Sprachförderung und Deutsch als Zweitsprache (Deutsch)',
  },
  {
    value: 'mercatus-center',
    label: 'Mercatus Center',
  },
  {
    value: 'metallurgical-and-materials-transactions-a',
    label: 'Metallurgical and Materials Transactions A',
  },
  {
    value: 'metallurgical-and-materials-transactions',
    label: 'Metallurgical and Materials Transactions',
  },
  {
    value: 'meteoritics-and-planetary-science',
    label: 'Meteoritics & Planetary Science',
  },
  {
    value: 'meteorological-applications',
    label: 'Meteorological Applications',
  },
  {
    value: 'method-and-theory-in-the-study-of-religion',
    label: 'Method & Theory in the Study of Religion',
  },
  {
    value: 'methods-of-information-in-medicine',
    label: 'Methods of Information in Medicine',
  },
  {
    value: 'metropol-verlag',
    label: 'Metropol Verlag (Deutsch)',
  },
  {
    value: 'metropolia-university-of-applied-sciences-harvard',
    label: 'Metropolia Ammattikorkeakoulu - Harvard (Suomi)',
  },
  {
    value: 'metropolitiques',
    label: 'Métropolitiques (Français)',
  },
  {
    value: 'microbial-cell',
    label: 'Microbial Cell',
  },
  {
    value: 'microbiology-society',
    label: 'Microbiology Society',
  },
  {
    value: 'microcirculation',
    label: 'Microcirculation',
  },
  {
    value: 'microscopy-and-microanalysis',
    label: 'Microscopy and Microanalysis',
  },
  {
    value: 'middle-east-critique',
    label: 'Middle East Critique',
  },
  {
    value: 'midwestern-baptist-theological-seminary',
    label: 'Midwestern Baptist Theological Seminary',
  },
  {
    value: 'mimbar-hukum',
    label: 'Mimbar Hukum',
  },
  {
    value: 'mimesis-edizioni',
    label: 'Mimesis Edizioni (Italiano)',
  },
  {
    value: 'mind-and-language',
    label: 'Mind & Language',
  },
  {
    value: 'mineralogical-magazine',
    label: 'Mineralogical Magazine',
  },
  {
    value: 'mis-quarterly',
    label: 'MIS Quarterly',
  },
  {
    value: 'modern-chinese-literature-and-culture',
    label: 'Modern Chinese Literature and Culture',
  },
  {
    value: 'modern-humanities-research-association-author-date',
    label: 'Modern Humanities Research Association 3rd edition (author-date)',
  },
  {
    value: 'modern-humanities-research-association',
    label:
      'Modern Humanities Research Association 3rd edition (note with bibliography)',
  },
  {
    value: 'modern-language-association-6th-edition-note',
    label: 'Modern Language Association 6th edition (note)',
  },
  {
    value: 'modern-language-association-7th-edition-underline',
    label: 'Modern Language Association 7th edition (underline)',
  },
  {
    value: 'modern-language-association-7th-edition-with-url',
    label: 'Modern Language Association 7th edition (with URL)',
  },
  {
    value: 'modern-language-association-7th-edition',
    label: 'Modern Language Association 7th edition',
  },
  {
    value: 'modern-language-association-8th-edition',
    label: 'Modern Language Association 8th edition',
  },
  {
    value: 'modern-language-association',
    label: 'Modern Language Association 9th edition',
  },
  {
    value: 'modern-pathology',
    label: 'Modern Pathology',
  },
  {
    value: 'modern-phytomorphology',
    label: 'Modern Phytomorphology',
  },
  {
    value: 'mohr-siebeck-recht',
    label: 'Mohr Siebeck - Recht (Deutsch - Österreich)',
  },
  {
    value: 'molecular-and-cellular-proteomics',
    label: 'Molecular & Cellular Proteomics',
  },
  {
    value: 'molecular-biology-and-evolution',
    label: 'Molecular Biology and Evolution',
  },
  {
    value: 'molecular-biology-of-the-cell',
    label: 'Molecular Biology of the Cell',
  },
  {
    value: 'molecular-biology',
    label: 'Molecular Biology',
  },
  {
    value: 'molecular-metabolism',
    label: 'Molecular Metabolism',
  },
  {
    value: 'molecular-microbiology',
    label: 'Molecular Microbiology',
  },
  {
    value: 'molecular-nutrition-and-food-research',
    label: 'Molecular Nutrition & Food Research',
  },
  {
    value: 'molecular-oncology',
    label: 'Molecular Oncology',
  },
  {
    value: 'molecular-plant-microbe-interactions',
    label: 'Molecular Plant-Microbe Interactions',
  },
  {
    value: 'molecular-plant-pathology',
    label: 'Molecular Plant Pathology',
  },
  {
    value: 'molecular-plant',
    label: 'Molecular Plant',
  },
  {
    value: 'molecular-psychiatry-letters',
    label: 'Molecular Psychiatry (letters to the editor)',
  },
  {
    value: 'molecular-psychiatry',
    label: 'Molecular Psychiatry',
  },
  {
    value: 'monash-university-csiro',
    label: 'Monash University - CSIRO',
  },
  {
    value: 'monash-university-harvard',
    label: 'Monash University - Harvard',
  },
  {
    value: 'mondes-en-developpement',
    label: 'Mondes en développement (Français)',
  },
  {
    value: 'monographs-of-the-palaeontographical-society',
    label: 'Monographs of the Palaeontographical Society',
  },
  {
    value: 'moore-theological-college',
    label: 'Moore Theological College',
  },
  {
    value: 'moorlands-college',
    label: 'Moorlands College',
  },
  {
    value: 'mrs-bulletin',
    label: 'MRS Bulletin',
  },
  {
    value: 'multidisciplinary-digital-publishing-institute',
    label: 'Multidisciplinary Digital Publishing Institute',
  },
  {
    value: 'multilingual-matters',
    label: 'Multilingual Matters',
  },
  {
    value: 'multimed',
    label: 'Multimed (Español)',
  },
  {
    value: 'multiple-sclerosis-journal',
    label: 'Multiple Sclerosis Journal',
  },
  {
    value: 'muscle-and-nerve',
    label: 'Muscle & Nerve',
  },
  {
    value: 'museum-national-dhistoire-naturelle',
    label: "Muséum national d'Histoire naturelle",
  },
  {
    value: 'music-theory-spectrum',
    label: 'Music Theory Spectrum',
  },
  {
    value: 'mutagenesis',
    label: 'Mutagenesis',
  },
  {
    value: 'mycobiology',
    label: 'Mycobiology',
  },
  {
    value: 'mycologia',
    label: 'Mycologia',
  },
  {
    value: 'myrmecological-news',
    label: 'Myrmecological News',
  },
  {
    value: 'nano-biomedicine-and-engineering',
    label: 'Nano Biomedicine and Engineering',
  },
  {
    value: 'natbib-plainnat-author-date',
    label: 'natbib - plainnat (author-date)',
  },
  {
    value: 'national-archives-of-australia',
    label: 'National Archives of Australia',
  },
  {
    value: 'national-institute-of-health-research',
    label: 'National Institute of Health Research',
  },
  {
    value: 'national-institute-of-organisation-dynamics-australia-harvard',
    label: 'National Institute of Organisation Dynamics Australia - Harvard',
  },
  {
    value: 'national-institute-of-technology-karnataka',
    label: 'National Institute of Technology Karnataka',
  },
  {
    value: 'national-institute-of-technology-tiruchirappalli',
    label: 'National Institute of Technology, Tiruchirappalli',
  },
  {
    value: 'national-library-of-medicine-grant-proposals',
    label: 'National Library of Medicine (grant proposals with PMCID/PMID)',
  },
  {
    value:
      'national-marine-fisheries-service-national-environmental-policy-act',
    label:
      'National Marine Fisheries Service - National Environmental Policy Act',
  },
  {
    value: 'national-natural-science-foundation-of-china',
    label: 'National Natural Science Foundation of China (中文)',
  },
  {
    value: 'national-science-foundation-grant-proposals',
    label: 'National Science Foundation (grant proposals)',
  },
  {
    value: 'national-university-of-singapore-department-of-geography-harvard',
    label:
      'National University of Singapore - Department of Geography - Harvard',
  },
  {
    value: 'nations-and-nationalism',
    label: 'Nations and Nationalism',
  },
  {
    value: 'natur-und-landschaft',
    label: 'Natur und Landschaft (Deutsch)',
  },
  {
    value: 'natura-croatica',
    label: 'Natura Croatica',
  },
  {
    value: 'nature-neuroscience-brief-communications',
    label: 'Nature Neuroscience (brief communications)',
  },
  {
    value: 'nature-no-et-al',
    label: 'Nature (no "et al.")',
  },
  {
    value: 'nature-no-superscript',
    label: 'Nature (no superscript)',
  },
  {
    value: 'nature-publishing-group-vancouver',
    label: 'Nature Publishing Group - Vancouver',
  },
  {
    value: 'nature',
    label: 'Nature',
  },
  {
    value: 'natures-sciences-societes',
    label: 'Natures Sciences Sociétés',
  },
  {
    value: 'nauplius',
    label: 'Nauplius',
  },
  {
    value: 'navigation',
    label: 'Navigation',
  },
  {
    value: 'nccr-mediality',
    label:
      'NCCR Mediality. Medienwandel - Medienwechsel - Medienwissen (Deutsch)',
  },
  {
    value:
      'necmettin-erbakan-universitesi-fen-ve-muhendislik-bilimleri-dergisi',
    label:
      'Necmettin Erbakan Üniversitesi Fen ve Mühendislik Bilimleri Dergisi (Türkçe)',
  },
  {
    value: 'nehet',
    label: 'NeHeT (Français)',
  },
  {
    value: 'nejm-catalyst-innovations-in-care-delivery',
    label: 'NEJM Catalyst Innovations in Care Delivery',
  },
  {
    value: 'nephrology-dialysis-transplantation',
    label: 'Nephrology Dialysis Transplantation',
  },
  {
    value: 'netherlands-journal-of-geosciences-geologie-en-mijnbouw',
    label: 'Netherlands Journal of Geosciences - Geologie en Mijnbouw',
  },
  {
    value: 'neue-juristische-wochenschrift',
    label: 'Neue Juristische Wochenschrift (Deutsch)',
  },
  {
    value: 'neue-kriminalpolitik',
    label: 'Neue Kriminalpolitik (Deutsch)',
  },
  {
    value: 'neural-plasticity',
    label: 'Neural Plasticity',
  },
  {
    value: 'neuroendocrinology-letters',
    label: 'Neuroendocrinology Letters',
  },
  {
    value: 'neuroimaging-clinics-of-north-america',
    label: 'Neuroimaging Clinics of North America',
  },
  {
    value: 'neurologia-argentina',
    label: 'Neurología Argentina (Español)',
  },
  {
    value: 'neurologia',
    label: 'Neurología (Español)',
  },
  {
    value: 'neurology-india',
    label: 'Neurology India',
  },
  {
    value: 'neurology',
    label: 'Neurology',
  },
  {
    value: 'neuropsychopharmacology',
    label: 'Neuropsychopharmacology',
  },
  {
    value: 'neurorehabilitation-and-neural-repair',
    label: 'Neurorehabilitation and Neural Repair',
  },
  {
    value: 'neuroreport',
    label: 'NeuroReport',
  },
  {
    value: 'neurospine',
    label: 'Neurospine',
  },
  {
    value: 'neurosurgery-clinics-of-north-america',
    label: 'Neurosurgery Clinics of North America',
  },
  {
    value: 'new-harts-rules-the-oxford-style-guide',
    label: "New Hart's Rules: The Oxford Style Guide",
  },
  {
    value: 'new-phytologist',
    label: 'New Phytologist',
  },
  {
    value: 'new-solutions',
    label: 'New Solutions',
  },
  {
    value: 'new-testament-studies',
    label: 'New Testament Studies',
  },
  {
    value: 'new-zealand-dental-journal',
    label: 'New Zealand Dental Journal',
  },
  {
    value: 'new-zealand-journal-of-forestry-science',
    label: 'New Zealand Journal of Forestry Science',
  },
  {
    value: 'new-zealand-journal-of-history',
    label: 'New Zealand Journal of History',
  },
  {
    value: 'new-zealand-plant-protection',
    label: 'New Zealand Plant Protection',
  },
  {
    value: 'new-zealand-veterinary-journal',
    label: 'New Zealand Veterinary Journal',
  },
  {
    value: 'nist-technical-publication-journal-of-research-of-nist',
    label: 'NIST Technical Publications - Journal of Research of NIST',
  },
  {
    value: 'nordic-pulp-and-paper-research-journal',
    label: 'Nordic Pulp & Paper Research Journal',
  },
  {
    value: 'norma-portuguesa-405',
    label: 'Norma Portuguesa 405 (Português)',
  },
  {
    value: 'norois',
    label: 'Norois (Français)',
  },
  {
    value: 'norsk-apa-manual-note',
    label: 'Norsk APA-manual - APA 7th edition (note)',
  },
  {
    value: 'norsk-apa-manual',
    label: 'Norsk APA-manual - APA 7th edition (author-date)',
  },
  {
    value: 'norsk-henvisningsstandard-for-rettsvitenskapelige-tekster',
    label:
      'Norsk henvisningsstandard for rettsvitenskapelige tekster (Norsk - Bokmål)',
  },
  {
    value: 'northeastern-naturalist',
    label: 'Northeastern Naturalist',
  },
  {
    value: 'nottingham-trent-university-library-harvard',
    label: 'Nottingham Trent University Library - Harvard',
  },
  {
    value: 'nouvelles-perspectives-en-sciences-sociales',
    label: 'Nouvelles perspectives en sciences sociales (Français - Canada)',
  },
  {
    value: 'novasinergia',
    label: 'Novasinergia',
  },
  {
    value: 'nowa-audiofonologia',
    label: 'Nowa Audiofonologia (Polski)',
  },
  {
    value: 'nuclear-receptor-signaling',
    label: 'Nuclear Receptor Signaling',
  },
  {
    value: 'nucleic-acids-research-web-server-issue',
    label: 'Nucleic Acids Research - Web Server Issue',
  },
  {
    value: 'nucleic-acids-research',
    label: 'Nucleic Acids Research',
  },
  {
    value: 'nutrition-research-reviews',
    label: 'Nutrition Research Reviews',
  },
  {
    value: 'obafemi-awolowo-university-faculty-of-technology',
    label: 'Obafemi Awolowo University - Faculty of Technology',
  },
  {
    value: 'obesity',
    label: 'Obesity',
  },
  {
    value: 'obstetrics-and-gynecology-science',
    label: 'Obstetrics & Gynecology Science',
  },
  {
    value: 'occupational-medicine',
    label: 'Occupational Medicine',
  },
  {
    value: 'ocean-and-coastal-research',
    label: 'Ocean and Coastal Research',
  },
  {
    value: 'oceanography',
    label: 'Oceanography',
  },
  {
    value: 'oecologia-australis',
    label: 'Oecologia Australis',
  },
  {
    value: 'offa',
    label:
      'Offa - Berichte und Mitteilungen zur Urgeschichte, Frühgeschichte und Mittelalterarchäologie',
  },
  {
    value: 'oikos',
    label: 'Oikos',
  },
  {
    value: 'oil-shale',
    label: 'Oil Shale',
  },
  {
    value: 'oncoimmunology',
    label: 'OncoImmunology',
  },
  {
    value: 'oncotarget',
    label: 'Oncotarget',
  },
  {
    value: 'open-gender-journal',
    label: 'Open Gender Journal',
  },
  {
    value: 'open-window',
    label: 'Open Window - Harvard',
  },
  {
    value: 'operative-dentistry',
    label: 'Operative Dentistry',
  },
  {
    value: 'ophthalmic-genetics',
    label: 'Ophthalmic Genetics',
  },
  {
    value: 'ophthalmology-retina',
    label: 'Ophthalmology Retina',
  },
  {
    value: 'ophthalmology',
    label: 'Ophthalmology',
  },
  {
    value: 'optics-express',
    label: 'Optics Express',
  },
  {
    value: 'optics-letters',
    label: 'Optics Letters',
  },
  {
    value: 'opto-electronic-advances',
    label: 'Opto-Electronic Advances',
  },
  {
    value: 'optometry-and-vision-science',
    label: 'Optometry & Vision Science',
  },
  {
    value: 'opuscula',
    label: 'Opuscula',
  },
  {
    value: 'oral-diseases',
    label: 'Oral Diseases',
  },
  {
    value: 'organic-geochemistry',
    label: 'Organic Geochemistry',
  },
  {
    value: 'organised-sound',
    label: 'Organised Sound',
  },
  {
    value: 'organization-studies',
    label: 'Organization Studies',
  },
  {
    value: 'organization',
    label: 'Organization',
  },
  {
    value: 'organon',
    label: 'Organon',
  },
  {
    value: 'ornitologia-neotropical',
    label: 'Ornitología Neotropical',
  },
  {
    value: 'orthopedic-clinics-of-north-america',
    label: 'Orthopedic Clinics of North America',
  },
  {
    value: 'oryx',
    label: 'Oryx',
  },
  {
    value: 'oscola-no-ibid',
    label:
      'OSCOLA (Oxford University Standard for Citation of Legal Authorities) (no Ibid.)',
  },
  {
    value: 'oscola',
    label:
      'OSCOLA (Oxford University Standard for Citation of Legal Authorities)',
  },
  {
    value: 'osterreichische-zeitschrift-fur-politikwissenschaft',
    label:
      'Österreichische Zeitschrift für Politikwissenschaft (Deutsch - Österreich)',
  },
  {
    value:
      'otto-von-guricke-universitat-magdeburg-medizinische-fakultat-numeric',
    label:
      'Otto-von-Guericke-Universität Magdeburg - Medizinische Fakultät (numeric)',
  },
  {
    value: 'owbarth-verlag',
    label: 'O.W. Barth Verlag (Deutsch)',
  },
  {
    value: 'oxford-art-journal',
    label: 'Oxford Art Journal',
  },
  {
    value: 'oxford-centre-for-mission-studies-harvard',
    label: 'Oxford Centre for Mission Studies - Harvard',
  },
  {
    value: 'oxford-studies-in-ancient-philosophy',
    label: 'Oxford Studies in Ancient Philosophy',
  },
  {
    value: 'oxford-studies-on-the-roman-economy',
    label: 'Oxford Studies on the Roman Economy',
  },
  {
    value: 'oxford-the-university-of-new-south-wales',
    label: 'The University of New South Wales - Oxford',
  },
  {
    value: 'oxford-university-press-humsoc',
    label: 'Oxford University Press HUMSOC',
  },
  {
    value: 'oxford-university-press-note',
    label: 'Oxford University Press (note)',
  },
  {
    value: 'oxford-university-press-scimed-author-date',
    label: 'Oxford University Press SciMed (author-date)',
  },
  {
    value: 'oxford-university-press-scimed-numeric',
    label: 'Oxford University Press SciMed (numeric)',
  },
  {
    value: 'oxidation-of-metals',
    label: 'Oxidation of Metals',
  },
  {
    value: 'pacific-conservation-biology',
    label: 'Pacific Conservation Biology',
  },
  {
    value: 'pacific-science',
    label: 'Pacific Science',
  },
  {
    value:
      'padagogische-hochschule-bern-institut-vorschulstufe-und-primarstufe',
    label:
      'Pädagogische Hochschule Bern - Institut Vorschulstufe und Primarstufe',
  },
  {
    value: 'padagogische-hochschule-fachhochschule-nordwestschweiz',
    label:
      'Pädagogische Hochschule Fachhochschule Nordwestschweiz (Deutsch - Schweiz)',
  },
  {
    value: 'padagogische-hochschule-heidelberg',
    label: 'Pädagogische Hochschule Heidelberg (Deutsch)',
  },
  {
    value: 'padagogische-hochschule-vorarlberg',
    label: 'Pädagogische Hochschule Vorarlberg (Deutsch)',
  },
  {
    value: 'paediatric-and-perinatal-epidemiology',
    label: 'Paediatric and Perinatal Epidemiology',
  },
  {
    value: 'pain-medicine',
    label: 'Pain Medicine',
  },
  {
    value: 'pain',
    label: 'PAIN',
  },
  {
    value: 'pakistan-journal-of-agricultural-sciences',
    label: 'Pakistan Journal of Agricultural Sciences',
  },
  {
    value: 'pakistani-veterinary-journal',
    label: 'Pakistan Veterinary Journal',
  },
  {
    value: 'palaeodiversity',
    label: 'Palaeodiversity',
  },
  {
    value: 'palaeontographica-abteilung-b-palaeobotany-palaeophytology',
    label: 'Palaeontographica Abteilung B: Palaeobotany - Palaeophytology',
  },
  {
    value: 'palaeontologia-electronica',
    label: 'Palaeontologia Electronica',
  },
  {
    value: 'palaeontology',
    label: 'Palaeontology',
  },
  {
    value: 'palaeovertebrata',
    label: 'Palaeovertebrata',
  },
  {
    value: 'palaios',
    label: 'Palaios',
  },
  {
    value: 'paleobiology',
    label: 'Paleobiology',
  },
  {
    value: 'parasite',
    label: 'Parasite',
  },
  {
    value: 'parasitology',
    label: 'Parasitology',
  },
  {
    value: 'past-and-present',
    label: 'Past & Present',
  },
  {
    value: 'pediatric-allergy-and-immunology',
    label: 'Pediatric Allergy and Immunology',
  },
  {
    value: 'pediatric-anesthesia',
    label: 'Pediatric Anesthesia',
  },
  {
    value: 'pediatric-blood-and-cancer',
    label: 'Pediatric Blood & Cancer',
  },
  {
    value: 'pediatric-infectious-disease-journal',
    label: 'Pediatric Infectious Disease Journal',
  },
  {
    value: 'pediatric-physical-therapy',
    label: 'Pediatric Physical Therapy',
  },
  {
    value: 'pediatric-practice-and-research',
    label: 'Pediatric Practice and Research',
  },
  {
    value: 'pediatric-pulmonology',
    label: 'Pediatric Pulmonology',
  },
  {
    value: 'pediatric-research',
    label: 'Pediatric Research',
  },
  {
    value: 'pediatric-urology-case-reports',
    label: 'Pediatric Urology Case Reports',
  },
  {
    value: 'pedosphere',
    label: 'Pedosphere',
  },
  {
    value: 'peerj',
    label: 'PeerJ',
  },
  {
    value: 'pensoft-journals',
    label: 'Pensoft Journals',
  },
  {
    value: 'periodicum-biologorum',
    label: 'Periodicum Biologorum',
  },
  {
    value: 'periodontology-2000',
    label: 'Periodontology 2000',
  },
  {
    value: 'permafrost-and-periglacial-processes',
    label: 'Permafrost and Periglacial Processes',
  },
  {
    value: 'perspectives-on-sexual-and-reproductive-health',
    label: 'Perspectives on Sexual and Reproductive Health',
  },
  {
    value: 'pesquisa-agropecuaria-brasileira',
    label: 'Pesquisa Agropecuária Brasileira (Português - Brasil)',
  },
  {
    value: 'pest-management-science',
    label: 'Pest Management Science',
  },
  {
    value: 'petit-chicago-author-date',
    label: 'Petit Chicago (author-date, Français - Canada)',
  },
  {
    value: 'pharmacoepidemiology-and-drug-safety',
    label: 'Pharmacoepidemiology and Drug Safety',
  },
  {
    value: 'philippika',
    label: 'Philippika (Deutsch)',
  },
  {
    value: 'philipps-universitat-marburg-note',
    label:
      'Philipps-Universität Marburg - Erziehungswissenschaften (note, Deutsch)',
  },
  {
    value: 'philosophia-scientiae',
    label: 'Philosophia Scientiæ',
  },
  {
    value: 'philosophiques',
    label: 'Philosophiques (Français)',
  },
  {
    value: 'philosophy-and-public-affairs',
    label: 'Philosophy & Public Affairs',
  },
  {
    value: 'photochemistry-and-photobiology',
    label: 'Photochemistry and Photobiology',
  },
  {
    value: 'photosynthetica',
    label: 'Photosynthetica',
  },
  {
    value: 'phycological-research',
    label: 'Phycological Research',
  },
  {
    value: 'phyllomedusa',
    label: 'Phyllomedusa',
  },
  {
    value: 'physiologia-plantarum',
    label: 'Physiologia Plantarum',
  },
  {
    value: 'physiological-and-biochemical-zoology',
    label: 'Physiological and Biochemical Zoology',
  },
  {
    value: 'physiotherapy-theory-and-practice',
    label: 'Physiotherapy Theory and Practice',
  },
  {
    value: 'phytopathologia-mediterranea',
    label: 'Phytopathologia Mediterranea',
  },
  {
    value: 'phytotaxa',
    label: 'Phytotaxa',
  },
  {
    value: 'pisa-university-press',
    label: 'Pisa University Press',
  },
  {
    value: 'planning-practice-and-research',
    label: 'Planning Practice & Research',
  },
  {
    value: 'plant-and-cell-physiology',
    label: 'Plant & Cell Physiology',
  },
  {
    value: 'plant-biology',
    label: 'Plant Biology',
  },
  {
    value: 'plant-biotechnology-journal',
    label: 'Plant Biotechnology Journal',
  },
  {
    value: 'plant-cell-and-environment',
    label: 'Plant, Cell & Environment',
  },
  {
    value: 'plant-genetic-resources-characterization-and-utilization',
    label: 'Plant Genetic Resources - Characterization and Utilization',
  },
  {
    value: 'plant-pathology',
    label: 'Plant Pathology',
  },
  {
    value: 'plant-physiology',
    label: 'Plant Physiology',
  },
  {
    value: 'plant-species-biology',
    label: 'Plant Species Biology',
  },
  {
    value: 'plos',
    label: 'Public Library of Science',
  },
  {
    value: 'pnas',
    label:
      'Proceedings of the National Academy of Sciences of the United States of America',
  },
  {
    value: 'podzemna-voda',
    label: 'Podzemná voda (Slovenčina)',
  },
  {
    value: 'polar-research',
    label: 'Polar Research',
  },
  {
    value: 'polish-legal',
    label: 'Polish Legal (Polski)',
  },
  {
    value: 'politeknik-negeri-manado-jurnal-p3m',
    label:
      'Politeknik Negeri Manado - Jurnal Pusat Penelitian dan Pengabdian Kepada Masyarakat (Bahasa Indonesia)',
  },
  {
    value: 'political-studies',
    label: 'Political Studies',
  },
  {
    value: 'politische-vierteljahresschrift',
    label: 'Politische Vierteljahresschrift (Deutsch)',
  },
  {
    value: 'politix',
    label: 'Politix (Français)',
  },
  {
    value: 'polymer-reviews',
    label: 'Polymer Reviews',
  },
  {
    value: 'pontifical-athenaeum-regina-apostolorum',
    label: 'Pontifical Athenaeum Regina Apostolorum',
  },
  {
    value: 'pontifical-biblical-institute',
    label: 'Pontifical Biblical Institute',
  },
  {
    value: 'pontifical-gregorian-university',
    label: 'Pontifical Gregorian University (Italiano)',
  },
  {
    value: 'population-space-and-place',
    label: 'Population, Space and Place',
  },
  {
    value: 'population',
    label: 'Population (Français)',
  },
  {
    value: 'postepy-higieny-i-medycyny-doswiadczalnej',
    label: 'Postępy Higieny i Medycyny Doświadczalnej (Polski)',
  },
  {
    value: 'poultry-science',
    label: 'Poultry Science',
  },
  {
    value: 'pour-reussir-note',
    label: 'Pour réussir (note, Français - Canada)',
  },
  {
    value: 'pravnik',
    label: 'Právník (Čeština)',
  },
  {
    value: 'praxis',
    label: 'Praxis (Deutsch - Schweiz)',
  },
  {
    value: 'prehistoires-mediterraneennes',
    label: 'Préhistoires méditerranéennes',
  },
  {
    value: 'prehospital-emergency-care',
    label: 'Prehospital Emergency Care',
  },
  {
    value: 'preslia',
    label: 'Preslia - The Journal of the Czech Botanical Society',
  },
  {
    value: 'presses-universitaires-de-paris-nanterre',
    label: 'Presses universitaires de Paris Nanterre (note, Français)',
  },
  {
    value: 'presses-universitaires-de-rennes-archeologie-et-culture',
    label:
      'Presses Universitaires de Rennes - Archéologie et Culture (Français)',
  },
  {
    value: 'presses-universitaires-de-rennes',
    label: 'Presses Universitaires de Rennes (Français)',
  },
  {
    value: 'presses-universitaires-de-strasbourg-note',
    label: 'Presses universitaires de Strasbourg (note, Français)',
  },
  {
    value: 'primary-care-clinics-in-office-practice',
    label: 'Primary Care: Clinics in Office Practice',
  },
  {
    value:
      'proceedings-of-the-joint-international-grassland-and-international-rangeland-congress-2021',
    label:
      'Proceedings of the Joint International Grassland & International Rangeland Congress 2021',
  },
  {
    value: 'proceedings-of-the-royal-society-b',
    label: 'Proceedings of the Royal Society B',
  },
  {
    value: 'processing-and-application-of-ceramics',
    label: 'Processing and Application of Ceramics',
  },
  {
    value: 'production-and-operations-management',
    label: 'Production and Operations Management',
  },
  {
    value: 'proinflow',
    label: 'ProInflow (note, Čeština)',
  },
  {
    value: 'protein-engineering-design-and-selection',
    label: 'Protein Engineering Design and Selection',
  },
  {
    value: 'protein-science',
    label: 'Protein Science',
  },
  {
    value: 'proteomics',
    label: 'PROTEOMICS',
  },
  {
    value: 'psychiatric-clinics-of-north-america',
    label: 'Psychiatric Clinics of North America',
  },
  {
    value: 'psychiatric-services',
    label: 'Psychiatric Services',
  },
  {
    value: 'psychiatry-and-clinical-neurosciences',
    label: 'Psychiatry and Clinical Neurosciences',
  },
  {
    value: 'psychological-medicine',
    label: 'Psychological Medicine',
  },
  {
    value: 'psychosomatic-medicine',
    label: 'Psychosomatic Medicine',
  },
  {
    value: 'psychosomatics',
    label: 'Psychosomatics',
  },
  {
    value: 'public-health-nutrition',
    label: 'Public Health Nutrition',
  },
  {
    value: 'pure-and-applied-geophysics',
    label: 'Pure and Applied Geophysics',
  },
  {
    value: 'qeios',
    label: 'Qeios',
  },
  {
    value: 'quaderni-degli-avogadro-colloquia',
    label: 'Quaderni degli Avogadro Colloquia',
  },
  {
    value: 'quaderni-materialisti',
    label: 'Quaderni Materialisti (Italiano)',
  },
  {
    value: 'quaderni',
    label: 'Quaderni (Italiano)',
  },
  {
    value: 'quaternaire',
    label: 'Quaternaire (Français)',
  },
  {
    value: 'quaternary-international',
    label: 'Quaternary International',
  },
  {
    value: 'queen-margaret-university-harvard',
    label: 'Queen Margaret University - Harvard',
  },
  {
    value: 'r-and-d-management',
    label: 'R&D Management',
  },
  {
    value: 'radiation-protection-dosimetry',
    label: 'Radiation Protection Dosimetry',
  },
  {
    value: 'radiochimica-acta',
    label: 'Radiochimica Acta',
  },
  {
    value: 'radiographics',
    label: 'RadioGraphics',
  },
  {
    value: 'radiography',
    label: 'Radiography',
  },
  {
    value: 'radiologic-clinics-of-north-america',
    label: 'Radiologic Clinics of North America',
  },
  {
    value: 'radiology',
    label: 'Radiology',
  },
  {
    value: 'radiopaedia',
    label: 'Radiopaedia.org',
  },
  {
    value: 'raffles-bulletin-of-zoology',
    label: 'Raffles Bulletin of Zoology',
  },
  {
    value: 'rassegna-degli-archivi-di-stato',
    label: 'Rassegna degli Archivi di Stato (citazioni estese, italiano)',
  },
  {
    value: 'recent-patents-on-drug-delivery-and-formulation',
    label: 'Recent Patents on Drug Delivery & Formulation',
  },
  {
    value: 'recherches-en-sciences-de-gestion',
    label: 'Recherches en Sciences de Gestion (Français)',
  },
  {
    value: 'refugee-survey-quarterly',
    label: 'Refugee Survey Quarterly',
  },
  {
    value: 'register-studies',
    label: 'Register Studies',
  },
  {
    value: 'religion-in-the-roman-empire',
    label: 'Religion in the Roman Empire',
  },
  {
    value: 'renewable-agriculture-and-food-systems',
    label: 'Renewable Agriculture and Food Systems',
  },
  {
    value: 'reports-of-practical-oncology-and-radiotherapy',
    label: 'Reports of Practical Oncology and Radiotherapy',
  },
  {
    value: 'representation',
    label: 'Representation',
  },
  {
    value: 'reproduction-fertility-and-development',
    label: 'Reproduction, Fertility and Development',
  },
  {
    value: 'reproduction',
    label: 'Reproduction',
  },
  {
    value: 'research-and-education-promotion-association',
    label: 'Research and Education Promotion Association',
  },
  {
    value: 'research-in-plant-disease',
    label: 'Research in Plant Disease',
  },
  {
    value: 'research-institute-for-nature-and-forest',
    label:
      'Research Institute for Nature and Forest (Instituut voor Natuur- en Bosonderzoek)',
  },
  {
    value: 'research-on-biomedical-engineering',
    label: 'Research on Biomedical Engineering',
  },
  {
    value: 'respiratory-care-journal',
    label: 'Respiratory Care Journal',
  },
  {
    value: 'restoration-ecology',
    label: 'Restoration Ecology',
  },
  {
    value: 'rever-revista-de-estudos-da-religiao',
    label: 'REVER - Revista de Estudos da Religião',
  },
  {
    value: 'review-of-international-studies',
    label: 'Review of International Studies',
  },
  {
    value: 'review-of-political-economy',
    label: 'Review of Political Economy',
  },
  {
    value: 'reviews-of-modern-physics-with-titles',
    label: 'Reviews of Modern Physics (with titles)',
  },
  {
    value: 'revista-argentina-de-antropologia-biologica',
    label: 'Revista Argentina de Antropologia Biologica (Español)',
  },
  {
    value: 'revista-biblica',
    label: 'Revista Bíblica (Español)',
  },
  {
    value: 'revista-brasileira-de-ciencia-do-solo',
    label: 'Revista Brasileira de Ciência do Solo',
  },
  {
    value: 'revista-chilena-de-derecho-y-tecnologia',
    label: 'Revista Chilena de Derecho y Tecnología (Español - Chile)',
  },
  {
    value: 'revista-ciencias-tecnicas-agropecuarias',
    label: 'Revista Ciencias Técnicas Agropecuarias (Español)',
  },
  {
    value: 'revista-cubana-de-meteorologia',
    label: 'Revista Cubana de Meteorologia',
  },
  {
    value: 'revista-da-sociedade-brasileira-de-medicina-tropical',
    label: 'Revista da Sociedade Brasileira de Medicina Tropical',
  },
  {
    value: 'revista-de-biologia-marina-y-oceanografia',
    label: 'Revista de Biología Marina y Oceanografía',
  },
  {
    value: 'revista-de-biologia-tropical',
    label:
      'Revista de Biología Tropical (International Journal of Tropical Biology and Conservation)',
  },
  {
    value: 'revista-de-filologia-espanola',
    label: 'Revista de Filología Española (Español)',
  },
  {
    value: 'revista-do-instituto-de-medicina-tropical-de-sao-paulo',
    label: 'Revista do Instituto de Medicina Tropical de São Paulo',
  },
  {
    value: 'revista-espanola-de-nutricion-humana-y-dietetica',
    label: 'Revista Espanola de Nutricion Humana y Dietetica (Español)',
  },
  {
    value: 'revista-fave-seccion-ciencias-agrarias',
    label: 'Revista FAVE - Sección Ciencias Agrarias (Español)',
  },
  {
    value: 'revista-ladinia',
    label: 'Revista Ladinia',
  },
  {
    value: 'revista-latinoamericana-de-metalurgia-y-materiales',
    label: 'Revista Latinoamericana de Metalurgia y Materiales',
  },
  {
    value: 'revista-latinoamericana-de-recursos-naturales',
    label: 'Revista Latinoamericana de Recursos Naturales',
  },
  {
    value: 'revista-materia',
    label: 'Revista Matéria',
  },
  {
    value: 'revista-noesis',
    label: 'Revista Nóesis',
  },
  {
    value: 'revista-peruana-de-medicina-experimental-y-salud-publica',
    label: 'Revista Peruana de Medicina Experimental y Salud Pública (Español)',
  },
  {
    value: 'revista-portuguesa-de-arqueologia',
    label: 'Revista Portuguesa de Arqueologia',
  },
  {
    value: 'revista-virtual-de-quimica',
    label: 'Revista Virtual de Química (Português - Brasil)',
  },
  {
    value: 'revue-archeologique-de-lest',
    label: 'Revue archéologique de l’Est (Français)',
  },
  {
    value: 'revue-archeologique-de-narbonnaise',
    label: 'Revue archéologique de Narbonnaise (French)',
  },
  {
    value: 'revue-archeologique-du-centre-de-la-france',
    label: 'Revue archéologique du Centre de la France (Français)',
  },
  {
    value: 'revue-archeologique',
    label: 'Revue Archéologique (Français)',
  },
  {
    value: 'revue-d-elevage-et-de-medecine-veterinaire-des-pays-tropicaux',
    label:
      "Revue d'élevage et de médecine vétérinaire des pays tropicaux (Français)",
  },
  {
    value: 'revue-de-medecine-veterinaire',
    label: 'Revue de Médecine Vétérinaire (Français)',
  },
  {
    value: 'revue-de-qumran',
    label: 'Revue de Qumrân',
  },
  {
    value: 'revue-des-etudes-byzantines',
    label: 'Revue des Études Byzantines',
  },
  {
    value: 'revue-des-nouvelles-technologies-de-l-information',
    label: "Revue des Nouvelles Technologies de l'Information (Français)",
  },
  {
    value: 'revue-dhistoire-des-sciences-humaines',
    label: "Revue d'histoire des sciences humaines (Français)",
  },
  {
    value: 'revue-dhistoire-moderne-et-contemporaine',
    label: "Revue d'histoire moderne et contemporaine (Français)",
  },
  {
    value: 'revue-europeenne-des-migrations-internationales',
    label: 'Revue Européenne des Migrations Internationales',
  },
  {
    value: 'revue-forestiere-francaise',
    label: 'Revue forestière française (Français)',
  },
  {
    value: 'revue-francaise-d-administration-publique',
    label: "Revue française d'administration publique (Français)",
  },
  {
    value: 'revue-francaise-de-gestion',
    label: 'Revue française de gestion (Français)',
  },
  {
    value: 'revue-francaise-de-sociologie',
    label: 'Revue française de sociologie (Français)',
  },
  {
    value: 'rhinology',
    label: 'Rhinology',
  },
  {
    value: 'rhodora',
    label: 'Rhodora',
  },
  {
    value: 'risk-analysis',
    label: 'Risk Analysis',
  },
  {
    value: 'ritid',
    label: 'Ritið: tímarit Hugvísindastofnunar (Íslenska)',
  },
  {
    value: 'rivista-italiana-di-paleontologia-e-stratigrafia',
    label: 'Rivista Italiana di Paleontologia e Stratigrafia',
  },
  {
    value: 'rmit-university-harvard',
    label: 'RMIT University - Harvard',
  },
  {
    value: 'rofo',
    label:
      'RöFo: Fortschritte auf dem Gebiet der Röntgenstrahlen und bildgebenden Verfahren',
  },
  {
    value: 'romanian-humanities',
    label: 'Romanian Humanities (Română)',
  },
  {
    value: 'rose-school',
    label: 'ROSE School',
  },
  {
    value: 'rossiiskii-fiziologicheskii-zhurnal-imeni-i-m-sechenova',
    label: 'Российский физиологический журнал им. И.М. Сеченова (Ру́сский)',
  },
  {
    value: 'royal-college-of-nursing-harvard',
    label: 'Royal College of Nursing - Harvard',
  },
  {
    value: 'royal-society-of-chemistry-with-titles',
    label: 'Royal Society of Chemistry (with titles)',
  },
  {
    value: 'royal-society-of-chemistry',
    label: 'Royal Society of Chemistry',
  },
  {
    value: 'rtf-scan',
    label: 'RTF Scan',
  },
  {
    value:
      'ruhr-universitat-bochum-lehrstuhl-fur-industrial-sales-and-service-engineering',
    label:
      'Ruhr-Universität Bochum - Lehrstuhl für Industrial Sales and Service Engineering',
  },
  {
    value: 'ruhr-universitat-bochum-medizinische-fakultat-numeric',
    label:
      'Ruhr-Universität Bochum - Medizinische Fakultät (numerisch, Deutsch)',
  },
  {
    value: 'sage-harvard',
    label: 'SAGE - Harvard',
  },
  {
    value: 'sage-vancouver-brackets',
    label: 'SAGE - Vancouver (brackets)',
  },
  {
    value: 'sage-vancouver',
    label: 'SAGE - Vancouver',
  },
  {
    value: 'saglik-bilimleri-universitesi',
    label: 'Sağlık Bilimleri Üniversitesi',
  },
  {
    value: 'saint-paul-university-faculty-of-canon-law',
    label: 'Saint Paul University - Faculty of Canon Law',
  },
  {
    value: 'san-francisco-estuary-and-watershed-science',
    label: 'San Francisco Estuary & Watershed Science',
  },
  {
    value: 'sanamed',
    label: 'Sanamed',
  },
  {
    value: 'scandinavian-journal-of-infectious-diseases',
    label: 'Scandinavian Journal of Infectious Diseases',
  },
  {
    value: 'scandinavian-journal-of-information-systems',
    label: 'Scandinavian Journal of Information Systems',
  },
  {
    value: 'scandinavian-journal-of-medicine-and-science-in-sports',
    label: 'Scandinavian Journal of Medicine & Science in Sports',
  },
  {
    value: 'scandinavian-journal-of-rheumatology',
    label: 'Scandinavian Journal of Rheumatology',
  },
  {
    value: 'scandinavian-journal-of-work-environment-and-health',
    label: 'Scandinavian Journal of Work, Environment & Health',
  },
  {
    value: 'scandinavian-political-studies',
    label: 'Scandinavian Political Studies',
  },
  {
    value: 'science-and-technology-for-the-built-environment',
    label: 'Science and Technology for the Built Environment',
  },
  {
    value: 'science-china-chemistry',
    label: 'Science China Chemistry',
  },
  {
    value: 'science-china-earth-sciences',
    label: 'SCIENCE CHINA Earth Sciences',
  },
  {
    value: 'science-china-life-sciences',
    label: 'SCIENCE CHINA Life Sciences',
  },
  {
    value: 'science-china-materials',
    label: 'SCIENCE CHINA Materials',
  },
  {
    value: 'science-translational-medicine',
    label: 'Science Translational Medicine',
  },
  {
    value: 'science-without-titles',
    label: 'Science (without titles)',
  },
  {
    value: 'science',
    label: 'Science',
  },
  {
    value: 'scienceasia',
    label: 'ScienceAsia',
  },
  {
    value: 'sciences-po-ecole-doctorale-author-date',
    label: 'Sciences Po - Ecole doctorale (author-date, Français)',
  },
  {
    value: 'sciences-po-ecole-doctorale-note-french',
    label: 'Sciences Po - École doctorale (note, Français)',
  },
  {
    value: 'scientia-agriculturae-bohemica',
    label: 'Scientia Agriculturae Bohemica',
  },
  {
    value: 'scientia-iranica',
    label: 'Scientia Iranica',
  },
  {
    value: 'scientific-review-engineering-and-environmental-sciences',
    label:
      'Scientific Review Engineering and Environmental Sciences (Przegląd Naukowy Inżynieria i Kształtowanie Środowiska)',
  },
  {
    value: 'scrinium',
    label: 'Scrinium',
  },
  {
    value: 'sedimentology',
    label: 'Sedimentology',
  },
  {
    value: 'seed-science-and-technology',
    label: 'Seed Science and Technology',
  },
  {
    value: 'seed-science-research',
    label: 'Seed Science Research',
  },
  {
    value: 'seismological-research-letters',
    label: 'Seismological Research Letters',
  },
  {
    value: 'sekolah-tinggi-meteorologi-klimatologi-dan-geofisika',
    label:
      'Sekolah Tinggi Meteorologi Klimatologi dan Geofisika (Bahasa Indonesia)',
  },
  {
    value: 'seminaire-saint-sulpice-ecole-theologie',
    label: 'Séminaire Saint-Sulpice - Ecole Théologie (Français)',
  },
  {
    value: 'seminars-in-pediatric-neurology',
    label: 'Seminars in Pediatric Neurology',
  },
  {
    value: 'serbian-archives-of-medicine',
    label: 'Vancouver - Serbian Archives of Medicine',
  },
  {
    value: 'serdica-journal-of-computing',
    label: 'Serdica Journal of Computing',
  },
  {
    value: 'service-medical-de-l-assurance-maladie',
    label: "Service Médical de l'Assurance Maladie (Français)",
  },
  {
    value: 'sexual-development',
    label: 'Sexual Development',
  },
  {
    value: 'sexual-health',
    label: 'Sexual Health',
  },
  {
    value: 'sheffield-hallam-university-history',
    label: 'Sheffield Hallam University - History',
  },
  {
    value: 'shock',
    label: 'Shock',
  },
  {
    value: 'sinergie-italian-journal-of-management',
    label: 'Sinergie Italian Journal of Management',
  },
  {
    value: 'sist02',
    label: 'SIST02 (日本語)',
  },
  {
    value: 'skene-journal-of-theatre-and-drama-studies',
    label: 'Skenè. Journal of Theatre and Drama Studies',
  },
  {
    value: 'small',
    label: 'Small',
  },
  {
    value: 'smithsonian-institution-scholarly-press-author-date',
    label: 'Smithsonian Institution Scholarly Press (author-date)',
  },
  {
    value: 'smithsonian-institution-scholarly-press-botany',
    label: 'Smithsonian Institution Scholarly Press - Botany (author-date)',
  },
  {
    value: 'smithsonian-institution-scholarly-press-note',
    label: 'Smithsonian Institution Scholarly Press (note)',
  },
  {
    value: 'smyrna-tip-dergisi',
    label: 'Smyrna Tıp Dergisi (Türkçe)',
  },
  {
    value: 'social-anthropology',
    label: 'Social Anthropology/Anthropologie Sociale',
  },
  {
    value: 'social-cognitive-and-affective-neuroscience',
    label: 'Social Cognitive and Affective Neuroscience',
  },
  {
    value: 'sociedade-brasileira-de-computacao',
    label: 'Sociedade Brasileira de Computação',
  },
  {
    value: 'societe-archeologique-de-bordeaux',
    label: 'Société Archéologique de Bordeaux (Français)',
  },
  {
    value: 'societe-francaise-detude-de-la-ceramique-antique-en-gaule',
    label:
      'Société Française d’Étude de la Céramique Antique en Gaule (Français)',
  },
  {
    value: 'societe-nationale-des-groupements-techniques-veterinaires',
    label:
      'Société Nationale des Groupements Techniques Vétérinaires (Français)',
  },
  {
    value: 'societes-contemporaines',
    label: 'Sociétés Contemporaines',
  },
  {
    value: 'society-for-american-archaeology',
    label: 'Society for American Archaeology',
  },
  {
    value: 'society-for-historical-archaeology',
    label: 'Society for Historical Archaeology',
  },
  {
    value: 'society-for-laboratory-automation-and-screening',
    label: 'Society for Laboratory Automation and Screening',
  },
  {
    value: 'society-of-automotive-engineers-technical-papers-numeric',
    label: 'Society of Automotive Engineers Technical Papers (numeric)',
  },
  {
    value: 'society-of-biblical-literature-1st-edition-fullnote-bibliography',
    label: 'Society of Biblical Literature 1st edition (full note)',
  },
  {
    value: 'society-of-biblical-literature-author-date',
    label: 'Society of Biblical Literature 2nd edition (author-date)',
  },
  {
    value: 'society-of-biblical-literature-fullnote-bibliography',
    label: 'Society of Biblical Literature 2nd edition (full note)',
  },
  {
    value: 'socio-economic-review',
    label: 'Socio-Economic Review',
  },
  {
    value: 'sociology-of-health-and-illness',
    label: 'Sociology of Health & Illness',
  },
  {
    value: 'sodertorns-hogskola-harvard-ibid',
    label: 'Södertörns högskola - Harvard (with Ibid.)',
  },
  {
    value: 'sodertorns-hogskola-harvard',
    label: 'Södertörns högskola - Harvard',
  },
  {
    value: 'sodertorns-hogskola-oxford',
    label: 'Södertörns högskola - Oxford',
  },
  {
    value: 'soil-biology-and-biochemistry',
    label: 'Soil Biology and Biochemistry',
  },
  {
    value: 'soil-science-and-plant-nutrition',
    label: 'Soil Science and Plant Nutrition',
  },
  {
    value: 'solent-university-harvard',
    label: 'Solent University - Harvard',
  },
  {
    value: 'solutions',
    label: 'Solutions',
  },
  {
    value: 'sorbonne-student-law-review',
    label:
      'Sorbonne Student Law Review - Revue juridique des étudiants de la Sorbonne',
  },
  {
    value: 'south-african-actuarial-journal',
    label: 'South African Actuarial Journal',
  },
  {
    value: 'south-african-journal-of-animal-science',
    label: 'South African Journal of Animal Science',
  },
  {
    value: 'south-african-journal-of-enology-and-viticulture',
    label: 'South African Journal of Enology and Viticulture',
  },
  {
    value: 'south-african-journal-of-geology',
    label: 'South African Journal of Geology',
  },
  {
    value: 'south-african-medical-journal',
    label: 'South African Medical Journal',
  },
  {
    value: 'south-african-theological-seminary',
    label: 'South African Theological Seminary',
  },
  {
    value: 'southeastern-geographer',
    label: 'Southeastern Geographer',
  },
  {
    value: 'southern-african-journal-of-critical-care',
    label: 'Southern African Journal of Critical Care',
  },
  {
    value: 'soziale-welt',
    label: 'Soziale Welt (Deutsch)',
  },
  {
    value: 'sozialpadagogisches-institut-berlin-walter-may',
    label: 'Sozialpädagogisches Institut Berlin - Walter May (Deutsch)',
  },
  {
    value: 'sozialwissenschaften-heilmann',
    label: 'Sozialwissenschaften (Heilmann) (Deutsch)',
  },
  {
    value: 'soziologie',
    label: 'Soziologie (Deutsch)',
  },
  {
    value: 'soziologiemagazin',
    label: 'Soziologiemagazin (Deutsch)',
  },
  {
    value: 'spandidos-publications',
    label: 'Spandidos Publications',
  },
  {
    value: 'spanish-legal',
    label: 'Spanish Legal (Español)',
  },
  {
    value: 'spectroscopy-letters',
    label: 'Spectroscopy Letters',
  },
  {
    value: 'speculum',
    label: 'Speculum',
  },
  {
    value: 'spie-bios',
    label: 'SPIE BiOS',
  },
  {
    value: 'spie-journals',
    label: 'SPIE journals',
  },
  {
    value: 'spie-proceedings',
    label: 'SPIE Conference Proceedings',
  },
  {
    value: 'spine',
    label: 'Spine',
  },
  {
    value: 'spip-cite',
    label: 'SPIP - Cite plugin',
  },
  {
    value: 'sports-health',
    label: 'Sports Health',
  },
  {
    value: 'springer-basic-author-date-no-et-al-with-issue',
    label: 'Springer - Basic (author-date, no "et al.", with issue numbers)',
  },
  {
    value: 'springer-basic-author-date-no-et-al',
    label: 'Springer - Basic (author-date, no "et al.")',
  },
  {
    value: 'springer-basic-author-date',
    label: 'Springer - Basic (author-date)',
  },
  {
    value: 'springer-basic-brackets-no-et-al-alphabetical',
    label: 'Springer - Basic (numeric, brackets, no "et al.", alphabetical)',
  },
  {
    value: 'springer-basic-brackets-no-et-al',
    label: 'Springer - Basic (numeric, brackets, no "et al.")',
  },
  {
    value: 'springer-basic-brackets',
    label: 'Springer - Basic (numeric, brackets)',
  },
  {
    value: 'springer-basic-note',
    label: 'Springer - Basic (note)',
  },
  {
    value: 'springer-fachzeitschriften-medizin-psychologie',
    label: 'Springer - Fachzeitschriften Medizin Psychologie (Deutsch)',
  },
  {
    value: 'springer-humanities-author-date',
    label: 'Springer - Humanities (author-date)',
  },
  {
    value: 'springer-humanities-brackets',
    label: 'Springer - Humanities (numeric, brackets)',
  },
  {
    value: 'springer-imis-series-migrationsgesellschaften',
    label: 'Springer - IMIS Series Migrationsgesellschaften',
  },
  {
    value: 'springer-lecture-notes-in-computer-science-alphabetical',
    label:
      'Springer - Lecture Notes in Computer Science (sorted alphabetically)',
  },
  {
    value: 'springer-lecture-notes-in-computer-science',
    label: 'Springer - Lecture Notes in Computer Science',
  },
  {
    value: 'springer-mathphys-author-date',
    label: 'Springer - MathPhys (author-date)',
  },
  {
    value: 'springer-mathphys-brackets',
    label: 'Springer - MathPhys (numeric, brackets)',
  },
  {
    value: 'springer-physics-author-date',
    label: 'Springer - Physics (author-date)',
  },
  {
    value: 'springer-physics-brackets',
    label: 'Springer - Physics (numeric, brackets)',
  },
  {
    value: 'springer-socpsych-author-date',
    label: 'Springer - SocPsych (author-date)',
  },
  {
    value: 'springer-socpsych-brackets',
    label: 'Springer - SocPsych (numeric, brackets)',
  },
  {
    value: 'springer-vancouver-author-date',
    label: 'Springer - Vancouver (author-date)',
  },
  {
    value: 'springer-vancouver-brackets',
    label: 'Springer - Vancouver (brackets)',
  },
  {
    value: 'springer-vancouver',
    label: 'Springer - Vancouver',
  },
  {
    value: 'springer-vs-author-date',
    label: 'Springer VS (author-date, Deutsch)',
  },
  {
    value: 'springerprotocols',
    label: 'SpringerProtocols',
  },
  {
    value: 'st-patricks-college',
    label: "St Patrick's College",
  },
  {
    value: 'statistika-statistics-and-economy-journal',
    label: 'Statistika: Statistics and Economy Journal',
  },
  {
    value: 'stavebni-obzor',
    label: 'Stavební obzor (Čeština)',
  },
  {
    value: 'steel-research-international',
    label: 'Steel Research International',
  },
  {
    value: 'steinbeis-hochschule-school-of-management-and-innovation',
    label: 'Steinbeis-Hochschule - School of Management & Innovation (Deutsch)',
  },
  {
    value: 'stellenbosch-law-review',
    label: 'Stellenbosch Law Review',
  },
  {
    value: 'stem-cells',
    label: 'Stem Cells',
  },
  {
    value: 'strategic-design-research-journal',
    label: 'Strategic Design Research Journal',
  },
  {
    value: 'strategic-entrepreneurship-journal',
    label: 'Strategic Entrepreneurship Journal',
  },
  {
    value: 'strategic-management-journal',
    label: 'Strategic Management Journal',
  },
  {
    value: 'stroke',
    label: 'Stroke',
  },
  {
    value: 'structural-control-and-health-monitoring',
    label: 'Structural Control and Health Monitoring',
  },
  {
    value: 'studi-e-materiali-di-storia-delle-religioni',
    label: 'Studi e materiali di storia delle religioni (Italiano)',
  },
  {
    value: 'studi-slavistici-rivista-dellassociazione-italiana-degli-slavisti',
    label: 'Studi Slavistici Rivista dell’Associazione Italiana degli Slavisti',
  },
  {
    value: 'studia-bas',
    label: 'Studia BAS (Polski)',
  },
  {
    value: 'studies-in-the-history-of-gardens-and-designed-landscapes',
    label: 'Studies in the History of Gardens & Designed Landscapes',
  },
  {
    value: 'studii-teologice',
    label: 'Studii Teologice',
  },
  {
    value: 'stuttgart-media-university',
    label: 'Hochschule der Medien Stuttgart (Deutsch)',
  },
  {
    value: 'style-manual-australian-government-note',
    label: 'Style Manual - Australian Government (note)',
  },
  {
    value: 'style-manual-australian-government',
    label: 'Style Manual - Australian Government (author-date)',
  },
  {
    value:
      'style-manual-for-authors-editors-and-printers-6th-edition-snooks-co',
    label:
      'Style manual for authors, editors and printers 6th edition (Snooks & Co.) (author-date)',
  },
  {
    value: 'suburban-zeitschrift-fur-kritische-stadtforschung',
    label: 'sub\\urban - Zeitschrift für kritische Stadtforschung (Deutsch)',
  },
  {
    value: 'sunway-college-johor-bahru',
    label: 'Sunway College Johor Bahru - Harvard',
  },
  {
    value: 'surgical-clinics-of-north-america',
    label: 'Surgical Clinics of North America',
  },
  {
    value: 'surgical-neurology-international',
    label: 'Surgical Neurology International',
  },
  {
    value: 'surgical-pathology-clinics',
    label: 'Surgical Pathology Clinics',
  },
  {
    value: 'svensk-exegetisk-arsbok',
    label: 'Svensk exegetisk årsbok (full note)',
  },
  {
    value: 'swedish-legal',
    label: 'Swedish Legal (Svenska)',
  },
  {
    value: 'swiss-political-science-review',
    label: 'Swiss Political Science Review',
  },
  {
    value: 'sylwan',
    label: 'Sylwan (Polski)',
  },
  {
    value: 'synthesis',
    label: 'Synthesis',
  },
  {
    value: 'system-dynamics-review',
    label: 'System Dynamics Review',
  },
  {
    value: 'systematic-and-applied-microbiology',
    label: 'Systematic and Applied Microbiology',
  },
  {
    value: 'systematic-biology',
    label: 'Systematic Biology',
  },
  {
    value: 'szociologiai-szemle',
    label: 'Szociológiai Szemle (Magyar)',
  },
  {
    value: 'tabula',
    label: 'Tábula (Español)',
  },
  {
    value:
      'tagungsberichte-der-historischen-kommission-fur-ost-und-westpreussische-landesforschung',
    label:
      'Tagungsberichte der Historischen Kommission für ost- und westpreußische Landesforschung (Deutsch)',
  },
  {
    value:
      'tatup-zeitschrift-fur-technikfolgenabschatzung-in-theorie-und-praxis',
    label:
      'TATuP - Zeitschrift für Technikfolgenabschätzung in Theorie und Praxis',
  },
  {
    value: 'taxon',
    label: 'Taxon',
  },
  {
    value: 'taylor-and-francis-acs',
    label: 'Taylor & Francis - American Chemical Society',
  },
  {
    value: 'taylor-and-francis-chicago-author-date',
    label: 'Taylor & Francis - Chicago Manual of Style (author-date)',
  },
  {
    value: 'taylor-and-francis-chicago-f',
    label: 'Taylor & Francis - Chicago F',
  },
  {
    value: 'taylor-and-francis-council-of-science-editors-author-date',
    label: 'Taylor & Francis - Council of Science Editors (author-date)',
  },
  {
    value: 'taylor-and-francis-council-of-science-editors-numeric',
    label: 'Taylor & Francis - Council of Science Editors (numeric)',
  },
  {
    value: 'taylor-and-francis-harvard-x',
    label: 'Taylor & Francis - Harvard X',
  },
  {
    value: 'taylor-and-francis-national-library-of-medicine',
    label: 'Taylor & Francis - National Library of Medicine',
  },
  {
    value: 'taylor-and-francis-numeric-q',
    label: 'Taylor & Francis - Numeric Q',
  },
  {
    value: 'taylor-and-francis-vancouver-national-library-of-medicine',
    label: 'Taylor & Francis - Vancouver/National Library of Medicine',
  },
  {
    value: 'techniques-et-culture',
    label: 'Techniques&Culture (Français)',
  },
  {
    value: 'technische-universitat-dortmund-ag-virtual-machining',
    label: 'Technische Universität Dortmund - AG Virtual Machining (Deutsch)',
  },
  {
    value:
      'technische-universitat-dresden-betriebswirtschaftslehre-logistik-author-date',
    label:
      'Technische Universität Dresden - Betriebswirtschaftslehre/Logistik (author-date)',
  },
  {
    value: 'technische-universitat-dresden-betriebswirtschaftslehre-marketing',
    label:
      'Technische Universität Dresden - Betriebswirtschaftslehre/Marketing (author-date)',
  },
  {
    value:
      'technische-universitat-dresden-betriebswirtschaftslehre-rechnungswesen-controlling',
    label:
      'Technische Universität Dresden - Betriebswirtschaftslehre/Rechnungswesen/Controlling (Deutsch)',
  },
  {
    value:
      'technische-universitat-dresden-erziehungswissenschaften-author-date',
    label:
      'Technische Universität Dresden - Erziehungswissenschaften (author-date)',
  },
  {
    value:
      'technische-universitat-dresden-finanzwirtschaft-und-finanzdienstleistungen-author-date-with-short-titles',
    label:
      'Technische Universität Dresden - Finanzwirtschaft und Finanzdienstleistungen (author-date, with short titles)',
  },
  {
    value:
      'technische-universitat-dresden-finanzwirtschaft-und-finanzdienstleistungen-author-date',
    label:
      'Technische Universität Dresden - Finanzwirtschaft und Finanzdienstleistungen (author-date)',
  },
  {
    value:
      'technische-universitat-dresden-finanzwirtschaft-und-finanzdienstleistungen-note',
    label:
      'Technische Universität Dresden - Finanzwirtschaft und Finanzdienstleistungen (note)',
  },
  {
    value: 'technische-universitat-dresden-forstwissenschaft',
    label:
      'Technische Universität Dresden - Forstwissenschaft (author-date, Deutsch)',
  },
  {
    value: 'technische-universitat-dresden-historische-musikwissenschaft-note',
    label:
      'Technische Universität Dresden - Historische Musikwissenschaft (note, Deutsch)',
  },
  {
    value: 'technische-universitat-dresden-kunstgeschichte-note',
    label: 'Technische Universität Dresden - Kunstgeschichte (note, Deutsch)',
  },
  {
    value: 'technische-universitat-dresden-linguistik',
    label: 'Technische Universität Dresden - Linguistik (Deutsch)',
  },
  {
    value:
      'technische-universitat-dresden-medienwissenschaft-und-neuere-deutsche-literatur-note',
    label:
      'Technische Universität Dresden - Medienwissenschaft und Neuere Deutsche Literatur (note, Deutsch)',
  },
  {
    value: 'technische-universitat-dresden-medizin',
    label: 'Technische Universität Dresden - Medizin',
  },
  {
    value: 'technische-universitat-dresden-wirtschaftswissenschaften',
    label:
      'Technische Universität Dresden - Wirtschaftswissenschaften (Deutsch)',
  },
  {
    value: 'technische-universitat-munchen-controlling',
    label: 'Technische Universität München - Controlling (Deutsch)',
  },
  {
    value: 'technische-universitat-munchen-unternehmensfuhrung',
    label: 'Technische Universität München - Unternehmensführung (Deutsch)',
  },
  {
    value: 'technische-universitat-wien',
    label: 'Technische Universität Wien (dissertation) (Deutsch)',
  },
  {
    value: 'teologia-catalunya',
    label: 'Teologia Catalunya',
  },
  {
    value:
      'termedia-neuropsychiatria-i-neuropsychologia-neuropsychiatry-and-neuropsychology',
    label:
      'Termedia Neuropsychiatria i Neuropsychologia/Neuropsychiatry and Neuropsychology',
  },
  {
    value: 'terra-nova',
    label: 'Terra Nova',
  },
  {
    value: 'tetrahedron-letters',
    label: 'Tetrahedron Letters',
  },
  {
    value: 'textual-cultures',
    label: 'Textual Cultures',
  },
  {
    value: 'textual-practice',
    label: 'Textual Practice',
  },
  {
    value: 'tgm-wien-diplom',
    label: 'TGM Wien Diplomarbeit (Deutsch)',
  },
  {
    value: 'tgm-wien-diplomarbeit-onorm',
    label: 'TGM Wien Diplomarbeit ÖNORM (Deutsch - Österreich)',
  },
  {
    value: 'the-accounting-review',
    label: 'The Accounting Review',
  },
  {
    value: 'the-american-journal-of-bioethics',
    label: 'The American Journal of Bioethics',
  },
  {
    value: 'the-american-journal-of-cardiology',
    label: 'The American Journal of Cardiology',
  },
  {
    value: 'the-american-journal-of-dermatopathology',
    label: 'The American Journal of Dermatopathology',
  },
  {
    value: 'the-american-journal-of-gastroenterology',
    label: 'The American Journal of Gastroenterology',
  },
  {
    value: 'the-american-journal-of-geriatric-psychiatry',
    label: 'The American Journal of Geriatric Psychiatry',
  },
  {
    value: 'the-american-journal-of-human-genetics',
    label: 'The American Journal of Human Genetics',
  },
  {
    value: 'the-american-journal-of-pathology',
    label: 'The American Journal of Pathology',
  },
  {
    value: 'the-american-journal-of-psychiatry',
    label: 'The American Journal of Psychiatry',
  },
  {
    value: 'the-american-journal-of-tropical-medicine-and-hygiene',
    label: 'The American Journal of Tropical Medicine and Hygiene',
  },
  {
    value: 'the-american-midland-naturalist',
    label: 'The American Midland Naturalist',
  },
  {
    value: 'the-american-naturalist',
    label: 'The American Naturalist',
  },
  {
    value: 'the-angle-orthodontist',
    label: 'The Angle Orthodontist',
  },
  {
    value: 'the-astrophysical-journal',
    label: 'The Astrophysical Journal',
  },
  {
    value: 'the-auk',
    label: 'The Auk',
  },
  {
    value: 'the-australian-journal-of-agricultural-and-resource-economics',
    label: 'The Australian Journal of Agricultural and Resource Economics',
  },
  {
    value: 'the-biological-bulletin',
    label: 'The Biological Bulletin',
  },
  {
    value: 'the-bone-and-joint-journal',
    label: 'The Bone & Joint Journal',
  },
  {
    value: 'the-botanical-review',
    label: 'The Botanical Review',
  },
  {
    value: 'the-bovine-practitioner',
    label: 'The Bovine Practitioner',
  },
  {
    value: 'the-british-journal-for-the-philosophy-of-science',
    label: 'The British Journal for the Philosophy of Science',
  },
  {
    value: 'the-british-journal-of-cardiology',
    label: 'The British Journal of Cardiology',
  },
  {
    value: 'the-british-journal-of-criminology',
    label: 'The British Journal of Criminology',
  },
  {
    value: 'the-british-journal-of-psychiatry',
    label: 'The British Journal of Psychiatry',
  },
  {
    value: 'the-british-journal-of-sociology',
    label: 'The British Journal of Sociology',
  },
  {
    value: 'the-canadian-geographer',
    label: 'The Canadian Geographer (Le Géographe canadien)',
  },
  {
    value: 'the-canadian-journal-of-chemical-engineering',
    label: 'The Canadian Journal of Chemical Engineering',
  },
  {
    value: 'the-canadian-journal-of-psychiatry',
    label: 'The Canadian Journal of Psychiatry',
  },
  {
    value: 'the-cancer-journal',
    label: 'The Cancer Journal',
  },
  {
    value: 'the-chemical-society-of-japan',
    label: 'The Chemical Society of Japan',
  },
  {
    value: 'the-chinese-journal-of-international-politics',
    label: 'The Chinese Journal of International Politics',
  },
  {
    value: 'the-company-of-biologists',
    label: 'The Company of Biologists',
  },
  {
    value: 'the-design-journal',
    label: 'The Design Journal',
  },
  {
    value: 'the-economic-history-review',
    label: 'The Economic History Review',
  },
  {
    value: 'the-european-research-journal',
    label: 'The European Research Journal',
  },
  {
    value: 'the-faseb-journal',
    label: 'The FASEB Journal',
  },
  {
    value: 'the-febs-journal',
    label: 'The FEBS Journal',
  },
  {
    value: 'the-geological-society-of-america',
    label: 'The Geological Society of America',
  },
  {
    value: 'the-geological-society-of-london',
    label: 'The Geological Society of London',
  },
  {
    value: 'the-hastings-center-report',
    label: 'The Hastings Center Report',
  },
  {
    value: 'the-historical-journal',
    label: 'The Historical Journal',
  },
  {
    value: 'the-holocene',
    label: 'The Holocene',
  },
  {
    value: 'the-horticulture-journal',
    label: 'The Horticulture Journal',
  },
  {
    value:
      'the-institute-of-electronics-information-and-communication-engineers',
    label:
      'The Institute of Electronics, Information and Communication Engineers (電子情報通信学会)',
  },
  {
    value: 'the-institution-of-engineering-and-technology',
    label: 'The Institution of Engineering and Technology',
  },
  {
    value: 'the-international-journal-of-developmental-biology',
    label: 'The International Journal of Developmental Biology',
  },
  {
    value: 'the-international-journal-of-psychoanalysis',
    label: 'The International Journal of Psychoanalysis',
  },
  {
    value: 'the-international-journal-of-tuberculosis-and-lung-disease',
    label: 'The International Journal of Tuberculosis and Lung Disease',
  },
  {
    value: 'the-isme-journal',
    label: 'The ISME Journal',
  },
  {
    value: 'the-journal-of-adhesive-dentistry',
    label: 'The Journal of Adhesive Dentistry',
  },
  {
    value: 'the-journal-of-agricultural-science',
    label: 'The Journal of Agricultural Science',
  },
  {
    value: 'the-journal-of-clinical-ethics',
    label: 'The Journal of Clinical Ethics',
  },
  {
    value: 'the-journal-of-clinical-investigation',
    label: 'The Journal of Clinical Investigation',
  },
  {
    value: 'the-journal-of-comparative-law',
    label: 'The Journal of Comparative Law',
  },
  {
    value: 'the-journal-of-comparative-neurology',
    label: 'The Journal of Comparative Neurology',
  },
  {
    value: 'the-journal-of-egyptian-archaeology',
    label: 'The Journal of Egyptian Archaeology',
  },
  {
    value: 'the-journal-of-eukaryotic-microbiology',
    label: 'The Journal of Eukaryotic Microbiology',
  },
  {
    value: 'the-journal-of-foot-and-ankle-surgery',
    label: 'The Journal of Foot & Ankle Surgery',
  },
  {
    value: 'the-journal-of-hand-surgery-asian-pacific-volume',
    label: 'The Journal of Hand Surgery Asian-Pacific Volume',
  },
  {
    value: 'the-journal-of-hand-surgery-european-volume',
    label: 'The Journal of Hand Surgery (European Volume)',
  },
  {
    value: 'the-journal-of-hellenic-studies',
    label: 'The Journal of Hellenic Studies',
  },
  {
    value: 'the-journal-of-immunology',
    label: 'The Journal of Immunology',
  },
  {
    value: 'the-journal-of-infection-in-developing-countries',
    label: 'The Journal of Infection in Developing Countries',
  },
  {
    value: 'the-journal-of-juristic-papyrology',
    label: 'The Journal of Juristic Papyrology',
  },
  {
    value: 'the-journal-of-laryngology-and-otology',
    label: 'The Journal of Laryngology & Otology',
  },
  {
    value: 'the-journal-of-modern-history',
    label: 'The Journal of Modern History',
  },
  {
    value: 'the-journal-of-molecular-diagnostics',
    label: 'The Journal of Molecular Diagnostics',
  },
  {
    value: 'the-journal-of-nervous-and-mental-disease',
    label: 'The Journal of Nervous and Mental Disease',
  },
  {
    value: 'the-journal-of-neuropsychiatry-and-clinical-neurosciences',
    label: 'The Journal of Neuropsychiatry and Clinical Neurosciences',
  },
  {
    value: 'the-journal-of-neuroscience',
    label: 'The Journal of Neuroscience',
  },
  {
    value: 'the-journal-of-nuclear-medicine',
    label: 'The Journal of Nuclear Medicine',
  },
  {
    value: 'the-journal-of-nutrition-health-and-aging',
    label: 'The Journal of Nutrition, Health & Aging',
  },
  {
    value: 'the-journal-of-pain',
    label: 'The Journal of Pain',
  },
  {
    value: 'the-journal-of-parasitology',
    label: 'The Journal of Parasitology',
  },
  {
    value: 'the-journal-of-pathology',
    label: 'The Journal of Pathology',
  },
  {
    value: 'the-journal-of-peasant-studies',
    label: 'The Journal of Peasant Studies',
  },
  {
    value: 'the-journal-of-physiology',
    label: 'The Journal of Physiology',
  },
  {
    value: 'the-journal-of-pure-and-applied-chemistry-research',
    label: 'The Journal of Pure and Applied Chemistry Research',
  },
  {
    value: 'the-journal-of-roman-studies',
    label: 'The Journal of Roman Studies',
  },
  {
    value: 'the-journal-of-the-acoustical-society-of-america-numeric',
    label: 'The Journal of the Acoustical Society of America (numeric)',
  },
  {
    value: 'the-journal-of-the-acoustical-society-of-america',
    label: 'The Journal of the Acoustical Society of America (author-date)',
  },
  {
    value: 'the-journal-of-the-torrey-botanical-society',
    label: 'The Journal of the Torrey Botanical Society',
  },
  {
    value: 'the-journal-of-transport-history',
    label: 'The Journal of Transport History',
  },
  {
    value: 'the-journal-of-trauma-and-acute-care-surgery',
    label: 'The Journal of Trauma and Acute Care Surgery',
  },
  {
    value: 'the-journal-of-urology',
    label: 'The Journal of Urology',
  },
  {
    value: 'the-journal-of-veterinary-medical-science',
    label: 'The Journal of Veterinary Medical Science',
  },
  {
    value: 'the-journal-of-wildlife-management',
    label: 'The Journal of Wildlife Management',
  },
  {
    value: 'the-journals-of-gerontology-series-a',
    label:
      'The Journals of Gerontology, Series A: Biological Sciences and Medical Sciences',
  },
  {
    value: 'the-korean-journal-of-gastroenterology',
    label: 'The Korean Journal of Gastroenterology',
  },
  {
    value: 'the-korean-journal-of-internal-medicine',
    label: 'The Korean Journal of Internal Medicine',
  },
  {
    value: 'the-korean-journal-of-mycology',
    label: 'The Korean Journal of Mycology',
  },
  {
    value: 'the-lancet',
    label: 'The Lancet',
  },
  {
    value: 'the-lichenologist',
    label: 'The Lichenologist',
  },
  {
    value: 'the-national-medical-journal-of-india',
    label: 'The National Medical Journal of India',
  },
  {
    value: 'the-neuroscientist',
    label: 'The Neuroscientist',
  },
  {
    value: 'the-new-england-journal-of-medicine',
    label: 'The New England Journal of Medicine',
  },
  {
    value: 'the-oncologist',
    label: 'The Oncologist',
  },
  {
    value: 'the-open-university-a251',
    label: 'The Open University - A251 - Arts Course',
  },
  {
    value: 'the-open-university-harvard',
    label: 'The Open University - Harvard',
  },
  {
    value: 'the-open-university-m801',
    label: 'The Open University - M801 - Research Project and Dissertation',
  },
  {
    value: 'the-open-university-numeric-superscript',
    label: 'The Open University (numeric, superscript)',
  },
  {
    value: 'the-open-university-numeric',
    label: 'The Open University (numeric)',
  },
  {
    value: 'the-open-university-s390',
    label: 'The Open University - S390',
  },
  {
    value: 'the-optical-society',
    label: 'The Optical Society',
  },
  {
    value: 'the-pan-african-medical-journal',
    label: 'The Pan African Medical Journal',
  },
  {
    value: 'the-plant-cell',
    label: 'The Plant Cell',
  },
  {
    value: 'the-plant-genome',
    label: 'The Plant Genome',
  },
  {
    value: 'the-plant-journal',
    label: 'The Plant Journal',
  },
  {
    value: 'the-quarterly-journal-of-economics',
    label: 'The Quarterly Journal of Economics',
  },
  {
    value: 'the-review-of-financial-studies',
    label: 'The Review of Financial Studies',
  },
  {
    value: 'the-rockefeller-university-press',
    label: 'The Rockefeller University Press',
  },
  {
    value: 'the-saudi-journal-for-dental-research',
    label: 'The Saudi Journal for Dental Research',
  },
  {
    value: 'the-scandinavian-journal-of-clinical-and-laboratory-investigation',
    label: 'The Scandinavian Journal of Clinical & Laboratory Investigation',
  },
  {
    value: 'the-university-of-tokyo-law-review',
    label:
      '東京大学法科大学院ローレビュー (The University of Tokyo Law Review) (日本語)',
  },
  {
    value: 'the-university-of-western-australia-harvard',
    label: 'The University of Western Australia - Harvard',
  },
  {
    value: 'the-university-of-winchester-harvard',
    label: 'The University of Winchester - Harvard',
  },
  {
    value: 'the-world-journal-of-biological-psychiatry',
    label: 'The World Journal of Biological Psychiatry',
  },
  {
    value: 'theologie-und-philosophie',
    label: 'Theologie und Philosophie (Deutsch)',
  },
  {
    value: 'theory-culture-and-society',
    label: 'Theory, Culture & Society',
  },
  {
    value: 'theranostics',
    label: 'Theranostics',
  },
  {
    value: 'thieme-german',
    label: 'Thieme-German (Deutsch)',
  },
  {
    value: 'thomson-reuters-legal-tax-and-accounting-australia',
    label: 'Thomson Reuters - Legal, Tax & Accounting Australia',
  },
  {
    value: 'thrombosis-and-haemostasis',
    label: 'Thrombosis and Haemostasis',
  },
  {
    value: 'tijdschrift-voor-economische-en-sociale-geografie',
    label: 'Tijdschrift voor economische en sociale geografie',
  },
  {
    value: 'tijdschrift-voor-geneeskunde',
    label: 'Tijdschrift voor Geneeskunde en Gezondheidszorg (Nederlands)',
  },
  {
    value: 'topoi-orient-occident-auteur-date',
    label: 'Topoi Orient-Occident (auteur-date, Français)',
  },
  {
    value: 'topoi-orient-occident-classique',
    label: 'Topoi Orient-Occident (classique, Français)',
  },
  {
    value: 'toxicological-sciences',
    label: 'Toxicological Sciences',
  },
  {
    value: 'trabajos-de-prehistoria',
    label: 'Trabajos de Prehistoria (Español)',
  },
  {
    value: 'traces',
    label: 'Tracés: Revue de Sciences Humaines (Français)',
  },
  {
    value: 'traffic-injury-prevention',
    label: 'Traffic Injury Prevention',
  },
  {
    value: 'traffic',
    label: 'Traffic',
  },
  {
    value: 'transactions-of-the-american-philological-association',
    label: 'Transactions of the American Philological Association',
  },
  {
    value: 'transactions-of-the-materials-research-society-of-japan',
    label: 'Transactions of the Materials Research Society of Japan',
  },
  {
    value: 'transboundary-and-emerging-diseases',
    label: 'Transboundary and Emerging Diseases',
  },
  {
    value: 'transnational-environmental-law',
    label: 'Transnational Environmental Law',
  },
  {
    value: 'transplantation',
    label: 'Transplantation',
  },
  {
    value: 'transport',
    label: 'Transport',
  },
  {
    value: 'transportation-research-record',
    label:
      'Transportation Research Record: Journal of the Transportation Research Board',
  },
  {
    value: 'transposition',
    label: 'Transposition. Musique et sciences sociales',
  },
  {
    value: 'transversalites',
    label: 'Transversalités (Français)',
  },
  {
    value: 'tree-physiology',
    label: 'Tree Physiology',
  },
  {
    value: 'trends-in-glycoscience-and-glycotechnology',
    label: 'Trends in Glycoscience and Glycotechnology',
  },
  {
    value: 'trends-journals',
    label: 'Trends journals',
  },
  {
    value: 'triangle',
    label: 'Triangle (Français)',
  },
  {
    value:
      'trinity-college-dublin-zoology-botany-environmental-sciences-harvard',
    label:
      'Trinity College Dublin - Zoology Botany Environmental Sciences - Harvard',
  },
  {
    value: 'tropical-animal-health-and-production',
    label: 'Tropical Animal Health and Production',
  },
  {
    value: 'tsaqafah',
    label: 'Tsaqafah',
  },
  {
    value: 'turabian-author-date',
    label: 'Turabian 9th edition (author-date)',
  },
  {
    value: 'turabian-fullnote-bibliography-no-ibid',
    label: 'Turabian 8th edition (full note, no ibid)',
  },
  {
    value: 'turabian-fullnote-bibliography',
    label: 'Turabian 8th edition (full note)',
  },
  {
    value: 'turkiye-bilimsel-ve-teknolojik-arastirma-kurumu',
    label: 'TÜBİTAK (Türkiye Bilimsel ve Teknolojik Araştırma Kurumu) (Türkçe)',
  },
  {
    value: 'twentieth-century-music',
    label: 'Twentieth-Century Music',
  },
  {
    value: 'tyndale-bulletin',
    label: 'Tyndale Bulletin',
  },
  {
    value: 'u-schylku-starozytnosci',
    label: 'U Schyłku Starożytności (Polski)',
  },
  {
    value: 'ucl-institute-of-education-harvard',
    label: 'UCL Institute of Education - Harvard',
  },
  {
    value: 'ucl-university-college-apa',
    label: 'UCL University College - APA (Dansk)',
  },
  {
    value: 'ucl-university-college-harvard',
    label: 'UCL University College - Harvard (Dansk)',
  },
  {
    value: 'ucl-university-college-vancouver',
    label: 'UCL University College - Vancouver (English)',
  },
  {
    value:
      'uclouvain-centre-charles-de-visscher-pour-le-droit-international-et-europeen',
    label:
      'UCLouvain - Centre Charles De Visscher pour le droit international et européen (French)',
  },
  {
    value: 'ugeskrift-for-laeger',
    label: 'Ugeskrift for Læger (Dansk)',
  },
  {
    value: 'ultrasound-in-medicine-and-biology',
    label: 'Ultrasound in Medicine and Biology',
  },
  {
    value: 'ulua-revista-de-historia-sociedad-y-cultura',
    label: 'Ulúa. Revista de Historia, Sociedad y Cultura',
  },
  {
    value: 'uludag-universitesi-sosyal-bilimler-enstitusu-author-date',
    label:
      'Uludağ Üniversitesi - Sosyal Bilimler Enstitüsü (author-date, Türkçe)',
  },
  {
    value: 'uludag-universitesi-sosyal-bilimler-enstitusu-full-note-with-ibid',
    label:
      'Uludağ Üniversitesi - Sosyal Bilimler Enstitüsü (full note, with Ibid., Türkçe)',
  },
  {
    value: 'uludag-universitesi-sosyal-bilimler-enstitusu-full-note',
    label:
      'Uludağ Üniversitesi - Sosyal Bilimler Enstitüsü (full note, Türkçe)',
  },
  {
    value:
      'uludag-universitesi-sosyal-bilimler-enstitusu-ilahiyat-fakultesi-full-note-with-ibid',
    label:
      'Uludağ Üniversitesi - Sosyal Bilimler Enstitüsü - İlahiyat Fakültesi (full note, with Ibid., Türkçe)',
  },
  {
    value:
      'uludag-universitesi-sosyal-bilimler-enstitusu-ilahiyat-fakultesi-full-note',
    label:
      'Uludağ Üniversitesi - Sosyal Bilimler Enstitüsü - İlahiyat Fakültesi (full note, Türkçe)',
  },
  {
    value: 'unesco-international-institute-for-educational-planning',
    label: 'UNESCO International Institute for Educational Planning',
  },
  {
    value: 'unified-style-sheet-for-linguistics-de-gruyter-literature',
    label: 'Unified Stylesheet for Linguistics (de Gruyter Literature)',
  },
  {
    value: 'unified-style-sheet-for-linguistics',
    label: 'Unified style sheet for linguistics',
  },
  {
    value: 'united-nations-conference-on-trade-and-development',
    label: 'United Nations Conference on Trade and Development',
  },
  {
    value: 'united-nations-development-programme-icca-legal-review',
    label: 'United Nations Development Programme ICCA Legal Review',
  },
  {
    value: 'united-nations-framework-convention-on-climate-change',
    label: 'United Nations Framework Convention on Climate Change',
  },
  {
    value: 'united-states-international-trade-commission',
    label: 'United States International Trade Commission',
  },
  {
    value: 'universidad-autonoma-cidudad-juarez-estilo-latino-humanistico',
    label: 'Universidad Autónoma de Ciudad Juárez - Estilo Latino Humanístico',
  },
  {
    value: 'universidad-de-leon-harvard',
    label: 'Universidad de León (España) - Harvard',
  },
  {
    value: 'universidad-evangelica-del-paraguay',
    label: 'Universidad Evangélica del Paraguay (Español)',
  },
  {
    value: 'universidade-de-sao-paulo-escola-de-comunicacoes-e-artes-abnt',
    label:
      'Universidade de São Paulo - Escola de Comunicações e Artes - ABNT (Português - Brasil)',
  },
  {
    value: 'universidade-de-sao-paulo-instituto-de-matematica-e-estatistica',
    label: 'Universidade de São Paulo - Instituto de Matemática e Estatística',
  },
  {
    value: 'universidade-do-estado-do-rio-de-janeiro-abnt',
    label:
      'Universidade do Estado do Rio de Janeiro - ABNT (Português - Brasil)',
  },
  {
    value: 'universidade-do-porto-faculdade-de-engenharia-chicago-pt',
    label:
      'Universidade do Porto - Faculdade de Engenharia - Chicago Manual of Style 17th (author-date) (Português - Portugal)',
  },
  {
    value: 'universidade-do-porto-faculdade-de-engenharia-chicago',
    label:
      'Universidade do Porto - Faculdade de Engenharia - Chicago Manual of Style 17th (author-date)',
  },
  {
    value:
      'universidade-do-porto-faculdade-de-psicologia-e-de-ciencias-da-educacao',
    label:
      'Universidade do Porto - Faculdade de Psicologia e de Ciências da Educação - APA',
  },
  {
    value: 'universidade-estadual-de-alagoas-abnt',
    label: 'Universidade Estadual de Alagoas - ABNT (Português - Brasil)',
  },
  {
    value:
      'universidade-estadual-do-oeste-do-parana-programa-institucional-de-bolsas-de-iniciacao-cientifica',
    label:
      'Universidade Estadual do Oeste do Paraná - Programa Institucional de Bolsas de Iniciação Científica (Português - Brasil)',
  },
  {
    value: 'universidade-estadual-paulista-campus-de-dracena-abnt',
    label:
      'Universidade Estadual Paulista - Campus de Dracena - ABNT (autoria abreviada) (Português - Brasil)',
  },
  {
    value:
      'universidade-estadual-paulista-faculdade-de-engenharia-de-guaratingueta-abnt',
    label:
      'Universidade Estadual Paulista - Faculdade de Engenharia de Guaratingueta - ABNT (Português - Brasil)',
  },
  {
    value: 'universidade-federal-de-juiz-de-fora',
    label: 'Universidade Federal de Juiz de Fora (Português - Brasil)',
  },
  {
    value: 'universidade-federal-de-pernambuco-abnt',
    label: 'Universidade Federal de Pernambuco - ABNT (Português - Brasil)',
  },
  {
    value:
      'universidade-federal-de-sergipe-departamento-de-engenharia-de-producao-abnt',
    label:
      'Universidade Federal de Sergipe - Departamento de Engenharia de Produção - ABNT (Português - Brasil)',
  },
  {
    value: 'universidade-federal-do-espirito-santo-abnt-initials',
    label:
      'Universidade Federal do Espírito Santo - ABNT (autoria abreviada) (Português - Brasil)',
  },
  {
    value: 'universidade-federal-do-espirito-santo-abnt',
    label:
      'Universidade Federal do Espírito Santo - ABNT (autoria completa) (Português - Brasil)',
  },
  {
    value:
      'universidade-federal-do-rio-de-janeiro-instituto-alberto-luiz-coimbra-de-pos-graduacao-e-pesquisa-de-engenharia-abnt',
    label:
      'Universidade Federal do Rio de Janeiro - Instituto Alberto Luiz Coimbra de Pós-Graduação e Pesquisa de Engenharia - ABNT (Português - Brasil)',
  },
  {
    value: 'universita-cattolica-del-sacro-cuore',
    label: 'Università Cattolica del Sacro Cuore (note, Italiano)',
  },
  {
    value: 'universita-di-bologna-lettere',
    label:
      'University of Bologna - Liberal Arts College (Università di Bologna - Facoltà di Lettere e Filosofia) (Italiano)',
  },
  {
    value: 'universita-pontificia-salesiana-it',
    label: 'Università Pontificia Salesiana (Italiano)',
  },
  {
    value: 'universita-pontificia-salesiana',
    label: 'Università Pontificia Salesiana',
  },
  {
    value: 'universitas-gadjah-mada-departemen-sejarah',
    label: 'Universitas Gadjah Mada - Departemen Sejarah (Bahasa Indonesia)',
  },
  {
    value:
      'universitas-negeri-semarang-fakultas-matematika-dan-ilmu-pengetahuan-alam',
    label:
      'Universitas Negeri Semarang - Fakultas Matematika dan Ilmu Pengetahuan Alam (Bahasa Indonesia)',
  },
  {
    value: 'universitas-negeri-yogyakarta-program-pascasarjana',
    label:
      'Universitas Negeri Yogyakarta - Program Pascasarjana (Bahasa Indonesia)',
  },
  {
    value: 'universitat-basel-deutsche-sprachwissenschaft',
    label: 'Universität Basel - Deutsche Sprachwissenschaft',
  },
  {
    value: 'universitat-basel-iberoromanistik',
    label: 'Universität Basel - Iberoromanistik (Español)',
  },
  {
    value: 'universitat-bern-institut-fur-musikwissenschaft-note',
    label: 'Universität Bern - Institut für Musikwissenschaft (note, Deutsch)',
  },
  {
    value: 'universitat-bern-institut-fur-sozialanthropologie',
    label:
      'Universität Bern - Institut für Sozialanthropologie (Deutsch - Schweiz)',
  },
  {
    value: 'universitat-bremen-institut-fur-politikwissenschaft',
    label: 'Universität Bremen - Institut für Politikwissenschaft (Deutsch)',
  },
  {
    value: 'universitat-bremen-lehrstuhl-fur-innovatives-markenmanagement',
    label:
      'Universität Bremen - Lehrstuhl für innovatives Markenmanagement (Deutsch)',
  },
  {
    value: 'universitat-freiburg-geschichte',
    label: 'Albert-Ludwigs-Universität Freiburg - Geschichte (Deutsch)',
  },
  {
    value: 'universitat-heidelberg-historisches-seminar',
    label: 'Universität Heidelberg - Historisches Seminar (Deutsch)',
  },
  {
    value: 'universitat-heidelberg-medizinische-fakultat-mannheim-numeric',
    label:
      'Universität Heidelberg - Medizinische Fakultät Mannheim (numerisch, Deutsch)',
  },
  {
    value: 'universitat-mainz-geographisches-institut',
    label: 'Universität Mainz - Geographisches Institut (Deutsch)',
  },
  {
    value: 'universitat-mannheim-germanistische-linguistik',
    label: 'Universität Mannheim - Germanistische Linguistik (Deutsch)',
  },
  {
    value: 'universitat-stuttgart-planung-und-partizipation',
    label: 'Universität Stuttgart - Planung und Partizipation (Deutsch)',
  },
  {
    value: 'universitat-wien-institut-fur-geschichte',
    label: 'Universität Wien - Institut für Geschichte',
  },
  {
    value: 'universitat-zu-koln-seminar-fur-abwl-und-finanzierungslehre',
    label:
      'Universität zu Köln - Seminar für ABWL und Finanzierungslehre (Deutsch)',
  },
  {
    value: 'universitatsmedizin-gottingen',
    label: 'Universitätsmedizin Göttingen (Deutsch)',
  },
  {
    value: 'universite-catholique-de-louvain-histoire',
    label: 'Université Catholique de Louvain - Histoire (Français)',
  },
  {
    value:
      'universite-cheikh-anta-diop-faculte-de-medecine-de-pharmacie-et-dodontologie',
    label:
      "Université Cheikh Anta Diop - Faculté de Médecine de Pharmacie et d'Odontologie (Français)",
  },
  {
    value: 'universite-de-bordeaux-ecole-doctorale-de-droit',
    label: 'Université de Bordeaux - École doctorale de droit (Français)',
  },
  {
    value:
      'universite-de-geneve-departement-de-langue-et-de-litterature-francaises-modernes',
    label:
      'Université de Genève - Département de langue et de littérature françaises modernes (Français)',
  },
  {
    value: 'universite-de-lausanne-histoire',
    label: 'Université de Lausanne - Histoire (Français)',
  },
  {
    value: 'universite-de-liege-droit-par-categorie',
    label: 'Université de Liège - Droit (classement par catégorie, Français)',
  },
  {
    value: 'universite-de-liege-droit',
    label: 'Université de Liège - Droit (Français)',
  },
  {
    value: 'universite-de-liege-histoire',
    label: 'Université de Liège - Histoire (Français)',
  },
  {
    value: 'universite-de-montreal-apa',
    label: 'Université de Montréal - APA (Français - Canada)',
  },
  {
    value: 'universite-de-montreal-faculte-de-musique',
    label: 'Université de Montréal - Faculté de musique (Français - Canada)',
  },
  {
    value: 'universite-de-picardie-jules-verne-ufr-de-medecine',
    label:
      'Université de Picardie Jules Verne (Amiens) - Thèse de UFR de Médecine',
  },
  {
    value: 'universite-de-sherbrooke-departement-de-geomatique',
    label:
      'Université de Sherbrooke - Département de géomatique (Français - Canada)',
  },
  {
    value: 'universite-de-sherbrooke-faculte-d-education',
    label: "Université de Sherbrooke - Faculté d'éducation (Français - Canada)",
  },
  {
    value: 'universite-de-sherbrooke-histoire',
    label: 'Université de Sherbrooke - Histoire (Français - Canada)',
  },
  {
    value: 'universite-du-quebec-a-montreal-departement-dhistoire',
    label:
      'Université du Québec à Montréal - Département d’histoire (Français - Canada)',
  },
  {
    value: 'universite-du-quebec-a-montreal-etudes-litteraires-et-semiologie',
    label:
      'Université du Québec à Montréal - Études littéraires et sémiologie (Français - Canada)',
  },
  {
    value: 'universite-du-quebec-a-montreal',
    label: 'Université du Québec à Montréal - APA (Français - Canada)',
  },
  {
    value: 'universite-laval-departement-des-sciences-historiques',
    label:
      'Université Laval - Département des sciences historiques (Français - Canada)',
  },
  {
    value: 'universite-laval-departement-dinformation-et-de-communication',
    label:
      "Université Laval - Département d'information et de communication (Français - Canada)",
  },
  {
    value: 'universite-laval-faculte-de-theologie-et-de-sciences-religieuses',
    label:
      'Université Laval - Faculté de théologie et de sciences religieuses (Français - Canada)',
  },
  {
    value: 'universite-libre-de-bruxelles-histoire',
    label: 'Université libre de Bruxelles - Histoire (Français)',
  },
  {
    value: 'universite-nangui-abrogoua-sciences-de-la-nature-apa',
    label:
      'Université Nangui Abrogoua - Sciences de la Nature - APA (Français)',
  },
  {
    value: 'universiteit-utrecht-onderzoeksgids-geschiedenis',
    label: 'Universiteit Utrecht - Onderzoeksgids Geschiedenis (Nederlands)',
  },
  {
    value: 'universitetet-i-oslo-rettsvitenskap',
    label: 'Universitetet i Oslo - Rettsvitenskap (Norsk - Bokmål)',
  },
  {
    value: 'universiti-kebangsaan-malaysia',
    label: 'Universiti Kebangsaan Malaysia (Malay)',
  },
  {
    value: 'university-college-dublin-school-of-history-and-archives',
    label: 'University College Dublin - School of History & Archives',
  },
  {
    value: 'university-college-lillebaelt-apa',
    label: 'University College Lillebælt - APA (Dansk)',
  },
  {
    value: 'university-for-the-creative-arts-figures',
    label: 'University for the Creative Arts (figures and illustrations)',
  },
  {
    value: 'university-of-aberdeen-school-of-education-harvard',
    label: 'University of Aberdeen - School of Education - Harvard',
  },
  {
    value: 'university-of-aleppo-faculty-of-medicine',
    label: 'University of Aleppo - Faculty of Medicine',
  },
  {
    value: 'university-of-auckland-history',
    label: 'University of Auckland - History',
  },
  {
    value: 'university-of-bradford-harvard',
    label: 'University of Bradford - Harvard',
  },
  {
    value: 'university-of-cambridge-faculty-of-history',
    label: 'University of Cambridge - Faculty of History',
  },
  {
    value: 'university-of-gothenburg-apa-7th-edition-swedish-legislations',
    label: 'University of Gothenburg - APA 7th edition (Swedish legislations)',
  },
  {
    value: 'university-of-gothenburg-apa-swedish-legislations',
    label: 'University of Gothenburg - APA 6th edition (Swedish legislations)',
  },
  {
    value: 'university-of-helsinki-faculty-of-theology',
    label: 'Helsingin yliopisto - Teologinen tiedekunta (Suomi)',
  },
  {
    value: 'university-of-lincoln-harvard',
    label: 'University of Lincoln - Harvard',
  },
  {
    value: 'university-of-new-england-australia-note',
    label: 'University of New England, Australia (note)',
  },
  {
    value: 'university-of-roehampton-harvard',
    label: 'University of Roehampton - Harvard',
  },
  {
    value: 'university-of-south-africa-harvard',
    label: 'University of South Africa - Harvard',
  },
  {
    value: 'university-of-south-australia-2017-harvard',
    label: 'University of South Australia 2017 - Harvard',
  },
  {
    value: 'university-of-south-australia-harvard-2011',
    label: 'University of South Australia 2011 - Harvard',
  },
  {
    value: 'university-of-south-australia-harvard-2013',
    label: 'University of South Australia 2013 - Harvard',
  },
  {
    value: 'university-of-south-wales-harvard',
    label: 'University of South Wales - Harvard',
  },
  {
    value: 'university-of-tasmania-simplified-author-date',
    label: 'University of Tasmania - Simplified Author-date',
  },
  {
    value: 'university-of-york-apa',
    label: 'University of York - APA 6th edition',
  },
  {
    value: 'university-of-york-chicago',
    label: 'University of York - Chicago Manual of Style 16th edition',
  },
  {
    value: 'university-of-york-harvard-archaeology',
    label: 'University of York - Harvard - Archaeology',
  },
  {
    value: 'university-of-york-harvard-environment',
    label: 'University of York - Harvard - Environment',
  },
  {
    value: 'university-of-york-harvard',
    label: 'University of York - Harvard',
  },
  {
    value: 'university-of-york-ieee',
    label: 'University of York - IEEE',
  },
  {
    value: 'university-of-york-mhra',
    label:
      'University of York - Modern Humanities Research Association 3rd edition',
  },
  {
    value: 'university-of-york-mla',
    label: 'University of York - Modern Language Association 8th edition',
  },
  {
    value: 'university-of-york-oscola',
    label: 'University of York - OSCOLA',
  },
  {
    value: 'university-of-york-vancouver',
    label: 'University of York - Vancouver',
  },
  {
    value: 'university-of-zabol-fa',
    label: 'University of Zabol (فارسی)',
  },
  {
    value: 'university-of-zabol',
    label: 'University of Zabol (English)',
  },
  {
    value: 'univerza-na-primorskem-fakulteta-za-vede-o-zdravju-apa',
    label:
      'Univerza na Primorskem - Fakulteta za vede o zdravju - APA (Slovenščina)',
  },
  {
    value: 'uniwersytet-im-adama-mickiewicza-w-poznaniu-wydzial-anglistyki',
    label:
      'Uniwersytet im. Adama Mickiewicza w Poznaniu - Wydział Anglistyki (English)',
  },
  {
    value: 'uniwersytet-kardynala-stefana-wyszynskiego-w-warszawie-autor-rok',
    label:
      'Uniwersytet Kardynała Stefana Wyszyńskiego w Warszawie (autor-rok, Polski)',
  },
  {
    value: 'uniwersytet-kardynala-stefana-wyszynskiego-w-warszawie-przypis',
    label:
      'Uniwersytet Kardynała Stefana Wyszyńskiego w Warszawie (przypis, Polski)',
  },
  {
    value: 'uppsala-universitet-historia',
    label: 'Uppsala universitet - Historia',
  },
  {
    value: 'uppsala-universitet-institutionen-for-biologisk-grundutbildning',
    label: 'Uppsala universitet, Institutionen för biologisk grundutbildning',
  },
  {
    value: 'urad-rs-za-makroekonomske-analize-in-razvoj',
    label: 'Urad RS za makroekonomske analize in razvoj (Slovenščina)',
  },
  {
    value: 'urban-geography',
    label: 'Urban Geography',
  },
  {
    value: 'urban-habitats',
    label: 'Urban Habitats',
  },
  {
    value: 'urban-studies',
    label: 'Urban Studies',
  },
  {
    value: 'urbani-izziv-en',
    label: 'Urbani izziv (Urban Challenge) (English)',
  },
  {
    value: 'urbani-izziv',
    label: 'Urbani izziv (Urban Challenge) (Slovenščina)',
  },
  {
    value: 'urological-science',
    label: 'Urological Science',
  },
  {
    value: 'us-geological-survey',
    label: 'U.S. Geological Survey',
  },
  {
    value: 'usda-forest-service-pacific-northwest-research-station',
    label: 'USDA Forest Service - Pacific Northwest Research Station',
  },
  {
    value: 'user-modeling-and-user-adapted-interaction',
    label: 'User Modeling and User-Adapted Interaction',
  },
  {
    value: 'uspekhi-gerontologii',
    label: 'Успехи геронтологии (Ру́сский)',
  },
  {
    value: 'utah-geological-survey',
    label: 'Utah Geological Survey',
  },
  {
    value: 'vancouver-author-date',
    label: 'Vancouver (author-date)',
  },
  {
    value: 'vancouver-brackets-no-et-al',
    label: 'Vancouver (brackets, no "et al.")',
  },
  {
    value: 'vancouver-brackets-only-year-no-issue',
    label: 'Vancouver (brackets, only year in date, no issue numbers)',
  },
  {
    value: 'vancouver-brackets',
    label: 'Vancouver (brackets)',
  },
  {
    value: 'vancouver-fr-ca',
    label: 'Vancouver (Français - Canada)',
  },
  {
    value: 'vancouver-imperial-college-london',
    label: 'Imperial College London - Vancouver',
  },
  {
    value: 'vancouver-superscript-brackets-only-year',
    label: 'Vancouver (superscript, brackets, only year in date)',
  },
  {
    value: 'vancouver-superscript-only-year',
    label: 'Vancouver (superscript, only year in date, no issue numbers)',
  },
  {
    value: 'vancouver-superscript',
    label: 'Vancouver (superscript)',
  },
  {
    value: 'vancouver',
    label: 'Vancouver',
  },
  {
    value: 'veterinaria-italiana',
    label: 'Veterinaria Italiana',
  },
  {
    value: 'veterinary-medicine-austria',
    label: 'Veterinary Medicine Austria (Wiener Tierärztliche Monatsschrift)',
  },
  {
    value: 'veterinary-microbiology',
    label: 'Veterinary Microbiology',
  },
  {
    value: 'veterinary-pathology',
    label: 'Veterinary Pathology',
  },
  {
    value: 'veterinary-radiology-and-ultrasound',
    label: 'Veterinary Radiology & Ultrasound',
  },
  {
    value: 'veterinary-record',
    label: 'Veterinary Record',
  },
  {
    value: 'victoria-university-harvard',
    label: 'Victoria University - Harvard',
  },
  {
    value: 'vienna-legal',
    label: 'Vienna Legal',
  },
  {
    value: 'vietnam-ministry-of-education-and-training-en',
    label: 'Vietnam Ministry of Education and Training (English)',
  },
  {
    value: 'vietnam-ministry-of-education-and-training-vi',
    label: 'Vietnam Ministry of Education and Training (Tiếng Việt)',
  },
  {
    value: 'vigiliae-christianae',
    label: 'Vigiliae Christianae',
  },
  {
    value: 'vilnius-gediminas-technical-university',
    label: 'Vilnius Gediminas Technical University (Lietuvių kalba)',
  },
  {
    value: 'vingtieme-siecle',
    label: "Vingtième Siècle. Revue d'histoire (Français)",
  },
  {
    value: 'vita-latina-auteurs-anciens',
    label: 'Vita Latina (auteurs anciens, Français)',
  },
  {
    value: 'vita-latina',
    label: 'Vita Latina (Français)',
  },
  {
    value: 'vodohospodarske-technicko-ekonomicke-informace-en',
    label: 'Vodohospodářské technicko-ekonomické informace (English)',
  },
  {
    value: 'vodohospodarske-technicko-ekonomicke-informace',
    label: 'Vodohospodářské technicko-ekonomické informace (Čeština)',
  },
  {
    value: 'wader-study',
    label: 'Wader Study',
  },
  {
    value: 'water-alternatives',
    label: 'Water Alternatives',
  },
  {
    value: 'water-environment-research',
    label: 'Water Environment Research',
  },
  {
    value: 'water-sa',
    label: 'Water SA',
  },
  {
    value: 'water-science-and-technology',
    label: 'Water Science & Technology',
  },
  {
    value: 'waterbirds',
    label: 'Waterbirds',
  },
  {
    value: 'weed-research',
    label: 'Weed Research',
  },
  {
    value: 'weed-science-society-of-america',
    label: 'Weed Science Society of America',
  },
  {
    value: 'west-european-politics',
    label: 'West European Politics',
  },
  {
    value: 'western-journal-of-emergency-medicine',
    label: 'Western Journal of Emergency Medicine',
  },
  {
    value: 'westfalische-wilhelms-universitat-munster-medizinische-fakultat',
    label:
      'Westfälische Wilhelms-Universität Münster - Medizinische Fakultät (Deutsch)',
  },
  {
    value: 'wetlands',
    label: 'Wetlands',
  },
  {
    value: 'wheaton-college-phd-in-biblical-and-theological-studies',
    label: 'Wheaton College - Ph.D. in Biblical and Theological Studies',
  },
  {
    value: 'who-europe-harvard',
    label: 'WHO Regional Office for Europe - Harvard',
  },
  {
    value: 'who-europe-numeric',
    label: 'WHO Regional Office for Europe (numeric)',
  },
  {
    value: 'wiesbaden-business-school',
    label: 'Wiesbaden Business School',
  },
  {
    value: 'wikipedia-templates',
    label: 'Wikipedia Templates',
  },
  {
    value: 'wiley-vch-books',
    label: 'Wiley-VCH books',
  },
  {
    value: 'wireless-communications-and-mobile-computing',
    label: 'Wireless Communications and Mobile Computing',
  },
  {
    value: 'wirtschaftsuniversitat-wien-abteilung-fur-bildungswissenschaft',
    label:
      'Wirtschaftsuniversität Wien - Abteilung für Bildungswissenschaft (Deutsch - Österreich)',
  },
  {
    value: 'wirtschaftsuniversitat-wien-author-date',
    label: 'Wirtschaftsuniversität Wien (author-date)',
  },
  {
    value: 'wirtschaftsuniversitat-wien-handel-und-marketing',
    label:
      'Wirtschaftsuniversität Wien - Handel und Marketing (Deutsch - Österreich)',
  },
  {
    value: 'wirtschaftsuniversitat-wien-health-care-management',
    label: 'Wirtschaftsuniversität Wien - Health Care Management',
  },
  {
    value: 'wirtschaftsuniversitat-wien-institut-fur-bwl-des-aussenhandels',
    label:
      'Wirtschaftsuniversität Wien - Institut für BWL des Außenhandels (Deutsch - Österreich)',
  },
  {
    value:
      'wirtschaftsuniversitat-wien-institut-fur-transportwirtschaft-und-logistik',
    label:
      'Wirtschaftsuniversität Wien - Institut für Transportwirtschaft und Logistik (Deutsch - Österreich)',
  },
  {
    value: 'wirtschaftsuniversitat-wien-unternehmensrechnung-und-controlling',
    label: 'Wirtschaftsuniversität Wien - Unternehmensrechnung und Controlling',
  },
  {
    value: 'wirtschaftsuniversitat-wien-wirtschaftspadagogik',
    label:
      'Wirtschaftsuniversität Wien - Wirtschaftspädagogik (Deutsch - Österreich)',
  },
  {
    value: 'wissenschaftlicher-industrielogistik-dialog',
    label: 'Wissenschaftlicher Industrielogistik-Dialog (Deutsch - Österreich)',
  },
  {
    value: 'wolters-kluwerbrede-schrijfwijzer-author-date',
    label: 'Wolters Kluwerbrede Schrijfwijzer (author-date, Nederlands)',
  },
  {
    value: 'world-applied-sciences-journal',
    label: 'World Applied Sciences Journal',
  },
  {
    value: 'world-congress-on-engineering-asset-management',
    label: 'World Congress on Engineering Asset Management 2010',
  },
  {
    value: 'world-mycotoxin-journal',
    label: 'World Mycotoxin Journal',
  },
  {
    value:
      'world-organisation-for-animal-health-scientific-and-technical-review',
    label:
      'World Organisation for Animal Health - Scientific and Technical Review',
  },
  {
    value: 'world-politcs',
    label: 'World Politics',
  },
  {
    value: 'worlds-poultry-science-journal',
    label: "World's Poultry Science Journal",
  },
  {
    value: 'worlds-veterinary-journal',
    label: "World's Veterinary Journal",
  },
  {
    value: 'xenotransplantation',
    label: 'Xenotransplantation',
  },
  {
    value: 'yeast',
    label: 'Yeast',
  },
  {
    value: 'yozgat-bozok-universitesi-fen-bilimleri-enstitusu',
    label: 'Yozgat Bozok Üniversitesi - Fen Bilimleri Enstitüsü (Türkçe)',
  },
  {
    value: 'zastosowania-komputerow-w-elektrotechnice',
    label: 'Zastosowania Komputerów w Elektrotechnice',
  },
  {
    value: 'zdfm-zeitschrift-fur-diversitatsforschung-und-management',
    label:
      'ZDfm – Zeitschrift für Diversitätsforschung und -management (Deutsch - Österreich)',
  },
  {
    value: 'zdravniski-vestnik',
    label: 'Zdravniški Vestnik (Slovenian Medical Journal)',
  },
  {
    value: 'zeitgeschichte',
    label: 'Zeitgeschichte (Deutsch)',
  },
  {
    value: 'zeithistorische-forschungen',
    label: 'Zeithistorische Forschungen/Studies in Contemporary History',
  },
  {
    value: 'zeitschrift-fur-allgemeinmedizin',
    label: 'Zeitschrift für Allgemeinmedizin',
  },
  {
    value: 'zeitschrift-fur-antikes-christentum',
    label:
      'Zeitschrift für Antikes Christentum (Journal of Ancient Christianity) (English)',
  },
  {
    value: 'zeitschrift-fur-deutsche-philologie',
    label: 'Zeitschrift für deutsche Philologie (Deutsch)',
  },
  {
    value: 'zeitschrift-fur-die-geschichte-des-oberrheins',
    label: 'Zeitschrift für die Geschichte des Oberrheins (Deutsch)',
  },
  {
    value: 'zeitschrift-fur-digitale-geisteswissenschaften',
    label: 'Zeitschrift für digitale Geisteswissenschaften (Deutsch)',
  },
  {
    value: 'zeitschrift-fur-fantastikforschung',
    label: 'Zeitschrift für Fantastikforschung (Deutsch)',
  },
  {
    value: 'zeitschrift-fur-geschichtsdidaktik',
    label: 'Zeitschrift für Geschichtsdidaktik (Deutsch)',
  },
  {
    value: 'zeitschrift-fur-internationale-beziehungen',
    label: 'Zeitschrift für Internationale Beziehungen (Deutsch)',
  },
  {
    value: 'zeitschrift-fur-kunstgeschichte',
    label: 'Zeitschrift für Kunstgeschichte',
  },
  {
    value: 'zeitschrift-fur-medien-und-kulturforschung',
    label: 'Zeitschrift für Medien- und Kulturforschung (Deutsch)',
  },
  {
    value: 'zeitschrift-fur-medienwissenschaft',
    label: 'Zeitschrift für Medienwissenschaft (Deutsch)',
  },
  {
    value: 'zeitschrift-fur-ostmitteleuropa-forschung',
    label: 'Zeitschrift für Ostmitteleuropa-Forschung (Deutsch)',
  },
  {
    value: 'zeitschrift-fur-padagogik',
    label: 'Zeitschrift für Pädagogik (Deutsch)',
  },
  {
    value: 'zeitschrift-fur-papyrologie-und-epigraphik',
    label: 'Zeitschrift für Papyrologie und Epigraphik',
  },
  {
    value: 'zeitschrift-fur-parlamentsfragen',
    label: 'Zeitschrift für Parlamentsfragen (Deutsch)',
  },
  {
    value: 'zeitschrift-fur-politik',
    label: 'Zeitschrift für Politik (German)',
  },
  {
    value: 'zeitschrift-fur-qualitative-forschung',
    label: 'Zeitschrift für Qualitative Forschung (Deutsch)',
  },
  {
    value: 'zeitschrift-fur-religionswissenschaft-author-date',
    label: 'Zeitschrift für Religionswissenschaft (author-date)',
  },
  {
    value: 'zeitschrift-fur-religionswissenschaft-note',
    label: 'Zeitschrift für Religionswissenschaft (note)',
  },
  {
    value: 'zeitschrift-fur-soziologie',
    label: 'Zeitschrift für Soziologie (Deutsch)',
  },
  {
    value: 'zeitschrift-fur-theologie-und-kirche',
    label: 'Zeitschrift für Theologie und Kirche (Deutsch)',
  },
  {
    value: 'zeitschrift-fur-theologie-und-philosophie',
    label: 'Zeitschrift für Theologie und Philosophie',
  },
  {
    value: 'zeitschrift-fur-zahnarztliche-implantologie',
    label: 'Zeitschrift für Zahnärztliche Implantologie (Deutsch)',
  },
  {
    value: 'zeszyty-prawnicze-bas',
    label: 'Zeszyty Prawnicze BAS (Polski)',
  },
  {
    value: 'zilsel',
    label: 'Zilsel (Français)',
  },
  {
    value:
      'zitierguide-leitfaden-zum-fachgerechten-zitieren-in-rechtswissenschaftlichen-arbeiten',
    label:
      'ZitierGuide: Leitfaden zum fachgerechten Zitieren in rechtswissenschaftlichen Arbeiten (Roger Müller) (Deutsch - Schweiz)',
  },
  {
    value: 'zoological-journal-of-the-linnean-society',
    label: 'Zoological Journal of the Linnean Society',
  },
  {
    value: 'zootaxa',
    label: 'Zootaxa',
  },
  {
    value: 'zwitscher-maschine',
    label: 'Zwitscher-Maschine',
  },
  {
    value: 'jm-azr-erstzitat-kurz-mit-verzeichnissen',
    label: 'JM AZR (Erstzitat kurz mit Verzeichnissen)',
  },
  {
    value: 'jm-azr',
    label: 'JM AZR',
  },
  {
    value: 'jm-chicago-fullnote-bibliography-nagoya',
    label: 'JM Chicago Manual of Style 16th edition (full note) [Nagoya]',
  },
  {
    value: 'jm-chicago-fullnote-bibliography-polyglot',
    label: 'JM Chicago Manual of Style 16th edition (full note, polyglot)',
  },
  {
    value: 'jm-chicago-fullnote-bibliography',
    label: 'JM Chicago Manual of Style 16th edition (full note)',
  },
  {
    value: 'jm-chinese-gb7714-2005-numeric',
    label: 'JM Chinese Std GB/T 7714-2005 (numeric, Chinese)',
  },
  {
    value: 'jm-diritto-pubblico-comparato-ed-europeo',
    label: 'JM Diritto pubblico comparato ed europeo',
  },
  {
    value: 'harvard-australian-national-university',
    label: 'JM Harvard - Australian National University',
  },
  {
    value: 'jm-ibfd-with-page-label',
    label: 'JM IBFD Standard Citations and References (with page label)',
  },
  {
    value: 'jm-ibfd',
    label: 'JM IBFD Standard Citations and References',
  },
  {
    value: 'jm-indigobook-law-review',
    label: 'JM Indigo Book Law Review',
  },
  {
    value: 'jm-indigobook',
    label: 'JM Indigo Book',
  },
  {
    value: 'japan-sociological-society',
    label: '日本社会学会 (author-date, Japanese)',
  },
  {
    value: 'jm-leg-cit-literaturverzeichnis',
    label: 'JM leg cit mit Literaturverzeichnis',
  },
  {
    value: 'jm-leg-cit-ohne-verzeichnisse',
    label: 'JM leg cit ohne Verzeichnisse',
  },
  {
    value: 'jm-leg-cit-rechtsquellenverzeichnis-literaturverzeichnis',
    label: 'JM leg cit mit Rechtsquellenverzeichnis und Literaturverzeichnis',
  },
  {
    value: 'jm-mgcill-v9',
    label:
      'JM - Canadian Guide to Uniform Legal Citation (9th edition) / Manuel canadien de la référence juridique (9ᵉ édition)',
  },
  {
    value: 'jm-new-zealand-law',
    label: 'JM New Zealand Law Style',
  },
  {
    value: 'jm-oscola',
    label: 'JM OSCOLA - Oxford Standard for Citation of Legal Authorities',
  },
  {
    value: 'jm-taylor-and-francis-chicago-author-date',
    label: 'JM Taylor & Francis - Chicago Manual of Style (author-date)',
  },
  {
    value: 'jm-turabian-fullnote-bibliography-eu-multi',
    label: 'JM Turabian 8th edition (full note, EU multilingual)',
  },
  {
    value: 'jm-turabian-fullnote-bibliography-nl-multi',
    label: 'JM Turabian 8th edition (full note, Dutch multilingual)',
  },
  {
    value: 'jm-vis-moot-1',
    label: 'JM Vis Moot variant 1',
  },
  {
    value: 'jm-wirtschaftsuniversitat-wien-steuerrecht',
    label: 'JM Wirtschaftsuniversität Wien – Steuerrecht',
  },
  {
    value: 'juris-eu.int',
    label: 'Verwijzingen en Afkortingen (Belgium)',
  },
];

export const cslList = new Fuse(cslListRaw, {
  keys: ['label'],
  minMatchCharLength: 3,
});
