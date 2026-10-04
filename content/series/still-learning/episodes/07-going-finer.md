---
number: 7
title: Going Finer
slug: 07-going-finer
summary: From neurons down to single connections. Resetting individual weights works in any architecture and often learns better, but it jolts the network every time it fires. The trade-off, the numbers behind it, and the verdict.
coverage: 'Covers book chapters 16–18 (thesis Chapter 5: opening, §5.1–§5.7). The team goes from neurons down to single weights: a cure that works in any architecture, often learns better, and jolts the network every time it fires.'
interests:
- ai
- math
estimatedMinutes: 58
status: in-production
---

### Cold Open

*[MUSIC: "Still Learning" theme — low cello pulse, slow piano]*

**MIRIAM:** In the brain, connections are being taken apart. Not neurons: synapses, pruned away while new ones grow at the same rate. The cells stay. The wiring turns over.

*[BEAT]*

**MIRIAM:** Last episode, a sick network was treated by replacing whole neurons. It worked. But it left a question: what, exactly, is a neuron, when the architecture changes? The cure depended on a definition, and the definition kept shifting.

**MIRIAM:** So the investigation goes finer, to one connection, one weight. A weight is a weight in any network. Nothing to define.

*[SFX: click and hum]*

**NORA:** Something changed. Not a whole unit. Just a thread. Oh. That one mattered.

*[SFX: a short, sharp electrical jolt]*

**MIRIAM:** This is the story of a cure that matched or beat the one before it, and of its price: every time it fired, the network flinched. The thesis calls that flinch impingement, and proves it with two tables we will read, line by line, with a statistician.

*[BEAT]*

**MIRIAM:** I'm Miriam Okafor. This is *Still Learning*. Episode Seven: Going Finer.

*[MUSIC: theme swells, then cuts to silence]*

### Act One — One Level Down

*[MUSIC: explainer bed — plucked bass, light percussion]*

**LUCÍA:** Last episode's cure: selective unit reinitialization, as in continual backprop and ReDo. It worked. The hangover was the word "unit."

*[MUSIC: bed drops out]*

**MIRIAM:** From the thesis, adapted.

**THE THESIS:** The previous chapter showed that algorithms which reinitialize units, continual backpropagation and ReDo, maintain plasticity across a wide range of deep learning systems. A crucial consideration in applying them is defining what a unit is, and different definitions can yield remarkably different results.

**MIRIAM:** Thesis Chapter 5, from Juan Fernando Hernandez-Garcia's 2026 University of Alberta doctorate, builds on collaborative work published at the Conference on Lifelong Learning Agents in 2025, cited as Hernandez-Garcia and colleagues, 2025. The thesis presents the author's contributions plus extra analyses of how the algorithm behaves.

**THE THESIS:** Working at the level of weights gives an algorithm, selective weight reinitialization, that does not require reasoning about units at all. Its main offer is flexibility. Because weight reinitialization had not been explored before, part of the chapter is spent finding settings that work. Then unit and weight reinitialization are compared in many deep learning systems. All experiments use fully-connected networks on Permuted MNIST.

**MIRIAM:** The headline results: Several configurations of selective weight reinitialization preserve plasticity. In several settings, resetting weights beats resetting units. And the drawback: weight reinitialization has no mechanism to avoid disrupting the network's output, so training is often less stable. The chapter's own summary is that it "further solidifies selective reinitialization as a general approach for preventing plasticity loss in systems based on fully-connected networks."

**DEV:** SWR, for short.

#### The two difficulties

**LUCÍA:** Section 5.1 names two difficulties with units. One: connectivity changes what a unit is. A unit in a fully-connected layer is a different object from a unit in a convolutional layer. That was thesis Figure 4.8. And even inside convolutional layers, how you reset a unit's outgoing weights depends on what the next layer is. Figures 4.8b and 4.8c. Every notion of "unit" needs its own reset procedure. Number two: what happens around the activation matters. In a fully-connected network with layer normalization, computing utility from the raw activations gave significantly different performance than computing it from the normalized activations. Figure 4.9.

**LUCÍA:** And the thesis is scrupulous: it says these difficulties are "only practical and could be overcome with enough engineering."

*[TAPE: Capt. Rashid Al-Harbi, recorded in the hangar office at a regional maintenance base]*

**CAPT. AL-HARBI:** The book's analogy: resetting a unit is replacing a whole department, and every building draws a department's boundary differently; resetting a weight is replacing one reporting line, and a line is a line in any building. In my hangar: swapping a whole avionics box versus one wire in the loom. Where it breaks: a replaced wire is meant to behave exactly as before. A reset weight gets a different value, on purpose. Hold that thought.

*[MUSIC: explainer bed returns]*

**LUCÍA:** The upside of weights: Every weight is treated the same regardless of the network's connectivity pattern. Nothing to define per layer type. And weights give granularity: you can select a smaller portion of the network at a time, which, in principle, might make each reset less disruptive.

#### Audio figure: unit versus weight reinitialization

*[SFX: soft chime]*

**LUCÍA:** Toy Box. On the whiteboard I've drawn the same little network twice. On the left, one hidden unit circled in red, and every line into and out of it red: a unit reset. On the right, a handful of lines red, scattered across layers: a weight reset. The algorithm has no idea which neuron a line belongs to, and doesn't need to.

#### Interview: synapses, held loosely

*[TAPE: Dr. Hana Lindqvist, recorded in her lab at a computational neuroscience institute]*

**MIRIAM:** Dr. Lindqvist, the biology?

**DR. LINDQVIST:** The thesis cites Kasai and colleagues, 2021. The observation is that biological neurons periodically prune a proportion of their synaptic connections while growing new ones at the same rate. That is analogous to continually reinitializing weights. Notably, the brain does this at the level of synapses, which are the counterpart of weights, not at the level of whole neurons. So if you were going to take inspiration from biology, it would point you toward weights.

**MIRIAM:** So it's an argument for weights?

**DR. LINDQVIST:** Let me ask you back: if birds flap their wings, should a jet? No. And the thesis is just as careful. Its words are that this "should not be taken as a strong argument in favour of reinitializing weights, but solely as inspiration." It suggests reinitialization may help continual learning in networks of interconnected neurons; nothing more. Where the analogy breaks: the brain's turnover is regulated by biology; the algorithm's is a rule on a timer.

*[MUSIC: a low cello note, held]*

#### Algorithm 5, walked through

**LUCÍA:** Algorithm 5. Same three parts as the unit version, pointed at weights. A utility measure: how useful is each weight? A pruning criterion: which and how many weights to reset? A reinitialization method: what new value does a reset weight get? Two knobs. Tau, the Greek letter, is the reinitialization frequency. Every tau parameter updates, a reinitialization step happens. And a warning the book gives: despite the name, tau is a period. A bigger tau means less frequent resets. The name will bite a sentence later this hour. The second knob is rho, the reinitialization factor. Rho controls how many weights are pruned per step.

*[SFX: soft chime]*

**LUCÍA:** Audio walkthrough. Algorithm 5, top to bottom. First, five lines of inputs: any neural network; a pruning criterion; a utility measure; a reinitialization method; and the two numbers, tau and rho. Notice the first input: "any neural network." That's the whole point. Nothing below depends on layer type.

**LUCÍA:** Next, the outer loop: "for each time step t in one, two, three, and so on." No final step. Learning never stops. Inside it, two lines of perfectly ordinary learning: sample a mini-batch, compute predictions, observe the losses; then compute gradients and update the parameters with stochastic gradient descent. That's the base system, untouched. Then the trigger: "if t is a multiple of tau." Only every tau-th step resets anything. With tau equal to 1,000, steps 1,000, 2,000, 3,000 and so on are reinitialization steps. Inside the trigger: "for each weight matrix and vector in the network." Every weight matrix and every bias vector is handled separately, and utilities are only ever compared inside one matrix or one vector. Then three lines. Measure the utility of the weights. Use the pruning criterion, with factor rho, to select weights. Set new values for them with the reinitialization method.

**LUCÍA:** Plus one ordering detail the thesis uses later, in section 5.4: on any step, the loss is computed before that step's reinitialization. Remember that when we get to the jolt.

