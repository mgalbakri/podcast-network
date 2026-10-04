---
number: 10
title: The Fine Print
slug: 10-the-fine-print
summary: A bonus for the curious. Was every method given a fair tune-up? We audit all twenty-five tuning tables like a ledger, then derive the first-order utility line by line, with toy numbers you can check yourself.
coverage: 'Covers book Appendix A, Appendix B and the Back Matter (thesis Appendix A "Hyperparameter Tuning", §A.1–A.4, Tables A.1–A.25; Appendix B "Derivation of First-Order Utility", Eqs. B.1–B.2; glossary, figure/table/equation map and reference list). A bonus episode recorded after the finale: Dr. Sun-Hee Park and THE AUDITOR walk all twenty-five tuning tables like a ledger, Prof. Tomás Adeyemi derives first-order utility line by line while Lucía runs the toy numbers, and the series says goodbye.'
interests:
- ai
- math
estimatedMinutes: 55
status: in-production
---

### Cold Open

*[AMBIENCE: an empty studio after hours. A radiator ticks. Somewhere, a stapler.]*

**MIRIAM:** The finale aired three weeks ago. The verdict was in. The suspects had been named, the cure described, the open questions handed on. We said goodbye.

*[BEAT]*

**MIRIAM:** And then someone in this building turned to the back of the book.

*[SFX: a heavy binder dropped on a desk. Pages riffle for a long time.]*

**DEV:** Miriam, there are twenty-five tables back here.

**LUCÍA:** Twenty-five tables, one derivation, a glossary, a map of every figure, and a hundred and twenty-four references.

**DEV:** It's the part of the book that nobody reads.

**LUCÍA:** It's the part of the book that makes the rest of the book true.

*[SFX: ledger bell]*

**THE AUDITOR:** Good evening. I have been waiting nine episodes for somebody to say that.

**MIRIAM:** Samir Haddad plays THE AUDITOR. Until now he has appeared only when something went wrong: a sign flipped, a caption duplicated. Tonight he gets the whole hour.

**THE AUDITOR:** Every comparison in this series rested on a quiet promise: that each contestant was given a fair tune-up before the race. Tonight we open the books and check.

