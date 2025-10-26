// GCSE AQA Product Design - Chapter 2: Specialist Technical Principles
// Only this chapter is populated

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
<div class="subsection">
  <p>The selection of materials or components is the process of choosing the most suitable materials or parts for a product, based on how they look, feel, perform, cost, and affect people or the planet.</p>
  <p>Designers must carefully consider both functional (how it works) and aesthetic (how it looks) requirements, as well as ethical, social, cultural, and environmental impacts.</p>
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
<div class="subsection">
  <h3 class="subsection-heading">Functionality</h3>
  <p>How well the material performs the job it's needed for.</p>
  <ul>
    <li><strong>Timber:</strong> Oak is strong and durable for furniture</li>
    <li><strong>Metal:</strong> Aluminium is lightweight and corrosion-resistant for bikes</li>
    <li><strong>Polymer:</strong> Acrylic can be easily shaped and has a glossy surface for signs</li>
  </ul>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Aesthetics</h3>
  <p>How the product looks, feels, and appeals to the senses (sight, touch, etc.).</p>
  <ul>
    <li><strong>Timber:</strong> Grain pattern in beech or mahogany adds beauty</li>
    <li><strong>Metal:</strong> Polished stainless steel looks modern</li>
    <li><strong>Polymer:</strong> Available in many colours and finishes</li>
  </ul>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Environmental Factors</h3>
  <p>How the material affects the environment throughout its life (from "cradle to grave").</p>
  <ul>
    <li><strong>Timber:</strong> Renewable if FSC-certified</li>
    <li><strong>Metal:</strong> Mining causes pollution, but metals can be recycled</li>
    <li><strong>Polymer:</strong> Made from oil, so non-renewable — only eco if recycled</li>
  </ul>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Availability, Cost, and Social Factors</h3>
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
        title: "Timber-Based Materials",
        type: "content",
        study_group: 2,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Functional Use</h3>
  <p>Used where strength, structure, and natural appearance are important — e.g. furniture, flooring, joinery.</p>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Examples</h3>
  <ul>
    <li><strong>Balsa:</strong> Very light, easy to cut, weak (model-making)</li>
    <li><strong>Oak:</strong> Strong, decorative, used for furniture and floors</li>
    <li><strong>Pine:</strong> Strong softwood, grows quickly, easy to work with</li>
    <li><strong>Softwoods (e.g. pine):</strong> Cheap, quick to grow</li>
    <li><strong>Hardwoods (e.g. oak, ash, beech):</strong> Expensive, slow to grow</li>
  </ul>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Cost and Availability</h3>
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
        title: "Metal and Polymer-Based Materials",
        type: "content",
        study_group: 2,
        content_html: `
<div class="subsection">
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
<div class="subsection">
  <h3 class="subsection-heading">Polymer-Based Materials</h3>
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
        title: "Key Terminology",
        type: "content",
        study_group: 3,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Important Terms</h3>
  <ul>
    <li><strong>FSC (Forest Stewardship Council):</strong> Organisation ensuring wood is sourced sustainably, protecting forests and wildlife</li>
    <li><strong>WEEE (Waste Electrical and Electronic Equipment):</strong> Law controlling disposal and recycling of electronics and components</li>
    <li><strong>Potatopak:</strong> A biodegradable, compostable material made from potato starch, used as an eco alternative to plastic packaging</li>
    <li><strong>Bulk Buying:</strong> Buying large quantities of material to reduce cost per unit — common in mass production</li>
  </ul>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Environmental and Ethical Responsibility</h3>
  <p><strong>Environmental Responsibility:</strong></p>
  <ul>
    <li>Designers must reduce the ecological footprint of products</li>
    <li>Materials should be renewable, recyclable, or biodegradable</li>
    <li>Life Cycle Thinking: "Cradle to grave" — consider sourcing, use, and disposal</li>
    <li>Avoid toxic adhesives and harmful coatings (especially in polymers and MDF)</li>
  </ul>
  <p><strong>Ethical Responsibility:</strong></p>
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
        title: "Definition and Types of Forces",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Definition</h3>
  <p>Forces and stresses describe the external loads and internal reactions that act on materials and structures when they are used. These forces can stretch, compress, bend, twist, or shear a material, and understanding them helps designers choose and improve materials for safe, strong, and reliable products.</p>
</div>
<div class="subsection">
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
<div class="subsection">
  <h3 class="subsection-heading">Static Load</h3>
  <p>A constant, downward force that doesn't move. Example: A person standing still holding a box.</p>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Dynamic Load</h3>
  <p>A moving or changing force that can act in multiple directions. Example: A person walking while holding the same box, or wind acting on a bridge.</p>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Why This Matters</h3>
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
<div class="subsection">
  <p>Materials can be modified or reinforced to resist forces and stresses more effectively. These processes improve strength, stiffness, and flexibility depending on what's needed.</p>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Rope</h3>
  <p>Twisting multiple strands of natural or synthetic fibres (cotton, nylon, polypropylene) increases tensile strength — used in climbing ropes and suspension bridges.</p>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Concrete</h3>
  <p>Adding steel rods (rebar) before it sets to make reinforced concrete improves tensile strength while keeping excellent compressive strength — used in bridges and skyscrapers.</p>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Timber</h3>
  <p>Lamination – gluing thin layers (plies) of wood with grains in different directions improves stiffness and bending resistance — used in curved furniture, beams, and skateboards.</p>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Fabric</h3>
  <p>Weaving / Webbing – combining fibres for strength; interfacing adds stiffness. Increases tensile strength (e.g. seat belts, shirt collars, upholstery).</p>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Polymers</h3>
  <p>Fibre reinforcement – adding carbon or glass fibres to resin (CFRP or GRP) greatly increases strength-to-weight ratio; used in sports cars, aircraft, helmets.</p>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Shape Design</h3>
  <p>Using structural forms such as I-beams, T-beams, and box sections increases load-bearing ability without adding extra material.</p>
</div>
        `,
        canonical_keywords: ["enhancing","reinforcement","rope","concrete","rebar","timber","lamination","fabric","weaving","polymers","CFRP","GRP","I-beam"],
        practice_items: [
          { id:"p4", prompt_template:"Explain how reinforced concrete is made and why it is stronger than plain concrete.", marks:4, type:"short-answer", difficulty:"medium", randomise:false, expected_keywords:["steel rods","rebar","tensile strength","compressive strength","reinforced"]},
          { id:"p5", prompt_template:"Describe the process of lamination in timber and explain its benefits.", marks:4, type:"short-answer", difficulty:"medium", randomise:false, expected_keywords:["lamination","thin layers","plies","grain directions","stiffness","bending resistance"]}
        ]
      },
      {
        id: "material-examples",
        title: "Examples and Applications",
        type: "content",
        study_group: 2,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Timber-Based Materials</h3>
  <ul>
    <li><strong>Laminated timber:</strong> Thin layers glued to make stronger beams. Used in furniture, bridges, and building structures</li>
    <li><strong>Plywood:</strong> Alternating grain directions resist bending and warping</li>
    <li><strong>Glulam beams:</strong> Large, laminated structural beams that combine high strength with flexibility</li>
  </ul>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Metal-Based Materials</h3>
  <ul>
    <li><strong>Steel reinforcement in concrete:</strong> Improves tensile strength</li>
    <li><strong>I-beams:</strong> Used in construction to resist bending forces</li>
    <li><strong>Aluminium alloys:</strong> Lightweight but strong; resist torsion in aircraft bodies and car frames</li>
  </ul>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Polymer-Based Materials</h3>
  <ul>
    <li><strong>Glass Reinforced Plastic (GRP):</strong> Glass fibres embedded in resin; used for boat hulls and car panels</li>
    <li><strong>Carbon Fibre Reinforced Polymer (CFRP):</strong> Carbon fibres in epoxy resin; extremely strong and lightweight (e.g. bicycles, aircraft)</li>
    <li><strong>Corrugated plastic:</strong> Strong under compression, used in lightweight packaging</li>
  </ul>
</div>
        `,
        canonical_keywords: ["laminated timber","plywood","glulam","steel reinforcement","I-beam","aluminium alloy","GRP","CFRP","corrugated"],
        practice_items: [
          { id:"p6", prompt_template:"Explain why CFRP (Carbon Fibre Reinforced Polymer) is used in high-performance bicycles.", marks:3, type:"short-answer", difficulty:"medium", randomise:false, expected_keywords:["carbon fibre","strong","lightweight","strength-to-weight ratio","epoxy resin"]},
          { id:"p7", prompt_template:"Describe how an I-beam's shape helps it resist bending forces.", marks:3, type:"short-answer", difficulty:"medium", randomise:false, expected_keywords:["I-beam","shape","flanges","bending","resist","structural"]}
        ]
      },
      {
        id: "key-terminology-forces",
        title: "Key Terminology",
        type: "content",
        study_group: 3,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Material Properties</h3>
  <ul>
    <li><strong>Tensile Strength:</strong> The ability of a material to resist being pulled apart (tension)</li>
    <li><strong>Compressive Strength:</strong> The ability to resist being squashed or compressed</li>
    <li><strong>Elasticity:</strong> The ability of a material to return to its original shape after being deformed</li>
    <li><strong>Plasticity:</strong> The ability to permanently deform without breaking</li>
    <li><strong>Ductility:</strong> The ability to be stretched or drawn into wires</li>
    <li><strong>Malleability:</strong> The ability to be hammered or rolled into sheets</li>
    <li><strong>Rigidity:</strong> The stiffness of a material; resistance to bending</li>
  </ul>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Why Designers Must Understand Forces</h3>
  <ol>
    <li>Prevent product failure (e.g. a shelf collapsing due to bending)</li>
    <li>Ensure safety in use (e.g. chair legs not snapping)</li>
    <li>Choose the most efficient material and shape for the job</li>
    <li>Reduce waste and cost by avoiding over-engineering</li>
    <li>Improve product lifespan through reinforcement or correct material selection</li>
  </ol>
</div>
        `,
        canonical_keywords: ["tensile strength","compressive strength","elasticity","plasticity","ductility","malleability","rigidity","stiffness"],
        practice_items: [
          { id:"p8", prompt_template:"Define what is meant by 'ductility' and give one example of a ductile material.", marks:2, type:"short-answer", difficulty:"easy", randomise:false, expected_keywords:["ductility","stretched","drawn","wires","copper"]},
          { id:"p9", prompt_template:"Explain why designers must understand forces and stresses when designing products.", marks:4, type:"short-answer", difficulty:"medium", randomise:false, expected_keywords:["prevent failure","safety","efficient","reduce waste","improve lifespan"]}
        ]
      }
    ]
  },
  {
    id: "sources-and-origins",
    title: "3.2.4 – Sources and Origins",
    status: "ready",
    subsections: [
      {
        id: "overview",
        title: "Overview: What Does Sources and Origins Mean?",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Definition</h3>
  <p>Every product we design begins with raw materials — natural resources that must be extracted or grown before being converted into a usable form. These raw materials come from one of five main categories:</p>
  <ul>
    <li>Timber-based (trees)</li>
    <li>Metal-based (ores)</li>
    <li>Polymer-based (crude oil)</li>
    <li>Textile-based (plants, animals, chemicals)</li>
    <li>Paper and board-based (wood pulp or grasses)</li>
  </ul>
  <p>Before they can be manufactured, these raw materials must go through a conversion process such as smelting, refining, pulping, polymerisation, or spinning.</p>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Why This Matters</h3>
  <p>Designers need to understand the origin, availability, and processing of materials so they can:</p>
  <ul>
    <li>Choose suitable materials for a product's function</li>
    <li>Consider environmental and ethical impacts</li>
    <li>Make sustainable decisions about finite vs renewable resources</li>
  </ul>
</div>
        `,
        canonical_keywords: ["sources","origins","raw materials","timber","metal","polymer","textile","paper","conversion process"],
        practice_items: [
          { id:"p1", prompt_template:"List the five main categories of raw materials and give one example for each.", marks:5, type:"short-answer", difficulty:"easy", randomise:false, expected_keywords:["timber","metal","polymer","textile","paper","trees","ores","oil","plants","animals"]},
          { id:"p2", prompt_template:"Explain why designers need to understand the origins of materials.", marks:3, type:"short-answer", difficulty:"medium", randomise:false, expected_keywords:["suitable","function","environmental","ethical","sustainable","finite","renewable"]}
        ]
      },
      {
        id: "timber-sources",
        title: "Timber-Based Materials: Source and Conversion",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Source of Timber</h3>
  <p>Timber comes from trees grown in managed forests or plantations. There are two main types of natural wood:</p>
  <ul>
    <li><strong>Hardwood:</strong> Deciduous (lose leaves annually, slow-growing). Examples: Oak, Beech, Mahogany. Properties: Dense, strong, decorative grain, expensive</li>
    <li><strong>Softwood:</strong> Coniferous (evergreen, fast-growing). Examples: Pine, Spruce, Cedar. Properties: Lightweight, cheaper, easy to cut, sustainable</li>
    <li><strong>Manufactured Board:</strong> Man-made (from waste wood and resin). Examples: MDF, Plywood, Chipboard. Properties: Stable, large sheets, smooth finish</li>
  </ul>
  <p><strong>Environmental note:</strong> Softwoods grow faster and are often used in construction because they are renewable within 30–40 years. Hardwoods take up to 100 years to mature, so they must be FSC-certified to ensure forests are replanted and biodiversity is protected.</p>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Conversion of Timber</h3>
  <p>Once felled, logs are taken to sawmills for conversion into usable planks or boards.</p>
  <ul>
    <li><strong>Through and Through (Plain Sawn):</strong> Boards are cut straight across the log. ✅ Cheaper, quick, little waste. ❌ More likely to warp or twist</li>
    <li><strong>Quarter Sawn:</strong> Log cut into quarters and then across the grain. ✅ Stronger, more decorative pattern, less shrinkage. ❌ Expensive and more wasteful</li>
    <li><strong>Tangential Cut:</strong> Tangential to the growth rings</li>
  </ul>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Seasoning of Timber</h3>
  <p>Freshly felled timber contains around 50% water. If used immediately, it will shrink, crack, or twist. Seasoning removes this water to stabilise the timber.</p>
  <ul>
    <li><strong>Air Seasoning:</strong> Wood stacked under cover, air circulates between boards for months or years. ✅ Cheap, eco-friendly, suitable for outdoor use. ❌ Slow, not always fully dry, affected by weather</li>
    <li><strong>Kiln Seasoning:</strong> Wood placed in a large heated chamber with fans and humidity control. ✅ Quick, produces very dry and stable timber. ❌ Uses lots of energy, higher cost</li>
  </ul>
  <p>✅ Seasoned timber is lighter, stronger, less likely to warp, and accepts paints and finishes evenly.</p>
</div>
        `,
        canonical_keywords: ["timber","hardwood","softwood","manufactured board","FSC","conversion","seasoning","air seasoning","kiln seasoning","plywood","MDF"],
        practice_items: [
          { id:"p3", prompt_template:"Compare hardwood and softwood timber, giving examples of each.", marks:4, type:"short-answer", difficulty:"medium", randomise:false, expected_keywords:["hardwood","softwood","deciduous","coniferous","oak","pine","slow-growing","fast-growing"]},
          { id:"p4", prompt_template:"Explain the process of kiln seasoning and why it is used.", marks:4, type:"short-answer", difficulty:"medium", randomise:false, expected_keywords:["kiln","heated chamber","dry","stable","quick","energy"]}
        ]
      },
      {
        id: "metal-sources",
        title: "Metal-Based Materials: Source and Conversion",
        type: "content",
        study_group: 2,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Source of Metals (Ores)</h3>
  <p>Metals are extracted from ores, naturally occurring rocks containing metal compounds. The process of mining and refining transforms ore into usable metal.</p>
  <ul>
    <li><strong>Iron:</strong> Ore name: Haematite. Key locations: China, Brazil, Australia. Used to make steel</li>
    <li><strong>Aluminium:</strong> Ore name: Bauxite. Key locations: Australia, Guinea. Lightweight, corrosion-resistant</li>
    <li><strong>Copper:</strong> Ore name: Chalcopyrite. Key locations: Chile, Peru. Good conductor of heat/electricity</li>
  </ul>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Mining Processes</h3>
  <ul>
    <li><strong>Surface (open-cast) mining:</strong> Removes large sections of land, causing deforestation and soil loss</li>
    <li><strong>Underground mining:</strong> Tunnels dug deep into the Earth, high risk, costly, and disruptive</li>
  </ul>
  <p><strong>Environmental effects:</strong> Mining uses massive energy and creates toxic waste. Designers should consider recycled metals whenever possible — recycling aluminium saves 95% energy compared to extracting new material.</p>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Iron Extraction – The Blast Furnace</h3>
  <p><strong>Inputs:</strong> Haematite (iron ore), coke (carbon), limestone</p>
  <p><strong>Process:</strong> Heated to ~1,700°C in a tall furnace. Coke burns to make carbon monoxide gas. The gas reduces haematite to molten iron. Limestone removes impurities (forms slag).</p>
  <p><strong>Outputs:</strong> Pig iron → refined into steel in a Basic Oxygen Furnace (BOF)</p>
  <p><strong>Environmental impact:</strong> Uses fossil fuels, emits CO₂, and operates continuously to save energy once heated</p>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Aluminium Extraction – Electrolysis</h3>
  <p><strong>Ore:</strong> Bauxite, processed into alumina (Al₂O₃)</p>
  <p><strong>Process:</strong></p>
  <ol>
    <li>Alumina dissolved in molten cryolite</li>
    <li>Electric current passed between carbon electrodes</li>
    <li>Aluminium collects at the bottom; oxygen released at the top</li>
  </ol>
  <p><strong>Result:</strong> Pure aluminium metal</p>
  <p>💡 Requires massive electricity → factories are often near hydroelectric power stations for sustainability</p>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Refining and Alloying</h3>
  <p>Pure metals are rarely used — they are often too soft. Alloying (adding another element) improves properties.</p>
  <ul>
    <li><strong>Iron + Carbon:</strong> Steel (strong and tough)</li>
    <li><strong>Copper + Tin:</strong> Bronze (hard, corrosion-resistant)</li>
    <li><strong>Copper + Zinc:</strong> Brass (attractive, easy to cast)</li>
    <li><strong>Aluminium + Copper + Manganese:</strong> Duralumin (strong, light)</li>
  </ul>
</div>
        `,
        canonical_keywords: ["metal","ore","mining","iron","haematite","aluminium","bauxite","copper","blast furnace","electrolysis","alloying","steel","bronze","brass"],
        practice_items: [
          { id:"p5", prompt_template:"Describe the process of extracting iron from haematite ore in a blast furnace.", marks:6, type:"short-answer", difficulty:"hard", randomise:false, expected_keywords:["haematite","coke","limestone","heated","carbon monoxide","molten iron","slag"]},
          { id:"p6", prompt_template:"Explain why aluminium recycling is more environmentally friendly than extracting new aluminium.", marks:3, type:"short-answer", difficulty:"medium", randomise:false, expected_keywords:["recycling","saves energy","95%","environmental","extraction"]}
        ]
      },
      {
        id: "polymer-sources",
        title: "Polymers: Crude Oil to Plastic",
        type: "content",
        study_group: 2,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Source of Polymers</h3>
  <p>Most plastics are synthetic polymers made from crude oil, a finite fossil fuel found deep underground. Oil is located in countries like Saudi Arabia, Venezuela, Russia, and the USA.</p>
  <p><strong>Extraction process:</strong></p>
  <ol>
    <li>Seismic surveys locate underground oil</li>
    <li>Oil wells are drilled; crude oil pumped to the surface</li>
    <li>Oil is transported via pipelines and tankers to refineries</li>
  </ol>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Fractional Distillation of Crude Oil</h3>
  <p>Crude oil is a mix of hydrocarbons of different molecular sizes. It must be separated in a distillation tower:</p>
  <ul>
    <li><strong>Bottom (~370°C):</strong> Bitumen, heavy oil</li>
    <li><strong>Middle (250–300°C):</strong> Diesel, kerosene</li>
    <li><strong>Top (20–100°C):</strong> Petrol, LPG, Naphtha</li>
  </ul>
  <p>🧪 The naphtha fraction is the key part used for plastic production.</p>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Cracking and Polymerisation</h3>
  <p><strong>Cracking:</strong> Heats naphtha to break large hydrocarbons into smaller ones (e.g. ethylene, propylene). These small molecules are called monomers.</p>
  <p><strong>Polymerisation:</strong> Monomers chemically bond into long molecular chains called polymers.</p>
  <p><strong>Example:</strong></p>
  <ul>
    <li>Ethylene → Polyethylene (PE)</li>
    <li>Propylene → Polypropylene (PP)</li>
  </ul>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Thermoplastics vs Thermosets</h3>
  <ul>
    <li><strong>Thermoplastics:</strong> Linear, weak bonds between chains. Soften when heated, can be reshaped and recycled. Examples: Acrylic, PVC, Polypropylene</li>
    <li><strong>Thermosets:</strong> Cross-linked 3D molecular structure. Heat-resistant, rigid, cannot be reshaped. Examples: Epoxy resin, Melamine, Bakelite</li>
  </ul>
  <p><strong>Environmental Note:</strong> Polymers rely on non-renewable resources, but recycling and bioplastics (e.g. Potatopak) can reduce the ecological footprint.</p>
</div>
        `,
        canonical_keywords: ["polymer","crude oil","fractional distillation","cracking","polymerisation","monomers","thermoplastic","thermoset","naphtha","ethylene"],
        practice_items: [
          { id:"p7", prompt_template:"Explain the process of fractional distillation of crude oil.", marks:4, type:"short-answer", difficulty:"medium", randomise:false, expected_keywords:["crude oil","distillation tower","hydrocarbons","separated","temperature","fractions"]},
          { id:"p8", prompt_template:"Compare thermoplastics and thermosets, giving one example of each.", marks:4, type:"short-answer", difficulty:"medium", randomise:false, expected_keywords:["thermoplastic","thermoset","reshaped","recycled","rigid","acrylic","epoxy"]}
        ]
      },
      {
        id: "textile-paper-sources",
        title: "Textile and Paper-Based Materials",
        type: "content",
        study_group: 3,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Natural Fibres</h3>
  <p>Derived from plants or animals, these are renewable but require processing.</p>
  <ul>
    <li><strong>Cotton:</strong> Source: Seed bolls from cotton plant. Process: Harvested → Cleaned → Combed → Twisted → Yarn. Properties: Soft, breathable, strong, absorbent</li>
    <li><strong>Wool:</strong> Source: Fleece of sheep or goats. Process: Sheared → Cleaned → Carded → Spun. Properties: Warm, elastic, good insulator</li>
    <li><strong>Silk:</strong> Source: Cocoon of silk moth. Process: Boiled → Unwound → Reeled. Properties: Smooth, shiny, luxurious</li>
    <li><strong>Linen:</strong> Source: Flax plant stems. Process: Soaked → Beaten → Spun. Properties: Crisp, cool, hard-wearing</li>
  </ul>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Synthetic Fibres</h3>
  <p>Made from oil- or coal-based chemicals through polymerisation.</p>
  <ul>
    <li><strong>Polyester:</strong> Made from oil-derived monomers. Process: Melted → Spun into filaments. Properties: Strong, crease-resistant, dries quickly</li>
    <li><strong>Nylon:</strong> Made from oil or coal. Process: Extruded and polymerised. Properties: Strong, elastic, used in ropes, parachutes</li>
    <li><strong>Acrylic:</strong> Made from acrylonitrile. Process: Melt-spun and cut. Properties: Soft, wool-like, cheap</li>
  </ul>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Spinning Process (Yarn Production)</h3>
  <ol>
    <li>Staple fibres (short, like cotton/wool) → cleaned, straightened (carded), twisted to form yarn</li>
    <li>Filament fibres (continuous, like silk/polyester) → lightly twisted for strength</li>
    <li>Tight twist = smooth, strong yarn. Loose twist = soft, warm yarn (traps air)</li>
  </ol>
  <p>Yarn then woven, knitted, or bonded into fabrics.</p>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Paper and Board</h3>
  <p><strong>Source:</strong> Wood pulp from softwood trees (pine, spruce) or recycled paper</p>
  <p><strong>Pulping:</strong> Wood chips are broken down chemically or mechanically into fibres. Fibres mixed with water to form a slurry</p>
  <p><strong>Paper Making:</strong> Slurry spread on a wire mesh screen. Water drains away, leaving a mat of fibres. Pressed and dried to form paper sheets</p>
  <p><strong>Board:</strong> Multiple layers of paper pressed together to create thicker, more rigid material</p>
</div>
        `,
        canonical_keywords: ["textile","natural fibres","synthetic fibres","cotton","wool","silk","linen","polyester","nylon","acrylic","spinning","paper","board","pulping"],
        practice_items: [
          { id:"p9", prompt_template:"Compare natural and synthetic fibres, giving one example of each.", marks:4, type:"short-answer", difficulty:"medium", randomise:false, expected_keywords:["natural","synthetic","cotton","polyester","renewable","oil-based","properties"]},
          { id:"p10", prompt_template:"Describe the process of making paper from wood pulp.", marks:4, type:"short-answer", difficulty:"medium", randomise:false, expected_keywords:["wood chips","pulping","fibres","slurry","mesh","dried","sheets"]}
        ]
      }
    ]
  }
];
