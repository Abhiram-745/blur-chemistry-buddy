// GCSE AQA Chemistry - 8 Base Topics
// Topic 1 is fully populated with user's revision notes
// Topics 2-8 show "Nothing here — please wait for update" placeholder

export interface PracticeItem {
  id: string;
  prompt_template: string;
  marks: number; // How many marks this question is worth
  type: "open" | "short-answer" | "mcq";
  difficulty: "easy" | "medium" | "hard";
  randomise: boolean;
  expected_keywords: string[]; // Keywords specific to this question
  feedback_guidance?: { // Optional - for personalized feedback
    // What to mention if certain keywords are found/missing
    topic_coverage: {
      topic: string;
      required_keywords: string[];
      feedback_if_missing: string;
      feedback_if_partial: string;
    }[];
  };
}

export interface Subsection {
  id: string;
  title: string;
  type: "content" | "practice-group";
  content_html: string;
  canonical_keywords: string[];
  practice_items: PracticeItem[];
  study_group?: number; // Group 2-3 subsections together for studying
}

export interface TopicSection {
  id: string;
  title: string;
  status: "ready" | "coming_soon";
  subsections: Subsection[];
}

export const sectionsData: TopicSection[] = [
  {
    id: "atomic-structure",
    title: "Atomic structure & periodic table",
    status: "ready",
    subsections: [
      {
        id: "1-1-1-atoms-elements-compounds",
        title: "1.1.1 ATOMS, ELEMENTS AND COMPOUNDS",
        type: "content",
        study_group: 1, // Study with 1.1.2
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – What is an Atom?</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>An atom is the smallest particle of an element that can exist. Every atom consists of a nucleus (containing protons and neutrons) and electrons arranged in shells around it.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Facts</h4>
    <ul>
      <li>All substances are made of atoms.</li>
      <li>Atoms are neutral overall (same number of protons and electrons).</li>
      <li>The atom's nucleus makes up almost all of its mass.</li>
      <li>Atoms are incredibly small — radius ≈ 0.1 nanometres (1 × 10⁻¹⁰ m).</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🟢 Example</h4>
    <p>A single atom of hydrogen (H) has: 1 proton, 0 neutrons, 1 electron.</p>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Exam Tip</h4>
    <p>When asked "What is an atom?", always include: ✅ smallest part of an element and ✅ that can exist.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – What is an Element?</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>An element is a pure substance that contains only one type of atom.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Points</h4>
    <ul>
      <li>Each element is represented by a chemical symbol (e.g. O for oxygen, Na for sodium).</li>
      <li>There are about 100 known elements, shown in the Periodic Table.</li>
      <li>Elements can be classified as metals or non-metals depending on properties.</li>
      <li>The periodic table arranges elements by increasing atomic number (number of protons).</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🟢 Examples</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Element</th>
          <th>Symbol</th>
          <th>Metal/Non-metal</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Hydrogen</td>
          <td>H</td>
          <td>Non-metal</td>
          <td>Lightest element</td>
        </tr>
        <tr>
          <td>Sodium</td>
          <td>Na</td>
          <td>Metal</td>
          <td>Reactive Group 1 element</td>
        </tr>
        <tr>
          <td>Chlorine</td>
          <td>Cl</td>
          <td>Non-metal</td>
          <td>Poisonous green gas</td>
        </tr>
        <tr>
          <td>Iron</td>
          <td>Fe</td>
          <td>Metal</td>
          <td>Forms rust (iron oxide)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Exam Tip</h4>
    <p>If asked to "define an element", always mention atoms are all the same type.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – What is a Compound?</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>A compound is a substance formed when two or more elements are chemically bonded together in fixed proportions.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Points</h4>
    <ul>
      <li>Compounds contain more than one type of atom.</li>
      <li>They can only be separated by chemical reactions, not physical methods.</li>
      <li>The properties of a compound are different from those of the elements it's made from.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🟢 Examples</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Compound</th>
          <th>Elements Involved</th>
          <th>Type of Bond</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Water (H₂O)</td>
          <td>Hydrogen + Oxygen</td>
          <td>Covalent</td>
          <td>Liquid at room temp</td>
        </tr>
        <tr>
          <td>Sodium Chloride (NaCl)</td>
          <td>Sodium + Chlorine</td>
          <td>Ionic</td>
          <td>Solid salt crystals</td>
        </tr>
        <tr>
          <td>Carbon Dioxide (CO₂)</td>
          <td>Carbon + Oxygen</td>
          <td>Covalent</td>
          <td>Colourless gas</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Exam Tip</h4>
    <p>Use "chemically joined" not "mixed" — compounds involve bonding, mixtures don't.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Naming Rules for Compounds</h3>
  
  <div class="definition-block">
    <h4>🔵 Basic Rules</h4>
    <ul>
      <li><strong>Metal + Non-Metal = Ionic Compound</strong> - Ending changes to "-ide". Example: Sodium + Chlorine → Sodium Chloride</li>
      <li><strong>If Oxygen is Included → "-ate"</strong> - Example: Copper + Sulfur + Oxygen → Copper Sulfate</li>
      <li><strong>Non-Metals Only = Covalent Compound</strong> - Use prefixes to show number of atoms: mono = 1, di = 2, tri = 3, tetra = 4. Example: CO₂ = Carbon Dioxide</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🟢 Examples</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Formula</th>
          <th>Name</th>
          <th>Type of Compound</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>NaCl</td>
          <td>Sodium Chloride</td>
          <td>Ionic</td>
        </tr>
        <tr>
          <td>H₂O</td>
          <td>Water</td>
          <td>Covalent</td>
        </tr>
        <tr>
          <td>MgO</td>
          <td>Magnesium Oxide</td>
          <td>Ionic</td>
        </tr>
        <tr>
          <td>CO</td>
          <td>Carbon Monoxide</td>
          <td>Covalent</td>
        </tr>
        <tr>
          <td>CuSO₄</td>
          <td>Copper Sulfate</td>
          <td>Ionic</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Exam Tip</h4>
    <p>Always check for oxygen — it's the clue for "-ate".</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Writing Formulae and Equations</h3>
  
  <div class="definition-block">
    <h4>🔵 Step 1: Write the Symbols</h4>
    <p>Identify each element and write its symbol. Example: Sodium reacts with chlorine → Na + Cl.</p>
  </div>

  <div class="definition-block">
    <h4>🔵 Step 2: Balance the Charges</h4>
    <p>Combine ions so total charge = 0.</p>
    <table class="data-table">
      <thead>
        <tr>
          <th>Ion</th>
          <th>Charge</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Na⁺</td>
          <td>+1</td>
        </tr>
        <tr>
          <td>Cl⁻</td>
          <td>–1</td>
        </tr>
      </tbody>
    </table>
    <p>→ NaCl (charges cancel)</p>
  </div>

  <div class="definition-block">
    <h4>🔵 Step 3: Write the Formula</h4>
    <p>Combine elements in the correct ratio.</p>
    <p><strong>Examples:</strong></p>
    <ul>
      <li>Magnesium Oxide = Mg²⁺ + O²⁻ → MgO</li>
      <li>Calcium Chloride = Ca²⁺ + 2Cl⁻ → CaCl₂</li>
    </ul>
  </div>

  <div class="warning-block">
    <h4>🔴 Balanced Chemical Equation</h4>
    <p><strong>Example:</strong> 2Na + Cl₂ → 2NaCl (always ensure same number of atoms each side)</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Word Equation</h4>
    <p><strong>Example:</strong> Sodium + Chlorine → Sodium Chloride</p>
  </div>

  <div class="example-block">
    <h4>🟢 State Symbols</h4>
    <ul>
      <li>(s) = solid</li>
      <li>(l) = liquid</li>
      <li>(g) = gas</li>
      <li>(aq) = aqueous solution</li>
    </ul>
    <p><strong>Example with states:</strong> 2Na (s) + Cl₂ (g) → 2NaCl (s)</p>
  </div>
</div>
        `,
        canonical_keywords: [
          "atom", "nucleus", "proton", "neutron", "electron", "shells",
          "element", "chemical symbol", "periodic table", "metal", "non-metal",
          "compound", "chemical bond", "formula", "ionic", "covalent",
          "naming compounds", "-ide", "-ate", "balanced equation", "state symbols"
        ],
        practice_items: [
          {
            id: "p1",
            prompt_template: "Define what an atom is and describe its basic structure.",
            marks: 4,
            type: "short-answer",
            difficulty: "easy",
            randomise: true,
            expected_keywords: [
              "smallest particle", "element", "exist", "nucleus", "proton", "neutron", "electron", "shells"
            ],
            feedback_guidance: {
              topic_coverage: [
                {
                  topic: "Atom definition",
                  required_keywords: ["smallest", "particle", "element", "exist"],
                  feedback_if_missing: "You need to define what an atom is: the **smallest particle of an element that can exist**.",
                  feedback_if_partial: "Your definition is incomplete. Make sure to state it's the smallest particle of an element that can exist."
                },
                {
                  topic: "Atomic structure",
                  required_keywords: ["nucleus", "proton", "neutron", "electron", "shells"],
                  feedback_if_missing: "Describe the atomic structure: a **nucleus** containing protons and neutrons, with **electrons** arranged in shells around it.",
                  feedback_if_partial: "Add more detail about the structure - mention the nucleus contains protons and neutrons, and electrons are in shells."
                }
              ]
            }
          },
          {
            id: "p2",
            prompt_template: "State the definition of an element. Give two examples of elements with their chemical symbols and state whether each is a metal or non-metal.",
            marks: 5,
            type: "short-answer",
            difficulty: "easy",
            randomise: true,
            expected_keywords: [
              "pure substance", "one type", "atom", "symbol", "metal", "non-metal", "sodium", "hydrogen", "chlorine", "iron", "oxygen"
            ],
            feedback_guidance: {
              topic_coverage: [
                {
                  topic: "Element definition",
                  required_keywords: ["pure", "substance", "one type", "atom"],
                  feedback_if_missing: "Start with the definition: an element is a **pure substance that contains only one type of atom**.",
                  feedback_if_partial: "Your definition needs both parts: 'pure substance' AND 'contains only one type of atom'."
                },
                {
                  topic: "Element examples with classification",
                  required_keywords: ["symbol", "metal", "non-metal"],
                  feedback_if_missing: "Provide **two specific examples** with their symbols (e.g., Sodium, Na, metal; Oxygen, O, non-metal).",
                  feedback_if_partial: "Each example needs: the element name, its symbol, AND whether it's a metal or non-metal."
                }
              ]
            }
          },
          {
            id: "p3",
            prompt_template: "A hydrogen atom has 1 proton, 0 neutrons and 1 electron. Explain why atoms are described as neutral.",
            marks: 2,
            type: "short-answer",
            difficulty: "easy",
            randomise: true,
            expected_keywords: [
              "neutral", "protons", "electrons", "same number", "equal", "charge"
            ],
            feedback_guidance: {
              topic_coverage: [
                {
                  topic: "Neutral atoms",
                  required_keywords: ["protons", "electrons", "same", "equal"],
                  feedback_if_missing: "Explain that atoms are neutral because they have the **same number of protons and electrons**.",
                  feedback_if_partial: "Make sure to state that the number of protons equals the number of electrons, which makes the overall charge zero/neutral."
                }
              ]
            }
          },
          {
            id: "p4",
            prompt_template: "Define an element and give one example with its symbol.",
            marks: 3,
            type: "short-answer",
            difficulty: "easy",
            randomise: true,
            expected_keywords: [
              "element", "pure substance", "one type of atom", "symbol"
            ],
            feedback_guidance: {
              topic_coverage: [
                {
                  topic: "Element definition",
                  required_keywords: ["pure", "one type"],
                  feedback_if_missing: "Your definition should state that an element is a **pure substance** containing only **one type of atom**.",
                  feedback_if_partial: "Make sure both parts are clear: 'pure substance' AND 'one type of atom'."
                },
                {
                  topic: "Example with symbol",
                  required_keywords: ["symbol"],
                  feedback_if_missing: "You must provide a **specific example** with its chemical symbol (e.g., 'Oxygen, symbol O' or 'Sodium, symbol Na').",
                  feedback_if_partial: "Include both the element name and its symbol together."
                }
              ]
            }
          },
          {
            id: "p5",
            prompt_template: "State the difference between an element and a compound.",
            marks: 4,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: [
              "element", "one type", "compound", "two or more", "chemically bonded", "fixed proportions"
            ],
            feedback_guidance: {
              topic_coverage: [
                {
                  topic: "Element characteristics",
                  required_keywords: ["one type", "atom"],
                  feedback_if_missing: "Clearly state what makes an **element**: contains only one type of atom.",
                  feedback_if_partial: "Be more explicit that elements have one type of atom only."
                },
                {
                  topic: "Compound characteristics",
                  required_keywords: ["two or more", "chemically bonded", "fixed"],
                  feedback_if_missing: "Explain that **compounds** contain two or more elements that are chemically bonded in fixed proportions.",
                  feedback_if_partial: "Emphasize the key difference: compounds involve **chemical bonding** and **fixed proportions**, not just mixing."
                }
              ]
            }
          },
          {
            id: "p6",
            prompt_template: "Explain how to write a formula for an ionic compound (example NaCl).",
            marks: 5,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: [
              "ions", "charge", "balance", "metal", "non-metal", "positive", "negative", "formula"
            ],
            feedback_guidance: {
              topic_coverage: [
                {
                  topic: "Ion charges",
                  required_keywords: ["charge", "positive", "negative", "balance"],
                  feedback_if_missing: "Start by explaining that you need to **balance the charges** of the ions. Metal ions are positive (e.g., Na⁺ is +1) and non-metal ions are negative (e.g., Cl⁻ is -1).",
                  feedback_if_partial: "Be more specific about charge balancing. Explain that the total charge must equal zero, so you combine ions in the right ratio."
                },
                {
                  topic: "Writing the formula",
                  required_keywords: ["formula", "ratio"],
                  feedback_if_missing: "Explain the process: write the symbols, determine the charges, then combine in the correct ratio so charges cancel out. For NaCl: Na⁺ + Cl⁻ → NaCl (charges +1 and -1 cancel).",
                  feedback_if_partial: "Use the NaCl example to demonstrate: show that Na⁺ (+1) and Cl⁻ (-1) combine in a 1:1 ratio because the charges cancel."
                }
              ]
            }
          },
          {
            id: "p7",
            prompt_template: "Give the naming rule for compounds containing oxygen.",
            marks: 2,
            type: "short-answer",
            difficulty: "easy",
            randomise: true,
            expected_keywords: [
              "oxygen", "-ate", "ending", "sulfate", "carbonate", "nitrate"
            ],
            feedback_guidance: {
              topic_coverage: [
                {
                  topic: "Naming rule",
                  required_keywords: ["oxygen", "-ate"],
                  feedback_if_missing: "State the rule clearly: **when a compound contains oxygen, the name ends in '-ate'**.",
                  feedback_if_partial: "Be more explicit: compounds with oxygen end in '-ate'."
                },
                {
                  topic: "Examples",
                  required_keywords: ["sulfate", "carbonate", "nitrate"],
                  feedback_if_missing: "Include **examples** like copper sulfate (CuSO₄), calcium carbonate (CaCO₃), or sodium nitrate (NaNO₃).",
                  feedback_if_partial: "Add at least one specific example with its formula to illustrate the rule."
                }
              ]
            }
          }
        ]
      },
      {
        id: "1-1-2-mixtures",
        title: "1.1.2 MIXTURES",
        type: "content",
        study_group: 1, // Study with 1.1.1
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 1 – What Is a Mixture?</h3>
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>A mixture is a combination of two or more substances (elements or compounds) that are not chemically bonded together.</p>
  </div>
  <div class="key-facts-block">
    <h4>🧠 Key Points</h4>
    <ul>
      <li>Substances in a mixture keep their original properties.</li>
      <li>Mixtures can be easily separated by physical methods, not chemical reactions.</li>
      <li>The composition of a mixture is not fixed — it can vary.</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>🟢 Examples</h4>
    <table class="data-table">
      <thead>
        <tr><th>Mixture</th><th>Components</th><th>How They're Separated</th></tr>
      </thead>
      <tbody>
        <tr><td>Air</td><td>Nitrogen, oxygen, carbon dioxide</td><td>Fractional distillation of liquid air</td></tr>
        <tr><td>Sea water</td><td>Water, dissolved salts</td><td>Distillation or crystallisation</td></tr>
        <tr><td>Sand and salt</td><td>Sand, sodium chloride</td><td>Filtration + crystallisation</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">💎 Subsection 2 – Filtration (Insoluble Solid from Liquid)</h3>
  <div class="definition-block">
    <h4>🧪 Purpose</h4>
    <p>To separate an insoluble solid (that doesn't dissolve) from a liquid.</p>
  </div>
  <div class="key-facts-block">
    <h4>⚙️ Apparatus</h4>
    <ul>
      <li>Beaker</li>
      <li>Funnel</li>
      <li>Filter paper</li>
      <li>Stirring rod</li>
    </ul>
  </div>
  <div class="key-facts-block">
    <h4>🧩 Step-by-Step Method</h4>
    <ol>
      <li>1️⃣ Fold the filter paper into a cone and place it inside the funnel.</li>
      <li>2️⃣ Place the funnel into a clean beaker.</li>
      <li>3️⃣ Pour the mixture slowly through the filter paper.</li>
      <li>4️⃣ The liquid (filtrate) passes through the paper.</li>
      <li>5️⃣ The solid (residue) remains trapped on the paper.</li>
    </ol>
  </div>
  <div class="key-facts-block">
    <h4>🔍 Scientific Explanation</h4>
    <ul>
      <li>Filter paper has tiny pores that allow liquid and dissolved substances through but trap large particles.</li>
      <li>No new substances are formed → physical process only.</li>
    </ul>
  </div>
  <div class="exam-tip-block">
    <h4>🧠 Common Exam Tip</h4>
    <p>Always name both the filtrate and the residue in your answer — they're both mark points.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">❄️ Subsection 3 – Crystallisation (Soluble Solid from Solution)</h3>
  <div class="definition-block">
    <h4>🧪 Purpose</h4>
    <p>Used to obtain pure crystals of a soluble solid (solute) from a solution.</p>
  </div>
  <div class="key-facts-block">
    <h4>⚙️ Apparatus</h4>
    <ul>
      <li>Evaporating basin</li>
      <li>Tripod and gauze</li>
      <li>Bunsen burner</li>
      <li>Beaker (for hot water bath if needed)</li>
    </ul>
  </div>
  <div class="key-facts-block">
    <h4>🧩 Step-by-Step Method</h4>
    <ol>
      <li>1️⃣ Pour the solution (e.g. salt water) into an evaporating basin.</li>
      <li>2️⃣ Heat gently with a Bunsen burner (or water bath) to evaporate some of the solvent.</li>
      <li>3️⃣ Stop heating when crystals start to form at the edge of the basin (this shows the solution is concentrated).</li>
      <li>4️⃣ Leave the solution to cool slowly at room temperature — as temperature falls, solubility decreases, and crystals form.</li>
      <li>5️⃣ Filter out the crystals and dry them using filter paper or a warm oven.</li>
    </ol>
  </div>
  <div class="key-facts-block">
    <h4>🔍 Scientific Explanation</h4>
    <ul>
      <li>Heating removes solvent (usually water) → increases concentration.</li>
      <li>Cooling allows solid particles to form a regular crystal lattice as solubility decreases.</li>
    </ul>
  </div>
  <div class="warning-block">
    <h4>⚠️ Safety Note</h4>
    <p>Avoid boiling all the water away — this can decompose the salt or make crystals impure.</p>
  </div>
  <div class="exam-tip-block">
    <h4>🧠 Common Exam Tip</h4>
    <p>Always mention "heat gently" and "allow to cool slowly" — both are AQA keywords for full marks.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">💨 Subsection 4 – Simple Distillation (Solvent from Solution)</h3>
  <div class="definition-block">
    <h4>🧪 Purpose</h4>
    <p>To separate a liquid (solvent) from a solution, e.g. getting pure water from saltwater.</p>
  </div>
  <div class="key-facts-block">
    <h4>⚙️ Apparatus</h4>
    <ul>
      <li>Round-bottomed flask</li>
      <li>Thermometer</li>
      <li>Condenser (Liebig condenser)</li>
      <li>Heat source (Bunsen burner)</li>
      <li>Beaker (to collect distillate)</li>
    </ul>
  </div>
  <div class="key-facts-block">
    <h4>🧩 Step-by-Step Method</h4>
    <ol>
      <li>1️⃣ Place the solution (e.g. saltwater) in the distillation flask.</li>
      <li>2️⃣ Heat gently — the liquid with the lowest boiling point (water) evaporates first.</li>
      <li>3️⃣ Vapour travels through the condenser, which is cooled by water circulating around it.</li>
      <li>4️⃣ Vapour condenses back to liquid and is collected in the beaker (called the distillate).</li>
      <li>5️⃣ The solute (e.g. salt) remains in the flask.</li>
    </ol>
  </div>
  <div class="key-facts-block">
    <h4>🔍 Scientific Explanation</h4>
    <ul>
      <li>Separation is based on different boiling points.</li>
      <li>Condensation happens because cold water enters at the bottom of the condenser and leaves at the top, ensuring efficient cooling.</li>
    </ul>
  </div>
  <div class="exam-tip-block">
    <h4>🧠 Common Exam Tip</h4>
    <p>Label "distillate" (collected liquid) and "residue" (left in flask) correctly in diagrams — AQA often awards marks for this.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🌡 Subsection 5 – Fractional Distillation (Mixture of Liquids)</h3>
  <div class="definition-block">
    <h4>🧪 Purpose</h4>
    <p>Used to separate two or more miscible liquids (liquids that mix completely), such as ethanol and water or liquid air.</p>
  </div>
  <div class="key-facts-block">
    <h4>⚙️ Apparatus</h4>
    <ul>
      <li>Round-bottomed flask</li>
      <li>Fractionating column (glass beads inside to increase surface area)</li>
      <li>Thermometer</li>
      <li>Condenser</li>
      <li>Beaker(s)</li>
    </ul>
  </div>
  <div class="key-facts-block">
    <h4>🧩 Step-by-Step Method</h4>
    <ol>
      <li>1️⃣ Add the mixture to the flask and fit the fractionating column on top.</li>
      <li>2️⃣ Heat the mixture gently — the liquid with the lowest boiling point evaporates first.</li>
      <li>3️⃣ Vapour rises up the column.</li>
      <li>4️⃣ Cooler beads near the top cause higher-boiling vapours to condense and fall back, while lower-boiling vapours pass through.</li>
      <li>5️⃣ The vapour passes into the condenser, cools, and is collected separately.</li>
      <li>6️⃣ As temperature rises, other fractions can be collected in turn.</li>
    </ol>
  </div>
  <div class="key-facts-block">
    <h4>🔍 Scientific Explanation</h4>
    <ul>
      <li>The temperature gradient in the column ensures better separation.</li>
      <li>Each fraction condenses at its own boiling point, forming pure samples.</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>🧠 Real-Life Applications</h4>
    <ul>
      <li>Crude oil → separated into petrol, diesel, kerosene, etc.</li>
      <li>Air → separated into nitrogen, oxygen, argon.</li>
    </ul>
  </div>
  <div class="exam-tip-block">
    <h4>🧠 Exam Tip</h4>
    <p>Always mention the temperature gradient — "cooler at the top, hotter at the bottom."</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🎨 Subsection 6 – Paper Chromatography (Soluble Substances)</h3>
  <div class="definition-block">
    <h4>🧪 Purpose</h4>
    <p>Used to separate and identify substances in a mixture of soluble chemicals, especially coloured dyes or inks.</p>
  </div>
  <div class="key-facts-block">
    <h4>⚙️ Apparatus</h4>
    <ul>
      <li>Beaker with solvent (e.g. water or ethanol)</li>
      <li>Chromatography paper</li>
      <li>Pencil and ruler</li>
      <li>Capillary tube</li>
    </ul>
  </div>
  <div class="key-facts-block">
    <h4>🧩 Step-by-Step Method</h4>
    <ol>
      <li>1️⃣ Use a pencil to draw a baseline near the bottom of the chromatography paper.</li>
      <li>2️⃣ Place small dots of each sample on the baseline using a capillary tube.</li>
      <li>3️⃣ Hang the paper in a beaker with solvent below the baseline (so samples don't dissolve immediately).</li>
      <li>4️⃣ As solvent moves up by capillary action, it carries each dye with it.</li>
      <li>5️⃣ Different substances move at different speeds, depending on solubility and attraction to the paper.</li>
      <li>6️⃣ When the solvent front is near the top, remove the paper, mark the solvent line, and let it dry.</li>
    </ol>
  </div>
  <div class="key-facts-block">
    <h4>📊 Calculating Rf Values</h4>
    <p><strong>Rf = Distance moved by substance ÷ Distance moved by solvent front</strong></p>
    <p>Rf value = always between 0 and 1.</p>
  </div>
  <div class="key-facts-block">
    <h4>🔍 Scientific Explanation</h4>
    <ul>
      <li>The more soluble a substance, the further it travels.</li>
      <li>If a substance is strongly attracted to the paper, it moves less.</li>
    </ul>
  </div>
  <div class="warning-block">
    <h4>⚠️ Safety and Accuracy Notes</h4>
    <ul>
      <li>Always use pencil for the baseline (ink would dissolve).</li>
      <li>Make sure solvent doesn't cover the samples at the start.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">⚖️ Subsection 7 – Choosing the Correct Technique</h3>
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr><th>Type of Mixture</th><th>Correct Method</th><th>Example</th></tr>
      </thead>
      <tbody>
        <tr><td>Insoluble solid + liquid</td><td>Filtration</td><td>Sand and water</td></tr>
        <tr><td>Soluble solid + liquid</td><td>Crystallisation</td><td>Salt solution</td></tr>
        <tr><td>Solvent from solution</td><td>Simple distillation</td><td>Water from seawater</td></tr>
        <tr><td>Two liquids</td><td>Fractional distillation</td><td>Ethanol and water</td></tr>
        <tr><td>Coloured compounds</td><td>Chromatography</td><td>Ink pigments</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧠 Subsection 8 – Purity and Melting Point</h3>
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr><th>Term</th><th>Definition</th></tr>
      </thead>
      <tbody>
        <tr><td>Pure substance</td><td>A single element or compound with a fixed melting and boiling point.</td></tr>
        <tr><td>Impure substance</td><td>A mixture — melts or boils over a range of temperatures.</td></tr>
      </tbody>
    </table>
  </div>
  <div class="example-block">
    <h4>🟢 Example</h4>
    <ul>
      <li>Pure ice → melts at 0°C exactly.</li>
      <li>Ice with salt → melts between –5°C and 0°C.</li>
    </ul>
  </div>
  <div class="exam-tip-block">
    <h4>🧠 This is how purity is tested in labs</h4>
    <p>By measuring melting/boiling point.</p>
  </div>
</div>
        `,
        canonical_keywords: [
          "mixture", "physical combination", "filtration", "residue", "filtrate",
          "crystallisation", "evaporation", "simple distillation", "fractional distillation",
          "chromatography", "Rf value", "solvent front", "purity", "melting point"
        ],
        practice_items: [
          {
            id: "p1",
            prompt_template: "Define what a mixture is. Explain how mixtures are different from compounds.",
            marks: 4,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: [
              "mixture", "not chemically joined", "physical", "separated", "properties unchanged", 
              "compound", "chemically bonded", "chemical reaction"
            ]
          },
          {
            id: "p2",
            prompt_template: "Describe how to separate a mixture of sand and salt water to obtain pure salt crystals. Include the names of all techniques used.",
            marks: 6,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: [
              "filtration", "sand", "residue", "salt water", "filtrate", "crystallisation", 
              "evaporate", "crystals", "pure"
            ]
          },
          {
            id: "p3",
            prompt_template: "Describe the process of simple distillation to separate pure water from salt water. Include equipment and key steps.",
            marks: 5,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: [
              "heat", "evaporate", "boiling point", "condenser", "cool", "distillate", "collect", "flask"
            ]
          },
          {
            id: "p4",
            prompt_template: "A student uses paper chromatography to test food colourings. Describe the method and explain how to calculate an Rf value.",
            marks: 6,
            type: "short-answer",
            difficulty: "hard",
            randomise: true,
            expected_keywords: [
              "baseline", "pencil", "solvent", "move up", "different distances",
              "Rf value", "distance moved", "substance", "solvent front", "formula"
            ]
          }
        ]
      },
      {
        id: "1-1-3-atomic-model",
        title: "1.1.3 DEVELOPMENT OF THE ATOMIC MODEL",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 1 – Why Scientific Models Change</h3>
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>A scientific model is an idea, picture, or representation that helps to explain experimental observations. These models are updated when new evidence is discovered through experiments or improved technology.</p>
  </div>
  <div class="key-facts-block">
    <h4>🧠 More Detail</h4>
    <ul>
      <li>In the 19th and 20th centuries, new experimental techniques like cathode ray tubes and alpha particle scattering allowed scientists to "see" evidence for smaller particles.</li>
      <li>This caused older models to be rejected, adapted, or refined to fit the new data.</li>
      <li>The modern atomic model is still a theoretical model, and even now, new discoveries (like quarks) refine our understanding of atomic structure.</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>🟢 Key Principle</h4>
    <p>"Scientific models evolve as new evidence is gathered."</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">⚫ Subsection 2 – Dalton's Solid Sphere Model (1803)</h3>
  <div class="definition-block">
    <h4>🔵 Summary</h4>
    <p>John Dalton proposed that:</p>
    <ul>
      <li>All matter is made of tiny, indivisible spheres called atoms.</li>
      <li>Each element contains atoms of a single, unique type.</li>
      <li>Atoms of different elements vary in mass and properties.</li>
      <li>Atoms cannot be divided, created, or destroyed (in chemical reactions they just rearrange).</li>
    </ul>
  </div>
  <div class="key-facts-block">
    <h4>🧠 Added Detail</h4>
    <ul>
      <li>Dalton used experimental data on gas reactions to support his ideas.</li>
      <li>His model explained the Law of Conservation of Mass (total mass before and after a reaction is the same).</li>
      <li>However, Dalton's model could not explain electricity or subatomic particles — because they hadn't been discovered yet.</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>📘 Diagram Description</h4>
    <p>Atoms shown as solid, featureless spheres — like tiny billiard balls.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">⚪ Subsection 3 – Thomson's Plum Pudding Model (1897)</h3>
  <div class="definition-block">
    <h4>🔵 Discovery</h4>
    <p>J. J. Thomson discovered the electron through his cathode ray tube experiment. He found that cathode rays were negatively charged particles, smaller than atoms.</p>
  </div>
  <div class="key-facts-block">
    <h4>⚙️ Model Description</h4>
    <p>The atom was imagined as a positive sphere with negative electrons embedded throughout it, like plums in a pudding. The positive "dough" balanced the negative electrons, making the atom neutral overall.</p>
  </div>
  <div class="key-facts-block">
    <h4>🧠 Added Detail</h4>
    <ul>
      <li>This was the first model to include subatomic particles.</li>
      <li>It explained that atoms could conduct electricity because they contained charged particles.</li>
      <li>However, it didn't explain how electrons were arranged or why atoms emitted light at specific wavelengths.</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>📘 Diagram Description</h4>
    <p>Positive background with small negative dots spread evenly through it.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧪 Subsection 4 – Rutherford's Nuclear Model (1909)</h3>
  <div class="definition-block">
    <h4>⚙️ Experiment: Gold Foil (Alpha Scattering)</h4>
    <p>Ernest Rutherford, with Geiger and Marsden, fired alpha particles (positive helium nuclei) at thin gold foil.</p>
  </div>
  <div class="key-facts-block">
    <h4>🔬 Observations</h4>
    <ul>
      <li>Most alpha particles passed straight through → Atom mostly empty space.</li>
      <li>Some deflected slightly → Positive charge concentrated in a small area.</li>
      <li>Few bounced straight back → The positive centre (nucleus) must be tiny and dense.</li>
    </ul>
  </div>
  <div class="key-facts-block">
    <h4>🧠 More Scientific Detail</h4>
    <ul>
      <li>The positive nucleus contained most of the atom's mass.</li>
      <li>Electrons were thought to orbit the nucleus, similar to planets around the Sun.</li>
      <li>The model explained atomic scattering patterns, but couldn't explain atomic stability or emission spectra.</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>🧩 Impact</h4>
    <p>This was a major breakthrough — it completely replaced the Plum Pudding model.</p>
  </div>
  <div class="example-block">
    <h4>📘 Rutherford's Nuclear Model</h4>
    <p>Small, dense nucleus in the centre; electrons orbiting in space around it.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">⚡ Subsection 5 – Bohr's Planetary Model (1913)</h3>
  <div class="definition-block">
    <h4>🔵 Discovery</h4>
    <p>Niels Bohr refined Rutherford's model using results from atomic emission spectra (coloured light emitted when atoms are excited).</p>
  </div>
  <div class="key-facts-block">
    <h4>🧠 More Detail</h4>
    <ul>
      <li>Bohr realised electrons could only occupy certain fixed energy levels (shells).</li>
      <li>When electrons move between these levels, they absorb or emit specific amounts of energy (quanta).</li>
      <li>This explained why each element produces its own unique line spectrum.</li>
      <li>The idea of quantised energy levels was revolutionary and matched experimental data perfectly.</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>📘 Bohr's Model Description</h4>
    <p>Electrons orbit the nucleus in set paths (energy levels), not randomly. Each shell can hold a fixed number of electrons.</p>
  </div>
  <div class="key-facts-block">
    <h4>⚙️ Key Equations (Higher Tier)</h4>
    <p>Energy absorbed/emitted ∝ 1/n₁² – 1/n₂²<br>(This relationship explained hydrogen's emission lines — evidence for quantised orbits.)</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">⚛️ Subsection 6 – Chadwick's Discovery of the Neutron (1932)</h3>
  <div class="definition-block">
    <h4>🔵 Background</h4>
    <p>After Bohr's model, scientists still couldn't explain why the atomic mass didn't match the number of protons alone.</p>
  </div>
  <div class="key-facts-block">
    <h4>🧠 Discovery</h4>
    <ul>
      <li>James Chadwick performed experiments involving beryllium and alpha particles, discovering a new, neutral particle — the neutron.</li>
      <li>Neutrons had no charge, but similar mass to protons.</li>
      <li>They explained why isotopes (atoms of the same element with different masses) existed.</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>🟢 Significance</h4>
    <ul>
      <li>Completed the modern nuclear model.</li>
      <li>Established that the nucleus contains both protons and neutrons, surrounded by electrons in fixed shells.</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>📘 Modern Atomic Model</h4>
    <p>Dense nucleus (protons + neutrons) surrounded by electrons in fixed energy levels. Atom mostly empty space.</p>
  </div>
</div>
        `,
        canonical_keywords: ["Dalton", "Thomson", "Rutherford", "Bohr", "Chadwick", "alpha scattering", "plum pudding", "nuclear model", "electron", "neutron", "energy levels"],
        practice_items: [
          {
            id: "atomic-model-1",
            prompt_template: "Describe how the discovery of the electron led to the plum pudding model. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["Thomson", "electron", "negative charge", "positive sphere", "embedded"]
          },
          {
            id: "atomic-model-2",
            prompt_template: "Explain what the alpha scattering experiment showed about the structure of the atom. Include all three key observations. [6 marks]",
            marks: 6,
            type: "open",
            difficulty: "hard",
            randomise: false,
            expected_keywords: ["alpha particles", "gold foil", "passed through", "empty space", "deflected", "nucleus", "bounced back", "dense"]
          },
          {
            id: "atomic-model-3",
            prompt_template: "Describe Bohr's contribution to the atomic model. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["Bohr", "electrons", "fixed distances", "energy levels", "shells"]
          }
        ]
      },
      {
        id: "1-1-4-subatomic-particles",
        title: "1.1.4 RELATIVE ELECTRICAL CHARGES",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – The Three Subatomic Particles</h3>
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr><th>Particle</th><th>Symbol</th><th>Relative Charge</th><th>Relative Mass</th><th>Location</th></tr>
      </thead>
      <tbody>
        <tr><td>Proton</td><td>p⁺</td><td>+1</td><td>1</td><td>In the nucleus</td></tr>
        <tr><td>Neutron</td><td>n⁰</td><td>0</td><td>1</td><td>In the nucleus</td></tr>
        <tr><td>Electron</td><td>e⁻</td><td>–1</td><td>1/1836 (≈0)</td><td>In shells</td></tr>
      </tbody>
    </table>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Why Atoms Are Neutral</h3>
  <div class="definition-block">
    <h4>🔵 Explanation</h4>
    <p>Atoms are electrically neutral because the number of positive protons equals the number of negative electrons.</p>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Atomic Number and Mass Number</h3>
  <div class="definition-block">
    <h4>🔵 Definitions</h4>
    <ul>
      <li><strong>Atomic number (Z):</strong> Number of protons</li>
      <li><strong>Mass number (A):</strong> Total protons + neutrons</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>🟢 Example</h4>
    <p>For chlorine-35 (³⁵₁₇Cl): Protons = 17, Neutrons = 18, Electrons = 17</p>
  </div>
</div>
        `,
        canonical_keywords: ["proton", "neutron", "electron", "charge", "mass", "nucleus", "atomic number", "mass number"],
        practice_items: [
          {
            id: "subatomic-1",
            prompt_template: "State the relative charge and relative mass of a proton, neutron, and electron. [3 marks]",
            marks: 3,
            type: "short-answer",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["proton", "+1", "neutron", "0", "electron", "-1", "mass", "1"]
          },
          {
            id: "subatomic-2",
            prompt_template: "Explain why atoms have no overall electrical charge. [2 marks]",
            marks: 2,
            type: "open",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["protons", "electrons", "equal", "positive", "negative", "cancel"]
          },
          {
            id: "subatomic-3",
            prompt_template: "An atom of magnesium is ²⁴₁₂Mg. Calculate the number of protons, neutrons, and electrons. [3 marks]",
            marks: 3,
            type: "short-answer",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["protons", "12", "neutrons", "12", "electrons", "12"]
          }
        ]
      },
      {
        id: "1-1-5-size-mass",
        title: "1.1.5 SIZE AND MASS OF ATOMS",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – The Size of Atoms</h3>
  <div class="key-facts-block">
    <h4>🧠 Key Facts</h4>
    <ul>
      <li>Atoms are extremely small — radius ≈ 1 × 10⁻¹⁰ m (0.1 nanometres)</li>
      <li>The nucleus is about 1 × 10⁻¹⁴ m, roughly 10,000 times smaller than the atom itself</li>
      <li>Almost all of an atom is empty space</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>🟢 Visual Idea</h4>
    <p>If the atom were the size of a football stadium → the nucleus would be the size of a pea at the centre.</p>
  </div>
  <div class="exam-tip-block">
    <h4>🧠 Exam Tip</h4>
    <p>Always include both atomic and nucleus radii if asked for a comparison.</p>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – The Mass of an Atom</h3>
  <div class="key-facts-block">
    <h4>🧠 Key Points</h4>
    <p>Most of an atom's mass is concentrated in the nucleus, which contains protons and neutrons.</p>
    <p>Electrons have a negligible mass compared to nucleons.</p>
  </div>
  <div class="example-block">
    <table class="data-table">
      <thead><tr><th>Particle</th><th>Relative Mass</th></tr></thead>
      <tbody>
        <tr><td>Proton</td><td>1</td></tr>
        <tr><td>Neutron</td><td>1</td></tr>
        <tr><td>Electron</td><td>Very small (≈1/1836)</td></tr>
      </tbody>
    </table>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Isotopes</h3>
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>Isotopes are atoms of the same element that have the same number of protons but different numbers of neutrons.</p>
  </div>
  <div class="example-block">
    <h4>🟢 Example: Hydrogen Isotopes</h4>
    <table class="data-table">
      <thead><tr><th>Isotope</th><th>Protons</th><th>Neutrons</th><th>Electrons</th></tr></thead>
      <tbody>
        <tr><td>Hydrogen-1 (¹₁H)</td><td>1</td><td>0</td><td>1</td></tr>
        <tr><td>Deuterium (²₁H)</td><td>1</td><td>1</td><td>1</td></tr>
        <tr><td>Tritium (³₁H)</td><td>1</td><td>2</td><td>1</td></tr>
      </tbody>
    </table>
  </div>
</div>
        `,
        canonical_keywords: ["atomic radius", "nucleus", "10⁻¹⁰", "10⁻¹⁴", "isotopes", "neutrons", "mass", "empty space"],
        practice_items: [
          {
            id: "size-mass-1",
            prompt_template: "State the approximate radius of an atom and the radius of its nucleus. [2 marks]",
            marks: 2,
            type: "short-answer",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["1 × 10⁻¹⁰", "atom", "1 × 10⁻¹⁴", "nucleus"]
          },
          {
            id: "size-mass-2",
            prompt_template: "Explain why isotopes of the same element have the same chemical properties but different physical properties. [4 marks]",
            marks: 4,
            type: "open",
            difficulty: "hard",
            randomise: false,
            expected_keywords: ["same protons", "same electrons", "chemical", "different neutrons", "different mass", "physical"]
          }
        ]
      },
      {
        id: "1-1-6-relative-atomic-mass",
        title: "1.1.6 RELATIVE ATOMIC MASS (Aᵣ)",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – What is Relative Atomic Mass?</h3>
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>The relative atomic mass (Aᵣ) of an element is the average mass of all its isotopes, weighted according to their abundance, compared with 1/12 of the mass of a carbon-12 atom.</p>
  </div>
  <div class="key-facts-block">
    <h4>🧠 Key Ideas</h4>
    <ul>
      <li>Elements often exist as mixtures of isotopes</li>
      <li>The relative atomic mass is not a whole number because it's an average</li>
      <li>Carbon-12 is used as the standard reference atom</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>🟢 Example</h4>
    <p>Chlorine has two main isotopes: ³⁵Cl (abundance 75%) and ³⁷Cl (abundance 25%)</p>
    <p>Its average atomic mass (Aᵣ) = 35.5, not 35 or 37, because it's a weighted mean.</p>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Formula for Calculating Aᵣ</h3>
  <div class="definition-block">
    <h4>🔴 Equation</h4>
    <p>Aᵣ = [(mass of isotope₁ × % abundance₁) + (mass of isotope₂ × % abundance₂)] ÷ 100</p>
  </div>
  <div class="example-block">
    <h4>🟢 Worked Example</h4>
    <p><strong>Question:</strong> A sample of rubidium contains 72% of Rb-85 and 28% of Rb-87. Calculate Aᵣ.</p>
    <p><strong>Solution:</strong></p>
    <p>Aᵣ = [(85 × 72) + (87 × 28)] ÷ 100</p>
    <p>Aᵣ = [6120 + 2436] ÷ 100 = 85.56</p>
    <p><strong>Answer:</strong> Aᵣ = 85.6</p>
  </div>
  <div class="exam-tip-block">
    <h4>🧠 Exam Tip</h4>
    <p>Always multiply each mass by its % abundance, then divide by 100. Round only at the end.</p>
  </div>
</div>
        `,
        canonical_keywords: ["relative atomic mass", "Aᵣ", "isotopes", "abundance", "weighted average", "carbon-12"],
        practice_items: [
          {
            id: "ar-1",
            prompt_template: "Define relative atomic mass. [2 marks]",
            marks: 2,
            type: "short-answer",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["average mass", "isotopes", "abundance", "carbon-12"]
          },
          {
            id: "ar-2",
            prompt_template: "A sample of copper contains 69% of ⁶³Cu and 31% of ⁶⁵Cu. Calculate the relative atomic mass. Show your working. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["63", "69", "65", "31", "multiply", "divide", "100", "63.62"]
          }
        ]
      },
      {
        id: "1-1-7-electronic-structure",
        title: "1.1.7 ELECTRONIC STRUCTURE",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – How Electrons Fill Energy Levels</h3>
  <div class="definition-block">
    <h4>🔵 Key Concept</h4>
    <p>Electrons orbit the nucleus in regions called energy levels (or shells). Each shell can hold a limited number of electrons.</p>
  </div>
  <div class="example-block">
    <table class="data-table">
      <thead><tr><th>Shell</th><th>Maximum Electrons</th><th>Notes</th></tr></thead>
      <tbody>
        <tr><td>1st (closest to nucleus)</td><td>2</td><td>Lowest energy level</td></tr>
        <tr><td>2nd</td><td>8</td><td>Next energy level</td></tr>
        <tr><td>3rd</td><td>8</td><td>Fills up after 2nd for the first 20 elements</td></tr>
      </tbody>
    </table>
  </div>
  <div class="key-facts-block">
    <h4>🧠 Key Rule</h4>
    <p>Electrons fill the lowest available energy level first, before moving to higher ones.</p>
    <p><strong>Example:</strong> Magnesium (atomic number 12) → 2,8,2</p>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Writing Electronic Configurations</h3>
  <div class="definition-block">
    <h4>🔵 What is Electronic Configuration?</h4>
    <p>It's a shorthand way to describe how electrons are arranged in shells.</p>
  </div>
  <div class="example-block">
    <h4>🟢 Examples</h4>
    <p>Sodium (Na, Z = 11): 2,8,1</p>
    <p>Chlorine (Cl, Z = 17): 2,8,7</p>
    <p>Calcium (Ca, Z = 20): 2,8,8,2</p>
  </div>
  <div class="exam-tip-block">
    <h4>🧠 How to Write Configurations</h4>
    <ul>
      <li>Find atomic number → number of electrons</li>
      <li>Fill shells in order: 2,8,8,2 (up to element 20)</li>
      <li>Separate numbers with commas</li>
    </ul>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Electronic Structure and the Periodic Table</h3>
  <div class="key-facts-block">
    <h4>🧠 Key Points</h4>
    <ul>
      <li>Group number = number of outer shell electrons</li>
      <li>Period number = number of shells used</li>
      <li>Outer electrons control chemical reactivity</li>
    </ul>
  </div>
  <div class="example-block">
    <table class="data-table">
      <thead><tr><th>Group</th><th>Outer Electrons</th><th>Example</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>1</td><td>Sodium (Na): 2,8,1</td></tr>
        <tr><td>2</td><td>2</td><td>Magnesium (Mg): 2,8,2</td></tr>
        <tr><td>7</td><td>7</td><td>Chlorine (Cl): 2,8,7</td></tr>
        <tr><td>0 (8)</td><td>8 (full)</td><td>Neon (Ne): 2,8</td></tr>
      </tbody>
    </table>
  </div>
</div>
        `,
        canonical_keywords: ["electronic structure", "shells", "energy levels", "configuration", "2,8,8", "outer electrons", "group"],
        practice_items: [
          {
            id: "electronic-1",
            prompt_template: "Write the electronic configuration for aluminium (atomic number 13). [1 mark]",
            marks: 1,
            type: "short-answer",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["2,8,3"]
          },
          {
            id: "electronic-2",
            prompt_template: "Explain the relationship between the group number and the number of outer shell electrons for elements in Groups 1-7. [2 marks]",
            marks: 2,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["group number", "same as", "outer electrons", "shell"]
          },
          {
            id: "electronic-3",
            prompt_template: "An element has the electronic configuration 2,8,7. State its group number and explain why elements in this group are reactive. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "hard",
            randomise: false,
            expected_keywords: ["Group 7", "7 outer electrons", "need 1 more", "full shell", "gain electron"]
          }
        ]
      },
      {
        id: "1-2-1-periodic-table",
        title: "1.2.1 THE PERIODIC TABLE",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Structure of the Periodic Table</h3>
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>The Periodic Table arranges all known elements in order of increasing atomic number.</p>
  </div>
  <div class="key-facts-block">
    <h4>🧠 Key Terms</h4>
    <ul>
      <li><strong>Groups:</strong> Vertical columns (numbered 1-7 and 0)</li>
      <li><strong>Periods:</strong> Horizontal rows</li>
      <li>Elements in the same group have similar properties</li>
    </ul>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Why It's Called "Periodic"</h3>
  <div class="key-facts-block">
    <h4>🧠 Key Idea</h4>
    <p>The table is called periodic because patterns in properties repeat at regular intervals as you go across the table.</p>
    <ul>
      <li>Elements in Group 1 (Li, Na, K) are all reactive metals</li>
      <li>Elements in Group 7 (F, Cl, Br, I) are all reactive non-metals</li>
      <li>Elements in Group 0 (He, Ne, Ar) are unreactive gases</li>
    </ul>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Groups and Periods</h3>
  <div class="example-block">
    <table class="data-table">
      <thead><tr><th>Group</th><th>Example Elements</th><th>Outer Electrons</th><th>Type</th><th>Typical Ion</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>Li, Na, K</td><td>1</td><td>Metals</td><td>+1</td></tr>
        <tr><td>2</td><td>Be, Mg, Ca</td><td>2</td><td>Metals</td><td>+2</td></tr>
        <tr><td>7</td><td>F, Cl, Br, I</td><td>7</td><td>Non-metals</td><td>-1</td></tr>
        <tr><td>0</td><td>He, Ne, Ar</td><td>8 (full shell)</td><td>Noble gases</td><td>None</td></tr>
      </tbody>
    </table>
  </div>
  <div class="exam-tip-block">
    <h4>🧠 Exam Tip</h4>
    <p>Remember: All Group 1 metals form compounds with Group 7 halogens in a 1:1 ratio (e.g. NaCl, KBr).</p>
  </div>
</div>
        `,
        canonical_keywords: ["periodic table", "groups", "periods", "atomic number", "properties", "metals", "non-metals", "noble gases"],
        practice_items: [
          {
            id: "periodic-1",
            prompt_template: "State what is meant by a group in the periodic table. [1 mark]",
            marks: 1,
            type: "short-answer",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["vertical column", "same outer electrons"]
          },
          {
            id: "periodic-2",
            prompt_template: "Explain why elements in the same group have similar chemical properties. [2 marks]",
            marks: 2,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["same number", "outer electrons", "react similarly", "chemical properties"]
          }
        ]
      },
      {
        id: "1-2-2-development-periodic-table",
        title: "1.2.2 DEVELOPMENT OF THE PERIODIC TABLE",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Early Classification of Elements</h3>
  <div class="key-facts-block">
    <h4>🧠 Early Attempts</h4>
    <ul>
      <li><strong>Dobereiner's Triads (1817):</strong> Grouped elements in threes with similar properties. Middle element's atomic mass ≈ average of other two. Problem: Didn't work for all known elements.</li>
      <li><strong>Newlands' Law of Octaves (1864):</strong> Arranged elements by increasing atomic weight. Every 8th element had similar properties. Problems: Didn't leave gaps for new elements; mixed metals and non-metals together.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Mendeleev's Periodic Table (1869)</h3>
  <div class="definition-block">
    <h4>🔵 Key Ideas</h4>
    <p>Dmitri Mendeleev arranged the 63 known elements in order of increasing atomic weight. He grouped elements with similar chemical properties in the same column.</p>
  </div>
  <div class="key-facts-block">
    <h4>🧠 Mendeleev's Genius Moves</h4>
    <ul>
      <li><strong>Left Gaps for Missing Elements:</strong> Predicted the existence and properties of new elements like gallium, scandium, and germanium</li>
      <li><strong>Reordered Some Elements:</strong> Swapped elements that didn't fit by weight to better match chemical properties</li>
      <li><strong>Grouped by Properties:</strong> Elements in the same group had similar reactions</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>🟢 Example: Mendeleev's Predictions</h4>
    <p>When gallium and germanium were discovered later, their measured properties matched Mendeleev's predictions exactly — proving his model was correct.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – The Modern Periodic Table</h3>
  <div class="definition-block">
    <h4>🔵 What Changed</h4>
    <p>In the early 20th century, scientists discovered protons and realised that elements are best arranged by atomic number (number of protons), not atomic mass.</p>
  </div>
  <div class="example-block">
    <table class="data-table">
      <thead><tr><th>Feature</th><th>Mendeleev's Table</th><th>Modern Table</th></tr></thead>
      <tbody>
        <tr><td>Basis of order</td><td>Atomic weight</td><td>Atomic number</td></tr>
        <tr><td>Gaps left</td><td>Yes (for new elements)</td><td>No (all known elements included)</td></tr>
        <tr><td>Noble gases</td><td>Not discovered yet</td><td>Present (Group 0)</td></tr>
      </tbody>
    </table>
  </div>
</div>
        `,
        canonical_keywords: ["Mendeleev", "periodic table", "development", "atomic number", "Dobereiner", "Newlands", "predictions"],
        practice_items: [
          {
            id: "dev-pt-1",
            prompt_template: "Explain how Mendeleev overcame the problems with earlier attempts to classify elements. [4 marks]",
            marks: 4,
            type: "open",
            difficulty: "hard",
            randomise: false,
            expected_keywords: ["gaps", "predicted", "properties", "reordered", "chemical properties", "gallium", "germanium"]
          }
        ]
      },
      {
        id: "1-2-3-metals-non-metals",
        title: "1.2.3 METALS AND NON-METALS",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Where They Are Found</h3>
  <div class="definition-block">
    <h4>🔵 Key Idea</h4>
    <p>The Periodic Table is roughly divided by a diagonal "staircase line." Elements to the left and below this line are metals. Elements to the right and above are non-metals.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Physical Properties</h3>
  <div class="example-block">
    <table class="data-table">
      <thead><tr><th>Property</th><th>Metals</th><th>Non-Metals</th></tr></thead>
      <tbody>
        <tr><td>State at room temp</td><td>Mostly solid (except mercury)</td><td>Many gases or brittle solids</td></tr>
        <tr><td>Appearance</td><td>Shiny (lustrous)</td><td>Dull</td></tr>
        <tr><td>Melting & Boiling Point</td><td>High</td><td>Low</td></tr>
        <tr><td>Density</td><td>Usually high</td><td>Usually low</td></tr>
        <tr><td>Conductivity</td><td>Conduct heat & electricity</td><td>Poor conductors (insulators)</td></tr>
        <tr><td>Malleability</td><td>Malleable and ductile</td><td>Brittle if solid</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Chemical Properties</h3>
  <div class="example-block">
    <table class="data-table">
      <thead><tr><th>Property</th><th>Metals</th><th>Non-Metals</th></tr></thead>
      <tbody>
        <tr><td>Ion formation</td><td>Lose electrons → positive ions</td><td>Gain/share electrons → negative ions or covalent bonds</td></tr>
        <tr><td>Type of bonding</td><td>Metallic or Ionic</td><td>Covalent</td></tr>
        <tr><td>Reaction with Oxygen</td><td>Metal oxides (basic)</td><td>Non-metal oxides (acidic)</td></tr>
      </tbody>
    </table>
  </div>
  <div class="example-block">
    <h4>🟢 Examples</h4>
    <ul>
      <li><strong>Metal + Oxygen:</strong> 2Mg + O₂ → 2MgO (basic)</li>
      <li><strong>Non-metal + Oxygen:</strong> C + O₂ → CO₂ (acidic)</li>
    </ul>
  </div>
</div>
        `,
        canonical_keywords: ["metals", "non-metals", "conductivity", "malleability", "oxides", "basic", "acidic"],
        practice_items: [
          {
            id: "metal-nm-1",
            prompt_template: "Compare the physical properties of metals and non-metals. [4 marks]",
            marks: 4,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["conductivity", "malleability", "melting point", "density", "shiny", "dull", "brittle"]
          }
        ]
      },
      {
        id: "1-2-4-group-0",
        title: "1.2.4 GROUP 0 (THE NOBLE GASES)",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Introducing the Noble Gases</h3>
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>The noble gases are the elements in Group 0 (sometimes called Group 8) of the periodic table: Helium (He), Neon (Ne), Argon (Ar), Krypton (Kr), Xenon (Xe), Radon (Rn).</p>
  </div>
  <div class="key-facts-block">
    <h4>🧠 Key Facts</h4>
    <ul>
      <li>Found on the far right-hand side of the periodic table</li>
      <li>All are non-metals and exist as single atoms (monatomic)</li>
      <li>Colourless, odourless gases at room temperature</li>
      <li>They all have full outer electron shells</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Electronic Structure and Stability</h3>
  <div class="definition-block">
    <h4>🔵 Key Idea</h4>
    <p>Each noble gas has a complete outer shell of electrons. This makes them very stable and chemically unreactive.</p>
  </div>
  <div class="example-block">
    <table class="data-table">
      <thead><tr><th>Element</th><th>Atomic Number</th><th>Electron Configuration</th><th>Outer Electrons</th></tr></thead>
      <tbody>
        <tr><td>Helium</td><td>2</td><td>2</td><td>2</td></tr>
        <tr><td>Neon</td><td>10</td><td>2,8</td><td>8</td></tr>
        <tr><td>Argon</td><td>18</td><td>2,8,8</td><td>8</td></tr>
      </tbody>
    </table>
  </div>
  <div class="exam-tip-block">
    <h4>🧠 Exam Tip</h4>
    <p>Always mention "full outer shell" when explaining unreactivity.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Physical Properties and Trends</h3>
  <div class="definition-block">
    <h4>🔵 Trend Down Group 0</h4>
    <p>As you go down Group 0: atoms get larger, intermolecular forces get stronger, boiling points and densities increase.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Uses of the Noble Gases</h3>
  <div class="example-block">
    <table class="data-table">
      <thead><tr><th>Noble Gas</th><th>Uses</th><th>Reason</th></tr></thead>
      <tbody>
        <tr><td>Helium (He)</td><td>Balloons, airships</td><td>Low density, non-flammable</td></tr>
        <tr><td>Neon (Ne)</td><td>Advertising lights</td><td>Glows brightly when electricity passes through</td></tr>
        <tr><td>Argon (Ar)</td><td>Inert atmosphere for welding & in light bulbs</td><td>Prevents metal from reacting with oxygen</td></tr>
      </tbody>
    </table>
  </div>
</div>
        `,
        canonical_keywords: ["noble gases", "Group 0", "helium", "neon", "argon", "unreactive", "full outer shell", "monatomic"],
        practice_items: [
          {
            id: "group0-1",
            prompt_template: "Explain why the noble gases are unreactive. [2 marks]",
            marks: 2,
            type: "short-answer",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["full outer shell", "stable", "no need to react", "gain", "lose", "share"]
          }
        ]
      },
      {
        id: "1-2-5-group-1",
        title: "1.2.5 GROUP 1: THE ALKALI METALS",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Electronic Structure</h3>
  <div class="key-facts-block">
    <h4>🧠 Key Facts</h4>
    <ul>
      <li>Each Group 1 atom has one electron in its outer shell</li>
      <li>This outer electron is easily lost, forming a +1 ion</li>
    </ul>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Reaction with Water</h3>
  <div class="definition-block">
    <h4>🔵 General Reaction</h4>
    <p>Metal + Water → Metal Hydroxide + Hydrogen</p>
  </div>
  <div class="example-block">
    <h4>🟢 Examples</h4>
    <ul>
      <li><strong>Lithium:</strong> Fizzes gently, moves slowly</li>
      <li><strong>Sodium:</strong> Fizzes strongly, melts into ball, yellow flame</li>
      <li><strong>Potassium:</strong> Violent reaction, lilac flame, explodes</li>
    </ul>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Trend in Reactivity</h3>
  <div class="definition-block">
    <h4>🔵 Pattern</h4>
    <p>Reactivity increases down the group: K > Na > Li</p>
    <p><strong>Reason:</strong> Outer electron farther from nucleus → weaker attraction → easier to lose</p>
  </div>
</div>
        `,
        canonical_keywords: ["alkali metals", "Group 1", "lithium", "sodium", "potassium", "water", "reactivity", "outer electron", "+1 ion"],
        practice_items: [
          {
            id: "group1-1",
            prompt_template: "Describe what you would see when sodium reacts with water. Write a balanced symbol equation for this reaction. [4 marks]",
            marks: 4,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["fizzes", "yellow flame", "melts", "moves", "2Na", "2H₂O", "2NaOH", "H₂"]
          },
          {
            id: "group1-2",
            prompt_template: "Explain why potassium is more reactive than sodium. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["outer electron", "further from nucleus", "weaker attraction", "easier to lose", "more shells"]
          }
        ]
      },
      {
        id: "1-2-6-group-7",
        title: "1.2.6 GROUP 7: THE HALOGENS",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Introducing the Halogens</h3>
  <div class="definition-block">
    <h4>🔵 Key Facts</h4>
    <ul>
      <li>Group 7 non-metals: Fluorine, Chlorine, Bromine, Iodine</li>
      <li>Exist as diatomic molecules (F₂, Cl₂, Br₂, I₂)</li>
      <li>Have 7 electrons in outer shell</li>
      <li>Very reactive with metals</li>
    </ul>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Physical Properties</h3>
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr><th>Halogen</th><th>State</th><th>Colour</th></tr>
      </thead>
      <tbody>
        <tr><td>Chlorine</td><td>Gas</td><td>Green</td></tr>
        <tr><td>Bromine</td><td>Liquid</td><td>Red-brown</td></tr>
        <tr><td>Iodine</td><td>Solid</td><td>Grey-black</td></tr>
      </tbody>
    </table>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Displacement Reactions</h3>
  <div class="definition-block">
    <h4>🔵 Rule</h4>
    <p>A more reactive halogen displaces a less reactive halogen from its compound.</p>
    <p><strong>Reactivity:</strong> F₂ > Cl₂ > Br₂ > I₂</p>
  </div>
  <div class="example-block">
    <h4>🟢 Example</h4>
    <p>Cl₂ + 2NaBr → 2NaCl + Br₂</p>
    <p>Observation: Orange solution (bromine formed)</p>
  </div>
</div>
        `,
        canonical_keywords: ["halogens", "Group 7", "chlorine", "bromine", "iodine", "displacement", "reactivity", "diatomic"],
        practice_items: [
          {
            id: "group7-1",
            prompt_template: "Describe the physical properties of chlorine, bromine, and iodine including their state and colour. [3 marks]",
            marks: 3,
            type: "short-answer",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["chlorine", "gas", "green", "bromine", "liquid", "red-brown", "iodine", "solid", "grey"]
          },
          {
            id: "group7-2",
            prompt_template: "Explain what happens when chlorine is added to a solution of potassium bromide. Write a balanced equation. [4 marks]",
            marks: 4,
            type: "open",
            difficulty: "hard",
            randomise: false,
            expected_keywords: ["displacement", "chlorine", "more reactive", "bromine", "Cl₂", "KBr", "KCl", "Br₂", "orange"]
          },
          {
            id: "group7-3",
            prompt_template: "Explain why fluorine is more reactive than iodine. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["outer shell", "closer to nucleus", "stronger attraction", "easier to gain electron", "fewer shells"]
          }
        ]
      },
      {
        id: "1-3-1-transition-metals-comparison",
        title: "1.3.1 COMPARISON OF TRANSITION METALS WITH GROUP 1 ELEMENTS",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Where They Are Found</h3>
  <div class="key-facts-block">
    <ul>
      <li>Group 1 elements: the alkali metals — found on the far left of the periodic table</li>
      <li>Transition metals: located in the centre block (between Groups 2 and 3)</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Physical Property Comparison</h3>
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr><th>Property</th><th>Group 1 Metals</th><th>Transition Metals</th></tr>
      </thead>
      <tbody>
        <tr><td>Density</td><td>Low (Li, Na, K float on water)</td><td>High (Fe, Cu sink)</td></tr>
        <tr><td>Hardness</td><td>Very soft (cut with knife)</td><td>Hard and strong</td></tr>
        <tr><td>Melting/Boiling Point</td><td>Low</td><td>High</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Chemical Property Comparison</h3>
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr><th>Property</th><th>Group 1 Metals</th><th>Transition Metals</th></tr>
      </thead>
      <tbody>
        <tr><td>Reactivity</td><td>Very reactive</td><td>Much less reactive</td></tr>
        <tr><td>Reaction with Water</td><td>Vigorous → metal hydroxide + H₂</td><td>Slow or no reaction</td></tr>
        <tr><td>Reaction with Oxygen</td><td>React quickly → white oxides</td><td>Form coloured oxides</td></tr>
      </tbody>
    </table>
  </div>
</div>
        `,
        canonical_keywords: ["transition metals", "Group 1", "alkali metals", "density", "reactivity", "hardness"],
        practice_items: [
          {
            id: "trans-comp-1",
            prompt_template: "Compare the physical properties of Group 1 metals and transition metals. [4 marks]",
            marks: 4,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["density", "hardness", "melting point", "Group 1", "soft", "low density", "transition", "hard", "high density"]
          }
        ]
      },
      {
        id: "1-3-2-typical-transition-properties",
        title: "1.3.2 TYPICAL PROPERTIES OF TRANSITION METALS",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – General Physical Properties</h3>
  <div class="key-facts-block">
    <ul>
      <li>High melting and boiling points</li>
      <li>High density</li>
      <li>Good conductors of heat and electricity</li>
      <li>Hard and strong</li>
      <li>Malleable and ductile</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Chemical Properties</h3>
  <div class="definition-block">
    <h4>🔵 Key Properties</h4>
    <ul>
      <li><strong>Variable oxidation states:</strong> Can form ions with different charges (e.g., Fe²⁺ and Fe³⁺)</li>
      <li><strong>Form coloured compounds:</strong> Each ion absorbs different wavelengths of light</li>
      <li><strong>Catalytic activity:</strong> Increase rate of reactions without being used up</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Coloured Compounds</h3>
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr><th>Compound</th><th>Colour</th></tr>
      </thead>
      <tbody>
        <tr><td>CuSO₄ (aq)</td><td>Blue</td></tr>
        <tr><td>FeSO₄ (aq)</td><td>Pale green</td></tr>
        <tr><td>FeCl₃ (aq)</td><td>Yellow/brown</td></tr>
        <tr><td>NiSO₄ (aq)</td><td>Green</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Catalytic Properties</h3>
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr><th>Catalyst</th><th>Reaction</th><th>Use</th></tr>
      </thead>
      <tbody>
        <tr><td>Iron (Fe)</td><td>N₂ + 3H₂ ⇌ 2NH₃</td><td>Haber Process (ammonia)</td></tr>
        <tr><td>Nickel (Ni)</td><td>Hydrogenation of alkenes</td><td>Making margarine</td></tr>
        <tr><td>Platinum (Pt)</td><td>Converts CO → CO₂</td><td>Catalytic converters</td></tr>
      </tbody>
    </table>
  </div>
</div>
        `,
        canonical_keywords: ["transition metals", "catalysts", "coloured compounds", "variable oxidation states", "iron", "copper", "nickel"],
        practice_items: [
          {
            id: "trans-prop-1",
            prompt_template: "Explain why transition metals form coloured compounds. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "hard",
            randomise: false,
            expected_keywords: ["d-orbital", "electrons", "absorb", "light", "wavelengths", "reflected", "colour"]
          }
        ]
      }
    ]
  },
  {
    id: "bonding-structure",
    title: "Bonding, structure & the properties of matter",
    status: "ready",
    subsections: [
      {
        id: "2-1-1-chemical-bonds",
        title: "2.1.1 CHEMICAL BONDS",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – What Are Chemical Bonds?</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>A chemical bond is a strong attraction that holds atoms or ions together in compounds or elements. Bonds form because atoms want to achieve a full outer shell of electrons — the same stable arrangement as noble gases.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Idea</h4>
    <p>When atoms bond, they either:</p>
    <ul>
      <li><strong>Transfer electrons</strong> (ionic bonding),</li>
      <li><strong>Share electrons</strong> (covalent bonding), or</li>
      <li><strong>Pool electrons</strong> (metallic bonding).</li>
    </ul>
    <p>The result is a more stable structure with lower energy.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – The Three Types of Strong Chemical Bonds</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Type of Bond</th>
          <th>Occurs Between</th>
          <th>How It Works</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Ionic</strong></td>
          <td>Metal + Non-metal</td>
          <td>Electrons are transferred from the metal to the non-metal, forming positive and negative ions held by electrostatic forces.</td>
          <td>Sodium chloride (NaCl)</td>
        </tr>
        <tr>
          <td><strong>Covalent</strong></td>
          <td>Non-metal + Non-metal</td>
          <td>Electrons are shared between atoms to achieve full outer shells.</td>
          <td>Water (H₂O), Oxygen (O₂)</td>
        </tr>
        <tr>
          <td><strong>Metallic</strong></td>
          <td>Metal + Metal</td>
          <td>Positive metal ions are held together by a sea of delocalised electrons that move freely throughout the structure.</td>
          <td>Copper (Cu), Iron (Fe)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>📝 Quick Summary</h4>
    <ul>
      <li><strong>Ionic → Transfer</strong></li>
      <li><strong>Covalent → Share</strong></li>
      <li><strong>Metallic → Delocalise</strong></li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Particles Involved in Each Bond Type</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Bond Type</th>
          <th>Particles Involved</th>
          <th>Attraction Between</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ionic</td>
          <td>Positive metal ions and negative non-metal ions</td>
          <td>Oppositely charged ions</td>
        </tr>
        <tr>
          <td>Covalent</td>
          <td>Non-metal atoms</td>
          <td>Shared pair(s) of electrons</td>
        </tr>
        <tr>
          <td>Metallic</td>
          <td>Metal atoms and delocalised electrons</td>
          <td>Positive ions ↔ delocalised electrons</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="key-facts-block">
    <h4>📘 Diagram Reminder (Visual Summary)</h4>
    <ul>
      <li><strong>Ionic</strong> → alternating + and – ions in a lattice</li>
      <li><strong>Covalent</strong> → overlapping electron shells (shared pairs)</li>
      <li><strong>Metallic</strong> → positive ion lattice + moving electrons</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Why Bonds Form (Energy Explanation)</h3>
  
  <div class="definition-block">
    <h4>⚡ The Stability Rule</h4>
    <p>Atoms bond to reach full outer shells (usually 8 electrons). When they do, they become more stable (lower potential energy).</p>
  </div>

  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Type of Bond</th>
          <th>Electron Movement</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ionic</td>
          <td>Transfer</td>
          <td>Both atoms gain stable electronic structures</td>
        </tr>
        <tr>
          <td>Covalent</td>
          <td>Share</td>
          <td>Each atom has a complete shell</td>
        </tr>
        <tr>
          <td>Metallic</td>
          <td>Delocalise</td>
          <td>Metal ions surrounded by electrons for stability</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🔋 Energy Change</h4>
    <p><strong>Bond formation = exothermic</strong> (energy released). <strong>Breaking bonds = endothermic</strong> (energy absorbed).</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Strength of Bonds</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Strength</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ionic</td>
          <td>Strong</td>
          <td>Electrostatic attraction acts in all directions in a lattice.</td>
        </tr>
        <tr>
          <td>Covalent</td>
          <td>Strong</td>
          <td>Shared electrons tightly hold atoms together.</td>
        </tr>
        <tr>
          <td>Metallic</td>
          <td>Strong</td>
          <td>Delocalised electrons form strong attraction to positive ions.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Important Note</h4>
    <p>Even though these are all "strong" bonds, remember: The forces between molecules (intermolecular forces) in simple covalent substances are weak — that's why many covalent substances are gases or liquids.</p>
  </div>
</div>
        `,
        canonical_keywords: ["chemical bonds", "ionic bonding", "covalent bonding", "metallic bonding", "electrons", "transfer", "share", "delocalised", "electrostatic forces"],
        practice_items: [
          {
            id: "bonds-1",
            prompt_template: "Describe the three types of strong chemical bonds and explain when each type forms. [6 marks]",
            marks: 6,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["ionic", "covalent", "metallic", "transfer", "share", "delocalised", "metal", "non-metal"]
          },
          {
            id: "bonds-2",
            prompt_template: "Explain why atoms form chemical bonds. Use the concept of stability in your answer. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["stable", "full outer shell", "noble gas", "lower energy"]
          }
        ]
      },
      {
        id: "2-1-2-ionic-bonding",
        title: "2.1.2 IONIC BONDING",
        type: "content",
        study_group: 1,
        content_html: `
<div class="note-block">
  <p><strong>📝 This section is one of the most examined in Paper 1.</strong> You must be able to describe how ions form, draw dot-and-cross diagrams, and explain ionic charges and forces in terms of electrostatic attraction.</p>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – What Is Ionic Bonding?</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>Ionic bonding is the electrostatic attraction between oppositely charged ions (positive and negative).</p>
    <p>It happens when:</p>
    <ul>
      <li>A metal atom <strong>loses electrons</strong> to form a <strong>positive ion (cation)</strong>.</li>
      <li>A non-metal atom <strong>gains those electrons</strong> to form a <strong>negative ion (anion)</strong>.</li>
    </ul>
    <p>Both atoms end up with full outer electron shells, achieving a stable noble gas configuration.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Formation of Ionic Bonds (Step-by-Step)</h3>
  
  <div class="example-block">
    <h4>🧪 Example 1 – Sodium and Chlorine</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Atom</th>
          <th>Electronic Structure</th>
          <th>What Happens</th>
          <th>Ion Formed</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Sodium (Na)</td>
          <td>2,8,1</td>
          <td>Loses 1 electron</td>
          <td>Na⁺</td>
        </tr>
        <tr>
          <td>Chlorine (Cl)</td>
          <td>2,8,7</td>
          <td>Gains 1 electron</td>
          <td>Cl⁻</td>
        </tr>
      </tbody>
    </table>
    
    <p><strong>Result:</strong></p>
    <p>Na → Na⁺ + e⁻</p>
    <p>Cl + e⁻ → Cl⁻</p>
    
    <p><strong>Word Equation:</strong><br>
    Sodium + Chlorine → Sodium chloride</p>
    
    <p><strong>Dot-and-Cross Diagram (described):</strong></p>
    <ul>
      <li>Sodium atom transfers one outer electron (shown by a cross) to chlorine's outer shell (shown by a dot).</li>
      <li>Sodium now has a full 2,8 shell (Na⁺) and chlorine has a full 2,8,8 shell (Cl⁻).</li>
      <li>Brackets are drawn around each ion with charges written outside.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🧪 Example 2 – Magnesium and Oxygen</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Atom</th>
          <th>Electronic Structure</th>
          <th>Change</th>
          <th>Ion Formed</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Magnesium (Mg)</td>
          <td>2,8,2</td>
          <td>Loses 2 electrons</td>
          <td>Mg²⁺</td>
        </tr>
        <tr>
          <td>Oxygen (O)</td>
          <td>2,6</td>
          <td>Gains 2 electrons</td>
          <td>O²⁻</td>
        </tr>
      </tbody>
    </table>
    
    <p><strong>Result:</strong></p>
    <p>Mg → Mg²⁺ + 2e⁻</p>
    <p>O + 2e⁻ → O²⁻</p>
    
    <p><strong>Dot-and-Cross Diagram (described):</strong></p>
    <ul>
      <li>Two crosses (electrons from Mg) are transferred to oxygen's outer shell.</li>
      <li>Brackets around Mg²⁺ and O²⁻ with charges labelled.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🧪 Example 3 – Calcium and Chlorine</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Element</th>
          <th>Electronic Structure</th>
          <th>Change</th>
          <th>Ion Formed</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Calcium (Ca)</td>
          <td>2,8,8,2</td>
          <td>Loses 2 electrons</td>
          <td>Ca²⁺</td>
        </tr>
        <tr>
          <td>Chlorine (Cl)</td>
          <td>2,8,7</td>
          <td>Gains 1 electron</td>
          <td>Cl⁻ (×2)</td>
        </tr>
      </tbody>
    </table>
    
    <p><strong>Equation:</strong><br>
    Ca + Cl₂ → CaCl₂</p>
    
    <p><strong>Explanation:</strong><br>
    Each chlorine atom gains one electron → two Cl⁻ ions for every Ca²⁺ ion.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Charges on Ions in Groups 1, 2, 6, and 7</h3>
  
  <div class="exam-tip-block">
    <h4>🧠 Rule</h4>
    <p>The charge equals the number of electrons lost or gained.</p>
  </div>

  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Group</th>
          <th>Example Element</th>
          <th>Ion Formed</th>
          <th>Charge Pattern</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Sodium (Na)</td>
          <td>Na⁺</td>
          <td>+1 (Lose 1 electron)</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Magnesium (Mg)</td>
          <td>Mg²⁺</td>
          <td>+2 (Lose 2 electrons)</td>
        </tr>
        <tr>
          <td>6</td>
          <td>Oxygen (O)</td>
          <td>O²⁻</td>
          <td>-2 (Gain 2 electrons)</td>
        </tr>
        <tr>
          <td>7</td>
          <td>Chlorine (Cl)</td>
          <td>Cl⁻</td>
          <td>-1 (Gain 1 electron)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Shortcut</h4>
    <p>Group number = electrons in outer shell → number of electrons lost or gained to reach 8.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Dot-and-Cross Diagram Skills</h3>
  
  <div class="key-facts-block">
    <h4>🧠 How to Draw Step-by-Step:</h4>
    <ol>
      <li>Write electron configurations for both atoms.</li>
      <li>Show transfer of electrons with arrows.</li>
      <li>Use dots for one atom's electrons and crosses for the other's.</li>
      <li>Put brackets around each ion.</li>
      <li>Write charges outside brackets (+1, +2, -1, -2).</li>
    </ol>
  </div>

  <div class="example-block">
    <h4>📝 Common Examples You Must Know:</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Compound</th>
          <th>Metal</th>
          <th>Non-Metal</th>
          <th>Diagram Summary</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>NaCl</td>
          <td>Na →</td>
          <td>1 electron transferred</td>
          <td>[Na⁺] [Cl⁻]</td>
        </tr>
        <tr>
          <td>MgO</td>
          <td>Mg →</td>
          <td>2 electrons transferred</td>
          <td>[Mg²⁺] [O²⁻]</td>
        </tr>
        <tr>
          <td>CaF₂</td>
          <td>Ca →</td>
          <td>2 electrons transferred (to 2 F atoms)</td>
          <td>[Ca²⁺] [F⁻]₂</td>
        </tr>
        <tr>
          <td>Li₂O</td>
          <td>2 Li →</td>
          <td>2 electrons total transferred</td>
          <td>[Li⁺]₂ [O²⁻]</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Why Ionic Bonds Are Strong</h3>
  
  <div class="key-facts-block">
    <h4>📘 Explanation</h4>
    <p>Ions in an ionic compound are held together by <strong>strong electrostatic forces</strong> between oppositely charged ions. These forces:</p>
    <ul>
      <li>Act in all directions throughout the lattice,</li>
      <li>Require lots of energy to overcome.</li>
    </ul>
    <p>This is why ionic compounds have <strong>high melting and boiling points</strong>.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 6 – Representing Ionic Compounds</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Representation</th>
          <th>Description</th>
          <th>Limitation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Dot-and-cross diagram</td>
          <td>Shows electron transfer clearly</td>
          <td>Doesn't show 3D structure or bonding strength</td>
        </tr>
        <tr>
          <td>Ball-and-stick model</td>
          <td>Shows 3D arrangement and bonds</td>
          <td>Doesn't show relative ion size or electron transfer</td>
        </tr>
        <tr>
          <td>2D diagram</td>
          <td>Easy to draw</td>
          <td>No depth or perspective</td>
        </tr>
        <tr>
          <td>3D space-filling model</td>
          <td>Realistic spacing between ions</td>
          <td>Can't see internal ions; looks crowded</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Exam Tip</h4>
    <p>When asked "Describe the structure of an ionic compound," you must include: <strong>giant lattice</strong>, <strong>electrostatic forces</strong>, and <strong>ions arranged in regular pattern</strong>.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 7 – Empirical Formula of Ionic Compounds</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>The empirical formula shows the simplest whole number ratio of ions in a compound.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 How to Work It Out</h4>
    <ol>
      <li>Identify each ion and its charge.</li>
      <li>Combine so total positive = total negative charge.</li>
      <li>Write the ratio as the formula.</li>
    </ol>
  </div>

  <div class="example-block">
    <h4>🟢 Examples</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Ions</th>
          <th>Balancing Charge</th>
          <th>Formula</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Na⁺ and Cl⁻</td>
          <td>+1 and -1</td>
          <td>NaCl</td>
        </tr>
        <tr>
          <td>Mg²⁺ and O²⁻</td>
          <td>+2 and -2</td>
          <td>MgO</td>
        </tr>
        <tr>
          <td>Ca²⁺ and F⁻</td>
          <td>+2 and 2×(-1)</td>
          <td>CaF₂</td>
        </tr>
        <tr>
          <td>Al³⁺ and O²⁻</td>
          <td>2×(+3) = +6, 3×(-2) = -6</td>
          <td>Al₂O₃</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
        `,
        canonical_keywords: ["ionic bonding", "ions", "cation", "anion", "electrostatic forces", "electron transfer", "dot-and-cross diagram", "lattice", "empirical formula"],
        practice_items: [
          {
            id: "ionic-bonding-1",
            prompt_template: "Describe how ionic bonds form between sodium and chlorine atoms. Include electron configurations in your answer. [4 marks]",
            marks: 4,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["sodium", "loses", "electron", "chlorine", "gains", "electron", "Na+", "Cl-", "electrostatic", "attraction"]
          },
          {
            id: "ionic-bonding-2",
            prompt_template: "Explain why ionic bonds are strong. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["electrostatic forces", "oppositely charged", "ions", "all directions", "lattice", "energy"]
          },
          {
            id: "ionic-bonding-3",
            prompt_template: "Work out the empirical formula for the compound formed between aluminium (Al³⁺) and oxygen (O²⁻). Show your working. [2 marks]",
            marks: 2,
            type: "short-answer",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["Al2O3", "2×(+3)", "3×(-2)", "balanced"]
          }
        ]
      },
      {
        id: "2-1-3-ionic-compounds",
        title: "2.1.3 IONIC COMPOUNDS",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Structure of Ionic Compounds</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>Ionic compounds have a <strong>giant ionic lattice structure</strong> — a three-dimensional repeating pattern of positive and negative ions held together by strong electrostatic forces acting in all directions.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Description</h4>
    <ul>
      <li>Ions are closely packed in a regular pattern.</li>
      <li>Each positive ion is surrounded by negative ions, and each negative ion is surrounded by positive ions.</li>
      <li>The structure extends throughout the solid (that's why it's "giant").</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🟢 Example – Sodium Chloride (NaCl)</h4>
    <ul>
      <li>Each Na⁺ ion is surrounded by 6 Cl⁻ ions.</li>
      <li>Each Cl⁻ ion is surrounded by 6 Na⁺ ions.</li>
      <li><strong>Arrangement:</strong> cubic lattice.</li>
      <li><strong>Bond type:</strong> Strong electrostatic attraction between Na⁺ and Cl⁻.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Forces in Ionic Compounds</h3>
  
  <div class="key-facts-block">
    <h4>🔵 Key Idea</h4>
    <p>The strength of ionic bonds depends on:</p>
    <ul>
      <li><strong>Charge of the ions</strong> – higher charges = stronger attraction. (e.g. MgO has stronger bonds than NaCl because 2+ and 2- ions attract more strongly.)</li>
      <li><strong>Size of ions</strong> – smaller ions = stronger attraction because charges are closer together.</li>
    </ul>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Therefore:</h4>
    <p>Compounds with highly charged, small ions have very high melting and boiling points.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Properties of Ionic Compounds</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Property</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>High melting and boiling points</td>
          <td>Strong electrostatic forces require a lot of energy to break.</td>
        </tr>
        <tr>
          <td>Don't conduct electricity when solid</td>
          <td>Ions fixed in lattice — cannot move.</td>
        </tr>
        <tr>
          <td>Conduct electricity when molten or dissolved (aqueous)</td>
          <td>Ions free to move → carry charge.</td>
        </tr>
        <tr>
          <td>Brittle</td>
          <td>When layers shift, like charges align → repel → lattice shatters.</td>
        </tr>
        <tr>
          <td>Usually soluble in water</td>
          <td>Polar water molecules pull ions apart due to attraction.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Explaining Conductivity</h3>
  
  <div class="key-facts-block">
    <h4>📘 In Solids</h4>
    <p>Ions are locked in fixed positions → cannot carry charge → <strong>non-conductor</strong>.</p>
    
    <h4>📘 In Molten or Solution</h4>
    <ul>
      <li>Lattice breaks apart → ions move freely.</li>
      <li>Positive ions move to negative electrode (cathode).</li>
      <li>Negative ions move to positive electrode (anode).</li>
    </ul>
    <p>This is why ionic compounds are used in electrolysis experiments.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Models of Ionic Structures</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Model Type</th>
          <th>Description</th>
          <th>Advantages</th>
          <th>Limitations</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2D lattice diagram</td>
          <td>Flat grid showing alternating ions</td>
          <td>Simple to draw</td>
          <td>Doesn't show 3D arrangement</td>
        </tr>
        <tr>
          <td>Ball-and-stick model</td>
          <td>3D lattice showing ions and bonds</td>
          <td>Shows regular pattern and bonding</td>
          <td>Not to scale – sticks not real</td>
        </tr>
        <tr>
          <td>Space-filling model</td>
          <td>Shows how ions pack together</td>
          <td>Realistic proportions</td>
          <td>Can't see internal structure</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>💡 Exam tip</h4>
    <p>When asked to "describe the structure of sodium chloride," always include:</p>
    <p>"A giant 3D lattice of positive and negative ions held together by strong electrostatic forces acting in all directions."</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 6 – Comparing Different Ionic Compounds</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Compound</th>
          <th>Ion Charges</th>
          <th>Relative Strength</th>
          <th>Melting Point (°C)</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>NaCl</td>
          <td>+1 / -1</td>
          <td>Moderate</td>
          <td>801</td>
          <td>Moderate electrostatic attraction</td>
        </tr>
        <tr>
          <td>MgO</td>
          <td>+2 / -2</td>
          <td>Very strong</td>
          <td>2852</td>
          <td>High attraction due to double charges</td>
        </tr>
        <tr>
          <td>CaF₂</td>
          <td>+2 / -1</td>
          <td>Strong</td>
          <td>1418</td>
          <td>Two F⁻ per Ca²⁺ – balanced strong lattice</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Trend</h4>
    <p>Greater charge → stronger ionic bond → higher melting point.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 7 – Solubility in Water</h3>
  
  <div class="key-facts-block">
    <h4>📘 Explanation</h4>
    <p>Water is a polar molecule (O end = negative, H ends = positive). When an ionic solid is placed in water:</p>
    <ul>
      <li>The positive hydrogen attracts the negative ion (anion).</li>
      <li>The negative oxygen attracts the positive ion (cation).</li>
    </ul>
    <p>The lattice breaks apart, and ions dissolve in solution.</p>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Term</h4>
    <p>This is called <strong>dissociation</strong> — important in chemistry of acids, bases, and electrolysis.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 8 – Limitations of Ionic Models</h3>
  
  <div class="key-facts-block">
    <h4>🔍 What They Miss</h4>
    <ul>
      <li>Movement of ions isn't shown.</li>
      <li>Relative ion sizes can be inaccurate.</li>
      <li>Electrostatic forces are not visible (they act in 3D, not as rods).</li>
      <li>Dynamic nature (melting, dissolving) not represented.</li>
    </ul>
  </div>
</div>
        `,
        canonical_keywords: ["ionic compounds", "giant ionic lattice", "electrostatic forces", "conductivity", "melting point", "solubility", "brittle"],
        practice_items: [
          {
            id: "ionic-compounds-1",
            prompt_template: "Explain why ionic compounds have high melting and boiling points. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["strong", "electrostatic forces", "ions", "energy", "break", "lattice"]
          },
          {
            id: "ionic-compounds-2",
            prompt_template: "Explain why ionic compounds conduct electricity when molten but not when solid. [4 marks]",
            marks: 4,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["solid", "ions", "fixed", "cannot move", "molten", "free to move", "carry charge"]
          }
        ]
      },
      {
        id: "2-1-4-covalent-bonding",
        title: "2.1.4 COVALENT BONDING",
        type: "content",
        study_group: 2,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – What Is Covalent Bonding?</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>A covalent bond is a <strong>shared pair of electrons</strong> between two non-metal atoms. Each atom contributes one or more electrons to the shared pair so that both achieve a full outer shell (stable electronic configuration).</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Idea</h4>
    <ul>
      <li>Occurs between <strong>non-metals only</strong>.</li>
      <li>The shared electrons are attracted to the nuclei of both atoms, holding them together.</li>
      <li>The atoms are <strong>neutral</strong> — no ions are formed.</li>
      <li>Covalent bonds are very strong because the attraction between nuclei and shared electrons is powerful.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – How Covalent Bonds Form</h3>
  
  <div class="key-facts-block">
    <h4>🔵 Step-by-Step Explanation</h4>
    <ol>
      <li>Each atom has unfilled outer electron shells.</li>
      <li>Atoms share electrons to fill these shells.</li>
      <li>Each atom ends up with a stable configuration (usually 8 outer electrons — 2 for hydrogen).</li>
      <li>The shared electrons form a strong electrostatic attraction between the two nuclei.</li>
    </ol>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Remember</h4>
    <p>"Covalent bonding is <strong>sharing</strong>, not transfer."</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Dot-and-Cross Diagrams</h3>
  
  <div class="key-facts-block">
    <p>Dot-and-cross diagrams show which electrons are shared between atoms. Use dots for one atom's electrons and crosses for the other's.</p>
  </div>

  <div class="example-block">
    <h4>🔵 Example 1 – Hydrogen (H₂)</h4>
    <ul>
      <li>Each H atom has 1 electron.</li>
      <li>They share a pair → both have 2 (first shell full).</li>
      <li><strong>Displayed formula:</strong> H–H</li>
      <li><strong>Dot-and-cross:</strong> Two overlapping circles with one dot and one cross shared.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🔵 Example 2 – Chlorine (Cl₂)</h4>
    <ul>
      <li>Each Cl atom has 7 outer electrons.</li>
      <li>They share one pair → both have 8.</li>
      <li><strong>Displayed formula:</strong> Cl–Cl</li>
      <li><strong>Dot-and-cross:</strong> Two overlapping circles; one dot and one cross shared.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🔵 Example 3 – Water (H₂O)</h4>
    <ul>
      <li>Oxygen: 6 outer electrons</li>
      <li>Each hydrogen: 1 electron → Two shared pairs of electrons.</li>
      <li><strong>Displayed formula:</strong> H–O–H</li>
      <li><strong>Dot-and-cross:</strong> Oxygen overlaps twice — one with each hydrogen.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🔵 Example 4 – Carbon Dioxide (CO₂)</h4>
    <ul>
      <li>Carbon: 4 outer electrons</li>
      <li>Oxygen: 6 outer electrons (×2) → Two double bonds form (each O shares 2 pairs).</li>
      <li><strong>Displayed formula:</strong> O=C=O</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🔵 Example 5 – Ammonia (NH₃)</h4>
    <ul>
      <li>Nitrogen: 5 outer electrons</li>
      <li>Hydrogen: 1 outer electron (×3) → Three shared pairs of electrons.</li>
      <li><strong>Displayed formula:</strong> 
        <pre>    H
    |
H—N—H</pre>
      </li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Types of Covalent Structures</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Structure Type</th>
          <th>Description</th>
          <th>Example</th>
          <th>Bonds Between Molecules</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Simple molecular</strong></td>
          <td>Small groups of atoms joined by covalent bonds</td>
          <td>H₂, O₂, H₂O, CH₄</td>
          <td>Weak forces (low melting point)</td>
        </tr>
        <tr>
          <td><strong>Giant covalent</strong></td>
          <td>Network of covalently bonded atoms</td>
          <td>Diamond, Graphite, SiO₂</td>
          <td>Strong bonds throughout (high melting point)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Point</h4>
    <p>In both types, covalent bonds are strong — the difference lies in the <strong>forces between molecules</strong>.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Properties of Simple Covalent Substances</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Property</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Low melting/boiling points</td>
          <td>Weak intermolecular forces (forces between molecules) are easy to overcome.</td>
        </tr>
        <tr>
          <td>Do not conduct electricity</td>
          <td>No free electrons or ions to carry charge.</td>
        </tr>
        <tr>
          <td>Usually gases or liquids at room temp</td>
          <td>Molecules move freely; weak attractions.</td>
        </tr>
        <tr>
          <td>Insoluble in water (mostly)</td>
          <td>Non-polar molecules; water is polar.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Terms</h4>
    <ul>
      <li><strong>Covalent bond:</strong> strong attraction within molecule.</li>
      <li><strong>Intermolecular forces:</strong> weak attractions between molecules.</li>
    </ul>
    <p><strong>For exams:</strong> Always say "weak intermolecular forces" — not "weak covalent bonds."</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 6 – Multiple Bonds</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Bond Type</th>
          <th>Number of Shared Electron Pairs</th>
          <th>Example</th>
          <th>Bond Representation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Single bond</td>
          <td>1</td>
          <td>H–Cl</td>
          <td>H–Cl</td>
        </tr>
        <tr>
          <td>Double bond</td>
          <td>2</td>
          <td>CO₂</td>
          <td>O=C=O</td>
        </tr>
        <tr>
          <td>Triple bond</td>
          <td>3</td>
          <td>N₂</td>
          <td>N≡N</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Remember</h4>
    <p>More shared pairs = <strong>stronger, shorter bond</strong>.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 7 – Giant Covalent (Macromolecular) Structures</h3>
  
  <div class="key-facts-block">
    <p>Some covalently bonded substances form giant 3D networks, not small molecules.</p>
  </div>

  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Substance</th>
          <th>Structure</th>
          <th>Key Properties</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Diamond</td>
          <td>Each carbon bonded to 4 others → tetrahedral lattice</td>
          <td>Very hard, very high melting point, no conductivity</td>
        </tr>
        <tr>
          <td>Graphite</td>
          <td>Each carbon bonded to 3 others → layers</td>
          <td>Conducts electricity (delocalised electrons), soft/slippery</td>
        </tr>
        <tr>
          <td>Silicon dioxide (SiO₂)</td>
          <td>Each Si bonded to 4 O atoms</td>
          <td>Hard, high melting point, insulator</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Important</h4>
    <p>These have no weak intermolecular forces — every atom is bonded covalently, making them solid and strong.</p>
  </div>
</div>
        `,
        canonical_keywords: ["covalent bonding", "shared electrons", "non-metals", "dot-and-cross diagram", "simple molecular", "giant covalent", "intermolecular forces", "multiple bonds"],
        practice_items: [
          {
            id: "covalent-1",
            prompt_template: "Explain what a covalent bond is and describe how it forms. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["shared pair", "electrons", "non-metals", "full outer shell", "nuclei", "attraction"]
          },
          {
            id: "covalent-2",
            prompt_template: "Explain why simple covalent substances have low melting and boiling points. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["weak", "intermolecular forces", "between molecules", "easy to overcome", "little energy"]
          }
        ]
      },
      {
        id: "2-1-5-metallic-bonding",
        title: "2.1.5 METALLIC BONDING",
        type: "content",
        study_group: 2,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – What Is Metallic Bonding?</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>Metallic bonding occurs between metal atoms. It involves a <strong>giant lattice of positive metal ions</strong> surrounded by a <strong>sea of delocalised electrons</strong> that move freely throughout the structure.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Idea</h4>
    <p>Metal atoms lose their outer electrons, forming positive ions. These electrons become <strong>delocalised</strong> (free to move). Strong electrostatic forces of attraction between the positive ions and the negative electrons hold the metal together.</p>
  </div>

  <div class="example-block">
    <h4>📘 Representation</h4>
    <p><strong>Metal ions:</strong> ⁺⁺⁺⁺⁺</p>
    <p><strong>Delocalised electrons:</strong> e⁻ e⁻ e⁻ e⁻</p>
    <p>🧠 These electrons act like glue, holding the lattice together.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Structure of Metals</h3>
  
  <div class="key-facts-block">
    <h4>🔵 Giant Metallic Lattice</h4>
    <ul>
      <li>Atoms are arranged in regular layers.</li>
      <li>The structure extends in all directions (giant lattice).</li>
      <li>The delocalised electrons move freely between positive ions.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🟢 Example – Sodium Metal (Na)</h4>
    <ul>
      <li>Each Na atom loses 1 outer electron → Na⁺ ion.</li>
      <li>Lost electrons become delocalised.</li>
      <li>The attraction between Na⁺ ions and delocalised electrons forms metallic bonds.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Key Properties of Metals</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Property</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>High melting and boiling points</td>
          <td>Strong electrostatic attraction between positive ions and delocalised electrons requires lots of energy to overcome.</td>
        </tr>
        <tr>
          <td>Good electrical conductivity</td>
          <td>Delocalised electrons move freely, carrying charge through the structure.</td>
        </tr>
        <tr>
          <td>Good thermal conductivity</td>
          <td>Free electrons transfer kinetic energy efficiently.</td>
        </tr>
        <tr>
          <td>Malleable (can be hammered into shape)</td>
          <td>Layers of ions can slide over each other while metallic bonds stay intact.</td>
        </tr>
        <tr>
          <td>Ductile (can be drawn into wires)</td>
          <td>Same reason — layers can move without breaking bonds.</td>
        </tr>
        <tr>
          <td>Shiny (lustrous)</td>
          <td>Delocalised electrons reflect light from surface.</td>
        </tr>
        <tr>
          <td>High density</td>
          <td>Atoms packed tightly in lattice.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Explanation of Metallic Bond Strength</h3>
  
  <div class="key-facts-block">
    <p>The strength of metallic bonds depends on:</p>
    <ul>
      <li><strong>Number of delocalised electrons</strong> → more electrons = stronger bonding (e.g. Mg stronger than Na).</li>
      <li><strong>Size of the ions</strong> → smaller ions = stronger attraction (closer positive charge).</li>
      <li><strong>Charge on metal ion</strong> → higher charge = stronger bond (Al³⁺ > Mg²⁺ > Na⁺).</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🔬 Trend Example</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Metal</th>
          <th>Outer Electrons</th>
          <th>Ion Charge</th>
          <th>Strength</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Sodium (Na)</td>
          <td>1</td>
          <td>+1</td>
          <td>Weakest</td>
        </tr>
        <tr>
          <td>Magnesium (Mg)</td>
          <td>2</td>
          <td>+2</td>
          <td>Stronger</td>
        </tr>
        <tr>
          <td>Aluminium (Al)</td>
          <td>3</td>
          <td>+3</td>
          <td>Very strong</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Metals vs Non-Metals</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Property</th>
          <th>Metals</th>
          <th>Non-Metals</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Bond Type</td>
          <td>Metallic</td>
          <td>Covalent / Ionic</td>
        </tr>
        <tr>
          <td>Conductivity</td>
          <td>Conduct electricity and heat</td>
          <td>Poor conductors (except graphite)</td>
        </tr>
        <tr>
          <td>Melting/Boiling Point</td>
          <td>High</td>
          <td>Often low (if molecular)</td>
        </tr>
        <tr>
          <td>Strength</td>
          <td>Strong, dense</td>
          <td>Brittle, weak (if solid)</td>
        </tr>
        <tr>
          <td>Malleability</td>
          <td>Malleable & ductile</td>
          <td>Brittle</td>
        </tr>
        <tr>
          <td>Appearance</td>
          <td>Shiny</td>
          <td>Dull</td>
        </tr>
        <tr>
          <td>Typical Elements</td>
          <td>Fe, Cu, Al</td>
          <td>S, O, Cl</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Point</h4>
    <p>The difference arises from the presence (metals) or absence (non-metals) of delocalised electrons.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 6 – Why Metals Conduct Electricity</h3>
  
  <div class="key-facts-block">
    <h4>🔋 In Detail</h4>
    <p>Metals contain delocalised electrons that can move freely.</p>
    <p>When voltage is applied:</p>
    <ul>
      <li>Electrons flow towards the positive terminal, carrying charge.</li>
      <li>This allows a current to pass through the entire metal.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>💧 Even in Liquid (Molten) State</h4>
    <p>Metals conduct in both solid and liquid states, because delocalised electrons remain free to move.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 7 – Alloys</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>An alloy is a mixture of metals (or a metal and another element) that improves a metal's properties.</p>
  </div>

  <div class="key-facts-block">
    <h4>📘 Structure Explanation</h4>
    <ul>
      <li>Pure metals have regular layers of atoms → easy to slide → soft.</li>
      <li>Alloys contain different-sized atoms, which distort the layers, making it harder for them to slide → stronger and harder.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🔬 Common Examples</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Alloy</th>
          <th>Composition</th>
          <th>Properties</th>
          <th>Uses</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Steel</td>
          <td>Iron + carbon</td>
          <td>Strong, hard</td>
          <td>Construction, tools</td>
        </tr>
        <tr>
          <td>Brass</td>
          <td>Copper + zinc</td>
          <td>Hard, corrosion-resistant</td>
          <td>Musical instruments, fittings</td>
        </tr>
        <tr>
          <td>Bronze</td>
          <td>Copper + tin</td>
          <td>Tough, corrosion-resistant</td>
          <td>Medals, statues</td>
        </tr>
        <tr>
          <td>Duralumin</td>
          <td>Aluminium + copper + magnesium</td>
          <td>Strong, light</td>
          <td>Aircraft</td>
        </tr>
        <tr>
          <td>Solder</td>
          <td>Lead + tin</td>
          <td>Low melting point</td>
          <td>Joining metal parts</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>📝 Summary Sentence</h4>
    <p>"Alloys are harder than pure metals because the different-sized atoms distort the regular layers, preventing them from sliding."</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 8 – Metals and Energy</h3>
  
  <div class="key-facts-block">
    <h4>🔋 Bonding Energy</h4>
    <p>Breaking metallic bonds requires large amounts of energy because of:</p>
    <ul>
      <li>Strong electrostatic attraction, and</li>
      <li>The extensive network of bonding throughout the structure.</li>
    </ul>
  </div>
</div>
        `,
        canonical_keywords: ["metallic bonding", "delocalised electrons", "giant metallic lattice", "conductivity", "malleable", "ductile", "alloys"],
        practice_items: [
          {
            id: "metallic-1",
            prompt_template: "Describe the structure and bonding in metals. [4 marks]",
            marks: 4,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["giant lattice", "positive ions", "delocalised electrons", "electrostatic forces", "sea of electrons"]
          },
          {
            id: "metallic-2",
            prompt_template: "Explain why metals conduct electricity. [2 marks]",
            marks: 2,
            type: "short-answer",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["delocalised electrons", "free to move", "carry charge"]
          },
          {
            id: "metallic-3",
            prompt_template: "Explain why alloys are harder than pure metals. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["different sized atoms", "distort", "layers", "harder to slide", "irregular"]
          }
        ]
      },
      {
        id: "2-2-1-three-states-matter",
        title: "2.2.1 THE THREE STATES OF MATTER",
        type: "content",
        study_group: 3,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – The Particle Model and the Three States</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>The particle model explains the properties and behaviour of solids, liquids and gases by describing how the particles are arranged and move, and how strong the forces of attraction are between them.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Ideas</h4>
    <ul>
      <li>All matter is made of tiny particles (atoms or molecules).</li>
      <li>Particles are in constant motion.</li>
      <li>The amount of energy they have determines their movement and state.</li>
      <li>Forces of attraction between particles vary depending on the state.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Particle Arrangement and Movement</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Property</th>
          <th>Solid</th>
          <th>Liquid</th>
          <th>Gas</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Arrangement</td>
          <td>Regular, tightly packed</td>
          <td>Irregular, close together</td>
          <td>Random, far apart</td>
        </tr>
        <tr>
          <td>Movement</td>
          <td>Vibrate around fixed positions</td>
          <td>Move around each other</td>
          <td>Move freely in all directions</td>
        </tr>
        <tr>
          <td>Forces Between Particles</td>
          <td>Strong</td>
          <td>Moderate</td>
          <td>Very weak</td>
        </tr>
        <tr>
          <td>Energy of Particles</td>
          <td>Low</td>
          <td>Medium</td>
          <td>High</td>
        </tr>
        <tr>
          <td>Shape</td>
          <td>Fixed shape</td>
          <td>No fixed shape</td>
          <td>No fixed shape</td>
        </tr>
        <tr>
          <td>Volume</td>
          <td>Fixed</td>
          <td>Fixed</td>
          <td>Can be compressed</td>
        </tr>
        <tr>
          <td>Density</td>
          <td>High</td>
          <td>Medium</td>
          <td>Low</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>📝 In Summary</h4>
    <ul>
      <li><strong>Solids:</strong> Strong forces keep particles fixed.</li>
      <li><strong>Liquids:</strong> Particles can move, flow, and take shape of container.</li>
      <li><strong>Gases:</strong> Weak forces → high energy → fill available space.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Explaining Melting and Boiling Points</h3>
  
  <div class="key-facts-block">
    <h4>⚡ Key Principle</h4>
    <p>The melting point and boiling point of a substance depend on the <strong>strength of the forces between its particles</strong>.</p>
  </div>

  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Force Strength</th>
          <th>Example</th>
          <th>Melting/Boiling Point</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Strong (e.g. ionic or covalent)</td>
          <td>Sodium chloride, diamond</td>
          <td>Very high</td>
        </tr>
        <tr>
          <td>Weak (e.g. simple molecules)</td>
          <td>Oxygen, water, methane</td>
          <td>Low</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="key-facts-block">
    <h4>📘 Explanation</h4>
    <ul>
      <li>When heated, particles gain kinetic energy and move faster.</li>
      <li>When they have enough energy to overcome forces of attraction, a change of state occurs.</li>
      <li><strong>Stronger forces → more energy needed → higher melting and boiling points.</strong></li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Predicting States of Matter</h3>
  
  <div class="key-facts-block">
    <h4>🔍 How to Predict</h4>
    <p>If you know the melting point and boiling point, you can predict the state at a given temperature.</p>
  </div>

  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Temperature vs. Points</th>
          <th>State</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Below melting point</td>
          <td>Solid</td>
        </tr>
        <tr>
          <td>Between melting and boiling point</td>
          <td>Liquid</td>
        </tr>
        <tr>
          <td>Above boiling point</td>
          <td>Gas</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="example-block">
    <h4>🟢 Example – Water</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Temperature</th>
          <th>State</th>
          <th>Reason</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>-10°C</td>
          <td>Solid</td>
          <td>Below 0°C (melting point)</td>
        </tr>
        <tr>
          <td>25°C</td>
          <td>Liquid</td>
          <td>Between 0°C and 100°C</td>
        </tr>
        <tr>
          <td>120°C</td>
          <td>Gas</td>
          <td>Above 100°C (boiling point)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Exam Tip</h4>
    <p>AQA often gives melting and boiling data — you must state why (use phrases like "particles have enough energy to overcome forces").</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Energy Transfers in Changes of State</h3>
  
  <div class="key-facts-block">
    <h4>🔋 When Heating (Endothermic)</h4>
    <ul>
      <li>Energy is absorbed.</li>
      <li>Particles gain kinetic energy → move faster.</li>
      <li>Forces weaken → particles move further apart.</li>
      <li>Solid → liquid → gas.</li>
    </ul>
  </div>

  <div class="key-facts-block">
    <h4>❄️ When Cooling (Exothermic)</h4>
    <ul>
      <li>Energy is released.</li>
      <li>Particles lose kinetic energy → move slower.</li>
      <li>Forces strengthen → particles move closer together.</li>
      <li>Gas → liquid → solid.</li>
    </ul>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Important Note</h4>
    <p>Changes of state are <strong>physical, not chemical</strong> — no new substance forms.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 6 – Particle Model and Limitations</h3>
  
  <div class="key-facts-block">
    <h4>✅ What the Model Shows</h4>
    <ul>
      <li>General particle arrangement.</li>
      <li>Relative movement and energy.</li>
      <li>Strength of forces in each state.</li>
    </ul>
  </div>

  <div class="key-facts-block">
    <h4>⚠️ What the Model Doesn't Show</h4>
    <ul>
      <li>Real particle sizes — atoms are not solid spheres.</li>
      <li>The spaces between particles — scale not accurate.</li>
      <li>The forces between particles — can't see attraction.</li>
      <li>The dynamic nature of particles — they constantly move and vibrate.</li>
    </ul>
  </div>

  <div class="note-block">
    <h4>🔬 Advanced Note</h4>
    <p>The particle model is simplified; in reality:</p>
    <ul>
      <li>Atoms have electron clouds, not hard edges.</li>
      <li>Forces vary continuously, not at set distances.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 7 – Particle Model Diagrams (Visual Descriptions)</h3>
  
  <div class="key-facts-block">
    <h4>📘 Solid</h4>
    <ul>
      <li>Regular pattern, close-packed particles.</li>
      <li>Vibrating around fixed positions.</li>
      <li>Strong attractions.</li>
    </ul>
  </div>

  <div class="key-facts-block">
    <h4>📘 Liquid</h4>
    <ul>
      <li>Close together but randomly arranged.</li>
      <li>Move past each other.</li>
      <li>Moderate attractions.</li>
    </ul>
  </div>

  <div class="key-facts-block">
    <h4>📘 Gas</h4>
    <ul>
      <li>Far apart, random motion.</li>
      <li>Weak attractions.</li>
      <li>Frequent collisions, easily compressed.</li>
    </ul>
  </div>

  <div class="exam-tip-block">
    <h4>📝 Important Keywords</h4>
    <p>You must be able to recognise and describe these diagrams using the keywords: <strong>regular, random, spacing, movement, energy, and forces</strong>.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 8 – Energy and Changes of State</h3>
  
  <div class="key-facts-block">
    <h4>⚡ Key Energy Concepts</h4>
    <p>When particles change state, energy goes into or out of <strong>breaking or forming intermolecular forces</strong>, not into changing temperature.</p>
    <p>During melting or boiling, <strong>temperature stays constant</strong> — even while energy is being added.</p>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Important Words:</h4>
    <ul>
      <li><strong>Endothermic</strong> – absorbs energy (melting, boiling, sublimation).</li>
      <li><strong>Exothermic</strong> – releases energy (freezing, condensation, deposition).</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 9 – Using the Particle Model to Explain Properties</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Property</th>
          <th>Solid</th>
          <th>Liquid</th>
          <th>Gas</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Can flow?</td>
          <td>❌</td>
          <td>✅</td>
          <td>✅</td>
        </tr>
        <tr>
          <td>Fixed volume?</td>
          <td>✅</td>
          <td>✅</td>
          <td>❌</td>
        </tr>
        <tr>
          <td>Fixed shape?</td>
          <td>✅</td>
          <td>❌</td>
          <td>❌</td>
        </tr>
        <tr>
          <td>Compressible?</td>
          <td>❌</td>
          <td>❌</td>
          <td>✅</td>
        </tr>
        <tr>
          <td>Conduct heat easily?</td>
          <td>Often</td>
          <td>Moderate</td>
          <td>Poor</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="example-block">
    <h4>🧠 Example Applications:</h4>
    <ul>
      <li>Liquids are used as lubricants because particles can move.</li>
      <li>Gases are easily compressed for transport (e.g. oxygen tanks).</li>
    </ul>
  </div>
</div>
        `,
        canonical_keywords: ["particle model", "states of matter", "solid", "liquid", "gas", "forces", "melting point", "boiling point", "endothermic", "exothermic"],
        practice_items: [
          {
            id: "states-1",
            prompt_template: "Describe the arrangement and movement of particles in solids, liquids, and gases. [6 marks]",
            marks: 6,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["solid", "regular", "vibrate", "liquid", "move around", "gas", "random", "freely", "forces"]
          },
          {
            id: "states-2",
            prompt_template: "Explain why substances with strong forces between particles have high melting points. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["strong forces", "energy", "overcome", "break", "high temperature"]
          }
        ]
      },
      {
        id: "2-2-3-simple-covalent",
        title: "2.2.3 COVALENT SUBSTANCES (SIMPLE MOLECULES)",
        type: "content",
        study_group: 3,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Structure and Bonding in Simple Molecules</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>A simple covalent substance (or simple molecular substance) is made of small molecules containing a few atoms joined by <strong>strong covalent bonds within the molecule</strong>. However, the forces between molecules (called intermolecular forces) are <strong>weak</strong>.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Idea</h4>
    <ul>
      <li>Covalent bonds hold the atoms together <strong>inside</strong> each molecule.</li>
      <li>Intermolecular forces act <strong>between</strong> molecules, not inside them.</li>
      <li>The weak intermolecular forces determine the physical properties (melting, boiling, state).</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🟢 Examples of Simple Molecular Substances</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Substance</th>
          <th>Formula</th>
          <th>Bonds Inside Molecule</th>
          <th>Forces Between Molecules</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Hydrogen</td>
          <td>H₂</td>
          <td>Covalent</td>
          <td>Weak</td>
        </tr>
        <tr>
          <td>Oxygen</td>
          <td>O₂</td>
          <td>Covalent</td>
          <td>Weak</td>
        </tr>
        <tr>
          <td>Water</td>
          <td>H₂O</td>
          <td>Covalent</td>
          <td>Weak hydrogen bonds</td>
        </tr>
        <tr>
          <td>Methane</td>
          <td>CH₄</td>
          <td>Covalent</td>
          <td>Weak</td>
        </tr>
        <tr>
          <td>Carbon dioxide</td>
          <td>CO₂</td>
          <td>Covalent</td>
          <td>Weak</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>📝 Exam tip</h4>
    <p>Always refer to "<strong>weak intermolecular forces</strong>," not "weak covalent bonds." Covalent bonds are strong, but the forces between molecules are weak.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Melting and Boiling Points</h3>
  
  <div class="key-facts-block">
    <h4>📘 Explanation</h4>
    <p>Simple molecular substances have <strong>low melting and boiling points</strong> because:</p>
    <p>Only <strong>weak intermolecular forces</strong> need to be overcome to melt or boil the substance.</p>
    <p>Covalent bonds inside molecules are strong and <strong>do not break</strong>.</p>
  </div>

  <div class="key-facts-block">
    <h4>⚡ Key Detail</h4>
    <p>When you heat a covalent substance:</p>
    <ul>
      <li>The <strong>molecules</strong> separate, not the atoms.</li>
      <li>The <strong>intermolecular forces</strong> break, not the covalent bonds.</li>
    </ul>
  </div>

  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Example</th>
          <th>Forces Between Molecules</th>
          <th>Melting/Boiling Point</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Oxygen (O₂)</td>
          <td>Weak</td>
          <td>Very low (gas at room temp)</td>
        </tr>
        <tr>
          <td>Water (H₂O)</td>
          <td>Moderate (hydrogen bonding)</td>
          <td>0°C / 100°C</td>
        </tr>
        <tr>
          <td>Carbon dioxide (CO₂)</td>
          <td>Weak</td>
          <td>Sublimes at –78°C</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Remember</h4>
    <p>The stronger the intermolecular forces, the higher the melting/boiling point.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Electrical Conductivity</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Property</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Do not conduct electricity</td>
          <td>Molecules have no free electrons or ions to carry charge.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="key-facts-block">
    <p>Even if dissolved in water, they usually do not conduct, because molecules remain neutral (except acids or polar molecules).</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Solubility and States</h3>
  
  <div class="key-facts-block">
    <h4>💧 Solubility</h4>
    <ul>
      <li>Many covalent substances are <strong>insoluble in water</strong>, but may dissolve in non-polar solvents (like petrol).</li>
      <li>Some polar covalent molecules (e.g. sugar, ethanol) dissolve in water due to hydrogen bonding.</li>
    </ul>
  </div>

  <div class="key-facts-block">
    <h4>📘 Common Physical States at Room Temperature</h4>
    <p>Most simple molecular substances are <strong>gases or liquids</strong> at room temperature due to weak intermolecular forces.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Forces Between Molecules</h3>
  
  <div class="key-facts-block">
    <h4>🔵 Intermolecular Forces</h4>
    <ul>
      <li><strong>Van der Waals (induced dipole)</strong> – weakest; temporary attraction.</li>
      <li><strong>Permanent dipole-dipole</strong> – between slightly charged polar molecules.</li>
      <li><strong>Hydrogen bonds</strong> – strongest type; between H and F, O, or N.</li>
    </ul>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Order of Strength</h4>
    <p>Hydrogen bonds > Dipole-dipole > Van der Waals.</p>
  </div>

  <div class="example-block">
    <h4>💡 Example</h4>
    <ul>
      <li>Water has <strong>hydrogen bonds</strong> → relatively high boiling point.</li>
      <li>Oxygen has <strong>Van der Waals</strong> → gas at room temp.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 6 – Examples of Simple Molecular Structures</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Molecule</th>
          <th>Description</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>H₂</td>
          <td>Two atoms sharing one pair of electrons</td>
          <td>Very small molecule</td>
        </tr>
        <tr>
          <td>O₂</td>
          <td>Two atoms sharing two pairs (double bond)</td>
          <td>Gas, low boiling point</td>
        </tr>
        <tr>
          <td>H₂O</td>
          <td>Two H atoms bonded to O (bent shape)</td>
          <td>Hydrogen bonding present</td>
        </tr>
        <tr>
          <td>CH₄</td>
          <td>Carbon with four single bonds to H</td>
          <td>Tetrahedral shape</td>
        </tr>
        <tr>
          <td>CO₂</td>
          <td>Carbon with two double bonds to O</td>
          <td>Linear molecule, no H-bonds</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 7 – Explaining Properties with Forces</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Property</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Low melting and boiling points</td>
          <td>Weak intermolecular forces.</td>
        </tr>
        <tr>
          <td>Do not conduct electricity</td>
          <td>No charged particles.</td>
        </tr>
        <tr>
          <td>Usually gases or liquids</td>
          <td>Weak forces between molecules.</td>
        </tr>
        <tr>
          <td>Soft if solid</td>
          <td>Weak attractions between layers of molecules.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>📝 Exam Tip</h4>
    <p>When answering "Explain why…" questions: always say "<strong>because only weak intermolecular forces need to be overcome</strong>."</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 8 – Key Differences Between Simple and Giant Covalent Structures</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Feature</th>
          <th>Simple Covalent</th>
          <th>Giant Covalent</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Bonds</td>
          <td>Strong covalent bonds within molecules, weak between</td>
          <td>Strong covalent bonds throughout</td>
        </tr>
        <tr>
          <td>Melting/Boiling Point</td>
          <td>Low</td>
          <td>Very high</td>
        </tr>
        <tr>
          <td>Conductivity</td>
          <td>None</td>
          <td>None (except graphite)</td>
        </tr>
        <tr>
          <td>State at Room Temp</td>
          <td>Often gas or liquid</td>
          <td>Solid</td>
        </tr>
        <tr>
          <td>Example</td>
          <td>H₂O, CO₂, CH₄</td>
          <td>Diamond, Graphite, SiO₂</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 9 – Explaining Trends</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Trend</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>As molecules get larger</td>
          <td>→ More electrons → stronger intermolecular forces → higher melting/boiling points</td>
        </tr>
        <tr>
          <td>Small molecules</td>
          <td>→ Weak forces → gases</td>
        </tr>
        <tr>
          <td>Medium molecules</td>
          <td>→ Stronger forces → liquids</td>
        </tr>
        <tr>
          <td>Large molecules</td>
          <td>→ Even stronger → solids</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 AQA Example</h4>
    <p>AQA may ask why iodine is a solid but fluorine is a gas — answer: <strong>because iodine molecules are larger and have stronger intermolecular forces</strong>.</p>
  </div>
</div>
        `,
        canonical_keywords: ["simple molecular", "covalent substances", "intermolecular forces", "low melting point", "non-conductor", "Van der Waals", "hydrogen bonds"],
        practice_items: [
          {
            id: "simple-covalent-1",
            prompt_template: "Explain why simple molecular substances have low melting and boiling points. [4 marks]",
            marks: 4,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["weak", "intermolecular forces", "between molecules", "little energy", "overcome", "break"]
          },
          {
            id: "simple-covalent-2",
            prompt_template: "Explain why simple molecular substances do not conduct electricity. [2 marks]",
            marks: 2,
            type: "short-answer",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["no free electrons", "no ions", "no charged particles", "carry charge"]
          }
        ]
      },
      {
        id: "2-2-4-giant-covalent",
        title: "2.2.4 GIANT COVALENT STRUCTURES (MACROMOLECULES)",
        type: "content",
        study_group: 4,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – What Are Giant Covalent Structures?</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>A giant covalent structure (also known as a macromolecule) is a huge 3D network of atoms bonded together by <strong>strong covalent bonds throughout the structure</strong>.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Facts</h4>
    <ul>
      <li>Found in some non-metals and compounds of non-metals (like carbon and silicon dioxide).</li>
      <li>Contain no weak intermolecular forces — all atoms are connected by covalent bonds.</li>
      <li>Require large amounts of energy to break → very high melting and boiling points.</li>
      <li>Usually solids at room temperature.</li>
      <li>Generally don't conduct electricity (except graphite).</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Diamond (Carbon)</h3>
  
  <div class="key-facts-block">
    <h4>🔬 Structure</h4>
    <ul>
      <li>Each carbon atom forms four covalent bonds to other carbon atoms.</li>
      <li>Atoms arranged in a tetrahedral (3D) lattice.</li>
      <li>Bonds are identical and extremely strong.</li>
      <li>No free electrons — all used in bonding.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>💎 Properties and Explanations</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Property</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Very hard</td>
          <td>Each atom strongly bonded to four others; rigid 3D network</td>
        </tr>
        <tr>
          <td>Very high melting point</td>
          <td>Many strong covalent bonds throughout structure</td>
        </tr>
        <tr>
          <td>Does not conduct electricity</td>
          <td>No free electrons or ions</td>
        </tr>
        <tr>
          <td>Transparent</td>
          <td>Regular structure allows light to pass through</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Graphite (Carbon)</h3>
  
  <div class="key-facts-block">
    <h4>🔬 Structure</h4>
    <ul>
      <li>Each carbon atom forms three covalent bonds → forms flat hexagonal layers.</li>
      <li>Each atom has one delocalised electron that moves freely between layers.</li>
      <li>Layers held together by weak intermolecular forces → can slide over each other easily.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>💎 Properties and Explanations</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Property</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Soft and slippery</td>
          <td>Layers can slide due to weak forces between them.</td>
        </tr>
        <tr>
          <td>Good conductor of electricity and heat</td>
          <td>Delocalised electrons move freely between layers.</td>
        </tr>
        <tr>
          <td>High melting point</td>
          <td>Strong covalent bonds in layers require a lot of energy to break.</td>
        </tr>
        <tr>
          <td>Less dense than diamond</td>
          <td>Layers are far apart.</td>
        </tr>
        <tr>
          <td>Opaque</td>
          <td>Free electrons absorb light.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="example-block">
    <h4>🧠 Uses</h4>
    <ul>
      <li>Electrodes (good conductor).</li>
      <li>Lubricants (layers slide easily).</li>
      <li>Pencils (layers flake off onto paper).</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Graphene (Single Layer of Graphite)</h3>
  
  <div class="key-facts-block">
    <h4>🔬 Structure</h4>
    <ul>
      <li>A single layer of graphite → one atom thick.</li>
      <li>Atoms arranged in a hexagonal pattern.</li>
      <li>Contains delocalised electrons that move across the layer.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>💎 Properties</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Property</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Very strong</td>
          <td>Each carbon bonded to three others in a sheet.</td>
        </tr>
        <tr>
          <td>Conducts electricity</td>
          <td>Delocalised electrons can move freely.</td>
        </tr>
        <tr>
          <td>Lightweight and flexible</td>
          <td>Single atomic layer, extremely thin.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="example-block">
    <h4>🧠 Uses</h4>
    <ul>
      <li>Flexible electronics.</li>
      <li>Lightweight composite materials.</li>
      <li>Conductive coatings.</li>
      <li>Medical sensors.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Silicon Dioxide (SiO₂)</h3>
  
  <div class="key-facts-block">
    <h4>🔬 Structure</h4>
    <ul>
      <li>Each silicon atom covalently bonded to four oxygen atoms.</li>
      <li>Each oxygen atom bonded to two silicon atoms.</li>
      <li>Giant covalent lattice, similar to diamond.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>💎 Properties and Explanations</h4>
    <ul>
      <li><strong>High melting and boiling point:</strong> Strong covalent bonds throughout structure.</li>
      <li><strong>Hard:</strong> Strong bonds between silicon and oxygen.</li>
      <li><strong>Insoluble in water:</strong> No attraction to polar molecules.</li>
      <li><strong>Does not conduct electricity:</strong> No free electrons or ions.</li>
    </ul>
  </div>

  <div class="key-facts-block">
    <h4>📘 Common Names</h4>
    <ul>
      <li>Also known as silica or quartz.</li>
      <li>Main component of sand and glass.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 6 – Comparing Giant Covalent Structures</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Structure</th>
          <th>Type of Bonds</th>
          <th>Conductivity</th>
          <th>Hardness</th>
          <th>Melting Point</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Diamond</td>
          <td>C–C single bonds (4 per atom)</td>
          <td>None</td>
          <td>Extremely hard</td>
          <td>Very high</td>
          <td>Used in tools</td>
        </tr>
        <tr>
          <td>Graphite</td>
          <td>3 bonds per atom; layers with delocalised electrons</td>
          <td>Yes</td>
          <td>Soft/slippery</td>
          <td>Very high</td>
          <td>Used in electrodes, pencils</td>
        </tr>
        <tr>
          <td>Graphene</td>
          <td>3 bonds per atom; single sheet</td>
          <td>Yes</td>
          <td>Very strong</td>
          <td>Very high</td>
          <td>Used in electronics</td>
        </tr>
        <tr>
          <td>Silicon Dioxide</td>
          <td>Si–O covalent bonds</td>
          <td>None</td>
          <td>Hard</td>
          <td>Very high</td>
          <td>Component of glass, sand</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 7 – Why Giant Covalent Substances Have High Melting Points</h3>
  
  <div class="key-facts-block">
    <h4>📘 Explanation</h4>
    <ul>
      <li>Covalent bonds are very strong → require a lot of energy to break.</li>
      <li>Because the structure is giant, many bonds must be broken.</li>
      <li>Therefore, melting and boiling points are very high.</li>
    </ul>
  </div>

  <div class="exam-tip-block">
    <h4>📝 The key AQA phrase:</h4>
    <p>"Giant covalent structures have high melting and boiling points because of the <strong>strong covalent bonds that must be broken</strong> to change state."</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 8 – Conductivity in Giant Covalent Structures</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Substance</th>
          <th>Conductivity</th>
          <th>Reason</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Diamond</td>
          <td>❌</td>
          <td>No free electrons.</td>
        </tr>
        <tr>
          <td>Graphite</td>
          <td>✅</td>
          <td>Delocalised electrons move freely between layers.</td>
        </tr>
        <tr>
          <td>Graphene</td>
          <td>✅</td>
          <td>Delocalised electrons move across sheet.</td>
        </tr>
        <tr>
          <td>Silicon dioxide</td>
          <td>❌</td>
          <td>No delocalised electrons.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Remember</h4>
    <p>Always specify that conductivity comes from delocalised electrons, not ions.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 9 – Strength and Uses</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Substance</th>
          <th>Key Property</th>
          <th>Common Uses</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Diamond</td>
          <td>Extremely hard</td>
          <td>Cutting, drilling, jewellery</td>
        </tr>
        <tr>
          <td>Graphite</td>
          <td>Conductive, slippery</td>
          <td>Electrodes, lubricants, pencils</td>
        </tr>
        <tr>
          <td>Graphene</td>
          <td>Strong, conductive, light</td>
          <td>Electronics, composites</td>
        </tr>
        <tr>
          <td>Silicon dioxide</td>
          <td>Hard, transparent</td>
          <td>Glass, ceramics, sand</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
        `,
        canonical_keywords: ["giant covalent", "macromolecule", "diamond", "graphite", "graphene", "silicon dioxide", "high melting point", "delocalised electrons"],
        practice_items: [
          {
            id: "giant-covalent-1",
            prompt_template: "Explain why diamond is very hard and has a very high melting point. [4 marks]",
            marks: 4,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["four", "covalent bonds", "carbon atom", "strong", "giant structure", "energy", "break"]
          },
          {
            id: "giant-covalent-2",
            prompt_template: "Explain why graphite conducts electricity but diamond does not. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["graphite", "delocalised electrons", "free to move", "diamond", "no free electrons", "all electrons in bonds"]
          }
        ]
      },
      {
        id: "2-3-1-diamond",
        title: "2.3.1 DIAMOND",
        type: "content",
        study_group: 5,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Structure of Diamond</h3>
  
  <div class="key-facts-block">
    <h4>📘 Description</h4>
    <ul>
      <li>Diamond is a <strong>giant covalent structure</strong> (a type of macromolecule).</li>
      <li>It is made entirely of carbon atoms.</li>
      <li>Each carbon atom is covalently bonded to <strong>four other carbon atoms</strong>.</li>
      <li>These bonds form a <strong>tetrahedral 3D lattice</strong> (a pyramid-like arrangement).</li>
      <li>All bonds are identical and very strong, extending throughout the entire crystal.</li>
    </ul>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Point:</h4>
    <p>There are <strong>no layers, no weak forces, and no free electrons</strong> in diamond. Every atom is linked to the structure by strong covalent bonds in all directions.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Properties of Diamond</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Property</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Very hard</td>
          <td>Hardest known natural material.</td>
        </tr>
        <tr>
          <td>Very high melting point</td>
          <td>Requires huge energy to break the bonds.</td>
        </tr>
        <tr>
          <td>Does not conduct electricity</td>
          <td>No delocalised (free) electrons or ions.</td>
        </tr>
        <tr>
          <td>Transparent and shiny</td>
          <td>Strong bonding → light passes through cleanly.</td>
        </tr>
        <tr>
          <td>Insoluble in water</td>
          <td>Bonds too strong to be broken by polar molecules.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Explaining Diamond's Properties Using Structure and Bonding</h3>
  
  <div class="key-facts-block">
    <h4>💎 1. Diamond is very hard</h4>
    <p>Each carbon atom forms <strong>four strong covalent bonds</strong> to other carbon atoms. These bonds extend throughout the entire structure, creating a rigid, 3D network. There are no weak bonds or layers to slide over each other. ✅ Therefore, diamond is extremely hard and resistant to scratching or breaking.</p>
  </div>

  <div class="exam-tip-block">
    <h4>📝 Exam phrase:</h4>
    <p>"Diamond is very hard because each carbon atom is covalently bonded to <strong>four others in a giant 3D lattice</strong>."</p>
  </div>

  <div class="key-facts-block">
    <h4>💎 2. Diamond has a very high melting point</h4>
    <p>The covalent bonds in diamond are very strong and there are <strong>millions of them throughout the lattice</strong>. To melt diamond, all of these bonds must be broken.</p>
    <p>Breaking covalent bonds requires a lot of energy (not just separating molecules). Therefore, diamond has an extremely high melting and boiling point (around 3550°C).</p>
  </div>

  <div class="exam-tip-block">
    <h4>📝 Exam phrase:</h4>
    <p>"Diamond has a very high melting point because a <strong>large amount of energy is required to break the many strong covalent bonds</strong> throughout the structure."</p>
  </div>

  <div class="key-facts-block">
    <h4>💎 3. Diamond does not conduct electricity</h4>
    <p>Electricity requires free electrons or ions to carry charge.</p>
    <p>In diamond, <strong>all four outer electrons of each carbon atom are used in covalent bonds</strong>.</p>
    <p>There are no delocalised electrons and no ions that can move. Therefore, diamond is a non-conductor of electricity, both as a solid and liquid.</p>
  </div>

  <div class="exam-tip-block">
    <h4>📝 Exam phrase:</h4>
    <p>"Diamond does not conduct electricity because it has <strong>no delocalised electrons or ions</strong> to carry charge."</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Summary: Linking Structure to Properties</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Structure Feature</th>
          <th>Property</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Each carbon atom covalently bonded to four others</td>
          <td>Hard</td>
          <td>Strong network; no weak bonds</td>
        </tr>
        <tr>
          <td>Many strong covalent bonds</td>
          <td>High melting point</td>
          <td>Large energy required to break them</td>
        </tr>
        <tr>
          <td>No delocalised electrons or ions</td>
          <td>Non-conductor</td>
          <td>No charged particles available to carry current</td>
        </tr>
        <tr>
          <td>Tetrahedral lattice</td>
          <td>Transparent and strong</td>
          <td>Evenly bonded, symmetrical arrangement</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Uses of Diamond</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Use</th>
          <th>Reason</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cutting tools and drills</td>
          <td>Extremely hard; can cut through other materials</td>
        </tr>
        <tr>
          <td>Jewellery</td>
          <td>Transparent, shiny, and durable</td>
        </tr>
        <tr>
          <td>Industrial saws</td>
          <td>Hardness makes it ideal for cutting concrete and stone</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
        `,
        canonical_keywords: ["diamond", "giant covalent", "tetrahedral", "four bonds", "hard", "high melting point", "non-conductor"],
        practice_items: [
          {
            id: "diamond-1",
            prompt_template: "Describe the structure and bonding in diamond. [4 marks]",
            marks: 4,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["carbon", "four", "covalent bonds", "tetrahedral", "giant structure", "3D lattice"]
          },
          {
            id: "diamond-2",
            prompt_template: "Explain why diamond is very hard. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["strong", "covalent bonds", "four", "rigid", "network", "all directions"]
          }
        ]
      },
      {
        id: "2-3-2-graphite",
        title: "2.3.2 GRAPHITE",
        type: "content",
        study_group: 5,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Structure of Graphite</h3>
  
  <div class="key-facts-block">
    <h4>📘 Description</h4>
    <ul>
      <li>Graphite is a <strong>giant covalent structure</strong> made entirely of carbon atoms.</li>
      <li>Each carbon atom is covalently bonded to <strong>three other carbon atoms</strong> in flat hexagonal layers.</li>
      <li>The <strong>fourth outer electron</strong> of each carbon atom is <strong>delocalised</strong> (free to move between the layers).</li>
      <li>The layers are held together by <strong>weak intermolecular forces</strong> (Van der Waals forces).</li>
      <li>Layers can <strong>slide easily</strong> over each other.</li>
    </ul>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Features</h4>
    <ul>
      <li>Strong covalent bonds <strong>within</strong> each layer.</li>
      <li>Weak forces <strong>between</strong> layers.</li>
      <li>One delocalised electron per carbon atom that moves freely.</li>
      <li>Structure described as "layers of hexagons with delocalised electrons between them."</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Properties of Graphite</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Property</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Soft and slippery</td>
          <td>Layers slide over each other easily.</td>
        </tr>
        <tr>
          <td>Conducts electricity and heat</td>
          <td>Delocalised electrons move through the layers.</td>
        </tr>
        <tr>
          <td>High melting and boiling point</td>
          <td>Strong covalent bonds in each layer require lots of energy to break.</td>
        </tr>
        <tr>
          <td>Less dense than diamond</td>
          <td>Layers are far apart with space between them.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Explaining Graphite's Properties Using Structure and Bonding</h3>
  
  <div class="key-facts-block">
    <h4>✏️ 1. Soft and Slippery</h4>
    <p>Atoms in each layer are strongly bonded, but only <strong>weak forces exist between the layers</strong>.</p>
    <p>These weak forces (Van der Waals) can be easily overcome, allowing layers to slide over each other.</p>
    <p>✅ Therefore, graphite is soft and slippery.</p>
  </div>

  <div class="exam-tip-block">
    <h4>📝 Exam phrase:</h4>
    <p>"Graphite is soft because there are only <strong>weak forces between layers</strong>, allowing them to slide over one another."</p>
  </div>

  <div class="key-facts-block">
    <h4>⚡ 2. Conducts Electricity and Heat</h4>
    <p>Each carbon atom forms three covalent bonds, leaving <strong>one delocalised electron</strong>.</p>
    <p>These electrons are free to move through the structure, carrying electric charge.</p>
    <p>Delocalised electrons also transfer energy, allowing graphite to conduct heat.</p>
    <p>✅ Therefore, graphite conducts electricity and heat, unlike most non-metals.</p>
  </div>

  <div class="exam-tip-block">
    <h4>📝 Exam phrase:</h4>
    <p>"Graphite conducts electricity because it has <strong>delocalised electrons that can move freely between layers</strong>."</p>
  </div>

  <div class="key-facts-block">
    <h4>🔥 3. Very High Melting and Boiling Point</h4>
    <p>Each layer has <strong>strong covalent bonds</strong> between carbon atoms.</p>
    <p>These bonds require a lot of energy to break.</p>
    <p>Even though layers slide easily, breaking the layers themselves takes enormous energy.</p>
    <p>✅ Therefore, graphite has a very high melting and boiling point (similar to diamond).</p>
  </div>

  <div class="exam-tip-block">
    <h4>📝 Exam phrase:</h4>
    <p>"Graphite has a high melting point because <strong>many strong covalent bonds must be broken</strong> to change state."</p>
  </div>

  <div class="key-facts-block">
    <h4>📊 4. Less Dense Than Diamond</h4>
    <p>Layers in graphite are spread further apart than the tightly bonded atoms in diamond.</p>
    <p>The gaps between layers make graphite less dense.</p>
    <p>✅ Therefore, graphite is lighter and less compact than diamond.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Uses of Graphite</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Use</th>
          <th>Reason</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Electrodes in electrolysis</td>
          <td>Conducts electricity, resists heat.</td>
        </tr>
        <tr>
          <td>Lubricant</td>
          <td>Layers slide easily (soft and slippery).</td>
        </tr>
        <tr>
          <td>Pencils</td>
          <td>Layers flake off onto paper.</td>
        </tr>
        <tr>
          <td>Brushes in electric motors</td>
          <td>Conducts electricity and withstands friction.</td>
        </tr>
        <tr>
          <td>Nuclear reactor moderator</td>
          <td>Absorbs neutrons, resists high temperatures.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="key-facts-block">
    <p>Graphite's <strong>conductivity and softness</strong> make it useful in both electrical and mechanical applications.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Comparison Between Diamond and Graphite</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Feature</th>
          <th>Diamond</th>
          <th>Graphite</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Structure</td>
          <td>3D tetrahedral lattice</td>
          <td>Layers of hexagons</td>
        </tr>
        <tr>
          <td>Bonds per carbon atom</td>
          <td>4</td>
          <td>3</td>
        </tr>
        <tr>
          <td>Delocalised electrons</td>
          <td>None</td>
          <td>One per carbon atom</td>
        </tr>
        <tr>
          <td>Conducts Electricity?</td>
          <td>❌ No</td>
          <td>✅ Yes</td>
        </tr>
        <tr>
          <td>Hardness</td>
          <td>Very hard</td>
          <td>Soft/slippery</td>
        </tr>
        <tr>
          <td>Melting point</td>
          <td>Very high</td>
          <td>Very high</td>
        </tr>
        <tr>
          <td>Uses</td>
          <td>Cutting tools, jewellery</td>
          <td>Electrodes, pencils, lubricant</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Point</h4>
    <p>Both are giant covalent structures made of carbon, but graphite's <strong>delocalised electrons</strong> make it unique.</p>
  </div>
</div>
        `,
        canonical_keywords: ["graphite", "layers", "hexagonal", "three bonds", "delocalised electrons", "conducts electricity", "soft", "slippery"],
        practice_items: [
          {
            id: "graphite-1",
            prompt_template: "Describe the structure of graphite and explain why it conducts electricity. [5 marks]",
            marks: 5,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["layers", "hexagonal", "three bonds", "delocalised electrons", "free to move", "carry charge"]
          },
          {
            id: "graphite-2",
            prompt_template: "Explain why graphite is soft and slippery. [2 marks]",
            marks: 2,
            type: "short-answer",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["weak forces", "between layers", "slide", "easily"]
          }
        ]
      },
      {
        id: "2-3-3-graphene-fullerenes",
        title: "2.3.3 GRAPHENE AND FULLERENES",
        type: "content",
        study_group: 5,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Graphene: Structure</h3>
  
  <div class="key-facts-block">
    <h4>📘 Description</h4>
    <ul>
      <li>Graphene is a <strong>single layer of graphite</strong>, just one atom thick.</li>
      <li>It consists of carbon atoms joined by strong covalent bonds in a flat sheet of hexagons.</li>
      <li>Each carbon atom is bonded to <strong>three others</strong>, leaving one delocalised electron per atom.</li>
      <li>The sheet is <strong>two-dimensional (2D)</strong> — it has length and width, but no thickness.</li>
    </ul>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Fact:</h4>
    <p>Graphene is the <strong>thinnest material ever discovered</strong>, yet also one of the strongest.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Graphene: Properties and Explanations</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Property</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Very strong</td>
          <td>Each carbon atom forms strong covalent bonds → strong hexagonal sheet.</td>
        </tr>
        <tr>
          <td>Lightweight and flexible</td>
          <td>Only one atom thick → very low density.</td>
        </tr>
        <tr>
          <td>Conducts electricity</td>
          <td>Delocalised electrons move freely across the sheet.</td>
        </tr>
        <tr>
          <td>Conducts heat efficiently</td>
          <td>Free electrons transfer energy rapidly.</td>
        </tr>
        <tr>
          <td>Transparent</td>
          <td>Extremely thin → allows light to pass through.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Linking Properties to Structure</h4>
    <ul>
      <li>Covalent bonds → strength and high melting point.</li>
      <li>Delocalised electrons → electrical and thermal conductivity.</li>
      <li>Single atomic layer → flexibility, transparency, lightness.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Uses of Graphene</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Use</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Electronics</td>
          <td>Excellent electrical conductivity; used in transistors and circuits.</td>
        </tr>
        <tr>
          <td>Composites</td>
          <td>Added to plastics → makes them stronger but still lightweight.</td>
        </tr>
        <tr>
          <td>Flexible displays</td>
          <td>Conductive and transparent → ideal for touchscreens.</td>
        </tr>
        <tr>
          <td>Medical sensors</td>
          <td>Thin and biocompatible → detects small electrical changes.</td>
        </tr>
        <tr>
          <td>Energy storage</td>
          <td>Used in batteries and supercapacitors due to conductivity.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>📝 Exam phrase:</h4>
    <p>"Graphene's <strong>strength, conductivity, and flexibility</strong> make it useful in electronics and composite materials."</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Fullerenes: What They Are</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>Fullerenes are molecules of carbon shaped like <strong>closed tubes or hollow spheres</strong>, made up of hexagonal and pentagonal rings of carbon atoms. They are also allotropes of carbon (like diamond, graphite, and graphene).</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Points</h4>
    <ul>
      <li>Atoms are joined by strong covalent bonds.</li>
      <li>Structures are <strong>hollow</strong>, giving them unique chemical and physical properties.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Buckminsterfullerene (C₆₀)</h3>
  
  <div class="key-facts-block">
    <h4>🔬 Structure</h4>
    <ul>
      <li>The first fullerene discovered.</li>
      <li>Made of <strong>60 carbon atoms</strong> arranged in a spherical shape (similar to a football).</li>
      <li>Contains 12 pentagons and 20 hexagons.</li>
      <li>Each carbon forms three covalent bonds → delocalised electrons → weak intermolecular forces between molecules.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>💎 Properties and Explanations</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Property</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Molecular (not giant)</td>
          <td>Made of individual C₆₀ molecules.</td>
        </tr>
        <tr>
          <td>Soft</td>
          <td>Weak intermolecular forces between molecules.</td>
        </tr>
        <tr>
          <td>Low melting point</td>
          <td>Forces between molecules are weak.</td>
        </tr>
        <tr>
          <td>Conducts electricity poorly</td>
          <td>Some delocalised electrons but they cannot move easily between molecules.</td>
        </tr>
        <tr>
          <td>Can act as a 'molecular cage'</td>
          <td>Hollow centre can trap other atoms or molecules.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="note-block">
    <h4>📝 Key Fact:</h4>
    <p>Named after Buckminster Fuller, who designed geodesic dome structures that look similar.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 6 – Carbon Nanotubes</h3>
  
  <div class="key-facts-block">
    <h4>🔬 Structure</h4>
    <ul>
      <li>Cylindrical fullerenes — <strong>rolled-up sheets of graphene</strong>.</li>
      <li>Each tube consists of carbon atoms bonded in hexagonal rings.</li>
      <li>Have very high length-to-diameter ratios (extremely long and thin).</li>
      <li>Can be single-walled or multi-walled (several layers rolled together).</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>💎 Properties and Explanations</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Property</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Very strong</td>
          <td>Covalent bonds between carbon atoms make the structure very tough.</td>
        </tr>
        <tr>
          <td>Lightweight</td>
          <td>Hollow cylindrical shape with low density.</td>
        </tr>
        <tr>
          <td>Excellent electrical conductor</td>
          <td>Delocalised electrons move freely along the tube.</td>
        </tr>
        <tr>
          <td>High thermal conductivity</td>
          <td>Transfers heat efficiently.</td>
        </tr>
        <tr>
          <td>High tensile strength</td>
          <td>Can be stretched without breaking.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>📝 Key Idea:</h4>
    <p>Carbon nanotubes combine <strong>strength, conductivity, and lightness</strong> — making them ideal for nanotechnology.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 7 – Uses of Fullerenes and Nanotubes</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Use</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Buckminsterfullerene (C₆₀)</td>
          <td>Drug delivery systems</td>
          <td>Hollow spheres can carry molecules inside.</td>
        </tr>
        <tr>
          <td></td>
          <td>Lubricants</td>
          <td>Roll easily between surfaces (like microscopic ball bearings).</td>
        </tr>
        <tr>
          <td></td>
          <td>Catalysts</td>
          <td>Large surface area for reactions.</td>
        </tr>
        <tr>
          <td>Carbon Nanotubes</td>
          <td>Reinforcing materials</td>
          <td>Added to sports equipment and composites for strength.</td>
        </tr>
        <tr>
          <td></td>
          <td>Electronics</td>
          <td>Excellent conductors → used in circuits and transistors.</td>
        </tr>
        <tr>
          <td></td>
          <td>Nanotechnology</td>
          <td>Deliver molecules at nanoscale or build tiny sensors.</td>
        </tr>
        <tr>
          <td></td>
          <td>Medical uses</td>
          <td>Drug carriers, biosensors.</td>
        </tr>
        <tr>
          <td></td>
          <td>Space materials</td>
          <td>Lightweight but extremely strong.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>📝 Exam Tip:</h4>
    <p>Always link <strong>use → property → structure</strong>. For example:</p>
    <p>"Carbon nanotubes are used in composite materials because they are <strong>very strong and lightweight</strong> due to their covalently bonded carbon atoms arranged in tubes."</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 8 – Recognising Graphene and Fullerenes</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Structure Type</th>
          <th>Description</th>
          <th>Key Features</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Graphene</td>
          <td>One atom thick sheet of hexagons</td>
          <td>Delocalised electrons</td>
        </tr>
        <tr>
          <td>Buckminsterfullerene (C₆₀)</td>
          <td>Hollow sphere of 60 carbon atoms</td>
          <td>12 pentagons + 20 hexagons</td>
        </tr>
        <tr>
          <td>Carbon Nanotube</td>
          <td>Rolled-up sheet of graphene</td>
          <td>Long, thin cylinder; strong, conductive</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Tip for diagrams:</h4>
    <ul>
      <li>Hexagonal pattern = graphene.</li>
      <li>Spherical = C₆₀ fullerene.</li>
      <li>Cylindrical = nanotube.</li>
    </ul>
  </div>
</div>
        `,
        canonical_keywords: ["graphene", "fullerenes", "buckminsterfullerene", "carbon nanotubes", "C60", "hexagonal", "delocalised electrons", "hollow"],
        practice_items: [
          {
            id: "graphene-fullerenes-1",
            prompt_template: "Describe the structure of graphene and explain why it conducts electricity. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["single layer", "hexagonal", "delocalised electrons", "free to move", "conduct"]
          },
          {
            id: "graphene-fullerenes-2",
            prompt_template: "Explain why carbon nanotubes are used in composite materials. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["strong", "lightweight", "covalent bonds", "carbon atoms", "tubes"]
          }
        ]
      },
      {
        id: "2-4-1-nanoscience",
        title: "2.4.1 SIZES OF PARTICLES AND THEIR PROPERTIES (NANOSCIENCE)",
        type: "content",
        study_group: 6,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – What Is Nanoscience?</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>Nanoscience is the study of materials that have structures between <strong>1 and 100 nanometres (nm)</strong> in size.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Idea</h4>
    <ul>
      <li>A <strong>nanometre (nm) = 1 × 10⁻⁹ metres</strong>.</li>
      <li>Nanoparticles are made of only a few hundred atoms.</li>
      <li>They are larger than atoms and simple molecules, but smaller than fine or coarse particles.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>📊 Particle Size Comparisons</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Type of Particle</th>
          <th>Approx. Diameter</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Nanoparticle</td>
          <td>1 – 100 nm (1 × 10⁻⁹ to 1 × 10⁻⁷ m)</td>
          <td>Silver nanoparticles</td>
        </tr>
        <tr>
          <td>Fine particle</td>
          <td>100 – 2,500 nm (1 × 10⁻⁷ to 2.5 × 10⁻⁶ m)</td>
          <td>Vehicle exhausts (PM2.5)</td>
        </tr>
        <tr>
          <td>Coarse particle</td>
          <td>2,500 – 10,000 nm (2.5 × 10⁻⁶ to 1 × 10⁻⁵ m)</td>
          <td>Pollen, dust, dirt</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Mnemonic</h4>
    <p>Nano < Fine < Coarse in size.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Comparing Nano Dimensions to Atoms and Molecules</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Particle</th>
          <th>Approximate Size</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Atom (e.g. carbon)</td>
          <td>0.1 nm</td>
        </tr>
        <tr>
          <td>Small molecule (e.g. water)</td>
          <td>~ 0.5 nm</td>
        </tr>
        <tr>
          <td>Nanoparticle</td>
          <td>1 – 100 nm</td>
        </tr>
        <tr>
          <td>Human hair width</td>
          <td>~80,000 nm</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Point</h4>
    <p>Nanoparticles sit <strong>between individual atoms and visible materials</strong>.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Surface Area to Volume Ratio (SA:V)</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>As the size of a particle decreases, its <strong>surface area to volume ratio increases</strong>.</p>
    <p>This means:</p>
    <ul>
      <li>Nanoparticles have a <strong>huge surface area</strong> compared to their volume.</li>
      <li>A large fraction of their atoms are on the surface rather than inside.</li>
    </ul>
  </div>

  <div class="key-facts-block">
    <h4>📏 Rule</h4>
    <p>If the side of a cube decreases by a factor of 10,</p>
    <p>👉 the surface area to volume ratio <strong>increases by a factor of 10</strong>.</p>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Why It Matters</h4>
    <ul>
      <li>Higher SA:V → more area for reactions → <strong>more reactive</strong>.</li>
      <li>Small amounts can have big effects (e.g. in catalysts).</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🟢 Example:</h4>
    <p>A block of gold and gold nanoparticles have the same atoms, but nanoparticles are <strong>far more reactive and catalytic</strong> because of their much larger surface area.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Why Nanoparticles Have Different Properties</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Property</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Higher reactivity</td>
          <td>More atoms exposed on the surface → more collisions → faster reactions.</td>
        </tr>
        <tr>
          <td>Different colour/optical behaviour</td>
          <td>Electron interactions change with particle size (quantum effects).</td>
        </tr>
        <tr>
          <td>Different strength or conductivity</td>
          <td>Structures behave differently when only a few atoms thick.</td>
        </tr>
        <tr>
          <td>Lower melting point</td>
          <td>Smaller structures require less energy to change state.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>📝 Key Point</h4>
    <p>Nanomaterials behave differently from bulk materials because their atoms are on the surface and interact differently with light, heat, and chemicals.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Why Smaller Quantities Are Effective</h3>
  
  <div class="key-facts-block">
    <p>Nanoparticles have a <strong>large surface area per gram</strong>, so less material is needed for the same effect.</p>
    <p>This makes them <strong>cost-effective</strong> and useful for medicine, catalysts, and coatings.</p>
  </div>

  <div class="example-block">
    <h4>🟢 Example:</h4>
    <p>Only a tiny amount of silver nanoparticles can kill bacteria in wound dressings, compared to much larger quantities of bulk silver.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 6 – Applications of Nanoparticles</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Application</th>
          <th>Nanoparticle Used</th>
          <th>Why It's Useful</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Medicine (drug delivery)</td>
          <td>Fullerenes, nanotubes</td>
          <td>Hollow structure can carry drugs to specific cells</td>
        </tr>
        <tr>
          <td>Antibacterial materials</td>
          <td>Silver nanoparticles</td>
          <td>High surface area → kills bacteria effectively</td>
        </tr>
        <tr>
          <td>Sunscreens</td>
          <td>Titanium dioxide (TiO₂)</td>
          <td>Transparent but blocks UV light</td>
        </tr>
        <tr>
          <td>Catalysts</td>
          <td>Platinum, palladium nanoparticles</td>
          <td>Huge surface area speeds up reactions</td>
        </tr>
        <tr>
          <td>Electronics</td>
          <td>Carbon nanotubes</td>
          <td>Excellent conductors, very small</td>
        </tr>
        <tr>
          <td>Composite materials</td>
          <td>Carbon nanotubes, graphene</td>
          <td>Added to plastics for strength without weight</td>
        </tr>
        <tr>
          <td>Sensors</td>
          <td>Quantum dots</td>
          <td>Change colour depending on particle size</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 7 – Risks and Benefits of Nanoparticles</h3>
  
  <div class="key-facts-block">
    <h4>✅ Benefits</h4>
    <ul>
      <li>More efficient materials (less waste).</li>
      <li>Targeted drug delivery (fewer side effects).</li>
      <li>Stronger, lighter materials.</li>
      <li>Faster chemical reactions (catalysts).</li>
    </ul>
  </div>

  <div class="key-facts-block">
    <h4>⚠️ Risks</h4>
    <ul>
      <li>Nanoparticles are so small they can enter cells and tissues.</li>
      <li>Long-term health effects are not fully understood.</li>
      <li>May cause respiratory problems if inhaled.</li>
      <li>Environmental impact is uncertain.</li>
    </ul>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Balance</h4>
    <p>Scientists continue to research nanomaterials to maximize benefits while minimizing risks.</p>
  </div>
</div>
        `,
        canonical_keywords: ["nanoscience", "nanoparticles", "surface area to volume ratio", "1-100 nm", "quantum effects", "applications", "risks"],
        practice_items: [
          {
            id: "nano-1",
            prompt_template: "Explain why nanoparticles have different properties from bulk materials. [4 marks]",
            marks: 4,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["surface area", "volume ratio", "high", "more atoms", "surface", "react", "differently"]
          },
          {
            id: "nano-2",
            prompt_template: "Give two uses of nanoparticles and explain why they are suitable for each use. [4 marks]",
            marks: 4,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["silver", "antibacterial", "surface area", "drug delivery", "hollow", "carry molecules", "catalysts", "reactions"]
          }
        ]
      }
    ]
  },
  {
    id: "quantitative-chemistry",
    title: "Quantitative chemistry",
    status: "ready",
    subsections: [
      {
        id: "3-1-1-conservation-mass",
        title: "3.1.1 CONSERVATION OF MASS AND BALANCED CHEMICAL EQUATIONS",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Law of Conservation of Mass</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>The law of conservation of mass states that no atoms are lost or made during a chemical reaction — they are simply rearranged.</p>
    <p>This means the total mass of reactants = total mass of products.</p>
    <p class="formula"><strong>Mass of reactants = Mass of products</strong></p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Idea</h4>
    <ul>
      <li>Atoms cannot be created or destroyed, so the total number of each type of atom must be the same on both sides of the equation.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🟢 Example</h4>
    <p><strong>Magnesium + Oxygen → Magnesium oxide</strong></p>
    <p class="equation">2 Mg + O₂ → 2 MgO</p>
    
    <p><strong>Mass check:</strong></p>
    <ul>
      <li>2 × 24 (Mg) = 48 g</li>
      <li>1 × 32 (O₂) = 32 g</li>
    </ul>
    <p>Total = 80 g reactants → 80 g product ✅</p>
    <p><strong>Mass is conserved because the same number of each atom exists before and after the reaction.</strong></p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Why Conservation of Mass Is True</h4>
    <ul>
      <li>Atoms are indivisible in chemical reactions.</li>
      <li>All atoms in the reactants become part of the products.</li>
      <li>The apparent change in mass sometimes occurs when gases are involved (explained next section).</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Balanced Chemical Equations</h3>
  
  <div class="definition-block">
    <h4>🔵 What a Balanced Equation Shows</h4>
    <p>The number of atoms of each element on the left (reactants) and right (products) must be equal.</p>
    <p>Balanced equations represent the ratio in which substances react — not necessarily actual masses.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Steps to Balance an Equation</h4>
    <ol>
      <li>Write down the symbols for each element.</li>
      <li>Count the number of atoms on both sides.</li>
      <li>Add coefficients (big numbers) to balance atoms.</li>
      <li>Never change small numbers in formulas — that changes the substance!</li>
    </ol>
  </div>

  <div class="example-block">
    <h4>💡 Example 1 – Simple</h4>
    <p class="equation">H₂ + O₂ → H₂O</p>
    <p><strong>Not balanced:</strong></p>
    <table class="data-table">
      <tbody>
        <tr>
          <td>Left:</td>
          <td>2H, 2O</td>
        </tr>
        <tr>
          <td>Right:</td>
          <td>2H, 1O</td>
        </tr>
      </tbody>
    </table>
    
    <p><strong>✅ Balanced:</strong></p>
    <p class="equation">2 H₂ + O₂ → 2 H₂O</p>
  </div>

  <div class="example-block">
    <h4>💡 Example 2 – Metal Reaction</h4>
    <p class="equation">Fe + O₂ → Fe₂O₃</p>
    <p><strong>Not balanced:</strong> Fe = 1 vs 2, O = 2 vs 3</p>
    
    <p><strong>✅ Balanced:</strong></p>
    <p class="equation">4 Fe + 3 O₂ → 2 Fe₂O₃</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Points</h4>
    <ul>
      <li>Big numbers in front multiply everything in the formula.</li>
      <li>Small numbers after an element only multiply that element.</li>
      <li>Check each element carefully before moving to the next.</li>
    </ul>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Why Balancing Is Important</h4>
    <p>Balanced equations show the correct ratio of reactants and products.</p>
    <p>They are used to calculate reacting masses, moles, and yields later in the topic.</p>
    <p><strong>AQA exam tip:</strong> You will always lose marks if you fail to balance equations before doing any quantitative calculation!</p>
  </div>
</div>
        `,
        canonical_keywords: [
          "conservation of mass", "law", "atoms", "rearranged", "reactants", "products",
          "balanced equation", "coefficients", "ratio", "chemical reaction", "mass conserved"
        ],
        practice_items: []
      },
      {
        id: "3-1-2-relative-formula-mass",
        title: "3.1.2 RELATIVE FORMULA MASS (Mr)",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Definition of Relative Formula Mass</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>The relative formula mass (M<sub>r</sub>) of a substance is the sum of all the relative atomic masses (A<sub>r</sub>) of the atoms shown in its formula.</p>
    <p><strong>In simple terms:</strong> Add up all the atomic masses of the atoms in one molecule or formula unit.</p>
    <p class="formula">M<sub>r</sub> = ∑ A<sub>r</sub> (all atoms in formula)</p>
  </div>

  <div class="example-block">
    <h4>🟢 Example 1 – Sodium Chloride (NaCl)</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Element</th>
          <th>A<sub>r</sub></th>
          <th>Number of Atoms</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Na</td>
          <td>23</td>
          <td>1</td>
          <td>23</td>
        </tr>
        <tr>
          <td>Cl</td>
          <td>35.5</td>
          <td>1</td>
          <td>35.5</td>
        </tr>
      </tbody>
    </table>
    <p>M<sub>r</sub> = 23 + 35.5 = 58.5</p>
    <p><strong>✅ Relative formula mass of NaCl = 58.5</strong></p>
  </div>

  <div class="example-block">
    <h4>🟢 Example 2 – Carbon Dioxide (CO₂)</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Element</th>
          <th>A<sub>r</sub></th>
          <th>Number of Atoms</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>C</td>
          <td>12</td>
          <td>1</td>
          <td>12</td>
        </tr>
        <tr>
          <td>O</td>
          <td>16</td>
          <td>2</td>
          <td>32</td>
        </tr>
      </tbody>
    </table>
    <p>M<sub>r</sub> = 12 + 32 = 44</p>
    <p><strong>✅ M<sub>r</sub> of CO₂ = 44</strong></p>
  </div>

  <div class="example-block">
    <h4>🟢 Example 3 – Glucose (C₆H₁₂O₆)</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Element</th>
          <th>Atomic Mass (A<sub>r</sub>)</th>
          <th>Number of Atoms</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>C</td>
          <td>12</td>
          <td>6</td>
          <td>72</td>
        </tr>
        <tr>
          <td>H</td>
          <td>1</td>
          <td>12</td>
          <td>12</td>
        </tr>
        <tr>
          <td>O</td>
          <td>16</td>
          <td>6</td>
          <td>96</td>
        </tr>
      </tbody>
    </table>
    <p>M<sub>r</sub> = 72 + 12 + 96 = 180</p>
    <p><strong>✅ M<sub>r</sub> of glucose = 180</strong></p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – How to Calculate Mr Step-by-Step</h3>
  
  <div class="key-facts-block">
    <h4>🧠 Method</h4>
    <ol>
      <li>Write the formula of the compound.</li>
      <li>Identify the number of each atom.</li>
      <li>Multiply each element's A<sub>r</sub> by the number of atoms.</li>
      <li>Add all totals together.</li>
    </ol>
  </div>

  <div class="example-block">
    <h4>🟢 Example – Calcium Carbonate (CaCO₃)</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Element</th>
          <th>Atomic Mass (A<sub>r</sub>)</th>
          <th>Number of Atoms</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ca</td>
          <td>40</td>
          <td>1</td>
          <td>40</td>
        </tr>
        <tr>
          <td>C</td>
          <td>12</td>
          <td>1</td>
          <td>12</td>
        </tr>
        <tr>
          <td>O</td>
          <td>16</td>
          <td>3</td>
          <td>48</td>
        </tr>
      </tbody>
    </table>
    <p>M<sub>r</sub> = 40 + 12 + 48 = 100</p>
    <p><strong>✅ M<sub>r</sub> of CaCO₃ = 100</strong></p>
  </div>

  <div class="warning-block">
    <h4>⚡ Common Mistakes to Avoid</h4>
    <ul>
      <li>🔸 Forgetting to multiply by the number of atoms in brackets, e.g. (OH)₂ → 2 × (O + H).</li>
      <li>🔸 Using incorrect A<sub>r</sub> values — always use those from the periodic table.</li>
      <li>🔸 Confusing A<sub>r</sub> (atomic) with M<sub>r</sub> (formula).</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Relative Atomic Mass (Ar) Recap</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>The relative atomic mass (A<sub>r</sub>) of an element is the average mass of its atoms compared with 1/12th the mass of a carbon-12 atom.</p>
  </div>

  <div class="example-block">
    <h4>🧠 Example</h4>
    <ul>
      <li>A<sub>r</sub> of carbon = 12</li>
      <li>A<sub>r</sub> of hydrogen = 1</li>
      <li>A<sub>r</sub> of chlorine = 35.5 (average of isotopes Cl-35 and Cl-37)</li>
    </ul>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Relation Between Ar and Mr</h4>
    <ul>
      <li>A<sub>r</sub> = relative atomic mass of one atom.</li>
      <li>M<sub>r</sub> = total of all A<sub>r</sub> values in the formula.</li>
    </ul>
  </div>
</div>
        `,
        canonical_keywords: [
          "relative formula mass", "Mr", "relative atomic mass", "Ar", "sum", "atoms",
          "formula", "periodic table", "calculate", "compound"
        ],
        practice_items: []
      },
      {
        id: "3-1-3-mass-changes-gas",
        title: "3.1.3 MASS CHANGES WHEN A REACTANT OR PRODUCT IS A GAS",
        type: "content",
        study_group: 2,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Why Mass Sometimes Appears to Change</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>In some reactions, the total mass seems to change, but this is only because a gas has either:</p>
    <ul>
      <li>Entered the reaction from the air, or</li>
      <li>Escaped into the surroundings.</li>
    </ul>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Point</h4>
    <p>If a gas cannot be contained, its mass isn't measured — so the reaction appears to gain or lose mass, even though atoms are still conserved.</p>
  </div>

  <div class="example-block">
    <h4>🟢 Example 1 – Apparent Increase in Mass</h4>
    <p><strong>Reaction:</strong></p>
    <p class="equation">2 Mg + O₂ → 2 MgO</p>
    
    <p><strong>Explanation:</strong></p>
    <ul>
      <li>Magnesium reacts with oxygen gas from the air.</li>
      <li>Oxygen is added to the solid metal.</li>
      <li>Since the oxygen gas wasn't initially weighed, the product (magnesium oxide) seems heavier.</li>
      <li>Mass appears to increase, but atoms are still conserved.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🟢 Example 2 – Apparent Decrease in Mass</h4>
    <p><strong>Reaction:</strong></p>
    <p class="equation">CaCO₃(s) → CaO(s) + CO₂(g)</p>
    
    <p><strong>Explanation:</strong></p>
    <ul>
      <li>Heating calcium carbonate produces calcium oxide and carbon dioxide gas.</li>
      <li>The CO₂ escapes into the air, so it isn't weighed in the final product.</li>
      <li>The mass of the solid left behind seems smaller.</li>
      <li>Mass appears to decrease because gas escapes.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Explaining Mass Change in Terms of Conservation of Mass</h3>
  
  <div class="key-facts-block">
    <h4>🧠 Key Idea</h4>
    <p>The law of conservation of mass still applies — even when gases are involved. The apparent mass change happens only because we're not including the mass of the gas that has entered or left the reaction system.</p>
  </div>

  <div class="example-block">
    <h4>🟢 Example Summary Table</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Reaction</th>
          <th>Gas Involved</th>
          <th>Apparent Mass Change</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Magnesium + oxygen → magnesium oxide</td>
          <td>O₂ added</td>
          <td>Increase</td>
          <td>Oxygen from air combines with solid metal</td>
        </tr>
        <tr>
          <td>Calcium carbonate → calcium oxide + carbon dioxide</td>
          <td>CO₂ released</td>
          <td>Decrease</td>
          <td>CO₂ gas escapes to surroundings</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Closed vs Open Systems</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>System Type</th>
          <th>Description</th>
          <th>Effect on Mass</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Closed system</td>
          <td>No substances can enter or leave</td>
          <td>Mass is conserved exactly</td>
        </tr>
        <tr>
          <td>Open system</td>
          <td>Gases can enter or escape</td>
          <td>Apparent mass change</td>
        </tr>
      </tbody>
    </table>
    <p>Closed systems always show perfect conservation of mass because no particles are lost or gained.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Experimental Examples</h3>
  
  <div class="example-block">
    <h4>🟢 1. Combustion of Magnesium</h4>
    <ul>
      <li>Place magnesium ribbon in a crucible, heat it in air.</li>
      <li>It reacts with oxygen to form magnesium oxide.</li>
      <li>Mass increases because oxygen joins from the air.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🟢 2. Thermal Decomposition of Copper Carbonate</h4>
    <p class="equation">CuCO₃(s) → CuO(s) + CO₂(g)</p>
    <ul>
      <li>When heated, green copper carbonate decomposes to black copper oxide and CO₂ gas.</li>
      <li>Gas escapes → mass decreases.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Linking to Conservation of Mass Calculations</h3>
  
  <div class="key-facts-block">
    <h4>🧠 Key Point</h4>
    <p>Sometimes exam questions ask you to calculate missing masses when gases are involved.</p>
  </div>

  <div class="example-block">
    <h4>🟢 Example Question</h4>
    <p>A student heats 25.0 g of calcium carbonate. After heating, only 14.0 g of solid calcium oxide remains.</p>
    <p><strong>Calculate the mass of CO₂ released.</strong></p>
    
    <p><strong>Step 1:</strong></p>
    <p class="equation">CaCO₃ → CaO + CO₂</p>
    
    <p><strong>Step 2:</strong></p>
    <ul>
      <li>Total mass before = 25.0 g (CaCO₃)</li>
      <li>Mass of solid after = 14.0 g (CaO)</li>
      <li>25.0 - 14.0 = 11.0 g CO₂ released</li>
    </ul>
    
    <p><strong>✅ Answer:</strong> 11.0 g of CO₂ gas escaped.</p>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Exam phrase</h4>
    <p>"Mass appears to decrease because a gas (CO₂) escapes into the atmosphere."</p>
  </div>
</div>
        `,
        canonical_keywords: [
          "mass change", "gas", "conservation of mass", "increase", "decrease", "oxygen",
          "carbon dioxide", "closed system", "open system", "escape", "apparent"
        ],
        practice_items: []
      },
      {
        id: "3-2-1-moles",
        title: "3.2.1 MOLES",
        type: "content",
        study_group: 3,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – What Is a Mole?</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>A mole is a way of counting particles (atoms, ions, or molecules) — just like a "dozen" means 12, a mole means 6.022 × 10²³ particles.</p>
    <p>This number is called the <strong>Avogadro constant (L)</strong>.</p>
    <p class="formula">L = 6.022 × 10²³ particles per mole</p>
  </div>

  <div class="example-block">
    <h4>💡 Examples</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Substance</th>
          <th>1 mole contains...</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Carbon atoms</td>
          <td>6.022 × 10²³ carbon atoms</td>
        </tr>
        <tr>
          <td>Water molecules</td>
          <td>6.022 × 10²³ water molecules</td>
        </tr>
        <tr>
          <td>Sodium ions</td>
          <td>6.022 × 10²³ Na⁺ ions</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Idea</h4>
    <p>A mole is a fixed number of particles, not a fixed mass. The mass of one mole depends on what the substance is.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Relationship Between Mass, Moles, and Mr</h3>
  
  <div class="definition-block">
    <h4>🔢 Formula</h4>
    <p class="formula">Moles = Mass (g) / M<sub>r</sub></p>
    <p class="formula">Mass (g) = Moles × M<sub>r</sub></p>
    <p class="formula">M<sub>r</sub> = Mass (g) / Moles</p>
  </div>

  <div class="example-block">
    <h4>🟢 Example 1 – Finding Moles</h4>
    <p><strong>Calculate the number of moles in 32 g of oxygen gas (O₂).</strong></p>
    <p>M<sub>r</sub> (O₂) = 16 × 2 = 32</p>
    <p>Moles = 32 / 32 = 1.0 mol</p>
    <p><strong>✅ Answer: 1.0 mol of O₂</strong></p>
  </div>

  <div class="example-block">
    <h4>🟢 Example 2 – Finding Mass</h4>
    <p><strong>Calculate the mass of 0.25 mol of carbon dioxide (CO₂).</strong></p>
    <p>M<sub>r</sub> (CO₂) = 12 + (16 × 2) = 44</p>
    <p>Mass = 0.25 × 44 = 11 g</p>
    <p><strong>✅ Answer: 11 g of CO₂</strong></p>
  </div>

  <div class="example-block">
    <h4>🟢 Example 3 – Finding Mr</h4>
    <p><strong>A student has 0.5 mol of a compound weighing 29 g. Find its M<sub>r</sub>.</strong></p>
    <p>M<sub>r</sub> = 29 / 0.5 = 58</p>
    <p><strong>✅ Answer: M<sub>r</sub> = 58</strong></p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Units Reminder</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Quantity</th>
          <th>Symbol</th>
          <th>Unit</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mass</td>
          <td>m</td>
          <td>g</td>
        </tr>
        <tr>
          <td>Moles</td>
          <td>n</td>
          <td>mol</td>
        </tr>
        <tr>
          <td>Relative formula mass</td>
          <td>M<sub>r</sub></td>
          <td>(no units)</td>
        </tr>
      </tbody>
    </table>
    <p><strong>Always make sure mass is in grams, not kilograms.</strong></p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – The Mole and the Periodic Table</h3>
  
  <div class="key-facts-block">
    <h4>🧠 Key Point</h4>
    <p>The relative atomic mass (A<sub>r</sub>) of an element (from the periodic table) tells you the mass of one mole of that element in grams.</p>
  </div>

  <div class="example-block">
    <h4>🟢 Examples</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Element</th>
          <th>Mass of 1 mol (g)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>H</td><td>1</td></tr>
        <tr><td>C</td><td>12</td></tr>
        <tr><td>O</td><td>16</td></tr>
        <tr><td>Na</td><td>23</td></tr>
        <tr><td>Mg</td><td>24</td></tr>
      </tbody>
    </table>
    <p><strong>Note:</strong> 1 mole of oxygen atoms = 16 g, but 1 mole of oxygen molecules (O₂) = 32 g.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Converting Between Particles and Moles</h3>
  
  <div class="definition-block">
    <h4>🔢 Key Formula</h4>
    <p class="formula">Number of particles = Moles × (6.022 × 10²³)</p>
    <p class="formula">Moles = Number of particles / 6.022 × 10²³</p>
  </div>

  <div class="example-block">
    <h4>🟢 Example 1 – Finding Number of Atoms</h4>
    <p><strong>How many atoms are in 0.25 mol of carbon atoms?</strong></p>
    <p>Particles = 0.25 × 6.022 × 10²³ = 1.5055 × 10²³</p>
    <p><strong>✅ Answer: 1.5 × 10²³ atoms of carbon</strong></p>
  </div>

  <div class="example-block">
    <h4>🟢 Example 2 – Finding Moles from Atoms</h4>
    <p><strong>A sample contains 1.204 × 10²⁴ molecules of oxygen gas. How many moles is this?</strong></p>
    <p>Moles = 1.204 × 10²⁴ / 6.022 × 10²³ = 2.0 mol</p>
    <p><strong>✅ Answer: 2.0 mol O₂ molecules</strong></p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Moles and Formula Units (Ionic Compounds)</h3>
  
  <div class="key-facts-block">
    <h4>🧠 Important Note</h4>
    <p>When you have an ionic compound, a mole counts formula units, not individual atoms.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 6 – Mole Calculations in Practice</h3>
  
  <div class="key-facts-block">
    <h4>🧠 Summary Table</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Type of Question</th>
          <th>Formula</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Find moles from mass</td>
          <td>n = m / M<sub>r</sub></td>
          <td>36 g of H₂O → 36 / 18 = 2 mol</td>
        </tr>
        <tr>
          <td>Find mass from moles</td>
          <td>m = n × M<sub>r</sub></td>
          <td>0.25 mol CO₂ → 0.25 × 44 = 11 g</td>
        </tr>
        <tr>
          <td>Find number of particles</td>
          <td>N = n × 6.022 × 10²³</td>
          <td>2 mol atoms → 1.204 × 10²⁴ atoms</td>
        </tr>
        <tr>
          <td>Find moles from particles</td>
          <td>n = N / 6.022 × 10²³</td>
          <td>3.01 × 10²³ = 0.5 mol</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 7 – Why Moles Are Useful</h3>
  
  <div class="key-facts-block">
    <h4>🧠 Key Applications</h4>
    <p>Moles are used to:</p>
    <ul>
      <li>Compare quantities of substances in reactions.</li>
      <li>Balance chemical equations quantitatively.</li>
      <li>Calculate reacting masses, concentrations, gas volumes, and yields.</li>
    </ul>
    <p><strong>The mole links microscopic chemistry (atoms) to macroscopic chemistry (grams).</strong></p>
  </div>
</div>
        `,
        canonical_keywords: [
          "mole", "Avogadro constant", "particles", "atoms", "molecules", "ions",
          "mass", "Mr", "formula", "calculation", "6.022 × 10²³"
        ],
        practice_items: []
      },
      {
        id: "3-2-2-amounts-in-equations",
        title: "3.2.2 AMOUNTS OF SUBSTANCES IN EQUATIONS",
        type: "content",
        study_group: 4,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Understanding Moles in Balanced Equations</h3>
  
  <div class="definition-block">
    <h4>🔵 Key Idea</h4>
    <p>A balanced chemical equation shows the ratio of moles of reactants and products.</p>
    <p>The big numbers in a balanced equation tell you how many moles of each substance react or are produced.</p>
  </div>

  <div class="example-block">
    <h4>🟢 Example 1</h4>
    <p class="equation">2 H₂ + O₂ → 2 H₂O</p>
    <table class="data-table">
      <thead>
        <tr>
          <th>Substance</th>
          <th>Coefficient</th>
          <th>Moles in Ratio</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Hydrogen</td>
          <td>2</td>
          <td>2 mol</td>
        </tr>
        <tr>
          <td>Oxygen</td>
          <td>1</td>
          <td>1 mol</td>
        </tr>
        <tr>
          <td>Water</td>
          <td>2</td>
          <td>2 mol</td>
        </tr>
      </tbody>
    </table>
    <p><strong>🧠 This means 2 moles of hydrogen react with 1 mole of oxygen to form 2 moles of water.</strong></p>
    <p><strong>✅ Mole ratio = 2 : 1 : 2</strong></p>
  </div>

  <div class="example-block">
    <h4>🟢 Example 2</h4>
    <p class="equation">Mg + 2 HCl → MgCl₂ + H₂</p>
    <table class="data-table">
      <thead>
        <tr>
          <th>Substance</th>
          <th>Coefficient</th>
          <th>Moles in Ratio</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mg</td>
          <td>1</td>
          <td>1 mol</td>
        </tr>
        <tr>
          <td>HCl</td>
          <td>2</td>
          <td>2 mol</td>
        </tr>
        <tr>
          <td>MgCl₂</td>
          <td>1</td>
          <td>1 mol</td>
        </tr>
        <tr>
          <td>H₂</td>
          <td>1</td>
          <td>1 mol</td>
        </tr>
      </tbody>
    </table>
    <p><strong>🧠 Meaning: 1 mol of Mg reacts with 2 mol of HCl to produce 1 mol of MgCl₂ and 1 mol of H₂.</strong></p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Using Mole Ratios to Calculate Amounts</h3>
  
  <div class="key-facts-block">
    <h4>🔢 Step-by-Step Method</h4>
    <ol>
      <li>Write the balanced equation.</li>
      <li>Identify the substance you know and the one you're finding.</li>
      <li>Find the number of moles you have (using n = m / M<sub>r</sub>).</li>
      <li>Use the ratio from the equation to find the unknown moles.</li>
      <li>Convert back to mass (if needed) using m = n × M<sub>r</sub>.</li>
    </ol>
  </div>

  <div class="example-block">
    <h4>🟢 Example 1 – Mass–Mass Calculation</h4>
    <p><strong>Question: What mass of magnesium oxide is formed when 6.0 g of magnesium reacts with oxygen?</strong></p>
    <p class="equation">2 Mg + O₂ → 2 MgO</p>
    
    <p><strong>Step 1: Find moles of Mg.</strong></p>
    <p>n = 6.0 ÷ 24 = 0.25 mol</p>
    
    <p><strong>Step 2: Ratio Mg : MgO = 2 : 2 (1 : 1).</strong></p>
    <p>So, moles of MgO = 0.25 mol.</p>
    
    <p><strong>Step 3: Find mass of MgO.</strong></p>
    <p>m = n × M<sub>r</sub> = 0.25 × 40 = 10.0 g</p>
    
    <p><strong>✅ Answer: 10.0 g of magnesium oxide formed.</strong></p>
  </div>

  <div class="example-block">
    <h4>🟢 Example 2 – Reacting Mass Calculation</h4>
    <p><strong>Question: What mass of hydrogen is produced when 4.0 g of sodium reacts with water?</strong></p>
    <p class="equation">2 Na + 2 H₂O → 2 NaOH + H₂</p>
    
    <p><strong>Step 1: Moles of Na = 4 ÷ 23 = 0.174 mol.</strong></p>
    
    <p><strong>Step 2: Ratio Na : H₂ = 2 : 1</strong></p>
    <p>→ Moles of H₂ = 0.174 ÷ 2 = 0.087 mol.</p>
    
    <p><strong>Step 3: Mass of H₂ = 0.087 × 2 = 0.174 g</strong></p>
    
    <p><strong>✅ Answer: 0.17 g of hydrogen gas produced.</strong></p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Using Moles to Predict Products</h3>
  
  <div class="key-facts-block">
    <h4>🧠 Key Concept</h4>
    <p>Balanced equations can be used to predict how much of a product forms from known reactant masses — or vice versa.</p>
  </div>

  <div class="example-block">
    <h4>🟢 Example – Iron and Oxygen</h4>
    <p><strong>Reaction:</strong></p>
    <p class="equation">4 Fe + 3 O₂ → 2 Fe₂O₃</p>
    
    <p><strong>Given:</strong> 16.8 g Fe (M<sub>r</sub> = 56).</p>
    <p><strong>Find:</strong> Mass of Fe₂O₃ produced (M<sub>r</sub> = 160).</p>
    
    <p><strong>Step 1:</strong></p>
    <p>n(Fe) = 16.8 ÷ 56 = 0.3 mol</p>
    
    <p><strong>Step 2: Ratio Fe : Fe₂O₃ = 4 : 2 → 2 : 1</strong></p>
    <p>n(Fe₂O₃) = 0.3 ÷ 2 = 0.15 mol</p>
    
    <p><strong>Step 3:</strong></p>
    <p>m = n × M<sub>r</sub> = 0.15 × 160 = 24 g</p>
    
    <p><strong>✅ Answer: 24 g of Fe₂O₃ formed.</strong></p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Interpreting Equations Using Mole Ratios</h3>
  
  <div class="key-facts-block">
    <h4>🧠 Common Reactions</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Equation</th>
          <th>Ratio of Reactants : Products</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2 H₂ + O₂ → 2 H₂O</td>
          <td>2 : 1 : 2</td>
          <td>Two moles of hydrogen react with one mole of oxygen.</td>
        </tr>
        <tr>
          <td>N₂ + 3 H₂ → 2 NH₃</td>
          <td>1 : 3 : 2</td>
          <td>One mole nitrogen reacts with three moles hydrogen to form two moles ammonia.</td>
        </tr>
        <tr>
          <td>4 Fe + 3 O₂ → 2 Fe₂O₃</td>
          <td>4 : 3 : 2</td>
          <td>Four moles of Fe react with three moles O₂.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Exam Tip</h4>
    <p>Always simplify mole ratios to the smallest whole numbers.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Limiting Reactants (Intro)</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>When one reactant is used up first, the reaction stops — that reactant is called the <strong>limiting reactant</strong>.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Point</h4>
    <p>The other reactant is in excess (some is left over). Only the limiting reactant determines the amount of product made.</p>
  </div>

  <div class="example-block">
    <h4>🟢 Example</h4>
    <p class="equation">2 H₂ + O₂ → 2 H₂O</p>
    <p>If you have 5 mol H₂ and 2 mol O₂, the limiting reactant is O₂, because you need 2.5 mol O₂ for 5 mol H₂ — but you only have 2.</p>
    <p><strong>✅ So O₂ limits the reaction → less water forms.</strong></p>
  </div>
</div>
        `,
        canonical_keywords: [
          "mole ratio", "balanced equation", "coefficients", "reactants", "products",
          "calculation", "mass", "limiting reactant", "excess", "stoichiometry"
        ],
        practice_items: []
      },
      {
        id: "3-2-3-balance-with-moles",
        title: "3.2.3 USING MOLES TO BALANCE EQUATIONS",
        type: "content",
        study_group: 5,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Why Moles Are Used to Balance Equations</h3>
  
  <div class="definition-block">
    <h4>🔵 Key Idea</h4>
    <p>Balanced chemical equations show the ratio of moles of reactants and products. If we know how many moles of each substance react or form, we can use those numbers to write a balanced equation.</p>
    <p><strong>In other words:</strong> The smallest whole-number ratio of moles becomes the coefficients in the balanced equation.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Step-by-Step Method</h3>
  
  <div class="key-facts-block">
    <h4>🔢 Method to Balance Using Moles</h4>
    <ol>
      <li>Find the number of moles of each substance (from experiment or given data).</li>
      <li>Write the ratio of moles of each substance.</li>
      <li>Divide by the smallest number of moles to simplify the ratio.</li>
      <li>Multiply up to whole numbers if necessary.</li>
      <li>Write the balanced equation using these numbers as coefficients.</li>
    </ol>
  </div>

  <div class="example-block">
    <h4>🟢 Example 1 – Magnesium and Oxygen</h4>
    <p><strong>Experimental data:</strong></p>
    <p>0.5 mol Mg reacts with 0.25 mol O₂</p>
    <p><strong>Product:</strong> MgO</p>
    
    <p><strong>Step 1: Write the mole ratio → Mg : O₂ = 0.5 : 0.25</strong></p>
    
    <p><strong>Step 2: Divide both by 0.25 → 2 : 1</strong></p>
    
    <p><strong>✅ Ratio = 2 : 1 → Equation:</strong></p>
    <p class="equation">2 Mg + O₂ → 2 MgO</p>
  </div>

  <div class="example-block">
    <h4>🟢 Example 2 – Hydrogen and Oxygen</h4>
    <p><strong>Moles found experimentally:</strong></p>
    <p>2.0 mol H₂ reacts with 1.0 mol O₂</p>
    <p><strong>Product:</strong> H₂O</p>
    
    <p><strong>Step 1: H₂ : O₂ : H₂O = 2 : 1 : 2</strong></p>
    
    <p><strong>✅ Balanced equation:</strong></p>
    <p class="equation">2 H₂ + O₂ → 2 H₂O</p>
  </div>

  <div class="example-block">
    <h4>🟢 Example 3 – Magnesium and Hydrochloric Acid</h4>
    <p><strong>Data from experiment:</strong></p>
    <p>0.1 mol Mg reacts with 0.2 mol HCl, forming 0.1 mol MgCl₂ and 0.1 mol H₂.</p>
    
    <p><strong>Step 1: Write the mole ratio</strong></p>
    <p>Mg : HCl : MgCl₂ : H₂ = 0.1 : 0.2 : 0.1 : 0.1</p>
    
    <p><strong>Step 2: Divide by 0.1 → 1 : 2 : 1 : 1</strong></p>
    
    <p><strong>✅ Balanced equation:</strong></p>
    <p class="equation">Mg + 2 HCl → MgCl₂ + H₂</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Using Moles to Check Balanced Equations</h3>
  
  <div class="key-facts-block">
    <h4>🧠 Key Point</h4>
    <p>You can check if a given equation is balanced by comparing moles of each element on both sides.</p>
  </div>

  <div class="example-block">
    <h4>🟢 Example</h4>
    <p class="equation">N₂ + 3 H₂ → 2 NH₃</p>
    <table class="data-table">
      <thead>
        <tr>
          <th>Substance</th>
          <th>Moles</th>
          <th>Atoms of N</th>
          <th>Atoms of H</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>N₂</td>
          <td>1</td>
          <td>2</td>
          <td>—</td>
        </tr>
        <tr>
          <td>H₂</td>
          <td>3</td>
          <td>—</td>
          <td>6</td>
        </tr>
        <tr>
          <td>NH₃</td>
          <td>2</td>
          <td>2</td>
          <td>6</td>
        </tr>
      </tbody>
    </table>
    <p><strong>✅ Same number of N and H atoms → equation balanced.</strong></p>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Important Note</h4>
    <p>Always compare total atoms of each element — not total moles of substances.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Calculating Unknown Masses Using Balanced Ratios</h3>
  
  <div class="key-facts-block">
    <h4>🧠 Key Concept</h4>
    <p>Once an equation is balanced, it can be used to calculate unknown masses of reactants or products.</p>
  </div>

  <div class="example-block">
    <h4>🟢 Example</h4>
    <p><strong>Ammonia is made from nitrogen and hydrogen:</strong></p>
    <p class="equation">N₂ + 3 H₂ → 2 NH₃</p>
    
    <p><strong>Given:</strong> 4 mol H₂</p>
    <p><strong>Find:</strong> moles of NH₃ formed</p>
    
    <p><strong>Ratio H₂ : NH₃ = 3 : 2</strong></p>
    <p>n(NH₃) = 4 × (2/3) = 2.67 mol</p>
    
    <p><strong>✅ Answer: 2.67 mol NH₃ formed.</strong></p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Practice Problem</h3>
  
  <div class="example-block">
    <h4>🟢 Practice Question</h4>
    <p><strong>A student found that 0.4 mol of calcium reacted completely with 0.8 mol of chlorine gas. Write a balanced equation for this reaction.</strong></p>
    
    <p><strong>Step 1: Ca : Cl₂ = 0.4 : 0.8</strong></p>
    
    <p><strong>Divide both by 0.4 → 1 : 2</strong></p>
    
    <p><strong>✅ Balanced equation:</strong></p>
    <p class="equation">Ca + Cl₂ → CaCl₂</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 6 – Exam Technique</h3>
  
  <div class="exam-tip-block">
    <h4>🧠 Exam Tips</h4>
    <ul>
      <li>🔹 Always state your mole ratio clearly — AQA often awards one mark for this.</li>
      <li>🔹 Show your working, even if your final ratio is obvious.</li>
      <li>🔹 Never write decimals as coefficients — multiply up to whole numbers (e.g., 1.5 : 1 → 3 : 2).</li>
      <li>🔹 Units for mole data are often hidden in tables — check carefully.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 7 – Common Errors</h3>
  
  <div class="warning-block">
    <h4>⚡ Common Mistakes</h4>
    <ul>
      <li>❌ Forgetting to simplify ratios (e.g., 4 : 2 : 2 should be 2 : 1 : 1).</li>
      <li>❌ Using masses instead of moles to balance.</li>
      <li>❌ Forgetting diatomic molecules (O₂, H₂, Cl₂, N₂).</li>
    </ul>
    <p><strong>🧠 Always convert given masses → moles first using n = m / M<sub>r</sub>, then balance.</strong></p>
  </div>
</div>
        `,
        canonical_keywords: [
          "balance equation", "mole ratio", "coefficients", "experimental data", "simplify",
          "whole numbers", "stoichiometry", "calculation", "method"
        ],
        practice_items: []
      },
      {
        id: "3-3-1-limiting-reactants",
        title: "3.3.1 LIMITING REACTANTS",
        type: "content",
        study_group: 6,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – What Is a Limiting Reactant?</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>In a chemical reaction, the limiting reactant is the reactant that is completely used up first, which stops the reaction from continuing.</p>
    <p>Once the limiting reactant is gone, the reaction cannot produce any more product, even if other reactants remain.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Idea</h4>
    <ul>
      <li>The amount of product formed is directly proportional to the amount of limiting reactant.</li>
      <li>The excess reactant is left over and does not affect how much product is formed.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Identifying the Limiting Reactant</h3>
  
  <div class="key-facts-block">
    <h4>🔢 Method</h4>
    <ol>
      <li>Write a balanced equation.</li>
      <li>Calculate the moles of each reactant using n = m / M<sub>r</sub></li>
      <li>Use the mole ratio from the equation to see which reactant would run out first.</li>
      <li>The reactant that runs out first = limiting reactant.</li>
    </ol>
  </div>

  <div class="example-block">
    <h4>🟢 Example 1 – Simple Mole Ratio</h4>
    <p><strong>Reaction:</strong></p>
    <p class="equation">2 H₂ + O₂ → 2 H₂O</p>
    
    <p><strong>If you have:</strong></p>
    <ul>
      <li>4 mol H₂</li>
      <li>2 mol O₂</li>
    </ul>
    
    <p>Ratio needed = 2 : 1</p>
    <p>Actual ratio = 4 : 2 → matches perfectly ✅ → no limiting reactant (both used completely).</p>
    
    <p><strong>Now suppose:</strong></p>
    <ul>
      <li>5 mol H₂</li>
      <li>2 mol O₂</li>
    </ul>
    
    <p>Ratio needed = 2 : 1 → 2 mol H₂ needs 1 mol O₂. For 5 mol H₂, you need 2.5 mol O₂, but only have 2 mol O₂.</p>
    <p><strong>✅ O₂ is the limiting reactant because it runs out first.</strong></p>
  </div>

  <div class="example-block">
    <h4>💡 Example 2 – Using Masses</h4>
    <p><strong>Reaction:</strong></p>
    <p class="equation">Mg + 2 HCl → MgCl₂ + H₂</p>
    
    <p><strong>Given:</strong> 6.0 g Mg, 10.0 g HCl</p>
    
    <p><strong>Step 1: Convert to moles</strong></p>
    <p>n(Mg) = 6.0 ÷ 24 = 0.25 mol</p>
    <p>n(HCl) = 10.0 ÷ 36.5 = 0.274 mol</p>
    
    <p><strong>Step 2: Ratio required = 1 : 2</strong></p>
    <p>To react with 0.25 mol Mg, we need 0.50 mol HCl — but we only have 0.274 mol.</p>
    
    <p><strong>✅ HCl is the limiting reactant</strong></p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Calculating Product from the Limiting Reactant</h3>
  
  <div class="key-facts-block">
    <h4>🧠 Key Point</h4>
    <p>Once you've found the limiting reactant, you can calculate the maximum mass of product that can be made.</p>
  </div>

  <div class="key-facts-block">
    <h4>🔢 Method Summary</h4>
    <ol>
      <li>Find moles of each reactant.</li>
      <li>Identify limiting reactant using the mole ratio.</li>
      <li>Use the limiting reactant to find moles of product using the equation ratio.</li>
      <li>Convert moles → mass using m = n × M<sub>r</sub>.</li>
    </ol>
  </div>

  <div class="example-block">
    <h4>💡 Example – Magnesium and Hydrochloric Acid</h4>
    <p class="equation">Mg + 2 HCl → MgCl₂ + H₂</p>
    
    <p><strong>Given:</strong></p>
    <ul>
      <li>0.25 mol Mg</li>
      <li>0.30 mol HCl</li>
    </ul>
    
    <p><strong>Ratio = 1 : 2</strong></p>
    <p>To react with 0.25 mol Mg → need 0.50 mol HCl → only have 0.30 mol → HCl is limiting.</p>
    
    <p><strong>Step 1: Ratio HCl : H₂ = 2 : 1</strong></p>
    <p>So, 0.30 mol HCl produces:</p>
    <p>0.30 ÷ 2 = 0.15 mol H₂</p>
    
    <p><strong>Step 2: Convert to mass</strong></p>
    <p>m = n × M<sub>r</sub> = 0.15 × 2 = 0.30 g of H₂</p>
    
    <p><strong>✅ Maximum mass of hydrogen gas = 0.30 g</strong></p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Understanding Excess Reactants</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>The excess reactant is the one still left after the limiting reactant is fully used.</p>
    <p>It can be calculated by comparing moles used vs. moles available.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Point</h4>
    <p>Only the limiting reactant controls the yield of product.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Common Exam Questions</h3>
  
  <div class="exam-tip-block">
    <h4>🧠 Exam Tips</h4>
    <ul>
      <li><strong>Q1 – Which reactant is limiting?</strong></li>
      <li>✅ Always compare mole ratio in equation vs. actual ratio.</li>
      <li><strong>Q2 – What mass of product forms?</strong></li>
      <li>✅ Use the limiting reactant → find product moles → convert to mass.</li>
      <li><strong>Q3 – How much excess reactant remains?</strong></li>
      <li>✅ Calculate moles used, subtract from moles available.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 6 – Worked Example (Full Calculation)</h3>
  
  <div class="example-block">
    <h4>🟢 Complete Example</h4>
    <p><strong>Reaction:</strong></p>
    <p class="equation">2 H₂ + O₂ → 2 H₂O</p>
    
    <p><strong>Given:</strong></p>
    <ul>
      <li>8.0 g H₂ (M<sub>r</sub> = 2)</li>
      <li>32.0 g O₂ (M<sub>r</sub> = 32)</li>
    </ul>
    
    <p><strong>Step 1: Moles of each</strong></p>
    <p>n(H₂) = 8 ÷ 2 = 4.0 mol</p>
    <p>n(O₂) = 32 ÷ 32 = 1.0 mol</p>
    
    <p><strong>Step 2: Ratio required = 2 : 1</strong></p>
    <p>Actual ratio = 4 : 1 → O₂ limiting.</p>
    
    <p><strong>Step 3: Moles of H₂O formed = 2 × 1 = 2 mol.</strong></p>
    
    <p><strong>Step 4: Mass of H₂O = 2 × 18 = 36 g.</strong></p>
    
    <p><strong>✅ Maximum yield = 36 g water</strong></p>
    <p><strong>✅ Oxygen = limiting reactant</strong></p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 7 – Real-Life Connection</h3>
  
  <div class="key-facts-block">
    <h4>🧠 Industrial Applications</h4>
    <p>In industrial reactions:</p>
    <ul>
      <li>Limiting reactants are chosen carefully to avoid waste.</li>
      <li>The cheaper reactant is often used in excess, so the more expensive reactant is fully reacted for maximum yield.</li>
    </ul>
    <p><strong>Example:</strong> In the Haber process (N₂ + 3H₂ → 2NH₃), nitrogen is usually in excess, so hydrogen becomes the limiting reactant.</p>
  </div>
</div>
        `,
        canonical_keywords: [
          "limiting reactant", "excess reactant", "mole ratio", "product yield", "calculation",
          "mass", "used up", "runs out", "maximum yield", "stoichiometry"
        ],
        practice_items: []
      },
      {
        id: "3-3-2-atom-economy",
        title: "3.3.2 ATOM ECONOMY",
        type: "content",
        study_group: 7,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 1 – What Is Atom Economy?</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>The atom economy of a reaction is the measure of how efficiently atoms are used to make the desired product.</p>
    <p>It compares the total mass of useful products to the total mass of all products.</p>
    <p class="formula">Atom Economy = (M<sub>r</sub> of desired product × 100) / (Sum of M<sub>r</sub> of all products)</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Idea</h4>
    <p>High atom economy → fewer atoms wasted → more efficient reaction.</p>
    <p>Low atom economy → many atoms form unwanted by-products → wasteful and expensive.</p>
    <p><strong>💡 Atom economy is always calculated from the balanced equation using formula masses (M<sub>r</sub> values), not from actual experimental data.</strong></p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Why Atom Economy Is Important</h3>
  
  <div class="key-facts-block">
    <h4>🧠 Why It Matters</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Reason</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Economic</td>
          <td>High atom economy = less waste, less cost.</td>
        </tr>
        <tr>
          <td>Environment</td>
          <td>Less waste → less pollution and disposal issues.</td>
        </tr>
        <tr>
          <td>Sustainability</td>
          <td>Conserves limited natural resources.</td>
        </tr>
        <tr>
          <td>Efficiency</td>
          <td>Maximises useful output, improves green chemistry.</td>
        </tr>
      </tbody>
    </table>
    <p><strong>🧠 Reactions with 100% atom economy are ideal because all atoms from reactants form the desired product.</strong></p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Calculating Atom Economy</h3>
  
  <div class="example-block">
    <h4>💡 Example 1 – Simple Reaction</h4>
    <p class="equation">2 H₂ + O₂ → 2 H₂O</p>
    
    <p><strong>Step 1: Identify desired product → H₂O</strong></p>
    
    <p><strong>Step 2: Calculate M<sub>r</sub> values</strong></p>
    <ul>
      <li>H₂ = 2</li>
      <li>O₂ = 32</li>
      <li>H₂O = 18</li>
    </ul>
    
    <p><strong>Step 3:</strong></p>
    <p>Total M<sub>r</sub> of desired products = 2 × 18 = 36</p>
    <p>Total M<sub>r</sub> of all products = 36</p>
    
    <p>Atom Economy = 36 × 100 / 36 = 100%</p>
    <p><strong>✅ 100% atom economy (no waste — all atoms form water).</strong></p>
  </div>

  <div class="example-block">
    <h4>🟢 Example 2 – Reaction Producing a By-Product</h4>
    <p class="equation">C₂H₄ + H₂O → C₂H₆O</p>
    <p><strong>✅ Atom economy = 100% (one product only).</strong></p>
    
    <p>But now consider:</p>
    <p class="equation">C₂H₄ + Cl₂ → C₂H₄Cl₂</p>
    <p>Still 100%, since one product forms.</p>
    
    <p><strong>🧠 So atom economy is only &lt;100% if unwanted products are formed.</strong></p>
  </div>

  <div class="example-block">
    <h4>🟢 Example 3 – Reaction with Waste Product</h4>
    <p class="equation">Na₂CO₃ + 2 HCl → 2 NaCl + H₂O + CO₂</p>
    
    <p><strong>Desired product: NaCl</strong></p>
    
    <p><strong>Total M<sub>r</sub> (products):</strong></p>
    <table class="data-table">
      <tbody>
        <tr>
          <td>2NaCl</td>
          <td>=</td>
          <td>2 × 58.5</td>
          <td>=</td>
          <td>117</td>
        </tr>
        <tr>
          <td>H₂O</td>
          <td>=</td>
          <td>18</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>CO₂</td>
          <td>=</td>
          <td>44</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td><strong>Total</strong></td>
          <td>=</td>
          <td><strong>179</strong></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
    
    <p>Atom Economy = 117 × 100 / 179 = 65.4%</p>
    
    <p><strong>✅ Atom economy = 65.4% → the other 34.6% of atoms become waste (H₂O and CO₂).</strong></p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Interpreting Atom Economy</h3>
  
  <div class="key-facts-block">
    <h4>🧠 Atom Economy Guide</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Atom Economy</th>
          <th>Description</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>100%</td>
          <td>All atoms in reactants become product</td>
          <td>Hydrogen + oxygen → water</td>
        </tr>
        <tr>
          <td>High (70–99%)</td>
          <td>Efficient, little waste</td>
          <td>Industrial synthesis, addition reactions</td>
        </tr>
        <tr>
          <td>Low (&lt;70%)</td>
          <td>Inefficient, lots of by-products</td>
          <td>Substitution or neutralisation reactions</td>
        </tr>
      </tbody>
    </table>
    <p><strong>🧠 Addition reactions tend to have 100% atom economy; substitution and neutralisation reactions do not.</strong></p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Improving Atom Economy</h3>
  
  <div class="key-facts-block">
    <h4>🧠 Strategies</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Strategy</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Use reactions with fewer by-products</td>
          <td>e.g. addition reactions instead of substitution.</td>
        </tr>
        <tr>
          <td>Find uses for waste products</td>
          <td>Sell or reuse waste to improve overall efficiency.</td>
        </tr>
        <tr>
          <td>Design better catalysts</td>
          <td>Helps direct the reaction to produce desired products only.</td>
        </tr>
        <tr>
          <td>Change reaction conditions</td>
          <td>Adjust temperature or pressure to improve product yield.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 6 – Difference Between Atom Economy and Percentage Yield</h3>
  
  <div class="key-facts-block">
    <h4>🧠 Comparison</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Concept</th>
          <th>Definition</th>
          <th>Depends On</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Atom Economy</td>
          <td>How efficiently atoms are used</td>
          <td>Balanced equation</td>
          <td>Adds up M<sub>r</sub> values</td>
        </tr>
        <tr>
          <td>Percentage Yield</td>
          <td>How much product you actually get</td>
          <td>Experimental results</td>
          <td>Depends on losses and side reactions</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="example-block">
    <h4>🟢 Example:</h4>
    <p>A reaction could have 100% atom economy but 50% yield if half the product was lost during extraction.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 7 – Exam-Style Example</h3>
  
  <div class="example-block">
    <h4>🟢 Question</h4>
    <p><strong>Ethanol (C₂H₆O) can be made by two methods:</strong></p>
    
    <p><strong>1. Fermentation:</strong></p>
    <p class="equation">C₆H₁₂O₆ → 2 C₂H₆O + 2 CO₂</p>
    
    <p><strong>2. Hydration of ethene:</strong></p>
    <p class="equation">C₂H₄ + H₂O → C₂H₆O</p>
    
    <p><strong>Which has the higher atom economy?</strong></p>
    
    <p><strong>Step 1:</strong></p>
    <p><strong>Fermentation:</strong></p>
    <p>M<sub>r</sub> (desired) = 2 × 46 = 92</p>
    <p>Total M<sub>r</sub> (products) = 92 + (2 × 44) = 180</p>
    <p>Atom economy = 92 × 100 / 180 = 51.1%</p>
    
    <p><strong>Hydration:</strong></p>
    <p>Atom economy = 46 × 100 / 46 = 100%</p>
    
    <p><strong>✅ Answer: Hydration of ethene → 100% atom economy → more efficient and sustainable.</strong></p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 8 – Environmental Importance</h3>
  
  <div class="key-facts-block">
    <h4>🌍 Green Chemistry</h4>
    <p>High atom economy reactions are vital for green chemistry because they:</p>
    <ul>
      <li>Reduce waste production</li>
      <li>Lower costs of raw materials and waste disposal</li>
      <li>Reduce energy consumption</li>
      <li>Use fewer non-renewable resources</li>
    </ul>
    <p><strong>🧠 Modern chemical industries aim for both high yield and high atom economy.</strong></p>
  </div>
</div>
        `,
        canonical_keywords: [
          "atom economy", "efficiency", "waste", "by-products", "desired product",
          "Mr", "percentage", "green chemistry", "sustainable", "calculation"
        ],
        practice_items: []
      },
      {
        id: "3-3-3-concentration-solutions",
        title: "3.3.3 CONCENTRATION OF SOLUTIONS",
        type: "content",
        study_group: 8,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – What Is Concentration?</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>The concentration of a solution tells you how much solute (solid, liquid, or gas) is dissolved in a given volume of solvent.</p>
    <p><strong>🧠 In simpler words:</strong></p>
    <p>How much stuff is in a given amount of liquid.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Units of Concentration</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Formula</th>
          <th>Units</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mass concentration</td>
          <td>c = mass of solute (g) / volume of solution (dm³)</td>
          <td>g/dm³</td>
          <td>10 g NaCl in 1 dm³ → 10 g/dm³</td>
        </tr>
        <tr>
          <td>Molar concentration</td>
          <td>c = moles of solute (mol) / volume of solution (dm³)</td>
          <td>mol/dm³</td>
          <td>0.5 mol HCl in 1 dm³ → 0.5 mol/dm³</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Conversion Between Units</h4>
    <p>To convert between the two:</p>
    <p class="formula">c (mol/dm³) = c (g/dm³) / M<sub>r</sub> of solute</p>
    <p class="formula">c (g/dm³) = c (mol/dm³) × M<sub>r</sub> of solute</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Calculating Mass or Moles in Solutions</h3>
  
  <div class="key-facts-block">
    <h4>🔢 Formulae Summary</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>To Find</th>
          <th>Formula</th>
          <th>Units</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mass (g)</td>
          <td>m = c × V</td>
          <td>g, dm³</td>
        </tr>
        <tr>
          <td>Moles (mol)</td>
          <td>n = c × V</td>
          <td>mol, dm³</td>
        </tr>
        <tr>
          <td>Concentration (mol/dm³)</td>
          <td>c = n / V</td>
          <td>mol, dm³</td>
        </tr>
        <tr>
          <td>Concentration (g/dm³)</td>
          <td>c = m / V</td>
          <td>g, dm³</td>
        </tr>
      </tbody>
    </table>
    <p><strong>🧠 Always convert volume into dm³ before using these equations (1 dm³ = 1000 cm³ = 1 L).</strong></p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">💡 Subsection 3 – Worked Examples</h3>
  
  <div class="example-block">
    <h4>💎 Example 1 – Find Concentration (g/dm³)</h4>
    <p>A solution contains 5.0 g of sodium chloride dissolved in 0.25 dm³ of water. Find its concentration in g/dm³.</p>
    
    <p>c = m / V = 5.0 / 0.25 = 20 g/dm³</p>
    
    <p><strong>✅ Answer: 20 g/dm³</strong></p>
  </div>

  <div class="example-block">
    <h4>💎 Example 2 – Convert to mol/dm³</h4>
    <p>NaCl has an M<sub>r</sub> = 58.5.</p>
    <p>c (mol/dm³) = 20 / 58.5 = 0.34 mol/dm³</p>
    
    <p><strong>✅ Answer: 0.34 mol/dm³</strong></p>
  </div>

  <div class="example-block">
    <h4>🟢 Example 3 – Find Moles in a Solution</h4>
    <p>A 250 cm³ (0.25 dm³) solution of sulfuric acid (H₂SO₄) has a concentration of 0.2 mol/dm³. Find the number of moles of acid present.</p>
    
    <p>n = c × V = 0.2 × 0.25 = 0.05 mol</p>
    
    <p><strong>✅ Answer: 0.05 mol H₂SO₄</strong></p>
  </div>

  <div class="example-block">
    <h4>🟢 Example 4 – Find Mass in Solution</h4>
    <p>A 0.1 mol/dm³ solution of potassium hydroxide (KOH) has a volume of 0.5 dm³. Find the mass of KOH in the solution (M<sub>r</sub> = 56).</p>
    
    <p>n = c × V = 0.1 × 0.5 = 0.05 mol</p>
    <p>m = n × M<sub>r</sub> = 0.05 × 56 = 2.8 g</p>
    
    <p><strong>✅ Answer: 2.8 g of KOH</strong></p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Interpreting Graphs and Tables</h3>
  
  <div class="key-facts-block">
    <h4>🧠 Key Points</h4>
    <p>You may see questions showing volume and concentration data. Remember:</p>
    <ul>
      <li>Concentration is directly proportional to the amount of solute.</li>
      <li>Doubling concentration doubles the number of moles per dm³.</li>
    </ul>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Exam Tip:</h4>
    <p>If the same solute is dissolved in a smaller volume, the concentration increases.</p>
  </div>

  <div class="example-block">
    <h4>🟢 Example</h4>
    <p>10 g NaCl in:</p>
    <ul>
      <li>1 dm³ → 10 g/dm³</li>
      <li>0.5 dm³ → 20 g/dm³</li>
    </ul>
    <p><strong>✅ Halving the volume doubles the concentration.</strong></p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Conversion Between cm³ and dm³</h3>
  
  <div class="key-facts-block">
    <h4>🧠 Volume Conversion</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1 dm³</td>
          <td>1000 cm³</td>
        </tr>
        <tr>
          <td>250 cm³</td>
          <td>0.25 dm³</td>
        </tr>
        <tr>
          <td>25 cm³</td>
          <td>0.025 dm³</td>
        </tr>
      </tbody>
    </table>
    <p><strong>🧠 AQA often gives you cm³. Always convert before using concentration formulas.</strong></p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 6 – Practical Relevance</h3>
  
  <div class="key-facts-block">
    <h4>🧠 Applications</h4>
    <p>Concentration is measured in:</p>
    <ul>
      <li>Titrations (to find unknown concentrations).</li>
      <li>Medicine (drug strength in mol/dm³).</li>
      <li>Environmental testing (pollutants in water).</li>
      <li>Food chemistry (salt or acid levels in products).</li>
    </ul>
    <p><strong>🧠 Concentration links to reaction rates and product yield.</strong></p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 7 – Common Exam Mistakes</h3>
  
  <div class="warning-block">
    <h4>⚡ Common Mistakes</h4>
    <ul>
      <li>❌ Forgetting to convert cm³ → dm³ (divide by 1000).</li>
      <li>❌ Mixing up g/dm³ and mol/dm³.</li>
      <li>❌ Using M<sub>r</sub> instead of A<sub>r</sub> or vice versa.</li>
      <li>❌ Forgetting to show units in the final answer.</li>
    </ul>
    <p><strong>✅ Always state final answer with correct unit (mol/dm³ or g/dm³).</strong></p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 8 – Summary Table</h3>
  
  <div class="key-facts-block">
    <h4>🧠 Quick Reference</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Concept</th>
          <th>Formula</th>
          <th>Units</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Concentration (mass)</td>
          <td>c = m / V</td>
          <td>g/dm³</td>
        </tr>
        <tr>
          <td>Concentration (moles)</td>
          <td>c = n / V</td>
          <td>mol/dm³</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
        `,
        canonical_keywords: [
          "concentration", "solution", "solute", "solvent", "mol/dm³", "g/dm³",
          "moles", "mass", "volume", "dm³", "cm³", "conversion", "calculation"
        ],
        practice_items: []
      }
    ]
  },
  {
    id: "chemical-changes",
    title: "Chemical changes",
    status: "coming_soon",
    subsections: []
  },
  {
    id: "energy-changes",
    title: "Energy changes",
    status: "coming_soon",
    subsections: []
  },
  {
    id: "rate-extent",
    title: "Rate & extent of chemical change",
    status: "coming_soon",
    subsections: []
  },
  {
    id: "organic-chemistry",
    title: "Organic chemistry",
    status: "coming_soon",
    subsections: []
  },
  {
    id: "chemical-analysis",
    title: "Chemical analysis, the atmosphere & using resources",
    status: "coming_soon",
    subsections: []
  }
];
