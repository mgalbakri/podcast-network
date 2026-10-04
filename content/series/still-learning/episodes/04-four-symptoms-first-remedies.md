---
number: 4
title: Four Symptoms, First Remedies
slug: 04-four-symptoms-first-remedies
summary: Frozen units, swelling weights, fading gradients and a collapsing representation. We examine the four warning signs, then run a controlled trial of six existing remedies. Only one shows no decline at all.
coverage: 'Covers book chapters 8–9 (thesis §3.3–3.4): the four correlates of plasticity loss (frozen units, weight magnitude, gradient magnitude, stable rank), Figures 3.3 and 3.4, the stable rank equation, the counterexample for each symptom; then a controlled trial of six existing remedies against a base system (L2 regularization, shrink-and-perturb, dropout, CReLU, layer norm and Equation 3.1, residual connections), Figure 3.5, and the residual-connection counterexample.'
interests:
- ai
- science
estimatedMinutes: 52
status: in-production
---

### Cold Open

*[MUSIC: "Still Learning" theme — low cello pulse, slow piano]*

*[AMBIENCE: a quiet room, a single overhead lamp humming, the squeak of a marker on a whiteboard]*

**MIRIAM:** Last week, we watched a network die by degrees. No crash. A slow fade across a thousand shuffled tasks.

**MIRIAM:** This week, we open the case file.

*[SFX: a heavy folder dropped on a table; papers sliding]*

**MIRIAM:** On the board are four photographs. Four suspects, each seen near the scene every time the network declined. By the end of this hour, you will know why not one of them can be convicted.

*[BEAT]*

**MIRIAM:** Then we run a trial. Six treatments, one control, a thousand tasks each, thirty runs apiece. One treatment will hold the line with no visible decline at all.

*[SFX: rising tone that thins and flattens]*

**NORA:** *(tired, slow)* Every new task used to feel like a door opening. Now part of me just... doesn't answer.

*[SFX: shuffling cards]*

**UNIT 12:** *(brisk)* Unit 12, reporting. Output: zero.

**UNIT 47:** *(flat)* Unit 47. Output: zero. Same as yesterday.

**UNIT 88:** *(faint, far off)* Unit 88... zero... zero... zero...

*[BEAT]*

**MIRIAM:** From the University of Alberta thesis by Juan Fernando Hernandez-Garcia, through the guided book *Keeping Neural Networks Learning*: this is STILL LEARNING. I'm Miriam Okafor.

**MIRIAM:** Episode Four. Four Symptoms, First Remedies.

*[MUSIC: theme swells, then cuts to silence]*

### Act One — The Lineup

*[MUSIC: explainer bed — plucked bass, light percussion]*

**DEV:** I have been told there is a whiteboard with four suspects and I brought donuts to the stakeout. Lucía, where did we leave Nora?

**LUCÍA:** Episode Three. Permuted MNIST: each new task scrambles the pixels with a fresh permutation. Over a thousand tasks, online accuracy kept falling, for every activation function. This episode is "what else moves when it happens." Which is not the same thing as why.

**MIRIAM:** *(narration)* The book frames the question the way a physician would. When you cannot yet name a disease, you still track its symptoms. They tell you when it is getting worse. They suggest what to treat. In this thesis they become the instruments for checking whether a remedy works *inside* the network, not just on the scoreboard, and they motivate the remedies themselves, including the selective reinitialization methods later in the series.

*[AMBIENCE: archive room, page turns]*

**THE ARCHIVIST:** For the record. Training neural networks is known to fail in several distinct ways, each with its own literature. The thesis lists four. That neurons can become inactive: Shin and Karniadakis, 2020; Lu and colleagues, 2020. That gradients can become too small and uninformative: Bengio and colleagues, 1994. That weights can grow exponentially large: Philipp and colleagues, 2017. That hidden layers can lose representational power: Kumar and colleagues, 2021.

**MIRIAM:** Section 3.3 asks: do any of these travel with the plasticity loss on Permuted MNIST?

**THE THESIS:** *(from the thesis, adapted)* We track four pathological scenarios. First, a considerable accumulation of units with constant or nearly constant outputs. Second, an increasing trend in the average magnitude of the network's weights. Third, a decreasing trend in the average gradient of the loss. Fourth, a decrease in the stable rank of the representation layer.

**DEV:** Frozen units, big weights, small gradients, low stable rank. Four mugshots.

**LUCÍA:** And the word the thesis uses for them is "correlates." A correlate is something that moves together with the outcome. It may cause it. It may not.

**DEV:** Like ice cream sales and sunburns.

**LUCÍA:** That shape of problem. Keep the word in your pocket; the thesis comes back to it.

*[MUSIC: bed fades under]*

**MIRIAM:** We asked our aviation voice to put this in terms of a hangar.

*[TAPE: Capt. Rashid Al-Harbi, recorded at a flight training centre; the distant whine of a simulator motion base]*

**CAPT. AL-HARBI:** Analogy, and I'll label it as one. A fleet-reliability audit. As an aircraft ages: fuel burn creeps up, more deferred defects, longer turnarounds. Useful warning lights. But I have seen an airframe show all three and fly beautifully for years. And I've seen one fail with none of them on the board. Correlation earns a symptom a place on the dashboard. It doesn't make it the root cause.

**MIRIAM:** Where does the analogy break?

**CAPT. AL-HARBI:** In a hangar we open the panel and test causes one at a time. In this chapter the network is only being *watched*. The panel opens in Act Four.

*[BEAT]*

**MIRIAM:** *(narration)* Suspect number one. The silent units.

*[SFX: soft chime]*

**LUCÍA:** Toy Box. Today's prop: one coffee cup, playing a single neuron. In a fully-connected layer, a unit is one output of the layer's nonlinear function. It computes one thing. In words: g of, w dot x, plus b.

**LUCÍA:** x is the vector of inputs arriving at the unit. Either the previous layer's outputs, or, for the first layer, the pixels. w is the unit's weight vector: one weight per input, saying how much each input counts. w dot x is the dot product: multiply each input by its weight, add up the results. b is the bias, a constant added to shift that sum. And g is the activation function: ReLU, Sigmoid, and so on. It turns the sum into the unit's output.

**LUCÍA:** Its outgoing weights connect it to the next layer. So its output shapes the prediction, and it also shapes the gradients flowing *back* through it during learning. A unit is a door both ways.

**MIRIAM:** And a frozen unit?

**LUCÍA:** The thesis calls a unit frozen when its output is constant or nearly constant. The definition depends on the activation, but every kind of frozen unit shares two traits. It stops contributing to its layer's output. And once frozen, it tends not to change, or changes only slowly.

