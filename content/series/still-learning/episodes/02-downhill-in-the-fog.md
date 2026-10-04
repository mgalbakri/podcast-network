---
number: 2
title: Downhill in the Fog
slug: 02-downhill-in-the-fog
summary: 'How does a network learn? By feeling the slope of its own mistakes, one small step at a time. Gradient descent, momentum, Adam and weight decay, then a tour of the layers and the single most important idea of the series: the unit.'
coverage: 'Covers book chapters 4–5 (thesis §2.3 "Function Approximation With Neural Networks and Stochastic Gradient Descent" and §2.4 "Neural Network Architectures"). NORA learns how she learns: by feeling the slope of her own mistakes in thick fog, one small step at a time. Then she opens herself up and meets her layers and her units, the computing elements the rest of this investigation will try to save.'
interests:
- ai
- math
estimatedMinutes: 53
status: in-production
---

### Cold Open

*[MUSIC: "Still Learning" theme — low cello pulse, slow piano]*

*[AMBIENCE: wind across an open hillside, a distant bell, footsteps on wet grass]*

**MIRIAM:** Imagine you are standing on a hillside in fog so thick you cannot see your own boots. Somewhere below you there is a valley. You cannot see it. You have no map. All you have is the feel of the ground under your feet: which way it tilts, and how steeply.

*[BEAT]*

**MIRIAM:** So you do the only thing you can. You feel the slope. You take one small step down. You stop. You feel again.

**NORA:** Is that what I'm doing? Every time somebody shows me an example?

**MIRIAM:** That is exactly what you are doing, Nora.

*[SFX: footsteps, slow, deliberate]*

**MIRIAM:** Last time we met Nora, a young neural network, and laid out the charge sheet: networks asked to keep learning slowly lose the ability to learn at all. Before we investigate how that machinery fails, we need to know how it works. Tonight: the update rules that move every number inside a network, the building blocks it is made of, and one definition, the "unit", that the rest of this series leans on.

*[MUSIC: theme swells, then cuts to title sting]*

**MIRIAM:** From the production team behind STILL LEARNING, this is Episode Two. "Downhill in the Fog."

*[MUSIC: explainer bed — plucked bass, light percussion]*

### Act One — The Slope Under Your Feet

*[TIMECODE: 02:10]*

**DEV:** I'm Dev Raman. I brought a headlamp.

**LUCÍA:** I'm Lucía Ferreira, and a headlamp is precisely what you don't get in this metaphor.

**DEV:** Headlamp off. Last episode we said learning means getting the loss down. The loss is how wrong you are, averaged over your examples.

**LUCÍA:** The empirical loss. Equation 2.3 in the thesis, which we covered last time. And the key question the thesis sets up in its Section 2.3 is: how do you find an approximation function f that makes that empirical loss as small as possible?

**LUCÍA:** When f has tunable parameters, searching for a good f is the same as searching for a good parameter vector. The thesis writes it with the Greek letter theta. Theta is every adjustable number in the model.

**DEV:** Labelled analogy: f is a forecasting model with thousands of dials. The search is for the dial settings that make this week's audited forecasts least wrong. It breaks because no human sets these dials on purpose. The algorithm turns them.

**LUCÍA:** Good. Now, what kind of function does the thesis use? Artificial neural networks. And the thesis's definition is short: a neural network is a composition of several nonlinear functions, each with its own parameters.

*[SFX: soft chime]*

**LUCÍA:** Toy Box. Three coffee cups. Whatever comes out of cup one is poured into cup two, then into cup three. That is composition. In symbols: f of x equals f-three of f-two of f-one of x. The output of one function becomes the input of the next.

**LUCÍA:** Nonlinear means the output is not simply proportional to the input. Double the input, and you do not get double the output. That is what lets a stack of these functions bend, curve, and represent complicated relationships.

**LUCÍA:** The thesis also uses the phrase "network architecture": colloquially, the functional form of the network. It specifies a computational graph: the wiring diagram that says how observations are processed to generate predictions.

**DEV:** Labelled analogy, and this one's mine from my airline ops days: the architecture is an organization chart for a review process. Who gets the raw file, who summarizes it, who passes the summary up, who signs the final decision. And the parameters are each reviewer's personal judgement rules.

**DEV:** Where it breaks: on a real org chart people talk sideways. In a network the wiring is fixed by the designer; only the judgement rules, the numbers, change during learning.

**LUCÍA:** One more housekeeping point. Those parameters are spread across many functions, many cups. But it's convenient to write them all as one parameter vector, theta. Every dial in the organization, listed end to end in one long column.

*[MUSIC: explainer bed fades]*

**MIRIAM:** To understand how the dials move, we went to an optimization theorist.

*[TAPE: Prof. Tomás Adeyemi, recorded in his office. A radiator ticks. Chalk on a board.]*

**PROF. ADEYEMI:** Adjusting the parameters to shrink the loss between the network's predictions and the targets is the job of what the thesis calls the optimization algorithm. It writes it with a curly capital O. And it gives that process a name you will hear constantly. It calls it "learning."

**PROF. ADEYEMI:** The common choice is mini-batch stochastic gradient descent. SGD. It is a local search method.

**MIRIAM:** Local meaning?

**PROF. ADEYEMI:** It improves the current solution by looking only at its immediate neighbourhood. It never sees the whole landscape. Your fog, Miriam.

**MIRIAM:** Walk me through the equation.

**PROF. ADEYEMI:** This is Equation 2.6. In words: the new parameters, theta at time t plus one, are defined as the current parameters, theta at time t, minus the step-size alpha-t, times the average, over the m pairs in a mini-batch, of the gradient of the loss on each pair.

**PROF. ADEYEMI:** Theta-t is where you stand now; theta-t-plus-one is where you stand after one step. For each pair i in the mini-batch, you feed observation x through the network f, compare the prediction with target y using the loss, little script-l, and ask how that loss changes if you nudge each parameter. That is the gradient, the upside-down triangle, nabla, with theta-t beneath it: the derivative of the loss on pair i with respect to the current parameters. A vector with one entry per parameter, each entry the slope of the loss in that parameter's direction.

**PROF. ADEYEMI:** And it points uphill. Always. Then one over m, times the sum from i equals one to m. You average those gradients over the m pairs in the mini-batch. Then alpha-t. Alpha-t is greater than zero. It is the step-size, also called the learning rate. How far you move.

 The minus sign moves you against the gradient. Downhill. If you remember one thing about Equation 2.6, remember that minus sign.

*[TAPE ENDS]*

*[SFX: soft chime]*

**LUCÍA:** Toy Box. One parameter. Theta-t equals 2.0. The averaged gradient is 4.0. Step-size 0.1. So theta-t-plus-one is 2.0 minus 0.1 times 4.0. That's 2.0 minus 0.4. Equals 1.6.

**DEV:** And "stochastic"?

**LUCÍA:** It means the slope is estimated from a random sample, the mini-batch, so each reading is slightly noisy.

**DEV:** Labelled analogy, the one in our title: standing on a foggy hillside, you feel the slope under your feet and take one step down. You can't see the valley. You only trust the local slope.

**DEV:** Where it breaks: a hiker has two directions to feel. Nora has one per parameter. And there's a bigger break coming.

*[MUSIC: a single low note]*

**DEV:** Audio figure: gradient descent on a toy loss curve. Picture a horizontal axis, the value of a single parameter, theta. The vertical axis is the loss. The curve has two valleys. There's a shallower valley on the left, and a deeper, lower valley on the right, with a ridge between them. A ball starts at a random point, theta-zero. It steps downhill along the local slope and settles where the slope is zero.

**DEV:** That's the near valley: a local minimum. The lower valley to the right is never reached, because no step can climb the ridge between them.

*[TAPE: Prof. Tomás Adeyemi, continued]*

**PROF. ADEYEMI:** The thesis states the classical result. If the loss is convex in the parameters...

**MIRIAM:** Convex meaning?

**PROF. ADEYEMI:** Shaped like a single bowl. No separate valleys. If the loss is convex, SGD converges to the global minimum, the lowest point anywhere, provided three conditions hold.

**PROF. ADEYEMI:** One. The sum of all the step-sizes, from t equals one to infinity, must be infinite. The steps must add up to infinity, so the search can travel any distance it needs.