**NORA:** So every tau steps, someone walks through every one of my matrices with a clipboard, and never asks which neuron anything belongs to.

#### The first utility: weight magnitude

**LUCÍA:** A utility measure gives each weight a real number; larger means more needed. The thesis explains it for weight matrices, but applies it to every matrix and vector of parameters. Bold capital U is the matrix of utilities, same shape as the weight matrix it describes. Two measures come from the pruning literature, cited as Blalock and colleagues, 2020. A third, random utility, shows up in the experiments as a baseline. Measure one: weight magnitude utility, thesis Equation 5.1. In words: the utility at row i, column j equals the absolute value of the weight at row i, column j. Bold capital W is a weight matrix; W of i, j is the weight in row i, column j. U of i, j is its utility. The vertical bars are absolute value, so minus 0.8 and plus 0.8 are equally important, and a weight near zero scores low because it barely affects anything. Toy example: weights 0.8, minus 0.05, and 0.3 get utilities 0.8, 0.05 and 0.3. The minus 0.05 is first in line for reset.

#### The second utility: first-order, derived

*[TAPE: Prof. Tomás Adeyemi, recorded in his office]*

*[AMBIENCE: chalk on a blackboard]*

**PROF. ADEYEMI:** The better question is not "how big is this weight?" It's "how much would the loss change if this weight disappeared?" Four steps.

**PROF. ADEYEMI:** Step one, the exact question. Call the network f sub theta, where theta is the set of all weight matrices, W zero through W sub L, and L is the number of layers. For an input x, the prediction is y-hat equals f sub theta of x. The target is y. Ell of y-hat and y is the loss. Now write the same loss, but with one single weight, W sub l at i, j, set to zero. Take that loss minus the ordinary loss. That difference is the impact of the weight on the loss, with every other weight held fixed. A big positive difference means the weight matters. But computing it for every weight is one extra forward pass per weight, every reset step. Computationally expensive. So step two: make it affordable with a first-order Taylor approximation. You approximate the loss at the point where the weight equals zero, using the slope at the weight's current value. The slope is the derivative of the loss with respect to that weight, d ell by d W sub l at i, j. Backpropagation has already computed it for free.

**PROF. ADEYEMI:** The loss with the weight at zero is approximately the current loss, plus the slope, times the distance the weight would travel to reach zero, which is zero minus the weight. Then you subtract the current loss, as the original question asked. The two loss terms cancel, and you're left with minus the weight, times the derivative of the loss with respect to that weight. Slope times distance equals change in loss.

*[TAPE: chalk stops]*

**PROF. ADEYEMI:** Step three, average over the data. That expression is for a single input-target pair. What we actually care about is the expected difference under the data-generating distribution, which the thesis calls p. And here's a subtle bit. A weight whose removal would sharply lower the loss still has impact. Only weights with no impact at all should be pruning candidates. So the thesis takes the absolute value. The utility of the weight is the absolute value of the weight times the expected gradient under p. Step four: estimate it with a mini-batch of size m. That gives thesis Equation 5.2. In words: the utility of weight i, j in layer l equals the absolute value of: the weight, times one over m, times the sum, for k from one to m, of the derivative of the loss on example k with respect to that weight.

**LUCÍA:** Symbols, for the record. m is the mini-batch size; k indexes the examples in it. One over m times the sum is the average gradient over the mini-batch, standing in for the expectation. And the result is first-order utility: absolute value of weight times average gradient.

**LUCÍA:** The book's toy example, three weights. Weight A is 0.5 with average gradient minus 0.2: utility is the absolute value of 0.5 times minus 0.2, which is 0.10. Weight B is 0.05 with average gradient 1.0: utility 0.05. B gets reset first, even with a big gradient, because it's too small to matter much. Weight C is 0.9 with gradient 0.0: utility zero. Large but currently irrelevant, so a candidate.

**PROF. ADEYEMI:** Dev, quick one. A weight of 2.0, average gradient exactly zero?

**DEV:** Magnitude utility 2.0. First-order... zero. Reset candidate.

*[TAPE: Capt. Rashid Al-Harbi]*

**CAPT. AL-HARBI:** The book's analogy for the Taylor step is a budget line. To estimate how much one line matters, you don't rerun the whole year without it. You multiply its size by how sensitive the result is to it. Where it breaks: a network's loss is not linear, so the straight-line guess can miss when the curve bends.

**LUCÍA:** And one thing to pin to the fridge. Both measures, weight magnitude and first-order, contain the factor "absolute value of the weight." Small weight, small utility, in both. Hold on to that. It comes back as a trap.

*[MUSIC: a low cello note, held, then fade]*

#### Pruning criteria: which, and how many

**LUCÍA:** The pruning criterion. The thesis flags its own vocabulary: "Pruning" is a misnomer. It suggests connections are permanently removed. They are not. It's really a selection criterion. The word is kept to stay linked with the neural-network pruning literature, which shares several concepts with selective reinitialization.

**LUCÍA:** Two criteria, each inspired by one of last episode's algorithms. Proportional pruning, inspired by continual backprop, removes a fixed proportion of the parameters from each weight matrix. Threshold pruning, inspired by ReDo, removes every weight whose utility falls below a threshold set relative to the mean utility in the matrix.

*[SFX: soft chime]*

**LUCÍA:** Toy Box. Proportional first. You have rho, a number between zero and one, and the utility matrix U. Proportional pruning removes the size of U, the number of weights in the matrix, times rho. Problem: that product usually isn't a whole number. So, a coin flip.

*[SFX: a coin spinning on a table, settling]*

**LUCÍA:** The rule, in words: kappa, the number of weights pruned this step, equals the integer part of the size of U times rho, plus a Bernoulli draw whose probability is the fractional part of the size of U times rho. Bernoulli of q is a random draw that's one with probability q, zero otherwise. So the whole-number part is always pruned, and you add one extra weight with probability equal to the leftover fraction. In expectation, exactly the size of U times rho weights get selected per step. The criterion returns a list of indices, bold capital I: the positions of the kappa weights with the lowest utilities.

**LUCÍA:** Example: a matrix of 10 weights, rho equals 0.25. Ten times 0.25 is 2.5. So you always reset 2, and you reset a third with probability 0.5. Over many steps, the average is 2.5. A real layer, 100 by 100, is 10,000 weights. With rho equal to 0.001, that's 10 weights per step.

**DEV:** And if it comes out whole? Say 400 weights, rho 0.0125.

**LUCÍA:** Four hundred times 0.0125 is exactly 5. No fractional part, no coin flip. Five every step.

**LUCÍA:** Threshold: instead of a fixed count, prune whatever sits below a line. Compute the average utility in the layer, u-bar. For a rho of zero or more, remove every weight whose utility is at or below rho times u-bar. In set notation: I is the set of all positions i, j such that U of i, j is less than or equal to rho times u-bar. Rho equal to 0.5 means "at or below half the average."

**DEV:** So proportional is a quota, threshold a bar.

**LUCÍA:** And the practical difference is how many get reset. Proportional: the same expected number, every step. Threshold: a variable number that depends on how the utilities are spread out. Two edge cases. One extreme outlier raises the average sharply, so most weights fall under the line and get reset. And if every utility sits above rho times u-bar, which is possible when rho is less than one, nothing gets reset at all.

*[SFX: soft chime]*

**LUCÍA:** Audio figure from the book: proportional versus threshold, same ten utilities. Picture ten bars of different heights in a row. Proportional, on the left, shades a fixed share of the shortest bars, every time. Threshold, on the right, draws a horizontal dashed line at rho times the average, and shades everything under it. Now make one bar enormous, a skyscraper. The average leaps, the dashed line leaps with it, and suddenly almost the whole row is shaded.

**DEV:** One celebrity weight gets everybody else reset.

#### Reinitialization methods, and the word of the hour

**LUCÍA:** Third component, the reinitialization method. For a unit, the method has to set incoming and outgoing weights, and how you do that depends on connectivity. For a weight, you just assign a number. No connectivity to think about. That simplicity has a cost.

