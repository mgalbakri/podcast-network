---
number: 6
title: Recycling Neurons
slug: 06-recycling-neurons
summary: 'The cure arrives: find the least useful neurons and give them a fresh start. Continual backprop and ReDo, five ways to score a neuron, the Tanh failure that fooled the scorekeepers, and the surprisingly hard question of what a neuron even is.'
coverage: 'Covers book chapters 12–15 (thesis §4.2–4.6): Algorithms 1–4, Equations 4.1–4.7, Figures 4.1–4.9.'
interests:
- ai
- math
estimatedMinutes: 65
status: in-production
---

### Cold Open

*[MUSIC: "Still Learning" theme — low cello pulse, slow piano]*

*[TIMECODE: 00:00]*

**MIRIAM:** When we left Nora, she had been through hundreds of tasks, each learned a little less well than the last.

*[SFX: shuffling cards]*

**NORA:** Another shuffle. Fine. It's just that adjusting takes more out of me now. Some of my units don't answer when I call.

*[SFX: rising tone that thins and flattens]*

**MIRIAM:** Last episode we followed forty years of warnings, and the thesis's argument: if parts of a network wear out, give those parts a fresh start. Tonight the cure arrives, as a procedure with dials, numbers and test results.

*[MUSIC: theme fades under]*

**MIRIAM:** Nora is about to be enrolled in what we've been calling her maintenance programme.

*[SFX: a soft service-bay buzzer. Footsteps on a metal floor.]*

**NORA:** A what?

**MIRIAM:** Someone walks your layers with a clipboard, scores every unit, and recycles the lowest.

*[SFX: click and hum]*

**UNIT 47:** Hey. What just happened? I feel... new. My incoming wires are all different. And nobody downstream is listening to me.

**UNIT 12:** Welcome back, 47. You were recycled. Don't take it personally.

**UNIT 88:** Don't look at me. I'm the busiest unit in this layer. I'm lit up on every input. They'll never touch me.

*[BEAT]*

**MIRIAM:** Under the most popular scoring rule, Unit 88 is right. By the end of this episode you'll know why that's a disaster, and what fixed it.

**MIRIAM:** Four acts: machinery, scorecards, test flights, and the question of what a unit is.

*[MUSIC: "Still Learning" theme swells]*

**MIRIAM:** From the series STILL LEARNING, I'm Miriam Okafor. This is Episode Six: Recycling Neurons.

*[MUSIC: title sting, then out]*

### Act One — Three Dials

*[MUSIC: explainer bed — plucked bass, light percussion]*

*[TIMECODE: 03:10]*

**DEV:** Lucía. Before we recycle anything: what exactly is a unit?

**LUCÍA:** One computational node in a fully-connected network, with its own incoming weights, a bias and a nonlinear activation function. Selective reinitialization can work at several levels of a network; thesis Chapter 4, our whole episode, works at the unit level in fully-connected networks. The unit computes h equals g of, w dot x, plus b. x is the input vector: d numbers from the previous layer or the raw data. w is the unit's incoming weights, one per input. w dot x, the dot product: multiply each input by its weight and add them up. b, the bias, one number that shifts the result. g, the activation function, ReLU or Tanh from Episode Two. And h, the output, called the unit's activation. Downstream units use h as an input, and that's how the network builds increasingly intricate nonlinear functions.

**DEV:** Weigh, nudge, squash. And reinitializing it?

**LUCÍA:** New values for its weights, on both sides: its incoming weights from the previous layer, and its outgoing weights, which carry h to the units in the next layer.

**DEV:** *Analogy*, from the book: a unit is a junior analyst. Incoming weights are how much attention they pay to each source report. The activation is their summary. Outgoing weights are how much each manager above relies on that summary. Reinitializing means retraining the analyst from scratch and resetting how much the managers trust them.

**LUCÍA:** Where it breaks: a retrained analyst keeps their memories. A reinitialized unit keeps nothing.

*[MUSIC: bed out]*

**MIRIAM:** Two algorithms sit at the centre of this episode: continual backpropagation, continual backprop for short, and ReDo. They were proposed independently. The thesis's first move is to show they belong to one family.

**THE THESIS:** *(from the thesis, adapted)* Continual backprop and ReDo are members of a broader family of selective unit reinitialization algorithms. These run ordinary backpropagation and periodically add a reinitialization step, in which units are scored, some are selected for pruning, and those are reinitialized.

*[SFX: three heavy rotary clicks]*

**LUCÍA:** The family has exactly three components. Dial one, the pruning criterion: how many units to prune, and which. Dial two, the utility measure: a single number, a scalar, for each unit, which guides the criterion. Dial three, the reinitialization method: what values the new units' weights get. Every experiment in Act Three turns one of these dials. Name the dial and you can read every plot.

*[TIMECODE: 06:00]*

**DEV:** Audio walkthrough, Algorithm 1, "Selective unit reinitialization." Two boxes. Inputs: a fully-connected network plus a choice for each dial. The top box is ordinary learning, the first four lines in the loop: receive a mini-batch, a small set of training examples; compute predictions and losses; compute gradients with respect to the parameters; update with SGD, stochastic gradient descent. The shaded box loops over layers: measure the utility of every unit; use the pruning criterion and those utilities to decide how many units to prune; set new input and output weights for the pruned units with the reinitialization method. An arrow closes the loop to the next training step.

**MIRIAM:** The thesis says the biggest difference between the two algorithms is how they prune. So, pruning.

**LUCÍA:** Formally, a pruning criterion receives a vector of utilities, bold u, one real number per unit in the layer, and returns a set of indices, bold I, the units to prune. Both algorithms' criteria have hyperparameters controlling how fast units are pruned.

**DEV:** Dumb question. When I prune a hedge, the branch is gone. Is the unit gone?

**LUCÍA:** No, and the thesis says so. Pruning normally means permanently removing units and connections. Here a "pruned" unit is immediately reinitialized and stays. It's really a selection criterion.

**THE THESIS:** *(from the thesis, adapted)* The word "pruning" is kept on purpose, because these criteria share many similarities with those in the neural network pruning literature, and the term preserves that link. Pruning a unit means selecting it for reinitialization.

*[BEAT]*

**LUCÍA:** Continual backprop's criterion: a steady replacement rate with a grace period. It replaces low-utility units at a fixed rate, but only units old enough, because a new unit needs time to grow its connections and prove itself. So it tracks each unit's age in parameter updates. The age vector, a sub t comma l: one counter per unit in layer l, starting at zero, up by one every time step t. The maturity threshold M, a whole number zero or larger: a unit is protected until its age exceeds M. And the replacement rate rho, between zero and one: the fraction of mature units replaced per step.

**LUCÍA:** The count of mature units: m sub t comma l equals the sum, over i from one to d sub l, of the indicator that a sub t comma l of i is greater than M. d sub l is the layer size; a sub t comma l of i is unit i's age. The indicator, a blackboard-bold one, equals one if the condition is true and zero otherwise. So m is the head-count of units older than M.

**DEV:** And you cull rho times m of them.

**LUCÍA:** Usually not a whole number. You can't prune 0.3 of a unit. So the algorithm keeps a cumulative replacement rate, kappa: kappa sub t comma l equals kappa sub t minus one comma l, plus rho times m sub t comma l. Kappa is the pruning credit accumulated in the layer; the previous kappa is credit carried over; rho times m is this step's fractional allowance. When kappa reaches one, prune c units, c the floor of kappa, its integer part rounded down: the c mature units with lowest utility. Subtract c from kappa, keep the remainder, and reset the pruned units' ages to zero for a fresh grace period.

*[SFX: soft chime]*

**LUCÍA:** Toy Box. A layer of ten units, all older than M. Rho equals 0.05; invented numbers. Dev, you're the kappa jar. Step one: ten mature, kappa from 0.00, plus 0.05 times 10, makes 0.50.

**DEV:** Half full. Nobody goes.

**LUCÍA:** Step two: ten mature, 0.50 plus 0.50 is 1.00. c is one.

*[SFX: click and hum]*

**LUCÍA:** The lowest-utility mature unit is reset; kappa carries 0.00; its age goes to zero. Step three: only nine mature. Plus 0.45. No pruning; carry 0.45.

**DEV:** One unit every two steps, on average.

**LUCÍA:** And never more than the replacement rate allows.

*[TAPE: Capt. Rashid Al-Harbi, retired airline training captain and maintenance director, recorded in a hangar office. Distant ground power units.]*