**PROF. ADEYEMI:** Two. The sum of the squares of the step-sizes must be finite. Their squares must add up to a finite number, so the steps eventually shrink enough for the noise to die out. A step-size like alpha-t equals one over t satisfies both. One plus a half plus a third and so on diverges. One plus a quarter plus a ninth converges.

**PROF. ADEYEMI:** Three. The observation-target pairs are sampled from a stationary probability distribution. A distribution that does not change over time.

**MIRIAM:** And neural networks?

**PROF. ADEYEMI:** Neural networks are nonlinear, so the loss is typically not convex in theta. The surface has many valleys. SGD can therefore only be expected to converge to a local minimum: a point lower than its immediate surroundings, not necessarily the lowest overall. That is your ball in the left-hand valley.

**MIRIAM:** Which of those conditions does continual learning break?

**PROF. ADEYEMI:** You tell me, Miriam. What does a continual learner face, task after task?

**MIRIAM:** A distribution that changes. Every task, a new one.

**PROF. ADEYEMI:** Then you have answered it yourself. The third condition. Continual learning breaks stationarity on purpose. The distribution, which the book writes as p-sub-k, changes at every task. So the classical guarantee says nothing about the setting this thesis studies. Nothing at all.

*[TAPE ENDS]*

*[SFX: rising tone that thins and flattens]*

**NORA:** So the promise that I'll find the bottom...

**MIRIAM:** Was never made to you, Nora. Not for a hillside that reshapes itself at every task.

**DEV:** That's the bigger break in the fog analogy: Nora's hill gets rebuilt under her feet.

**THE THESIS:** From the thesis, adapted. Because neural networks are nonlinear, their loss is generally not convex, and stochastic gradient descent can only be expected to reach a local minimum.

**MIRIAM:** Loss of plasticity is a failure of this machinery. The same update rule that worked on task one stops producing progress on task five hundred. So we need every variation of the rule the thesis actually uses.

### Act Two — Heavier Boots, Smarter Steps

*[TIMECODE: 11:45]*

*[MUSIC: explainer bed — plucked bass, light percussion]*

**DEV:** There are several common modifications to plain SGD. The thesis names the ones it uses. First up: regularization.

**LUCÍA:** Parameter regularization. Constraining the parameter norm, that's the overall size of the parameters, from growing too large. It's a common way to prevent overfitting.

**LUCÍA:** Overfitting is when a model memorizes its training examples instead of learning the general pattern. The thesis points readers to Chapter 7 of Goodfellow and colleagues, 2016, the standard deep learning textbook.

**LUCÍA:** The most common approach is L2 regularization. Also known as weight decay. It adds to the loss a penalty proportional to the L2 norm of the parameter vector. The L2 norm is the square root of the sum of squared parameters; the penalty conventionally uses its square.

**LUCÍA:** Equation 2.7. Theta-t-plus-one is defined as, open bracket, one minus alpha-t times lambda, close bracket, times theta-t, minus alpha-t times the averaged mini-batch gradient. The same gradient average as Equation 2.6.

**LUCÍA:** Lambda is greater than zero; it's the regularization factor, how strongly large parameters are penalized. One minus alpha-t lambda is a number slightly below one. Multiply theta by it on every step and every parameter shrinks a little toward zero. That shrinking is the "decay" in weight decay. The rest is just the ordinary SGD step.

*[SFX: soft chime]*

**LUCÍA:** Toy Box. Same as before: theta-t is 2.0, gradient 4.0, alpha 0.1. Now add lambda equals 0.01. Alpha times lambda is 0.001. So one minus that is 0.999. Times 2.0 is 1.998. Minus the usual 0.4 gives 1.598.

**LUCÍA:** Slightly smaller than plain SGD's 1.6. Tiny, but every step, forever.

**DEV:** Labelled analogy: a standing budget cut. Every cycle, each department loses a small fixed share of its budget unless the work, the gradient, justifies restoring it. Only line items that keep earning their keep stay large.

**DEV:** Where it breaks: a department can lobby. Here the only argument is the gradient.

**LUCÍA:** And here's why the thesis cares. Later in the book, growing weight magnitude shows up as one of the symptoms of plasticity loss. That's why the thesis tests L2 regularization as a remedy and pairs it with its own methods.

*[MUSIC: bed shifts, a little heavier]*

**DEV:** Next: momentum.

**LUCÍA:** SGD with momentum uses a moving average of the gradient instead of only the gradient from the current mini-batch. Two lines. Equation 2.8.

**LUCÍA:** Line one. The momentum vector, bold m-t-plus-one, equals one minus beta, times the old momentum, bold m-t, plus beta times, in brackets, the averaged mini-batch gradient, plus lambda times theta-t. Line two. Theta-t-plus-one equals theta-t minus alpha-t times bold m-t-plus-one.

**DEV:** Wait. You already used m for the mini-batch size.

**LUCÍA:** Good catch. Bold m is the momentum vector, a running average of recent gradients, one entry per parameter. Plain, non-bold m is still the mini-batch size. Beta is between zero and one inclusive; it's the moving average factor, how the new gradient gets blended with the old average.

**LUCÍA:** The plus lambda-theta is optional, added only when L2 regularization is used. The thesis actually prints it in red to flag that it's optional. It's the gradient of the L2 penalty, folded into the average. And line two steps the parameters along the averaged direction instead of the raw one.

**DEV:** Labelled analogy: a supertanker's heading. One gust, one noisy mini-batch, barely changes course. A steady wind, a consistent gradient, turns it decisively.

**DEV:** Breaks where: a supertanker has physical mass; this momentum is just an average of numbers.

*[SFX: soft chime]*

**LUCÍA:** Toy Box. I'm going to read the equation literally, exactly as the thesis prints it, with beta equal to 0.1 and no L2. Start with m-zero equals zero. First gradient is 4.0. So m-one equals 0.9 times zero, plus 0.1 times 4.0. That's 0.4. Now suppose the next gradient is minus 4.0. Noise flipped the sign. m-two equals 0.9 times 0.4, which is 0.36, plus 0.1 times minus 4.0, which is minus 0.4. Total: minus 0.04.

**DEV:** Two contradictory readings nearly cancel. But why "literally, as the thesis prints it"?

*[SFX: ledger bell]*

**THE AUDITOR:** Reading note on beta, from the book. As Equation 2.8 is written, beta weights the new gradient. The widely used convention, and the one in Kingma and Ba's paper, puts the factor on the old average instead.

**THE AUDITOR:** The book files it as a reading note, not an error. But you need to know which convention the numbers follow. The bias-correction terms of the Adam equation, coming next, and the settings the thesis uses later, momentum 0.9, and Adam's beta-one equals 0.9 and beta-two equals 0.999, all follow the common convention. Under that convention, the larger share sits on the old average.

**LUCÍA:** So when later episodes say "momentum 0.9"...

**THE AUDITOR:** It means ninety percent of the weight on the old average, ten percent on the new gradient. Which is what Lucía's toy example did numerically, by choosing beta equals 0.1 in the printed form. Either way, the idea is the same. A smoothed gradient. Entry closed.

*[SFX: ledger bell, softer]*

*[MUSIC: bed resolves]*

**MIRIAM:** Momentum smooths the direction. The next optimizer gives every parameter its own step-size.

*[TAPE: Prof. Tomás Adeyemi, recorded in his office]*

**PROF. ADEYEMI:** The Adam optimizer. Kingma and Ba, 2015. It takes the momentum idea further: it also scales the update by a moving average of the squared gradients. The thesis prints it as Equation 2.9. Five lines.

**PROF. ADEYEMI:** Line one. Bold g-t-plus-one is the averaged mini-batch gradient, plus lambda times theta-t only when L2 regularization is used. Again printed in red in the thesis.

**PROF. ADEYEMI:** Line two. Bold m-t-plus-one equals one minus beta-one, times m-t, plus beta-one times g-t-plus-one. The momentum term, with its factor beta-one, between zero and one.

**PROF. ADEYEMI:** Line three. Bold v-t-plus-one equals one minus beta-two, times v-t, plus beta-two times g-t-plus-one squared. A moving average of squared gradients, factor beta-two, between zero and one. The square is applied elementwise: each entry squared on its own. So v tracks how large each parameter's gradients typically are.