**THE THESIS:** From the thesis, adapted. Any reset of a weight or a unit may change the network's output. This effect is called impingement: the new weight or unit impinges on the output. The effect can help or hurt, and there is no way to know in advance which. It is therefore desirable to choose methods that impinge as little as possible.

**MIRIAM:** Units, it turns out, have a built-in defence. Set a new unit's outgoing weights to zero, and it cannot change the output at all until learning grows those weights. Weights have no such option. A single weight has nothing downstream of itself to zero out.

**UNIT 47:** Last episode they recycled me with outgoing weights at zero. Nobody downstream noticed.

**NORA:** Lucky you. When a weight gets reset, the new number is on the wire the instant it's written. Whatever it is, I feel it.

*[TAPE: Capt. Rashid Al-Harbi]*

**CAPT. AL-HARBI:** The book's analogy, and it's a good one. A new hire whose sign-off authority starts at zero cannot disturb the books on day one. That's the unit reset with zeroed outputs. A reporting line rewired mid-quarter changes the numbers immediately. That's the weight reset. Where it breaks: a new hire's authority can be grown gradually by policy. A weight's influence is simply its value, from the instant it is written.

**LUCÍA:** So, two methods. Resample reinitialization: draw a fresh value from the original initialization distribution. If W was initialized from a normal distribution with mean mu and variance sigma squared, a reset weight gets a new sample from that same normal. Mean reinitialization: set the weight to the mean of that distribution, mu. Initialization means are usually zero, so in most networks, mean reinitialization means "set new weights to zero." Parameters initialized to a fixed value, like bias terms and the weight vectors in layer normalization, reset to that fixed initial value under both methods.

**MIRIAM:** Why have two methods? Because the thesis states two motivations for selective reinitialization in general. One: restore the initial conditions that let the network learn, which learning has eroded. Two: supplement gradient descent with an additional search process over the parameter space. And with weights, a third concern joins them: limit impingement.

**LUCÍA:** Resample serves the first two. Its randomness creates a parallel search, and it restores some of the initial conditions. Mean reinitialization gives up both, and bets everything on limiting impingement. The logic: both utility measures are proportional to weight magnitude, so the weights selected are probably small already. Setting a small weight to zero should barely change the output.

**MIRIAM:** Whether it actually reduces impingement, and whether that helps learning, is a testable claim. The thesis tests it. We'll see the answer in Table 5.3.

**LUCÍA:** Let's count the menu. Three utility measures: weight magnitude, first-order, and random as a baseline. Two criteria: proportional, threshold. Two methods: resample, mean. Three times two times two: twelve settings. Each gets its own tau and its own rho, tuned. Scope: every weight matrix and every bias vector, with utilities compared only within one.

**MIRIAM:** Twelve suspects. And the next act is the lineup.

*[MUSIC: "Still Learning" theme, a short sting]*

*[TIMECODE 00:19:40]*

### Act Two — Twelve Settings

*[SFX: shuffling cards]*

**MIRIAM:** The test bed is the one this series has used since Episode Three. Permuted MNIST: handwritten digits whose pixels are reshuffled for every new task. The base system is a ReLU network with three hidden layers of 100 units each, trained with stochastic gradient descent. Each task is one pass through the permuted dataset, mini-batch size 30. That works out to 2,000 parameter updates per task.

**DEV:** Two thousand per task. Write that on your hand.

**MIRIAM:** The score is average online accuracy per task: the share of examples classified correctly while the network is learning each task, averaged over the task. And two baselines known to maintain plasticity well on this problem: shrink-and-perturb, and L2 regularization.

**MIRIAM:** Three questions are asked. Is there any setting of selective weight reinitialization that maintains plasticity? How does each choice affect performance? And which combination performs best?

#### The tuning, on the record

*[TAPE: Dr. Sun-Hee Park, recorded in a seminar room after a lecture]*

**DR. PARK:** Before you show a chart, you show how the knobs were set. Every algorithm's hyperparameters were tuned to maximize average online accuracy over 1,000 tasks. The search followed the earlier chapters: a wide search with a single run, then a narrow search with multiple runs. The base system's step-size was tuned, and every modification reused that same step-size. For each combination of utility, criterion and method, tau and rho were tuned. Reinitialization was applied to every weight matrix and bias vector. L2 regularization had its regularization factor tuned. Shrink-and-perturb had its noise variance tuned, with its regularization factor set equal to the L2 baseline's. Details: thesis Appendix A. A third utility joins as a control, random utility: each weight gets a value drawn uniformly between zero and one. It carries no information about usefulness. It just picks weights at random. If your clever measure can't beat a coin, it isn't clever.

#### Audio figure: Figure 5.1, resample

*[SFX: soft chime]*

**LUCÍA:** Figure 5.1. Resample reinitialization. Two panels: a is proportional pruning, b is threshold pruning. Horizontal axis: task number, permutation 1 to 1,000. Vertical axis: average online accuracy per task, from 82% to 94%. Each line is the average of 30 independent runs, with a shaded band of one standard error. Black is the base system. Orange and pink near the top are shrink-and-perturb and L2 regularization. Blue is first-order utility. Yellow is random utility. Green is weight magnitude utility. Hyperparameters are in thesis Table A.9. Black slides downward, as always. Blue, first-order, stays flat near 92.5 to 93%, in both panels. Yellow, random, also flat, around 92%, almost matching first-order. Green, weight magnitude, fails. In panel a, with proportional pruning, it declines over tasks while oscillating heavily. In panel b, with threshold pruning, the green line is indistinguishable from the falling black base system. All of these are read off the chart. The striking feature of panel a: several lines swing up and down in regular waves. The thesis calls it the undulating pattern. Park it; we'll come back.

**MIRIAM:** So under resample: four settings maintained plasticity. First-order with both criteria, random with both criteria.

#### Audio figure: Figure 5.2, mean

**LUCÍA:** Figure 5.2. Same comparison, same axes, colors, baselines, 30 runs, hyperparameters again in Table A.9, but now with mean reinitialization: new weights set to the initialization mean, usually zero. Badly, for anything that measures size. Weight magnitude and first-order declined steadily under both criteria. And in panel b, first-order utility with threshold pruning collapses. It falls through the base system's curve around task 500 and drops below 82% by about task 700. Read off the chart. Worse than doing nothing. Then the twist: random utility maintained plasticity, and did better than it had with resample. The quick check is the gap between yellow and the L2 line. It's smaller in Figure 5.2 than in Figure 5.1.

**MIRIAM:** First answers, then. Question one: yes, several settings maintain plasticity. Question two: the choices matter a great deal. No setting with weight magnitude utility maintained plasticity. Random utility maintained plasticity in all four combinations of criterion and method, and did best with mean reinitialization. Question three, best so far: first-order utility, threshold pruning, resample reinitialization.

*[SFX: ledger bell]*

**THE AUDITOR:** One discrepancy for the ledger. In section 5.3, the thesis text says first-order utility "was only successful in maintaining plasticity when using resample reinitialization with threshold pruning, yielding higher performance than proportional pruning." Taken literally, that means first-order with proportional pruning and resample failed. But Figure 5.1 shows it holding level. Table 5.1 marks first-order with proportional pruning and resample in bold, as having maintained plasticity. And the chapter's own conclusion, section 5.7, says first-order utility worked with both criteria under resample. Three sources against one sentence. The book follows the majority reading: first-order utility needs resample reinitialization, and with resample, threshold pruning scores higher than proportional. Both work.

*[SFX: ledger closes]*

**MIRIAM:** The thesis also deliberately holds back a final verdict on question three. Peak accuracy is not the only virtue; robustness across systems counts too. More evidence first. And the results so far raise three new questions. Why do some settings undulate? Why is random utility so robust? And why are first-order and weight magnitude utility so sensitive to the reinitialization method?

#### The waves: a scheduling artifact

**LUCÍA:** The waves come from the reinitialization frequency, not from learning. The same thing happened with ReDo using full reinitialization back in thesis Chapter 4, Figure 4.7. Every undulating setting used a tau greater than 2,000, the number of updates in one task. So reinitialization did not happen in every task. And when it did, it landed at different points, sometimes early, sometimes mid-task, sometimes near the end. Tasks with a reset show a drop. The drop is deepest when the reset lands mid-task.

