// GCSE AQA Physics - 8 Base Topics
// Waves topic is populated with first 3 subsections
// Other topics show "Coming Soon" placeholder

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

export const physicsData: TopicSection[] = [
  {
    id: "energy",
    title: "Energy",
    status: "coming_soon",
    subsections: []
  },
  {
    id: "electricity",
    title: "Electricity",
    status: "coming_soon",
    subsections: []
  },
  {
    id: "particle-model",
    title: "Particle Model of Matter",
    status: "coming_soon",
    subsections: []
  },
  {
    id: "atomic-structure",
    title: "Atomic Structure",
    status: "coming_soon",
    subsections: []
  },
  {
    id: "forces",
    title: "Forces",
    status: "coming_soon",
    subsections: []
  },
  {
    id: "waves",
    title: "Waves",
    status: "ready",
    subsections: [
      {
        id: "4-6-1-1-transverse-longitudinal",
        title: "4.6.1.1 TRANSVERSE AND LONGITUDINAL WAVES",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Types of Waves</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>Waves transfer energy, not matter. The particles in the medium vibrate to pass energy along, but they do not move with the wave. There are two main types of waves:</p>
    <ul>
      <li>Transverse waves</li>
      <li>Longitudinal waves</li>
    </ul>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Idea</h4>
    <p>In both types, the wave moves energy from one place to another — but the particle vibrations happen in different directions.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Transverse Waves</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>In a transverse wave, the vibrations of the particles are at right angles (⊥) to the direction the wave travels.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Features</h4>
    <ul>
      <li>Particles move up and down as the wave moves side to side.</li>
      <li>Have crests (peaks) and troughs.</li>
      <li>Can travel through solids and on the surface of liquids, but not through gases.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🟢 Example</h4>
    <p>Ripples on a water surface are transverse waves. The water particles move up and down, but the wave itself travels outward across the surface.</p>
    <table class="data-table">
      <thead>
        <tr>
          <th>Wave Feature</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Displacement</td>
          <td>Distance from rest position</td>
        </tr>
        <tr>
          <td>Wavelength</td>
          <td>Distance between consecutive crests</td>
        </tr>
        <tr>
          <td>Amplitude</td>
          <td>Maximum displacement from rest</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Point</h4>
    <p>Transverse waves show how energy moves through the water — the water itself does not travel.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Longitudinal Waves</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>In a longitudinal wave, the vibrations of the particles are parallel (∥) to the direction the wave travels.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Features</h4>
    <ul>
      <li>The wave has compressions (where particles are close together) and rarefactions (where they are spread apart).</li>
      <li>Can travel through solids, liquids, and gases, but not through a vacuum because they need particles to pass energy on.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🟢 Example</h4>
    <p>Sound waves in air are longitudinal. The air particles vibrate backwards and forwards in the same direction the sound travels.</p>
    <p><strong>Wave structure:</strong> compression → rarefaction → compression (wavelength is distance between compressions)</p>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Point</h4>
    <p>Even though the sound wave travels across a room, the air itself doesn't move — only the vibration (energy) moves through the air.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Evidence That Waves Transfer Energy, Not Matter</h3>
  
  <div class="example-block">
    <h4>🟢 Observation 1 – Ripples on Water</h4>
    <p>A small object (like a floating leaf or toy duck) on a pond bobs up and down as the waves pass but does not move across the pond. This shows that the wave moves, but the water stays in place.</p>
  </div>

  <div class="example-block">
    <h4>🟢 Observation 2 – Sound Waves in Air</h4>
    <p>When sound travels, air particles vibrate back and forth. They pass on energy to neighbouring particles, but each particle only moves a small distance around its resting position. This shows that the air doesn't travel, only the sound energy does.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Idea</h4>
    <p>Both transverse and longitudinal waves transfer energy, not matter. The medium (water or air) returns to its original position after the wave passes.</p>
  </div>
</div>
        `,
        canonical_keywords: [
          "waves", "energy transfer", "transverse", "longitudinal", "vibrations", "particles",
          "crest", "trough", "compression", "rarefaction", "wavelength", "amplitude",
          "right angles", "parallel", "medium", "sound waves", "water waves"
        ],
        practice_items: [
          {
            id: "p1",
            prompt_template: "Define what a wave is and explain what waves transfer.",
            marks: 3,
            type: "short-answer",
            difficulty: "easy",
            randomise: true,
            expected_keywords: [
              "wave", "transfer", "energy", "not matter", "vibrations", "particles", "medium"
            ]
          },
          {
            id: "p2",
            prompt_template: "State the definition of a transverse wave and give one example.",
            marks: 4,
            type: "short-answer",
            difficulty: "easy",
            randomise: true,
            expected_keywords: [
              "transverse", "vibrations", "right angles", "perpendicular", "direction", "water", "ripples", "crest", "trough"
            ]
          },
          {
            id: "p3",
            prompt_template: "Explain the difference between transverse and longitudinal waves.",
            marks: 4,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: [
              "transverse", "longitudinal", "right angles", "parallel", "vibrations", "direction", "compression", "rarefaction", "crest", "trough"
            ]
          },
          {
            id: "p4",
            prompt_template: "A leaf floats on a pond. When waves pass by, the leaf bobs up and down but doesn't move across the pond. Use this observation to explain what waves transfer.",
            marks: 4,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: [
              "waves", "transfer", "energy", "not matter", "particles", "vibrate", "position", "medium"
            ]
          },
          {
            id: "p5",
            prompt_template: "Sound waves are longitudinal waves. Describe the structure of a sound wave and explain why it cannot travel through a vacuum.",
            marks: 5,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: [
              "longitudinal", "compressions", "rarefactions", "particles", "vibrate", "parallel", "vacuum", "no particles", "medium"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "magnetism",
    title: "Magnetism and Electromagnetism",
    status: "coming_soon",
    subsections: []
  },
  {
    id: "space-physics",
    title: "Space Physics",
    status: "coming_soon",
    subsections: []
  }
];