**DEV:** So how do you catch one in the act?

**LUCÍA:** Watch its output on a batch. The book writes the batch as a curly B, a set of examples x-sub-i, for i running from 1 to m. Curly B is the batch. x-sub-i is the i-th example in it. m is how many examples there are. Then each activation function gets its own frozen test.

*[MUSIC: a low, investigative pulse]*

**LUCÍA:** Audio figure. Figure 3.3: the frozen region of each activation function. Six small plots, one per activation. In each, the horizontal axis is the unit's input, x, running from minus ten to ten. The vertical axis is the output, g of x. Working region in colour; frozen part grey, bracketed "Frozen region." For Sigmoid and Tanh, the illustration uses epsilon equals 0.01. Sigmoid, output between 0 and 1: two frozen regions, the flat tails, near 0 on the far left and near 1 on the far right. Tanh, output between minus one and one: two frozen regions, the flat tails near minus one and near one. ReLU: the whole negative side, where the output is exactly zero. SiLU and GELU: the negative side, where the curve dips slightly below zero and then flattens back toward zero. And Leaky ReLU: the plot just says "No frozen region." Its negative side has a small, but non-zero, slope.

**LUCÍA:** A ReLU unit is frozen when its output is zero for every example in the batch. In words: g of, w dot x-sub-i, plus b, equals zero, for all x-sub-i in curly B. Here g is ReLU, which outputs the maximum of zero and its input. "Equals zero" means exactly zero. And "for all x-sub-i in curly B" reads "for every example in the batch." One non-zero output on any example, and the unit is not frozen.

**LUCÍA:** These are the units the literature calls dead ReLUs. Shin and Karniadakis, 2020. Lu and colleagues, 2020.

*[SFX: a single low drone note sustains]*

**UNIT 47:** *(quiet)* The pixels come in. Pixels are never negative, so everything that reaches me is zero or positive. But somewhere along the way, my weights all went negative. My bias went negative. So every input, times every weight, adds up to something below zero. Every time.

**UNIT 12:** And ReLU of anything below zero...

**UNIT 47:** Is zero. To every picture.

**UNIT 88:** *(further off)* Then the learning comes. The gradient comes back down the line, looking for someone to adjust.

**UNIT 47:** And it reaches my door, and the slope of ReLU on my side is zero. So the gradient through me is zero. My weights don't move.

**UNIT 47:** Tomorrow I'll be the same. The thing that could fix me has to come through me, and nothing comes through me.

*[SFX: the drone cuts to silence]*

**MIRIAM:** *(narration)* The book's account. A ReLU unit can become permanently inactive when all its inputs are positive and its weights and bias are negative. The weighted sum is always negative. The output is always zero. The gradient flowing back through the activation is always zero. And with zero gradient, its input weights never change during optimization. The unit cannot recover.

**LUCÍA:** The book draws it as a small diagram with toy numbers: a closed loop of zero output and zero gradient.

**MIRIAM:** Now the curved activations. Sigmoid and Tanh.

**LUCÍA:** These don't die. They saturate. A Sigmoid or Tanh unit is frozen when its output stays within a small distance epsilon of one of its bounds, for every example. Call the activation's lower bound a, and its upper bound b. For Sigmoid, a is zero and b is one. For Tanh, a is minus one and b is one.

**LUCÍA:** Then the unit is frozen if either of two things holds. One: g of, w dot x-sub-i plus b, is less than a plus epsilon, for every example in the batch. That's "pinned to the floor": every output sits just above the bottom. Or two: g of, w dot x-sub-i plus b, is greater than b minus epsilon, for every example. "Pinned to the ceiling." The thesis also uses the word "dormant" for these.

*[SFX: ledger bell]*

**THE AUDITOR:** A notation note for the record. In these two conditions, the letter b appears twice with two different meanings. Inside g, b is the unit's bias. On the right-hand side of the inequality, b is the activation's upper bound. The thesis reuses the letter. The book flags it. Read the left-hand b as bias, the right-hand b as ceiling.

*[BEAT]*

**LUCÍA:** Toy example from the book. Epsilon is 0.01. A Sigmoid unit whose outputs on the batch are all between 0.991 and 0.999. Is it frozen?

**DEV:** The ceiling is one, minus 0.01, so 0.99. Everything's above 0.99. Frozen.

**LUCÍA:** Frozen. Now change just one output to 0.95.

**DEV:** Then not every output is above 0.99. Not frozen.

**MIRIAM:** The literature calls these saturated units: Montavon and colleagues, 2012; Rakitianskaia and Engelbrecht, 2015. Its output is almost constant, like another bias term with slight variation.

**LUCÍA:** And here's the crucial difference from ReLU. The book says saturation is less severe than ReLU death because it is never irreversible. The slope of a Sigmoid at its tails is tiny, but never exactly zero. So a little gradient always leaks through. The catch is "tiny": gradients at saturation become extremely small, and that significantly slows learning.

**DEV:** Quick analogy, and it breaks fast: a dead ReLU is in a coma, a saturated Sigmoid is asleep through four alarms. Where it breaks: nobody wakes a network unit; the gradient either reaches it or it doesn't.

**MIRIAM:** GELU and SiLU.

**LUCÍA:** Those units do produce non-constant outputs on the negative side. But their gradients there are much smaller than on the positive side. So the thesis counts them as frozen when every output is at or below zero. In words: g of, w dot x-sub-i plus b, is less than or equal to zero, for every example in the batch. Like Sigmoid and Tanh, they are not irreversibly frozen. But the gradients of their weights are severely reduced, and their contribution to the layer is nearly zero.

**MIRIAM:** And Leaky ReLU?

**LUCÍA:** No notion of a frozen unit at all. Leaky ReLU was designed specifically to prevent this problem. Its negative side keeps a small slope, so a gradient always flows.

*[SFX: shuffling cards]*

**MIRIAM:** *(narration)* The measurement protocol. Before the start of each new task, every unit's activation is computed on a batch of 1,500 images. For Sigmoid and Tanh, epsilon is 0.01. Which means the threshold for "frozen" differs from one activation to another.

**LUCÍA:** The thesis says the precise threshold matters less than the trend: how the percent of frozen units changes as the system learns more and more tasks.

*[MUSIC: investigative pulse returns, slightly faster]*

**MIRIAM:** The central exhibit. Figure 3.4.

