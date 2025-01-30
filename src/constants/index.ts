// export const BASE_URL = "http://localhost:3000";
export const BASE_URL = "http://127.0.0.1:3000";

export const experimentData = {
  title:
    "BD Leucocount SOP 2: Immunofluorescent Labeling of Leucoreduced Products",
  sections: [
    {
      section_title: "Purpose",
      content:
        "To manually prepare leucoreduced blood products and control samples using BD Leucocount™ reagents for detecting rWBCs with the BD FACSVia™ flow cytometer.",
    },
    {
      section_title: "Scope",
      content:
        "This procedure applies to the clinical laboratory environment with the BD FACSVia flow cytometer for the purpose of detecting rWBCs using leucoreduced blood products. We recommend that all personnel who operate the instrument be sufficiently trained to fully perform and implement this guideline.",
    },
    {
      section_title: "Equipment Required",
      content: [
        { item: "BD FACSVia flow cytometer and workstation", type: "checkbox" },
        { item: "BD FACSVia™ Loader", type: "checkbox" },
        { item: "500-µL pipet for dispensing the reagent", type: "checkbox" },
        { item: "100-µL pipet", type: "checkbox" },
        { item: "Kimwipes® wipes", type: "checkbox" },
        { item: "Vortex", type: "checkbox" },
      ],
    },
    {
      section_title: "Materials Required",
      content: [
        { item: "Biohazard safety manual", type: "checkbox" },
        { item: "Biohazard sharps waste container", type: "checkbox" },
        { item: "Personal protective equipment (PPE)", type: "checkbox" },
        { item: "Protective gloves", type: "checkbox" },
        { item: "Protective eyewear", type: "checkbox" },
        { item: "Closed-toe shoes", type: "checkbox" },
        { item: "Lab coat", type: "checkbox" },
        {
          item: "BD Leucocount™ Controls (Catalog Nos. 341001, 341002, 341003) or equivalent",
          type: "checkbox",
        },
        {
          item: "BD Leucocount™ reagent (Catalog No. 340523)",
          type: "checkbox",
        },
        {
          item: "Leucoreduced blood products less than 48 hours old",
          type: "checkbox",
        },
      ],
    },
    {
      section_title: "Procedure",
      content: [
        {
          step: 1,
          text: "Label one BD Trucount tube with a sample identification number for each control or patient sample.",
        },
        {
          step: 2,
          text: "Reverse pipette 100 µL of well mixed blood product or control into the bottom of each tube.",
          notes: [
            "A Kimwipe wipe can be used to cover the top of the sample tube when removing the stopper to avoid splattering blood.",
            "Avoid smearing blood down the side of the tube. If whole blood remains on the side of the tube, it will not be stained with the reagent and can affect results. Use a cotton-tipped applicator stick dipped in deionized water to remove the blood that was smeared.",
          ],
        },
        {
          step: 3,
          text: "Pipette 400 µL of BD Leucocount reagent into the bottom of each tube.",
        },
        {
          step: 4,
          text: "Cap the tubes and vortex on low speed for 3 seconds to mix.",
        },
        {
          step: 5,
          text: "Incubate for 5 minutes in the dark at room temperature (20°C–25°C). Samples are now ready to be acquired on the flow cytometer.",
        },
        {
          step: 6,
          text: "Cap or cover and store the prepared tubes at room temperature in the dark until flow cytometric analysis. Samples can be acquired up to 24 hours after staining. Vortex the cells thoroughly at low speed to ensure a homogeneous mixture of beads and cells before acquiring on the flow cytometer.",
        },
      ],
    },
    {
      section_title: "References",
      content: [
        "BD FACSVia™ II Instructions for Use, document 23-14662-01.",
        "BD Leucocount™ kit technical data sheet, document 23-3434-08, available at www.bdbiosciences.com.",
      ],
    },
  ],
} as const;