**CAPT. AL-HARBI:** *Analogy.* An airline retires a fixed small share of its eligible fleet each year, always the poorest performers, and never touches an aircraft in its first M hours of service. Kappa is the planning office carrying fractions of an aircraft into next year's budget. Where it breaks: the slot is refilled instantly with a new airframe, and the criterion judges only by the score you hand it. Give it a bad score and it retires the wrong airplane, every time, with perfect discipline.

**MIRIAM:** Hold on to that sentence.

*[TAPE: ends]*

*[TIMECODE: 12:30]*

**LUCÍA:** Notation for the pseudocode. Capital L is the number of layers. Parameters start as theta zero, the matrices W zero comma zero through W zero comma L, and are theta t after step t, the set SGD updates. W sub t comma l, with d sub l plus one rows and d sub l columns, holds layer l's output weights: row j, column i is the weight from unit i to unit j in the next layer. So unit i's input weights are row i of the previous matrix, W sub t comma l minus one, i, colon; its output weights are column i of this one, W sub t comma l, colon, i. Biases omitted.

**DEV:** Audio walkthrough, Algorithm 2, "Selective unit reinitialization with continual backpropagation pruning," criterion lines in blue. One: inputs, the network, a utility measure, a reinitialization method, M and rho; all ages and every kappa start at zero. Two: each step, receive a mini-batch, compute predictions, losses, gradients with respect to theta t minus one, update with SGD. Three: per layer, measure utilities, then add one to every age, a plus a bold one, a vector of ones. Four: count mature units, add rho times m to kappa, start an empty list I. Five: if kappa is at least one, take c, its integer part; put the c lowest-utility mature units in I; subtract c; reset their ages. Six: for each unit in I, new input weights, row i, and output weights, column i, by the reinitialization method.

*[BEAT]*

**LUCÍA:** ReDo's criterion: a periodic sweep below a relative bar. Two hyperparameters. The reinitialization frequency tau: pruning only every tau updates, when t is a multiple of tau. And the reinitialization threshold, also called rho, zero or more.

**DEV:** Rho again?

**LUCÍA:** Same letter, different meaning, and the book flags it. ReDo's rho is a fraction of the layer's average utility. The average: u-bar sub l equals one over d sub l times the sum, over all d sub l units, of u sub l of i, unit i's utility. Then: bold I equals the set of all i such that u sub l of i is at most rho times u-bar sub l. With rho of 0.1, a unit goes if it scores at most ten percent of the layer average.

**DEV:** Audio walkthrough, Algorithm 3, "Selective unit reinitialization with ReDo pruning," blue lines again. One: inputs, network, utility measure, reinitialization method, tau and rho. Two: each step, observe a mini-batch, predictions, losses, gradients with respect to theta t minus one, SGD. Three: per layer, measure utilities, empty list I. Four: only if t is a multiple of tau, compute u-bar and put in I every unit at or below rho times u-bar. Five: reset each unit in I, input and output weights. No ages, no jar. A calendar and a bar.

*[SFX: soft chime]*

**LUCÍA:** Toy Box: the outlier. Five coffee cups, one per unit. Utilities 0.9, 0.1, 0.5, 0.0, 1.5. Rho equals 0.5. Invented.

**DEV:** Sum 3.0, average 0.6, bar 0.3. Cups two and four go.

*[SFX: click and hum, twice]*

**LUCÍA:** Now: 10, 0.1, 0.1, 0.1, 0.1.

**DEV:** Sum 10.4, average 2.08, bar 1.04. Everyone but the superstar.

*[SFX: click and hum, four times in quick succession]*

**LUCÍA:** Four of five pruned. One outlier pulled the average up.

**CAPT. AL-HARBI:** *(on tape) Analogy.* ReDo is a periodic review graded on a curve: every tau days, anyone below a set fraction of the team average is replaced, however many that turns out to be. Where it breaks: a human reviewer would say "four of five, that can't be right." The algorithm doesn't blink.

*[TIMECODE: 17:40]*

**LUCÍA:** Comparing them. Similarities: both give new units updates before judgment, continual backprop through M, ReDo through tau. Both have a hyperparameter setting how many go per step: replacement rate and reinitialization threshold. Differences. Volume: continual backprop prunes at most a fraction proportional to the replacement rate; ReDo could prune all but one unit if an outlier inflates the sample average. Stopping: continual backprop never stops; ReDo may stop if every unit exceeds rho times the average, as long as rho is below one. At one or above, someone is always at or below the bar. And ReDo depends on how utilities are spread; continual backprop doesn't.

**DEV:** The book's diagram puts these side by side: steady rate-limited replacement on the left, scheduled sweep on the right, consequences shaded beneath.

### Act Two — The Scorecards

*[TIMECODE: 19:00]*

**MIRIAM:** Dial two: the utility measure. The thesis defines four in §4.2 and adds a random baseline in §4.3.

**LUCÍA:** Notation. X comma Y, tilde p: observations and labels sampled from p, the data-generating distribution, the true unknown process. Bold h sub l: the activations of layer l. Blackboard E sub p: the expected value, the average over all of p.

**LUCÍA:** One: activation utility, ReDo's measure. The mean absolute activation: u sub l equals E sub p of the absolute value of h sub l. One entry per unit; absolute value so negative and positive outputs both count as active; activations depend on X only, not the label. Since p is almost never available, estimate from m observations, Equation 4.1: u sub l equals one over m times the sum, t from one to m, of the absolute h sub t comma l, the activation on observation x sub t. An alternative is a moving average: u sub t comma l equals eta times u sub t minus one comma l plus one minus eta times the absolute h sub t comma l. Eta between zero and one: near one remembers the past, near zero tracks the latest. The thesis's experiments only use the mini-batch estimate, Equation 4.1, which it calls activation utility.

*[SFX: soft chime]*

**LUCÍA:** Toy: a ReLU unit outputs 0, 2, 0, 1 over a mini-batch of four. Utility 0.75. Moving average with eta 0.9, previous estimate 0.5, new activation 2: 0.45 plus 0.2, 0.65.

**LUCÍA:** Two: contribution utility, from the latest continual backprop, Dohare and colleagues, 2024. A quiet unit can matter if its outgoing weights are large. So: u sub l of i equals E sub p of the absolute h sub l of i, times the sum over j of the absolute W sub l of j comma i. Estimated, Equation 4.2: one over m times the sum over t of the absolute h sub t comma l of i, times that same sum of absolute outgoing weights. First factor, activation utility. Second, how loudly the next layer listens; W sub l of j comma i is the weight from unit i to unit j. The product is large only if the unit is active and listened to.

*[SFX: ledger bell]*

**THE AUDITOR:** Samir Haddad, the Auditor. A reading note on Equation 4.2. The thesis writes the sum's upper limit as d sub l. But W sub l has d sub l plus one rows. The sum is meant to cover every outgoing weight of unit i, as in Equation 4.3. I'll return when the same limit appears in Equation 4.7.

*[SFX: ledger bell, softer]*

**LUCÍA:** Toy: our unit, activation utility 0.75, outgoing weights 0.5, minus 1.0, 0.25. Absolute sum 1.75. Contribution: 1.3125.

**LUCÍA:** Three: weight magnitude utility, common in pruning, Blalock and colleagues, 2020. Activity ignored. Equation 4.3: u sub l of i equals the sum, j from one to d sub l plus one, the size of the next layer, of the absolute W sub l of j comma i. How much the unit feeds the next layer, regardless of how active it is. In our toy, 1.75.

*[TAPE: Prof. Tomás Adeyemi, optimization theory, recorded in his office. A radiator ticks.]*

**PROF. ADEYEMI:** Four: first-order utility, also from pruning. It asks how much the loss would change if the unit were switched off. Ell of f sub theta of x, y is the loss on example x, label y, f sub theta the network. y-hat is the prediction. Ell of y-hat, y, given h sub l of i equals zero, is the loss with unit i silenced. Equation 4.4: silenced loss minus normal loss. Zero means the unit is irrelevant for this observation.

**DEV:** Just compute it.

**PROF. ADEYEMI:** One extra forward pass per unit: prohibitively expensive. So approximate the silenced loss with a first-order Taylor approximation around the current activation, evaluated at zero. Silenced loss is approximately normal loss plus the derivative of the loss with respect to h sub l of i, the slope, times zero minus h, the move. Slope times move, like a tangent line; the book's Appendix B draws it.