**PROF. ADEYEMI:** Line four, the bias corrections. M-hat equals m-t-plus-one divided by one minus beta-one to the power t-plus-one. V-hat equals v-t-plus-one divided by one minus beta-two to the power t-plus-one. Both averages start at zero, so early on they underestimate the truth. Dividing by one minus beta to the power t-plus-one inflates them to compensate. As t grows, that correction fades.

**PROF. ADEYEMI:** Line five. Theta-t-plus-one equals theta-t minus alpha-t times m-hat divided by, the square root of v-hat, plus epsilon. The square root and the division are elementwise. Epsilon is a small positive number that prevents division by zero.

**MIRIAM:** What does it buy you?

**PROF. ADEYEMI:** Each parameter gets its own effective step-size. A parameter with consistently large gradients is divided by a large square-root-of-v-hat, so its step is tempered. One with tiny gradients is divided by a small square-root-of-v-hat, so its step is amplified.

**PROF. ADEYEMI:** Under the standard convention, at the very first step, m-hat equals the gradient g and v-hat equals g squared. So the step is alpha times g divided by the absolute value of g. Plus or minus alpha, ignoring epsilon. Whether the gradient is 0.001 or 1,000, the parameter moves by about alpha. That scale-independence is Adam's defining trait.

**PROF. ADEYEMI:** Miriam, if one aircraft in a fleet threw a fault flag every week and another almost never, would you adjust both by the same amount?

**MIRIAM:** I'd ask someone who has run a fleet.

*[TAPE ENDS]*

*[TAPE: Capt. Rashid Al-Harbi, recorded at a flight training centre. A simulator hums in the background.]*

**CAPT. AL-HARBI:** Labelled analogy, from the book. Adam is like a fleet manager who sets each aircraft's maintenance interval from its own history. A frequently flagged aircraft gets cautious, small adjustments. A rarely flagged one gets bolder ones. One global policy, that's your alpha, individually calibrated.

**MIRIAM:** Where does it break?

**CAPT. AL-HARBI:** My records are about faults, and a quiet aircraft is a good aircraft. Adam's records are about the size of the slope. It amplifies a parameter's step because its gradients are small, with no opinion about whether that parameter is healthy. It isn't judging reliability. It's judging scale.

*[TAPE ENDS]*

*[TIMECODE: 22:30]*

*[AMBIENCE: archive room, page turns]*

**THE ARCHIVIST:** The record shows a paper by Loshchilov and Hutter, published in 2019. It suggested that including the regularization term inside the moving averages may lead to optimization instabilities. It proposed taking the term out, so that weight decay acts directly on the parameters and never passes through the averages. The name in the literature is decoupled weight decay.

**LUCÍA:** Two decoupled optimizers. First SGDW. Equation 2.10. Line one: m-t-plus-one equals one minus beta, times m-t, plus beta times the averaged mini-batch gradient. Just the loss gradient. No lambda-theta. Line two: theta-t-plus-one equals, one minus alpha-t lambda, times theta-t, minus alpha-t times m-t-plus-one. The shrink acts directly on the parameters, exactly as in Equation 2.7. Then AdamW. Equation 2.11. Line one: g-t-plus-one is the pure loss gradient, with no lambda-theta. M-hat and v-hat are computed exactly as in Adam, Equation 2.9, from that pure gradient. Line two: theta-t-plus-one equals, one minus lambda alpha-t, times theta-t, minus alpha-t times m-hat over the square root of v-hat plus epsilon.

**DEV:** So the shrink sits outside Adam's per-parameter scaling. Every parameter shrinks by the same proportion. Why does that matter?

*[TAPE: Prof. Tomás Adeyemi, continued]*

**PROF. ADEYEMI:** The thesis gives the reason as stated by Loshchilov and Hutter: the regularization term inside the moving averages can destabilize optimization. The book adds a mechanism, labelled as background, not a thesis claim. It is easiest to see in Adam.

**PROF. ADEYEMI:** When lambda-theta passes through the division by square-root-of-v-hat, its effect is rescaled parameter by parameter. Parameters with large gradient histories receive much less shrinkage than intended, and the penalty no longer acts as a uniform pull toward zero. Decoupling restores the uniform pull: every parameter loses the same fraction, one minus lambda alpha-t, per step.

**PROF. ADEYEMI:** A subtle footnote. For plain SGD without momentum, folding lambda-theta into the gradient and shrinking theta directly give the same update. That is why Equation 2.7 covers both readings. With momentum or Adam, the two differ.

*[TAPE ENDS]*

**THE THESIS:** From the thesis, adapted. Where learning systems use L2 regularization or shrink-and-perturb, they are run with SGDW and AdamW, to prevent learning instabilities that are unrelated to loss of plasticity.

**MIRIAM:** Shrink-and-perturb we meet later. Note the discipline: when the thesis tests a remedy, it wants plasticity loss to be the only suspect in the room.

*[MUSIC: explainer bed]*

**LUCÍA:** Audio figure: the optimizer family, from the book. Two rows of boxes. The top row adds features to the basic step, left to right: SGD, momentum, Adam. The bottom row shows where the weight-decay term goes: inside the averages, or outside, acting directly on theta. Two boxes are highlighted: SGDW and AdamW, the decoupled versions the thesis relies on when regularization is in play.

**DEV:** And the book's side-by-side table, read like a departures board. SGD, 2.6: no averaging, no scaling, no decay. SGD with L2, 2.7: shrinks theta by one minus alpha lambda each step. Momentum, 2.8: averages the gradient, optional lambda-theta inside. Adam, 2.9: averages gradient and squared gradient, bias-corrected, scales per parameter, optional lambda-theta inside. SGDW, 2.10, and AdamW, 2.11: same averaging as their parents, decay moved outside. The full board is in the show notes.

*[MUSIC: "Still Learning" theme, a short phrase, then silence]*

**MIRIAM:** So that is how Nora moves. But moves what, exactly? We have to open her up.

### Act Three — Opening Nora Up

*[TIMECODE: 27:15]*

**NORA:** I've never looked inside before.

**MIRIAM:** From the thesis, Section 2.4. Every network in the thesis is a stack of a few standard layer types. Each function in the composition is called a layer. Each layer contains several units of computation. And what a unit is, the thesis warns, differs by layer type.

*[SFX: a low chorus murmur]*

**UNIT 12:** Hello?

**UNIT 47:** We're in here.

**UNIT 88:** All of us. Hundreds.

**DEV:** Labelled analogy: a layer is a department; units are the analysts in it. Each analyst takes in the same briefing pack, applies a personal weighting to it, and passes a single conclusion to the next department.

**DEV:** It breaks because real analysts write paragraphs. A unit passes on one number per input.

*[MUSIC: explainer bed]*

**LUCÍA:** The simplest layer is the linear layer. It applies an affine transformation: multiply by a matrix, then add a vector. Equation 2.12. Linear of x equals W x plus b.

**DEV:** Symbols, please.

**LUCÍA:** The input, bold x, is n numbers. W is a parameter matrix with m rows and n columns; its elements are the layer's weights. W times x: output number j is the weighted sum of all n inputs, using row j of W as the weights. Remember that phrase, row j. Then b holds m numbers, the biases, one constant added to each output. The output has m numbers, one per unit.

*[SFX: soft chime]*

**LUCÍA:** Toy Box. Input x equals 1, 2. W has two rows: the first row is 0.5, minus 1; the second row is 2, 0. Bias b equals 0.1, minus 1. Output one: 0.5 times 1, plus minus 1 times 2, plus 0.1. That's 0.5 minus 2 plus 0.1: minus 1.4. Output two: 2 times 1, plus 0 times 2, minus 1. That's 1.0.

**LUCÍA:** Now the problem. An affine transformation alone is not nonlinear. And stacking affine maps only produces another affine map.

**LUCÍA:** So layers often include a nonlinear function g, which takes one real number and returns one real number, applied elementwise, to each output separately, after the affine transformation. Equation 2.13: Fully-Connected of x equals g of, W x plus b. The thesis calls a linear layer that includes a nonlinear activation function a fully-connected layer. And g is called the activation function.

