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
          }
        ]
      },
      {
        id: "4-6-1-2-describing-wave-motion",
        title: "4.6.1.2 DESCRIBING WAVE MOTION",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – What Is Wave Motion?</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>Wave motion is how the vibrations (oscillations) move through a medium to transfer energy from one place to another.</p>
    <p>When a wave travels:</p>
    <ul>
      <li>Energy moves forward 🚀</li>
      <li>Matter (particles) only vibrates around a fixed position ⚡</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Amplitude (A)</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>The amplitude of a wave is the maximum displacement (distance) of a point on the wave from its undisturbed (rest) position.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Features</h4>
    <p>It measures how tall the wave is. Larger amplitude = more energy carried by the wave.</p>
    <ul>
      <li>In sound: louder volume 🔊</li>
      <li>In light: brighter intensity 💡</li>
    </ul>
    <p><strong>Unit:</strong> metres (m)</p>
  </div>

  <div class="exam-tip-block">
    <h4>⚡ Exam Tip</h4>
    <p>If you double the amplitude, you quadruple the energy carried by the wave.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Wavelength (λ)</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>The wavelength is the distance from one point on a wave to the same point on the next wave.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Measurements</h4>
    <ul>
      <li>For transverse waves: crest to crest OR trough to trough</li>
      <li>For longitudinal waves: compression to compression OR rarefaction to rarefaction</li>
    </ul>
    <p><strong>Unit:</strong> metres (m)</p>
    <p><strong>Symbol:</strong> λ (Greek letter lambda)</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Frequency (f)</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>The frequency of a wave is the number of complete waves (or oscillations) passing a point per second.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Features</h4>
    <p><strong>Unit:</strong> hertz (Hz), where 1 Hz = 1 wave per second</p>
    <ul>
      <li>Higher frequency = more waves passing per second</li>
      <li>In sound: higher pitch 🎵</li>
      <li>In light: higher energy (towards blue/violet) 💎</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Time Period (T)</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>The time period is the time taken for one complete wave (or oscillation) to pass a point.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Relationship with Frequency</h4>
    <p><strong>Formula:</strong> T = 1/f or f = 1/T</p>
    <p><strong>Unit:</strong> seconds (s)</p>
  </div>

  <div class="example-block">
    <h4>🟢 Example</h4>
    <p>If a wave has a frequency of 5 Hz, its time period is: T = 1/5 = 0.2 seconds</p>
  </div>
</div>
        `,
        canonical_keywords: [
          "wave motion", "amplitude", "wavelength", "frequency", "time period", "oscillations",
          "displacement", "hertz", "metres", "lambda", "crest", "trough", "energy"
        ],
        practice_items: [
          {
            id: "p1",
            prompt_template: "Define amplitude and state its unit.",
            marks: 2,
            type: "short-answer",
            difficulty: "easy",
            randomise: true,
            expected_keywords: [
              "amplitude", "maximum displacement", "rest position", "metres", "distance"
            ]
          },
          {
            id: "p2",
            prompt_template: "Explain what wavelength is and how to measure it for transverse waves.",
            marks: 3,
            type: "short-answer",
            difficulty: "easy",
            randomise: true,
            expected_keywords: [
              "wavelength", "distance", "crest to crest", "trough to trough", "same point", "metres"
            ]
          },
          {
            id: "p3",
            prompt_template: "A wave has a frequency of 10 Hz. Calculate its time period and explain what this value represents.",
            marks: 3,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: [
              "time period", "T = 1/f", "0.1 seconds", "time", "one complete wave", "oscillation"
            ]
          }
        ]
      },
      {
        id: "4-6-1-3-wave-speed",
        title: "4.6.1.3 WAVE SPEED AND THE WAVE EQUATION",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – What Is Wave Speed?</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>Wave speed (v) is how fast energy is transferred through a medium by the wave. It tells us how quickly the wave moves forward.</p>
    <p><strong>Unit:</strong> metres per second (m/s)</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Idea</h4>
    <p>Wave speed depends on the medium the wave travels through, not on the wave's frequency or amplitude.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – The Wave Equation</h3>
  
  <div class="definition-block">
    <h4>🔵 Wave Equation</h4>
    <p><strong>wave speed = frequency × wavelength</strong></p>
    <p><strong>v = f × λ</strong></p>
    <p>Where:</p>
    <ul>
      <li>v = wave speed (m/s)</li>
      <li>f = frequency (Hz)</li>
      <li>λ = wavelength (m)</li>
    </ul>
  </div>

  <div class="exam-tip-block">
    <h4>⚡ Exam Tip</h4>
    <p>You must remember this equation for your exam! It's not given on the formula sheet.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Using the Wave Equation</h3>
  
  <div class="example-block">
    <h4>🟢 Example 1</h4>
    <p><strong>Question:</strong> A wave has a frequency of 20 Hz and a wavelength of 3 m. Calculate its wave speed.</p>
    <p><strong>Solution:</strong></p>
    <ul>
      <li>v = f × λ</li>
      <li>v = 20 Hz × 3 m</li>
      <li>v = 60 m/s</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🟢 Example 2</h4>
    <p><strong>Question:</strong> Sound travels at 330 m/s. If a sound wave has a wavelength of 1.5 m, what is its frequency?</p>
    <p><strong>Solution:</strong></p>
    <ul>
      <li>v = f × λ, so f = v / λ</li>
      <li>f = 330 m/s ÷ 1.5 m</li>
      <li>f = 220 Hz</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Rearranging the Wave Equation</h3>
  
  <div class="key-facts-block">
    <h4>🧠 Three Forms of the Equation</h4>
    <ul>
      <li>v = f × λ (find wave speed)</li>
      <li>f = v / λ (find frequency)</li>
      <li>λ = v / f (find wavelength)</li>
    </ul>
  </div>

  <div class="exam-tip-block">
    <h4>⚡ Exam Tip</h4>
    <p>Always write down the equation, substitute values with units, then calculate. Show all your working!</p>
  </div>
</div>
        `,
        canonical_keywords: [
          "wave speed", "wave equation", "v = f × λ", "frequency", "wavelength", "metres per second",
          "hertz", "calculate", "rearrange", "formula"
        ],
        practice_items: [
          {
            id: "p1",
            prompt_template: "State the wave equation and define each symbol.",
            marks: 3,
            type: "short-answer",
            difficulty: "easy",
            randomise: true,
            expected_keywords: [
              "v = f × λ", "wave speed", "frequency", "wavelength", "m/s", "Hz", "metres"
            ]
          },
          {
            id: "p2",
            prompt_template: "A wave has a frequency of 50 Hz and travels at 200 m/s. Calculate its wavelength.",
            marks: 3,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: [
              "wavelength", "λ = v / f", "200", "50", "4 m", "metres"
            ]
          },
          {
            id: "p3",
            prompt_template: "Explain why wave speed depends on the medium, not on frequency or amplitude.",
            marks: 3,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: [
              "wave speed", "medium", "properties", "frequency", "amplitude", "independent", "depends on"
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