**PROF. ADEYEMI:** Substitute: Equation 4.5. Line one: the two copies of the normal loss cancel. Line two: minus h times the slope of the loss with respect to h. Line three: minus the sum, j from one to d sub l plus one, of W sub l of j comma i times the derivative of the loss with respect to that weight. Convenient, because backprop already computes those weight gradients. The derivation of line three is in thesis Appendix B.

**PROF. ADEYEMI:** That's one observation. We want the expectation over p, and only units with no impact, in either direction, should be pruned. So take the absolute value: u sub l of i equals the absolute value of the sum over j of W sub l of j comma i times E sub p of the loss gradient for that weight. From a mini-batch, Equation 4.6: the same, with E sub p replaced by one over m times the sum over t of the gradient of ell of y-hat sub t, y sub t, the t-th prediction and target.

**DEV:** If removing a unit lowers the loss, isn't that a bad unit?

**PROF. ADEYEMI:** Let me ask you: if the loss moves a lot either way, does the network depend on it?

**DEV:** ...Yes. It's doing something.

**PROF. ADEYEMI:** That's the logic. Large change either way: useful. No change: prunable.

*[TAPE: ends]*

*[SFX: soft chime]*

**LUCÍA:** Toy: h equals 2, slope 0.3. Silencing moves h by minus 2; predicted change, minus 0.6. Utility 0.6. Same h, slope zero: utility zero.

**PROF. ADEYEMI:** *(on tape)* Activation utility asks "is it firing?" First-order asks "does the loss depend on it right now?" A unit stuck at a constant output fires strongly but carries no information about the input. It behaves like a bias term, and the loss may barely depend on it.

**MIRIAM:** Unit 88.

**LUCÍA:** Five, introduced in §4.3: random utility, uniform between zero and one. No information at all; it tests whether careful selection matters. The table of all five is in the show notes.

*[BEAT]*

*[TIMECODE: 28:00]*

**MIRIAM:** Dial three: the reinitialization method.

**LUCÍA:** Both algorithms default to the same one. For unit i in layer l: every incoming weight, W sub l minus one, i comma j, sampled from the initialization distribution. Every outgoing weight, W sub l, k comma i, set to zero. The input bias, unit i's entry of b sub l minus one, set to zero, because it relates only to this unit. The output bias unchanged, because it interacts with other units. Random inputs inject randomness, a form of random search over the loss landscape. Zero outputs mean the new unit can't immediately damage the loss. Only half the connections are reinitialized: hemi-reinitialization.

**CAPT. AL-HARBI:** *(on tape) Analogy.* Rotate out the weakest performers. New hires read every manual and briefing: that's random input weights. But they have zero sign-off authority: zero output weights. A new first officer reads everything and signs nothing on day one. Where it breaks: my new hires arrive trained, these arrive with a random education; and nobody grants sign-off here. It grows, slowly, by gradient. That slowness is the cost.

**LUCÍA:** The alternative, full reinitialization, samples the output weights from the initialization distribution too. It may raise the loss right after the reset, but could speed learning. The gradient of a unit's input weights is multiplied by its output weights. With outputs at zero, the first updates to the inputs are near zero. Random outputs remove that brake.

*[SFX: soft chime]*

**LUCÍA:** Toy: under hemi, input weight w's gradient is output weight times downstream error, zero times anything, zero; w waits for the outputs to grow. Under full, outputs of 0.4 and minus 0.2 let w learn at once. Illustrative.

**DEV:** The book's diagram: left, hemi, fresh inputs solid, zeroed outputs dashed; right, full, both sides fresh; grey connections of other units untouched. The book's analyst analogy: full reinitialization lets managers rely on the new analyst on day one. Faster integration; early mistakes reach the output.

**LUCÍA:** Roll call of new hyperparameters: M and replacement rate rho for continual backprop; tau and threshold rho for ReDo; eta, optional and unused; and m, the mini-batch size.

*[MUSIC: explainer bed out]*

### Act Three — The Test Flights

*[MUSIC: "Still Learning" theme, low]*

*[TIMECODE: 38:40]*

**MIRIAM:** Thesis §4.3 runs every variant through Permuted MNIST, the stress test from Episode Three. Flat curve: plasticity kept. Sliding: plasticity lost. Our statistician checked the protocol.

*[TAPE: Dr. Sun-Hee Park, statistics and experimental design, recorded in a seminar room.]*

**DR. PARK:** Each task is a new random shuffling of the pixels of handwritten-digit images, and each task lasts 2,000 parameter updates. The measure is average online accuracy per task: accuracy on each mini-batch computed before the network updates on it, then averaged over all mini-batches of the task. There is a base learning system, a plain network and optimizer, drawn in black in every plot, and every method is added on top of it. Only a method's additional hyperparameters are tuned, using the thesis Chapter 3 procedure: a wide search with a single run, then a narrower search with multiple runs. Mini-batch size 30 for every system. Every curve averages 30 independent runs; shaded bands are plus or minus one standard error.

**DEV:** And the defaults being tested?

**DR. PARK:** Continual backprop, latest version: Algorithm 2, contribution utility, hemi-reinitialization. ReDo, original version: Algorithm 3, activation utility, hemi-reinitialization. Baselines: L2 regularization and shrink-and-perturb, from Episode Four.

*[TAPE: ends]*

**DEV:** The book's summary map: rows are experiments, cells the thesis's verdict per method; top block the defaults across settings, lower block one dial turned.

*[SFX: shuffling cards]*

**MIRIAM:** Test one: network size.

**DEV:** Base systems: ReLU networks, three hidden layers, 10, 100 or 1,000 units per layer, trained with SGD. Tuned: the base system's step-size; continual backprop's maturity threshold and replacement rate; ReDo's frequency and threshold; L2's regularization factor; and shrink-and-perturb's noise variance, using the same regularization factor as L2.

**DEV:** Audio figure, Figure 4.1. Three panels, left to right: 1,000 units, 100 units, 10 units. Horizontal axis: task number, 1 to 1,000. Vertical axis: average online accuracy per task, and careful, each panel has its own scale: 92 to 95 percent in the first, 82 to 94 in the second, 70 to 90 in the third. Colours: black base system, orange shrink-and-perturb, pink L2, green ReDo, yellow continual backprop. Settings in Table A.3.

**LUCÍA:** At 1,000 units: ReDo flat from the start; continual backprop flat after some initial fluctuation. L2 declines steadily, a sustained loss of plasticity. Shrink-and-perturb stable and highest of all. Black falls from about 94 to about 92 percent, read off the chart. At 100 units: shrink-and-perturb, ReDo and continual backprop all stable. L2 dips slightly, then stabilizes after about 200 tasks. Black falls to about 84. At 10 units: ReDo and continual backprop steady after an initial decrease. And L2, unlike in the wider networks, is steady and matches shrink-and-perturb.

**MIRIAM:** The pattern?

**THE THESIS:** *(from the thesis, adapted)* The gap between shrink-and-perturb and the two selective unit reinitialization algorithms grew as the number of units fell. Selective unit reinitialization was less effective in small networks. L2 regularization showed the opposite effect, becoming less effective as the number of units grew.

**CAPT. AL-HARBI:** *(on tape) Analogy.* Rotating out underperformers works in a big department, where each replacement is a small share of capacity. In a crew of ten, every replacement is a large disruption. Where it breaks: units have no morale.

*[SFX: shuffling cards]*

**MIRIAM:** Test two: optimizers with memory.

**DEV:** The worry: momentum and Adam store moving averages of past gradients, unrelated to a freshly reinitialized weight. That memory could interfere.

**DEV:** Set-up: three hidden layers, 100 ReLU units, trained with SGD with momentum or with Adam. Tuned: step-sizes, the momentum term, and Adam's two moving-average factors, beta one and beta two. L2 and shrink-and-perturb use SGDW with momentum and AdamW, variants that apply the regularization differently and have been shown to be more stable, Loshchilov and Hutter, 2019.

**DEV:** Audio figure, Figure 4.2. Two panels: momentum on the left, Adam on the right. Task number 0 to 1,000 across; accuracy 82 to 94 percent up. The black line is labelled "SGDW with momentum of 0.9" on the left, and "AdamW with beta one equals 0.9 and beta two equals 0.999" on the right. The W variants were used for L2 and shrink-and-perturb to avoid learning instabilities unrelated to plasticity loss. Table A.4.