**LUCÍA:** Audio figure. Figure 3.4: accuracy and the four symptoms across six activation functions. The six networks of Figure 3.2d, internals exposed, over 1,000 tasks. Five panels. In every panel, the horizontal axis is the permutation, the task number, from 0 or 1 to 1,000. The vertical axis is an average over 30 runs. There's shading for one standard error, but it's mostly too thin to see. Colours: ReLU black. Leaky ReLU orange. Sigmoid blue. Tanh green. GELU pink. SiLU yellow. Every value I'm about to say is read off the chart, so treat them as approximate.

**LUCÍA:** Panel a: average online accuracy per task, on an axis from 80% to 94%. The same curves as Figure 3.2d. All falling. SiLU ends highest, about 86%. Tanh ends lowest, about 82%.

**LUCÍA:** Panel b: percent of frozen units, from 0% to 60%. SiLU climbs fastest, to about 60%. ReLU and GELU climb to about 55%. Tanh reaches about 24%. Sigmoid about 18%. And Leaky ReLU stays flat on the floor, at 0%.

**LUCÍA:** Panel c: average weight magnitude, on an axis from 0.05 to 0.25. Every curve rises. Sigmoid ends highest, about 0.25. Then Leaky ReLU and ReLU, about 0.20. SiLU, about 0.17. Tanh, about 0.12. GELU lowest, about 0.11.

**LUCÍA:** Panel d: average gradient magnitude, roughly 0.001 to 0.004. Every curve falls after an early peak. Tanh stays highest, about 0.0035 at the end. GELU next, about 0.0023. Sigmoid, SiLU, Leaky ReLU and ReLU cluster near 0.001.

**LUCÍA:** Panel e: stable rank of the representation layer, out of a maximum of 100. Every network except Sigmoid starts near 90. SiLU settles around 63. Sigmoid does something odd: it first rises from about 30 to about 60, then drifts to about 40. Tanh and GELU fall to the low 30s. ReLU and Leaky ReLU fall fastest, to about 25.

**LUCÍA:** The gross shape: accuracy down, frozen units and weights up, gradients and stable rank down. With one glaring exception in panel b.

**MIRIAM:** Leaky ReLU.

**THE THESIS:** *(from the thesis, adapted)* Comparing the average online accuracy with the percent of frozen units reveals a clear pattern: as accuracy fell, the proportion of frozen units rose, for every activation function except Leaky ReLU. Yet Leaky ReLU networks also lost plasticity, with no frozen units at all. Therefore frozen units cannot be the cause of loss of plasticity.

*[BEAT]*

**MIRIAM:** *(narration)* One suspect, with an alibi.

**UNIT 47:** *(distant)* So it wasn't us?

**UNIT 12:** It wasn't *only* us.

*[MUSIC: out]*

### Act Two — The Ravine and the Shrinking Step

*[MUSIC: explainer bed]*

**LUCÍA:** If Leaky ReLU has no dead units and still gets sick, someone else is at the scene. Panel c. Leaky ReLU's weights grew. To about 0.20 by the end, read off the chart. Suspect number two: increasing weight magnitude.

**MIRIAM:** *(narration)* Figure 3.4c shows the average weight magnitude: the average size, ignoring sign, of all the network's parameters, measured before the start of each task. As the systems lost plasticity, this average rose for every activation function. Why would bigger weights hurt? We asked an optimizer.

*[TAPE: Prof. Tomás Adeyemi, recorded in his office; a radiator ticks; a chalkboard eraser is set down]*

**PROF. ADEYEMI:** A three-step argument for a *possible* mechanism, not a proof. Step one. The size of the weights at the start of an optimization is directly linked to the condition number of the Hessian.

**PROF. ADEYEMI:** The Hessian is the matrix of second derivatives of the loss with respect to the weights. It describes curvature: how sharply the loss surface bends in each direction. Its condition number is the ratio between the steepest curvature and the flattest curvature. Near one, a round bowl. Huge, a long thin trough.

**MIRIAM:** Step two.

**PROF. ADEYEMI:** The condition number is known to affect how fast gradient descent converges. The thesis points readers to Boyd and Vandenberghe, 2004, page 473, for a clear illustration in convex optimization. When that ratio is large, we call the problem ill-conditioned, and gradient descent zig-zags.

**DEV:** Why zig-zag?

**PROF. ADEYEMI:** Let me ask *you* something. You have one step-size for every direction. In the steep direction, a big step sends you flying up the opposite wall. So what do you have to do?

**DEV:** Shrink it. And then in the flat direction it barely moves me. Crash or crawl.

**PROF. ADEYEMI:** Precisely. A step-size small enough to be safe in the steep direction crawls in the flat one. Step three, then. Larger weights could produce an ill-conditioned Hessian, and therefore slower convergence. With each new task starting from ever larger weights, each task would be learned more slowly.

*[SFX: wind through a canyon, faint footsteps on gravel]*

**PROF. ADEYEMI:** The book's analogy. Picture walking down a long, narrow ravine to reach the bottom. The walls are steep. The floor is nearly flat. Each step either crashes into a wall or barely advances along the floor. The narrower the ravine, the worse the condition number, and the slower the descent.

**DEV:** And where does the ravine break?

**PROF. ADEYEMI:** A real loss surface has as many directions as parameters, so the ravine is a cartoon. More important: the thesis says weight growth *could* do this. Nobody computes a Hessian on Nora in this chapter. A plausible mechanism is not a demonstrated cause.

**PROF. ADEYEMI:** Still, this argument could explain why Leaky ReLU networks lost plasticity even with no frozen units. Their weights grew too.

*[MUSIC: a sting]*

**MIRIAM:** *(narration)* Suspect number three. The shrinking step.

**LUCÍA:** Figure 3.4d. The average gradient magnitude: the average size of the gradient of the loss with respect to the network's parameters, computed on each mini-batch and aggregated per task. As performance fell, this fell too.

**PROF. ADEYEMI:** And this link is the most direct of all. The SGD step is step-size times gradient. Smaller gradient, smaller step, slower progress on every optimization step. That could explain the declining performance.

*[SFX: soft chime]*

**LUCÍA:** Toy Box. The book's numbers. Step-size 0.05. Early on, a gradient of 0.004. How far does the weight move in one step?

**DEV:** 0.05 times 0.004... is 0.0002.

**LUCÍA:** Later, the gradient has shrunk to 0.001.

**DEV:** 0.05 times 0.001 is 0.00005. That's... a quarter.

**LUCÍA:** Four times less movement per step. So to make the same progress, the network needs four times as many steps. But each task gives it the same fixed number of mini-batches.

**MIRIAM:** *(narration)* Two suspects with a shared motive. Large weights, and small gradients, both slow down gradient-based optimization. One by bending the terrain into a ravine. The other by shortening the stride.