*[SFX: soft chime]*

**LUCÍA:** Toy Box, with a deck of cards for tasks. Tau equals 3,000, tasks are 2,000 updates. Card one: updates 1 to 2,000. No reset. Card two: 2,001 to 4,000. Reset at 3,000, right in the middle. Card three: 4,001 to 6,000. Reset at 6,000, the very end. Card four: no reset. Card five: reset at 9,000, middle. Card six: reset at 12,000, end. Tasks one and four have no reset at all. The pattern repeats every three tasks.

**DEV:** On a chart a thousand tasks wide, that's a regular wave.

#### Audio figure: Figure 5.3, capped at 1,024

**LUCÍA:** To prove it, the thesis re-tuned every setting with the reinitialization frequency capped at 1,024 updates. Figure 5.3. Four panels: threshold with resample, threshold with mean, proportional with resample, proportional with mean. Same axes and colors. One difference to note: each line averages 10 independent runs, not 30. Hyperparameters in thesis Table A.10. With tau at or below 1,024, the waves shrink or vanish. Some remain, most visibly weight magnitude with proportional pruning and resample, because even at 1,024, a reset still lands at different points within a task, and some tasks contain more than one reset. Otherwise, the picture is much the same. First-order with threshold pruning and mean reinitialization still collapses, near task 400.

**MIRIAM:** One mystery closed. The waves are scheduling, not pathology.

#### The trap: persistent reinitialization

**MIRIAM:** The second mystery: random utility knows nothing about usefulness, yet prevented plasticity loss with every criterion and every method. Why?

**LUCÍA:** The fridge note. Both informed measures include the absolute value of the weight, so small weights get picked. A picked weight gets a new, small value, can't grow fast enough before the next step, and is picked again.

**THE THESIS:** From the thesis, adapted. The thesis names this persistent reinitialization. Both methods can fall into it if new weights are too small, but mean reinitialization should be worse, because it sets new weights to exactly zero, the lowest possible utility.

**NORA:** So the same few threads of mine get cut, and cut, and cut, every time the clipboard comes round?

**LUCÍA:** That's the hypothesis.

*[TAPE: Capt. Rashid Al-Harbi]*

**CAPT. AL-HARBI:** The book uses an audit analogy, and I've run audits, so I'll take it. An audit rule that always reviews the smallest accounts will keep reviewing the same newly opened accounts, because new accounts start small. A random sample has no such bias. Where it breaks: a reviewed account isn't harmed by review; a picked weight is wiped.

#### The overlap formula

**MIRIAM:** A hypothesis needs a measurement. If persistent reinitialization is happening, the same weights should be selected at consecutive reinitialization steps. So the thesis defines the reinitialization overlap.

**LUCÍA:** In words: reinitialization overlap is defined as 100 times the number of weights in the intersection of I-prime and I, divided by the number of weights in I. I is the set of indices selected at the current step. I-prime is the set selected at the previous step. The intersection, I-prime cap I, is the weights selected at both. The vertical bars here mean "number of elements in the set." Dividing by the size of I gives the share of this step's selections that were also last step's. Times 100 makes it a percentage. The symbol is an equals sign with a dot on top, which means "is defined as." Zero means no repeats. Close to 100 means almost everything reset now was also reset last time. Toy example: this step selects 50 weights. Forty-five of them were selected last step too. Overlap equals 100 times 45 over 50: 90%.

#### Table 5.1, read aloud

*[TAPE: Dr. Sun-Hee Park]*

**MIRIAM:** Dr. Park, Table 5.1. Every setting from Figures 5.1 and 5.2, with three numbers each.

**DR. PARK:** The columns first, because people skip them. Percent reinitialized per task: the share of all weights reset during one task. Average reinitialization overlap: the formula Lucía just read, averaged over reinitialization steps. Average online accuracy: averaged over all 1,000 tasks. Every number is an average of 30 runs. Standard errors in parentheses; where none is shown, the standard error was below 0.2. Bold accuracy marks settings that maintained plasticity.

**MIRIAM:** First-order, top four rows.

**DR. PARK:** First-order, threshold, resample: 48.58 percent reinitialized per task; overlap 56.93; accuracy 92.79, standard error 0.002. Bold. First-order, threshold, mean: 94.04 percent per task, overlap 98.39, accuracy 85.39, standard error 0.38. Not bold. First-order, proportional, resample: 19.52 per task, overlap 55.22, accuracy 92.42, standard error 0.003. Bold. First-order, proportional, mean: 78.12 per task, overlap 92.67, accuracy 90.42, standard error 0.11. Not bold.

**DEV:** Ninety-four percent reset per task, and an overlap of 98?

**DR. PARK:** The trap, in numbers. Lots of motion, little renewal. Weight magnitude, threshold, resample: 0.0038 percent per task, overlap 0.16, accuracy 85.66, standard error 0.01. Weight magnitude, threshold, mean: 22.52 per task, overlap 94.58, accuracy 85.78, standard error 0.02. Weight magnitude, proportional, resample: 19.52 per task, overlap 97.06, accuracy 89.46, standard error 0.02. Weight magnitude, proportional, mean: 19.52 per task, overlap 97.03, accuracy 90.88, standard error 0.008. None bold.

**DR. PARK:** And random. Random, threshold, resample: 19.53 per task, overlap 5.00, accuracy 91.97, standard error 0.001. Bold. Random, threshold, mean: 9.76 per task, overlap 5.00, accuracy 92.62, standard error 0.002. Bold. Random, proportional, resample: 9.76 per task, overlap 19.96, accuracy 91.99, standard error 0.001. Bold. Random, proportional, mean: 9.77 per task, overlap 5.00, accuracy 92.62, standard error 0.002. Bold.

**MIRIAM:** Six bold. Six of twelve maintained plasticity.

**DR. PARK:** Miriam, the overlap column?

**MIRIAM:** Random is low: 5.00 in three settings, 19.96 in one. And every setting with an overlap above 90 failed.

**DR. PARK:** Every single one. First-order with mean, 98.39 and 92.67. Three of the weight magnitude settings: 94.58, 97.06, 97.03. That's the correlation the hypothesis predicted. Now find me the exception.

**DEV:** Weight magnitude, threshold, resample. Overlap 0.16. Tiny. And it still failed.

**DR. PARK:** Column to its left.

**DEV:** 0.0038 percent per task. It barely reset anything.

**DR. PARK:** It failed for lack of reinitialization, not from repetition. Two more readings. With random utility, the pruning criterion stopped mattering; accuracy depended only on the method. About 91.97 to 91.99 with resample, 92.62 with mean. And mean reinitialization with first-order or weight magnitude utility always produced overlap above 90, and always failed. With random utility, mean beat resample. High overlap is the likely reason mean failed with the magnitude-based measures.

**DR. PARK:** One caution: this is association across twelve settings, presented as the likely reason, not a controlled experiment on overlap.

#### Four carried forward

**MIRIAM:** Four non-redundant winners go forward, to save tuning.

**LUCÍA:** One: SWR first-order, threshold, resample. Two: SWR first-order, proportional, resample. Three: SWR random, proportional, resample. Four: SWR random, proportional, mean. Random utility with threshold pruning is dropped, because it performed no differently from proportional.

**MIRIAM:** Now: weights against units.

*[MUSIC: "Still Learning" theme, a short sting]*

*[TIMECODE 00:33:15]*

### Act Three — The Jolt

*[MUSIC: explainer bed — plucked bass, light percussion]*

**MIRIAM:** Section 5.4 of the thesis has one aim: find where unit and weight reinitialization are equally effective, and where they differ. Fully-connected layers only, Permuted MNIST throughout. For each base system, the four SWR settings go first, then the best face ReDo and continual backprop. Optimizer hyperparameters are grid-searched for the base system and reused by every other algorithm, which grid-searches its own.

#### Small networks and layer norm: Figures 5.4 and 5.5

**LUCÍA:** Start where units struggled: four base systems. Large network: ReLU, three hidden layers, 100 units each. Small network: the same with 10 units per layer. Large with layer norm, applied after the activations. Small with layer norm, likewise.

