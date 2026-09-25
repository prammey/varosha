/**
 * The eleven projects. Order here is the order on the Projects page.
 * `featured: true` puts a project on the home page (three are shown).
 * Images live in public/images/projects/.
 */
export type ProjectCategory = "skills" | "children" | "health" | "farm";

export const projectCategories: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "skills", label: "Skills training" },
  { id: "children", label: "Children and education" },
  { id: "health", label: "Health" },
  { id: "farm", label: "Farming and livelihoods" },
];

export const categoryLabel: Record<ProjectCategory, string> = {
  skills: "Skills training",
  children: "Children",
  health: "Health",
  farm: "Farming",
};

export type Project = {
  slug: string;
  title: string;
  where: string;
  category: ProjectCategory;
  stat: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "jewelry-making",
    title: "Women’s Jewelry Making Class",
    where: "Tangra Dhapa, Ulta Danga and Topsia, Kolkata",
    category: "skills",
    stat: "100+ trainees",
    image: "/images/projects/jewelry-making.jpg",
    imageAlt: "Women holding up the necklaces they made in class",
    featured: true,
    paragraphs: [
      "Over 100 trainees in three centers: Tangra Dhapa, Ulta Danga Canal-side and Topsia Canal-side were trained in jewelry making classes for women and girls.",
      "Training included quilling, German silver, sea shells, and bead making with silk and cotton thread.",
    ],
  },
  {
    slug: "breakfast-program",
    title: "Breakfast for 190 School Children",
    where: "Mallarpur and Kolkata centers",
    category: "children",
    stat: "190 children, every week",
    image: "/images/projects/breakfast-program.jpg",
    imageAlt: "Children eating breakfast together outdoors",
    paragraphs: [
      "School children in Mallarpur Center were provided with puffed rice, milk and sugar (4 days), bread, sweet and banana (1 day), and egg and bread (1 day) each week.",
      "Children in Kolkata Centers were given fruits (2 days), egg (2 days) and health drinks (1 day) per week.",
    ],
  },
  {
    slug: "mushroom-cultivation",
    title: "Mushroom Cultivation",
    where: "Birbhum, West Bengal",
    category: "farm",
    stat: "16 graduates, 6-month course",
    image: "/images/projects/mushroom-cultivation.jpg",
    imageAlt: "Trainees in a mushroom cultivation class",
    paragraphs: [
      "9 young men and 7 young women from Birbhum, West Bengal, who were unemployed have completed the mushroom cultivation and marketing training project funded by Varosha.",
      "The 6 month course trained them to grow mushrooms (including spawn preparation) and also how to prepare and market preserved mushroom products which are rapidly gaining popularity. The trainees were so happy with their training that they recommended the class and we supported a second session.",
    ],
  },
  {
    slug: "beautician-training",
    title: "Beautician Training",
    where: "Bolpur and two centers in Kolkata",
    category: "skills",
    stat: "52 young women",
    image: "/images/projects/beautician-training.jpg",
    imageAlt: "Hands decorated with henna designs",
    paragraphs: [
      "Classes were held in Bolpur, West Bengal, and two centers in Kolkata, with 52 young women taking the classes.",
      "The curriculum covers manicure, pedicure, waxing, eyebrows, make up, facial, hair styling and saree draping. Additionally, they receive further training at a local beauty parlor.",
    ],
  },
  {
    slug: "tailoring-program",
    title: "Tailoring Program",
    where: "Kolkata",
    category: "skills",
    stat: "Microloans for sewing machines",
    image: "/images/projects/tailoring-program.jpg",
    imageAlt: "Women displaying a long embroidered saree they made",
    paragraphs: [
      "Varosha continues to support the Business Center for women who have completed the tailoring program and provides microloans to the trainees to assist them to buy sewing machines and supplies to start their businesses.",
    ],
  },
  {
    slug: "chetla-skills-center",
    title: "Chetla Skills Center",
    where: "Chetla, Kolkata · with partner Hope",
    category: "skills",
    stat: "52 certified in 2019",
    image: "/images/projects/chetla-skills-center.jpg",
    imageAlt: "A graduate holding her certificate at the Chetla Skills Center",
    featured: true,
    paragraphs: [
      "From April 2017, with our partner Hope, we fully funded the operating expenses of the Skills Unit in Chetla. The project provides high quality vocational training in spoken English, computer skills, and financial accounting classes using Tally ERP-9.",
      "In 2019, 52 trainees from Hope Skill Unit received their certification and medals. Trophies were given to the 3 best performers in Basic Computer, English and Tally Financial course. Varosha is proud to financially support this center and help the students with job placement once they are trained.",
    ],
  },
  {
    slug: "farmers-aranyer-alo",
    title: "Support for Farmers (Aranyer Alo)",
    where: "Sonakhali and Khulna, Sunderbans · with partner HVR",
    category: "farm",
    stat: "Fallow land to fish farms",
    image: "/images/projects/farmers-aranyer-alo.jpg",
    imageAlt: "Villagers working a fish farm in the Sunderbans",
    paragraphs: [
      "This project is in the villages of Sonakhali and Khulna in the Sunderban, South 24 Pargana, West Bengal.",
      "Fallow land and marshes that were not suitable for proper farming were converted by local villagers for fish farming and selective agriculture thanks to our partnership with HVR. Several plots have been converted to fish farms. New plans and initiatives are in place to convert unused and unproductive lands to be productive. We have distributed seeds and small plants. The raising of small animals, chicken and goats, has been very financially successful for our beneficiaries.",
    ],
  },
  {
    slug: "after-school-tuition",
    title: "After-School Tuition Centers",
    where: "Chetla / New Alipore Basti, Kolkata",
    category: "children",
    stat: "Meals, tuition, English, dance and art",
    image: "/images/projects/after-school-tuition.jpg",
    imageAlt: "Children at an after-school tuition center",
    featured: true,
    paragraphs: [
      "One of our greatest joys is visiting the children’s after school program in Chetla/New Alipore Basti. Over the years Varosha has supported the children by providing a healthy meal and a safe space after school.",
      "We have provided tuition to help them in school as well as spoken English, dance and art classes. Several students appeared for and passed the West Bengal Board of Secondary Education’s Madhyamik Exam. Varosha’s after school tuition centers is their only academic support.",
    ],
  },
  {
    slug: "eye-health-camp",
    title: "Eye Health Camp",
    where: "Dipto Alo school, New Alipore · with Rotary Club of Calcutta",
    category: "health",
    stat: "53 checkups, 23 pairs of glasses",
    image: "/images/projects/eye-health-camp.jpg",
    imageAlt: "Organizers and volunteers at the eye health camp",
    paragraphs: [
      "Organized by Varosha with Rotary Club of Calcutta, Inner City and Pub Paschim on January 27, 2018, at Dipto Alo school in New Alipore, Kolkata. Free eye checkups were provided to 53 women and children. All the participants received snack packs.",
      "23 children were diagnosed as needing eyeglasses. The prescription glasses have been ordered and will be distributed soon. Two ladies need cataract surgery and scheduled follow up visits with the doctor. Varosha will be funding these expenses.",
    ],
  },
  {
    slug: "healthcare-assistant-training",
    title: "Health-care Assistant Training",
    where: "Kolkata",
    category: "health",
    stat: "3 months classroom + 3 months practical",
    image: "/images/projects/healthcare-assistant-training.jpg",
    imageAlt: "A class of healthcare assistant trainees",
    paragraphs: [
      "This project prepares and trains individuals from disadvantaged communities to deliver general healthcare support to newborns, the elderly, the sick and those recovering from surgeries. The training covers basic physiology, anatomy, hygiene, and general skills like measuring blood pressure and temperature, dressing, administering medications, and physiotherapy.",
      "Candidates have a minimum of 8th grade education to be accepted into the program. They go through a 3 month education program and then are sent to a nursing home for 3 months of practical training. Once trained they are quickly finding work.",
    ],
  },
  {
    slug: "fine-arts-jibon-alo",
    title: "Fine Arts Academy, Jibon Alo",
    where: "New Alipore, Kolkata",
    category: "children",
    stat: "Singing, dance, acting, painting",
    image: "/images/projects/fine-arts-jibon-alo.jpg",
    imageAlt: "Children of the Jibon Alo academy in costume",
    paragraphs: [
      "Jibon Alo is a Children Academy in New Alipore slum, Kolkata, West Bengal. This academy teaches performing arts like singing, dancing and acting, and creative arts like painting, drawing and craft-work to disadvantaged children in the area.",
      "We believe that exposure to these creative arts will help the children as they grow. It has been inspiring to see the children discover their hidden talents and compete with children from affluent communities in festivals and competitions and win awards and accolades.",
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