**LUCÍA:** ReDo and continual backprop stable with both optimizers. With momentum, shrink-and-perturb and L2 actually do better than both. With Adam, L2 and shrink-and-perturb decrease over time, plasticity loss, while ReDo and continual backprop stay on top at about 93.5 percent, read off the chart.

**THE THESIS:** *(from the thesis, adapted)* Selectively reinitializing units can maintain plasticity even with optimizers that use gradient statistics, and L2 regularization and shrink-and-perturb are not always reliable for maintaining plasticity.

*[SFX: shuffling cards]*

*[TIMECODE: 45:15]*

**MIRIAM:** Test three: activation functions. And here, the maintenance programme fails.

**DEV:** To limit tuning, a subset. Tanh and Sigmoid are both S-shaped and saturate at either extreme, so only Tanh. GELU and SiLU are smooth ReLUs, likely to behave like ReLU, so excluded. Leaky ReLU outputs a small value for negative inputs, completely preventing dying ReLUs, and is unlike the other five, so it's in. Set-up: three hidden layers, 100 Tanh or 100 Leaky ReLU units, SGD, step-size tuned for each base system.

**DEV:** Audio figure, Figure 4.3. Three panels. First, Leaky ReLU accuracy, 84 to 94 percent. Second, Tanh accuracy, 82 to 90. Third, the proportion of frozen units in the Tanh networks, 0 to 25 percent. Task number 1 to 1,000. Same colours. Table A.6.

**LUCÍA:** Leaky ReLU looks like Figure 4.1b: all four steady, black declining to about 84. Tanh: continual backprop and ReDo match the base system, sliding from about 89 to about 82 percent. L2 is stable after some initial fluctuation, near 89. Shrink-and-perturb behaves like L2, which suggests the added noise had minimal effect on Tanh networks. And the third panel: with continual backprop and ReDo, frozen units accumulate at the same rate as with no treatment at all, rising to about 25 percent by the last task. With L2 and shrink-and-perturb, near zero.

**MIRIAM:** Why? We return to Nora's layer.

*[SFX: service-bay buzzer. Footsteps. A clipboard.]*

**UNIT 88:** I told you. Look at me. Plus 0.99. Plus 0.99. Plus 0.98. Plus 0.99. Every input, I'm blazing.

**UNIT 12:** You're not blazing, 88. You're stuck. Your Tanh is pinned against the ceiling. Whatever comes in, you say the same thing.

**UNIT 47:** *(quietly)* I'm the one who actually changes. 0.6, minus 0.3, 0.1, minus 0.5. I respond to the digits.

*[SFX: clipboard pen scratching]*

**UNIT 47:** Wait. Why is the clipboard pointing at me?

*[SFX: click and hum]*

**UNIT 88:** Highest score in the layer. Again.

*[SFX: rising tone that thins and flattens]*

*[SFX: soft chime]*

**LUCÍA:** That's the book's Toy Box, voiced. Two Tanh units, four inputs, invented numbers. Unit A, frozen: 0.99, 0.99, 0.98, 0.99. Activation utility about 0.99. Unit B, healthy: 0.6, minus 0.3, 0.1, minus 0.5. Absolute values sum to 1.5, over four, 0.375. Activation utility ranks the frozen unit as more useful, and resets B first.

**MIRIAM:** The mechanism. Episode Four showed that accumulating frozen units, units whose output barely varies, so they learn little, is correlated with plasticity loss. A Tanh unit freezes near plus or minus one, so its average absolute activation is near one, the maximum. Activation utility protects exactly the units it should reset; contribution utility, built on the same term, can behave similarly. Figure 4.3c confirms it: frozen units were not being reinitialized.

**CAPT. AL-HARBI:** *(on tape) Analogy.* An auditor who judges staff by hours logged will protect the employee who leaves the office lights on all night. Activity is not contribution. Where it breaks: the frozen unit isn't gaming anything. It's simply stuck, and the scorecard can't tell stuck from busy.

**THE THESIS:** *(from the thesis, adapted)* This problem could be addressed by considering other utility measures.

*[SFX: shuffling cards]*

**MIRIAM:** Test four: change the scorecard. Every utility measure plugged into both algorithms, plus random. Hemi-reinitialization throughout. Three-hidden-layer ReLU network, SGD. Hyperparameters tuned separately for each utility measure.

**DEV:** Audio figure, Figure 4.4. Left panel continual backprop, right panel ReDo. Tasks 1 to 1,000; accuracy 82 to 94 percent. Eight lines: shrink-and-perturb in orange on top, L2 pink, first-order dark blue, contribution yellow, activation green, random grey, weight magnitude light blue, base black. Table A.5.

**LUCÍA:** First-order, contribution and activation: nearly identical in both algorithms, all stable just above 92 percent. Random: stable, and almost matching those three. Weight magnitude: the worst in both. In continual backprop it stabilizes after some initial fluctuation, at about 87.5 percent. In ReDo it performs the same as the base system. It fails.

**DEV:** The dartboard nearly ties?

**THE THESIS:** *(from the thesis, adapted)* Randomly reinitializing units is enough to maintain plasticity in Permuted MNIST.

**DR. PARK:** *(on tape)* But the thesis warns: the three are not interchangeable. Contribution and activation utility worked with Leaky ReLU, Figure 4.3a, and ReLU, Figure 4.1b, but poorly with Tanh, Figure 4.3b.

**MIRIAM:** So the second experiment: Tanh and Leaky ReLU networks, three hidden layers of 100 units, SGD. ReDo with activation or first-order utility. Continual backprop with contribution or first-order utility.

**DEV:** Audio figure, Figure 4.5. A two-by-two grid. Top row Leaky ReLU, 84 to 94 percent; bottom row Tanh, 82 to 90. Left panels ReDo, default versus first-order. Right panels continual backprop, default versus first-order. L2, shrink-and-perturb and base in every panel. Table A.6.

**LUCÍA:** Leaky ReLU: first-order is stable after some initial fluctuation in both algorithms, slightly lower than the default. And in both, ReDo and continual backprop perform worse than L2 and shrink-and-perturb. Tanh: a drastic improvement. With defaults, both algorithms match the base system and end near 82 percent. With first-order utility, both are stable. ReDo matches L2 and shrink-and-perturb, about 89. Continual backprop with first-order surpasses both, at about 90.

*[SFX: service-bay buzzer. Clipboard.]*

**UNIT 88:** 0.99. 0.99. 0.98. Same as always. Why is the clipboard pointing at me?

*[SFX: click and hum]*

**UNIT 88:** *(new, uncertain)* Oh. My inputs are different. I can feel the digits. Nobody's listening yet.

**THE THESIS:** *(from the thesis, adapted)* Utility measures interact differently with activation functions. Practitioners should choose the utility measure based on the specifics of their network architecture.

**PROF. ADEYEMI:** *(on tape)* An interpretation, the book's, not the thesis's: a frozen Tanh unit acts like an extra bias, not a feature. Its first-order score is a near-constant output times the average error signal it sends forward, which can be small, so it can rank low and be reset. The thesis reports only the empirical result.

*[SFX: shuffling cards]*

*[TIMECODE: 54:00]*

**MIRIAM:** Test five: the third dial. Hemi versus full reinitialization.

**LUCÍA:** The trade-off. Hemi zeroes output weights so new units can't change the output unexpectedly. But randomization lets the algorithm search parameter space for better solutions, and zero outputs may slow learning. So full might win. Set-up: three-hidden-layer ReLU, 100 units, SGD. ReDo with activation utility, continual backprop with contribution utility, which performed equivalently in Figure 4.4. Each with hemi or full. L2 and shrink-and-perturb as baselines.

**DEV:** Audio figure, Figure 4.6. Left continual backprop, right ReDo. Tasks 1 to 1,000; accuracy 84 to 94. Hemi in yellow on the left, green on the right; full in light blue. Table A.7. Result: in both, full is lower. In continual backprop, lower but largely stable, about 92 versus about 92.5 percent, read off the chart. In ReDo, lower and with sudden drops right after resets: a thick saw-tooth band between about 91 and 92 percent.

**DEV:** Audio figure, Figure 4.7: the first 200 tasks of ReDo, enlarged. Accuracy 91.0 to 92.6 percent. Green hemi, light blue full. Red dots mark tasks in which a reinitialization step happened, joined by a black line.

*[SFX: ledger bell]*

**THE AUDITOR:** Samir Haddad. In the passage explaining Figure 4.7, the thesis text says "resample reinitialization." There is no method by that name in the chapter. The figure and the context show it means full reinitialization. Read it that way.