*[MUSIC: "Still Learning" theme — low cello pulse, slow piano, played a little faster than usual, with a brushed snare that wasn't there before]*

**MIRIAM:** From the team that brought you nine episodes on why neural networks stop learning, this is a bonus episode for the people who read footnotes for fun. I'm Miriam Okafor.

**DEV:** I'm Dev Raman, and I have been told there will be powers of two.

**LUCÍA:** I'm Lucía Ferreira, and there will be so many powers of two.

**MIRIAM:** This is STILL LEARNING. Episode Ten: The Fine Print.

*[MUSIC: theme resolves on a single held piano note]*

### Act One — The Rules of the Audit

*[MUSIC: explainer bed — plucked bass, light percussion]*

**DEV:** Okay. Before we audit anything, I need the dumb question answered, because I have been nodding along for nine episodes. What exactly is a hyperparameter?

**LUCÍA:** A hyperparameter is a setting the experimenter chooses before training. It is not learned by the network. The network learns its weights. The experimenter picks the hyperparameters: how big each learning step is, how strongly to regularize, how often to reinitialize.

**DEV:** So the weights are what Nora learns, and the hyperparameters are the rules of the school she's in.

**LUCÍA:** That is nearly the book's own analogy.

**MIRIAM:** We brought in someone who has designed a few schools.

*[TAPE: Capt. Rashid Al-Harbi, recorded in a flight-crew briefing room. A projector fan hums.]*

**CAPT. AL-HARBI:** Analogy coming, and I'll label it. The weights are what a trainee learns on the job: the feel of the aircraft, the callouts. The hyperparameters are the design of the training programme: the pace, the hours, how often staff rotate. And here is the point the book makes. A bad programme design can make a good trainee look weak. If you want to compare two trainees fairly, you cannot put one in a well-designed programme and the other in a bad one.

**DEV:** Where does it break, Captain?

**CAPT. AL-HARBI:** A trainee can complain about the programme. A network can't. And in my world, you design one programme for everyone. In this thesis, each method gets its own programme, tuned for it. That is the opposite of standardization, and it is deliberate. The fairness comes from every method getting its best design, not the same design.

*[TAPE ends]*

**MIRIAM:** From the thesis, adapted.

**THE THESIS:** Every algorithm was given a fair, systematic search for its best settings before it was compared. The appendix lists every setting tried and every setting chosen, for every experiment.

**MIRIAM:** And the book explains why that matters. A comparison is only as fair as the tuning behind it. If one method gets a careful search and its rival gets defaults, the "winner" may simply be the better-tuned one. The appendix is the audit trail. It lets any reader check that continual backprop, ReDo, selective weight reinitialization, L2 regularization and shrink-and-perturb each competed at their own best settings.

*[SFX: soft chime]*

**LUCÍA:** Toy Box. On the desk I have two coffee cups and three sugar packets per cup.

**DEV:** That's a lot of sugar.

**LUCÍA:** It's a grid. The standard way to choose hyperparameters is a grid search. You list a handful of candidate values for each hyperparameter, you try every combination, you run each one, and you keep the combination that scores best. Two hyperparameters, three candidates each: three times three, nine combinations.

**DEV:** Nine little experiments.

**LUCÍA:** And because training involves randomness, one run can be lucky or unlucky. So each combination is run several times, and the average decides.

**MIRIAM:** The book draws this. Dev, the audio figure.

**DEV:** Audio figure: the grid-search diagram. Picture a three-by-three board, like noughts and crosses. Across the top, three values of one hyperparameter; down the side, three values of another. Inside each square, a little cluster of dots. Each dot is one independent run, sitting at the score that run achieved. Some clusters are tight, some are spread out. One square is highlighted: the one whose dots average highest. That cell is the setting printed in bold in the tables and used in the main text.

**LUCÍA:** Every combination, several runs each, best average kept.

*[MUSIC: explainer bed drops out]*

**MIRIAM:** But the thesis didn't do this once. It did it three times, in three phases. To explain why, we went to our statistician.

*[TAPE: Dr. Sun-Hee Park, recorded in a seminar room. A whiteboard marker squeaks throughout.]*

**DR. PARK:** Phase one is a wide grid search. A broad range of values, with a single run per combination. Its job is only to find the right neighbourhood.

**MIRIAM:** One run. Isn't that exactly the lucky-or-unlucky problem?

**DR. PARK:** It is, and it's fine, because you're not deciding anything precise yet. You're asking "is the good step-size near point-one or near point-zero-zero-one?" A single noisy run can tell you that. Phase two is the narrow grid search: a tighter range around the promising values from phase one, with multiple runs per combination, so that real performance differences can be told apart from noise.

**MIRIAM:** How many runs?

**DR. PARK:** Ten runs per combination in the Permuted MNIST experiments with ten and with one hundred units per layer. Five runs per combination in Continual ImageNet, in Incremental CIFAR-100, and in the Permuted MNIST experiments with one thousand units per layer.

**DEV:** Ten or five. Got it.

**DR. PARK:** Then phase three: final runs. The combination with the highest performance is selected and run an additional number of times. Those are the run counts you heard in the main episodes: thirty, fifteen or twenty, depending on the figure.

**MIRIAM:** And the tables in the appendix list which phase?

**DR. PARK:** Phase two. The narrow search. That's important for reading them. You are not seeing the whole wide sweep; you are seeing the neighbourhood that survived it.

*[TAPE ends]*

*[SFX: ledger bell]*

**THE AUDITOR:** Before we open a single table, the reading instructions. An auditor who misreads the ledger's conventions finds fraud everywhere.

**DEV:** Hit me.

**THE AUDITOR:** One. Notation "x e y" means x times ten to the y. Five e minus three is five times ten to the minus three, which is zero point zero zero five. One e minus zero is one.

**DEV:** One e minus zero. Very dramatic way to write one.

**THE AUDITOR:** Two. Bold marks the value that was selected and used in the main text. When we say "winner" tonight, we mean bold. Three. A row that reads, for example, "Step-size equals five e minus two, Table A.1" means the value was not searched again. It was fixed at the winner of the named table and carried forward. Four. Powers of two are used for reinitialization frequencies. Two to the eight is two hundred fifty-six. Two to the ten, one thousand and twenty-four. Two to the eleven, two thousand and forty-eight. Two to the twelve, four thousand and ninety-six. Two to the thirteen, eight thousand one hundred ninety-two. Two to the fourteen, sixteen thousand three hundred eighty-four.

**LUCÍA:** Listeners, write those on your hand.

**THE AUDITOR:** Five. Where a thesis table has several panels, say three network sizes, the book sets each panel as its own sub-table under a bold label. Six. Shorthand. C-B-P is continual backpropagation. "S-W-R: First-Order, Threshold, Resample" means selective weight reinitialization with first-order utility, threshold pruning and resample reinitialization, and likewise for other combinations. L-N is layer norm.

**MIRIAM:** And then there's the cast list. The symbols.

**LUCÍA:** I'll read it like a playbill. Alpha, the step-size, used by every system: how large each weight update is, the learning rate. Beta-one and beta-two, the moving-average factors in Adam: how much Adam smooths the gradient and its square over time. Momentum, the momentum factor in SGD with momentum: how much of the previous update carries into the next. P, the dropout probability: the chance each unit is switched off during a training step. "Pre-activation," true or false, for residual connections and layer norm: whether the operation is applied before or after the activation function.

**LUCÍA:** Lambda, the regularization factor, in L2 regularization and shrink-and-perturb: how strongly weights are pulled toward zero. Sigma-squared, or sometimes sigma, the noise variance or standard deviation in shrink-and-perturb: how much random noise is added to the weights. Capital M, the maturity threshold in continual backprop: how many updates a unit is protected from reinitialization after it's reset. Tau, the reinit frequency in ReDo and selective weight reinitialization: the number of updates between reinitialization steps.

**DEV:** Wait. Frequency is the number of updates between resets? So a bigger tau means fewer resets?

**LUCÍA:** Yes. It's really a period. Bigger tau, rarer resets. Hold that thought all night.

**DEV:** And rho?

**LUCÍA:** Rho is the fun one. Rho plays three roles. In continual backprop, rho is the replacement rate: the fraction of mature units reinitialized per step. In ReDo, rho is the reinit threshold: units with utility at or below rho times the average utility are reinitialized. In selective weight reinitialization, rho is the reinit factor: under proportional pruning, the fraction of weights reset; under threshold pruning, the fraction of average utility below which weights are reset.

**THE AUDITOR:** The book notes that the thesis reuses rho for three related "how much to reset" knobs. The method in the row tells you which one. I do not log that as an error. I log it as a hazard.

**DEV:** Three employees, one name tag.

**THE AUDITOR:** You read the department. You read the method.

*[MUSIC: a short transitional sting, cello and snare]*

### Act Two — The Permuted MNIST Ledger

*[TIMECODE 14:10]*

*[SFX: shuffling cards]*

**MIRIAM:** Section A.1. Eighteen tables, all for Permuted MNIST, the shuffled-digits problem from Episode Three. The score that guided every search here was the area under the curve of the average online accuracy plot.

**DR. PARK:** One number that sums performance across the whole sequence of tasks. That choice matters. A method that starts brilliantly and then decays is penalized, because all those decayed tasks are inside the area.

**MIRIAM:** And the defaults, unless a table says otherwise?

**DR. PARK:** The optimizer is plain stochastic gradient descent. The network has one hundred units per layer. The activation is ReLU. The architecture is a fully-connected network with three hidden layers.

**THE AUDITOR:** Then we begin. Table A.1. Dr. Park, you take the purpose; I take the bold.

*[SFX: a ledger page turned with great ceremony]*

**DR. PARK:** Table A.1, the base systems: network sizes, optimizers and activations. It feeds Figures 3.2, 3.4 and 3.6, the first demonstrations of plasticity loss. Searched: the step-size for every system, plus momentum and Adam's betas.

**THE AUDITOR:** Bold entries. Ten, one hundred and one thousand hidden units: all chose step-size five e minus two, zero point zero five. Plain SGD: zero point zero five. SGD with momentum searched thirteen step-sizes, from one e minus one all the way down to one e minus seven, and chose five e minus three, with momentum zero point nine out of zero point nine, zero point nine nine and zero point nine nine nine. Adam chose five e minus four, with beta-one zero point nine and beta-two zero point nine nine nine.

**DEV:** Which are Adam's standard defaults.

**THE AUDITOR:** Noted, and the book notes it too. Activations: ReLU, sigmoid, leaky ReLU and SiLU chose zero point zero five. Tanh and GELU preferred the smaller one e minus two, zero point zero one.

**DR. PARK:** These become the "base systems." Every later method is bolted onto one of these.

**THE AUDITOR:** Table A.2. Modifications to the base system with ReLU units. Feeds Figures 3.5 and 3.6, the first remedies. All networks one hundred units per layer, SGD. For layer norm and residual connections, "pre-activation" records whether the operation went before or after the activation.

**DR. PARK:** The base system and the CReLU network both chose zero point zero five. Dropout kept zero point zero five and chose the lightest dropout tried, zero point zero five, from a menu of zero point zero five, zero point one, zero point one five and zero point two.

**THE AUDITOR:** Residual connections and layer norm both tolerated a larger step-size, one e minus one, and both chose pre-activation "False": applied after the activation. L2 regularization ran at the base step-size and chose lambda one e minus four. Shrink-and-perturb reused that lambda and searched only its noise variance, choosing one e minus seven.

**DEV:** So shrink-and-perturb didn't get its own lambda search?

**DR. PARK:** Not here. It inherited L2's winner and tuned the part that makes it different: the noise.

**THE AUDITOR:** Table A.3. Selective unit reinitialization with different network sizes. Feeds Figure 4.1. Every method used its base system's step-size. Continual backprop used contribution utility; ReDo used activation utility; both used hemi-reinitialization. Three panels.

**MIRIAM:** This is the one where width changes everything.

**THE AUDITOR:** One thousand hidden units. L2: one e minus five. Shrink-and-perturb, lambda one e minus five, noise one e minus eight. Continual backprop searched eleven maturity thresholds, from one to one hundred thousand, and chose fifty thousand, with replacement rate one e minus four. ReDo chose frequency two to the thirteen, threshold one e minus three.

**DR. PARK:** One hundred hidden units. L2: one e minus four. Shrink-and-perturb, lambda one e minus four, noise one e minus seven. Continual backprop: maturity threshold five hundred, replacement rate one e minus four. ReDo: every sixteen updates, threshold one e minus four.

**THE AUDITOR:** Ten hidden units. L2: one e minus four. Shrink-and-perturb, lambda one e minus four, noise one e minus nine. Continual backprop: maturity five, replacement rate one e minus three. ReDo: every eight updates, threshold one e minus two.

*[SFX: soft chime]*

**LUCÍA:** Toy Box, quick one. Line up the maturity thresholds. Ten units, five. One hundred units, five hundred. One thousand units, fifty thousand. And ReDo's period: every eight updates in the small network, every sixteen in the medium, every eight thousand one hundred ninety-two in the big one.

**DEV:** The big network barely gets touched.

**LUCÍA:** The book's reading, and it flags it as its own reading, not the thesis's: small networks need frequent, early refreshment; large networks need little.

**MIRIAM:** Capt. Al-Harbi had a thought on that.

*[TAPE: Capt. Al-Harbi]*

**CAPT. AL-HARBI:** Analogy. A small regional fleet of ten aircraft, every tail matters, you rotate components aggressively to keep them all flyable. A fleet of a thousand has slack. Where it breaks: in a fleet, the big operator rotates more parts in absolute terms. Here, the big network's settings are simply gentler. Don't read my fleet economics into it.

*[TAPE ends]*

**THE AUDITOR:** Table A.4. Selective unit reinitialization with different optimizers. Feeds Figure 4.2. Every method used its base step-size; L2 and shrink-and-perturb used the decoupled versions, SGDW and AdamW, with the base system's hyperparameters.

**DR. PARK:** SGD with momentum panel. Base system carried from Table A.1: step-size five e minus three, momentum zero point nine. L2: one e minus four. Shrink-and-perturb: lambda one e minus four, noise one e minus seven. Continual backprop: maturity one, replacement rate one e minus three. ReDo: every eight updates, threshold one e minus three.

**THE AUDITOR:** Adam panel. Base carried from A.1: five e minus four, zero point nine, zero point nine nine nine. L2: one e minus five. Shrink-and-perturb: lambda one e minus five, noise one e minus nine. Continual backprop: maturity one, replacement rate one e minus three. ReDo: every sixteen updates, threshold one e minus five.

**DR. PARK:** The pattern the book points out: with either optimizer, continual backprop chose almost no protection period, M equals one, and a replacement rate ten times higher than with plain SGD in Table A.3. And under Adam, ReDo chose the most cautious threshold tried, one e minus five. It resets only units with nearly zero utility.

**THE AUDITOR:** Table A.5. Selective unit reinitialization with different utility measures, ReLU networks. Feeds Figure 4.4. Hemi-reinitialization throughout; one hundred units; SGD. Baselines carried from Table A.3.

**MIRIAM:** This is the fairness table for the utility comparison.

**DR. PARK:** Exactly. Each of five utility measures got its own search inside each algorithm. Nobody's utility measure was forced to use another's settings.

**THE AUDITOR:** Continual backprop. Contribution utility: maturity five hundred, rate one e minus four. Activation utility: maturity ten, rate one e minus four. First-order utility: maturity five, rate one e minus four. Weight-magnitude utility: maturity five hundred, rate one e minus two. Random utility: maturity five hundred, rate one e minus four.

**LUCÍA:** Weight magnitude is the odd one: a replacement rate a hundred times higher than everyone else.

**THE AUDITOR:** ReDo. Activation: every sixteen, threshold one e minus four. Contribution: every sixteen, threshold one e minus four. First-order: every thirty-two, threshold one e minus five. Weight magnitude: every thirty-two, threshold one e minus three. Random: every eight, threshold one e minus three.

**THE AUDITOR:** Table A.6. Same question for leaky ReLU and Tanh. Feeds Figures 4.5 and 4.3.

**DR. PARK:** Leaky ReLU panel. Base step-size zero point zero five, from A.1. L2: one e minus four. Shrink-and-perturb: lambda one e minus four, noise one e minus seven. Continual backprop with contribution: maturity fifty, rate one e minus three. With first-order: maturity five, rate one e minus four. ReDo with activation: every two hundred fifty-six updates, threshold one e minus one. With first-order: every sixty-four, threshold one e minus three.

**THE AUDITOR:** Tanh panel. Base step-size zero point zero one, from A.1. L2: one e minus five. Shrink-and-perturb: lambda one e minus five, and from a noise menu running down to one e minus twelve, it chose one e minus ten. Continual backprop with contribution: maturity one, rate one e minus four. With first-order: maturity fifty, rate one e minus four. ReDo with activation: every thirty-two, threshold one e minus three. With first-order: every two hundred fifty-six, threshold one e minus two.

**MIRIAM:** And those Tanh first-order numbers are historic, in our little world.

**DR. PARK:** They're the settings that rescued unit reinitialization in Tanh networks, back in Episode Six. Continual backprop at M fifty, rate one e minus four; ReDo every two hundred fifty-six, threshold one e minus two. And Tanh networks preferred very small shrink-and-perturb noise, one e minus ten.

**THE AUDITOR:** Table A.7. Hemi versus full reinitialization. Feeds Figures 4.6 and 4.7. Contribution utility for continual backprop, activation utility for ReDo, one hundred ReLU units, SGD.

**DR. PARK:** Continual backprop with hemi: maturity five hundred, rate one e minus four. With full: the maturity menu ran one, ten, one hundred, one thousand, ten thousand, one hundred thousand; it chose ten thousand, rate one e minus four. ReDo with hemi: every sixteen updates, threshold one e minus four. ReDo with full: the frequency menu ran from two to the five up to two to the thirteen, and it chose the top, two to the thirteen, threshold one e minus one.

**DEV:** Why would full reinitialization want such rare resets?

**DR. PARK:** Full reinitialization also randomizes the outgoing weights, so it disturbs the output more. The search pushed toward rare resets to limit the damage. And here's the subtle consequence. Each task lasted only two thousand updates. Two to the thirteen is eight thousand one hundred ninety-two. So some tasks had no reinitialization step at all.

**MIRIAM:** From the thesis, adapted.

**THE THESIS:** ReDo's erratic performance with full reinitialization, seen in Figure 4.7, traces back to this reinitialization frequency.

**THE AUDITOR:** Table A.8. Unit reinitialization with layer norm. Feeds Figure 4.9, the "what exactly is a unit?" study. One hundred ReLU units, SGD.

**DR. PARK:** Layer norm baselines first. The base system chose step-size one e minus one, with layer norm after the activation, pre-activation False. L2: one e minus five. Shrink-and-perturb: lambda one e minus five, noise one e minus seven.

**THE AUDITOR:** Utility based on raw activations. Continual backprop: maturity one, replacement rate one e minus two. ReDo: every eight updates, threshold one e minus one. Utility based on normalized activations. Continual backprop: maturity one, replacement rate one e minus five. ReDo: every thirty-two, threshold one e minus one.

**LUCÍA:** One e minus two versus one e minus five. A thousand times gentler, just from changing where you measure the unit.

**DR. PARK:** The book's line on this is one I love: the definition of a unit changes the whole operating point.

*[MUSIC: explainer bed returns, lighter]*

**DEV:** Can we take a breath? I've heard "one e minus four" about forty times.

**THE AUDITOR:** Get used to it. We are now entering the weights.

*[SFX: click and hum]*

**THE AUDITOR:** Table A.9. Initial evaluations of selective weight reinitialization. Feeds Figures 5.1 and 5.2. Base system, L2 and shrink-and-perturb carried from Table A.3. Then twelve combinations: three utilities, first-order, weight-magnitude and random; times two pruning criteria, proportional and threshold; times two reinitialization methods, resample and mean. Each tuned on its own. Frequencies from two to the eight to two to the thirteen.

**LUCÍA:** I'll read the winners as frequency, then factor. Proportional pruning with resample. First-order: two to the twelve, zero point four. Weight magnitude: two to the thirteen, zero point eight. Random: two to the twelve, zero point two.

**THE AUDITOR:** Threshold pruning with resample. First-order: two to the eleven, one e minus five. Weight magnitude: two to the eleven, one e minus four. Random: two to the nine, one e minus one.

**LUCÍA:** Proportional with mean. First-order: two to the nine, zero point two. Weight magnitude: two to the thirteen, zero point eight. Random: two to the ten, zero point zero five.

**THE AUDITOR:** Threshold with mean. First-order: two to the eleven, one e minus three. Weight magnitude: two to the ten, one e minus one. Random: two to the ten, one e minus one.

**DR. PARK:** Two patterns. Weight magnitude utility repeatedly chose the largest factor tried, zero point eight or one e minus one. And several winners used frequencies of two to the eleven, two thousand and forty-eight, or more, which is longer than one two-thousand-update task.

**DEV:** Same trap as Table A.7.

**DR. PARK:** Same trap. It produced the undulating curves the thesis attributes to the reinitialization frequency. Which is why Table A.10 exists.

**THE AUDITOR:** Table A.10. Selective weight reinitialization with low reinitialization frequency. Feeds Figure 5.3. Same twelve combinations, but the frequency was capped at two to the ten, one thousand and twenty-four, so that every two-thousand-update task contains at least one reset step.

**LUCÍA:** And the winners, frequency then factor. Proportional with resample: first-order two to the ten, zero point four; weight magnitude two to the ten, zero point eight; random two to the ten, zero point zero five. Threshold with resample: first-order two to the ten, one e minus six; weight magnitude two to the ten, one e minus five; random two to the nine, one e minus one. Proportional with mean: first-order two to the nine, zero point two; weight magnitude two to the ten, zero point eight; random two to the ten, zero point zero five. Threshold with mean: first-order two to the ten, one e minus five; weight magnitude two to the ten, one e minus one; random two to the ten, one e minus one.

**DR. PARK:** Ten of twelve chose the cap itself. That's the book's point: almost every setting slammed against the ceiling, confirming the preference for infrequent resets. And the cap reduced or removed the undulating pattern.

**THE AUDITOR:** Table A.11. The large network, one hundred units per layer, with and without layer norm. Feeds Figure 5.4, the four leading weight-reinitialization settings.

**DR. PARK:** Without layer norm, nothing is re-searched. Everything carries over: first-order threshold resample at two to the eleven, one e minus five; first-order proportional resample at two to the twelve, zero point four; random proportional resample at two to the twelve, zero point two; random proportional mean at two to the ten, zero point zero five. All from Table A.9.

**THE AUDITOR:** With layer norm, the base system carries from Table A.8: step-size one e minus one, after the activation. L2 one e minus five; shrink-and-perturb one e minus five and one e minus seven. Then re-tuned: first-order threshold resample, two to the eleven, one e minus five. First-order proportional resample, two to the eleven, zero point one. Random proportional resample, two to the twelve, zero point two. Random proportional mean, two to the ten, zero point zero five.

**LUCÍA:** The threshold setting landed on exactly the same numbers with layer norm as without. And both random settings matched their Table A.9 values.

**THE AUDITOR:** Table A.12. The small network, ten units per layer, with and without layer norm. Also feeds Figure 5.4.

**DR. PARK:** Without layer norm: base, L2 and shrink-and-perturb carried from A.3, with noise one e minus nine. First-order threshold resample: two to the eleven, one e minus six. First-order proportional resample: two to the twelve, zero point four. Random proportional resample: two to the nine, zero point zero five. Random proportional mean: two to the eight, zero point zero one.

**THE AUDITOR:** With layer norm, there was no earlier table to borrow from. So the base system was tuned right here: step-size one e minus one, layer norm after the activation, L2 one e minus four, shrink-and-perturb noise one e minus ten. Then first-order threshold resample: two to the eleven, one e minus five. First-order proportional resample: two to the eleven, zero point two. Random proportional resample: two to the nine, zero point zero three. Random proportional mean: two to the nine, zero point zero five.

**DR. PARK:** And the first-order threshold setting kept tau two to the eleven in both small variants.

*[MUSIC: out]*

**MIRIAM:** Which brings us to Table A.13. And to the reason Samir has been cracking his knuckles.

*[SFX: ledger bell, twice]*

**THE AUDITOR:** Table A.13. Units versus weights, in large and small networks. Feeds Figure 5.5, the head-to-head. Continual backprop used contribution utility and ReDo used activation utility, both computed on activations, both with hemi-reinitialization. Weight reinitialization used first-order utility, threshold pruning, resample. Four panels, and almost everything is carried over from earlier winners.

**DR. PARK:** Large network: base, L2 and shrink-and-perturb from A.3. Selective weight reinitialization: two to the eleven, one e minus five, from A.11. Continual backprop: M five hundred, rate one e minus four, from A.5.

**THE AUDITOR:** And ReDo. Printed in the thesis as tau equals two to the sixteen, threshold one e minus four, citing Table A.5.

**DEV:** Two to the sixteen is...

**LUCÍA:** Sixty-five thousand five hundred thirty-six.

**THE AUDITOR:** Now go to Table A.5, the cited source. ReDo with activation utility, selected frequency: sixteen. Not two to the sixteen. Sixteen. The book reads "two to the sixteen" as a likely typesetting slip for sixteen. And the book is careful to label that as its own inference, not something the thesis states.

**DEV:** So someone typed sixteen, and the formatting turned it into an exponent?

**THE AUDITOR:** I do not speculate about the mechanism. I note that the cited source says sixteen, and that two to the sixteen was never on Table A.5's menu, which ran from eight to two hundred fifty-six. The correction stands as the book gives it: read sixteen.

**DR. PARK:** Large network with layer norm: base from A.8, step-size one e minus one, after activation; L2 one e minus five; shrink-and-perturb one e minus five and one e minus seven; weight reinitialization two to the eleven, one e minus five; continual backprop M one, rate one e minus two, from A.8; ReDo every eight, threshold one e minus one, from A.8.

**DR. PARK:** Small network: shrink-and-perturb noise one e minus nine; weight reinitialization two to the eleven, one e minus six, from A.12; continual backprop M five, rate one e minus three; ReDo every eight, threshold one e minus two, both from A.3.

**THE AUDITOR:** Small network with layer norm: base from A.12, step-size one e minus one, after activation; L2 one e minus four; shrink-and-perturb one e minus four and one e minus ten; weight reinitialization two to the eleven, one e minus five. This is the only panel that needed fresh tuning. Continual backprop: M one, rate one e minus five. ReDo threshold: the loosest tried, one e minus zero, which is one.

**LUCÍA:** Meaning any unit at or below the layer's average utility gets reset.

**THE AUDITOR:** And ReDo's frequency. The menu was two to the nine, ten, eleven, twelve, thirteen. And there is no bold on any of them.

*[SFX: ledger bell]*

**THE AUDITOR:** Second entry for Table A.13. The thesis does not mark ReDo's chosen frequency in the small-network-with-layer-norm panel. The book reproduces the row and says plainly: no value marked in bold in the thesis. It does not guess. Neither will I.

**MIRIAM:** How serious is that, as an auditor?

**THE AUDITOR:** It is an unmarked line in an otherwise marked ledger. It means a reader cannot recover that one setting from the appendix alone. The code is public, and every episode's credits point you to it.

**THE AUDITOR:** Table A.14. Selective weight reinitialization with different optimizers. Feeds Figure 5.6a. Now, the book says the networks "per the caption, were trained with SGD," while the panels are labelled Adam and SGD with momentum, with L2 and shrink-and-perturb using AdamW and SGDW. The book reports the caption as written. I note it. I don't rule on it.

**DR. PARK:** Adam panel. Base from A.1; L2 one e minus five; shrink-and-perturb one e minus five, one e minus nine, from A.4. First-order threshold resample: two to the eleven, one e minus six. First-order proportional resample: two to the eleven, zero point four. Random proportional resample: two to the nine, zero point zero five. Random proportional mean: two to the ten, zero point one.

**THE AUDITOR:** SGD with momentum panel. Base from A.1; L2 one e minus four; shrink-and-perturb one e minus four, one e minus seven. First-order threshold resample: two to the eleven, one e minus six. First-order proportional resample: two to the eleven, zero point four. Random proportional resample: two to the nine, zero point zero five. Random proportional mean: two to the nine, zero point zero three.

**DR. PARK:** Nearly identical choices across the two optimizers. And the threshold setting chose the smallest factor tried, one e minus six, under both: it reset only weights with almost no utility.

**THE AUDITOR:** Table A.15. Units versus weights with different optimizers. Feeds Figure 5.6b. Nothing new is searched. Adam: weight reinitialization two to the eleven, one e minus six, from A.14; continual backprop M one, rate one e minus three; ReDo every sixteen, threshold one e minus five, both from A.4. SGD with momentum: weight reinitialization two to the eleven, one e minus six; continual backprop M one, rate one e minus three; ReDo every eight, threshold one e minus three.

**DR. PARK:** Tuned against tuned. That's all an auditor wants from a comparison table.

**THE AUDITOR:** Table A.16. Selective weight reinitialization with different activations. Feeds Figure 5.7a. Baselines carried from A.1 and A.6.

**LUCÍA:** Leaky ReLU, frequency then factor. First-order threshold resample: two to the eleven, one e minus three. First-order proportional resample: two to the eleven, zero point four. Random proportional resample: two to the nine, zero point zero three. Random proportional mean: two to the nine, zero point zero three.

**THE AUDITOR:** Tanh. First-order threshold resample: two to the ten, one e minus six. First-order proportional resample: two to the eleven, zero point one. Random proportional resample: two to the eleven, zero point zero three. Random proportional mean: two to the nine, zero point zero one.

**DR. PARK:** The headline: in leaky ReLU networks, the threshold setting chose one e minus three, a hundred times more aggressive than its usual one e minus five. In Tanh, the gentlest value tried, one e minus six.

**THE AUDITOR:** Table A.17. Units versus weights with different activations. Feeds Figure 5.7b. Each method enters with its best utility for that activation. Leaky ReLU: weight reinitialization used random utility, proportional pruning, mean reinitialization, at two to the nine, zero point zero three, from A.16. Continual backprop M fifty, rate one e minus three; ReDo every two hundred fifty-six, threshold one e minus one, both from A.6.

**DR. PARK:** That's the one case where random-utility mean reinitialization beat the first-order threshold setting.

**THE AUDITOR:** Tanh: the unit methods used first-order utility, the choice that rescued them in Tanh networks. Weight reinitialization: two to the ten, one e minus six. Continual backprop: M fifty, rate one e minus four. ReDo: every two hundred fifty-six, threshold one e minus two.

**THE AUDITOR:** And Table A.18, the last Permuted MNIST ledger. Selective weight reinitialization in extra-large networks: one thousand hidden units. Feeds Figure 5.8. Base step-size from A.1; L2 one e minus five and shrink-and-perturb one e minus five, one e minus eight, from A.3.

**LUCÍA:** The searches shift into new territory here. First-order threshold resample searched two to the thirteen, fourteen and fifteen, and factors from one e minus nine to one e minus five. It chose two to the fourteen, one e minus eight. First-order proportional resample: two to the nine, factor one e minus one. Random proportional resample: two to the nine, one e minus two. Random proportional mean: two to the nine, five e minus three.

**THE AUDITOR:** And the units-versus-weights panel: weight reinitialization two to the fourteen, one e minus eight; continual backprop M fifty thousand, rate one e minus four, from A.3; ReDo two to the thirteen, threshold one e minus three, from A.3.

**DR. PARK:** A reset step only every sixteen thousand three hundred eighty-four updates, touching only weights below one hundred-millionth of the average utility. Like the unit methods in Table A.3, weight reinitialization needs very little intervention once the network is wide. Again, the book marks that as its reading.

**MIRIAM:** Eighteen tables. One ledger. Two entries from the auditor.

**THE AUDITOR:** And an honest set of books.

### Act Three — Pictures, Transformers and a Missing Point-One

*[TIMECODE 31:40]*

*[MUSIC: "Still Learning" theme, a single cello phrase]*

**MIRIAM:** Section A.2. Continual ImageNet, the picture problem from Episode Eight. The score changes here: the area under the curve of the average test accuracy per task. And every network was trained with SGDW, with momentum zero point nine.

**DEV:** SGDW. Remind me.

**DR. PARK:** A variant of SGD that keeps the regularization term out of the moving average of the gradient. Loshchilov and Hutter, 2019, introduced back in thesis section 2.3. The key fact for an auditor: it differs from SGD only when regularization is used. Without L2, the two are identical.

**THE AUDITOR:** Table A.19. Base systems and baselines in the simple and mixed convolutional networks. Feeds Figures 6.2b, 6.3b and 6.4. And this table has a deliberate twist. For the base systems, the step-size was chosen to maximize initial performance. Every other system was tuned for area under the curve.

**DEV:** Hang on, that sounds unfair. Different scoring for different contestants?

**DR. PARK:** It's the opposite. The base systems were tuned for a strong start, which is exactly the setting that later loses plasticity. You want the patient to look healthy at the beginning so the decline is visible and the remedies get a fair stress test.

**THE AUDITOR:** Simple network: step-size one e minus three, from a menu of three e minus three, one e minus three, three e minus four. L2: one e minus five. Shrink-and-perturb, lambda one e minus five, noise one e minus eight, from a menu running all the way down to one e minus fourteen. Mixed network: step-size three e minus three. L2: one e minus six. Shrink-and-perturb, lambda one e minus six, noise one e minus eleven.

**LUCÍA:** The mixed network needed ten times weaker L2 and far smaller noise.

**THE AUDITOR:** Table A.20. Selective reinitialization in both convolutional networks. Feeds Figure 6.5. Contribution utility for continual backprop, activation utility for ReDo, hemi-reinitialization; weight reinitialization with first-order threshold resample. Grids of only three values per hyperparameter, five runs each.

**DR. PARK:** Simple network: continual backprop M one, rate one e minus two. ReDo every thirty-two updates, threshold one e minus one. Weight reinitialization two to the ten, factor one e minus four.

**THE AUDITOR:** Mixed network: continual backprop M one, rate one e minus two. ReDo every sixty-four, threshold one e minus one. Weight reinitialization two to the twelve, factor one e minus six.

**DR. PARK:** Continual backprop chose the same aggressive setting in both. Weight reinitialization became much more cautious in the mixed network: every four thousand and ninety-six updates at one e minus six, versus every one thousand and twenty-four at one e minus four.

**THE AUDITOR:** Table A.21. Feeds Figure 6.7, the two fixes for the instability in the mixed network. Base system and L2 from A.19; continual backprop carried from A.20. First panel, proportional pruning. Random proportional mean: two to the nine, factor one e minus three. First-order proportional resample: every two hundred fifty-six updates, factor one e minus four.

**LUCÍA:** So instead of "reset everything below a threshold," reset a fixed small fraction: one in a thousand, or one in ten thousand.

**THE AUDITOR:** Second panel, each reinitialization method combined with L2. Continual backprop plus L2: M one, rate one e minus two. ReDo plus L2: every sixteen, threshold one e minus one. Weight reinitialization plus L2: two to the twelve, one e minus six.

**DR. PARK:** All close to their stand-alone winners in A.20, except ReDo, which moved to more frequent resets: every sixteen updates instead of sixty-four.

*[SFX: shuffling cards, slower, heavier]*

**MIRIAM:** Section A.3. Incremental CIFAR-100, the class-by-class problem from the finale. Two scores this time. Base systems were tuned to maximize top accuracy on all one hundred classes. Every method added to a base system was tuned to maximize top test accuracy across all twenty tasks. Every network trained with SGD with momentum zero point nine.

**THE AUDITOR:** Table A.22. ResNet-18 base system and baselines. Feeds Figure 7.3. Initial step-size: zero point one, not searched. The L2 factor is part of the base system itself: five e minus four, from five e minus three, five e minus four, five e minus five. Shrink-and-perturb used the same initial step-size and schedule, lambda five e minus four, and its noise is given as a standard deviation, sigma, not a variance: one e minus five.

**THE AUDITOR:** Now hold Table A.22 in one hand.

*[SFX: ledger bell]*

**THE AUDITOR:** And Table A.24 in the other. Table A.24 cites the base system as "Initial step-size equals zero point two, lambda five e minus four, Table A.22." Table A.22 says zero point one.

**DEV:** Two different numbers citing each other. That's the auditor's nightmare.

**THE AUDITOR:** It is a reconciling item. The book resolves it this way: thesis section 7.2, our book's Chapter 20, describes a schedule that starts at zero point one and is multiplied by zero point two at set epochs. So the zero point two in Table A.24 is most likely the schedule's decay factor, not a different starting value. The book labels that as its reading. The thesis does not comment.

**MIRIAM:** So the base system starts at zero point one.

**THE AUDITOR:** On the evidence of Table A.22 and Chapter 20, yes. Zero point two is the multiplier.

**THE AUDITOR:** Table A.23. Candidate base systems in vision transformers. Feeds Figure 7.5. Six candidates, differing on three switches. Dev?

**DEV:** Coupled versus decoupled: whether the L2 term is scaled by the scheduled step-size, coupled, or not, decoupled, which is a stronger pull toward zero. Full versus matrix: whether every parameter is penalized, full, or the vector parameters like biases and layer-norm parameters are exempt, matrix. Standard versus reparameterized layer norm: whether the scale is gamma or one-plus-gamma, so a scale shrunk to zero still lets gradients through.

**THE AUDITOR:** Only the first candidate, coupled full with standard layer norm, had its step-size and dropout tuned: max step-size one e minus two, dropout zero point one, lambda six e minus four. The other five inherited that step-size and dropout, to reduce tuning, and searched only lambda. Coupled matrix, standard: two e minus three. Coupled full, reparameterized: two e minus three. Decoupled full, standard: two e minus six. Decoupled matrix, standard: six e minus six. Decoupled full, reparameterized: six e minus six.

**DR. PARK:** Decoupled factors are about a hundred to a thousand times smaller. Two e minus six to six e minus six, against six e minus four to two e minus three. And in the thesis, each candidate's name is coloured to match its line in Figure 7.5.

**THE AUDITOR:** Table A.24. Selective reinitialization in ResNet-18. Feeds Figure 7.6a. Here continual backprop and ReDo both used contribution utility, with hemi-reinitialization; weight reinitialization used first-order threshold resample. Continual backprop: M one thousand, rate one e minus five. ReDo: two to the ten, threshold five e minus two. Weight reinitialization: two to the six, factor one e minus six.

**LUCÍA:** Every sixty-four updates, but only weights below one-millionth of the average utility. Frequent, but tiny.

**THE AUDITOR:** Table A.25. Selective reinitialization in vision transformers. Feeds Figures 7.6b and 7.7. The base system was decoupled full regularization with reparameterized layer norm: max step-size one e minus two, dropout zero point one, lambda six e minus six. Shrink-and-perturb: lambda six e minus six, noise variance one e minus eight. Continual backprop, contribution utility: M ten thousand, rate one e minus seven. ReDo, activation utility: two to the seven, threshold zero point zero zero zero five. Weight reinitialization: two to the seven, factor zero point zero zero zero five.

**DR. PARK:** Every one hundred twenty-eight updates for both ReDo and weight reinitialization, and continual backprop replacing a fraction of one in ten million.

**MIRIAM:** And then, after twenty-five tables, the appendix does something unexpected. It describes how the vision transformer was born.

*[SFX: soft chime]*

**LUCÍA:** Section A.4, initialization. It matters twice over: it sets the starting point, and resample-style reinitialization draws a reset structure's new weights from the initialization distribution. So this is also the recipe for every fresh start.

**LUCÍA:** Patch layer, the first convolution that cuts each image into patches: a truncated Normal distribution, mean zero, truncated at plus or minus two. Its standard deviation is one over the square root of three times four times four. Three is the input channels: red, green, blue. Four by four is the kernel: each patch is four pixels by four. Three times four times four is forty-eight, the number of inputs feeding each output. So sigma is one over root forty-eight, about zero point one four four, computed by the book. Truncated at two means any draw beyond plus or minus two is discarded and redrawn.

**DEV:** Class token?

**LUCÍA:** Zero. Positional encoding: Normal, mean zero, standard deviation zero point zero two. Standard layer norm: gamma one, beta zero. Reparameterized layer norm: gamma zero, beta zero, which, because it scales by one-plus-gamma, also starts as pure normalization. Attention query, key and value: Xavier Uniform. The output projection, W-O: uniform between plus and minus the square root of one over three hundred eighty-four, three eighty-four being the embedding dimension. That's about zero point zero five one. The fully-connected layer in the block, weights and biases: the same bounds. The Linear layer in the block: plus or minus root of one over one thousand five hundred thirty-six, the hidden dimension, four times three eighty-four. About zero point zero two six. Output layer: zero.

**DEV:** Why does the wider layer get the tighter bound?

**LUCÍA:** The book's toy example, illustrative, not from the thesis. A weight drawn uniformly from plus or minus b has variance b squared over three. A unit summing n inputs of variance one has output variance n times b squared over three. Set b to root of one over n, and you get n times one-over-n over three: one third. The same whether n is three eighty-four or fifteen thirty-six. Signals neither explode nor vanish as layers widen.

*[MUSIC: explainer bed, brief]*

**MIRIAM:** Dr. Park, the patterns across all twenty-five.

**DR. PARK:** Three phases for everyone: a wide single-run grid, a narrow multi-run grid with ten or five runs per combination, then extra runs of the winner. The tuning score matched each problem: area under the online-accuracy curve for Permuted MNIST, area under the per-task test-accuracy curve for Continual ImageNet, top accuracy for Incremental CIFAR-100. Methods were stacked on fixed, already-tuned base systems, so differences come from the method, not the step-size. Continual backprop's maturity threshold grew with width: five, five hundred, fifty thousand. The widest networks chose the rarest resets: ReDo every two to the thirteen, weight reinitialization every two to the fourteen. Other settings didn't follow one trend; the book flags that as its reading of the tables.

**THE AUDITOR:** Opinion: every contestant searched, every winner recorded, every carried-over value traced to its source. Exceptions logged: one likely typesetting slip, one unmarked value, one step-size to reconcile. One more waits in Appendix B.


### Act Four — The Proof in the Back

*[TIMECODE 44:20]*

*[TAPE: Prof. Tomás Adeyemi, recorded in his office. Chalk on slate. Lucía is in the room with a calculator.]*

**MIRIAM:** Appendix B proves the claim behind first-order utility from Episode Six: that a unit's importance can be read off numbers backpropagation already computes, its outgoing weights and their gradients. Prof. Adeyemi.

**PROF. ADEYEMI:** Set-up. No bias terms, for simplicity. h-sub-l is the vector of activations of layer l, with d-sub-l units. W-sub-l is the layer's outgoing weight matrix; row j, column i connects unit i in layer l to unit j in layer l-plus-one. The next layer is h-sub-l-plus-one equals g of W-sub-l times h-sub-l, g a nonlinear activation applied entry by entry. y-hat is the prediction, y the label, ell of y-hat and y the loss. And we assume the gradient of the loss with respect to h-sub-l-plus-one is already known. That is reasonable: it is exactly what backpropagation hands backward, layer by layer.

**PROF. ADEYEMI:** Step one, Equation B.1. The gradient of the loss with respect to W-sub-l equals the gradient with respect to h-sub-l-plus-one times the gradient of g of W h with respect to W. That's the chain rule: W affects the loss only through the next layer. Line two: that equals the gradient with respect to h-sub-l-plus-one, multiplied entry by entry with g-prime of W h, times h-sub-l transposed. A column times a row: a full matrix, the same shape as W. Pick row j, column i, and you get B.1: the derivative of the loss with respect to W-sub-l, j-comma-i, equals the derivative with respect to h-sub-l-plus-one at j, times g-prime of W h at j, times h-sub-l at i.

**LUCÍA:** In words: a weight's gradient equals the error signal at the receiving unit times the sending unit's activation. For a ReLU receiver, g-prime is one if active, zero if not.

**PROF. ADEYEMI:** Step two, Equation B.2. The gradient with respect to h-sub-l is the gradient with respect to h-sub-l-plus-one times the gradient of g of W h with respect to h. Which equals W-sub-l transposed times, in brackets, the gradient with respect to h-sub-l-plus-one, entry by entry with g-prime. The same error signals, sent backward through the transposed weights. That is the core step of backpropagation. For one activation: the derivative with respect to h-sub-l at i equals the sum over j from one to d-sub-l-plus-one of W-sub-l at j-i, times the derivative with respect to h-sub-l-plus-one at j, times g-prime at j.

**LUCÍA:** A unit's influence on the loss is the sum, over everyone it feeds, of connection strength times the error at that receiver.

*[SFX: ledger bell]*

**THE AUDITOR:** One entry before step three. The thesis text reads "Using (B.1) and (B.1)." The steps that follow use both B.2 and B.1. The book corrects it to "Using B.1 and B.2." A duplicated label. Harmless; logged.

**PROF. ADEYEMI:** Step three. The change in loss from silencing unit i: the loss with h-sub-l at i set to zero, minus the loss now. First-order Taylor: that's approximately the loss, minus the slope times h-sub-l at i, minus the loss. The change in activation is zero minus h, hence the minus sign. The two copies of the loss cancel, leaving minus the slope times the activation. Substitute B.2 for the slope and move h-sub-l at i inside the sum. Now look at the last three factors of each term: error at j, g-prime at j, h at i. That is B.1. Replace them, and you get: minus the sum over j of W-sub-l at j-i times the derivative of the loss with respect to W-sub-l at j-i.

**LUCÍA:** That's thesis Equation 4.5. Take its expected value over the data and the absolute value and you have first-order utility; estimate the expectation with a mini-batch and you have Equation 4.6.

**PROF. ADEYEMI:** And here is why it's useful. The right-hand side needs only the outgoing weights and their gradients, which backpropagation computes anyway to update the weights. No extra forward pass to switch the unit off.

**DEV:** Analogy check. The book calls it an audit trail.

**PROF. ADEYEMI:** You already know how much each downstream department affects the final result. The derivation traces that sensitivity one step upstream, to a single analyst and the lines connecting them. It breaks where curvature enters: a real organization does not respond in straight lines, and neither does a loss.

**DEV:** Audio figure: the tangent-line diagram. Horizontal axis, the unit's activation; vertical, the loss. A curving line, and a black dot at the current activation. From the dot, the exact change from silencing the unit is a blue bracket on the inside, which needs the true curve and a separate forward pass per unit. First-order utility slides down the straight tangent instead: an orange bracket on the outside. Between them, a small grey gap: the curvature a first-order method ignores.

*[SFX: soft chime]*

**LUCÍA:** Toy Box, invented numbers. Unit i has activation two and feeds two units. Weights: zero point five and minus zero point two five. Error at the receivers: zero point six and minus zero point eight. Both receivers are active ReLUs, so g-prime is one. B.1: the weight gradients are zero point six times one times two, one point two; and minus zero point eight times one times two, minus one point six. B.2: zero point five times zero point six, plus minus zero point two five times minus zero point eight: zero point three plus zero point two, zero point five. Route one: minus two times zero point five, minus one point zero. Route two, through the weights: minus, in brackets, zero point five times one point two plus minus zero point two five times minus one point six. Zero point six plus zero point four. Minus one point zero.

**PROF. ADEYEMI:** Same answer. Silencing the unit is predicted to lower the loss by about one. First-order utility for this observation: one.

**LUCÍA:** Now the honesty check. Suppose the loss as a function of this activation is the toy curve zero point two plus zero point three h plus zero point zero five h squared. At h equals two: zero point two plus zero point six plus zero point two, one point zero, with slope zero point three plus zero point one times two, zero point five, which matches. The exact change, Equation 4.4: loss at zero minus loss at two, zero point two minus one point zero, minus zero point eight. The estimate: minus one point zero. Error: zero point two, from the curvature term.

**PROF. ADEYEMI:** Right direction, right rough size, which is what a ranking needs. Not exact. The second-order methods from Episode Six, LeCun and colleagues in 1989, Hassibi and colleagues in 1993, Dong and colleagues in 2017, try to capture that curvature.

*[TAPE ends]*

### Act Five — The Map at the Back of the Book

*[AMBIENCE: archive room, page turns]*

**THE ARCHIVIST:** Three reference tools close the book. First, the glossary. Each term appears under its thesis name, with a plain meaning and the chapter where it was first defined in bold; later chapters may refine it. Look up "reinitialization frequency" and you'll find the warning Dev needed tonight: tau is a period, so larger tau means less frequent resets. Look up "dormant" and you'll find the vision transformer's threshold, epsilon equals zero point zero one.

**THE ARCHIVIST:** Second, the map: every numbered thesis item, its thesis page, and the book chapter and section that teaches it. Forty-six figures. Thirty tables, with A.1 through A.25 reproduced in full in Appendix A. Five algorithms. Thirty-nine numbered equations: 2.1 to 2.20, 3.1 to 3.5, 4.1 to 4.7, 5.1 to 5.3, 7.1 and 7.2, B.1 and B.2. There is no equation six-point-anything.

*[SFX: ledger bell]*

**THE AUDITOR:** And the thesis cites "(7.3)" for standard layer norm, but no equation carries that number. The unnumbered layer-norm display on thesis page 117 is meant, and Chapter 20 teaches it. The book says coverage was checked chapter by chapter; nothing is missing.

**THE ARCHIVIST:** Third, the references: one hundred twenty-four works, in the thesis's order, thesis pages 132 to 142. Where an author has two works in one year, a letter tells them apart: 2024a, 2024b. The list runs from Abbas and colleagues, 2023, on plasticity loss in deep reinforcement learning, through Selfridge's Pandemonium, 1958, Rumelhart, Hinton and Williams on backpropagation, 1986, Dohare and colleagues in Nature, 2024, and Sokar and colleagues on dormant neurons, 2023, to Zhou and colleagues, 2022, on fortuitous forgetting.

### Listener Question

**DEV:** From a listener who signs off "Grad Student, Third Coffee": "If the narrow search only kept values near the wide search's winners, couldn't a method's true best setting be outside the grid?"

**DR. PARK:** Fair worry, and the appendix lets you look for it, because it prints every menu. Watch for winners sitting at the edge. ReDo with full reinitialization in Table A.7 chose the top frequency on its menu. Weight-magnitude utility in Table A.9 kept choosing the largest factor tried. And in Table A.10, where frequency was capped at two to the ten on purpose, ten of the twelve settings chose the cap. The book reads that as confirming a preference for infrequent resets. The point is: the ledger shows you where the edges are, so you can judge.

### Three Things to Remember

**MIRIAM:** One. Every method was tuned in three phases, wide, narrow with ten or five runs, then final runs, against a score matched to the problem, and stacked on fixed, tuned base systems.

**DEV:** Two. Width shapes the operating point: continual backprop's maturity went five, five hundred, fifty thousand, and the widest networks reset most rarely.

**LUCÍA:** Three. First-order utility equals minus the sum of each outgoing weight times its gradient: a tangent-line estimate that costs almost nothing beyond training.

### Check Your Understanding

**LUCÍA:** Why did the narrow search use multiple runs when the wide one used one? Answer: one run can be lucky; averaging separates real differences from noise once the range is narrowed.

**DEV:** A row reads "lambda equals one e minus four, Table A.3." Was lambda searched there? No: fixed at Table A.3's winner.

**MIRIAM:** Why were the Continual ImageNet base systems tuned for initial performance? To create a strong starter that visibly loses plasticity, a fair test for the remedies.

**DR. PARK:** Why do decoupled candidates use smaller lambdas? Coupled regularization is multiplied by the small, shrinking step-size; decoupled is not, so the same pull needs a smaller factor.

**PROF. ADEYEMI:** What does the derivation assume known? The gradient with respect to the next layer's activations, which backpropagation computes. If h-sub-l at i is zero, every outgoing weight gradient of unit i is zero: a silent unit gets no gradient. The two copies of the loss cancel because Taylor writes the silenced loss as the loss plus a correction.

**LUCÍA:** Last one: flip the second weight to plus zero point two five. Activation gradient: zero point three minus zero point two, zero point one. Estimate: minus zero point two, both routes. Utility drops to zero point two.

### Credits and Next Time

*[MUSIC: "Still Learning" theme — low cello pulse, slow piano, full arrangement]*

**MIRIAM:** Ten episodes. A network that learned once and froze. Forty years of warnings. Units recycled, weights reset, pictures, transformers. And tonight, the ledger that says the race was fair.

**THE AUDITOR:** Books closed. Opinion unqualified.

**NORA:** I'm still learning.

**UNIT 47:** Recycled and proud.

**DEV:** Thank you for listening. Every step-size of it.

**LUCÍA:** And for writing the powers of two on your hand.

**MIRIAM:** STILL LEARNING was reported by Miriam Okafor, Dev Raman and Lucía Ferreira. THE THESIS was voiced by Graham Asante, NORA by Nell Varga, THE ARCHIVIST by Ruth Kellerman, and THE AUDITOR, at last in a starring role, by Samir Haddad. The thesis is © Juan Fernando Hernandez Garcia, 2026, licensed CC BY 4.0, adapted here with credit. All experts and actors in this series are fictional. Code at github.com/JFernando4/plasticity-via-reinit.

**MIRIAM:** There is no next episode. If you want one, go back to Episode One, The Frozen Mind, and listen again. You'll hear it differently now. That, after all, is what it means to keep learning.

*[MUSIC: theme resolves; a final click and hum]*

### Show Notes

**Sources.** Book Appendix A (thesis Appendix A, pp. 143–168: §A.1 Permuted MNIST, Tables A.1–A.18; §A.2 Continual ImageNet, Tables A.19–A.21; §A.3 Incremental CIFAR-100, Tables A.22–A.25; §A.4 vision transformer initialization). Book Appendix B (thesis Appendix B, pp. 169–170; supports Eq. 4.5, thesis §4.2, book Chapter 12). Back Matter: glossary, figure/table/algorithm/equation map, 124 references (thesis pp. 132–142).

**Tuning protocol.** Phase 1: wide grid, 1 run per combination. Phase 2: narrow grid (the values listed in the tables), 10 runs per combination for Permuted MNIST with 10 and 100 units; 5 runs for 1,000 units, Continual ImageNet and Incremental CIFAR-100. Phase 3: winner run again for the main-text run counts (e.g., 30, 15 or 20). Scores: Permuted MNIST, area under the average-online-accuracy curve; Continual ImageNet, area under the average-test-accuracy-per-task curve (base systems tuned for initial performance); Incremental CIFAR-100, top accuracy on all 100 classes (base systems) or top test accuracy across all 20 tasks (methods). Notation: xey = x × 10^y; bold = selected; "(Table A.n)" = carried over, not searched.

**Symbols.** α step-size; β₁, β₂ Adam moving-average factors; momentum; p dropout probability; pre-activation (True/False); λ regularization factor; σ² (or σ) shrink-and-perturb noise; M maturity threshold (CBP); τ reinit frequency, a period (ReDo, SWR); ρ = replacement rate (CBP), reinit threshold (ReDo) or reinit factor (SWR).

**All 25 tables: what each fed and its winners** (τ in updates; "carried" = fixed from an earlier table).

| Table | Feeds | Tuned | Winners |
| --- | --- | --- | --- |
| A.1 | Figs 3.2, 3.4, 3.6 | Base step-sizes; momentum; Adam β | 10/100/1,000 units α=5e-2; SGD 5e-2; momentum α=5e-3, 0.9; Adam α=5e-4, β₁=0.9, β₂=0.999; ReLU, Sigmoid, Leaky ReLU, SiLU 5e-2; Tanh, GELU 1e-2 |
| A.2 | Figs 3.5, 3.6 | First remedies | Base, CReLU 5e-2; dropout α=5e-2, p=0.05; residual α=1e-1, post-activation; L2 λ=1e-4; S&P σ²=1e-7; layer norm α=1e-1, post-activation |
| A.3 | Fig 4.1 | Units, three widths | 1,000: L2 1e-5; S&P 1e-5/1e-8; CBP M=50000, ρ=1e-4; ReDo τ=2¹³, ρ=1e-3. 100: L2 1e-4; S&P 1e-4/1e-7; CBP M=500, ρ=1e-4; ReDo τ=16, ρ=1e-4. 10: L2 1e-4; S&P 1e-4/1e-9; CBP M=5, ρ=1e-3; ReDo τ=8, ρ=1e-2 |
| A.4 | Fig 4.2 | Units, optimizers | Momentum: L2 1e-4; S&P 1e-4/1e-7; CBP M=1, ρ=1e-3; ReDo τ=8, ρ=1e-3. Adam: L2 1e-5; S&P 1e-5/1e-9; CBP M=1, ρ=1e-3; ReDo τ=16, ρ=1e-5 |
| A.5 | Fig 4.4 | Five utilities, ReLU | CBP M/ρ: contribution 500/1e-4; activation 10/1e-4; first-order 5/1e-4; weight magnitude 500/1e-2; random 500/1e-4. ReDo τ/ρ: activation 16/1e-4; contribution 16/1e-4; first-order 32/1e-5; weight magnitude 32/1e-3; random 8/1e-3 |
| A.6 | Figs 4.5, 4.3 | Utilities, Leaky ReLU and Tanh | Leaky: L2 1e-4; S&P 1e-4/1e-7; CBP contribution 50/1e-3; CBP first-order 5/1e-4; ReDo activation 256/1e-1; ReDo first-order 64/1e-3. Tanh: L2 1e-5; S&P 1e-5/1e-10; CBP contribution 1/1e-4; CBP first-order 50/1e-4; ReDo activation 32/1e-3; ReDo first-order 256/1e-2 |
| A.7 | Figs 4.6, 4.7 | Hemi vs full | CBP hemi 500/1e-4; CBP full 10000/1e-4; ReDo hemi 16/1e-4; ReDo full 2¹³/1e-1 |
| A.8 | Fig 4.9 | Layer norm, unit definition | Base α=1e-1, post-activation; L2 1e-5; S&P 1e-5/1e-7. Raw activations: CBP 1/1e-2; ReDo 8/1e-1. Normalized: CBP 1/1e-5; ReDo 32/1e-1 |
| A.9 | Figs 5.1, 5.2 | 12 SWR combinations (τ/ρ) | Prop+resample: FO 2¹²/0.4; WM 2¹³/0.8; random 2¹²/0.2. Thresh+resample: FO 2¹¹/1e-5; WM 2¹¹/1e-4; random 2⁹/1e-1. Prop+mean: FO 2⁹/0.2; WM 2¹³/0.8; random 2¹⁰/0.05. Thresh+mean: FO 2¹¹/1e-3; WM 2¹⁰/1e-1; random 2¹⁰/1e-1 |
| A.10 | Fig 5.3 | Same, τ capped at 2¹⁰ | Prop+resample: FO 2¹⁰/0.4; WM 2¹⁰/0.8; random 2¹⁰/0.05. Thresh+resample: FO 2¹⁰/1e-6; WM 2¹⁰/1e-5; random 2⁹/1e-1. Prop+mean: FO 2⁹/0.2; WM 2¹⁰/0.8; random 2¹⁰/0.05. Thresh+mean: FO 2¹⁰/1e-5; WM 2¹⁰/1e-1; random 2¹⁰/1e-1 |
| A.11 | Fig 5.4 | 100 units ± LN | No LN: carried from A.9 (FO-thresh-resample 2¹¹/1e-5; FO-prop-resample 2¹²/0.4; random-prop-resample 2¹²/0.2; random-prop-mean 2¹⁰/0.05). LN: 2¹¹/1e-5; 2¹¹/0.1; 2¹²/0.2; 2¹⁰/0.05 |
| A.12 | Fig 5.4 | 10 units ± LN | No LN: 2¹¹/1e-6; 2¹²/0.4; 2⁹/0.05; 2⁸/0.01. LN base α=1e-1, post-activation, L2 1e-4, S&P σ²=1e-10; then 2¹¹/1e-5; 2¹¹/0.2; 2⁹/0.03; 2⁹/0.05 |
| A.13 | Fig 5.5 | Units vs weights | Mostly carried. Large: SWR 2¹¹/1e-5; CBP 500/1e-4; ReDo printed 2¹⁶/1e-4 (read 16). Large+LN: SWR 2¹¹/1e-5; CBP 1/1e-2; ReDo 8/1e-1. Small: SWR 2¹¹/1e-6; CBP 5/1e-3; ReDo 8/1e-2. Small+LN (tuned): SWR 2¹¹/1e-5; CBP 1/1e-5; ReDo ρ=1e-0, τ unmarked |
| A.14 | Fig 5.6a | SWR, optimizers | Adam: 2¹¹/1e-6; 2¹¹/0.4; 2⁹/0.05; 2¹⁰/0.1. Momentum: 2¹¹/1e-6; 2¹¹/0.4; 2⁹/0.05; 2⁹/0.03 |
| A.15 | Fig 5.6b | None (all carried) | Adam: SWR 2¹¹/1e-6; CBP 1/1e-3; ReDo 16/1e-5. Momentum: SWR 2¹¹/1e-6; CBP 1/1e-3; ReDo 8/1e-3 |
| A.16 | Fig 5.7a | SWR, activations | Leaky: 2¹¹/1e-3; 2¹¹/0.4; 2⁹/0.03; 2⁹/0.03. Tanh: 2¹⁰/1e-6; 2¹¹/0.1; 2¹¹/0.03; 2⁹/0.01 |
| A.17 | Fig 5.7b | None (all carried) | Leaky: SWR random-prop-mean 2⁹/0.03; CBP 50/1e-3; ReDo 256/1e-1. Tanh: SWR 2¹⁰/1e-6; CBP 50/1e-4; ReDo 256/1e-2 |
| A.18 | Fig 5.8 | SWR, 1,000 units | FO-thresh-resample 2¹⁴/1e-8; FO-prop-resample 2⁹/1e-1; random-prop-resample 2⁹/1e-2; random-prop-mean 2⁹/5e-3. Comparison: SWR 2¹⁴/1e-8; CBP 50000/1e-4; ReDo 2¹³/1e-3 |
| A.19 | Figs 6.2b, 6.3b, 6.4 | Conv base systems, baselines | Simple: α=1e-3; L2 1e-5; S&P 1e-5/1e-8. Mixed: α=3e-3; L2 1e-6; S&P 1e-6/1e-11 |
| A.20 | Fig 6.5 | Reinitialization, conv nets | Simple: CBP 1/1e-2; ReDo 32/1e-1; SWR 2¹⁰/1e-4. Mixed: CBP 1/1e-2; ReDo 64/1e-1; SWR 2¹²/1e-6 |
| A.21 | Fig 6.7 | Proportional pruning; + L2 (mixed) | Random-prop-mean 2⁹/1e-3; FO-prop-resample 256/1e-4. With L2: CBP 1/1e-2; ReDo 16/1e-1; SWR 2¹²/1e-6 |
| A.22 | Fig 7.3 | ResNet-18 base, S&P | Initial α=0.1; λ=5e-4; S&P σ=1e-5 (standard deviation) |
| A.23 | Fig 7.5 | Six ViT candidates | Coupled full std LN: max α=1e-2, p=0.1, λ=6e-4. Coupled matrix std 2e-3; coupled full reparam 2e-3; decoupled full std 2e-6; decoupled matrix std 6e-6; decoupled full reparam 6e-6 |
| A.24 | Fig 7.6a | Reinitialization, ResNet-18 | CBP 1000/1e-5; ReDo 2¹⁰/5e-2; SWR 2⁶/1e-6 (base cited as "0.2", read as decay factor) |
| A.25 | Figs 7.6b, 7.7 | Reinitialization, ViT | Base: decoupled full reparam LN, max α=1e-2, p=0.1, λ=6e-6. S&P σ²=1e-8; CBP 10000/1e-7; ReDo 2⁷/0.0005; SWR 2⁷/0.0005 |

Abbreviations: CBP continual backprop; S&P shrink-and-perturb (λ/σ²); FO first-order; WM weight magnitude; LN layer norm; prop proportional; thresh threshold.

**AUDITOR's log.** (1) Table A.13, large network: ReDo τ printed as 2¹⁶; cited Table A.5 selected 16; the book reads 2¹⁶ as a likely typesetting slip for 16 (book's inference). (2) Table A.13, small network with layer norm: ReDo frequency has no bold value in the thesis. (3) Table A.22 lists initial step-size 0.1; Table A.24 cites "0.2 (Table A.22)"; most likely the schedule's ×0.2 decay factor (book's reading). (4) Appendix B: "Using (B.1) and (B.1)" should read B.1 and B.2. (5) Back Matter: thesis cites "(7.3)" for standard layer norm; no such equation number exists; the unnumbered display on thesis p. 117 is meant. Also noted: Table A.14's caption says SGD while panels use Adam and SGD with momentum.

