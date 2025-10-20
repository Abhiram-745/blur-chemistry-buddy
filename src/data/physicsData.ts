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
    status: "ready",
    subsections: [
      {
        id: "4-1-1-energy-stores-systems",
        title: "4.1.1 Energy Stores and Systems",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Energy Stores</h3>
  <ul>
    <li>Thermal, Kinetic, Gravitational potential, Elastic potential</li>
    <li>Chemical, Magnetic, Electrostatic, Nuclear</li>
  </ul>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Systems and Changes</h3>
  <p>Energy is transferred by heating, waves, electrical work, or mechanical work.</p>
</div>
        `,
        canonical_keywords: ["energy stores","thermal","kinetic","gpe","elastic","chemical","magnetic","electrostatic","nuclear","systems","energy transfer"],
        practice_items: [
          { id:"p1", prompt_template:"List four energy stores and give one example for any store.", marks:3, type:"short-answer", difficulty:"easy", randomise:true, expected_keywords:["thermal","kinetic","gravitational potential","elastic","chemical","magnetic","electrostatic","nuclear","example"]},
          { id:"p2", prompt_template:"Name two pathways by which energy can be transferred and describe a simple example.", marks:3, type:"short-answer", difficulty:"easy", randomise:true, expected_keywords:["heating","mechanical work","electrical work","waves","transfer"]}
        ]
      },
      {
        id: "4-1-2-work-and-energy-calculations",
        title: "4.1.2 Changes in Energy and Work Done",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Key Equations</h3>
  <ul>
    <li>Work done: W = F s</li>
    <li>Kinetic: E_k = 1/2 m v^2</li>
    <li>Gravitational: E_p = m g h</li>
  </ul>
</div>
        `,
        canonical_keywords:["work done","W=Fs","kinetic energy","1/2 m v^2","gravitational potential","mgh","energy change"],
        practice_items:[
          { id:"p3", prompt_template:"A 10 N force moves a box 3 m. Calculate the work done.", marks:2, type:"short-answer", difficulty:"easy", randomise:true, expected_keywords:["W=Fs","30 J"]},
          { id:"p4", prompt_template:"A 0.5 kg ball moves at 6 m/s. Calculate its kinetic energy.", marks:3, type:"short-answer", difficulty:"medium", randomise:true, expected_keywords:["Ek=1/2mv^2","9 J","0.5*36=18*0.5=9"]}
        ]
      }
    ]
  },
  {
    id: "electricity",
    title: "Electricity",
    status: "ready",
    subsections: [
      {
        id: "4-2-1-current-vpd-resistance",
        title: "4.2.1 Current, Potential Difference and Resistance",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Key Ideas</h3>
  <ul>
    <li>Current (I) is the rate of flow of charge. Unit: ampere (A)</li>
    <li>Potential difference (V) is energy transferred per unit charge. Unit: volt (V)</li>
    <li>Resistance (R) opposes current. Ohm's law: V = I R</li>
  </ul>
</div>
        `,
        canonical_keywords:["current","charge","potential difference","voltage","resistance","Ohm's law","V=IR"],
        practice_items:[
          { id:"p1", prompt_template:"Define current and potential difference, including their units.", marks:3, type:"short-answer", difficulty:"easy", randomise:true, expected_keywords:["current","rate of flow of charge","ampere","potential difference","energy per charge","volt"]},
          { id:"p2", prompt_template:"A component has resistance 20 Ω and current 0.4 A. Calculate the potential difference across it.", marks:2, type:"short-answer", difficulty:"easy", randomise:true, expected_keywords:["V=IR","8 V"]}
        ]
      },
      {
        id: "4-2-2-series-parallel",
        title: "4.2.2 Series and Parallel Circuits",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Rules</h3>
  <ul>
    <li>Series: current same everywhere; potential differences add; total R = R1 + R2 …</li>
    <li>Parallel: potential difference same across branches; currents add; 1/R_total = 1/R1 + 1/R2 …</li>
  </ul>
</div>
        `,
        canonical_keywords:["series","parallel","current","potential difference","resistance","circuit rules"],
        practice_items:[
          { id:"p3", prompt_template:"In a series circuit, how do current and potential difference behave?", marks:2, type:"short-answer", difficulty:"easy", randomise:true, expected_keywords:["current same","potential differences add"]},
          { id:"p4", prompt_template:"Two 6 Ω resistors in parallel give what total resistance?", marks:2, type:"short-answer", difficulty:"easy", randomise:true, expected_keywords:["3 Ω","parallel formula"]}
        ]
      }
    ]
  },
  {
    id: "particle-model",
    title: "Particle Model of Matter",
    status: "ready",
    subsections: [
      {
        id: "4-3-1-density",
        title: "4.3.1 Density of Materials",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Density</h3>
  <p>Density ρ = m / V. Typical units kg/m³. Measure mass with a balance and volume by geometry or displacement.</p>
</div>
        `,
        canonical_keywords:["density","rho","mass","volume","kg/m^3","displacement"],
        practice_items:[
          { id:"p1", prompt_template:"A block has mass 0.8 kg and volume 4×10^-4 m³. Calculate its density.", marks:2, type:"short-answer", difficulty:"easy", randomise:true, expected_keywords:["ρ=m/V","2000 kg/m^3"]}
        ]
      },
      {
        id: "4-3-2-changes-of-state-internal-energy",
        title: "4.3.2 Changes of State and Internal Energy",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Internal Energy</h3>
  <p>Internal energy is the sum of the kinetic and potential energies of particles. Heating changes temperature or state.</p>
  <p>Specific latent heat L: energy to change state of 1 kg without temperature change.</p>
</div>
        `,
        canonical_keywords:["internal energy","specific latent heat","change of state","temperature","particle model"],
        practice_items:[
          { id:"p2", prompt_template:"Explain what is meant by specific latent heat.", marks:2, type:"short-answer", difficulty:"easy", randomise:true, expected_keywords:["energy","1 kg","change of state","no temperature change"]}
        ]
      }
    ]
  },
  {
    id: "atomic-structure",
    title: "Atomic Structure",
    status: "ready",
    subsections: [
      {
        id: "4-4-1-atom-and-isotopes",
        title: "4.4.1 Atoms and Isotopes",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Structure</h3>
  <p>Atoms have a nucleus of protons and neutrons with electrons in shells. Isotopes are atoms of the same element with different numbers of neutrons.</p>
</div>
        `,
        canonical_keywords:["proton","neutron","electron","nucleus","isotopes"],
        practice_items:[
          { id:"p1", prompt_template:"Define an isotope and give one example.", marks:3, type:"short-answer", difficulty:"easy", randomise:true, expected_keywords:["same element","different neutrons","example"]}
        ]
      },
      {
        id: "4-4-2-radioactivity-half-life",
        title: "4.4.2 Radioactive Decay and Half-life",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Key Ideas</h3>
  <p>Alpha, beta and gamma radiation; random and spontaneous decay; half-life is the time for activity to halve.</p>
</div>
        `,
        canonical_keywords:["alpha","beta","gamma","radioactive","decay","half-life","activity"],
        practice_items:[
          { id:"p2", prompt_template:"Explain what is meant by the half-life of a radioactive isotope.", marks:2, type:"short-answer", difficulty:"easy", randomise:true, expected_keywords:["time","activity halves","nuclei","decay"]}
        ]
      }
    ]
  },
  {
    id: "forces",
    title: "Forces",
    status: "ready",
    subsections: [
      {
        id: "4-5-1-scalars-vectors",
        title: "4.5.1 Scalars, Vectors and Types of Forces",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Key Ideas</h3>
  <p>Scalars have magnitude only; vectors have magnitude and direction. Contact and non-contact forces (e.g., friction, weight, magnetic).</p>
</div>
        `,
        canonical_keywords:["scalar","vector","contact","non-contact","force","weight","friction","magnetic"],
        practice_items:[
          { id:"p1", prompt_template:"Classify the following as scalar or vector: speed, velocity, force, mass.", marks:3, type:"short-answer", difficulty:"easy", randomise:true, expected_keywords:["speed scalar","velocity vector","force vector","mass scalar"]}
        ]
      },
      {
        id: "4-5-2-newtons-laws",
        title: "4.5.2 Newton’s Laws and Acceleration",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Equations</h3>
  <ul>
    <li>Resultant force: F = m a</li>
    <li>Weight: W = m g</li>
  </ul>
</div>
        `,
        canonical_keywords:["Newton's laws","F=ma","acceleration","resultant force","weight","W=mg"],
        practice_items:[
          { id:"p2", prompt_template:"A resultant force of 12 N acts on a 3 kg trolley. Calculate the acceleration.", marks:2, type:"short-answer", difficulty:"easy", randomise:true, expected_keywords:["F=ma","4 m/s^2"]}
        ]
      }
    ]
  },
  {
    id: "waves",
    title: "Waves",
    status: "ready",
    subsections: [
      {
        id: "4-6-1-1-transverse-longitudinal",
        title: "4.6.1.1 – Transverse and Longitudinal Waves",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 1 – Types of Waves</h3>
  
  <div class="definition-block">
    <h4>🌊 Definition:</h4>
    <p>Waves transfer energy, not matter. The particles in the medium vibrate to pass energy along, but they do not move with the wave.</p>
    <p>There are two main types of waves:</p>
    <ul>
      <li>1️⃣ Transverse waves</li>
      <li>2️⃣ Longitudinal waves</li>
    </ul>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Idea:</h4>
    <p>In both types, the wave moves energy from one place to another — but the particle vibrations happen in different directions.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 2 – Transverse Waves</h3>
  
  <div class="definition-block">
    <h4>📘 Definition:</h4>
    <p>In a transverse wave, the vibrations of the particles are at right angles (⟂) to the direction the wave travels.</p>
  </div>

  <div class="key-facts-block">
    <h4>💠 Key Features:</h4>
    <ul>
      <li>Particles move up and down as the wave moves side to side.</li>
      <li>Have crests (peaks) and troughs.</li>
      <li>Can travel through solids and on the surface of liquids, but not through gases.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>💡 Example:</h4>
    <p>🌊 Ripples on a water surface are transverse waves. The water particles move up and down, but the wave itself travels outward across the surface.</p>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Point:</h4>
    <p>Transverse waves show how energy moves through the water — the water itself does not travel.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 3 – Longitudinal Waves</h3>
  
  <div class="definition-block">
    <h4>📗 Definition:</h4>
    <p>In a longitudinal wave, the vibrations of the particles are parallel (∥) to the direction the wave travels.</p>
  </div>

  <div class="key-facts-block">
    <h4>💠 Key Features:</h4>
    <ul>
      <li>The wave has compressions (where particles are close together) and rarefactions (where they are spread apart).</li>
      <li>Can travel through solids, liquids, and gases, but not through a vacuum because they need particles to pass energy on.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>💡 Example:</h4>
    <p>🔊 Sound waves in air are longitudinal. The air particles vibrate backwards and forwards in the same direction the sound travels.</p>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Point:</h4>
    <p>Even though the sound wave travels across a room, the air itself doesn't move — only the vibration (energy) moves through the air.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 4 – Evidence That Waves Transfer Energy, Not Matter</h3>
  
  <div class="example-block">
    <h4>💬 Observation 1 – Ripples on Water:</h4>
    <p>A small object (like a floating leaf or toy duck) on a pond bobs up and down as the waves pass but does not move across the pond.</p>
    <p>➡️ This shows that the wave moves, but the water stays in place.</p>
  </div>

  <div class="example-block">
    <h4>💬 Observation 2 – Sound Waves in Air:</h4>
    <p>When sound travels, air particles vibrate back and forth. They pass on energy to neighbouring particles, but each particle only moves a small distance around its resting position.</p>
    <p>➡️ This shows that the air doesn't travel, only the sound energy does.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Idea:</h4>
    <p>Both transverse and longitudinal waves transfer energy, not matter.</p>
    <p>The medium (water or air) returns to its original position after the wave passes.</p>
  </div>
</div>
        `,
        canonical_keywords: [
          "waves", "energy transfer", "transverse", "longitudinal", "vibrations", "particles",
          "crest", "trough", "compression", "rarefaction", "right angles", "parallel", "medium"
        ],
        practice_items: [
          {
            id: "p1",
            prompt_template: "Define what a wave is and explain what waves transfer.",
            marks: 3,
            type: "short-answer",
            difficulty: "easy",
            randomise: true,
            expected_keywords: ["wave", "transfer", "energy", "not matter", "vibrations", "particles"]
          },
          {
            id: "p2",
            prompt_template: "State the definition of a transverse wave and give one example.",
            marks: 4,
            type: "short-answer",
            difficulty: "easy",
            randomise: true,
            expected_keywords: ["transverse", "vibrations", "right angles", "perpendicular", "water", "ripples"]
          },
          {
            id: "p3",
            prompt_template: "Explain the difference between transverse and longitudinal waves.",
            marks: 4,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: ["transverse", "longitudinal", "right angles", "parallel", "compression", "rarefaction"]
          }
        ]
      },
      {
        id: "4-6-1-2-describing-wave-motion",
        title: "4.6.1.2 – Describing Wave Motion",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 1 – What Is Wave Motion?</h3>
  
  <div class="definition-block">
    <h4>🌊 Definition:</h4>
    <p>Wave motion is how the vibrations (oscillations) move through a medium to transfer energy from one place to another.</p>
    <p>When a wave travels:</p>
    <ul>
      <li>Energy moves forward 🚀</li>
      <li>Matter (particles) only vibrates around a fixed position ⚡</li>
    </ul>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Idea:</h4>
    <p>Each point on a wave moves in a repeated pattern called an oscillation or cycle.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 2 – Amplitude (A)</h3>
  
  <div class="definition-block">
    <h4>📏 Definition:</h4>
    <p>The amplitude of a wave is the maximum displacement (distance) of a point on the wave from its undisturbed (rest) position.</p>
  </div>

  <div class="key-facts-block">
    <h4>💡 Explanation:</h4>
    <ul>
      <li>It measures how tall the wave is.</li>
      <li>Larger amplitude = more energy carried by the wave.</li>
      <li>In sound: louder volume 🔊</li>
      <li>In light: brighter intensity 💡</li>
    </ul>
    <p><strong>📐 Unit:</strong> metres (m)</p>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Exam Tip:</h4>
    <p>If you double the amplitude, you quadruple the energy carried by the wave.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 3 – Wavelength (λ)</h3>
  
  <div class="definition-block">
    <h4>🌊 Definition:</h4>
    <p>The wavelength (symbol λ, "lambda") is the distance between one point on a wave and the same point on the next wave.</p>
  </div>

  <div class="key-facts-block">
    <h4>💡 Examples:</h4>
    <ul>
      <li>From crest to crest (for transverse waves)</li>
      <li>From compression to compression (for longitudinal waves)</li>
    </ul>
    <p><strong>📐 Unit:</strong> metres (m)</p>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Idea:</h4>
    <p>Shorter wavelength = waves are closer together → higher frequency.</p>
    <p>Longer wavelength = waves are spread out → lower frequency.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 4 – Frequency (f)</h3>
  
  <div class="definition-block">
    <h4>⏱️ Definition:</h4>
    <p>The frequency of a wave is the number of complete waves passing a point per second.</p>
  </div>

  <div class="example-block">
    <h4>💡 Example:</h4>
    <p>If 5 waves pass a point every second → frequency = 5 Hz.</p>
  </div>

  <div class="key-facts-block">
    <h4>📐 Unit:</h4>
    <p>hertz (Hz), which means "per second".</p>
    <h4>🧠 Key Idea:</h4>
    <ul>
      <li>High frequency = more waves per second, more energy.</li>
      <li>Low frequency = fewer waves per second, less energy.</li>
    </ul>
    <h4>🎵 Sound Example:</h4>
    <p>High frequency = high-pitched sound 🎶</p>
    <p>Low frequency = low-pitched sound 🔊</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 5 – Period (T)</h3>
  
  <div class="definition-block">
    <h4>🕐 Definition:</h4>
    <p>The period of a wave is the time taken for one full wave to pass a point.</p>
    <h4>Equation:</h4>
    <p><strong>T = 1/f</strong></p>
    <p>Where:</p>
    <ul>
      <li>T = period (s)</li>
      <li>f = frequency (Hz)</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>💡 Example:</h4>
    <p>If a wave has a frequency of 10 Hz,</p>
    <p>T = 1/10 = 0.1 s</p>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Idea:</h4>
    <p>High-frequency waves have a short period, because each wave passes quickly.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 6 – How the Quantities Link Together</h3>
  
  <div class="key-facts-block">
    <h4>📘 Relationships:</h4>
    <ul>
      <li>Frequency and period are inversely related: ➜ If frequency ↑ then period ↓</li>
      <li>Wavelength, frequency and speed are linked by the wave equation (covered next section): v = f × λ</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🧠 Concept Check:</h4>
    <p>Think of waves as a queue of people doing a "Mexican wave" in a stadium:</p>
    <ul>
      <li>The height of arms = amplitude</li>
      <li>The distance between people = wavelength</li>
      <li>The number of people raising arms per second = frequency</li>
      <li>The time between each person's turn = period</li>
    </ul>
  </div>
</div>
        `,
        canonical_keywords: [
          "wave motion", "amplitude", "wavelength", "frequency", "period", "oscillations",
          "displacement", "hertz", "metres", "lambda", "energy"
        ],
        practice_items: [
          {
            id: "p1",
            prompt_template: "Define amplitude and state its unit.",
            marks: 2,
            type: "short-answer",
            difficulty: "easy",
            randomise: true,
            expected_keywords: ["amplitude", "maximum displacement", "rest position", "metres"]
          },
          {
            id: "p2",
            prompt_template: "A wave has a frequency of 10 Hz. Calculate its time period.",
            marks: 3,
            type: "short-answer",
            difficulty: "easy",
            randomise: true,
            expected_keywords: ["T = 1/f", "0.1 seconds", "period"]
          },
          {
            id: "p3",
            prompt_template: "Explain the relationship between wavelength and frequency.",
            marks: 3,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: ["wavelength", "frequency", "inversely", "shorter", "higher"]
          }
        ]
      },
      {
        id: "4-6-1-3-wave-equation",
        title: "4.6.1.3 – The Wave Equation",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 1 – What Is Wave Speed?</h3>
  
  <div class="definition-block">
    <h4>🚀 Definition:</h4>
    <p>Wave speed is the speed at which energy is transferred (or the wave moves) through a medium.</p>
  </div>

  <div class="key-facts-block">
    <h4>💡 Explanation:</h4>
    <ul>
      <li>It tells us how fast the wave travels.</li>
      <li>It depends on the medium (for example, sound travels faster in solids than in air).</li>
    </ul>
    <p><strong>📐 Unit:</strong> metres per second (m/s)</p>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Idea:</h4>
    <p>All types of waves — transverse and longitudinal — move energy, not matter, and their speed can be calculated using the same equation.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 2 – The Wave Equation</h3>
  
  <div class="definition-block">
    <h4>📘 Formula:</h4>
    <p><strong>v = f × λ</strong></p>
    <p>Where:</p>
    <ul>
      <li>v = wave speed (m/s)</li>
      <li>f = frequency (Hz)</li>
      <li>λ = wavelength (m)</li>
    </ul>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Meaning:</h4>
    <p>The speed of a wave depends on how often waves pass a point (frequency) and how long each wave is (wavelength).</p>
  </div>

  <div class="example-block">
    <h4>💬 Example:</h4>
    <p>If a sound wave has a frequency of 200 Hz and a wavelength of 1.7 m,</p>
    <p>v = 200 × 1.7 = 340 m/s</p>
    <p><strong>📏 This is the average speed of sound in air!</strong></p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 3 – Using the Wave Equation</h3>
  
  <div class="key-facts-block">
    <h4>⚙️ Rearranging the Formula:</h4>
    <ul>
      <li>v = f × λ</li>
      <li>f = v / λ</li>
      <li>λ = v / f</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>💡 When to Use Each:</h4>
    <ul>
      <li>To find speed → multiply</li>
      <li>To find frequency → divide speed by wavelength</li>
      <li>To find wavelength → divide speed by frequency</li>
    </ul>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Exam Tip:</h4>
    <p>⚠️ Always check your units:</p>
    <ul>
      <li>Speed in m/s</li>
      <li>Wavelength in m</li>
      <li>Frequency in Hz</li>
    </ul>
    <p>If the question gives wavelength in cm, convert to m by dividing by 100.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 4 – Identifying Wave Features on a Diagram</h3>
  
  <div class="key-facts-block">
    <h4>📊 Key Skills:</h4>
    <p>You must be able to spot and label:</p>
    <ul>
      <li>Amplitude → height of the wave (rest to crest)</li>
      <li>Wavelength (λ) → distance between two matching points (e.g. crest to crest)</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>💡 For Longitudinal Waves:</h4>
    <ul>
      <li>Wavelength = distance between two compressions or two rarefactions.</li>
      <li>There's no visible "height" for amplitude — instead, it's how much the particles move from their resting position.</li>
    </ul>
  </div>
</div>
        `,
        canonical_keywords: [
          "wave speed", "wave equation", "v = f × λ", "frequency", "wavelength", "metres per second",
          "hertz", "calculate", "rearrange"
        ],
        practice_items: [
          {
            id: "p1",
            prompt_template: "State the wave equation and define each symbol.",
            marks: 3,
            type: "short-answer",
            difficulty: "easy",
            randomise: true,
            expected_keywords: ["v = f × λ", "wave speed", "frequency", "wavelength", "m/s", "Hz"]
          },
          {
            id: "p2",
            prompt_template: "A wave has a frequency of 50 Hz and travels at 200 m/s. Calculate its wavelength.",
            marks: 3,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: ["λ = v / f", "200", "50", "4 m", "wavelength"]
          },
          {
            id: "p3",
            prompt_template: "A sound wave has a wavelength of 1.7 m and frequency of 200 Hz. Calculate the wave speed.",
            marks: 3,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: ["v = f × λ", "340 m/s", "speed"]
          }
        ]
      },
      {
        id: "4-6-1-4-sound-waves",
        title: "4.6.1.4 – Sound Waves",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 1 – What Are Sound Waves?</h3>
  
  <div class="definition-block">
    <h4>🔊 Definition:</h4>
    <p>Sound waves are longitudinal waves that transfer energy through vibrations of particles in a medium (like air, water, or solids).</p>
  </div>

  <div class="key-facts-block">
    <h4>💡 Key Idea:</h4>
    <p>The particles vibrate backwards and forwards in the same direction as the wave travels — creating compressions and rarefactions.</p>
    <h4>📘 Important:</h4>
    <p>Sound waves cannot travel in a vacuum because there are no particles to vibrate.</p>
    <h4>🧠 Key Concept:</h4>
    <ul>
      <li>Compressions = regions where particles are close together (high pressure).</li>
      <li>Rarefactions = regions where particles are spread apart (low pressure).</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 2 – Speed of Sound</h3>
  
  <div class="definition-block">
    <h4>🚀 Definition:</h4>
    <p>The speed of sound depends on how easily particles can transfer vibrations to one another.</p>
  </div>

  <div class="key-facts-block">
    <h4>💡 Speed Pattern:</h4>
    <table style="width:100%; border-collapse: collapse;">
      <tr>
        <th style="border: 1px solid; padding: 8px;">Medium</th>
        <th style="border: 1px solid; padding: 8px;">Speed (approx.)</th>
        <th style="border: 1px solid; padding: 8px;">Reason</th>
      </tr>
      <tr>
        <td style="border: 1px solid; padding: 8px;">Solids</td>
        <td style="border: 1px solid; padding: 8px;">Fastest (~5000 m/s)</td>
        <td style="border: 1px solid; padding: 8px;">Particles are tightly packed → vibrations pass quickly</td>
      </tr>
      <tr>
        <td style="border: 1px solid; padding: 8px;">Liquids</td>
        <td style="border: 1px solid; padding: 8px;">Medium (~1500 m/s)</td>
        <td style="border: 1px solid; padding: 8px;">Particles are close, but move freely</td>
      </tr>
      <tr>
        <td style="border: 1px solid; padding: 8px;">Gases</td>
        <td style="border: 1px solid; padding: 8px;">Slowest (~340 m/s)</td>
        <td style="border: 1px solid; padding: 8px;">Particles are far apart → vibrations take longer</td>
      </tr>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Idea:</h4>
    <p>Sound travels faster in solids and slowest in gases because of the differences in particle spacing.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 3 – Sound Waves Causing Vibrations in Solids</h3>
  
  <div class="definition-block">
    <h4>📗 Definition:</h4>
    <p>When sound waves hit a solid object, the pressure changes caused by compressions and rarefactions make the particles in the solid vibrate.</p>
  </div>

  <div class="example-block">
    <h4>💬 Example:</h4>
    <ul>
      <li>A speaker cone vibrates → transfers energy into air as sound.</li>
      <li>A drum surface vibrates when struck → produces sound waves.</li>
      <li>Sound waves can make glass or metal vibrate (e.g. loud music making windows rattle).</li>
    </ul>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Point:</h4>
    <p>These vibrations can cause other solids to vibrate too — this is how sound can pass through walls or metal objects.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 4 – How the Ear Detects Sound</h3>
  
  <div class="key-facts-block">
    <h4>👂 Process Overview:</h4>
    <p>Sound waves in air are converted into electrical signals that the brain recognises as sound.</p>
    <h4>💡 Step-by-step Process:</h4>
    <ol>
      <li>Sound waves enter the ear canal.</li>
      <li>They hit the eardrum, causing it to vibrate.</li>
      <li>Vibrations pass through three small bones (ossicles) in the middle ear: Hammer (malleus), Anvil (incus), Stirrup (stapes)</li>
      <li>These amplify the vibrations and transmit them into the cochlea (a fluid-filled structure in the inner ear).</li>
      <li>The fluid in the cochlea vibrates, stimulating tiny hair cells.</li>
      <li>These hair cells convert the vibrations into electrical signals.</li>
      <li>The auditory nerve sends these signals to the brain, where they are interpreted as sound.</li>
    </ol>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Idea:</h4>
    <p>Sound waves → Vibrations → Electrical signals → Brain detects as sound.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 5 – Frequency and Pitch</h3>
  
  <div class="definition-block">
    <h4>🎵 Definition:</h4>
    <p>The frequency of a sound determines its pitch.</p>
  </div>

  <div class="key-facts-block">
    <h4>💡 Relationships:</h4>
    <ul>
      <li>High frequency → High pitch (e.g. whistle 🐦).</li>
      <li>Low frequency → Low pitch (e.g. drum 🥁).</li>
    </ul>
    <h4>🧠 Amplitude (loudness):</h4>
    <p>The amplitude of a sound wave determines how loud it is.</p>
    <ul>
      <li>Larger amplitude = louder sound.</li>
      <li>Smaller amplitude = quieter sound.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 6 – Limits of Human Hearing</h3>
  
  <div class="definition-block">
    <h4>👂 Definition:</h4>
    <p>Humans can only hear sounds within a limited frequency range.</p>
    <h4>📏 Range of Human Hearing:</h4>
    <p><strong>20 Hz to 20 kHz</strong></p>
  </div>

  <div class="key-facts-block">
    <h4>💡 Explanation:</h4>
    <ul>
      <li>Below 20 Hz → Infrasound (too low to hear)</li>
      <li>Above 20 kHz → Ultrasound (too high to hear)</li>
    </ul>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Reason for the Limit:</h4>
    <ul>
      <li>The conversion from sound waves → vibrations in the eardrum and bones only works efficiently within this range.</li>
      <li>The ear structures (eardrum, ossicles, and cochlea) cannot vibrate fast enough or slow enough outside these frequencies.</li>
    </ul>
  </div>
</div>
        `,
        canonical_keywords: [
          "sound waves", "longitudinal", "compressions", "rarefactions", "speed of sound",
          "vibrations", "frequency", "pitch", "amplitude", "loudness", "hearing range", "ear"
        ],
        practice_items: [
          {
            id: "p1",
            prompt_template: "Explain why sound travels faster in solids than in gases.",
            marks: 3,
            type: "short-answer",
            difficulty: "easy",
            randomise: true,
            expected_keywords: ["particles", "close together", "tightly packed", "vibrations", "transfer"]
          },
          {
            id: "p2",
            prompt_template: "State the range of human hearing and explain what happens outside this range.",
            marks: 4,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: ["20 Hz", "20 kHz", "infrasound", "ultrasound", "cannot hear"]
          },
          {
            id: "p3",
            prompt_template: "Describe how the ear converts sound waves into signals the brain can interpret.",
            marks: 5,
            type: "short-answer",
            difficulty: "hard",
            randomise: true,
            expected_keywords: ["eardrum", "vibrates", "ossicles", "cochlea", "hair cells", "electrical signals", "auditory nerve"]
          }
        ]
      },
      {
        id: "4-6-1-5-reflection-transmission-absorption",
        title: "4.6.1.5 – Reflection, Transmission and Absorption of Waves",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 1 – What Happens at a Boundary?</h3>
  
  <div class="definition-block">
    <h4>🌊 Definition:</h4>
    <p>When a wave reaches the boundary between two different materials (for example, air and glass), three things can happen:</p>
    <ul>
      <li>1️⃣ Reflection – the wave bounces back.</li>
      <li>2️⃣ Transmission – the wave passes through.</li>
      <li>3️⃣ Absorption – the wave's energy is absorbed by the material.</li>
    </ul>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Idea:</h4>
    <p>The amount of reflection, transmission, or absorption depends on:</p>
    <ul>
      <li>The type of wave (sound, light, etc.).</li>
      <li>The density and material at each side of the boundary.</li>
      <li>The angle at which the wave hits the surface.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 2 – Reflection of Waves</h3>
  
  <div class="definition-block">
    <h4>📘 Definition:</h4>
    <p>Reflection happens when a wave hits a surface and bounces back into the same medium.</p>
    <h4>💡 Law of Reflection:</h4>
    <p><strong>Angle of incidence (i) = Angle of reflection (r)</strong></p>
    <ul>
      <li>The angle of incidence is measured between the incoming ray and the normal (an imaginary line drawn at 90° to the surface).</li>
      <li>The angle of reflection is measured between the reflected ray and the normal.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>💡 Example:</h4>
    <ul>
      <li>Echoes are examples of sound waves being reflected off a surface (e.g. walls or cliffs).</li>
      <li>Mirrors reflect light waves in a single direction.</li>
    </ul>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Terms:</h4>
    <ul>
      <li><strong>Specular Reflection:</strong> Reflection from a smooth surface (mirror-like).</li>
      <li><strong>Diffuse Reflection:</strong> Reflection from a rough surface, scattering waves in many directions.</li>
    </ul>
  </div>

  <div class="exam-tip-block">
    <h4>💬 Exam Tip:</h4>
    <p>When drawing ray diagrams:</p>
    <ul>
      <li>Always draw the normal line (90° to the surface).</li>
      <li>Use arrows to show the direction of travel.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 3 – Transmission of Waves</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition:</h4>
    <p>Transmission happens when a wave passes through a substance instead of being reflected or absorbed.</p>
  </div>

  <div class="example-block">
    <h4>💡 Examples:</h4>
    <ul>
      <li>Light passing through glass.</li>
      <li>Sound travelling through walls or air.</li>
    </ul>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Idea:</h4>
    <ul>
      <li>Transparent materials transmit most of the light.</li>
      <li>Translucent materials scatter some of the transmitted light.</li>
      <li>Opaque materials transmit none — they reflect or absorb instead.</li>
    </ul>
    <h4>⚙️ What Happens During Transmission:</h4>
    <ul>
      <li>Waves may slow down or change direction as they enter a new material (this is refraction, covered next section).</li>
      <li>The transmitted wave may have a smaller amplitude, because some energy is absorbed.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 4 – Absorption of Waves</h3>
  
  <div class="definition-block">
    <h4>🔴 Definition:</h4>
    <p>Absorption happens when the energy of the wave is taken in by the material.</p>
  </div>

  <div class="example-block">
    <h4>💡 Examples:</h4>
    <ul>
      <li>Sound waves are absorbed by carpets and curtains, reducing echoes.</li>
      <li>Black surfaces absorb light and convert it into heat.</li>
    </ul>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Idea:</h4>
    <p>When a wave is absorbed, its energy is transferred to the particles of the material.</p>
    <ul>
      <li>The amplitude of the wave decreases (wave becomes weaker).</li>
      <li>The temperature of the absorbing material often increases.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>💬 Example Question:</h4>
    <p>"Explain why a black surface gets hotter than a white one when light shines on it."</p>
    <p><strong>✅ Answer:</strong></p>
    <p>A black surface absorbs most of the light energy and converts it into heat, while a white surface reflects most of the light away.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 5 – Required Practical: Investigating Reflection</h3>
  
  <div class="key-facts-block">
    <h4>🎯 Aim:</h4>
    <p>To investigate the law of reflection using a light ray and a mirror.</p>
    <h4>🧪 Equipment:</h4>
    <ul>
      <li>Ray box</li>
      <li>Plane (flat) mirror</li>
      <li>Protractor</li>
      <li>Ruler</li>
      <li>A4 paper</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>💡 Method:</h4>
    <ol>
      <li>Draw a straight line across the middle of your paper (the mirror line).</li>
      <li>Draw a normal line at 90° to the mirror.</li>
      <li>Aim the light ray from the ray box at the point where the lines meet.</li>
      <li>Mark the incident ray (incoming) and reflected ray (outgoing).</li>
      <li>Remove the mirror and use a protractor to measure both angles.</li>
      <li>Repeat for several different incident angles.</li>
    </ol>
    <h4>📊 Expected Results:</h4>
    <p>The angle of incidence = angle of reflection each time.</p>
  </div>

  <div class="exam-tip-block">
    <h4>⚙️ Improvements:</h4>
    <ul>
      <li>Use a thin, sharp light ray for accuracy.</li>
      <li>Use a protractor with 1° resolution.</li>
    </ul>
    <h4>⚠️ Safety:</h4>
    <ul>
      <li>Don't look directly into the ray box light.</li>
      <li>Avoid touching hot bulbs or metal parts.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 6 – Summary of Effects at Boundaries</h3>
  
  <div class="key-facts-block">
    <table style="width:100%; border-collapse: collapse;">
      <tr>
        <th style="border: 1px solid; padding: 8px;">Effect</th>
        <th style="border: 1px solid; padding: 8px;">Description</th>
        <th style="border: 1px solid; padding: 8px;">Example</th>
      </tr>
      <tr>
        <td style="border: 1px solid; padding: 8px;">Reflection</td>
        <td style="border: 1px solid; padding: 8px;">Wave bounces off a surface</td>
        <td style="border: 1px solid; padding: 8px;">Echo from a wall</td>
      </tr>
      <tr>
        <td style="border: 1px solid; padding: 8px;">Transmission</td>
        <td style="border: 1px solid; padding: 8px;">Wave passes through a substance</td>
        <td style="border: 1px solid; padding: 8px;">Light through glass</td>
      </tr>
      <tr>
        <td style="border: 1px solid; padding: 8px;">Absorption</td>
        <td style="border: 1px solid; padding: 8px;">Energy taken in by the material</td>
        <td style="border: 1px solid; padding: 8px;">Sound absorbed by curtains</td>
      </tr>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Idea:</h4>
    <p>When a wave hits a boundary, its energy is divided between reflection, transmission, and absorption — how much of each depends on the materials involved.</p>
  </div>
</div>
        `,
        canonical_keywords: [
          "reflection", "transmission", "absorption", "boundary", "law of reflection",
          "angle of incidence", "angle of reflection", "normal", "specular", "diffuse"
        ],
        practice_items: [
          {
            id: "p1",
            prompt_template: "State the law of reflection.",
            marks: 1,
            type: "short-answer",
            difficulty: "easy",
            randomise: true,
            expected_keywords: ["angle of incidence", "angle of reflection", "equal"]
          },
          {
            id: "p2",
            prompt_template: "Explain the difference between specular and diffuse reflection.",
            marks: 4,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: ["specular", "smooth", "single direction", "diffuse", "rough", "scatter"]
          },
          {
            id: "p3",
            prompt_template: "Describe what happens to a wave when it reaches a boundary between two materials.",
            marks: 3,
            type: "short-answer",
            difficulty: "easy",
            randomise: true,
            expected_keywords: ["reflection", "transmission", "absorption", "boundary", "energy"]
          }
        ]
      },
      {
        id: "4-6-1-practical-8-ripple-tank",
        title: "Required Practical 8: Measuring Wave Speed Using a Ripple Tank",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 1 – Aim of the Practical</h3>
  
  <div class="definition-block">
    <h4>🎯 Purpose:</h4>
    <p>To investigate and measure the speed of water waves on the surface of a ripple tank, using measurements of frequency, wavelength, and the wave equation:</p>
    <p><strong>v = f × λ</strong></p>
  </div>

  <div class="key-facts-block">
    <h4>💡 Key Idea:</h4>
    <p>The ripple tank makes waves visible, so we can measure their properties accurately using the pattern of light and dark lines (called wavefronts) projected onto a screen below.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 2 – Apparatus</h3>
  
  <div class="key-facts-block">
    <h4>🧪 Equipment List:</h4>
    <ul>
      <li>Ripple tank (with a transparent base)</li>
      <li>Vibrating bar attached to a signal generator</li>
      <li>Light source (above tank)</li>
      <li>Screen or white paper (underneath the tank)</li>
      <li>Ruler or metre stick</li>
      <li>Stopwatch</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 3 – Method</h3>
  
  <div class="example-block">
    <h4>🌊 Step-by-step Procedure:</h4>
    <ol>
      <li>Set up the tank with a shallow layer of water (around 1 cm deep) and place the screen or white paper underneath to clearly see the shadows of the ripples.</li>
      <li>Switch on the light and the vibration generator. The vibrating bar will create parallel ripples (wavefronts) on the water's surface.</li>
      <li>Adjust the frequency of the vibration generator until you get clear, evenly spaced waves.</li>
      <li>Mark two points on the screen beneath the tank showing several consecutive wavefronts (these appear as bright and dark lines).</li>
      <li>Measure the total distance across several waves using the ruler — this is the total length.</li>
      <li>Count the number of half wavelengths (each half wavelength is from the centre of one bright line to the next dark line).</li>
      <li>Calculate the wavelength (λ) using: <strong>Wavelength = Total Length / Number of Half Wavelengths ÷ 2</strong></li>
    </ol>
  </div>

  <div class="example-block">
    <h4>💬 Explanation:</h4>
    <ul>
      <li>Dividing by the number of half wavelengths gives the average half wavelength.</li>
      <li>Dividing by 2 converts this into the full wavelength.</li>
    </ul>
    <h4>📏 Example Calculation:</h4>
    <p>If the total measured length across 10 half wavelengths = 6.0 cm:</p>
    <p>Wavelength = 6.0 / 10 ÷ 2 = 0.3 cm</p>
    <p>Wavelength = 0.003 m</p>
  </div>

  <div class="example-block">
    <h4>Step 8-9:</h4>
    <ol start="8">
      <li>Find the frequency (f) using the reading from the signal generator (measured in hertz, Hz).</li>
      <li>Calculate the wave speed (v) using the equation: <strong>v = f × λ</strong></li>
    </ol>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 4 – Example Calculation of Wave Speed</h3>
  
  <div class="example-block">
    <h4>🧮 Example:</h4>
    <p>If the wavelength (λ) = 0.005 m and frequency (f) = 20 Hz, then:</p>
    <p>v = f × λ</p>
    <p>v = 20 × 0.005 = 0.1 m/s</p>
    <p><strong>✅ Wave speed = 0.1 m/s</strong></p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 5 – Improving Accuracy</h3>
  
  <div class="exam-tip-block">
    <h4>🧠 Tips to Reduce Error:</h4>
    <ul>
      <li>Measure across many waves to reduce random error.</li>
      <li>Use a stroboscope to make the ripples appear "frozen", so they're easier to measure.</li>
      <li>Keep the water depth constant, as changes in depth affect wave speed.</li>
      <li>Use a sharp ruler and measure from centre to centre of wavefronts for consistency.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 6 – Safety Precautions</h3>
  
  <div class="exam-tip-block">
    <h4>⚠️ Important:</h4>
    <ul>
      <li>Keep water and electrical equipment separate to prevent electric shocks.</li>
      <li>Dry your hands before touching the signal generator or wires.</li>
      <li>Stand up while working to quickly move away if water spills.</li>
    </ul>
  </div>
</div>
        `,
        canonical_keywords: [
          "ripple tank", "wave speed", "practical", "wavelength", "frequency",
          "wavefronts", "measurement", "experiment"
        ],
        practice_items: [
          {
            id: "p1",
            prompt_template: "Describe how to measure wavelength using a ripple tank.",
            marks: 4,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: ["measure", "distance", "several waves", "divide", "number of waves", "wavelength"]
          },
          {
            id: "p2",
            prompt_template: "A ripple tank experiment gives a wavelength of 0.004 m and frequency of 25 Hz. Calculate the wave speed.",
            marks: 3,
            type: "short-answer",
            difficulty: "easy",
            randomise: true,
            expected_keywords: ["v = f × λ", "0.1 m/s", "wave speed"]
          }
        ]
      },
      {
        id: "4-6-2-2-em-waves-properties",
        title: "4.6.2.2 – Properties of Electromagnetic Waves",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 1 – Behaviour of EM Waves at Boundaries</h3>
  
  <div class="definition-block">
    <h4>🌈 Definition:</h4>
    <p>When electromagnetic (EM) waves, such as light, hit a boundary between two materials, they can:</p>
    <ul>
      <li>1️⃣ Be reflected – bounce off the surface.</li>
      <li>2️⃣ Be absorbed – transfer their energy into the material.</li>
      <li>3️⃣ Be transmitted – pass through the material (sometimes changing speed or direction).</li>
    </ul>
  </div>

  <div class="key-facts-block">
    <h4>💡 Key Idea:</h4>
    <p>What happens depends on both the material and the wavelength of the wave:</p>
    <ul>
      <li>Glass transmits most visible light but absorbs ultraviolet (UV).</li>
      <li>Black surfaces absorb most visible light and convert it into heat.</li>
      <li>Metal surfaces reflect most electromagnetic radiation.</li>
    </ul>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Exam Tip:</h4>
    <p>When asked about "what happens to waves at boundaries", always mention reflection, absorption, and transmission as possible outcomes.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 2 – Dependence on Wavelength</h3>
  
  <div class="definition-block">
    <h4>🌊 Definition:</h4>
    <p>The way a material interacts with EM waves depends on the wavelength of the wave.</p>
  </div>

  <div class="example-block">
    <h4>💡 Examples:</h4>
    <ul>
      <li>Glass transmits visible light but absorbs UV and infrared.</li>
      <li>Microwaves pass through air but are absorbed by water molecules (this is how microwave ovens work).</li>
      <li>Radio waves reflect off the ionosphere, allowing long-distance communication.</li>
    </ul>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Idea:</h4>
    <p>Different wavelengths of the EM spectrum behave differently with materials because of their energy and frequency differences.</p>
  </div>

  <div class="example-block">
    <h4>📊 Summary Table:</h4>
    <table style="width:100%; border-collapse: collapse;">
      <tr>
        <th style="border: 1px solid; padding: 8px;">Wave Type</th>
        <th style="border: 1px solid; padding: 8px;">Interaction Example</th>
        <th style="border: 1px solid; padding: 8px;">Effect</th>
      </tr>
      <tr>
        <td style="border: 1px solid; padding: 8px;">Infrared</td>
        <td style="border: 1px solid; padding: 8px;">Absorbed by skin</td>
        <td style="border: 1px solid; padding: 8px;">Feels as heat</td>
      </tr>
      <tr>
        <td style="border: 1px solid; padding: 8px;">Visible Light</td>
        <td style="border: 1px solid; padding: 8px;">Transmitted through glass</td>
        <td style="border: 1px solid; padding: 8px;">Allows sight</td>
      </tr>
      <tr>
        <td style="border: 1px solid; padding: 8px;">UV</td>
        <td style="border: 1px solid; padding: 8px;">Absorbed by ozone</td>
        <td style="border: 1px solid; padding: 8px;">Causes sunburn</td>
      </tr>
      <tr>
        <td style="border: 1px solid; padding: 8px;">X-rays</td>
        <td style="border: 1px solid; padding: 8px;">Transmitted through soft tissue, absorbed by bone</td>
        <td style="border: 1px solid; padding: 8px;">Medical imaging</td>
      </tr>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 3 – Refraction of EM Waves</h3>
  
  <div class="definition-block">
    <h4>💡 Definition:</h4>
    <p>Refraction occurs when EM waves change speed as they pass from one medium to another, causing them to bend.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Concept:</h4>
    <ul>
      <li>When a wave slows down, it bends towards the normal.</li>
      <li>When a wave speeds up, it bends away from the normal.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>💬 Example:</h4>
    <p>Light travels slower in glass than in air, so it bends towards the normal when entering the glass and away from the normal when leaving.</p>
  </div>

  <div class="key-facts-block">
    <h4>📏 Why Speed Changes:</h4>
    <p>The velocity of EM waves depends on the density of the material and the way it interacts with the wave's electric and magnetic fields.</p>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Exam Tip:</h4>
    <p>Refraction does not change the wave's frequency — only its speed and wavelength.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 4 – Wavefront Diagrams and Refraction</h3>
  
  <div class="definition-block">
    <h4>📘 Wavefront Definition:</h4>
    <p>A wavefront is a line joining all points in a wave that are at the same stage of vibration (for example, all crests).</p>
  </div>

  <div class="key-facts-block">
    <h4>💡 Explanation:</h4>
    <p>When a wavefront crosses into a new medium:</p>
    <ul>
      <li>The part that enters first slows down (if entering a denser medium).</li>
      <li>The rest of the wave continues faster for a short time.</li>
      <li>This causes the wavefront to bend, changing the direction of the wave.</li>
    </ul>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Relationship:</h4>
    <p><strong>v = f × λ</strong></p>
    <ul>
      <li>Frequency (f) stays the same.</li>
      <li>If v decreases (wave slows down), λ also decreases (wavelength shortens).</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>💬 Example:</h4>
    <p>Light entering glass → wavefronts get closer together because the speed and wavelength decrease.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 5 – Real-Life Applications of Refraction</h3>
  
  <div class="example-block">
    <h4>💡 Examples:</h4>
    <ul>
      <li>Lenses use refraction to focus light and form images (used in glasses, cameras, and microscopes).</li>
      <li>Prisms refract different wavelengths by different amounts, separating white light into colours (dispersion).</li>
      <li>Atmospheric refraction causes the Sun to appear slightly higher in the sky than it really is at sunrise and sunset.</li>
    </ul>
  </div>
</div>
        `,
        canonical_keywords: [
          "electromagnetic waves", "EM waves", "refraction", "reflection", "absorption",
          "transmission", "wavelength", "boundary", "wavefront"
        ],
        practice_items: [
          {
            id: "p1",
            prompt_template: "Explain what happens to electromagnetic waves when they meet a boundary between two materials.",
            marks: 3,
            type: "short-answer",
            difficulty: "easy",
            randomise: true,
            expected_keywords: ["reflection", "absorption", "transmission", "boundary", "materials"]
          },
          {
            id: "p2",
            prompt_template: "Describe what refraction is and explain why it happens.",
            marks: 4,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: ["refraction", "bending", "speed changes", "medium", "direction"]
          }
        ]
      },
      {
        id: "4-6-1-5-waves-detection-exploration",
        title: "4.6.1.5 – Waves for Detection and Exploration",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 1 – Overview: Using Waves to Explore Hidden Structures</h3>
  
  <div class="definition-block">
    <h4>🌊 Definition:</h4>
    <p>Some types of waves can be used to detect, image, or measure structures that are not visible — such as the inside of the body, metal objects, or Earth's interior.</p>
  </div>

  <div class="key-facts-block">
    <h4>💡 Key Idea:</h4>
    <p>This is possible because waves behave differently when they meet boundaries between materials:</p>
    <ul>
      <li>They may be reflected, absorbed, or transmitted, and</li>
      <li>Their speed and direction change depending on the material.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>📘 Examples of Uses:</h4>
    <ul>
      <li>1️⃣ Ultrasound – medical and industrial imaging.</li>
      <li>2️⃣ Seismic waves – studying the Earth's structure.</li>
      <li>3️⃣ Echo sounding – measuring sea depth and detecting underwater objects.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 2 – Ultrasound Waves</h3>
  
  <div class="definition-block">
    <h4>🔊 Definition:</h4>
    <p>Ultrasound waves are sound waves with a frequency higher than 20 kHz, which is above the upper limit of human hearing.</p>
  </div>

  <div class="key-facts-block">
    <h4>💡 Key Idea:</h4>
    <p>When ultrasound waves hit a boundary between two different materials (e.g. tissue and bone, or metal and air):</p>
    <ul>
      <li>Part of the wave is reflected.</li>
      <li>Part of the wave is transmitted.</li>
    </ul>
    <p>By measuring the time delay between the emitted wave and the reflected echo, the distance to the boundary can be calculated.</p>
  </div>

  <div class="key-facts-block">
    <h4>📏 Equation Used:</h4>
    <p><strong>Distance = (Speed × Time) / 2</strong></p>
    <p>(The time is halved because the wave travels to the boundary and back.)</p>
  </div>

  <div class="example-block">
    <h4>💬 Applications of Ultrasound:</h4>
    <table style="width:100%; border-collapse: collapse;">
      <tr>
        <th style="border: 1px solid; padding: 8px;">Use</th>
        <th style="border: 1px solid; padding: 8px;">Description</th>
      </tr>
      <tr>
        <td style="border: 1px solid; padding: 8px;">Medical Imaging</td>
        <td style="border: 1px solid; padding: 8px;">Used to produce 2D or 3D images of soft tissues and unborn babies. Safe because it's non-ionising.</td>
      </tr>
      <tr>
        <td style="border: 1px solid; padding: 8px;">Industrial Imaging</td>
        <td style="border: 1px solid; padding: 8px;">Used to detect cracks or flaws inside metal objects — if a reflection occurs before the expected time, it shows a hidden defect.</td>
      </tr>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Why Ultrasound Is Useful:</h4>
    <ul>
      <li>✅ Non-invasive and safe for tissues.</li>
      <li>✅ Can detect soft-tissue structures invisible to X-rays.</li>
      <li>✅ Provides real-time imaging.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>📘 Example:</h4>
    <p>An ultrasound wave takes 0.0004 s to reflect from a boundary inside the body.</p>
    <p>If the speed of sound in tissue = 1600 m/s:</p>
    <p>Distance = (1600 × 0.0004) / 2 = 0.32 m</p>
    <p><strong>✅ The boundary is 0.32 m deep.</strong></p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 3 – Seismic Waves (Earthquake Waves)</h3>
  
  <div class="definition-block">
    <h4>🌍 Definition:</h4>
    <p>Seismic waves are produced by earthquakes and travel through the Earth.</p>
    <p>They help scientists (seismologists) understand the structure and composition of the Earth's interior.</p>
  </div>

  <div class="key-facts-block">
    <h4>📘 Two Main Types:</h4>
    <table style="width:100%; border-collapse: collapse;">
      <tr>
        <th style="border: 1px solid; padding: 8px;">Type</th>
        <th style="border: 1px solid; padding: 8px;">Wave Type</th>
        <th style="border: 1px solid; padding: 8px;">Travels Through</th>
        <th style="border: 1px solid; padding: 8px;">Speed</th>
        <th style="border: 1px solid; padding: 8px;">Key Properties</th>
      </tr>
      <tr>
        <td style="border: 1px solid; padding: 8px;">P-waves (Primary waves)</td>
        <td style="border: 1px solid; padding: 8px;">Longitudinal</td>
        <td style="border: 1px solid; padding: 8px;">Solids and liquids</td>
        <td style="border: 1px solid; padding: 8px;">Fast</td>
        <td style="border: 1px solid; padding: 8px;">Travel faster and arrive first</td>
      </tr>
      <tr>
        <td style="border: 1px solid; padding: 8px;">S-waves (Secondary waves)</td>
        <td style="border: 1px solid; padding: 8px;">Transverse</td>
        <td style="border: 1px solid; padding: 8px;">Solids only (not liquids)</td>
        <td style="border: 1px solid; padding: 8px;">Slower</td>
        <td style="border: 1px solid; padding: 8px;">Cannot travel through liquids</td>
      </tr>
    </table>
  </div>

  <div class="key-facts-block">
    <h4>💡 How Seismic Waves Reveal Earth's Structure:</h4>
    <ul>
      <li>P-waves travel through both solids and liquids → show that the outer core is not completely solid.</li>
      <li>S-waves cannot pass through liquids, creating an S-wave shadow zone, which reveals that the outer core is liquid.</li>
      <li>The bending (refraction) of P-waves at boundaries indicates that the inner core is solid.</li>
    </ul>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Discoveries from Seismic Data:</h4>
    <ul>
      <li>✅ The Earth has a solid inner core, liquid outer core, and solid mantle.</li>
      <li>✅ Shadow zones (where waves are not detected) helped scientists map these layers.</li>
    </ul>
  </div>

  <div class="exam-tip-block">
    <h4>💬 Exam Tip:</h4>
    <p>Always mention that seismic evidence provided new knowledge about parts of the Earth that cannot be directly observed.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 4 – Echo Sounding (Sonar)</h3>
  
  <div class="definition-block">
    <h4>🚢 Definition:</h4>
    <p>Echo sounding is the use of high-frequency sound waves to detect underwater objects or measure depth in oceans and lakes.</p>
  </div>

  <div class="key-facts-block">
    <h4>💡 How It Works:</h4>
    <ol>
      <li>A ship emits a short pulse of high-frequency sound (ultrasound).</li>
      <li>The sound travels through water, reflects off the seabed or object, and returns as an echo.</li>
      <li>The time taken for the echo to return is measured.</li>
      <li>The depth is calculated using: <strong>Depth = (Speed of sound in water × Time) / 2</strong></li>
    </ol>
  </div>

  <div class="example-block">
    <h4>📘 Example:</h4>
    <p>If the echo returns in 0.12 s and the speed of sound in water = 1500 m/s:</p>
    <p>Depth = (1500 × 0.12) / 2 = 90 m</p>
    <p><strong>✅ The water is 90 metres deep.</strong></p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Applications:</h4>
    <ul>
      <li>Mapping the ocean floor.</li>
      <li>Detecting submarines, shipwrecks, and fish shoals.</li>
      <li>Measuring depth for safe navigation.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 5 – Comparison of Ultrasound, Seismic, and Echo Sounding</h3>
  
  <div class="key-facts-block">
    <table style="width:100%; border-collapse: collapse;">
      <tr>
        <th style="border: 1px solid; padding: 8px;">Type</th>
        <th style="border: 1px solid; padding: 8px;">Wave Type</th>
        <th style="border: 1px solid; padding: 8px;">Frequency Range</th>
        <th style="border: 1px solid; padding: 8px;">Medium</th>
        <th style="border: 1px solid; padding: 8px;">Used For</th>
      </tr>
      <tr>
        <td style="border: 1px solid; padding: 8px;">Ultrasound</td>
        <td style="border: 1px solid; padding: 8px;">Sound (longitudinal)</td>
        <td style="border: 1px solid; padding: 8px;">Above 20 kHz</td>
        <td style="border: 1px solid; padding: 8px;">Solids & liquids</td>
        <td style="border: 1px solid; padding: 8px;">Medical and industrial imaging</td>
      </tr>
      <tr>
        <td style="border: 1px solid; padding: 8px;">Seismic Waves</td>
        <td style="border: 1px solid; padding: 8px;">P = longitudinal, S = transverse</td>
        <td style="border: 1px solid; padding: 8px;">Very low (below 20 Hz)</td>
        <td style="border: 1px solid; padding: 8px;">Through Earth</td>
        <td style="border: 1px solid; padding: 8px;">Studying Earth's structure</td>
      </tr>
      <tr>
        <td style="border: 1px solid; padding: 8px;">Echo Sounding</td>
        <td style="border: 1px solid; padding: 8px;">Sound (longitudinal)</td>
        <td style="border: 1px solid; padding: 8px;">High frequency</td>
        <td style="border: 1px solid; padding: 8px;">Water</td>
        <td style="border: 1px solid; padding: 8px;">Measuring sea depth or detecting underwater objects</td>
      </tr>
    </table>
  </div>
</div>
        `,
        canonical_keywords: [
          "ultrasound", "seismic waves", "echo sounding", "sonar", "P-waves", "S-waves",
          "detection", "exploration", "imaging", "Earth structure"
        ],
        practice_items: [
          {
            id: "p1",
            prompt_template: "Explain how ultrasound is used in medical imaging.",
            marks: 4,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: ["ultrasound", "reflects", "boundary", "time delay", "distance", "image", "safe"]
          },
          {
            id: "p2",
            prompt_template: "Describe the difference between P-waves and S-waves.",
            marks: 4,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: ["P-waves", "longitudinal", "solids", "liquids", "S-waves", "transverse", "solids only"]
          },
          {
            id: "p3",
            prompt_template: "An echo from the seabed returns after 0.2 s. If sound travels at 1500 m/s in water, calculate the depth.",
            marks: 3,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: ["distance = speed × time / 2", "150 m", "depth"]
          }
        ]
      }
    ]
  },
  {
    id: "magnetism",
    title: "Magnetism and Electromagnetism",
    status: "ready",
    subsections: [
      {
        id: "4-7-1-magnetism-fields",
        title: "4.7.1 Magnetism and Magnetic Fields",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Basics</h3>
  <p>Permanent and induced magnetism; field lines from North to South; strongest at poles.</p>
</div>
        `,
        canonical_keywords:["magnet","magnetic field","permanent","induced","field lines","poles"],
        practice_items:[
          { id:"p1", prompt_template:"Describe how to show the pattern of a magnetic field around a bar magnet.", marks:2, type:"short-answer", difficulty:"easy", randomise:true, expected_keywords:["iron filings","compass","field lines"]}
        ]
      },
      {
        id: "4-7-2-electromagnetism-motor-effect",
        title: "4.7.2 Electromagnetism and the Motor Effect",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Key Ideas</h3>
  <p>Current in a wire produces a magnetic field. In a magnetic field, a current-carrying conductor experiences a force (motor effect). Fleming’s left-hand rule predicts force direction.</p>
</div>
        `,
        canonical_keywords:["electromagnetism","motor effect","Fleming","left-hand rule","current","magnetic field","force"],
        practice_items:[
          { id:"p2", prompt_template:"State two ways to increase the force on a current-carrying conductor in a magnetic field.", marks:2, type:"short-answer", difficulty:"easy", randomise:true, expected_keywords:["increase current","stronger field","length of conductor","angle"]}
        ]
      }
    ]
  },
  {
    id: "space-physics",
    title: "Space Physics",
    status: "ready",
    subsections: [
      {
        id: "4-8-1-solar-system-orbits",
        title: "4.8.1 The Solar System and Orbits",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Orbits</h3>
  <p>Planets orbit the Sun in near-circular orbits due to gravity. For a stable orbit, higher orbital speed is needed for smaller orbital radius.</p>
</div>
        `,
        canonical_keywords:["orbit","gravity","orbital speed","radius","planets","Sun"],
        practice_items:[
          { id:"p1", prompt_template:"Explain how orbital speed changes with orbital radius for a stable orbit.", marks:2, type:"short-answer", difficulty:"easy", randomise:true, expected_keywords:["smaller radius","higher speed","gravity","centripetal"]}
        ]
      },
      {
        id: "4-8-2-stars-and-universe",
        title: "4.8.2 Life Cycle of Stars and the Universe",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Key Ideas</h3>
  <p>Life cycle: nebula → protostar → main sequence → red giant/supergiant → white dwarf/ neutron star/ black hole. Red-shift of distant galaxies suggests the Universe is expanding (Big Bang model).</p>
</div>
        `,
        canonical_keywords:["star","life cycle","red-shift","Big Bang","expanding universe","galaxies"],
        practice_items:[
          { id:"p2", prompt_template:"Describe what red-shift tells us about distant galaxies.", marks:2, type:"short-answer", difficulty:"easy", randomise:true, expected_keywords:["moving away","wavelength increases","expanding universe"]}
        ]
      }
    ]
  },
];
