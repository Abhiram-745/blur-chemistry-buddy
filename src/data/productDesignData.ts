// GCSE AQA Product Design - Complete with all subsections and color coding

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
        title: "Subsection 1 – Definition",
        type: "content",
        study_group: 1,
        content_html: `
<div class="definition-block">
  <h4>📘 Definition</h4>
  <p>The <strong>selection of materials or components</strong> is the process of choosing the most suitable materials or parts for a product, based on how they look, feel, perform, cost, and affect people or the planet.</p>
  <p>Designers must carefully consider both <strong>functional</strong> (how it works) and <strong>aesthetic</strong> (how it looks) requirements, as well as ethical, social, cultural, and environmental impacts.</p>
  <p>In AQA Product Design, this means knowing how to choose the best material for a specific product — for example, deciding between oak, aluminium, or polypropylene for a chair.</p>
</div>
        `,
        canonical_keywords: ["material selection","functional","aesthetic","ethical"],
        practice_items: []
      },
      {
        id: "key-influences",
        title: "Subsection 2 – Key Influences on Material Selection",
        type: "content",
        study_group: 1,
        content_html: `
<div class="key-facts-block">
  <h4>✨ Functionality</h4>
  <p>How well the material performs the job it's needed for.</p>
  <ul>
    <li><strong>Timber:</strong> Oak is strong and durable for furniture</li>
    <li><strong>Metal:</strong> Aluminium is lightweight and corrosion-resistant for bikes</li>
    <li><strong>Polymer:</strong> Acrylic can be easily shaped and has a glossy surface for signs</li>
  </ul>
</div>

<div class="key-facts-block">
  <h4>🎨 Aesthetics</h4>
  <p>How the product looks, feels, and appeals to the senses.</p>
  <ul>
    <li><strong>Timber:</strong> Grain pattern in beech or mahogany adds beauty</li>
    <li><strong>Metal:</strong> Polished stainless steel looks modern</li>
    <li><strong>Polymer:</strong> Available in many colours and finishes</li>
  </ul>
</div>

<div class="key-facts-block">
  <h4>🌍 Environmental Factors</h4>
  <p>How the material affects the environment throughout its life (from "cradle to grave").</p>
  <ul>
    <li><strong>Timber:</strong> Renewable if FSC-certified</li>
    <li><strong>Metal:</strong> Mining causes pollution, but metals can be recycled</li>
    <li><strong>Polymer:</strong> Made from oil, so non-renewable — only eco if recycled</li>
  </ul>
</div>
        `,
        canonical_keywords: ["functionality","aesthetics","environmental","FSC"],
        practice_items: []
      },
      {
        id: "examples-timber-metal-polymer",
        title: "🪵 Subsection 3 – Examples and Applications (Materials)",
        type: "content",
        study_group: 2,
        content_html: `
<div class="example-block">
  <h4>🪚 Timber-Based Materials</h4>
  <ul>
    <li><strong>Balsa:</strong> Very light, easy to cut, weak (model-making)</li>
    <li><strong>Oak:</strong> Strong, decorative, used for furniture and floors</li>
    <li><strong>Pine:</strong> Strong softwood, grows quickly, easy to work with</li>
    <li><strong>MDF, plywood:</strong> Low cost, large sheets, stable</li>
  </ul>
</div>

<div class="example-block">
  <h4>🔩 Metal-Based Materials</h4>
  <ul>
    <li><strong>Low-carbon steel:</strong> Strong, easy to weld (car bodies)</li>
    <li><strong>Aluminium:</strong> Light and corrosion-resistant (bikes)</li>
    <li><strong>Gold and silver:</strong> Decorative, used in jewellery</li>
  </ul>
</div>

<div class="example-block">
  <h4>🧴 Polymer-Based Materials</h4>
  <ul>
    <li><strong>Thermoplastics:</strong> Can be remoulded and reshaped</li>
    <li>Available in bright colours, glossy finish</li>
    <li>Good insulators; cheap when mass-produced</li>
  </ul>
</div>
        `,
        canonical_keywords: ["timber","metal","polymer","materials"],
        practice_items: []
      },
      {
        id: "key-terminology",
        title: "🧠 Subsection 4 – Key Terminology",
        type: "content",
        study_group: 2,
        content_html: `
<div class="definition-block">
  <h4>Important Terms</h4>
  <ul>
    <li><strong>FSC:</strong> Forest Stewardship Council - ensures wood is sourced sustainably</li>
    <li><strong>WEEE:</strong> Waste Electrical and Electronic Equipment regulations</li>
    <li><strong>Potatopak:</strong> Biodegradable material made from potato starch</li>
    <li><strong>Bulk Buying:</strong> Buying large quantities to reduce cost per unit</li>
  </ul>
</div>
        `,
        canonical_keywords: ["FSC","WEEE","Potatopak","terminology"],
        practice_items: []
      },
      {
        id: "environmental-ethical",
        title: "🧩 Subsection 5 – Environmental and Ethical Overview",
        type: "content",
        study_group: 3,
        content_html: `
<div class="key-facts-block">
  <h4>🌱 Environmental Responsibility</h4>
  <ul>
    <li>Reduce ecological footprint</li>
    <li>Use renewable, recyclable, or biodegradable materials</li>
    <li>Life Cycle Thinking: "Cradle to grave"</li>
    <li>Avoid toxic adhesives and harmful coatings</li>
  </ul>
</div>

<div class="key-facts-block">
  <h4>💭 Ethical Responsibility</h4>
  <ul>
    <li>Avoid exploiting workers</li>
    <li>Prefer fair-trade, recycled, or certified sources</li>
    <li>Choose sustainable companies (e.g. FSC-certified wood)</li>
  </ul>
</div>
        `,
        canonical_keywords: ["environmental","ethical","sustainable"],
        practice_items: []
      },
      {
        id: "example-application",
        title: "🪜 Subsection 6 – Example Application Task",
        type: "content",
        study_group: 3,
        content_html: `
<div class="example-block">
  <h4>Example Question:</h4>
  <p>"Examine three chairs made from different materials. Explain why the materials have been used for each chair."</p>
  
  <ul>
    <li><strong>Classroom chair:</strong> Polypropylene & steel - lightweight, durable, easy to clean</li>
    <li><strong>Library chair:</strong> Beech hardwood - comfortable, attractive grain, strong</li>
    <li><strong>Workshop stool:</strong> Aluminium - lightweight, rust-resistant</li>
  </ul>
</div>
        `,
        canonical_keywords: ["application","example","chairs"],
        practice_items: []
      },
      {
        id: "summary-table",
        title: "Subsection 7 – Summary Table",
        type: "content",
        study_group: 3,
        content_html: `
<div class="subsection">
  <table class="data-table">
    <thead>
      <tr>
        <th>Factor</th>
        <th>Timber</th>
        <th>Metal</th>
        <th>Polymer</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Functionality</td>
        <td>Oak for strength</td>
        <td>Steel for car frames</td>
        <td>Acrylic for signage</td>
      </tr>
      <tr>
        <td>Aesthetics</td>
        <td>Mahogany grain</td>
        <td>Polished aluminium</td>
        <td>Glossy finish</td>
      </tr>
      <tr>
        <td>Environment</td>
        <td>FSC wood</td>
        <td>Recycled aluminium</td>
        <td>Recycled PET</td>
      </tr>
    </tbody>
  </table>
</div>
        `,
        canonical_keywords: ["summary","comparison"],
        practice_items: []
      }
    ]
  },
  {
    id: "forces-and-stresses",
    title: "3.2.2 – Forces and Stresses",
    status: "ready",
    subsections: [
      {
        id: "definition",
        title: "Subsection 1 – Definition",
        type: "content",
        study_group: 1,
        content_html: `
<div class="definition-block">
  <h4>📘 Definition</h4>
  <p><strong>Forces and stresses</strong> describe external loads and internal reactions acting on materials. Understanding them helps designers choose and improve materials for safe, strong products.</p>
</div>
        `,
        canonical_keywords: ["forces","stresses"],
        practice_items: []
      },
      {
        id: "types-of-forces",
        title: "Subsection 2 – Types of Forces",
        type: "content",
        study_group: 1,
        content_html: `
<div class="key-facts-block">
  <h4>Types of Forces</h4>
  <ul>
    <li><strong>Tension:</strong> Pulling force (rope, cables)</li>
    <li><strong>Compression:</strong> Pushing force (table legs)</li>
    <li><strong>Bending:</strong> Combination of compression and tension (shelf)</li>
    <li><strong>Shear:</strong> Opposite directions (scissors)</li>
    <li><strong>Torsion:</strong> Twisting force (bottle cap)</li>
  </ul>
</div>
        `,
        canonical_keywords: ["tension","compression","bending","shear","torsion"],
        practice_items: []
      },
      {
        id: "static-dynamic",
        title: "Subsection 3 – Static and Dynamic Loads",
        type: "content",
        study_group: 2,
        content_html: `
<div class="definition-block">
  <h4>Static vs Dynamic Loads</h4>
  <p><strong>Static:</strong> Constant, downward force (person standing still)</p>
  <p><strong>Dynamic:</strong> Moving/changing force (person walking, wind on bridge)</p>
</div>
        `,
        canonical_keywords: ["static","dynamic","loads"],
        practice_items: []
      },
      {
        id: "enhancing",
        title: "Subsection 4 – Enhancing Materials",
        type: "content",
        study_group: 2,
        content_html: `
<div class="key-facts-block">
  <h4>Enhancement Methods</h4>
  <ul>
    <li><strong>Rope:</strong> Twisting fibres increases tensile strength</li>
    <li><strong>Concrete:</strong> Steel rebar improves tensile strength</li>
    <li><strong>Timber:</strong> Lamination improves stiffness</li>
    <li><strong>Polymers:</strong> Carbon/glass fibre reinforcement (CFRP/GRP)</li>
  </ul>
</div>
        `,
        canonical_keywords: ["enhancing","reinforcement","lamination"],
        practice_items: []
      }
    ]
  },
  {
    id: "sources-and-origins",
    title: "3.2.4 – Sources and Origins",
    status: "coming_soon",
    subsections: []
  },
  {
    id: "properties-and-forming",
    title: "3.2.6 – Properties & Forming",
    status: "coming_soon",
    subsections: []
  },
  {
    id: "stock-forms",
    title: "2.6 – Stock Forms",
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
    title: "2.8 – Specialist Techniques",
    status: "coming_soon",
    subsections: []
  },
  {
    id: "surface-treatments",
    title: "2.9 – Surface Treatments",
    status: "coming_soon",
    subsections: []
  }
];