*[MUSIC: out]*

### Act Three — Counting What Matters

*[MUSIC: a low string drone, then the explainer bed comes in softly]*

**MIRIAM:** *(narration)* The fourth suspect is the subtlest: the shape of what the network knows. The stable rank of the representation layer.

**LUCÍA:** Words first. The rank of a matrix counts its linearly independent dimensions. How many genuinely different directions it uses. The stable rank refines that. It weighs how much each dimension contributes to the transformation the matrix performs, and counts only the most important ones. High stable rank: most dimensions are relevant. Low stable rank: most dimensions have no notable effect. The information in them is close to irrelevant.

**MIRIAM:** And the "representation layer"?

**LUCÍA:** The last hidden layer. Its outputs are the features the network directly uses to produce its prediction. Its stable rank is the number of essential features the network needs to generate that output.

**MIRIAM:** For stable rank in practice, we went to an engineer who runs these diagnostics.

*[TAPE: Dr. Priya Venkataraman, recorded in a conference room; muffled server-room hum through the wall]*

**DR. VENKATARAMAN:** The thesis's recipe. Step one: take a batch of m observations. Same curly-B notation as before. Step two: run each observation through the network and record the representation layer's activations. Each observation gives you a feature vector, phi of x-sub-i. It's a list of d numbers, where d is the number of hidden units in the representation layer. The book writes that phi of x-sub-i lives in R-to-the-d, for i in bracket-m. R-to-the-d just means "a list of d real numbers," and bracket-m means "one through m."

**DR. VENKATARAMAN:** Step three: stack those feature vectors as rows of a matrix, capital Phi. It has m rows and d columns. Rows are observations; columns are features. A spreadsheet.

**DR. VENKATARAMAN:** Step four: compute the singular values of Phi, written sigma-sub-i. Each singular value measures how much the matrix stretches along one of its independent directions. Order them largest first: sigma-one greater than sigma-two, and so on, down to sigma-k, where k is the minimum of m and d, the smaller of the two dimensions.

**DR. VENKATARAMAN:** Step five, the definition, which the thesis takes from Kumar and colleagues, 2021. The stable rank is the smallest number of the largest singular values whose sum reaches at least one minus delta of the total.

**DR. VENKATARAMAN:** S-rank sub-delta of Phi equals the minimum j such that: the sum of sigma-i from i equals one to j, divided by the sum of sigma-i from i equals one to k, is greater than or equal to one minus delta.

**LUCÍA:** Let me take the symbols. S-rank sub-delta of Phi: the stable rank of the feature matrix Phi, for a tolerance delta. "Minimum j such that": the smallest whole number j that satisfies what comes after. The numerator: the sum of the j largest singular values. The denominator: the sum of all k of them. So the fraction is the share of the total "stretch" captured by the top j directions. And that share has to reach at least one minus delta.

**DR. VENKATARAMAN:** In the thesis, delta is 0.01. So the top j directions must capture 99% of the total. On Permuted MNIST, they compute it on a batch of 1,500 observations before the start of each task. And with 100 units in the representation layer, the maximum possible stable rank is 100.

*[SFX: soft chime]*

**LUCÍA:** Toy Box. The book has a small diagram with eight singular values. Two representations. The healthy one spreads its strength over many directions: you need seven of the eight to reach 99%. Stable rank 7. The collapsed one concentrates almost everything in two directions. Stable rank 2.

**DEV:** The book's analogy: a company has 100 product lines. Ask how many of them make up 99% of revenue. If the answer is 80, the business is broad. It can pivot. If the answer is 25, the other 75 lines exist on paper but barely matter.

**DR. VENKATARAMAN:** Where it breaks: product lines are separate things you can point to. Singular directions aren't individual neurons. They're combinations of all the columns at once. A stable rank of 25 doesn't mean 75 particular units are useless; it means the layer's activity lives mostly in a 25-dimensional slice.

**MIRIAM:** What did Figure 3.4e show?

**DR. VENKATARAMAN:** A clear relationship. The fall in performance in panel a came with a fall in stable rank in panel e. ReLU and Leaky ReLU, starting near 90, read off the chart, falling to around 25.

**THE THESIS:** *(from the thesis, adapted)* Three remarks. First, a low stable rank is not necessarily a problem in itself; past evidence suggests that gradient-based optimization tends to favour low-rank solutions. Second, a low-rank representation may nonetheless be a poor starting point for learning a new task. Third, a decrease in stable rank has previously been associated with plasticity problems, in reinforcement learning.

*[AMBIENCE: archive room, page turns]*

**THE ARCHIVIST:** Citations, for the record. On the tendency of gradient-based optimization toward low-rank solutions: Yang and colleagues, 2019; Razin and Cohen, 2020; Smith and colleagues, 2021. On falling stable rank in reinforcement learning, associated with a reduced ability to fit sequences of value functions: Kumar and colleagues, 2021.

**DR. VENKATARAMAN:** I'd underline the second remark. If most features have become irrelevant, the network has fewer distinct building blocks to recombine when the task changes. For a model that must keep re-learning, it's a thin toolbox.

*[MUSIC: the investigative pulse; a clock ticking]*

**MIRIAM:** *(narration)* Four suspects, four motives. Now the thesis checks the alibis.

**THE THESIS:** *(from the thesis, adapted)* These observations cannot establish that any of the four phenomena causes loss of plasticity, because the correlation is tenuous.

**LUCÍA:** Figure 3.4 supplies a counterexample for every suspect. Dev, prosecution. I'm defence.

**DEV:** Suspect one, frozen units. If frozen units caused plasticity loss, the network with the most frozen units should have the worst accuracy.

**LUCÍA:** SiLU had the most frozen units, about 60%, in panel b. And it had the highest accuracy for most tasks, in panel a.

**DEV:** Ouch. Suspect two, weight magnitude. Biggest weights, worst accuracy.

**LUCÍA:** Sigmoid had the largest average weight magnitude on the final tasks. Yet it had higher accuracy than GELU, which had the smallest weight magnitude of all.

**DEV:** Suspect three, gradients. Biggest gradients, best accuracy.

**LUCÍA:** Tanh had a high gradient magnitude throughout. Yet Tanh had the worst accuracy on the last 100 tasks.

**DEV:** Suspect four, stable rank. Higher stable rank, better accuracy.

**LUCÍA:** Tanh had a stable rank similar to GELU's and higher than ReLU's. Yet it performed worse than both, throughout.

*[BEAT]*

**DEV:** So every suspect has an alibi.