**Vision transformer initialization (§A.4).**

| Layer | Distribution | Parameters |
| --- | --- | --- |
| Patch convolution | Truncated Normal | Mean 0, σ = 1/√(3·4·4) ≈ 0.144, truncation ±2 |
| Class token | Constant | 0 |
| Positional encoding | Normal | Mean 0, σ = 0.02 |
| Layer norm (standard) | Constant | γ = 1, β = 0 |
| Layer norm (reparameterized) | Constant | γ = 0, β = 0 |
| Attention query, key, value | Xavier Uniform | — |
| Attention output projection W_O | Uniform | ±√(1/384) ≈ 0.051 |
| Fully-connected layer in block | Uniform | ±√(1/384) |
| Linear layer in block | Uniform | ±√(1/1,536) ≈ 0.026 |
| Output layer | Constant | 0 |

**Equations.**

Patch-layer standard deviation (§A.4, unnumbered):

```latex
\sigma = \frac{1}{\sqrt{3 \cdot 4 \cdot 4}}
```

Attention output projection and fully-connected layer bounds (§A.4, unnumbered):

```latex
\pm\sqrt{\frac{1}{384}}
```

Linear layer in the fully-connected block (§A.4, unnumbered):

```latex
\pm\sqrt{\frac{1}{1{,}536}}
```