**LUCÍA:** Figure 5.4: the four SWR settings in (a) large, (b) large with layer norm, (c) small, (d) small with layer norm. Task number across; accuracy up, 82 to 94% in a and b, 70 to 90% in c and d. Black base system; the four SWR settings in shades of blue, pink and grey, labelled on the lines. Thirty runs, one-standard-error bands. Hyperparameters in Tables A.11 and A.12. In a, b and d, all four settings hold steady while black declines. In the small network, panel c, random with mean reinitialization declines steadily, from about 85% toward 80%. And in every panel, first-order, threshold, resample is on top: about 88.5% in the small network, about 90.5% in small with layer norm, where the base system falls to about 72%. Read off the chart.

**LUCÍA:** Figure 5.5 is the head-to-head. Same layout. Blue is SWR, first-order, threshold, resample, labelled "selective weight reinitialization." Green ReDo, yellow continual backprop, orange shrink-and-perturb, black base. For the unit algorithms in the layer-norm systems, utility came from the raw activations, because that worked better in thesis Figure 4.9. Hyperparameters in Table A.13. Scoreboard. Large network: all three reset algorithms similar, about 92.5 to 93%. Large with layer norm: continual backprop declines steadily, ReDo declines much less; SWR holds about 93.5%, with a steady undulation that never fades. Small network: the unit algorithms settle near 85% after an initial drop; SWR settles higher, about 88.5%. Small with layer norm: both unit algorithms decline, ReDo very noisily, ending near 81%; SWR flat at about 90.5%. SWR maintained plasticity in all four.

*[SFX: ledger bell]*

**THE AUDITOR:** A caption that says more than its text. Figure 5.5's caption states that SWR "outperformed unit reinitialization approaches in all four architectures." The body text describes panel a, the large network, more cautiously, as "similarly effective." The chart supports the text: in panel a, the three reset methods sit together. And for the record, shrink-and-perturb sits slightly above SWR in panels a and c. Trust the body, not the caption.

*[SFX: ledger closes]*

#### Adam, momentum, Leaky ReLU, Tanh: Figures 5.6 and 5.7

**MIRIAM:** Next the thesis looked for the reverse: systems where units had been strong.

**LUCÍA:** Figure 5.6: ReLU networks, 100 units per layer, trained with Adam or SGD with momentum. Shrink-and-perturb uses the weight-decay versions, AdamW and SGDW. Panel a: the four SWR settings. Panel b: the best SWR against the unit algorithms and shrink-and-perturb. Left panes Adam, right panes momentum, axes 82 to 94%, 30 runs, Tables A.14 and A.15. All four SWR settings stable with both optimizers; random with resample lowest, about 92% with momentum; first-order, threshold, resample highest. In panel b with Adam, SWR, continual backprop and ReDo all about 93.5%. With momentum, SWR slightly higher. Every selective reinitialization algorithm maintained plasticity with both.

**LUCÍA:** Figure 5.7: three hidden layers of 100 units, Leaky ReLU or Tanh. For the unit algorithms, Tanh uses first-order utility; Leaky ReLU uses activation utility for ReDo and contribution utility for continual backprop. Left panes Leaky ReLU, axis 84 to 94%; right panes Tanh, 82 to 92%; 30 runs; Tables A.16 and A.17. All four SWR settings maintained plasticity with both. And with Leaky ReLU, the best SWR setting was random, proportional, mean. The first time random beat first-order, threshold, resample. With Tanh, first-order, threshold, resample won by a clear margin, about 91.5%. In panel b: Leaky ReLU, units and weights similar, shrink-and-perturb highest. Tanh, SWR clearly ahead of continual backprop, about 90%, and ReDo, about 89.5%.

#### The extra large network: Figure 5.8

**LUCÍA:** Last: scale. Three hidden layers of 1,000 units, the extra large network. Figure 5.8, panels a and b as before. Zoomed axis: 92.0 to 95.0%. Thirty runs, Table A.18. Black slides from about 94.5% to about 92%. All SWR settings reduce that decline; random with mean drifts slightly down throughout, possibly losing plasticity; the other three are stable. In panel b, SWR, continual backprop and ReDo settle together, about 94.3 to 94.5%, and the gap to shrink-and-perturb is smaller than in smaller networks. The thesis's reading: as networks grow, the choice of reinitialization algorithm matters less for peak performance.

**DEV:** And the SWR line in panel b?

**LUCÍA:** Sharp, regular drops. The thesis attributes them to the schedule: one reinitialization step every 16,384 updates. That's roughly one every eight tasks; 16,384 divided by 2,000 is about 8.2.

*[SFX: ledger bell]*

**THE AUDITOR:** The upside-down name strikes. The thesis text calls 16,384 the "reinitialization factor." By section 5.2's definitions, a count of updates between resets is the frequency, tau. 16,384 is tau.

*[SFX: ledger closes]*

#### Listener question

**DEV:** A listener, Farida, a data engineer, writes: "If random utility is so robust, why not always use it?"

**LUCÍA:** The charts answer it. Random did win once, with Leaky ReLU. But random with mean declined in the small network, Figure 5.4c, and drifted down in the extra large network, Figure 5.8a. Random with resample was the lowest SWR setting with momentum. The one setting that was on top almost everywhere was first-order, threshold, resample. Robust to persistent reinitialization isn't the same as best.

#### Peaks and valleys: Equation 5.3

**MIRIAM:** SWR prevents the decline, but its curves show peaks and valleys, how often set by the hyperparameters. The root cause, the thesis argues, is impingement: units can zero new outgoing weights, weights can't. So it measures the jolt directly.

**PROF. ADEYEMI:** Equation 5.3, the difference in loss. Take t, a step where reinitialization happens, with a mini-batch of m pairs. In words: the difference in loss is defined as the sum, over the next step's mini-batch, of the loss under the parameters theta at t plus one, minus the sum, over step t's mini-batch, of the loss under theta at t.

**LUCÍA:** Symbols. Theta-t: the parameters at step t, and, by Algorithm 5's ordering, the loss at step t is measured before that step's update and reset. Theta-t-plus-one: the parameters after the update and the reset. First sum: total loss on the next mini-batch, after the reset. Second sum: total loss on the reset step's batch, before it.

**PROF. ADEYEMI:** Interpretation. With no reset and no plasticity loss, this would be negative, because loss usually falls step to step. With a reset, negative means the reset went unnoticed. Positive means it disturbed the loss. Larger means more impingement. Toy: 6.0 before, 6.4 after, difference plus 0.4, the reset pushed loss up. Had it read 5.9, minus 0.1: unnoticed. Measured on the large-network runs from Figures 5.4a and 5.5a.

#### Table 5.2, read by Dr. Park

*[TAPE: Dr. Sun-Hee Park]*

**DR. PARK:** Table 5.2. Thirty-run averages; standard errors in parentheses, omitted in some columns because they're too small to affect the comparisons. Columns: average difference in loss; weights reinitialized per task, percent; per step, percent; average online accuracy, percent.

**DR. PARK:** SWR first-order, threshold, resample: 0.0788, standard error 0.0011; 48.58 per task; 49.78 per step; 92.79. SWR first-order, proportional, resample: 0.1506, standard error 0.0022; 19.52; 40.00; 92.42. SWR random, proportional, resample: 0.9904, standard error 0.0034; 9.76; 20.00; 91.99. SWR random, proportional, mean: 0.1246, standard error 0.0009; 9.77; 5.00; 92.62. Continual backprop: minus 0.0022, standard error 0.0002; 22.80; 1.20; 92.43. ReDo: 0.0044, standard error 0.0003; 25.44; 1.25; 92.49. The thesis spells it "Redo" in this table.

**DR. PARK:** Continual backprop negative, ReDo slightly positive, every SWR setting far higher, 0.0788 to 0.9904. But I wouldn't sign off on "weights are more disruptive" from this table. Tell me why.

**DEV:** Per step. SWR resets 5% to almost 50% at once. The unit methods reset 1.2 and 1.25%.

**DR. PARK:** That's the confound. The per-task totals are comparable; the per-step doses are not. A big jolt could come from how much you reset at once, not from resetting weights as such. So you match the dose.