**MIRIAM:** *(narration)* The overall pattern is real. Plasticity loss comes with more frozen units and larger weights, with smaller gradients and lower stable rank. But none of the four is a perfect predictor. None can be convicted.

**LUCÍA:** But "not the sole cause" isn't "harmless." The thesis says each one is still a pathological scenario that can be addressed to prevent plasticity loss. And it sorts them into two kinds of damage.

**LUCÍA:** Many frozen units, and low stable rank, both mean reduced representational capacity. The network can approximate a narrower variety of solutions. That's damage to *what* the network can represent.

**LUCÍA:** High weight magnitude, and low gradient magnitude, both can slow gradient-based optimization, which shows up as poor online performance. That's damage to *how fast* it can move.

**LUCÍA:** That's the book's summary diagram: symptoms sorted by what they damage, each paired with its counterexample.

*[MUSIC: explainer bed, lighter]*

**MIRIAM:** We put out a call for listener questions on this episode. Here's one we received.

**DEV:** *(reading)* "If none of the four symptoms is the cause, why not just track accuracy?" From a listener in quality assurance.

**LUCÍA:** Accuracy tells you something's wrong, not where. The symptoms are how the thesis checks whether a remedy works inside the network, and each is a pathology with its own fix.

**PROF. ADEYEMI:** *(on tape)* And I'd add: a symptom that isn't a perfect predictor can still be a useful one. You don't throw out a thermometer because some sick patients have a normal temperature.

**MIRIAM:** *(narration)* Which brings us to the question that decides everything that follows. Can it be prevented?

*[MUSIC: out]*

### Act Four — The Trial

*[MUSIC: "Still Learning" theme, a single cello line]*

**MIRIAM:** *(narration)* If plasticity loss were built into deep learning, the only cure would be to throw the network away and retrain from scratch. Section 3.4 takes the ReLU networks and tests a series of modifications, with two goals. The primary goal: find out whether existing techniques can mitigate plasticity loss, and how each one affects the four correlates. The secondary goal: build a prototype for how every later chapter will evaluate algorithms that maintain plasticity.

**LUCÍA:** The prototype has two parts. First, define a base learning system, or just base system. Then add one modification at a time and compare each one against it.

**CAPT. AL-HARBI:** *(on tape)* Analogy: a controlled trial. The base system is the control group; each modification is one treatment arm, all facing the same conditions. Where it breaks: there are no patients to randomize; the randomness lives in the 30 independent runs.

**LUCÍA:** The base system: a fully-connected network with three hidden layers of 100 ReLU units each, trained with SGD on Permuted MNIST. Six treatment arms. Two change the update rule: L2 regularization and shrink-and-perturb. One is a standard regularizer: dropout. Three change the architecture: CReLU, layer norm and residual connections. Each arm gets its hyperparameters tuned, and the values are listed in Table A.2 in the thesis's Appendix A.

*[SFX: soft chime]*

**LUCÍA:** Treatment one. L2 regularization. It keeps the parameters from growing too large by constantly pulling every weight a little toward zero. The name comes from the L2-norm, the standard measure of a vector's overall size: the square root of the sum of squared entries.

**PROF. ADEYEMI:** *(on tape)* The update, in words. Theta at t plus one equals: one minus lambda alpha, times theta at t, minus alpha times the gradient, with respect to theta at t, of the loss ell of f-sub-theta-t of x-t, and y-t.

**LUCÍA:** Symbols. Theta-t: all the network's parameters, weights and biases, at time step t. Theta-t-plus-one: the parameters after this update. Alpha: the step-size. Lambda, greater than zero: the regularization factor, how strong the pull toward zero is. One minus lambda alpha, times theta-t: the shrink. Every parameter multiplied by a number slightly below one. With lambda alpha equal to 0.01, each weight keeps 99% of its value before the learning step. f-sub-theta-t of x-t: the prediction for input x-t. y-t: the correct label. Ell: the loss, how wrong the prediction is. The gradient of ell points in the direction that increases the loss, so minus alpha times the gradient is the ordinary SGD step downhill.

**PROF. ADEYEMI:** Without that factor, it's plain SGD. The shrink is the only change.

**LUCÍA:** Toy example. A weight theta equal to 2.0. Step-size alpha 0.05. Lambda 0.2. So lambda alpha is 0.01. Suppose the SGD step would subtract 0.03. Plain SGD gives?

**DEV:** 1.97.

**LUCÍA:** L2 regularization gives 0.99 times 2.0, minus 0.03.

**DEV:** 1.98 minus 0.03, so 1.95.

**LUCÍA:** Large weights lose more in absolute terms, so they're pulled back hardest. On Permuted MNIST, that may stop the average weight magnitude from growing too large. In the experiments, L2 uses the same step-size as the base system, and a tuned regularization factor.

*[SFX: soft chime]*

**LUCÍA:** Treatment two. Shrink-and-perturb. It's L2 regularization, plus a small amount of random noise added to every parameter at every step. Same equation as before, with one extra term on the end: plus epsilon-t. Epsilon-t is a vector of random noise, one number per parameter, drawn fresh at every step. It's drawn from N of zero, sigma-squared I: a Gaussian, a bell curve, with mean zero and variance sigma-squared. The I, the identity matrix, means each parameter gets its own independent draw, all with the same spread. And sigma-squared, the noise variance, is a hyperparameter. Bigger sigma-squared, bigger random nudges.

*[SFX: ledger bell]*

**THE AUDITOR:** A notation caution. In the thesis's own notation section, the second argument of N is a standard deviation, sigma. Here, in section 3.4, the thesis writes N of zero, sigma-squared I, and states that sigma-squared is the variance. So in this equation, the second argument is a variance. The book's advice: read each use of N from its surrounding text.

**MIRIAM:** *(narration)* Adding small parameter noise is itself a common regularization technique in deep learning; the book cites Goodfellow and colleagues, 2016. The combination of L2 regularization and parameter noise is known as shrink-and-perturb, a term coined by Ash and Adams in 2020. Here, shrink-and-perturb uses the same regularization factor and step-size as L2 regularization. Only the noise variance is tuned.

**CAPT. AL-HARBI:** *(on tape)* The book's analogy. Maintaining a fleet's procedures. The shrink is a standing rule that every procedure gets slightly simplified at each review, so none grows unwieldy. The perturb is a small random trial of an alternative at each review, so the organization never fully settles into one rut. Where it stops: in an airline, somebody decides which procedure to trial. In the network, the noise is entirely random. No judgment about which weight to nudge.