**LUCÍA:** Two terms used constantly later. Pre-activations: the outputs of the affine transformation, before g. Activations: the outputs after g, written bold h.

**LUCÍA:** Toy continued. Take g equals ReLU, which we'll define in a second. Pre-activations minus 1.4 and 1.0 become activations zero and 1.0.

**UNIT 12:** Zero. That's me. I'm silent.

**LUCÍA:** For this input, Unit 12, yes.

**UNIT 12:** Only for this input?

**LUCÍA:** Hold that question. It becomes the whole series.

*[TIMECODE: 31:00]*

**MIRIAM:** The thesis considers a selection of the most common activation functions. It shows them in its first figure, Figure 2.1. Dev.

**DEV:** Audio figure: Figure 2.1, six nonlinear activation functions. Six panels in two rows. In every panel, the horizontal axis is the input x, running from minus 10 to 10, and the vertical axis is the output, g of x. Dashed lines mark x equals zero and g of x equals zero. The formula sits under each plot. Top row, left to right: Sigmoid, ReLU, SiLU. Bottom row: Tanh, Leaky ReLU, GELU. Sigmoid's vertical axis runs 0 to 1, Tanh's minus 1 to 1, and the other four 0 to 10. The thesis notes these are only a small sample of the functions used in deep learning.

**LUCÍA:** I'll do the formulas. Sigmoid: g of x is defined as one over, one plus e to the minus x. An S-curve, flat at both ends, output between 0 and 1. Hyperbolic tangent, Tanh: e to the x minus e to the minus x, over e to the x plus e to the minus x. A steeper S-curve centred on zero, output from minus 1 to 1.

**LUCÍA:** Rectified Linear Unit, ReLU: g of x is the max of zero and x. Zero for negative x, identity for positive x. Output from zero upward. Leaky ReLU: max of zero and x, plus alpha times the min of zero and x, with alpha equals 0.01. Like ReLU, but a slight downward slope on the negative side. Not the step-size alpha; same letter, different job.

**LUCÍA:** Sigmoid Linear Unit, SiLU: x over, one plus e to the minus x. A smooth ReLU-like curve with a small dip below zero near x of about minus 1. And Gaussian Error Linear Unit, GELU: x over two, times, one plus erf of x over root two. Where erf of x, the error function, is two over root pi times the integral from zero to x of e to the minus t squared, dt. Also a smooth ReLU-like curve with a small dip below zero.

**MIRIAM:** Professor, the book says three features of this figure matter for the rest of the investigation.

*[TAPE: Prof. Tomás Adeyemi, recorded in his office]*

**PROF. ADEYEMI:** First, flat regions. Sigmoid and Tanh go flat at both ends. ReLU is exactly flat, exactly zero, for every negative input. Where g is flat, its slope is zero, on ReLU's negative side, or nearly zero, in the tails of Sigmoid and Tanh. And then the gradient passing back through the unit vanishes, or becomes tiny, and the unit's input weights stop changing, or change very slowly.

**MIRIAM:** The fog again. No slope under your feet.

**PROF. ADEYEMI:** No slope, no step. Second, Leaky ReLU exists precisely to keep a small slope, alpha equals 0.01, on the negative side, so a unit never goes fully silent. Third, SiLU and GELU are smooth relatives of ReLU, used in modern architectures such as transformers.

*[TAPE ENDS]*

*[SFX: rising tone that thins and flattens]*

**UNIT 47:** What happens to a ReLU unit whose pre-activation is negative... for everything?

**MIRIAM:** It outputs zero everywhere and receives no gradient. It's often called a dead unit. More generally, a unit stuck in a flat region of its activation function stops learning. The thesis measures the percentage of such frozen units as one of the symptoms of plasticity loss. We'll take that evidence in a later episode.

*[MUSIC: explainer bed]*

**DEV:** We got a listener question on exactly this. From a listener who flies regional turboprops: "If ReLU can kill a unit, why doesn't everyone just use Leaky ReLU and be done with it?"

**LUCÍA:** Honest answer: these chapters don't settle it. They say what Leaky ReLU is for, a slope of 0.01 so a unit never goes fully silent. Whether that is enough to keep a network learning across hundreds of tasks is a question the investigation tests later.

*[TIMECODE: 35:20]*

**LUCÍA:** A convolutional layer applies one small set of weights at every position of an image. Convolutional layers gained popularity from their success on image recognition; the thesis cites Lecun and colleagues, 1998. Their inputs are multi-dimensional tensors, such as images.

**LUCÍA:** The layer has several filters that slide over the image, applying the same nonlinear function to different patches, small square windows. The outputs are multi-dimensional arrays called channels, written bold capital H.

**LUCÍA:** One filter, one formula. A filter is a tensor of weights, say W, a d-by-d grid, plus a single scalar bias b. Take an input A, an n-by-n grid with n bigger than d. The filter is applied to each d-by-d submatrix, each patch B. Equation 2.14: f of B equals g of, b plus the double sum over i from one to d and j from one to d, of W at i, j times B at i, j.

**LUCÍA:** B is one patch. W at i, j times B at i, j multiplies each filter weight by the pixel underneath it. The double sum adds all d-by-d products: a weighted sum over the patch. Add the bias, apply the activation. The result is one number: one cell of the output channel.

*[SFX: soft chime]*

**LUCÍA:** Toy Box. A two-by-two filter. Weights: top row 1, 0; bottom row 0, minus 1. Bias zero, g is ReLU. Patch one: top row 5, 3; bottom row 2, 1. One times 5, plus 0 times 3, plus 0 times 2, plus minus 1 times 1: that's 4. ReLU of 4 is 4. Patch two: top row 1, 3; bottom row 2, 5. One minus 5 is minus 4. ReLU gives 0.

**DEV:** So it lights up when the top-left is brighter than the bottom-right.

**LUCÍA:** That's what this filter responds to.

**LUCÍA:** Stride and padding are both hyperparameters. A hyperparameter is a setting chosen by the designer, not learned. Stride controls how fast the filter slides across the image: how many pixels it moves between applications. It sets how many patches get processed. Padding is how many rows and columns of zeros are added around the input's edges, often to preserve the input's dimensions. The final dimensions of a channel depend on the stride and padding values.

**LUCÍA:** And each filter in the layer has its own weights and bias and produces one output channel. So the layer's output H has dimensions c by d-one by d-one, where c is the number of filters and d-one is the side length of each channel.

**DEV:** Audio figure: convolution, one filter sliding over an image to make one channel. Picture a toy five-by-five grid of input numbers. Over it, a three-by-three window, the filter, at one position in the top-left corner. Then the same window, shifted one step to the right. Off to the side, a three-by-three output grid, the channel. Each position of the window produces one cell of that channel through Equation 2.14, using the same nine weights and one bias every time.

**CAPT. AL-HARBI:** Labelled analogy. A filter is a single inspection checklist applied to every bay of a hangar in turn. The checklist, the weights, never changes from bay to bay. The channel is the resulting grid of scores, one per bay. A layer with c checklists produces c score grids. Where it breaks: my inspectors adapt a checklist to an unusual aircraft. A filter never adapts by position.

**LUCÍA:** Pooling layers. Convolutional layers are often used with them. A pooling layer applies a pooling operation, such as the average or the maximum, over two-dimensional patches of the channels. It slides over the channels like a filter. Depending on stride and padding, it may reduce the channels' dimensions. Toy: max pooling with a two-by-two window and stride 2 turns a four-by-four channel into a two-by-two channel, each cell keeping the largest of four values.

**DEV:** And it learns nothing. Pooling has no weights.

*[TIMECODE: 40:05]*

*[MUSIC: a new texture, a little more modern]*

**MIRIAM:** The next block sits behind today's large language models. We asked an engineer who runs them.

*[TAPE: Dr. Priya Venkataraman, recorded in a server-room annex. Fans whir.]*

**DR. VENKATARAMAN:** An attention layer lets every element of the input decide how much to draw on every other element. It's popular in natural language processing. The thesis records that it was first proposed by Bahdanau and colleagues in 2014 and popularized by the transformer architecture of Vaswani and colleagues in 2017, which is now central to large language model applications.