**LUCÍA:** Proportional pruning makes that exact. Rho equal to 0.012 resets 1.2% per step. Tau equal to 100 gives 2,000 over 100, twenty steps per task: twenty times 1.2% is 24% per task. Right alongside continual backprop and ReDo.

#### Table 5.3, the dose matched

**DR. PARK:** Table 5.3. Same conventions; an asterisk on accuracy marks failure to maintain plasticity. SWR first-order, proportional, mean: 0.1850, standard error 0.0012; 24.00 per task; 1.20 per step; 88.84, asterisk. SWR first-order, proportional, resample: 0.1793, standard error 0.0004; 24.00; 1.20; 90.45, asterisk. SWR random, proportional, mean: 0.1851, standard error 0.0003; 24.00; 1.20; 92.39. SWR random, proportional, resample: 0.1872, standard error 0.0003; 24.00; 1.20; 91.90. Continual backprop and ReDo unchanged: minus 0.0022 and 0.0044.

**DR. PARK:** Three readings. One: same dose, and every SWR setting is still positive, 0.1793 to 0.1872. Dozens of times ReDo's 0.0044, opposite in sign to continual backprop. Two: mean reinitialization, 0.1850 and 0.1851, did not impinge less than resample, 0.1793 and 0.1872. Setting new weights to zero did not deliver the protection hoped for. Three: on this forced schedule, both first-order settings failed, 88.84 and 90.45; both random settings held, 92.39 and 91.90.

**DR. PARK:** Verdict: even with the amount matched, weight reinitialization impinges on the loss more than unit reinitialization. The thesis's explanation: units can be muted by zeroing their outgoing weights; weights have no such mechanism. I'd sign that.

**UNIT 47:** Told you. Zero outputs. Nobody noticed me.

**NORA:** And every weight reset, I noticed.

**MIRIAM:** The book's six-way scorecard: weights win on accuracy and on working in any architecture. Units win on disturbing the output less, on steadier training, and on built-in protection for new parts. Higher performance; less stability.

*[MUSIC: "Still Learning" theme, a short sting]*

*[TIMECODE 00:46:50]*

### Act Four — Alarms, Not Causes

**MIRIAM:** Episode Four's four symptoms: if they were the cause, fixing them would suffice. Section 5.5 tests that in one system where methods tied, two where they differed.

*[SFX: ledger bell]*

**THE AUDITOR:** Two slips in the list itself. The section 5.5 text speaks of "a decrease in the percent of dead units." Thesis Chapter 3 and Figures 5.9 to 5.11 show the share of dead units rising as plasticity is lost. Read it as a rise. And the text says stable rank of the "output layer"; thesis section 3.3 defines the representation layer as the last hidden layer, and that is what is measured.

*[SFX: ledger closes]*

**LUCÍA:** So, corrected: a rise in dead units, called frozen units in the figures, units that output the same thing for every input. An increase in average weight magnitude. A decrease in average gradient magnitude. And a fall in the stable rank of the representation layer: roughly, how many independent directions its outputs use. The book's analogy: idle staff, inflated budgets, slower decisions, fewer distinct skills in use. Each appears in a declining firm. None is the decline itself.

**LUCÍA:** Figure 5.9, the large network from Figure 5.5a. Five panels, task number across, 30-run averages with standard-error bands. (a) accuracy. (b) percent frozen units, at the start of each task. (c) average weight magnitude, start of each task. (d) average gradient magnitude, per mini-batch. (e) stable rank of the representation layer, maximum 100. Blue SWR, green ReDo, yellow continual backprop, orange shrink-and-perturb, black base. Everyone maintains plasticity at similar accuracy, and every method keeps every symptom healthy. Frozen units: base climbs to about 55%, the others stay near zero. Weight magnitude: base about 0.2; continual backprop and ReDo about 0.05, SWR about 0.06, shrink-and-perturb about 0.03. Gradient magnitude doesn't fall. Stable rank: base drops to about 25; the reset algorithms stay around 85 to 90, shrink-and-perturb about 76. Read off the chart: healthy learning, healthy symptoms.

*[SFX: ledger bell]*

**THE AUDITOR:** Next, the Tanh system. The thesis text points to the "left pane" of Figure 5.7b. The Tanh results are in the right pane.

*[SFX: ledger closes]*

**LUCÍA:** Figure 5.10, Tanh. Same panels and colors. Accuracy 82 to 92; frozen units 0 to 25%; weight magnitude about 0.04 to 0.12; gradient magnitude 0.0035 to 0.0055; stable rank 30 to 90, maximum 100. SWR has the highest accuracy, about 91.5%. Yet its stable rank declines, from about 90 to about 70, and its weight magnitude, about 0.07, sits above ReDo and continual backprop at about 0.05 to 0.055. By two of four measures, the best learner looks least healthy. Its gradient magnitude rose and stayed highest.

*[SFX: ledger bell]*

**THE AUDITOR:** Two more. For the small network with layer norm, the section 5.5 text points to "Figure 5.5c." The description, small network, layer norm, unit methods failing, matches Figure 5.5d. And the captions: Figures 5.10 and 5.11 both read "Correlates of plasticity loss in the Tanh network setting." Identical. Figure 5.11 is the small network with layer norm. You can tell from the body text, from its 70 to 90% accuracy axis, and from a stable rank whose maximum is 10, matching 10 units per layer.

*[SFX: ledger closes]*

**LUCÍA:** Figure 5.11. Accuracy 70 to 90; frozen 0 to 8%; weight magnitude 0.1 to 0.7; gradient 0.003 to 0.008; stable rank 5 to 10. SWR stable at about 90%. ReDo and continual backprop decline to about 81%, with falling gradient magnitude and falling stable rank. SWR's gradient magnitude and stable rank also decrease, far less drastically. Continual backprop's weight magnitude grows to about 0.45, while its frozen-unit share stays small.

*[TAPE: Dr. Sun-Hee Park]*

**DR. PARK:** So, three counterexamples. Continual backprop lost plasticity despite few frozen units, Figure 5.11b. SWR kept plasticity despite falling gradient magnitude, 5.11d. And in Tanh, SWR kept plasticity despite relatively large weights, 5.10c, and declining stable rank, 5.10e. None of the four correlates is a perfect predictor. They're diagnostic tools; a rapid deterioration could signal trouble. They are not the root cause.

**CAPT. AL-HARBI:** The book's aviation analogy. A rising engine temperature trend warrants inspection, but you would not certify an engine on temperature alone, nor ground one for it alone. The trend is a flag, not a finding. Where it breaks: we know the physics behind temperature; here the root cause is still unknown.

#### Future work: two shortfalls that pull against each other

**MIRIAM:** Section 5.6 names two shortfalls. First, persistent reinitialization: fresh weights don't get enough time to grow and are picked again and again, the Table 5.1 evidence. Two fixes are proposed. A maturity threshold, as in continual backprop: only weights in place long enough can be selected, at the cost of a third hyperparameter alongside tau and rho. Or a reinitialization method that assigns larger values, since under both informed utilities a larger weight has higher utility and starts safer from re-selection.

**LUCÍA:** Which worsens shortfall two: large impingement, how much a reset changes the output, and therefore the loss. Large impingement makes learning, and performance, unstable. One remedy: reset fewer weights more often. One weight every step likely disturbs the output less than 100 weights every 100 steps. But that likely increases persistent reinitialization. So the best fix probably tackles both at once.

**CAPT. AL-HARBI:** Rotating one crew member per shift disrupts operations less than swapping a whole crew weekly, but the newest person keeps being the one rotated out before learning the job. Where it breaks: crews remember. A reset weight forgets everything.

**MIRIAM:** Two extensions. Better components: the innovations reviewed for unit reinitialization in thesis Chapter 4 apply to weights too. And sparse networks, where most connections are off. SWR closely parallels dynamic sparse training, cited as Mocanu and colleagues, 2018, and Evci and colleagues, 2020: both have a utility, a pruning criterion and a reinitialization method, and both modify connections periodically. Dynamic sparse training keeps a target sparsity by pruning a share of active connections and reviving the same number of inactive ones. To adapt SWR: set a target sparsity, prune active connections, reinitialize inactive ones. The book draws this as a four-branch tree: two shortfalls pulling against each other, two branches that extend rather than repair.