**LUCÍA:** Treatment three. Dropout. A standard regularization technique, often used in state-of-the-art systems. During training, it randomly switches off a fraction of units on each step, so the network can't lean too hard on any single unit. It doesn't directly target any of the four correlates. The thesis includes it because it's so widely used. The tuned knob: the dropout probability, the chance each unit is switched off.

*[SFX: soft chime]*

**LUCÍA:** Treatment four. Concatenated ReLU, or CReLU. Proposed to prevent plasticity loss in reinforcement learning by Abbas and colleagues, 2023. Definition, in words: CReLU of x is defined as the pair: ReLU of x, and ReLU of minus x. The little dot-over-equals means "is defined as." ReLU of x passes x if it's positive, else zero. ReLU of minus x passes the flipped input if x is negative, else zero. The square brackets mean the two results are concatenated: placed side by side as two outputs. x equals 3: CReLU gives 3 and 0. x equals minus 2: CReLU gives 0 and 2. Whatever the sign of x, one of the two outputs is active.

**UNIT 47:** *(intrigued)* A twin facing the other way. Whenever I went quiet, my twin would be talking, and the gradient would always have a way back in.

**LUCÍA:** That's the first consequence. No dead units. By design, one of the two outputs always has a non-zero gradient, which completely removes the dying-ReLU problem. Second: each CReLU activation produces two outputs, doubling a layer's units. So, for fairness, the thesis uses 50 CReLU activations per layer. After the CReLU operation, each layer still has 100 units. Step-size is tuned.

*[SFX: soft chime]*

**LUCÍA:** Treatment five. Layer norm, short for layer normalization. It rescales a layer's activations using their own mean and standard deviation. Take a layer's activation vector x with n entries, x-bracket-i being the i-th. First the mean: x-bar is defined as one over n times the sum of x-bracket-i from i equals one to n. Then the variance: s-squared equals one over n times the sum of x-bracket-i minus x-bar, squared. x-bar is the average activation; s-squared is the average squared distance from it.

**DR. VENKATARAMAN:** *(on tape)* Then Equation 3.1. Layer Norm of x is defined as: x minus x-bar, divided by the square root of s-squared plus epsilon, element-wise times gamma, plus beta.

**LUCÍA:** Piece by piece. x minus x-bar: subtract the mean, centre the activations on zero. Square root of s-squared plus epsilon: the standard deviation, with a small safety term. Epsilon, a small positive number, prevents division by zero when all activations are equal. The fraction: activations rescaled to mean zero, spread one. The circle-dot gamma: element-by-element multiplication by a learnable vector gamma, which lets the network choose its own scale for each unit. Plus beta: a learnable vector that lets it choose its own offset.

**LUCÍA:** Toy example. Activations 2, 4, 6. Mean 4. Variance: four plus zero plus four, over three, about 2.67. Standard deviation about 1.63. Ignoring epsilon, normalized: about minus 1.22, 0, and 1.22. With gamma one and beta zero, that's the output.

**DR. VENKATARAMAN:** Why it might help: it smooths the loss landscape, Santurkar and colleagues, 2018, and allows a higher step-size, Bjorck and colleagues, 2018. The thesis tuned the step-size and tried two placements, before or after the activation function. After performed better, so the reported results use that.

*[SFX: soft chime]*

**LUCÍA:** Treatment six. Residual connections, from He and colleagues, 2016. They add a layer's output directly to the output of a later layer, giving gradients a shorter path back to earlier layers. The thesis has a specific reason they might suit Permuted MNIST.

**PROF. ADEYEMI:** *(on tape)* Five steps. One: a new permutation does not make the network's knowledge useless. If you applied the same permutation to the columns of the input weight matrix, the first layer's weights, one column per pixel, the network would suffer no drop in performance at all. The shuffled pixels would simply meet their correspondingly shuffled weights. Two: so only the input weights truly need to change to recover. Three: but a standard fully-connected network updates all weights at once, disturbing deeper layers that didn't need to change. Four: worse, the layers closest to the input often change slowest, because gradients shrink as they flow back through the network. That's Bengio and colleagues, 1994, and Pascanu and colleagues, 2013. Five: residual connections give gradients a more direct path to the early layers. That could speed up learning where it's needed, and prevent unnecessary changes elsewhere.

**DEV:** Analogy. An airport renumbers its gates. Only the signage at the entrance needs replacing. The terminal layout is unchanged. A residual connection is a direct line from head office to the sign crew, instead of passing the instruction through every department in between.

**CAPT. AL-HARBI:** *(on tape)* And where that breaks: the direct line in a network doesn't only carry instructions backward to the sign crew. On the forward pass it also carries the early layer's output forward into the later layers. The shortcut runs both ways.

**LUCÍA:** The exact wiring: the output of layer 1 is added to the outputs of layers 2 and 3. The output of layer 2 is added to the output of layer 3. Three shortcuts across three hidden layers. Step-size tuned.

*[SFX: shuffling cards, repeated, accelerating, then a single sustained tone]*

**MIRIAM:** *(narration)* Seven systems, a thousand tasks, thirty runs each. Two questions: does any modification mitigate plasticity loss? And does mitigating it also prevent the four correlates?

*[BEAT]*

**MIRIAM:** The verdict is Figure 3.5.

**LUCÍA:** Audio figure. Figure 3.5: six modifications to the base system, accuracy and the four symptoms. Same layout as Figure 3.4. Five panels. Horizontal axis: the task number, to 1,000. Vertical axis: an average over 30 runs, shading for one standard error. Lines: base system black. Shrink-and-perturb dark orange. L2 regularization pink. CReLU dark blue. Residual connections yellow. Layer norm green. Dropout light blue. All values read off the chart.

**LUCÍA:** Panel a, average online accuracy, from 84% to 94%. Shrink-and-perturb holds flat near 93%. L2 regularization holds just below, also near 93%. CReLU drops early and levels off near 90%. Residual connections settle near 88%. Layer norm declines steadily to about 85.5%. The base system falls to about 83.5%. And dropout falls fastest, leaving the plotted range, below 84%, before task 300.

**LUCÍA:** Panel b, percent of frozen units, 0 to 60%. Residual connections jump to about 60% almost at once. Base system climbs to about 55%. Dropout to about 22%. Layer norm stays near 9%. L2 near 3%. Shrink-and-perturb and CReLU stay at 0%.

**LUCÍA:** Panel c, average weight magnitude, 0 to about 0.35. Layer norm rises highest, about 0.35. Residual connections, dropout and the base system rise to about 0.20 to 0.22. CReLU to about 0.15. Shrink-and-perturb stays flat near 0.03, and L2 near 0.02.