*[SFX: ledger bell, softer]*

**LUCÍA:** The cause is the reinitialization frequency. After tuning, ReDo with full reinitialization ran its sweep every 8,192 parameter updates, two to the thirteenth. Each task has only 2,000. So many tasks have no reset at all. One reset every 8,192 over 2,000, every 4.096 tasks: a drop roughly every four tasks. And the red dots line up with the drops. Hemi, by contrast, was tuned to sweep every 16 updates and shows no sudden drops.

**DEV:** And the black line wiggles too.

**LUCÍA:** Mid-task resets dip deepest; resets near a task's start or end do less damage. The book's arithmetic: resets at 8,192, 16,384, 24,576. If task 5 covers updates 8,001 to 10,000, its reset lands 192 updates in. Task 9, 16,001 to 18,000: 384 in. Task 13: 576 in. The offset drifts by 192 each time, sweeping from the start of a task to the middle and on to the end. That sweep is the slow wave.

**MIRIAM:** One last observation. In both algorithms, full reinitialization was slightly higher on the first five tasks. Minimal, but it raises the question of whether the amount of noise could be tuned for performance both higher and steady. For now, the thesis calls hemi-reinitialization the most sensible choice.

### Act Four — What Is a Unit?

*[MUSIC: "Still Learning" theme, sparse piano]*

*[TIMECODE: 59:00]*

**MIRIAM:** So far, every network was fully-connected, where a unit is obvious. Modern networks add convolutions and normalization. Thesis §4.4 shows that deciding what counts as a unit is not a detail. It changes the outcome.

**LUCÍA:** Fully-connected, biases ignored: unit i in layer l computes h sub l of i equals g of W sub l minus one, row i, dot x. x is the layer's input; that row is the unit's input weights; g the activation function. Output weights: column i of W sub l. Reset that row and that column.

**LUCÍA:** Convolutional layer: the natural unit is an output channel, the whole map of features made by sliding one filter across the image. The input image X lives in C-in by d by d: C-in input channels, three for a colour image; d both height and width. Filter i has weight tensor W sub l minus one of i, in C-in by k by k, k the filter's height and width. That tensor is the unit's input weights. The output of filter i is a channel H of i, d by d; the thesis assumes the convolution leaves height and width unchanged. All channels stacked: H, in C-out by d by d, with C-out the number of filters.

**DEV:** And the output weights?

**LUCÍA:** Depends on the next layer. If it's another convolution: filter j of the next layer has weights W sub l of j, in C-out by k by k, and its slice W sub l of j comma i, k by k, is what multiplies channel i. So resetting unit i means new values for the whole filter i, W sub l minus one, i, colon, colon, colon, and for W sub l, colon, i, colon, colon: that slice in every next-layer filter.

**LUCÍA:** If the next layer is fully-connected, channels are flattened into a vector h of length C-out times d squared, channel by channel. It connects through W sub l: d-fc rows, one per fully-connected unit, C-out times d squared columns. Unit i's output weights are the set of columns W sub l, colon, q, for q running from i times d squared up to i plus one times d squared minus one. q indexes the columns, one per entry of h; that run is where channel i landed, counting from zero; and each column is every fully-connected unit's weight on position q.

*[SFX: soft chime]*

**LUCÍA:** Toy Box, invented sizes. C-out equals 4 channels, each 3 by 3, so d squared is 9 and the flattened vector has 36 entries. Channel 2, counting from zero, sits at positions 18 to 26. With 10 fully-connected units, resetting channel 2 resets its filter plus columns 18 to 26: 9 columns times 10 rows, 90 output weights.

**DEV:** Audio figure, Figure 4.8. Panel a: a fully-connected net; unit i an orange circle, input weights blue, output weights pink. Panel b: conv to conv; filter i, a blue grid, slides over a bicycle image making channel H of i, orange, in the stack H; next-layer filter j's slice for channel i in pink. Panel c: conv to fully-connected; H flattened into h; pink lines are channel i's columns. Each panel ends with a "When reinitializing" line listing the weights that get new values. What it shows: the same instruction, "reset unit i," touches very different sets of weights depending on the layers around it.

**THE THESIS:** *(from the thesis, adapted)* Though it is simple to reason about units in the abstract, the concrete implementation varies substantially with the structure of the network.

**CAPT. AL-HARBI:** *(on tape) Analogy.* "Replace one employee" is clear in a small office. In a matrix organization, it means replacing a whole function, re-briefing every team that relies on its output, and finding exactly which lines of each report it fed. Where it breaks: here the org chart is written in index arithmetic, and one off-by-one resets someone else's job.

*[BEAT]*

**MIRIAM:** Then normalization, which creates a second candidate for "the unit's output."

*[TAPE: Dr. Priya Venkataraman, large-scale ML engineering, recorded at a data centre. Fans hum.]*

**DR. VENKATARAMAN:** Layer normalization rescales a layer's activations to a standard average and spread, then applies a learnable scale and shift. Say it follows every hidden activation. Activation: h sub l equals g of W sub l minus one times h sub l minus one, plus b sub l minus one, where h sub l minus one is the previous layer's normalized output. Normalized activation: h-bar sub l, bold, equals h sub l minus h-bar sub l, the scalar sample average of the layer's activations, divided by s, the sample standard deviation, plus epsilon, a small number preventing division by zero; then multiplied element by element by gamma, and plus beta. Gamma and beta are learnable per-unit scale and shift.

**LUCÍA:** Toy Box. Activations 1, 2, 3. Average 2, standard deviation about 0.82. Ignore epsilon, gamma one, beta zero: normalized values about minus 1.22, 0, plus 1.22. A unit with a tiny raw activation can end up with a large normalized value, and vice versa.

**MIRIAM:** So two definitions. Unit as h sub l: utility from raw activations. Or unit as h-bar sub l: utility from normalized activations. The experiment: three-hidden-layer ReLU network, layer norm after each ReLU. Continual backprop with contribution utility, ReDo with activation utility, both hemi-reinitialization, each run both ways. On reset, the unit's gamma goes back to one and its beta to zero. L2 and shrink-and-perturb as baselines.

**DEV:** Audio figure, Figure 4.9. Left, utility from activations; right, from normalized activations. Tasks 1 to 1,000; accuracy 82 to 94 percent. Green ReDo, yellow continual backprop, orange shrink-and-perturb, pink L2, black base. Thirty runs, one standard error. Table A.8. Left: ReDo steady at about 92; continual backprop slipping slightly to about 91.5; base falling to about 86. Right: both decline steadily, close to the base: ReDo near 88, continual backprop near 87, base about 86. L2 and shrink-and-perturb near 91 to 92. Read off the chart.

**THE THESIS:** *(from the thesis, adapted)* Even with identical architectures, the choice of what constitutes a unit can significantly change how well selective unit reinitialization maintains plasticity.

**DR. VENKATARAMAN:** The book's interpretive note, not a thesis claim: normalization re-centres and re-scales every unit relative to its neighbours, so a unit that barely contributes before normalization can look as active as any other afterwards.

*[TAPE: ends]*

*[BEAT]*

*[AMBIENCE: archive room, page turns]*

*[TIMECODE: 65:00]*

**MIRIAM:** Thesis §4.5 places all this in history, and lists what's untested. The Archivist.

**THE ARCHIVIST:** Searching over units is old. Pandemonium, Selfridge, 1958, almost seventy years ago: strikingly similar to continual backprop but without gradient descent; units generated predictions to maximize a score, and the least useful were pruned to make space for new ones. Klopf and Gose, 1969; Holland and Reitman, 1977; Kaelbling, 1993: Pandemonium-like, searching by pruning and generating units, no gradient descent. Mahmood and Sutton, 2013, combined unit search with gradient descent, in shallow networks with a linear threshold unit. Dohare, 2020, and Rahman, 2021, extended that to deep ReLU networks, the first selective reinitialization systems to learn from a non-stationary stream without loss of plasticity. Dohare and colleagues, 2021, the first continual backprop; 2024, the updated version with contribution utility. Sokar and colleagues, 2023, ReDo, to prevent frozen units accumulating. Farias and Jozefiak, 2025, self-normalized resets, the latest, which reinitializes low-activation units by detecting changes in each unit's pattern of activation.