Gradient with respect to the weight matrix (Appendix B, unnumbered, leads to Eq. B.1):

```latex
\begin{aligned}
\nabla_{\mathbf{W}_l} \ell(\hat{\mathbf{y}}, \mathbf{y})
&= \nabla_{\mathbf{h}_{l+1}} \ell(\hat{\mathbf{y}}, \mathbf{y}) \, \nabla_{\mathbf{W}_l} g(\mathbf{W}_l \mathbf{h}_l) \\
&= \nabla_{\mathbf{h}_{l+1}} \ell(\hat{\mathbf{y}}, \mathbf{y}) \odot g'(\mathbf{W}_l \mathbf{h}_l) \, \mathbf{h}_l^{\top} \\
&= \begin{bmatrix} \vdots \\ \dfrac{\partial \ell(\hat{\mathbf{y}}, \mathbf{y})}{\partial \mathbf{h}_{l+1}[j]} \cdot g'(\mathbf{W}_l \mathbf{h}_l)[j] \\ \vdots \end{bmatrix} \begin{bmatrix} \ldots, & \mathbf{h}_l[i], & \ldots \end{bmatrix}
\end{aligned}
```

Eq. B.1:

```latex
\frac{\partial \ell(\hat{\mathbf{y}}, \mathbf{y})}{\partial \mathbf{W}_l[j,i]} = \frac{\partial \ell(\hat{\mathbf{y}}, \mathbf{y})}{\partial \mathbf{h}_{l+1}[j]} \cdot g'(\mathbf{W}_l \mathbf{h}_l)[j] \cdot \mathbf{h}_l[i]
```