**LUCÍA:** Panel d, average gradient magnitude, about 0.001 to 0.005. CReLU stays highest, near 0.0047. Shrink-and-perturb flat near 0.0021. L2 near 0.0015. Layer norm and dropout drift to about 0.0012. The base system falls to about 0.0009. Residual connections lowest, near 0.0007.

**LUCÍA:** Panel e, stable rank, out of 100. CReLU stays near 94. Shrink-and-perturb near 76. Layer norm near 60. L2 near 57. Dropout drifts down to about 49. The base system falls to about 25. Residual connections fall lowest, to about 14.

*[SFX: ledger bell]*

**THE AUDITOR:** A discrepancy between text and caption. The thesis text says each modification improved on the base system's average online accuracy. The figure caption makes the exception explicit: "except for dropout, all the modifications mitigated plasticity loss to some extent." Panel a agrees with the caption. Dropout falls faster than the base system. The book's reading: five of six improved. Dropout did not.

**MIRIAM:** *(narration)* Five of six arms improved on the control. Most still declined. They slowed the disease; they did not prevent it. Except one.

**THE THESIS:** *(from the thesis, adapted)* Shrink-and-perturb was the only modification with no perceptible drop in performance. It also prevented all four pathologies: it had no frozen units, kept a small average weight magnitude, showed no drop in average gradient magnitude, and kept a high stable rank.

*[SFX: click and hum]*

**NORA:** *(slowly brightening)* Something's different. Every step, I'm pulled a little smaller. And every step, something shakes me. Just slightly. Just enough.

**UNIT 47:** *(surprised)* I felt that. A nudge. My weights moved.

**UNIT 12:** You're talking again.

**NORA:** A thousand shuffles, and the next one still feels like a door.

*[MUSIC: theme, warmer, a piano chord resolves]*

**MIRIAM:** *(narration)* One more piece of evidence points back at the suspects.

**LUCÍA:** Residual connections versus the base system. Frozen units: residual is higher. Expected effect on accuracy: worse. Weight magnitude: higher. Expected: worse. Gradient magnitude: lower. Expected: worse. Stable rank: lower. Expected: worse.

**LUCÍA:** And actual average online accuracy: better than the base system throughout the entire experiment.

*[BEAT]*

**PROF. ADEYEMI:** *(on tape)* That's the cleanest counterexample in the chapter. Sicker on all four symptoms, better from start to finish. The correlates don't explain the difference.

**MIRIAM:** *(narration)* Correlates, not causes. Section 3.4 says it again, louder.

**THE THESIS:** *(from the thesis, adapted)* The most important takeaway is that loss of plasticity is not an inherent aspect of deep learning systems. With the right modifications, a deep learning system can be designed to maintain its plasticity while learning continually.

**MIRIAM:** And a practical by-product: reasonable baselines. The base system, L2 regularization, shrink-and-perturb and the rest become the yardsticks every later chapter's new methods will be measured against.

### Three Things to Remember

*[MUSIC: explainer bed, soft]*

**DEV:** One. Four symptoms travel with plasticity loss: frozen units rise, weights grow, gradients shrink, stable rank falls. Dead ReLUs cannot recover; saturated Sigmoid and Tanh units can; Leaky ReLU cannot freeze. Stable rank counts the top singular values reaching 99% of the total.

**LUCÍA:** Two. Every symptom has a counterexample, and residual connections beat all four at once. Correlates, not causes; but each is still a pathology worth treating.

**MIRIAM:** Three. Plasticity loss is not inherent to deep learning. Five of six modifications helped; dropout did not. Only shrink-and-perturb showed no perceptible decline, near 93% across 1,000 tasks, and kept all four symptoms healthy.

### Check Your Understanding

*[SFX: soft chime]*

**LUCÍA:** One. Why can a dead ReLU unit not recover on its own, while a saturated Sigmoid unit can?

**DEV:** Its output and gradient are exactly zero on every input, so its weights never change. A saturated Sigmoid's gradient is tiny but never exactly zero.

**LUCÍA:** Two. Leaky ReLU networks had zero frozen units yet still lost plasticity. What does that rule out, and which other symptom might explain their decline?

**DEV:** It rules out frozen units as the cause. The rise in weight magnitude, through a worse-conditioned Hessian, could explain it.

**LUCÍA:** Three. A representation layer of 100 units has a stable rank of 25. In plain words?

**DEV:** 25 of 100 feature directions capture 99% of the singular-value mass; the other 75 contribute almost nothing.

**LUCÍA:** Four. Why "correlates" rather than causes?

**DEV:** Each moves with plasticity loss on average, but each has a counterexample in Figure 3.4, so none is a perfect predictor.

**LUCÍA:** Five. In the L2 update, what does one minus lambda alpha do, and why might it help here?

**DEV:** Multiplies every parameter by slightly less than one, pulling weights toward zero and countering weight growth.

**LUCÍA:** Six. What single ingredient turns L2 regularization into shrink-and-perturb?

**DEV:** A small Gaussian noise term, epsilon-t drawn from N of zero, sigma-squared I, added to every parameter at every step.

**LUCÍA:** Seven. Why 50 CReLU activations per layer rather than 100?

**DEV:** Each produces two outputs, so 50 give 100 units, matching the base system's width.

**LUCÍA:** Eight. Why might residual connections suit Permuted MNIST in particular?

**DEV:** Only the input weights need to change, and residual connections give gradients a direct path to those slow early layers.

**LUCÍA:** Nine. Residual connections scored worse than the base system on all four symptoms. What does their better accuracy tell us?

**DEV:** That the four symptoms aren't perfect predictors. Something they don't capture drives the difference.

### Credits and Next Time

*[MUSIC: "Still Learning" theme — low cello pulse, slow piano]*

**MIRIAM:** *(narration)* Four suspects, none convicted. Six treatments, one that held the line. And a lesson that will shape the rest of this investigation: what you can measure is not always what is doing the harm.

**MIRIAM:** But this disease did not appear in 2026. Next time, on STILL LEARNING: Episode Five, "Forty Years of Warnings." From 1986 onward, researchers kept seeing it, under at least eight different names, before anyone recognized it as one phenomenon. We'll trace that trail, and watch a small network kept learning with shrink-and-perturb overtake one ten times its size.

**MIRIAM:** With Dev Raman and Lucía Ferreira. THE THESIS: Graham Asante. NORA: Nell Varga. THE ARCHIVIST: Ruth Kellerman. THE AUDITOR: Samir Haddad.