**DR. VENKATARAMAN:** The central piece is SoftMax. Equation 2.15. For a vector x of n numbers, SoftMax of x is defined as the column of: e to the x-one, over the sum from j equals one to n of e to the x-j; and so on down to e to the x-n over that same sum. The little T at the end, the transpose, just writes it as a column.

**DR. VENKATARAMAN:** Exponentiating makes every entry positive and exaggerates differences between large and small entries. Dividing by the sum makes the n results add up to one. Net effect: a vector of real values becomes a vector of probabilities. Example: x equals 0.0, 1.9, 0.7. The e-values are 1.00, 6.69, 2.01. They sum to 9.70. So SoftMax gives, approximately, 0.10, 0.69, 0.21.

**DR. VENKATARAMAN:** The layer takes a matrix X, n rows by d columns. n items, say n words, each described by d numbers. It builds three matrices with learnable parameter matrices. Q is defined as X times W-Q, where W-Q is d by d-Q. K is X times W-K, also d by d-Q. V is X times W-V, which is d by d-V. Queries: each row says what that item is looking for. Keys: each row says what that item offers to be matched against. Queries and keys share the width d-Q so they can be compared. Values: each row is the content that item hands over if selected, width d-V. And W-Q, W-K, W-V are learned weights.

**DR. VENKATARAMAN:** Labelled. A query is a search request, keys are the index cards on each file, values are the files' contents. The search returns not one file but a blend of all files, weighted by how well each card matches. It breaks because a real search engine returns discrete results; attention always returns a mixture, even of terrible matches, just with small weights.

**DR. VENKATARAMAN:** The operation itself, Equation 2.16. Attention of Q, K, V is defined as SoftMax of, Q times K-transpose, divided by the square root of d, all times V. Q K-transpose compares every query with every key: an n-by-n table of match scores. Dividing by root d keeps the scores from growing too large as dimensions grow. SoftMax is applied across each row, so each item's scores become weights that sum to one. Multiplying by V gives each item a weighted mix of all items' values. And because Q, K and V all come from the same input X, Equation 2.16 is also known as self-attention.

*[TAPE ENDS]*

*[SFX: ledger bell]*

**THE AUDITOR:** One entry for the ledger. The thesis writes the scaling in Equation 2.16 as the square root of d. The book notes that the original transformer paper uses the key width, which in this notation is d-Q. Same purpose: keeping the scores from growing too large. Entry closed.

*[SFX: ledger bell, softer]*

**LUCÍA:** Audio figure: self-attention, query-key matching weights a mix of values. Three tokens in a row. Token 3's query reaches out to all three keys. The scores go through SoftMax and come out as weights 0.10, 0.69 and 0.21, the same numbers as our toy. The output for token 3 is that weighted mix of the values. Toy numbers, the book says.

*[TAPE: Dr. Priya Venkataraman, continued]*

**DR. VENKATARAMAN:** To increase the diversity of representations an attention layer learns, it's common to concatenate several attention heads. That's multi-head attention. Equation 2.17: Multi-Head Attention of X is defined as Concatenate of head-one through head-h, times W-O, where W-O is d-V times h, by d. Equation 2.18: head-i is defined as Attention of X W-Q-i, X W-K-i, X W-V-i.

**DR. VENKATARAMAN:** h is the number of heads. Each head i has its own learnable W-Q-i, W-K-i, W-V-i, so each can learn a different notion of relevance. Concatenate places the h head outputs side by side: n rows, d-V times h columns. W-O, also learnable, maps that back to d columns. So the layer preserves the input dimensions: n by d in, n by d out.

**DR. VENKATARAMAN:** Labelled analogy: several analysts read the same file set, each searching for a different thing: one for dates, one for counterparties, one for amounts. Their findings are stapled together and summarized back into the standard report format. Where it breaks: nobody assigns the heads their specialties; any specialization comes from training.

*[TAPE ENDS]*

*[TIMECODE: 45:00]*

**LUCÍA:** Dropout. Hinton and colleagues, 2012. A technique commonly used along with attention layers. It randomly sets inputs to zero with probability q, where q is at least zero and strictly less than one.

**LUCÍA:** For an input x of n numbers, dropout creates a mask, bold m, n entries, each zero with probability q and one with probability one minus q. During training: Dropout of x is defined as m, element-wise-times x, times, one minus q, to the power minus one. The circle-dot symbol is element-wise multiplication, entry by entry. m circle-dot x zeroes out the dropped entries. Multiplying by one over one minus q scales up the survivors so the expected total stays the same as without dropout. During testing, dropout is the identity operation: it passes the input through unchanged.

*[SFX: soft chime]*

**LUCÍA:** Toy Box. q equals 0.5. x equals 2, 4, 6, 8. Mask: 1, 0, 1, 0. Training output: 2, 0, 6, 0, times 2, which is 4, 0, 12, 0. Testing output: 2, 4, 6, 8.

**DEV:** Labelled analogy: randomly sending half the team home each day during training forces everyone to be able to cover for each other. On the day of the real audit, everyone shows up. Breaks where: nobody doubles a surviving employee's output by decree.

*[TAPE: Dr. Priya Venkataraman, continued]*

**DR. VENKATARAMAN:** Normalization layers. A standard technique in state-of-the-art deep learning systems is to normalize the outputs of hidden layers: re-centre them and rescale them to a standard spread. There are several ways to compute the statistics.

**DR. VENKATARAMAN:** Batch norm, Ioffe and Szegedy, 2015, computes them from a mini-batch. Given m observations, it computes the sample average, x-bar, one over m times the sum of the x-i, and S squared, one over m times the sum of x-i minus x-bar, squared, with the square applied element-wise. Then Equation 2.19: Batch Norm of x is defined as, x minus x-bar, element-wise times, S squared plus epsilon to the power minus one-half, element-wise times gamma, plus beta.

*[SFX: ledger bell]*

**THE AUDITOR:** Wording entry. The thesis calls this quantity the sample standard deviation, and writes it as S squared. S squared, as defined, is the sample variance. The standard deviation is its square root. The math is unaffected: raising S squared plus epsilon to the minus one-half divides by the standard deviation. Entry closed.

*[SFX: ledger bell, softer]*

**DR. VENKATARAMAN:** Reading 2.19: x minus x-bar centres each feature on zero using that feature's mean across the batch. S squared plus epsilon to the minus one-half divides by the standard deviation; the square root is element-wise, and epsilon is positive to prevent division by zero. Gamma and beta are learnable scaling and translation parameters, so the network can choose a better spread and centre than one and zero if that helps.

**DR. VENKATARAMAN:** That beta is not the momentum one. Then layer norm, Ba and colleagues, 2016. It computes the statistics over the elements of the input itself instead of over a mini-batch. x-bar is one over n times the sum of the entries; s squared is one over n times the sum of squared deviations. Equation 2.20: Layer Norm of x is defined as, x minus x-bar, over the square root of s squared plus epsilon, element-wise times gamma, plus beta. Here x-bar and s squared are single numbers: the mean and variance across the n entries of this one input. Every entry is centred and scaled by the same two numbers, then rescaled and shifted by learnable gamma and beta.

*[SFX: soft chime]*

**LUCÍA:** Toy Box, layer norm, ignoring epsilon, gamma one, beta zero. x equals 1, 2, 3, 6. Mean is 3. Deviations squared: 4, 1, 0, 9. Sum 14, divided by 4 is 3.5. Square root of 3.5 is about 1.87. Output, approximately: minus 1.07, minus 0.53, 0, 1.60.

**DEV:** Audio figure: batch norm versus layer norm. A grid: rows are examples in a mini-batch, columns are features. Batch norm draws a vertical stripe: one feature, down all the examples. Layer norm draws a horizontal stripe: all features, across one example.

### Act Four — The Unit

*[TIMECODE: 49:10]*

*[MUSIC: "Still Learning" theme, low]*

**MIRIAM:** All these layers can be combined in sequence to form an architecture. For multi-layer networks, the thesis treats theta as an ordered set containing the weights of each layer in sequence. Now, the most important definition in this episode.

**PROF. ADEYEMI:** The thesis's example. One fully-connected layer followed by a linear output layer, both without bias terms. Theta is the set W-zero, W-one. For input x and activation g, the network computes f-theta of x equals W-one times g of, W-zero times x.

