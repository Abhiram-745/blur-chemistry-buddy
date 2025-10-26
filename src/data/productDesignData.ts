// GCSE AQA Product Design - Chapter 2: Specialist Technical Principles
// Complete with color-coded subsections

export interface PracticeItem {
  id: string;
  prompt_template: string;
  marks: number;
  type: "open" | "short-answer" | "mcq";
  difficulty: "easy" | "medium" | "hard";
  randomise: boolean;
  expected_keywords: string[];
}

export interface Subsection {
  id: string;
  title: string;
  type: "content" | "practice-group";
  content_html: string;
  canonical_keywords: string[];
  practice_items: PracticeItem[];
  study_group?: number;
}

export interface TopicSection {
  id: string;
  title: string;
  status: "ready" | "coming_soon";
  subsections: Subsection[];
}

export const productDesignData: TopicSection[] = [
  {
    id: "selection-of-materials",
    title: "3.2.1 – Selection of Materials or Components",
    status: "ready",
    subsections: [
      {
        id: "definition",
        title: "Definition",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection definition-section">
  <p>The <strong>selection of materials or components</strong> is the process of choosing the most suitable materials or parts for a product, based on how they look, feel, perform, cost, and affect people or the planet.</p>
  <p>Designers must carefully consider both <strong>functional</strong> (how it works) and <strong>aesthetic</strong> (how it looks) requirements, as well as ethical, social, cultural, and environmental impacts.</p>
  <p>In AQA Product Design, this means knowing how to choose the best material for a specific product — for example, deciding between oak, aluminium, or polypropylene for a chair.</p>
</div>
        `,
        canonical_keywords: ["material selection","functional","aesthetic","ethical","social","cultural","environmental","product design"],
        practice_items: [
          { id:"p1", prompt_template:"Define what is meant by 'material selection' in product design.", marks:2, type:"short-answer", difficulty:"easy", randomise:false, expected_keywords:["choosing","suitable","materials","functional","aesthetic","requirements"]},
          { id:"p2", prompt_template:"Explain why designers must consider ethical factors when selecting materials.", marks:3, type:"short-answer", difficulty:"medium", randomise:false, expected_keywords:["ethical","harm","people","planet","sustainable","fair-trade"]}
        ]
      },
      {
        id: "key-influences",
        title: "Key Influences on Material Selection",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection key-fact-section">
  <h3 class="subsection-heading">✨ Functionality</h3>
  <p>How well the material performs the job it's needed for.</p>
  <ul>
    <li><strong>Timber:</strong> Oak is strong and durable for furniture</li>
    <li><strong>Metal:</strong> Aluminium is lightweight and corrosion-resistant for bikes</li>
    <li><strong>Polymer:</strong> Acrylic can be easily shaped and has a glossy surface for signs</li>
  </ul>
</div>

<div class="subsection key-fact-section">
  <h3 class="subsection-heading">🎨 Aesthetics</h3>
  <p>How the product looks, feels, and appeals to the senses (sight, touch, etc.).</p>
  <ul>
    <li><strong>Timber:</strong> Grain pattern in beech or mahogany adds beauty</li>
    <li><strong>Metal:</strong> Polished stainless steel looks modern</li>
    <li><strong>Polymer:</strong> Available in many colours and finishes</li>
  </ul>
</div>

<div class="subsection key-fact-section">
  <h3 class="subsection-heading">🌍 Environmental Factors</h3>
  <p>How the material affects the environment throughout its life (from "cradle to grave").</p>
  <ul>
    <li><strong>Timber:</strong> Renewable if FSC-certified</li>
    <li><strong>Metal:</strong> Mining causes pollution, but metals can be recycled</li>
    <li><strong>Polymer:</strong> Made from oil, so non-renewable — only eco if recycled</li>
  </ul>
</div>

<div class="subsection table-section">
  <h3 class="subsection-heading">📊 Other Key Factors</h3>
  <ul>
    <li><strong>Availability:</strong> How easy it is to get the material or component</li>
    <li><strong>Cost:</strong> Includes financial cost and environmental cost</li>
    <li><strong>Social Factors:</strong> How the choice of materials affects people and communities</li>
    <li><strong>Cultural Factors:</strong> The impact of culture, religion, and values on design</li>
    <li><strong>Ethical Factors:</strong> Choosing materials that do not harm people or the planet</li>
  </ul>
</div>
        `,
        canonical_keywords: ["functionality","aesthetics","environmental","availability","cost","social","cultural","ethical","FSC","cradle to grave"],
        practice_items: [
          { id:"p3", prompt_template:"List three key factors that influence material selection and give one example for each.", marks:6, type:"short-answer", difficulty:"medium", randomise:true, expected_keywords:["functionality","aesthetics","environmental","cost","social","example"]},
          { id:"p4", prompt_template:"Explain what is meant by 'cradle to grave' when considering environmental factors.", marks:2, type:"short-answer", difficulty:"medium", randomise:false, expected_keywords:["life cycle","sourcing","use","disposal","environmental impact"]}
        ]
      },
      {
        id: "timber-based-materials",
        title: "🪵 Timber-Based Materials",
        type: "content",
        study_group: 2,
        content_html: `
<div class="subsection key-fact-section">
  <h3 class="subsection-heading">Functional Use</h3>
  <p>Used where strength, structure, and natural appearance are important — e.g. furniture, flooring, joinery.</p>
</div>

<div class="subsection example-section">
  <h3 class="subsection-heading">Examples</h3>
  <ul>
    <li><strong>Balsa:</strong> Very light, easy to cut, weak (model-making)</li>
    <li><strong>Oak:</strong> Strong, decorative, used for furniture and floors</li>
    <li><strong>Pine:</strong> Strong softwood, grows quickly, easy to work with</li>
    <li><strong>Softwoods (e.g. pine):</strong> Cheap, quick to grow</li>
    <li><strong>Hardwoods (e.g. oak, ash, beech):</strong> Expensive, slow to grow</li>
  </ul>
</div>

<div class="subsection table-section">
  <h3 class="subsection-heading">💰 Cost and Availability</h3>
  <ul>
    <li><strong>Manufactured boards (e.g. MDF, plywood):</strong> Low cost, large sheets</li>
    <li>Environmental cost: MDF dust is hazardous; hardwood forests take longer to replace</li>
    <li>Readily available in most countries</li>
    <li>Sold as rough sawn, planed square edge (PSE), or planed all round (PAR)</li>
    <li>Manufactured boards: thickness 1–40 mm, standard sheet 2440 × 1220 mm</li>
  </ul>
</div>
        `,
        canonical_keywords: ["timber","wood","hardwood","softwood","oak","pine","balsa","MDF","plywood","manufactured boards","PSE","PAR"],
        practice_items: [
          { id:"p5", prompt_template:"Compare the properties of softwoods and hardwoods, giving one example of each.", marks:4, type:"short-answer", difficulty:"medium", randomise:false, expected_keywords:["softwood","hardwood","pine","oak","cheap","expensive","quick growing","slow growing"]},
          { id:"p6", prompt_template:"Explain why manufactured boards like MDF are commonly used in furniture production.", marks:3, type:"short-answer", difficulty:"easy", randomise:false, expected_keywords:["low cost","large sheets","stable","uniform","easy to cut"]}
        ]
      },
      {
        id: "metal-polymer-materials",
        title: "🔩 Metal and Polymer-Based Materials",
        type: "content",
        study_group: 2,
        content_html: `
<div class="subsection key-fact-section">
  <h3 class="subsection-heading">Metal-Based Materials</h3>
  <p>Metals are used when strength and durability are essential.</p>
  <ul>
    <li><strong>Low-carbon steel:</strong> Strong, easy to weld (used in car bodies)</li>
    <li><strong>Aluminium:</strong> Light and corrosion-resistant (used in bikes)</li>
    <li><strong>Gold and silver:</strong> Decorative, used in jewellery</li>
    <li><strong>Cost:</strong> Low-carbon steel is cheap; precious metals are extremely expensive</li>
    <li><strong>Environmental cost:</strong> Mining and refining use huge energy and produce harmful gases</li>
    <li>Most metals are widely available and come in many stock forms (sheet, bar, rod, tube)</li>
  </ul>
</div>

<div class="subsection key-fact-section">
  <h3 class="subsection-heading">🧴 Polymer-Based Materials</h3>
  <ul>
    <li><strong>Thermoplastics:</strong> Can be remoulded and reshaped</li>
    <li>Available in bright colours, often glossy, do not corrode</li>
    <li>Good electrical and thermal insulators</li>
    <li><strong>Cost:</strong> More expensive than wood or steel in small amounts</li>
    <li>Cheap when mass-produced (e.g. bottles, chairs)</li>
    <li><strong>Environmental cost:</strong> Oil-based, polluting, some cannot be recycled</li>
    <li>Commonly available worldwide in sheet, rod, foam, film forms</li>
  </ul>
</div>
        `,
        canonical_keywords: ["metal","polymer","steel","aluminium","gold","silver","thermoplastic","oil-based","corrosion","insulator"],
        practice_items: [
          { id:"p7", prompt_template:"Explain why aluminium is a suitable material for bicycle frames.", marks:3, type:"short-answer", difficulty:"easy", randomise:false, expected_keywords:["lightweight","corrosion-resistant","strong","durable"]},
          { id:"p8", prompt_template:"Describe the environmental impact of producing polymer-based materials.", marks:4, type:"short-answer", difficulty:"medium", randomise:false, expected_keywords:["oil-based","non-renewable","polluting","recycling","environmental cost"]}
        ]
      },
      {
        id: "key-terminology",
        title: "🧠 Key Terminology",
        type: "content",
        study_group: 3,
        content_html: `
<div class="subsection definition-section">
  <h3 class="subsection-heading">Important Terms</h3>
  <ul>
    <li><strong>FSC (Forest Stewardship Council):</strong> Organisation ensuring wood is sourced sustainably, protecting forests and wildlife</li>
    <li><strong>WEEE (Waste Electrical and Electronic Equipment):</strong> Law controlling disposal and recycling of electronics and components</li>
    <li><strong>Potatopak:</strong> A biodegradable, compostable material made from potato starch, used as an eco alternative to plastic packaging</li>
    <li><strong>Bulk Buying:</strong> Buying large quantities of material to reduce cost per unit — common in mass production</li>
  </ul>
</div>

<div class="subsection key-fact-section">
  <h3 class="subsection-heading">🌱 Environmental Responsibility</h3>
  <ul>
    <li>Designers must reduce the ecological footprint of products</li>
    <li>Materials should be renewable, recyclable, or biodegradable</li>
    <li>Life Cycle Thinking: "Cradle to grave" — consider sourcing, use, and disposal</li>
    <li>Avoid toxic adhesives and harmful coatings (especially in polymers and MDF)</li>
  </ul>
</div>

<div class="subsection key-fact-section">
  <h3 class="subsection-heading">💭 Ethical Responsibility</h3>
  <ul>
    <li>Avoid exploiting workers or using unsafe materials</li>
    <li>Prefer fair-trade, recycled, or certified sources</li>
    <li>Choose sustainable companies (e.g. FSC-certified wood)</li>
  </ul>
</div>
        `,
        canonical_keywords: ["FSC","WEEE","Potatopak","bulk buying","environmental","ethical","sustainable","biodegradable","recyclable","fair-trade"],
        practice_items: [
          { id:"p9", prompt_template:"Explain what FSC certification means and why it is important for designers.", marks:3, type:"short-answer", difficulty:"medium", randomise:false, expected_keywords:["Forest Stewardship Council","sustainable","sourcing","protecting forests","wildlife"]},
          { id:"p10", prompt_template:"Describe what is meant by 'life cycle thinking' in product design.", marks:4, type:"short-answer", difficulty:"medium", randomise:false, expected_keywords:["cradle to grave","sourcing","use","disposal","environmental impact","sustainable"]}
        ]
      }
    ]
  },
  {
    id: "forces-and-stresses",
    title: "3.2.2 – Forces and Stresses",
    status: "ready",
    subsections: [
      {
        id: "forces-definition",
        title: "Definition",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection definition-section">
  <p><strong>Forces and stresses</strong> describe the external loads and internal reactions that act on materials and structures when they are used. These forces can stretch, compress, bend, twist, or shear a material, and understanding them helps designers choose and improve materials for safe, strong, and reliable products.</p>
  <p>In AQA Product Design, this topic explains how different materials respond to forces and how they can be reinforced, stiffened, or enhanced to improve performance.</p>
</div>

<div class="subsection key-fact-section">
  <h3 class="subsection-heading">Types of Forces</h3>
  <ul>
    <li><strong>Tension:</strong> Pulling force that tries to stretch a material apart. Example: A rope in a tug-of-war, steel cables in bridges. Makes materials longer and thinner; can cause snapping.</li>
    <li><strong>Compression:</strong> Pushing or squashing force that squeezes materials together. Example: Table legs, chair legs, or a brick wall. Makes materials shorter and thicker; can cause buckling or crushing.</li>
    <li><strong>Bending:</strong> A combination of compression and tension caused by a force acting at an angle. Example: A shelf bending under heavy books. The top side is in compression, bottom side in tension.</li>
    <li><strong>Shear:</strong> Forces act across a material in opposite directions but close together. Example: Scissors cutting paper, garden shears, rivets. Causes materials to slide and split along a plane.</li>
    <li><strong>Torsion:</strong> Twisting force that acts around an axis. Example: Bottle lid being opened, car drive shafts turning. Can cause spiralling stress or material failure under rotation.</li>
  </ul>
</div>
        `,
        canonical_keywords: ["forces","stresses","tension","compression","bending","shear","torsion","materials","loads"],
        practice_items: [
          { id:"p1", prompt_template:"Define what is meant by a 'compressive force' and give one example of where it occurs.", marks:3, type:"short-answer", difficulty:"easy", randomise:false, expected_keywords:["pushing","squashing","compression","table leg","chair leg","wall"]},
          { id:"p2", prompt_template:"Explain the difference between tension and compression forces.", marks:4, type:"short-answer", difficulty:"medium", randomise:false, expected_keywords:["tension","pulling","stretching","compression","pushing","squashing","opposite"]}
        ]
      },
      {
        id: "static-dynamic-loads",
        title: "Static and Dynamic Loads",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection definition-section">
  <h3 class="subsection-heading">Static Load</h3>
  <p>A constant, downward force that doesn't move. Example: A person standing still holding a box.</p>
</div>

<div class="subsection definition-section">
  <h3 class="subsection-heading">Dynamic Load</h3>
  <p>A moving or changing force that can act in multiple directions. Example: A person walking while holding the same box, or wind acting on a bridge.</p>
</div>

<div class="subsection exam-tip-section">
  <h3 class="subsection-heading">💬 Why This Matters</h3>
  <p>Designers must ensure materials and structures can withstand both static and dynamic loads without failure. For example, a bridge experiences constant static load (its own weight) and dynamic loads (vehicles moving across it).</p>
</div>
        `,
        canonical_keywords: ["static load","dynamic load","constant force","moving force","bridge","design"],
        practice_items: [
          { id:"p3", prompt_template:"Explain the difference between static and dynamic loads, giving one example of each.", marks:4, type:"short-answer", difficulty:"medium", randomise:false, expected_keywords:["static","constant","dynamic","moving","changing","example"]}
        ]
      },
      {
        id: "enhancing-materials",
        title: "Enhancing Materials",
        type: "content",
        study_group: 2,
        content_html: `
<div class="subsection definition-section">
  <p>Materials can be modified or reinforced to resist forces and stresses more effectively. These processes improve strength, stiffness, and flexibility depending on what's needed.</p>
</div>

<div class="subsection example-section">
  <h3 class="subsection-heading">🪢 Rope</h3>
  <p>Twisting multiple strands of natural or synthetic fibres (cotton, nylon, polypropylene) increases tensile strength — used in climbing ropes and suspension bridges.</p>
</div>

<div class="subsection example-section">
  <h3 class="subsection-heading">🏗️ Concrete</h3>
  <p>Adding steel rods (rebar) before it sets to make reinforced concrete improves tensile strength while keeping excellent compressive strength — used in bridges and skyscrapers.</p>
</div>

<div class="subsection example-section">
  <h3 class="subsection-heading">🪵 Timber</h3>
  <p>Lamination – gluing thin layers (plies) of wood with grains in different directions improves stiffness and bending resistance — used in curved furniture, beams, and skateboards.</p>
</div>

<div class="subsection example-section">
  <h3 class="subsection-heading">🧵 Fabric</h3>
  <p>Weaving / Webbing – combining fibres for strength; interfacing adds stiffness. Increases tensile strength (e.g. seat belts, shirt collars, upholstery).</p>
</div>

<div class="subsection example-section">
  <h3 class="subsection-heading">🔬 Polymers</h3>
  <p>Fibre reinforcement – adding carbon or glass fibres to resin (CFRP or GRP) greatly increases strength-to-weight ratio; used in sports cars, aircraft, helmets.</p>
</div>

<div class="subsection key-fact-section">
  <h3 class="subsection-heading">📐 Shape Design</h3>
  <p>Using structural forms such as I-beams, T-beams, and box sections increases load-bearing ability without adding extra material.</p>
</div>
        `,
        canonical_keywords: ["enhancing","reinforcement","rope","concrete","rebar","timber","lamination","fabric","weaving","polymers","CFRP","GRP","I-beam"],
        practice_items: [
          { id:"p4", prompt_template:"Explain how reinforced concrete is made and why it is stronger than plain concrete.", marks:4, type:"short-answer", difficulty:"medium", randomise:false, expected_keywords:["steel rods","rebar","tensile strength","compressive strength","reinforced"]},
          { id:"p5", prompt_template:"Describe how lamination improves the properties of timber.", marks:3, type:"short-answer", difficulty:"medium", randomise:false, expected_keywords:["lamination","layers","plies","grains","different directions","stiffness","bending"]}
        ]
      },
      {
        id: "material-applications",
        title: "Material Applications",
        type: "content",
        study_group: 2,
        content_html: `
<div class="subsection example-section">
  <h3 class="subsection-heading">📋 Real-World Examples</h3>
  <ul>
    <li><strong>Steel bridge cables (tension):</strong> Must resist stretching under enormous weight</li>
    <li><strong>Brick wall (compression):</strong> Supports the weight of the building above</li>
    <li><strong>Wooden shelf (bending):</strong> Must support books without sagging or breaking</li>
    <li><strong>Scissors blades (shear):</strong> Cut through paper by applying opposite forces</li>
    <li><strong>Car drive shaft (torsion):</strong> Twists to transfer power from engine to wheels</li>
  </ul>
</div>

<div class="subsection exam-tip-section">
  <h3 class="subsection-heading">💡 Exam Tip</h3>
  <p>When answering questions about forces, always:</p>
  <ul>
    <li>Name the type of force</li>
    <li>Give a real example</li>
    <li>Explain what happens to the material</li>
    <li>State how designers can prevent failure</li>
  </ul>
</div>
        `,
        canonical_keywords: ["applications","bridge","cables","tension","compression","bending","shear","torsion","examples"],
        practice_items: [
          { id:"p6", prompt_template:"Explain why steel cables are used in suspension bridges and what type of force they experience.", marks:4, type:"short-answer", difficulty:"medium", randomise:false, expected_keywords:["tension","pulling","stretching","strong","high tensile strength","steel"]},
          { id:"p7", prompt_template:"Describe one way designers can prevent bending failure in wooden shelves.", marks:3, type:"short-answer", difficulty:"easy", randomise:false, expected_keywords:["bracket","support","thicker","lamination","reinforcement"]}
        ]
      }
    ]
  },
  {
    id: "sources-and-origins",
    title: "3.2.3 - 3.2.5 – Sources and Origins",
    status: "coming_soon",
    subsections: []
  },
  {
    id: "properties-and-forming",
    title: "3.2.6 – Properties of Materials & How to Shape and Form Them",
    status: "coming_soon",
    subsections: []
  },
  {
    id: "stock-forms",
    title: "2.6 – Stock Forms, Types and Sizes",
    status: "coming_soon",
    subsections: []
  },
  {
    id: "scales-of-production",
    title: "2.7 – Scales of Production",
    status: "coming_soon",
    subsections: []
  },
  {
    id: "specialist-techniques",
    title: "2.8 – Specialist Techniques and Processes",
    status: "coming_soon",
    subsections: []
  },
  {
    id: "surface-treatments",
    title: "2.9 – Surface Treatments and Finishes",
    status: "coming_soon",
    subsections: []
  }
];