Gradient with respect to the activations (Appendix B, unnumbered, leads to Eq. B.2):

```latex
\begin{aligned}
\nabla_{\mathbf{h}_l} \ell(\hat{\mathbf{y}}, \mathbf{y})
&= \nabla_{\mathbf{h}_{l+1}} \ell(\hat{\mathbf{y}}, \mathbf{y}) \, \nabla_{\mathbf{h}_l} g(\mathbf{W}_l \mathbf{h}_l) \\
&= \mathbf{W}_l^{\top} \left( \nabla_{\mathbf{h}_{l+1}} \ell(\hat{\mathbf{y}}, \mathbf{y}) \odot g'(\mathbf{W}_l \mathbf{h}_l) \right)
\end{aligned}
```

Eq. B.2:

```latex
\frac{\partial \ell(\hat{\mathbf{y}}, \mathbf{y})}{\partial \mathbf{h}_l[i]} = \sum_{j=1}^{d_{l+1}} \mathbf{W}_l[j,i] \, \frac{\partial \ell(\hat{\mathbf{y}}, \mathbf{y})}{\partial \mathbf{h}_{l+1}[j]} \cdot g'(\mathbf{W}_l \mathbf{h}_l)[j]
```

Combination step, ending in Eq. 4.5 (Appendix B, unnumbered Taylor steps):

