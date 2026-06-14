export const curriculumData = [
  {
    id: "phase1",
    title: "Phase 1: Foundations",
    description: "Python and Math refresh for 12 YoE SWEs.",
    skills: [
      {
        id: "p1_s1",
        name: "Python for Data Science",
        description: "NumPy, Pandas, Matplotlib.",
        timeRequired: 1, // weight
        importantForInterview: true,
        resources: [
          { name: "NumPy Crash Course", url: "https://www.youtube.com/watch?v=QUT1VHiLmmI" },
          { name: "Pandas Data Analysis", url: "https://www.youtube.com/watch?v=vmEHCJofslg" }
        ]
      },
      {
        id: "p1_s2",
        name: "Linear Algebra Fundamentals",
        description: "Vectors, Matrices, Eigenvalues.",
        timeRequired: 1,
        importantForInterview: false,
        resources: [
          { name: "Essence of Linear Algebra", url: "https://www.youtube.com/watch?v=fNk_zzaMoSs&list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" }
        ]
      },
      {
        id: "p1_s3",
        name: "Probability & Statistics",
        description: "Distributions, Bayes Theorem, Hypothesis Testing.",
        timeRequired: 1,
        importantForInterview: true,
        resources: [
          { name: "Statistics for Data Science", url: "https://www.youtube.com/watch?v=Vfo5le26IhY" }
        ]
      }
    ]
  },
  {
    id: "phase2",
    title: "Phase 2: Classic Machine Learning",
    description: "Core algorithms and Scikit-Learn.",
    skills: [
      {
        id: "p2_s1",
        name: "Regression & Classification",
        description: "Linear/Logistic Regression, SVMs.",
        timeRequired: 1,
        importantForInterview: true,
        resources: [
          { name: "StatQuest: Logistic Regression", url: "https://www.youtube.com/watch?v=yIYKR4sgzI8" }
        ]
      },
      {
        id: "p2_s2",
        name: "Tree-Based Models",
        description: "Decision Trees, Random Forest, XGBoost.",
        timeRequired: 1,
        importantForInterview: true,
        resources: [
          { name: "StatQuest: Random Forests", url: "https://www.youtube.com/watch?v=J4Wdy0Wc_xQ" }
        ]
      },
      {
        id: "p2_s3",
        name: "Unsupervised Learning",
        description: "K-Means, PCA.",
        timeRequired: 1,
        importantForInterview: false,
        resources: [
          { name: "StatQuest: PCA", url: "https://www.youtube.com/watch?v=FgakZw6K1QQ" }
        ]
      }
    ]
  },
  {
    id: "phase3",
    title: "Phase 3: Deep Learning Fundamentals",
    description: "Neural Networks and PyTorch.",
    skills: [
      {
        id: "p3_s1",
        name: "Neural Networks Basics",
        description: "Backpropagation, Activation Functions.",
        timeRequired: 2,
        importantForInterview: true,
        resources: [
          { name: "But what is a Neural Network?", url: "https://www.youtube.com/watch?v=aircAruvnKk" }
        ]
      },
      {
        id: "p3_s2",
        name: "PyTorch Framework",
        description: "Tensors, Autograd, Datasets, Dataloaders.",
        timeRequired: 2,
        importantForInterview: true,
        resources: [
          { name: "PyTorch in 100 Seconds", url: "https://www.youtube.com/watch?v=ORMx45xqWkA" }
        ]
      },
      {
        id: "p3_s3",
        name: "Computer Vision (CNNs)",
        description: "ResNet, Convolutions, Image Classification.",
        timeRequired: 2,
        importantForInterview: false,
        resources: [
          { name: "CNN Explainer", url: "https://www.youtube.com/watch?v=YRhxdVk_sIs" }
        ]
      }
    ]
  },
  {
    id: "phase4",
    title: "Phase 4: NLP & LLMs",
    description: "Transformers, HuggingFace, RAG.",
    skills: [
      {
        id: "p4_s1",
        name: "Attention & Transformers",
        description: "Self-Attention, Transformer Architecture.",
        timeRequired: 2,
        importantForInterview: true,
        resources: [
          { name: "Attention Is All You Need Explained", url: "https://www.youtube.com/watch?v=iDulhoQ2pro" }
        ]
      },
      {
        id: "p4_s2",
        name: "HuggingFace Ecosystem",
        description: "Transformers library, Datasets, Accelerate.",
        timeRequired: 1,
        importantForInterview: true,
        resources: [
          { name: "HuggingFace Crash Course", url: "https://www.youtube.com/watch?v=QEaBAZQCtwE" }
        ]
      },
      {
        id: "p4_s3",
        name: "Retrieval-Augmented Generation (RAG)",
        description: "Vector DBs, LangChain/LlamaIndex, Semantic Search.",
        timeRequired: 2,
        importantForInterview: true,
        resources: [
          { name: "RAG from Scratch", url: "https://www.youtube.com/watch?v=wd7TZ4w1mSw" }
        ]
      },
      {
        id: "p4_s4",
        name: "Fine-Tuning LLMs",
        description: "LoRA, QLoRA, PEFT.",
        timeRequired: 2,
        importantForInterview: false,
        resources: [
          { name: "Fine-tuning Large Language Models", url: "https://www.youtube.com/watch?v=eC6Hd1hFvos" }
        ]
      }
    ]
  },
  {
    id: "phase5",
    title: "Phase 5: MLOps & Production",
    description: "Deploying and managing ML systems.",
    skills: [
      {
        id: "p5_s1",
        name: "Model Deployment & APIs",
        description: "FastAPI, Flask, Dockerizing models.",
        timeRequired: 1,
        importantForInterview: true,
        resources: [
          { name: "Deploy ML Models with FastAPI", url: "https://www.youtube.com/watch?v=h5wLuVDr0oc" }
        ]
      },
      {
        id: "p5_s2",
        name: "Experiment Tracking",
        description: "MLflow, Weights & Biases.",
        timeRequired: 1,
        importantForInterview: false,
        resources: [
          { name: "MLflow Tutorial", url: "https://www.youtube.com/watch?v=3-7zGvE8Yw0" }
        ]
      },
      {
        id: "p5_s3",
        name: "Orchestration & Serving",
        description: "Kubernetes, Ray Serve, Triton.",
        timeRequired: 2,
        importantForInterview: false,
        resources: [
          { name: "Kubernetes in 100 Seconds", url: "https://www.youtube.com/watch?v=VnvRFRk_51k" }
        ]
      }
    ]
  }
];

// Calculate filtered curriculum based on mode
export const getCurriculum = (mode) => {
  if (mode === "comprehensive") {
    return curriculumData;
  }
  
  // For interview modes (1m, 3m, 6m), we might filter out non-essential parts
  // if time is really tight (e.g. 1m). Let's keep it simple: interview focus drops "importantForInterview: false" if 1 month
  
  return curriculumData.map(phase => ({
    ...phase,
    skills: phase.skills.filter(skill => {
      if (mode === "1m") return skill.importantForInterview;
      return true; // 3m and 6m give enough time, but user might still want to skip some in UI. 
      // Actually, let's strictly adhere to the user's distinction:
      // "comprehensive": show everything
      // "interview": show only importantForInterview
    })
  })).filter(phase => phase.skills.length > 0);
};
