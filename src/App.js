// A complete React Quiz App (mobile friendly) without TailwindCSS
// Uses basic CSS and React Hooks

import React, { useState, useEffect,useRef } from "react";
import "./App.css";
import { db } from "./firebase";
import { ref, onValue, runTransaction } from "firebase/database";
const rawQuestions = [
  {
    "question": "A leader can be anyone who serves as an effective ___.",
    "options": ["patriarch", "narcissist", "social change agent", "politician", "manipulator"],
    "answer": "social change agent"
  },
  {
    "question": "___ is the central concept in the case of leadership.",
    "options": ["Authority", "Influence", "Coercion", "Knowledge", "Relationship"],
    "answer": "Influence"
  },
  {
    "question": "Which of the following is the 21st century slogan for leadership that is replacing earlier emphasis on instructional leadership?",
    "options": ["'Leadership for learning'", "'Leadership for power'", "'Leadership for control'", "'Leadership for educational institutes'", "'Leadership for society'"],
    "answer": "'Leadership for learning'"
  },
  {
    "question": "The current focus of educational leadership is to produce ___ who can construct effective solutions for critical social problems.",
    "options": ["politicians", "transactional leaders", "transformational leaders", "negotiable leaders", "kings"],
    "answer": "transformational leaders"
  },
  {
    "question": "21st century leaders need to have ___ in addition to new knowledge and skills.",
    "options": ["low maturity", "high emotional wisdom", "low spiritual wisdom", "high emotional immaturity", "low adjustability"],
    "answer": "high emotional wisdom"
  },
  {
    "question": "Authentic learning is about ___",
    "options": ["developing the capability to give one's unique contribution to others", "only taking new knowledge & skills for oneself", "exclusively focusing on personal growth", "learning from trustable sources", "None of the above"],
    "answer": "developing the capability to give one's unique contribution to others"
  },
  {
    "question": "Which of the following is not linked with leadership?",
    "options": ["Influence", "Values", "Ethics", "Vision", "Oppression"],
    "answer": "Oppression"
  },
  {
    "question": "One of the goals of present day educational leadership is to build a ___ as a ___.",
    "options": ["toxic culture, treatment for the organization", "pessimist culture, way of life", "learning culture, method of forcing employees", "learning culture, way of life", "college, way of life"],
    "answer": "learning culture, way of life"
  },
  {
    "question": "An issue of educational leadership is providing a ___ driven vision.",
    "options": ["power", "politics", "value", "control", "authority"],
    "answer": "value"
  },
  {
    "question": "In the PRES model of authentic leadership, S stands for ___.",
    "options": ["self-expression", "self-control", "self-love", "self-knowledge", "stability"],
    "answer": "self-knowledge"
  },
  {
    "question": "Capable Educational leaders need to possess",
    "options": ["Good listening skills", "Emotional intelligence", "Ability to generate positive changes", "Ability for critical reflection & future vision", "All the above"],
    "answer": "All the above"
  },
  {
    "question": "Positional authority is independent of Leadership but not related to",
    "options": ["Influencing people", "Judging others", "Intention to achieve", "Values, ethics & vision", "Policy making"],
    "answer": "Judging others"
  },
  {
    "question": "Professional Education is concerned with the following main aspects of development except ___.",
    "options": ["professional knowledge base", "ability to exert control", "competence in professional action", "development of reflection"],
    "answer": "ability to exert control"
  },
  {
    "question": "CPD stands for ___",
    "options": ["Collaborative Professional Development", "Continuous Professional Development", "Continuous Pedagogical Development", "Critical Personal Development", "None of the above"],
    "answer": "Continuous Professional Development"
  },
  {
    "question": "Which of the following is not a characteristic of 21st century learners?",
    "options": ["Tech-savvy", "Creative", "Networkers", "Reliant on media", "Maladaptive"],
    "answer": "Maladaptive"
  },
  {
    "question": "Which of the following is a characteristic of 21st century educators?",
    "options": ["self-centric", "resistor", "adapting to ICT", "fixed on one curriculum or learning style", "self-absorbed"],
    "answer": "adapting to ICT"
  },
  {
    "question": "In learner-centric systems, active learning can be encouraged by using ___",
    "options": ["game-based learning", "mobile apps", "flipped classes", "None of the above", "All of the above"],
    "answer": "All of the above"
  },
  {
    "question": "Thinking about teaching & always improving it in innovative ways is called ___.",
    "options": ["Reflective practice", "Retractive practice", "Refractive practice", "Learning pedagogy", "None of the above"],
    "answer": "Reflective practice"
  },
  {
    "question": "Which of the following is not one of the steps in the 5-step model of problem solving?",
    "options": ["Hypothesizing", "Reasoning", "Putting up questions", "Testing", "Incubation"],
    "answer": "Incubation"
  },
  {
    "question": "Highest level of reflection leads to ___",
    "options": ["worthwhileness", "worthlessness", "worthiness", "reflective actualization", "none of the above"],
    "answer": "worthwhileness"
  },
  {
    "question": "Which of the following is not one of the perspectives given by Brookfield for reflective practice?",
    "options": ["practitioners", "colleagues", "society", "learners", "established theory"],
    "answer": "society"
  },
  {
    "question": "The ___ area of the Johari window refers to the area that you are unaware of and that can be reduced by asking others for more transparent feedback.",
    "options": ["open", "blind", "hidden", "unknown", "none of the above"],
    "answer": "blind"
  },
  {
    "question": "'Problem-based learning' focuses on",
    "options": ["Course completion & examination", "Students need to demonstrate curricular activities", "Teachers to teach less and learn more", "Students need to demonstrate domain-specific knowledge", "Certification of degrees by colleges", "Students learn through analyzing & solving a problem"],
    "answer": "Students learn through analyzing & solving a problem"
  },
  {
    "question": "The concept of Continuous Professional development comprehensively means",
    "options": ["Pedagogical skill development", "Professional action", "Updated curricula & technology", "Academic environment", "Enhancing effectiveness as a researcher & teacher", "Qualifying for Teaching license"],
    "answer": "Enhancing effectiveness as a researcher & teacher"
  },
  {
    "question": "___ in education are valuable code of conducts exhibited & enforced by teachers in relation to the students, colleges, community and to oneself for positive educational consequences.",
    "options": ["Professional ethics", "Formal rules", "Violations", "Professional relations", "Committee relations"],
    "answer": "Professional ethics"
  },
  {
    "question": "The principles that teachers' Code of Professional Practice is to be based on include",
    "options": ["accountability", "service to the public", "responsiveness to the Government & the needs of the public", "fairness and integrity", "all of the above"],
    "answer": "all of the above"
  },
  {
    "question": "___ of educational institutes leading towards consequences like commercialization of degrees, low quality teaching and no job security is one of the current ethical challenges in the teaching profession.",
    "options": ["Personalization", "Industrialization", "Privatization", "Institutionalization", "None of the above"],
    "answer": "Privatization"
  },
  {
    "question": "Which of the following are current ethical issues and challenges in the teaching profession?",
    "options": ["Political interference", "Corruption", "Communication and cultural barriers", "Only b and c", "a, b and c"],
    "answer": "a, b and c"
  },
  {
    "question": "Each teacher has an obligation to ___.",
    "options": ["disrespect the opinion that goes against their own", "not care about students", "encourage harassment at workplace", "demonstrate high standards of professional practice", "stay away from parents and guardians"],
    "answer": "demonstrate high standards of professional practice"
  },
  {
    "question": "The code of professional practice should be ___.",
    "options": ["discriminatory", "updated time to time", "kept the same forever", "optional for a teacher to follow or not", "none of the above"],
    "answer": "updated time to time"
  },
  {
    "question": "Teachers serve the public interest by the following, except",
    "options": ["favoring certain students over others", "being committed to students' learning", "working in partnership with parents", "exercising reasonable care", "Collaborating with all stakeholders"],
    "answer": "favoring certain students over others"
  },
  {
    "question": "Teachers should",
    "options": ["ignore specific needs of pupils", "motivate and inspire pupils", "work only in isolation", "not include parents in the process", "decide which pupils they like and which they don't"],
    "answer": "motivate and inspire pupils"
  },
  {
    "question": "The process of ethical teaching should begin from pre-service studentship & ___",
    "options": ["stop there", "continue for a year", "continue till the teacher gets tired", "continue throughout professional life", "stop when the head asks"],
    "answer": "continue throughout professional life"
  },
  {
    "question": "At the time of ethical dilemma an inspirational leader should do",
    "options": ["Clarify the facts & check the data", "Take strategic decision & act upon carefully", "Imagine several options for solutions", "Evaluate options using different approaches", "All the above"],
    "answer": "All the above"
  },
  {
    "question": "The educational leaders also must incorporate ___ as part of their thinking & reasoning as ethics is at the core of a given human enterprise.",
    "options": ["cooperate & collaborate with other agencies", "conditionally work with others", "ethical analysis", "engaging themselves in recreational activities", "none of the above"],
    "answer": "ethical analysis"
  },
  {
    "question": "According to the ability model, emotional intelligence consists of 4 abilities given below, except",
    "options": ["Perceiving emotions", "Using emotions", "Ignoring emotions", "Understanding emotions", "Managing emotions"],
    "answer": "Ignoring emotions"
  },
  {
    "question": "Who among the following gave the mixed model of intelligence and focused on the importance of emotional intelligence as compared to IQ?",
    "options": ["Goleman", "Maslow", "Salovey and Mayer", "Watson", "Freud"],
    "answer": "Goleman"
  },
  {
    "question": "Which leadership style gives the message: 'try this'",
    "options": ["Coercive", "Authoritative", "Democratic", "Affiliative", "Coaching"],
    "answer": "Coaching"
  },
  {
    "question": "Which of the following is not a trait of transformational leaders?",
    "options": ["Idealized influence", "Inspirational motivation", "Coercive authority", "Individualized consideration", "Intellectual Stimulation"],
    "answer": "Coercive authority"
  },
  {
    "question": "___ is a social process by which emotions are shared collectively across a group in a social context.",
    "options": ["Social emotion", "Emotional labor", "Emotional regulation", "Emotional socialization", "Emotional contagion"],
    "answer": "Emotional contagion"
  },
  {
    "question": "___ includes modifying initial feelings by changing the situation or cognitions of the situation",
    "options": ["Response-focused regulation", "Social regulation", "Emotional labor", "Antecedent-focused regulation", "Social awareness"],
    "answer": "Antecedent-focused regulation"
  },
  {
    "question": "___ is when people change their outward emotional expressions without feeling the actual emotion they show.",
    "options": ["deep acting", "depth acting", "surface acting", "small acting", "none of the above"],
    "answer": "surface acting"
  },
  {
    "question": "Which of the following leadership styles can result in people get overwhelmed & burnt out",
    "options": ["Pace-setting", "Coaching", "Democratic", "Affiliative", "Authoritative"],
    "answer": "Pace-setting"
  },
  {
    "question": "___ is the public face of emotion in leadership.",
    "options": ["Emotional awareness", "Social regulation", "Sympathy", "Emotional labor", "None of the above"],
    "answer": "Emotional labor"
  },
  {
    "question": "Leaders high on empathy will prefer to use ___.",
    "options": ["surface acting", "sympathy", "anger", "deep acting", "coercion"],
    "answer": "deep acting"
  },
  {
    "question": "Emotional intelligence is a crucial component of ___.",
    "options": ["Analytical intelligence", "Divergent thinking", "Social intelligence", "Convergent thinking", "Creative interests"],
    "answer": "Social intelligence"
  },
  {
    "question": "Accurately labeling emotion is also called as ___.",
    "options": ["Emotional expertise", "Emotional awareness", "Emotional contagion", "Empathy", "Emotional literacy"],
    "answer": "Emotional literacy"
  },
  {
    "question": "___ is the type of diversity in the context of education which refers to the numerical & proportional representation of students from diverse groups in the student population",
    "options": ["Structural diversity", "Numerical diversity", "Proportionate diversity", "Interactional diversity", "Constructional diversity"],
    "answer": "Structural diversity"
  },
  {
    "question": "Each type of diversity is ___",
    "options": ["complementary to each other", "competitive in nature", "independent of each other", "detrimental to each other", "none of the above"],
    "answer": "complementary to each other"
  },
  {
    "question": "___ refers to an understanding that certain common values exist across diverse ethnic groups & group conflict often can be constructive if used appropriately",
    "options": ["Civic engagement", "Compatibility of differences", "Cultural engagement", "Learning outcomes", "Differential engagement"],
    "answer": "Compatibility of differences"
  },
  {
    "question": "Major transformations in knowledge sector due to globalization and IT revolution include ___",
    "options": ["virtual universities", "e-courses", "app based learning", "online packages", "all of the above"],
    "answer": "all of the above"
  },
  {
    "question": "In India, the Ministry of Human Resource Development has taken some initiatives like implementing NAB, where NAB stands for",
    "options": ["National Award Board", "National Award Bureau", "National Accreditation Bureau", "National Acceptance Board", "National Accreditation Board"],
    "answer": "National Accreditation Board"
  },
  {
    "question": "Due to escalating fees in developed nations, the students from these countries are choosing to study & take their degrees from ___",
    "options": ["reputed institutes of developing Asian countries", "online courses", "both a & b", "none of the above"],
    "answer": "both a & b"
  },
  {
    "question": "Which of the following has been observed to be true for new generation learners?",
    "options": ["expect a pass for anything they submit, irrespective of its quality", "not as self-reliant as the previous generations", "use the peer group reference for making any academic decision like where to enroll & which subject to take", "only c", "a, b and c"],
    "answer": "a, b and c"
  },
  {
    "question": "The higher education sector of which countries is larger than that of India?",
    "options": ["China and the U.S.A.", "Japan and China", "China and Singapore", "USA and Bangladesh", "Canada and Singapore"],
    "answer": "China and the U.S.A."
  },
  {
    "question": "Taiwan being the major designer of IT hardware is also considering the making of ___ by merging some of its top technological universities",
    "options": ["'Asian MIT'", "'Asian Oxford'", "'Asian Harvard'", "'Asian Cambridge'", "None of the above"],
    "answer": "'Asian MIT'"
  },
  {
    "question": "The three major areas to be considered in the pedagogical approach of enhancing students' understanding of international contexts, competition & the meaning of globalization include the following except",
    "options": ["linguistics", "money", "curriculum", "leadership"],
    "answer": "money"
  },
  {
    "question": "___ refers to constantly questioning, examining the evidence, arguments, methods & reliability of findings",
    "options": ["Criticism", "Skepticism", "Accountability", "Conviction", "Paradigm"],
    "answer": "Skepticism"
  },
  {
    "question": "The ___ purpose of educational research concerns gaining familiarity with a relatively new topic and discovering its various dimensions",
    "options": ["exploratory", "descriptive", "explanatory", "evaluation", "none of the above"],
    "answer": "exploratory"
  },
  {
    "question": "___ is a measure of association that tests whether a relationship exists between two variables",
    "options": ["Experiment", "Survey", "Interview", "Causation", "Correlation"],
    "answer": "Correlation"
  },
  {
    "question": "___ is any systematic enquiry conducted by teacher researchers, principals, counsellors or any stakeholders in the teaching-learning environment to gather information about how their institutions operate, how they teach and how well their students learn",
    "options": ["Action research", "Correlation", "Reaction research", "Experimentation", "Focus research"],
    "answer": "Action research"
  },
  {
    "question": "Doctoral research is affected by ___",
    "options": ["Massification of higher education", "Politics", "Funding sources", "Employer demands", "All of the above"],
    "answer": "All of the above"
  },
  {
    "question": "___ pedagogy endorses students' ability to think critically about their education situation which allows them to recognize connections between their individual problems and experiences & the social contexts in which they are embedded",
    "options": ["Criticism", "Critical", "Crucial", "None of the above"],
    "answer": "Critical"
  },
  {
    "question": "The deep learning skill of citizenship includes the following, except ___",
    "options": ["global knowledge", "cultural sensitivity", "perseverance", "environmental sustainability"],
    "answer": "perseverance"
  },
  {
    "question": "Which of the following is not a principle of new pedagogies?",
    "options": ["Partnership & Transparency in Projects' Operating Model", "Continuous Learning & Research", "Mobilization Model to be usable & expandable", "An independent project done in isolation"],
    "answer": "An independent project done in isolation"
  },
  {
    "question": "Which of the following is not a deep learning skill?",
    "options": ["Collaboration", "Creativity and imagination", "Critical thinking", "Communication", "Rigidity"],
    "answer": "Rigidity"
  },
  {
    "question": "New pedagogies require students to create new knowledge & connect it to the world by using the power of ___",
    "options": ["money", "energy", "digital tools", "books", "libraries"],
    "answer": "digital tools"
  },
  {
    "question": "The new paradigms of education advocate for ___",
    "options": ["'No child left behind'", "Personalized learning assistance", "Quality education to all", "All of the above"],
    "answer": "All of the above"
  },
  {
    "question": "Which of the following is true for metacognition?",
    "options": ["It occurs before the cognitive event", "It occurs after the cognitive event", "It occurs simultaneously with the cognitive event", "It can occur before the event, after the event or simultaneously", "none of the above"],
    "answer": "It can occur before the event, after the event or simultaneously"
  },
  {
    "question": "___ knowledge is knowing about when & why declarative & procedural knowledge are relevant to tasks (effective strategies)",
    "options": ["Conceptual", "Contextual", "Conditional", "Causational", "Creative"],
    "answer": "Conditional"
  },
  {
    "question": "___ is the fit between meta-cognition & performance",
    "options": ["Calibration", "Meta-cognitive monitoring", "Meta-cognitive control", "Self-regulated learning", "Correlation"],
    "answer": "Calibration"
  },
  {
    "question": "Which of the following is not a dimension of the learning environment focused on by cognitive apprenticeship?",
    "options": ["Content", "Method", "Sequence", "Sociology", "Communication"],
    "answer": "Communication"
  },
  {
    "question": "Which of the following is an experiential learning method?",
    "options": ["Role-play", "Visualization", "Simulation", "All of the above"],
    "answer": "All of the above"
  },
  {
    "question": "___ learning includes presentation of lessons through multimedia material i.e. text, animation, graphics, video & sound",
    "options": ["Problem-based", "Web-based", "Information-based", "Collaborative", "None of the above"],
    "answer": "Web-based"
  },
  {
    "question": "Games are based on the theory of ___ as they use fantasy, control, challenge, curiosity & adventure to motivate players.",
    "options": ["fantasy", "extrinsic motivation", "intrinsic motivation", "imagination", "none of the above"],
    "answer": "intrinsic motivation"
  },
  {
    "question": "Which of the following is an innovative pedagogy of learning?",
    "options": ["Game-based learning", "Mobile learning", "Puzzle-based learning", "Project – based Learning", "All of the above"],
    "answer": "All of the above"
  },
  {
    "question": "In ___ model of blended learning, most learning is done in the online environment; face-to-face teaching is still available, but for small groups / individuals on a requirement basis.",
    "options": ["online lab", "rotation", "flex", "self-blend", "online driver"],
    "answer": "flex"
  },
  {
    "question": "Turnaround Leadership brings together a distinct profile of ___ & cognitive ability",
    "options": ["emotional intelligence", "musical intelligence", "spatial intelligence", "naturalistic intelligence", "none of the above"],
    "answer": "emotional intelligence"
  },
  {
    "question": "Which of the following is a role taken up by turnaround leaders?",
    "options": ["Learn", "Teach", "Model", "All of the above"],
    "answer": "All of the above"
  },
  {
    "question": "___ means possessing requisite capacity & knowledge required for management, possessing the key skills & knowledge required to deliver the tasks that make up the specific job",
    "options": ["Competence", "Interest", "Cognitive capacity", "Creative intelligence", "None of the above"],
    "answer": "Competence"
  },
  {
    "question": "Which of the following is not a dimension of the 'Turnaround Academic Leadership Capability Framework'?",
    "options": ["Personal capabilities", "Interpersonal capabilities", "Cognitive capabilities", "Role-specific competencies", "Athletic competencies"],
    "answer": "Athletic competencies"
  },
  {
    "question": "ICT for supporting learning on-line courses for distance – learning through",
    "options": ["multimedia resources", "e-conferencing & video conferences", "discussion forums", "live lectures (Video streaming)", "all of the above"],
    "answer": "all of the above"
  },
  {
    "question": "Turnaround leaders can manage relationships with stakeholders through ___",
    "options": ["Building a sustainable learning community", "Monitoring & self-evaluation", "Networking with other agencies", "Performance evaluation & management", "All of the above"],
    "answer": "All of the above"
  },
  {
    "question": "___ is the term for using a combination of competition & cooperation for bringing change within the system",
    "options": ["Compete-eration", "Co-opetitions", "Collaborative competition", "Combinative cooperation", "None of the above"],
    "answer": "Co-opetitions"
  },
  {
    "question": "Which of the following is not an attitude under the 'Entrepreneurship Competencies Model'?",
    "options": ["Self-efficacy", "Proactiveness", "Procrastination", "Innovativeness", "Perseverance"],
    "answer": "Procrastination"
  },
  {
    "question": "___ is a factor in the 'Academic Entrepreneurship-cum-Performance' model",
    "options": ["Academic mindset", "Academic perseverance", "Academic behaviors", "Social skills", "All of the above"],
    "answer": "All of the above"
  },
  {
    "question": "By taking the role of a ___, educational entrepreneurs demonstrate what is possible when resources are used differently & point the way toward how policy & practice might be changed in the light of what they accomplish",
    "options": ["change agent", "content agent", "context agent", "private agent", "none of the above"],
    "answer": "change agent"
  },

  {
    "question": "National Education Policy 2020 focuses on transforming India into a",
    "options": ["knowledge superpower", "economic superpower", "military superpower", "industrial superpower"],
    "answer": "knowledge superpower"
  },
  
  {
    "question": "NEP 2020 aims to increase the Gross Enrolment Ratio in higher education to ___ by 2035",
    "options": ["40%", "45%", "50%", "55%"],
    "answer": "50%"
  },
  {
    "question": "The new 5+3+3+4 curricular structure in NEP 2020 is based on",
    "options": ["age-appropriate learning", "subject complexity", "teacher availability", "infrastructure"],
    "answer": "age-appropriate learning"
  },
  {
    "question": "NEP 2020 recommends that the medium of instruction until at least Grade 5 should preferably be",
    "options": ["English", "Hindi", "home language/mother tongue/local language", "Sanskrit"],
    "answer": "home language/mother tongue/local language"
  },
  {
    "question": "According to NEP 2020, vocational education should be integrated into mainstream education starting from",
    "options": ["Class 6", "Class 8", "Class 10", "Class 12"],
    "answer": "Class 6"
  },
  
  {
    "question": "NEP 2020 emphasizes multidisciplinary education and proposes",
    "options": ["single major system", "multiple entry and exit points", "fixed duration courses only", "only online education"],
    "answer": "multiple entry and exit points"
  },
  {
    "question": "Higher Education Commission of India (HECI) will be set up as a single overarching umbrella body for higher education except",
    "options": ["medical education", "legal education", "both medical and legal education", "technical education"],
    "answer": "both medical and legal education"
  },
  {
    "question": "National Research Foundation (NRF) will be established to fund, coordinate and promote",
    "options": ["teaching activities", "research and innovation", "infrastructure development", "student scholarships"],
    "answer": "research and innovation"
  },
  {
    "question": "Sustainable Development Goal 4 is about",
    "options": ["Quality Education", "Gender Equality", "Clean Water", "Climate Action"],
    "answer": "Quality Education"
  },
  {
    "question": "UNESCO stands for",
    "options": ["United Nations Educational, Scientific and Cultural Organization", "United Nations Economic and Social Council Organization", "Universal Network for Education and Science", "United Nations Environment and Sustainability Organization"],
    "answer": "United Nations Educational, Scientific and Cultural Organization"
  },
  
  
  {
    "question": "The target year for achieving all Sustainable Development Goals is",
    "options": ["2025", "2030", "2035", "2040"],
    "answer": "2030"
  },
  
  {
    "question": "Education for Sustainable Development (ESD) aims to develop competencies that empower individuals to",
    "options": ["earn more money", "reflect on their own actions", "compete globally", "use technology"],
    "answer": "reflect on their own actions"
  },
  {
    "question": "Global Citizenship Education (GCED) nurtures respect for all and a sense of",
    "options": ["national pride", "belonging to a common humanity", "cultural superiority", "economic competition"],
    "answer": "belonging to a common humanity"
  },
  
  {
    "question": "Inclusive education means ensuring access to quality education for all, including",
    "options": ["only gifted students", "only economically disadvantaged", "all learners regardless of their diverse backgrounds and abilities", "only urban students"],
    "answer": "all learners regardless of their diverse backgrounds and abilities"
  }
    

  
];
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}
function App() {
  // -------------------
  // State Declarations
  // -------------------
  const [startTime, setStartTime] = useState(null);
  const [pastScores, setPastScores] = useState(() => JSON.parse(localStorage.getItem("quizScores")) || []);
  const [endTime, setEndTime] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizMode, setQuizMode] = useState("welcome");
  const [questionsCount, setQuestionsCount] = useState(20);
  const [showHint, setShowHint] = useState(false);
  const [visits, setVisits] = useState(null);
  const [isFirebaseLoaded, setIsFirebaseLoaded] = useState(true);
  const hasIncremented = useRef(false);
  const incrementCompleted = useRef(false);

  // -------------------
  // Timer State
  // -------------------
  const [timeLeft, setTimeLeft] = useState(null);

  // -------------------
  // Effects
  // -------------------
  // Load scores
  useEffect(() => {
    const savedScores = localStorage.getItem("quizScores");
    if (savedScores) {
      setPastScores(JSON.parse(savedScores));
    }
  }, []);

  // Page visits: subscribe and increment once on mount
  useEffect(() => {
    const visitsRef = ref(db, "EducationalVisits/total");
    let unsubscribe;
    let timeoutId;
    
    const initializeFirebase = async () => {
      try {
        console.log("Starting Firebase initialization...");
        
        // Set a timeout fallback in case Firebase is slow
        timeoutId = setTimeout(() => {
          console.warn("Firebase taking too long, showing app anyway");
          setIsFirebaseLoaded(true);
        }, 8000); // 8 second timeout
        
        // Start listening first
        unsubscribe = onValue(visitsRef, (snapshot) => {
          console.log("Firebase data received:", snapshot.val());
          const val = snapshot.val();
          
          // Only set visits and mark as loaded if increment is completed OR if we haven't incremented yet
          if (incrementCompleted.current || !hasIncremented.current) {
            setVisits(val == null ? 0 : val);
            
            // Clear timeout and mark as loaded
            if (timeoutId) {
              clearTimeout(timeoutId);
              timeoutId = null;
            }
            setIsFirebaseLoaded(true);
          } else {
            console.log("Ignoring initial value, waiting for increment to complete...");
          }
        }, (error) => {
          console.error("Firebase onValue error:", error);
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          setIsFirebaseLoaded(true);
        });
        
        // Check if we should increment based on local session (10 minutes)
        const shouldIncrement = () => {
          const lastVisit = localStorage.getItem('lastVisitTime');
          const now = Date.now();
          const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds
          
          if (!lastVisit) {
            console.log("First visit, will increment");
            return true;
          }
          
          const timeDiff = now - parseInt(lastVisit);
          if (timeDiff > tenMinutes) {
            console.log(`Last visit was ${Math.round(timeDiff / 1000 / 60)} minutes ago, will increment`);
            return true;
          }
          
          console.log(`Last visit was ${Math.round(timeDiff / 1000)} seconds ago, skipping increment`);
          return false;
        };
        
        // Only increment once, even in StrictMode, and only if session allows
        if (!hasIncremented.current && shouldIncrement()) {
          hasIncremented.current = true;
          console.log("Incrementing visit counter...");
          
          await runTransaction(visitsRef, (current) => {
            const newValue = (current || 0) + 1;
            console.log("Transaction: current =", current, "new =", newValue);
            return newValue;
          });
          
          // Store current timestamp for session tracking
          localStorage.setItem('lastVisitTime', Date.now().toString());
          incrementCompleted.current = true;
          console.log("Transaction completed, increment finished, session updated");
        } else {
          incrementCompleted.current = true; // Already incremented or within session time
          if (!shouldIncrement()) {
            console.log("Skipping increment due to recent visit (within 10 minutes)");
          }
        }
        
      } catch (error) {
        console.error("Firebase initialization error:", error);
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        setIsFirebaseLoaded(true);
      }
    };
    
    initializeFirebase();
    
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  // Timer effect
  useEffect(() => {
    if (quizMode === "quiz" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (quizMode === "quiz" && timeLeft === 0) {
      setShowResults(true);
      setEndTime(Date.now());
      setQuizMode("results");
    }
  }, [timeLeft, quizMode]);

  // -------------------
  // startQuiz Function
  // -------------------
  const startQuiz = (count = 20) => {
    const shuffledQuestions = shuffle([...rawQuestions]);
    setQuestions(shuffledQuestions.slice(0, count));
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResults(false);
    setStartTime(Date.now());
    setEndTime(null);
    setQuizMode("quiz");
    setTimeLeft(600); // Start with 10 minutes
    const secondsPerQuestion = 30; // 30 seconds per question (adjust this value)
  setTimeLeft(count * secondsPerQuestion);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    
    const correctAnswer = questions[currentQuestion].answer;
    const isAnswerCorrect = selectedOption === correctAnswer;
    
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      setUserAnswers([...userAnswers, selectedOption]);
      setSelectedOption(null);
      
      const next = currentQuestion + 1;
      if (next < questions.length) {
        setCurrentQuestion(next);
      } else {
        setShowResults(true);
        const end = Date.now();
        setEndTime(end);
        setQuizMode("results");
        
        const newEntry = {
          score: score + (isAnswerCorrect ? 1 : 0),
          total: questions.length,
          time: Math.round((end - startTime) / 1000),
          date: new Date().toLocaleString()
        };
        
        const updatedScores = [newEntry, ...pastScores];
        setPastScores(updatedScores);
        localStorage.setItem("quizScores", JSON.stringify(updatedScores));
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setQuizMode("welcome");
  };

  const score = userAnswers.reduce((acc, ans, index) => {
    return ans === questions[index].answer ? acc + 1 : acc;
  }, 0);

  const wrongAnswers = questions.filter((q, i) => userAnswers[i] !== q.answer);

  // Calculate progress percentage
  const progressPercentage = (currentQuestion / questions.length) * 100;
  
  const renderQuizSection = () => {
    if (quizMode === "welcome") {
      return (
        <div className="welcome-screen">
          <h2>Welcome to 	
Educational Leadership Quiz</h2>
          <p>Practice assessment questions on 	
Educational Leadership Quiz</p>
          
          <div className="quiz-options">
            <div className="question-count">
              <h3>How many questions?</h3>
              <div className="count-buttons">
                <button 
                  className={questionsCount === 10 ? "selected" : ""} 
                  onClick={() => setQuestionsCount(10)}
                >
                  10
                </button>
                <button 
                  className={questionsCount === 20 ? "selected" : ""} 
                  onClick={() => setQuestionsCount(20)}
                >
                  20
                </button>
                <button 
                  className={questionsCount === 50 ? "selected" : ""} 
                  onClick={() => setQuestionsCount(50)}
                >
                  50
                </button>
                <button 
                  className={questionsCount === rawQuestions.length ? "selected" : ""} 
                  onClick={() => setQuestionsCount(rawQuestions.length)}
                >
                  All ({rawQuestions.length})
                </button>
              </div>
            </div>
            
            <button className="start-button" onClick={() => startQuiz(questionsCount)}>
              Start Quiz
            </button>
          </div>
          
          {pastScores.length > 0 && (
            <div className="past-scores-preview">
              <h3>Previous Best: {Math.max(...pastScores.map(score => (score.score/score.total) * 100)).toFixed(0)}%</h3>
              <p>You've taken this quiz {pastScores.length} times</p>
            </div>
          )}
        </div>
      );
    }
    
    if (quizMode === "quiz") {
      return (
        <div className="quiz-box">
          <div className="quiz-header">
            <div className="progress-container">
              <div 
                className="progress-bar" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="question-counter">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>
          
          {questions[currentQuestion] && (
            <div className={`question-container ${showFeedback ? (isCorrect ? "correct-feedback" : "incorrect-feedback") : ""}`}>
              <h2 className="question-text">{questions[currentQuestion].question}</h2>
              
              <div className="options-container">
                {questions[currentQuestion].options.map((opt) => (
                  <button
                    key={opt}
                    className={`option-button ${selectedOption === opt ? "selected" : ""}`}
                    onClick={() => handleOptionSelect(opt)}
                    disabled={showFeedback}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              
              {showFeedback && (
                <div className="feedback">
                  {isCorrect ? (
                    <div className="correct">Correct!</div>
                  ) : (
                    <div className="incorrect">
                      
                      <h>{questions[currentQuestion].answer} </h>
                    </div>
                  )}
                </div>
              )}
              
              {!showFeedback && (
                <div className="control-buttons">
                  <button 
                    className="hint-button"
                    onClick={() => setShowHint(!showHint)}
                  >
                    {showHint ? "Hide Hint" : "Need a Hint?"}
                  </button>
                  
                  <button
                    className={`submit-button ${selectedOption ? "active" : ""}`}
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                  >
                    Submit Answer
                  </button>
                </div>
              )}
              
              {showHint && (
                <div className="hint-box">
                    <h>{questions[currentQuestion].answer} </h>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
    
    if (quizMode === "results") {
      const percentage = (score / questions.length) * 100;
      let feedback;
      
      if (percentage >= 90) {
        feedback = "Outstanding! You're an expert in Educational Leadership!";
      } else if (percentage >= 70) {
        feedback = "Great job! You have a solid understanding of the subject.";
      } else if (percentage >= 50) {
        feedback = "Good effort! Keep learning to improve your knowledge.";
      } else {
        feedback = "You might want to review the material again.";
      }
      
      return (
        <div className="result-box">
          <div className="score-display">
            <div className="score-circle">
              <div className="score-number">{score}</div>
              <div className="score-total">/ {questions.length}</div>
            </div>
            <h2 className="score-percentage">{percentage.toFixed(1)}%</h2>
          </div>
          
          <p className="score-feedback">{feedback}</p>
          
          {startTime && endTime && (
            <p className="time-taken">
              Time Taken: {(() => {
                const totalSeconds = Math.round((endTime - startTime) / 1000); 
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;
                return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
              })()}
            </p>
          )}
          
          {wrongAnswers.length > 0 && (
            <div className="wrong-answers">
              <h3>Questions to Review:</h3>
              <div className="wrong-answers-list">
                {wrongAnswers.map((q, i) => (
                  <div key={i} className="wrong-answer-item">
                    <div className="question">{q.question}</div>
                    <div className="answers">
                      <div className="user-answer">
                        Your Answer: <span className="incorrect">{userAnswers[questions.indexOf(q)]}</span>
                      </div>
                      <div className="correct-answer">
                        Correct Answer: <span className="correct">{q.answer}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="result-buttons">
            <button className="restart-button" onClick={restartQuiz}>
              Back to Menu
            </button>
            <button className="retry-button" onClick={() => startQuiz(questions.length)}>
              Try Again
            </button>
          </div>
          
          <div className="past-scores">
            <h3>Your History:</h3>
            <div className="scores-table">
              <div className="table-header">
                <div className="date-cell">Date</div>
                <div className="score-cell">Score</div>
                <div className="time-cell">Time</div>
              </div>
              {pastScores.slice(0, 5).map((entry, idx) => (
                <div key={idx} className="table-row">
                  <div className="date-cell">{entry.date}</div>
                  <div className="score-cell">{entry.score}/{entry.total} ({((entry.score/entry.total)*100).toFixed(0)}%)</div>
                  <div className="time-cell">{entry.time}s</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  };

  // Show loading screen until Firebase data is loaded
  if (!isFirebaseLoaded) {
    return (
      <div className="quiz-app-container">
        <div className="loading-screen">
          <h1>Educational Leadership Quiz</h1>
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Connecting ....</p>
            {/* <small>Getting visit count from Firebase</small> */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-app-container">
      <header>
        <h1> Educational Leadership Quizz</h1>
        
        <p>Note: if Answer is wrong <b>Correct Answer will be shown Bellow</b></p>
        <p><b>Hint </b> : Click on "Need a hint" button if you don't Know the Answer</p>
      </header>
      <main>
        {renderQuizSection()}
      </main>
      <footer>
        <p>Practice  Educational Leadership assignment Questions</p>
        <div className="disclaimer">
        {/* <p><em>Note: This quiz was generated using ChatGPT for educational and revision purposes. We are not responsible for any incorrect answers. Please verify with official sources when in doubt.</em></p> */}
      </div>

       <div className="visit-counter">Total visits: {visits === null ? "..." : visits}</div>
      
      </footer>
      
    </div>
    
  );
}

export default App;