#### The four families

*[TAPE: Dr. Elena Marchetti, recorded in a university library reading room]*

**DR. MARCHETTI:** Four families: architectural modifications, regularization, parameter perturbation, selective reinitialization. Architecture: Abbas and colleagues, 2023, concatenated ReLU, active on both sides of its input, in deep RL agents learning a sequence of Atari games. Nikishin and colleagues, 2023, plasticity injection: freeze old parameters, add new ones; it identified plateaus caused by plasticity loss in deep RL agents on Atari and helped remedy them. Lyle and colleagues, 2024a, layer norm on pre-activations plus weight rescaling, improving deep RL agents. Lee and colleagues, 2024, the hare-and-tortoise network, two copies learning at different timescales, in continual supervised learning with residual networks and vision transformers.

**DR. MARCHETTI:** Regularization constrains the weights so solutions have desirable properties. Dohare and colleagues, 2023, the author among them: simple L2, on Permuted MNIST. Kumar and colleagues, 2024: regenerative regularization, pulling parameters toward their initial values instead of zero, on more continual supervised problems than standard L2. Elsayed and colleagues, 2024: weight clipping below a preset threshold, in continual supervised learning and against policy collapse in deep RL. Chung and colleagues, 2024: regularization toward orthogonal matrices, preventing stable-rank decline and improving deep RL agents. Lewandowski and colleagues, 2025: spectral regularization, keeping each layer's largest singular value near one, in residual networks and vision transformers on class-incremental tasks.

*[SFX: ledger bell]*

**THE AUDITOR:** A naming wobble. The thesis calls Kumar and colleagues' method "regenerative regularization," then, one sentence later, "regenerative reinitialization." Same method.

*[SFX: ledger closes]*

**DR. MARCHETTI:** Perturbation: Ash and Adams, 2020, shrink-and-perturb, originally for warm-starting, pre-training on part of a dataset, then the full set, before that loss of performance was recognized as plasticity loss. Highly effective in multiple settings, per Dohare and colleagues, 2024, and Kumar and colleagues, 2024. And Elsayed and Mahmood, 2024: noise added according to utility, in continual supervised learning and against policy collapse. Selective reinitialization regenerates initial conditions by sporadically resetting parts of the network: Hernandez-Garcia and colleagues, 2025, the first study at the level of weights, across several continual supervised problems and many architectures; and Hofmann and colleagues, 2025, weight rejuvenation, where small weights have a high probability of being reset, developed in parallel inside an architecture with other biologically inspired changes, giving higher accuracy with fewer updates in image classification. Not designed against plasticity loss, but these results suggest it may maintain plasticity too.

**MIRIAM:** And the families combine. In an ant locomotion RL task, continual backprop plus L2 beat either alone, Dohare and colleagues, 2024. Lee and colleagues, 2023, combined L2, layer norm, layer reinitialization and concatenated ReLU in deep RL agents. That matters because of the replay ratio: parameter updates per environment step. Raising it makes agents more sample efficient, learning more per interaction, but high replay ratios have been seen to cause poor performance through plasticity loss, D'Oro and colleagues, 2023. Lee and colleagues' combination made the agent more robust to large replay ratios than any single approach.

#### The verdict

*[MUSIC: "Still Learning" theme, low]*

**MIRIAM:** Section 5.7. Of twelve settings, no weight-magnitude setting maintained plasticity; every random setting did, with threshold and proportional equivalent; first-order maintained plasticity with both criteria, as long as resample was used. Against units, across sizes, activations, layer norm and optimizers, SWR was equally or more effective, and in large networks the gap shrank sharply. Perhaps, with large enough networks, these algorithms perform comparably. Two challenges remain: impingement, which made performance unstable, and persistent reinitialization, likely because reset weights weren't given time to grow.

**THE THESIS:** From the thesis, adapted. Across all evaluations, the setting that consistently outperformed the others was first-order utility with threshold pruning and resample reinitialization. Unless stated otherwise, it is what the rest of the thesis means by selective weight reinitialization.

*[SFX: ledger bell]*

**THE AUDITOR:** Last entry. It was beaten once, by random utility with proportional pruning and mean reinitialization, in the 100-unit Leaky ReLU network. The thesis points to Figure 5.7b; the head-to-head of the SWR settings is in Figure 5.7a.

*[SFX: ledger closes]*

**NORA:** A little jolt now and then. I keep learning.

### Three Things to Remember

**LUCÍA:** One. Selective weight reinitialization resets individual weights, so it works the same in any architecture. Its best setting, first-order utility, threshold pruning, resample, matched or beat unit resetting in every fully-connected system tested, and is the default from here on.

**DEV:** Two. Utilities that contain the weight's size keep re-selecting the same small, freshly reset weights. That's persistent reinitialization; overlap above 90% went with failure. Random utility dodges it.

**MIRIAM:** Three. Weights jolt the output more than units, even with the dose matched, Tables 5.2 and 5.3, and setting new weights to zero doesn't fix it. And the four symptoms are alarms, not causes.

### Check Your Understanding

**DEV:** One. Why can one huge utility get most of a matrix reset under threshold pruning?

*[BEAT]*

**DEV:** It raises the mean, which raises the cut-off rho times u-bar.

**LUCÍA:** Two. Why does tau above 2,000 make waves?

*[BEAT]*

**LUCÍA:** Resets skip some tasks and land at different points in others; mid-task resets dip most.

**DEV:** Three. Weight magnitude, threshold, resample had overlap 0.16. Why did it fail?

*[BEAT]*

**DEV:** It reset only 0.0038% of weights per task. Too little, not too repetitive.

**MIRIAM:** Four. What did Table 5.3 change about Table 5.2?

*[BEAT]*

**MIRIAM:** It matched the dose, 1.2% per step, 24% per task, and SWR still impinged far more.

**LUCÍA:** Five. Where did a method lose plasticity while looking healthy?

*[BEAT]*

**LUCÍA:** Small network with layer norm: continual backprop, few frozen units, Figure 5.11b.

**DEV:** Six. Why might larger new weights help one shortfall and hurt the other?

*[BEAT]*

**DEV:** Higher utility, less re-selection; bigger value, more impingement.

**MIRIAM:** Seven. How would you keep a network 90% sparse with SWR, and what is the replay ratio?

*[BEAT]*

**MIRIAM:** Fix sparsity at 90%, prune active connections, reinitialize the same number of inactive ones. Replay ratio: updates per environment step; raising it helps sample efficiency but has been seen to cause plasticity loss.

### Credits and Next Time

*[MUSIC: "Still Learning" theme — low cello pulse, slow piano]*

**MIRIAM:** *Still Learning* is written and produced by the Still Learning team. Narration, Miriam Okafor. Explainers, Dev Raman and Lucía Ferreira. Graham Asante as The Thesis, Nell Varga as Nora, Ruth Kellerman as The Archivist, Samir Haddad as The Auditor, and the Units ensemble. The thesis is © Juan Fernando Hernandez Garcia, 2026, licensed CC BY 4.0, adapted here with credit. Code at github.com/JFernando4/plasticity-via-reinit. All experts and actors in this series are fictional.

**MIRIAM:** Everything so far has lived in fully-connected networks. Next time, Part IV begins: convolutional networks and Continual ImageNet. Episode Eight: The Picture Problem.

*[MUSIC: theme resolves]*

### Show Notes

**Thesis sections:** Chapter 5 opening; §5.1 Motivation; §5.2 Selective reinitialization of weights; §5.3 Effectiveness; §5.4 Weights vs units; §5.5 Correlates; §5.6 Future work and alternatives; §5.7 Conclusion. Book Chapters 16–18.

**Equations**

Equation 5.1 — weight magnitude utility:

```latex
\mathbf{U}[i, j] = \left| \mathbf{W}[i, j] \right|
```

Unnumbered — loss difference from removing one weight:

