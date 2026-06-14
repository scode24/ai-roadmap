export const curriculumData = {
  meta: {
    title: "AI Interview Roadmap",
    lastUpdated: "2026-06-14",
    description: "Refined skillsets to crack ML/AI interviews. Each skill carries a 'selectedFor' field indicating which tracks include it. End-to-end includes all skills.",
    interviewTimelines: [
      {
        id: "1-month",
        label: "1 Month",
        sublabel: "Core Interview Focus",
        description: "Fast-track prep covering the highest-impact skills that appear in 80% of ML interviews. Focuses on Python, Statistics, core ML algorithms, Neural Network basics, and model deployment. Skip deep-dives — prioritize concept clarity and 1–2 hands-on projects."
      },
      {
        id: "3-month",
        label: "3 Months",
        sublabel: "Solid ML Foundation",
        description: "Covers classical ML, deep learning with PyTorch, and NLP with Transformers and HuggingFace. Good for mid-level ML engineer or data scientist roles. Includes experiment tracking and deployment alongside 2–3 portfolio projects."
      },
      {
        id: "6-month",
        label: "6 Months",
        sublabel: "Production-Ready ML Engineer",
        description: "Complete ML engineer preparation including LLMs, RAG pipelines, fine-tuning (LoRA/QLoRA), CNNs, and production MLOps with Kubernetes and Ray Serve. Targets senior ML engineer and AI researcher roles. Aim for 3+ portfolio projects and open-source contributions."
      },
      {
        id: "end-to-end",
        label: "End-to-End",
        sublabel: "Full Stack ML Mastery",
        description: "No fixed timeline — full mastery of the ML stack at your own pace. Covers every skill across all 5 phases. Go beyond the listed resources: read papers, implement models from scratch, build production-grade systems, and develop deep expertise in LLMs and MLOps."
      }
    ]
  },

  phases: [
    {
      id: "phase1",
      title: "Phase 1: Python & Math Foundations",
      description: "Core programming and mathematical foundations needed for any ML role.",
      skills: [
        {
          id: "p1_s1",
          name: "Python for Data Science",
          description: "NumPy, Pandas, Matplotlib.",
          timeRequired: 1,
          importantForInterview: true,
          priority: "critical",
          selectedFor: ["1-month", "3-month", "6-month"],
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
          priority: "medium",
          selectedFor: ["3-month", "6-month"],
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
          priority: "critical",
          selectedFor: ["1-month", "3-month", "6-month"],
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
          priority: "critical",
          selectedFor: ["1-month", "3-month", "6-month"],
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
          priority: "critical",
          selectedFor: ["1-month", "3-month", "6-month"],
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
          priority: "medium",
          selectedFor: ["3-month", "6-month"],
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
          priority: "critical",
          selectedFor: ["1-month", "3-month", "6-month"],
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
          priority: "critical",
          selectedFor: ["3-month", "6-month"],
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
          priority: "medium",
          selectedFor: ["6-month"],
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
          priority: "critical",
          selectedFor: ["3-month", "6-month"],
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
          priority: "high",
          selectedFor: ["3-month", "6-month"],
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
          priority: "high",
          selectedFor: ["6-month"],
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
          priority: "high",
          selectedFor: ["6-month"],
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
          priority: "critical",
          selectedFor: ["1-month", "3-month", "6-month"],
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
          priority: "medium",
          selectedFor: ["3-month", "6-month"],
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
          priority: "medium",
          selectedFor: ["6-month"],
          resources: [
            { name: "Kubernetes in 100 Seconds", url: "https://www.youtube.com/watch?v=VnvRFRk_51k" }
          ]
        }
      ]
    }
  ],
};

// Calculate filtered curriculum based on mode
export const getCurriculum = (mode) => {
  if (mode === "end-to-end") {
    return curriculumData.phases;
  }
  
  return curriculumData.phases.map(phase => ({
    ...phase,
    skills: phase.skills.filter(skill => {
      if (skill.selectedFor) {
        return skill.selectedFor.includes(mode);
      }
      return true;
    })
  })).filter(phase => phase.skills.length > 0);
};