**THE ARCHIVIST:** A parallel line: constructive networks. Cascade correlation, Fahlman and colleagues, 1988, starts with no units; candidates are trained by gradient descent, the most promising added, inputs frozen, feeding later candidates. Three differences from selective reinitialization: units are never removed; candidates are trained in a pool without affecting the output, and only the best is added; and added units' inputs are frozen, so their activation pattern holds as long as the data stays stationary. Extended to convolutional nets; used against forgetting in continual supervised learning, Marquez and colleagues, 2018, and reinforcement learning, Rusu and colleagues, 2016. Because they search continuously, they're likely to maintain plasticity, possibly learning without forgetting and without plasticity loss; growing compute may limit them.

**CAPT. AL-HARBI:** *(on tape) Analogy.* Cascade correlation only ever hires: trains candidates on the side, appoints the best, never lets anyone go. Selective reinitialization keeps headcount fixed and replaces the weakest. Where it breaks: an airline that only hires runs out of hangar. So, perhaps, does that network.

**THE ARCHIVIST:** A second line: the Lottery Ticket Hypothesis, Frankle and Carbin, 2019: a randomly initialized dense network contains a sub-network that, trained alone, can match it. It led to dynamic sparse training, Mocanu, 2018; Bellec, 2018; Evci, 2020; which prunes and revives connections, and made systems robust to input permutations in reinforcement learning, Grooten, 2023. And to resets in dense networks of layers, units or weights, Alabdulmohsin, 2021; Taha, 2021; Zhou, 2022; shown to improve fine-tuning, Li, 2020, give robustness to label noise, Zaidi, 2023, and mitigate plasticity loss in reinforcement learning, Nikishin, 2022.

**LUCÍA:** On pruning criteria, two purposes: model compression, making a trained network smaller, and what the thesis calls pruning for reinitialization, a search complementing gradient descent. The difference is timing: compression prunes after learning; reinitialization prunes online. Dynamic sparse training and selective reinitialization share the goal, so advances in one can help the other.

**MIRIAM:** And Algorithm 4.

**LUCÍA:** Self-normalized resets counts steps between a ReLU unit's firings, its inter-firing time, and resets units where it's too large. A simplified version, fixed reset threshold, resets a unit when that time is at least a rejection threshold tau. It's unpublished; Farias and Jozefiak shared it with the author by personal communication. The full method instead models inter-firing time as a Geometric distribution and resets when the observed time is too improbable.

**DEV:** Audio walkthrough, Algorithm 4, "Fixed reset threshold with generic reinitialization method," criterion lines blue. One: inputs, a fully-connected network of L layers, parameters theta zero, a reinitialization method, the rejection threshold tau; each layer's inter-firing vector a zero comma l starts at zero. Two: each step, receive an observation-target pair, predict, compute loss and gradients, update with SGD. Three: per layer, compute activations, start an empty set I. Four: per unit, if its activation is zero or below, it didn't fire, add one to its inter-firing time; otherwise reset it to zero. Five: if that time is at least tau, add the unit to I and zero its counter. Six: reset each unit in I's input and output weights.

*[SFX: soft chime]*

**LUCÍA:** Toy Box. Tau equals 3. Outputs over six steps: 0.4, 0, 0, 0, 0.2, 0. Counter: 0, 1, 2, 3. Reset at step 4, counter back to zero.

*[SFX: click and hum]*

**LUCÍA:** Step 5 it fires, still zero. Step 6, one.

**LUCÍA:** The thesis's critique: these methods assume ReLU and exploit that an inactive ReLU outputs zero. They couple utility, criterion and activation function. Decouple them by testing any utility against a threshold rho: u sub t comma l of i at or below rho. One extra hyperparameter, any utility, any activation. Future work: self-normalized resets with other utility measures.

**PROF. ADEYEMI:** *(on tape)* Utility measures draw on four kinds of information: weights, activations, first derivatives, second derivatives. Weight magnitude pruning is competitive, Han, 2015, and Blalock, 2020; accounting for interconnected weights helps, Park, 2020; extended to unit graphs, Fang, 2023; and the first continual backprop counted input and output weights, Dohare, 2021. Activations: Molchanov, 2017, found a filter's average activation about as good as more complex measures at low compression; it's popular in reinitialization, Sokar 2023, Farias and Jozefiak 2025; and the latest continual backprop multiplies it by output-weight magnitude, Dohare 2024. First derivatives approximate the loss change from removal, Mozer and Smolensky, 1988; Molchanov, 2019; prune before training, Lee, 2019; and Liu and colleagues, 2025, use the weight gradient itself, without multiplying by output weights, which worked better with layer normalization. Against forgetting: elastic weight consolidation, Kirkpatrick, 2017; synaptic intelligence, Zenke, 2017; memory aware synapses, Aljundi, 2018. After a task they score each weight and penalize moving the important ones.

**PROF. ADEYEMI:** Memory aware synapses looks at the network's output, not its loss. The thesis follows that to an output-based first-order utility. One output unit. Silenced output minus normal output is approximately normal output minus the derivative of f with respect to h sub l of i, times h, minus normal output; which equals minus the sum over j of W sub l of j comma i times the derivative of f with respect to that weight. Equation 4.7: absolute value of the sum over j of W sub l of j comma i, times the mini-batch average of the derivative of f of x sub t with respect to it. Same as 4.6 with output in place of loss. It needs no label. Its merits are yet to be investigated.

*[SFX: ledger bell]*

**THE AUDITOR:** Samir Haddad. As promised. In Equation 4.7 and the derivation before it, the sum runs to d sub l, which the thesis describes as "the number of units in layer l." As with 4.2, read it as all of unit i's outgoing weights.

*[SFX: ledger bell, softer]*

**LUCÍA:** Toy Box. h equals 2, output slope minus 0.1. Silencing changes output by about minus 0.1 times minus 2, plus 0.2. Utility 0.2.

**PROF. ADEYEMI:** *(on tape)* Second order: LeCun, 1989; Hassibi, 1993; Dong, 2017; more accurate, but the Hessian, the table of all second derivatives, needs approximations. Efficient ones compete in pruning. Elsayed and Mahmood, 2024, used second-order utilities to inject noise and shrink step-sizes of important parameters, tackling plasticity loss and forgetting together; there, first-order did about as well.

**MIRIAM:** Reinitialization methods are barely studied: mutating units, Holland, 1992; training candidates separately, Fahlman and Lebiere, 1989; imprinting on input patterns, Javed, 2025. Distributions designed for reinitialization, not borrowed from training from scratch, might do better.

*[BEAT]*

*[MUSIC: "Still Learning" theme, slow]*

**MIRIAM:** The verdict, thesis §4.6. One general algorithm subsuming ReDo and continual backprop let each dial be studied alone. Both grew more effective with width, and held with momentum, Adam and Leaky ReLU, but failed with Tanh. On ReLU, three utilities tied, weight magnitude failed or plateaued lower, random came surprisingly close. On Leaky ReLU, first-order was stable but slightly lower; on Tanh, it rescued both, suggesting the failure was the utility measure. Full reinitialization was lower everywhere, unstable in ReDo, slightly higher in the first five tasks; randomizing both sides while controlling the noise might do better.

**THE THESIS:** *(from the thesis, adapted)* No winner is declared between ReDo and continual backprop; the answer depends on the setting. They were comparable with ReLU and Leaky ReLU; with layer normalization ReDo was slightly higher; with Tanh and first-order utility continual backprop was higher. Comparison with shrink-and-perturb is not relevant, since the two can be combined, though shrink-and-perturb was below both with Adam and below continual backprop with first-order utility on Tanh. No state-of-the-art claim is made.

**MIRIAM:** And the unit-definition problem: normalization, and pooling in convolutional networks, where ReLU is followed by an aggregation within a channel. Measure before the pooling, or after? Every nuance is a fresh decision. The thesis's answer: go finer. Reinitialize weights, not units.

**CAPT. AL-HARBI:** *(on tape) Analogy.* Replacing whole positions forces you to define their boundaries, which differ by department. Replacing individual responsibilities avoids the question. Where it breaks: individual responsibilities still need scoring, one by one. That is next episode's problem.

**NORA:** Something's different. I'm still tired. But the quiet ones... some of them are talking again.

*[SFX: click and hum, distant, rhythmic]*

### Three Things to Remember

**MIRIAM:** One. Selective unit reinitialization is ordinary backprop plus a periodic, per-layer step: score units, select some, reset them. Three dials: pruning criterion, utility measure, reinitialization method. Continual backprop retires a steady fraction of mature units through kappa; ReDo sweeps every tau updates below a fraction of the average, and can prune almost everyone or no one.