**MIRIAM:** Read it inside out.

**PROF. ADEYEMI:** W-zero times x gives the hidden layer's pre-activations. g of that gives its activations, h. W-one multiplies those activations to produce the output, with no activation on the output layer.

**MIRIAM:** And a unit?

**PROF. ADEYEMI:** A unit of computation in a layer has input weights that connect it to previous layers, and output weights that connect it to the following layers. In this example, W-zero holds the input connections to the fully-connected layer and W-one holds the output connections. With W-zero having m rows and n columns: hidden unit j's input weights are row j of W-zero. Its output weights are column j of W-one.

*[BEAT]*

**MIRIAM:** Say it once more.

**PROF. ADEYEMI:** Input weights: row j of W-zero. Output weights: column j of W-one.

**LUCÍA:** Why a row on the way in? Equation 2.12: output j is the weighted sum of all inputs using row j of W. So row j of W-zero is exactly what computes unit j's pre-activation.

**DEV:** And why a column on the way out?

**LUCÍA:** Unit j's activation, h-j, is the j-th entry of the vector W-one multiplies, so every output reads h-j through its entry in column j. Column j is how much each downstream output relies on unit j.

*[SFX: soft chime]*

**LUCÍA:** Toy Box. In our earlier linear layer, unit 1's incoming row was 0.5, minus 1; unit 2's was 2, 0. Put a W-one after it, and unit 2's outgoing weights are W-one's second column.

**UNIT 47:** So I'm not just a dot in the middle. I'm a row coming in and a column going out.

**PROF. ADEYEMI:** A row in, a column out, and your value when the network processes an observation: your activation.

**DEV:** Audio figure: a unit, input weights, activation, output weights. Inputs on the left, hidden circles in the middle, outputs on the right. One hidden circle is highlighted. It owns the blue lines coming in from every input, that's its row of W-zero, and the orange lines going out to every output, that's its column of W-one. Nothing else belongs to it.

**MIRIAM:** And resetting "unit j" means resetting exactly those. That is what the thesis's unit reinitialization does, in its Chapter 4, which this series reaches in Episode Six.

*[SFX: click and hum]*

**CAPT. AL-HARBI:** Labelled analogy, from the book. A unit is one analyst position. The input weights are the analyst's reading list and how much trust each source gets. The output weights are how much each downstream manager relies on the analyst's conclusion. Replacing the analyst means rewriting both. Where it breaks: a replacement part on my aircraft arrives with a known spec. A replaced unit's new weights are deliberately fresh.

**PROF. ADEYEMI:** It is not always this clean, and the thesis says so. Defining a unit requires identifying its input connections, its output connections, and the unit's value when processing observations. That becomes increasingly intricate as an architecture includes several different types of layers. In a convolutional layer, a unit is naturally a whole filter and its channel. With normalization, residual connections, or attention heads, the boundaries blur. The thesis revisits the definition of a unit several times as new architectures are introduced.

**MIRIAM:** Residual connections arrive in Chapter 9 of the book, full modern architectures in Chapter 20. Not tonight.

**THE THESIS:** From the thesis, adapted. A unit of computation in a layer has input weights that connect it to the previous layers and output weights that connect it to the following layers. Identifying these connections, together with the unit's value when processing observations, becomes increasingly intricate as an architecture combines different types of layers.

*[MUSIC: theme resolves]*

**MIRIAM:** The remedies at the heart of this investigation reset parts of a network. To reset a part, you must say exactly which numbers belong to it. Row in. Column out. Remember it.

### Three Things to Remember

**MIRIAM:** One. Learning is a local search in fog. SGD steps a size alpha against the averaged gradient, Equation 2.6. The classical guarantee of reaching the global minimum needs a convex loss, step-sizes that sum to infinity with squares that sum to a finite number, and stationary data. Neural networks are non-convex, and continual learning is non-stationary by design.

**DEV:** Two. The thesis's toolkit of update rules. L2 shrinks every parameter by one minus alpha lambda per step. Momentum smooths the gradient. Adam gives every parameter its own step-size from its squared-gradient history. SGDW and AdamW take the weight decay out of the averages, and the thesis uses them whenever L2 or shrink-and-perturb is applied.

**LUCÍA:** Three. Networks are stacks of layers: linear and fully-connected, convolution and pooling, attention, dropout, batch and layer norm. Flat regions of activation functions are where units freeze. And a unit, in the simple case, is row j of W-zero coming in and column j of W-one going out. That's what gets reset.

### Check Your Understanding

**LUCÍA:** Pause after each one. Answers follow.

**LUCÍA:** Question one. In Equation 2.6, why is there a minus sign before alpha-t?

**DEV:** Question two. Which of the three convergence conditions does continual learning violate by design?

**LUCÍA:** Question three. With alpha-t equals 0.1 and lambda equals 0.05, by what factor does Equation 2.7 shrink theta before the gradient step?

**DEV:** Question four. What does Adam's v track, and what does dividing by the square root of v-hat achieve?

**LUCÍA:** Question five. What is the single structural difference between Adam with L2 and AdamW?

**DEV:** Question six. In a fully-connected layer, what is the difference between a pre-activation and an activation?

**LUCÍA:** Question seven. Why can a ReLU unit stop learning entirely, while a Leaky ReLU unit cannot?

**DEV:** Question eight. A convolutional layer has 16 filters producing eight-by-eight channels. What are the output dimensions?

**LUCÍA:** Question nine. What does dropout do at test time, and why does it divide by one minus q during training?

**DEV:** Question ten. In f-theta of x equals W-one g of W-zero x, which parts of theta are hidden unit 3's input weights and output weights?

*[MUSIC: explainer bed, ticking clock]*

**LUCÍA:** Answers. One: the gradient points uphill; subtracting it moves the parameters downhill, reducing the loss. Two: stationary sampling; the distribution changes at every task. Three: one minus 0.1 times 0.05, which is 0.995. Four: v is a moving average of squared gradients, a gauge of each parameter's typical gradient size; dividing by its square root gives each parameter its own effective step-size. Five: in Adam, lambda-theta is added to the gradient and passes through the moving averages and the root-v-hat scaling; in AdamW the shrinkage, one minus lambda alpha-t, is applied directly to theta, outside them.

**DEV:** Six: the pre-activation is the affine output, W x plus b, before g; the activation h is g applied to it. Seven: ReLU outputs zero with zero slope for all negative inputs, so if a unit's pre-activation is always negative, no gradient reaches its weights; Leaky ReLU keeps a slope of 0.01 there. Eight: 16 by 8 by 8. Nine: it passes inputs through unchanged; dividing by one minus q keeps the expected size of the output the same as at test time. Ten: row 3 of W-zero, input weights; column 3 of W-one, output weights.

### Credits and Next Time

*[MUSIC: "Still Learning" theme — low cello pulse, slow piano]*

**MIRIAM:** Tonight Nora learned how she learns, and met the units inside her. She knows now that no guarantee covers her kind of hillside. Next time, we run the experiment. A task. Then a new one. We watch what happens to Nora when the hill keeps moving.

*[SFX: shuffling cards]*

**NORA:** What's that sound?

**MIRIAM:** That, Nora, is your next task. Episode Three: "The Shuffle."

**MIRIAM:** STILL LEARNING is reported by Miriam Okafor, with Dev Raman and Lucía Ferreira. THE THESIS was read by Graham Asante. Nora was played by Nell Varga. THE ARCHIVIST, Ruth Kellerman. THE AUDITOR, Samir Haddad. The Units were our ensemble. Our experts tonight were Prof. Tomás Adeyemi, Dr. Priya Venkataraman and Capt. Rashid Al-Harbi. The thesis is © Juan Fernando Hernandez Garcia, 2026, licensed CC BY 4.0, adapted here with credit. Code at github.com/JFernando4/plasticity-via-reinit. All experts and actors in this series are fictional.

*[MUSIC: theme out]*

### Show Notes

Episode 2 covers book Chapter 4, "How Networks Learn" (thesis §2.3, pp. 7–9; Equations 2.6–2.11; no figures, tables or algorithms in the thesis section), and book Chapter 5, "Building Blocks" (thesis §2.4, pp. 9–13; Figure 2.1; Equations 2.12–2.20 plus the unnumbered query/key/value definitions, the dropout operation and the two-layer example).