```latex
\begin{aligned}
\ell(\hat{\mathbf{y}}, \mathbf{y} \mid \mathbf{h}_l[i] = 0) - \ell(\hat{\mathbf{y}}, \mathbf{y})
&\approx \ell(\hat{\mathbf{y}}, \mathbf{y}) - \left( \frac{\partial \ell(\hat{\mathbf{y}}, \mathbf{y})}{\partial \mathbf{h}_l[i]} \right) \mathbf{h}_l[i] - \ell(\hat{\mathbf{y}}, \mathbf{y}) \\
&= -\frac{\partial \ell(\hat{\mathbf{y}}, \mathbf{y})}{\partial \mathbf{h}_l[i]} \, \mathbf{h}_l[i] \\
&= -\sum_{j=1}^{d_{l+1}} \mathbf{W}_l[j,i] \, \frac{\partial \ell(\hat{\mathbf{y}}, \mathbf{y})}{\partial \mathbf{h}_{l+1}[j]} \cdot g'(\mathbf{W}_l \mathbf{h}_l)[j] \cdot \mathbf{h}_l[i] \\
&= -\sum_{j=1}^{d_{l+1}} \mathbf{W}_l[j,i] \cdot \frac{\partial \ell(\hat{\mathbf{y}}, \mathbf{y})}{\partial \mathbf{W}_l[j,i]}
\end{aligned}
```