```latex
\ell(\hat{\boldsymbol{y}}, \boldsymbol{y} \mid \mathbf{W}_l[i, j] = 0) - \ell(\hat{\boldsymbol{y}}, \boldsymbol{y})
```

Unnumbered — first-order Taylor approximation:

```latex
\ell(\hat{\boldsymbol{y}}, \boldsymbol{y} \mid \mathbf{W}_l[i, j] = 0) - \ell(\hat{\boldsymbol{y}}, \boldsymbol{y}) \approx \ell(\hat{\boldsymbol{y}}, \boldsymbol{y}) + \frac{d\ell(\hat{\boldsymbol{y}}, \boldsymbol{y})}{d\mathbf{W}_l[i, j]}\left(0 - \mathbf{W}_l[i, j]\right) - \ell(\hat{\boldsymbol{y}}, \boldsymbol{y}) = -\mathbf{W}_l[i, j] \cdot \frac{d\ell(\hat{\boldsymbol{y}}, \boldsymbol{y})}{d\mathbf{W}_l[i, j]}
```

Unnumbered — expected first-order utility:

```latex
\mathbf{U}_l[i, j] = \left| \mathbf{W}_l[i, j] \cdot \mathbb{E}_p\left[ \frac{d\ell(f_{\boldsymbol{\theta}}(\mathbf{x}), \boldsymbol{y})}{d\mathbf{W}_l[i, j]} \right] \right|
```

Equation 5.2 — first-order utility (mini-batch estimate):

```latex
\mathbf{U}_l[i, j] = \left| \mathbf{W}_l[i, j] \cdot \frac{1}{m} \sum_{k=1}^{m} \frac{d\ell(f_{\boldsymbol{\theta}}(\mathbf{x}_k), \boldsymbol{y}_k)}{d\mathbf{W}_l[i, j]} \right|
```

Unnumbered — proportional pruning count:

```latex
\kappa = \text{Integer Part}(|\mathbf{U}| \cdot \rho) + \text{Bernoulli}\big(\text{Fractional Part}(|\mathbf{U}| \cdot \rho)\big)
```

Unnumbered — threshold pruning set:

```latex
\boldsymbol{I} = \{(i, j) \mid \mathbf{U}[i, j] \le \rho \cdot \overline{u}\}
```

Unnumbered — reinitialization overlap:

```latex
\text{Reinitialization Overlap} \doteq 100 \cdot \frac{|\boldsymbol{I}' \cap \boldsymbol{I}|}{|\boldsymbol{I}|}
```

Equation 5.3 — difference in loss across a reset:

```latex
\text{Difference in Loss} \doteq \sum_{i=1}^{m} \ell\big(f_{\boldsymbol{\theta}_{t+1}}(\mathbf{x}_{t+1,i}), \mathbf{y}_{t+1,i}\big) - \sum_{j=1}^{m} \ell\big(f_{\boldsymbol{\theta}_{t}}(\mathbf{x}_{t,j}), \mathbf{y}_{t,j}\big)
```

**Algorithm and figures**

- Algorithm 5 — Selective weight reinitialization: every τ updates, in each matrix and vector, measure utility, select with ρ, reset.
- Book diagram — unit vs weight reinitialization: one unit and all its connections vs scattered individual connections.
- Book diagram — proportional vs threshold pruning: fixed share vs everything under ρ·ū; one outlier sweeps in most weights.
- Figure 5.1 — Resample: first-order and random maintain plasticity under both criteria; weight magnitude fails; waves in panel a.
- Figure 5.2 — Mean: magnitude-based utilities decline; first-order + threshold collapses below 82% by about task 700; random improves.
- Figure 5.3 — τ capped at 1,024 (10 runs): waves shrink; first-order + threshold + mean still collapses near task 400.
- Figure 5.4 — Four SWR settings in large, large + layer norm, small, small + layer norm; first-order, threshold, resample on top.
- Figure 5.5 — SWR vs ReDo, continual backprop, shrink-and-perturb; SWR maintains plasticity in all four systems.
- Figure 5.6 — Adam and SGD with momentum; all reset methods maintain plasticity.
- Figure 5.7 — Leaky ReLU and Tanh; random, proportional, mean best with Leaky ReLU; SWR clearly ahead with Tanh.
- Figure 5.8 — Extra large network (1,000 units); methods converge near 94.3–94.5%; SWR drops every 16,384 updates.
- Book diagram — trade-offs on six criteria.
- Figure 5.9 — Correlates, large network: all reset methods keep all four symptoms healthy.
- Book diagram — four directions of future work.
- Figure 5.10 — Correlates, Tanh: best learner shows falling stable rank and larger weights.
- Figure 5.11 — Correlates, small network + layer norm (caption duplicates 5.10's): continual backprop fails with few frozen units.

**Table 5.1 — Reinitialization summaries (30 runs; bold = maintained plasticity)**

| Utility | Criterion | Method | % reinit per task | Avg overlap | Avg online accuracy |
| --- | --- | --- | --- | --- | --- |
| First-order | Threshold | Resample | 48.58 | 56.93 | **92.79** (0.002) |
| First-order | Threshold | Mean | 94.04 | 98.39 | 85.39 (0.38) |
| First-order | Proportional | Resample | 19.52 | 55.22 | **92.42** (0.003) |
| First-order | Proportional | Mean | 78.12 | 92.67 | 90.42 (0.11) |
| Weight magnitude | Threshold | Resample | 0.0038 | 0.16 | 85.66 (0.01) |
| Weight magnitude | Threshold | Mean | 22.52 | 94.58 | 85.78 (0.02) |
| Weight magnitude | Proportional | Resample | 19.52 | 97.06 | 89.46 (0.02) |
| Weight magnitude | Proportional | Mean | 19.52 | 97.03 | 90.88 (0.008) |
| Random | Threshold | Resample | 19.53 | 5.00 | **91.97** (0.001) |
| Random | Threshold | Mean | 9.76 | 5.00 | **92.62** (0.002) |
| Random | Proportional | Resample | 9.76 | 19.96 | **91.99** (0.001) |
| Random | Proportional | Mean | 9.77 | 5.00 | **92.62** (0.002) |

**Table 5.2 — Change in loss after a reinitialization step**

| Method | Avg difference in loss | % per task | % per step | Accuracy (%) |
| --- | --- | --- | --- | --- |
| SWR First-order, Threshold, Resample | 0.0788 (0.0011) | 48.58 | 49.78 | 92.79 |
| SWR First-order, Proportional, Resample | 0.1506 (0.0022) | 19.52 | 40.00 | 92.42 |
| SWR Random, Proportional, Resample | 0.9904 (0.0034) | 9.76 | 20.00 | 91.99 |
| SWR Random, Proportional, Mean | 0.1246 (0.0009) | 9.77 | 5.00 | 92.62 |
| Continual Backprop | −0.0022 (0.0002) | 22.80 | 1.20 | 92.43 |
| ReDo | 0.0044 (0.0003) | 25.44 | 1.25 | 92.49 |

**Table 5.3 — Change in loss, amount matched (asterisk = failed to maintain plasticity)**

| Method | Avg difference in loss | % per task | % per step | Accuracy (%) |
| --- | --- | --- | --- | --- |
| SWR First-order, Proportional, Mean | 0.1850 (0.0012) | 24.00 | 1.20 | 88.84* |
| SWR First-order, Proportional, Resample | 0.1793 (0.0004) | 24.00 | 1.20 | 90.45* |
| SWR Random, Proportional, Mean | 0.1851 (0.0003) | 24.00 | 1.20 | 92.39 |
| SWR Random, Proportional, Resample | 0.1872 (0.0003) | 24.00 | 1.20 | 91.90 |
| Continual Backprop | −0.0022 (0.0002) | 22.80 | 1.20 | 92.43 |
| ReDo | 0.0044 (0.0003) | 25.44 | 1.25 | 92.49 |

**Auditor's ledger:** §5.3 first-order text vs figures; Fig 5.5 caption vs text; 16,384 is τ; dead units rise; representation layer, not output; Tanh is the right pane; 5.5d not 5.5c; Figs 5.10/5.11 duplicate caption; 5.7a not 5.7b; regenerative regularization = reinitialization.