**DEV:** Two. The scorecard matters. On ReLU, activation, contribution and first-order tie and random nearly matches; weight magnitude is worst. On Tanh, activation and contribution protect frozen units because they look busy; first-order utility fixes it.

**LUCÍA:** Three. Details decide. Hemi beats full. Units hold up across width and with Adam where L2 and shrink-and-perturb faltered. And what you call a unit, raw or normalized, channel or node, can make or break the method, which is why the thesis goes to weights.

### Check Your Understanding

**LUCÍA:** Pencils. One: why kappa, instead of pruning rho times m each step?

*[BEAT]*

**LUCÍA:** Rho times m is usually fractional; kappa banks fractions and prunes the floor of kappa once it reaches one.

**DEV:** Two: when does ReDo prune almost everyone, and when no one? Answer: an outlier inflates the average; and when rho is below one and every unit clears the bar, or between sweeps.

**LUCÍA:** Three: large activations, tiny outgoing weights. Activation utility high, weight magnitude low; contribution, the product, maybe moderate.

**DEV:** Four: why did activation utility protect frozen Tanh units? Outputs near plus or minus one give near-maximum mean absolute activation.

**LUCÍA:** Five: why did ReDo with full reinitialization drop roughly every four tasks? Resets every 8,192 updates, tasks of 2,000: every 4.096 tasks.

**DEV:** Six: channel 3 of an 8-channel, 4-by-4 conv layer feeding a fully-connected layer. Which columns? d squared is 16, so 48 through 63.

**LUCÍA:** Seven: what does first-order utility estimate, and why the absolute value? The loss change if the unit were silenced, by a first-order Taylor expansion; absolute, because a unit matters if removing it moves the loss either way. Eight: why does hemi-reinitialization slow a new unit's first updates? Its input-weight gradient is multiplied by output weights that are zero.

**DEV:** Nine: how did width affect things in Figure 4.1? Resets weakened as width fell; L2 weakened as width grew. Ten: why fear Adam, and what happened? Its stored gradient averages are unrelated to fresh weights; yet resets held, and L2 and shrink-and-perturb declined. Eleven: what did random utility suggest? Random resets suffice on Permuted MNIST, but Tanh shows measures aren't interchangeable.

**LUCÍA:** Twelve: in a convolutional layer, what is a unit? An output channel; its input weights are the whole filter. Thirteen: which unit definition worked with layer norm? Raw activations. Fourteen: in Algorithm 4, what's the inter-firing time? Consecutive steps without a positive ReLU output; reset at tau. Fifteen: Equation 4.7 versus 4.6? Output instead of loss; no label. Sixteen: compression versus pruning for reinitialization? After learning versus online. Seventeen: cascade correlation's differences? Never removes, trains candidates in a pool, freezes inputs. Eighteen: why no winner, and why not versus shrink-and-perturb? It depends on the setting, and the two can be combined.

**MIRIAM:** A listener question, from a reliability engineer: "If random selection nearly matches the clever scorecards, why bother with scorecards?"

**DR. PARK:** *(on tape)* Because that result is on Permuted MNIST with ReLU. On Tanh, the choice was the difference between failure and success. A random baseline tells you how much the choice matters in this setting; it doesn't license ignoring it in the next one.

### Credits and Next Time

*[MUSIC: "Still Learning" theme]*

**MIRIAM:** STILL LEARNING is produced by our team. Hosts Dev Raman and Lucía Ferreira. The Thesis read by Graham Asante; Nora by Nell Varga; the Units by our ensemble; the Archivist by Ruth Kellerman; the Auditor by Samir Haddad. The thesis is © Juan Fernando Hernandez Garcia, 2026, licensed CC BY 4.0, adapted here with credit. Code at github.com/JFernando4/plasticity-via-reinit. All experts and actors in this series are fictional.

**MIRIAM:** Next time, on Episode Seven, "Going Finer": the units were the wrong size. What happens when you stop recycling neurons, and start recycling individual weights?

*[SFX: click and hum, smaller, faster, many at once]*

**MIRIAM:** I'm Miriam Okafor. Still learning.

*[MUSIC: theme out]*

### Show Notes

**Thesis sections:** §4.2 Selective Reinitialization of Units (pp. 36–43); §4.3 Effectiveness of Reinitializing Units (pp. 43–51); §4.4 Definition of a Unit (pp. 51–53); §4.5 Related Literature and Future Work and §4.6 Discussion and Conclusion (pp. 54–62). Hyperparameter values: Appendix A, Tables A.3–A.8.

**Equations (§4.2)**

Unit output (unnumbered):

```latex
h = g(\mathbf{w} \cdot \mathbf{x} + b)
```

Mature units (unnumbered):

```latex
m_{t,l} = \sum_{i=1}^{d_l} \mathbb{1}\{\mathbf{a}_{t,l}[i] > M\}
```

Cumulative replacement rate (unnumbered):

```latex
\kappa_{t,l} = \kappa_{t-1,l} + \rho \cdot m_{t,l}
```

ReDo layer-average utility and pruning set (unnumbered):

```latex
\overline{u_l} = \frac{1}{d_l} \sum_{i=1}^{d_l} \mathbf{u}_l[i]
```

```latex
\mathbf{I} = \{\, i : \mathbf{u}_l[i] \le \rho \cdot \overline{u_l} \,\}
```

Activation utility, expectation (unnumbered) and Eq. 4.1:

```latex
\mathbf{u}_l = \mathbb{E}_p\left[\,|\mathbf{h}_l|\,\right]
```

```latex
\mathbf{u}_l = \frac{1}{m} \sum_{t=1}^{m} |\mathbf{h}_{t,l}| \qquad (4.1)
```

Moving-average estimate (unnumbered; not used in experiments):

```latex
\mathbf{u}_{t,l} = \eta \cdot \mathbf{u}_{t-1,l} + (1-\eta) \cdot |\mathbf{h}_{t,l}|
```

Contribution utility, expectation (unnumbered) and Eq. 4.2 (reading note: the sum covers all d_{l+1} outgoing weights):

```latex
\mathbf{u}_l[i] = \mathbb{E}_p\left[\,|\mathbf{h}_l[i]|\,\right] \sum_{j=1}^{d_l} |\mathbf{W}_l[j,i]|
```

```latex
\mathbf{u}_l[i] = \frac{1}{m} \sum_{t=1}^{m} |\mathbf{h}_{t,l}[i]| \cdot \sum_{j=1}^{d_l} |\mathbf{W}_l[j,i]| \qquad (4.2)
```

Weight magnitude utility, Eq. 4.3:

```latex
\mathbf{u}_l[i] = \sum_{j=1}^{d_{l+1}} |\mathbf{W}_l[j,i]| \qquad (4.3)
```

Change in loss from silencing a unit, Eq. 4.4, and its first-order Taylor approximation (unnumbered):

```latex
\ell(\hat{\mathbf{y}}, \mathbf{y} \mid \mathbf{h}_l[i] = 0) - \ell(\hat{\mathbf{y}}, \mathbf{y}) \qquad (4.4)
```

```latex
\ell(\hat{\mathbf{y}}, \mathbf{y} \mid \mathbf{h}_l[i] = 0) \approx \ell(\hat{\mathbf{y}}, \mathbf{y}) + \left( \frac{\partial \ell(\hat{\mathbf{y}}, \mathbf{y})}{\partial \mathbf{h}_l[i]} \right) (0 - \mathbf{h}_l[i])
```

Eq. 4.5:

```latex
\begin{aligned}
\ell(\hat{\mathbf{y}}, \mathbf{y} \mid \mathbf{h}_l[i] = 0) - \ell(\hat{\mathbf{y}}, \mathbf{y})
&\approx \ell(\hat{\mathbf{y}}, \mathbf{y}) - \left( \frac{\partial \ell(\hat{\mathbf{y}}, \mathbf{y})}{\partial \mathbf{h}_l[i]} \right) \mathbf{h}_l[i] - \ell(\hat{\mathbf{y}}, \mathbf{y}) \\
&= -\mathbf{h}_l[i] \, \frac{\partial \ell(\hat{\mathbf{y}}, \mathbf{y})}{\partial \mathbf{h}_l[i]} \\
&= -\sum_{j=1}^{d_{l+1}} \mathbf{W}_l[j,i] \, \frac{\partial \ell(\hat{\mathbf{y}}, \mathbf{y})}{\partial \mathbf{W}_l[j,i]}
\end{aligned} \qquad (4.5)
```