Toy loss curve used in the Taylor-error check (book's illustration, not from the thesis):

```latex
\ell(h) = 0.2 + 0.3h + 0.05h^2
```

**Toy numbers (Appendix B).** h_l[i] = 2; W = 0.5, −0.25; errors 0.6, −0.8; g′ = 1, 1. Weight gradients 1.2, −1.6. Activation gradient 0.5. Estimate −1.0 by both routes; utility 1.0. Exact change −0.8; Taylor error 0.2. Variant with W[2,i] = +0.25: activation gradient 0.1, estimate −0.2, utility 0.2.

**Audio figures.**

- Grid search diagram (Appendix A): a grid of candidate combinations, a cluster of run-dots per cell; the cell with the best average is bolded and used in the main text.
- Tangent-line diagram (Appendix B): loss versus activation; black dot at the current value; exact change (inner, blue bracket) versus first-order tangent estimate (outer, orange bracket); grey gap is ignored curvature.

**Back Matter.** Glossary: thesis term, plain meaning, chapter of first bold definition. Map: 46 figures, 30 tables, 5 algorithms, 39 numbered equations (2.1–2.20, 3.1–3.5, 4.1–4.7, 5.1–5.3, 7.1–7.2, B.1–B.2; no 6.x). References: 124 works in thesis order, thesis pp. 132–142; same-year works lettered (2024a, 2024b).
