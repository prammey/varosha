/**
 * Terms, Privacy and Accessibility pages.
 * These are drafts for the board to review; the original site had Wix placeholder text.
 */
export type LegalSection = { heading?: string; paragraphs?: string[]; bullets?: string[] };
export type LegalPage = { title: string; sections: LegalSection[]; draftNote: string };

export const terms: LegalPage = {
  title: "Terms & Conditions",
  sections: [
    {
      heading: "Legal disclaimer",
      paragraphs: [
        "Varosha is committed to transparency and legal compliance. The information provided on this page serves as a general guide for understanding our Terms & Conditions. However, it should not be considered as legal advice or as a substitute for professional legal counsel. Each user’s specific requirements and interactions with our organization may necessitate tailored legal arrangements. We strongly advise seeking professional legal guidance to ensure that your engagement with Varosha aligns with applicable laws and regulations.",
      ],
    },
    {
      heading: "Understanding Terms & Conditions",
      paragraphs: [
        "At Varosha, Terms and Conditions (T&C) form the framework for the legal relationship between our organization and our stakeholders. These binding terms define the rights and responsibilities of users when accessing or engaging with our services. The nature of our operations and the diverse needs of our stakeholders necessitate customized T&C to ensure clarity and legal compliance. Whether you are a donor, volunteer, scholarship applicant or visitor, these terms govern your use of this website.",
      ],
    },
    {
      heading: "Key elements of T&C",
      paragraphs: [
        "In crafting our T&C, we address a wide range of matters to safeguard the interests of all parties involved. These include delineating user eligibility, outlining payment procedures, acknowledging the potential evolution of our offerings, specifying warranties, addressing intellectual property concerns, and articulating our rights regarding account suspension or termination.",
      ],
    },
  ],
  draftNote: "Terms and Conditions.",
};

export const privacy: LegalPage = {
  title: "Privacy Policy",
  sections: [
    {
      heading: "What we collect",
      paragraphs: [
        "Varosha collects only the information you give us directly: your name and email when you write to us, the details on a scholarship application submitted through our Google Form, and the name and email on a donation so that we can send a tax receipt. This website does not use advertising trackers.",
      ],
    },
    {
      heading: "How we use it",
      paragraphs: [
        "We use your information to answer your message, process a scholarship application, acknowledge a donation for tax purposes, and, if you ask, send you our annual newsletter. We do not sell or rent personal information.",
      ],
    },
    {
      heading: "Sharing",
      paragraphs: [
        "Scholarship applications are read by the Varosha board only. Donation records are kept for accounting and IRS reporting. We do not share your information with third parties except as required by law.",
      ],
    },
    {
      heading: "Your choices",
      paragraphs: [
        "Write to contact@varosha.org to see, correct, or delete the information we hold about you, or to stop receiving the newsletter.",
      ],
    },
  ],
  draftNote: "Privacy Policy.",
};

export const accessibility: LegalPage = {
  title: "Accessibility Statement",
  sections: [
    {
      paragraphs: [
        "Varosha is committed to ensuring that our website is accessible to people with disabilities. We aim to provide an inclusive and user-friendly online experience for all visitors. We are constantly working to enhance the accessibility of our website and to comply with the Web Content Accessibility Guidelines (WCAG) 2.1 at level AA.",
      ],
    },
    {
      heading: "What web accessibility is",
      paragraphs: [
        "An accessible website ensures that visitors with disabilities can navigate, understand, and interact with the site effectively. It involves providing equal access to information and functionality, regardless of any impairments or disabilities.",
      ],
    },
    {
      heading: "Accessibility adjustments on this site",
      bullets: [
        "Accessible design principles and testing tools",
        "Proper structuring and labeling of content",
        "Text alternatives for non-text content",
        "Optimized color contrast and visual presentation",
        "Minimal use of content that may cause seizures or physical reactions",
        "Multimedia content that is perceivable and operable",
      ],
    },
    {
      heading: "Third-party content",
      paragraphs: [
        "Certain pages link to third-party content, such as our Google Form for scholarship applications and PDF newsletters, which may not fully meet these guidelines. Varosha acknowledges the need for ongoing efforts to address these challenges.",
      ],
    },
    {
      heading: "Accessibility in the organization",
      paragraphs: [
        "Varosha is dedicated to ensuring accessibility in all aspects of our organization, including events and programs. We strive to create an inclusive environment for all individuals.",
      ],
    },
    {
      heading: "Requests, issues, and suggestions",
      paragraphs: [
        "If you encounter any accessibility barriers on our site or have any related inquiries, please reach out to contact@varosha.org or call 847-920-8153.",
      ],
    },
  ],
  draftNote: "Accessibility Statement.",
};