#### Equations

Eq. 2.6 — mini-batch stochastic gradient descent (SGD):

```latex
\boldsymbol{\theta}_{t+1} \doteq \boldsymbol{\theta}_t - \alpha_t \cdot \frac{1}{m}\sum_{i=1}^{m} \nabla_{\boldsymbol{\theta}_t} \ell\left(f_{\boldsymbol{\theta}_t}(\mathbf{x}_{t,i}), \mathbf{y}_{t,i}\right)
```

Convergence conditions for SGD on a convex loss (stated in §2.3; unnumbered), plus stationary sampling:

```latex
\sum_{t=1}^{\infty} \alpha_t = \infty, \qquad \sum_{t=1}^{\infty} \alpha_t^2 < \infty
```

Eq. 2.7 — SGD with L2 regularization (weight decay):

```latex
\boldsymbol{\theta}_{t+1} \doteq (1 - \alpha_t \lambda) \cdot \boldsymbol{\theta}_t - \alpha_t \cdot \frac{1}{m}\sum_{i=1}^{m} \nabla_{\boldsymbol{\theta}_t} \ell\left(f_{\boldsymbol{\theta}_t}(\mathbf{x}_{t,i}), \mathbf{y}_{t,i}\right)
```

Eq. 2.8 — SGD with momentum (the λθ term is optional, printed in red in the thesis; see the reading note on β below):

```latex
\begin{aligned}
\mathbf{m}_{t+1} &= (1 - \beta) \cdot \mathbf{m}_t + \beta \cdot \left(\frac{1}{m}\sum_{i=1}^{m} \nabla_{\boldsymbol{\theta}_t} \ell\left(f_{\boldsymbol{\theta}_t}(\mathbf{x}_{t,i}), \mathbf{y}_{t,i}\right) + \lambda \cdot \boldsymbol{\theta}_t\right) \\
\boldsymbol{\theta}_{t+1} &= \boldsymbol{\theta}_t - \alpha_t \cdot \mathbf{m}_{t+1}
\end{aligned}
```

Eq. 2.9 — Adam (Kingma and Ba, 2015; the λθ term is optional, printed in red in the thesis):

```latex
\begin{aligned}
\mathbf{g}_{t+1} &= \frac{1}{m}\sum_{i=1}^{m} \nabla_{\boldsymbol{\theta}_t} \ell\left(f_{\boldsymbol{\theta}_t}(\mathbf{x}_{t,i}), \mathbf{y}_{t,i}\right) + \lambda \cdot \boldsymbol{\theta}_t \\
\mathbf{m}_{t+1} &= (1 - \beta_1) \cdot \mathbf{m}_t + \beta_1 \cdot \mathbf{g}_{t+1} \\
\mathbf{v}_{t+1} &= (1 - \beta_2) \cdot \mathbf{v}_t + \beta_2 \cdot \mathbf{g}_{t+1}^2 \\
\hat{\mathbf{m}} &= \frac{\mathbf{m}_{t+1}}{1 - \beta_1^{t+1}}, \quad \hat{\mathbf{v}} = \frac{\mathbf{v}_{t+1}}{1 - \beta_2^{t+1}} \\
\boldsymbol{\theta}_{t+1} &= \boldsymbol{\theta}_t - \alpha_t \cdot \frac{\hat{\mathbf{m}}}{\sqrt{\hat{\mathbf{v}}} + \epsilon}
\end{aligned}
```

Eq. 2.10 — SGDW, decoupled weight decay with momentum (Loshchilov and Hutter, 2019):

```latex
\begin{aligned}
\mathbf{m}_{t+1} &= (1 - \beta) \cdot \mathbf{m}_t + \beta \cdot \left(\frac{1}{m}\sum_{i=1}^{m} \nabla_{\boldsymbol{\theta}_t} \ell\left(f_{\boldsymbol{\theta}_t}(\mathbf{x}_{t,i}), \mathbf{y}_{t,i}\right)\right) \\
\boldsymbol{\theta}_{t+1} &= (1 - \alpha_t \lambda) \cdot \boldsymbol{\theta}_t - \alpha_t \cdot \mathbf{m}_{t+1}
\end{aligned}
```

Eq. 2.11 — AdamW (Loshchilov and Hutter, 2019; m̂ and v̂ computed as in Eq. 2.9 from the pure gradient):

```latex
\begin{aligned}
\mathbf{g}_{t+1} &= \frac{1}{m}\sum_{i=1}^{m} \nabla_{\boldsymbol{\theta}_t} \ell\left(f_{\boldsymbol{\theta}_t}(\mathbf{x}_{t,i}), \mathbf{y}_{t,i}\right) \\
\boldsymbol{\theta}_{t+1} &= (1 - \lambda \alpha_t) \cdot \boldsymbol{\theta}_t - \alpha_t \cdot \frac{\hat{\mathbf{m}}}{\sqrt{\hat{\mathbf{v}}} + \epsilon}
\end{aligned}
```

Eq. 2.12 — linear layer, with x ∈ ℝⁿ, W ∈ ℝ^(m×n), b ∈ ℝᵐ:

```latex
\text{Linear}(\mathbf{x}) = \mathbf{W}\mathbf{x} + \mathbf{b}
```

Eq. 2.13 — fully-connected layer, g applied elementwise:

```latex
\text{Fully-Connected}(\mathbf{x}) = g(\mathbf{W}\mathbf{x} + \mathbf{b})
```

Figure 2.1 activation functions (formulas as printed in the thesis; unnumbered):

```latex
\begin{aligned}
\text{Sigmoid:}\quad & g(x) \doteq \frac{1}{1 + e^{-x}} \\
\text{Tanh:}\quad & g(x) \doteq \frac{e^{x} - e^{-x}}{e^{x} + e^{-x}} \\
\text{ReLU:}\quad & g(x) \doteq \max(0, x) \\
\text{Leaky ReLU:}\quad & g(x) \doteq \max(0, x) + \alpha \cdot \min(0, x), \quad \alpha = 0.01 \\
\text{SiLU:}\quad & g(x) \doteq \frac{x}{1 + e^{-x}} \\
\text{GELU:}\quad & g(x) \doteq \frac{x}{2}\left[1 + \operatorname{erf}\left(\frac{x}{\sqrt{2}}\right)\right], \quad \operatorname{erf}(x) \doteq \frac{2}{\sqrt{\pi}} \int_{0}^{x} e^{-t^2}\, dt
\end{aligned}
```

Eq. 2.14 — one convolutional filter, W ∈ ℝ^(d×d), b ∈ ℝ, applied to each d × d patch B of an input A ∈ ℝ^(n×n), n > d:

```latex
f(\mathbf{B}) = g\left(b + \sum_{i=1}^{d}\sum_{j=1}^{d} \mathbf{W}[i,j] \cdot \mathbf{B}[i,j]\right)
```

Eq. 2.15 — SoftMax, for x ∈ ℝⁿ:

```latex
\text{SoftMax}(\mathbf{x}) \doteq \left[\frac{e^{\mathbf{x}[1]}}{\sum_{j=1}^{n} e^{\mathbf{x}[j]}}, \cdots, \frac{e^{\mathbf{x}[n]}}{\sum_{j=1}^{n} e^{\mathbf{x}[j]}}\right]^{\top}
```

Queries, keys and values (unnumbered), for X ∈ ℝ^(n×d):

```latex
\begin{aligned}
\mathbf{Q} &\doteq \mathbf{X}\mathbf{W}_Q, & \mathbf{W}_Q &\in \mathbb{R}^{d \times d_Q} \\
\mathbf{K} &\doteq \mathbf{X}\mathbf{W}_K, & \mathbf{W}_K &\in \mathbb{R}^{d \times d_Q} \\
\mathbf{V} &\doteq \mathbf{X}\mathbf{W}_V, & \mathbf{W}_V &\in \mathbb{R}^{d \times d_V}
\end{aligned}
```

Eq. 2.16 — (self-)attention (the thesis writes √d; the original transformer paper scales by the key width, d_Q here):