First-order utility, expectation (unnumbered) and Eq. 4.6:

```latex
\mathbf{u}_l[i] = \left| \sum_{j=1}^{d_{l+1}} \mathbf{W}_l[j,i] \; \mathbb{E}_p\left[ \frac{\partial \ell(\hat{\mathbf{y}}, \mathbf{y})}{\partial \mathbf{W}_l[j,i]} \right] \right|
```

```latex
\mathbf{u}_l[i] = \left| \sum_{j=1}^{d_{l+1}} \mathbf{W}_l[j,i] \; \frac{1}{m} \sum_{t=1}^{m} \frac{\partial \ell(\hat{\mathbf{y}}_t, \mathbf{y}_t)}{\partial \mathbf{W}_l[j,i]} \right| \qquad (4.6)
```

**Equations (§4.4)**

Fully-connected unit (unnumbered):

```latex
\mathbf{h}_l[i] = g(\mathbf{W}_{l-1}[i,:] \cdot \mathbf{x})
```

Output weights of conv channel i feeding a fully-connected layer (unnumbered):

```latex
\{\, \mathbf{W}_l[:, q] \;\mid\; q \in [\, i \cdot d^2, \ldots, (i+1) \cdot d^2 - 1 \,] \,\}
```

Layer activation and layer normalization (unnumbered):

```latex
\mathbf{h}_l = g(\mathbf{W}_{l-1}\mathbf{h}_{l-1} + \mathbf{b}_{l-1})
```

```latex
\overline{\mathbf{h}}_l = \frac{\mathbf{h}_l - \overline{h_l}}{s_{\mathbf{h}_l} + \epsilon} \odot \boldsymbol{\gamma} + \boldsymbol{\beta}
```

**Equations (§4.5)**

Decoupled fixed-reset-threshold test (unnumbered):

```latex
\mathbf{u}_{t,l}[i] \le \rho
```

Output-based first-order derivation (unnumbered) and Eq. 4.7 (reading note: the sum covers the unit's outgoing weights):

```latex
\begin{aligned}
f_{\boldsymbol{\theta}}(\mathbf{x} \mid \mathbf{h}_l[i] = 0) - f_{\boldsymbol{\theta}}(\mathbf{x})
&\approx f_{\boldsymbol{\theta}}(\mathbf{x}) - \left( \frac{\partial f_{\boldsymbol{\theta}}(\mathbf{x})}{\partial \mathbf{h}_l[i]} \right) \mathbf{h}_l[i] - f_{\boldsymbol{\theta}}(\mathbf{x}) \\
&= -\sum_{j=1}^{d_l} \mathbf{W}_l[j,i] \, \frac{\partial f_{\boldsymbol{\theta}}(\mathbf{x})}{\partial \mathbf{W}_l[j,i]}
\end{aligned}
```

```latex
\mathbf{u}_l[i] = \left| \sum_{j=1}^{d_l} \mathbf{W}_l[j,i] \; \frac{1}{m} \sum_{t=1}^{m} \frac{\partial f_{\boldsymbol{\theta}}(\mathbf{x}_t)}{\partial \mathbf{W}_l[j,i]} \right| \qquad (4.7)
```

**Algorithms (audio walkthroughs)**

- Algorithm 1, Selective unit reinitialization: SGD step, then per layer score, select, reset input and output weights.
- Algorithm 2, with continual backprop pruning: ages, mature count m, credit κ; prune ⌊κ⌋ lowest-utility mature units, reset their ages.
- Algorithm 3, with ReDo pruning: every τ updates, prune all units with utility ≤ ρ × layer average.
- Algorithm 4, Fixed reset threshold: count each ReLU unit's inter-firing time; reset at ≥ τ.

**Figures (audio figures)**

- Figure 4.1: ReLU widths 1,000 / 100 / 10; resets hold plasticity but weaken in small nets; L2 weakens in large nets.
- Figure 4.2: momentum and Adam; resets stable; L2 and shrink-and-perturb decline with AdamW (resets about 93.5%).
- Figure 4.3: Leaky ReLU fine; Tanh resets fail (about 89% to 82%); frozen units reach about 25%.
- Figure 4.4: five utilities on ReLU; first-order, contribution, activation just above 92%; random close; weight magnitude worst.
- Figure 4.5: first-order utility on Leaky ReLU (slightly lower) and Tanh (rescues both; continual backprop about 90%).
- Figure 4.6: hemi beats full; ReDo full shows saw-tooth drops.
- Figure 4.7: first 200 tasks; full resets every 8,192 updates, a drop every 4.096 tasks; mid-task resets hurt most.
- Figure 4.8: what a unit's weights are in fully-connected, conv-to-conv and conv-to-fully-connected layers.
- Figure 4.9: utility from raw activations keeps ReDo near 92%; from normalized activations both decline toward the base (about 86%).
- Book diagrams: the reinitialization loop; continual backprop vs ReDo criteria; hemi vs full reset of one unit; §4.3 summary map; unit vs channel; map of reinitialization and pruning families.

**Toy table: the κ jar (invented, ρ = 0.05, 10 units all mature)**

| Step | Mature m | κ before | κ after +ρ·m | Pruned c | κ carried |
| --- | --- | --- | --- | --- | --- |
| 1 | 10 | 0.00 | 0.50 | 0 | 0.50 |
| 2 | 10 | 0.50 | 1.00 | 1 | 0.00 |
| 3 | 9 | 0.00 | 0.45 | 0 | 0.45 |

**Toy: ReDo outlier (invented, ρ = 0.5)**

| Utilities | Average | Bar ρ·ū | Pruned |
| --- | --- | --- | --- |
| 0.9, 0.1, 0.5, 0.0, 1.5 | 0.6 | 0.3 | 2 of 5 |
| 10, 0.1, 0.1, 0.1, 0.1 | 2.08 | 1.04 | 4 of 5 |

**The five utility measures**

| Utility | Looks at | Equation | Default in |
| --- | --- | --- | --- |
| Activation | Mean absolute activation | 4.1 | ReDo |
| Contribution | Activation × sum of absolute outgoing weights | 4.2 | Continual backprop (Dohare et al., 2024) |
| Weight magnitude | Sum of absolute outgoing weights | 4.3 | Pruning literature (Blalock et al., 2020) |
| First-order | Estimated loss change if unit silenced | 4.6 | Pruning literature |
| Random | Uniform in [0, 1] | none | Baseline (§4.3) |

**Hyperparameters introduced**

| Hyperparameter | Belongs to | Meaning |
| --- | --- | --- |
| Maturity threshold M ∈ ℕ₀ | Continual backprop | Updates before a unit can be pruned |
| Replacement rate ρ ∈ [0, 1] | Continual backprop | Fraction of mature units replaced per step, accumulated in κ |
| Reinitialization frequency τ | ReDo | Pruning every τ updates |
| Reinitialization threshold ρ ≥ 0 | ReDo | Prune utility ≤ ρ × layer average |
| Moving-average factor η ∈ [0, 1] | Utility estimation (optional) | Not used in the experiments |
| Sample size m | Utility estimation | Observations in the estimate (mini-batch) |

**Default settings tested (§4.3)**

| Algorithm | Pruning | Utility | Reinitialization |
| --- | --- | --- | --- |
| Continual backprop (latest) | Algorithm 2 | Contribution (4.2) | Hemi |
| ReDo (original) | Algorithm 3 | Activation (4.1) | Hemi |

**Tuned in the network-size experiment**

| Method | Tuned |
| --- | --- |
| Base system | Step-size |
| Continual backprop | Maturity threshold, replacement rate |
| ReDo | Reinitialization frequency, threshold |
| L2 regularization | Regularization factor |
| Shrink-and-perturb | Noise variance (same factor as L2) |

**Future work named in §4.5**

| Idea | Dial |
| --- | --- |
| Self-normalized resets with other utilities | Criterion + utility |
| Decoupled fixed reset threshold, u ≤ ρ | Criterion |
| Test output-based utility (Eq. 4.7) | Utility |
| Adapt weight, activation, first- and second-order measures | Utility |
| Distributions designed for reinitialization | Method |
| Constructive networks, if compute allows | Whole algorithm |

**Auditor's ledger:** Eq. 4.2 (and 4.7) sum limit written d_l, read as all outgoing weights; "resample reinitialization" in the Figure 4.7 discussion means full reinitialization.
