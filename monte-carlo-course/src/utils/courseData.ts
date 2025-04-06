export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type Module = {
  id: string;
  title: string;
  duration: string;
  description: string;
  difficulty: DifficultyLevel;
  lessons: Lesson[];
};

export type Lesson = {
  id: string;
  title: string;
  duration: string;
  content: string;
  hasExercise: boolean;
  difficulty?: DifficultyLevel; // Optional override of module difficulty
};

// Difficulty path options
export type PathOption = 'all' | DifficultyLevel;

// Helper function to filter modules by difficulty
export const filterModulesByDifficulty = (modules: Module[], difficulty: PathOption): Module[] => {
  if (difficulty === 'all') return modules;
  return modules.filter(module => module.difficulty === difficulty);
};

// 1-day course structure with difficulty levels
export const courseModules: Module[] = [
  {
    id: 'module1',
    title: 'Introduction to Monte Carlo Methods',
    duration: '2 hours',
    description: 'Learn the fundamentals of Monte Carlo methods and their applications in data analytics.',
    difficulty: 'easy',
    lessons: [
      {
        id: 'lesson1-1',
        title: 'What are Monte Carlo Methods?',
        duration: '30 minutes',
        content: `# What are Monte Carlo Methods?

Monte Carlo methods are a broad class of computational algorithms that rely on repeated random sampling to obtain numerical results. The main idea behind Monte Carlo methods is to use randomness to solve problems that might be deterministic in principle.

## Key Concepts:

1. **Random Sampling**: Generate random inputs from a probability distribution
2. **Simulation**: Run a deterministic computation using these inputs
3. **Aggregation**: Combine the results to get the final answer

## Historical Context:

Named after the Monte Carlo Casino in Monaco, these methods were developed during the Manhattan Project in World War II by scientists working on nuclear weapon development. Stanislaw Ulam, John von Neumann, and Nicholas Metropolis are credited with formalizing the approach.

## Why Monte Carlo?

- Solve problems that are difficult or impossible to solve analytically
- Approximate complex mathematical integrals
- Model systems with many coupled degrees of freedom
- Useful when deterministic algorithms are too slow or impractical

## Educational Resources:

<div class="resource-card">
  <iframe src="https://www.youtube.com/embed/AyBNnkYrSWY?rel=0&showinfo=0" title="Introduction to Monte Carlo Methods" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <p class="resource-description">This video provides an excellent introduction to Monte Carlo methods and their applications.</p>
</div>

### Additional Resources:
- [Khan Academy: Random Sampling](https://www.khanacademy.org/math/statistics-probability/sampling-distributions-library)
- [Brilliant.org: Monte Carlo Methods](https://brilliant.org/wiki/monte-carlo/)
`,
        hasExercise: false
      },
      {
        id: 'lesson1-2',
        title: 'Basic Probability Review for Monte Carlo',
        duration: '30 minutes',
        content: `# Basic Probability Review for Monte Carlo

Understanding probability is essential for Monte Carlo methods. Here's a quick review of key concepts:

## Random Variables
- A random variable is a variable whose value is subject to variations due to chance
- Can be discrete (finite or countable) or continuous (uncountable)

## Probability Distributions
- Describes how probabilities are distributed over possible values
- **Discrete**: PMF (Probability Mass Function)
- **Continuous**: PDF (Probability Density Function)

## Expected Value
- The long-run average value of a random variable
- E(X) = ∑x·P(X=x) for discrete, E(X) = ∫x·f(x)dx for continuous

## Variance and Standard Deviation
- Measures of dispersion or spread
- Var(X) = E[(X-μ)²]
- Standard Deviation: σ = √Var(X)

## Law of Large Numbers
- As sample size increases, sample mean approaches the true mean
- Theoretical foundation of Monte Carlo methods

## Central Limit Theorem
- Distribution of sample means approximates a normal distribution
- Allows us to make confidence statements about Monte Carlo estimates

## Educational Resources:

<div class="resource-card">
  <iframe src="https://www.youtube.com/embed/OgO1gpXSUzU?rel=0&showinfo=0" title="Probability Concepts for Monte Carlo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <p class="resource-description">A comprehensive explanation of the probability concepts underlying Monte Carlo methods.</p>
</div>

### Interactive Resources:
- [Seeing Theory: Visual Introduction to Probability](https://seeing-theory.brown.edu/)
- [Stat Trek: Probability Tutorial](https://stattrek.com/probability/probability-tutorial.aspx)
`,
        hasExercise: true
      },
      {
        id: 'lesson1-3',
        title: 'Your First Monte Carlo Simulation',
        duration: '1 hour',
        content: `# Your First Monte Carlo Simulation

Let's create a simple Monte Carlo simulation to estimate the value of π (pi).

## The Problem:
Imagine a square with a side length of 2, centered at origin (0,0). Inside this square is a circle with radius 1.

The area of the square is 4 square units, and the area of the circle is π square units.

If we randomly generate points within the square, the proportion of points falling inside the circle will approximately equal π/4.

## The Algorithm:

1. Generate random (x,y) points in the square [-1,1] × [-1,1]
2. Check if each point falls inside the circle: x² + y² ≤ 1
3. Count the proportion of points inside the circle
4. Multiply by 4 to estimate π

## Visual Demonstration:

<div class="resource-card">
  <iframe src="https://www.youtube.com/embed/7ESK5SaP-bc?rel=0&showinfo=0" title="Estimating Pi with Monte Carlo methods" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <p class="resource-description">This video demonstrates how Monte Carlo methods can be used to estimate π through visualization.</p>
</div>

### Interactive Resources:
- [Interactive Monte Carlo Pi Estimation Tool](https://academo.org/demos/estimating-pi-monte-carlo/)
- [Visual Explanation by 3Blue1Brown](https://www.youtube.com/watch?v=OVbVP_-z9xw)

Try the interactive simulation to see how increasing the number of random points improves the estimate's accuracy!
`,
        hasExercise: true
      }
    ]
  },
  {
    id: 'module2',
    title: 'Applied Monte Carlo Techniques',
    duration: '3 hours',
    description: 'Explore practical applications of Monte Carlo methods in various domains.',
    difficulty: 'medium',
    lessons: [
      {
        id: 'lesson2-1',
        title: 'Monte Carlo Integration',
        duration: '45 minutes',
        content: `# Monte Carlo Integration & Area Estimation

Monte Carlo integration is one of the most powerful applications of Monte Carlo methods. It's particularly useful for high-dimensional integrals.

## The Basic Idea:

To estimate the integral ∫f(x)dx over domain D:

1. Generate random points uniformly in D
2. Evaluate f(x) at these points
3. The integral is approximately the average of f(x) times the volume of D

## Visual Demonstration:

<div class="resource-card">
  <iframe src="https://www.youtube.com/embed/86CQq3pKSUw?rel=0&showinfo=0" title="Monte Carlo Integration Explained" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <p class="resource-description">This video explains the concept of Monte Carlo integration with clear visuals and examples.</p>
</div>

### Interactive Resources:
- [Interactive Visualization of Monte Carlo Integration](https://demonstrations.wolfram.com/MonteCarloIntegration/)
- [Step-by-step tutorial by Towards Data Science](https://towardsdatascience.com/monte-carlo-integration-in-python-a71a209d277e)

These resources will help you understand the concept without needing to run code yourself.
`,
        hasExercise: true
      },
      {
        id: 'lesson2-2',
        title: 'Risk Analysis & Decision Making',
        duration: '40 minutes',
        content: `# Risk Analysis & Decision Making

Monte Carlo methods are powerful tools for risk analysis and decision-making in uncertain environments.

## Risk Assessment Process:

1. **Identify variables**: Determine inputs that have uncertainty
2. **Define distributions**: Characterize the uncertainty for each variable
3. **Simulate**: Run many scenarios with different input values
4. **Analyze results**: Look at distribution of outcomes, not just a single point estimate

## Visual Demonstration:

<div class="resource-card">
  <iframe src="https://www.youtube.com/embed/KHGWRKv7i4E?rel=0&showinfo=0" title="Understanding Risk Analysis in Finance" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <p class="resource-description">This video explains portfolio risk analysis using Monte Carlo simulations with clear visuals.</p>
</div>

### Interactive Resources:
- [Portfolio Risk Analysis Interactive Tool](https://www.portfoliovisualizer.com/monte-carlo-simulation)
- [Risk Management Course by NYU Stern](https://www.youtube.com/watch?v=4ZnWvA79Yd4)

### Key Concepts Explained:
- **Value at Risk (VaR)**: The maximum loss expected at a specific confidence level (e.g., 95%)
- **Conditional VaR (CVaR)**: The expected loss given that the loss exceeds the VaR
- **Diversification Benefits**: How correlations between assets affect overall portfolio risk
`,
        hasExercise: false
      },
      {
        id: 'lesson2-3',
        title: 'Monte Carlo Optimization',
        duration: '45 minutes',
        content: `# Monte Carlo Optimization

Monte Carlo methods can be used to find optimal solutions when traditional optimization approaches fail.

## When to Use Monte Carlo Optimization:

- Complex, non-convex objective functions
- Many local optima
- Discrete or mixed variable problems
- Black-box functions (no gradient information)
- Noisy objective functions

## Monte Carlo Optimization Approaches:

1. **Random Search**: Generate random solutions and keep the best
2. **Simulated Annealing**: Inspired by metallurgical annealing
3. **Genetic Algorithms**: Evolution-inspired optimization
4. **Cross-Entropy Method**: Iteratively update sampling distribution

## Visual Demonstration:

<div class="resource-card">
  <iframe src="https://www.youtube.com/embed/eBmU1ONJ-os?rel=0&showinfo=0" title="Simulated Annealing Algorithm Explained" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <p class="resource-description">This video explains simulated annealing with the Traveling Salesman Problem as an example.</p>
</div>

### Interactive Resources:
- [Interactive Visualization of Simulated Annealing](https://mathworks.com/moler/exm/chapters/fern.pdf)
- [Hands-on Tutorial by Sebastian Lague](https://www.youtube.com/watch?v=JhgDMAm-imI)

### Key Concepts:
- **Temperature Parameter**: Controls the probability of accepting worse solutions
- **Cooling Schedule**: How the temperature decreases over time
- **Exploration vs. Exploitation**: Balance between searching widely and refining good solutions
`,
        hasExercise: false
      }
    ]
  },
  {
    id: 'module3',
    title: 'Bayesian Methods & MCMC',
    duration: '3 hours',
    description: 'Discover Bayesian inference using Markov Chain Monte Carlo methods.',
    difficulty: 'hard',
    lessons: [
      {
        id: 'lesson3-1',
        title: 'Introduction to Bayesian Inference',
        duration: '45 minutes',
        content: `# Introduction to Bayesian Inference

Bayesian inference is a method of statistical inference in which Bayes' theorem is used to update the probability for a hypothesis as more evidence or information becomes available.

## Bayes' Theorem:

P(θ|Data) = P(Data|θ) × P(θ) / P(Data)

Where:
- P(θ|Data) is the posterior probability
- P(Data|θ) is the likelihood
- P(θ) is the prior probability
- P(Data) is the evidence (marginal likelihood)

## Components of Bayesian Inference:

1. **Prior Distribution**: Represents our knowledge of θ before observing the data
2. **Likelihood Function**: Describes the probability of observing the data given θ
3. **Posterior Distribution**: Updated belief about θ after observing the data
4. **Evidence**: Normalizing constant to ensure posterior integrates to 1

## The Challenge:

For many real-world problems, calculating the posterior distribution analytically is intractable. This is where Monte Carlo methods come in - they allow us to approximate the posterior by sampling from it.

## Visual Demonstration:

<div class="resource-card">
  <iframe src="https://www.youtube.com/embed/HZGCoVF3YvM?rel=0&showinfo=0" title="Introduction to Bayesian Statistics" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <p class="resource-description">This video provides a comprehensive introduction to Bayesian inference and how it differs from frequentist statistics.</p>
</div>

### Interactive Resources:
- [Visualizing Bayes' Theorem](https://setosa.io/conditional/)
- [Bayesian Inference Tutorial](https://www.youtube.com/watch?v=3OJEae7Qb_o)
`,
        hasExercise: false
      },
      {
        id: 'lesson3-2',
        title: 'Markov Chain Monte Carlo (MCMC)',
        duration: '1 hour',
        content: `# Markov Chain Monte Carlo (MCMC)

MCMC methods are a class of algorithms for sampling from probability distributions based on constructing a Markov chain that has the desired distribution as its equilibrium distribution.

## Key MCMC Algorithms:

1. **Metropolis-Hastings**: The classic MCMC algorithm
2. **Gibbs Sampling**: Special case for multivariate distributions
3. **Hamiltonian Monte Carlo**: Uses gradient information
4. **No-U-Turn Sampler (NUTS)**: Adaptive variant of HMC

## Metropolis-Hastings Algorithm:

1. Start with an initial parameter value θ₀
2. Propose a new value θ* from a proposal distribution
3. Calculate acceptance ratio α = min(1, P(θ*|Data)/P(θₙ|Data) × q(θₙ|θ*)/q(θ*|θₙ))
4. Accept θ* with probability α
5. Repeat steps 2-4 to build a chain

## Visual Demonstration:

<div class="resource-card">
  <iframe src="https://www.youtube.com/embed/7LB1VHp4tLE?rel=0&showinfo=0" title="Markov Chain Monte Carlo (MCMC) Methods Explained" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <p class="resource-description">This video provides a clear explanation of Markov Chain Monte Carlo methods with visual examples.</p>
</div>

### Interactive Resources:
- [Interactive Metropolis-Hastings Visualization](https://chi-feng.github.io/mcmc-demo/app.html)
- [In-depth Bayesian Statistics Tutorial](https://www.youtube.com/watch?v=x5Y3Mz_n2fE)

### Key Concepts:
- **Prior Distribution**: Initial beliefs about parameters before seeing data
- **Likelihood Function**: How likely the observed data is given parameter values
- **Posterior Distribution**: Updated beliefs after combining prior with data
- **Metropolis-Hastings Algorithm**: Method to sample from complex probability distributions
`,
        hasExercise: true
      },
      {
        id: 'lesson3-3',
        title: 'Convergence Diagnostics & Practical Considerations',
        duration: '45 minutes',
        content: `# Convergence Diagnostics & Practical Considerations

How do we know if our MCMC has converged to the posterior distribution?

## Common Diagnostics:

1. **Trace Plots**: Visual inspection of parameter values over iterations
2. **Autocorrelation Plots**: Check for independence between samples
3. **Gelman-Rubin Statistic**: Compare multiple chains
4. **Effective Sample Size**: Measure of independent information in autocorrelated samples

## Practical Considerations:

1. **Burn-in Period**: Discard initial samples before the chain has converged
2. **Thinning**: Keep every n-th sample to reduce autocorrelation
3. **Multiple Chains**: Run multiple chains with different starting points
4. **Proposal Distribution**: Choose appropriate proposal distributions/step sizes

## Visual Demonstration:

<div class="resource-card">
  <iframe src="https://www.youtube.com/embed/pHsuIaPbNbY?rel=0&showinfo=0" title="MCMC Convergence Diagnostics" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <p class="resource-description">This video explains how to diagnose convergence in MCMC simulations and interpret the results.</p>
</div>

### Interactive Resources:
- [MCMC Diagnostics in PyMC3](https://docs.pymc.io/notebooks/MCMC-diagnostics.html)
- [Bayesian Workflow Tutorial](https://betanalpha.github.io/assets/case_studies/principled_bayesian_workflow.html)

### Key Concepts:
- **Convergence**: How to determine if your MCMC has reached the target distribution
- **Mixing**: How efficiently the chain explores the parameter space
- **Adapting the Proposal**: Strategies for tuning MCMC for better performance
`,
        hasExercise: false
      }
    ]
  },
  {
    id: 'module4',
    title: 'Final Project & Wrap-Up',
    duration: '2 hours',
    description: 'Apply your Monte Carlo knowledge in a practical project and consolidate your learning.',
    difficulty: 'medium',
    lessons: [
      {
        id: 'lesson4-1',
        title: 'Guided Project: Realistic Monte Carlo Application',
        duration: '90 minutes',
        content: `# Guided Project: Realistic Monte Carlo Application

In this final project, you will apply Monte Carlo methods to a realistic problem. Choose one of the following options, or propose your own:

## Option 1: Portfolio Optimization

Use Monte Carlo simulation to optimize an investment portfolio:

1. Define assets with expected returns, volatilities, and correlations
2. Simulate future price paths using geometric Brownian motion
3. Evaluate different portfolio allocations based on risk/return metrics
4. Find the optimal portfolio weights based on your risk preference

## Option 2: Option Pricing Model

Implement a Monte Carlo model for pricing financial options:

1. Simulate stock price paths under the risk-neutral measure
2. Calculate option payoffs for each simulated path
3. Discount the expected payoff to get the option price
4. Compute "Greeks" (sensitivity measures) using finite differences

## Option 3: Supply Chain Risk Analysis

Build a Monte Carlo model for supply chain risk assessment:

1. Model uncertainties (demand, lead times, production capacity)
2. Simulate integrated supply chain operations
3. Identify bottlenecks and vulnerable points
4. Evaluate mitigation strategies

## Visual Demonstration:

<div class="resource-card">
  <iframe src="https://www.youtube.com/embed/q7HVghYjrCA?rel=0&showinfo=0" title="Monte Carlo Simulation in Finance" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <p class="resource-description">This video demonstrates a complete Monte Carlo simulation project for portfolio optimization.</p>
</div>

### Project Resources:
- [Guide to Monte Carlo Simulation in Excel](https://www.youtube.com/watch?v=TfE7mPBxpak)
- [Online Monte Carlo Simulation Tool](https://www.solver.com/monte-carlo-simulation-example)
- [Real-world Applications Case Studies](https://towardsdatascience.com/monte-carlo-simulations-in-practice-f8e5da0df456)
`,
        hasExercise: true
      },
      {
        id: 'lesson4-2',
        title: 'Resources & Next Steps',
        duration: '30 minutes',
        content: `# Resources & Next Steps

Congratulations on completing the 1-day Monte Carlo course! Here are resources to continue your learning journey:

## Online Courses:

- [**Bayesian Methods for Machine Learning** on Coursera](https://www.coursera.org/learn/bayesian-methods-in-machine-learning)
  Covers MCMC and variational inference for ML

- [**Stochastic Processes** on MIT OpenCourseWare](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-262-discrete-stochastic-processes-spring-2011/)
  Mathematical foundations for advanced Monte Carlo

## Video Playlists:

<div class="resource-card">
  <iframe src="https://www.youtube.com/embed/videoseries?list=PLbMVogVj5nJQu5qwm-HmJgjmeGhsErvXD&rel=0&showinfo=0" title="Comprehensive Monte Carlo Methods" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <p class="resource-description">A complete playlist of Monte Carlo methods from basics to advanced techniques.</p>
</div>

## Books:

- **"Monte Carlo Methods in Financial Engineering" by Paul Glasserman**
  Comprehensive coverage of financial applications

- **"Monte Carlo Statistical Methods" by Christian Robert and George Casella**
  Thorough theoretical foundation with applications

- **"Bayesian Data Analysis" by Andrew Gelman et al.**
  Excellent resource for Bayesian statistics and MCMC

## Libraries and Tools:

- **NumPy/SciPy**: Foundation for scientific computing
- **PyMC3/PyMC4**: Probabilistic programming in Python
- **TensorFlow Probability**: Bayesian methods at scale
- **Stan**: State-of-the-art MCMC implementation

## Research Communities:

- NeurIPS, ICML, and AISTATS conferences
- Journal of Machine Learning Research
- arXiv.org (Statistics and Machine Learning sections)

## Next Learning Paths:

1. **Deep Dive into MCMC**: Advanced sampling methods
2. **Probabilistic Programming**: Creating custom Bayesian models
3. **Advanced Simulation Methods**: Rare event simulation, multilevel MC
4. **Domain-Specific Applications**: Finance, physics, biology, etc.
`,
        hasExercise: false
      }
    ]
  }
];