```latex
\text{Attention}(\mathbf{Q}, \mathbf{K}, \mathbf{V}) \doteq \text{SoftMax}\left(\frac{\mathbf{Q}\mathbf{K}^{\top}}{\sqrt{d}}\right)\mathbf{V}
```

Eq. 2.17 — multi-head attention:

```latex
\text{Multi-Head Attention}(\mathbf{X}) \doteq \text{Concatenate}(\text{head}_1, \cdots, \text{head}_h)\,\mathbf{W}_O, \quad \mathbf{W}_O \in \mathbb{R}^{d_V \cdot h \times d}
```

Eq. 2.18 — one attention head:

```latex
\text{head}_i \doteq \text{Attention}\left(\mathbf{X}\mathbf{W}_{Q,i}, \mathbf{X}\mathbf{W}_{K,i}, \mathbf{X}\mathbf{W}_{V,i}\right)
```

Dropout, during training (unnumbered); mask entries are 0 with probability q ∈ [0, 1) and 1 with probability 1 − q; identity at test time:

```latex
\text{Dropout}(\mathbf{x}) \doteq \mathbf{m} \odot \mathbf{x} \cdot (1 - q)^{-1}
```

Batch-norm statistics (unnumbered; square element-wise; the thesis calls S² the sample standard deviation, though it is the variance):

```latex
\overline{\mathbf{x}} \doteq \frac{1}{m}\sum_{i=1}^{m} \mathbf{x}_i, \qquad \mathbf{S}^2 \doteq \frac{1}{m}\sum_{i=1}^{m} \left(\mathbf{x}_i - \overline{\mathbf{x}}\right)^2
```

Eq. 2.19 — batch norm (Ioffe and Szegedy, 2015):

```latex
\text{Batch Norm}(\mathbf{x}) \doteq (\mathbf{x} - \overline{\mathbf{x}}) \odot (\mathbf{S}^2 + \epsilon)^{-\frac{1}{2}} \odot \boldsymbol{\gamma} + \boldsymbol{\beta}
```

Layer-norm statistics (unnumbered):

```latex
\overline{x} \doteq \frac{1}{n}\sum_{i=1}^{n} \mathbf{x}[i], \qquad s^2 \doteq \frac{1}{n}\sum_{i=1}^{n} \left(\mathbf{x}[i] - \overline{x}\right)^2
```

Eq. 2.20 — layer norm (Ba et al., 2016):

```latex
\text{Layer Norm}(\mathbf{x}) \doteq \frac{\mathbf{x} - \overline{x}}{\sqrt{s^2 + \epsilon}} \odot \boldsymbol{\gamma} + \boldsymbol{\beta}
```

Two-layer example (unnumbered), θ = {W₀, W₁}, no biases. Hidden unit j's input weights are row j of W₀ ∈ ℝ^(m×n); its output weights are column j of W₁:

```latex
f_{\boldsymbol{\theta}}(\mathbf{x}) = \mathbf{W}_1\, g(\mathbf{W}_0 \mathbf{x})
```

#### Figures and audio figures

| Item | One-line summary |
| --- | --- |
| Figure 2.1 — Six nonlinear activation functions | Two rows of panels (Sigmoid, ReLU, SiLU; Tanh, Leaky ReLU, GELU), x from −10 to 10; flat regions are where gradients vanish and units freeze. |
| Book illustration — gradient descent on a toy loss curve | A ball from random θ₀ steps downhill and settles in the nearer local minimum; it never crosses the ridge to the lower valley. |
| Book illustration — optimizer family | Top row adds features (SGD, momentum, Adam); bottom row shows where weight decay sits; SGDW and AdamW highlighted as the decoupled versions the thesis uses. |
| Book illustration — convolution | One 3 × 3 filter at two successive positions on a 5 × 5 input, each producing one cell of a 3 × 3 channel with the same nine weights and one bias. |
| Book illustration — self-attention | Token 3's query matched against three keys; SoftMax weights 0.10, 0.69, 0.21 mix the values (toy numbers). |
| Book illustration — batch norm vs layer norm | Batch norm averages one feature down the batch; layer norm averages all features across one example. |
| Book illustration — a unit | The highlighted unit owns the blue incoming weights (row j of W₀) and orange outgoing weights (column j of W₁); resetting the unit resets exactly those. |

#### Figure 2.1 at a glance

| Function | Shape | Output range |
| --- | --- | --- |
| Sigmoid | S-curve, flat at both ends | 0 to 1 |
| Tanh | steeper S-curve centred on 0 | −1 to 1 |
| ReLU | zero for negative x, identity for positive x | 0 upwards |
| Leaky ReLU (α = 0.01) | like ReLU, slight downward slope for negative x | slightly below 0, upwards |
| SiLU | smooth ReLU-like, small dip below 0 near x ≈ −1 | small negative dip, upwards |
| GELU | smooth ReLU-like, small dip below 0 | small negative dip, upwards |

#### The update rules side by side (book §4.8)

| Rule | Eq. | What it averages | Per-parameter scaling | Where weight decay acts | Source named in thesis |
| --- | --- | --- | --- | --- | --- |
| SGD | 2.6 | nothing (current mini-batch gradient) | no | none | — |
| SGD with L2 (weight decay) | 2.7 | nothing | no | shrinks θ by (1 − αₜλ) each step | Goodfellow et al., 2016 (Ch. 7) |
| SGD with momentum | 2.8 | gradient (factor β) | no | optional λθ inside the average | — |
| Adam | 2.9 | gradient (β₁) and squared gradient (β₂), bias-corrected | yes, divides by √v̂ + ε | optional λθ inside the averages | Kingma and Ba, 2015 |
| SGDW | 2.10 | gradient only (β) | no | outside the average: (1 − αₜλ)θ | Loshchilov and Hutter, 2019 |
| AdamW | 2.11 | as Adam | yes, as Adam | outside the averages: (1 − λαₜ)θ | Loshchilov and Hutter, 2019 |

#### Auditor's ledger

| Item | Note |
| --- | --- |
| β convention in Eqs. 2.8–2.10 | As printed, β weights the new gradient; the common convention (Kingma and Ba) puts it on the old average. The bias corrections and the thesis's later settings (momentum 0.9; β₁ = 0.9, β₂ = 0.999) follow the common convention. |
| √d in Eq. 2.16 | The thesis writes √d; the original transformer paper uses the key width, d_Q in this notation. |
| S² in batch norm | The thesis calls S² the sample standard deviation; as defined it is the sample variance. The equation's power of −½ divides by the standard deviation. |

#### Toy numbers used on air

| Toy | Result |
| --- | --- |
| SGD step: θ = 2.0, gradient 4.0, α = 0.1 | 1.6 |
| L2 step: same, λ = 0.01 | 1.998 − 0.4 = 1.598 |
| Momentum (literal Eq. 2.8, β = 0.1): gradients 4.0 then −4.0 | m₁ = 0.4, m₂ = −0.04 |
| Adam first step (standard convention) | ±α regardless of gradient scale (ignoring ε) |
| Linear layer: x = (1, 2), W rows (0.5, −1), (2, 0), b = (0.1, −1) | (−1.4, 1.0); after ReLU (0, 1.0) |
| 2 × 2 filter (1, 0; 0, −1) on patches (5, 3; 2, 1) and (1, 3; 2, 5) | 4 and 0 |
| Max pooling 2 × 2, stride 2 | 4 × 4 channel becomes 2 × 2 |
| SoftMax of (0.0, 1.9, 0.7) | ≈ (0.10, 0.69, 0.21) |
| Dropout q = 0.5, x = (2, 4, 6, 8), mask (1, 0, 1, 0) | training (4, 0, 12, 0); testing (2, 4, 6, 8) |
| Layer norm of (1, 2, 3, 6) | mean 3, s² = 3.5, output ≈ (−1.07, −0.53, 0, 1.60) |

#### References named in this episode

Goodfellow et al., 2016 (Ch. 7); Kingma and Ba, 2015; Loshchilov and Hutter, 2019; Lecun et al., 1998; Bahdanau et al., 2014; Vaswani et al., 2017; Hinton et al., 2012; Ioffe and Szegedy, 2015; Ba et al., 2016. Thesis code: github.com/JFernando4/plasticity-via-reinit.