**MIRIAM:** The thesis is © Juan Fernando Hernandez Garcia, 2026, licensed CC BY 4.0, adapted here with credit. All experts and actors in this series are fictional. The thesis code is at github.com/JFernando4/plasticity-via-reinit. I'm Miriam Okafor.

*[MUSIC: theme resolves; silence]*

### Show Notes

**Thesis sections covered:** §3.3 Correlates of loss of plasticity (pp. 19–24); §3.4 Mitigating plasticity loss (pp. 25–28). Hyperparameters for §3.4 are in thesis Table A.2 (Appendix A).

**Equations**

Unit output (§3.3, unnumbered):

```latex
g(\mathbf{w} \cdot \mathbf{x} + b)
```

Batch of examples (§3.3, unnumbered):

```latex
\mathcal{B} = \{\mathbf{x}_i\}_{i=1}^{m}
```

Frozen ReLU (dead) condition (§3.3, unnumbered):

```latex
g(\mathbf{w} \cdot \mathbf{x}_i + b) = 0 \quad \forall\, \mathbf{x}_i \in \mathcal{B}
```

Frozen Sigmoid/Tanh (saturated) conditions, lower and upper (§3.3, unnumbered; b inside g is the bias, b on the right is the upper bound):

```latex
g(\mathbf{w} \cdot \mathbf{x}_i + b) < a + \epsilon \quad \forall\, \mathbf{x}_i \in \mathcal{B}
```

```latex
g(\mathbf{w} \cdot \mathbf{x}_i + b) > b - \epsilon \quad \forall\, \mathbf{x}_i \in \mathcal{B}
```

Frozen GELU/SiLU condition (§3.3, unnumbered):

```latex
g(\mathbf{w} \cdot \mathbf{x}_i + b) \le 0 \quad \forall\, \mathbf{x}_i \in \mathcal{B}
```

Stable rank (§3.3, unnumbered; Kumar et al., 2021; δ = 0.01, 1,500 observations):

```latex
\operatorname{srank}_{\delta}(\boldsymbol{\Phi}) = \min\left\{ j : \frac{\sum_{i=1}^{j} \sigma_i}{\sum_{i=1}^{k} \sigma_i} \ge 1 - \delta \right\}
```

L2 regularization update (§3.4, unnumbered):

```latex
\boldsymbol{\theta}_{t+1} = (1 - \lambda\alpha)\boldsymbol{\theta}_t - \alpha \nabla_{\boldsymbol{\theta}_t} \ell\left(f_{\boldsymbol{\theta}_t}(\mathbf{x}_t), \mathbf{y}_t\right)
```

Shrink-and-perturb update (§3.4, unnumbered; εₜ ∼ 𝒩(0, σ²I), σ² a variance here):

```latex
\boldsymbol{\theta}_{t+1} = (1 - \lambda\alpha)\boldsymbol{\theta}_t - \alpha \nabla_{\boldsymbol{\theta}_t} \ell\left(f_{\boldsymbol{\theta}_t}(\mathbf{x}_t), \mathbf{y}_t\right) + \boldsymbol{\epsilon}_t
```

CReLU (§3.4, unnumbered; Abbas et al., 2023):

```latex
\operatorname{CReLU}(x) \doteq \left[\operatorname{ReLU}(x), \operatorname{ReLU}(-x)\right]
```

Layer norm mean and variance (§3.4, unnumbered):

```latex
\bar{x} \doteq \frac{1}{n}\sum_{i=1}^{n} \mathbf{x}[i], \qquad s^2 = \frac{1}{n}\sum_{i=1}^{n} \left(\mathbf{x}[i] - \bar{x}\right)^2
```

Layer norm (thesis Equation 3.1):

```latex
\operatorname{Layer\,Norm}(\mathbf{x}) \doteq \frac{\mathbf{x} - \bar{x}}{\sqrt{s^2 + \epsilon}} \odot \boldsymbol{\gamma} + \boldsymbol{\beta}
```

**Audio figures**

- Figure 3.3: six plots of activation output g(x) against input x (−10 to 10), with the frozen region greyed: Sigmoid and Tanh both tails, ReLU/SiLU/GELU the negative side, Leaky ReLU none (ε = 0.01 shown).
- Figure 3.4: five panels over 1,000 tasks for six activations (30 runs): accuracy falls while frozen units and weight magnitude rise and gradient magnitude and stable rank fall; Leaky ReLU never freezes.
- Figure 3.5: same five panels for the base system and six modifications: only shrink-and-perturb shows no perceptible decline and keeps all four symptoms healthy; dropout declines faster than the base system.

**Counterexample table (Figure 3.4)**

| Symptom | Expected if it were the cause | What Figure 3.4 shows instead |
| --- | --- | --- |
| Frozen units (b) | Most frozen units, worst accuracy | SiLU had the most frozen units, yet the highest accuracy for most tasks |
| Weight magnitude (c) | Largest weights, worst accuracy | Sigmoid had the largest weights on final tasks, yet beat GELU, which had the smallest |
| Gradient magnitude (d) | Largest gradients, best accuracy | Tanh had high gradients throughout, yet the worst accuracy on the last 100 tasks |
| Stable rank (e) | Higher stable rank, better accuracy | Tanh's stable rank was similar to GELU's and above ReLU's, yet it did worse than both throughout |

**The six modifications (thesis §3.4)**

| Modification | Kind | Targets | Tuned |
| --- | --- | --- | --- |
| L2 regularization | Update rule | Weight magnitude | Regularization factor (base step-size) |
| Shrink-and-perturb | Update rule | Weight magnitude plus fresh variability | Noise variance (L2's step-size and factor) |
| Dropout | Standard regularizer | None directly | Dropout probability |
| CReLU | Architecture | Dead ReLU units | Step-size (50 activations, 100 units) |
| Layer norm | Architecture | Optimization smoothness | Step-size; placement (after activation won) |
| Residual connections | Architecture | Gradient flow to early layers | Step-size |

**Residual-connection counterexample (Figure 3.5)**

| Measure | Residual vs base system | Expected effect |
| --- | --- | --- |
| Percent of frozen units | Higher | Worse |
| Average weight magnitude | Higher | Worse |
| Average gradient magnitude | Lower | Worse |
| Stable rank | Lower | Worse |
| Actual average online accuracy | Better throughout | — |

**Corrections flagged by THE AUDITOR:** the letter b means the bias inside g and the activation's upper bound on the right of the saturation conditions; in §3.4, 𝒩(0, σ²I) takes a variance, unlike the thesis's notation section; the §3.4 text says "each modification" improved accuracy, but the Figure 3.5 caption and panel a show dropout did not.

All figure values in this episode are read off the chart and approximate.
